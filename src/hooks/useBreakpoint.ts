"use client";

import { useState, useEffect } from "react";
import { BreakpointType } from "@/stores/breakptStore";

function useBreakpoint(): BreakpointType {
  const [breakpoint, setBreakpoint] = useState<BreakpointType>("mobile");

  useEffect(() => {
    const handleResize = () => {
      let newBreakpoint: BreakpointType;

      if (window.innerWidth < 768) {
        newBreakpoint = "mobile";
      } else if (window.innerWidth < 1024) {
        newBreakpoint = "tablet";
      } else {
        newBreakpoint = "desktop";
      }

      if (newBreakpoint !== breakpoint) {
        setBreakpoint(newBreakpoint);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return breakpoint;
}

export default useBreakpoint;
