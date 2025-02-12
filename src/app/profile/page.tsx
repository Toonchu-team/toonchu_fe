import { userApi } from "@/lib/api/server/userApi";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const user = await userApi.getLoginUser();

  return <ProfileClient initialUser={user} />;
}
