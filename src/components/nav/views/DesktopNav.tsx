"use client";

import Link from "next/link";
import ProfileMenu from "../ProfileMenu";
import { usePathname } from "next/navigation";
import { RefObject, useEffect, useRef, useState } from "react";
import TagDropdown from "@/components/tagDropdown/TagDropdown";
import useOutsideClick from "@/hooks/useOutsideClick";
import Image from "next/image";
import useAuthStore from "@/stores/authStore";

export default  function DesktopNav() {
  const user = useAuthStore((state) => state.user);
  const currentPath = usePathname();
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  useEffect(() => {
    if (openDropdown) {
      document.body.style.overflow = "hidden"; // 스크롤 방지
      document.body.style.position = "fixed"; // iOS 대응
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "auto"; // 스크롤 복원
      document.body.style.position = "static";
    }

    return () => {
      document.body.style.overflow = "auto"; // 컴포넌트 언마운트 시 복원
      document.body.style.position = "static";
    };
  }, [openDropdown]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: dropdownRef as RefObject<HTMLElement>,
    callback: () => setOpenDropdown(false),
  });

  return (
    <>
      {openDropdown && (
        <div ref={dropdownRef}>
          <TagDropdown setOpenDropdown={setOpenDropdown} />
        </div>
      )}
      <nav className="flex h-[60px] w-full items-center justify-between gap-7 px-10 font-bold text-main-text">
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
        <ul className="flex h-full flex-1">
          <li
            className={`nav-item ${currentPath === "/tag-search" && "bg-bg-yellow-01/60"}`}
            onClick={() => setOpenDropdown(true)}
          >
            <Link
              href="/tag-search"
              className="flex h-full w-full items-center px-7"
            >
              태그별 검색
            </Link>
          </li>
          <li
            className={`nav-item ${currentPath === "/day-search" && "bg-bg-yellow-01/60"}`}
          >
            <Link
              href="/day-search"
              className="flex h-full w-full items-center px-7"
            >
              연재별 검색
            </Link>
          </li>
          <li
            className={`nav-item ${currentPath === "/my-box" && "bg-bg-yellow-01/60"}`}
          >
            <Link
              href="/my-box"
              className="flex h-full w-full items-center px-7"
            >
              내 상자
            </Link>
          </li>
        </ul>
        <ProfileMenu user={user || null} />
      </nav>
    </>
  );
}
