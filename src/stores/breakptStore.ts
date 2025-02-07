import { create } from "zustand";

export type BreakpointType = "mobile" | "tablet" | "desktop";

interface BreakpointStore {
  breakpoint: BreakpointType;
  isInitialized: boolean;
  setBreakpoint: (newBreakpoint: BreakpointType) => void;
  setIsInitialized: (isInitialized: boolean) => void;
}

export const useBreakpointStore = create<BreakpointStore>((set) => ({
  breakpoint: "mobile",
  isInitialized: false,
  setBreakpoint: (newBreakpoint) => set({ breakpoint: newBreakpoint }),
  setIsInitialized: (isInitialized) => set({ isInitialized }),
}));
