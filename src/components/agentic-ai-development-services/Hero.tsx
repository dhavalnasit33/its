"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LuBot,
  LuCpu,
  LuWorkflow,
  // LuCheckCircle,
  LuDatabase,
  LuMail,
  LuCalendar,
  LuMessageSquare,
  LuCode,
  LuBriefcase,
  LuTrendingUp,
  LuSparkles,
  LuArrowRight,
  LuShieldCheck,
  LuZap,
} from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Button from "@/components/Button";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

// Connected Enterprise Tools
const CONNECTED_TOOLS = [
  { name: "CRM Integration", label: "Salesforce / HubSpot Sync", icon: LuTrendingUp, color: "text-blue-500 bg-blue-50 border-blue-100" },
  { name: "ERP Hub", label: "SAP & Oracle Records", icon: LuBriefcase, color: "text-[#D27E2B] bg-orange-50 border-orange-100" },
  { name: "Slack Link", label: "Intelligent Chat Sync", icon: LuMessageSquare, color: "text-purple-500 bg-purple-50 border-purple-100" },
  { name: "Communications", label: "Automated Email Handlers", icon: LuMail, color: "text-red-500 bg-red-50 border-red-100" },
  { name: "Scheduling", label: "Autonomous Calendar Agents", icon: LuCalendar, color: "text-indigo-500 bg-indigo-50 border-indigo-100" },
  { name: "CI/CD & DevOps", label: "GitHub Code Automation", icon: LuCode, color: "text-slate-800 bg-slate-100 border-slate-200" },
  { name: "Databases", label: "SQL & Vector Knowledge Bases", icon: LuDatabase, color: "text-emerald-500 bg-emerald-50 border-emerald-100" },
];

// Workflow Execution Cards
const WORKFLOW_CARDS = [
  {
    title: "Lead Intelligence Hub",
    agent: "Autonomous SDR Agent",
    status: "Executing Task",
    statusBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    action: "Enriching Lead Records & Drafting Proposal Mockup",
    icon: LuTrendingUp,
  },
  {
    title: "Audit & Compliance Engine",
    agent: "Financial Operations Agent",
    status: "Tool Calling",
    statusBg: "bg-blue-50 text-blue-600 border-blue-200",
    action: "Reconciling Cross-System Ledger Discrepancies",
    icon: LuBriefcase,
  },
  {
    title: "Operations Co-Pilot",
    agent: "Workforce Orchestrator Agent",
    status: "Verified",
    statusBg: "bg-purple-50 text-purple-600 border-purple-200",
    action: "Verifying Audit Logs & Dispatching Notifications",
    icon: LuBot,
  },
];

export default function Hero() {
  const [imgError, setImgError] = React.useState(false);

  return (
    <Section className="  lg:py-0! common_background_gradient   overflow-hidden text-slate-900">
      <Row>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-14 relative z-10 w-full">
          
          {/* ── Left Column: Headline & Value Proposition ── */}
          <div className="w-full max-w-full lg:max-w-[48%]">
            
            {/* Sub-badge */}
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 text-[#D27E2B] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-6">
                <span className="w-5 h-0.5 bg-[#D27E2B]" />
                Enterprise Agentic AI Solutions
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-4xl md:text-[46px] xl:text-[54px] font-extrabold mb-6 leading-[1.15] tracking-tight text-[#0F172A]"
            >
              Deploy Autonomous AI Agents to <span className="text-[#D27E2B]">Orchestrate Enterprise Workflows</span>
            </motion.h1>

            {/* Value Description */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-medium"
            >
              Design, build, and integrate custom AI agents that reason, plan, utilize enterprise tools, and execute complex multi-step workflows autonomously to drive operational efficiency.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.3)}
              className="flex flex-wrap items-center gap-4"
            >
              <Button
                bgColor="#D27E2B"
                hoverColor="#0F172A"
                text="Start Your Agentic AI Project"
                href="#contact-form-section"
                icon="/navbar/btn_icon.png"
              />

              <motion.div className="border border-slate-900/30 hover:border-[#D27E2B] bg-slate-900 relative w-auto inline-flex items-center justify-center rounded-xl overflow-hidden text-white hover:text-white transition-all duration-700 ease-in-out group shadow-sm">
                <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D27E2B] rounded-lg group-hover:w-full group-hover:h-full"></span>
                <a
                  href="#agentic-paradigm-shift"
                  className="relative tracking-tight text-sm sm:text-base px-6 py-3 sm:px-7 sm:py-3.5 cursor-pointer font-bold flex items-center gap-2 z-10"
                >
                  Talk to an AI Expert
                  <Image
                    src="/navbar/btn_icon.png"
                    alt="Arrow"
                    width={20}
                    height={20}
                    className="transition-all duration-700 invert ease-in-out brightness-0 group-hover:brightness-0 group-hover:invert w-4 h-4 rotate-90"
                  />
                </a>
              </motion.div>
            </motion.div>

          </div>

          {/* ── Right Column: Hero 3D Graphic Image with Animated Backdrop ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-[60%] flex justify-center items-center relative min-h-[460px] sm:min-h-[520px]"
          >
            {/* ── 1. ANIMATED BACKGROUND ELEMENTS BEHIND IMAGE ── */}
            
            {/* Multi-layered Pulsing Light Orbs */}
            <div className="absolute w-80 h-80   rounded-full bg-gradient-to-tr from-[#D27E2B]/20 via-blue-500/15 to-purple-500/15 blur-2xl scale-105 z-0 animate-pulse" />
            <div className="absolute top-4 left-6 w-56 h-56 rounded-full bg-[#D27E2B]/15 blur-3xl z-0 animate-pulse" />
            <div className="absolute bottom-4 right-6 w-60 h-60 rounded-full bg-blue-600/15 blur-3xl z-0 animate-pulse" />

            {/* Dual Rotating SVG Orbital Tech Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="w-[90%] h-[90%] max-w-[500px] max-h-[500px] opacity-25 text-[#D27E2B]"
                viewBox="0 0 400 400"
              >
                <circle
                  cx="200"
                  cy="200"
                  r="180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="8 8"
                />
                <circle cx="200" cy="20" r="4" fill="currentColor" />
                <circle cx="380" cy="200" r="4" fill="currentColor" />
              </motion.svg>

              <motion.svg
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
                className="absolute w-[75%] h-[75%] max-w-[420px] max-h-[420px] opacity-20 text-blue-600"
                viewBox="0 0 300 300"
              >
                <circle
                  cx="150"
                  cy="150"
                  r="135"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                />
                <circle cx="150" cy="15" r="3.5" fill="currentColor" />
                <circle cx="15" cy="150" r="3.5" fill="currentColor" />
              </motion.svg>
            </div>

            {/* Glowing Tech Spark Nodes */}
            <div className="absolute top-12 left-10 w-2.5 h-2.5 rounded-full bg-[#D27E2B] shadow-[0_0_12px_#D27E2B] animate-ping z-0" />
            <div className="absolute bottom-16 right-12 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_#3B82F6] animate-ping z-0" />
            <div className="absolute top-20 right-16 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#8B5CF6] animate-pulse z-0" />

            {/* MAIN IMAGE DISPLAY */}
            {!imgError ? (
              <div className="relative w-full z-10 flex justify-center">
                <Image
                  src="/ai-strategy/agentic-ai-development-services/hero-section-image-agentict-ai-1.png"
                  alt="Agentic AI Development Services - Autonomous AI Workforce"
                  width={780}
                  height={780}
                  priority
                  className="object-contain w-full h-auto drop-shadow-xl relative scale-110"
                  onError={() => setImgError(true)}
                />
              </div>
            ) : (
              /* Fallback: Glassmorphic AI Mission Control Container */
              <div className="w-full max-w-xl bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xl relative z-10 flex flex-col gap-5 overflow-hidden">
                
                {/* 1. Master Orchestrator Node */}
                <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-4.5 border border-slate-800 shadow-md flex items-center justify-between gap-4 relative overflow-hidden">
                  <div className="flex items-center gap-3.5 relative z-10">
                    <div className="w-11 h-11 rounded-xl bg-[#D27E2B]/20 border border-[#D27E2B]/40 flex items-center justify-center text-[#D27E2B] shrink-0">
                      <LuCpu className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-black tracking-tight text-white">
                          AI MASTER ORCHESTRATOR
                        </h3>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium">
                        Autonomous Reasoning & Tool Router Engine
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full shrink-0">
                    100% Autonomous
                  </span>
                </div>

                {/* Connecting Pulse Laser Beams */}
                <div className="flex justify-center -my-2">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-[#D27E2B] to-blue-500 animate-pulse" />
                </div>

                {/* 2. Glass Workflow Cards Stack */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <LuWorkflow className="w-3.5 h-3.5 text-[#D27E2B]" />
                      ACTIVE WORKFLOW EXECUTIONS
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      Real-time Pipeline
                    </span>
                  </div>

                  {WORKFLOW_CARDS.map((card, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="bg-slate-50/90 border cursor-pointer border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-xs hover:border-[#D27E2B]/40 hover:bg-white transition-all duration-300 group "
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-8.5 h-8.5 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#D27E2B] shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                          <card.icon className="w-4.5 h-4.5" />
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-black text-slate-900 leading-tight">
                              {card.title}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-medium">
                              ({card.agent})
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                            {card.action}
                          </p>
                        </div>
                      </div>

                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-md border shrink-0 ${card.statusBg}`}>
                        {card.status}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Connecting Pulse Lines */}
                <div className="flex justify-center -my-2">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500 to-purple-500 animate-pulse" />
                </div>

                {/* 3. Connected Enterprise Tools Network */}
                <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <LuDatabase className="w-3.5 h-3.5 text-blue-400" />
                      CONNECTED ENTERPRISE TOOLS (MCP INTEGRATED)
                    </span>
                    <span className="text-[10px] font-extrabold text-emerald-400">
                      7 Active Tool Interfaces
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {CONNECTED_TOOLS.map((tool, tIdx) => {
                      const ToolIcon = tool.icon;
                      return (
                        <div
                          key={tIdx}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-black ${tool.color} transition-transform hover:scale-105 cursor-pointer`}
                        >
                          <ToolIcon className="w-3.5 h-3.5" />
                          <span>{tool.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}
          </motion.div>

        </div>
      </Row>
    </Section>
  );
}
