"use client";

import { useEffect } from "react";
import useAuthStore from "@/stores/authStore";
import { BreakpointType, useBreakpointStore } from "@/stores/breakptStore";
import { User } from "@/lib/types/auth";

export default function AppInitializer({
  children,
  initialUser,
  initialBreakpoint,
}: {
  children: React.ReactNode;
  initialUser: User | null;
  initialBreakpoint: BreakpointType | null;
}) {
  const login = useAuthStore((state) => state.login);
  const setBreakpoint = useBreakpointStore((state) => state.setBreakpoint);

  useEffect(() => {
    if (initialUser) {
      login(initialUser);
    }

    if (initialBreakpoint) {
      setBreakpoint(initialBreakpoint);
    }
  }, [login, setBreakpoint, initialUser, initialBreakpoint]);

  return <>{children}</>;
}
