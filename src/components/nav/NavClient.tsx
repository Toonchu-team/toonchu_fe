"use client";

import MobileTabletNav from "./views/MobileTabletNav";
import DesktopNav from "./views/DesktopNav";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useState, useEffect } from "react";
import { User } from "@/lib/types/auth";

export default function NavClient({ user }: { user: User | null }) {
  const [isBpSet, setIsBpSet] = useState(false);
  const currentBreakpoint = useBreakpoint();
  const [currentUser, setCurrentUser] = useState<User | null>(user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

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
      {currentBreakpoint === "desktop" ? (
        <DesktopNav user={currentUser} />
      ) : (
        <MobileTabletNav user={currentUser} />
      )}
    </>
  );
}
