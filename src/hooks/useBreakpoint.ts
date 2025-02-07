"use client";

import { useState, useEffect } from "react";
import { BreakpointType } from "@/stores/breakptStore";

function getBreakpoint(): BreakpointType {
  const width = window.innerWidth;
  if (width <= 768) {
    return "mobile";
  } else if (width <= 1024) {
    return "tablet";
  } else {
    return "desktop";
  }
}

export default function useBreakpoint(initialBreakpoint?: BreakpointType) {
  const [breakpoint, setBreakpoint] = useState<BreakpointType>(
    initialBreakpoint ?? getBreakpoint(),
  );

  useEffect(() => {
    const checkBreakpoint = () => {
      setBreakpoint(getBreakpoint());
    };

    window.addEventListener("resize", checkBreakpoint);

    return () => {
      window.removeEventListener("resize", checkBreakpoint);
    };
  }, []);

  return breakpoint;
}
