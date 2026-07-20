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
  LuCircleCheck,
  LuArrowRight,
  LuSparkles,
} from "react-icons/lu";
import Image from "next/image";
import Section from "../Section";
import Row from "../Row";
import SectionBadge from "../new-home-components/SectionBadge";

// --- Data Structure mapping to the Pyramid Layers ---
const TIERS = [
  {
    id: "healthcare",
    label: "Healthcare",
    icon: LuHeartPulse,
    width: "240px",
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
      image: "/industries/healthcare.png",
    },
  },
  {
    id: "finance",
    label: "Finance",
    icon: LuLandmark,
    width: "320px",
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
      image: "/industries/finance.png",
    },
  },
  {
    id: "retail",
    label: "Retail & Ecommerce",
    icon: LuShoppingCart,
    width: "400px",
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
      image: "/industries/retail.png",
    },
  },
  {
    id: "core",
    isCore: true,
    width: "480px",
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    icon: LuFactory,
    width: "560px",
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
      image: "/industries/manufacturing.png",
    },
  },
  {
    id: "edu-log",
    isSplit: true,
    left: { id: "education", label: "Education", icon: LuGraduationCap },
    right: { id: "logistics", label: "Logistics", icon: LuTruck },
    width: "640px",
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
      image: "/industries/manufacturing.png",
    },
  },
  {
    id: "insurance",
    label: "Insurance",
    icon: LuShield,
    width: "720px",
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
      image: "/industries/Insurance.png",
    },
  },
  {
    id: "realestate",
    label: "Real Estate",
    icon: LuBuilding,
    width: "800px",
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
      image: "/industries/manufacturing.png",
    },
  },
];

export default function AIPyramidEcosystem() {
  const [activeTierId, setActiveTierId] = useState("healthcare");

  // Safely grab the data
  const activeData =
    TIERS.find(
      (t) =>
        t.id === activeTierId ||
        (t.isSplit &&
          (activeTierId === "education" || activeTierId === "logistics")),
    )?.data ?? TIERS[0].data!;

  // Calculate active index for the connecting line position
  const activeIndex = TIERS.findIndex(
    (t) =>
      t.id === activeTierId ||
      (t.isSplit &&
        (activeTierId === "education" || activeTierId === "logistics")),
  );

  // Calculate precise vertical offset relative to the center of the 600px tall pyramid
  const PYRAMID_CENTERS = [34, 108, 182, 267, 352, 422, 492, 566];
  const activeOffset = (PYRAMID_CENTERS[activeIndex] || 300) - 300;

  return (
    <Section className="relative w-full min-h-screen bg-[#020713] overflow-hidden font-sans flex items-center justify-center py-20 lg:py-0">
      <Row>
        <div className="flex flex-col items-center relative z-10">
          {/* Header section */}
          <div className="text-center max-w-3xl mx-auto mb-28 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <SectionBadge title="Industries We Serve" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="common-h2 text-white"
            >
              AI Solutions Tailored for{" "}
              <span className="text-[#D27E2B]">Every Industry</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            >
              Empowering industries with AI solutions that drive efficiency,
              innovation, and sustainable growth.
            </motion.p>
          </div>
          {/* Background Ambience */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(14,165,233,0.03)_0%,_transparent_80%)]" />
            <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-cyan-900/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-cyan-900/10 blur-[120px] rounded-full" />
          </div>

          <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 flex flex-col xl:flex-row items-center justify-center gap-16 xl:gap-8">
            {/* --- LEFT: PYRAMID STRUCTURE --- */}
            <div className="relative flex flex-col items-center justify-center w-full xl:w-1/2">
              {/* Central Vertical Energy Line */}
              <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-orange-500/50 to-transparent z-0 blur-[1px]" />
              <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/40 to-transparent z-10" />

              {/* Pyramid Tiers */}
              <div className="flex flex-col items-center gap-[6px] relative z-20">
                {TIERS.map((tier) => {
                  // 1. Render AI CORE (Hexagon) Layer
                  if (tier.isCore) {
                    return (
                      <div
                        key="core"
                        className="relative flex justify-center items-center w-full h-[90px] my-1 z-30"
                      >
                        <div className="absolute w-[300px] h-[150px] bg-orange-600/30 blur-[40px] rounded-full pointer-events-none" />

                        {/* Simplified, Perfectly Centered Hexagon */}
                        <motion.div
                          className="relative flex flex-col justify-center items-center w-[120px] h-[120px] bg-gradient-to-br from-[#4a2000] via-[#1f0d00] to-[#0a0400] border-[1.5px] border-orange-500 shadow-[0_0_40px_rgba(255,120,0,0.6),inset_0_0_20px_rgba(255,140,40,0.5)] backdrop-blur-md z-20"
                          style={{
                            clipPath:
                              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                          }}
                          animate={{
                            boxShadow: [
                              "0 0 30px rgba(255,120,0,0.5), inset 0 0 15px rgba(255,140,40,0.4)",
                              "0 0 50px rgba(255,120,0,0.8), inset 0 0 25px rgba(255,140,40,0.7)",
                              "0 0 30px rgba(255,120,0,0.5), inset 0 0 15px rgba(255,140,40,0.4)",
                            ],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          {/* Inner Highlight */}
                          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                          <span className="relative z-10 text-white font-black text-4xl leading-none drop-shadow-[0_0_12px_#ffffff]">
                            AI
                          </span>
                          <span className="relative z-10 text-orange-500 font-bold text-[10px] tracking-[0.25em] mt-1 drop-shadow-[0_0_8px_#ff7a00]">
                            CORE
                          </span>
                        </motion.div>

                        {/* Horizontal Beam */}
                        <div className="absolute w-full max-w-[500px] h-[1px] bg-gradient-to-r from-transparent via-orange-500/80 to-transparent z-10" />
                      </div>
                    );
                  }

                  // 2. Render Split Layer (Education & Logistics)
                  if (tier.isSplit) {
                    const isLeftActive = activeTierId === tier.left?.id;
                    const isRightActive = activeTierId === tier.right?.id;
                    return (
                      <div
                        key={tier.id}
                        className="relative flex gap-1 z-10"
                        style={{ width: tier.width, height: "68px" }}
                      >
                        {/* Left Half */}
                        <div
                          onClick={() => setActiveTierId(tier.left!.id)}
                          className="relative flex-1 flex justify-center items-center cursor-pointer group bg-gradient-to-b from-cyan-900/20 to-[#030b17]/90 backdrop-blur-md overflow-hidden"
                          style={{
                            clipPath:
                              "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)",
                          }}
                        >
                          <div
                            className={`absolute top-0 left-0 w-full h-[2px] ${isLeftActive ? "bg-orange-500 shadow-[0_0_15px_#fb923c]" : "bg-cyan-500/50"} z-10 transition-colors`}
                          />
                          <div
                            className={`absolute bottom-0 left-0 w-full h-[1px] ${isLeftActive ? "bg-orange-500/50" : "bg-cyan-500/30"}`}
                          />
                          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
                          <div
                            className={`flex items-center gap-3 transition-all ${isLeftActive ? "text-orange-400 drop-shadow-[0_0_8px_#fb923c]" : "text-slate-300 group-hover:text-white"}`}
                          >
                            <tier.left.icon className="w-5 h-5" />
                            <span className="font-semibold tracking-wide text-sm">
                              {tier.left?.label}
                            </span>
                          </div>
                        </div>

                        {/* Right Half */}
                        <div
                          onClick={() => setActiveTierId(tier.right!.id)}
                          className="relative flex-1 flex justify-center items-center cursor-pointer group bg-gradient-to-b from-cyan-900/20 to-[#030b17]/90 backdrop-blur-md overflow-hidden"
                          style={{
                            clipPath: "polygon(0 0, 88% 0, 100% 100%, 0% 100%)",
                          }}
                        >
                          <div
                            className={`absolute top-0 left-0 w-full h-[2px] ${isRightActive ? "bg-orange-500 shadow-[0_0_15px_#fb923c]" : "bg-cyan-500/50"} z-10 transition-colors`}
                          />
                          <div
                            className={`absolute bottom-0 left-0 w-full h-[1px] ${isRightActive ? "bg-orange-500/50" : "bg-cyan-500/30"}`}
                          />
                          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
                          <div
                            className={`flex items-center gap-3 transition-all ${isRightActive ? "text-orange-400 drop-shadow-[0_0_8px_#fb923c]" : "text-slate-300 group-hover:text-white"}`}
                          >
                            <tier.right.icon className="w-5 h-5" />
                            <span className="font-semibold tracking-wide text-sm">
                              {tier.right?.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // 3. Standard Trapezoid Layer
                  const isActive = activeTierId === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setActiveTierId(tier.id)}
                      className="relative flex justify-center items-center cursor-pointer group backdrop-blur-md overflow-hidden transition-all z-10"
                      style={{
                        width: tier.width,
                        height: "68px",
                        clipPath: "polygon(6% 0, 94% 0, 100% 100%, 0% 100%)",
                        background: isActive
                          ? "linear-gradient(180deg, rgba(30,50,70,0.6) 0%, rgba(3,11,23,0.95) 100%)"
                          : "linear-gradient(180deg, rgba(15,35,55,0.4) 0%, rgba(3,11,23,0.9) 100%)",
                      }}
                    >
                      {/* Glowing Top Edge */}
                      <div
                        className={`absolute top-0 left-0 w-full h-[2px] ${isActive ? "bg-orange-500 shadow-[0_0_20px_#fb923c]" : "bg-cyan-500/50"} transition-colors z-20`}
                      />

                      {/* Bottom Edge */}
                      <div
                        className={`absolute bottom-0 left-0 w-full h-[1px] ${isActive ? "bg-orange-500/50" : "bg-cyan-500/30"} z-20`}
                      />

                      {/* Hover/Active Overlay */}
                      <div
                        className={`absolute inset-0 ${isActive ? "bg-orange-500/5" : "bg-white/0 group-hover:bg-white/5"} transition-colors`}
                      />

                      {/* Content */}
                      <div
                        className={`relative z-30 flex items-center gap-3 transition-all duration-300 ${isActive ? "text-orange-400 drop-shadow-[0_0_8px_#fb923c]" : "text-slate-300 group-hover:text-white"}`}
                      >
                        {tier.icon && <tier.icon className="w-5 h-5" />}
                        <span className="font-semibold tracking-wide text-sm">
                          {tier.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* --- RIGHT: INFORMATION PANEL --- */}
            <div className="relative w-full xl:w-[580px] flex-shrink-0 z-20 mt-10 xl:mt-0 pr-4 md:pr-8">
              {/* Animated Connecting Line (Desktop Only) */}
              <div className="hidden xl:block absolute -left-[100px] top-1/2 -translate-y-1/2 w-[100px] h-[600px] pointer-events-none z-0">
                <svg width="100%" height="100%" className="overflow-visible">
                  <motion.path
                    initial={false}
                    animate={{
                      d: `M -30 ${300 + activeOffset} L 10 ${300 + activeOffset} L 50 300 L 100 300`,
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    fill="none"
                    stroke="#EA580C"
                    strokeWidth="1.5"
                    className="drop-shadow-[0_0_8px_#EA580C]"
                  />
                  <motion.circle
                    animate={{ cy: 300 + activeOffset }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    cx="-30"
                    r="3"
                    fill="#EA580C"
                    className="drop-shadow-[0_0_5px_#EA580C]"
                  />
                </svg>
              </div>

              {/* Info Panel Container */}
              <div className="relative bg-[#050B14] border border-cyan-500/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(6,182,212,0.1)] min-h-[380px] flex items-center  w-[700px]">
                {/* Top Left / Bottom Right Cyan Accent Corners */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500 rounded-tl-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500 rounded-br-2xl pointer-events-none" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTierId}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="relative z-10 flex flex-col md:flex-row gap-8 w-full"
                  >
                    {/* Left Text Content (Constrained width to avoid image overlap) */}
                    <div className="flex-1 max-w-full md:max-w-[70%]">
                      <p className="text-orange-500 text-xs font-black tracking-widest uppercase mb-2">
                        {activeData.subtitle}
                      </p>
                      <h3 className="text-white text-4xl font-bold mb-4">
                        {activeData.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6  w-[400px]">
                        {activeData.description}
                      </p>

                      <ul className="space-y-3 mb-8">
                        {activeData.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <LuCircleCheck className="w-[18px] h-[18px] text-cyan-500 flex-shrink-0" />
                            <span className="text-slate-300 text-sm">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Absolute Overlapping Breakout Image (3D Floating Effect) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTierId + "-image-breakout"}
                    initial={{
                      opacity: 0,
                      x: 20,
                      y: "-50%",
                      scale: 0.9,
                      rotateY: -15,
                    }}
                    animate={{
                      opacity: 1,
                      x: 35 /* Translates exactly 35px right so it elegantly overlaps the border */,
                      y: "-50%",
                      scale: 1,
                      rotateY: -5,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      x: 20,
                      y: "-50%",
                      scale: 0.9,
                      transition: { duration: 0.2 },
                    }}
                    className="hidden md:block absolute top-1/2 right-10 w-[240px] h-[170px] z-50 pointer-events-none perspective-[1000px]"
                  >
                    {/* Continuous floating animation wrapper */}
                    <motion.div
                      animate={{ y: [-6, 6, -6] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative w-full h-full rounded-xl overflow-hidden border border-cyan-500/40 shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.3)] bg-[#050B14]"
                    >
                      <Image
                        src={activeData.image}
                        alt={activeData.title}
                        fill
                        className="object-cover object-center opacity-90"
                      />
                      {/* Subtle inner glass reflection overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent mix-blend-overlay pointer-events-none" />
                    </motion.div>
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
