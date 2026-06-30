"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LuSearch, LuCompass, LuCpu, LuCode, LuRocket } from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Motion from "@/components/motionbar";
import TechBackground from "@/components/home/TechBackground";

const STEPS = [
  {
    number: "01",
    title: "Discovery & Auditing",
    description:
      "We analyze your business processes, existing infrastructure, data availability, and legacy systems to identify the highest ROI AI opportunities.",
    icon: LuSearch,
    color: "#D27E2B",
    gradient: "from-[#D27E2B] to-[#f0a050]",
  },
  {
    number: "02",
    title: "Strategy & Roadmap",
    description:
      "We design a comprehensive AI implementation roadmap, choosing optimal AI models (LLMs, SLMs) and defining architectural requirements.",
    icon: LuCompass,
    color: "#6366F1",
    gradient: "from-[#6366F1] to-[#818CF8]",
  },
  {
    number: "03",
    title: "Custom Model & Architecture",
    description:
      "Our team designs custom neural architectures, configures vector databases, maps RAG pipelines, and implements agentic frameworks.",
    icon: LuCpu,
    color: "#22C55E",
    gradient: "from-[#22C55E] to-[#4ADE80]",
  },
  {
    number: "04",
    title: "Agile Engineering & Training",
    description:
      "We develop the solution through agile sprints, training and fine-tuning models on domain-specific datasets to guarantee performance.",
    icon: LuCode,
    color: "#3B82F6",
    gradient: "from-[#3B82F6] to-[#60A5FA]",
  },
  {
    number: "05",
    title: "Deployment & Optimization",
    description:
      "We deploy production-ready AI models with enterprise-grade CI/CD pipelines, integrating continuous monitoring and automated retraining.",
    icon: LuRocket,
    color: "#EC4899",
    gradient: "from-[#EC4899] to-[#F472B6]",
  },
];

// Vertical offset pattern for arc effect (mimics the curved infographic)
const CARD_OFFSETS = [
  { translateY: "-80px" },
  { translateY: "-30px" },
  { translateY: "20px" },
  { translateY: "60px" },
  { translateY: "100px" },
];

function StepCard({
  step,
  index,
  offset,
}: {
  step: (typeof STEPS)[0];
  index: number;
  offset: { translateY: string };
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const IconComponent = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      style={{ transform: `translateY(${offset.translateY})` }}
      className="relative flex items-center gap-5 group w-full"
    >
      {/* Connector dot + line */}
      <div className="relative flex flex-col items-center shrink-0">
        {/* Connector horizontal line */}
        <div
          className="h-0.5 w-10"
          style={{
            background: `linear-gradient(to right, transparent, ${step.color}90)`,
          }}
        />
        {/* Dot */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-current"
          style={{ color: step.color, borderColor: step.color, background: "#030b1a" }}
        />
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.025, x: 6 }}
        transition={{ duration: 0.25 }}
        className="relative flex-1 rounded-[20px] border backdrop-blur-md overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.28)] transition-all duration-300"
        style={{
          borderColor: `${step.color}30`,
          background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)`,
        }}
      >
        {/* Left accent bar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-[20px] bg-gradient-to-b ${step.gradient}`}
        />

        <div className="pl-5 pr-5 py-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            {/* Icon + Title row */}
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${step.gradient}`}
              >
                <IconComponent className="w-4.5 h-4.5 text-white" />
              </div>
              <h3 className="text-base font-bold text-white leading-tight group-hover:text-[#D27E2B] transition-colors">
                {step.title}
              </h3>
            </div>
            {/* Step badge */}
            <span
              className="shrink-0 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border"
              style={{
                color: step.color,
                borderColor: `${step.color}40`,
                background: `${step.color}12`,
              }}
            >
              STEP {step.number}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed pl-12">
            {step.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function DevelopmentJourney() {
  return (
    <Section
      className="overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 15% 20%, rgba(210, 126, 43, 0.15), transparent 30%),
          radial-gradient(circle at 85% 70%, rgba(14, 165, 233, 0.12), transparent 25%),
          #030b1a
        `,
      }}
    >
      <TechBackground />
      <Row>
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-300 mb-5"
          >
            Our Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-center text-white"
          >
            Development <span className="text-[#D27E2B]">Journey</span>
          </motion.h2>
          <Motion />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg mt-4 max-w-3xl mx-auto"
          >
            A structured, proven 5-step process from idea to deployed AI product — with full transparency at every stage.
          </motion.p>
        </div>

        {/* ── Two-column arc layout ── */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0 w-full max-w-6xl mx-auto">

          {/* ── LEFT: Central hub circle ── */}
          <div className="relative flex-shrink-0 flex items-center justify-center lg:mr-[-60px] z-10">
            {/* Pulsing outer glow rings */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.12 + i * 0.06, 1], opacity: [0.15, 0.05, 0.15] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                className="absolute rounded-full border border-[#D27E2B]/20"
                style={{
                  width: `${200 + i * 48}px`,
                  height: `${200 + i * 48}px`,
                }}
              />
            ))}

            {/* Curved arc path visual */}
            <svg
              className="absolute hidden lg:block"
              style={{ left: "50%", top: "50%", transform: "translate(20%, -50%)" }}
              width="80"
              height="480"
              viewBox="0 0 80 480"
              fill="none"
            >
              <path
                d="M 10 20 Q 80 120 60 240 Q 40 360 10 460"
                stroke="url(#arcGrad)"
                strokeWidth="1.5"
                strokeDasharray="6 5"
                fill="none"
              />
              {/* Dots on the arc */}
              {[20, 116, 240, 360, 460].map((y, i) => (
                <circle
                  key={i}
                  cx={i === 0 ? 10 : i === 1 ? 66 : i === 2 ? 58 : i === 3 ? 42 : 10}
                  cy={y}
                  r="5"
                  fill={STEPS[i]?.color ?? "#D27E2B"}
                />
              ))}
              <defs>
                <linearGradient id="arcGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D27E2B" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#6366F1" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>

            {/* Main hub circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-44 h-44 md:w-52 md:h-52 rounded-full flex flex-col items-center justify-center text-center z-10 border border-[#D27E2B]/40 shadow-[0_0_60px_rgba(210,126,43,0.25)]"
              style={{
                background: "radial-gradient(circle at 40% 35%, #1e2d4a, #030b1a)",
              }}
            >
              {/* Inner ring */}
              <div className="absolute inset-3 rounded-full border border-[#D27E2B]/20" />

              <span className="text-3xl mb-2">🤖</span>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest leading-tight px-4">
                AI Product
              </p>
              <p className="text-[10px] text-[#D27E2B] font-bold uppercase tracking-widest mt-1">
                Development
              </p>
              <p className="text-[9px] text-slate-500 font-medium mt-2 px-3 leading-tight">
                5-Step Proven<br />Framework
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT: Steps arc ── */}
          <div className="relative flex flex-col gap-5 flex-1 w-full lg:pl-20">
            {STEPS.map((step, idx) => (
              <StepCard
                key={step.number}
                step={step}
                index={idx}
                offset={CARD_OFFSETS[idx]}
              />
            ))}
          </div>
        </div>
      </Row>
    </Section>
  );
}
