"use client";

import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SwipersProps {
  children: ReactNode;
}

const Swipers: React.FC<SwipersProps> = ({ children }) => {
  return (
    <div className="relative mx-auto w-full overflow-visible">
      <Swiper
        className="relative flex h-[370px] overflow-visible xl:h-[430px]"
        slidesPerView={3}
        breakpoints={{
          0: { slidesPerView: 1 },
          540: { slidesPerView: 2 },
          1281: { slidesPerView: 3 },
        }}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true} // ✅ 기본 navigation 사용
        pagination={{ clickable: true, type: "bullets" }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center">{child}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Swipers;
