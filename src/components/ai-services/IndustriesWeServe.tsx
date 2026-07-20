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
import Image from "next/image";
import Section from "../Section";
import Row from "../Row";
import SectionBadge from "../new-home-components/SectionBadge";

// --- Data Structure ---
const TIERS = [
  {
    id: "healthcare",
    label: "Healthcare",
    icon: LuHeartPulse,
    width: "260px",
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
    width: "340px",
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
    width: "420px",
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
    width: "500px",
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    icon: LuFactory,
    width: "580px",
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
    width: "660px",
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
    width: "740px",
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
    width: "820px",
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

  const PYRAMID_CENTERS = [34, 108, 182, 267, 352, 422, 492, 566];
  const activeOffset = (PYRAMID_CENTERS[activeIndex] || 300) - 300;

  return (
    <Section className="relative w-full min-h-screen bg-[#02050A] overflow-hidden flex items-center justify-center py-20 lg:py-0">
      <Row>
        <div className="flex flex-col items-center relative z-10 w-full">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-16">
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

          {/* Minimalist Grid Background */}
          <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-30">
            <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)]" />
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 flex flex-col xl:flex-row items-center justify-center gap-12 xl:gap-20">
            {/* --- LEFT: HOLOGRAPHIC 3D PYRAMID --- */}
            <div className="relative flex flex-col items-center justify-center w-full xl:w-[45%]">
              {/* Central Energy Axis */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-orange-500/50 to-transparent z-0" />

              <div className="flex flex-col items-center gap-[10px] relative z-20">
                {TIERS.map((tier) => {
                  if (tier.isCore) {
                    return (
                      <div
                        key="core"
                        className="relative flex justify-center items-center w-full h-[110px] my-4 z-30"
                      >
                        {/* Core Hexagon Hollow Wireframe with 3D glow */}
                        <motion.div
                          className="relative flex flex-col justify-center items-center w-[140px] h-[140px] bg-gradient-to-b from-orange-950/40 to-black/80 backdrop-blur-md z-20 border-[2px] border-orange-500"
                          style={{
                            clipPath:
                              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                          }}
                          animate={{
                            boxShadow: [
                              "0 0 20px rgba(255,100,0,0.3)",
                              "0 0 60px rgba(255,100,0,0.6)",
                              "0 0 20px rgba(255,100,0,0.3)",
                            ],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <div
                            className="absolute inset-2 border border-orange-500/40"
                            style={{
                              clipPath:
                                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                            }}
                          />
                          <span className="relative z-10 text-white font-black text-4xl tracking-tighter">
                            AI
                          </span>
                          <span className="relative z-10 text-orange-500 font-bold text-[10px] tracking-[0.4em] mt-1">
                            CORE
                          </span>
                        </motion.div>
                      </div>
                    );
                  }

                  if (tier.isSplit) {
                    const isLeftActive = activeTierId === tier.left?.id;
                    const isRightActive = activeTierId === tier.right?.id;
                    return (
                      <div
                        key={tier.id}
                        className="relative flex gap-3 z-10"
                        style={{ width: tier.width, height: "64px" }}
                      >
                        {/* Left Half */}
                        <div
                          onClick={() => setActiveTierId(tier.left!.id)}
                          className={`relative flex-1 flex justify-center items-center cursor-pointer overflow-hidden transition-all duration-300`}
                          style={{
                            clipPath:
                              "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)",
                            background: isLeftActive
                              ? "linear-gradient(180deg, rgba(234,88,12,0.05) 0%, rgba(234,88,12,0.2) 100%)"
                              : "linear-gradient(180deg, rgba(6,182,212,0.02) 0%, rgba(6,182,212,0.1) 100%)",
                            boxShadow: isLeftActive
                              ? "0 10px 20px -5px rgba(234,88,12,0.3)"
                              : "0 10px 20px -5px rgba(6,182,212,0.1)",
                          }}
                        >
                          <div
                            className={`absolute bottom-0 left-0 w-full h-[1.5px] ${isLeftActive ? "bg-orange-500 shadow-[0_0_15px_#f97316]" : "bg-cyan-700/60"}`}
                          />

                          <div
                            className={`flex items-center gap-3 transition-colors ${isLeftActive ? "text-orange-400 drop-shadow-md" : "text-slate-300 hover:text-white"}`}
                          >
                            <tier.left.icon className="w-4 h-4" />
                            <span className="font-semibold text-sm tracking-wide uppercase">
                              {tier.left?.label}
                            </span>
                          </div>
                        </div>

                        {/* Right Half */}
                        <div
                          onClick={() => setActiveTierId(tier.right!.id)}
                          className={`relative flex-1 flex justify-center items-center cursor-pointer overflow-hidden transition-all duration-300`}
                          style={{
                            clipPath: "polygon(0 0, 90% 0, 100% 100%, 0% 100%)",
                            background: isRightActive
                              ? "linear-gradient(180deg, rgba(234,88,12,0.05) 0%, rgba(234,88,12,0.2) 100%)"
                              : "linear-gradient(180deg, rgba(6,182,212,0.02) 0%, rgba(6,182,212,0.1) 100%)",
                            boxShadow: isRightActive
                              ? "0 10px 20px -5px rgba(234,88,12,0.3)"
                              : "0 10px 20px -5px rgba(6,182,212,0.1)",
                          }}
                        >
                          <div
                            className={`absolute bottom-0 left-0 w-full h-[1.5px] ${isRightActive ? "bg-orange-500 shadow-[0_0_15px_#f97316]" : "bg-cyan-700/60"}`}
                          />

                          <div
                            className={`flex items-center gap-3 transition-colors ${isRightActive ? "text-orange-400 drop-shadow-md" : "text-slate-300 hover:text-white"}`}
                          >
                            <tier.right.icon className="w-4 h-4" />
                            <span className="font-semibold text-sm tracking-wide uppercase">
                              {tier.right?.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  const isActive = activeTierId === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setActiveTierId(tier.id)}
                      className={`relative flex justify-center items-center cursor-pointer transition-all duration-300`}
                      style={{
                        width: tier.width,
                        height: "64px",
                        clipPath: "polygon(5% 0, 95% 0, 100% 100%, 0% 100%)",
                        background: isActive
                          ? "linear-gradient(180deg, rgba(234,88,12,0.05) 0%, rgba(234,88,12,0.2) 100%)"
                          : "linear-gradient(180deg, rgba(6,182,212,0.02) 0%, rgba(6,182,212,0.1) 100%)",
                        boxShadow: isActive
                          ? "0 15px 30px -5px rgba(234,88,12,0.3)"
                          : "0 10px 20px -5px rgba(6,182,212,0.1)",
                      }}
                    >
                      {/* 3D Bottom Edge & Glow */}
                      <div
                        className={`absolute bottom-0 left-0 w-full h-[1.5px] ${isActive ? "bg-orange-500 shadow-[0_0_20px_#f97316]" : "bg-cyan-700/60"}`}
                      />

                      {/* Animated Top Glow when Active */}
                      {isActive && (
                        <motion.div
                          layoutId="activeGlow"
                          className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-400 to-transparent"
                        />
                      )}

                      <div
                        className={`relative z-30 flex items-center gap-3 transition-all ${isActive ? "text-orange-400 drop-shadow-md" : "text-slate-300 hover:text-white"}`}
                      >
                        {tier.icon && <tier.icon className="w-5 h-5" />}
                        {/* Switched to standard font-semibold for better readability */}
                        <span className="font-semibold text-sm tracking-wide uppercase">
                          {tier.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* --- RIGHT: DATA PANEL --- */}
            <div className="relative w-full xl:w-[50%] flex-shrink-0 z-20 mt-16 xl:mt-0">
              {/* Minimal Connecting Line */}
              <div className="hidden xl:block absolute -left-[100px] top-1/2 -translate-y-1/2 w-[100px] h-[600px] pointer-events-none z-0">
                <svg width="100%" height="100%" className="overflow-visible">
                  <motion.path
                    initial={false}
                    animate={{
                      d: `M -30 ${300 + activeOffset} L 10 ${300 + activeOffset} L 50 300 L 100 300`,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <motion.circle
                    animate={{ cy: 300 + activeOffset }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    cx="-30"
                    r="4"
                    fill="#ea580c"
                    className="drop-shadow-[0_0_5px_#ea580c]"
                  />
                </svg>
              </div>

              {/* Data Card Content */}
              <div className="relative w-full max-w-[650px] min-h-[420px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTierId}
                    initial={{ opacity: 0, filter: "blur(10px)", x: 20 }}
                    animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                    exit={{ opacity: 0, filter: "blur(10px)", x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10 w-full"
                  >
                    {/* The Header & Image Container */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-sm animate-pulse shadow-[0_0_8px_#ea580c]" />
                          <p className="text-gray-400  text-[11px] tracking-[0.2em] uppercase">
                            SYSTEM / {activeData.subtitle}
                          </p>
                        </div>
                        <h3 className="text-white text-4xl md:text-5xl font-light">
                          {activeData.title}
                        </h3>
                      </div>

                      {/* Full Color Image */}
                      <div className="relative w-[180px] h-[120px] rounded-lg overflow-hidden border border-gray-700 shrink-0 shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                        <Image
                          src={activeData.image}
                          alt={activeData.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-110"
                        />
                      </div>
                    </div>

                    <div className="w-full h-[1px] bg-gradient-to-r from-gray-700 to-transparent mb-8" />

                    <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-10 max-w-[90%] font-light">
                      {activeData.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {activeData.bullets.map((bullet, i) => (
                        <div key={i} className="flex items-center gap-3 group">
                          <LuChevronRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform drop-shadow-md" />
                          <span className="text-gray-200  text-xs uppercase tracking-wider group-hover:text-white transition-colors">
                            {bullet}
                          </span>
                        </div>
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
