"use client";

import MobileTabletNav from "./views/MobileTabletNav";
import DesktopNav from "./views/DesktopNav";
import useBreakpoint from "@/hooks/useBreakpoint";
import { BreakpointType } from "@/stores/breakptStore";

export default function NavClient({
  initialBreakpoint,
}: {
  initialBreakpoint: BreakpointType;
}) {
  const currentBreakpoint = useBreakpoint(initialBreakpoint);

  return currentBreakpoint === "desktop" ? <DesktopNav /> : <MobileTabletNav />;
}
