"use client";

import useBreakpoint from "@/hooks/useBreakpoint";
import { BreakpointType } from "@/stores/breakptStore";
import clsx from "clsx";
import Swipers from "@/components/common/swiper/Swipers";
import WebtoonCardCol from "@/components/common/webtoonCard/WebtoonCardCol";
import WebtoonCardColMobile from "@/components/common/webtoonCard/WebtoonCardColMobile";
import PaginationList from "@/components/common/pagination/PaginationList";
import WebtoonCard from "@/components/common/webtoonCard/WebtoonCard";
import Header from "@/components/common/Header";
import s from "./main.module.scss";
import WebtoonCardMobile from "@/components/common/webtoonCard/WebtoonCardMobile";

export default function MainClient({
  initialBreakpoint,
}: {
  initialBreakpoint: BreakpointType;
}) {
  const breakpoint = useBreakpoint(initialBreakpoint);

  return (
    <div className="pb-12">
      <Header initialBreakpoint={initialBreakpoint} /> {/* 헤더 반응형 필요 */}
      <div
        className={clsx(
          "flex flex-col items-center gap-16",
          "md:h-[1200px] lg:h-[1500px] xl:h-auto", // 반응형 적용 시 하단 여백 발생하는 것 방지
          "px-mobile md:px-tablet lg:px-desktop",
          s[breakpoint],
        )}
      >
        {/* 인기 웹툰 - 데스크탑 & 태블릿 */}
        <div
          className={clsx(
            "flex origin-top transform flex-col",
            s.popular_webtoon_container,
          )}
        >
          <p className={`${s.popular_webtoon_text} text-xl text-black`}>
            인기 웹툰
          </p>
          <div className={`${s.popular_webtoon_swiper} relative`}>
            {breakpoint === "mobile" ? (
              <Swipers>
                <WebtoonCardColMobile />
                <WebtoonCardColMobile />
                <WebtoonCardColMobile />
                <WebtoonCardColMobile />
                <WebtoonCardColMobile />
                <WebtoonCardColMobile />
              </Swipers>
            ) : (
              <Swipers>
                <WebtoonCardCol />
                <WebtoonCardCol />
                <WebtoonCardCol />
                <WebtoonCardCol />
                <WebtoonCardCol />
                <WebtoonCardCol />
              </Swipers>
            )}
          </div>
        </div>

        {/* 웹툰 목록 - 데스크탑 & 태블릿 */}
        <div className={clsx("flex flex-col", s.webtoon_container)}>
          <p className={`${s.webtoon_text} text-xl text-black`}>웹툰 목록</p>
          <div className={`${s.webtoon_pagination} flex`}>
            <PaginationList>
              {breakpoint === "mobile" ? (
                <WebtoonCardMobile />
              ) : (
                <WebtoonCard />
              )}
            </PaginationList>
          </div>
        </div>
      </div>
    </div>
  );
}
