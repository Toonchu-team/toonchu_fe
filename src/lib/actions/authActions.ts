"use server";

import { userApi } from "@/lib/api/server/userApi";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();

  try {
    const access_token = cookieStore.get("access_token")?.value;
    if (access_token) {
      await userApi.handleLogout(access_token);
    }
  } catch (error) {
    console.error("Logout API error:", error);
  } finally {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    revalidatePath("/");
    redirect("/login");
  }
}
