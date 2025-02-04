import React from "react";

const STATUS_MAP = {
  PENDING: { label: "등록 대기", bgColor: "bg-[#FFD695]" },
  REGISTERED: { label: "등록 완료", bgColor: "bg-[#B2EBB0]" },
  REJECTED: { label: "등록 불가", bgColor: "bg-[#FF9595]" }
} as const;

type StatusType = keyof typeof STATUS_MAP;

interface StatusProps {
  status: StatusType;
}

const Status = ({ status }: StatusProps) => {
  return (
    <div className={`flex items-center justify-center w-[76px] h-[32px] rounded-3xl border border-black px-4 py-2 ${STATUS_MAP[status].bgColor}`}>
      <span className="text-xs font-normal whitespace-nowrap">{STATUS_MAP[status].label}</span>
    </div>
  );
};

export default Status;
