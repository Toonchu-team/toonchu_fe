"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallbackClient({ user }: { user: any }) {
  const router = useRouter();
  useEffect(() => {
    console.log(user);
    // 유저 정보 전역 상태에 저장
    router.push("/");
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">로그인 처리 중...</h2>
        <p className="text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
