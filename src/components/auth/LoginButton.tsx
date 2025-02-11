import React, { ReactNode } from "react";

interface LoginButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

export default function LoginButton({
  children,
  onClick,
  className,
}: LoginButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} flex h-14 w-1/5 min-w-64 items-center justify-center gap-3 rounded-md border-[1px] shadow-md`}
    >
      {children}
    </button>
  );
}
