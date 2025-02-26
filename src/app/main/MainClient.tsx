"use client";

import useBreakpoint from "@/hooks/useBreakpoint";
import clsx from "clsx";
import Swipers from "@/components/common/swiper/Swipers";
import WebtoonCardCol from "@/components/common/webtoonCard/WebtoonCardCol";
import WebtoonCardColMobile from "@/components/common/webtoonCard/WebtoonCardColMobile";
import PaginationList from "@/components/common/pagination/PaginationList";
import WebtoonCard from "@/components/common/webtoonCard/WebtoonCard";
import Header from "@/components/Header";
import s from "./main.module.scss";
import WebtoonCardMobile from "@/components/common/webtoonCard/WebtoonCardMobile";
import { useEffect } from "react";
import useWebtoonStore from "@/stores/webtoonStore";

export default function MainClient() {
  const breakpoint = useBreakpoint();
  const { allWebtoons, webtoons } = useWebtoonStore();
  const resetSearchState = useWebtoonStore((state) => state.resetSearchState);

  useEffect(() => {
    allWebtoons();
  }, [allWebtoons]);

  // 메인에서는 검색 모두 초기화
  useEffect(() => {
    resetSearchState();
  }, [resetSearchState]);

  const data = webtoons;
  const popularData = webtoons
    .slice() // 원본 배열 복사
    .sort((a, b) => b.like_count - a.like_count); // like_count가 높은 순으로 정렬

  return (
    <div className="pb-12">
      <Header /> {/* 헤더 반응형 필요 */}
      <div
        className={clsx(
          "flex flex-col items-center gap-20 tablet:gap-32",
          "px-mobile md:px-tablet lg:px-desktop",
          s[breakpoint],
        )}
      >
        {/* 인기 웹툰 - 데스크탑 & 태블릿 */}
        <div
          className={clsx(
            "flex transform flex-col",
            s.popular_webtoon_container,
          )}
        >
          <p className={`${s.popular_webtoon_text} text-sm text-black`}>
            인기 웹툰
          </p>
          <div className={`${s.popular_webtoon_swiper} relative`}>
            {breakpoint === "mobile" ? (
              <Swipers>
                {popularData.map((webtoonData, idx) => {
                  return <WebtoonCardColMobile key={idx} data={webtoonData} />;
                })}
              </Swipers>
            ) : (
              <Swipers>
                {popularData.map((webtoonData, idx) => {
                  return <WebtoonCardCol key={idx} data={webtoonData} />;
                })}
              </Swipers>
            )}
          </div>
        </div>

        {/* 웹툰 목록 - 데스크탑 & 태블릿 */}
        <div className={clsx("flex flex-col", s.webtoon_container)}>
          <p className={`${s.webtoon_text} text-sm text-black`}>웹툰 목록</p>
          <div className={`${s.webtoon_pagination} flex`}>
            <PaginationList data={data}>
              {(webtoonData) =>
                breakpoint === "mobile" ? (
                  <WebtoonCardMobile data={webtoonData} />
                ) : (
                  <WebtoonCard data={webtoonData} />
                )
              }
            </PaginationList>
          </div>
        </div>
      </div>
    </div>
  );
}
