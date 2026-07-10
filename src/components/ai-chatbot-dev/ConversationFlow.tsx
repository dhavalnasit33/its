"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  LuUser,
  LuSparkles,
  LuDatabase,
  LuCpu,
  LuSettings,
  LuMessageSquare,
  LuUserCheck,
  LuTrendingUp,
  LuBot,
  LuShield,
  LuZap,
  LuActivity,
  LuArrowRight,
} from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";
import TechBackground from "@/components/home/TechBackground";
import SectionBadge from "../new-home-components/SectionBadge";

/* ─────────────────────────────────────────────
   DATA – unchanged from original
───────────────────────────────────────────── */

const LEFT_STEPS = [
  {
    number: "01",
    title: "User Message",
    desc: "User inputs text or voice queries via web, WhatsApp, or APIs.",
    tags: ["Web Chat", "WhatsApp", "Voice & API"],
    icon: LuUser,
    color: "#3B82F6",
    gradient: "from-[#3B82F6] to-[#60A5FA]",
  },
  {
    number: "02",
    title: "Understand Intent",
    desc: "NLU parsing determines intent, key entities, and emotional sentiment.",
    tags: ["Intent Detection", "Entity Extraction", "Sentiment"],
    icon: LuSparkles,
    color: "#6366F1",
    gradient: "from-[#6366F1] to-[#818CF8]",
  },
  {
    number: "03",
    title: "Search Knowledge",
    desc: "Vector search queries wikis and databases in milliseconds.",
    tags: ["Vector DB", "Policy Docs", "Live Data"],
    icon: LuDatabase,
    color: "#8B5CF6",
    gradient: "from-[#8B5CF6] to-[#A78BFA]",
  },
  {
    number: "04",
    title: "LLM Reasoning",
    desc: "LLMs run reasoning chains with strict guardrails.",
    tags: ["Context Chaining", "Guardrails", "Multi-Step Logic"],
    icon: LuCpu,
    color: "#EC4899",
    gradient: "from-[#EC4899] to-[#F472B6]",
  },
];

const RIGHT_STEPS = [
  {
    number: "05",
    title: "Take Action",
    desc: "Triggers API webhooks or updates CRM systems in real time.",
    tags: ["API Webhooks", "CRM Updates", "DB Operations"],
    icon: LuSettings,
    color: "#EF4444",
    gradient: "from-[#EF4444] to-[#F87171]",
  },
  {
    number: "06",
    title: "Generate Response",
    desc: "Generates brand-compliant natural language replies.",
    tags: ["Brand Voice", "Fact-Checked", "Multi-Channel"],
    icon: LuMessageSquare,
    color: "#10B981",
    gradient: "from-[#10B981] to-[#34D399]",
  },
  {
    number: "07",
    title: "Human Handoff",
    desc: "Intelligently routes complex inquiries to live agents.",
    tags: ["Smart Routing", "Live Agents", "Full Context"],
    icon: LuUserCheck,
    color: "#F59E0B",
    gradient: "from-[#F59E0B] to-[#FBBF24]",
  },
  {
    number: "08",
    title: "Learn & Improve",
    desc: "Analyzes transcripts to continuously improve templates.",
    tags: ["Feedback Loop", "Fine-Tuning", "Analytics"],
    icon: LuTrendingUp,
    color: "#14B8A6",
    gradient: "from-[#14B8A6] to-[#2DD4BF]",
  },
];

const ALL_STEPS = [...LEFT_STEPS, ...RIGHT_STEPS];

/* ─────────────────────────────────────────────
   NEURAL BACKGROUND PARTICLES
───────────────────────────────────────────── */

const PARTICLES = [
  { size: 2, top: "12%", left: "8%", delay: 0, dur: 5 },
  { size: 3, top: "28%", left: "88%", delay: 1.2, dur: 6 },
  { size: 2, top: "55%", left: "5%", delay: 0.6, dur: 7 },
  { size: 4, top: "70%", left: "92%", delay: 2.0, dur: 5 },
  { size: 2, top: "85%", left: "40%", delay: 1.5, dur: 6 },
  { size: 3, top: "10%", left: "55%", delay: 0.3, dur: 8 },
  { size: 2, top: "45%", left: "50%", delay: 2.8, dur: 5 },
  { size: 3, top: "62%", left: "20%", delay: 1.8, dur: 7 },
];

/* ─────────────────────────────────────────────
   ISOMETRIC PLATFORM CARD
───────────────────────────────────────────── */

function IsoPlatform({
  step,
  index,
}: {
  step: (typeof LEFT_STEPS)[number];
  index: number;
}) {
  const IconComponent = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group relative cursor-default"
    >
      {/* Outer glow layer */}
      <div
        className="absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-xl"
        style={{ background: `${step.color}30` }}
      />

      {/* 3-D depth bottom layer (shadow/depth illusion) */}
      <div
        className="absolute left-2 top-3 h-full w-full rounded-[20px] opacity-40"
        style={{
          background: `linear-gradient(135deg, ${step.color}20, transparent)`,
        }}
      />

      {/* Main card surface */}
      <div
        className="relative rounded-[20px] border bg-linear-to-br from-[#0d1f3a] to-[#07111e] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-400"
        style={{
          borderColor: `${step.color}55`,
          boxShadow: `0 0 0 1px ${step.color}22, 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 ${step.color}22`,
        }}
      >
        {/* Soft top edge highlight (reflection) */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[20px] opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent, ${step.color}99, transparent)`,
          }}
        />

        {/* Icon + Title header – no floating animation */}
        <div className="mb-4 flex items-center gap-3">
          <div
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${step.color}30, ${step.color}10)`,
              border: `1px solid ${step.color}55`,
              boxShadow: `0 0 20px ${step.color}40, inset 0 1px 0 ${step.color}33`,
            }}
          >
            <IconComponent className="h-6 w-6 text-white" />
            {/* Inner neon glow dot */}
            <span
              className="absolute right-1 top-1 h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ backgroundColor: step.color }}
            />
          </div>

          {/* Number badge */}
          <div className="flex flex-col">
            <span
              className="text-[10px] font-black uppercase tracking-widest"
              style={{ color: `${step.color}AA` }}
            >
              Step {step.number}
            </span>
            <h4
              className="text-[15px] font-extrabold uppercase leading-tight tracking-wide"
              style={{ color: step.color }}
            >
              {step.title}
            </h4>
          </div>
        </div>

        <p className="mb-3.5 text-base sm:text-md  font-500 leading-relaxed text-white">
          {step.desc}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {step.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-2 py-0.5 text-[10px] font-normal uppercase tracking-wide text-white/90"
              style={{
                borderColor: `${step.color}44`,
                backgroundColor: `${step.color}10`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   ZIG-ZAG ANIMATED CONNECTOR (SVG)
───────────────────────────────────────────── */

function ZigZagConnectors({ colors }: { colors: string[] }) {
  // 4 curved lines on each side connecting cards to the central hub
  const leftPaths = [
    "M 0 12 C 40 12, 60 50, 100 50",
    "M 0 37 C 45 37, 60 50, 100 50",
    "M 0 63 C 45 63, 60 50, 100 50",
    "M 0 88 C 40 88, 60 50, 100 50",
  ];
  const rightPaths = [
    "M 100 12 C 60 12, 40 50, 0 50",
    "M 100 37 C 55 37, 40 50, 0 50",
    "M 100 63 C 55 63, 40 50, 0 50",
    "M 100 88 C 60 88, 40 50, 0 50",
  ];

  return (
    <>
      {/* Left connectors */}
      <svg
        className="pointer-events-none absolute left-[32%] top-0 h-full w-[17%] opacity-70"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {colors.slice(0, 4).map((c, i) => (
            <linearGradient
              key={i}
              id={`lc-${i}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={c} stopOpacity="0.9" />
              <stop offset="100%" stopColor={c} stopOpacity="0.3" />
            </linearGradient>
          ))}
        </defs>
        {leftPaths.map((d, i) => (
          <g key={i}>
            <path
              d={d}
              stroke={`url(#lc-${i})`}
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d={d}
              stroke={colors[i]}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              fill="none"
              strokeDasharray="5 40"
              animate={{ strokeDashoffset: [0, -45] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.25,
              }}
            />
          </g>
        ))}
      </svg>

      {/* Right connectors */}
      <svg
        className="pointer-events-none absolute right-[32%] top-0 h-full w-[17%] opacity-70"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {colors.slice(4).map((c, i) => (
            <linearGradient
              key={i}
              id={`rc-${i}`}
              x1="100%"
              y1="0%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor={c} stopOpacity="0.9" />
              <stop offset="100%" stopColor={c} stopOpacity="0.3" />
            </linearGradient>
          ))}
        </defs>
        {rightPaths.map((d, i) => (
          <g key={i}>
            <path
              d={d}
              stroke={`url(#rc-${i})`}
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d={d}
              stroke={colors[i + 4]}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              fill="none"
              strokeDasharray="5 40"
              animate={{ strokeDashoffset: [0, 45] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.25,
              }}
            />
          </g>
        ))}
      </svg>
    </>
  );
}

/* ─────────────────────────────────────────────
   CENTRAL AI ENGINE HUB
───────────────────────────────────────────── */

function AIEngineHub({ allColors }: { allColors: string[] }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Ambient glow */}
      <div className="absolute h-64 w-64 rounded-full bg-[#D27E2B]/15 blur-[80px]" />

      {/* Rotating ring layers */}
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: 7 + i * 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute rounded-full"
          style={{
            width: `${140 + i * 50}px`,
            height: `${140 + i * 50}px`,
            border: `1px ${i % 2 === 0 ? "dashed" : "solid"} rgba(210,126,43,${0.25 - i * 0.04})`,
            boxShadow: i === 1 ? "0 0 30px rgba(210,126,43,0.15)" : "none",
          }}
        />
      ))}

      {/* Hub card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 flex h-48 w-48 flex-col items-center justify-center rounded-[28px] text-center shadow-[0_0_80px_rgba(210,126,43,0.3)]"
        style={{
          background: "radial-gradient(circle at 35% 30%, #1c2d4a, #070f1c)",
          border: "1.5px solid rgba(210,126,43,0.55)",
          boxShadow:
            "0 0 0 1px rgba(210,126,43,0.25), 0 0 80px rgba(210,126,43,0.25), inset 0 1px 0 rgba(210,126,43,0.3)",
        }}
      >
        {/* Top highlight reflection */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[28px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(210,126,43,0.8), transparent)",
          }}
        />

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <LuBot className="mb-2 h-10 w-10 text-[#D27E2B]" />
        </motion.div>

        <p className="text-[13px] font-extrabold uppercase leading-none tracking-widest text-white">
          AI Engine
        </p>
        <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-[#D27E2B]">
          Orchestrator
        </p>

        {/* Color dots */}
        <div className="mt-3 flex flex-wrap justify-center gap-1">
          {allColors.map((c, i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.18 }}
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE CARD (unchanged responsive behavior)
───────────────────────────────────────────── */

const OCTAGON_CLIP =
  "polygon(29% 0%, 71% 0%, 100% 29%, 100% 71%, 71% 100%, 29% 100%, 0% 71%, 0% 29%)";

function MobileFlowCard({
  step,
  index,
}: {
  step: (typeof LEFT_STEPS)[number];
  index: number;
}) {
  const IconComponent = step.icon;

  return (
    <div className="relative mb-8 flex w-full items-start pl-16 last:mb-0 md:pl-20">
      {/* Icon node on timeline line */}
      <div
        className="absolute left-0 top-1.5 z-10 p-[2.5px] shadow-lg md:left-[8px]"
        style={{
          clipPath: OCTAGON_CLIP,
          background: `linear-gradient(135deg, ${step.color}, rgba(255,255,255,0.7))`,
          width: 44,
          height: 44,
        }}
      >
        <div
          className="flex h-full w-full items-center justify-center bg-slate-900"
          style={{ clipPath: OCTAGON_CLIP }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className={`flex h-full w-full items-center justify-center bg-linear-to-br ${step.gradient} opacity-90`}
            style={{ clipPath: OCTAGON_CLIP }}
          >
            <IconComponent className="h-4.5 w-4.5 text-white" />
          </motion.div>
        </div>
      </div>

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        whileHover={{
          y: -2,
          borderColor: step.color,
          boxShadow: `0 18px 40px ${step.color}40, 0 0 0 1px ${step.color}55`,
        }}
        className="w-full rounded-[20px] border-2 bg-[#0d1f3a]/80 p-5 shadow-md backdrop-blur-sm transition-all duration-300"
        style={{ borderColor: `${step.color}88` }}
      >
        <div className="mb-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <h3
            className="text-base font-extrabold uppercase tracking-wide sm:text-[17px]"
            style={{ color: step.color }}
          >
            {step.title}
          </h3>
          <span className="self-start rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-300">
            Step {step.number}
          </span>
        </div>
        <p className="mb-3 text-base sm:text-md  font-medium leading-relaxed text-white">
          {step.desc}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {step.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
              style={{
                borderColor: `${step.color}55`,
                backgroundColor: `${step.color}14`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */

export default function ConversationFlow() {
  const allColors = ALL_STEPS.map((s) => s.color);
  const leftColors = LEFT_STEPS.map((s) => s.color);
  const rightColors = RIGHT_STEPS.map((s) => s.color);

  return (
    <Section
      className="relative overflow-hidden py-24!"
      style={{
        background: `
          radial-gradient(circle at 15% 20%, rgba(210, 126, 43, 0.15), transparent 30%),
          radial-gradient(circle at 85% 70%, rgba(14, 165, 233, 0.12), transparent 25%),
          #030b1a
        `,
      }}
    >
      <TechBackground />

      {/* Neural-network floating particles */}
      {PARTICLES.map((p, idx) => (
        <motion.div
          key={idx}
          animate={{ y: [0, -18, 0], opacity: [0.25, 0.6, 0.25] }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
          className="pointer-events-none absolute rounded-full bg-[#D27E2B] blur-[1.5px]"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: p.top,
            left: p.left,
          }}
        />
      ))}

      <Row>
        {/* ── HEADER ── */}
        <div className="relative z-10 mx-auto mb-12 max-w-3xl text-center lg:mb-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <SectionBadge title=" Workflow Architecture" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-center text-white"
          >
            How Our <span className="text-[#D27E2B]">AI Chatbots</span> Work
          </motion.h2>

          <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-[#D27E2B]" />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-base font-medium text-slate-100"
          >
            A smart 8-step process that turns conversations into meaningful
            actions
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-300 sm:text-xs"
          >
            <span className="text-[#3B82F6]">Steps 01–04 Understand</span>
            <LuArrowRight className="h-3.5 w-3.5 text-slate-500" />
            <span className="text-[#D27E2B]">AI Engine Decides</span>
            <LuArrowRight className="h-3.5 w-3.5 text-slate-500" />
            <span className="text-[#10B981]">Steps 05–08 Respond</span>
          </motion.div>
        </div>

        {/* ── DESKTOP ISOMETRIC VIEW ── */}
        <div className="relative mx-auto hidden w-full  items-center justify-between gap-6 py-8 lg:flex">
          {/* Animated zig-zag connector SVGs */}
          <ZigZagConnectors colors={allColors} />

          {/* LEFT PLATFORMS: Steps 1–4 */}
          <div className="relative z-10 flex w-[30%] flex-col gap-6">
            {LEFT_STEPS.map((step, idx) => (
              <IsoPlatform key={step.number} step={step} index={idx} />
            ))}
          </div>

          {/* CENTER: AI Engine Hub */}
          <div className="relative z-10 flex w-[28%] shrink-0 items-center justify-center">
            <AIEngineHub allColors={allColors} />
          </div>

          {/* RIGHT PLATFORMS: Steps 5–8 */}
          <div className="relative z-10 flex w-[30%] flex-col gap-6">
            {RIGHT_STEPS.map((step, idx) => (
              <IsoPlatform key={step.number} step={step} index={idx + 4} />
            ))}
          </div>
        </div>

        {/* ── MOBILE / TABLET TIMELINE ── */}
        <div className="relative mx-auto mt-8 block w-full max-w-2xl px-4 lg:hidden">
          <div className="absolute z-0 bottom-4 left-[38px] top-4 w-0.5 bg-linear-to-b from-[#3B82F6] via-[#EC4899] to-[#14B8A6]/30 md:left-[46px]" />
          <div className="flex flex-col">
            {ALL_STEPS.map((step, idx) => (
              <MobileFlowCard key={step.number} step={step} index={idx} />
            ))}
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 mx-auto mt-20 grid w-full max-w-4xl grid-cols-2 gap-4 px-4 md:grid-cols-4"
        >
          {[
            {
              label: "Avg. Execution",
              val: "< 85ms",
              desc: "NLU + LLM Latency",
              icon: LuZap,
            },
            {
              label: "Resolution rate",
              val: "94.2%",
              desc: "Autonomous matches",
              icon: LuActivity,
            },
            {
              label: "Integration coverage",
              val: "50+ Tools",
              desc: "CRMs, Databases & APIs",
              icon: LuCpu,
            },
            {
              label: "System Security",
              val: "Enterprise SOC2",
              desc: "Data encryption & Guardrails",
              icon: LuShield,
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{
                  y: -3,
                  borderColor: "#D27E2B",
                  boxShadow: "0 18px 40px rgba(210,126,43,0.25)",
                }}
                className="rounded-[20px] border border-white/10 bg-white/4 p-5 shadow-sm backdrop-blur-md transition-all duration-300"
              >
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D27E2B]/10 text-[#D27E2B] transition-all duration-300">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </span>
                </div>
                <div className="text-xl font-black text-white sm:text-2xl">
                  {stat.val}
                </div>
                <p className="mt-1 text-[10px] font-semibold text-slate-200 sm:text-[11px]">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Row>
    </Section>
  );
}
