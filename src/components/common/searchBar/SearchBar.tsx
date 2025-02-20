"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { X, Search } from "lucide-react";
import Dropdown from "../dropdown/Dropdown";
import { useRouter } from "next/navigation";

const SearchBar = ({ type }: { type?: string }) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const providers = ["전체", "네이버", "카카오", "카카오페이지"];
  const [provider, setProvider] = useState<string>("전체");
  const [searchTag, setSearchTag] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const apiglobalUrl = "api/webtoon/searchglobal";
  const apiTagUrl = "api/webtoon/searchtag";
  const apiDayUrl = "api/webtoon/searchday";
  const router = useRouter();

  // 검색 버튼 클릭 시 실행
  const searchHandler = () => {
    const queryString = `provider=${provider}${searchTag ? `&tag=${searchTag}` : ""}${searchTerm ? `&term=${searchTerm}` : ""}`;
    console.log(
      `${type === "global" || "header" ? apiglobalUrl : type === "tag" ? apiTagUrl : apiDayUrl}?${queryString}`,
    );

    // 검색창 초기화
    setProvider("전체");
    setSearchTag("");
    setSearchTerm("");

    // 통합 검색의 경우 통합 검색 페이지로 이동
    if (type === "header") {
      router.push("/global-search");
    }
  };

  // TailwindCSS 클래스 정리
  const inputClass = "pl-3 text-main-text focus:outline-none";
  const containerClass = "flex items-center justify-start relative border-l-2";
  const clearIconClass = "absolute right-2 cursor-pointer text-main-text";

  return (
    <div
      className={clsx(
        "border-1 relative flex flex-col justify-center rounded-3xl bg-white px-1",
        "h-8 w-[700px] border xl:h-10 xl:w-[870px]",
      )}
    >
      {/* 검색 버튼 */}
      <button
        className="absolute flex h-6 w-8 items-center justify-center self-end rounded-r-3xl bg-main-yellow pr-1 xl:h-8 xl:w-9"
        onClick={searchHandler}
      >
        <Search color="#FFF" width={20} />
      </button>

      {/* 검색 바 컨테이너 */}
      <div className="relative flex w-[650px] items-center justify-around pl-5 text-sm xl:w-[820px] xl:text-base">
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
        <div className={clsx(containerClass, "h-8 w-[270px] xl:w-[400px]")}>
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
