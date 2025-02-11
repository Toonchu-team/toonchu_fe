import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/profile", "/my-box"];
const socialLoginCallbackPattern = new RegExp("^/auth/[^/]+/callback$");

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const accessToken = request.cookies.get("access_token")?.value;

  // 소셜 로그인 콜백 페이지 처리
  if (socialLoginCallbackPattern.test(path)) {
    return NextResponse.next();
  }

  // 로딩 페이지 처리
  if (path === "/loading") {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // 인증이 필요한 페이지 접근 제한 처리
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 로그인 페이지에서 로그인 상태일 경우 메인 페이지로 리다이렉트 처리
  if (accessToken && path === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
