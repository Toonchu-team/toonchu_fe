"use client";

import React, { useEffect, useState } from "react";
import Tags from "../common/tag/Tags";
import Hangul from "hangul-js";
import clsx from "clsx";
import { X } from "lucide-react";

const TagDropdownMobile = () => {
  // 임시 데이터
  const genres = ["장르", "소재", "분위기", "관계", "직업", "남캐", "기타"];
  const tagList = [
    { id: 1, tag_name: "판타지", category: "장르" },
    { id: 2, tag_name: "액션", category: "장르" },
    { id: 3, tag_name: "로맨스", category: "장르" },
    { id: 4, tag_name: "스릴러", category: "장르" },
    { id: 5, tag_name: "드라마", category: "장르" },
    { id: 6, tag_name: "일상", category: "스타일" },
    { id: 7, tag_name: "개그", category: "스타일" },
    { id: 8, tag_name: "무협", category: "장르" },
    { id: 9, tag_name: "스포츠", category: "장르" },
    { id: 10, tag_name: "음식", category: "스타일" },
    { id: 11, tag_name: "SF", category: "장르" },
    { id: 12, tag_name: "공포", category: "장르" },
    { id: 13, tag_name: "미스터리", category: "장르" },
    { id: 14, tag_name: "힐링", category: "스타일" },
    { id: 15, tag_name: "감성", category: "스타일" },
    { id: 16, tag_name: "모험", category: "장르" },
    { id: 17, tag_name: "추리", category: "장르" },
    { id: 18, tag_name: "성장", category: "스타일" },
    { id: 19, tag_name: "초능력", category: "스타일" },
    { id: 20, tag_name: "이세계", category: "장르" },
    { id: 21, tag_name: "학원물", category: "스타일" },
    { id: 22, tag_name: "연애", category: "스타일" },
    { id: 23, tag_name: "가족", category: "스타일" },
    { id: 24, tag_name: "로맨틱코미디", category: "장르" },
    { id: 25, tag_name: "범죄", category: "장르" },
    { id: 26, tag_name: "정치", category: "스타일" },
    { id: 27, tag_name: "전쟁", category: "장르" },
    { id: 28, tag_name: "심리", category: "스타일" },
    { id: 29, tag_name: "블랙코미디", category: "스타일" },
    { id: 30, tag_name: "드라마틱", category: "스타일" },
    { id: 31, tag_name: "스팀펑크", category: "장르" },
    { id: 32, tag_name: "디스토피아", category: "장르" },
    { id: 33, tag_name: "좀비", category: "장르" },
    { id: 34, tag_name: "웹소설 원작", category: "기타" },
    { id: 35, tag_name: "애니 원작", category: "기타" },
    { id: 36, tag_name: "게임 원작", category: "기타" },
    { id: 37, tag_name: "로봇", category: "스타일" },
    { id: 38, tag_name: "천재", category: "스타일" },
    { id: 39, tag_name: "도박", category: "장르" },
    { id: 40, tag_name: "탐정", category: "장르" },
    { id: 41, tag_name: "실화 기반", category: "기타" },
    { id: 42, tag_name: "가상 현실", category: "스타일" },
    { id: 43, tag_name: "타임리프", category: "스타일" },
    { id: 44, tag_name: "정령", category: "스타일" },
    { id: 45, tag_name: "요괴", category: "스타일" },
    { id: 46, tag_name: "흡혈귀", category: "스타일" },
    { id: 47, tag_name: "드래곤", category: "스타일" },
    { id: 48, tag_name: "마법사", category: "스타일" },
    { id: 49, tag_name: "괴물", category: "스타일" },
    { id: 50, tag_name: "우주", category: "스타일" },
  ];
  const tags = tagList.map((tag) => tag.tag_name);

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const [selectedTags, setSelectedTags] = useState<string[]>([]); // 선택한 태그
  // 선택한 태그의 아이디
  const selectedTagIds = tagList
    .filter((tag) => selectedTags.includes(tag.tag_name)) // 선택한 태그만 필터링
    .map((tag) => tag.id); // 필터링된 태그에서 id만 추출

  const [selectedPage, setSelectedPage] = useState<string>("ㄱ"); // 선택한 페이지
  const [pageTags, setPageTags] = useState<string[]>([]);

  const [selectedEng, setSelectedEng] = useState<boolean>(false);
  const paginationKor = [
    "ㄱ",
    "ㄴ",
    "ㄷ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅅ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
    "기타",
  ];
  const paginationEng = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "기타",
  ];

  // 확인용
  useEffect(() => {
    console.log(selectedTags);
    console.log(selectedTagIds);
  }, [selectedTags, setSelectedTags, selectedTagIds]);

  // 태그 클릭 핸들러
  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => {
      // 중복 태그 방지
      if (!prev.includes(tag)) {
        return [...prev, tag];
      } else {
        const returnArr = [...prev].filter((value) => value !== tag);
        return returnArr;
      }
    });
  };

  // 태그 분류 핸들러
  const filterByFirstLetter = (tags: string[], page: string) => {
    if (/^[ㄱ-ㅎ]$/.test(page)) {
      // 한글 초성 필터링
      return setPageTags(
        tags.filter((tag) => Hangul.disassemble(tag)[0] === page),
      );
    } else if (/^[A-Z]$/i.test(page)) {
      // 영어 필터링 (대소문자 무시)
      return setPageTags(
        tags.filter((tag) => tag.toUpperCase().startsWith(page.toUpperCase())),
      );
    } else {
      // 한글과 영어를 제외한 나머지 ("기타" 카테고리)
      return setPageTags(tags.filter((tag) => /^[^가-힣A-Za-z]/.test(tag)));
    }
  };

  return (
    <div
      className={clsx(
        "flex w-full flex-col items-center justify-center gap-5 rounded-b-2xl",
        "mobile:h-[500px] tablet:h-[650px]",
        "mobile:text-xs tablet:text-base",
      )}
    >
      <div className="relative flex w-[70%] justify-center">
        <p className="text-main-text mobile:text-base tablet:text-lg">
          태그 선택
        </p>

        {/* 닫기 버튼 */}
        <X color="white" className="absolute right-0 top-0 cursor-pointer" />
      </div>

      <div className="flex w-[90%] flex-col items-center">
        {/* 선택한 태그 */}
        <div className="flex h-[100px] items-center px-10">
          <div className="flex h-[70px] flex-wrap items-center justify-center gap-3 overflow-y-auto">
            <button
              className="rounded-lg border border-main-yellow bg-bg-yellow-02 px-2 py-1 text-main-text hover:bg-bg-yellow-01"
              onClick={() => {
                setSelectedTags([]);
              }}
            >
              선택한 태그 초기화
            </button>
            {selectedTags.map((selectedTag, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => handleTagClick(selectedTag)}
                  className="rounded-lg bg-white"
                >
                  <Tags tag={selectedTag} />
                </div>
              );
            })}
          </div>
        </div>

        <hr className="w-full" />

        {/* 장르 */}
        {/* 장르 선택 시 기본값 "ㄱ"으로 필터링 시작 */}
        <div className="flex h-[70px] items-center gap-4 tablet:h-[100px] tablet:gap-6">
          {genres.map((genre, idx) => {
            return (
              <div key={idx}>
                <button
                  className={
                    selectedGenre == genre
                      ? "rounded-lg border border-main-yellow bg-bg-yellow-02 px-2 py-1 text-main-text"
                      : "text-main-text"
                  }
                  onClick={() => {
                    setSelectedGenre(genre);
                    filterByFirstLetter(tags, "ㄱ");
                  }}
                >
                  {genre}
                </button>
              </div>
            );
          })}
        </div>

        <hr className="w-full" />

        {/* 해당 태그 */}
        <div className="flex h-[120px] items-center px-10 tablet:h-[200px]">
          <div className="flex h-[70px] flex-wrap items-center justify-center gap-3 overflow-y-auto tablet:h-[170px]">
            {pageTags.map((tag, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    handleTagClick(tag);
                  }} // 태그 클릭 핸들러 호출
                  className={`${
                    selectedTags.includes(tag)
                      ? "bg-bg-yellow-01 text-main-text"
                      : "bg-white text-main-text"
                  } rounded-lg`}
                >
                  <Tags tag={tag} />
                </div>
              );
            })}
          </div>
        </div>

        <hr className="w-full" />

        {/* 페이지네이션 */}
        <div className="relative flex h-[180px] w-full items-center justify-center gap-5 text-main-text">
          <button
            className="absolute left-3 rounded-lg border border-main-yellow bg-bg-yellow-02 px-2 py-1 text-main-text"
            onClick={() => setSelectedEng((prev) => !prev)}
          >
            {selectedEng ? "한글" : "영어"}
          </button>
          {selectedEng ? (
            <div className="flex w-[70%] flex-wrap justify-center gap-2 tablet:gap-4">
              {paginationEng.map((page, idx) => {
                return (
                  <div key={idx}>
                    <button
                      onClick={() => {
                        filterByFirstLetter(tags, page);
                        setSelectedPage(page);
                      }}
                      className={clsx(
                        `${selectedPage == page && "border border-main-yellow bg-bg-yellow-02 text-main-text"}`,
                        "rounded-full px-2 py-0.5",
                      )}
                    >
                      {page}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex w-[70%] flex-wrap justify-center gap-2 tablet:gap-4">
              {paginationKor.map((page, idx) => {
                return (
                  <div key={idx}>
                    <button
                      onClick={() => {
                        filterByFirstLetter(tags, page);
                        setSelectedPage(page);
                      }}
                      className={clsx(
                        `${selectedPage == page && "border border-main-yellow bg-bg-yellow-02 text-main-text"}`,
                        "rounded-full px-1.5 py-0.5",
                      )}
                    >
                      {page}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagDropdownMobile;
