"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import {
  FiDatabase,
  FiBriefcase,
  FiFileText,
  FiCloud,
  FiGlobe,
  FiChevronRight,
  FiCpu,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";

// --- TYPESCRIPT INTERFACES ---
interface Position {
  x: number;
  y: number;
  z: number;
}

interface KnowledgeSource {
  id: string;
  label: string;
  icon: IconType;
  color: string;
  bgColor: string;
  pos: Position;
  delay: number;
}

interface FloatingPillProps {
  data: KnowledgeSource;
}

// --- DATA DEFINITIONS ---
const KNOWLEDGE_SOURCES: KnowledgeSource[] = [
  {
    id: "db",
    label: "Databases",
    icon: FiDatabase,
    color: "#10B981",
    bgColor: "#D1FAE5",
    pos: { x: -320, y: -140, z: 40 },
    delay: 0,
  },
  {
    id: "hubs",
    label: "Enterprise Hubs",
    icon: FiBriefcase,
    color: "#F59E0B",
    bgColor: "#FEF3C7",
    pos: { x: -240, y: 10, z: 80 },
    delay: 0.2,
  },
  {
    id: "docs",
    label: "Documents",
    icon: FiFileText,
    color: "#3B82F6",
    bgColor: "#DBEAFE",
    pos: { x: -340, y: 100, z: 20 },
    delay: 0.4,
  },
  {
    id: "cloud",
    label: "Cloud Storage",
    icon: FiCloud,
    color: "#8B5CF6",
    bgColor: "#EDE9FE",
    pos: { x: -180, y: 180, z: 60 },
    delay: 0.6,
  },
  {
    id: "web",
    label: "Web Data",
    icon: FiGlobe,
    color: "#EC4899",
    bgColor: "#FCE7F3",
    pos: { x: -280, y: -260, z: 30 },
    delay: 0.8,
  },
];

// --- SUB-COMPONENTS ---

// FIX: 'data' is now strongly typed to resolve Error 7031
const FloatingPill: React.FC<FloatingPillProps> = ({ data }) => {
  const Icon = data.icon;
  return (
    <motion.div
      className="absolute flex items-center gap-3 bg-white/60 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/80 cursor-pointer hover:bg-white/80 transition-colors"
      style={{
        left: `calc(50% + ${data.pos.x}px)`,
        top: `calc(50% + ${data.pos.y}px)`,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.8, z: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        z: data.pos.z,
        y: [data.pos.y, data.pos.y - 12, data.pos.y],
      }}
      transition={{
        y: {
          duration: 5 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: data.delay,
        },
        opacity: { duration: 0.6 },
        scale: { duration: 0.8, type: "spring", bounce: 0.4 },
      }}
      whileHover={{ scale: 1.05, z: data.pos.z + 40 }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
        style={{ backgroundColor: data.bgColor, color: data.color }}
      >
        <Icon className="w-5 h-5" />
      </div>
      <span className="font-semibold text-slate-700 text-sm tracking-tight pr-2">
        {data.label}
      </span>
      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-md animate-pulse" />
    </motion.div>
  );
};

const CentralBrain = () => (
  <motion.div
    className="absolute left-1/2 top-1/2 w-32 h-32 -translate-x-12 -translate-y-1/2 z-20"
    style={{ transformStyle: "preserve-3d" }}
    animate={{ y: ["-50%", "calc(-50% - 15px)", "-50%"] }}
    transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
  >
    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-3 bg-black/10 rounded-full blur-md" />
    <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-[2.5rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,1),_0_20px_40px_rgba(15,23,42,0.08)] flex items-center justify-center rotate-45 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 mix-blend-overlay"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <div className="-rotate-45 relative z-10">
        <FiCpu className="w-12 h-12 text-slate-800 drop-shadow-sm" />
      </div>
    </div>
  </motion.div>
);

const FloatingChatCard = () => (
  <motion.div
    className="absolute right-[5%] top-1/2 w-[460px] bg-white/70 backdrop-blur-2xl rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.06),_inset_0_1px_0_rgba(255,255,255,1)] border border-white/60 p-7 z-30"
    style={{ transformStyle: "preserve-3d" }}
    initial={{ x: 100, y: "-50%", opacity: 0 }}
    animate={{ x: 0, y: ["-50%", "calc(-50% - 8px)", "-50%"], opacity: 1 }}
    transition={{
      x: { type: "spring", stiffness: 60, damping: 20 },
      opacity: { duration: 0.8 },
      y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
    }}
  >
    <div
      className="flex items-center gap-4 mb-8"
      style={{ transform: "translateZ(30px)" }}
    >
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
        <span className="text-white font-black text-sm tracking-widest">
          AI
        </span>
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-none">
          AI Copilot
        </h3>
        <span className="text-xs font-medium text-emerald-500">
          Online & Ready
        </span>
      </div>
      <div className="ml-auto flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-slate-200" />
        <div className="w-2 h-2 rounded-full bg-slate-200" />
        <div className="w-2 h-2 rounded-full bg-slate-200" />
      </div>
    </div>

    <div className="space-y-6" style={{ transform: "translateZ(20px)" }}>
      <div className="bg-white/80 text-slate-700 px-5 py-4 rounded-2xl rounded-tr-sm ml-auto max-w-[85%] border border-slate-100 shadow-sm backdrop-blur-md">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
          You
        </div>
        <div className="text-sm font-medium leading-relaxed">
          Analyze Q2 churn data and suggest retention strategies.
        </div>
      </div>

      <motion.div className="bg-gradient-to-br from-blue-50/90 to-indigo-50/50 backdrop-blur-xl px-1 py-1 rounded-2xl rounded-tl-sm border border-blue-100/50 shadow-md">
        <div className="p-4">
          <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
            <FiCpu className="w-3 h-3" /> System Analysis
          </div>
          <p className="text-sm font-medium text-slate-700 mb-4">
            Semantic analysis of Q2 churn complete. Core metrics:
          </p>

          <div className="bg-white/90 rounded-xl border border-white shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <span className="text-xs font-bold text-slate-600">
                Q2 2024 Overview
              </span>
            </div>
            <div className="p-2 space-y-1">
              {[
                {
                  label: "SaaS Churn Rate",
                  val: "2.1%",
                  trend: "-12%",
                  up: true,
                },
                {
                  label: "Enterprise ARPU",
                  val: "$12.5k",
                  trend: "+5%",
                  up: true,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-2 hover:bg-slate-50/80 rounded-lg transition-colors cursor-default"
                >
                  <span className="text-[13px] font-semibold text-slate-500">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-800 text-sm">
                      {item.val}
                    </span>
                    <span
                      className={`flex items-center gap-0.5 text-[10px] font-bold px-2 py-1 rounded-md ${item.up ? "bg-emerald-100/80 text-emerald-700" : "bg-red-100/80 text-red-700"}`}
                    >
                      {item.up ? (
                        <FiArrowUp className="w-2.5 h-2.5" />
                      ) : (
                        <FiArrowDown className="w-2.5 h-2.5" />
                      )}
                      {item.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    <div
      className="mt-8 relative group"
      style={{ transform: "translateZ(40px)" }}
    >
      <input
        type="text"
        placeholder="Ask the copilot anything..."
        className="w-full bg-white/90 border border-slate-200 rounded-2xl py-4 px-5 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10 transition-all shadow-sm font-medium text-slate-700 placeholder:text-slate-400"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-2 top-2 bottom-2 aspect-square bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors"
      >
        <FiChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  </motion.div>
);

const AnimatedBeams = () => (
  <div className="absolute inset-0 pointer-events-none z-10">
    <svg viewBox="0 0 1200 800" className="w-full h-full" fill="none">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
          <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {KNOWLEDGE_SOURCES.map((source, i) => {
        const startX = 600 + source.pos.x + 80;
        const startY = 400 + source.pos.y;
        const endX = 550;
        const endY = 400;
        const path = `M ${startX} ${startY} C ${startX + 50} ${startY}, ${endX - 50} ${endY}, ${endX} ${endY}`;

        return (
          <g key={i}>
            <path d={path} stroke="#F1F5F9" strokeWidth="2" />
            <motion.path
              d={path}
              stroke={source.color}
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1],
                opacity: [0, 1, 0],
                pathOffset: [0, 0, 1],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: source.delay,
              }}
            />
          </g>
        );
      })}

      <g>
        <path
          d="M 600 400 C 680 400, 720 400, 780 400"
          stroke="#F1F5F9"
          strokeWidth="3"
        />
        <motion.path
          d="M 600 400 C 680 400, 720 400, 780 400"
          stroke="url(#beamGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1],
            opacity: [0, 1, 0],
            pathOffset: [0, 0, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
        />
      </g>
    </svg>
  </div>
);

export default function ThreeDEnterpriseAI() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // FIX: 'e' is now typed as a standard DOM MouseEvent to resolve Error 7006
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 15;
      const y = (e.clientY / innerHeight - 0.5) * -15;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[800px] bg-[#FAFAFA] overflow-hidden flex items-center justify-center">
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-100/40 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        className="relative w-full max-w-[1400px] h-full"
        style={{ perspective: "1500px" }}
        animate={{ rotateX: mousePos.y, rotateY: mousePos.x }}
        transition={{ type: "spring", stiffness: 40, damping: 30 }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute left-[8%] top-[12%]"
            style={{ transform: "translateZ(20px)" }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">
              Enterprise
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                Knowledge AI
              </span>
            </h2>
            <p className="text-slate-500 font-medium max-w-xs text-sm leading-relaxed">
              Watch unified data streams map seamlessly into our cognitive
              engine in real-time 3D space.
            </p>
          </div>

          <AnimatedBeams />
          {KNOWLEDGE_SOURCES.map((source) => (
            <FloatingPill key={source.id} data={source} />
          ))}
          <CentralBrain />
          <FloatingChatCard />
        </div>
      </motion.div>
    </section>
  );
}
