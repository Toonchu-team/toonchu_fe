import { clsx } from "clsx";
import "../globals.css";
import Header from "@/components/common/Header";
import WebtoonCardMobile from "@/components/common/webtoonCard/WebtoonCardMobile";
import WebtoonCardColMobile from "@/components/common/webtoonCard/WebtoonCardColMobile";
import Swipers from "../Swipers";
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
        {/* 인기 웹툰 - 모바일 */}
        <div
          className={clsx(
            "mobile-only",
            "flex origin-top transform flex-col",
            "relative left-0 h-[300px]",
          )}
        >
          <p className="scale-[60%] text-center text-xl text-black">
            인기 웹툰
          </p>
          <div className="relative w-[400px] overflow-visible pt-7">
            <Swipers>
              <WebtoonCardColMobile />
              <WebtoonCardColMobile />
              <WebtoonCardColMobile />
              <WebtoonCardColMobile />
              <WebtoonCardColMobile />
              <WebtoonCardColMobile />
            </Swipers>
          </div>
        </div>

        {/* 웹툰 목록 - 모바일 */}
        <div className="mobile-only flex max-w-[672px] flex-col">
          <p className="origin-left scale-[60%] text-xl text-black">
            웹툰 목록
          </p>
          <div className="flex flex-col gap-4 self-center pt-7">
            {[...Array(10)].map((_, i) => (
              <WebtoonCardMobile key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
