"use client";

import Link from "next/link";
import ProfileMenu from "../ProfileMenu";
import { usePathname } from "next/navigation";
import { RefObject, useRef, useState } from "react";
import TagDropdown from "@/components/tagDropdown/TagDropdown";
import useOutsideClick from "@/hooks/useOutsideClick";

export default function DesktopNav() {
  const currentPath = usePathname();
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
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
          <Link
            href={"/"}
            className="h-[60px] bg-gradient-to-r from-main-grey to-main-yellow bg-clip-text font-lemonada text-3xl text-transparent"
          >
            Toonchu
          </Link>
        </h1>
        <ul className="flex h-full flex-1">
          <li
            className={`nav-item ${currentPath === "/tag-search" && "bg-bg-yellow-01/60"}`}
            onClick={() => setOpenDropdown(true)}
          >
            <Link href="/tag-search">태그별 검색</Link>
          </li>
          <li
            className={`nav-item ${currentPath === "/day-search" && "bg-bg-yellow-01/60"}`}
          >
            <Link href="/day-search">연재별 검색</Link>
          </li>
          <li
            className={`nav-item ${currentPath === "/my-box" && "bg-bg-yellow-01/60"}`}
          >
            <Link href="/my-box">내 상자</Link>
          </li>
        </ul>
        <ProfileMenu />
      </nav>
    </>
  );
}
