"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import Section from "@/components/Section";
import Row from "@/components/Row";
import SectionBadge from "./SectionBadge";

// Custom SVG components
const ChatbotIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <rect x="8" y="8" width="8" height="5.5" rx="1.5" strokeWidth="1.5" />
    <circle cx="10.5" cy="11" r="0.75" fill="currentColor" />
    <circle cx="13.5" cy="11" r="0.75" fill="currentColor" />
    <path d="M10 13.8h4" strokeWidth="1" />
    <line x1="12" y1="8" x2="12" y2="6.5" strokeWidth="1.5" />
    <circle cx="12" cy="6" r="0.5" fill="currentColor" />
  </svg>
);

const CustomAIDevIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <circle cx="12" cy="12" r="3" />
    <path
      d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
      strokeWidth="2.5"
    />
    <circle cx="12" cy="5" r="1.2" fill="currentColor" />
    <circle cx="12" cy="19" r="1.2" fill="currentColor" />
    <circle cx="5" cy="12" r="1.2" fill="currentColor" />
    <circle cx="19" cy="12" r="1.2" fill="currentColor" />
  </svg>
);

const AIConsultingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <circle cx="12" cy="11.5" r="3" strokeWidth="1.5" />
    <path d="M12 8.5v3M10.5 11.5h3" strokeWidth="1.5" />
  </svg>
);

const aiServices = [
  {
    title: "AI Chatbot Development",
    route: "/ai-chatbot-development",
    icon: ChatbotIcon,
    description:
      "We design intelligent AI assistants that automate customer interactions, improve support efficiency, and deliver natural conversations across web, mobile, and messaging platforms.",
    highlights: [
      "Enterprise AI assistants",
      "Customer support automation",
      "Internal knowledge assistants",
      "Multi-channel chatbot deployment",
      "LLM-powered conversational experiences",
    ],
    color: "from-blue-600/10 via-indigo-600/5 to-transparent",
    hoverBg: "hover:bg-blue-950/20",
    borderColor: "group-hover:border-blue-500/30",
    glowColor: "group-hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.25)]",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-400",
    cta: "Explore Service",
  },
  {
    title: "AI Product Development",
    route: "/ai-product-development",
    icon: CustomAIDevIcon,
    description:
      "From concept to deployment, we build production-ready AI products that solve real business challenges with modern machine learning and generative AI technologies.",
    highlights: [
      "End-to-end AI product engineering",
      "LLM integration",
      "Custom AI applications",
      "AI workflow automation",
      "Scalable production systems",
    ],
    color: "from-[#d68029]/15 via-orange-600/5 to-transparent",
    hoverBg: "hover:bg-amber-950/10",
    borderColor: "group-hover:border-[#d68029]/30",
    glowColor: "group-hover:shadow-[0_0_50px_-12px_rgba(214,128,41,0.25)]",
    iconBg: "bg-[#d68029]/10 border-[#d68029]/20",
    iconColor: "text-[#d68029]",
    cta: "View Solution",
  },
  {
    title: "AI Strategy Consulting",
    route: "/ai-strategy-consulting",
    icon: AIConsultingIcon,
    description:
      "We help organizations identify high-impact AI opportunities, create implementation strategies, and build practical roadmaps for long-term business value.",
    highlights: [
      "AI transformation roadmap",
      "AI readiness assessment",
      "Use-case discovery",
      "Technology selection",
      "ROI planning",
      "Enterprise AI adoption",
    ],
    color: "from-emerald-600/10 via-teal-600/5 to-transparent",
    hoverBg: "hover:bg-emerald-950/10",
    borderColor: "group-hover:border-emerald-500/30",
    glowColor: "group-hover:shadow-[0_0_50px_-12px_rgba(16,185,129,0.25)]",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-400",
    cta: "Explore Service",
  },
];

export default function AIExpertiseSection() {
  const router = useRouter();
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  // Fallback to 0 so the hologram is never empty
  const activeIndex = hoveredService !== null ? hoveredService : 0;
  const activeData = aiServices[activeIndex];
  const ActiveIcon = activeData.icon;

  return (
    <Section className="bg-[#030812] py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle background grids/glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(214,128,41,0.08)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform:
              "perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)",
          }}
        />
      </div>

      <Row className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <SectionBadge title=" Advanced AI Systems" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Intelligent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d68029] to-[#ffaa55]">
              Core Capabilities
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Hover over our terminal to project real-time capabilities into our
            3D visualization core.
          </p>
        </div>

        {/* Split Layout: 3D Hologram (Left) + Terminal Menu (Right) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 w-full max-w-[1200px] mx-auto">
          {/* ── LEFT: 3D HOLOGRAPHIC CORE ── */}
          <div
            className="w-full lg:w-1/2 flex items-center justify-center min-h-[400px] sm:min-h-[500px]"
            style={{ perspective: "1500px" }}
          >
            <motion.div
              animate={{
                rotateX: [60, 63, 60],
                rotateZ: [-35, -32, -35],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Depth Layer 0: Shadow Glow */}
              <div
                className="absolute inset-0 bg-[#d68029]/30 blur-[80px] rounded-full"
                style={{ transform: "translateZ(-120px)" }}
              />

              {/* Depth Layer 1: Base Processor Plate */}
              <div
                className="absolute inset-0 bg-[#061020]/80 border border-slate-700/50 rounded-[40px] backdrop-blur-xl shadow-2xl"
                style={{ transform: "translateZ(-40px)" }}
              >
                {/* Inner Tech Grid */}
                <div className="absolute inset-4 border border-slate-600/20 rounded-[28px] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:20px_20px] opacity-10" />
              </div>

              {/* Depth Layer 2: Orbiting Data Rings */}
              <motion.div
                animate={{ rotateZ: 360 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-10 border-[2px] border-dashed border-[#d68029]/20 rounded-full"
                style={{ transform: "translateZ(10px)" }}
              />
              <motion.div
                animate={{ rotateZ: -360 }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-20 border border-slate-600/30 rounded-full"
                style={{ transform: "translateZ(20px)" }}
              >
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-[#d68029] rounded-full shadow-[0_0_10px_#d68029] -translate-x-1/2 -translate-y-1/2" />
              </motion.div>

              {/* Depth Layer 3: Glass Prism */}
              <div
                className="absolute inset-8 bg-[#d68029]/5 border border-[#d68029]/30 rounded-[30px] backdrop-blur-md"
                style={{ transform: "translateZ(50px)" }}
              />

              {/* Depth Layer 4: Dynamic Projected Content (The Hologram) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    filter: "blur(10px)",
                    z: 120,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    z: 100,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.2,
                    filter: "blur(10px)",
                    z: 120,
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  {/* 3D Icon Container */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[24px] bg-[#0d1b2a]/90 border border-[#d68029]/50 flex items-center justify-center shadow-[0_0_40px_rgba(214,128,41,0.5)] backdrop-blur-2xl relative overflow-hidden top-15 right-10">
                    {/* Inner light sweep */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]" />
                    <ActiveIcon className="w-12 h-12 sm:w-14 sm:h-14 text-[#d68029]" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ── RIGHT: INTERACTIVE TERMINAL MENU ── */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 relative z-20">
            {aiServices.map((service, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredService(idx)}
                  onClick={() => router.push(service.route)}
                  className={`relative cursor-pointer transition-all duration-500 overflow-hidden rounded-2xl ${
                    isActive
                      ? "bg-slate-900/50 border border-slate-700/50 backdrop-blur-md shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
                      : "bg-transparent border border-transparent hover:bg-slate-900/20"
                  }`}
                >
                  {/* Active Accent Line */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-500 ${
                      isActive
                        ? "bg-[#d68029] shadow-[0_0_15px_#d68029]"
                        : "bg-slate-800"
                    }`}
                  />

                  {/* Always Visible Header */}
                  <div className="flex items-center gap-6 p-6 sm:p-8">
                    <span
                      className={`text-xl font-black font-mono transition-colors duration-300 ${
                        isActive ? "text-[#d68029]" : "text-slate-700"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <h3
                      className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                        isActive ? "text-white" : "text-slate-400"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Expandable Content Panel */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden px-6 sm:px-8 pb-8"
                      >
                        <div className="pl-12 border-l border-slate-800 ml-[11px]">
                          <p className="text-slate-400 text-[15px] leading-relaxed mb-6">
                            {service.description}
                          </p>

                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            {service.highlights.slice(0, 4).map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2.5 text-sm text-slate-300"
                              >
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#d68029] shrink-0 shadow-[0_0_5px_#d68029]" />
                                <span className="leading-tight">{item}</span>
                              </li>
                            ))}
                          </ul>

                          <a
                            href={service.route}
                            className="inline-flex items-center gap-2 text-[#d68029] text-sm font-bold uppercase tracking-wider hover:text-white transition-colors group/btn"
                          >
                            {service.cta}
                            <FiArrowRight className="transition-transform group-hover/btn:translate-x-1" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Row>
    </Section>
  );
}
