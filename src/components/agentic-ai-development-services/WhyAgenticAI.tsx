"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LuShieldCheck } from "react-icons/lu";
import Section from "../Section";

// ==========================================
// 1. DATA CONFIGURATION (With Image Paths)
// ==========================================

const FEATURES_LEFT = [
  {
    id: "auto-decision",
    title: "Autonomous\nDecision Making",
    description:
      "AI agents analyze data, evaluate scenarios, and make decisions — without constant human intervention.",
    imageSrc: "/assets/images/brain-icon.png", // UPDATE: Path to the head/brain 3D icon
    delay: 0.1,
    yPos: "20%",
  },
  {
    id: "tool-integration",
    title: "Enterprise\nTool Integration",
    description:
      "Seamlessly connects with your existing systems, APIs, and databases to get work done across your ecosystem.",
    imageSrc: "/assets/images/puzzle-icon.png", // UPDATE: Path to the puzzle 3D icon
    delay: 0.3,
    yPos: "50%",
  },
  {
    id: "continuous-learning",
    title: "Continuous\nLearning",
    description:
      "Agents learn from outcomes, adapt to changes, and improve performance over time.",
    imageSrc: "/assets/images/bulb-icon.png", // UPDATE: Path to the lightbulb 3D icon
    delay: 0.5,
    yPos: "80%",
  },
];

const FEATURES_RIGHT = [
  {
    id: "multi-step",
    title: "Multi-Step\nTask Execution",
    description:
      "Handles complex workflows from start to finish — breaking down goals into actions and delivering results.",
    imageSrc: "/assets/images/checklist-icon.png", // UPDATE: Path to the checklist 3D icon
    delay: 0.2,
    yPos: "20%",
  },
  {
    id: "human-approval",
    title: "Human\nApproval Workflows",
    description:
      "Built-in checkpoints and approval layers ensure humans stay in control where it matters most.",
    imageSrc: "/assets/images/human-shield-icon.png", // UPDATE: Path to the user/shield 3D icon
    delay: 0.4,
    yPos: "50%",
  },
  {
    id: "enterprise-security",
    title: "Enterprise\nSecurity",
    description:
      "Built with enterprise-grade security, compliance, and data privacy at every layer.",
    imageSrc: "/assets/images/lock-icon.png", // UPDATE: Path to the lock/shield 3D icon
    delay: 0.6,
    yPos: "80%",
  },
];

// ==========================================
// 2. 3D CAMERA PARALLAX WRAPPER
// ==========================================

function ParallaxContainer({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400, mass: 0.5 });

  const rotateX = useTransform(smoothY, [-1, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [-1, 1], [-4, 4]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="w-full relative flex flex-col items-center justify-center"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "2000px",
      }}
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// 3. BACKGROUND CONNECTIONS (SVG PATHS)
// ==========================================

const ConnectionLines = () => {
  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block z-0">
      <svg className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="line-fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CBD5E1" stopOpacity="0" />
            <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Dynamic Dashed Lines */}
        <g stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 6">
          {/* Top Left */}
          <path d="M 28% 22% Q 40% 30% 50% 50%" fill="none" />
          <circle cx="28%" cy="22%" r="2" fill="#3B82F6" />

          {/* Middle Left */}
          <path d="M 25% 50% L 50% 50%" fill="none" />
          <circle cx="25%" cy="50%" r="2" fill="#3B82F6" />

          {/* Bottom Left */}
          <path d="M 28% 78% Q 40% 70% 50% 50%" fill="none" />
          <circle cx="28%" cy="78%" r="2" fill="#3B82F6" />

          {/* Top Right */}
          <path d="M 72% 22% Q 60% 30% 50% 50%" fill="none" />
          <circle cx="72%" cy="22%" r="2" fill="#3B82F6" />

          {/* Middle Right */}
          <path d="M 75% 50% L 50% 50%" fill="none" />
          <circle cx="75%" cy="50%" r="2" fill="#3B82F6" />

          {/* Bottom Right */}
          <path d="M 72% 78% Q 60% 70% 50% 50%" fill="none" />
          <circle cx="72%" cy="78%" r="2" fill="#3B82F6" />
        </g>

        {/* Orbital decorative rings in center */}
        <circle
          cx="50%"
          cy="50%"
          r="14%"
          fill="none"
          stroke="#F1F5F9"
          strokeWidth="1"
        />
        <circle
          cx="50%"
          cy="50%"
          r="18%"
          fill="none"
          stroke="#F8FAFC"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>
    </div>
  );
};

// ==========================================
// 4. MAIN COMPONENT
// ==========================================

export default function WhyAgenticAI() {
  return (
    <Section className="relative w-full overflow-hidden bg-white py-24">
      {/* Light Theme Abstract Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] opacity-60" />
      </div>

      {/* Header Section */}
      <div className="text-center mb-24 max-w-4xl mx-auto relative z-10 px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-blue-50/80 border border-blue-100 text-blue-600 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em]"
        >
          WHY BUSINESSES TRUST AGENTIC AI
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-[52px] font-bold text-[#0F172A] leading-tight mb-6 tracking-tight"
        >
          Why Businesses <br />
          <span className="text-blue-600">Choose Agentic AI</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto"
        >
          Agentic AI goes beyond automation — it thinks, decides, and acts.
          Built for enterprises that demand intelligence, control, and
          real-world impact.
        </motion.p>
      </div>

      {/* Radial 3D Layout Section */}
      <div className="relative w-full max-w-[1400px] mx-auto px-4 lg:px-8">
        <ParallaxContainer>
          <ConnectionLines />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-8 items-center w-full relative z-10">
            {/* Left Column Nodes (Text aligns right, Icon on right) */}
            <div className="flex flex-col gap-10 lg:gap-20 relative">
              {FEATURES_LEFT.map((feature, i) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: feature.delay }}
                  className="flex flex-row items-center gap-6 group lg:justify-end text-left lg:text-right"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="order-2 lg:order-1 flex-1">
                    <h3 className="text-[17px] md:text-lg font-bold text-slate-800 mb-2 whitespace-pre-line leading-snug group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-[280px] ml-0 lg:ml-auto">
                      {feature.description}
                    </p>
                    <div className="w-10 h-[2px] bg-slate-200 mt-4 ml-0 lg:ml-auto group-hover:bg-blue-600 transition-colors duration-300" />
                  </div>

                  {/* Left Node 3D Image Base */}
                  <motion.div
                    whileHover={{ scale: 1.08, translateZ: 30 }}
                    className="order-1 lg:order-2 w-24 h-24 md:w-[110px] md:h-[110px] shrink-0 rounded-full flex items-center justify-center bg-white border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.06)] relative z-10"
                  >
                    <div className="absolute inset-2 rounded-full border border-slate-50" />
                    <img
                      src={feature.imageSrc}
                      alt={feature.title.replace("\n", " ")}
                      className="w-16 h-16 md:w-[72px] md:h-[72px] object-contain drop-shadow-xl"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Central Core Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring" }}
              className="relative w-64 h-64 md:w-96 md:h-96 mx-auto my-16 lg:my-0 flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Outer soft glow behind the core */}
              <div className="absolute inset-10 bg-blue-400/20 rounded-full blur-[50px]" />

              <motion.div
                whileHover={{ scale: 1.05, translateZ: 50 }}
                className="relative z-10 w-full h-full flex items-center justify-center"
              >
                {/* Central AI Base Image */}
                <img
                  src="/ai-strategy/agentic-ai-development-services/central-ai-core.png" // UPDATE: Path to the central 3D cylinder/AI core
                  alt="Central AI Engine"
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(59,130,246,0.15)]"
                />
              </motion.div>
            </motion.div>

            {/* Right Column Nodes (Icon on left, Text aligns left) */}
            <div className="flex flex-col gap-10 lg:gap-20 relative">
              {FEATURES_RIGHT.map((feature, i) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: feature.delay }}
                  className="flex flex-row items-center gap-6 group text-left"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Right Node 3D Image Base */}
                  <motion.div
                    whileHover={{ scale: 1.08, translateZ: 30 }}
                    className="w-24 h-24 md:w-[110px] md:h-[110px] shrink-0 rounded-full flex items-center justify-center bg-white border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.06)] relative z-10"
                  >
                    <div className="absolute inset-2 rounded-full border border-slate-50" />
                    <img
                      src={feature.imageSrc}
                      alt={feature.title.replace("\n", " ")}
                      className="w-16 h-16 md:w-[72px] md:h-[72px] object-contain drop-shadow-xl"
                    />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-[17px] md:text-lg font-bold text-slate-800 mb-2 whitespace-pre-line leading-snug group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-[280px]">
                      {feature.description}
                    </p>
                    <div className="w-10 h-[2px] bg-slate-200 mt-4 group-hover:bg-blue-600 transition-colors duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ParallaxContainer>

        {/* Bottom Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 mx-auto max-w-[700px] bg-white border border-slate-100 rounded-2xl p-4 md:py-5 md:px-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] flex items-center justify-center gap-4 relative z-20 transition-all hover:shadow-[0_20px_60px_rgba(59,130,246,0.1)]"
        >
          <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <LuShieldCheck className="w-6 h-6" />
          </div>
          <p className="text-[15px] md:text-base text-slate-600 font-medium">
            Agentic AI empowers your business to operate smarter, move faster,
            and scale with confidence.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
