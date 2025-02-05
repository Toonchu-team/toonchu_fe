import Image from "next/image";
import SearchBar from "./searchBar/SearchBar";

export default function Header() {
  return (
    <header className="h-[800px] w-full">
      <div className="flex h-[480px] w-full justify-center bg-white">
        <div className="relative flex w-[750px] scale-75 items-center justify-center gap-20 lg:scale-100">
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
          <div
            className={`border-1-main-grey absolute bottom-48 right-64 inline-block rounded-xl border bg-bg-yellow-01 px-2 py-1`}
          >
            <p className={`text-xs text-main-text`}>태그별 검색</p>
          </div>
          <div
            className={`border-1-main-grey absolute bottom-8 right-12 inline-block rounded-xl border bg-bg-yellow-01 px-2 py-1`}
          >
            <p className={`text-xs text-main-text`}>작품 등록</p>
          </div>
        </div>
      </div>
      <div className="flex h-[180px] w-full flex-col items-center justify-center gap-4 bg-bg-yellow-01">
        <SearchBar />
        <p className="text-xs text-main-text lg:text-sm">
          🔍 검색해 보세요! 🔍
        </p>
      </div>
      <div className="h-24 w-full bg-gradient-to-t from-white to-bg-yellow-01"></div>
    </header>
  );
}
