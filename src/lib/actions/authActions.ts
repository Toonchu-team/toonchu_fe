"use server";
import { userApi } from "@/lib/api/server/userApi";
import { revalidatePath } from "next/cache";

export async function getUserAction() {
  try {
    const userData = await userApi.getLoginUser();

    if (!userData) {
      return null;
    }

    return userData.user;
  } catch (error) {
    console.error("Get user error:", error);
    throw new Error("사용자 정보 가져오기 실패");
  }
}

export async function logoutAction() {
  try {
    await userApi.handleLogout();
    revalidatePath("/");
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("로그아웃 실패-logoutAction");
  }
}

export async function withdrawalAction(nick_name: string) {
  try {
    await userApi.handleWithdrawal(nick_name);
    revalidatePath("/");
  } catch (error) {
    console.error("Withdrawal error:", error);
    throw new Error("회원탈퇴 실패");
  }
}

export async function profileUpdateAction(
  nick_name: string,
  profile_image: File | null,
): Promise<void> {
  try {
    await userApi.profileUpdate(nick_name, profile_image);
    revalidatePath("/");
  } catch (error) {
    console.error("Profile update error:", error);
    throw new Error("프로필 업데이트 실패");
  }
}

export async function testATAPI() {
  try {
    const response = await userApi.getNewAcessToken();
    if (!response) {
      throw new Error("새로운 access_token 발급 실패 - authAction");
    }
    return response;
  } catch (error) {
    console.error("ACCESS TOKEN 갱신 API 오류 - authAction", error);
  }
}
