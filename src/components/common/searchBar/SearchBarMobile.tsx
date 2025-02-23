"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { X, Search } from "lucide-react";
import DropdownMobile from "../dropdown/DropdownMobile";
import { useRouter } from "next/navigation";
import useWebtoonStore from "@/stores/webtoonStore";

const SearchBarMobile = ({ type }: { type?: string }) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const providers = ["전체", "네이버", "카카오", "카카오페이지", "포스타입"];
  const router = useRouter();

  // store의 상태와 액션을 가져옵니다.
  const {
    globalSearch,
    selectedProvider,
    selectedTag,
    selectedTerm,
    setSelectedProvider,
    setSelectedTag,
    setSelectedTerm,
  } = useWebtoonStore();

  // 검색 버튼 클릭 시 실행
  const searchHandler = () => {
    globalSearch(selectedProvider, selectedTag, selectedTerm);

    // 통합 검색의 경우 통합 검색 페이지로 이동
    if (type === "header") {
      router.push("/global-search");
    }
  };

  // TailwindCSS 클래스 정리
  const inputClass = "pl-2 text-main-text text-[10px] focus:outline-none";
  const containerClass =
    "flex items-center justify-start relative border-l-[1px]";
  const clearIconClass = "absolute right-0 cursor-pointer text-main-text";

  return (
    <div
      className={clsx(
        "border-1 relative flex flex-col justify-center bg-white px-1",
        "h-6 w-[350px] flex-grow origin-left rounded-xl border",
      )}
    >
      {/* 검색 버튼 */}
      <button
        className="absolute flex h-4 w-5 items-center justify-center self-end rounded-r-xl bg-main-yellow pr-0.5"
        onClick={searchHandler}
      >
        <Search color="#FFF" size={12} />
      </button>

      {/* 검색 바 컨테이너 */}
      <div className="flex items-center gap-1 pl-1">
        {/* 제공사 선택 드롭다운 */}
        <DropdownMobile
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          elements={providers}
          option={selectedProvider ? selectedProvider : "전체"}
          setOption={setSelectedProvider}
        />

        {/* 태그 입력 */}
        <div className={clsx(containerClass, "h-4 w-[110px]")}>
          <input
            type="text"
            className={clsx(inputClass, "w-[85%]")}
            placeholder="태그를 입력하라냥"
            value={selectedTag || ""}
            onChange={(e) => setSelectedTag(e.target.value)}
          />
          {selectedTag && (
            <X
              className={clearIconClass}
              size={11}
              onClick={() => setSelectedTag("")}
            />
          )}
        </div>

        {/* 검색어 입력 */}
        <div className={clsx(containerClass, "h-4 w-[115px]")}>
          <input
            type="text"
            className={clsx(inputClass, "w-[85%]")}
            placeholder="검색어를 입력하라냥"
            value={selectedTerm || ""}
            onChange={(e) => setSelectedTerm(e.target.value)}
          />
          {selectedTerm && (
            <X
              className={clearIconClass}
              size={11}
              onClick={() => setSelectedTerm("")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBarMobile;
