"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AiServices from "./AiServices";

interface DetailBoxItem {
  title: string;
  heading: string;
  description: string;
}

interface AiServicesSliderProps {
  deatailBox?: DetailBoxItem[];
  glowColors: string[];
}

export default function AiServicesSlider({ deatailBox, glowColors }: AiServicesSliderProps) {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={24}
      slidesPerView={1}
      loop={true}
      speed={1000}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {deatailBox?.map((item, idx) => (
        <SwiperSlide key={idx} className="h-auto! flex ">
          <div className="relative group rounded-xl overflow-hidden h-full w-full flex">
            {/* glow background */}
            <span
              className="absolute -top-5 -right-5 h-32 w-32 blur-2xl z-10"
              style={{
                background: `radial-gradient(circle, ${glowColors[idx % glowColors.length]}, transparent 70%)`,
              }}
            />
            <AiServices
              title={item.title}
              heading={item.heading}
              description={item.description}
              glowColor={glowColors[idx % glowColors.length]}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
