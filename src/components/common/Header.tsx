import Image from "next/image";
import SearchBar from "./searchBar/SearchBar";
import SearchBarMoblie from "./searchBar/SearchBarMobile";

export default function Header() {
  return (
    <header className="h-[420px] w-full sm:h-[630px] lg:h-[800px]">
      <div className="flex h-[230px] w-full justify-center bg-white sm:h-[350px] lg:h-[480px]">
        <div className="relative flex w-[750px] scale-[45%] items-center justify-center sm:scale-75 sm:gap-5 lg:scale-100 lg:gap-20">
          <div className="flex flex-col items-center gap-5">
            <p className="font-[lemonada] text-7xl">ToonChu</p>
            <p className="text-center">
              다양한 태그로 웹툰을 소개합니다. <br /> 지금 바로 탐험해 보세요!
            </p>
          </div>
          <Image
            src="/mockup.png"
            alt="mockup"
            width={370}
            height={400}
            className="drop-shadow-2xl"
          />
          {/* <div
            className={`border-1-main-grey absolute bottom-36 right-64 inline-block rounded-xl border bg-bg-yellow-01 px-2 py-1 lg:bottom-48`}
          >
            <p className={`text-xs text-main-text`}>태그별 검색</p>
          </div>
          <div
            className={`border-1-main-grey absolute bottom-[-20px] right-12 inline-block rounded-xl border bg-bg-yellow-01 px-2 py-1 lg:bottom-8`}
          >
            <p className={`text-xs text-main-text`}>작품 등록</p>
          </div> */}
        </div>
      </div>
      <div className="flex h-[120px] w-full flex-col items-center justify-center gap-4 bg-bg-yellow-01 sm:h-[180px]">
        <div className="desktop-tablet-only">
          <SearchBar />
        </div>
        <div className="mobile-only">
          <SearchBarMoblie />
        </div>
        <p className="text-xs text-main-text lg:text-sm">
          🔍 검색해 보세요! 🔍
        </p>
      </div>
      <div className="h-16 w-full bg-gradient-to-t from-white to-bg-yellow-01 lg:h-24"></div>
    </header>
  );
}
