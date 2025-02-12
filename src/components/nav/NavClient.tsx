"use client";

import MobileTabletNav from "./views/MobileTabletNav";
import DesktopNav from "./views/DesktopNav";
import useBreakpoint from "@/hooks/useBreakpoint";
import { BreakpointType } from "@/stores/breakptStore";
import { User } from "@/lib/types/auth";
import useAuthStore from "@/stores/authStore";
import { useEffect } from "react";

export default function NavClient({
  initialBreakpoint,
  user,
}: {
  initialBreakpoint: BreakpointType;
  user: User;
}) {
  const breakpoint = useBreakpoint(initialBreakpoint);
  const { login } = useAuthStore();

  useEffect(() => {
    if (user) {
      login(user);
    }
  }, [user, login]);

  return breakpoint !== "desktop" ? <MobileTabletNav /> : <DesktopNav />;
}
