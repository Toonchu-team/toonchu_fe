"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import useAuthStore from "@/stores/authStore";
import useProfileStore from "@/stores/profileStore";
import { User } from "@/lib/types/auth";

export default function ProfileDefault() {
  const setIsEditing = useProfileStore((state) => state.setIsEditing);
  const router = useRouter();
  /*
  const user = useAuthStore((state) => state.user);

  // /profile/page.tsx에서 Protected Route로 처리 예정
  if (!user) {
    router.push("/login");
    return;
  }
*/
  const user: User = {
    id: 111,
    nick_name: "test-user",
    email: "test-user@gmail.com",
    profile_image: "/images/brand-character/default-profile.png",
    provider: "kakao",
  };

  const profileImage =
    user?.profile_image ?? "/images/brand-character/default-profile.png";

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleLogout = () => {
    // 로그아웃 처리 로직
  };

  const handleWithdraw = () => {
    router.push("/withdrawal");
    // 회원탈퇴 처리 로직
  };

  return (
    <main className="flex flex-col items-center gap-7 pb-10 text-main-text">
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
          onClick={handleWithdraw}
        >
          회원탈퇴
        </button>
      </section>
    </main>
  );
}
