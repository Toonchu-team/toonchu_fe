import Image from "next/image";
import React from "react";
import Badges from "../badge/Badges";
import Tags from "../tag/Tags";

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

  // 태블릿 뷰: 0.7 축소
  // 모바일 뷰
  return (
    <div className="flex w-[500px] scale-[0.7] origin-left lg:scale-100 drop-shadow-xl">
      <Image
        src="/image.png"
        alt=""
        width={180}
        height={257}
        className="rounded-tl-2xl rounded-bl-2xl"
      />
      <div className="flex flex-col w-80 border border-1 bg-white rounded-tr-2xl rounded-br-2xl">
        <Image
          src="/naverSquare.png"
          alt="naverLogo"
          width={50}
          height={50}
          className="self-end fixed rounded-tr-2xl"
        />
        <div className="flex flex-col gap-3 p-4">
          <div className="flex flex-wrap gap-1">
            {badges.map((badge, index) => {
              console.log(badge);
              return <Badges key={index} badge={badge} />;
            })}
          </div>
          <div>
            <p className="text-2xl">미래의 골동품 가게</p>
            <p className="text-xl text-main-text">구아진</p>
          </div>
          <div className="flex flex-wrap gap-1 h-[110px] overflow-y-auto scrollbar-hide">
            {tags.map((tag, index) => {
              return <Tags key={index} tag={tag} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebtoonCard;
