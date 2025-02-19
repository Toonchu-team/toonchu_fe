"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { userApi } from "../api/server/userApi";
import useAuthStore from "@/stores/authStore";

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
      console.log("401 Error! Attemping to refresh token...");
      try {
        const newAccessToken = await userApi.getNewAcessToken();

        if (!newAccessToken) {
          console.log("새 인증 토큰 발급 실패 - serverFetch");
          redirect("/login");
        }

        console.log("새 인증 토큰 발급 성공 - serverFetch:", newAccessToken);

        // Zustand를 사용하여 access_token 업데이트(가능?)
        useAuthStore.getState().setAccessToken(newAccessToken);

        // 쿠키에 새 access_token 설정
        cookieStore.set("access_token", newAccessToken);

        revalidatePath(url); // AT 갱신 후 데이터 갱신

        console.log("Retrying original request with new access token...");
        return serverFetch<T>(url, options); // 재귀 호출
      } catch (refreshError) {
        console.error("Failed to refresh access token:", refreshError);
        redirect("/login"); // refresh token 갱신에 실패하면 로그인 페이지로 리다이렉트
      }
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
