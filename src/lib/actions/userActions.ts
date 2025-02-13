"use server";

import { cookies } from "next/headers";
import { userApi } from "@/lib/api/server/userApi";
import { User } from "@/lib/types/auth";

export async function getUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;

  try {
    const user = await userApi.getLoginUser(access_token);
    return user;
  } catch (error) {
    console.error("Failed to get user:", error);
    return null;
  }
}
