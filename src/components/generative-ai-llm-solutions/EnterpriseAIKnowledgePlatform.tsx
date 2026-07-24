"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LuFileText,
  LuDatabase,
  LuUsers,
  LuMail,
  LuMessageSquare,
  LuCloud,
  LuGlobe,
  LuCheck,
  LuShield,
  LuZap,
  LuServer,
  LuCpu,
  LuCompass,
  LuSparkles,
  LuFileSpreadsheet,
  LuTrendingUp,
  LuArrowRight,
  LuBookOpen,
  LuTerminal,
  LuBrain,
  LuLock,
  LuActivity,
} from "react-icons/lu";
import Section from "../Section";
import Row from "../Row";
import SectionBadge from "../new-home-components/SectionBadge";

// --- DATA DEFINITIONS ---

const DATA_SOURCES = [
  {
    title: "Documents",
    desc: "PDF, Word, PPT, CSV, TXT",
    icon: LuFileText,
    color: "bg-red-500/10 text-red-600 border-red-500/20 group-hover:bg-red-500/20",
  },
  {
    title: "Databases",
    desc: "SQL, NoSQL, Data Warehouses",
    icon: LuDatabase,
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20 group-hover:bg-blue-500/20",
  },
  {
    title: "CRM & ERP",
    desc: "Salesforce, SAP, Oracle, Dynamics",
    icon: LuUsers,
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 group-hover:bg-emerald-500/20",
  },
  {
    title: "Emails & Messages",
    desc: "Outlook, Gmail, Slack, Teams",
    icon: LuMail,
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20 group-hover:bg-purple-500/20",
  },
  {
    title: "Cloud Repositories",
    desc: "Drive, Sharepoint, Dropbox, OneDrive",
    icon: LuCloud,
    color: "bg-sky-500/10 text-sky-600 border-sky-500/20 group-hover:bg-sky-500/20",
  },
  {
    title: "Web & APIs",
    desc: "REST Endpoints, Scraped Feeds, Webhooks",
    icon: LuGlobe,
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20 group-hover:bg-amber-500/20",
  },
];

const OUTCOMES = [
  {
    title: "Instant Q&A Answers",
    desc: "Contextual responses in seconds",
    icon: LuMessageSquare,
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20 group-hover:bg-indigo-500/20",
  },
  {
    title: "Smart Summarization",
    desc: "Condense 100+ page docs instantly",
    icon: LuFileSpreadsheet,
    color: "bg-teal-500/10 text-teal-600 border-teal-500/20 group-hover:bg-teal-500/20",
  },
  {
    title: "Semantic Vector Search",
    desc: "Find assets by concept & meaning",
    icon: LuCompass,
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20 group-hover:bg-blue-500/20",
  },
  {
    title: "Predictive Analytics",
    desc: "Uncover patterns & anomaly spikes",
    icon: LuTrendingUp,
    color: "bg-orange-500/10 text-orange-600 border-orange-500/20 group-hover:bg-orange-500/20",
  },
  {
    title: "Automated Reports",
    desc: "Synthesize executive briefs automatically",
    icon: LuFileText,
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20 group-hover:bg-purple-500/20",
  },
  {
    title: "Workflow Autopilot",
    desc: "Trigger tool APIs & background jobs",
    icon: LuZap,
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 group-hover:bg-emerald-500/20",
  },
];

const ECOSYSTEM_LOGOS = [
  { name: "Salesforce", path: "/ai-strategy/ai-chartbot-development/salesforce-logo.svg" },
  { name: "SAP", path: "/ai-strategy/generative-ai-llm-development/SAP-logo.svg" },
  { name: "Slack", path: "/ai-strategy/ai-chartbot-development/slack-logo.svg" },
  { name: "Microsoft Teams", path: "/ai-strategy/ai-chartbot-development/team.svg" },
  { name: "Google Drive", path: "/ai-strategy/ai-chartbot-development/google-drive.svg" },
  { name: "SharePoint", path: "/ai-strategy/generative-ai-llm-development/microsoft-sharepoint.svg" },
  { name: "Dropbox", path: "/ai-strategy/ai-chartbot-development/dropbox-logo.svg" },
  { name: "OneDrive", path: "/ai-strategy/ai-chartbot-development/onedrive-logo.svg" },
  { name: "AWS", path: "/ai-strategy/generative-ai-llm-development/aws-logo.svg" },
  { name: "Microsoft Azure", path: "/ai-strategy/generative-ai-llm-development/azure-logo.svg" },
  { name: "OpenAI", path: "/ai-strategy/generative-ai-llm-development/openai-logo.svg" },
];

const TRUST_COLUMNS = [
  {
    title: "Enterprise Security",
    icon: LuLock,
    iconColor: "text-blue-600 bg-blue-50 border-blue-100",
    checks: ["Role Based Access Control", "256-Bit End-to-End Encryption", "Immutable Audit Logging"],
  },
  {
    title: "Flexible Deployment",
    icon: LuCloud,
    iconColor: "text-purple-600 bg-purple-50 border-purple-100",
    checks: ["Private LLM VPC Deployment", "On-Premises Infrastructure", "Zero Data Retention Guarantee"],
  },
  {
    title: "Built for Scale",
    icon: LuActivity,
    iconColor: "text-amber-600 bg-amber-50 border-amber-100",
    checks: ["Sub-second Latency RAG", "Horizontal Auto-scaling", "99.9% Service SLA Uptime"],
  },
  {
    title: "Enterprise Ready",
    icon: LuShield,
    iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
    checks: ["SOC 2 Type II Certified", "GDPR & HIPAA Compliant", "24/7 Dedicated Support"],
  },
];

const PIPELINE_STEPS = [
  { step: "01", name: "Data Ingestion", desc: "Clean & parse 50+ enterprise data formats" },
  { step: "02", name: "Vector Embedding", desc: "Chunk & index vectors into Pinecone/Milvus" },
  { step: "03", name: "RAG Retrieval", desc: "Semantic context lookup with zero hallucination" },
  { step: "04", name: "LLM Generation", desc: "Synthesize source-cited intelligent outputs" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

export default function EnterpriseAIKnowledgePlatform() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Section className="py-24 lg:py-32 common_background_gradient bg-[#FAFAFC]  relative overflow-hidden text-slate-900">

      <Row>
        {/* Header Block */}
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center gap-4"
        >

            <SectionBadge title="AI-POWERED KNOWLEDGE INTELLIGENCE"  />

          {/* <span className="inline-flex items-center rounded-full bg-[#D27E2B]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D27E2B] border border-[#D27E2B]/20">
            AI-POWERED KNOWLEDGE INTELLIGENCE
          </span> */}
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-black leading-tight tracking-tight text-slate-900">
            Enterprise AI <span className="text-[#D27E2B]">Knowledge Platform</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            Unify all your enterprise data, systems, and tools into one intelligent AI brain. Ask anything, retrieve context, and trigger automated workflows.
          </p>
        </motion.div>

        {/* ── 3-Column Connected Neural Pipeline Matrix ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20 relative">
          
          {/* Left Column: Data Sources */}
          <motion.div
            {...fadeUp(0.1)}
            className="lg:col-span-4 bg-white border border-slate-200/90 rounded-3xl p-6.5 shadow-sm flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                  <LuServer className="w-4 h-4" />
                </span>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                  DATA INGEST HUB
                </h3>
              </div>
              <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">
                50+ Connectors
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {DATA_SOURCES.map((src, idx) => {
                const SrcIcon = src.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 p-3 rounded-2xl border border-slate-100/90 bg-slate-50/50 hover:bg-white hover:border-[#D27E2B]/40 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer group/item"
                  >
                    <span className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/item:scale-105 ${src.color}`}>
                      <SrcIcon className="w-4.5 h-4.5" />
                    </span>
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                        {src.title}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium leading-normal mt-0.5">
                        {src.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Center Column: Interactive Neural RAG Engine Core */}
          <motion.div
            {...fadeUp(0.2)}
            className="lg:col-span-4 bg-white border border-slate-200/90 rounded-3xl p-6.5 shadow-sm flex flex-col justify-between relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#D27E2B]/5 blur-3xl pointer-events-none" />

            <div>
              {/* Engine Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-[#D27E2B]/10 border border-[#D27E2B]/20 flex items-center justify-center text-[#D27E2B] font-bold shrink-0">
                    <LuCpu className="w-4 h-4 animate-pulse" />
                  </span>
                  <h3 className="text-xs font-black text-[#D27E2B] uppercase tracking-widest">
                    ENTERPRISE RAG CORE
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Active Engine</span>
                </div>
              </div>

              {/* Central Glowing Neural Core Orb Visual */}
              <div className="relative w-full aspect-square max-w-[240px] mx-auto flex items-center justify-center mb-6">
                {/* Orbit Rings */}
                <motion.svg
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                  className="absolute inset-0 w-full h-full text-[#D27E2B]/35 pointer-events-none"
                  viewBox="0 0 200 200"
                >
                  <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
                  <circle cx="190" cy="100" r="5" fill="#D27E2B" className="shadow-[0_0_10px_#D27E2B]" />
                </motion.svg>
                <motion.svg
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
                  className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] text-blue-500/35 pointer-events-none"
                  viewBox="0 0 200 200"
                >
                  <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 8" />
                  <circle cx="20" cy="100" r="4" fill="#3B82F6" />
                </motion.svg>

                {/* Levitating Center Sphere */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  className="relative w-36 h-36 rounded-full bg-gradient-to-tr from-[#D27E2B] via-purple-600 to-blue-600 p-[2px] shadow-[0_0_40px_rgba(210,126,43,0.25)] flex items-center justify-center z-10"
                >
                  <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center gap-1.5 border border-white/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#8B5CF6_1.5px,transparent_1.5px)] [background-size:10px_10px] opacity-30 pointer-events-none" />
                    <LuBrain className="w-10 h-10 text-[#D27E2B] relative z-10 animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest relative z-10">
                      AI BRAIN
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Active Pipeline Selector Steps */}
              <div className="flex flex-col gap-2 mb-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left mb-1">
                  REAL-TIME PIPELINE FLOW
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {PIPELINE_STEPS.map((ps, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                        activeStep === idx
                          ? "bg-[#D27E2B]/10 border-[#D27E2B] text-slate-900 font-bold shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                        activeStep === idx ? "bg-[#D27E2B] text-white" : "bg-slate-200 text-slate-700"
                      }`}>
                        {ps.step}
                      </span>
                      <span className="text-[11px] font-extrabold truncate">{ps.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step Explanation Banner */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-left">
              <p className="text-[10px] font-black text-[#D27E2B] uppercase tracking-wider mb-0.5">
                STEP {PIPELINE_STEPS[activeStep].step}: {PIPELINE_STEPS[activeStep].name}
              </p>
              <p className="text-xs text-slate-600 font-medium">
                {PIPELINE_STEPS[activeStep].desc}
              </p>
            </div>
          </motion.div>

          {/* Right Column: AI-Powered Outcomes */}
          <motion.div
            {...fadeUp(0.3)}
            className="lg:col-span-4 bg-white border border-slate-200/90 rounded-3xl p-6.5 shadow-sm flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 font-bold shrink-0">
                  <LuSparkles className="w-4 h-4" />
                </span>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                  AI-POWERED OUTCOMES
                </h3>
              </div>
              <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">
                Automated Actions
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {OUTCOMES.map((otc, idx) => {
                const OtcIcon = otc.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 p-3 rounded-2xl border border-slate-100/90 bg-slate-50/50 hover:bg-white hover:border-purple-500/40 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer group/item"
                  >
                    <span className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/item:scale-105 ${otc.color}`}>
                      <OtcIcon className="w-4.5 h-4.5" />
                    </span>
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                        {otc.title}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium leading-normal mt-0.5">
                        {otc.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </Row>

      {/* ── 4. Ecosystem Connections Continuous Marquee Strip (End-to-End Full Width) ── */}
      <motion.div
        {...fadeUp(0.2)}
        className="w-full mb-20 select-none py-4"
      >
        <p className="text-center text-xs sm:text-sm font-black text-slate-500 uppercase tracking-widest mb-8">
          CONNECT YOUR ENTERPRISE ECOSYSTEM
        </p>

        {/* Marquee Track Wrapper (End-to-End) */}
        <div className="relative w-full overflow-hidden group">
          {/* Fade edges for smooth entry/exit */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAFAFC] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAFAFC] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-5 sm:gap-6 items-center w-max animate-marquee group-hover:[animation-play-state:paused] py-6">
            {[...ECOSYSTEM_LOGOS, ...ECOSYSTEM_LOGOS, ...ECOSYSTEM_LOGOS].map((logo, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center gap-2.5 p-4 bg-white border border-slate-200/90 hover:border-[#D27E2B] hover:shadow-[0_12px_28px_rgba(210,126,43,0.18)] hover:bg-[#D27E2B]/[0.02] rounded-2xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer group/card w-[135px] sm:w-[150px] h-[108px] shrink-0"
              >
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center">
                  <Image
                    src={logo.path}
                    alt={logo.name}
                    width={44}
                    height={44}
                    className="object-contain max-h-full max-w-full transition-transform duration-300 group-hover/card:scale-110"
                  />
                </div>
                <span className="text-xs sm:text-sm font-black text-slate-700 group-hover/card:text-[#D27E2B] tracking-tight leading-none text-center transition-colors">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
        `}</style>
      </motion.div>

      <Row>

        {/* ── 5. Four Column Parameters Trust Section ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {TRUST_COLUMNS.map((col, idx) => {
            const ColIcon = col.icon;
            return (
              <motion.div
                key={idx}
                {...fadeUp(0.1 * idx)}
                className="bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer rounded-3xl p-6 flex flex-col gap-4 text-left group"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <span className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${col.iconColor}`}>
                    <ColIcon className="w-5 h-5" />
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-widest">
                    {col.title}
                  </h4>
                </div>

                <div className="flex flex-col gap-3">
                  {col.checks.map((chk, cIdx) => (
                    <div key={cIdx} className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                        <LuCheck className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span className="text-xs font-bold text-slate-600 leading-normal">
                        {chk}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── 6. Action Footer Banner ── */}
        <motion.div
          {...fadeUp(0.3)}
          className="w-full bg-[#172240] rounded-[28px] px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-xl text-white"
        >
          <div className="flex items-center gap-3.5">
            <span className="w-9 h-9 rounded-full bg-[#D27E2B]/20 border border-[#D27E2B]/30 flex items-center justify-center text-[#D27E2B]">
              <LuTerminal className="w-4.5 h-4.5" />
            </span>
            <p className="text-sm sm:text-base font-black tracking-tight text-white">
              Transform your enterprise with the power of AI.
            </p>
          </div>

          <motion.div className="border border-white/20 hover:border-[#D68029] bg-white/10 relative w-auto inline-flex items-center justify-center rounded-xl overflow-hidden text-white hover:text-white transition-all duration-700 ease-in-out group shadow-xs shrink-0">
            <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D27E2B] rounded group-hover:w-full group-hover:h-full"></span>
            <a
              href="#contact-form-section"
              className="relative tracking-tight text-sm sm:text-base px-6 py-3 cursor-pointer font-bold flex items-center gap-2 text-white"
            >
              Let's build your AI advantage
              <Image
                src="/navbar/btn_icon.png"
                alt="Arrow"
                width={20}
                height={20}
                className="transition-all duration-700 invert ease-in-out brightness-0 group-hover:brightness-0 group-hover:invert w-4.5 h-4.5"
              />
            </a>
          </motion.div>
        </motion.div>

      </Row>
    </Section>
  );
}
