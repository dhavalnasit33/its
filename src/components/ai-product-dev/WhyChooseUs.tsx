"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LuShield,
  LuZap,
  LuMessageSquare,
  LuUsers,
  LuTrendingUp,
  LuHandshake,
  LuSmile,
  LuClipboard,
  LuHeadphones,
} from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Motion from "@/components/motionbar";
import { useCountUp } from "@/hook/useCountUp";

const STATS = [
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Our clients love our work and trust our process.",
    icon: LuSmile,
  },
  {
    value: 500,
    suffix: "+",
    label: "Projects Delivered",
    description: "Successfully delivered AI solutions across industries.",
    icon: LuClipboard,
  },
  {
    value: 40,
    suffix: "+",
    label: "AI Experts",
    description: "Skilled AI/ML engineers driving innovation.",
    icon: LuUsers,
  },
  {
    value: 24,
    suffix: "/7",
    label: "Support",
    description: "Round-the-clock support whenever you need us.",
    icon: LuHeadphones,
  },
];

const FEATURES = [
  {
    icon: LuShield,
    title: "Enterprise Security",
    desc: "SOC 2 compliant, end-to-end encryption, and data protection at every layer.",
  },
  {
    icon: LuZap,
    title: "Fast & Agile Delivery",
    desc: "Agile methodology, rapid prototyping, and iterative development for faster results.",
  },
  {
    icon: LuMessageSquare,
    title: "Transparent Process",
    desc: "Clear communication, weekly demos, and real-time project visibility you can trust.",
  },
  {
    icon: LuUsers,
    title: "Dedicated AI Experts",
    desc: "40+ AI/ML specialists with deep domain knowledge and proven industry experience.",
  },
  {
    icon: LuTrendingUp,
    title: "Scalable Architecture",
    desc: "Cloud-native, modular, and future-ready solutions built to scale with your business.",
  },
  {
    icon: LuHandshake,
    title: "Long-Term Partnership",
    desc: "We don't just deliver — we partner with you for continuous support and long-term growth.",
  },
];

function StatCounter({
  value,
  suffix,
  label,
  description,
  icon: IconComponent,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  index: number;
}) {
  const { count, ref } = useCountUp(value);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-2xl p-5 flex items-start gap-4 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden border-t-4 group"
      style={{ borderTopColor: "#ff9d42" }}
    >
      <div className="w-12 h-12 rounded-full border-2 border-[#ff9d42]/30 flex items-center justify-center text-[#ff9d42] shrink-0 bg-white shadow-[0_2px_10px_rgba(255,157,66,0.1)] group-hover:border-[#ff9d42] group-hover:scale-110 transition-all duration-300">
        <IconComponent className="w-5 h-5 text-[#ff9d42]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl md:text-3xl font-extrabold text-[#ff9d42] leading-none mb-1">
          {count}
          {suffix}
        </p>
        <p className="fonts_16 font-bold text-[#0F172A] mb-1 group-hover:text-[#ff9d42] transition-colors duration-300">
          {label}
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function FeatureCard({
  title,
  desc,
  icon: IconComponent,
  index,
  align,
}: {
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  index: number;
  align: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -35 : 35 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-2xl p-5 flex items-start gap-4 hover:shadow-[0_16px_48px_rgba(255,157,66,0.08)] hover:border-[#ff9d42]/30 hover:-translate-y-1.5 transition-all duration-300 w-full relative z-10 group"
    >
      <div className="w-12 h-12 rounded-full border-2 border-[#ff9d42]/30 flex items-center justify-center text-[#ff9d42] shrink-0 bg-white shadow-[0_2px_10px_rgba(255,157,66,0.15)] group-hover:border-[#ff9d42] group-hover:scale-110 transition-all duration-300">
        <IconComponent className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <h4 className="text-lg font-bold text-[#0F172A] mb-1 group-hover:text-[#ff9d42] transition-colors duration-300">
          {title}
        </h4>
        <p className="fonts_16 text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  return (
    <Section className="bg-linear-to-b from-slate-50 to-white overflow-hidden relative">
      <Row>
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto relative z-20">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-[#d68029] bg-[#d68029]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#d68029] mb-5"
          >
            • Why Choose Inspire •
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-center"
          >
            Why Businesses Trust Inspire
            <br />
            For Enterprise{" "}
            <span className="text-[#d68029]">AI Development</span>
          </motion.h2>
          <Motion />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg font-normal text-[#6f6f6f] leading-8 tracking-wide "
          >
            We combine deep AI expertise, robust engineering practices, and a
            client-first mindset to deliver intelligent solutions that create
            real business impact.
          </motion.p>
        </div>

        {/* ── DESKTOP VIEW (Hub layout with Glowing Circuit Lines) ── */}
        <div className="hidden lg:flex items-center justify-between gap-12 w-full max-w-7xl mx-auto relative h-[650px] mb-12">
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4a90e2]/5 rounded-full blur-[100px] pointer-events-none" />

          {/* SVG Connecting Circuit Lines */}
          {/* SVG Connecting Circuit Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1152 600"
            fill="none"
          >
            <defs>
              <filter
                id="neonGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <style>{`
    @keyframes dash {
      to { stroke-dashoffset: -100; }
    }
    .circuit-line {
      stroke-dasharray: 8 6;
      animation: dash 5s linear infinite;
    }
  `}</style>

            {/* Left Lines (Circuit Style) */}
            <path
              d="M 576 300 L 480 300 L 410 115 L 346 115"
              stroke="#ff9d42"
              strokeOpacity="0.5"
              strokeWidth="2"
              className="circuit-line"
              filter="url(#neonGlow)"
            />
            <path
              d="M 576 300 L 346 300"
              stroke="#ff9d42"
              strokeOpacity="0.5"
              strokeWidth="2"
              className="circuit-line"
              filter="url(#neonGlow)"
            />
            <path
              d="M 576 300 L 480 300 L 410 485 L 346 485"
              stroke="#ff9d42"
              strokeOpacity="0.5"
              strokeWidth="2"
              className="circuit-line"
              filter="url(#neonGlow)"
            />

            {/* Right Lines (Circuit Style) */}
            <path
              d="M 576 300 L 672 300 L 742 115 L 806 115"
              stroke="#ff9d42"
              strokeOpacity="0.5"
              strokeWidth="2"
              className="circuit-line"
              style={{ animationDirection: "reverse" }}
              filter="url(#neonGlow)"
            />
            <path
              d="M 576 300 L 806 300"
              stroke="#ff9d42"
              strokeOpacity="0.5"
              strokeWidth="2"
              className="circuit-line"
              style={{ animationDirection: "reverse" }}
              filter="url(#neonGlow)"
            />
            <path
              d="M 576 300 L 672 300 L 742 485 L 806 485"
              stroke="#ff9d42"
              strokeOpacity="0.5"
              strokeWidth="2"
              className="circuit-line"
              style={{ animationDirection: "reverse" }}
              filter="url(#neonGlow)"
            />

            {/* Glowing Connection Dots */}
            <g fill="#ffffff" filter="url(#neonGlow)">
              {/* Outer nodes (at the cards) */}
              <circle cx="346" cy="115" r="4" />
              <circle cx="346" cy="300" r="4" />
              <circle cx="346" cy="485" r="4" />
              <circle cx="806" cy="115" r="4" />
              <circle cx="806" cy="300" r="4" />
              <circle cx="806" cy="485" r="4" />

              {/* Center node (at the hub) */}
              <circle cx="576" cy="300" r="5" fill="#ff9d42" />

              {/* Mid nodes for circuits */}
              <circle cx="480" cy="300" r="3" fill="#ff9d42" />
              <circle cx="410" cy="115" r="3" fill="#ff9d42" />
              <circle cx="410" cy="485" r="3" fill="#ff9d42" />
              <circle cx="672" cy="300" r="3" fill="#ff9d42" />
              <circle cx="742" cy="115" r="3" fill="#ff9d42" />
              <circle cx="742" cy="485" r="3" fill="#ff9d42" />
            </g>
          </svg>

          {/* Left Column (Features 1-3) */}
          <div className="w-[30%] flex flex-col justify-between h-full py-10 relative z-10">
            <FeatureCard
              title={FEATURES[0].title}
              desc={FEATURES[0].desc}
              icon={FEATURES[0].icon}
              index={0}
              align="left"
            />
            <FeatureCard
              title={FEATURES[1].title}
              desc={FEATURES[1].desc}
              icon={FEATURES[1].icon}
              index={1}
              align="left"
            />
            <FeatureCard
              title={FEATURES[2].title}
              desc={FEATURES[2].desc}
              icon={FEATURES[2].icon}
              index={2}
              align="left"
            />
          </div>

          {/* Middle Column (High-Tech Center Hub) */}
          <div className="flex-1 flex justify-center items-center h-full relative z-10">
            {/* Outer Faint Tech Rings */}
            <div className="absolute w-[380px] h-[380px] rounded-full border border-[#4a90e2]/15 animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-[#ff9d42]/30 animate-[spin_40s_linear_infinite_reverse]" />

            {/* Inner Glowing Ring */}
            <div className="absolute w-[250px] h-[250px] rounded-full border-4 border-[#ff9d42]/80 shadow-[0_0_40px_rgba(255,157,66,0.5),inset_0_0_30px_rgba(255,157,66,0.3)] animate-[pulse_3s_ease-in-out_infinite]" />

            {/* Core Dark Blue Circle */}
            <div className="relative w-56 h-56 rounded-full flex flex-col items-center justify-center text-center border-2 border-[#ffb770] shadow-[0_0_50px_rgba(255,157,66,0.6)] bg-gradient-to-br from-[#121b2b] to-[#1a253c] overflow-hidden group shrink-0">
              {/* Inner ambient core glow */}
              <div className="absolute inset-0 bg-[#ff9d42]/10 blur-2xl rounded-full" />

              {/* Center Text */}
              <h3 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ffe0b2] via-[#ffb770] to-[#e67e22] drop-shadow-[0_2px_15px_rgba(230,126,34,0.9)] tracking-wider leading-none select-none z-10">
                AI
              </h3>
              <p className="text-[11px] text-white font-extrabold uppercase tracking-[0.25em] mt-3 leading-none select-none z-10">
                Driven
              </p>
              <p className="text-[11px] text-white font-extrabold uppercase tracking-[0.25em] mt-2 leading-none select-none z-10">
                Innovation
              </p>
            </div>
          </div>

          {/* Right Column (Features 4-6) */}
          <div className="w-[30%] flex flex-col justify-between h-full py-10 relative z-10">
            <FeatureCard
              title={FEATURES[3].title}
              desc={FEATURES[3].desc}
              icon={FEATURES[3].icon}
              index={3}
              align="right"
            />
            <FeatureCard
              title={FEATURES[4].title}
              desc={FEATURES[4].desc}
              icon={FEATURES[4].icon}
              index={4}
              align="right"
            />
            <FeatureCard
              title={FEATURES[5].title}
              desc={FEATURES[5].desc}
              icon={FEATURES[5].icon}
              index={5}
              align="right"
            />
          </div>
        </div>

        {/* ── MOBILE/TABLET VIEW (Vertical List) ── */}
        <div className="flex lg:hidden flex-col items-center gap-12 w-full max-w-2xl mx-auto mb-12 relative z-10">
          {/* Mobile Central Hub */}
          <div className="relative flex justify-center items-center w-full mt-8">
            <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-[#ff9d42]/30 animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute w-[220px] h-[220px] rounded-full border-4 border-[#ff9d42]/80 shadow-[0_0_30px_rgba(255,157,66,0.5),inset_0_0_20px_rgba(255,157,66,0.3)] animate-[pulse_3s_ease-in-out_infinite]" />

            <div className="relative w-48 h-48 rounded-full flex flex-col items-center justify-center text-center border-2 border-[#ffb770] shadow-[0_0_40px_rgba(255,157,66,0.6)] bg-gradient-to-br from-[#121b2b] to-[#1a253c] overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-[#ff9d42]/10 blur-xl rounded-full" />
              <h3 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ffe0b2] via-[#ffb770] to-[#e67e22] drop-shadow-[0_2px_15px_rgba(230,126,34,0.9)] tracking-wider leading-none select-none z-10">
                AI
              </h3>
              <p className="text-[10px] text-white font-extrabold uppercase tracking-[0.25em] mt-3 leading-none select-none z-10">
                Driven
              </p>
              <p className="text-[10px] text-white font-extrabold uppercase tracking-[0.25em] mt-2 leading-none select-none z-10">
                Innovation
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mt-4">
            {FEATURES.map((feature, idx) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                desc={feature.desc}
                icon={feature.icon}
                index={idx}
                align={idx < 3 ? "left" : "right"}
              />
            ))}
          </div>
        </div>

        {/* ── STATS COUNTERS GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-6 relative z-10">
          {STATS.map((stat, idx) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
              icon={stat.icon}
              index={idx}
            />
          ))}
        </div>
      </Row>
    </Section>
  );
}
