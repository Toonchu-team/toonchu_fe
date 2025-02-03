import Image from "next/image";
import React from "react";
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

  return (
    <div className="flex w-[300px] flex-col">
      <Image
        src="/image.png"
        alt=""
        width={300}
        height={216}
        className="h-[216px] rounded-xl object-cover"
      />
      <Image
        src="/naverSquare.png"
        alt="naverLogo"
        width={40}
        height={40}
        className="fixed self-end rounded-tr-xl"
      />
      <div className="flex w-[300px] flex-col rounded-br-xl rounded-tr-xl bg-white">
        <div className="flex flex-col gap-4 p-2">
          <Heart className="fixed self-end" />
          <div className="flex flex-col items-center gap-1 pt-2">
            <p className="text-xl">미래의 골동품 가게</p>
            <p className="text-base text-main-text">구아진</p>
          </div>
          <div className="flex h-20 flex-wrap justify-center gap-1 overflow-y-auto scrollbar-hide">
            {tags.map((tag, index) => {
              return <Tags key={index} tag={tag} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebtoonCardCol;
