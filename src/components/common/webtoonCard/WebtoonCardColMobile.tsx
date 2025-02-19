"use client";

import Image from "next/image";
import React, { useState } from "react";
import clsx from "clsx";
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

  return (
    <div
      className={clsx(
        "relative flex flex-col overflow-hidden",
        "h-auto w-[180px]",
      )}
    >
      {/* 웹툰 이미지 */}
      <Image
        src="/image.png"
        alt="웹툰 이미지"
        width={180}
        height={129}
        className="h-[129px] rounded-md object-cover"
        priority
      />

      {/* 즐겨찾기 버튼 */}
      <div className="absolute right-0 h-6 w-6 rounded-tr-md bg-[#968E82] bg-opacity-70">
        <Heart
          className="absolute right-1 top-1 cursor-pointer"
          size={18}
          stroke={isFavorite ? "#FF8B8B" : "white"}
          strokeWidth={1.5}
          fill={isFavorite ? "#FF8B8B" : "none"}
          onClick={() => setIsFavorite((prev) => !prev)}
        />
      </div>

      {/* 배급사 로고 */}
      <Image
        src="/naverSquare.png"
        alt="네이버 로고"
        width={24}
        height={24}
        className="absolute left-0 rounded-tl-md"
      />

      {/* 카드 컨텐츠 */}
      <div className={clsx("flex flex-col bg-white", "w-[180px] rounded-r-md")}>
        <div className="relative flex flex-col items-center gap-2 p-1">
          {/* 제목 및 작가 */}
          <div className="flex w-[85%] flex-col items-center gap-1 pt-2">
            <p className="line-clamp-2 text-center text-[11px]">
              미래의 골동품 가게
            </p>
            <p className="text-[9px] text-main-text">구아진</p>
          </div>

          {/* 태그 */}
          <div
            className={clsx(
              "flex flex-wrap justify-center overflow-y-auto",
              "h-[55px] gap-1",
            )}
          >
            {tags.map((tag, index) => (
              <Tags key={index} tag={tag} col={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebtoonCardCol;
