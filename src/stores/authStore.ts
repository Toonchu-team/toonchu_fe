import { logoutAction } from "@/lib/actions/authActions";
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
      await logoutAction();
      // 2. 클라이언트 상태 초기화
      set({ user: null });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
}));

export default useAuthStore;
