"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { WhyChooseItem } from "@/types";
import Section from "../Section";
import Motion from "../motionbar";
import Row from "../Row";

interface WhyChoosePremiumProps {
  items: WhyChooseItem[];
}

// Custom SVG User/Team Illustration for the CTA Banner
const TeamAvatarIllustration = () => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 text-[#d68029]"
  >
    <circle cx="28" cy="46" r="8" fill="#E2E8F0" stroke="#FFFFFF" strokeWidth="2" />
    <path d="M16 62C16 54.268 21.3725 48.75 28 48.75" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="52" cy="46" r="8" fill="#E2E8F0" stroke="#FFFFFF" strokeWidth="2" />
    <path d="M64 62C64 54.268 58.6275 48.75 52 48.75" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="40" cy="38" r="9" fill="#FFF7ED" stroke="#d68029" strokeWidth="2.5" />
    <path d="M25 58C25 49.1634 31.7157 42 40 42C48.2843 42 55 49.1634 55 58" stroke="#d68029" strokeWidth="3" strokeLinecap="round" />
    <path d="M22 26L23.5 29L26.5 29.5L24.25 31.5L25 34.5L22 32.75L19 34.5L19.75 31.5L17.5 29.5L20.5 29L22 26Z" fill="#FBBF24" />
    <path d="M58 24L59 26L61 26.3L59.5 27.6L60 29.6L58 28.4L56 29.6L56.5 27.6L55 26.3L57 26L58 24Z" fill="#FBBF24" />
  </svg>
);

// ─── Individual Combined Card ───────────────────────────────────────────────────
interface CardProps {
  item: WhyChooseItem;
  index: number;
}

function WhyChooseCard({ item, index }: CardProps) {
  // Create a 01, 02, 03 style step number
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      className="
        group relative bg-white 
        rounded-tl-[40px] rounded-br-[40px] rounded-tr-xl rounded-bl-xl 
        p-8 pt-10 pb-12 mb-6 
        flex flex-col items-center text-center gap-4 
        shadow-[0_4px_20px_rgba(0,0,0,0.03)] 
        hover:-translate-y-2 hover:shadow-[12px_12px_0px_rgba(214,128,41,0.15)] 
        transition-all duration-[400ms] ease-out cursor-default 
        w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]
        border border-slate-100
      "
    >
      {/* Top-Left 'L' Accent Line (From Image 1) */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-[3px] border-l-[3px] border-[#d68029] rounded-tl-[40px] opacity-30 group-hover:opacity-100 group-hover:w-16 group-hover:h-16 transition-all duration-300" />
      
      {/* Bottom-Right 'L' Accent Line (From Image 1) */}
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[3px] border-r-[3px] border-[#d68029] rounded-br-[40px] opacity-30 group-hover:opacity-100 group-hover:w-16 group-hover:h-16 transition-all duration-300" />

      {/* Centered Icon Container */}
      <div className="w-16 h-16 rounded-2xl bg-[#fff7f0] flex items-center justify-center shrink-0 overflow-hidden transition-all duration-300 group-hover:bg-[#d68029] group-hover:scale-110 mb-2">
        <Image
          src={item.image}
          alt={item.title}
          width={32}
          height={32}
          className="object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-3 relative z-10">
        <h3 className="text-xl font-bold text-[#0d1b2a] leading-tight group-hover:text-[#d68029] transition-colors duration-300">
          {item.title}
        </h3>
        <p
          className="text-slate-500 text-[15px] leading-relaxed line-clamp-4"
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
      </div>

      {/* Floating Bottom Number Badge (From Image 2) */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0d1b2a] text-white flex items-center justify-center font-bold text-lg border-4 border-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] group-hover:bg-[#d68029] group-hover:scale-110 transition-all duration-300 z-10">
        {stepNumber}
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function WhyChoosePremium({ items }: WhyChoosePremiumProps) {
  return (
    <Section className="relative py-20 lg:py-28 overflow-hidden border-t border-slate-100">
      {/* Decorative background grid / blurs matching mockup */}
      <div className="pointer-events-none absolute top-[-50px] right-[-150px] w-[500px] h-[500px] rounded-full bg-[#d68029]/10 blur-[130px]" />
      
      <Row>
        <div className="relative z-10  mx-auto flex flex-col gap-16">
          
          {/* ── Section Header ── */}
          <div className="text-center mx-auto flex flex-col items-center gap-4 ">
            <motion.span
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-black uppercase tracking-widest text-[#d68029]"
            >
              WHY CHOOSE INSPIRE
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0d1b2a] leading-[1.2] tracking-tight"
            >
              Delivering Excellence, Driving Success
            </motion.h2>

            <Motion />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="text-slate-500 text-[14px] sm:text-[18px] leading-relaxed font-medium mt-2 max-w-3xl"
            >
              We combine technology, expertise, and commitment to deliver
              exceptional solutions that help your business grow.
            </motion.p>
          </div>

          {/* ── Cards Grid ── */}
          {/* Note: Added gap-y-12 to account for the overlapping bottom badges */}
          {items.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-12 mt-4">
              {items.map((item, index) => (
                <WhyChooseCard
                  key={item.id ?? `why-choose-${index}`}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-sm">No data available.</p>
          )}

          {/* ── CTA Banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative w-full bg-[#0a1628] rounded-[28px] px-8 py-10 md:px-14 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden shadow-xl mt-8"
          >
            {/* Subtle overlay decorative vector lines for premium feel */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
            
            {/* Left Decorative Dot Grid in Banner */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none hidden lg:block">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                {Array.from({ length: 4 }).map((_, r) =>
                  Array.from({ length: 4 }).map((_, c) => (
                    <circle key={`${r}-${c}`} cx={10 + c * 14} cy={10 + r * 14} r="1.5" fill="#FFFFFF" />
                  ))
                )}
              </svg>
            </div>

            {/* Right Decorative Concentric Circles */}
            <div className="absolute right-0 bottom-[-50px] w-64 h-64 border border-white/[0.03] rounded-full flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 border border-white/[0.04] rounded-full flex items-center justify-center">
                <div className="w-32 h-32 border border-white/[0.05] rounded-full" />
              </div>
            </div>

            {/* Left side content */}
            <div className="flex items-center gap-6 flex-1 z-10 text-center md:text-left flex-col md:flex-row">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden">
                <TeamAvatarIllustration />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  Ready to Transform Your Ideas into Reality?
                </h3>
                <p className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed max-w-xl">
                  Let&apos;s build innovative solutions that drive growth and create lasting impact for your business.
                </p>
              </div>
            </div>

            {/* Right side: CTA button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#D68029] relative w-auto inline-flex items-center justify-center rounded-lg overflow-hidden text-white hover:text-[#0d1b2a] transition-all duration-700 ease-in-out group"
            >
              <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#ffffff] rounded group-hover:w-full group-hover:h-full"></span>
              <a
                href="#contact-form-section"
                className="relative tracking-tight text-sm sm:text-base px-6 py-2 sm:px-8 sm:py-4 cursor-pointer font-semibold"
              >
                <span className="flex flex-row gap-3 items-center justify-center">
                 Talk to Our Experts
                  <div className="group">
                    <Image
                      src="/navbar/btn_icon.png"
                      alt="FRAME"
                      width={20}
                      height={20}
                      className="transition-all duration-700 ease-in-out group-hover:brightness-0 group-hover:sepia w-5 h-5"
                    />
                  </div>
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </Row>
    </Section>
  );
}