"use client";

import useBreakpoint from "@/hooks/useBreakpoint";
import { BreakpointType } from "@/stores/breakptStore";
import SearchBarMobile from "./SearchBarMobile";
import SearchBar from "./SearchBar";

export default function ResponsiveSearchBar({
  initialBreakpoint,
}: {
  initialBreakpoint: BreakpointType;
}) {
  const breakpoint = useBreakpoint(initialBreakpoint);

  return breakpoint == "mobile" ? <SearchBarMobile /> : <SearchBar />;
}
