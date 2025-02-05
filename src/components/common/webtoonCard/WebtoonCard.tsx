"use client";

import Image from "next/image";
import React, { useState } from "react";
import Badges from "../badge/Badges";
import Tags from "../tag/Tags";
import { Heart } from "lucide-react";

const WebtoonCard = () => {
  // 임시 데이터
  const badges = ["신작", "월요일"];
  const tags = [
    "오컬트판타지",
    "동양",
    "크리처",
    "스릴러",
    "현대물",
    "현대물",
    "현대물",
    "현대물",
    "현대물",
    "현대물",
    "2019_지상최대공모전",
  ];

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // 태블릿 뷰: 0.7 축소

  return (
    <div className="flex h-[257px] w-[540px] drop-shadow-xl">
      <Image
        src="/image.png"
        alt=""
        width={180}
        height={257}
        className="rounded-bl-2xl rounded-tl-2xl"
      />
      <div className="border-1 relative flex w-[360px] flex-col rounded-br-2xl rounded-tr-2xl border bg-white">
        <Heart
          className="absolute right-16 top-3 cursor-pointer"
          size={30}
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
          width={50}
          height={50}
          className="fixed self-end rounded-tr-2xl"
        />
        <div className="flex flex-col gap-3 p-4">
          <div className="flex flex-wrap gap-1">
            {badges.map((badge, index) => {
              return <Badges key={index} badge={badge} />;
            })}
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="min-h-20">
              <p className="line-clamp-2 text-lg">미래의 골동품 가게</p>
              <p className="text-sm text-main-text">구아진</p>
            </div>
            <div className="flex h-[100px] flex-wrap gap-1 overflow-y-auto scrollbar-hide">
              {tags.map((tag, index) => (
                <Tags key={index} tag={tag} col={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebtoonCard;
