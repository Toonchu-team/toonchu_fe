"use client";

import React, { useEffect, useState } from "react";
import Hangul from "hangul-js";
import clsx from "clsx";
import { X } from "lucide-react";
import useWebtoonStore from "@/stores/webtoonStore";
import { Tag } from "../common/webtoonCard/type";

const TagDropdown = ({
  setOpenDropdown,
}: {
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { categoryTags, tagList, toggleTag, resetTag } = useWebtoonStore(); // 웹툰 목록과 전체 조회 함수 가져오기
  const categories = {
    genre: "장르",
    matter: "소재",
    atmosphere: "분위기",
    relation: "관계",
    job: "직업",
    "male character": "남캐",
    "female character": "여캐",
    character: "캐릭터성",
    "top/bottom": "00공수",
    etc: "기타",
  };

  const [isVisible, setIsVisible] = useState(false); // 애니메이션 상태

  useEffect(() => {
    setIsVisible(true); // 컴포넌트가 마운트되면 애니메이션 실행
  }, []);

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]); // 선택한 태그

  const [selectedPage, setSelectedPage] = useState<string>("ㄱ"); // 선택한 페이지
  const [pageTags, setPageTags] = useState<Tag[]>([]); // 선택한 페이지에 맞는 태그들

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

  // 태그 클릭 핸들러
  const handleTagClick = (tag: Tag) => {
    setSelectedTags((prev) => {
      // 고유 id 기준으로 비교
      if (!prev.some((t) => t.id === tag.id)) {
        return [...prev, tag];
      } else {
        return prev.filter((t) => t.id !== tag.id);
      }
    });
  };

  // 태그 분류 핸들러
  const filterByFirstLetter = (tags: Tag[], page: string) => {
    if (/^[ㄱ-ㅎ]$/.test(page)) {
      // 한글 초성 필터링
      return setPageTags(
        tags.filter((tag) => Hangul.disassemble(tag.tag_name)[0] === page),
      );
    } else if (/^[A-Z]$/i.test(page)) {
      // 영어 필터링 (대소문자 무시)
      return setPageTags(
        tags.filter((tag) =>
          tag.tag_name.toUpperCase().startsWith(page.toUpperCase()),
        ),
      );
    } else if (page === "기타") {
      return setPageTags([]);
    }
  };

  return (
    <div
      className={clsx(
        "absolute top-0 z-50 flex h-[680px] w-full flex-col items-center justify-center gap-5 rounded-b-2xl bg-main-text bg-opacity-90 transition-all duration-500 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0",
      )}
    >
      <div className="relative flex w-[70%] justify-center">
        <p className="text-xl text-white">태그 선택</p>

        {/* 닫기 버튼 */}
        <X
          color="white"
          className="absolute right-0 top-0 cursor-pointer"
          onClick={() => {
            setOpenDropdown(false);
          }}
        />
      </div>

      <div className="flex w-[70%] flex-col items-center">
        {/* 선택한 태그 */}
        <div className="flex h-[100px] items-center justify-center px-10">
          <div className="flex h-[70px] flex-wrap items-center gap-3 overflow-y-auto">
            <button
              className="rounded-lg border border-main-yellow bg-bg-yellow-02 px-2 py-1 text-main-text hover:bg-bg-yellow-01 md:h-[25px] md:rounded-lg md:px-2 md:py-1 md:text-xs xl:h-[34px] xl:text-base"
              onClick={() => {
                setSelectedTags([]);
                resetTag();
              }}
            >
              선택한 태그 초기화
            </button>
            {selectedTags.map((selectedTag, idx) => {
              return (
                // 선택한 태그가 들어가야 함.
                <div
                  key={idx}
                  className={clsx(
                    `border-1-main-grey inline-block cursor-pointer bg-white px-1.5 py-1`,
                    `h-[21px] rounded-md border hover:bg-bg-yellow-01`,
                    `md:h-[25px] md:rounded-lg md:px-2 md:py-1`,
                    `xl:h-[34px]`,
                  )}
                  onClick={() => {
                    handleTagClick(selectedTag);
                    toggleTag(selectedTag.tag_name, selectedTag.id);
                  }}
                >
                  <p
                    className={clsx(
                      `text-[10px] leading-none text-main-text md:text-xs xl:text-base`,
                    )}
                  >
                    #{selectedTag.tag_name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <hr className="w-full" />

        {/* 장르 */}
        {/* 장르 선택 시 기본값 "ㄱ"으로 필터링 시작 */}
        <div className="flex h-[100px] items-center gap-6">
          {Object.entries(categories).map(([key, value]) => {
            return (
              <div key={key}>
                <button
                  className={
                    selectedGenre == value
                      ? "rounded-lg border-main-yellow bg-bg-yellow-02 px-2 py-1 text-main-text"
                      : "text-white"
                  }
                  onClick={() => {
                    setSelectedGenre(value);
                    categoryTags(key);
                    filterByFirstLetter(tagList, "ㄱ");
                  }}
                >
                  {value}
                </button>
              </div>
            );
          })}
        </div>

        <hr className="w-full" />

        {/* 해당 태그 */}
        <div className="flex h-[230px] items-center px-10">
          <div className="flex h-[180px] flex-wrap items-center justify-center gap-3 overflow-y-auto">
            {pageTags.map((pageTag, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    handleTagClick(pageTag);
                    toggleTag(pageTag.tag_name, pageTag.id);
                  }} // 태그 클릭 핸들러 호출
                  className={clsx(
                    selectedTags.some((t) => t.id === pageTag.id)
                      ? "bg-bg-yellow-01 text-white"
                      : "bg-white text-black",
                    "rounded-lg xl:h-[34px]",
                    `md:h-[25px]`,
                  )}
                >
                  <div
                    className={clsx(
                      `border-1-main-grey inline-block cursor-pointer px-1.5 py-1`,
                      `h-[21px] rounded-md border hover:bg-bg-yellow-01`,
                      `md:h-[25px] md:rounded-lg md:px-2 md:py-1`,
                      `xl:h-[34px]`,
                    )}
                  >
                    <p
                      className={clsx(
                        `text-[10px] leading-none text-main-text md:text-xs xl:text-base`,
                      )}
                    >
                      #{pageTag.tag_name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <hr className="w-full" />

        {/* 페이지네이션 */}
        <div className="relative flex h-[150px] w-full items-center justify-center gap-5 text-white">
          <button
            className="absolute left-3 rounded-lg border border-main-yellow bg-bg-yellow-02 px-2 py-1 text-main-text"
            onClick={() => setSelectedEng((prev) => !prev)}
          >
            {selectedEng ? "한글" : "영어"}
          </button>
          {selectedEng ? (
            <div className="flex w-[80%] flex-wrap justify-center gap-4">
              {paginationEng.map((page, idx) => {
                return (
                  <div key={idx}>
                    <button
                      onClick={() => {
                        filterByFirstLetter(tagList, page);
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
            <div className="flex w-[80%] flex-wrap justify-center gap-4">
              {paginationKor.map((page, idx) => {
                return (
                  <div key={idx}>
                    <button
                      onClick={() => {
                        filterByFirstLetter(tagList, page);
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

export default TagDropdown;
