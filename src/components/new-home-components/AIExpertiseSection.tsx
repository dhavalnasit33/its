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

// Mock data structure assumption for preview context
const aiServices = [
  {
    title: "Neural Language Modelling",
    description:
      "Deploy hyper-tuned transformer topologies for zero-shot context inference and autonomous reasoning.",
    highlights: [
      "Context Window Scaling",
      "RLHF Alignment",
      "Low-Latency Tokens",
      "Edge Deployment",
    ],
    route: "/services/nlp",
    cta: "Initialize Core",
    icon: FiCpu,
  },
  {
    title: "Multimodal Synthesis",
    description:
      "Generate cinematic latent imagery and real-time temporal video sequences directly from vector embeddings.",
    highlights: [
      "Diffusion Fine-Tuning",
      "Temporal Consistency",
      "Zero-Shot Generation",
      "Vector Search",
    ],
    route: "/services/multimodal",
    cta: "Launch Engine",
    icon: FiActivity,
  },
  {
    title: "Autonomous Agent Swarms",
    description:
      "Orchestrate multi-agent cognitive loops capable of self-correction, tool execution, and live workflow routing.",
    highlights: [
      "Dynamic Task Splitting",
      "Memory Persistence",
      "API Interoperability",
      "Safe Sandbox",
    ],
    route: "/services/agents",
    cta: "Deploy Swarm",
    icon: FiTerminal,
  },
];

export default function AIExpertiseSection() {
  const router = useRouter();
  const [activeService, setActiveService] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const activeData = aiServices[activeService];
  const ActiveIcon = activeData.icon;

  return (
    <section className="bg-[#050914] py-24 lg:py-32 relative overflow-hidden font-sans">
      {/* ── IMMERSIVE GLOW & AMBIENT GRIDS ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(214,128,41,0.06)_0%,transparent_60%)] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[150px]" />

        {/* Sci-Fi Perspective Grid */}
        <div className="absolute bottom-[-10%] left-0 w-full h-[50%] opacity-15 transform perspective-[1000px] rotateX-[75deg]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#d6802915_1px,transparent_1px),linear-gradient(to_bottom,#d6802915_1px,transparent_1px)] bg-[size:50px_50px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#050B14] to-[#050B14]" />
        </div>
      </div>

      {/* ── BACKGROUND ELEMENTS ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(30,58,138,0.2)_0%,transparent_60%)] blur-3xl" />

        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[120px]" />

        <div className="absolute bottom-[-20%] left-0 w-full h-[60%] opacity-20 transform-[perspective(1000px)_rotateX(75deg)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e533_1px,transparent_1px),linear-gradient(to_bottom,#4f46e533_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute inset-0 bg-linear-to-t from-transparent via-[#050914] to-[#050914]" />
        </div>

        {/* 3D FLOATING DECORATIONS */}
        <div className="absolute top-[10%] left-[5%] hidden 2xl:flex flex-col gap-4 animate-[bounce_8s_infinite]">
          <div className="w-16 h-16 rounded-xl bg-linear-to-br from-blue-400/20 to-purple-500/10 border-t-2 border-l-2 border-white/20 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.3)] transform rotate-12" />
        </div>
        <div className="absolute top-[15%] right-[5%] hidden 2xl:flex flex-col gap-2 animate-[pulse_6s_infinite]">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-400/20 to-blue-500/10 border-t-2 border-l-2 border-white/20 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.3)] transform -rotate-12 translate-x-4" />
          <div className="w-16 h-16 rounded-xl bg-linear-to-br from-blue-400/20 to-purple-500/10 border-t-2 border-l-2 border-white/20 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.3)] transform rotate-6" />
        </div>
        <div className="absolute bottom-[10%] left-[5%] hidden 2xl:block w-32 h-32 rounded-full border-16 border-blue-500/10 backdrop-blur-sm shadow-[0_0_30px_rgba(59,130,246,0.2)] border-t-blue-400/30 border-l-blue-400/30 transform rotateX-45 rotate-12 animate-[spin_20s_linear_infinite]" />
        <div className="absolute bottom-[15%] right-[8%] hidden 2xl:block w-24 h-24 rounded-full border-12 border-purple-500/10 backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.2)] border-t-purple-400/30 border-r-purple-400/30 transform rotateX-45 -rotate-12 animate-[spin_15s_linear_infinite_reverse]" />
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

        {/* Split Grid: Interactive 3D Holographic Core (Left) + Command Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ── LEFT: HOLOGRAPHIC DIAGNOSTIC CORE (5 Cols) ── */}
          <div className="lg:col-span-5 flex items-center justify-center min-h-[420px] sm:min-h-[480px] relative">
            {/* HUD Reticles */}
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
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

              {/* Top HUD Telemetry */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#d68029] animate-ping" />
                  <span className="text-[11px] font-mono text-[#d68029] tracking-wider uppercase">
                    Node_ID: 0{activeService + 1}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  Status: Active
                </span>
              </div>

              {/* Center Hologram Icon Container */}
              <div className="my-auto flex flex-col items-center justify-center relative z-10">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#12233B] to-[#0D1826] border border-[#d68029]/40 flex items-center justify-center shadow-[0_0_35px_rgba(214,128,41,0.25)] relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-[#d68029]/10 to-transparent animate-pulse" />
                  <ActiveIcon className="w-12 h-12 text-[#d68029]" />
                </div>
                <h4 className="text-white font-bold text-center mt-5 text-lg tracking-wide">
                  {activeData.title}
                </h4>
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="bg-[#050B14]/80 rounded-xl p-3 border border-slate-800/80 font-mono text-[11px] text-slate-400 flex items-center justify-between relative z-10">
                <span>LATENCY: 12ms</span>
                <span className="text-[#d68029]">SYNC OK</span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: INTERACTIVE COMMAND NODES (7 Cols) ── */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {aiServices.map((service, idx) => {
              const isActive = activeService === idx;

              return (
                <motion.div
                  key={idx}
                  onClick={() => setActiveService(idx)}
                  onHoverStart={() => setIsHovered(idx)}
                  onHoverEnd={() => setIsHovered(null)}
                  className={`relative cursor-pointer transition-all duration-300 rounded-2xl border p-6 sm:p-7 overflow-hidden ${
                    isActive
                      ? "bg-[#0A1424]/90 border-[#d68029]/50 shadow-[0_8px_30px_rgba(214,128,41,0.12)]"
                      : "bg-[#080E1B]/50 border-slate-800/80 hover:border-slate-700/80 hover:bg-[#0A1424]/40"
                  }`}
                >
                  {/* Left glowing marker */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 ${isActive ? "bg-[#d68029] shadow-[0_0_12px_#d68029]" : "bg-transparent"}`}
                  />

                  {/* Header Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-sm font-mono font-bold tracking-widest ${isActive ? "text-[#d68029]" : "text-slate-600"}`}
                      >
                        0{idx + 1}
                      </span>
                      <h3
                        className={`text-lg sm:text-xl font-bold transition-colors ${isActive ? "text-white" : "text-slate-300"}`}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <div
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${isActive ? "border-[#d68029] bg-[#d68029]/10 text-[#d68029] rotate-90" : "border-slate-800 text-slate-600"}`}
                    >
                      <FiArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Expanded Body Panel */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden pt-4 mt-4 border-t border-slate-800/80"
                      >
                        <p className="text-slate-400 text-sm leading-relaxed mb-5">
                          {service.description}
                        </p>

                        <div className="grid grid-cols-2 gap-2.5 mb-6">
                          {service.highlights.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-[#050B14]/60 px-3 py-2 rounded-lg border border-slate-800/60"
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
                          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#d68029] hover:text-[#ffaa55] transition-colors group/btn"
                        >
                          <span>{service.cta}</span>
                          <FiArrowRight className="transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Row>
    </section>
  );
}
