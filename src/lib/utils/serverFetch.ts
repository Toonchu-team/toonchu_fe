"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function serverFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;

  const defaultHeaders = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
  };

  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);

    if (response.status === 401) {
      // AT 갱신 API 호출
      const refreshResponse = await fetch("/api/token/refresh", {
        method: "POST",
      });

      if (!refreshResponse.ok) {
        console.error(
          "인증 토큰 갱신 실패(serverFetch.ts):",
          refreshResponse.status,
        );
        redirect("/login");
      }

      revalidatePath(url); // AT 갱신 후 데이터 갱신
      return serverFetch<T>(url, options); // (새로 갱신된 AT을 담은 인증 헤더와 함께) 재귀 호출
    }

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("API request error:", error);
    throw error;
  }
}
