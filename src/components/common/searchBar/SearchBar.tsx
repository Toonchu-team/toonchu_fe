"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { X, Search } from "lucide-react";
import Dropdown from "../dropdown/Dropdown";

const SearchBar = () => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const providers = ["전체", "네이버", "카카오", "카카오페이지"];
  const [provider, setProvider] = useState<string>("전체");
  const [searchTag, setSearchTag] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const apiUrl = "api/webtoon/search";

  // TailwindCSS 클래스 정리
  const inputClass = "pl-3 text-main-text focus:outline-none";
  const containerClass = "flex items-center justify-start relative border-l-2";
  const clearIconClass = "absolute right-2 cursor-pointer text-main-text";

  return (
    <div
      className={clsx(
        "border-1 flex flex-col justify-center rounded-3xl bg-white px-1",
        "h-10 w-[870px] scale-75 border lg:scale-100",
      )}
    >
      {/* 검색 버튼 */}
      <button
        className="fixed flex h-8 w-9 items-center justify-center self-end rounded-r-3xl bg-main-yellow pr-1"
        onClick={() => {
          const queryString = `provider=${provider}${searchTag ? `&tag=${searchTag}` : ""}${searchTerm ? `&term=${searchTerm}` : ""}`;
          console.log(`${apiUrl}?${queryString}`);

          // 검색창 초기화
          setProvider("전체");
          setSearchTag("");
          setSearchTerm("");
        }}
      >
        <Search color="#FFF" width={20} />
      </button>

      {/* 검색 바 컨테이너 */}
      <div className="relative flex w-[820px] items-center justify-around pl-5">
        {/* 배급사 선택 드롭다운 */}
        <Dropdown
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          elements={providers}
          option={provider}
          setOption={setProvider}
        />
        {/* 태그 입력 */}
        <div className={clsx(containerClass, "h-8 w-[230px]")}>
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
              width={15}
              onClick={() => setSearchTag("")}
            />
          )}
        </div>
        {/* 검색어 입력 */}
        <div className={clsx(containerClass, "h-8 w-[400px]")}>
          <input
            type="text"
            className={clsx(inputClass, "w-[95%]")}
            placeholder="검색어를 입력하라냥"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <X
              className={clearIconClass}
              width={15}
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
