"use client";

// import { useRef } from "react";
import { clsx } from "clsx";
import WebtoonCardCol from "@/components/common/webtoonCard/WebtoonCardCol";
import WebtoonCard from "@/components/common/webtoonCard/WebtoonCard";
// import { ChevronRight, ChevronLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./globals.css";
import Header from "@/components/common/Header";

export default function Main() {
  // const prevRef = useRef(null);
  // const nextRef = useRef(null);

  return (
    <>
      <Header />
      <div
        className={clsx(
          "flex flex-col items-center gap-16",
          "px-mobile md:px-tablet lg:px-desktop",
        )}
      >
        {/* 인기 웹툰 */}
        <div
          className={clsx(
            "flex w-[1121px] origin-top transform flex-col gap-14",
            "h-[300px] scale-[60%]",
            "lg:h-[400px] lg:scale-75",
            "xl:h-auto xl:scale-100",
          )}
        >
          <p className="text-xl text-main-text">인기 웹툰</p>

          <div className="relative w-full">
            <Swiper
              className="relative flex h-[430px] w-[95%]"
              slidesPerView={3}
              modules={[Navigation, Pagination, Autoplay]}
              // navigation={{
              //   prevEl: prevRef.current,
              //   nextEl: nextRef.current,
              // }}
              // onBeforeInit={(swiper) => {
              //   if (swiper.params.navigation && swiper.params.pagination) {
              //     swiper.params.navigation.prevEl = prevRef.current;
              //     swiper.params.navigation.nextEl = nextRef.current;
              //   }
              // }}
              pagination={{
                clickable: true,
                type: "bullets",
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
            >
              {[...Array(6)].map((_, i) => (
                <SwiperSlide key={i}>
                  <div className="flex justify-center">
                    <WebtoonCardCol />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 네비게이션 버튼 */}
            {/* <button ref={prevRef} className="absolute left-0 top-1/2 z-10">
              <ChevronLeft
                size={40}
                strokeWidth={1}
                className="text-[#968E82] hover:text-[#efc071]"
              />
            </button>
            <button ref={nextRef} className="absolute right-0 top-1/2 z-10">
              <ChevronRight
                size={40}
                strokeWidth={1}
                className="text-[#968E82] hover:text-[#efc071]"
              />
            </button> */}
          </div>
        </div>

        {/* 웹툰 목록 */}
        <div
          className={clsx(
            "flex w-[1121px] origin-top transform flex-col gap-14",
            "h-[900px] scale-[60%]",
            "lg:h-[1150px] lg:scale-75",
            "xl:h-auto xl:scale-100",
          )}
        >
          <p className="text-xl text-main-text">웹툰 목록</p>
          <div className="flex flex-wrap gap-x-10 gap-y-7">
            {[...Array(10)].map((_, i) => (
              <WebtoonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
