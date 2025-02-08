import { AuthResponse } from "@/lib/types/auth";

export const userApi = {
  getLoginUser: async (user_id: number) => {
    const response = await fetch(`api/users/${user_id}`);
    if (!response.ok) {
      throw new Error("로그인 정보를 가져오지 못했습니다.");
    }
    const data = await response.json();
    return data.user;
  },

  handleSocialLogin: async (
    provider: string,
    code: string,
  ): Promise<AuthResponse> => {
    if (!code) {
      throw new Error("Authorization code를 찾을 수 없습니다.");
    }

    try {
      const response = await fetch(
        `${process.env.SERVER_URL}/users/oauth/${provider}/callback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            code,
            provider,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("인증에 실패하였습니다. - / lib/api/server/userApi.ts");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Social login error:", error);
      throw error;
    }
  },

  handleLogout: async (): Promise<void> => {
    const response = await fetch(`${process.env.SERVER_URL}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("로그아웃에 실패했습니다.");
    }
  },

  profileUpdate: async (nick_name: string, profile_image: string) => {},
};
