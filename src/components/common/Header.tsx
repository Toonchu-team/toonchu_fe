import Image from "next/image";
import clsx from "clsx";
import ResponsiveSearchBar from "./searchBar/ResponsiveSearchBar";

export default function Header() {
  return (
    <header className={clsx("w-full", "h-[420px] sm:h-[630px] lg:h-[800px]")}>
      {/* 상단 영역 */}
      <div
        className={clsx(
          "flex w-full justify-center bg-white",
          "h-[230px] sm:h-[350px] lg:h-[480px]",
        )}
      >
        <div
          className={clsx(
            "relative flex items-center justify-center",
            "w-[750px] scale-[45%] sm:scale-75 lg:scale-100",
            "sm:gap-5 lg:gap-20", // 반응형 간격 조정
          )}
        >
          {/* 로고 & 텍스트 */}
          <div className="flex flex-col items-center gap-5">
            <p className="font-[lemonada] text-7xl">ToonChu</p>
            <p className="text-center">
              다양한 태그로 웹툰을 소개합니다. <br /> 지금 바로 탐험해 보세요!
            </p>
          </div>

          {/* 이미지 */}
          <Image
            src="/mockup.png"
            alt="mockup"
            width={370}
            height={400}
            priority // Next.js가 이 이미지를 최우선으로 로드하도록
            className="drop-shadow-2xl"
            style={{ width: "auto", height: "auto" }} // Next.js가 크기 변경을 감지하지 않도록 설정
          />
        </div>
      </div>

      {/* 검색창 영역 */}
      <div
        className={clsx(
          "flex flex-col items-center justify-center gap-4", // 중앙 정렬 및 간격 설정
          "w-full bg-bg-yellow-01", // 배경색 적용
          "h-[120px] sm:h-[180px]", // 반응형 높이 조정
        )}
      >
        <div>
          <ResponsiveSearchBar type="header" />
        </div>
        <p className="text-xs text-main-text lg:text-sm">
          🔍 검색해 보세요! 🔍
        </p>
      </div>

      {/* 그라데이션 영역 */}
      <div className="h-16 w-full bg-gradient-to-t from-white to-bg-yellow-01 lg:h-24"></div>
    </header>
  );
}
