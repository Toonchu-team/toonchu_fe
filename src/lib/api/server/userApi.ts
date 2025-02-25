import { AuthResponse } from "@/lib/types/auth";
import { cookies } from "next/headers";

const getAccessToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value;
};

const getRefreshToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("refresh_token")?.value;
};

const deleteAuthCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
};

export const userApi = {
  getLoginUser: async () => {
    "use server";
    const access_token = await getAccessToken();

    try {
      const response = await fetch(
        `${process.env.SERVER_URL}/users/me/profile/update/`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("로그인 유저 정보 찾기 실패");
      }

      const data = await response.json();

      return data;
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
        `${process.env.SERVER_URL}/users/login/${provider}/?code=${code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        console.log("Backend error response", response);
        throw new Error("소셜 로그인 인증 실패");
      }

      console.log("로그인 BE응답 :", response);
      const data = await response.json();
      // console.log("BE응답 :", data);
      return data;
    } catch (error) {
      console.error("소셜 로그인 인증 실패 :", error);
      throw new Error("소셜 로그인 인증 실패");
    }
  },

  handleLogout: async (): Promise<void> => {
    "use server";
    const access_token = await getAccessToken();
    const refresh_token = await getRefreshToken();
    console.log("access_token - userApi(handleLogout): ", access_token);
    console.log("refresh_token - userApi(handleLogout): ", refresh_token);

    const response = await fetch(`${process.env.SERVER_URL}/users/me/logout/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token,
      }),
    });

    console.log("response-handleLogout(userApi) :", response);

    if (!response.ok) {
      throw new Error("로그아웃 실패-userAPi");
    }

    deleteAuthCookies(); // 쿠키 삭제
  },

  handleWithdrawal: async (nick_name: string): Promise<void> => {
    "use server";

    const access_token = await getAccessToken();

    const response = await fetch(
      `${process.env.SERVER_URL}/users/me/profile/withdraw/`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input_nick_name: nick_name,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("회원탈퇴 실패");
    }

    deleteAuthCookies(); // 쿠키 삭제
  },

  profileUpdate: async (nick_name: string, profile_image: File | null) => {
    "use server";
    const access_token = await getAccessToken();

    console.log("nick_name: ", nick_name);
    console.log("profile_image 파일 형태: ", profile_image);

    const formData = new FormData();
    formData.append("nick_name", nick_name);

    if (profile_image) {
      formData.append("profile_image", profile_image);
    }

    console.log("formData - userApi.ts: ", formData);

    const response = await fetch(
      `${process.env.SERVER_URL}/users/me/profile/update/`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error("프로필 수정 실패-userApi");
    }

    console.log("프로필 수정 요청시 BE응답: ", response);
  },

  getNewAcessToken: async (): Promise<string> => {
    "use server";
    const refresh_token = await getRefreshToken();

    if (!refresh_token) {
      throw new Error("refresh_token이 없습니다.");
    }

    try {
      const response = await fetch(
        `${process.env.SERVER_URL}/users/token/refresh/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${refresh_token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("새로운 access_token 발급 실패");
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("새로운 access_token 발급 실패-userApi", error);
      throw new Error("새로운 access_token 발급 실패");
    }
  },
};
