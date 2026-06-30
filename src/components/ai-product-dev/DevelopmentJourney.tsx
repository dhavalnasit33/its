"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
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
    translateX: "16px",
    connectorWidth: 273,
  },
  {
    number: "02",
    title: "Strategy & Roadmap",
    description:
      "We design a comprehensive AI implementation roadmap, choosing optimal AI models (LLMs, SLMs) and defining architectural requirements.",
    icon: LuCompass,
    color: "#6366F1",
    gradient: "from-[#6366F1] to-[#818CF8]",
    translateX: "60px",
    connectorWidth: 198,
  },
  {
    number: "03",
    title: "Custom Model & Architecture",
    description:
      "Our team designs custom neural architectures, configures vector databases, maps RAG pipelines, and implements agentic frameworks.",
    icon: LuCpu,
    color: "#22C55E",
    gradient: "from-[#22C55E] to-[#4ADE80]",
    translateX: "72px",
    connectorWidth: 182,
  },
  {
    number: "04",
    title: "Agile Engineering & Training",
    description:
      "We develop the solution through agile sprints, training and fine-tuning models on domain-specific datasets to guarantee performance.",
    icon: LuCode,
    color: "#3B82F6",
    gradient: "from-[#3B82F6] to-[#60A5FA]",
    translateX: "60px",
    connectorWidth: 198,
  },
  {
    number: "05",
    title: "Deployment & Optimization",
    description:
      "We deploy production-ready AI models with enterprise-grade CI/CD pipelines, integrating continuous monitoring and automated retraining.",
    icon: LuRocket,
    color: "#EC4899",
    gradient: "from-[#EC4899] to-[#F472B6]",
    translateX: "16px",
    connectorWidth: 273,
  },
];

// Desktop Step Card Component
function DesktopStepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const IconComponent = step.icon;

  return (
    <div
      ref={ref}
      style={{ transform: `translateX(${step.translateX})` }}
      className="relative group w-full h-[120px]"
    >
      {/* Connector Line & Dot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        style={{
          width: `${step.connectorWidth}px`,
          left: `-${step.connectorWidth}px`,
        }}
        className="absolute top-1/2 -translate-y-1/2 h-4 flex items-center pointer-events-none z-10"
      >
        {/* The line */}
        <div
          className="h-[1.5px] w-full"
          style={{
            background: `linear-gradient(to right, ${step.color}40, ${step.color})`,
          }}
        />
        {/* The dot */}
        <div
          className="absolute left-0 -translate-x-1/2 w-4.5 h-4.5 rounded-full border-[3.5px] shadow-[0_0_12px_rgba(255,255,255,0.15)] transition-transform duration-300 group-hover:scale-125"
          style={{
            borderColor: step.color,
            background: "#030b1a",
          }}
        />
      </motion.div>

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
        whileHover={{ scale: 1.02, x: 8 }}
        className="relative ml-4 rounded-[22px] border backdrop-blur-md overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.3)] transition-all duration-300 h-full"
        style={{
          borderColor: `${step.color}30`,
          background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`,
        }}
      >
        {/* Left colored border bar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-[22px] bg-gradient-to-b ${step.gradient}`}
        />

        <div className="pl-6 pr-6 py-5 flex items-start gap-4 h-full">
          {/* Icon */}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${step.gradient} shadow-lg`}
          >
            <IconComponent className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <h3 className="text-lg font-bold text-white group-hover:text-[#D27E2B] transition-colors leading-tight">
                {step.title}
              </h3>
              <span
                className="shrink-0 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                style={{
                  color: step.color,
                  borderColor: `${step.color}40`,
                  background: `${step.color}10`,
                }}
              >
                STEP {step.number}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed line-clamp-2">
              {step.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Mobile/Tablet Step Card Component
function MobileStepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const IconComponent = step.icon;

  return (
    <div className="relative flex items-start pl-14 md:pl-16 w-full pb-8 last:pb-0 group min-h-[180px]">
      {/* Icon node on timeline line */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center z-10">
        {/* Line Above */}
        {index !== 0 && (
          <div
            className="w-[2px] flex-1"
            style={{
              background: step.color,
            }}
          />
        )}

        {/* Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={`w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br ${step.gradient}
      border-[3px] border-[#F5F5F5] flex items-center justify-center shrink-0`}
          style={{
            boxShadow: `0 0 15px ${step.color}30`,
          }}
        >
          <IconComponent className="w-4 h-4 text-white" />
        </motion.div>

        {/* Line Below */}
        {index !== STEPS.length - 1 && (
          <div
            className="w-[2px] flex-1"
            style={{
              background: step.color,
            }}
          />
        )}
      </div>

      {/* Card Content */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="w-full rounded-2xl border backdrop-blur-md overflow-hidden p-5 pl-7 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
        style={{
          borderColor: `${step.color}25`,
          background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`,
        }}
      >
        {/* Left colored border bar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${step.gradient}`}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <h3 className="text-base md:text-lg font-bold text-white group-hover:text-[#D27E2B] transition-colors">
            {step.title}
          </h3>
          <span
            className="self-start text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border shrink-0"
            style={{
              color: step.color,
              borderColor: `${step.color}40`,
              background: `${step.color}10`,
            }}
          >
            Step {step.number}
          </span>
        </div>
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
          {step.description}
        </p>
      </motion.div>
    </div>
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
            A structured, proven 5-step process from idea to deployed AI product
            — with full transparency at every stage.
          </motion.p>
        </div>

        {/* ── DESKTOP VIEW (Arc infographic layout) ── */}
        <div className="hidden lg:flex items-center gap-8 w-full max-w-6xl mx-auto relative py-12">
          {/* LEFT: Central Hub Circle */}
          <div className="w-[700px] flex-shrink-0 flex items-center justify-center relative z-10">
            {/* Concentric pulsing glow rings */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.12 + i * 0.05, 1],
                  opacity: [0.15, 0.04, 0.15],
                }}
                transition={{
                  duration: 4.5 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
                className="absolute rounded-full border border-[#D27E2B]/15"
                style={{
                  width: `${500 + i * 90}px`,
                  height: `${500 + i * 90}px`,
                }}
              />
            ))}

            {/* Main Hub Circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-120 h-120 rounded-full flex flex-col items-center justify-center text-center z-10 border border-[#D27E2B]/40 shadow-[0_0_65px_rgba(210,126,43,0.22)]"
              style={{
                background:
                  "radial-gradient(circle at 40% 35%, #182640, #030b1a)",
              }}
            >
              {/* Inner ring */}
              <div className="absolute inset-8 rounded-full border border-[#D27E2B]/15" />

              {/* Robo Image Replacement */}
              <div className="relative w-32 h-32 mb-6">
                <Image
                  src="/ai-strategy/robrot-ai-product-development.png"
                  alt="AI Product Development Robot"
                  fill
                  sizes="128px"
                  priority
                  className="object-contain"
                />
              </div>

              <p className="text-2xl text-slate-400 font-extrabold uppercase tracking-widest leading-none">
                AI Product
              </p>

              <p className="text-3xl text-[#D27E2B] font-black uppercase tracking-widest mt-2 leading-none">
                Development
              </p>

              <p className="text-lg text-slate-500 font-bold mt-3 leading-tight">
                5-Step Proven
                <br />
                Framework
              </p>
            </motion.div>
          </div>

          {/* RIGHT: Steps forming a perfect arc curve */}
          <div className="flex-1 flex flex-col gap-6 relative py-6 min-h-[744px]">
            {/* Unified Arc SVG */}
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-0"
              fill="none"
            >
              <path
                d="M -370 52 A 260 320 0 0 1 -370 692"
                stroke="url(#arcGradient)"
                strokeWidth="3.5"
                fill="none"
              />
              {/* Top Terminal Cap */}
              <circle
                cx="-370"
                cy="52"
                r="5"
                fill="#030b1a"
                stroke="#D27E2B"
                strokeWidth="2.5"
              />
              {/* Bottom Terminal Cap */}
              <circle
                cx="-370"
                cy="692"
                r="5"
                fill="#030b1a"
                stroke="#EC4899"
                strokeWidth="2.5"
              />
              <defs>
                <linearGradient id="arcGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D27E2B" stopOpacity="0.8" />
                  <stop offset="25%" stopColor="#6366F1" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#22C55E" stopOpacity="0.8" />
                  <stop offset="75%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>

            {STEPS.map((step, idx) => (
              <DesktopStepCard key={step.number} step={step} index={idx} />
            ))}
          </div>
        </div>

        {/* ── MOBILE/TABLET VIEW (Responsive Timeline) ── */}
        <div className="block lg:hidden w-full max-w-2xl mx-auto relative px-4 mt-8">
          {/* Vertical timeline line on the left side */}

          {/* Hub Image header in mobile */}
          <div className="flex items-center gap-4 mb-10 pl-1 md:pl-2">
            <div className="relative w-14 h-14 rounded-full border border-[#D27E2B]/40 bg-[#182640] p-2 flex items-center justify-center shrink-0">
              <Image
                src="/ai-strategy/robrot-ai-product-development.png"
                alt="AI Product Development Robot"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#D27E2B]">
                AI Product Development
              </h4>
              <p className="text-xs text-slate-400">5-Step Proven Framework</p>
            </div>
          </div>

          <div className="flex flex-col">
            {STEPS.map((step, idx) => (
              <MobileStepCard key={step.number} step={step} index={idx} />
            ))}
          </div>
        </div>
      </Row>
    </Section>
  );
}
