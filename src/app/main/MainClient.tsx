"use client";

import useBreakpoint from "@/hooks/useBreakpoint";
import clsx from "clsx";
import Swipers from "@/components/common/swiper/Swipers";
import WebtoonCardCol from "@/components/common/webtoonCard/WebtoonCardCol";
import WebtoonCardColMobile from "@/components/common/webtoonCard/WebtoonCardColMobile";
import PaginationList from "@/components/common/pagination/PaginationList";
import WebtoonCard from "@/components/common/webtoonCard/WebtoonCard";
import Header from "@/components/common/Header";
import s from "./main.module.scss";
import WebtoonCardMobile from "@/components/common/webtoonCard/WebtoonCardMobile";
import { useEffect } from "react";
import useWebtoonStore from "@/stores/webtoonStore";

export default function MainClient() {
  const breakpoint = useBreakpoint();
  const resetSearchState = useWebtoonStore((state) => state.resetSearchState);

  // 메인에서는 검색 모두 초기화
  useEffect(() => {
    resetSearchState();
  }, [resetSearchState]);

  const data = {
    webtoons: [
      {
        title: "Tower of God",
        author: "SIU",
        thumbnail: "https://picsum.photos/200/300?random=1",
        webtoon_url: "https://webtoon.naver.com/tower_of_god",
        publication_day: "2025-02-19",
        platform: "naver",
        serial_day: "mon",
        serialization_cycle: "1weeks",
        created_at: "2025-02-19T06:16:58.904Z",
        updated_at: "2025-02-19T06:16:58.904Z",
        tags: [
          { id: 1, tag_name: "fantasy", category: "genre" },
          { id: 2, tag_name: "adventure", category: "genre" },
        ],
      },
      {
        title: "The Boxer",
        author: "JH",
        thumbnail: "https://picsum.photos/200/300?random=2",
        webtoon_url: "https://webtoon.naver.com/the_boxer",
        publication_day: "2025-02-19",
        platform: "naver",
        serial_day: "tue",
        serialization_cycle: "1weeks",
        created_at: "2025-02-19T06:17:00.904Z",
        updated_at: "2025-02-19T06:17:00.904Z",
        tags: [
          { id: 3, tag_name: "sports", category: "genre" },
          { id: 4, tag_name: "drama", category: "genre" },
        ],
      },
      {
        title: "Omniscient Reader's Viewpoint",
        author: "Sing N Song",
        thumbnail: "https://picsum.photos/200/300?random=3",
        webtoon_url: "https://webtoon.kakao.com/omniscient_reader",
        publication_day: "2025-02-19",
        platform: "kakao",
        serial_day: "wed",
        serialization_cycle: "1weeks",
        created_at: "2025-02-19T06:17:02.904Z",
        updated_at: "2025-02-19T06:17:02.904Z",
        tags: [
          { id: 5, tag_name: "fantasy", category: "genre" },
          { id: 6, tag_name: "action", category: "genre" },
        ],
      },
      {
        title: "Lookism",
        author: "Park Tae-jun",
        thumbnail: "https://picsum.photos/200/300?random=4",
        webtoon_url: "https://webtoon.kakaopage.com/lookism",
        publication_day: "2025-02-19",
        platform: "kakaopage",
        serial_day: "thu",
        serialization_cycle: "1weeks",
        created_at: "2025-02-19T06:17:04.904Z",
        updated_at: "2025-02-19T06:17:04.904Z",
        tags: [
          { id: 7, tag_name: "drama", category: "genre" },
          { id: 8, tag_name: "action", category: "genre" },
        ],
      },
      {
        title: "Eleceed",
        author: "Jeho Son & ZHENA",
        thumbnail: "https://picsum.photos/200/300?random=5",
        webtoon_url: "https://webtoon.naver.com/eleceed",
        publication_day: "2025-02-19",
        platform: "naver",
        serial_day: "fri",
        serialization_cycle: "1weeks",
        created_at: "2025-02-19T06:17:06.904Z",
        updated_at: "2025-02-19T06:17:06.904Z",
        tags: [
          { id: 9, tag_name: "action", category: "genre" },
          { id: 10, tag_name: "fantasy", category: "genre" },
        ],
      },
      {
        title: "Solo Leveling",
        author: "Chugong",
        thumbnail: "https://picsum.photos/200/300?random=6",
        webtoon_url: "https://webtoon.kakao.com/solo_leveling",
        publication_day: "2025-02-19",
        platform: "kakao",
        serial_day: "sat",
        serialization_cycle: "1weeks",
        created_at: "2025-02-19T06:18:00.904Z",
        updated_at: "2025-02-19T06:18:00.904Z",
        tags: [
          { id: 11, tag_name: "action", category: "genre" },
          { id: 12, tag_name: "fantasy", category: "genre" },
        ],
      },
      {
        title: "The God of High School",
        author: "Yongje Park",
        thumbnail: "https://picsum.photos/200/300?random=7",
        webtoon_url: "https://webtoon.kakaopage.com/god_of_highschool",
        publication_day: "2025-02-19",
        platform: "kakaopage",
        serial_day: "sun",
        serialization_cycle: "1weeks",
        created_at: "2025-02-19T06:19:00.904Z",
        updated_at: "2025-02-19T06:19:00.904Z",
        tags: [
          { id: 13, tag_name: "martial arts", category: "genre" },
          { id: 14, tag_name: "action", category: "genre" },
        ],
      },
      {
        title: "Noblesse",
        author: "Son Jeho & Lee Kwangsu",
        thumbnail: "https://picsum.photos/200/300?random=8",
        webtoon_url: "https://webtoon.naver.com/noblesse",
        publication_day: "2025-02-19",
        platform: "naver",
        serial_day: "mon",
        serialization_cycle: "1weeks",
        created_at: "2025-02-19T06:20:00.904Z",
        updated_at: "2025-02-19T06:20:00.904Z",
        tags: [
          { id: 15, tag_name: "fantasy", category: "genre" },
          { id: 16, tag_name: "vampire", category: "genre" },
        ],
      },
      {
        title: "Sweet Home",
        author: "Kim Carnby & Hwang Youngchan",
        thumbnail: "https://picsum.photos/200/300?random=9",
        webtoon_url: "https://webtoon.kakao.com/sweet_home",
        publication_day: "2025-02-19",
        platform: "kakao",
        serial_day: "tue",
        serialization_cycle: "1weeks",
        created_at: "2025-02-19T06:21:00.904Z",
        updated_at: "2025-02-19T06:21:00.904Z",
        tags: [
          { id: 17, tag_name: "horror", category: "genre" },
          { id: 18, tag_name: "thriller", category: "genre" },
        ],
      },
      {
        title: "Sweet Home",
        author: "Kim Carnby & Hwang Youngchan",
        thumbnail: "https://picsum.photos/200/300?random=9",
        webtoon_url: "https://webtoon.kakao.com/sweet_home",
        publication_day: "2025-02-19",
        platform: "etc",
        serial_day: "tue",
        serialization_cycle: "1weeks",
        created_at: "2025-02-19T06:21:00.904Z",
        updated_at: "2025-02-19T06:21:00.904Z",
        tags: [
          { id: 17, tag_name: "horror", category: "genre" },
          { id: 18, tag_name: "thriller", category: "genre" },
        ],
      },
    ],
  };

  return (
    <div className="pb-12">
      <Header /> {/* 헤더 반응형 필요 */}
      <div
        className={clsx(
          "flex flex-col items-center gap-16",
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
          <p
            className={`${s.popular_webtoon_text} text-sm text-black md:text-base xl:text-xl`}
          >
            인기 웹툰
          </p>
          <div className={`${s.popular_webtoon_swiper} relative`}>
            {breakpoint === "mobile" ? (
              <Swipers>
                {data.webtoons.map((webtoonData, idx) => {
                  return <WebtoonCardColMobile key={idx} data={webtoonData} />;
                })}
              </Swipers>
            ) : (
              <Swipers>
                {data.webtoons.map((webtoonData, idx) => {
                  return <WebtoonCardCol key={idx} data={webtoonData} />;
                })}
              </Swipers>
            )}
          </div>
        </div>

        {/* 웹툰 목록 - 데스크탑 & 태블릿 */}
        <div className={clsx("flex flex-col", s.webtoon_container)}>
          <p
            className={`${s.webtoon_text} text-sm text-black md:text-base xl:text-xl`}
          >
            웹툰 목록
          </p>
          <div className={`${s.webtoon_pagination} flex`}>
            <PaginationList data={data.webtoons}>
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
