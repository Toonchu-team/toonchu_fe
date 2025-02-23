"use client";

import useBreakpoint from "@/hooks/useBreakpoint";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Dropdown from "@/components/common/dropdown/Dropdown";
import PaginationList from "@/components/common/pagination/PaginationList";
import WebtoonCard from "@/components/common/webtoonCard/WebtoonCard";
import s from "./tagSearch.module.scss";
import WebtoonCardMobile from "@/components/common/webtoonCard/WebtoonCardMobile";
import DropdownMobile from "@/components/common/dropdown/DropdownMobile";
import useWebtoonStore from "@/stores/webtoonStore";
import NoResults from "../noResults";

export default function TagSearchClient() {
  const { selectedTags, selectedTagIds, toggleTag, resetTag, webtoons } =
    useWebtoonStore();
  const resetSearchState = useWebtoonStore((state) => state.resetSearchState);

  // 컴포넌트 언마운트 시 검색 결과 초기화
  useEffect(() => {
    return () => {
      // 페이지를 떠날 때 상태 초기화
      resetSearchState();
    };
  }, [resetSearchState]);

  const breakpoint = useBreakpoint();
  const data = webtoons; // 검색 결과

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
          {/* 선택한 태그 */}
          {/* 검색 요청에서 받아와야 할 것 같음 */}
          <div
            className={clsx(
              "flex flex-wrap justify-center gap-2 overflow-y-auto xl:h-[100px] xl:gap-3",
              s.selected_tag_container,
            )}
          >
            <button
              className="h-[21px] rounded-md border border-main-yellow bg-bg-yellow-02 px-1.5 py-1 text-[10px] leading-none text-main-text hover:bg-bg-yellow-01 md:h-[25px] md:rounded-lg md:px-2 md:py-1 md:text-xs xl:h-[34px] xl:text-base"
              onClick={() => {
                resetTag();
              }}
            >
              선택한 태그 초기화
            </button>
            {selectedTags.map((selectedTag, idx) => {
              return (
                <div
                  key={idx}
                  className={clsx(
                    `border-1-main-grey inline-block cursor-pointer px-1.5 py-1`,
                    `h-[21px] rounded-md border hover:bg-bg-yellow-01`,
                    `md:h-[25px] md:rounded-lg md:px-2 md:py-1`,
                    `xl:h-[34px]`,
                  )}
                  onClick={() => {
                    const id = selectedTagIds[idx];
                    toggleTag(selectedTag, id);
                  }}
                >
                  <p
                    className={clsx(
                      `text-[10px] leading-none text-main-text md:text-xs xl:text-base`,
                    )}
                  >
                    #{selectedTag}
                  </p>
                </div>
              );
            })}
          </div>

          <div className={clsx("flex flex-col", s.dropdown_container)}>
            {webtoons.length !== 0 && (
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
            )}

            {/* 검색 결과 - 카드 컴포넌트 */}
            {webtoons.length === 0 && <NoResults />}
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
