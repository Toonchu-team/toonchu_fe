"use client";

import { useEffect } from "react";
import { User } from "@/lib/types/auth";
import useAuthStore from "@/stores/authStore";
import useProfileStore from "@/stores/profileStore";
import ProfileEdit from "./ProfileEdit";
import ProfileDefault from "./ProfileDefault";

export default function Profile() {
  const isEditing = useProfileStore((state) => state.isEditing);

  /* 
  const { user, login } = useAuthStore();

  useEffect(() => {
    if (user) {
      login(user);
    }
  }, [user, login]);
*/
  return <> {isEditing ? <ProfileEdit /> : <ProfileDefault />}</>;
}
