"use client";

import Dropdown from "@/components/common/dropdown/Dropdown";
import PaginationList from "@/components/common/pagination/PaginationList";
import SearchBar from "@/components/common/searchBar/SearchBar";
import WebtoonCard from "@/components/common/webtoonCard/WebtoonCard";
import clsx from "clsx";
import { useState } from "react";

export default function GlobalSearchDesktop() {
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

        <div
          className={clsx(
            "flex w-[1121px] flex-col",
            "h-[800px] origin-top scale-[60%]",
            "lg:h-[1010px] lg:scale-75",
            "xl:h-auto xl:scale-100",
          )}
        >
          {/* 정렬 드롭다운 */}
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
