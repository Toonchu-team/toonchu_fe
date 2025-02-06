"use client";

import { useMediaQuery } from "react-responsive";

interface ResponsiveValues {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const useResponsive = (): ResponsiveValues => {
  const desktop = useMediaQuery({ query: "(min-width: 1025px)" });
  const tablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 1024px)",
  });
  const mobile = useMediaQuery({ query: "(max-width: 768px)" });

  return {
    isDesktop: desktop,
    isTablet: tablet,
    isMobile: mobile,
  };
};

export default useResponsive;
