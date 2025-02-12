"use client";

import Dropdown from "@/components/common/dropdown/Dropdown";
import PaginationList from "@/components/common/pagination/PaginationList";
import SearchBar from "@/components/common/searchBar/SearchBar";
import Tags from "@/components/common/tag/Tags";
import WebtoonCard from "@/components/common/webtoonCard/WebtoonCard";
import clsx from "clsx";
import { useState } from "react";

export default function TagSearchDesktop() {
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
    <div
      className={clsx(
        "flex flex-col items-center gap-16 pb-12 pt-12",
        "px-tablet lg:px-desktop",
      )}
    >
      {/* 제목 */}
      <p className="text-2xl font-bold">태그별 검색</p>

      <div className="flex flex-col items-center gap-9">
        {/* 검색창 */}
        <SearchBar />

        {/* 선택한 태그 */}
        {/* 검색 요청에서 받아와야 할 것 같음 */}
        <div
          className={clsx(
            "-z-50 flex h-[100px] w-[870px] flex-wrap justify-center gap-3 overflow-y-auto",
            "scale-[65%] lg:scale-75 xl:scale-100",
          )}
        >
          <button className="h-[34px] rounded-lg border border-main-yellow bg-bg-yellow-02 px-2 py-1 text-main-text hover:bg-bg-yellow-01">
            선택한 태그 초기화
          </button>
          {selectedTags.map((selectedTag, idx) => {
            return (
              <div key={idx}>
                <Tags tag={selectedTag} />
              </div>
            );
          })}
        </div>

        <div
          className={clsx(
            "flex w-[1121px] flex-col",
            "h-[800px] origin-top scale-[60%]",
            "lg:h-[1010px] lg:scale-75",
            "xl:h-auto xl:scale-100",
          )}
        >
          <div className="self-start rounded-xl border border-main-grey px-2 py-1">
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
              "flex w-[1121px] flex-wrap justify-center gap-x-10 gap-y-7 pt-10",
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
