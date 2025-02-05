"use client";

import React, { useState } from "react";
import { X, Search, ChevronDown } from "lucide-react";

const SearchBar = () => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const providers = ["전체", "네이버", "카카오", "카카오페이지"];
  const [provider, setProvider] = useState<string>("전체");
  const [searchTag, setSearchTag] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const apiUrl = "api/webtoon/search";

  // TailwindCSS
  const inputClass = "pl-3 focus:outline-none text-main-text";
  const containerClass = "flex justify-start items-center relative border-l-2";
  const clearIconClass = "absolute cursor-pointer text-main-text";

  // 태블릿 뷰: scale-75

  return (
    <div className="border-1 flex h-10 w-[870px] scale-75 flex-col justify-center rounded-3xl border bg-white px-1 lg:scale-100">
      <button
        className="fixed flex h-8 w-9 items-center justify-center self-end rounded-r-3xl bg-main-yellow pr-1"
        onClick={() => {
          const queryString = `provider=${provider}${searchTag && `&tag=${searchTag}`}${searchTerm && `&term=${searchTerm}`}`;
          console.log(`${apiUrl}?${queryString}`); // 확인용

          // 검색창 초기화
          setProvider("전체");
          setSearchTag("");
          setSearchTerm("");
        }}
      >
        <Search color="#FFF" width={20} />
      </button>
      <div className="flex w-[820px] items-center justify-around pl-5">
        <div className="relative flex h-8 w-[150px] items-center justify-center">
          <div
            className="relative flex w-36 cursor-pointer text-main-text"
            onClick={() => {
              setOpenDropdown((prev) => !prev);
            }}
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
              {providers.map((provider, index) => {
                return (
                  <div
                    key={index}
                    className="flex h-1/3 w-full items-center justify-center hover:bg-bg-yellow-01"
                    onClick={() => {
                      setProvider(provider);
                      setOpenDropdown(false);
                    }}
                  >
                    <p className="text-main-text">{provider}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className={`${containerClass} h-8 w-[230px]`}>
          <input
            type="text"
            className={`${inputClass} w-[85%]`}
            placeholder="태그를 입력하라냥"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
          />
          {searchTag && (
            <X
              className={`${clearIconClass} right-2`}
              width={15}
              onClick={() => setSearchTag("")}
            />
          )}
        </div>

        <div className={`${containerClass} h-8 w-[400px]`}>
          <input
            type="text"
            className={`${inputClass} w-[95%]`}
            placeholder="검색어를 입력하라냥"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <X
              className={`${clearIconClass} right-2`}
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
