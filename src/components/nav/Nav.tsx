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
      <nav className="flex h-[60px] w-full items-center justify-center"></nav>
    );
  }

  return (
    <>
      {currentBreakpoint === "desktop" ? <DesktopNav /> : <MobileTabletNav />}
    </>
  );
}
