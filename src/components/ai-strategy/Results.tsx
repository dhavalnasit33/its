"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; 
import { useCountUp } from "@/hook/useCountUp";
import { RESULT_STATS } from "@/data/constants";
import Section from "../Section";
import Row from "../Row";

interface StatItemProps {
  value: string;
  suffix: string;
  label: string;
  index: number;
}

function StatIcon({ label }: { label: string }) {
  const lbl = label.toLowerCase();
  if (lbl.includes("project")) {
    return (
      <svg className="w-5 h-5 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (lbl.includes("satisfaction") || lbl.includes("client")) {
    return (
      <svg className="w-5 h-5 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
  }
  if (lbl.includes("productivity") || lbl.includes("increase")) {
    return (
      <svg className="w-5 h-5 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    );
  }
  if (lbl.includes("cost") || lbl.includes("reduction")) {
    return (
      <svg className="w-5 h-5 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function StatItem({ value, suffix, label, index }: StatItemProps) {
  const numericValue = parseInt(value, 10);
  const { count, ref } = useCountUp(numericValue);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex items-center gap-4 text-left"
    >
      <div className="w-12 h-12 rounded-full bg-[#D68029]/10 border border-[#D68029]/20 flex items-center justify-center shrink-0">
        <StatIcon label={label} />
      </div>
      <div>
        <p className="text-white text-xl sm:text-2xl font-extrabold leading-none">
          {count}
          {suffix}
        </p>
        <p className="text-gray-400 text-[11px] sm:text-xs mt-1.5 leading-snug max-w-[130px] font-semibold">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export default function Results() {
  return (
    <Section className=" bg-white">
      <Row>
        <div className="relative bg-[#0d1b2a] rounded-3xl overflow-hidden px-8 py-10 md:px-12 md:py-12 border border-white/5 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Ambient background glows */}
          <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-[#D68029]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#0EA5E9]/10 blur-3xl pointer-events-none" />

          {/* Left Block */}
          <div className="flex-1 w-full relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-[32px] font-extrabold text-white leading-tight mb-8"
            >
              Real Impact. <span className="text-[#D68029]">Measurable Results.</span>
            </motion.h2>

            <div className="grid max-[480px]:grid-cols-1 grid-cols-2 xl:grid-cols-4 gap-6 md:gap-4">
              {RESULT_STATS.map((stat, idx) => (
                <StatItem
                  key={idx}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  index={idx}
                />
              ))}
            </div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="w-full lg:w-100 shrink-0 flex justify-center lg:justify-end relative z-10"
          >
            <Image
              src="/ai-strategy/ai-head-illustration.png"
              alt="AI Results"
              width={240}
              height={240}
              className="w-full lg:max-w-120 h-auto object-contain"
            />
          </motion.div>
        </div>
      </Row>
    </Section>
  );
}
