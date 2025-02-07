"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { X, Search, ChevronDown } from "lucide-react";

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
      <div className="flex w-[820px] items-center justify-around pl-5">
        {/* 배급사 선택 드롭다운 */}
        <div className="relative flex h-8 w-[150px] items-center justify-center">
          <div
            className="relative flex w-36 cursor-pointer text-main-text"
            onClick={() => setOpenDropdown((prev) => !prev)}
          >
            <p>{provider}</p>
            <ChevronDown
              className="absolute right-1"
              color="#6a6a6a"
              width={20}
            />
          </div>
          {openDropdown && (
            <div className="border-1 absolute top-10 flex h-32 w-36 cursor-pointer flex-col rounded-xl border bg-white">
              {providers.map((prov, index) => (
                <div
                  key={index}
                  className="flex h-1/3 w-full items-center justify-center hover:bg-bg-yellow-02"
                  onClick={() => {
                    setProvider(prov);
                    setOpenDropdown(false);
                  }}
                >
                  <p className="text-main-text">{prov}</p>
                </div>
              ))}
            </div>
          )}
        </div>

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
