"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FiClock, FiHeart, FiShield, FiUsers } from "react-icons/fi";
import AutoTextSlider from "@/components/home/AutoTextSlider";
import Row from "@/components/Row";


const ParticlesBg = dynamic(() => import("@/components/home/Particles"), { ssr: false });

interface HeroProps {
  heroSecton?: {
    title: string;
    description: string;
    technologySection: {
      title: string;
    }[];
  };
  scrollToId?: string;
}

const DEFAULT_HERO_DATA = {
  title: "<h1><strong>Transform Your Business Idea with</strong></h1>",
  description: "<p>We create intelligent, scalable, and production-ready AI solutions — including Generative AI, <span style=\"color: rgb(214, 128, 41);\">Large Language Models (LLMs)</span>, Computer Vision, <span style=\"color: rgb(214, 128, 41);\">Predictive Analytics, and Smart Automation</span> — designed to accelerate innovation and drive real business growth.</p>",
  technologySection: [
    { title: "AI-Powered Chatbots" },
    { title: "Predictive Analytics & ML" },
    { title: "Intelligent Automation" },
    { title: "MERN Development" },
    { title: "Mobile App Development" }
  ]
};

const statsData = [
  {
    icon: FiShield,
    title: "NDA on Day One",
    description: "Your clients never find us",
  },
  {
    icon: FiClock,
    title: "48hr Kickoff",
    description: "Projects start fast",
  },
  {
    icon: FiUsers,
    title: "40+ Agency Partners",
    description: "US, UK, Australia & Canada",
  },
  {
    icon: FiHeart,
    title: "95% Retention Rate",
    description: "Partnerships since 2012",
  },
];

export default function Hero({ heroSecton, scrollToId = "ai-service" }: HeroProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const section = document.getElementById(scrollToId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const data = heroSecton || DEFAULT_HERO_DATA;

  return (
    <section className="w-full relative py-12 sm:py-25 lg:py-32 overflow-hidden z-10 pb-20! ">
      <div className="absolute inset-0 z-0 bg-linear-to-r from-[#1a0f0f] via-[#0b0f1a] to-[#001a2e]" />

      <div className="absolute inset-0 z-1">
        {!isMobile && <ParticlesBg />}
      </div>
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
          radial-gradient(circle at 18% 20%, rgba(214, 128, 41, 0.15), transparent 28%),
          radial-gradient(circle at 85% 70%, rgba(14, 165, 233, 0.15), transparent 20%),
          radial-gradient(circle at 40% 90%, rgba(13,67,93,.10), transparent 15%),
          #030b1a					
          `
        }}
      />
      <div className="absolute inset-0 z-1 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.06)_0,rgba(0,0,0,0.06)_4px)]" />

      <Row className="z-10">
        <motion.div
          className="text-center"
          initial={{ y: -300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h1 className="rose text-[clamp(26px,5vw,64px)] text-white font-normal tracking-[-0.03em] leading-[1.08] opacity-[0.92]">
            {data.title?.replace(/<[^>]*>?/gm, "")}
            <AutoTextSlider data={data.technologySection} />
          </h1>

          <div className="yellow-text max-w-200 mx-auto mb-16 md:mb-20 text-center fonts_16 text-white"
            dangerouslySetInnerHTML={{ __html: data.description || "", }}
          />

          <div className="flex flex-wrap relative w-full justify-center mb-10 md:mb-14">
            <div className="relative flex flex-wrap items-center w-full max-w-[550px]">
              <Link
                href="#contact-form-section"
                className=" w-full sm:flex-1 bg-white
                  text-[#0d1b2a] text-sm md:text-base font-semibold uppercase text-center max-sm:mb-3 leading-5 py-3 px-8 md:px-16 max-[640px]:rounded-lg sm:rounded-l-xl  transition-all
                  duration-300  hover:bg-linear-to-r hover:from-[#20548b] hover:to-[#0d1b2a] hover:text-white "
              >
                Request a Callback
              </Link>

              <span
                className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  z-10 flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#0d1b2a]
                  text-white  text-sm font-medium  uppercase shadow-[0_0_0_4px_rgba(255,255,255,0.25)] sm:shadow-[0_0_0_6px_rgba(255,255,255,0.25)]  "
              >
                OR
              </span>

              <Link
                href="#contact-form-section"
                className=" w-full sm:flex-1 bg-linear-to-r from-[#d68029] to-[#f7b733] text-[#0d1b2a] text-sm md:text-base font-semibold uppercase text-center leading-5
                  py-3 px-8 md:px-16 max-[640px]:rounded-lg sm:rounded-r-xl  transition-all duration-300   hover:bg-linear-to-r hover:from-[#0d1b2a] hover:to-[#20548b] hover:text-white"
              >
                Schedule Free Consultation
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="max-w-125 lg:max-w-210 mx-auto px-4">
          <div className="h-px bg-[rgba(255,255,255,0.1)] mt-16 md:mt-21 mb-10"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 max-lg:gap-4">
            {statsData.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index}
                  className="relative flex flex-col items-center text-center px-4 max-lg:py-5 max-lg:bg-[rgba(255,255,255,0.04)] max-lg:rounded-lg"
                >
                  {index !== statsData.length - 1 && (
                    <div className=" hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-24 bg-linear-to-b from-transparent via-[#D68029] to-transparent " />
                  )}
                  <Icon
                    size={34}
                    className="text-[#ff7a1a]/80 mb-3"
                  />

                  <p className="text-white opacity-90 font-bold text-sm">
                    {item.title}
                  </p>

                  <p className="text-white opacity-70 mt-2 font-medium text-xs">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className=" text-center mt-20 md:mt-26">
          <button
            onClick={handleScroll}
            className=" inline-flex -center justify-center p-1 border-2 border-[#f7b733] rounded-full  cursor-pointer "
          >
            <div className=" relative w-[30px] h-15 border-2 border-white rounded-full " >
              <div className=" absolute left-1/2 top-6 w-3  h-3  bg-white rounded-full mx-auto animate-scrollDot " />
            </div>
          </button>
        </div>
      </Row>

      <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-[linear-gradient(0deg,#030b1a_0,transparent)] pointer-events-none z-10" />
    </section>
  );
}
