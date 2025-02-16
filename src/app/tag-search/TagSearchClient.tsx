"use client";

import { BreakpointType } from "@/stores/breakptStore";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useState } from "react";
import clsx from "clsx";
import SearchBar from "@/components/common/searchBar/SearchBar";
import Dropdown from "@/components/common/dropdown/Dropdown";
import PaginationList from "@/components/common/pagination/PaginationList";
import WebtoonCard from "@/components/common/webtoonCard/WebtoonCard";
import Tags from "@/components/common/tag/Tags";
import s from "./tagSearch.module.scss";
import SearchBarMobile from "@/components/common/searchBar/SearchBarMobile";
import WebtoonCardMobile from "@/components/common/webtoonCard/WebtoonCardMobile";
import DropdownMobile from "@/components/common/dropdown/DropdownMobile";

export default function TagSearchClient() {
  const breakpoint = useBreakpoint();

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
          {breakpoint === "mobile" ? <SearchBarMobile /> : <SearchBar />}

          {/* 선택한 태그 */}
          {/* 검색 요청에서 받아와야 할 것 같음 */}
          <div
            className={clsx(
              "flex h-[100px] flex-wrap justify-center gap-3 overflow-y-auto",
              s.selected_tag_container,
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
