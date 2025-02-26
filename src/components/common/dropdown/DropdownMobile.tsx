import useOutsideClick from "@/hooks/useOutsideClick";
import { engSortMapping } from "@/lib/utils/engFomatter";
import useWebtoonStore from "@/stores/webtoonStore";
import { ChevronDown } from "lucide-react";
import React, { RefObject, useEffect, useRef } from "react";

const DropdownMobile = ({
  openDropdown,
  setOpenDropdown,
  elements,
  option,
  setOption,
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
    <div
      className="relative flex h-5 w-[70px] items-center justify-center"
      ref={dropdownRef}
    >
      <div
        className="relative flex w-[70px] cursor-pointer text-main-text"
        onClick={() => setOpenDropdown((prev) => !prev)}
      >
        <p className="text-[10px]">{option}</p>
        <ChevronDown
          className="absolute right-0 top-0.5"
          color="#6a6a6a"
          size={12}
        />
      </div>
      {openDropdown && (
        <div className="border-1 absolute top-7 z-[100] flex h-24 w-20 cursor-pointer flex-col rounded-md border bg-white">
          {elements.map((el, index) => (
            <div
              key={index}
              className={`flex h-1/3 w-full items-center justify-center ${index === 0 ? "hover:rounded-t-md" : ""} ${index === elements.length - 1 ? "hover:rounded-b-md" : ""} hover:bg-bg-yellow-02`}
              onClick={() => {
                setOption(el);
                setOpenDropdown(false);
              }}
            >
              <p className="text-[10px] text-main-text">{el}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMobile;
