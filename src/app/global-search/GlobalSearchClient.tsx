"use client";

import { BreakpointType } from "@/stores/breakptStore";
import useBreakpoint from "@/hooks/useBreakpoint";
import WebtoonCardMobile from "@/components/common/webtoonCard/WebtoonCardMobile";
import PaginationList from "@/components/common/pagination/PaginationList";
import clsx from "clsx";
import Dropdown from "@/components/common/dropdown/Dropdown";
import DropdownMobile from "@/components/common/dropdown/DropdownMobile";
import SearchBarMobile from "@/components/common/searchBar/SearchBarMobile";
import SearchBar from "@/components/common/searchBar/SearchBar";
import s from "./globalSearch.module.scss";
import { useState } from "react";
import WebtoonCard from "@/components/common/webtoonCard/WebtoonCard";

export default function GlobalSearchClient({
  initialBreakpoint,
}: {
  initialBreakpoint: BreakpointType;
}) {
  const breakpoint = useBreakpoint(initialBreakpoint);
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
        <p className={`${s.text} font-bold`}>통합합 검색</p>

        <div className={`flex flex-col items-center ${s.content_container}`}>
          {/* 검색창 */}
          {breakpoint === "mobile" ? <SearchBarMobile /> : <SearchBar />}

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
