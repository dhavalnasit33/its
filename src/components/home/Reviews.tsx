import React from "react";
import Motion from "@/components/motionbar";
import Image from "next/image";

const Reviews: React.FC = () => {
  const logos = [
    { src: "/home/upwork-logo.png", alt: "Upwork" },
    { src: "/home/clutch-logo.png", alt: "Clutch" },
    { src: "/home/google-logo.png", alt: "Google Reviews" },
    { src: "/home/glassdoor-logo.png", alt: "Glassdoor" },
  ];

  return (
    <section className="py-16 w-full bg-transparent relative text-center bg-white z-10">
      <div className=" w-full relative max-w-7xl lg:max-w-6xl mx-auto">
        <div className="text-center pb-10 mb-2.5 w-full">
          <h2 className="text-center w-full font-bold text-black tracking-tight text-2xl md:text-3xl lg:text-[40px]/[120%]">
            Read Our Review on
          </h2>
          <Motion />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10  mx-auto pt-6 ">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center h-24 rounded-[13px] bg-white
              w-full
                         shadow-[0px_4px_15px_rgba(0,0,0,0.1)] transition-all hover:shadow-lg"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={150}
                height={80}
                className="max-h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;


