"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LuCheck, LuCalendar } from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Button from "@/components/Button";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

const FEATURES = [
  "AI Products",
  "AI Chatbots",
  "AI Agents",
  "Automation",
  "LLM Integration",
];

export default function Hero() {
  return (
    <Section className="common_background_gradient py-6 lg:py-6! overflow-hidden">
      <Row>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-14">
          {/* ── Left Column ── */}
          <div className="w-full z-10 max-w-full lg:max-w-[48%]">
            {/* Badge */}
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 bg-[#D27E2B]/10 border border-[#D27E2B]/20 px-3 py-1.5 rounded-full text-[#D27E2B] text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-[#D27E2B]" />
                AI Services
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-4xl md:text-[42px] xl:text-5xl font-extrabold mb-5 leading-snug text-[#0F172A] max-w-none"
            >
              Enterprise AI Solutions{" "}
              <span className="text-[#D27E2B]">
                That Transform Businesses
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-[#6f6f6f] text-base sm:text-lg md:text-[18px] font-medium leading-7 sm:leading-8 mb-8 lg:max-w-2xl"
            >
              We build intelligent AI solutions that automate operations,
              enhance customer experiences, and drive growth. From
              strategy to deployment, we deliver measurable impact.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <Button
                bgColor="#D27E2B"
                hoverColor="#0F172A"
                text="Explore AI Services"
                href="#ai-solutions"
                icon="/navbar/btn_icon.png"
              />
              <motion.div className="border border-[#D27E2B]/40 hover:border-[#D68029] bg-white relative w-auto inline-flex items-center justify-center rounded-lg overflow-hidden text-[#0F172A] hover:text-[#ffffff] transition-all duration-700 ease-in-out group shadow-xs">
                <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D27E2B] rounded group-hover:w-full group-hover:h-full"></span>
                <a
                  href="#contact-form-section"
                  className="relative tracking-tight text-sm sm:text-base px-6 py-3 sm:px-7 sm:py-3 cursor-pointer font-semibold"
                >
                  <span className="flex flex-row gap-2.5 items-center justify-center">
                    Book Consultation
                    <LuCalendar className="w-4 h-4 text-[#D27E2B] transition-all duration-700 group-hover:text-white" />
                  </span>
                </a>
              </motion.div>
            </motion.div>

            {/* Feature Checklist */}
            <motion.div
              {...fadeUp(0.3)}
              className="grid grid-cols-2 md:grid-cols-3 items-center gap-x-6 gap-y-3 mt-10"
            >
              {FEATURES.map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 text-[#0F172A]"
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[#D27E2B]/15 flex items-center justify-center">
                    <LuCheck className="w-4 h-4 text-[#D27E2B] stroke-3" />
                  </span>
                  <span className="text-sm sm:text-base font-bold">{feat}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right Column: Central Image with Blobs & Outlines ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative z-10 w-full max-w-full lg:max-w-[52%] flex justify-center items-center min-h-[500px] lg:min-h-[660px]"
          >
            <div className="relative w-full aspect-square max-w-[840px] mx-auto flex items-center justify-center">
              
              {/* 1. Animated Abstract Blob Background */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 90, 0] 
                }}
                transition={{ 
                  duration: 25, 
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 w-[75%] h-[75%] m-auto rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-gradient-to-r from-[#D27E2B]/20 to-[#e49c54]/10 blur-2xl" 
              />

              {/* 2. Floating Outline Rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-[85%] h-[85%] m-auto border border-dashed border-[#D27E2B]/30 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-[100%] h-[100%] m-auto border border-[#D27E2B]/15 rounded-full"
              />

              {/* 3. Floating Glow Particles */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[15%] right-[12%] w-4 h-4 bg-[#D27E2B] rounded-full shadow-[0_0_15px_rgba(210,126,43,0.8)]"
              />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[20%] left-[10%] w-3 h-3 bg-[#0F172A] rounded-full opacity-40 shadow-lg"
              />

              {/* Outer Glow Ring (Original) */}
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#D27E2B]/15 to-transparent blur-3xl scale-110" />

              {/* Main Image */}
              <Image
                src="/ai-service/hero-section-ai-service-image.png"
                alt="Enterprise AI Solutions & Development"
                width={900}
                height={900}
                priority
                className="object-contain relative z-10 drop-shadow-2xl scale-115 lg:scale-125"
              />
            </div>
          </motion.div>
        </div>
      </Row>
    </Section>
  );
}