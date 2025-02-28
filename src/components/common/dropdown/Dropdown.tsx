import useOutsideClick from "@/hooks/useOutsideClick";
import { engSortMapping } from "@/lib/utils/engFomatter";
import useWebtoonStore from "@/stores/webtoonStore";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import React, { RefObject, useEffect, useRef } from "react";

const Dropdown = ({
  openDropdown,
  setOpenDropdown,
  elements, // 드롭다운 메뉴 배열
  option, // 선택된 옵션
  setOption, // 선택된 옵션 상태 관리 함수
  type,
  selectedTagIds,
  serial_day,
  serial_type,
}: {
  openDropdown: boolean;
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  elements: string[];
  option: string;
  setOption: (value: string) => void;
  type: "day" | "tag" | "prov" | "etc";
  selectedTagIds?: number[];
  serial_day?: string;
  serial_type?: string;
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { tagSort, daySort, etcSort } = useWebtoonStore();

  // 정렬 API
  useEffect(() => {
    if (type === "tag" && selectedTagIds) {
      if (selectedTagIds.length !== 0) {
        tagSort(selectedTagIds, engSortMapping[option]);
      }
    } else if (type === "day" && serial_day && serial_type) {
      daySort(serial_day, serial_type, engSortMapping[option]);
    } else if (type === "etc" && serial_type) {
      etcSort(serial_type, engSortMapping[option]);
    }
  }, [
    option,
    setOption,
    selectedTagIds,
    tagSort,
    daySort,
    type,
    serial_day,
    serial_type,
    etcSort,
  ]);

  // 외부 클릭 감지 핸들러
  useOutsideClick({
    ref: dropdownRef as RefObject<HTMLElement>,
    callback: () => setOpenDropdown(false),
  });

  return (
    <>
      <div
        className="relative flex h-7 w-[100px] items-center justify-center xl:h-8 xl:w-[150px]"
        ref={dropdownRef}
      >
        <div
          className="relative flex w-36 cursor-pointer items-center text-sm text-main-text xl:text-base"
          onClick={() => setOpenDropdown((prev) => !prev)}
        >
          <p>{option}</p>
          <ChevronDown
            className="absolute right-0 xl:right-1"
            color="#6a6a6a"
            width={20}
          />
        </div>
        {openDropdown && (
          <div
            className={clsx(
              "border-1 absolute top-10 z-50 flex w-28 cursor-pointer flex-col rounded-xl border bg-white text-sm shadow-lg xl:w-36 xl:text-base",
              `h-36 ${type === "prov" ? "xl:h-44" : "xl:h-40"}`,
            )}
          >
            {elements.map((el, index) => (
              <div
                key={index}
                className={`flex h-1/3 w-full items-center justify-center ${index === 0 ? "hover:rounded-t-xl" : ""} ${index === elements.length - 1 ? "hover:rounded-b-xl" : ""} hover:bg-bg-yellow-02`}
                onClick={() => {
                  setOption(el);
                  setOpenDropdown(false);
                }}
              >
                <p className="text-main-text">{el}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
