"use client";

import MobileTabletNav from "./views/MobileTabletNav";
import DesktopNav from "./views/DesktopNav";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Nav() {
  const [isBpSet, setIsBpSet] = useState(false);
  const currentBreakpoint = useBreakpoint();

  useEffect(() => {
    if (currentBreakpoint) {
      setIsBpSet(true);
    }
  }, [currentBreakpoint]);

  if (!isBpSet) {
    return (
      <nav className="flex h-[60px] w-full items-center justify-center">
        <h1>
          <Image
            src="/images/logo/logo-eng.png"
            alt="툰츄 로고 이미지"
            width={150}
            height={56}
          />
        </h1>
      </nav>
    );
  }

  return (
    <>
      {currentBreakpoint === "desktop" ? <DesktopNav /> : <MobileTabletNav />}
    </>
  );
}
