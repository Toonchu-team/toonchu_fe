"use client";

import React, { useState } from "react";
import Image from "next/image";
import useAuthStore from "@/stores/authStore";
import dynamic from "next/dynamic";
import WebtoonRegisterForm from "@/components/myBox/WebtoonRegisterForm";
import MyRequestedList from "@/components/myBox/MyRequestedList";
import AdminRegistrationList from "@/components/admin/AdminRegistrationList";

const FavoritesList = dynamic(
  () => import("@/components/myBox/FavoritesList"),
  {
    ssr: false,
  },
);

export default function MyBox() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["찜 목록", "최근 본 목록", "작품 등록", "등록 신청한 작품"];

  // 프로필 이미지 경로
  const profileImage = user?.profile_image || "/images/brand-character/default-profile.png";
  // 닉네임
  const nickname = user?.nick_name || "NICKNAME";
  // 이메일
  const email = user?.email || "nickname@gmail.com";

  // 관리자 권한 확인
  const isAdmin = user?.is_staff || false;

  // 관리자 모드 UI
  if (isAdmin) {
    return (
      <main className="min-h-screen bg-white">
        {/* 프로필 박스 섹션 */}
        <section className="h-[180px]">
          {/* 상단 영역 */}
          <div className="h-2/3 bg-[#DEB887]">
            <div className="mx-auto flex max-w-4xl translate-y-[48%] items-center gap-6 px-4">
              <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full border-4 border-white bg-white">
                <Image
                  src={profileImage}
                  alt="프로필 이미지"
                  className="object-cover"
                  sizes="130px"
                  fill
                  priority
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-white">{nickname}</p>
                  <span className="rounded-md bg-main-red px-2 py-0.5 text-xs text-white">관리자</span>
                </div>
                <p className="font-bold text-[#DEB887]/80">{email}</p>
              </div>
            </div>
          </div>
          {/* 하단 영역 */}
          <div className="h-1/3 bg-white" />
        </section>

        {/* 콘텐츠 영역 */}
        <section className="pt-[5px]">
          <div className="mx-auto max-w-4xl">
            <div className="border-b px-4">
              <h2 className="py-4 font-bold text-main-text">
                작품 등록 요청 관리
              </h2>
            </div>

            <div className="mt-8 min-h-[400px] px-4">
              <AdminRegistrationList />
            </div>
          </div>
        </section>
      </main>
    );
  }

  // 일반 사용자 모드 UI 
  return (
    <main className="min-h-screen bg-white">
      {/* 프로필 박스 섹션 */}
      <section className="h-[180px]">
        {/* 상단 영역 */}
        <div className="h-2/3 bg-[#DEB887]">
          <div className="mx-auto flex max-w-4xl translate-y-[48%] items-center gap-6 px-4">
            <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full border-4 border-white bg-white">
              <Image
                src={profileImage}
                alt="프로필 이미지"
                className="object-cover"
                sizes="130px"
                fill
                priority
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xl font-bold text-white">
                {nickname}
              </p>
              <p className="font-bold text-[#DEB887]">{email}</p>
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
                  ? "border-b-2 border-main-yellow text-main-yellow"
                  : "text-main-text"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8 flex min-h-[400px] justify-center px-4">
          {activeTab === 0 && <FavoritesList />}
          {activeTab === 1 && (
            <div className="flex h-[400px] w-full items-center justify-center">
              <Image
                src="/images/brand-character/not-found.png"
                alt="준비 중인 페이지"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
          )}
          {activeTab === 2 && <WebtoonRegisterForm/>}
          {activeTab === 3 && <MyRequestedList />}
        </div>
      </section>
    </main>
  );
}
