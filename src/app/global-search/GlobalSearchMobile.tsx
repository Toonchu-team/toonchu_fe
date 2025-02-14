"use client";

import DropdownMobile from "@/components/common/dropdown/DropdownMobile";
import PaginationList from "@/components/common/pagination/PaginationList";
import SearchBarMobile from "@/components/common/searchBar/SearchBarMobile";
import WebtoonCardMobile from "@/components/common/webtoonCard/WebtoonCardMobile";
import clsx from "clsx";
import { useState } from "react";

export default function GlobalSearchMobile() {
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
