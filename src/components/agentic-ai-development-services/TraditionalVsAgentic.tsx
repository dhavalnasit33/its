"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LuUser,
  LuBot,
  LuCircleX,
  LuTarget,
  LuBrainCircuit,
  LuWrench,
  LuCirclePlay,
  LuShieldCheck,
  LuCircleCheckBig,
  LuArrowDown,
  LuPlus,
} from "react-icons/lu";
import Section from "../Section";
import Row from "../Row";
import SectionBadge from "../new-home-components/SectionBadge";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

// 6 Agentic Autonomous Workflow Steps
const AGENTIC_WORKFLOW_STEPS = [
  {
    step: "1",
    title: "Business Goal",
    desc: "Define the desired outcome",
    icon: LuTarget,
    gradient: "from-purple-500 to-indigo-600 text-purple-600 bg-purple-50 border-purple-200",
    iconBg: "bg-purple-100/80 text-purple-600 border-purple-300",
  },
  {
    step: "2",
    title: "Reasoning & Planning",
    desc: "Analyze, break down & create a plan",
    icon: LuBrainCircuit,
    gradient: "from-indigo-500 to-blue-600 text-indigo-600 bg-indigo-50 border-indigo-200",
    iconBg: "bg-indigo-100/80 text-indigo-600 border-indigo-300",
  },
  {
    step: "3",
    title: "Choose Tools",
    desc: "Select the best APIs & data sources",
    icon: LuWrench,
    gradient: "from-purple-600 to-pink-600 text-purple-600 bg-purple-50 border-purple-200",
    iconBg: "bg-purple-100/80 text-purple-600 border-purple-300",
  },
  {
    step: "4",
    title: "Execute Tasks",
    desc: "Run actions across multiple platforms",
    icon: LuCirclePlay,
    gradient: "from-orange-500 to-amber-600 text-orange-600 bg-orange-50 border-orange-200",
    iconBg: "bg-orange-100/80 text-orange-600 border-orange-300",
  },
  {
    step: "5",
    title: "Verify Results",
    desc: "Validate accuracy and completeness",
    icon: LuShieldCheck,
    gradient: "from-emerald-500 to-teal-600 text-emerald-600 bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-100/80 text-emerald-600 border-emerald-300",
  },
  {
    step: "6",
    title: "Completed Outcome",
    desc: "Deliver final results automatically",
    icon: LuCircleCheckBig,
    gradient: "from-green-500 to-emerald-600 text-green-600 bg-green-50 border-green-200",
    iconBg: "bg-green-100/80 text-green-600 border-green-300",
  },
];

// Connected Brand Tool Logos
const BRAND_LOGOS = [
  { name: "Salesforce", logo: "/ai-strategy/brand-image/salesforce-logo.svg" },
  { name: "HubSpot", logo: "/ai-strategy/brand-image/hubspot-logo.svg" },
  { name: "Slack", logo: "/ai-strategy/brand-image/slack-logo.svg" },
  { name: "Google Drive", logo: "/ai-strategy/brand-image/google-drive.svg" },
  { name: "Gmail", logo: "/ai-strategy/brand-image/gmail-logo.svg" },
  { name: "Notion", logo: "/ai-strategy/brand-image/notion-logo.svg" },
  { name: "Jira", logo: "/ai-strategy/brand-image/jira-logo.svg" },
  { name: "Stripe", logo: "/ai-strategy/brand-image/stripe-logo.svg" },
];

export default function TraditionalVsAgentic() {
  return (
    <Section id="agentic-paradigm-shift" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden text-slate-900 bg-slate-50/60 border-t border-slate-200/60">
      <Row>
        {/* Section Header */}
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-14 max-w-3xl mx-auto flex flex-col items-center gap-3"
        >
          <SectionBadge title="THE PARADIGM SHIFT" />
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-black leading-tight tracking-tight text-slate-900">
            Traditional AI <span className="text-slate-400 font-medium">vs</span>{" "}
            <span className="text-[#D27E2B]">Agentic AI</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            Understand how Agentic AI transforms artificial intelligence from a passive conversational chatbot into an autonomous execution engine.
          </p>
        </motion.div>

        {/* ── Main Comparison Layout Container ── */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* ── CENTRAL SLEEK "VS" GAP CONNECTOR (Idea 1 - Zero Overlap) ── */}
          <div className="hidden lg:flex absolute left-[32.6%] xl:left-[32.8%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none flex-col items-center justify-center">
            <div className="w-0.5 h-16 bg-gradient-to-b from-transparent via-[#D27E2B]/50 to-[#D27E2B]" />
            <div className="bg-white/95 backdrop-blur-md border border-[#D27E2B]/40 shadow-lg rounded-full px-3.5 py-1.5 flex items-center justify-center my-1">
              <span className="text-xs font-black text-slate-900 tracking-wider">
                VS
              </span>
            </div>
            <div className="w-0.5 h-16 bg-gradient-to-b from-[#D27E2B] via-[#D27E2B]/50 to-transparent" />
          </div>

          {/* ── 1. LEFT CARD: TRADITIONAL AI (Col-1 to Col-4) ── */}
          <motion.div
            {...fadeUp(0.1)}
            className="lg:col-span-4 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              {/* Pill Badge */}
              <div className="mb-5">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                  TRADITIONAL AI
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
                Responds to Prompts
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mb-6 leading-relaxed">
                Traditional AI responds to a single user request and stops there.
              </p>

              {/* User Prompt Box */}
              <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <LuUser className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">User Prompt</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    "Generate a quarterly executive business report and reconcile customer accounts"
                  </p>
                </div>
              </div>

              {/* Down Arrow */}
              <div className="flex justify-center my-2 text-indigo-400">
                <LuArrowDown className="w-4 h-4 animate-bounce" />
              </div>

              {/* AI Response Box */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3.5 mb-7">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <LuBot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">AI Response</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    "Here is a generic template outline for an executive report."
                  </p>
                </div>
              </div>

              {/* Warning List: Humans Still Need To */}
              <div className="bg-red-50/40 border border-red-100 rounded-2xl p-4 mb-6">
                <h4 className="text-xs font-bold text-red-600 mb-3 flex items-center gap-1.5">
                  Then what? Humans still need to:
                </h4>
                <ul className="flex flex-col gap-2 text-xs font-medium text-slate-600">
                  <li className="flex items-center gap-2">
                    <LuCircleX className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>Query Salesforce & SAP databases manually</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCircleX className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>Reconcile cross-system financial figures</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCircleX className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>Format charts & slides for leadership</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCircleX className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>Distribute report & assign follow-up tasks</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Red Negative Pill Tags Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-red-50 text-red-600 border border-red-200">
                <LuCircleX className="w-3 h-3" />
                Manual Effort
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-red-50 text-red-600 border border-red-200">
                <LuCircleX className="w-3 h-3" />
                No API Access
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-red-50 text-red-600 border border-red-200">
                <LuCircleX className="w-3 h-3" />
                One-Off Answer
              </span>
            </div>
          </motion.div>

          {/* ── 2. RIGHT CARD: AGENTIC AI (Col-5 to Col-12) ── */}
          <motion.div
            {...fadeUp(0.2)}
            className="lg:col-span-8 bg-white border-2 border-[#D27E2B]/40 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between relative overflow-hidden"
          >
            {/* Soft Ambient Radial Light */}
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#D27E2B]/10 blur-3xl pointer-events-none" />

            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-5">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-orange-50 text-[#D27E2B] border border-orange-200">
                  AGENTIC AI
                </span>
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-slate-900 text-white shadow-2xs">
                  Autonomous Work Engine
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight">
                Executes Goals. Delivers Outcomes.
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mb-8 max-w-2xl leading-relaxed">
                Agentic AI understands goals, creates a plan, uses the right tools, executes tasks, verifies results, and delivers complete outcomes.
              </p>

              {/* ── 6-Step Horizontal Process Row with Connected Flow ── */}
              <div className="relative mb-9">
                {/* Desktop Flow Connecting Dashed Line */}
                <div className="hidden lg:block absolute top-[28px] left-[7%] right-[7%] h-0.5 border-t-2 border-dashed border-[#D27E2B]/30 z-0 pointer-events-none" />

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
                  {AGENTIC_WORKFLOW_STEPS.map((step, idx) => {
                    const StepIcon = step.icon;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -4 }}
                        className="bg-slate-50/90 border cursor-pointer border-slate-200/90 rounded-2xl p-3.5 flex flex-col items-center text-center gap-2.5 transition-all duration-300 hover:border-[#D27E2B] hover:bg-white hover:shadow-md relative group"
                      >
                        {/* Step Number Dot */}
                        <span className="w-5 h-5 rounded-full bg-[#D27E2B] text-white font-black text-[10px] flex items-center justify-center shadow-xs mb-[-4px] z-10">
                          {step.step}
                        </span>

                        {/* Icon Circle */}
                        <div className={`w-11 h-11 rounded-full border flex items-center justify-center shrink-0 ${step.iconBg} shadow-xs group-hover:scale-110 transition-transform`}>
                          <StepIcon className="w-5 h-5" />
                        </div>

                        {/* Title & Desc */}
                        <div>
                          <h4 className="text-xs font-black text-slate-900 leading-tight">
                            {step.title}
                          </h4>
                          <p className="text-[10px] text-slate-500 font-medium mt-1 leading-tight">
                            {step.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Connected Enterprise Tools Integration Grid (Square Boxes in Theme Style) ── */}
            <div className="pt-6 border-t border-slate-100">
              <p className="text-center text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                Connected to the tools you use every day
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                {BRAND_LOGOS.map((brand, bIdx) => (
                  <motion.div
                    key={bIdx}
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="min-w-[84px] sm:min-w-[96px] h-20 sm:h-22 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#D27E2B] hover:shadow-md transition-all flex flex-col items-center justify-center px-2 py-2 group cursor-pointer"
                  >
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={30}
                      height={30}
                      className="w-7 h-7 object-contain group-hover:scale-110 transition-transform"
                    />
                    <span className="text-[11px] font-extrabold text-slate-800 group-hover:text-[#D27E2B] transition-colors text-center leading-tight mt-1.5 whitespace-normal">
                      {brand.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>

        </div>
      </Row>
    </Section>
  );
}
