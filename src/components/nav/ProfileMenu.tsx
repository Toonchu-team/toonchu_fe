"use client";

import useAuthStore from "@/stores/authStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RefObject, useEffect, useRef, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, LogInIcon } from "lucide-react";
import useOutsideClick from "@/hooks/useOutsideClick";
import useProfileStore from "@/stores/profileStore";
import { User } from "@/lib/types/auth";

const HIDDEN_NICKNAMES = [
  "코가 짧은 코숏",
  "야비한 아비시니안",
  "하나 둘 샴",
  "렉걸린 렉돌",
  "가깝고도 먼치킨",
  "스코티쉬 플립",
  "손병호게임 숙호티씨 접어",
];

export default function ProfileMenu({ user }: { user: User | null }) {
  const { logout } = useAuthStore();

  const setIsEditing = useProfileStore((state) => state.setIsEditing);

  const [isDropdown, setIsDropdown] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  const nickName = user?.nick_name || "";
  const isHiddenNickname = HIDDEN_NICKNAMES.includes(nickName); // 히든 닉네임일 경우 CSS 효과 처리

  const thumbnailImage =
    (user && user.profile_image) ||
    "/images/brand-character/default-profile.png";

  const handleDropdown = () => {
    setIsDropdown((prev) => !prev);
  };

  const handleClickProfile = () => {
    setIsDropdown(false);
    setIsEditing(false);
    router.push("/profile");
  };

  const handleLogout = () => {
    setIsDropdown(false);
    logout();
    router.push("/");
  };

  useOutsideClick({
    ref: dropdownRef as RefObject<HTMLElement>,
    callback: () => setIsDropdown(false),
  });

  useEffect(() => {}, [user]); // user 상태가 변경될 때마다 리렌더링

  return user ? (
    <div className="relative flex items-center gap-2">
      <Link href="/profile" className="flex items-center">
        <Image
          src={thumbnailImage}
          alt="내 프로필 이미지"
          className="h-8 w-8 rounded-full"
          width={32}
          height={32}
          onClick={() => setIsEditing(false)}
        />
      </Link>
      <p
        className={`${isHiddenNickname ? "animate-gradient bg-gradient-custom bg-clip-text text-transparent" : ""}`}
      >
        {nickName}
      </p>
      <button onClick={handleDropdown}>
        {isDropdown ? (
          <ChevronUpIcon
            size={32}
            className="cursor-pointer rounded-md border-[1px] border-bg-yellow-01 bg-bg-yellow-01/60 p-1"
          />
        ) : (
          <ChevronDownIcon
            size={32}
            className="cursor-pointer rounded-md border-[1px] border-transparent p-1 hover:border-bg-yellow-01 hover:bg-bg-yellow-01/60"
          />
        )}
      </button>
      {isDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-10 w-28 overflow-hidden rounded-md border-[1px] border-main-text bg-white shadow-sm shadow-main-grey"
        >
          <button
            onClick={handleClickProfile}
            className="flex h-10 w-full cursor-pointer items-center justify-center hover:bg-bg-yellow-01/60"
          >
            프로필
          </button>
          <button
            onClick={handleLogout}
            className="flex h-10 w-full cursor-pointer items-center justify-center hover:bg-bg-yellow-01/60"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  ) : (
    <Link
      href="/login"
      className={`${
        isLoginPage
          ? "border-main-yellow bg-bg-yellow-01/60"
          : "border-transparent hover:border-main-yellow hover:bg-bg-yellow-01/60"
      } flex flex-shrink-0 items-center gap-2 rounded-lg border-[1px] border-main-yellow px-3 py-2`}
    >
      <p>로그인</p>
      <LogInIcon size={24} />
    </Link>
  );
}
