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
  /* 
  user: {
    id: 111,
    nick_name: "test-user",
    email: "test-user@gmail.com",
    profile_image: "/images/brand-character/default-profile.png",
    provider: "kakao",
  },*/ login: (user) => set({ user }),
  logout: async () => {
    try {
      // 서버 액션 호출
      await logoutAction();
      set({ user: null }); // 클라이언트 상태 초기화
    } catch (error) {
      console.error("Logout error:", error); // 추후 에러 페이지 생성
    }
  },
}));

export default useAuthStore;
