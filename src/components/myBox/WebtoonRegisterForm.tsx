"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Info, PlusIcon, X, Camera } from "lucide-react";
import { clsx } from "clsx";

function WebtoonRegisterForm() {
  const [thumbnail, setThumbnail] = useState<string>("");
  const [authors, setAuthors] = useState<string[]>([""]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [cycle, setCycle] = useState<string>("");

  interface FormData {
    title: string;
    authors: string[];
    webtoon_url: string;
    publication_day: string;
    serial_day: string[];
    serialization_cycle: string;
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
    authors: [""],
    webtoon_url: "",
    publication_day: "",
    serial_day: [],
    serialization_cycle: "",
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

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 용량은 5MB 이하여야 합니다.");
        return;
      }
  
      // 이미지 가로/세로 비율 체크
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.onload = () => {
          if (img.width > img.height) {
            alert("세로형 이미지를 업로드 해 주세요.");
            return;
          }
          setThumbnail(e.target?.result as string);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

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

  const handleTagChange = (category: keyof FormData["tags"], value: string) => {
    setFormData(prev => ({
      ...prev,
      tags: {
        ...prev.tags,
        [category]: value.split(",").map(tag => tag.trim()).filter(Boolean)
      }
    }));
  };

  const isFormValid = () => {
    return (
      thumbnail &&
      formData.title &&
      authors.some(author => author.trim() !== "") &&
      formData.webtoon_url &&
      formData.publication_day &&
      selectedDays.length > 0 &&
      cycle
    );
  };

  const handleSubmit = async () => {
    const requestData = {
      title: formData.title,
      author: authors.filter(author => author.trim() !== "").join(", "),
      thumbnail,
      webtoon_url: formData.webtoon_url,
      publication_day: formData.publication_day,
      platform: "naver", // 현재는 네이버만 지원
      serial_day: selectedDays.map(day => day.toLowerCase()).filter(day => ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].includes(day)),
      serialization_cycle: cycle,
      tags: Object.entries(formData.tags).map(([category, tags]) => 
        tags.map(tag => ({
          tag_name: tag,
          category: category
        }))
      ).flat()
    };

    console.log("Request Data:", requestData);
    // API 연동 예정
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <h2 className="text-xl font-bold text-main-text">작품 등록</h2>
      {/* 표지 */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-main-text">표지 *</label>
        <div className="flex items-center gap-4">
          <div className="relative w-[120px] h-[180px]">
            {thumbnail ? (
              <Image 
                src={thumbnail} 
                alt="표지 미리보기" 
                fill 
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
          <div className="flex flex-col gap-1 text-sm text-main-text">
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

      {/* 연재 주기 */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-main-text">연재 주기 *</label>
        <div className="flex flex-col gap-4">
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
                disabled={selectedDays.includes("완결")}
                className={clsx(
                  "rounded-md px-4 py-2 text-sm",
                  selectedDays.includes("완결") 
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : cycle === value
                      ? "bg-main-yellow text-white"
                      : "bg-bg-grey-01 text-main-text hover:bg-bg-yellow-01/60"
                )}
                onClick={() => setCycle(value)}
              >
                {label}
              </button>
            ))}
            {/* 구분선 */}
            <div className="h-8 w-px bg-main-grey"></div>
            {/* 완결 버튼 */}
            <button
              className={clsx(
                "rounded-md px-4 py-2 text-sm",
                selectedDays.includes("완결")
                  ? "bg-main-yellow text-white"
                  : "bg-bg-grey-01 text-main-text hover:bg-bg-yellow-01/60"
              )}
              onClick={() => {
                if (selectedDays.includes("완결")) {
                  setSelectedDays([]);
                  setCycle("1weeks"); // 완결 해제 시 매주로 돌아감
                } else {
                  setSelectedDays(["완결"]);
                  setCycle(""); // 완결 선택 시 주기 선택 초기화
                }
              }}
            >
              완결
            </button>
          </div>

          {/* 요일 선택 - 매주/격주일 때만 보이도록 */}
          {(cycle === "1weeks" || cycle === "2weeks") && (
            <div className="flex flex-wrap gap-2">
              {["월", "화", "수", "목", "금", "토", "일", "매일"].map((day) => (
                <button
                  key={day}
                  disabled={selectedDays.includes("완결")}
                  className={clsx(
                    "rounded-md px-4 py-2 text-sm",
                    selectedDays.includes("완결")
                      ? "cursor-not-allowed bg-gray-300 text-gray-500"
                      : selectedDays.includes(day)
                        ? "bg-main-yellow text-white"
                        : "bg-bg-grey-01 text-main-text hover:bg-bg-yellow-01/60"
                  )}
                  onClick={() => {
                    if (selectedDays.includes("완결")) return;

                    if (day === "매일") {
                      if (selectedDays.includes("매일")) {
                        setSelectedDays([]);
                      } else {
                        setCycle("1weeks"); // 매일 선택 시 매주로 강제 설정
                        setSelectedDays([...["월", "화", "수", "목", "금", "토", "일"], "매일"]);
                      }
                    } else {
                      if (selectedDays.includes(day)) {
                        const newDays = selectedDays.filter(d => d !== day && d !== "매일");
                        setSelectedDays(newDays);
                      } else {
                        const newDays = [...selectedDays, day];
                        const hasAllWeekdays = ["월", "화", "수", "목", "금", "토", "일"].every(d => 
                          newDays.includes(d) || d === day
                        );
                        if (hasAllWeekdays) {
                          newDays.push("매일");
                          setCycle("1weeks"); // 모든 요일 선택으로 인한 매일 선택 시에도 매주로 강제 설정
                        }
                        setSelectedDays(newDays);
                      }
                    }
                  }}
                >
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tags 입력 */}
      <div className="flex flex-col gap-6">
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
            <label className="font-bold text-main-text">{label}</label>
            <input
              type="text"
              maxLength={20}
              className="rounded-md border border-main-text p-2 focus:border-main-yellow focus:outline-none"
              placeholder={placeholder}
              value={formData.tags[field as keyof FormData["tags"]].join(", ")}
              onChange={(e) => handleTagChange(field as keyof FormData["tags"], e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* 등록 버튼 */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className={clsx(
            "rounded-md px-6 py-3 text-white",
            isFormValid()
              ? "bg-main-yellow hover:bg-yellow-500"
              : "cursor-not-allowed bg-gray-300"
          )}
          disabled={!isFormValid()}
        >
          작품 등록
        </button>
      </div>
    </div>
  );
}

export default WebtoonRegisterForm;