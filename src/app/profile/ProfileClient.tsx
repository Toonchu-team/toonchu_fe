"use client";

import { User } from "@/lib/types/auth";
import useAuthStore from "@/stores/authStore";
import useProfileStore from "@/stores/profileStore";
import { useEffect } from "react";
import ProfileEdit from "./ProfileEdit";
import ProfileDefault from "./ProfileDefault";

export default function ProfileClient({
  initialUser,
}: {
  initialUser: User | null;
}) {
  const { login } = useAuthStore();
  const isEditing = useProfileStore((state) => state.isEditing);

  useEffect(() => {
    if (initialUser) {
      login(initialUser);
    }
  }, [initialUser, login]);

  return (
    <main className="flex flex-col items-center gap-7 pb-10 text-main-text">
      {isEditing ? <ProfileEdit /> : <ProfileDefault />}
    </main>
  );
}
