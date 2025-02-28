"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { X, Search } from "lucide-react";
import Dropdown from "../dropdown/Dropdown";
import { useRouter, useSearchParams } from "next/navigation";
import useWebtoonStore from "@/stores/webtoonStore";
import { engProviderMapping } from "@/lib/utils/engFomatter";
import { provMapping } from "@/lib/utils/korFomatter";

const SearchBar = ({ type }: { type?: string }) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const providers = [
    "전체",
    "네이버",
    "카카오",
    "카카오페이지",
    "포스타입",
    "그 외",
  ];

  const router = useRouter();
  const {
    globalSearch,
    selectedProvider,
    selectedTag,
    selectedTerm,
    setSelectedTag,
    setSelectedTerm,
    setSelectedProvider,
  } = useWebtoonStore();

  // 검색 버튼 클릭 시 실행
  const searchHandler = () => {
    if (!selectedProvider) globalSearch("전체", selectedTag, selectedTerm);
    else globalSearch(selectedProvider, selectedTag, selectedTerm);

    // 현재 페이지의 쿼리스트링 생성
    const params = new URLSearchParams();
    params.set(
      "provider",
      engProviderMapping[selectedProvider ? selectedProvider : "전체"],
    );
    if (selectedTag) params.set("tag", selectedTag);
    if (selectedTerm) params.set("term", selectedTerm);

    // 현재 페이지 URL에 쿼리스트링 적용
    router.replace(`/global-search?${params.toString()}`);

    // 통합 검색의 경우 통합 검색 페이지로 이동
    if (type === "header") {
      router.push(`/global-search?${params.toString()}`);
    }
  };

  const searchParams = useSearchParams();

  // 엔터키 입력 이벤트 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  useEffect(() => {
    const providerParam = searchParams.get("provider");
    const tagParam = searchParams.get("tag");
    const termParam = searchParams.get("term");

    if (providerParam)
      setSelectedProvider(provMapping[providerParam] || "전체");
    setSelectedTag(tagParam || "");
    setSelectedTerm(termParam || "");

    if (providerParam)
      globalSearch(
        provMapping[providerParam] || "전체",
        tagParam || "",
        termParam || "",
      );
  }, [
    searchParams,
    setSelectedProvider,
    setSelectedTag,
    setSelectedTerm,
    globalSearch,
  ]);

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
      <div className="relative flex w-[650px] items-center justify-around pl-2 text-sm xl:w-[820px] xl:pl-5 xl:text-base">
        {/* 배급사 선택 드롭다운 */}
        <Dropdown
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          elements={providers}
          option={selectedProvider ? selectedProvider : "전체"}
          setOption={setSelectedProvider}
          type="prov"
        />
        {/* 태그 입력 */}
        <div className={clsx(containerClass, "h-8 w-[230px]")}>
          <input
            type="text"
            className={clsx(inputClass, "w-[85%]")}
            placeholder="태그를 입력하라냥"
            value={selectedTag ? selectedTag : ""}
            onChange={(e) => setSelectedTag(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {selectedTag && (
            <X
              className={clearIconClass}
              width={15}
              onClick={() => setSelectedTag("")}
            />
          )}
        </div>
        {/* 검색어 입력 */}
        <div className={clsx(containerClass, "h-8 w-[270px] xl:w-[400px]")}>
          <input
            type="text"
            className={clsx(inputClass, "w-[95%]")}
            placeholder="검색어를 입력하라냥"
            value={selectedTerm ? selectedTerm : ""}
            onChange={(e) => setSelectedTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {selectedTerm && (
            <X
              className={clearIconClass}
              width={15}
              onClick={() => setSelectedTerm("")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
