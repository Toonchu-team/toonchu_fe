"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import { ReactNode, RefObject, useEffect, useRef } from "react";
import { useLockBodyScroll } from "react-use";

interface ModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ModalContainer({
  isOpen,
  onClose,
  children,
}: ModalContainerProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(isOpen);

  useOutsideClick({
    ref: modalRef as RefObject<HTMLElement>,
    callback: onClose,
  });

  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-main-grey/80">
          <div
            className="flex h-fit w-fit min-w-80 flex-col items-start justify-center gap-6 overflow-hidden rounded-md bg-white font-bold text-main-text shadow-lg"
            ref={modalRef}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}
