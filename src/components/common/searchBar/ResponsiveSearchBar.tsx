"use client";

import useBreakpoint from "@/hooks/useBreakpoint";
import SearchBarMobile from "./SearchBarMobile";
import SearchBar from "./SearchBar";

export default function ResponsiveSearchBar({ type }: { type: string }) {
  const breakpoint = useBreakpoint();

  return breakpoint == "mobile" ? (
    <SearchBarMobile type={type} />
  ) : (
    <SearchBar type={type} />
  );
}
