"use client";

import Image from "next/image";
import React from "react";

const NoResults = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <Image
        src={"/images/brand-character/withdrawal.png"}
        alt="검색 결과 없음"
        width={150}
        height={150}
      />
      <p className="text-main-text">앗! 해당 웹툰을 찾을 수 없다냥.</p>
    </div>
  );
};

export default NoResults;
