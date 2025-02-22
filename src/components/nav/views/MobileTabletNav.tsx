"use client";

import useAuthStore from "@/stores/authStore";
import { AlignJustifyIcon, LogInIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BottomSlideUpMenu from "@/components/common/BottomSlideUpMenu";
import useProfileStore from "@/stores/profileStore";
import TagDropdownMobile from "@/components/tagDropdown/TagDropdownMobile";

export default function MobileTabletNav() {
  const user = useAuthStore((state) => state.user);
  const setIsEditing = useProfileStore((state) => state.setIsEditing);

  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  const thumbnailImage =
    (user && user.profile_image) ||
    "/images/brand-character/default-profile.png";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = (e: React.MouseEvent) => {
    console.log(e); // 디버깅용
    setIsMenuOpen(!isMenuOpen);
  };

  const [tagMenuIsOpen, setTagMenuIsOpen] = useState<boolean>(false);
  const closeTagMenu = () => {
    setTagMenuIsOpen(false);
  };

  return (
    <>
      <BottomSlideUpMenu isOpen={tagMenuIsOpen} onClose={closeTagMenu}>
        <TagDropdownMobile />
      </BottomSlideUpMenu>
      <nav className="flex h-[60px] w-full items-center justify-between gap-7 px-4 font-bold text-main-text md:px-8">
        <button onClick={toggleMenu} className="flex items-center">
          <AlignJustifyIcon
            size={24}
            className="cursor-pointer hover:text-main-yellow"
          />
        </button>
        <h1>
          <Link href={"/"}>
            <Image
              src="/images/logo/logo-eng.png"
              alt="툰츄 로고 이미지"
              width={150}
              height={60}
            />
          </Link>
        </h1>
        {user ? (
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
        ) : (
          <Link href="/login">
            <LogInIcon
              size={24}
              className={`${isLoginPage ? "text-main-yellow" : ""} cursor-pointer hover:text-main-yellow`}
            />
          </Link>
        )}
      </nav>
      <BottomSlideUpMenu isOpen={isMenuOpen} onClose={closeMenu}>
        <ul className="flex w-full flex-col pb-6 font-bold text-main-text">
          <li onClick={() => setIsMenuOpen(false)}>
            <Link
              href="/tag-search"
              className="flex h-4 w-full cursor-pointer items-center justify-center border-b-2 border-bg-yellow-01 py-6 hover:bg-bg-yellow-01/60"
              onClick={() => setTagMenuIsOpen(true)}
            >
              태그별 검색
            </Link>
          </li>
          <li onClick={() => setIsMenuOpen(false)}>
            <Link
              href="/day-search"
              className="flex h-4 w-full cursor-pointer items-center justify-center border-b-2 border-bg-yellow-01 py-6 hover:bg-bg-yellow-01/60"
            >
              연재별 검색
            </Link>
          </li>
          <li onClick={() => setIsMenuOpen(false)}>
            <Link
              href="/my-box"
              className="flex h-4 w-full cursor-pointer items-center justify-center py-6 hover:bg-bg-yellow-01/60"
            >
              내 상자
            </Link>
          </li>
        </ul>
      </BottomSlideUpMenu>
    </>
  );
}
