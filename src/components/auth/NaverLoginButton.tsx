"use client";

import { getNaverLoginUrl } from "@/lib/utils/auth";

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
    <button onClick={handleLogin} className={`w-full px-4 py-3 ${className}`}>
      네이버 계정으로 로그인
    </button>
  );
}
