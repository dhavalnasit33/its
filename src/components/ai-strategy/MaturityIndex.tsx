"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LuTarget,
  LuDatabase,
  LuUsers,
  LuLayers,
  LuSettings,
  LuTrendingUp,
} from "react-icons/lu";
import Section from "../Section";
import Row from "../Row";
import { IconType } from "react-icons";
import SectionBadge from "../new-home-components/SectionBadge";

const LEFT_CARDS = [
  {
    id: "ai-strategy",
    title: "AI Strategy",
    desc: "Build a future-ready AI roadmap aligned with business goals.",
    icon: LuTarget,
  },
  {
    id: "data-intelligence",
    title: "Data Intelligence",
    desc: "Unlock the power of your data with AI driven insights.",
    icon: LuDatabase,
  },
  {
    id: "change-enablement",
    title: "Change Enablement",
    desc: "Empower your team and drive adoption across the organization.",
    icon: LuUsers,
  },
];

const RIGHT_CARDS = [
  {
    id: "ai-architecture",
    title: "AI Architecture",
    desc: "Design scalable and secure AI systems built for the future.",
    icon: LuLayers,
  },
  {
    id: "process-automation",
    title: "Process Automation",
    desc: "Automate workflows and increase efficiency with AI agents.",
    icon: LuSettings,
  },
  {
    id: "business-impact",
    title: "Business Impact",
    desc: "Drive measurable ROI and accelerate value with AI transformation.",
    icon: LuTrendingUp,
  },
];

interface OrbitCardProps {
  title: string;
  desc: string;
  icon: IconType;
  delay: number;
  alignmentClass: string;
}

const OrbitCard = ({
  title,
  desc,
  icon: Icon,
  delay,
  alignmentClass,
}: OrbitCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
    className={`p-[6px] rounded-[32px] bg-white/70 backdrop-blur-2xl border-[3px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.08),_inset_0_2px_15px_rgba(255,255,255,1)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12),_inset_0_2px_15px_rgba(255,255,255,1)] transition-all duration-300 w-[350px] group cursor-pointer relative z-40 ${alignmentClass}`}
  >
    <div className="flex items-center gap-4 bg-white/95 p-4 pr-6 rounded-[26px] shadow-sm group-hover:bg-white transition-colors border border-slate-100">
      <div className="w-14 h-14 shrink-0 rounded-full bg-[#111827] flex items-center justify-center border-[4px] border-slate-800 shadow-[0_8px_20px_rgba(17,24,39,0.4),_inset_0_2px_8px_rgba(255,255,255,0.2)] group-hover:scale-105 group-hover:border-[#D27E2B]/50 transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#D27E2B]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Icon className="w-6 h-6 text-[#FDBA74] relative z-10 drop-shadow-[0_0_10px_rgba(253,186,116,0.6)]" />
      </div>
      <div className="flex flex-col py-1">
        <h4 className="text-[16px] font-bold text-[#111827] leading-tight mb-1">
          {title}
        </h4>
        <p className="text-[13px] text-slate-500 leading-snug">{desc}</p>
      </div>
    </div>
  </motion.div>
);

export default function MaturityIndex() {
  return (
    <Section className="bg-gradient-to-b from-[#F4F7FA] to-[#EAEFF5] py-20! lg:py-28! relative overflow-hidden min-h-[1200px] flex flex-col items-center justify-start">
      <div className="text-center mb-8 lg:mb-12 max-w-4xl mx-auto flex flex-col items-center relative z-20 px-4">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-3"
        >
          <SectionBadge title="AI Maturity Index" />
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="common-h2 text-[#0F172A] whitespace-nowrap text-2xl sm:text-3xl lg:text-4xl"
        >
          Evaluating Your Organization&apos;s{" "}
          <span className="text-[#D27E2B]">AI Maturity</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-xs sm:text-sm lg:text-base text-gray-500 font-medium max-w-xl leading-relaxed"
        >
          Assess key strategic and operational pillars to accelerate your
          enterprise intelligence transformation.
        </motion.p>
      </div>
      {/* 3D SVG Background: Complex Orbits & Chrome Spheres */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <svg
          className="w-[1800px] h-[1000px] opacity-90"
          viewBox="0 0 1800 1000"
          fill="none"
        >
          <defs>
            <radialGradient id="chrome-sphere" cx="35%" cy="25%" r="75%">
              <stop stopColor="#ffffff" offset="0%" />
              <stop stopColor="#e2e8f0" offset="30%" />
              <stop stopColor="#64748b" offset="50%" />
              <stop stopColor="#0f172a" offset="80%" />
              <stop stopColor="#334155" offset="100%" />
            </radialGradient>

            <radialGradient id="gold-spark" cx="50%" cy="50%" r="50%">
              <stop stopColor="#ffffff" offset="0%" />
              <stop stopColor="#FDBA74" offset="20%" />
              <stop stopColor="#D27E2B" stopOpacity="0" offset="100%" />
            </radialGradient>

            <linearGradient
              id="orbit-orange"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop stopColor="#D27E2B" stopOpacity="0" offset="0%" />
              <stop stopColor="#FDBA74" stopOpacity="0.8" offset="50%" />
              <stop stopColor="#D27E2B" stopOpacity="0" offset="100%" />
            </linearGradient>

            <linearGradient id="orbit-grey" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop stopColor="#CBD5E1" stopOpacity="0.2" offset="0%" />
              <stop stopColor="#94A3B8" stopOpacity="0.8" offset="50%" />
              <stop stopColor="#CBD5E1" stopOpacity="0.2" offset="100%" />
            </linearGradient>
          </defs>

          {/* Overlapping Complex Orbit Lines */}
          <ellipse
            cx="900"
            cy="500"
            rx="750"
            ry="280"
            stroke="url(#orbit-grey)"
            strokeWidth="1.5"
            transform="rotate(-3, 900, 500)"
          />
          <ellipse
            cx="900"
            cy="500"
            rx="600"
            ry="200"
            stroke="url(#orbit-orange)"
            strokeWidth="2"
            transform="rotate(4, 900, 500)"
          />
          <ellipse
            cx="900"
            cy="500"
            rx="800"
            ry="320"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            strokeDasharray="8 8"
            opacity="0.7"
          />
          <ellipse
            cx="900"
            cy="500"
            rx="450"
            ry="140"
            stroke="#94A3B8"
            strokeWidth="1"
            opacity="0.4"
            transform="rotate(-6, 900, 500)"
          />

          {/* 3D Chrome Spheres */}
          <circle
            cx="220"
            cy="520"
            r="14"
            fill="url(#chrome-sphere)"
            filter="drop-shadow(0px 8px 12px rgba(0,0,0,0.25))"
          />
          <circle
            cx="1580"
            cy="460"
            r="18"
            fill="url(#chrome-sphere)"
            filter="drop-shadow(0px 8px 12px rgba(0,0,0,0.25))"
          />
          <circle
            cx="380"
            cy="740"
            r="22"
            fill="url(#chrome-sphere)"
            filter="drop-shadow(0px 10px 15px rgba(0,0,0,0.3))"
          />
          <circle
            cx="1400"
            cy="220"
            r="12"
            fill="url(#chrome-sphere)"
            filter="drop-shadow(0px 5px 8px rgba(0,0,0,0.2))"
          />
          <circle
            cx="450"
            cy="280"
            r="10"
            fill="url(#chrome-sphere)"
            filter="drop-shadow(0px 5px 8px rgba(0,0,0,0.2))"
          />

          {/* Glowing Energy Sparks */}
          <circle
            cx="380"
            cy="740"
            r="45"
            fill="url(#gold-spark)"
            opacity="0.6"
          />
          <circle
            cx="1580"
            cy="460"
            r="35"
            fill="url(#gold-spark)"
            opacity="0.5"
          />
          <circle
            cx="700"
            cy="260"
            r="30"
            fill="url(#gold-spark)"
            opacity="0.7"
          />
          <circle
            cx="1150"
            cy="760"
            r="40"
            fill="url(#gold-spark)"
            opacity="0.6"
          />
        </svg>
      </div>

      <Row className="relative z-10 w-full max-w-[1450px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-2 items-center">
          {/* Left Cards */}
          <div className="flex flex-col gap-12 lg:gap-14 items-center lg:items-end w-full relative z-40">
            {LEFT_CARDS.map((card, idx) => {
              const alignments = [
                "lg:translate-x-10",
                "lg:translate-x-24", // Middle data intelligence card pushed closer to center ring
                "lg:translate-x-10",
              ];
              return (
                <OrbitCard
                  key={card.id}
                  {...card}
                  delay={idx * 0.2}
                  alignmentClass={alignments[idx]}
                />
              );
            })}
          </div>

          {/* Center Column: Perfectly Stacked Diamond & Podium */}
          <div className="w-full max-w-[700px] mx-auto flex flex-col justify-center items-center relative min-h-[650px] z-30">
            {/* Animated Ambient Background Glow */}
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.6, 0.35] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2w-[700px] h-[700px] bg-gradient-to-r from-[#D27E2B]/30 via-[#FDBA74]/50 to-[#D27E2B]/30 blur-[100px] rounded-full pointer-events-none z-0"
            />

            {/* Floating Diamond (Positioned naturally to rest right above podium) */}
            <motion.div
              animate={{ y: [-12, 12, -12] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full flex justify-center z-30 mb-[-90px] lg:scale-110"
            >
              <img
                src="/ai-strategy/dimond.png"
                alt="AI Core Diamond Engine"
                className="w-full max-w-[600px] h-auto object-contain drop-shadow-[0_50px_100px_rgba(210,126,43,0.55)]"
              />
            </motion.div>

            {/* Podium Base (Anchored cleanly at the bottom of the container) */}
            <div className="relative z-20 flex justify-center items-center w-full max-w-[520px]">
              <div className="absolute bottom-2 w-[380px] h-[16px] rounded-[100%] bg-orange-500 blur-xl opacity-60 z-0"></div>
              <img
                src="/ai-strategy/ring.png"
                alt="Glowing Podium Base"
                className="w-full h-auto object-contain relative z-20"
              />
            </div>
          </div>

          {/* Right Cards */}
          <div className="flex flex-col gap-12 lg:gap-14 items-center lg:items-start w-full relative z-40">
            {RIGHT_CARDS.map((card, idx) => {
              const alignments = [
                "lg:-translate-x-10",
                "lg:-translate-x-24", // Middle process automation card pushed closer to center ring
                "lg:-translate-x-10",
              ];
              return (
                <OrbitCard
                  key={card.id}
                  {...card}
                  delay={idx * 0.2 + 0.3}
                  alignmentClass={alignments[idx]}
                />
              );
            })}
          </div>
        </div>
      </Row>
    </Section>
  );
}
