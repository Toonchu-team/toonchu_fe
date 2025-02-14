import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const refresh_token = cookieStore.get("refresh_token")?.value;

  if (!refresh_token) {
    return NextResponse.json(
      { error: "리프래시 토큰 찾을 수 없음" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `${process.env.SERVER_URL}/users/token/refresh/`, // 백엔드 인증 토큰 갱신 API 엔드포인트
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refresh_token }),
      },
    );

    if (!response.ok) {
      console.error("인증 토큰 갱신 실패(refresh API ROUTE):", response.status);
      return NextResponse.json(
        { error: "인증 토큰 갱신 실패(refresh API ROUTE):" },
        { status: 401 },
      );
    }

    const data = await response.json();
    const newAccessToken = data.access_token;

    // 새로운 AT를 httpOnly 쿠키에 설정
    cookieStore.set("accessToken", newAccessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60, // 1시간
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({ message: "인증 토큰 갱신 성공" });
  } catch (error) {
    console.error("인증 토큰 갱신 실패(/refresh/route.ts):", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
