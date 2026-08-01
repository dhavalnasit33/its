"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LuCheck } from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Button from "@/components/Button";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

const TRUST_CHIPS = [
  "OpenAI Compatible",
  "Claude Compatible",
  "Enterprise APIs",
  "Secure Tool Calling",
  "Zero-Trust Security",
  "Production Ready",
];

export default function Hero() {
  return (
    <Section className="common_background_gradient lg:py-18! overflow-hidden text-slate-900">
      <Row>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* ── Left Column: Value Proposition & Hero Info (40% Width - 4:6 Ratio) ── */}
          <div className="w-full z-10 max-w-full lg:max-w-[40%]">
            {/* Badge */}
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 text-[#D27E2B] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-5">
                <span className="w-5 h-0.5 bg-[#D27E2B]" />
                ENTERPRISE MCP SERVER DEVELOPMENT
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-3xl sm:text-4xl md:text-[44px] xl:text-[50px] font-extrabold mb-5 leading-[1.18] tracking-tight text-[#0F172A]"
            >
              Build Secure MCP Servers{" "}
              <span className="text-[#D27E2B]">
                That Connect AI With Your Business Systems
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6 font-medium"
            >
              We develop secure, enterprise-grade Model Context Protocol (MCP)
              servers that safely connect AI assistants and autonomous agents with
              your APIs, databases, SaaS platforms, and internal business systems.
            </motion.p>

            {/* Trust Chips Grid */}
            <motion.div
              {...fadeUp(0.3)}
              className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-2.5 mb-8"
            >
              {TRUST_CHIPS.map((chip) => (
                <div key={chip} className="flex items-center gap-2 text-[#0F172A]">
                  <span className="shrink-0 w-4.5 h-4.5 rounded-full bg-[#D27E2B]/10 flex items-center justify-center">
                    <LuCheck className="w-3 h-3 text-[#D27E2B] stroke-[3]" />
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-700">
                    {chip}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-4">
              <Button
                bgColor="#D27E2B"
                hoverColor="#0F172A"
                text="Build Your MCP Server"
                href="#contact-form-section"
                icon="/navbar/btn_icon.png"
              />

              <motion.div className="border border-[#0F172A]/20 hover:border-[#D27E2B] relative w-auto inline-flex items-center justify-center rounded-lg overflow-hidden text-[#ffffff] hover:text-[#ffffff] transition-all duration-700 ease-in-out group bg-[#0F172A] shadow-sm">
                <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D27E2B] rounded group-hover:w-full group-hover:h-full"></span>
                <a
                  href="#mcp-services"
                  className="relative tracking-tight text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3 cursor-pointer font-semibold flex items-center gap-2 z-10"
                >
                  Schedule Consultation
                  <Image
                    src="/navbar/btn_icon.png"
                    alt="Arrow"
                    width={20}
                    height={20}
                    className="transition-all duration-700 ease-in-out brightness-0 invert group-hover:brightness-0 group-hover:invert w-5 h-5 rotate-90"
                  />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Right Column: Animated Graphic with SVG Tech Orbit Rings (60% Width - 4:6 Ratio) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative z-10 w-full max-w-full lg:max-w-[60%] flex justify-center items-center"
          >
            <div className="relative w-full max-w-[800px] mx-auto flex items-center justify-center py-4">
              {/* Outer Soft Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D27E2B]/25 via-amber-400/15 to-indigo-500/20 blur-3xl scale-105 pointer-events-none animate-pulse" />

              {/* Background Tech SVG Orbital Rings Animation */}
              <div className="absolute inset-[-12%] z-0 pointer-events-none flex items-center justify-center">
                <svg
                  className="w-full h-full max-w-[760px] max-h-[760px] animate-spin-slow opacity-75"
                  viewBox="0 0 600 600"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="ring-orange" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D27E2B" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>
                  {/* Outer Dashed Orbit */}
                  <circle
                    cx="300"
                    cy="300"
                    r="265"
                    stroke="url(#ring-orange)"
                    strokeWidth="1.5"
                    strokeDasharray="8 14"
                  />
                  {/* Inner Tech Ring */}
                  <circle
                    cx="300"
                    cy="300"
                    r="215"
                    stroke="#D27E2B"
                    strokeOpacity="0.3"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                  />
                </svg>
              </div>

              {/* Central Image - Crisp HD Rendering */}
              <Image
                src="/ai-strategy/mcp-server/main-hero-section.png"
                alt="Custom MCP Server Development Services - Enterprise AI Gateway"
                width={1200}
                height={800}
                priority
                quality={100}
                unoptimized
                className="w-full h-auto object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(210,126,43,0.2)] "
              />
            </div>
          </motion.div>
        </div>
      </Row>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }
      `}</style>
    </Section>
  );
}
