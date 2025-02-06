"use client";

import React, { useState } from "react";
import { X, Search, ChevronDown } from "lucide-react";

const SearchBarMoblie = () => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const providers = ["전체", "네이버", "카카오", "카카오페이지"];
  const [provider, setProvider] = useState<string>("전체");
  const [searchTag, setSearchTag] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const apiUrl = "api/webtoon/search";

  // TailwindCSS
  const inputClass = "pl-2 focus:outline-none text-main-text";
  const containerClass =
    "flex justify-start items-center relative border-l-[1px]";
  const clearIconClass = "absolute cursor-pointer text-main-text";

  return (
    <div className="border-1 relative flex h-6 w-[350px] flex-grow origin-left flex-col justify-center rounded-xl border bg-white px-1">
      <button
        className="absolute flex h-4 w-5 items-center justify-center self-end rounded-r-xl bg-main-yellow pr-0.5"
        onClick={() => {
          const queryString = `provider=${provider}${searchTag && `&tag=${searchTag}`}${searchTerm && `&term=${searchTerm}`}`;
          console.log(`${apiUrl}?${queryString}`); // 확인용

          // 검색창 초기화
          setProvider("전체");
          setSearchTag("");
          setSearchTerm("");
        }}
      >
        <Search color="#FFF" size={12} />
      </button>
      <div className="flex items-center gap-1 pl-1">
        <div className="relative flex h-5 w-[70px] items-center justify-center">
          <div
            className="relative flex w-[70px] cursor-pointer text-main-text"
            onClick={() => {
              setOpenDropdown((prev) => !prev);
            }}
          >
            <p className="text-[10px]">{provider}</p>
            <ChevronDown
              className="absolute right-0 top-0.5"
              color="#6a6a6a"
              size={12}
            />
          </div>
          {openDropdown && (
            <div className="border-1 absolute top-6 flex h-24 w-20 cursor-pointer flex-col rounded-md border bg-white">
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
                    <p className="text-[10px] text-main-text">{provider}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className={`${containerClass} h-4 w-[110px]`}>
          <input
            type="text"
            className={`${inputClass} w-[85%] text-[10px]`}
            placeholder="태그를 입력하라냥"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
          />
          {searchTag && (
            <X
              className={`${clearIconClass} right-0`}
              size={11}
              onClick={() => setSearchTag("")}
            />
          )}
        </div>

        <div className={`${containerClass} h-4 w-[115px]`}>
          <input
            type="text"
            className={`${inputClass} w-[85%] text-[10px]`}
            placeholder="검색어를 입력하라냥"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <X
              className={`${clearIconClass} right-0`}
              width={11}
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBarMoblie;
