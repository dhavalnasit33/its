"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuMessageSquare,
  LuSparkles,
  LuFileSearch,
  LuBookOpen,
  LuBrain,
  LuFolderSync,
  LuZap,
  LuCircleCheck,
  LuTrendingDown,
  LuUsers,
  LuCheck,
  LuChevronRight,
  LuCpu,
} from "react-icons/lu";
import Section from "../Section";
import Row from "../Row";
import SectionBadge from "../new-home-components/SectionBadge";

// Define structural interfaces for use cases
interface BusinessImpact {
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
}

interface TopIntent {
  label: string;
  percentage: number;
}

interface BottomStat {
  value: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface UseCase {
  id: string;
  tabLabel: string;
  tabIcon: React.ComponentType<any>;
  num: string;
  title: string;
  description: string;
  businessImpact: BusinessImpact[];
  keyCapabilities: string[];
  chatHistory: { sender: "user" | "ai"; message: string }[];
  resolutionRates: { resolved: number; inProgress: number; escalated: number };
  sentimentScore: number;
  topIntents: TopIntent[];
  bottomStats: BottomStat[];
}

const USE_CASES: UseCase[] = [
  {
    id: "support",
    tabLabel: "Customer Support AI",
    tabIcon: LuMessageSquare,
    num: "01",
    title: "AI that Understands. AI that Resolves.",
    description: "Deliver instant, accurate, and human-like support across channels. Reduce response time, improve customer satisfaction, and scale operations effortlessly.",
    businessImpact: [
      { title: "Instant Responses", desc: "Answer customer queries in seconds, not minutes.", icon: LuZap },
      { title: "Higher Accuracy", desc: "Consistent, accurate, and reliable data answers.", icon: LuCircleCheck },
      { title: "Cost Efficiency", desc: "Reduce operational overheads by up to 70%.", icon: LuTrendingDown },
      { title: "Happy Customers", desc: "Improve retention, loyalty, and brand reputation.", icon: LuUsers },
    ],
    keyCapabilities: [
      "Multi-channel Support",
      "CRM Integration",
      "Multi-language Ingestion",
      "Live Agent Handoff",
      "Real-time Analytics",
      "API & Webhooks Sync",
    ],
    chatHistory: [
      { sender: "user", message: "Where is my order?" },
      { sender: "ai", message: "I can see your order #1234 is on the way and will arrive tomorrow." },
      { sender: "user", message: "Great! Thank you!" },
    ],
    resolutionRates: { resolved: 98, inProgress: 1.5, escalated: 0.5 },
    sentimentScore: 95,
    topIntents: [
      { label: "Order Tracking", percentage: 42 },
      { label: "Refund Status", percentage: 28 },
      { label: "Product Info", percentage: 18 },
      { label: "Account Help", percentage: 12 },
    ],
    bottomStats: [
      { value: "98%", label: "Resolution Accuracy", icon: LuCircleCheck },
      { value: "< 2 sec", label: "Average Response Time", icon: LuZap },
      { value: "24/7", label: "Always Available", icon: LuUsers },
      { value: "70%", label: "Lower Support Cost", icon: LuTrendingDown },
      { value: "5M+", label: "Queries Processed", icon: LuMessageSquare },
    ],
  },
  {
    id: "copilot",
    tabLabel: "Enterprise Copilot",
    tabIcon: LuSparkles,
    num: "02",
    title: "Augment Your Workforce. Streamline Tasks.",
    description: "Equip employees with intelligent internal copilots to draft content, format documents, write code, search repository wikis, and automate recurring operations.",
    businessImpact: [
      { title: "Task Autopilot", desc: "Automate code snippets and corporate drafting.", icon: LuZap },
      { title: "Cognitive Assist", desc: "Summarize threads, meetings, and documents.", icon: LuCircleCheck },
      { title: "Operational Sync", desc: "Trigger internal API actions directly from chat.", icon: LuTrendingDown },
      { title: "Privacy Guaranteed", desc: "Built with private security boundaries.", icon: LuUsers },
    ],
    keyCapabilities: [
      "Slack & Teams Sync",
      "API Tool-Calling",
      "Context-aware Search",
      "Structured Summaries",
      "Role-based Access",
      "Enterprise SSO Sync",
    ],
    chatHistory: [
      { sender: "user", message: "Summarize the Q2 roadmap targets." },
      { sender: "ai", message: "The key targets are: 1. Launch Agent Core, 2. Expand database integrations, 3. Reconcile SOC 2 compliance." },
      { sender: "user", message: "Export this to Slack #dev channel." },
    ],
    resolutionRates: { resolved: 88, inProgress: 9.5, escalated: 2.5 },
    sentimentScore: 92,
    topIntents: [
      { label: "Doc Summarization", percentage: 45 },
      { label: "Email Drafting", percentage: 25 },
      { label: "Database Queries", percentage: 20 },
      { label: "Calendar Booking", percentage: 10 },
    ],
    bottomStats: [
      { value: "85%", label: "Task Automation Rate", icon: LuCircleCheck },
      { value: "< 3 sec", label: "Query Ingestion Speed", icon: LuZap },
      { value: "15+", label: "Linked Tools Connect", icon: LuCpu },
      { value: "12 hrs", label: "Saved Weekly/User", icon: LuTrendingDown },
      { value: "2.5M+", label: "Executed Actions", icon: LuMessageSquare },
    ],
  },
  {
    id: "contract",
    tabLabel: "Contract Analysis",
    tabIcon: LuFileSearch,
    num: "03",
    title: "Audit Legals instantly. Mitigate Risks.",
    description: "Automatically index legal documents, identify missing provisions, compare liability caps, and review regulatory compliance flags within seconds.",
    businessImpact: [
      { title: "Risk Safeguards", desc: "Flag indemnification and non-compete issues.", icon: LuZap },
      { title: "Auditing Speed", desc: "Scan 100+ legal pages instantly.", icon: LuCircleCheck },
      { title: "Compliance Check", desc: "Validate guidelines against current rules.", icon: LuTrendingDown },
      { title: "Overhead Reduction", desc: "Scale down corporate attorney audit hours.", icon: LuUsers },
    ],
    keyCapabilities: [
      "Clause extraction",
      "Regulatory alignment",
      "Anomaly triggers",
      "Multi-doc comparisons",
      "Optical OCR parsing",
      "Exportable CSV reports",
    ],
    chatHistory: [
      { sender: "user", message: "Does this NDA contain non-solicit terms?" },
      { sender: "ai", message: "Yes, Section 8.4 prohibits employee solicitation for a duration of 18 months post-termination." },
      { sender: "user", message: "Flag this as a policy warning." },
    ],
    resolutionRates: { resolved: 96, inProgress: 3.5, escalated: 0.5 },
    sentimentScore: 99,
    topIntents: [
      { label: "Liability Review", percentage: 50 },
      { label: "Renewal Alerts", percentage: 22 },
      { label: "Termination Rules", percentage: 18 },
      { label: "Compliance Audits", percentage: 10 },
    ],
    bottomStats: [
      { value: "99.4%", label: "Extraction Precision", icon: LuCircleCheck },
      { value: "< 10s", label: "Review Duration/Doc", icon: LuZap },
      { value: "10k+", label: "Contracts Evaluated", icon: LuFolderSync },
      { value: "80%", label: "Faster Legal Cycle", icon: LuTrendingDown },
      { value: "1.2M+", label: "Pages Analyzed", icon: LuMessageSquare },
    ],
  },
  {
    id: "knowledge",
    tabLabel: "Internal Knowledge",
    tabIcon: LuBookOpen,
    num: "04",
    title: "Centralize Wikis. Search Factual Knowledge.",
    description: "Connect wiki pages, documentation repositories, and guidelines into a single private database directory for instant, hallucination-free querying.",
    businessImpact: [
      { title: "Semantic Search", desc: "Retrieve context based on logical meaning.", icon: LuZap },
      { title: "Factual Citations", desc: "Trace answers directly to the original doc.", icon: LuCircleCheck },
      { title: "No Hallucinations", desc: "Rigid system prompt guardrails in place.", icon: LuTrendingDown },
      { title: "Fast Onboarding", desc: "Answer complex training queries on demand.", icon: LuUsers },
    ],
    keyCapabilities: [
      "Wiki & Notion Sync",
      "Vector embeddings mapping",
      "Citation references",
      "Clearance access bounds",
      "Support tickets parsing",
      "Automated index reload",
    ],
    chatHistory: [
      { sender: "user", message: "What is our remote work travel budget?" },
      { sender: "ai", message: "According to Travel Policy Section 2.1, standard domestic travel is capped at $300 per day." },
      { sender: "user", message: "Show document source link." },
    ],
    resolutionRates: { resolved: 99, inProgress: 0.8, escalated: 0.2 },
    sentimentScore: 98,
    topIntents: [
      { label: "Policy Inquiries", percentage: 40 },
      { label: "HR Documentation", percentage: 30 },
      { label: "Engineering Wikis", percentage: 20 },
      { label: "IT Solutions", percentage: 10 },
    ],
    bottomStats: [
      { value: "99.8%", label: "Factual Accuracy Rate", icon: LuCircleCheck },
      { value: "< 1.5s", label: "Semantic Search Speed", icon: LuZap },
      { value: "50k+", label: "Indexed PDF Files", icon: LuFolderSync },
      { value: "90%", label: "Faster Information Find", icon: LuTrendingDown },
      { value: "10M+", label: "Vector database nodes", icon: LuMessageSquare },
    ],
  },
  {
    id: "research",
    tabLabel: "AI Research Assistant",
    tabIcon: LuBrain,
    num: "05",
    title: "Synthesize Data. Explore Trends.",
    description: "Scan thousands of competitor releases, financial indexes, and industry patents to deliver deep, structured business intelligence summaries.",
    businessImpact: [
      { title: "Market Tracking", desc: "Monitor competitors' updates daily.", icon: LuZap },
      { title: "Patent Ingest", desc: "Understand overlapping patent bounds.", icon: LuCircleCheck },
      { title: "Report Generator", desc: "Assemble executive summaries instantly.", icon: LuTrendingDown },
      { title: "Trend Predictions", desc: "Map emerging pattern spikes.", icon: LuUsers },
    ],
    keyCapabilities: [
      "Web Search Integration",
      "Patent index query",
      "PDF briefing compile",
      "Excel financials audit",
      "Data graphs plotting",
      "Auto newsletter drafting",
    ],
    chatHistory: [
      { sender: "user", message: "Compare pricing models for Tier-1 vector databases." },
      { sender: "ai", message: "Pinecone starts at $0.07/hr for standard index nodes, while Milvus Cloud offers enterprise serverless starting at $49/mo base." },
      { sender: "user", message: "Compile this comparison into a table." },
    ],
    resolutionRates: { resolved: 94, inProgress: 5, escalated: 1 },
    sentimentScore: 97,
    topIntents: [
      { label: "Competitor Rates", percentage: 48 },
      { label: "Patent Analytics", percentage: 24 },
      { label: "Financial Auditing", percentage: 16 },
      { label: "Market Briefs", percentage: 12 },
    ],
    bottomStats: [
      { value: "95%", label: "Research Acceleration", icon: LuCircleCheck },
      { value: "< 5 sec", label: "Brief Compile Speed", icon: LuZap },
      { value: "100+", label: "Connected Web Sources", icon: LuFolderSync },
      { value: "65%", label: "Higher Analyst Output", icon: LuTrendingDown },
      { value: "4M+", label: "Ingested Documents", icon: LuMessageSquare },
    ],
  },
  {
    id: "document",
    tabLabel: "Document Automation",
    tabIcon: LuFolderSync,
    num: "06",
    title: "Process Scale Ingestion. Sync ERPs.",
    description: "Ingest thousands of invoices, receipts, shipping forms, and customs papers. Parse tabular entries automatically, map codes, and log details into ERPs.",
    businessImpact: [
      { title: "Zero Data Lag", desc: "Log accounting files in real-time.", icon: LuZap },
      { title: "Error-free entry", desc: "Eliminate manual typing slips and errors.", icon: LuCircleCheck },
      { title: "ERP Connector", desc: "Direct pipelines into SAP, Netsuite, Oracle.", icon: LuTrendingDown },
      { title: "Audit Trail", desc: "Maintain structured records ledger.", icon: LuUsers },
    ],
    keyCapabilities: [
      "Table cell structure OCR",
      "Invoice verification logic",
      "ERP database sync",
      "Duplicate file detection",
      "Anomalous charge alert",
      "Direct API integrations",
    ],
    chatHistory: [
      { sender: "user", message: "Verify June freight invoices." },
      { sender: "ai", message: "Checked 42 invoices. 40 invoices matched purchase orders. 2 invoices flagged for fuel surcharge variance." },
      { sender: "user", message: "Export matched invoices to SAP." },
    ],
    resolutionRates: { resolved: 97.5, inProgress: 2.1, escalated: 0.4 },
    sentimentScore: 98,
    topIntents: [
      { label: "Invoice Parsing", percentage: 52 },
      { label: "Tax Form Audit", percentage: 20 },
      { label: "ERP Accounting Sync", percentage: 18 },
      { label: "Discrepancy Checks", percentage: 10 },
    ],
    bottomStats: [
      { value: "99.9%", label: "Data Extraction Accuracy", icon: LuCircleCheck },
      { value: "< 0.8s", label: "Page Ingestion Time", icon: LuZap },
      { value: "500k+", label: "Invoices Processed", icon: LuFolderSync },
      { value: "85%", label: "Workhours Saved", icon: LuTrendingDown },
      { value: "20M+", label: "Reconciled Transactions", icon: LuMessageSquare },
    ],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

export default function EnterpriseAICommandCenter() {
  const [activeTab, setActiveTab] = useState(USE_CASES[0].id);
  const activeUseCase = USE_CASES.find((uc) => uc.id === activeTab) || USE_CASES[0];

  return (
    <Section className="bg-[#030712] py-24 lg:py-32 border-t border-slate-900 relative overflow-hidden text-white">
      {/* Mesh background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-[25%] left-[-15%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#D27E2B]/8 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[25%] right-[-15%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-500/8 to-transparent blur-[140px] pointer-events-none" />

      <Row>
        {/* Header Block */}
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center gap-4"
        >
            <SectionBadge title="REAL BUSINESS USE CASES"  />

          {/* <span className="inline-flex items-center rounded-full bg-[#D27E2B]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#D27E2B] border border-[#D27E2B]/20">
            REAL BUSINESS USE CASES
          </span> */}
          <h2 className="text-3xl md:text-[44px] font-black leading-tight tracking-tight text-white">
            Enterprise AI <span className="text-[#D27E2B]">Solution Command Center</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            Explore real-world AI solutions that deliver measurable impact across your organization.
          </p>
        </motion.div>

        {/* Dynamic Selector Tabs */}
        <motion.div
          {...fadeUp(0.1)}
          className="flex flex-wrap justify-center gap-3 mb-12  w-full"
        >
          {USE_CASES.map((uc) => {
            const Icon = uc.tabIcon;
            const isActive = uc.id === activeTab;
            return (
              <button
                key={uc.id}
                onClick={() => setActiveTab(uc.id)}
                className={`flex items-center gap-2.5 px-6 py-4 rounded-xl text-sm font-bold transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? "bg-[#D27E2B]/10 border-[#D27E2B] text-white shadow-[0_4px_25px_rgba(210,126,43,0.15)]"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/40 hover:border-slate-700"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#D27E2B]" : "text-slate-400 group-hover:text-white"}`} />
                {uc.tabLabel}
              </button>
            );
          })}
        </motion.div>

        {/* Interactive CommandCenter Showcase Frame */}
        <motion.div {...fadeUp(0.2)} className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeUseCase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-slate-950/80 border border-slate-900 rounded-[32px] p-8 lg:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-md relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Side Content Column */}
              <div className="lg:col-span-5 flex flex-col gap-6.5 text-left">
                {/* ID Badge */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#D27E2B] bg-[#D27E2B]/10 px-3 py-1 rounded-md uppercase tracking-wider border border-[#D27E2B]/20">
                    {activeUseCase.num}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {ucTitleUpper(activeUseCase.tabLabel)}
                  </span>
                </div>

                {/* Title & Desc */}
                <div>
                  <h3 className="text-2xl sm:text-3.5xl font-black text-white leading-tight mb-3">
                    {activeUseCase.title}
                  </h3>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
                    {activeUseCase.description}
                  </p>
                </div>

                {/* Business Impact Grid */}
                <div>
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
                    BUSINESS IMPACT
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeUseCase.businessImpact.map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={idx} className="flex gap-3 items-start">
                          <span className="w-8 h-8 rounded-lg bg-[#D27E2B]/10 border border-[#D27E2B]/20 flex items-center justify-center text-[#D27E2B] shrink-0 mt-0.5">
                            <ItemIcon className="w-4 h-4" />
                          </span>
                          <div>
                            <p className="text-sm font-bold text-slate-200">{item.title}</p>
                            <p className="text-xs text-slate-400 font-medium leading-normal mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Key Capabilities */}
                <div>
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3.5">
                    KEY CAPABILITIES
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeUseCase.keyCapabilities.map((cap, idx) => (
                      <span
                        key={idx}
                        className="inline-flex cursor-pointer items-center gap-1.5 bg-slate-900 border border-slate-800 text-xs sm:text-sm font-bold text-slate-300 px-3.5 py-2 rounded-lg hover:border-[#D27E2B]/30 hover:text-white transition-colors "
                      >
                        <LuCheck className="w-3 h-3 text-[#D27E2B]" />
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side Visual Command Center Column */}
              <div className="lg:col-span-7 w-full flex justify-center relative">
                {/* Visual Canvas frame matching mockup */}
                <div className="w-full max-w-[620px] h-auto md:aspect-[16/11] min-h-[460px] rounded-2xl border border-slate-900/60 bg-slate-950 p-6 flex flex-col justify-between gap-5 relative overflow-hidden shadow-inner">
                  {/* Decorative mesh circle glows */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

                  {/* Top Canvas Row: Conversation & doughnut chart overlays */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                    {/* Live Conversation box */}
                    <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between gap-3 h-full">
                      <div className="flex items-center justify-between border-b border-slate-800/50 pb-2">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                          Live Conversation
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-xs font-bold text-slate-400">Online</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 flex-1 justify-end">
                        {activeUseCase.chatHistory.map((chat, idx) => (
                          <div
                            key={idx}
                            className={`flex gap-2 max-w-[85%] ${
                              chat.sender === "user" ? "self-end flex-row-reverse" : "self-start"
                            }`}
                          >
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                chat.sender === "user" ? "bg-slate-800 text-slate-300" : "bg-[#D27E2B]/10 text-[#D27E2B]"
                              }`}
                            >
                              {chat.sender === "user" ? "U" : "AI"}
                            </span>
                            <div
                              className={`text-xs sm:text-sm font-medium leading-normal px-3 py-2 rounded-lg ${
                                chat.sender === "user"
                                  ? "bg-slate-800 text-slate-200 rounded-tr-none"
                                  : "bg-[#D27E2B]/5 border border-[#D27E2B]/10 text-slate-300 rounded-tl-none"
                              }`}
                            >
                              {chat.message}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resolution Gauge and Intents */}
                    <div className="flex flex-col gap-4">
                      {/* Resolution Overview Doughnut Simulation */}
                      <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between gap-4">
                        <div className="text-left">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">
                            Resolution Rate
                          </span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-black text-white">
                              {activeUseCase.resolutionRates.resolved}%
                            </span>
                            <span className="text-xs text-emerald-400 font-bold">Resolved</span>
                          </div>
                        </div>

                        {/* Doughnut graph mockup */}
                        <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                          <svg className="w-full h-full rotate-[-90deg]">
                            <circle
                              cx="28"
                              cy="28"
                              r="24"
                              className="stroke-slate-800 fill-none"
                              strokeWidth="4"
                            />
                            <circle
                              cx="28"
                              cy="28"
                              r="24"
                              className="stroke-[#D27E2B] fill-none"
                              strokeWidth="4"
                              strokeDasharray="150"
                              strokeDashoffset={150 - (150 * activeUseCase.resolutionRates.resolved) / 100}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute text-xs font-black text-slate-300">
                            {activeUseCase.resolutionRates.resolved}%
                          </span>
                        </div>
                      </div>

                      {/* Top Intents progress chart */}
                      <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 flex-1 flex flex-col gap-2">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2 text-left">
                          Top Intent Analysis
                        </span>
                        <div className="flex flex-col gap-2.5">
                          {activeUseCase.topIntents.slice(0, 3).map((intent, idx) => (
                            <div key={idx} className="flex flex-col gap-1.5 text-left">
                              <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                                <span>{intent.label}</span>
                                <span>{intent.percentage}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                                  style={{ width: `${intent.percentage}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Canvas Row: Holographic Platform with central Bot */}
                  <div className="border border-slate-900 bg-slate-950/40 rounded-xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                        <LuCpu className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-white">Semantic Intent Engine</p>
                        <p className="text-xs text-slate-400 font-medium">System accuracy tracking metrics</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-0.5">
                        Sentiment Score
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-black text-emerald-400">{activeUseCase.sentimentScore}%</span>
                        <span className="text-xs text-slate-500 font-bold">Positive</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 5-Column Stats Strip inside the CommandCenter Frame */}
            <div className="border-t border-slate-900 mt-12 pt-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {activeUseCase.bottomStats.map((stat, idx) => {
                  const StatIcon = stat.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3.5 text-left pl-2.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#D27E2B] shrink-0">
                        <StatIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-base sm:text-lg font-black text-white leading-tight">
                          {stat.value}
                        </p>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        </motion.div>
      </Row>
    </Section>
  );
}

// Helper function to capitalize title tag
function ucTitleUpper(str: string): string {
  return str.toUpperCase();
}
