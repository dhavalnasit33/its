"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  LuBot,
  LuDatabase,
  LuChevronsUp,
  LuMessageSquare,
  LuFileText,
  LuSparkles,
  LuArrowRight,
} from "react-icons/lu";
import SectionBadge from "../new-home-components/SectionBadge";
import Section from "../Section";
import Row from "../Row";

// --- TYPES ---
interface SolutionData {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  angle: number; // For perfect radial positioning
}

// --- DATA: PERFECT HEXAGONAL ORBIT ---
const SOLUTIONS: SolutionData[] = [
  {
    title: "AI Copilots",
    description:
      "Context-aware enterprise AI copilots designed to automate multi-step operational workflows, streamline decision-making, and assist domain experts with instant data synthesis.",
    icon: LuBot,
    color: "#3B82F6",
    angle: 0,
  }, // Right
  {
    title: "RAG Systems",
    description:
      "Production-grade Retrieval-Augmented Generation architectures integrated with vector databases for ultra-accurate, hallucination-free enterprise knowledge retrieval.",
    icon: LuDatabase,
    color: "#F97316",
    angle: 60,
  }, // Bottom Right
  {
    title: "Custom GPTs",
    description:
      "Fine-tuned open-source and proprietary LLMs optimized specifically for your domain taxonomy, compliance guardrails, and proprietary corporate intelligence.",
    icon: LuChevronsUp,
    color: "#8B5CF6",
    angle: 120,
  }, // Bottom Left
  {
    title: "Chatbots",
    description:
      "Omnichannel conversational AI engines that execute multi-intent customer support, automate ticket resolutions, and seamlessly integrate with backend CRMs.",
    icon: LuMessageSquare,
    color: "#10B981",
    angle: 180,
  }, // Left
  {
    title: "Doc Intelligence",
    description:
      "Advanced OCR and multimodal LLM pipelines that extract structured data, classify financial records, and summarize complex legal contracts at scale.",
    icon: LuFileText,
    color: "#F43F5E",
    angle: 240,
  }, // Top Left
  {
    title: "Content Gen",
    description:
      "Enterprise content synthesis platforms tailored to your brand voice, automating technical documentation, marketing copy, and multi-format reports.",
    icon: LuSparkles,
    color: "#06B6D4",
    angle: 300,
  }, // Top Right
];

// --- 1. THE INFINITY CORE (CENTER) ---
const InfinityCore = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] flex items-center justify-center z-50 pointer-events-none">
      {/* Intense Ambient Glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[200px] h-[200px] bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full blur-[60px]"
      />

      {/* 3D Rotating Rings */}
      <motion.div
        animate={{ rotateX: 360, rotateY: 180, rotateZ: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[180px] h-[180px] border border-blue-500/40 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] [transform-style:preserve-3d]"
      />
      <motion.div
        animate={{ rotateX: -360, rotateY: 360, rotateZ: -180 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[220px] h-[220px] border border-purple-500/30 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.2)] [transform-style:preserve-3d]"
      />

      {/* The Central Solid Orb */}
      <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-[0_20px_50px_rgba(15,23,42,0.2),inset_0_-10px_20px_rgba(0,0,0,0.1)] overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_180deg,#3B82F6_240deg,#8B5CF6_300deg,#F97316_360deg)] opacity-40 blur-md"
        />
        <LuBot className="relative z-10 w-10 h-10 text-slate-800 drop-shadow-md" />
      </div>
    </div>
  );
};

// --- 2. THE FLOATING GLASS CARDS ---
const GlassTerminal = ({
  sol,
  radius,
  isHovered,
}: {
  sol: SolutionData;
  radius: number;
  isHovered: boolean;
}) => {
  const Icon = sol.icon;
  // Math for perfect radial placement
  const rad = (sol.angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={{ opacity: 1, scale: 1, x, y }}
      transition={{
        duration: 1,
        delay: sol.angle / 1000,
        type: "spring",
        bounce: 0.4,
      }}
      className="absolute top-1/2 left-1/2 w-[320px] -ml-[160px] -mt-[100px] z-40 group"
      // Crucial: We reverse the 3D tilt of the parent container so the cards always face the user!
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        animate={{
          z: isHovered ? 60 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative h-full w-full"
      >
        {/* Massive Colored Glow Behind Card on Hover */}
        <div
          className="absolute inset-0 rounded-[2rem] blur-[40px] opacity-0 group-hover:opacity-60 transition-opacity duration-500"
          style={{ backgroundColor: sol.color, transform: "translateY(20px)" }}
        />

        {/* The Card Body */}
        <div className="relative p-7 rounded-[2rem] bg-white/70 backdrop-blur-2xl border border-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden cursor-pointer group-hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] group-hover:border-white/100 group-hover:bg-white/90">
          {/* Animated Light Sweep Effect */}
          <div className="absolute inset-0 -translate-x-[150%] skew-x-[-30deg] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 group-hover:animate-[shimmer_1.5s_ease-in-out] pointer-events-none" />

          {/* Icon Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-slate-100 transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 transition-opacity duration-500"
                style={{ backgroundColor: sol.color }}
              />
              <Icon
                className="w-6 h-6 relative z-10 transition-colors"
                style={{ color: sol.color }}
              />
            </div>
            <h3 className="text-slate-900 font-extrabold text-xl tracking-tight leading-tight">
              {sol.title}
            </h3>
          </div>

          <p className="text-slate-500 text-[15px] font-medium leading-relaxed mb-0">
            {sol.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- 3. FIBER OPTIC SVG BEAMS ---
const DataStreams = ({
  radius,
  hoveredIdx,
}: {
  radius: number;
  hoveredIdx: number | null;
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-none z-10 overflow-visible">
      {SOLUTIONS.map((sol, i) => {
        const rad = (sol.angle * Math.PI) / 180;
        const startX = 600; // Center of SVG
        const startY = 600;
        const endX = 600 + Math.cos(rad) * radius;
        const endY = 600 + Math.sin(rad) * radius;

        // Create an elegant curved path instead of straight lines
        const cpX = 600 + Math.cos(rad) * (radius * 0.4);
        const cpY = 600 + Math.sin(rad) * (radius * 0.4);
        const path = `M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`;
        const isHovered = hoveredIdx === i;

        return (
          <g key={`stream-${i}`}>
            {/* The base track */}
            <path
              d={path}
              fill="none"
              stroke="url(#grid-gradient)"
              strokeWidth="2"
              className="opacity-30"
            />
            {/* Active Data Pulse */}
            <motion.path
              d={path}
              fill="none"
              stroke={sol.color}
              strokeWidth={isHovered ? "4" : "2"}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: isHovered ? 1 : [0, 1, 0],
                opacity: isHovered ? 1 : [0, 1, 0],
              }}
              transition={{
                duration: isHovered ? 0.5 : 3,
                repeat: isHovered ? 0 : Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
              style={{ filter: `drop-shadow(0 0 10px ${sol.color})` }}
            />
          </g>
        );
      })}
      <defs>
        <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// --- MAIN EXPORT: THE ECOSYSTEM ---
export default function Ultimate3DEcosystem() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Math for Desktop Radius (distance from center)
  const [orbitRadius, setOrbitRadius] = useState(380);

  useEffect(() => {
    const handleResize = () => {
      setOrbitRadius(window.innerWidth > 1500 ? 450 : 380);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- 3D MOUSE PARALLAX ENGINE ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  // Dramatically tilt the entire room based on mouse position
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (

    // Beautiful, ultra-premium soft background
    <Section id="solutions"  className="bg-gradient-to-b from-[#F4F7FA] to-[#EAEFF5]  relative overflow-hidden">

      {/* --- ADD THIS TO GLOBAL CSS OR TAILWIND CONFIG FOR THE SWEEP EFFECT --- */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(200%) skewX(-30deg); }
        }
      `}</style>
<Row className=" min-h-[1300px] flex flex-col items-center justify-start">

      {/* Deep Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_100%)]" />
        {/* Soft 3D Floor Grid */}
        <div className="absolute bottom-[-20%] left-0 w-full h-[60%] bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [transform:perspective(1000px)_rotateX(75deg)] [mask-image:linear-gradient(transparent,black)]" />
      </div>

      <div className="text-center   max-w-4xl mx-auto flex flex-col items-center relative z-20 px-4">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-3"
        >
          <SectionBadge title=" Intelligence Core" />
        </motion.span>
  <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-[#0B1E35] leading-tight mb-6"
          >
           What We <span className="text-[#D27E2B]">Build</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-base md:text-lg leading-relaxed"
          >
       Powerful AI solutions and enterprise-grade systems built to transform the way you work.
          </motion.p>
    
       
      </div>

      {/* --- DESKTOP 3D ENGINE STAGE --- */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        // The perspective wrapper creates the deep 3D room
        className="relative w-full max-w-[1400px] mx-auto flex-1 min-h-[800px] hidden xl:block [perspective:2000px]"
        style={{ marginTop: "90px" }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          // We apply the mouse tilt here
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <InfinityCore />
          <DataStreams radius={orbitRadius} hoveredIdx={hoveredIdx} />

          {SOLUTIONS.map((sol, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <GlassTerminal
                sol={sol}
                radius={orbitRadius}
                isHovered={hoveredIdx === idx}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- MOBILE / TABLET FALLBACK (Premium Stack) --- */}
      <div className="relative z-40 flex flex-col gap-6 px-6 w-full max-w-2xl mx-auto xl:hidden">
        {SOLUTIONS.map((sol, idx) => {
          const Icon = sol.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl flex gap-5 items-start shadow-[0_10px_30px_rgba(15,23,42,0.06)] border border-slate-100 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 w-1.5 h-full"
                style={{ backgroundColor: sol.color }}
              />
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border shadow-inner"
                style={{
                  backgroundColor: `${sol.color}10`,
                  borderColor: `${sol.color}20`,
                  color: sol.color,
                }}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-slate-900 font-extrabold text-xl mb-1 tracking-tight">
                  {sol.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  {sol.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
</Row>
    </Section>
  );
}
