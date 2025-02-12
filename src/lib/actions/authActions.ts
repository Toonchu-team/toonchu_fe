"use server";
import { userApi } from "@/lib/api/server/userApi";
import { revalidatePath } from "next/cache";

export async function logoutAction() {
  try {
    await userApi.handleLogout();
    revalidatePath("/");
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("로그아웃 실패");
  }
}
