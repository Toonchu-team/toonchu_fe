"use client";

import useProfileStore from "@/stores/profileStore";
import ProfileEdit from "./ProfileEdit";
import ProfileDefault from "./ProfileDefault";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setIsEditing = useProfileStore((state) => state.setIsEditing); // setIsEditing을 가져옴
  const isEditing = useProfileStore((state) => state.isEditing);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }

    return () => {
      setIsEditing(false);
    };
  }, [router, user, setIsEditing]);

  if (!user) {
    return null;
  }

  return (
    <main className="flex flex-col items-center gap-7 pb-10 text-main-text">
      {isEditing ? <ProfileEdit user={user} /> : <ProfileDefault user={user} />}
    </main>
  );
}
