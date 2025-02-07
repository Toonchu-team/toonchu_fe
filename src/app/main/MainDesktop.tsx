import { clsx } from "clsx";
import WebtoonCardCol from "@/components/common/webtoonCard/WebtoonCardCol";
import WebtoonCard from "@/components/common/webtoonCard/WebtoonCard";
import "../globals.css";
import Swipers from "../Swipers";
import Header from "@/components/common/Header";
import { BreakpointType } from "@/stores/breakptStore";

export default function Main({
  initialBreakpoint,
}: {
  initialBreakpoint: BreakpointType;
}) {
  return (
    <>
      <Header initialBreakpoint={initialBreakpoint} /> {/* 헤더 반응형 필요 */}
      <div
        className={clsx(
          "flex flex-col items-center gap-16",
          "px-mobile md:px-tablet lg:px-desktop",
        )}
      >
        {/* 인기 웹툰 - 데스크탑 & 태블릿 */}
        <div
          className={clsx(
            "desktop-tablet-only",
            "flex w-[1121px] origin-top transform flex-col",
            "h-[300px] scale-[60%]",
            "lg:h-[400px] lg:scale-75",
            "xl:h-auto xl:scale-100",
          )}
        >
          <p className="text-xl text-black">인기 웹툰</p>
          <div className="relative w-full pt-14">
            <Swipers>
              <WebtoonCardCol />
              <WebtoonCardCol />
              <WebtoonCardCol />
              <WebtoonCardCol />
              <WebtoonCardCol />
              <WebtoonCardCol />
            </Swipers>
          </div>
        </div>

        {/* 웹툰 목록 - 데스크탑 & 태블릿 */}
        <div
          className={clsx(
            "desktop-tablet-only",
            "flex w-[1121px] origin-top transform flex-col",
            "h-[900px] scale-[60%]",
            "lg:h-[1150px] lg:scale-75",
            "xl:h-auto xl:scale-100",
          )}
        >
          <p className="text-xl text-black">웹툰 목록</p>
          <div className="flex flex-wrap gap-x-10 gap-y-7 pt-14">
            {[...Array(10)].map((_, i) => (
              <WebtoonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
