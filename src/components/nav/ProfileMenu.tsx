"use client";

import useAuthStore from "@/stores/authStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RefObject, useRef, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, LogInIcon } from "lucide-react";
import useOutsideClick from "@/hooks/useOutsideClick";
import useProfileStore from "@/stores/profileStore";
import { logoutAction } from "@/lib/actions/authActions";

export default function ProfileMenu() {
  const { user, logout } = useAuthStore();
  const setIsEditing = useProfileStore((state) => state.setIsEditing);

  const [isDropdown, setIsDropdown] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    setIsEditing(false);
    router.push("/profile");
  };

  const handleLogout = async () => {
    setIsDropdown(false);
    try {
      await logoutAction();
      logout();
      router.push("/");
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  };

  useOutsideClick({
    ref: dropdownRef as RefObject<HTMLElement>,
    callback: () => setIsDropdown(false),
  });

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
      <p>{nickName}</p>
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
          className="absolute left-16 top-10 w-28 overflow-hidden rounded-md border-[1px] border-main-text bg-white shadow-sm shadow-main-grey"
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
