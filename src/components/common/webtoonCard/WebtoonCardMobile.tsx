"use client";

import Image from "next/image";
import React, { useState } from "react";
import Badges from "../badge/Badges";
import Tags from "../tag/Tags";
import { Heart } from "lucide-react";

const WebtoonCardMobile = () => {
  // 임시 데이터
  const badges = ["신작", "월요일"];
  const tags = [
    "오컬트판타지",
    "동양",
    "크리처",
    "스릴러",
    "현대물",
    "스릴러",
    "현대물",
    "현대물",
    "현대물",
    "현대물",
    "현대물",
    "2019_지상최대공모전",
  ];

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  return (
    <div className="flex h-[120px] min-w-[320px] max-w-[672x] drop-shadow-lg">
      <Image
        src="/image.png"
        alt=""
        width={83}
        height={120}
        unoptimized
        className="rounded-bl-xl rounded-tl-xl"
      />
      <div className="border-1 min-w-68 relative flex max-w-[580px] flex-col rounded-br-xl rounded-tr-xl border bg-white">
        <Heart
          className="absolute right-10 top-2 cursor-pointer"
          size={17}
          stroke={`${isFavorite ? "#FF8B8B" : "#968E82"}`}
          strokeWidth={1.5}
          fill={`${isFavorite ? "#FF8B8B" : "none"}`}
          onClick={() => {
            setIsFavorite((prev) => !prev);
          }}
        />
        <Image
          src="/naverSquare.png"
          alt="naverLogo"
          width={30}
          height={30}
          className="absolute self-end rounded-tr-xl"
          priority
        />
        <div className="flex flex-col gap-1 p-2">
          <div className="flex flex-wrap gap-1">
            {badges.map((badge, index) => {
              return <Badges key={index} badge={badge} />;
            })}
          </div>
          <div className="w-[85%]">
            <p className="line-clamp-1 text-xs">
              미래의 골동품 가게 미래의 골동품 가게 미래의 골동품 가게
            </p>
            <p className="text-[10px] text-main-text">구아진</p>
          </div>
          <div className="flex h-[50px] flex-wrap gap-1 overflow-y-auto">
            {tags.map((tag, index) => {
              return <Tags key={index} tag={tag} col={true} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebtoonCardMobile;
