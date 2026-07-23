"use client";

import React from "react";
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
} from "react-icons/lu";
import Section from "../Section";
import Row from "../Row";

// --- DATA DEFINITIONS ---

const DATA_SOURCES = [
  {
    title: "Documents",
    desc: "PDF, Word, PPT, CSV, TXT",
    icon: LuFileText,
    color: "bg-red-500/10 text-red-500 border-red-500/20",
  },
  {
    title: "Databases",
    desc: "SQL, NoSQL, Data Warehouses",
    icon: LuDatabase,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    title: "CRM & ERP",
    desc: "Salesforce, SAP, Oracle, Dynamics",
    icon: LuUsers,
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  {
    title: "Emails",
    desc: "Outlook, Gmail, IMAP",
    icon: LuMail,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
  {
    title: "Collaboration",
    desc: "Slack, Teams, Confluence",
    icon: LuMessageSquare,
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  {
    title: "Cloud Storage",
    desc: "Drive, Dropbox, OneDrive",
    icon: LuCloud,
    color: "bg-sky-500/10 text-sky-500 border-sky-500/20",
  },
  {
    title: "Web & APIs",
    desc: "Websites, APIs, External Data",
    icon: LuGlobe,
    color: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  },
];

const OUTCOMES = [
  {
    title: "Instant Answers",
    desc: "Get accurate answers instantly",
    icon: LuMessageSquare,
    color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  },
  {
    title: "Smart Summaries",
    desc: "Summarize any content",
    icon: LuFileSpreadsheet,
    color: "bg-teal-500/10 text-teal-500 border-teal-500/20",
  },
  {
    title: "Advanced Search",
    desc: "Semantic search across all data",
    icon: LuCompass,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    title: "Insights & Analytics",
    desc: "Discover trends & insights",
    icon: LuTrendingUp,
    color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  },
  {
    title: "Automated Reports",
    desc: "Generate reports in seconds",
    icon: LuFileText,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
  {
    title: "Workflow Automation",
    desc: "Trigger actions & workflows",
    icon: LuZap,
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
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
  { name: "REST APIs", path: "", fallbackIcon: LuGlobe },
  { name: "Custom Systems", path: "", fallbackIcon: LuCpu },
  { name: "OpenAI", path: "/ai-strategy/generative-ai-llm-development/openai-logo.svg" },
];

const TRUST_COLUMNS = [
  {
    title: "Enterprise Security",
    icon: LuShield,
    iconColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    checks: ["Role Based Access", "End-to-End Encryption", "Audit Logs & Compliance"],
  },
  {
    title: "Flexible Deployment",
    icon: LuCloud,
    iconColor: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    checks: ["Private LLM Deployment", "On-Prem / VPC Support", "Zero Data Retention Option"],
  },
  {
    title: "Built for Scale",
    icon: LuZap,
    iconColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    checks: ["High Performance", "Scalable Architecture", "99.9% Uptime Reliability"],
  },
  {
    title: "Enterprise Ready",
    icon: LuCheck,
    iconColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    checks: ["SOC 2 Type II Compliant", "GDPR & HIPAA Ready", "Dedicated Support"],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

export default function EnterpriseAIKnowledgePlatform() {
  return (
    <Section className="bg-[#FAF9FB] py-24 lg:py-32 relative overflow-hidden">
      {/* Dynamic light gradient background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#D27E2B]/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-500/5 to-transparent blur-[120px] pointer-events-none" />

      <Row>
        {/* Header Block */}
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-20 max-w-3xl mx-auto flex flex-col items-center gap-4"
        >
          <span className="inline-flex items-center rounded-full bg-[#D27E2B]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D27E2B] border border-[#D27E2B]/20">
            AI-POWERED KNOWLEDGE INTELLIGENCE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-black leading-tight tracking-tight text-slate-900">
            Enterprise AI <span className="text-[#D27E2B]">Knowledge Platform</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            Unify all your enterprise data, systems and tools into one intelligent AI brain. Ask anything. Get accurate, contextual answers. Take action.
          </p>
        </motion.div>

        {/* Triple Column Grid: Left (Sources) | Center (Brain Graphic) | Right (Outcomes) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          
          {/* 1. Left Column: Enterprise Data Sources */}
          <motion.div
            {...fadeUp(0.1)}
            className="lg:col-span-4 bg-white/60 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-5 text-left"
          >
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <span className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                <LuServer className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                ENTERPRISE DATA SOURCES
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {DATA_SOURCES.map((src, idx) => {
                const SrcIcon = src.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all duration-300 group"
                  >
                    <span className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${src.color}`}>
                      <SrcIcon className="w-5 h-5" />
                    </span>
                    <div className="text-left">
                      <p className="text-sm font-extrabold text-slate-900 leading-tight">
                        {src.title}
                      </p>
                      <p className="text-xs text-slate-500 font-medium leading-normal mt-0.5">
                        {src.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* 2. Center Column: AI Knowledge Brain Platform */}
          <motion.div
            {...fadeUp(0.2)}
            className="lg:col-span-4 flex flex-col items-center justify-center gap-6"
          >
            {/* Brain holographic rendering */}
            <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-[#D27E2B]/5 rounded-full filter blur-3xl scale-95 animate-pulse" />
              <Image
                src="/ai-strategy/generative-ai-llm-development/ai-knowledge-brain.png"
                alt="AI Knowledge Brain"
                width={360}
                height={360}
                priority
                className="object-contain w-full h-auto relative z-10 scale-105 drop-shadow-2xl"
              />
            </div>

            {/* Central Platform Strip */}
            <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm text-center relative z-20">
              <p className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">
                One Intelligent AI Brain
              </p>
              <div className="grid grid-cols-4 gap-1 items-center justify-center text-[10px] sm:text-xs font-bold text-slate-500">
                <div className="flex flex-col items-center gap-1 hover:text-slate-900 transition-colors">
                  <LuCpu className="w-3.5 h-3.5 text-[#D27E2B]" />
                  <span>Understands</span>
                </div>
                <div className="flex flex-col items-center gap-1 hover:text-slate-900 transition-colors">
                  <LuBookOpen className="w-3.5 h-3.5 text-[#D27E2B]" />
                  <span>Learns</span>
                </div>
                <div className="flex flex-col items-center gap-1 hover:text-slate-900 transition-colors">
                  <LuCompass className="w-3.5 h-3.5 text-[#D27E2B]" />
                  <span>Retrieves</span>
                </div>
                <div className="flex flex-col items-center gap-1 hover:text-slate-900 transition-colors">
                  <LuSparkles className="w-3.5 h-3.5 text-[#D27E2B]" />
                  <span>Generates</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. Right Column: AI-Powered Outcomes */}
          <motion.div
            {...fadeUp(0.3)}
            className="lg:col-span-4 bg-white/60 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-5 text-left"
          >
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <span className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-650 font-bold shrink-0">
                <LuSparkles className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                AI-POWERED OUTCOMES
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {OUTCOMES.map((otc, idx) => {
                const OtcIcon = otc.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all duration-300 group"
                  >
                    <span className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${otc.color}`}>
                      <OtcIcon className="w-5 h-5" />
                    </span>
                    <div className="text-left">
                      <p className="text-sm font-extrabold text-slate-900 leading-tight">
                        {otc.title}
                      </p>
                      <p className="text-xs text-slate-500 font-medium leading-normal mt-0.5">
                        {otc.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* 4. Ecosystem Connections Strip */}
        <motion.div
          {...fadeUp(0.2)}
          className="w-full bg-white/80 border border-slate-200 rounded-3xl p-8 mb-16 text-center shadow-xs"
        >
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">
            CONNECT YOUR ENTERPRISE ECOSYSTEM
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 max-w-6xl mx-auto">
            {ECOSYSTEM_LOGOS.map((logo, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center gap-1.5 p-3 border border-slate-100 hover:border-slate-200 bg-slate-50/40 hover:bg-slate-50 rounded-xl transition-all duration-300 w-[95px] sm:w-[110px] h-[75px] shrink-0"
              >
                {logo.path ? (
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <Image
                      src={logo.path}
                      alt={logo.name}
                      width={32}
                      height={32}
                      className="object-contain max-h-full max-w-full"
                    />
                  </div>
                ) : (
                  <span className="w-8 h-8 flex items-center justify-center text-slate-400">
                    {logo.fallbackIcon && <logo.fallbackIcon className="w-5 h-5" />}
                  </span>
                )}
                <span className="text-[10px] font-bold text-slate-500 tracking-tight leading-none text-center">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 5. Four Column Parameters Trust Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {TRUST_COLUMNS.map((col, idx) => {
            const ColIcon = col.icon;
            return (
              <motion.div
                key={idx}
                {...fadeUp(0.1 * idx)}
                className="bg-white/70 border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col gap-4 text-left"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <span className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${col.iconColor}`}>
                    <ColIcon className="w-5 h-5" />
                  </span>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                    {col.title}
                  </h4>
                </div>

                <div className="flex flex-col gap-2.5">
                  {col.checks.map((chk, cIdx) => (
                    <div key={cIdx} className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                        <LuCheck className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-600 leading-normal">
                        {chk}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 6. Action Footer Banner */}
        <motion.div
          {...fadeUp(0.3)}
          className="w-full bg-[#172240] rounded-[24px] px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-lg text-white"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#D27E2B]/10 border border-[#D27E2B]/20 flex items-center justify-center text-[#D27E2B]">
              <LuTerminal className="w-4 h-4" />
            </span>
            <p className="text-sm sm:text-base font-black tracking-tight text-slate-100">
              Transform your enterprise with the power of AI.
            </p>
          </div>

          <a
            href="#contact-form-section"
            className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#D27E2B] hover:text-[#e4903d] transition-all group shrink-0"
          >
            Let's build your AI advantage
            <LuArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

      </Row>
    </Section>
  );
}
