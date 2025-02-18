import { logoutAction } from "@/lib/actions/authActions";
import { User } from "@/lib/types/auth";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  access_token: string | null; // access_token 추가
  setAccessToken: (token: string | null) => void;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  // user: {
  //   id: "111",
  //   nick_name: "새 닉네임을 설정해주세요",
  //   email: "test-user@gmail.com",
  //   profile_image: "/images/brand-character/default-profile.png",
  //   provider: "kakao",
  // },
  access_token: null,
  setAccessToken: (token) => set({ access_token: token }),
  login: (user) => set({ user }),
  logout: async () => {
    try {
      // 1. 서버에 로그아웃 요청을 보내서 서버에서 세션/쿠키 삭제
      await logoutAction();
      // 2. 클라이언트 상태 초기화
      set({ user: null, access_token: null });
    } catch (error) {
      console.error("Logout error:", error);
      // 추후 에러 페이지 생성
    }
  },
}));

export default useAuthStore;
