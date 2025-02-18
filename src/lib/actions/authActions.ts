"use server";
import { userApi } from "@/lib/api/server/userApi";
import { revalidatePath } from "next/cache";

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
  } catch (error: any) {
    console.error("Profile update error:", error);
    throw new Error(error.message || "프로필 업데이트 실패");
  }
}
