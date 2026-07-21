"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LuSearch,
  LuBrain,
  LuPenTool,
  LuCode,
  LuShieldCheck,
  LuRocket,
  LuTrendingUp,
} from "react-icons/lu";
import SectionBadge from "../new-home-components/SectionBadge";

// --- Data ---
const STEPS = [
  {
    id: "01",
    title: "Discovery",
    description:
      "We analyze your business needs, challenges, and opportunities to define the right AI potential.",
    icon: LuSearch,
    color: "#3b82f6", // Blue
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
  },
  {
    id: "02",
    title: "AI Strategy",
    description:
      "We create a tailored AI strategy and roadmap aligned with your business goals and growth plan.",
    icon: LuBrain,
    color: "#f97316", // Orange
    glow: "shadow-[0_0_30px_rgba(249,115,22,0.3)]",
  },
  {
    id: "03",
    title: "Solution Design",
    description:
      "We design intelligent architecture, workflows, and user experiences that deliver value.",
    icon: LuPenTool,
    color: "#6366f1", // Indigo
    glow: "shadow-[0_0_30px_rgba(99,102,241,0.3)]",
  },
  {
    id: "04",
    title: "Development",
    description:
      "We build, integrate, and train AI models and applications with highest standards.",
    icon: LuCode,
    color: "#f59e0b", // Amber
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.3)]",
  },
  {
    id: "05",
    title: "Testing & Security",
    description:
      "Rigorous testing for accuracy, security, and performance to ensure reliability.",
    icon: LuShieldCheck,
    color: "#0ea5e9", // Sky Blue
    glow: "shadow-[0_0_30px_rgba(14,165,233,0.3)]",
  },
  {
    id: "06",
    title: "Deployment",
    description:
      "We deploy AI solutions seamlessly with zero disruption to your business operations.",
    icon: LuRocket,
    color: "#a855f7", // Purple
    glow: "shadow-[0_0_30px_rgba(168,85,247,0.3)]",
  },
  {
    id: "07",
    title: "Continuous Optimization",
    description:
      "We continuously monitor, learn, and optimize AI models to improve performance over time.",
    icon: LuTrendingUp,
    color: "#f97316", // Orange
    glow: "shadow-[0_0_30px_rgba(249,115,22,0.3)]",
  },
];

// Pre-calculated coordinates for 7 items on a 340px radius (shared by cards + connector lines)
const POSITIONS = [
  { x: 0, y: -380 },
  { x: 310, y: -240 },
  { x: 390, y: 90 },
  { x: 175, y: 355 },
  { x: -175, y: 355 },
  { x: -390, y: 90 },
  { x: -310, y: -240 },
];
export default function AiDeliveryFramework() {
  const [hoveredStep, setHoveredStep] = React.useState<number | null>(null);

  return (
    <section className="relative bg-[#0d1b2a] py-24 overflow-hidden ">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-orange-900/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-indigo-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-28 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <SectionBadge title="OUR PROCESS" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-white"
          >
            Our Enterprise{" "}
            <span className="text-[#D27E2B]">AI Delivery Framework</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            A proven end-to-end approach to deliver intelligent AI solutions
            that drive real business impact.
          </motion.p>
        </div>

        {/* ========================================= */}
        {/* DESKTOP VIEW: Perfect Polygonal Layout (xl+) */}
        {/* ========================================= */}
        <div className="hidden xl:flex relative w-full h-[980px] items-center justify-center  ">
          {/* Dashed background orbit circle (680px diameter = 340px radius) */}
          <div className="absolute w-[820px] h-[820px] rounded-full border border-dashed border-slate-700/50 animate-[spin_120s_linear_infinite]" />

          {/* Connector Lines: hub -> each step, brighten + animate on hover */}
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[840px] h-[840px] pointer-events-none z-10"
            viewBox="-350 -350 700 700"
          >
            {STEPS.map((step, idx) => {
              const pos = POSITIONS[idx];
              const dist = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
              const ux = pos.x / dist;
              const uy = pos.y / dist;
              const isActive = hoveredStep === idx;
              return (
                <motion.line
                  key={step.id}
                  x1={ux * 100}
                  y1={uy * 100}
                  x2={ux * (dist - 55)}
                  y2={uy * (dist - 55)}
                  stroke={step.color}
                  strokeWidth={isActive ? 2 : 1}
                  strokeDasharray="5 5"
                  animate={{
                    opacity: isActive ? 0.9 : 0.25,
                    strokeDashoffset: isActive ? [0, -20] : 0,
                  }}
                  transition={{
                    opacity: { duration: 0.3 },
                    strokeDashoffset: {
                      duration: 1,
                      repeat: isActive ? Infinity : 0,
                      ease: "linear",
                    },
                  }}
                />
              );
            })}
          </svg>

          {/* Central Hub - Cleaned up to properly display the provided image */}
          <motion.div
            animate={{
              scale: hoveredStep !== null ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="absolute z-20 flex items-center justify-center w-[390px] h-[390px]"
          >
            {/* Soft ambient back-glow for the image */}
            <div className="absolute w-[200px] h-[200px] rounded-full bg-orange-500/20 blur-[50px] animate-pulse" />

            {/* Animated Image Hub body */}
            <motion.div
              animate={{ y: [-8, 8, -8] }} // Continuous floating breathing animation
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full flex items-center justify-center z-10"
            >
              <img
                src="/ai-service/ai-core-animated.png"
                alt="AI Core Animated Processing"
                // Removed rounded-full and added object-contain so the 3D cube displays perfectly
                className="w-full h-full object-contain drop-shadow-[0_0_60px_rgba(59,130,246,.65)]"
              />
            </motion.div>
          </motion.div>

          {/* Radial Steps - Using precise X/Y offsets for a perfect 7-sided shape */}
          {STEPS.map((step, idx) => {
            const pos = POSITIONS[idx];

            return (
              <div
                key={step.id}
                className="absolute top-1/2 left-1/2 w-[280px] z-30"
                style={{
                  // Perfectly places the exact center of the card on the designated coordinate
                  transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                }}
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.06, y: -6 }}
                  className="group cursor-pointer"
                >
                  <div
                    className={`relative flex flex-col items-center text-center p-7 rounded-2xl bg-[#101f33] border border-slate-700/50 group-hover:bg-[#152840] group-hover:border-slate-500/60 transition-all duration-300 ${step.glow}`}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-slate-600/50 bg-[#0d1b2a] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_25px_currentColor]"
                      style={{
                        boxShadow: `0 0 15px ${step.color}40`,
                        color: step.color,
                      }}
                    >
                      <step.icon
                        className="w-7 h-7"
                        style={{ color: step.color }}
                      />
                    </div>

                    <div
                      className="absolute -top-3 bg-[#0d1b2a] px-2 text-[11px] font-black tracking-widest transition-transform duration-300 group-hover:scale-110"
                      style={{ color: step.color }}
                    >
                      {step.id}
                    </div>

                    <h3 className="text-white font-bold text-xl mb-2 transition-colors duration-300">
                      <span
                        className="group-hover:text-[color:var(--step-color)]"
                        style={{ ["--step-color" as any]: step.color }}
                      >
                        {step.title}
                      </span>
                    </h3>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* ========================================= */}
        {/* MOBILE/TABLET VIEW: Vertical Stack Flow   */}
        {/* ========================================= */}
        <div className="xl:hidden relative max-w-md mx-auto mb-20 px-4 flex flex-col items-center gap-4">
          {STEPS.map((step, idx) => (
            <React.Fragment key={step.id}>
              {/* Step Card (Mimicking Image 1 layout) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className={`group relative flex flex-col items-center text-center w-full p-6 pt-10 rounded-2xl bg-[#101f33] border border-slate-700/50 hover:border-slate-500/60 hover:bg-[#152840] transition-colors duration-300 ${step.glow}`}
              >
                {/* Overlapping Icon Circle */}
                <div
                  className="absolute -top-7 w-14 h-14 rounded-full flex items-center justify-center border-2 border-[#0d1b2a] bg-[#101f33] z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{ boxShadow: `0 0 15px ${step.color}40` }}
                >
                  <step.icon
                    className="w-6 h-6"
                    style={{ color: step.color }}
                  />
                </div>

                <div
                  className="text-[13px] font-black tracking-widest mb-1"
                  style={{ color: step.color }}
                >
                  {step.id}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

              {/* Downward Connecting Arrow (Hidden after the last item) */}
              {idx !== STEPS.length - 1 && (
                <div className="flex flex-col items-center justify-center h-12 opacity-60">
                  <svg width="24" height="100%" className="overflow-visible">
                    <defs>
                      <marker
                        id={`arrow-down-${idx}`}
                        markerWidth="8"
                        markerHeight="8"
                        refX="4"
                        refY="8"
                        orient="auto"
                      >
                        <polygon
                          points="0 0, 8 0, 4 8"
                          fill={STEPS[idx].color}
                        />
                      </marker>
                    </defs>
                    <motion.line
                      x1="12"
                      y1="0"
                      x2="12"
                      y2="100%"
                      stroke={STEPS[idx].color}
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      markerEnd={`url(#arrow-down-${idx})`}
                      initial={{ strokeDashoffset: -10 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
