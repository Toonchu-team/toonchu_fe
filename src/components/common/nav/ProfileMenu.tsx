"use client";

import useAuthStore from "@/stores/authStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, LogInIcon } from "lucide-react";

export default function ProfileMenu() {
  const { user, login, logout } = useAuthStore();
  const [isDropdown, setIsDropdown] = useState(false);
  const router = useRouter();

  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  const nickName = user ? user.nick_name : "닉네임을 설정해주세요.";
  const thumbnailImage =
    (user && user.profile_image) ||
    "/images/brand-character/default-profile.png";

  const handleDropdown = () => {
    setIsDropdown((prev) => !prev);
  };

  const handleClickProfile = () => {
    setIsDropdown(false);
    router.push("/profile");
  };

  return user ? (
    <div className="relative flex items-center gap-2">
      <Link href="/profile" className="flex items-center">
        <Image
          src={thumbnailImage}
          alt="내 프로필 이미지"
          className="h-8 w-8 rounded-full"
          width={32}
          height={32}
        />
      </Link>
      <span>{nickName}</span>
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
        <div className="absolute left-16 top-10 w-28 overflow-hidden rounded-md border-[1px] border-main-text shadow-sm shadow-main-grey">
          <button
            onClick={handleClickProfile}
            className="flex h-10 w-full cursor-pointer items-center justify-center hover:bg-bg-yellow-01/60"
          >
            프로필
          </button>
          <p className="flex h-10 w-full cursor-pointer items-center justify-center hover:bg-bg-yellow-01/60">
            로그아웃
          </p>
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
