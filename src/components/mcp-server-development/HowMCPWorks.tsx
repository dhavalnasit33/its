"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LuSearch,
  LuShield,
  LuFileSymlink,
  LuPlay,
  LuFileCheck2,
  LuBrain,
} from "react-icons/lu";
import Section from "@/components/Section";
import Row from "@/components/Row";
import SectionBadge from "../new-home-components/SectionBadge";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30, scale: 0.9 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

// Refined floating animation
const floatAnimation = (index: number) => ({
  animate: {
    y: [-6, 6, -6],
  },
  transition: {
    duration: 4 + index * 0.2,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
});

const workflowSteps = [
  {
    title: "Discover",
    description:
      "AI client discovers available MCP tools, resources, and available capabilities.",
    icon: LuSearch,
  },
  {
    title: "Authenticate",
    description:
      "The MCP server authenticates the AI client and validates permissions before granting access.",
    icon: LuShield,
  },
  {
    title: "Request",
    description:
      "The AI client sends a structured MCP request with user context and required parameters.",
    icon: LuFileSymlink,
  },
  {
    title: "Execute",
    description:
      "The MCP server securely executes APIs, database queries, enterprise workflows, or custom business tools.",
    icon: LuPlay,
  },
  {
    title: "Return Result",
    description:
      "The server formats structured results and returns them through the MCP protocol.",
    icon: LuFileCheck2,
  },
  {
    title: "AI Uses Result",
    description:
      "The AI uses the returned context to generate accurate responses, automate workflows, or complete user tasks.",
    icon: LuBrain,
  },
];

// Color palette matching the image's gradient flow
const themeColors = [
  { hex: "#00bfff", glow: "rgba(0, 191, 255, 0.4)" }, // Blue
  { hex: "#4d4dff", glow: "rgba(77, 77, 255, 0.4)" }, // Indigo
  { hex: "#a64dff", glow: "rgba(166, 77, 255, 0.4)" }, // Purple
  { hex: "#ff4da6", glow: "rgba(255, 77, 166, 0.4)" }, // Pink
  { hex: "#ff8c00", glow: "rgba(255, 140, 0, 0.4)" }, // Amber/Orange
  { hex: "#ffb84d", glow: "rgba(255, 184, 77, 0.4)" }, // Yellow/Orange
];

export default function HowMCPWorks() {
  return (
    <Section
      id="how-mcp-works"
      className="py-20 lg:py-32 relative overflow-hidden bg-[#05070A] text-white perspective-[2000px]"
    >
      {/* 3D Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <Row>
        <motion.div
          initial={{ opacity: 0, rotateX: 10, y: 40 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="w-full"
        >
          {/* HEADER SECTION */}
          <div className="text-center mb-16 max-w-3xl mx-auto relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <SectionBadge title="How MCP Works" />
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="common-h2 text-white"
            >
              Short, modern, and
              <span className="text-[#D27E2B]"> action-oriented.</span>
            </motion.h2>
            <p className="text-slate-600 text-base sm:text-lg font-medium max-w-2xl leading-relaxed mx-auto">
              Build secure MCP servers that connect AI assistants with your
              business systems, APIs, databases, and enterprise tools through a
              standardized, reliable protocol.
            </p>
          </div>

          {/* ── 3D WORKFLOW GRID ── */}
          {/* Increased max-width here to make the whole row (and thus the cards) wider on large screens */}
          <div className="relative z-10 w-full max-w-[1600px] mx-auto pb-8 lg:pb-16 mt-28 px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-y-24 gap-x-6 xl:gap-x-8 relative">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;
                const theme = themeColors[index];
                const nextTheme = themeColors[index + 1];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    className="flex flex-col items-center relative z-10 group h-full"
                  >
                    {/* Top Dashed Connector Line (Desktop Only) */}
                    {index < workflowSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-[4.5rem] left-[50%] w-[100%] h-[1px] z-0 pointer-events-none">
                        {/* Curved SVG Line */}
                        <svg
                          width="100%"
                          height="40"
                          viewBox="0 0 160 40"
                          preserveAspectRatio="none"
                          className="absolute top-0 overflow-visible w-full"
                        >
                          <defs>
                            <linearGradient
                              id={`gradient-${index}`}
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor={theme.hex} />
                              <stop offset="100%" stopColor={nextTheme.hex} />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0 20 C40 0 120 40 160 20"
                            fill="none"
                            stroke={`url(#gradient-${index})`}
                            strokeWidth="2"
                            strokeLinecap="round"
                            style={{
                              filter: `drop-shadow(0 0 6px ${theme.hex})`,
                            }}
                          />
                        </svg>

                        {/* Static Tracers */}
                        <div className="absolute top-[10px] left-[30%] w-1 h-1 rounded-full bg-white/40 blur-[1px]" />
                        <div className="absolute top-[16px] left-[55%] w-1 h-1 rounded-full bg-white/30 blur-[1px]" />
                        <div className="absolute top-[8px] left-[80%] w-1 h-1 rounded-full bg-white/40 blur-[1px]" />

                        {/* Animated Center Dot */}
                        <motion.div
                          className="absolute top-[8px] left-0 w-2 h-2 rounded-full"
                          style={{
                            background: nextTheme.hex,
                            boxShadow: `0 0 10px ${nextTheme.hex}`,
                          }}
                          animate={{
                            x: [0, 200], // Increased travel distance for wider cards
                            y: [0, -10, 8, 0],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                    )}

                    {/* Right Arrow for Bottom Cards (Desktop Only) - Perfectly centered relative to the card block */}
                    {index < workflowSteps.length - 1 && (
                      <div className="hidden lg:flex absolute bottom-[130px] -right-[12px] xl:-right-[16px] w-5 h-5 items-center justify-center text-slate-600 z-20 pointer-events-none translate-x-1/2">
                        <svg
                          width="10"
                          height="16"
                          viewBox="0 0 8 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L7 7L1 13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}

                  

                    {/* 3D Orb & Isometric Platform Container */}
                    <div className="relative w-full h-[220px] flex flex-col items-center justify-end z-10 perspective-[800px] mb-4">
                      {/* Isometric Glowing Base */}
                      <div
                        className="absolute bottom-0 w-[160px] h-[160px] lg:w-[170px] lg:h-[170px] transition-all duration-500 group-hover:scale-105"
                        style={{
                          transform:
                            "rotateX(62deg) rotateZ(45deg) translateZ(0)",
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {/* Layer 1 */}
                        <div
                          className="absolute inset-0 rounded-[30px]"
                          style={{
                            border: "1px solid rgba(255,255,255,.12)",
                            background: "rgba(20,24,35,.45)",
                            transform: "translateZ(10px)",
                            boxShadow: `0 0 30px ${theme.glow}, inset 0 0 30px rgba(255,255,255,.05)`,
                            backdropFilter: "blur(12px)",
                          }}
                        />

                        {/* Layer 2 */}
                        <div
                          className="absolute inset-[18px] rounded-[24px]"
                          style={{
                            border: "1px solid rgba(255,255,255,.12)",
                            background: "rgba(15,20,30,.8)",
                            transform: "translateZ(20px)",
                            boxShadow: `inset 0 0 25px rgba(255,255,255,.05)`,
                          }}
                        />

                        {/* Layer 3 */}
                        <div
                          className="absolute inset-[40px] rounded-[18px]"
                          style={{
                            background: theme.hex,
                            transform: "translateZ(30px)",
                            opacity: 0.25,
                            filter: "blur(14px)",
                          }}
                        />
                      </div>

                      {/* Vertical Light Beam connecting base to orb */}
                      <div
                        className="absolute bottom-[40px] w-[3px] h-[72px] opacity-70 group-hover:opacity-100 group-hover:h-16 transition-all duration-300"
                        style={{
                          background: `linear-gradient(to top, ${theme.hex}, transparent)`,
                          filter: `drop-shadow(0 0 8px ${theme.hex})`,
                        }}
                      />

                      {/* Floating Dark Orb */}
                      <motion.div
                        {...floatAnimation(index)}
                        className="relative w-[6.5rem] h-[6.5rem] lg:w-[7.5rem] lg:h-[7.5rem] mb-20 rounded-full flex items-center justify-center z-20 cursor-pointer overflow-hidden"
                        style={{
                          background: `radial-gradient(circle at 50% 18%, rgba(70,80,110,.9) 0%, #171d2f 28%, #090b12 70%, #040507 100%)`,
                          border: "1px solid rgba(255,255,255,.12)",
                          boxShadow: `inset 0 3px 14px rgba(255,255,255,.18), inset 0 -18px 35px rgba(0,0,0,.85), 0 18px 40px rgba(0,0,0,.55), 0 0 25px ${theme.glow}`,
                        }}
                      >
                        {/* Orb inner light reflection */}
                        <div
                          className="absolute top-2 left-1/2 -translate-x-1/2 w-[65%] h-5 rounded-full blur-md"
                          style={{
                            background:
                              "linear-gradient(to bottom, rgba(255,255,255,.22), transparent)",
                          }}
                        />

                        {/* Icon */}
                        <Icon
                          className="w-8 h-8 lg:w-9 lg:h-9 transition-all duration-300 group-hover:scale-110"
                          style={{
                            color: theme.hex,
                            filter: `drop-shadow(0 0 8px ${theme.hex}) drop-shadow(0 0 18px ${theme.hex})`,
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Content Box - Removed fixed max-width to allow full natural width expansion */}
                    <div
                      className="relative w-full min-h-[355px] flex flex-col rounded-[22px] p-6 lg:p-7 overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(16,20,30,.92) 0%, rgba(8,10,16,.98) 100%)",
                        border: "1px solid rgba(255,255,255,.08)",
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,.05), 0 25px 60px rgba(0,0,0,.45)`,
                      }}
                    >
                      {/* Very subtle ambient top glow inside the card based on theme */}
                      <div
                        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[190px] h-[190px] rounded-full opacity-15 blur-[70px] transition-opacity duration-300 group-hover:opacity-30"
                        style={{
                          background: theme.hex,
                        }}
                      />

                      {/* Title with matching dot */}
                      <div className="flex items-center gap-2.5 mb-4 relative z-10">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: theme.hex,
                            boxShadow: `0 0 8px ${theme.hex}`,
                          }}
                        />
                        <h3 className="text-[17px] xl:text-[18px] font-bold text-white tracking-wide">
                          {step.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-[14px] xl:text-[14.5px] text-slate-400/90 font-medium leading-relaxed mb-8 flex-grow relative z-10">
                        {step.description}
                      </p>

                      {/* Animated Colored Dash Indicator at Bottom */}
                      <div
                        className="w-10 h-[3px] rounded-full mx-auto mt-auto opacity-70 transition-all duration-500 group-hover:w-[70%] group-hover:opacity-100"
                        style={{
                          backgroundColor: theme.hex,
                          boxShadow: `0 0 8px ${theme.hex}`,
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </Row>
    </Section>
  );
}
