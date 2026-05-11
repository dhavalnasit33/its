"use client";

import Image from "next/image";
import Motion from "../motionbar";
import Link from "next/link";

export default function WorldProjects() {
  return (
    <section className="w-full bg-white py-12   ">
      <div className="w-full mx-auto flex flex-col gap-12">
        {/* First div (top section) */}
        <div className="mb-8 mx-auto flex flex-col items-center text-center px-4">
          <h2 className="text-center w-full font-bold text-black tracking-tight text-2xl md:text-3xl lg:text-[40px]/[120%]">
            Working with 5+ Overseas Web Agencies
          </h2>

          <Motion />

          <p className="text-black font-bold max-w-xl text-sm sm:text-base md:text-lg leading-relaxed mt-4">
            After years of experience in the digital space, we've produced
            cutting-edge & versatile digital solutions for different agencies
            with their tools. Of course with their time zone!
          </p>
        </div>
        {/* Second div (row section) */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center-safe w-full  gap-10">
          {/* Left side: Image */}
          <div className="w-full lg:w-2/4">
            <Image
              src="/home/plan-gif2.gif"
              alt="World Map"
              width={1200}
              height={600}
              unoptimized
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Right side: Text */}
          <div className="w-full lg:w-1/4">
            <div className="mb-6 text-center lg:text-left">
              <p className="text-gray-500 text-lg mb-2">We take part in</p>
              <h3 className="text-3xl font-bold text-gray-900">
                World Wide Projects
              </h3>
            </div>
          </div>
        </div>
        {/* Button */}
        <div className="flex justify-center">
          <Link href="/our-portfolio">
            <button className="group cursor-pointer relative inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full font-semibold text-[#0A1128] text-sm sm:text-base overflow-hidden">
              {/* Expanding background bubble from center */}
              <span className="absolute inset-0 flex">
                <span className="h-full w-10 rounded-full bg-[#F1F1F1] transition-all duration-300 group-hover:w-100"></span>
              </span>

              {/* Button content on top */}
              <span className="relative z-10 flex items-center gap-2">
                See our projects
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
