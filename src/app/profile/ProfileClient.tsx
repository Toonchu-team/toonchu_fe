"use client";

import useAuthStore from "@/stores/authStore";
import Image from "next/image";
import { useState } from "react";

export default function ProfileClient() {
  const user = useAuthStore((state) => state.user);

  console.log(user);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleLogout = () => {
    // 로그아웃 처리 로직
  };

  const handleDeleteAccount = () => {
    // 회원탈퇴 처리 로직
  };

  return (
    <div>
      {user && (
        <div>
          <Image
            src={user.profile_image}
            alt="프로필 이미지"
            width={100}
            height={100}
          />
          <h2>{user.nick_name}</h2>
          <p>{user.email}</p>
        </div>
      )}

      {isEditing ? (
        <div>프로필 편집 UI 컴포넌트</div>
      ) : (
        <>
          <button onClick={handleEdit}>프로필 변경하기</button>
          <button onClick={handleLogout}>로그아웃</button>
          <button onClick={handleDeleteAccount}>회원탈퇴</button>
        </>
      )}
    </div>
  );
}
