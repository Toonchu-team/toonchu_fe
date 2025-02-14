"use client";

import { BreakpointType } from "@/stores/breakptStore";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useState } from "react";
import clsx from "clsx";
import SearchBar from "@/components/common/searchBar/SearchBar";
import Dropdown from "@/components/common/dropdown/Dropdown";
import PaginationList from "@/components/common/pagination/PaginationList";
import WebtoonCard from "@/components/common/webtoonCard/WebtoonCard";
import s from "./daySearch.module.scss";
import SearchBarMobile from "@/components/common/searchBar/SearchBarMobile";
import WebtoonCardMobile from "@/components/common/webtoonCard/WebtoonCardMobile";
import DropdownMobile from "@/components/common/dropdown/DropdownMobile";

export default function DaySearchClient({
  initialBreakpoint,
}: {
  initialBreakpoint: BreakpointType;
}) {
  const breakpoint = useBreakpoint(initialBreakpoint);

  const contentCategories = ["전체", "신작", "완결"];
  const dayCategories = ["매일", "월", "화", "수", "목", "금", "토", "일"];

  const [selectedContent, setSelectedContent] = useState<string>("전체");
  const [selectedDay, setSelectedDay] = useState<string>("매일");

  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("인기순");
  const sortArray = ["인기순", "등록순", "오래된순"];

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
          {/* 검색창 */}
          {breakpoint === "mobile" ? <SearchBarMobile /> : <SearchBar />}

          {/* 카테고리 */}
          <div
            className={`flex h-[100px] text-main-text ${s.category_container}`}
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
                    </button>{" "}
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
                    </button>{" "}
                  </div>
                );
              })}
            </div>
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
    </div>
  );
}
