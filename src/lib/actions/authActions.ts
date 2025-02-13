"use server";

import { userApi } from "@/lib/api/server/userApi";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;

  try {
    await userApi.handleLogout(access_token);
    cookieStore.delete("access_token");
    revalidatePath("/");
    redirect("/login");
  } catch (error) {
    console.error("로그아웃 에러:", error);
    throw new Error("로그아웃 실패");
  }
}
