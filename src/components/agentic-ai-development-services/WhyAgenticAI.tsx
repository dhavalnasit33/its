"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  LuShieldCheck,
  LuBrain,
  LuLayers,
  LuLightbulb,
  LuListChecks,
  LuUserCheck,
  LuLock,
} from "react-icons/lu";
import Section from "../Section";
import Row from "../Row";
import SectionBadge from "../new-home-components/SectionBadge";

// ==========================================
// 1. DATA CONFIGURATION
// ==========================================

const FEATURES_LEFT = [
  {
    id: "auto-decision",
    title: "Autonomous\nDecision Making",
    description:
      "AI agents analyze data, evaluate scenarios, and make decisions — without constant human intervention.",
    imageSrc: "/assets/images/brain-icon.png",
    icon: LuBrain,
    delay: 0.1,
    yPos: "20%",
  },
  {
    id: "tool-integration",
    title: "Enterprise\nTool Integration",
    description:
      "Seamlessly connects with your existing systems, APIs, and databases to get work done across your ecosystem.",
    imageSrc: "/assets/images/puzzle-icon.png",
    icon: LuLayers,
    delay: 0.3,
    yPos: "50%",
  },
  {
    id: "continuous-learning",
    title: "Continuous\nLearning",
    description:
      "Agents learn from outcomes, adapt to changes, and improve performance over time.",
    imageSrc: "/assets/images/bulb-icon.png",
    icon: LuLightbulb,
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
    imageSrc: "/assets/images/checklist-icon.png",
    icon: LuListChecks,
    delay: 0.2,
    yPos: "20%",
  },
  {
    id: "human-approval",
    title: "Human\nApproval Workflows",
    description:
      "Built-in checkpoints and approval layers ensure humans stay in control where it matters most.",
    imageSrc: "/assets/images/human-shield-icon.png",
    icon: LuUserCheck,
    delay: 0.4,
    yPos: "50%",
  },
  {
    id: "enterprise-security",
    title: "Enterprise\nSecurity",
    description:
      "Built with enterprise-grade security, compliance, and data privacy at every layer.",
    imageSrc: "/assets/images/lock-icon.png",
    icon: LuLock,
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
        {/* Dynamic Dashed Lines */}
        <g stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 6">
          {/* Top Left */}
          <path d="M 28% 22% Q 40% 30% 50% 50%" fill="none" />
          <circle cx="28%" cy="22%" r="3" fill="#D27E2B" />

          {/* Middle Left */}
          <path d="M 25% 50% L 50% 50%" fill="none" />
          <circle cx="25%" cy="50%" r="3" fill="#D27E2B" />

          {/* Bottom Left */}
          <path d="M 28% 78% Q 40% 70% 50% 50%" fill="none" />
          <circle cx="28%" cy="78%" r="3" fill="#D27E2B" />

          {/* Top Right */}
          <path d="M 72% 22% Q 60% 30% 50% 50%" fill="none" />
          <circle cx="72%" cy="22%" r="3" fill="#D27E2B" />

          {/* Middle Right */}
          <path d="M 75% 50% L 50% 50%" fill="none" />
          <circle cx="75%" cy="50%" r="3" fill="#D27E2B" />

          {/* Bottom Right */}
          <path d="M 72% 78% Q 60% 70% 50% 50%" fill="none" />
          <circle cx="72%" cy="78%" r="3" fill="#D27E2B" />
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

// Node Icon/Image Component with Fallback
function FeatureIcon({ imageSrc, IconComponent }: { imageSrc: string; IconComponent: React.ElementType }) {
  const [imgError, setImgError] = React.useState(false);

  if (!imgError && imageSrc) {
    return (
      <img
        src={imageSrc}
        alt="Feature Icon"
        onError={() => setImgError(true)}
        className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-md"
      />
    );
  }

  return <IconComponent className="w-7 h-7 text-[#D27E2B]" />;
}

// ==========================================
// 4. MAIN COMPONENT
// ==========================================

export default function WhyAgenticAI() {
  return (
    <Section className="relative w-full overflow-hidden bg-slate-50/70 border-t border-slate-200/70 py-20 lg:py-28 text-slate-900">
      {/* Light Theme Brand Warm Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[800px] h-[800px] bg-gradient-to-br from-orange-100/50 via-amber-50/40 to-transparent rounded-full blur-[120px] opacity-60" />
      </div>

      <Row>
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-24 max-w-3xl mx-auto relative z-10 flex flex-col items-center gap-3">
          <SectionBadge title="WHY BUSINESSES TRUST AGENTIC AI" />

          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold leading-tight tracking-tight text-[#0F172A]">
            Why Businesses <span className="text-[#D27E2B]">Choose Agentic AI</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            Agentic AI goes beyond passive automation — it reasons, plans, decides, and executes complex enterprise workflows autonomously with full human oversight.
          </p>
        </div>

        {/* Radial 3D Layout Section */}
        <div className="relative w-full max-w-[1400px] mx-auto">
          <ParallaxContainer>
            <ConnectionLines />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-8 items-center w-full relative z-10">
              {/* Left Column Nodes */}
              <div className="flex flex-col gap-10 lg:gap-16 relative">
                {FEATURES_LEFT.map((feature) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: feature.delay }}
                    className="flex flex-row items-center gap-6 group lg:justify-end text-left lg:text-right"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="order-2 lg:order-1 flex-1">
                      <h3 className="text-base sm:text-lg font-black text-[#0F172A] mb-2 whitespace-pre-line leading-snug group-hover:text-[#D27E2B] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-[280px] ml-0 lg:ml-auto">
                        {feature.description}
                      </p>
                      <div className="w-10 h-[2.5px] bg-slate-200 mt-3 ml-0 lg:ml-auto group-hover:bg-[#D27E2B] transition-colors duration-300 rounded-full" />
                    </div>

                    {/* Left Node 3D Image Base */}
                    <motion.div
                      whileHover={{ scale: 1.08, translateZ: 25 }}
                      className="order-1 lg:order-2 w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-2xl flex items-center justify-center bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-[#D27E2B]/50 transition-all relative z-10"
                    >
                      <FeatureIcon imageSrc={feature.imageSrc} IconComponent={feature.icon} />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Central Core Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto my-8 lg:my-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Outer soft glow behind core */}
                <div className="absolute inset-6 bg-orange-400/20 rounded-full blur-[40px]" />

                <motion.div
                  whileHover={{ scale: 1.05, translateZ: 35 }}
                  className="relative z-10 w-full h-full flex items-center justify-center p-4"
                >
                  <img
                    src="/ai-strategy/agentic-ai-development-services/central-ai-core.png"
                    alt="Central AI Engine"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                    className="w-full h-full object-contain drop-shadow-[0_15px_35px_rgba(210,126,43,0.2)]"
                  />
                </motion.div>
              </motion.div>

              {/* Right Column Nodes */}
              <div className="flex flex-col gap-10 lg:gap-16 relative">
                {FEATURES_RIGHT.map((feature) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: feature.delay }}
                    className="flex flex-row items-center gap-6 group text-left"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Right Node 3D Image Base */}
                    <motion.div
                      whileHover={{ scale: 1.08, translateZ: 25 }}
                      className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-2xl flex items-center justify-center bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-[#D27E2B]/50 transition-all relative z-10"
                    >
                      <FeatureIcon imageSrc={feature.imageSrc} IconComponent={feature.icon} />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-black text-[#0F172A] mb-2 whitespace-pre-line leading-snug group-hover:text-[#D27E2B] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-[280px]">
                        {feature.description}
                      </p>
                      <div className="w-10 h-[2.5px] bg-slate-200 mt-3 group-hover:bg-[#D27E2B] transition-colors duration-300 rounded-full" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ParallaxContainer>

          {/* Bottom Floating Assurance Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 mx-auto max-w-2xl bg-white border border-slate-200/90 rounded-2xl p-5 sm:px-8 shadow-xs hover:shadow-md hover:border-[#D27E2B]/50 transition-all flex items-center justify-center gap-4 relative z-20"
          >
            <div className="w-11 h-11 shrink-0 rounded-xl bg-[#D27E2B] flex items-center justify-center text-white shadow-xs">
              <LuShieldCheck className="w-6 h-6" />
            </div>
            <p className="text-xs sm:text-sm md:text-base text-slate-700 font-extrabold leading-snug">
              Agentic AI empowers your enterprise to operate smarter, make faster decisions, and scale operations with 100% governance.
            </p>
          </motion.div>
        </div>
      </Row>
    </Section>
  );
}
