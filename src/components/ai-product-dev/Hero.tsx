"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { LuBot, LuBrainCircuit, LuScanEye, LuWorkflow, LuDatabaseZap, LuTrendingUp, LuCheck } from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Button from "@/components/Button";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

const FEATURES = [
  "AI Product Development",
  "Enterprise Automation",
  "AI Agents & Copilots",
  "Data & Model Engineering",
  "LLM Integrations",
  "Scalable & Secure Solutions",
];


const FLOATING_CARDS = [
  {
    title: "AI Agents",
    description: "Autonomous agents that get work done.",
    icon: LuBot,
    color: "#3B82F6",
    pos: "top-[0%] left-[-8%]",
    delay: 0,
  },
  {
    title: "LLM Integration",
    description: "Connect with leading language models.",
    icon: LuBrainCircuit,
    color: "#6366F1",
    pos: "top-[8%] right-[-8%]",
    delay: 0.15,
  },
  {
    title: "Computer Vision",
    description: "Extract insights from images & videos.",
    icon: LuScanEye,
    color: "#22C55E",
    pos: "top-[32%] left-[-16%]",
    delay: 0.3,
  },
  {
    title: "Automation",
    description: "Streamline workflows with intelligent AI.",
    icon: LuWorkflow,
    color: "#F97316",
    pos: "top-[40%] right-[-10%]",
    delay: 0.45,
  },
  {
    title: "Data Intelligence",
    description: "Turn data into actionable predictions.",
    icon: LuDatabaseZap,
    color: "#8B5CF6",
    pos: "bottom-[0%] left-[-8%]",
    delay: 0.6,
  },
  {
    title: "Predictive AI",
    description: "Forecast trends and optimize decisions.",
    icon: LuTrendingUp,
    color: "#EF4444",
    pos: "bottom-[2%] right-[-12%]",
    delay: 0.75,
  },
];

export default function Hero() {
  return (
    <Section className="lg:py-16! common_background_gradient overflow-hidden">
      <Row>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* ── Left Column ── */}
          <div className="w-full z-10 max-w-full lg:max-w-[50%]">
            {/* Badge */}
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 text-[#D27E2B] text-sm font-bold uppercase tracking-widest mb-6">
                <span className="w-5 h-px bg-[#D27E2B]" />
                AI Product Development
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-4xl md:text-[46px] xl:text-[54px] font-extrabold mb-6 leading-[1.15] text-[#0F172A]"
            >
              We Build Custom AI Products{" "}
              <span className="text-[#D27E2B]">That Drive Real Business Impact</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="text-[#6f6f6f] text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
            >
              From intelligent AI agents to enterprise automation, we design, develop, and deploy premium AI products that solve real problems and accelerate your growth.
            </motion.p>

            {/* Feature Checklist */}
            <motion.div
              {...fadeUp(0.3)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-10"
            >
              {FEATURES.map((feat) => (
                <div key={feat} className="flex items-center gap-2.5 text-[#0F172A]">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#D27E2B]/15 flex items-center justify-center">
                    <LuCheck className="w-3 h-3 text-[#D27E2B] stroke-[3]" />
                  </span>
                  <span className="text-sm font-bold">{feat}</span>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Button
                bgColor="#D27E2B"
                hoverColor="#0F172A"
                text="Start Your AI Project"
                href="#contact-form-section"
                icon="/navbar/btn_icon.png"
              />
              <motion.div className="border border-[#0F172A]/20 hover:border-[#D27E2B] relative w-auto inline-flex items-center justify-center rounded-lg overflow-hidden text-[#0F172A] hover:text-[#ffffff] transition-all duration-700 ease-in-out group bg-white shadow-sm">
                <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D27E2B] rounded group-hover:w-full group-hover:h-full"></span>
                <a
                  href="#ai-solutions"
                  className="relative tracking-tight text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3 cursor-pointer font-semibold"
                >
                  <span className="flex flex-row gap-3 items-center justify-center">
                    Explore Solutions
                    <Image
                      src="/navbar/btn_icon.png"
                      alt="Arrow"
                      width={20}
                      height={20}
                      className="transition-all duration-700 ease-in-out brightness-0 group-hover:brightness-0 group-hover:invert w-5 h-5"
                    />
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Right Column: Central Image + Floating Cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative z-10 w-full max-w-full lg:max-w-[48%] flex justify-center items-center min-h-[520px] lg:min-h-[640px] py-10"
          >
            <div className="relative w-full aspect-square max-w-[850px] mx-auto flex items-center justify-center">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D27E2B]/15 to-transparent blur-2xl scale-95" />
              
              <Image
                src="/ai-strategy/hero_ai_product_development-1.png"
                alt="AI Product Development"
                width={780}
                height={780}
                priority
                className="object-contain relative z-10 drop-shadow-2xl scale-110"
              />

              {/* Floating Cards */}
              {FLOATING_CARDS.map((card) => {
                const IconComponent = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + card.delay }}
                    className={`absolute ${card.pos} z-20 hidden lg:block max-w-[240px]`}
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4 + card.delay * 2, repeat: Infinity, ease: "easeInOut" }}
                      className="bg-white/95 backdrop-blur-md border border-gray-100/80 shadow-[0_12px_40px_rgba(0,0,0,0.08)] rounded-[18px] p-4 flex gap-3.5 items-start hover:shadow-lg transition-all duration-300"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${card.color}15`, color: card.color }}
                      >
                        <IconComponent className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-gray-900 mb-1 leading-snug">{card.title}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed font-semibold">{card.description}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </Row>
    </Section>
  );
}
