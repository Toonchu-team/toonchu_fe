import { User } from "@/lib/types/auth";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: async () => {
    try {
      // 1. 서버에 로그아웃 요청을 보내서 서버에서 세션/쿠키 삭제
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      // 2. 클라이언트 상태 초기화
      set({ user: null });
      // 3. 로그인 페이지로 리다이렉트
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      // 추후 에러 페이지 생성
    }
  },
}));

export default useAuthStore;
