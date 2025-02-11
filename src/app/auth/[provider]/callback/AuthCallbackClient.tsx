"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/lib/types/auth";
import useAuthStore from "@/stores/authStore";
interface AuthCallbackClientProps {
  user: User;
}

export default function AuthCallbackClient({ user }: AuthCallbackClientProps) {
  const router = useRouter();
  const { login } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    try {
      console.log(user);
      router.push("/");
    } catch (error) {
      console.error("Login state update failed:", error);
      // 에러 처리 UI 표시
    }
  }, [user, router, login]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="mb-2 text-xl font-semibold">로그인 처리 중...</h2>
        <p className="text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
