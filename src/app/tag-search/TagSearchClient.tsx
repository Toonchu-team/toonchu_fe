"use client";

import useBreakpoint from "@/hooks/useBreakpoint";
import { useState } from "react";
import clsx from "clsx";
import Dropdown from "@/components/common/dropdown/Dropdown";
import PaginationList from "@/components/common/pagination/PaginationList";
import WebtoonCard from "@/components/common/webtoonCard/WebtoonCard";
import Tags from "@/components/common/tag/Tags";
import s from "./tagSearch.module.scss";
import WebtoonCardMobile from "@/components/common/webtoonCard/WebtoonCardMobile";
import DropdownMobile from "@/components/common/dropdown/DropdownMobile";
import ResponsiveSearchBar from "@/components/common/searchBar/ResponsiveSearchBar";

export default function TagSearchClient() {
  const breakpoint = useBreakpoint();
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
    ],
  };

  const selectedTags = [
    "오컬트판타지",
    "동양",
    "크리처",
    "스릴러",
    "현대물",
    "현대물",
    "현대물",
    "현대물",
    "현대물",
    "오컬트판타지",
    "동양",
    "크리처",
    "현대물",
  ];

  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("인기순");
  const sortArray = ["인기순", "등록순", "오래된순"];

  return (
    <div className={s[breakpoint]}>
      <div
        className={clsx(
          "flex flex-col items-center pb-12",
          "px-mobile md:px-tablet lg:px-desktop",
          s.container,
        )}
      >
        {/* 제목 */}
        <p className={`${s.text} font-bold`}>태그별 검색</p>

        <div className={`flex flex-col items-center ${s.content_container}`}>
          {/* 검색창 */}
          <ResponsiveSearchBar type="tag" />

          {/* 선택한 태그 */}
          {/* 검색 요청에서 받아와야 할 것 같음 */}
          <div
            className={clsx(
              "flex flex-wrap justify-center gap-2 overflow-y-auto xl:h-[100px] xl:gap-3",
              s.selected_tag_container,
            )}
          >
            <button className="h-[21px] rounded-md border border-main-yellow bg-bg-yellow-02 px-1.5 py-1 text-[10px] leading-none text-main-text hover:bg-bg-yellow-01 md:h-[25px] md:rounded-lg md:px-2 md:py-1 md:text-xs xl:h-[34px] xl:text-base">
              선택한 태그 초기화
            </button>
            {selectedTags.map((selectedTag, idx) => {
              return <Tags tag={selectedTag} key={idx} />;
            })}
          </div>

          <div className={clsx("flex flex-col", s.dropdown_container)}>
            <div
              className={`${s.dropdown} border-1-main-text self-start border px-2 py-1`}
            >
              {breakpoint === "mobile" ? (
                <DropdownMobile
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                  elements={sortArray}
                  option={sort}
                  setOption={setSort}
                />
              ) : (
                <Dropdown
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                  elements={sortArray}
                  option={sort}
                  setOption={setSort}
                />
              )}
            </div>

            {/* 검색 결과 - 카드 컴포넌트 */}
            <div className={clsx("flex gap-x-10 gap-y-7", s.search_result)}>
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
    </div>
  );
}
