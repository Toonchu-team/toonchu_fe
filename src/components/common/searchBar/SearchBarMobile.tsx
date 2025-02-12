"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { X, Search } from "lucide-react";
import DropdownMobile from "../dropdown/DropdownMobile";

const SearchBarMobile = () => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const providers = ["전체", "네이버", "카카오", "카카오페이지"];
  const [provider, setProvider] = useState<string>("전체");
  const [searchTag, setSearchTag] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const apiUrl = "api/webtoon/search";

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
        onClick={() => {
          const queryString = `provider=${provider}${searchTag ? `&tag=${searchTag}` : ""}${searchTerm ? `&term=${searchTerm}` : ""}`;
          console.log(`${apiUrl}?${queryString}`);

          // 검색창 초기화
          setProvider("전체");
          setSearchTag("");
          setSearchTerm("");
        }}
      >
        <Search color="#FFF" size={12} />
      </button>

      {/* 검색 바 컨테이너 */}
      <div className="z-50 flex items-center gap-1 pl-1">
        {/* 제공사 선택 드롭다운 */}
        <DropdownMobile
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          elements={providers}
          option={provider}
          setOption={setProvider}
        />

        {/* 태그 입력 */}
        <div className={clsx(containerClass, "h-4 w-[110px]")}>
          <input
            type="text"
            className={clsx(inputClass, "w-[85%]")}
            placeholder="태그를 입력하라냥"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
          />
          {searchTag && (
            <X
              className={clearIconClass}
              size={11}
              onClick={() => setSearchTag("")}
            />
          )}
        </div>

        {/* 검색어 입력 */}
        <div className={clsx(containerClass, "h-4 w-[115px]")}>
          <input
            type="text"
            className={clsx(inputClass, "w-[85%]")}
            placeholder="검색어를 입력하라냥"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <X
              className={clearIconClass}
              size={11}
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBarMobile;
