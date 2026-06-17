"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import { NavigationStructure } from "@/lib/navigationService";

interface PlatformSliderProps {
  navStructure?: NavigationStructure;
}

export default function PlatformSlider({ navStructure }: PlatformSliderProps) {
    
  const services =
    navStructure?.servicesNav?.flatMap((category) =>
      category.links?.map((service) => ({
        title: service.title,
        slug: service.slug,
      })) || []
    ) || [];

  if (!services.length) return null;

  return (
    <div className="flex gap-2 md:gap-4 items-center overflow-hidden">
      {/* Left Title */}
      <div className="flex items-center pr-2 md:pr-4 border-r border-white/10 shrink-0">
        <h4 className="text-[#D68029] text-xs md:text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
          Platforms we build on
        </h4>
      </div>

      {/* Slider */}
      <div className="flex-1 min-w-0">
       <Swiper
            modules={[Autoplay]}
            slidesPerView="auto"
            spaceBetween={12}
            loop={true}
            speed={8000}
            allowTouchMove={false}
            autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
            }}
            className="serviceSwiper"
            >
            <ul className="flex items-center">
                {services.map((service) => (
                <SwiperSlide
                    key={service.slug}
                    className="!w-auto"
                >
                    <li className="list-none">
                    <Link
                        href={`/${service.slug}`}
                        className=" flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white whitespace-nowrap  transition-all
                        duration-300 hover:border-[#D68029] hover:text-[#D68029] "
                    >
                        <span className="w-1 h-1 bg-[#D68029] rounded-full"></span>
                        <span className="text-[13px]">
                        {service.title}
                        </span>
                    </Link>
                    </li>
                </SwiperSlide>
                ))}
            </ul>
        </Swiper>
      </div>
    </div>
  );
}