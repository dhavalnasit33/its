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
  { name: "CRM", label: "Salesforce / Hubspot", icon: LuTrendingUp, color: "text-blue-500 bg-blue-50 border-blue-100" },
  { name: "ERP", label: "SAP / Oracle", icon: LuBriefcase, color: "text-[#D27E2B] bg-orange-50 border-orange-100" },
  { name: "Slack", label: "Messaging Sync", icon: LuMessageSquare, color: "text-purple-500 bg-purple-50 border-purple-100" },
  { name: "Email", label: "Outlook / Gmail", icon: LuMail, color: "text-red-500 bg-red-50 border-red-100" },
  { name: "Calendar", label: "Auto Scheduling", icon: LuCalendar, color: "text-indigo-500 bg-indigo-50 border-indigo-100" },
  { name: "GitHub", label: "Code & CI/CD", icon: LuCode, color: "text-slate-800 bg-slate-100 border-slate-200" },
  { name: "Database", label: "SQL & Vector DB", icon: LuDatabase, color: "text-emerald-500 bg-emerald-50 border-emerald-100" },
];

// Workflow Execution Cards
const WORKFLOW_CARDS = [
  {
    title: "Sales Workflow",
    agent: "Lead Qualification Agent",
    status: "Executing Task",
    statusBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    action: "Updating CRM Lead Score + Generating Proposal",
    icon: LuTrendingUp,
  },
  {
    title: "Finance Workflow",
    agent: "Audit & Invoice Agent",
    status: "Tool Calling",
    statusBg: "bg-blue-50 text-blue-600 border-blue-200",
    action: "Reconciling SAP Invoices & Expense Approvals",
    icon: LuBriefcase,
  },
  {
    title: "HR Workflow",
    agent: "Onboarding Co-Pilot",
    status: "Verified",
    statusBg: "bg-purple-50 text-purple-600 border-purple-200",
    action: "Verifying Compliance & Scheduling Interviews",
    icon: LuBot,
  },
];

export default function Hero() {
  const [imgError, setImgError] = React.useState(false);

  return (
    <Section className="lg:py-20! common_background_gradient relative overflow-hidden text-slate-900">
      <Row>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-14 relative z-10 w-full">
          
          {/* ── Left Column: Headline & Value Proposition ── */}
          <div className="w-full max-w-full lg:max-w-[48%]">
            
            {/* Sub-badge */}
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 text-[#D27E2B] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-4">
                <span className="w-6 h-0.5 bg-[#D27E2B]" />
                AUTONOMOUS AI WORKFORCE
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-4xl md:text-[46px] xl:text-[54px] font-black mb-6 leading-[1.12] tracking-tight text-slate-900"
            >
              Agentic AI <br />
              Development <br />
              <span className="text-[#D27E2B]">Services</span>
            </motion.h1>

            {/* Value Description */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-medium"
            >
              Build intelligent AI agents that can reason, plan, make decisions, use business tools, collaborate with other agents, and execute complex workflows autonomously.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.3)}
              className="flex flex-wrap items-center gap-4"
            >
              <Button
                bgColor="#D27E2B"
                hoverColor="#0F172A"
                text="Build AI Agents"
                href="#contact-form-section"
                icon="/navbar/btn_icon.png"
              />

              <motion.div className="border border-slate-900/30 hover:border-[#D27E2B] bg-slate-900 relative w-auto inline-flex items-center justify-center rounded-xl overflow-hidden text-white hover:text-white transition-all duration-700 ease-in-out group shadow-sm">
                <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D27E2B] rounded-lg group-hover:w-full group-hover:h-full"></span>
                <a
                  href="#contact-form-section"
                  className="relative tracking-tight text-sm sm:text-base px-6 py-3 sm:px-7 sm:py-3.5 cursor-pointer font-bold flex items-center gap-2 z-10"
                >
                  Schedule Consultation
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

            {/* 6 Key Trust Badges */}
            <motion.div
              {...fadeUp(0.4)}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-10 pt-6 border-t border-slate-200/80 text-xs font-black text-slate-700"
            >
              <div className="flex items-center gap-2 bg-white/70 border border-slate-200/80 px-3 py-2 rounded-xl shadow-xs">
                <LuCpu className="w-4 h-4 text-[#D27E2B]" />
                <span>Multi-Agent Systems</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 border border-slate-200/80 px-3 py-2 rounded-xl shadow-xs">
                <LuWorkflow className="w-4 h-4 text-blue-600" />
                <span>Autonomous Workflows</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 border border-slate-200/80 px-3 py-2 rounded-xl shadow-xs">
                <LuShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Human-in-the-Loop</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 border border-slate-200/80 px-3 py-2 rounded-xl shadow-xs">
                <LuBriefcase className="w-4 h-4 text-emerald-600" />
                <span>Enterprise Ready</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 border border-slate-200/80 px-3 py-2 rounded-xl shadow-xs">
                <LuZap className="w-4 h-4 text-amber-500" />
                <span>Tool Calling (MCP)</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 border border-slate-200/80 px-3 py-2 rounded-xl shadow-xs">
                <LuBot className="w-4 h-4 text-cyan-600" />
                <span>Secure Deployment</span>
              </div>
            </motion.div>

          </div>

          {/* ── Right Column: Hero 3D Graphic Image + Floating Badges ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-[52%] flex justify-center items-center relative min-h-[460px] sm:min-h-[500px]"
          >
            {/* Glowing Ambient Radial Halo */}
            <div className="absolute w-84 h-84 rounded-full bg-gradient-to-tr from-[#D27E2B]/15 via-blue-500/10 to-purple-500/10 blur-3xl scale-125 z-0" />

            {/* FLOATING ROUND CARDS & TOOL LOGOS (Framing the Main Image) */}
            
            {/* Floating Card 1: Top Left */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-3 -left-2 sm:left-4 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-xl z-20 hidden sm:flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                <LuCpu className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-black text-slate-900">AI Master Orchestrator</h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <p className="text-[10px] text-slate-500 font-semibold">100% Autonomous Execution</p>
              </div>
            </motion.div>

            {/* Floating Card 2: Top Right */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-4 -right-2 sm:right-2 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-xl z-20 hidden sm:flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 font-bold shrink-0">
                <LuWorkflow className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">Multi-Agent Engine</h4>
                <p className="text-[10px] text-purple-600 font-bold">LangGraph & CrewAI</p>
              </div>
            </motion.div>

            {/* Floating Card 3: Bottom Left */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-6 -left-2 sm:left-2 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-xl z-20 hidden sm:flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D27E2B] font-bold shrink-0">
                <LuZap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">MCP Tool Calling</h4>
                <p className="text-[10px] text-slate-500 font-semibold">Salesforce, SAP, Slack, GitHub</p>
              </div>
            </motion.div>

            {/* Floating Card 4: Bottom Right */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.8 }}
              className="absolute bottom-2 -right-2 sm:right-4 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-xl z-20 hidden sm:flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold shrink-0">
                <LuShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">Human-in-the-Loop</h4>
                <p className="text-[10px] text-emerald-600 font-bold">100% Reliable Audit Trail</p>
              </div>
            </motion.div>

            {/* MAIN IMAGE DISPLAY */}
            {!imgError ? (
              <div className="relative w-full z-10 flex justify-center">
                <Image
                  src="/ai-strategy/agentic-ai-development-services/hero-main-image.png"
                  alt="Agentic AI Development Services - Autonomous AI Workforce"
                  width={850}
                  height={850}
                  priority
                  className="object-contain w-full h-auto drop-shadow-2xl scale-105 transition-transform duration-500 hover:scale-[1.07]"
                  onError={() => setImgError(true)}
                />
              </div>
            ) : (
              /* Fallback: Glassmorphic AI Mission Control Container */
              <div className="w-full max-w-xl bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xl relative z-10 flex flex-col gap-5 overflow-hidden">
                
                {/* 1. Master Orchestrator Node */}
                <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-4.5 border border-slate-800 shadow-md flex items-center justify-between gap-4 relative overflow-hidden">
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
                      className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-xs hover:border-[#D27E2B]/40 hover:bg-white transition-all duration-300 group cursor-pointer"
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
