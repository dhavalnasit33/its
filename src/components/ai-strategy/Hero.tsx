"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";  
import { LuArrowDown } from "react-icons/lu";
import Row from "@/components/Row";
import Section from "../Section";
import Button from "../Button";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: "easeOut" as const, delay },
});

export default function Hero() {
  return (
    <Section className=" lg:py-18! common_background_gradient overflow-hidden">
      <Row>
        {/* <div className="absolute inset-0 ">
          <div className="absolute top-0 md:top-8 right-0 w-80 md:w-105 h-80 md:h-105 rounded-full bg-purple-500/30 blur-[130px]" />
        </div> */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"> */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-10">
          {/* ── Left Column ── */}
          {/* <div className="flex flex-col"> */}
          <div className="w-full z-10 max-w-full xl:max-w-[55%] items-center content-center text-gray-800">
            {/* Badge */}
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 text-[#D68029] text-sm font-bold uppercase tracking-widest mb-5">
                <span className="w-4 h-px bg-[#D68029]" />
                AI Strategy &amp; Consulting
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              {...fadeUp(0.1)}
              // className="text-[32px] sm:text-[40px] lg:text-[48px] xl:text-[54px] font-extrabold leading-tight text-[#0d1b2a] mb-4"
              className="text-4xl md:text-[42px] xl:text-5xl font-extrabold mb-5 leading-snug text-black rose max-w-none "
            >
              AI Strategy &amp; Consulting{" "}
              <span className="block">
                for{" "}
                <span className="text-[#D68029]">Smarter Business Growth</span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.2)}
              // className=" text-base sm:text-lg leading-relaxed mb-8 lg:max-w-lg"
              className="text-[#6f6f6f] text-base sm:text-lg md:text-[18px] font-medium leading-7 sm:leading-8 mb-8 lg:max-w-xl"
            >
              We help businesses identify high-impact AI opportunities, build clear
              roadmaps, and implement practical AI solutions that drive efficiency,
              innovation, and measurable growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                          duration: 0.6,
                          ease: "easeOut",
                          delay: 0.6,
                      }}
              className="flex flex-wrap gap-4 mb-10"
            >

              <Button
                  bgColor="#D68029"
                  hoverColor="#0d1b2a"
                  text=" Book Free Consultation"
                  icon="/navbar/btn_icon.png"
                  href="#contact-form-section"
              />
            <motion.div className="border border-[#0d1b2a] hover:border-[#D68029] relative w-auto inline-flex items-center justify-center rounded-lg overflow-hidden bg-[#0F172A] text-[#ffffff] hover:text-[#ffffff] transition-all duration-700 ease-in-out group"
                  >
                  <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D68029] rounded   group-hover:w-full group-hover:h-full"></span>
                  <a href="#ai-solutions"
                      className="relative tracking-tight text-sm sm:text-base  px-6 py-3 sm:px-8 sm:py-3 cursor-pointer font-semibold">
                      <span className="flex flex-row gap-3 items-center justify-center">
                           Explore Solutions
                           <Image
                             src="/navbar/btn_icon.png"
                             alt="Arrow"
                             width={20}
                             height={20}
                             className="transition-all duration-700 ease-in-out brightness-0 invert group-hover:brightness-0 group-hover:invert w-5 h-5 rotate-90"
                           />
                      </span>
                  </a>
              </motion.div>
            </motion.div>


          </div>

          {/* ── Right Column: Dashboard Illustration ── */}
          <motion.div
            {...fadeRight(0.2)}
            // className="relative w-full flex justify-center lg:justify-end items-center"
            className="relative z-10 w-full max-w-full xl:max-w-[55%] "
          >
            <div className="relative w-full lg:max-w-170 aspect-680/400">
              <Image
                src="/ai-strategy/hero_section_main_image.png"
                alt="AI Strategy & Consulting"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </Row>
    </Section>
  );
}
