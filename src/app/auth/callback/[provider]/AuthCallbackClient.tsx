"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/lib/types/auth";
import useAuthStore from "@/stores/authStore";

interface AuthCallbackClientProps {
  user: User | null;
}

export default function AuthCallbackClient({ user }: AuthCallbackClientProps) {
  const router = useRouter();
  const { login } = useAuthStore();
  useEffect(() => {
    if (user) {
      login(user);
      router.push("/profile"); // 추후 "/"로 수정, 현재는 profile 데이터 연동 테스트 중
    }
  }, [user, router, login]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">로그인 처리 중...</h2>
        <p className="text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
