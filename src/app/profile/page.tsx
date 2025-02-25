import { getUserAction } from "@/lib/actions/authActions";
import ProfileClient from "./ProfileClient";
import { redirect } from "next/navigation";

export default async function Profile() {
  const user = await getUserAction();

  if (!user) {
    redirect("/");
  }

  return <ProfileClient user={user} />;
}
