"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/authStore";
import useProfileStore from "@/stores/profileStore";
import ProfileDefault from "./ProfileDefault";
import ProfileEdit from "./ProfileEdit";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const isEditing = useProfileStore((state) => state.isEditing);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <main className="flex flex-col items-center gap-5 text-main-text">
      {isEditing ? <ProfileEdit /> : <ProfileDefault />}
    </main>
  );
}
