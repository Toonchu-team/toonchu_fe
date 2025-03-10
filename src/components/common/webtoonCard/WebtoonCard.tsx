"use client";

import Image from "next/image";
import React, { useState } from "react";
import clsx from "clsx";
import Badges from "../badge/Badges";
import Tags from "../tag/Tags";
import { Heart } from "lucide-react";
import { WebtoonData } from "./type";
import { dayMapping } from "@/lib/utils/korFomatter";

const WebtoonCard = ({ data }: { data: WebtoonData }) => {
  const dayOrder = ["월", "화", "수", "목", "금", "토", "일"];

  const koreanDay = data.serial_day
    .map((serial_day) => dayMapping[serial_day])
    .sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b))
    .join(", ");

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  return (
    <a
      href={data.webtoon_url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "flex",
        "h-[170px] max-w-[540px] drop-shadow-xl xl:h-[257px]",
      )}
    >
      {/* 웹툰 이미지 */}
      <img
        src={data?.thumbnail}
        alt="웹툰 이미지"
        width="180"
        height="257"
        className="h-[170px] w-[100px] rounded-bl-2xl rounded-tl-2xl drop-shadow-xl xl:h-[257px] xl:w-[180px]"
        loading="eager" // priority 대신 loading="eager"를 사용해 즉시 로드
      />

      {/* 카드 컨테이너 */}
      <div
        className={clsx(
          "relative flex flex-col border bg-white",
          "w-[240px] rounded-r-2xl xl:w-[360px]",
        )}
      >
        {/* 즐겨찾기 버튼 */}
        <Heart
          className="absolute right-12 top-2 cursor-pointer"
          size={25}
          stroke={isFavorite ? "#FF8B8B" : "#968E82"}
          strokeWidth={1.5}
          fill={isFavorite ? "#FF8B8B" : "none"}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            setIsFavorite((prev) => !prev);
          }}
        />

        {/* 배급사 로고 */}
        {data ? (
          data.platform === "naver" ? (
            <Image
              src="/naverSquare.png"
              alt="네이버 로고"
              width={40}
              height={40}
              className="absolute right-0 rounded-tr-xl"
            />
          ) : data.platform === "kakao" ? (
            <Image
              src="/kakaoSquare.png"
              alt="카카오 로고"
              width={40}
              height={40}
              className="absolute right-0 rounded-tr-xl"
            />
          ) : data.platform === "kakaopage" ? (
            <Image
              src="/kakaopageSquare.png"
              alt="카카오페이지 로고"
              width={40}
              height={40}
              className="absolute right-0 rounded-tr-xl"
            />
          ) : data.platform === "postype" ? (
            <Image
              src="/postTypeSquare.png"
              alt="포스타입 로고"
              width={40}
              height={40}
              className="absolute right-0 rounded-tr-xl"
            />
          ) : (
            <div className="absolute right-0 flex h-[40px] w-[40px] items-center justify-center rounded-lg rounded-tr-xl bg-bg-yellow-01">
              <p className="text-xs text-main-text">준비중</p>
            </div>
          )
        ) : null}

        {/* 콘텐츠 */}
        <div className="flex flex-col gap-2 p-3 xl:gap-3 xl:p-4">
          {/* 배지 */}
          <div className="flex flex-wrap gap-1">
            {koreanDay && <Badges badge={`${koreanDay} 연재`} />}
          </div>

          {/* 웹툰 정보 */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="line-clamp-2 w-[150px] text-sm xl:w-auto xl:text-lg">
                {data && data.title}
              </p>
              <p className="text-xs text-main-text xl:text-sm">
                {data && data.author}
              </p>
            </div>

            {/* 태그 */}
            <div
              className={clsx(
                "flex flex-wrap gap-1 overflow-y-auto",
                "h-[50px] xl:h-[100px]",
              )}
            >
              {data.tags.map((tag, index) => (
                <Tags key={index} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default WebtoonCard;
