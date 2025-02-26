"use client";

import Image from "next/image";
import React, { useState } from "react";
import clsx from "clsx";
import Tags from "../tag/Tags";
import { Heart } from "lucide-react";
import { WebtoonData } from "./type";
import { useRouter } from "next/navigation";

const WebtoonCardCol = ({ data }: { data: WebtoonData }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div
      className={clsx(
        "relative flex flex-col overflow-hidden",
        "h-auto w-[180px]",
      )}
      onClick={() => {
        router.push(data.webtoon_url);
      }}
    >
      {/* 웹툰 이미지 */}
      <img
        src={data?.thumbnail}
        alt="웹툰 이미지"
        width="180"
        height="129"
        className="h-[129px] rounded-md object-cover"
        loading="eager" // priority 대신 loading="eager"를 사용해 즉시 로드
      />

      {/* 즐겨찾기 버튼 */}
      <div className="absolute right-0 h-6 w-6 rounded-tr-md bg-[#968E82] bg-opacity-70">
        <Heart
          className="absolute right-1 top-1 cursor-pointer"
          size={18}
          stroke={isFavorite ? "#FF8B8B" : "white"}
          strokeWidth={1.5}
          fill={isFavorite ? "#FF8B8B" : "none"}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            setIsFavorite((prev) => !prev);
          }}
        />
      </div>

      {/* 배급사 로고 */}
      {data ? (
        data.platform === "naver" ? (
          <Image
            src="/naverSquare.png"
            alt="네이버 로고"
            width={24}
            height={24}
            className="absolute left-0 rounded-tl-md"
          />
        ) : data.platform === "kakao" ? (
          <Image
            src="/kakaoSquare.png"
            alt="카카오 로고"
            width={24}
            height={24}
            className="absolute left-0 rounded-tl-md"
          />
        ) : data.platform === "kakaopage" ? (
          <Image
            src="/kakaopageSquare.png"
            alt="카카오페이지 로고"
            width={24}
            height={24}
            className="absolute left-0 rounded-tl-md"
          />
        ) : data.platform === "postype" ? (
          <Image
            src="/postypeSquare.png"
            alt="포스타입 로고"
            width={24}
            height={24}
            className="absolute left-0 rounded-tl-md"
          />
        ) : (
          <div className="absolute left-0 flex h-[24px] w-[24px] items-center justify-center rounded-sm rounded-tl-md bg-bg-yellow-01">
            <p className="text-center text-[7px] text-main-text">준비중</p>
          </div>
        )
      ) : null}

      {/* 카드 컨텐츠 */}
      <div className={clsx("flex flex-col bg-white", "w-[180px] rounded-r-md")}>
        <div className="relative flex flex-col items-center gap-2 p-1">
          {/* 제목 및 작가 */}
          <div className="flex w-[85%] flex-col items-center gap-1 pt-2">
            <p className="line-clamp-2 text-center text-[11px]">
              {data && data.title}
            </p>
            <p className="text-center text-[9px] text-main-text">
              {data && data.author}
            </p>
          </div>

          {/* 태그 */}
          <div
            className={clsx(
              "flex flex-wrap justify-center overflow-y-auto",
              "h-[55px] gap-1",
            )}
          >
            {data.tags.map((tag, index) => (
              <Tags key={index} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebtoonCardCol;
