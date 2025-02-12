"use client";

import useBreakpoint from "@/hooks/useBreakpoint";
import { BreakpointType } from "@/stores/breakptStore";
import MainMobile from "./MainMobile";
import MainDesktop from "./MainDesktop";

export default function MainClient({
  initialBreakpoint,
}: {
  initialBreakpoint: BreakpointType;
}) {
  const breakpoint = useBreakpoint(initialBreakpoint);

  return breakpoint == "mobile" ? (
    <MainMobile initialBreakpoint={initialBreakpoint} />
  ) : (
    <MainDesktop initialBreakpoint={initialBreakpoint} />
  );
}
