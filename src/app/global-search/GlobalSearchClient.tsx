"use client";

import { BreakpointType } from "@/stores/breakptStore";
import useBreakpoint from "@/hooks/useBreakpoint";

export default function GlobalSearchClient({
  initialBreakpoint,
}: {
  initialBreakpoint: BreakpointType;
}) {
  const breakpoint = useBreakpoint(initialBreakpoint);

  return breakpoint == "mobile" ? <></> : <></>;
}
