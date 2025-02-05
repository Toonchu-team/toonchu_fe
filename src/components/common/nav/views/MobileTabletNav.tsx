"use client";

import useResponsive from "@/hooks/useResponsive";
import useAuthStore from "@/stores/authStore";
import { AlignJustifyIcon, LogInIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BottomSlideUpMenu from "../../BottomSlideUpMenu";

export default function MobileTabletNav() {
  const [padding, setPadding] = useState("px-4");
  const { user } = useAuthStore();
  const { isTablet } = useResponsive();

  useEffect(() => {
    setPadding(isTablet ? "px-8" : "px-4");
  }, [isTablet]);

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
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav
        className={`${padding} flex h-[60px] w-full items-center justify-between gap-7 px-4 font-bold text-main-text`}
      >
        <button onClick={toggleMenu} className="flex items-center">
          <AlignJustifyIcon
            size={24}
            className="cursor-pointer hover:text-main-yellow"
          />
        </button>
        <h1>
          <Link
            href={"/"}
            className="h-[60px] bg-gradient-to-r from-main-grey to-main-yellow bg-clip-text font-lemonada text-xl text-transparent"
          >
            Toonchu
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
