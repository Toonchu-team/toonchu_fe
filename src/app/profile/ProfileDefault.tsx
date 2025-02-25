"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import useProfileStore from "@/stores/profileStore";
import { User } from "@/lib/types/auth";
import useAuthStore from "@/stores/authStore";

interface ProfileDefaultProps {
  user: User;
}

const HIDDEN_NICKNAMES = [
  "코가 짧은 코숏",
  "야비한 아비시니안",
  "하나 둘 샴",
  "렉걸린 렉돌",
  "가깝고도 먼치킨",
  "스코티쉬 플립",
  "손병호게임 숙호티씨 접어",
];

export default function ProfileDefault({ user }: ProfileDefaultProps) {
  const logout = useAuthStore((state) => state.logout);
  const setIsEditing = useProfileStore((state) => state.setIsEditing);
  const router = useRouter();

  const profileImage =
    user?.profile_image ?? "/images/brand-character/default-profile.png";

  const providerImage = {
    kakao: `/images/provider/kakao-logo-bubble.png`,
    google: `/images/provider/google-logo-square.png`,
    naver: `/images/provider/naver-logo-square.png`,
  };

  const providerName = {
    kakao: "카카오",
    google: "구글",
    naver: "네이버",
  };

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

  const providerLogo =
    providerImage[user.provider as keyof typeof providerImage];

  const providerText = providerName[user.provider as keyof typeof providerName];

  const isHiddenNickname = HIDDEN_NICKNAMES.includes(user.nick_name);
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
      <section className="flex flex-col items-center gap-1">
        <h3
          className={`${isHiddenNickname ? "animate-gradient bg-gradient-custom bg-clip-text font-bold text-transparent" : ""}`}
        >
          {user.nick_name}
        </h3>
        <p className="text-xs">({user.email})</p>
        <div
          className={`mt-2 flex h-fit w-fit items-center gap-2 rounded-md border border-main-text px-2 py-1 shadow-md ${
            user.provider === "kakao"
              ? "border-0 bg-kakao-yellow"
              : user.provider === "naver"
                ? "border-0 bg-naver-green text-white"
                : "bg-white"
          }`}
        >
          <Image
            src={providerLogo}
            alt={`${user.provider} 로고`}
            width={20}
            height={20}
            className=""
          />
          <p className="text-xs font-bold">{providerText}로 로그인 중</p>
        </div>
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
