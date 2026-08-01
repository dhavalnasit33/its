"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";
import Section from "../Section";
import SectionBadge from "../new-home-components/SectionBadge";

// --- TYPES & DATA ---
interface StepData {
  id: string;
  num: string;
  title: string;
  desc: string;
  imagePath: string;
  color: string;
}

const STEPS: StepData[] = [
  {
    id: "planning",
    num: "01",
    title: "Goal Alignment & Planning",
    desc: "Synthesize high-level business objectives into structured execution plans and prioritized task sequences.",
    imagePath: "/ai-strategy/agentic-ai-development-services/01-planning.png",
    color: "#8B5CF6",
  },
  {
    id: "retrieval",
    num: "02",
    title: "Context & Memory Retrieval",
    desc: "Query vector memory, knowledge graphs, and internal databases for verified company context.",
    imagePath: "/ai-strategy/agentic-ai-development-services/03-memory.png",
    color: "#3B82F6",
  },
  {
    id: "execution",
    num: "03",
    title: "Tool & API Execution",
    desc: "Dynamically select and invoke enterprise software APIs, databases, and custom system connectors.",
    imagePath: "/ai-strategy/agentic-ai-development-services/04-execution.png",
    color: "#F97316",
  },
  {
    id: "validation",
    num: "04",
    title: "Validation & Governance",
    desc: "Enforce compliance guardrails, verify output accuracy, and trigger human-in-the-loop approvals.",
    imagePath: "/ai-strategy/agentic-ai-development-services/05-reflection.png",
    color: "#10B981",
  },
];

// --- COMPONENTS ---

const StepCard = ({
  data,
  index,
  isLast,
}: {
  data: StepData;
  index: number;
  isLast: boolean;
}) => {
  return (
    <div
      className="relative flex items-center shrink-0 mb-8 xl:mb-0"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, z: 0 }}
        animate={{ opacity: 1, y: 0, z: 0 }}
        whileHover={{
          scale: 1.04,
          z: 40, // 3D Pop out effect on hover
          rotateY: -4,
          rotateX: 4,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          opacity: { delay: index * 0.15, duration: 0.6 },
          y: { delay: index * 0.15, duration: 0.6 },
        }}
        className="w-[250px] xl:w-[255px] min-h-[410px] cursor-pointer bg-white/95 backdrop-blur-xl border border-white/80 rounded-[2rem] shadow-[0_10px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_rgba(210,126,43,0.14)] p-5 sm:p-6 flex flex-col items-center text-center relative z-10 hover:z-50 transition-colors duration-300 group"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Step Number Badge */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold mb-3 bg-opacity-10 backdrop-blur-md border border-white/60 pointer-events-none shadow-xs shrink-0"
          style={{
            color: data.color,
            backgroundColor: `${data.color}18`,
            transform: "translateZ(20px)",
          }}
        >
          {data.num}
        </div>

        {/* Title */}
        <h3
          className="text-base font-extrabold text-slate-900 mb-3 leading-snug pointer-events-none min-h-[44px] flex items-center justify-center"
          style={{ transform: "translateZ(25px)" }}
        >
          {data.title}
        </h3>

        {/* 3D Image Area */}
        <div
          className="relative w-28 h-28 my-3 flex items-center justify-center pointer-events-none shrink-0"
          style={{ transform: "translateZ(40px)" }}
        >
          {/* Colored Glow Base */}
          <div
            className="absolute bottom-0 w-24 h-5 rounded-[100%] blur-md opacity-35 mix-blend-multiply transition-opacity group-hover:opacity-60"
            style={{ backgroundColor: data.color }}
          />
          {/* Structural Base Pedestal */}
          <div className="absolute bottom-[-8px] w-24 h-5 border border-slate-200/60 bg-gradient-to-b from-slate-50 to-slate-100/50 rounded-[100%] shadow-[inset_0_-4px_10px_rgba(0,0,0,0.04)]" />

          {/* Continuous Floating Animation for Image */}
          <motion.img
            src={data.imagePath}
            alt={data.title}
            animate={{ y: [-5, 5, -5] }}
            transition={{
              duration: 4 + (index % 2),
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full object-contain relative z-10 drop-shadow-xl"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Description */}
        <p
          className="text-xs sm:text-sm leading-relaxed font-medium text-slate-600 mt-auto pointer-events-none"
          style={{ transform: "translateZ(20px)" }}
        >
          {data.desc}
        </p>
      </motion.div>

      {/* Connecting Arrow */}
      {!isLast && (
        <div
          className="hidden xl:flex w-9 items-center justify-center -mx-0.5 pointer-events-none relative z-0"
          style={{ transform: "translateZ(10px)" }}
        >
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-7.5 h-7.5 rounded-full bg-white border border-[#D27E2B]/25 shadow-md flex items-center justify-center text-[#D27E2B]"
          >
            <FiChevronRight className="w-4 h-4" />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default function AgentDecisionEngine() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 8;
      const y = (e.clientY / innerHeight - 0.5) * -8;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Section className="relative w-full min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center py-24 lg:py-32 overflow-hidden">
      {/* Background Gradients - explicitly set pointer-events-none */}
      <div className="absolute top-[-10%] left-[20%] w-[40vw] h-[40vw] bg-[#D27E2B]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[30vw] h-[30vw] bg-orange-300/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main 3D Container */}
      <motion.div
        className="relative w-full max-w-[1400px] flex flex-col items-center z-10"
        style={{ perspective: "2000px" }}
      >
        <div className="text-center mb-16 max-w-3xl mx-auto pointer-events-none">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <SectionBadge title="Cognitive Reasoning Loop" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-[#0F172A]"
          >
            Agent Cognitive <span className="text-[#D27E2B]">Architecture</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg font-medium max-w-2xl leading-relaxed mt-4 mx-auto"
          >
            How our autonomous AI agents reason, plan, retrieve knowledge, execute software tools, and enforce enterprise governance.
          </motion.p>
        </div>

        {/* 3D Flow Wrapper */}
        <motion.div
          className="relative w-full py-12 px-6 lg:px-12 flex justify-center mt-4"
          animate={{ rotateX: mousePos.y, rotateY: mousePos.x }}
          transition={{ type: "spring", stiffness: 40, damping: 30 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Responsive CSS-based Loop Border */}
          <div className="hidden xl:block absolute inset-0 border-2 border-dashed border-[#D27E2B]/30 rounded-[3.5rem] pointer-events-none z-0 shadow-[inset_0_0_30px_rgba(210,126,43,0.03)]" />

          {/* Animated Glows on the loop line - Added pointer-events-none to prevent blocking hovers */}
          <motion.div
            className="hidden xl:block absolute top-[-2px] left-[20%] w-[250px] h-[4px] bg-gradient-to-r from-transparent via-[#D27E2B] to-transparent z-0 blur-[2px] pointer-events-none"
            animate={{ left: ["5%", "85%", "5%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="hidden xl:block absolute bottom-[-2px] right-[20%] w-[250px] h-[4px] bg-gradient-to-r from-transparent via-orange-400 to-transparent z-0 blur-[2px] pointer-events-none"
            animate={{ right: ["5%", "85%", "5%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          {/* Cards Flex Row */}
          <div
            className="flex flex-wrap xl:flex-nowrap items-center justify-center gap-6 xl:gap-0 relative z-10 w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {STEPS.map((step, i) => (
              <StepCard
                key={step.id}
                data={step}
                index={i}
                isLast={i === STEPS.length - 1}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
