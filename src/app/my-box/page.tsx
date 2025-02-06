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
      <section className="h-[180px]">

        <div className="h-1/2 bg-[#DEB887]">
          <div className="mx-auto flex max-w-4xl items-center gap-6 px-4 pt-[30px]">
            <div className="relative h-[130px] w-[130px] overflow-hidden rounded-full border-4 border-white bg-white">
              <Image
                src={'/images/brand-character/default-profile.png'}
                alt="프로필 이미지"
                className="object-cover"
                sizes="130px"
                fill
                priority
              />
            </div>
          </div>
        </div>
        
        <div className="h-1/2 bg-white">
          <div className="mx-auto max-w-4xl px-4 pt-[10px]">
            <p className="ml-[146px] text-[#DEB887]">
              {'nickname@gmail.com'}
            </p>
          </div>
        </div>
      </section>

      {/* 탭 섹션 */}
      <section className="px-4">
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