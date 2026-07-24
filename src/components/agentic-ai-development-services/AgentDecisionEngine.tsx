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
    title: "Goal & Planning",
    desc: "Define the objective and formulate a strategic, high-level plan.",
    imagePath: "/ai-strategy/agentic-ai-development-services/01-planning.png",
    color: "#8B5CF6",
  },
  {
    id: "breakdown",
    num: "02",
    title: "Task Breakdown",
    desc: "Decompose complex plans into manageable, actionable steps.",
    imagePath: "/ai-strategy/agentic-ai-development-services/02-breakdown.png",
    color: "#3B82F6",
  },
  {
    id: "memory",
    num: "03",
    title: "Memory & Context",
    desc: "Retrieve relevant knowledge and past experiences for context.",
    imagePath: "/ai-strategy/agentic-ai-development-services/03-memory.png",
    color: "#06B6D4",
  },
  {
    id: "execution",
    num: "04",
    title: "Tool Execution",
    desc: "Select appropriate APIs and autonomously execute the tasks.",
    imagePath: "/ai-strategy/agentic-ai-development-services/04-execution.png",
    color: "#F97316",
  },
  {
    id: "reflection",
    num: "05",
    title: "Learn & Reflect",
    desc: "Evaluate task outcomes to continuously optimize future actions.",
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
          scale: 1.05,
          z: 40, // 3D Pop out effect on hover
          rotateY: -5,
          rotateX: 5,
        }}
        // FIX: Applied delay ONLY to the initial mount animations (opacity & y),
        // so hover happens instantly without glitches/delays causing the arrow to flicker.
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          opacity: { delay: index * 0.15, duration: 0.6 },
          y: { delay: index * 0.15, duration: 0.6 },
        }}
        // FIX: Moved hover:z-50 directly to the card so it properly stays on top of the arrow
        className="w-[230px] h-[330px] cursor-pointer bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(210,126,43,0.12)] p-6 flex flex-col items-center text-center relative z-10 hover:z-50 transition-colors duration-300 group"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Step Number */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold mb-5 bg-opacity-10 backdrop-blur-md border border-white/50 pointer-events-none"
          style={{
            color: data.color,
            backgroundColor: `${data.color}15`,
            transform: "translateZ(20px)",
          }}
        >
          {data.num}
        </div>

        {/* Title */}
        <h3
          className="text-[15px] font-bold text-slate-800 mb-5 pointer-events-none"
          style={{ transform: "translateZ(25px)" }}
        >
          {data.title}
        </h3>

        {/* 3D Image Area */}
        <div
          className="relative w-28 h-28 mb-6 flex items-center justify-center pointer-events-none"
          style={{ transform: "translateZ(40px)" }}
        >
          {/* Colored Glow Base */}
          <div
            className="absolute bottom-0 w-24 h-5 rounded-[100%] blur-md opacity-30 mix-blend-multiply transition-opacity group-hover:opacity-50"
            style={{ backgroundColor: data.color }}
          />
          {/* Structural Base Pedestal */}
          <div className="absolute bottom-[-10px] w-24 h-5 border border-slate-200/60 bg-gradient-to-b from-slate-50 to-slate-100/50 rounded-[100%] shadow-[inset_0_-4px_10px_rgba(0,0,0,0.04)]" />

          {/* Continuous Floating Animation for Image */}
          <motion.img
            src={data.imagePath}
            alt={data.title}
            animate={{ y: [-6, 6, -6] }}
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
          className="text-xs leading-relaxed font-medium text-slate-500 mt-auto pointer-events-none"
          style={{ transform: "translateZ(20px)" }}
        >
          {data.desc}
        </p>
      </motion.div>

      {/* Connecting Arrow */}
      {!isLast && (
        <div
          className="hidden xl:flex w-10 items-center justify-center -mx-2 pointer-events-none relative z-0"
          style={{ transform: "translateZ(10px)" }}
        >
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-7 h-7 rounded-full bg-white border border-[#D27E2B]/20 shadow-md flex items-center justify-center text-[#D27E2B]"
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
            className="inline-block mb-4"
          >
            <SectionBadge title="Autonomous Thinking Flow" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-[#0F172A]"
          >
            Agent Decision <span className="text-[#D27E2B]"> Engine</span>
          </motion.h2>
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
