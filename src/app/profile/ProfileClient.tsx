"use client";

import { User } from "@/lib/types/auth";
import ProfileEdit from "./ProfileEdit";
import ProfileDefault from "./ProfileDefault";
import useProfileStore from "@/stores/profileStore";
import { useEffect } from "react";

interface ProfileClientProps {
  userData: User;
}

export default function ProfileClient({ userData }: ProfileClientProps) {
  const setIsEditing = useProfileStore((state) => state.setIsEditing);
  const isEditing = useProfileStore((state) => state.isEditing);

  useEffect(() => {
    console.log("여기", userData);
    return () => {
      setIsEditing(false);
    };
  }, [userData, setIsEditing]);

  return (
    <main className="flex flex-col items-center gap-7 pb-10 text-main-text">
      {isEditing ? (
        <ProfileEdit user={userData} />
      ) : (
        <ProfileDefault user={userData} />
      )}
    </main>
  );
}
