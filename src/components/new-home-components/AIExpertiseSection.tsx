import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight,
  FiCpu,
  FiTerminal,
  FiShield,
  FiActivity,
} from "react-icons/fi";
import SectionBadge from "./SectionBadge";
import Row from "../Row";

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
    ],
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
    ],
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
    ],
    cta: "Explore Service",
  },
];

export default function AIExpertiseSection() {
  const router = useRouter();
  const [activeService, setActiveService] = useState<number>(0);
  const [latency, setLatency] = useState<number>(12);

  const activeData = aiServices[activeService];
  const ActiveIcon = activeData.icon;

  const handleTabChange = (idx: number) => {
    setActiveService(idx);
    // Simulate a network ping/latency update when the core reboots
    setLatency(Math.floor(Math.random() * 30) + 8);
  };

  return (
    <section className="bg-[#050914] lg:py-24!  relative overflow-hidden ">
      {/* ── IMMERSIVE GLOW & AMBIENT GRIDS ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(214,128,41,0.06)_0%,transparent_60%)] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[150px]" />
      </div>

      <Row className="relative z-10 max-w-[1400px] mx-auto">
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
            Click on our terminal to project real-time capabilities into our 3D
            visualization core.
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ── LEFT: HOLOGRAPHIC DIAGNOSTIC CORE ── */}
          <div className="lg:col-span-5 flex items-center justify-center min-h-[420px] sm:min-h-[480px] relative">
            {/* Ambient HUD Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <div className="w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full border border-dashed border-[#d68029]/20 animate-[spin_40s_linear_infinite]" />
              <div className="absolute w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] rounded-full border border-[#d68029]/10 animate-[spin_25s_linear_infinite_reverse]" />
            </div>

            <motion.div
              animate={{
                rotateX: [15, 20, 15],
                rotateZ: [-10, -5, -10],
                y: [0, -10, 0],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] rounded-[32px] bg-[#0A1424]/90 border border-slate-700/60 p-6 flex flex-col justify-between shadow-[0_0_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden group"
            >
              {/* Scanline overlay base */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40 z-0" />

              {/* Dynamic Laser Scanline on Tab Change */}
              <AnimatePresence>
                <motion.div
                  key={`scan-${activeService}`}
                  initial={{ top: "-20%", opacity: 0 }}
                  animate={{ top: "120%", opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                  className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-[#d68029]/30 to-transparent z-40 pointer-events-none border-b-2 border-[#d68029]/60 shadow-[0_5px_25px_rgba(214,128,41,0.4)]"
                />
              </AnimatePresence>

              {/* Top HUD Telemetry */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <motion.span
                    key={`ping-${activeService}`}
                    initial={{ scale: 1.5, backgroundColor: "#fff" }}
                    animate={{ scale: 1, backgroundColor: "#d68029" }}
                    className="w-2 h-2 rounded-full animate-ping"
                  />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeService}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="text-[11px] font-mono text-[#d68029] tracking-wider uppercase"
                    >
                      Node_ID: 0{activeService + 1}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  Status: Active
                </span>
              </div>

              {/* Center Hologram - 3D Cube Rotation Effect */}
              <div className="my-auto flex flex-col items-center justify-center relative z-10 min-h-[160px] perspective-[1000px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService}
                    initial={{ opacity: 0, rotateY: 90, scale: 0.6 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateY: -90, scale: 0.6 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#12233B] to-[#0D1826] border border-[#d68029]/40 flex items-center justify-center shadow-[0_0_35px_rgba(214,128,41,0.25)] relative overflow-hidden">
                      {/* Inner pulsing core */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-[#d68029]/10 to-transparent animate-pulse" />
                      <ActiveIcon className="w-12 h-12 text-[#d68029] relative z-10" />
                    </div>
                    <h4 className="text-white font-bold text-center mt-5 text-lg tracking-wide">
                      {activeData.title}
                    </h4>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="bg-[#050B14]/80 rounded-xl p-3 border border-slate-800/80 font-mono text-[11px] text-slate-400 flex items-center justify-between relative z-10">
                <motion.span
                  key={latency}
                  initial={{ color: "#d68029", opacity: 0 }}
                  animate={{ color: "#94a3b8", opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  LATENCY: {latency}ms
                </motion.span>
                <motion.span
                  key={`sync-${activeService}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[#d68029]"
                >
                  SYNC OK
                </motion.span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: INTERACTIVE COMMAND NODES ── */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {aiServices.map((service, idx) => {
              const isActive = activeService === idx;

              return (
                <div
                  key={idx}
                  onClick={() => handleTabChange(idx)}
                  className={`relative cursor-pointer transition-all duration-300 rounded-2xl p-[2px] overflow-hidden ${
                    isActive
                      ? "shadow-[0_8px_30px_rgba(214,128,41,0.15)]"
                      : "hover:shadow-lg"
                  }`}
                >
                  {/* Outer Gradient Wrapper for Active State */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-[#d68029] to-[#ffaa55] opacity-100"
                        : "bg-slate-800/80 hover:bg-slate-700/80 opacity-100"
                    }`}
                  />

                  {/* Inner Card Content */}
                  <div className="relative h-full bg-[#080E1B] rounded-[14px] p-6 sm:p-7 z-10 transition-colors duration-300">
                    {/* Left glowing marker */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 ${
                        isActive
                          ? "bg-[#d68029] shadow-[0_0_12px_#d68029]"
                          : "bg-transparent"
                      }`}
                    />

                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-sm font-mono font-bold tracking-widest ${
                            isActive ? "text-[#d68029]" : "text-slate-600"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <h3
                          className={`text-lg sm:text-xl font-bold transition-colors ${
                            isActive ? "text-white" : "text-slate-300"
                          }`}
                        >
                          {service.title}
                        </h3>
                      </div>
                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "border-[#d68029] bg-[#d68029]/10 text-[#d68029] rotate-90"
                            : "border-slate-800 text-slate-600"
                        }`}
                      >
                        <FiArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Expanded Body Panel */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden pt-4 mt-4 border-t border-slate-800/80"
                        >
                          <p className="text-slate-400 text-sm leading-relaxed mb-5">
                            {service.description}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            {service.highlights.map((item, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-[#050B14]/80 px-3 py-2.5 rounded-lg border border-slate-800/60"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#d68029]" />
                                {item}
                              </div>
                            ))}
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(service.route);
                            }}
                            className="inline-flex items-center gap-2 cursor-pointer text-xs font-mono font-bold uppercase tracking-widest text-[#d68029] bg-[#d68029]/10 hover:bg-[#d68029] hover:text-white px-5 py-2.5 rounded-full transition-all duration-300 group/btn"
                          >
                            <span>{service.cta}</span>
                            <FiArrowRight className="transition-transform group-hover/btn:translate-x-1" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Row>
    </section>
  );
}
