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
    "현대물",
    "현대물",
    "2019_지상최대공모전",
  ];

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // 태블릿 뷰: 0.75로 축소

  return (
    <div className="relative flex h-auto w-[300px] flex-col overflow-hidden">
      <Image
        src="/image.png"
        alt=""
        width={300}
        height={216}
        className="h-[216px] rounded-xl object-cover"
      />
      <div className="absolute right-0 h-10 w-10 rounded-tr-xl bg-[#968E82] bg-opacity-70">
        <Heart
          className="absolute right-1.5 top-1.5 cursor-pointer"
          size={30}
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
        width={40}
        height={40}
        className="absolute left-0 rounded-tl-xl"
      />
      <div className="flex w-[300px] flex-col rounded-br-xl rounded-tr-xl bg-white">
        <div className="relative flex flex-col items-center gap-4 p-2">
          <div className="flex w-[85%] flex-col items-center gap-1 pt-2">
            <p className="line-clamp-2 text-center text-lg">
              미래의 골동품 가게
            </p>
            <p className="text-sm text-main-text">구아진</p>
          </div>
          <div className="flex h-[72px] flex-wrap justify-center gap-1 overflow-y-auto scrollbar-hide">
            {tags.map((tag, index) => {
              return <Tags key={index} tag={tag} col={false} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebtoonCardCol;
