'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import useAuthStore from '@/stores/authStore';

export default function MyBox() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['찜 목록', '최근 본 목록', '작품 등록', '등록 신청한 작품'];

  return (
    <main className="min-h-screen bg-white">
      {/* 프로필 박스 섹션 */}
      <section className="h-[170px]">
        {/* 상단 영역 */}
        <div className="h-2/3 bg-[#DEB887]">
          <div className="mx-auto flex max-w-4xl translate-y-[43%] items-center gap-6 px-4">
            <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full border-4 border-white bg-white">
              <Image
                src={'/images/brand-character/default-profile.png'}
                alt="프로필 이미지"
                className="object-cover"
                sizes="130px"
                fill
                priority
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xl font-bold text-white">
                NICKNAME(@123456789)
              </p>
              <p className="text-[#DEB887]">
                {'nickname@gmail.com'}
              </p>
            </div>
          </div>
        </div>
        {/* 하단 영역 */}
        <div className="h-1/3 bg-white" />
      </section>

      {/* 탭 섹션 */}
      <section className="px-4 pt-[5px]">
        <div className="flex justify-center border-b">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`min-w-[140px] px-6 py-4 text-center font-bold ${
                activeTab === index
                  ? 'border-b-2 border-main-yellow text-main-yellow'
                  : 'text-main-text'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8 min-h-[400px] px-4">
          <div>{tabs[activeTab]}</div>
        </div>
      </section>
    </main>
  );
}