"use client";

import { useMediaQuery } from "react-responsive";

interface ResponsiveOptions {
  isDesktop?: string;
  isTablet?: string;
  isMobile?: string;
}

interface ResponsiveValues {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const useResponsive = (options: ResponsiveOptions = {}): ResponsiveValues => {
  const {
    isDesktop = "(min-width: 1025px)",
    isTablet = "(min-width: 769px) and (max-width: 1024px)",
    isMobile = "(max-width: 768px)",
  } = options;

  const desktop = useMediaQuery({ query: isDesktop });
  const tablet = useMediaQuery({ query: isTablet });
  const mobile = useMediaQuery({ query: isMobile });

  return {
    isDesktop: desktop,
    isTablet: tablet,
    isMobile: mobile,
  };
};

export default useResponsive;
