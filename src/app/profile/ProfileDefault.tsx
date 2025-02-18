"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import useProfileStore from "@/stores/profileStore";
import { User } from "@/lib/types/auth";
import useAuthStore from "@/stores/authStore";

interface ProfileDefaultProps {
  user: User;
}

export default function ProfileDefault({ user }: ProfileDefaultProps) {
  const logout = useAuthStore((state) => state.logout);
  const setIsEditing = useProfileStore((state) => state.setIsEditing);
  const router = useRouter();

  const profileImage =
    user?.profile_image ?? "/images/brand-character/default-profile.png";

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleWithdrawal = () => {
    router.push("/withdrawal");
  };

  return (
    <>
      <h2 className="page-title">내 프로필</h2>
      <Image
        className="overflow-hidden rounded-full shadow-md"
        src={profileImage}
        alt="프로필 이미지"
        width={130}
        height={130}
      />
      <section className="flex flex-col items-center">
        <h3 className="font-bold">{user.nick_name}</h3>
        <p className="text-xs">({user.email})</p>
        <p className="mt-2 text-xs font-bold">{user.provider}로 로그인 중</p>
      </section>

      <section className="flex flex-col gap-1 bg-white">
        <button
          className="w-60 rounded-md bg-bg-grey-01 py-2 text-sm font-bold hover:bg-bg-yellow-01/60"
          onClick={handleEdit}
        >
          프로필 변경하기
        </button>
        <button
          className="w-60 rounded-md bg-bg-grey-01 py-2 text-sm font-bold hover:bg-bg-yellow-01/60"
          onClick={handleLogout}
        >
          로그아웃
        </button>
        <hr className="w-60" />
        <button
          className="w-60 rounded-md bg-main-grey py-2 text-sm font-bold text-white hover:bg-bg-red-01 hover:text-black"
          onClick={handleWithdrawal}
        >
          회원탈퇴
        </button>
      </section>
    </>
  );
}
