"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function serverFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;

  if (access_token) {
    headers.set("Authorization", `Bearer ${access_token}`); // Authorization 헤더 설정
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: headers,
    });

    // 401 응답 시, AT 갱신 API 호출 -> 내부 쿠키 갱신 -> 데이터 갱신
    if (response.status === 401) {
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
      return serverFetch<T>(url, options); // 재귀 호출
    }

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API 요청 실패(serverFetch.ts):", error);
    throw error;
  }
}
