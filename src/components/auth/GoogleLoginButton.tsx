"use client";

import { getGoogleLoginUrl } from "@/lib/utils/auth";

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
    <button onClick={handleLogin} className={`w-full px-4 py-3 ${className}`}>
      구글 계정으로 로그인
    </button>
  );
}
