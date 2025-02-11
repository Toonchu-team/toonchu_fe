"use client";

import { getGoogleLoginUrl } from "@/lib/utils/auth";
import LoginButton from "./LoginButton";
import Image from "next/image";

export default function GoogleLoginButton({
  className = "",
}: {
  className?: string;
}) {
  const handleLogin = () => {
    const url = getGoogleLoginUrl();
    window.location.href = url;
  };

  return (
    <LoginButton onClick={handleLogin}>
      <Image
        alt="구글 로고"
        width={40}
        height={40}
        src="/images/provider/google-logo-square.png"
        className="h-5 w-5"
      />
      <p className="ml-1">구글로 로그인</p>
    </LoginButton>
  );
}
