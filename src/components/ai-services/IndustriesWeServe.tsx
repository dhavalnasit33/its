"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuHeartPulse,
  LuLandmark,
  LuShoppingCart,
  LuFactory,
  LuGraduationCap,
  LuTruck,
  LuShield,
  LuBuilding,
  LuChevronRight,
} from "react-icons/lu";

import Section from "../Section";
import Row from "../Row";
import SectionBadge from "../new-home-components/SectionBadge";

// --- Mathematically Aligned Data Structure ---
// Slope logic: Each tier increases by 100px width (50px per side).
// Standard tier height is 64px.
// Top tier height is calculated to complete the perfect triangle point.
const TIERS = [
  {
    id: "healthcare",
    label: "Healthcare",
    icon: LuHeartPulse,
    width: "260px",
    height: "140px", // Taller to form a perfect point without cutting text
    data: {
      subtitle: "INDUSTRY",
      title: "Healthcare",
      description:
        "AI-powered solutions that enhance patient care, streamline operations, and accelerate medical innovation.",
      bullets: [
        "Predictive Diagnostics",
        "Patient Experience",
        "Operational Efficiency",
        "Health Data Intelligence",
      ],
    },
  },
  {
    id: "finance",
    label: "Finance",
    icon: LuLandmark,
    width: "360px",
    height: "64px",
    data: {
      subtitle: "INDUSTRY",
      title: "Finance",
      description:
        "Advanced algorithmic trading, risk assessment, and automated fraud detection systems powered by deep learning.",
      bullets: [
        "Algorithmic Trading",
        "Fraud Detection",
        "Risk Assessment",
        "Automated Compliance",
      ],
    },
  },
  {
    id: "retail",
    label: "Retail & Ecommerce",
    icon: LuShoppingCart,
    width: "460px",
    height: "64px",
    data: {
      subtitle: "INDUSTRY",
      title: "Retail & Ecommerce",
      description:
        "Hyper-personalized shopping experiences, dynamic pricing, and intelligent inventory forecasting.",
      bullets: [
        "Personalized Recommendations",
        "Demand Forecasting",
        "Dynamic Pricing",
        "Automated Support",
      ],
    },
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    icon: LuFactory,
    width: "560px",
    height: "64px",
    data: {
      subtitle: "INDUSTRY",
      title: "Manufacturing",
      description:
        "Predictive maintenance, computer vision quality control, and fully autonomous supply chain optimization.",
      bullets: [
        "Predictive Maintenance",
        "Quality Control AI",
        "Supply Chain Analytics",
        "Robotics Automation",
      ],
    },
  },
  {
    id: "edu-log",
    isSplit: true,
    left: { id: "education", label: "Education", icon: LuGraduationCap },
    right: { id: "logistics", label: "Logistics", icon: LuTruck },
    width: "660px",
    height: "64px",
    data: {
      subtitle: "SECTORS",
      title: "Education & Logistics",
      description:
        "Smart adaptive learning platforms alongside AI-driven route optimization and fleet management.",
      bullets: [
        "Adaptive Learning",
        "Route Optimization",
        "Student Analytics",
        "Fleet Management",
      ],
    },
  },
  {
    id: "insurance",
    label: "Insurance",
    icon: LuShield,
    width: "760px",
    height: "64px",
    data: {
      subtitle: "INDUSTRY",
      title: "Insurance",
      description:
        "Automated claims processing, intelligent underwriting, and real-time damage assessment via computer vision.",
      bullets: [
        "Claims Automation",
        "Risk Underwriting",
        "Damage Assessment",
        "Customer Portals",
      ],
    },
  },
  {
    id: "realestate",
    label: "Real Estate",
    icon: LuBuilding,
    width: "860px",
    height: "64px",
    data: {
      subtitle: "INDUSTRY",
      title: "Real Estate",
      description:
        "Predictive property valuations, automated smart building management, and virtual AI staging.",
      bullets: [
        "Property Valuation",
        "Smart Buildings",
        "Market Predictions",
        "Virtual Staging",
      ],
    },
  },
];

export default function AIPyramidEcosystem() {
  const [activeTierId, setActiveTierId] = useState("healthcare");

  const activeData =
    TIERS.find(
      (t) =>
        t.id === activeTierId ||
        (t.isSplit &&
          (activeTierId === "education" || activeTierId === "logistics")),
    )?.data ?? TIERS[0].data!;

  const activeIndex = TIERS.findIndex(
    (t) =>
      t.id === activeTierId ||
      (t.isSplit &&
        (activeTierId === "education" || activeTierId === "logistics")),
  );

  // Dynamic Y coordinates for the connecting line based on heights
  const PYRAMID_Y_COORDS = [90, 190, 245, 310, 375, 440, 510];
  const lineStartY = PYRAMID_Y_COORDS[activeIndex] || 310;

  return (
    <Section className="relative w-full min-h-screen bg-[#02050A] overflow-hidden flex items-center justify-center py-20 lg:py-0">
      <Row>
        <div className="flex flex-col items-center relative z-10 w-full">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SectionBadge title="Industries We Serve" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-white text-4xl md:text-5xl font-light tracking-wide"
            >
              AI Solutions Tailored for{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Every Industry
              </span>
            </motion.h2>
          </div>

          {/* Background Grid */}
          <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-30">
            <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_15%,transparent_80%)]" />
          </div>

          <div className="relative z-10 w-full max-w-[1500px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-8">
            {/* --- LEFT: HOLOGRAPHIC 3D PYRAMID --- */}
            <div
              className="relative flex flex-col items-center justify-center w-full xl:w-[60%] flex-shrink-0"
              style={{ perspective: "1800px" }}
            >
              {/* Central Core Glow */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-[10%] bottom-[5%] w-[2px] z-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(255,100,0,.6), transparent)",
                  boxShadow: "0 0 30px 5px rgba(255,120,0,0.3)",
                  filter: "blur(2px)",
                }}
              />

              <div
                className="flex flex-col items-center relative z-20"
                style={{
                  gap: "2px",
                  transformStyle: "preserve-3d",
                  transform: "rotateX(12deg)", // Perfect 3D tilt
                }}
              >
                {TIERS.map((tier, index) => {
                  const isTopTier = index === 0;

                  if (tier.isSplit) {
                    const isLeftActive = activeTierId === tier.left?.id;
                    const isRightActive = activeTierId === tier.right?.id;

                    return (
                      <div
                        key={tier.id}
                        className="relative flex gap-[2px] z-10"
                        style={{ width: tier.width, height: tier.height }}
                      >
                        {/* Left Half Split (Education) */}
                        <motion.div
                          onClick={() => setActiveTierId(tier.left!.id)}
                          animate={{
                            z: isLeftActive ? 30 : 0,
                            scale: isLeftActive ? 1.02 : 1,
                          }}
                          className={`relative w-full h-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                            isLeftActive
                              ? "z-30"
                              : "hover:brightness-125 hover:-translate-y-0.5 z-10"
                          }`}
                          style={{
                            clipPath:
                              "polygon(50px 0, 100% 0, 100% 100%, 0 100%)",
                            background: isLeftActive
                              ? "linear-gradient(180deg, rgba(255,120,20,0.3) 0%, rgba(255,50,0,0.6) 100%)"
                              : "linear-gradient(180deg, rgba(18, 32, 54, 0.95) 0%, rgba(10, 18, 30, 0.98) 100%)",
                            boxShadow: isLeftActive
                              ? "inset 0 2px 3px rgba(255,255,255,0.4), inset 0 -4px 20px rgba(255,100,0,0.8), 0 0 25px rgba(255,100,0,0.4)"
                              : "inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -2px 8px rgba(0,200,255,0.08), 0 8px 16px rgba(0,0,0,0.6), 0 0 12px rgba(6,182,212,0.12)",
                            border: isLeftActive
                              ? "1px solid rgba(255,180,80,0.9)"
                              : "1px solid rgba(56, 189, 248, 0.25)",
                            backdropFilter: "blur(12px)",
                            zIndex: isLeftActive ? 30 : 1,
                          }}
                        >
                          {!isLeftActive && (
                            <div
                              className="absolute top-0 left-0 w-full h-[1px] pointer-events-none opacity-40"
                              style={{
                                background:
                                  "linear-gradient(90deg, transparent, rgba(125,211,252,0.8), transparent)",
                              }}
                            />
                          )}
                          <div
                            className={`relative z-30 flex items-center gap-3 transition-colors ${
                              isLeftActive
                                ? "text-white drop-shadow-[0_0_12px_rgba(255,200,50,1)]"
                                : "text-slate-300 drop-shadow-[0_0_6px_rgba(0,180,255,0.3)]"
                            }`}
                          >
                            <tier.left.icon
                              className={`w-5 h-5 ${
                                isLeftActive
                                  ? "animate-pulse text-orange-200"
                                  : "text-cyan-400/80"
                              }`}
                            />
                            <span className="font-bold text-xs tracking-[0.2em] uppercase">
                              {tier.left?.label}
                            </span>
                          </div>
                        </motion.div>

                        {/* Right Half Split (Logistics) */}
                        <motion.div
                          onClick={() => setActiveTierId(tier.right!.id)}
                          animate={{
                            z: isRightActive ? 30 : 0,
                            scale: isRightActive ? 1.02 : 1,
                          }}
                          className={`relative w-full h-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                            isRightActive
                              ? "z-30"
                              : "hover:brightness-125 hover:-translate-y-0.5 z-10"
                          }`}
                          style={{
                            clipPath:
                              "polygon(0 0, calc(100% - 50px) 0, 100% 100%, 0 100%)",
                            background: isRightActive
                              ? "linear-gradient(180deg, rgba(255,120,20,0.3) 0%, rgba(255,50,0,0.6) 100%)"
                              : "linear-gradient(180deg, rgba(18, 32, 54, 0.95) 0%, rgba(10, 18, 30, 0.98) 100%)",
                            boxShadow: isRightActive
                              ? "inset 0 2px 3px rgba(255,255,255,0.4), inset 0 -4px 20px rgba(255,100,0,0.8), 0 0 25px rgba(255,100,0,0.4)"
                              : "inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -2px 8px rgba(0,200,255,0.08), 0 8px 16px rgba(0,0,0,0.6), 0 0 12px rgba(6,182,212,0.12)",
                            border: isRightActive
                              ? "1px solid rgba(255,180,80,0.9)"
                              : "1px solid rgba(56, 189, 248, 0.25)",
                            backdropFilter: "blur(12px)",
                            zIndex: isRightActive ? 30 : 1,
                          }}
                        >
                          {!isRightActive && (
                            <div
                              className="absolute top-0 left-0 w-full h-[1px] pointer-events-none opacity-40"
                              style={{
                                background:
                                  "linear-gradient(90deg, transparent, rgba(125,211,252,0.8), transparent)",
                              }}
                            />
                          )}
                          <div
                            className={`relative z-30 flex items-center gap-3 transition-colors ${
                              isRightActive
                                ? "text-white drop-shadow-[0_0_12px_rgba(255,200,50,1)]"
                                : "text-slate-300 drop-shadow-[0_0_6px_rgba(0,180,255,0.3)]"
                            }`}
                          >
                            <tier.right.icon
                              className={`w-5 h-5 ${
                                isRightActive
                                  ? "animate-pulse text-orange-200"
                                  : "text-cyan-400/80"
                              }`}
                            />
                            <span className="font-bold text-xs tracking-[0.2em] uppercase">
                              {tier.right?.label}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    );
                  }

                  const isActive = activeTierId === tier.id;

                  return (
                    <motion.div
                      key={tier.id}
                      onClick={() => setActiveTierId(tier.id)}
                      animate={{
                        z: isActive ? 35 : 0,
                        scale: isActive ? 1.02 : 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 25,
                      }}
                      className={`relative flex justify-center cursor-pointer transition-all duration-300 pointer-events-auto select-none ${
                        isTopTier ? "items-end pb-4" : "items-center"
                      } ${isActive ? "z-40" : "hover:brightness-125 hover:-translate-y-0.5 z-10"}`}
                      style={{
                        width: tier.width,
                        height: tier.height,
                        clipPath: isTopTier
                          ? "polygon(50% 0%, 100% 100%, 0% 100%)"
                          : "polygon(50px 0, calc(100% - 50px) 0, 100% 100%, 0% 100%)",
                        background: isActive
                          ? "linear-gradient(180deg, rgba(255,120,20,0.3) 0%, rgba(255,50,0,0.6) 100%)"
                          : "linear-gradient(180deg, rgba(18, 32, 54, 0.95) 0%, rgba(10, 18, 30, 0.98) 100%)",
                        boxShadow: isActive
                          ? "inset 0 2px 3px rgba(255,255,255,0.4), inset 0 -4px 20px rgba(255,80,0,0.8), 0 20px 30px -5px rgba(255,60,0,0.5)"
                          : "inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -2px 8px rgba(0,200,255,0.08), 0 8px 16px rgba(0,0,0,0.6), 0 0 12px rgba(6,182,212,0.12)",
                        border: isActive
                          ? "1px solid rgba(255,180,80,0.9)"
                          : "1px solid rgba(56, 189, 248, 0.25)",
                        backdropFilter: "blur(16px)",
                        zIndex: isActive ? 40 : 10 - index,
                      }}
                    >
                      {/* Full hit-area overlay to ensure clicks work across the ENTIRE trapezoid shape */}
                      <div className="absolute inset-0 w-full h-full cursor-pointer z-20 pointer-events-auto" />

                      {/* Optional Top Specular Line for Inactive Tiers */}
                      {!isActive && (
                        <div
                          className="absolute top-0 left-0 w-full h-[1px] pointer-events-none opacity-40"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, rgba(125,211,252,0.8), transparent)",
                          }}
                        />
                      )}

                      {isActive && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-1/2 rounded-[100%] bg-orange-500/40 blur-2xl pointer-events-none" />
                      )}

                      <div
                        className={`relative z-30 flex items-center gap-3 pointer-events-none ${
                          isActive
                            ? "text-white drop-shadow-[0_0_12px_rgba(255,200,50,1)]"
                            : "text-slate-300 drop-shadow-[0_0_6px_rgba(0,180,255,0.3)]"
                        }`}
                      >
                        {tier.icon && (
                          <tier.icon
                            className={`w-5 h-5 ${isActive ? "animate-pulse text-orange-200" : "text-cyan-400/80"}`}
                          />
                        )}
                        <span className="font-bold text-[13px] tracking-[0.25em] uppercase">
                          {tier.label}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* --- RIGHT: DATA PANEL --- */}
            <div className="relative w-full xl:w-[40%] flex-shrink-0 z-20 mt-16 xl:mt-0 xl:pl-6">
              {/* Connecting Holographic Line */}
              <div className="hidden xl:block absolute -left-[60px] top-1/2 -translate-y-1/2 w-[100px] h-[600px] pointer-events-none z-0">
                <svg width="100%" height="100%" className="overflow-visible">
                  <motion.path
                    initial={false}
                    animate={{
                      d: `M -20 ${lineStartY} L 40 ${lineStartY} L 50 160 L 100 160`,
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 25 }}
                    fill="none"
                    stroke="#ff5a00"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                    className="drop-shadow-[0_0_8px_#ff5a00]"
                  />
                  <motion.circle
                    animate={{ cy: lineStartY }}
                    transition={{ type: "spring", stiffness: 120, damping: 25 }}
                    cx="-20"
                    r="4"
                    fill="#fff"
                    stroke="#ff5a00"
                    strokeWidth="2"
                    className="drop-shadow-[0_0_8px_#ff5a00]"
                  />
                </svg>
              </div>

              {/* Data Content Box */}
              <div className="relative w-full max-w-[550px] min-h-[380px] flex items-start pt-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTierId}
                    initial={{
                      opacity: 0,
                      filter: "blur(15px)",
                      x: 30,
                      rotateY: 10,
                    }}
                    animate={{
                      opacity: 1,
                      filter: "blur(0px)",
                      x: 0,
                      rotateY: 0,
                    }}
                    exit={{
                      opacity: 0,
                      filter: "blur(15px)",
                      x: -30,
                      rotateY: -10,
                    }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                    className="relative z-10 w-full"
                    style={{ perspective: "1000px" }}
                  >
                    <div className="flex flex-col mb-8 gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm animate-pulse shadow-[0_0_15px_#ea580c]" />
                        <p className="text-orange-400 font-semibold text-[11px] tracking-[0.25em] uppercase">
                          SYSTEM / {activeData.subtitle}
                        </p>
                      </div>
                      <h3 className="text-white text-5xl md:text-6xl font-light tracking-tight drop-shadow-xl mt-2">
                        {activeData.title}
                      </h3>
                    </div>

                    <div className="w-full h-[1px] bg-gradient-to-r from-orange-500/60 via-gray-700/50 to-transparent mb-8" />

                    <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 max-w-[95%] font-light">
                      {activeData.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                      {activeData.bullets.map((bullet, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-4 group cursor-default"
                        >
                          <div className="p-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 group-hover:bg-orange-500/40 transition-colors duration-300">
                            <LuChevronRight className="w-4 h-4 text-orange-400 group-hover:text-white transition-colors" />
                          </div>
                          <span className="text-gray-300 font-medium text-xs uppercase tracking-[0.15em] group-hover:text-white transition-colors duration-300">
                            {bullet}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </Section>
  );
}
