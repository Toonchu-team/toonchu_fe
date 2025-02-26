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
  id: number;
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
  rejection_reason?: string;
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

export default function AdminRegistrationList() {
  const [selectedWebtoon, setSelectedWebtoon] = useState<RequestedWebtoon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // 임시 데이터
  const requestedWebtoons: RequestedWebtoon[] = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    title: "미래의 골동품 가게",
    author: "구아진",
    thumbnail: "/images/brand-character/default-profile.png",
    webtoon_url: "https://comic.naver.com/webtoon/list?titleId=742105",
    publication_day: "2020-03-03",
    platform: ["naver", "kakao", "kakaopage", "postype"][i % 4],
    serial_day: "wed",
    serialization_cycle: "1weeks",
    created_at: "2025-02-22T18:20:57.090Z",
    updated_at: "2025-02-22T18:20:57.090Z",
    is_new: false,
    is_completed: false,
    like_count: 0,
    view_count: 0,
    is_approved: ['pending', 'approved', 'rejected'][i % 3] as 'pending' | 'approved' | 'rejected',
    rejection_reason: i % 3 === 2 ? "웹툰 표지가 웹툰과 일치하지 않습니다." : undefined,
    tags: [
      {
        id: 0,
        tag_name: "퇴마물",
        category: "genre"
      },
      {
        id: 1,
        tag_name: "선생님",
        category: "job"
      },
      {
        id: 2,
        tag_name: "가족",
        category: "relation"
      },
      {
        id: 3,
        tag_name: "소설원작",
        category: "etc"
      }
    ]
  }));

  // 필터링된 웹툰 목록
  const filteredWebtoons = statusFilter === 'all' 
    ? requestedWebtoons 
    : requestedWebtoons.filter(webtoon => webtoon.is_approved === statusFilter);

  const handleWebtoonClick = (webtoon: RequestedWebtoon) => {
    setSelectedWebtoon(webtoon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWebtoon(null);
  };

  // 관리자 기능: 웹툰 승인 처리
  const handleApprove = (webtoonId: number) => {
    // API 호출 대신 콘솔 로그로 대체
    console.log(`웹툰 ID ${webtoonId} 승인 처리됨`);
    alert(`웹툰 ID ${webtoonId} 승인 처리됨`);
    closeModal();
  };

  // 관리자 기능: 웹툰 거절 모달 열기
  const openRejectModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRejectModalOpen(true);
  };

  // 관리자 기능: 웹툰 거절 모달 닫기
  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    setRejectionReason('');
  };

  // 관리자 기능: 웹툰 거절 처리
  const handleReject = (webtoonId: number) => {
    if (!rejectionReason.trim()) {
      alert('거절 사유를 입력해주세요.');
      return;
    }
    
    // API 호출 대신 콘솔 로그로 대체
    console.log(`웹툰 ID ${webtoonId} 거절 처리됨, 사유: ${rejectionReason}`);
    alert(`웹툰 ID ${webtoonId} 거절 처리됨`);
    closeRejectModal();
    closeModal();
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
          <Status status={webtoon.is_approved} />
        </div>
      </div>
    </div>
  );

  // 거절 사유 입력 모달
  const RejectReasonModal = () => (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50" 
      onClick={(e) => {
        e.stopPropagation();
        closeRejectModal();
      }}
    >
      <div 
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 이벤트 버블링 방지
      >
        <h3 className="mb-4 text-lg font-bold">거절 사유 입력</h3>
        <p className="mb-4 text-sm text-gray-600">작품 등록 요청 거절 사유는 사용자에게 전달됩니다.</p>
        
        <textarea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          placeholder="거절 사유를 입력해 주세요"
          className="mb-4 h-32 w-full resize-none rounded border border-gray-300 p-2 focus:border-main-yellow focus:outline-none"
        />
        
        <div className="flex justify-end gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              closeRejectModal();
            }}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (selectedWebtoon) {
                handleReject(selectedWebtoon.id);
              }
            }}
            disabled={!rejectionReason.trim()}
            className="rounded-md bg-main-red px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
          >
            거절하기
          </button>
        </div>
      </div>
    </div>
  );

  // 웹툰 상세 모달
  const WebtoonDetailModal = ({ webtoon }: { webtoon: RequestedWebtoon }) => {
    // 날짜 표시 변환
    const formattedPublicationDay = formatDate(webtoon.publication_day);
    
    // 연재 요일 한글로 변환
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
        case 'month': return '한달';
        default: return cycle;
      }
    };

    // 연재 주기와 요일 결합
    const getScheduleText = () => {
      const cycle = getCycleText(webtoon.serialization_cycle);
      
      // 한달인 경우 요일 정보 생략
      if (cycle === '한달') {
        return cycle;
      }
      
      return `${cycle} ${serialDayText}요일`;
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

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeModal}>
        <div 
          className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white shadow-2xl" 
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 md:p-12">
            {/* 헤더 영역 - 제목 및 상태 */}
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-bold">{webtoon.title}</h2>
              <div className="flex items-center gap-3">
                <Status status={webtoon.is_approved} />
                <button 
                  className="rounded-full bg-gray-100 p-1.5 text-gray-500 transition-all hover:bg-gray-200"
                  onClick={closeModal}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* 기본 정보 영역 */}
            <div className="mb-10 flex flex-col md:flex-row md:gap-8">
              {/* 썸네일 */}
              <div className="mb-6 md:mb-0 flex-shrink-0 mx-auto md:mx-0">
                <div className="relative aspect-[3/4] w-[180px] overflow-hidden rounded-lg shadow-md">
                  <Image
                    src={webtoon.thumbnail}
                    alt={webtoon.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* 웹툰 정보 - 그리드 레이아웃으로 변경 */}
              <div className="flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
                  {/* 작가, 연재 시작일 */}
                  <div>
                    <p className="text-sm text-gray-500">작가</p>
                    <p className="font-medium">{webtoon.author}</p>
                  </div>
                  
                  {/* 플랫폼 */}
                  <div>
                    <p className="text-sm text-gray-500">플랫폼</p>
                    <p className="font-medium">{getPlatformText(webtoon.platform)}</p>
                  </div>
                  
                  {/* 연재 시작일 */}
                  <div>
                    <p className="text-sm text-gray-500">연재 시작일</p>
                    <p className="font-medium">{formattedPublicationDay}</p>
                  </div>
                  
                  {/* 연재 주기/요일 */}
                  <div>
                    <p className="text-sm text-gray-500">연재 주기 / 요일</p>
                    <p className="font-medium">{getScheduleText()}</p>
                  </div>
                </div>
                
                {/* 링크 정보 */}
                <div className="mt-6 rounded-lg bg-gray-50 p-4">
                  <p className="mb-2 text-sm text-gray-500">웹툰 링크</p>
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
            <div className="mb-8">
              <h3 className="mb-5 text-lg font-medium">태그</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg bg-gray-50 p-6">
                {Object.keys(groupedTags).length > 0 ? (
                  Object.keys(groupedTags).map(category => (
                    <div key={category} className="flex items-start gap-3">
                      <span className="whitespace-nowrap rounded-md bg-gray-200 px-3 py-1.5 text-sm font-medium">
                        {getCategoryText(category)}
                      </span>
                      <div className="flex flex-wrap gap-2 flex-1">
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
                  <p className="text-gray-500 col-span-2">등록된 태그가 없습니다</p>
                )}
              </div>
            </div>
            
            {/* 등록 정보 푸터 */}
            <div className="mt-10 border-t border-gray-200 pt-5">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-end gap-1 text-sm text-gray-500">
                    <span>등록 신청일:</span>
                    <span className="font-medium">{formatDate(webtoon.created_at)}</span>
                  </div>
                  
                  {/* 관리자 액션 버튼: 승인/거절 - 대기 상태일 때만 표시 */}
                  {webtoon.is_approved === 'pending' && (
                    <div className="flex gap-2">
                      <button 
                        onClick={openRejectModal}
                        className="rounded-md border border-main-red px-4 py-2 text-sm font-medium text-main-red hover:bg-red-50"
                      >
                        거절하기
                      </button>
                      <button 
                        onClick={() => handleApprove(webtoon.id)}
                        className="rounded-md bg-[#B2EBB0] px-4 py-2 text-sm font-medium text-gray-800 hover:bg-green-300"
                      >
                        승인하기
                      </button>
                    </div>
                  )}
                </div>
                
                {/* 거절 사유 표시 - 거절 상태일 때만 표시 */}
                {webtoon.is_approved === 'rejected' && webtoon.rejection_reason && (
                  <div className="rounded-md bg-red-50 p-4">
                    <h4 className="mb-1 font-medium text-red-800">거절 사유</h4>
                    <p className="text-sm text-gray-700">{webtoon.rejection_reason}</p>
                  </div>
                )}
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
        {/* 상태 필터 */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">등록 신청된 작품</h3>
          
          <div className="flex items-center gap-2">
            <div className="flex rounded overflow-hidden border border-gray-300">
              <button 
                className={`px-3 py-1 text-sm ${statusFilter === 'all' ? 'bg-main-yellow text-white' : 'bg-white text-gray-600'}`}
                onClick={() => setStatusFilter('all')}
              >
                전체
              </button>
              <button 
                className={`px-3 py-1 text-sm ${statusFilter === 'pending' ? 'bg-[#FFD695] text-gray-700' : 'bg-white text-gray-600'}`}
                onClick={() => setStatusFilter('pending')}
              >
                대기
              </button>
              <button 
                className={`px-3 py-1 text-sm ${statusFilter === 'approved' ? 'bg-[#B2EBB0] text-gray-700' : 'bg-white text-gray-600'}`}
                onClick={() => setStatusFilter('approved')}
              >
                승인
              </button>
              <button 
                className={`px-3 py-1 text-sm ${statusFilter === 'rejected' ? 'bg-[#FF9595] text-gray-700' : 'bg-white text-gray-600'}`}
                onClick={() => setStatusFilter('rejected')}
              >
                거절
              </button>
            </div>
          </div>
        </div>
      
        <div className="flex flex-col w-full">  
          <div className="mb-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
            {filteredWebtoons.map((webtoon, index) => (
              <WebtoonCard key={index} webtoon={webtoon} />
            ))}
          </div>
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && selectedWebtoon && <WebtoonDetailModal webtoon={selectedWebtoon} />}
      
      {/*거절 사유 모달 */}
      {isRejectModalOpen && selectedWebtoon && <RejectReasonModal />}
    </div>
  );
}