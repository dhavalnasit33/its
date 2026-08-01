"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowRight, LuSparkles } from "react-icons/lu";
import Section from "@/components/Section";
import Row from "@/components/Row";

// --- Data ---
const LEFT_SERVICES = [
  {
    id: "strategy",
    title: "AI Strategy & Consulting",
    description: "Identify opportunities and build winning AI strategies.",
    icon: "/ai-service/ai-strategy-consulting.png",
    href: "/ai-strategy-consulting",
  },
  {
    id: "mcp",
    title: "MCP Server Development",
    description: "Build custom Model Context Protocol servers to connect LLMs to databases and APIs.",
    icon: "/ai-service/ai-automation.png",
    href: "/mcp-server-development",
  },
  {
    id: "agents",
    title: "AI Agents Development",
    description: "Autonomous AI agents that perform tasks and drive outcomes.",
    icon: "/ai-service/ai-agents-development.png",
    href: "/agentic-ai-development-services",
  },
];

const RIGHT_SERVICES = [
  {
    id: "product",
    title: "AI Product Development",
    description: "Custom AI software and intelligent digital products.",
    icon: "/ai-service/ai-product-development.png",
    href: "/ai-product-development",
  },
  {
    id: "chatbot",
    title: "AI Chatbot Development",
    description: "Intelligent chatbots that engage, support and convert.",
    icon: "/ai-service/ai-chatbot-development.png",
    href: "/ai-chatbot-development",
  },
  {
    id: "generative",
    title: "Generative AI & LLM Solutions",
    description: "Leverage LLMs to create content, insights and smart apps.",
    icon: "/ai-service/generative-ai-llm-solutions.png",
    href: "/generative-ai-llm-solutions",
  },
];

// --- Subcomponents ---
const ServiceCard = ({
  service,
  index,
  align,
}: {
  service: any;
  index: number;
  align: "left" | "right";
}) => (
  <motion.div
    custom={index}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
    className={`group relative flex flex-col sm:flex-row items-center sm:items-start gap-6 p-7 bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-[32px] shadow-[0_16px_50px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(210,126,43,0.15)] hover:border-[#D27E2B]/40 transition-all duration-500 z-10 w-full lg:w-[410px] ${
      align === "right"
        ? "sm:flex-row-reverse text-center sm:text-right"
        : "text-center sm:text-left"
    }`}
  >
    {/* Full card interactive link */}
    <Link
      href={service.href}
      className="absolute inset-0 z-20 rounded-[32px]"
      aria-label={`Learn more about ${service.title}`}
    />

    {/* Increased 3D Icon Size Container */}
    <div className="shrink-0 w-24 h-24 relative flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-amber-50/30 rounded-2xl border border-slate-200/70 shadow-[0_8px_20px_rgba(15,23,42,0.06),inset_0_2px_4px_rgba(255,255,255,0.9)] group-hover:border-[#D27E2B]/40 group-hover:scale-105 transition-all duration-500">
      <Image
        src={service.icon}
        alt={service.title}
        width={76}
        height={76}
        className="object-contain drop-shadow-[0_10px_20px_rgba(15,23,42,0.15)] group-hover:rotate-3 transition-transform duration-500"
      />
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 relative z-10 pointer-events-none">
      <h3 className="text-[#0F172A] font-bold text-[20px] tracking-tight mb-2 group-hover:text-[#D27E2B] transition-colors">
        {service.title}
      </h3>
      <p className="text-slate-500 text-[14px] leading-relaxed font-medium mb-4">
        {service.description}
      </p>

      <span
        className={`inline-flex items-center gap-1.5 text-[14px] font-bold text-[#D27E2B] group-hover:translate-x-1.5 transition-transform ${
          align === "right"
            ? "justify-center sm:justify-end"
            : "justify-center sm:justify-start"
        }`}
      >
        Learn More
        <LuArrowRight className="w-4 h-4" />
      </span>
    </div>
  </motion.div>
);

export default function ChooseYourAISolution() {
  return (
    <Section id="ai-solutions" className="relative bg-gradient-to-b from-white via-slate-50/60 to-white py-24 lg:py-36 overflow-hidden">
      {/* High-end ambient holographic background lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(210,126,43,0.08)_0%,rgba(15,23,42,0.03)_50%,transparent_80%)] rounded-full blur-[90px]" />
      </div>

      <Row>
        <div className="relative z-10 flex flex-col items-center">
          {/* Header */}
          <div className="text-center max-w-3xl mb-16 lg:mb-28">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[#D27E2B]/10 border border-[#D27E2B]/25 px-4 py-1.5 rounded-full text-[#D27E2B] text-xs font-extrabold uppercase tracking-widest mb-5 shadow-xs"
            >
              <LuSparkles className="w-3.5 h-3.5 text-[#D27E2B]" />
              Next-Gen Architecture
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-[52px] font-black text-[#0F172A] mb-5 tracking-tight"
            >
              Choose Your <span className="text-[#D27E2B]">AI</span> Solution
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-500 font-medium"
            >
              End-to-end AI services designed to solve real business challenges.
            </motion.p>
          </div>

          {/* Core Layout Structure (No Connection Lines) */}
          <div className="relative w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            {/* Left Cards */}
            <div className="flex flex-col gap-6 w-full lg:w-auto relative z-10">
              {LEFT_SERVICES.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  align="left"
                />
              ))}
            </div>

            {/* Ultra-Unique Center Holographic AI Core */}
            <div className="relative flex items-center justify-center w-full lg:w-[430px] h-[430px] z-20">
              {/* Background Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [0.45, 0.75, 0.45],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-[340px] h-[340px] rounded-full
    bg-[#D27E2B]/20 blur-[80px]"
              />

              {/* OUTER RING */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute w-[330px] h-[330px]
    rounded-full border border-[#D27E2B]/20"
              />

              {/* DASH RING */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute w-[290px] h-[290px]
    rounded-full border border-dashed
    border-[#D27E2B]/40"
              />

              {/* GLASS RING */}
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  rotate: {
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                  },
                }}
                className="absolute w-[240px] h-[240px]
    rounded-full border border-white/70
    backdrop-blur-md"
              />

              {/* ORBIT 1 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute w-[310px] h-[310px]"
              >
                <div
                  className="absolute left-1/2 -translate-x-1/2 -top-2
    w-4 h-4 rounded-full bg-[#D27E2B]
    shadow-[0_0_25px_#D27E2B]"
                />
              </motion.div>

              {/* ORBIT 2 */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute w-[260px] h-[260px]"
              >
                <div
                  className="absolute bottom-0 left-1/2
    -translate-x-1/2
    w-3 h-3 rounded-full bg-[#0F172A]
    shadow-[0_0_18px_#0F172A]"
                />
              </motion.div>

              {/* CENTER AI CORE */}
              <motion.div
                whileHover={{
                  rotateX: 8,
                  rotateY: -8,
                  scale: 1.05,
                }}
                animate={{
                  y: [0, -12, 0],
                  boxShadow: [
                    "0 25px 60px rgba(15,23,42,.35)",
                    "0 35px 90px rgba(210,126,43,.35)",
                    "0 25px 60px rgba(15,23,42,.35)",
                  ],
                }}
                transition={{
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  boxShadow: {
                    duration: 4,
                    repeat: Infinity,
                  },
                }}
                className="
      relative
      w-[175px]
      h-[175px]
      rounded-[42px]
      bg-gradient-to-br
      from-[#091322]
      via-[#12213a]
      to-[#1d3557]
      border border-white/20
      backdrop-blur-xl
      overflow-hidden
      flex
      flex-col
      justify-center
      items-center
    "
              >
                {/* GRID */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(210,126,43,.35) 1px, transparent 1px)",
                    backgroundSize: "10px 10px",
                  }}
                />

                {/* REFLECTION */}
                <motion.div
                  animate={{
                    x: [-220, 220],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className="
      absolute
      w-24
      h-full
      bg-white/20
      blur-xl
      rotate-12"
                />

                {/* AI */}
                <motion.h2
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="
      text-[58px]
      font-black
      text-[#D27E2B]
      drop-shadow-[0_0_18px_#D27E2B]"
                >
                  AI
                </motion.h2>

                <p
                  className="
      tracking-[0.5em]
      text-[10px]
      text-slate-300
      font-bold"
                >
                  CORE
                </p>
              </motion.div>
            </div>

            {/* Right Cards */}
            <div className="flex flex-col gap-6 w-full lg:w-auto relative z-10">
              {RIGHT_SERVICES.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index + 3}
                  align="right"
                />
              ))}
            </div>
          </div>
        </div>
      </Row>
    </Section>
  );
}
