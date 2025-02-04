"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  path: string;
  linkText: string;
}

export default function NavItem({ path, linkText }: NavItemProps) {
  const currentPath = usePathname();
  return (
    <li className={`nav-item ${currentPath === path && "bg-bg-yellow-01/60"}`}>
      <Link href={path}>{linkText}</Link>
    </li>
  );
}
