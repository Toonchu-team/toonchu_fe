"use client";

import Image from "next/image";
import React, { useState } from "react";
import clsx from "clsx";
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

  return (
    <div
      className={clsx(
        "flex transition-transform duration-300 hover:scale-105",
        "h-[257px] w-[540px] drop-shadow-xl",
      )}
    >
      {/* 웹툰 이미지 */}
      <Image
        src="/image.png"
        alt="웹툰 이미지"
        width={180}
        height={257}
        className="rounded-bl-2xl rounded-tl-2xl"
      />

      {/* 카드 컨테이너 */}
      <div
        className={clsx(
          "relative flex flex-col border bg-white",
          "w-[360px] rounded-r-2xl",
        )}
      >
        {/* 즐겨찾기 버튼 */}
        <Heart
          className="absolute right-16 top-3 cursor-pointer"
          size={30}
          stroke={isFavorite ? "#FF8B8B" : "#968E82"}
          strokeWidth={1.5}
          fill={isFavorite ? "#FF8B8B" : "none"}
          onClick={() => setIsFavorite((prev) => !prev)}
        />

        {/* 배급사 로고 */}
        <Image
          src="/naverSquare.png"
          alt="네이버 로고"
          width={50}
          height={50}
          className="fixed self-end rounded-tr-2xl"
        />

        {/* 콘텐츠 */}
        <div className="flex flex-col gap-3 p-4">
          {/* 배지 */}
          <div className="flex flex-wrap gap-1">
            {badges.map((badge, index) => (
              <Badges key={index} badge={badge} />
            ))}
          </div>

          {/* 웹툰 정보 */}
          <div className="flex flex-col gap-1.5">
            <div className="min-h-20">
              <p className="line-clamp-2 text-lg">미래의 골동품 가게</p>
              <p className="text-sm text-main-text">구아진</p>
            </div>

            {/* 태그 */}
            <div
              className={clsx(
                "flex flex-wrap gap-1 overflow-y-auto",
                "h-[100px]",
              )}
            >
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
