"use client";

import DropdownMobile from "@/components/common/dropdown/DropdownMobile";
import PaginationList from "@/components/common/pagination/PaginationList";
import SearchBarMobile from "@/components/common/searchBar/SearchBarMobile";
import WebtoonCardMobile from "@/components/common/webtoonCard/WebtoonCardMobile";
import clsx from "clsx";
import { useState } from "react";

export default function DaySearchMobile() {
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
        "flex flex-col items-center gap-10 pb-12 pt-5",
        "px-mobile",
      )}
    >
      {/* 제목 */}
      <p className="text-lg font-bold">연재별 검색</p>

      <div className="flex flex-col items-center gap-5">
        {/* 검색창 */}
        <SearchBarMobile />

        {/* 카테고리 */}
        <div className="flex h-[100px] flex-col items-center gap-3 text-[11px] text-main-text">
          {/* 연재 카테고리 */}
          <div className={"flex gap-2"}>
            {contentCategories.map((category, idx) => {
              return (
                <div key={idx}>
                  <button
                    onClick={() => setSelectedContent(category)}
                    className={`${selectedContent === category && "rounded-lg border border-main-yellow bg-bg-yellow-02"} px-1 py-0.5`}
                  >
                    {category}
                  </button>{" "}
                </div>
              );
            })}
          </div>

          {/* 요일 카테고리 */}
          <div className={"flex gap-2"}>
            {dayCategories.map((category, idx) => {
              return (
                <div key={idx}>
                  <button
                    onClick={() => setSelectedDay(category)}
                    className={`${selectedDay === category && "rounded-lg border border-main-yellow bg-bg-yellow-02"} px-1 py-0.5`}
                  >
                    {category}
                  </button>{" "}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col">
          {/* 정렬 드롭다운 */}
          <div className="border-1-main-text self-start rounded-md border px-2 py-1">
            <DropdownMobile
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              elements={sortArray}
              option={sort}
              setOption={setSort}
            />
          </div>

          {/* 검색 결과 - 카드 컴포넌트 */}
          <div
            className={clsx("flex flex-col items-center gap-x-10 gap-y-7 pt-3")}
          >
            <PaginationList>
              <WebtoonCardMobile />
            </PaginationList>
          </div>
        </div>
      </div>
    </div>
  );
}
