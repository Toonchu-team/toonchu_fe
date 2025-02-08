import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // 기존 인증 쿠키 삭제
    cookieStore.delete("access_token");

    // 서버에 로그아웃 요청
    const response = await fetch(`${process.env.SERVER_URL}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("서버 로그아웃 실패");
    }

    return NextResponse.json({ message: "로그아웃 성공" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "로그아웃 처리 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
