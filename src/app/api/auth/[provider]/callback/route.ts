import { userApi } from "@/lib/api/server/userApi";
import { NextResponse } from "next/server";

export async function GET(request: Request) {``
  const provider = request.url.split("/").slice(-2, -1)[0];
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code를 찾을 수 없습니다." },
      { status: 400 },
    );
  }

  try {
    const { access_token, refresh_token } = await userApi.handleSocialLogin(
      provider,
      code,
    );

    const response = NextResponse.redirect(new URL("/", request.url));

    response.headers.set(
      "Access-Control-Allow-Origin",
      process.env.NEXT_PUBLIC_BASE_URL || "*",
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");

    response.cookies.set("access_token", access_token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60, // 1시간
    });
    response.cookies.set("refresh_token", refresh_token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1일
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}
