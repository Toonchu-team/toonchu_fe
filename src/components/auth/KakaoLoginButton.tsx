"use client";

import { getKakaoLoginUrl } from "@/lib/utils/auth";

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
    <button onClick={handleLogin} className={`w-full px-4 py-3 ${className}`}>
      카카오 계정으로 로그인
    </button>
  );
}
