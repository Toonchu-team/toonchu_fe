import { AuthResponse } from "@/lib/types/auth";

export const userApi = {
  getLoginUser: async (user_id: number) => {
    const response = await fetch(`api/users/${user_id}`);
    if (!response.ok) {
      throw new Error("로그인 유저 정보 찾기 실패");
    }
    const data = await response.json();
    return data.user;
  },

  handleSocialLogin: async (
    provider: string,
    code: string,
  ): Promise<AuthResponse> => {
    if (!code) {
      throw new Error("Authorization code 찾기 실패.");
    }

    try {
      console.log("백엔드에게 주기 직전 code 형태 : ", code);

      const response = await fetch(
        `${process.env.SERVER_URL}/users/callback/${provider}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            code,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("소셜 로그인 인증 실패");
      }

      const data = await response.json();
      console.log("BE응답 :", data);
      return data;
    } catch (error) {
      console.error("서버 연결 실패", error);
      throw error;
    }
  },

  handleLogout: async (): Promise<void> => {
    const response = await fetch(`${process.env.SERVER_URL}/users/me/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("로그아웃 실패");
    }
  },

  handleWithdraw: async (): Promise<void> => {
    const response = await fetch(
      `${process.env.SERVER_URL}/users/me/withdrawal`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("회원탈퇴 실패");
    }
  },

  profileUpdate: async (nick_name: string, profile_image: string) => {},
};
