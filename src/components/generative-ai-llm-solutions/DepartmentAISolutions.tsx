"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuUsers,
  LuTrendingUp,
  LuSettings,
  LuShield,
  LuArrowUpRight,
  LuCheck,
  LuMegaphone,
  LuHeadphones,
  LuDollarSign,
  LuUserCheck,
  LuWorkflow,
  LuSparkles,
} from "react-icons/lu";
import Section from "../Section";
import Row from "../Row";
import SectionBadge from "../new-home-components/SectionBadge";

// --- 1. TOP STRIP: 4 BUSINESS OUTCOMES ---
const OUTCOMES = [
  {
    title: "Customer Experience",
    desc: "AI support & personalization",
    stat: "+98% CSAT",
    icon: LuUsers,
    iconBg: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    title: "Revenue Growth",
    desc: "Automated sales engine",
    stat: "+68% Conversion",
    icon: LuTrendingUp,
    iconBg: "bg-orange-50 text-orange-600 border-orange-100",
  },
  {
    title: "Operational Speed",
    desc: "Streamlined workflow tasks",
    stat: "10x Faster",
    icon: LuSettings,
    iconBg: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    title: "Risk Reduction",
    desc: "AI monitoring & compliance",
    stat: "-95% Errors",
    icon: LuShield,
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
];

// --- 2. BENTO DEPARTMENTS DATA ---
const DEPARTMENTS = [
  {
    id: "sales",
    label: "Sales",
    icon: LuTrendingUp,
    heading: "AI for Sales Teams",
    image: "/ai-strategy/generative-ai-llm-development/department-sales.png",
    tagline: "Automate sales cycles, qualify leads, and close deals faster.",
    accent: "from-blue-600 to-indigo-600",
    badgeBg: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    activeBg: "bg-gradient-to-r from-blue-500/[0.06] via-white to-white border-blue-500/50",
    activeIcon: "bg-blue-600 text-white border-blue-600",
    textAccent: "text-blue-600",
    capabilities: [
      "Intelligent lead scoring and qualification",
      "Automated follow-ups and email sequences",
      "CRM data enrichment and updates",
      "Sales forecasting and pipeline insights",
      "Proposal generation and deal support",
    ],
    metrics: [
      { label: "Conversion Rate", value: "+68%", color: "text-blue-600" },
      { label: "Sales Productivity", value: "+42%", color: "text-indigo-600" },
      { label: "Sales Cycle Time", value: "-30%", color: "text-sky-600" },
    ],
    quickMetric: "+68% Conversion",
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: LuMegaphone,
    heading: "AI for Marketing Teams",
    image: "/ai-strategy/generative-ai-llm-development/department-marketing.png",
    tagline: "Hyper-personalized campaigns, copywriting, and ad creative.",
    accent: "from-[#D27E2B] to-orange-500",
    badgeBg: "bg-[#D27E2B]/10 text-[#D27E2B] border-[#D27E2B]/20",
    activeBg: "bg-gradient-to-r from-[#D27E2B]/[0.06] via-white to-white border-[#D27E2B]/50",
    activeIcon: "bg-[#D27E2B] text-white border-[#D27E2B]",
    textAccent: "text-[#D27E2B]",
    capabilities: [
      "Hyper-personalized campaign generation",
      "Audience segmentation & intent modeling",
      "Brand-aligned copywriting and ad creative",
      "SEO content strategy & performance optimization",
      "Multi-channel automated marketing campaigns",
    ],
    metrics: [
      { label: "Lead Generation", value: "+54%", color: "text-[#D27E2B]" },
      { label: "Content Velocity", value: "+80%", color: "text-orange-600" },
      { label: "Cost Per Lead", value: "-35%", color: "text-amber-600" },
    ],
    quickMetric: "+54% Leads",
  },
  {
    id: "support",
    label: "Customer Support",
    icon: LuHeadphones,
    heading: "AI for Customer Support",
    image: "/ai-strategy/generative-ai-llm-development/department-support.png",
    tagline: "24/7 automated ticket triage, co-pilot agent assistance, and CSAT.",
    accent: "from-cyan-500 to-blue-500",
    badgeBg: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
    activeBg: "bg-gradient-to-r from-cyan-500/[0.06] via-white to-white border-cyan-500/50",
    activeIcon: "bg-cyan-600 text-white border-cyan-600",
    textAccent: "text-cyan-600",
    capabilities: [
      "24/7 automated ticket triage and resolution",
      "Smart agent co-pilot with real-time response suggestions",
      "Multilingual customer support in 40+ languages",
      "Omnichannel chat, email, and voice sync",
      "Sentiment analysis and CSAT scoring",
    ],
    metrics: [
      { label: "Auto-Resolution", value: "85%", color: "text-cyan-600" },
      { label: "Response Time", value: "-90%", color: "text-blue-600" },
      { label: "CSAT Score", value: "+4.8/5", color: "text-teal-600" },
    ],
    quickMetric: "85% Auto-Resolved",
  },
  {
    id: "finance",
    label: "Finance",
    icon: LuDollarSign,
    heading: "AI for Finance Teams",
    image: "/ai-strategy/generative-ai-llm-development/department-finance.png",
    tagline: "Automated invoice matching, anomaly detection, and cash flow.",
    accent: "from-emerald-500 to-teal-600",
    badgeBg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    activeBg: "bg-gradient-to-r from-emerald-500/[0.06] via-white to-white border-emerald-500/50",
    activeIcon: "bg-emerald-600 text-white border-emerald-600",
    textAccent: "text-emerald-600",
    capabilities: [
      "Automated invoice processing and reconciliation",
      "Real-time financial anomaly detection",
      "Cash flow forecasting and predictive modeling",
      "Compliance audit prep and report generation",
      "Expense categorizing and budget monitoring",
    ],
    metrics: [
      { label: "Processing Speed", value: "10x", color: "text-emerald-600" },
      { label: "Manual Errors", value: "-95%", color: "text-teal-600" },
      { label: "Audit Time Saved", value: "40 hrs/mo", color: "text-green-600" },
    ],
    quickMetric: "10x Speed",
  },
  {
    id: "hr",
    label: "HR & People",
    icon: LuUserCheck,
    heading: "AI for HR & People Teams",
    image: "/ai-strategy/generative-ai-llm-development/department-hr.png",
    tagline: "Resume screening, candidate matching, and onboarding automation.",
    accent: "from-purple-600 to-violet-600",
    badgeBg: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    activeBg: "bg-gradient-to-r from-purple-500/[0.06] via-white to-white border-purple-500/50",
    activeIcon: "bg-purple-600 text-white border-purple-600",
    textAccent: "text-purple-600",
    capabilities: [
      "Automated resume screening and candidate matching",
      "Interactive employee onboarding assistants",
      "Internal policy Q&A and handbook bot",
      "Employee engagement & retention analytics",
      "Performance review summary synthesis",
    ],
    metrics: [
      { label: "Time-to-Hire", value: "-50%", color: "text-purple-600" },
      { label: "Onboarding Speed", value: "3x", color: "text-violet-600" },
      { label: "HR Query Load", value: "-75%", color: "text-fuchsia-600" },
    ],
    quickMetric: "-50% Hire Time",
  },
  {
    id: "operations",
    label: "Operations",
    icon: LuWorkflow,
    heading: "AI for Operations Teams",
    image: "/ai-strategy/generative-ai-llm-development/department-operations.png",
    tagline: "Process orchestration, supply chain optimization, and analytics.",
    accent: "from-amber-500 to-orange-500",
    badgeBg: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    activeBg: "bg-gradient-to-r from-amber-500/[0.06] via-white to-white border-amber-500/50",
    activeIcon: "bg-amber-500 text-white border-amber-500",
    textAccent: "text-amber-600",
    capabilities: [
      "End-to-end workflow automation and process orchestration",
      "Supply chain optimization and inventory forecasting",
      "Real-time operational bottleneck alerts",
      "Vendor contract management and renewals",
      "Cross-departmental data sync and analytics",
    ],
    metrics: [
      { label: "Operational Cost", value: "-35%", color: "text-amber-600" },
      { label: "Process Throughput", value: "+60%", color: "text-orange-600" },
      { label: "Workflow SLA", value: "99.9%", color: "text-yellow-600" },
    ],
    quickMetric: "-35% Op Cost",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

export default function DepartmentAISolutions() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imgError, setImgError] = useState(false);
  const heroRef = React.useRef<HTMLDivElement>(null);

  // Auto-Focus Rotation Engine (5 Seconds per slide)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % DEPARTMENTS.length);
      setImgError(false);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeDept = DEPARTMENTS[activeIdx];

  return (
    <Section className="  py-20 lg:py-26   relative overflow-hidden text-slate-900">
      <Row>
        {/* Section Header */}
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-14 max-w-3xl mx-auto flex flex-col items-center gap-3"
        >
            <SectionBadge title="AI SOLUTIONS BY DEPARTMENT"  />
 
          {/* <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D27E2B]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D27E2B] border border-[#D27E2B]/20">
            <LuSparkles className="w-3.5 h-3.5" />
            AI SOLUTIONS BY DEPARTMENT
          </span> */}
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-black leading-tight tracking-tight text-slate-900">
            AI Solutions Built for <span className="text-[#D27E2B]">Every Department</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            Explore how our Generative AI solutions transform different business units with measurable, enterprise-grade business impact. 
          </p>
        </motion.div>

        {/* ── 1. Top Business Outcomes 4-Card Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {OUTCOMES.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                {...fadeUp(0.05 * idx)}
                whileHover={{ y: -3 }}
                className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-xs flex items-center justify-between gap-3 group transition-all duration-300 hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <span className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${item.iconBg}`}>
                    <IconComp className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-normal mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-[#D27E2B] bg-[#D27E2B]/10 px-2.5 py-1 rounded-lg border border-[#D27E2B]/20 shrink-0">
                  {item.stat}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* ── 2. Apple-Style Bento Grid Container ── */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          {/* HERO FEATURED BENTO TILE (8 Columns on Desktop for Maximum Image Preview) */}
          <motion.div
            ref={heroRef}
            {...fadeUp(0.1)}
            className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between relative overflow-hidden group scroll-mt-24"
          >
            {/* Auto-Rotation Timer Progress Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden">
              <motion.div
                key={activeIdx}
                initial={{ width: "0%" }}
                animate={{ width: isPaused ? "0%" : "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-gradient-to-r from-[#D27E2B] to-purple-600"
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeDept.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full justify-between gap-6"
              >
                {/* Hero Header Badge */}
                <div className="flex items-center justify-between gap-4">
                  <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${activeDept.badgeBg}`}>
                    <activeDept.icon className="w-4 h-4" />
                    FEATURED: {activeDept.label}
                  </span>
                </div>

                {/* Main Content Layout (3D Image Left + Capabilities Right - 6/6 Split) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center flex-1">
                  
                  {/* Left: Freely Floating 3D Graphic Visual with Behind Shadow & Ambient Aura */}
                  <div className="md:col-span-6 flex items-center justify-center p-2 relative min-h-[320px] sm:min-h-[380px]">
                    {/* Dynamic Department Accent Ambient Light Aura */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-84 sm:h-84 rounded-full bg-gradient-to-tr ${activeDept.accent} opacity-25 blur-3xl pointer-events-none transition-all duration-700`} />
                    
                    {/* Elliptical 3D Pedestal Floor Shadow */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-slate-900/20 blur-xl rounded-full scale-y-50 pointer-events-none z-0" />

                    {!imgError ? (
                      <Image
                        src={activeDept.image}
                        alt={activeDept.heading}
                        width={420}
                        height={420}
                        className="object-contain max-h-[320px] sm:max-h-[370px] w-auto drop-shadow-[0_25px_40px_rgba(15,23,42,0.18)] transition-transform duration-500 group-hover:scale-105 relative z-10"
                        onError={() => setImgError(true)}
                        priority
                      />
                    ) : (
                      /* Fallback 3D Geometric Orb */
                      <div className="relative w-52 h-52 flex items-center justify-center  z-10">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                          className="absolute inset-0 rounded-full border border-dashed border-[#D27E2B]/40"
                        />
                        <div className="w-36 h-36 rounded-3xl bg-gradient-to-tr from-[#D27E2B] to-purple-600 p-0.5 shadow-lg flex items-center justify-center text-white">
                          <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center">
                            <activeDept.icon className="w-14 h-14 text-[#D27E2B] animate-pulse" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Department Capabilities */}
                  <div className="md:col-span-6 flex flex-col justify-center">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 tracking-tight">
                      {activeDept.heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mb-4 leading-relaxed">
                      {activeDept.tagline}
                    </p>

                    <div className="flex flex-col gap-2.5">
                      {activeDept.capabilities.map((cap, cIdx) => (
                        <div key={cIdx} className="flex items-start gap-2.5">
                          <span className="w-4.5 h-4.5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                            <LuCheck className="w-3 h-3 stroke-3" />
                          </span>
                          <span className="text-xs sm:text-sm font-extrabold text-slate-700 leading-snug">
                            {cap}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Hero Bottom ROI Metrics Strip */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 mt-2">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest shrink-0">
                    BUSINESS IMPACT:
                  </span>

                  <div className="grid grid-cols-3 gap-3 w-full">
                    {activeDept.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="flex flex-col text-center">
                        <span className={`text-base sm:text-lg font-black ${m.color}`}>
                          {m.value}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-500 leading-tight">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* SECONDARY DEPARTMENTS SINGLE-COLUMN LIST (4 Columns on Desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-3 justify-between">
            {DEPARTMENTS.map((dept, idx) => {
              const isActive = activeIdx === idx;
              const DeptIcon = dept.icon;

              return (
                <motion.div
                  key={dept.id}
                  {...fadeUp(0.05 * idx)}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveIdx(idx);
                    setImgError(false);
                    if (typeof window !== "undefined" && window.innerWidth < 1024) {
                      heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 relative overflow-hidden group/tile ${
                    isActive
                      ? `${dept.activeBg} shadow-md scale-[1.01]`
                      : "bg-white border-slate-200/90 shadow-xs hover:border-slate-300 hover:bg-slate-50/50 hover:shadow-md hover:translate-x-1"
                  }`}
                >
                  {/* Left Side: Icon + Title + Snippet */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 group-hover/tile:scale-110 ${
                        isActive
                          ? `${dept.activeIcon}`
                          : "bg-slate-100 text-slate-600 border-slate-200 group-hover/tile:bg-slate-900 group-hover/tile:text-white"
                      }`}
                    >
                      <DeptIcon className="w-5 h-5" />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <h4 className={`text-xs sm:text-sm font-black leading-tight ${isActive ? dept.textAccent : "text-slate-900"}`}>
                        {dept.label}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                        {dept.capabilities[0]}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: ROI Tag & Arrow */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span
                      className={`font-black text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                        isActive
                          ? dept.badgeBg
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {dept.quickMetric}
                    </span>
                    <LuArrowUpRight
                      className={`w-4 h-4 transition-transform group-hover/tile:translate-x-0.5 group-hover/tile:-translate-y-0.5 ${
                        isActive ? dept.textAccent : "text-slate-400 group-hover/tile:text-slate-900"
                      }`}
                    />
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </Row>
    </Section>
  );
}
