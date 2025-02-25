"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Status from '@/components/common/status/Status';
import { SerialDay } from '@/lib/types/webtoon';
import { dayMapping } from '@/lib/utils/korFomatter';
import { X } from 'lucide-react';

interface WebtoonTag {
  id: number;
  tag_name: string;
  category: string;
}

interface RequestedWebtoon {
  title: string;
  author: string;
  thumbnail: string;
  webtoon_url: string;
  publication_day: string;
  platform: string;
  serial_day: SerialDay[] | SerialDay;
  serialization_cycle: string;
  created_at: string;
  updated_at: string;
  is_new: boolean;
  is_completed: boolean;
  like_count: number;
  view_count: number;
  is_approved: 'pending' | 'approved' | 'rejected';
  tags: WebtoonTag[];
}

// 날짜 포맷팅 함수
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}년 ${month}월 ${day}일`;
  } catch (error) {
    console.error('날짜 변환 오류:', error);
    return dateString;
  }
};

export default function MyRequestedList() {
  const [selectedWebtoon, setSelectedWebtoon] = useState<RequestedWebtoon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 임시 데이터
  const requestedWebtoons: RequestedWebtoon[] = Array.from({ length: 15 }, (_, index) => ({
    title: "미래의 골동품 가게",
    author: "구아진",
    thumbnail: "/image.png",
    webtoon_url: "https://comic.naver.com/webtoon/list?titleId=742105",
    publication_day: "2020-03-03",
    platform: "naver",
    serial_day: "wed",
    serialization_cycle: "1weeks",
    created_at: "2025-02-24T18:20:57.090Z",
    updated_at: "2025-02-24T18:20:57.090Z",
    is_new: false,
    is_completed: false,
    like_count: 0,
    view_count: 0,
    is_approved: ['pending', 'approved', 'rejected'][Math.floor(Math.random() * 3)] as 'pending' | 'approved' | 'rejected',
    tags: [
      {
        id: 0,
        tag_name: "퇴마물",
        category: "genre"
      },
      {
        id: 1,
        tag_name: "퇴마사",
        category: "job"
      }
    ]
  }));

  const handleWebtoonClick = (webtoon: RequestedWebtoon) => {
    setSelectedWebtoon(webtoon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWebtoon(null);
  };

  // 웹툰 카드 컴포넌트
  const WebtoonCard = ({ webtoon }: { webtoon: RequestedWebtoon }) => (
    <div 
      className="flex flex-col transition-transform hover:scale-105 cursor-pointer"
      onClick={() => handleWebtoonClick(webtoon)}
    >
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
          <Status status={webtoon.is_approved as 'pending' | 'approved' | 'rejected'} />
        </div>
      </div>
    </div>
  );

  // 웹툰 상세 모달
  const WebtoonDetailModal = ({ webtoon }: { webtoon: RequestedWebtoon }) => {
    // 날짜를 보기 좋은 형태로 변환
    const formattedPublicationDay = formatDate(webtoon.publication_day);
    const formattedCreatedAt = formatDate(webtoon.created_at);
    const formattedUpdatedAt = formatDate(webtoon.updated_at);

    // 연재 요일을 한글로 변환
    const serialDayText = Array.isArray(webtoon.serial_day)
      ? webtoon.serial_day.map(day => dayMapping[day]).join(', ')
      : dayMapping[webtoon.serial_day as SerialDay];

    // 연재 주기 텍스트 변환
    const getCycleText = (cycle: string) => {
      switch(cycle) {
        case '1weeks': return '매주';
        case '2weeks': return '격주';
        case '10days': return '10일';
        case '20days': return '20일';
        case 'month': return '월간';
        default: return cycle;
      }
    };

    // 플랫폼 텍스트 변환
    const getPlatformText = (platform: string) => {
      switch(platform) {
        case 'naver': return '네이버 웹툰';
        case 'kakao': return '카카오 웹툰';
        case 'kakaopage': return '카카오페이지';
        case 'postype': return '포스타입';
        default: return platform;
      }
    };

    // 태그를 카테고리별로 그룹화
    const groupedTags: Record<string, string[]> = {};
    webtoon.tags.forEach(tag => {
      if (!groupedTags[tag.category]) {
        groupedTags[tag.category] = [];
      }
      groupedTags[tag.category].push(tag.tag_name);
    });

    // 카테고리 한글명 변환
    const getCategoryText = (category: string) => {
      switch(category) {
        case 'genre': return '장르';
        case 'matter': return '소재';
        case 'atmosphere': return '분위기';
        case 'relation': return '관계';
        case 'job': return '직업';
        case 'male_character': return '남캐';
        case 'female_character': return '여캐';
        case 'character': return '캐릭터성';
        case 'top_bottom': return '공수 관계';
        case 'etc': return '기타';
        default: return category;
      }
    };

    // 상태에 따른 배경색 지정
    const getStatusBgColor = (status: 'pending' | 'approved' | 'rejected') => {
      switch(status) {
        case 'pending': return 'bg-yellow-100';
        case 'approved': return 'bg-green-100';
        case 'rejected': return 'bg-red-100';
        default: return 'bg-gray-100';
      }
    };

    // 상태에 따른 텍스트 색상 지정
    const getStatusTextColor = (status: 'pending' | 'approved' | 'rejected') => {
      switch(status) {
        case 'pending': return 'text-yellow-700';
        case 'approved': return 'text-green-700';
        case 'rejected': return 'text-red-700';
        default: return 'text-gray-700';
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeModal}>
        <div 
          className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl" 
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6">
            {/* 헤더 영역 */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{webtoon.title}</h2>
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBgColor(webtoon.is_approved)} ${getStatusTextColor(webtoon.is_approved)}`}>
                  {webtoon.is_approved === 'pending' ? '승인 대기' : webtoon.is_approved === 'approved' ? '승인됨' : '반려됨'}
                </div>
                <button 
                  className="rounded-full bg-gray-100 p-1.5 text-gray-500 transition-all hover:bg-gray-200"
                  onClick={closeModal}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* 기본 정보 영역 */}
            <div className="mb-8 flex flex-col md:flex-row md:gap-6">
              {/* 썸네일 */}
              <div className="mb-4 md:mb-0">
                <div className="relative aspect-[3/4] w-[140px] overflow-hidden rounded-lg shadow-md">
                  <Image
                    src={webtoon.thumbnail}
                    alt={webtoon.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* 웹툰 정보 */}
              <div className="flex-grow">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-lg font-medium">{webtoon.author}</span>
                  <span className="text-sm text-gray-500">작가</span>
                </div>
                
                <div className="mb-6 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-8">
                  {/* 플랫폼 정보 */}
                  <div>
                    <p className="text-sm text-gray-500">플랫폼</p>
                    <p className="font-medium">{getPlatformText(webtoon.platform)}</p>
                  </div>
                  
                  {/* 연재 시작일 */}
                  <div>
                    <p className="text-sm text-gray-500">연재 시작일</p>
                    <p className="font-medium">{formattedPublicationDay}</p>
                  </div>
                  
                  {/* 연재 요일 */}
                  <div>
                    <p className="text-sm text-gray-500">연재 요일</p>
                    <p className="font-medium">{serialDayText}</p>
                  </div>
                  
                  {/* 연재 주기 */}
                  <div>
                    <p className="text-sm text-gray-500">연재 주기</p>
                    <p className="font-medium">{getCycleText(webtoon.serialization_cycle)}</p>
                  </div>
                  
                  {/* 신작 여부 */}
                  <div>
                    <p className="text-sm text-gray-500">신작 여부</p>
                    <p className="font-medium">{webtoon.is_new ? '신작' : '아님'}</p>
                  </div>
                  
                  {/* 완결 여부 */}
                  <div>
                    <p className="text-sm text-gray-500">완결 여부</p>
                    <p className="font-medium">{webtoon.is_completed ? '완결' : '연재중'}</p>
                  </div>
                </div>
                
                {/* 링크 정보 */}
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="mb-1 text-sm text-gray-500">웹툰 링크</p>
                  <a 
                    href={webtoon.webtoon_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block truncate text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {webtoon.webtoon_url}
                  </a>
                </div>
              </div>
            </div>
            
            {/* 태그 정보 */}
            <div className="mb-6">
              <h3 className="mb-4 text-lg font-medium">태그 정보</h3>
              <div className="flex flex-col gap-4 rounded-lg bg-gray-50 p-4">
                {Object.keys(groupedTags).length > 0 ? (
                  Object.keys(groupedTags).map(category => (
                    <div key={category} className="flex flex-wrap items-start gap-2">
                      <span className="whitespace-nowrap rounded-md bg-gray-200 px-2 py-1 text-sm font-medium">
                        {getCategoryText(category)}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {groupedTags[category].map((tag, index) => (
                          <span 
                            key={index} 
                            className="rounded-full bg-bg-yellow-01 px-3 py-1 text-sm text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">등록된 태그가 없습니다.</p>
                )}
              </div>
            </div>
            
            {/* 등록 정보 푸터 */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="flex flex-col justify-between gap-2 text-sm text-gray-500 md:flex-row">
                <div className="flex items-center gap-1">
                  <span>등록 신청일:</span>
                  <span className="font-medium">{formattedCreatedAt}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>최종 업데이트:</span>
                  <span className="font-medium">{formattedUpdatedAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-4 pb-16">
      <div className="mx-auto flex w-[900px] origin-top transform flex-col gap-6 scale-[60%] lg:scale-75 xl:scale-100">
        
        <h2 className="text-lg font-normal text-main-text">등록 신청한 작품</h2>
        
        <div className="flex flex-col w-full">  
          <div className="mb-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
            {requestedWebtoons.map((webtoon, index) => (
              <WebtoonCard key={index} webtoon={webtoon} />
            ))}
          </div>
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && selectedWebtoon && <WebtoonDetailModal webtoon={selectedWebtoon} />}
    </div>
  );
}