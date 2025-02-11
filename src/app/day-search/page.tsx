"use client";

import { BreakpointType } from "@/stores/breakptStore";
import useBreakpoint from "@/hooks/useBreakpoint";
import DaySearchMobile from "./DaySearchMobile";
import DaySearchDesktop from "./DaySearchDesktop";

export default function TagSearch({
  initialBreakpoint,
}: {
  initialBreakpoint: BreakpointType;
}) {
  const breakpoint = useBreakpoint(initialBreakpoint);

  return breakpoint == "mobile" ? <DaySearchMobile /> : <DaySearchDesktop />;
}
