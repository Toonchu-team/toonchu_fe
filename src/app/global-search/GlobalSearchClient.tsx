"use client";

import useBreakpoint from "@/hooks/useBreakpoint";
import WebtoonCardMobile from "@/components/common/webtoonCard/WebtoonCardMobile";
import PaginationList from "@/components/common/pagination/PaginationList";
import clsx from "clsx";
import Dropdown from "@/components/common/dropdown/Dropdown";
import DropdownMobile from "@/components/common/dropdown/DropdownMobile";
import s from "./globalSearch.module.scss";
import { useEffect, useRef, useState } from "react";
import WebtoonCard from "@/components/common/webtoonCard/WebtoonCard";
import ResponsiveSearchBar from "@/components/common/searchBar/ResponsiveSearchBar";
import useWebtoonStore from "@/stores/webtoonStore";
import { usePathname } from "next/navigation";
import NoResults from "@/app/noResults";

export default function GlobalSearchClient() {
  const breakpoint = useBreakpoint();
  const { webtoons } = useWebtoonStore();
  const data = webtoons;

  const resetSearchState = useWebtoonStore((state) => state.resetSearchState);
  // 컴포넌트 언마운트 시 검색 결과 초기화
  // 컴포넌트가 마운트될 때의 초기 pathname을 저장
  const pathname = usePathname();
  const initialPathname = useRef(pathname);

  useEffect(() => {
    // pathname이 변경되면 GlobalSearchClient 페이지가 아니면 상태 초기화
    if (pathname !== initialPathname.current) {
      if (!pathname.includes("/global-search")) {
        resetSearchState();
      }
    }
  }, [pathname, resetSearchState]);

  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("인기순");
  const sortArray = ["인기순", "등록순", "오래된순"];

  return (
    <div className={s[breakpoint]}>
      <div
        className={clsx(
          "flex flex-col items-center pb-10",
          "px-mobile lg:px-desktop tablet:px-tablet",
          s.container,
        )}
      >
        {/* 제목 */}
        <p className={`${s.text} font-bold`}>통합 검색</p>

        <div className={`flex flex-col items-center ${s.content_container}`}>
          {/* 검색창 */}
          <ResponsiveSearchBar type="global" />

          <div
            className={clsx("flex flex-col items-center", s.dropdown_container)}
          >
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
                    type="prov"
                  />
                ) : (
                  <Dropdown
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                    elements={sortArray}
                    option={sort}
                    setOption={setSort}
                    type="prov"
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
