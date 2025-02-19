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
    "현대물",
    "현대물",
    "2019_지상최대공모전",
  ];

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        "relative flex flex-col overflow-hidden",
        "h-auto w-[300px]",
      )}
    >
      {/* 웹툰 이미지 */}
      <Image
        src="/image.png"
        alt="웹툰 이미지"
        width={300}
        height={216}
        className="h-[216px] rounded-xl object-cover"
        priority
      />

      {/* 즐겨찾기 버튼 */}
      <div className="absolute right-0 h-10 w-10 rounded-tr-xl bg-[#968E82] bg-opacity-70">
        <Heart
          className="absolute right-1.5 top-1.5 cursor-pointer"
          size={30}
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
        width={40}
        height={40}
        className="absolute left-0 rounded-tl-xl"
      />

      {/* 카드 컨텐츠 */}
      <div
        className={clsx(
          "flex flex-col bg-white",
          "w-[300px] rounded-br-xl rounded-tr-xl",
        )}
      >
        <div className="relative flex flex-col items-center gap-4 p-2">
          {/* 제목 및 작가 */}
          <div className="flex w-[85%] flex-col items-center gap-1 pt-2">
            <p className="line-clamp-2 text-center text-lg">
              미래의 골동품 가게
            </p>
            <p className="text-sm text-main-text">구아진</p>
          </div>

          {/* 태그 */}
          <div
            className={clsx(
              "flex flex-wrap justify-center overflow-y-auto",
              "h-[72px] gap-1",
            )}
          >
            {tags.map((tag, index) => (
              <Tags key={index} tag={tag} col={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebtoonCardCol;
