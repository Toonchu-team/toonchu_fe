"use client";

import Image from "next/image";
import React, { useState } from "react";
import clsx from "clsx";
import Tags from "../tag/Tags";
import { Heart } from "lucide-react";
import { WebtoonData } from "./type";

const WebtoonCardCol = ({ data }: { data: WebtoonData }) => {
  console.log(data);
  // 임시 데이터
  const tags = data.tags.map((tag) => tag.tag_name);

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
        src={data && data.thumbnail}
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
      {data ? (
        data.platform === "naver" ? (
          <Image
            src="/naverSquare.png"
            alt="네이버 로고"
            width={40}
            height={40}
            className="absolute left-0 rounded-tl-xl"
          />
        ) : data.platform === "kakao" ? (
          <Image
            src="/kakaoSquare.png"
            alt="카카오 로고"
            width={40}
            height={40}
            className="absolute left-0 rounded-tl-xl"
          />
        ) : data.platform === "kakaopage" ? (
          <Image
            src="/kakaopageSquare.png"
            alt="카카오페이지 로고"
            width={40}
            height={40}
            className="absolute left-0 rounded-tl-xl"
          />
        ) : data.platform === "postype" ? (
          <Image
            src="/postypeSquare.png"
            alt="포스트타입 로고"
            width={40}
            height={40}
            className="absolute left-0 rounded-tl-xl"
          />
        ) : (
          <div className="absolute left-0 flex h-[40px] w-[40px] items-center justify-center rounded-lg rounded-tl-xl bg-bg-yellow-01">
            <p className="text-xs text-main-text">준비중</p>
          </div>
        )
      ) : null}

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
            <p className="line-clamp-2 text-center text-sm xl:text-lg">
              {data && data.title}
            </p>
            <p className="text-xs text-main-text xl:text-sm">
              {data && data.author}
            </p>
          </div>

          {/* 태그 */}
          <div
            className={clsx(
              "flex flex-wrap justify-center overflow-y-auto",
              "h-[72px] gap-1",
            )}
          >
            {tags.map((tag, index) => (
              <Tags key={index} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebtoonCardCol;
