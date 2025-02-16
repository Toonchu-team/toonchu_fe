"use client";

import useBreakpoint from "@/hooks/useBreakpoint";
import SearchBarMobile from "./SearchBarMobile";
import SearchBar from "./SearchBar";

export default function ResponsiveSearchBar() {
  const breakpoint = useBreakpoint();

  return breakpoint == "mobile" ? <SearchBarMobile /> : <SearchBar />;
}
