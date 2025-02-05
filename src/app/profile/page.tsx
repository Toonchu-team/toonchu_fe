"use client";

import useAuthStore from "@/stores/authStore";
import { useState } from "react";
import ProfileDefault from "./ProfileDefault";
import { useRouter } from "next/navigation";
import ProfileEdit from "./ProfileEdit";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  if (!user) {
    router.push("/login");
    return;
  }

  return (
    <main className="flex flex-col items-center gap-5 text-main-text">
      {isEditing ? (
        <ProfileEdit isEditing={isEditing} setIsEditing={setIsEditing} />
      ) : (
        <ProfileDefault isEditing={isEditing} setIsEditing={setIsEditing} />
      )}
    </main>
  );
}
