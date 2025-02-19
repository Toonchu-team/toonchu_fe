"use client";

import React, { useState } from 'react';
import SearchBar from '../common/searchBar/SearchBar';
import WebtoonCard from '../common/webtoonCard/WebtoonCard';
import PaginationList from '../common/pagination/PaginationList';
import WebtoonCardMobile from '../common/webtoonCard/WebtoonCardMobile';
import useBreakpoint from '@/hooks/useBreakpoint';

export default function FavoritesList() {
  const [sortBy, setSortBy] = useState('latest');
  const breakpoint = useBreakpoint();

  return (
    <div className="pt-4 pb-10 px-4 md:px-0">
      <div className="flex w-[1121px] origin-top transform flex-col gap-6 scale-[60%] lg:scale-75 xl:scale-100">
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
        <div className="flex w-[1121px] origin-top transform flex-col items-center">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-7">
            <PaginationList>
              {breakpoint === "mobile" ? (
                <WebtoonCardMobile />
              ) : (
                <WebtoonCard />
              )}
            </PaginationList>
          </div>
        </div>
      </div>
    </div>
  );
}