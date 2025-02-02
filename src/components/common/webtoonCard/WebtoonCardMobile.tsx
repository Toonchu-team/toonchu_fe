import Image from "next/image";
import React from "react";
import Badges from "../badge/Badges";
import Tags from "../tag/Tags";

const WebtoonCardMobile = () => {
  // 임시 데이터
  const badges = ["신작", "월요일"];
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
    <div className="flex w-[350px] h-[120px] drop-shadow-lg">
      <Image
        src="/image.png"
        alt=""
        width={100}
        height={86}
        className="rounded-tl-xl rounded-bl-xl"
      />
      <div className="flex flex-col w-80 border border-1 bg-white rounded-tr-xl rounded-br-xl">
        <Image
          src="/naverSquare.png"
          alt="naverLogo"
          width={30}
          height={30}
          className="self-end fixed rounded-tr-xl"
        />
        <div className="flex flex-col gap-1 p-2">
          <div className="flex flex-wrap gap-1">
            {badges.map((badge, index) => {
              console.log(badge);
              return <Badges key={index} badge={badge} />;
            })}
          </div>
          <div>
            <p className="text-xs">미래의 골동품 가게</p>
            <p className="text-[10px] text-main-text">구아진</p>
          </div>
          <div className="flex flex-wrap gap-1 h-[50px] overflow-y-auto scrollbar-hide">
            {tags.map((tag, index) => {
              return <Tags key={index} tag={tag} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebtoonCardMobile;
