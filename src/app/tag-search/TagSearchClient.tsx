"use client";

import TagSearchMobile from "./TagSearchMobile";
import TagSearchDesktop from "./TagSearchDesktop";
import { BreakpointType } from "@/stores/breakptStore";
import useBreakpoint from "@/hooks/useBreakpoint";

export default function TagSearchClient({
  initialBreakpoint,
}: {
  initialBreakpoint: BreakpointType;
}) {
  const breakpoint = useBreakpoint(initialBreakpoint);

  return breakpoint == "mobile" ? <TagSearchMobile /> : <TagSearchDesktop />;
}
