import { getUserAction } from "@/lib/actions/authActions";
import { redirect } from "next/navigation";
import NavClient from "./NavClient";
import { cookies } from "next/headers";
import { userApi } from "@/lib/api/server/userApi";
import { User } from "@/lib/types/auth";

export default async function Nav() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;

  let user: User | null = null;

  if (access_token) {
    try {
      user = await userApi.getLoginUser();
      console.log("user(Nav.tsx): ", user);
    } catch (error) {
      console.error("유저 정보 가져오기 실패:", error);
    }
  }

  console.log(user);

  return <NavClient user={user} />;
}
