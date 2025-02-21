"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { userApi } from "../api/server/userApi";

export async function customFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(options.headers);
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;

  if (access_token) {
    headers.set("Authorization", `Bearer ${access_token}`);
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: headers,
    });

    // 401 응답 시, AT 갱신 API 호출 -> 내부 쿠키 갱신 -> 데이터 갱신
    if (response.status === 401) {
      console.log("백엔드 갱신 API 응답 실패 - 400 customFetch.ts");
      try {
        const newAccessToken = await userApi.getNewAcessToken();

        if (!newAccessToken) {
          console.log("새 인증 토큰 발급 실패 - customFetch.ts");
          redirect("/login");
        }

        console.log("새 인증 토큰 발급 성공 - customFetch:", newAccessToken);
        cookieStore.set("access_token", newAccessToken, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 30,
        });

        console.log("Retrying original request with new access token...");
        // const retryResponse = await fetch(url, {
        //   ...options,
        //   headers: {
        //     ...headers,
        //     Authorization: `Bearer ${newAccessToken}`,
        //   },
        // });
        // return retryResponse;
      } catch (refreshError) {
        console.error("Failed to refresh access token:", refreshError);
        redirect("/login"); // refresh token 갱신에 실패하면 로그인 페이지로 리다이렉트
      }
    }

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("API 요청 실패(customFetch.ts):", error);
    throw error;
  }
}
