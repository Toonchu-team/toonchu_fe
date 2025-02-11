import AuthCallbackClient from "./AuthCallbackClient";

interface AuthSearchParams {
  code: string;
  state?: string | null; // 네이버 로그인 시 필요
}
export default async function AuthCallbackPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ provider: string }>;
  searchParams: Promise<AuthSearchParams>;
}) {
  const params = await paramsPromise;
  const searchParams = await searchParamsPromise;
  const code = searchParams.code;
  const provider = params.provider;

  if (!code) {
    return <div>Authorization code를 찾을 수 없습니다.</div>; // 추후 에러 페이지 생성
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION}/api/auth/${provider}/callback?code=${code}`,
    );
    const userData = await response.json();

    return <AuthCallbackClient user={userData} />;
  } catch (error) {
    console.error("Social login error:", error);
    return <div>인증에 실패하였습니다.</div>; // 추후 에러 페이지 생성
  }
}
