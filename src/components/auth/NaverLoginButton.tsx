"use client";

import { getNaverLoginUrl } from "@/lib/utils/auth";
import LoginButton from "./LoginButton";
import Image from "next/image";

export default function NaverLoginButton({
  className = "",
}: {
  className?: string;
}) {
  const handleLogin = () => {
    const url = getNaverLoginUrl();
    window.location.href = url;
  };

  return (
    <LoginButton onClick={handleLogin} className="bg-naver-green">
      <Image
        alt="네이버 로고"
        width={40}
        height={40}
        src="/images/provider/naver-logo-square.png"
        className="h-7 w-7"
      />
      <p className="text-white">네이버로 로그인</p>
    </LoginButton>
  );
}
