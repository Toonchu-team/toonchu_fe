import { userApi } from "@/lib/api/server/userApi";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { provider: string } },
) {
  const { provider } = await params;
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
    const data = await userApi.handleSocialLogin(provider, code!); // 여기서 백엔드 정상 Response 받지 못하는 중

    // console.log("data: ", data);
    // const cookieStore = await cookies();

    // cookieStore.set("access_token", data.access_token, {
    //   httpOnly: true, // HTTPS에서만 쿠키 전송
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "lax", // CSRF 방지
    //   maxAge: 3600, // 쿠키 만료 시간
    //   path: "/", // 모든 경로에서 쿠키 접근 가능
    // });

    return NextResponse.json({ user: data.user });

    // Mock 데이터 : 백엔드 반환값 다시 확인 필요 (USER-001(2/1 API명세서 기준))

    // console.log("start");
    // const mockUser = {
    //   id: 1,
    //   nick_name: "USERNAME",
    //   email: "mock_user@example.com",
    //   // profile_image: "https://picsum.photos/300/300",
    //   profile_image: null, // 이미지 플레이스홀더 테스트 용
    //   provider,
    // };

    // const mockResponse = {
    //   access_token: "mock_access_token",
    //   user: mockUser,
    // };

    // console.log("mockResponse: ", mockResponse);

    // return NextResponse.json(mockResponse);
    // return NextResponse.json({ provider, code });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          "인증에 실패하였습니다. - /api/auth/callback/[provider]/route.ts",
      },
      { status: 500 },
    );
  }
}
