"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LuBot,
  LuHeart,
  LuClock,
  LuCoins,
  LuTerminal,
  LuActivity,
  LuSparkles,
  LuTrendingUp,
  LuHeadphones,
  LuMessageSquare,
  LuUserCheck,
  LuUserX,
  LuArrowUpRight,
  LuSmile,
} from "react-icons/lu";
import Image from "next/image";
import SectionBadge from "../new-home-components/SectionBadge";

// Bento Card Component with luxury border glow, glassmorphism, and 3D hover pop
const BentoCard = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    whileHover={{
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" },
    }}
    className={`group relative overflow-hidden rounded-[32px] bg-white/80 backdrop-blur-xl border border-slate-100 shadow-[0_16px_48px_rgba(210,126,43,0.03)] hover:shadow-[0_24px_64px_rgba(210,126,43,0.08)] hover:border-[#D27E2B]/35 transition-all duration-500 ${className}`}
  >
    {/* Subtle inner top highlight */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
    {/* Hover Glow Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#D27E2B]/[0.015] to-[#F59E0B]/[0.015] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative h-full w-full p-8 z-10 flex flex-col justify-between">
      {children}
    </div>
  </motion.div>
);

export default function SuccessMetrics() {
  const [activeDay, setActiveDay] = useState<number | null>(3); // Default Thu active

  const totalConvs = 12543;
  const resolvedAI = 9856;
  const escalatedHuman = 2687;

  // Bottom Main Chart Days - scaled to fit perfectly inside viewBox="0 0 500 170" without clipping
  const chartDays = [
    { name: "Mon", convs: 1300, y: 130 },
    { name: "Tue", convs: 1750, y: 95 },
    { name: "Wed", convs: 1600, y: 110 },
    { name: "Thu", convs: 2145, y: 60 }, // Active point
    { name: "Fri", convs: 1850, y: 85 },
    { name: "Sat", convs: 1400, y: 120 },
    { name: "Sun", convs: 1950, y: 75 },
  ];

  // Dynamic smooth Bezier curve calculation to match the nodes exactly
  const generateBezierCurve = () => {
    return chartDays.reduce((acc, point, idx) => {
      const cx = 40 + idx * 70;
      const cy = point.y;
      if (idx === 0) return `M ${cx} ${cy}`;

      // Control points for smooth bezier interpolation
      const prevX = 40 + (idx - 1) * 70;
      const prevY = chartDays[idx - 1].y;
      const cpX1 = prevX + 25;
      const cpY1 = prevY;
      const cpX2 = cx - 25;
      const cpY2 = cy;

      return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${cx} ${cy}`;
    }, "");
  };

  const linePath = generateBezierCurve();
  const fillPath = `${linePath} L 460 160 L 40 160 Z`;

  return (
    <section className="bg-[#FAFBFF] border-y border-slate-100/50 py-24 lg:py-32 select-none relative overflow-hidden">
      {/* ── AMBIENT SAAS BACKGROUND SYSTEM ── */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(210,126,43,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(210,126,43,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-[10%] left-[-15%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#D27E2B]/8 to-transparent blur-[135px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#F59E0B]/8 to-transparent blur-[135px] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* ── SECTION HEADER ── */}

        <div className="text-center mb-12 max-w-3xl mx-auto flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <SectionBadge title="Global Impact" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-[#0F172A]"
          >
            Empowering Businesses{" "}
            <span className="text-[#D27E2B]">Worldwide</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-gray-500 font-medium max-w-xl leading-relaxed"
          >
            Delivering autonomous scale and unparalleled user experiences across
            the globe.
          </motion.p>
        </div>

        {/* ── ASYMMETRICAL LUXURY BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          {/* ROW 1: Active Chatbots (8 Cols) + Customer Satisfaction (4 Cols) */}

          {/* Active Chatbots Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.01 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8 md:col-span-12 bg-white/80 backdrop-blur-xl rounded-[32px] border border-slate-100 shadow-[0_16px_48px_rgba(210,126,43,0.03)] hover:shadow-[0_24px_64px_rgba(210,126,43,0.08)] hover:border-[#D27E2B]/35 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-[#D27E2B]/8 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#D27E2B]/[0.015] to-[#F59E0B]/[0.015] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full w-full p-8 lg:p-12 z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-8 flex-1 w-full">
                {/* 3D Robot Image Container with continuous float */}
                <div className="relative shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-[24px] bg-gradient-to-br from-[#D27E2B]/15 to-[#F59E0B]/5 border border-[#D27E2B]/20 flex items-center justify-center shadow-lg group-hover:shadow-[0_20px_40px_rgba(210,126,43,0.15)] transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-[#D27E2B]/20 blur-md rounded-full pointer-events-none" />
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative z-10 w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src="/ai-strategy/sucess.png"
                      alt="Active Chatbots"
                      width={100}
                      height={100}
                      priority
                      className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.2)]"
                    />
                  </motion.div>
                </div>

                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#D27E2B] mb-1.5">
                    Active Chatbots
                  </p>
                  <h3 className="text-5xl lg:text-6xl font-black text-[#111827] tracking-tight leading-none">
                    500+
                  </h3>
                  <p className="text-sm font-semibold text-slate-500 mt-3 max-w-sm">
                    Intelligent conversational AI agents successfully deployed
                    across enterprise channels.
                  </p>
                </div>
              </div>

              {/* Featured Sparkline Visual with drawing animation */}
              <div className="w-full md:w-52 bg-[#FAFBFF] rounded-[24px] border border-slate-100 p-5 flex flex-col justify-between shrink-0 relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                    Efficiency
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-[#00C897] bg-[#00C897]/5 px-2.5 py-0.5 rounded-full border border-[#00C897]/10">
                    <LuArrowUpRight className="w-3.5 h-3.5" /> +32% Growth
                  </span>
                </div>
                <div className="h-16 w-full pt-1">
                  <svg
                    className="w-full h-full overflow-visible"
                    viewBox="0 0 120 40"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        delay: 0.2,
                      }}
                      d="M 0 32 Q 20 12 40 22 T 80 8 T 120 4"
                      fill="none"
                      stroke="#D27E2B"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="text-[10px] font-bold text-slate-400 mt-2 text-center block">
                  Quarterly scale optimization
                </span>
              </div>
            </div>
          </motion.div>

          {/* Customer Satisfaction Card */}
          <BentoCard className="lg:col-span-4 md:col-span-12" delay={0.1}>
            <div className="flex justify-between items-start mb-6">
              <motion.div
                whileHover={{ rotate: 15 }}
                className="w-14 h-14 rounded-2xl bg-[#00C897]/5 border border-[#00C897]/10 text-[#00C897] flex items-center justify-center shadow-sm group-hover:scale-110 transition-all duration-300"
              >
                <LuSmile className="w-7 h-7" />
              </motion.div>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-[#00C897] bg-[#00C897]/5 px-2.5 py-0.5 rounded-full border border-[#00C897]/10">
                CSAT Score
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-1 mb-2">
                <h3 className="text-4xl font-black text-[#111827] tracking-tight leading-none">
                  98%
                </h3>
                <span className="text-sm font-bold text-[#00C897] ml-1">
                  +18%
                </span>
              </div>
              <h4 className="text-[15px] font-extrabold text-slate-800 mb-1.5">
                Customer Satisfaction
              </h4>
              <p className="text-xs text-slate-400 font-semibold leading-relaxed mb-6">
                Empower user engagement with accurate responses, lowering
                support escalations.
              </p>
            </div>

            {/* Sparkline curve with drawing animation */}
            <div className="h-12 w-full pt-1 pb-1">
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 200 40"
                preserveAspectRatio="none"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                  d="M 0 30 Q 25 10 50 25 T 100 12 T 150 20 T 200 6"
                  fill="none"
                  stroke="#00C897"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </BentoCard>

          {/* ROW 2: Four Compact Cards (3 Cols Each) */}

          {/* Card 1: Response Time */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, scale: 1.03 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 md:col-span-6 bg-white/85 backdrop-blur-xl rounded-[28px] border border-slate-100 p-6.5 shadow-[0_8px_32px_rgba(210,126,43,0.02)] hover:shadow-[0_16px_48px_rgba(210,126,43,0.06)] hover:border-[#D27E2B]/20 transition-all duration-300 group flex items-start gap-4"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-11 h-11 rounded-xl bg-[#00D4FF]/5 text-[#00D4FF] border border-[#00D4FF]/10 flex items-center justify-center shrink-0"
            >
              <LuClock className="w-5.5 h-5.5" />
            </motion.div>
            <div>
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">
                Latency
              </span>
              <div className="text-2xl font-black text-[#111827] tracking-tight leading-none mb-1">
                &lt; 2s
              </div>
              <h5 className="text-[13px] font-extrabold text-slate-800 mb-1">
                Response Time
              </h5>
              <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                Instant real-time answers.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Support Availability */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, scale: 1.03 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="lg:col-span-3 md:col-span-6 bg-white/85 backdrop-blur-xl rounded-[28px] border border-slate-100 p-6.5 shadow-[0_8px_32px_rgba(210,126,43,0.02)] hover:shadow-[0_16px_48px_rgba(210,126,43,0.06)] hover:border-[#D27E2B]/20 transition-all duration-300 group flex items-start gap-4"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="w-11 h-11 rounded-xl bg-[#F59E0B]/5 text-[#F59E0B] border border-[#F59E0B]/10 flex items-center justify-center shrink-0"
            >
              <LuHeadphones className="w-5.5 h-5.5" />
            </motion.div>
            <div>
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">
                SLA
              </span>
              <div className="text-2xl font-black text-[#111827] tracking-tight leading-none mb-1">
                100%
              </div>
              <h5 className="text-[13px] font-extrabold text-slate-800 mb-1">
                Availability
              </h5>
              <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                Constant client connection.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Messages Processed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, scale: 1.03 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 md:col-span-6 bg-white/85 backdrop-blur-xl rounded-[28px] border border-slate-100 p-6.5 shadow-[0_8px_32px_rgba(210,126,43,0.02)] hover:shadow-[0_16px_48px_rgba(210,126,43,0.06)] hover:border-[#D27E2B]/20 transition-all duration-300 group flex items-start gap-4"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.0 }}
              className="w-11 h-11 rounded-xl bg-[#4FD1FF]/5 text-[#4FD1FF] border border-[#4FD1FF]/10 flex items-center justify-center shrink-0"
            >
              <LuBot className="w-5.5 h-5.5" />
            </motion.div>
            <div>
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">
                Volume
              </span>
              <div className="text-2xl font-black text-[#111827] tracking-tight leading-none mb-1">
                50M+
              </div>
              <h5 className="text-[13px] font-extrabold text-slate-800 mb-1">
                Messages
              </h5>
              <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                Processed every month.
              </p>
            </div>
          </motion.div>

          {/* Card 4: AI Engineers */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, scale: 1.03 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3 md:col-span-6 bg-white/85 backdrop-blur-xl rounded-[28px] border border-slate-100 p-6.5 shadow-[0_8px_32px_rgba(210,126,43,0.02)] hover:shadow-[0_16px_48px_rgba(210,126,43,0.06)] hover:border-[#D27E2B]/20 transition-all duration-300 group flex items-start gap-4"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="w-11 h-11 rounded-xl bg-[#D27E2B]/5 text-[#D27E2B] border border-[#D27E2B]/10 flex items-center justify-center shrink-0"
            >
              <LuTerminal className="w-5.5 h-5.5" />
            </motion.div>
            <div>
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">
                Team
              </span>
              <div className="text-2xl font-black text-[#111827] tracking-tight leading-none mb-1">
                40+
              </div>
              <h5 className="text-[13px] font-extrabold text-slate-800 mb-1">
                AI Engineers
              </h5>
              <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                Driving model innovation.
              </p>
            </div>
          </motion.div>

          {/* ROW 3: Interactive Analytics (8 Cols) + Overhead Cost Reduction (4 Cols) */}

          {/* Large Interactive Wave Chart Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.01 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8 md:col-span-12 bg-white/80 backdrop-blur-xl rounded-[32px] border border-slate-100 shadow-[0_16px_48px_rgba(210,126,43,0.03)] hover:shadow-[0_24px_64px_rgba(210,126,43,0.08)] p-6 lg:p-8 flex flex-col sm:flex-row gap-6 relative overflow-hidden transition-all duration-500"
          >
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-[15px] font-extrabold text-[#111827]">
                    AI Performance Overview
                  </h3>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                    Real-time performance analytics and insights
                  </p>
                </div>
              </div>

              {/* Main Wave SVG Chart - Using dynamicBezier and motion.path for drawing effect */}
              <div className="h-48 w-full relative pt-2">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 500 170"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="mainChartOrange"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#D27E2B"
                        stopOpacity="0.25"
                      />
                      <stop offset="100%" stopColor="#D27E2B" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <line
                      key={idx}
                      x1="0"
                      y1={32 * idx}
                      x2="500"
                      y2={32 * idx}
                      stroke="#f8fafc"
                      strokeWidth="1.5"
                    />
                  ))}

                  {/* Vertical active line */}
                  {activeDay !== null && (
                    <motion.line
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      x1={40 + activeDay * 70}
                      y1="10"
                      x2={40 + activeDay * 70}
                      y2="150"
                      stroke="#D27E2B"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                  )}

                  {/* Wave Fill - Fades in after line draws */}
                  <motion.path
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1 }}
                    d={fillPath}
                    fill="url(#mainChartOrange)"
                  />

                  {/* Line - Smoothly draws in */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                    d={linePath}
                    fill="none"
                    stroke="#D27E2B"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Nodes */}
                  {chartDays.map((day, idx) => {
                    const cx = 40 + idx * 70;
                    const cy = day.y;
                    const isActive = idx === activeDay;
                    return (
                      <g
                        key={day.name}
                        className="cursor-pointer"
                        onClick={() => setActiveDay(idx)}
                      >
                        <motion.circle
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.5 + idx * 0.1,
                            type: "spring",
                          }}
                          whileHover={{ scale: 1.5 }}
                          cx={cx}
                          cy={cy}
                          r={isActive ? 6.5 : 4.5}
                          fill="#D27E2B"
                          stroke="#ffffff"
                          strokeWidth={isActive ? 3 : 2}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Tooltip Overlay */}
                {activeDay !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bg-slate-900/95 text-white rounded-lg shadow-md p-2.5 text-[10px] font-bold z-10 pointer-events-none"
                    style={{
                      left: `${8 + activeDay * 12.2}%`,
                      top: `${chartDays[activeDay].y - 58}px`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="text-[#D27E2B] font-extrabold uppercase tracking-wider mb-0.5">
                      High Performance
                    </div>
                    <div>
                      {chartDays[activeDay].convs.toLocaleString()}{" "}
                      conversations
                    </div>
                  </motion.div>
                )}
              </div>

              {/* X Axis */}
              <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 px-6">
                {chartDays.map((day, idx) => (
                  <span
                    key={day.name}
                    className={`cursor-pointer transition-colors duration-200 ${idx === activeDay ? "text-[#D27E2B] font-extrabold" : ""}`}
                    onClick={() => setActiveDay(idx)}
                  >
                    {day.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Side summary block */}
            <div className="w-full sm:w-56 bg-slate-50/50 rounded-2xl border border-slate-100/80 p-4 flex flex-col justify-between shrink-0 gap-3.5">
              {[
                {
                  label: "Total Conversations",
                  val: totalConvs.toLocaleString(),
                  change: "+28%",
                  icon: LuMessageSquare,
                  color: "#D27E2B",
                  light: "#FFF9F2",
                },
                {
                  label: "Resolved by AI",
                  val: resolvedAI.toLocaleString(),
                  change: "+35%",
                  icon: LuUserCheck,
                  color: "#00C897",
                  light: "#ECFDF5",
                },
                {
                  label: "Escalated to Human",
                  val: escalatedHuman.toLocaleString(),
                  change: "-10%",
                  icon: LuUserX,
                  color: "#EF4444",
                  light: "#FEF2F2",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.15 }}
                    key={item.label}
                    className="flex items-center justify-between border-b border-slate-100 last:border-0 pb-3 last:pb-0"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                        style={{
                          borderColor: `${item.color}15`,
                          color: item.color,
                          backgroundColor: item.light,
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block leading-none">
                          {item.label}
                        </span>
                        <span className="text-[13px] font-black text-slate-800 mt-0.5 block leading-none">
                          {item.val}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Overhead Cost Reduction (4 Cols) */}
          <BentoCard className="lg:col-span-4 md:col-span-12" delay={0.1}>
            <div className="flex justify-between items-start mb-6">
              <motion.div
                whileHover={{ rotate: 15 }}
                className="w-14 h-14 rounded-2xl bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center shadow-sm group-hover:scale-110 transition-all duration-300"
              >
                <LuCoins className="w-7 h-7" />
              </motion.div>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-[#8B5CF6] bg-[#8B5CF6]/5 px-2.5 py-0.5 rounded-full border border-[#8B5CF6]/10">
                Cost Saved
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-1 mb-2">
                <h3 className="text-4xl font-black text-[#111827] tracking-tight leading-none">
                  70%
                </h3>
                <span className="text-sm font-bold text-[#8B5CF6] ml-1">
                  +25%
                </span>
              </div>
              <h4 className="text-[15px] font-extrabold text-slate-800 mb-1.5">
                Overhead Cost Reduction
              </h4>
              <p className="text-xs text-slate-400 font-semibold leading-relaxed mb-6">
                Cut operational costs by scaling conversations through smart
                automation workflows.
              </p>
            </div>

            {/* Sparkline curve with drawing animation */}
            <div className="h-12 w-full pt-1 pb-1">
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 200 40"
                preserveAspectRatio="none"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                  d="M 0 30 Q 25 30 50 18 T 100 13 T 150 6 T 200 6"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
