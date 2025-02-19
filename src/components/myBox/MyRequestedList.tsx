"use client";

import React from 'react';
import Image from 'next/image';
import Status from '@/components/common/status/Status';
import PaginationList from '@/components/common/pagination/PaginationList';

interface RequestedWebtoon {
  id: number;
  title: string;
  thumbnail: string;
  status: 'PENDING' | 'REGISTERED' | 'REJECTED';
  author: string;
}

export default function MyRequestedList() {
  // 임시 데이터
  const requestedWebtoons: RequestedWebtoon[] = Array.from({ length: 40 }, (_, index) => ({
    id: index + 1,
    title: "미래의 골동품 가게",
    thumbnail: "/image.png",
    status: ['PENDING', 'REGISTERED', 'REJECTED'][Math.floor(Math.random() * 3)] as 'PENDING' | 'REGISTERED' | 'REJECTED',
    author: "구아진"
  }));

  // 웹툰 카드 컴포넌트
  const WebtoonCard = ({ webtoon }: { webtoon: RequestedWebtoon }) => (
    <div className="flex flex-col transition-transform hover:scale-105">
      {/* 썸네일 */}
      <div className="relative mb-3 aspect-[3/4] w-full max-w-[160px] drop-shadow-md">
        <Image
          src={webtoon.thumbnail}
          alt={webtoon.title}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      
      {/* 웹툰 정보 */}
      <div className="flex w-full max-w-[160px] flex-col gap-2">
        <div className="flex flex-col gap-2.5">
          <div className="space-y-1">
            <h3 className="text-base font-normal line-clamp-1">{webtoon.title}</h3>
            <p className="text-sm text-main-text">{webtoon.author}</p>
          </div>
          <Status status={webtoon.status} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-4 pb-16">
      <div className="mx-auto flex w-[900px] origin-top transform flex-col gap-6 scale-[60%] lg:scale-75 xl:scale-100">
        
        <h2 className="text-lg font-normal text-main-text">등록 신청한 작품</h2>
        
        <div className="flex flex-col w-full">  
          <PaginationList>
            <div className="mb-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
              {requestedWebtoons.slice(0, 15).map((webtoon) => (
                <WebtoonCard key={webtoon.id} webtoon={webtoon} />
              ))}
            </div>
          </PaginationList>
        </div>
      </div>
    </div>
  );
}