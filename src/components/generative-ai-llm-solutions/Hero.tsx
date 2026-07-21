"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LuCalendar } from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Button from "@/components/Button";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

export default function Hero() {
  return (
    <Section className="lg:py-20! common_background_gradient relative overflow-hidden">
      <Row>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10 w-full">
          {/* ── Left Column ── */}
          <div className="w-full max-w-full lg:max-w-[48%]">
            {/* Badge */}
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 text-[#D27E2B] text-xs sm:text-sm font-bold uppercase tracking-widest mb-6">
                <span className="w-5 h-px bg-[#D27E2B]" />
                ENTERPRISE GENERATIVE AI
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-4xl md:text-[46px] xl:text-[54px] font-extrabold mb-6 leading-[1.15] text-[#0F172A]"
            >
              Generative AI & <br className="hidden sm:inline" /> LLM Solutions <br />
              <span className="text-[#D27E2B]">That Transform Business Intelligence</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-medium"
            >
              Unlock the power of next-generation AI models to automate workflows, enhance productivity, and deliver intelligent experiences across your entire organization.
            </motion.p>

            {/* Buttons */}
            <motion.div
              {...fadeUp(0.3)}
              className="flex flex-wrap gap-4"
            >
              <Button
                bgColor="#D27E2B"
                hoverColor="#0F172A"
                text="Build Your AI Solution"
                href="#contact-form-section"
                icon="/navbar/btn_icon.png"
              />
              <motion.div className="border border-[#172240]/40 hover:border-[#D68029] bg-[#172240] relative w-auto inline-flex items-center justify-center rounded-lg overflow-hidden text-[#ffffff] hover:text-[#ffffff] transition-all duration-700 ease-in-out group shadow-xs">
                <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D27E2B] rounded group-hover:w-full group-hover:h-full"></span>
                <a
                  href="#solutions"
                  className="relative tracking-tight text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3 cursor-pointer font-semibold flex items-center gap-2"
                >
                  Explore Solutions
                  <Image
                    src="/navbar/btn_icon.png"
                    alt="Arrow"
                    width={20}
                    height={20}
                    className="transition-all duration-700 invert ease-in-out brightness-0 group-hover:brightness-0 group-hover:invert w-5 h-5 rotate-90"
                  />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Right Column: Graphic Image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-[52%] flex justify-center items-center relative min-h-[480px]"
          >
            {/* Pulsing Backlight */}
            <div className="absolute w-72 h-72 rounded-full bg-[#D27E2B]/10 blur-3xl scale-125 z-0" />

            <div className="relative w-full z-10 flex justify-center">
              <Image
                src="/ai-strategy/generative-ai-llm-development/hero-main-image.png"
                alt="Generative AI & LLM Solutions"
                width={850}
                height={850}
                priority
                className="object-contain w-full h-auto drop-shadow-xl scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </Row>
    </Section>
  );
}
