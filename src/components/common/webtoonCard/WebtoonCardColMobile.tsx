"use client";

import Image from "next/image";
import React, { useState } from "react";
import Tags from "../tag/Tags";
import { Heart } from "lucide-react";

const WebtoonCardCol = () => {
  // 임시 데이터
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
    "2019_지상최대공모전",
    "2019_지상최대공모전",
    "2019_지상최대공모전",
    "2019_지상최대공모전",
    "2019_지상최대공모전",
  ];

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // 태블릿 뷰: 0.75로 축소

  return (
    <div className="relative flex h-auto w-[180px] flex-col overflow-hidden">
      <Image
        src="/image.png"
        alt=""
        width={180}
        height={129}
        className="h-[129px] rounded-md object-cover"
      />
      <div className="absolute right-0 h-6 w-6 rounded-tr-md bg-[#968E82] bg-opacity-70">
        <Heart
          className="absolute right-1 top-1 cursor-pointer"
          size={18}
          stroke={`${isFavorite ? "#FF8B8B" : "white"}`}
          strokeWidth={1.5}
          fill={`${isFavorite ? "#FF8B8B" : "none"}`}
          onClick={() => {
            setIsFavorite((prev) => !prev);
          }}
        />
      </div>
      <Image
        src="/naverSquare.png"
        alt="naverLogo"
        width={24}
        height={24}
        className="absolute left-0 rounded-tl-md"
      />
      <div className="flex w-[180px] flex-col rounded-br-md rounded-tr-md bg-white">
        <div className="relative flex flex-col items-center gap-2 p-1">
          <div className="flex w-[85%] flex-col items-center gap-1 pt-2">
            <p className="line-clamp-2 text-center text-[11px]">
              미래의 골동품 가게
            </p>
            <p className="text-[9px] text-main-text">구아진</p>
          </div>
          <div className="flex h-[55px] flex-wrap justify-center gap-1 overflow-y-auto">
            {tags.map((tag, index) => {
              return <Tags key={index} tag={tag} col={true} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebtoonCardCol;
