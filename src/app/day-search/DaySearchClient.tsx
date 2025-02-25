"use client";

import useBreakpoint from "@/hooks/useBreakpoint";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Dropdown from "@/components/common/dropdown/Dropdown";
import PaginationList from "@/components/common/pagination/PaginationList";
import WebtoonCard from "@/components/common/webtoonCard/WebtoonCard";
import s from "./daySearch.module.scss";
import WebtoonCardMobile from "@/components/common/webtoonCard/WebtoonCardMobile";
import DropdownMobile from "@/components/common/dropdown/DropdownMobile";
import useWebtoonStore from "@/stores/webtoonStore";
import { engDayMapping, engStatusMapping } from "@/lib/utils/engFomatter";
import NoResults from "../noResults";

export default function DaySearchClient() {
  const { webtoons, daySearch, etcSearch } = useWebtoonStore();
  const [selectedContent, setSelectedContent] = useState<string>("전체");
  const [selectedDay, setSelectedDay] = useState<string>("월");

  useEffect(() => {
    if (selectedDay === "기타") {
      etcSearch(engStatusMapping[selectedContent]);
    } else {
      daySearch(engDayMapping[selectedDay], engStatusMapping[selectedContent]);
    }
  }, [
    selectedDay,
    selectedContent,
    setSelectedContent,
    setSelectedDay,
    daySearch,
    etcSearch,
  ]);

  const breakpoint = useBreakpoint();
  const etcCycle = ["10days", "20days", "month", "etc"];
  const data =
    selectedDay === "기타"
      ? webtoons.filter((webtoon) =>
          etcCycle.includes(webtoon.serialization_cycle),
        )
      : webtoons;

  const contentCategories = ["전체", "신작", "완결"];
  const dayCategories = ["월", "화", "수", "목", "금", "토", "일", "기타"];

  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("인기순");
  const sortArray = ["인기순", "최신순", "조회순", "등록순"];

  return (
    <div className={s[breakpoint]}>
      <div
        className={clsx(
          "flex flex-col items-center pb-12",
          "px-mobile lg:px-desktop tablet:px-tablet",
          s.container,
        )}
      >
        {/* 제목 */}
        <p className={`${s.text} font-bold`}>연재별 검색</p>

        <div className={`flex flex-col items-center ${s.content_container}`}>
          {/* 카테고리 */}
          <div
            className={`flex h-[100px] text-sm text-main-text lg:text-base ${s.category_container}`}
          >
            {/* 연재 카테고리 */}
            <div className={clsx("flex", s.category_series_container)}>
              {contentCategories.map((category, idx) => {
                return (
                  <div key={idx}>
                    <button
                      onClick={() => setSelectedContent(category)}
                      className={`${selectedContent === category && "rounded-lg border border-main-yellow bg-bg-yellow-02"} ${s.category_button}`}
                    >
                      {category}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* 요일 카테고리 */}
            <div className={clsx("flex", s.category_day_container)}>
              {dayCategories.map((category, idx) => {
                return (
                  <div key={idx}>
                    <button
                      onClick={() => setSelectedDay(category)}
                      className={`${selectedDay === category && "rounded-lg border border-main-yellow bg-bg-yellow-02"} ${s.category_button}`}
                    >
                      {category}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={clsx("flex flex-col", s.dropdown_container)}>
            {data.length !== 0 && (
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
                    type={selectedDay !== "기타" ? "day" : "etc"}
                    serial_day={engDayMapping[selectedDay]}
                    serial_type={engStatusMapping[selectedContent]}
                  />
                ) : (
                  <Dropdown
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                    elements={sortArray}
                    option={sort}
                    setOption={setSort}
                    type="day"
                    serial_day={engDayMapping[selectedDay]}
                    serial_type={engStatusMapping[selectedContent]}
                  />
                )}
              </div>
            )}
            {/* 검색 결과 - 카드 컴포넌트 */}
            {data.length === 0 && <NoResults />}
            <div className={clsx("flex gap-x-10 gap-y-7", s.search_result)}>
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
    </div>
  );
}
