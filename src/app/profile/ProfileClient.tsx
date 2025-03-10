"use client";

import { User } from "@/lib/types/auth";
import ProfileEdit from "./ProfileEdit";
import ProfileDefault from "./ProfileDefault";
import useProfileStore from "@/stores/profileStore";
import { useEffect } from "react";

interface ProfileClientProps {
  user: User;
}

export default function ProfileClient({ user }: ProfileClientProps) {
  const setIsEditing = useProfileStore((state) => state.setIsEditing);
  const isEditing = useProfileStore((state) => state.isEditing);

  useEffect(() => {
    return () => {
      setIsEditing(false);
    };
  }, [user, setIsEditing]);

  return (
    <main className="flex flex-col items-center gap-7 pb-10 text-main-text">
      {isEditing ? <ProfileEdit user={user} /> : <ProfileDefault user={user} />}
    </main>
  );
}
