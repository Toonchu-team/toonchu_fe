"use client";

import { getKakaoLoginUrl } from "@/lib/utils/auth";
import LoginButton from "./LoginButton";
import Image from "next/image";

export default function KakaoLoginButton({
  className = "",
}: {
  className?: string;
}) {
  const handleLogin = () => {
    const url = getKakaoLoginUrl();
    window.location.href = url;
  };

  return (
    <LoginButton className="bg-kakao-yellow" onClick={handleLogin}>
      <Image
        alt="구글 로고"
        width={40}
        height={40}
        src="/images/provider/kakao-logo-bubble.png"
        className="h-5 w-5"
      />
      <p className="text-black">카카오톡으로 로그인</p>
    </LoginButton>
  );
}
