"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LuCircleDollarSign,
  LuClock,
  LuSettings,
  LuDatabase,
  LuTrendingDown,
  LuTarget,
  LuHeadphones,
  LuZap,
  LuTrendingUp,
  LuLink,
  LuDollarSign,
  LuUsers,
  LuBadgeDollarSign,
  LuClock4,
  LuStar,
  LuShieldCheck,
  LuRocket,
  LuSparkles,
} from "react-icons/lu";
import Section from "@/components/Section";
import Row from "@/components/Row";

// --- Data ---
const CHALLENGES = [
  {
    title: "High Operational Costs",
    description: "Rising costs due to inefficient processes and manual work.",
    icon: LuCircleDollarSign,
  },
  {
    title: "Slow Customer Support",
    description: "Delayed responses and low customer satisfaction.",
    icon: LuClock,
  },
  {
    title: "Manual & Repetitive Tasks",
    description: "Time-consuming tasks reduce productivity and efficiency.",
    icon: LuSettings,
  },
  {
    title: "Fragmented Systems",
    description: "Disconnected tools and data silos create inconsistencies.",
    icon: LuDatabase,
  },
  {
    title: "Data Overload",
    description: "Too much data, but no clear insights or visibility.",
    icon: LuTrendingDown,
  },
  {
    title: "Limited Business Insights",
    description: "Lack of actionable insights leads to slow and risky decisions.",
    icon: LuTarget,
  },
];

const OUTCOMES = [
  {
    title: "24/7 Intelligent Support",
    description: "AI chatbots provide instant, accurate support round the clock.",
    icon: LuHeadphones,
  },
  {
    title: "Automated Workflows",
    description: "Streamline operations and eliminate repetitive tasks.",
    icon: LuZap,
  },
  {
    title: "Real-Time Analytics",
    description: "Get instant insights and make data-driven decisions.",
    icon: LuTrendingUp,
  },
  {
    title: "Unified & Integrated Systems",
    description: "Connect tools and data for seamless business operations.",
    icon: LuLink,
  },
  {
    title: "Reduced Operational Costs",
    description: "Optimize resources and significantly lower operating expenses.",
    icon: LuDollarSign,
  },
  {
    title: "Better Customer Experience",
    description: "Faster responses, personalization and higher customer satisfaction.",
    icon: LuUsers,
  },
];

const STATS = [
  { value: "60%+", label: "Cost Reduction", sub: "Average for our clients", icon: LuBadgeDollarSign },
  { value: "80%+", label: "Process Automation", sub: "Improvement in efficiency", icon: LuClock4 },
  { value: "90%+", label: "Faster Decisions", sub: "With real-time insights", icon: LuTrendingUp },
  { value: "98%", label: "Customer Satisfaction", sub: "Consistently achieved", icon: LuStar },
  { value: "100%", label: "Enterprise Security", sub: "And data protection", icon: LuShieldCheck },
  { value: "3x", label: "Business Growth", sub: "Average revenue impact", icon: LuRocket },
];

export default function BusinessChallengesOutcomes() {
  return (
    <Section className="relative bg-white py-24 overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-b from-orange-50/70 via-white to-white blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-red-50/60 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-emerald-50/60 blur-3xl" />
      </div>

      <Row>
        <div className="flex flex-col items-center relative z-10">
          {/* Header */}
          <div className="text-center max-w-4xl mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 px-4 py-1.5 rounded-full text-[#D27E2B] text-xs font-bold uppercase tracking-widest mb-5"
            >
              <LuSparkles className="w-3.5 h-3.5" />
              AI-Powered Transformation
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-5 tracking-tight"
            >
              We Turn Business Challenges <br className="hidden md:block" />
              Into <span className="text-[#D27E2B]">AI-Powered Outcomes</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-500 font-medium"
            >
              We combine AI, automation, and human expertise to solve complex problems, <br className="hidden md:block" />
              improve efficiency, and deliver measurable business impact.
            </motion.p>
          </div>

          {/* DESKTOP LAYOUT: Row-based mapping with Animated Connection Lines */}
          <div className="hidden xl:flex flex-col gap-4 w-full  mx-auto mb-20">
            {/* Headers */}
            <div className="flex items-center justify-between w-full px-4 mb-2">
              <div className="w-[420px] flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <h3 className="text-[11px] font-extrabold text-red-500 tracking-widest uppercase">
                  Business Challenges
                </h3>
              </div>
              <div className="flex-1" />
              <div className="w-[420px] flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-[11px] font-extrabold text-emerald-600 tracking-widest uppercase">
                  AI-Powered Outcomes
                </h3>
              </div>
            </div>

            {/* Row Mapping */}
            {CHALLENGES.map((challenge, idx) => {
              const outcome = OUTCOMES[idx];
              return (
                <div key={idx} className="flex flex-row items-center justify-center gap-4 w-full">
                  {/* Left: Challenge */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.05 + idx * 0.07 }}
                    className="w-[450px] shrink-0 group flex items-center gap-3.5 p-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(239,68,68,0.10)] hover:border-red-200 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-red-100 transition-all duration-300">
                      <challenge.icon className="w-[18px] h-[18px] text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] font-bold text-slate-900 leading-tight group-hover:text-red-600 transition-colors">
                        {challenge.title}
                      </h4>
                      <p className="text-[12px] text-slate-400 leading-snug mt-0.5">
                        {challenge.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Middle: Animated Line */}
                  <div className="flex-1 flex items-center justify-center px-2 opacity-50 hover:opacity-100 transition-opacity duration-300">
                    <svg width="70%" height="24" className="overflow-visible">
                      <defs>
                        <marker id={`dot-${idx}`} markerWidth="8" markerHeight="8" refX="4" refY="4">
                          <circle cx="4" cy="4" r="2.5" fill="#fdba74" />
                        </marker>
                        <marker id={`arrow-${idx}`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                          <polygon points="0 0, 8 4, 0 8" fill="#fdba74" />
                        </marker>
                      </defs>
                      <motion.line
                        x1="8"
                        y1="12"
                        x2="100%"
                        y2="12"
                        stroke="#fdba74" // Light orange stroke
                        strokeWidth="1.5"
                        strokeDasharray="5 5"
                        markerStart={`url(#dot-${idx})`}
                        markerEnd={`url(#arrow-${idx})`}
                        initial={{ strokeDashoffset: 10 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                    </svg>
                  </div>

                  {/* Right: Outcome */}
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.05 + idx * 0.07 }}
                    className="w-[450px] shrink-0 group flex items-center gap-3.5 p-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(34,197,94,0.10)] hover:border-emerald-200 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300">
                      <outcome.icon className="w-[18px] h-[18px] text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
                        {outcome.title}
                      </h4>
                      <p className="text-[12px] text-slate-400 leading-snug mt-0.5">
                        {outcome.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* MOBILE/TABLET LAYOUT: Original Column Stacking (Hidden on Desktop) */}
          <div className="xl:hidden relative w-full flex flex-col md:flex-row items-center md:items-stretch justify-center gap-10 mb-20">
            {/* LEFT: Challenges */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-3 w-full md:w-[420px]"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <h3 className="text-[11px] font-extrabold text-red-500 tracking-widest uppercase">
                  Business Challenges
                </h3>
              </div>
              {CHALLENGES.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 + idx * 0.07 }}
                  className="group flex items-center gap-3.5 p-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(239,68,68,0.10)] hover:border-red-200 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-red-100 transition-all duration-300">
                    <item.icon className="w-[18px] h-[18px] text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-slate-900 leading-tight group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[12px] text-slate-400 leading-snug mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* RIGHT: Outcomes */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-3 w-full md:w-[420px]"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-[11px] font-extrabold text-emerald-600 tracking-widest uppercase">
                  AI-Powered Outcomes
                </h3>
              </div>
              {OUTCOMES.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 + idx * 0.07 }}
                  className="group flex items-center gap-3.5 p-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(34,197,94,0.10)] hover:border-emerald-200 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300">
                    <item.icon className="w-[18px] h-[18px] text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[12px] text-slate-400 leading-snug mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 bg-gradient-to-br from-slate-50 via-white to-white border border-slate-100 p-6 md:p-8 rounded-[28px] shadow-[0_8px_40px_rgba(15,23,42,0.04)]"
          >
            {STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-2 group cursor-default">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D27E2B] group-hover:scale-110 group-hover:bg-[#D27E2B] group-hover:text-white group-hover:shadow-[0_4px_16px_rgba(210,126,43,0.3)] transition-all duration-300">
                  <stat.icon className="w-5 h-5" />
                </div>
                <h4 className="text-2xl font-black text-slate-900 leading-none group-hover:text-[#D27E2B] transition-colors">
                  {stat.value}
                </h4>
                <div>
                  <p className="text-[13px] font-bold text-slate-800 leading-tight">{stat.label}</p>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">{stat.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </Row>
    </Section>
  );
}