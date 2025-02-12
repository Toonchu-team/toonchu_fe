"use client";

import Dropdown from "@/components/common/dropdown/Dropdown";
import PaginationList from "@/components/common/pagination/PaginationList";
import SearchBar from "@/components/common/searchBar/SearchBar";
import WebtoonCard from "@/components/common/webtoonCard/WebtoonCard";
import clsx from "clsx";
import { useState } from "react";

export default function DaySearchDesktop() {
  const contentCategories = ["전체", "신작", "완결"];
  const dayCategories = ["매일", "월", "화", "수", "목", "금", "토", "일"];

  const [selectedContent, setSelectedContent] = useState<string>("전체");
  const [selectedDay, setSelectedDay] = useState<string>("매일");

  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("인기순");
  const sortArray = ["인기순", "등록순", "오래된순"];

  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-16 pb-12 pt-12",
        "px-tablet lg:px-desktop",
      )}
    >
      {/* 제목 */}
      <p className="text-2xl font-bold">연재별 검색</p>

      <div className="flex flex-col items-center gap-9">
        {/* 검색창 */}
        <SearchBar />

        {/* 카테고리 */}
        <div className="-z-10 flex h-[100px] gap-2 text-main-text lg:gap-32">
          {/* 연재 카테고리 */}
          <div className={clsx("flex gap-7", "md:scale-[80%] xl:scale-100")}>
            {contentCategories.map((category, idx) => {
              return (
                <div key={idx}>
                  <button
                    onClick={() => setSelectedContent(category)}
                    className={`${selectedContent === category && "rounded-lg border border-main-yellow bg-bg-yellow-02"} px-2 py-1`}
                  >
                    {category}
                  </button>{" "}
                </div>
              );
            })}
          </div>

          {/* 요일 카테고리 */}
          <div className={clsx("flex gap-7", "md:scale-[80%] xl:scale-100")}>
            {dayCategories.map((category, idx) => {
              return (
                <div key={idx}>
                  <button
                    onClick={() => setSelectedDay(category)}
                    className={`${selectedDay === category && "rounded-lg border border-main-yellow bg-bg-yellow-02"} px-2 py-1`}
                  >
                    {category}
                  </button>{" "}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={clsx(
            "flex w-[1121px] flex-col",
            "h-[800px] origin-top scale-[60%]",
            "lg:h-[1010px] lg:scale-75",
            "xl:h-auto xl:scale-100",
          )}
        >
          <div className="border-1-main-text self-start rounded-xl border px-2 py-1">
            <Dropdown
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              elements={sortArray}
              option={sort}
              setOption={setSort}
            />
          </div>

          {/* 검색 결과 - 카드 컴포넌트 */}
          <div
            className={clsx(
              "flex flex-wrap justify-center gap-x-10 gap-y-7 pt-10",
            )}
          >
            <PaginationList>
              <WebtoonCard />
            </PaginationList>
          </div>
        </div>
      </div>
    </div>
  );
}
