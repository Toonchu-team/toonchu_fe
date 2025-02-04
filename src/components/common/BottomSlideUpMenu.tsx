"use client";

import { AnimatePresence, motion } from "framer-motion";
import { JSX, RefObject, useRef } from "react";
import { useLockBodyScroll } from "react-use";
import useOutsideClick from "../../hooks/useOutsideClick";

interface BottomSlideUpMenuProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}
export default function BottomSlideUpMenu({
  children,
  isOpen,
  onClose,
}: BottomSlideUpMenuProps): JSX.Element {
  const menuRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(isOpen);

  useOutsideClick({
    ref: menuRef as RefObject<HTMLElement>,
    callback: onClose,
  });

  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      y: "100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-0 left-0 z-40 flex w-full min-w-[320px] flex-col items-center overflow-hidden rounded-t-2xl border-2 border-b-0 border-bg-yellow-01 bg-white"
          variants={variants}
          initial="closed"
          animate="open"
          exit="closed"
          ref={menuRef}
        >
          <div className="my-6 h-2 w-1/2 rounded-full bg-bg-yellow-01">
            {/* 상단 구분선 */}
          </div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
