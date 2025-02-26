"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Info, PlusIcon, X, Camera } from "lucide-react";
import { clsx } from "clsx";
import { registerWebtoon } from '@/lib/api/server/webtoonApi';
import { RegisterPlatform, SerialDay, SerializationCycle, WebtoonRegisterRequest } from "@/lib/types/webtoon";
import useBreakpoint from "@/hooks/useBreakpoint";

function WebtoonRegisterForm() {
  const breakpoint = useBreakpoint();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [authors, setAuthors] = useState<string[]>([""]);
  const [selectedDays, setSelectedDays] = useState<SerialDay[]>(["mon"]);
  const [cycle, setCycle] = useState<SerializationCycle>("1weeks");
  const [isCompleted, setIsCompleted] = useState(false);
  const [platform, setPlatform] = useState<RegisterPlatform>("naver");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  interface FormData {
    title: string;
    webtoon_url: string;
    publication_day: string;
    is_new: boolean;
    tags: {
      genre: string[];
      matter: string[];
      atmosphere: string[];
      relation: string[];
      job: string[];
      male_character: string[];
      female_character: string[];
      character: string[];
      top_bottom: string[];
      etc: string[];
    };
  }

  const [formData, setFormData] = useState<FormData>({
    title: "",
    webtoon_url: "",
    publication_day: "",
    is_new: true,
    tags: {
      genre: [],
      matter: [],
      atmosphere: [],
      relation: [],
      job: [],
      male_character: [],
      female_character: [],
      character: [],
      top_bottom: [],
      etc: []
    }
  });

  // 플랫폼 옵션
  const platformOptions: { value: RegisterPlatform; label: string }[] = [
    { value: "naver", label: "네이버" },
    { value: "kakaopage", label: "카카오페이지" },
    { value: "kakao", label: "카카오웹툰" },
    { value: "postype", label: "포스타입" },
    { value: "others", label: "기타" },
  ];

  // 작가 관련 핸들러
  const addAuthorField = () => {
    setAuthors([...authors, ""]);
  };

  const removeAuthorField = (index: number) => {
    const newAuthors = [...authors];
    newAuthors.splice(index, 1);
    setAuthors(newAuthors);
  };

  const updateAuthor = (index: number, value: string) => {
    const newAuthors = [...authors];
    newAuthors[index] = value;
    setAuthors(newAuthors);
  };

  // 이미지 업로드 핸들러
  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 용량은 5MB 이하여야 합니다.");
        return;
      }
  
      const img = document.createElement('img');
      const objectUrl = URL.createObjectURL(file);
      
      img.onload = () => {
        if (img.width > img.height) {
          alert("세로형 이미지를 업로드 해 주세요.");
          URL.revokeObjectURL(objectUrl);
          return;
        }
        setThumbnail(file);
        setThumbnailPreview(objectUrl);
      };
      img.src = objectUrl;
    }
  };

  // 연재 주기 선택 핸들러
  const handleCycleChange = (newCycle: SerializationCycle) => {
    if (newCycle !== '1weeks' && newCycle !== '2weeks') {
      // 매주/격주가 아닌 경우(10일, 20일, 한달, 기타) 요일 선택은 필요 없음
      setSelectedDays([]);
    } else if (selectedDays.length === 0) {
      // 매주/격주로 변경되고 현재 선택된 요일이 없으면 기본값 설정
      setSelectedDays(['mon']); 
    }
    
    // 상태 업데이트
    setCycle(newCycle);
  };

  // 연재 요일 선택 핸들러
  const handleDaySelect = (day: SerialDay | "매일") => {
    if (isCompleted) return;
  
    if (day === "매일") {
      setSelectedDays(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]);
    } else {
      const isSelected = selectedDays.includes(day as SerialDay);
      if (isSelected) {
        setSelectedDays(selectedDays.filter(d => d !== day));
      } else {
        setSelectedDays([...selectedDays, day as SerialDay]);
      }
    }
  };

  // 완결 상태 관리
  const handleCompletedChange = () => {
    setIsCompleted(!isCompleted);
    
    if (!isCompleted) {
      // 완결 상태로 변경될 때 연재 요일과 주기 초기화
      setSelectedDays([]); // 빈 배열로 설정
      setCycle("1weeks"); // 여기서는 초기값 유지
    } else {
      // 미완결 상태로 변경될 때 기본값 복원
      setSelectedDays(["mon"]); // 기본적으로 월요일 선택
      setCycle("1weeks"); // 기본적으로 매주 선택
    }
  };

  // 태그 관련 핸들러
  const handleTagChange = (category: keyof FormData["tags"], value: string) => {
    setFormData(prev => ({
      ...prev,
      tags: {
        ...prev.tags,
        [category]: value.split(",").map(tag => tag.trim()).filter(Boolean)
      }
    }));
  };

  // 유효성 검사
  const isFormValid = () => {
    const hasValidAuthors = authors.some(author => author.trim() !== "");
    const combinedAuthorsLength = authors.filter(author => author.trim()).join(", ").length;

    if (combinedAuthorsLength > 100) {
      return false;
    }

    if (isCompleted) {
      return (
        thumbnail &&
        formData.title &&
        hasValidAuthors &&
        formData.webtoon_url &&
        formData.publication_day
      );
    }
    
    // 매주/격주 주기일 때는 요일 선택이 필요하지만, 그 외 주기에서는 요일 선택이 필요 없음
    const isValidDays = (cycle === "1weeks" || cycle === "2weeks") 
      ? selectedDays.length > 0 
      : true;
    
    return (
      thumbnail &&
      formData.title &&
      hasValidAuthors &&
      formData.webtoon_url &&
      formData.publication_day &&
      isValidDays && // 수정된 부분
      cycle
    );
  };

  // 폼 초기화
  const resetForm = () => {
    setThumbnail(null);
    setThumbnailPreview("");
    setAuthors([""]);
    setSelectedDays(["mon"]);
    setCycle("1weeks");
    setIsCompleted(false);
    setPlatform("naver");
    setFormData({
      title: "",
      webtoon_url: "",
      publication_day: "",
      is_new: true,
      tags: {
        genre: [],
        matter: [],
        atmosphere: [],
        relation: [],
        job: [],
        male_character: [],
        female_character: [],
        character: [],
        top_bottom: [],
        etc: []
      }
    });
  };

  // 제출 핸들러
  const handleSubmit = async () => {
    if (!isFormValid()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      if (!thumbnail) {
        throw new Error("썸네일 이미지가 필요합니다.");
      }

      const requestData: WebtoonRegisterRequest = {
        title: formData.title,
        author: authors.filter(a => a.trim()).join(", "),
        thumbnail: thumbnail,
        webtoon_url: formData.webtoon_url,
        publication_day: formData.publication_day,
        platform,
        serial_day: isCompleted || cycle === "10days" || cycle === "20days" || cycle === "month" || cycle === "etc" 
          ? null 
          : selectedDays,
        serialization_cycle: isCompleted ? null : cycle, // 완결일 경우 null 전송
        is_new: formData.is_new,
        is_completed: isCompleted,
        is_approved: "pending",
        tags: Object.entries(formData.tags)
          .map(([category, tags]) => 
            tags.map(tag => ({
              tag_name: tag,
              category: category
            }))
          ).flat()
      };

      console.log("작품 등록 요청 데이터:", {
        ...requestData,
        thumbnail: "File object" // 파일 객체는 로그에서 생략
      });

      try {
        const response = await registerWebtoon(requestData);
        console.log("등록 성공:", response);
        setIsSuccess(true);
        resetForm();
      } catch (error: Error | unknown) {
        console.error("등록 실패:", error);
        const errorMessage = error instanceof Error ? error.message : '작품 등록에 실패했습니다';
        setError(errorMessage);
      }
      
    } catch (error: Error | unknown) {
      console.error("폼 제출 오류:", error);
      const errorMessage = error instanceof Error ? error.message : '작품 등록에 실패했습니다';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // 성공 메시지 컴포넌트
  const SuccessMessage = () => (
    <div className="mb-4 rounded-md bg-green-50 p-4 text-green-800">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">작품이 성공적으로 등록되었습니다. 관리자 승인 후 서비스에 반영됩니다.</p>
        </div>
      </div>
    </div>
  );

  // 에러 메시지 컴포넌트
  const ErrorMessage = () => (
    <div className="mb-4 rounded-md bg-red-50 p-4 text-red-800">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{error}</p>
        </div>
      </div>
    </div>
  );

  const containerClass = breakpoint === "mobile" 
    ? "w-full px-4" 
    : "max-w-3xl";

  return (
    <div className={`mx-auto flex w-full ${containerClass} flex-col gap-6 p-2 md:p-6`}>
      <h2 className="text-xl font-bold text-main-text">작품 등록</h2>
      
      {isSuccess && <SuccessMessage />}
      {error && <ErrorMessage />}
      
      {/* 표지 */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-main-text">표지 *</label>
        <div className={`flex ${breakpoint === "mobile" ? "flex-col" : ""} items-center gap-4`}>
          <div className="relative h-[180px] w-[120px]">
            {thumbnail ? (
              <Image 
                src={thumbnailPreview} 
                alt="표지 미리보기"
                className="rounded-md object-cover" 
                width={120}
                height={180}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-main-text bg-bg-grey-01">
                <Camera size={32} className="text-main-text/50" />
              </div>
            )}
            <label className="absolute bottom-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:bg-bg-yellow-01/60">
              <input
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png"
                onChange={handleThumbnailChange}
              />
              <PlusIcon size={20} className="text-main-text" />
            </label>
          </div>
          <div className={`flex flex-col gap-1 text-sm text-main-text ${breakpoint === "mobile" ? "mt-2" : ""}`}>
            <p>• 파일 용량 5MB 이하</p>
            <p>• jpg, png 파일 업로드 가능</p>
            <p>• 세로형 이미지를 업로드 해 주세요</p>
          </div>
        </div>
      </div>

      {/* 제목 */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-main-text">제목 *</label>
        <input
          type="text"
          maxLength={100}
          className="rounded-md border border-main-text p-2 focus:border-main-yellow focus:outline-none"
          placeholder="제목을 입력해 주세요"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
      </div>

      {/* 작가 */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-main-text">작가 *</label>
        <div className="flex flex-col gap-2">
          {authors.map((author, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                maxLength={50}
                className="flex-1 rounded-md border border-main-text p-2 focus:border-main-yellow focus:outline-none"
                value={author}
                onChange={(e) => updateAuthor(index, e.target.value)}
              />
              {index > 0 && (
                <button 
                  onClick={() => removeAuthorField(index)}
                  className="flex h-10 w-10 items-center justify-center rounded-md bg-bg-red-01 hover:bg-red-300"
                >
                  <X size={20} className="text-main-text" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addAuthorField}
            className="w-24 rounded-md bg-bg-grey-01 px-4 py-2 text-sm text-main-text hover:bg-bg-yellow-01/60"
          >
            작가 추가
          </button>
        </div>
      </div>

      {/* 플랫폼 */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-main-text">플랫폼 *</label>
        <select
          className="w-full rounded-md border border-main-text p-2 focus:border-main-yellow focus:outline-none"
          value={platform}
          onChange={(e) => setPlatform(e.target.value as RegisterPlatform)}
        >
          {platformOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 링크 */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-main-text">링크 *</label>
        <input
          type="url"
          maxLength={200}
          className="rounded-md border border-main-text p-2 focus:border-main-yellow focus:outline-none"
          placeholder="https://comic.naver.com/webtoon/list?titleId=742105"
          value={formData.webtoon_url}
          onChange={(e) => setFormData({...formData, webtoon_url: e.target.value})}
        />
        <div className="flex items-start gap-1 text-main-grey/50">
            <Info size={14} />
            <div className="flex flex-col text-xs">
                <p>웹툰 URL 값을 잘못 입력할 경우, 작품 등록 승인이 거부될 수 있습니다.</p>
                <p>작품 등록을 신청하는 웹툰의 올바른 URL인지 다시 한번 확인 부탁드립니다.</p>
            </div>
        </div>
      </div>

      {/* 연재 시작일 */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-main-text">연재 시작 *</label>
        <input
          type="date"
          min="2000-01-01"
          max="2099-12-31"
          className="w-40 rounded-md border border-main-text p-2 focus:border-main-yellow focus:outline-none"
          value={formData.publication_day}
          onChange={(e) => setFormData({...formData, publication_day: e.target.value})}
        />
      </div>

      {/* 완결 여부 */}
      <div className="flex items-center gap-2">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id="isCompleted"
            checked={isCompleted}
            onChange={handleCompletedChange}
            className="peer h-0 w-0 opacity-0 absolute"
          />
          <label 
            htmlFor="isCompleted" 
            className={`flex h-4 w-4 cursor-pointer items-center justify-center rounded border ${
              isCompleted ? 'bg-main-yellow border-main-yellow' : 'bg-white border-main-text'
            }`}
          >
            {isCompleted && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 1L3.5 6.5L1 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </label>
        </div>
        <label htmlFor="isCompleted" className="cursor-pointer font-bold text-main-text">완결 작품</label>
      </div>
      
      {/* 연재 주기 */}
      {!isCompleted && (
        <div className="flex flex-col gap-4">
          <label className="font-bold text-main-text">연재 주기 *</label>
          {/* 연재 주기 선택 */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: "매주", value: "1weeks" },
              { label: "격주", value: "2weeks" },
              { label: "10일", value: "10days" },
              { label: "20일", value: "20days" },
              { label: "한달", value: "month" },
              { label: "기타", value: "etc" }
            ].map(({ label, value }) => (
              <button
                key={value}
                className={clsx(
                  "rounded-md px-4 py-2 text-sm",
                  cycle === value
                    ? "bg-main-yellow text-white"
                    : "bg-bg-grey-01 text-main-text hover:bg-bg-yellow-01/60"
                )}
                onClick={() => handleCycleChange(value as SerializationCycle)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 요일 선택 */}
          {(cycle === "1weeks" || cycle === "2weeks") && (
            <>
              <label className="font-bold text-main-text">연재 요일 *</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "월", value: "mon" } as const,
                  { label: "화", value: "tue" } as const,
                  { label: "수", value: "wed" } as const,
                  { label: "목", value: "thu" } as const,
                  { label: "금", value: "fri" } as const,
                  { label: "토", value: "sat" } as const,
                  { label: "일", value: "sun" } as const,
                  { label: "매일", value: "매일" } as const,
                ].map(({ label, value }) => (
                  <button
                    key={value}
                    className={clsx(
                      "rounded-md px-4 py-2 text-sm",
                      value === "매일" 
                        ? selectedDays.length === 7
                          ? "bg-main-yellow text-white"
                          : "bg-bg-grey-01 text-main-text hover:bg-bg-yellow-01/60"
                        : selectedDays.includes(value as SerialDay)
                          ? "bg-main-yellow text-white"
                          : "bg-bg-grey-01 text-main-text hover:bg-bg-yellow-01/60"
                    )}
                    onClick={() => handleDaySelect(value as SerialDay | "매일")}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="h-px w-full bg-main-grey/50 my-2"></div>

      {/* 태그 섹션 제목 */}
      <h3 className="mt-2 text-base font-bold text-main-text">태그 (선택)</h3>

      {/* 태그 입력 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[
          { label: "장르", field: "genre", placeholder: "판타지, 로맨스판타지 등" },
          { label: "소재", field: "matter", placeholder: "안경, 선배, 삼국지 등" },
          { label: "분위기", field: "atmosphere", placeholder: "가벼운, 감동적인 등" },
          { label: "관계", field: "relation", placeholder: "가족, 소꿉친구, 결혼 등" },
          { label: "직업", field: "job", placeholder: "검사, 뱀파이어, 선생님 등" },
          { label: "남캐", field: "male_character", placeholder: "계략남, 까칠남 등" },
          { label: "여캐", field: "female_character", placeholder: "걸크러쉬, 사연녀 등" },
          { label: "캐릭터성", field: "character", placeholder: "무심한, 바람둥이 등" },
          { label: "공수 관계", field: "top_bottom", placeholder: "강공, 강수 등" },
          { label: "기타", field: "etc", placeholder: "남주 중심, 여주 중심, 소설 원작 등" }
        ].map(({ label, field, placeholder }) => (
          <div key={field} className="flex flex-col gap-2">
            <label className="font-medium text-main-text">{label}</label>
            <input
              type="text"
              maxLength={100}
              className="rounded-md border border-main-text p-2 focus:border-main-yellow focus:outline-none"
              placeholder={placeholder}
              value={formData.tags[field as keyof FormData["tags"]].join(", ")}
              onChange={(e) => handleTagChange(field as keyof FormData["tags"], e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* 등록 버튼 */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid() || isLoading}
          className={clsx(
            "rounded-md px-8 py-3 text-white transition",
            isFormValid() && !isLoading
              ? "bg-main-yellow hover:bg-yellow-500"
              : "cursor-not-allowed bg-gray-300"
          )}
        >
          {isLoading ? "등록 중..." : "작품 등록"}
        </button>
      </div>
    </div>
  );
}

export default WebtoonRegisterForm;