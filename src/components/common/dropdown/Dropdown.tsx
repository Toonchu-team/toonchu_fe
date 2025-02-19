import useOutsideClick from "@/hooks/useOutsideClick";
import { ChevronDown } from "lucide-react";
import React, { RefObject, useRef } from "react";

const Dropdown = ({
  openDropdown,
  setOpenDropdown,
  elements, // 드롭다운 메뉴 배열
  option, // 선택된 옵션
  setOption, // 선택된 옵션 상태 관리 함수
}: {
  openDropdown: boolean;
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  elements: string[];
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 외부 클릭 감지 핸들러
  useOutsideClick({
    ref: dropdownRef as RefObject<HTMLElement>,
    callback: () => setOpenDropdown(false),
  });

  return (
    <>
      <div
        className="relative flex h-8 w-[150px] items-center justify-center"
        ref={dropdownRef}
      >
        <div
          className="relative flex w-36 cursor-pointer text-main-text"
          onClick={() => setOpenDropdown((prev) => !prev)}
        >
          <p>{option}</p>
          <ChevronDown
            className="absolute right-1"
            color="#6a6a6a"
            width={20}
          />
        </div>
        {openDropdown && (
          <div className="border-1 absolute top-10 z-50 flex h-32 w-36 cursor-pointer flex-col rounded-xl border bg-white shadow-lg">
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
