import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { provider: string } }
) {
  const { provider } = params;
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code를 찾을 수 없습니다." },
      { status: 400 }
    );
  }

  console.log("provider: ", provider);
  console.log("code: ", code);

  // Mock 데이터 : 백엔드 반환값 다시 확인 필요 (USER-001(2/1 API명세서 기준))
  const mockUser = {
    id: 1,
    nick_name: "USERNAME",
    email: "mock_user@example.com",
    profile_image: "https://picsum.photos/300/300",
    // profile_image: null, // 이미지 플레이스홀더 테스트 용
    provider,
  };

  const mockResponse = {
    access_token: "mock_access_token",
    user: mockUser,
  };

  console.log("mockResponse: ", mockResponse);

  return NextResponse.json(mockResponse);

  /* 
  백엔드 API 정리되면 다시 수정 (backentUrl 주소 재확인 필요)

  입력값 형태 (2/3 협의) :
  {
  "code": "authorization_code",
  "provider": "google", // 전체 소문자로 (google|naver|kakao)
  }   

  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback/${provider}`;
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        code,
        provider 
      }),
    });

    if (!response.ok) {
      throw new Error("인증에 실패하였습니다.");
    }

    const data = await response.json();
    
    cookies().set('access_token', data.access_token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',  // HTTPS에서만 쿠키 전송
      sameSite: 'lax',  // CSRF 방지  
      maxAge: data.expires_in  // 쿠키 만료 시간
      path: '/',   // 모든 경로에서 쿠키 접근 가능
    });

    return NextResponse.json({ user: data.user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "인증에 실패하였습니다." },
      { status: 500 }
    );
  }
*/
}
