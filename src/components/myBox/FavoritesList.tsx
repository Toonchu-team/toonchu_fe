"use client";

import React, { useState } from "react";
import SearchBar from "../common/searchBar/SearchBar";
// import WebtoonCard from "../common/webtoonCard/WebtoonCard";

export default function FavoritesList() {
  const [sortBy, setSortBy] = useState("latest");

  return (
    <div className="px-4 pb-10 pt-4 md:px-0">
      <div className="flex w-[1121px] origin-top scale-[60%] transform flex-col gap-6 lg:scale-75 xl:scale-100">
        {/* 검색 및 정렬 */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <SearchBar />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-md border border-main-text px-4 py-2 focus:border-main-yellow focus:outline-none md:w-32"
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
          </select>
        </div>

        {/* 웹툰 목록 */}
        <div className="flex w-[1121px] origin-top transform flex-col gap-14">
          <div className="flex flex-wrap gap-x-10 gap-y-7">
            {/* {[...Array(10)].map((_, index) => (
              <WebtoonCard key={index} />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
