import { AuthResponse, User } from "@/lib/types/auth";

export const userApi = {
  getLoginUser: async (access_token: string | undefined) => {
    "use server";
    if (!access_token) {
      return null;
    }

    try {
      const response = await fetch(
        `${process.env.SERVER_URL}/users/me/profile/`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          console.warn("인증 실패: access_token이 유효하지 않음");
          return null;
        }
        throw new Error("로그인 유저 정보 찾기 실패");
      }

      const data = await response.json();
      console.log("data.user :", data.user);
      return data.user as User;
    } catch (error) {
      console.error("getLoginUser 오류:", error);
      return null;
    }
  },

  handleSocialLogin: async (
    provider: string,
    code: string,
  ): Promise<AuthResponse> => {
    "use server";
    if (!code) {
      throw new Error("Authorization code 찾기 실패.");
    }

    try {
      console.log("백엔드에게 주기 직전 code 형태 : ", code);

      const response = await fetch(
        `${process.env.SERVER_URL}/users/login/${provider}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Backend error response:", errorData);
        throw new Error("소셜 로그인 인증 실패");
      }

      const data = await response.json();
      console.log("BE응답 :", data);
      return data;
    } catch (error) {
      console.error("소셜 로그인 인증 실패 :", error);
      throw new Error("소셜 로그인 인증 실패");
    }
  },

  handleLogout: async (access_token: string | undefined): Promise<void> => {
    "use server";
    const response = await fetch(`${process.env.SERVER_URL}/users/me/logout/`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error("로그아웃 실패");
    }
  },

  handleWithdraw: async (
    nick_name: string,
    access_token: string | undefined,
  ): Promise<void> => {
    "use server";
    const response = await fetch(
      `${process.env.SERVER_URL}/users/me/withdrawal/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nick_name,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("회원탈퇴 실패");
    }
  },

  profileUpdate: async (
    nick_name: string,
    profile_image: string,
    access_token: string | undefined,
  ) => {
    "use server";
    const response = await fetch(
      `${process.env.SERVER_URL}/users/me/profile/update/`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nick_name,
          profile_image,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("프로필 수정 실패");
    }
  },
};
