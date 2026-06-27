"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";  
import Row from "@/components/Row";
import Section from "../Section";

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
    <Section className=" overflow-hidden">
      <Row>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Left Column ── */}
          <div className="flex flex-col">
            {/* Badge */}
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 text-[#D68029] text-xs font-bold uppercase tracking-widest mb-5">
                <span className="w-4 h-px bg-[#D68029]" />
                AI Strategy &amp; Consulting
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-[32px] sm:text-[40px] lg:text-[48px] xl:text-[54px] font-extrabold leading-tight text-[#0d1b2a] mb-4"
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
              className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
            >
              We help businesses identify high-impact AI opportunities, build clear
              roadmaps, and implement practical AI solutions that drive efficiency,
              innovation, and measurable growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              {...fadeUp(0.3)}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link
                href="#contact-form-section"
                className="relative inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-[#D68029] text-white font-semibold text-sm sm:text-base overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-[#D68029]/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Free Consultation
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>

              <Link
                href="#ai-solutions"
                className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl border border-[#0d1b2a] text-[#0d1b2a] font-semibold text-sm sm:text-base hover:bg-[#0d1b2a] hover:text-white transition-all duration-300"
              >
                Explore Our Services
                <span>→</span>
              </Link>
            </motion.div>


          </div>

          {/* ── Right Column: Dashboard Illustration ── */}
          <motion.div
            {...fadeRight(0.2)}
            className="relative w-full flex justify-center lg:justify-end items-center"
          >
            <div className="relative w-full max-w-[540px] aspect-[4/3] rounded-3xl border border-gray-100 bg-[#0d1b2a] shadow-2xl overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center scale-[1.32]">
                <Image
                  src="/ai-strategy/hero_section_main_image.png"
                  alt="AI Strategy & Consulting"
                  width={680}
                  height={540}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Row>
    </Section>
  );
}
