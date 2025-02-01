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

  // Mock 데이터 : 백엔드 반환값 다시 확인 필요 (USER-001  - 2/1)
  const mockUser = {
    id: 1,
    name: "NAME",
    nick_name: "USERNAME",
    email: "mock_user@example.com",
    profile_image: "https://picsum.photos/300/300",
    provider,
    provider_id: "123456789",
  };

  return NextResponse.json({ user: mockUser });

  /* 
  백엔드 API 정리되면 다시 수정 (backentUrl 주소 재확인 필요)

  const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/callback/${provider}`;
  const response = await fetch(backendUrl, {
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
    return NextResponse.json(
      { error: "인증에 실패하였습니다." },
      { status: 500 }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
*/
}
