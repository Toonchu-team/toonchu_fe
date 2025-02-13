"use server";

import { breakpointDetect } from "@/lib/utils/breakpointDetect";

export async function getInitialBreakpoint() {
  try {
    const breakpoint = await breakpointDetect();
    return breakpoint;
  } catch (error) {
    console.error("Failed to detect breakpoint:", error);
    return "mobile";
  }
}
