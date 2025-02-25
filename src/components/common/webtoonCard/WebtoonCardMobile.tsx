"use client";

import Image from "next/image";
import React, { useState } from "react";
import Badges from "../badge/Badges";
import Tags from "../tag/Tags";
import { Heart } from "lucide-react";
import { WebtoonData } from "./type";
import { dayMapping } from "@/lib/utils/korFomatter";

const WebtoonCardMobile = ({ data }: { data: WebtoonData }) => {
  const dayOrder = ["월", "화", "수", "목", "금", "토", "일"];

  const koreanDay = data.serial_day
    .map((serial_day) => dayMapping[serial_day])
    .sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b))
    .join(", ");

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  return (
    <div className="flex h-[120px] w-[339px] drop-shadow-lg">
      <img
        src={data?.thumbnail}
        alt="웹툰 이미지"
        width="83"
        height="120"
        className="rounded-bl-xl rounded-tl-xl"
      />

      <div className="border-1 relative flex w-[339px] flex-col rounded-br-xl rounded-tr-xl border bg-white">
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

        {data ? (
          data.platform === "naver" ? (
            <Image
              src="/naverSquare.png"
              alt="네이버 로고"
              width={30}
              height={30}
              className="absolute self-end rounded-tr-xl"
            />
          ) : data.platform === "kakao" ? (
            <Image
              src="/kakaoSquare.png"
              alt="카카오 로고"
              width={30}
              height={30}
              className="absolute self-end rounded-tr-xl"
            />
          ) : data.platform === "kakaopage" ? (
            <Image
              src="/kakaopageSquare.png"
              alt="카카오페이지 로고"
              width={30}
              height={30}
              className="absolute self-end rounded-tr-xl"
            />
          ) : data.platform === "postype" ? (
            <Image
              src="/postypeSquare.png"
              alt="포스타입 로고"
              width={30}
              height={30}
              className="absolute self-end rounded-tr-xl"
            />
          ) : (
            <div className="absolute flex h-[30px] w-[30px] items-center justify-center self-end rounded-lg rounded-tr-xl bg-bg-yellow-01">
              <p className="text-[8px] text-main-text">준비중</p>
            </div>
          )
        ) : null}

        <div className="flex flex-col gap-1 p-2">
          <div className="flex flex-wrap gap-1">
            {koreanDay && <Badges badge={`${koreanDay} 연재`} />}
          </div>
          <div className="w-[85%]">
            <p className="line-clamp-1 text-xs">{data && data.title}</p>
            <p className="text-[10px] text-main-text">{data && data.author}</p>
          </div>
          <div className="flex h-[50px] flex-wrap gap-1 overflow-y-auto">
            {data.tags.map((tag, index) => {
              return <Tags key={index} tag={tag} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebtoonCardMobile;
