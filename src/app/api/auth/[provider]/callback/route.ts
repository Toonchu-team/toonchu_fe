import { userApi } from "@/lib/api/server/userApi";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const provider = request.url.split("/").slice(-2, -1)[0];
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code를 찾을 수 없습니다." },
      { status: 400 },
    );
  }

  console.log("provider: ", provider);
  console.log("code: ", code);

  try {
    const { access_token, refresh_token, user } =
      await userApi.handleSocialLogin(provider, code);

    // Access Token과 Refresh Token을 쿠키에 저장
    const response = NextResponse.redirect(new URL("/", request.url));

    // CORS 설정 (개발 환경에서는 필요)
    response.headers.set(
      "Access-Control-Allow-Origin",
      process.env.NEXT_PUBLIC_BASE_URL_DEVELOPMENT || "*",
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

    console.log("리다이렉트 직전");
    console.log("user(백엔드응답): ", user);
    console.log("access_token(백엔드응답): ", access_token);

    // 리다이렉트
    return response;
  } catch (error) {
    console.error(error);
  }
}
