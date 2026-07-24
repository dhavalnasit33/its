"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiMessageSquare,
  FiSearch,
  FiCpu,
  FiZap,
  FiBarChart2,
  FiShield,
  FiCloud,
  FiActivity,
  FiSettings,
  FiDatabase,
  FiUsers,
  FiLayers,
  FiShare2,
  FiTarget,
  FiHash,
  FiLock,
  FiGrid,
  FiLink,
  FiFileText,
  FiServer,
  FiBriefcase,
  FiGlobe,
  FiMail,
  FiChevronRight,
} from "react-icons/fi";
import SectionBadge from "../new-home-components/SectionBadge";
import Section from "@/components/Section";

// --- DATA FROM SOURCE ---
const TECH_CHIPS = [
  { label: "RAG", icon: FiZap },
  { label: "Vector Database", icon: FiDatabase },
  { label: "AI Agents", icon: FiCpu },
  { label: "LLMs", icon: FiLayers },
  { label: "Embeddings", icon: FiShare2 },
  { label: "LangChain", icon: FiLink },
  { label: "LlamaIndex", icon: FiSearch },
  { label: "MCP", icon: FiGrid },
  { label: "Secure", icon: FiLock },
  { label: "Scalable", icon: FiHash },
];

const ARCHITECTURE_STEPS = [
  {
    num: "01",
    title: "Data Sources",
    subtitle: "Ingest structured and unstructured enterprise assets.",
    image:
      "/ai-strategy/generative-ai-llm-development/enterprise-ai-architecture-step-1.png",
    bullets: [
      { icon: FiFileText, label: "Unstructured Files (PDF, DOCX, Markdown)" },
      { icon: FiDatabase, label: "Relational DBs (PostgreSQL, MySQL)" },
      { icon: FiBriefcase, label: "Enterprise Hubs (Salesforce, HubSpot)" },
      { icon: FiGlobe, label: "SaaS Application APIs" },
      { icon: FiCloud, label: "Cloud Buckets (AWS S3, Google Cloud Storage)" },
      { icon: FiMail, label: "Communication Logs (Outlook, Gmail)" },
      {
        icon: FiServer,
        label: "Internal Knowledge Wikis (Notion, Confluence)",
      },
    ],
  },
  {
    num: "02",
    title: "Ingest & Process",
    subtitle: "Clean, split, and vectorize raw data pipelines.",
    image:
      "/ai-strategy/generative-ai-llm-development/enterprise-ai-architecture-step-2.png",
    items: [
      {
        icon: FiSettings,
        title: "Semantic Parsing & Chunking",
        desc: "Noise Filtering & Overlap Analysis",
        detail:
          "Normalizes raw text format boundaries, strips markup, and splits documentation files into contextually coherent paragraphs based on semantic transitions.",
      },
      {
        icon: FiShare2,
        title: "Embedding Vector Generation",
        desc: "Text-to-Numeric Matrix Conversion",
        detail:
          "Routes processed text chunks through embedding models (e.g. OpenAI text-embedding-3-small, Cohere v3) to compute high-dimensional semantic arrays.",
      },
      {
        icon: FiTarget,
        title: "Automated Metadata Tagging",
        desc: "Attribute Extraction & Enrichment",
        detail:
          "Applies entity recognition pipelines to catalog vectors with security clearances, update timestamps, tags, and document origin markers.",
      },
    ],
  },
  {
    num: "03",
    title: "Knowledge Engine",
    subtitle: "Store, cache, and index vectorized intelligence.",
    image:
      "/ai-strategy/generative-ai-llm-development/enterprise-ai-architecture-step-3.png",
    caption: "Enterprise AI Core Memory",
    tags: [
      "Vector Databases (Pinecone, Qdrant)",
      "Graph Database (Neo4j GraphRAG)",
      "Hybrid Keyword-Semantic Search",
      "Hierarchical Storage Cache",
    ],
  },
  {
    num: "04",
    title: "Retrieve & Reason",
    subtitle: "Orchestrate context assembly and reasoning models.",
    image:
      "/ai-strategy/generative-ai-llm-development/enterprise-ai-architecture-step-4.png",
    items: [
      {
        icon: FiSearch,
        title: "Hybrid Retrieval Engine",
        desc: "Vector Similarity & Keyword Matching",
        detail:
          "Performs real-time cosine similarity search across vector indexes combined with BM25 keyword matching to gather the top-K most relevant reference chunks.",
      },
      {
        icon: FiCpu,
        title: "Autonomous Agent Orchestrator",
        desc: "Task Planner & Multi-Tool Router",
        detail:
          "Executes dynamic ReAct loops to route user questions, access external SaaS APIs, execute SQL query tools, and manage conversation memory states.",
      },
      {
        icon: FiLayers,
        title: "Frontier LLM Synthesizer",
        desc: "Prompt Processing & Semantic Guardrails",
        detail:
          "Evaluates context chunks and prompt structures using leading reasoning models (GPT-4o, Claude 3.5 Sonnet) while applying toxic content and jailbreak guardrails.",
      },
    ],
  },
  {
    num: "05",
    title: "Generate & Deliver",
    subtitle: "Deliver factual outputs and trigger integrated actions.",
    image:
      "/ai-strategy/generative-ai-llm-development/enterprise-ai-architecture-step-5.png",
    items: [
      {
        icon: FiGlobe,
        title: "Unified Web Dashboards & Chatbots",
        desc: "Conversational UI & Charts Rendering",
        detail:
          "Embeds chat widgets, tabular summary components, and visual reasoning pathways directly within your web apps and internal admin panels.",
      },
      {
        icon: FiMail,
        title: "Workplace Chatbot Routing",
        desc: "Slack & Microsoft Teams Workflows",
        detail:
          "Deploys secure communication bots that respond to user queries directly inside employee channels, complete with context links.",
      },
      {
        icon: FiUsers,
        title: "Intelligent Human Escalation",
        desc: "Zendesk & Salesforce CRM Handoff",
        detail:
          "Gracefully routes conversation logs and ticket summaries to live support representatives if prompt validation scores drop below parameters.",
      },
    ],
  },
];

const OUTPUT_CARDS = [
  {
    icon: FiMessageSquare,
    title: "AI Chatbot",
    desc: "Intelligent conversations that understand your business context.",
    color: "#7C3AED",
    bg: "#F3EEFE",
  },
  {
    icon: FiSearch,
    title: "Enterprise Search",
    desc: "Find anything across your documents, data, and knowledge base.",
    color: "#D68029",
    bg: "#FDF1E4",
  },
  {
    icon: FiCpu,
    title: "AI Copilot",
    desc: "Assist employees with tasks, summaries, insights, and recommendations.",
    color: "#2563EB",
    bg: "#EAF1FE",
  },
  {
    icon: FiZap,
    title: "Workflow Automation",
    desc: "Automate processes and actions using AI agents and tools.",
    color: "#16A34A",
    bg: "#E9F9EF",
  },
  {
    icon: FiBarChart2,
    title: "Analytics & Insights",
    desc: "Generate reports, trends, and insights from your enterprise data.",
    color: "#0EA5B7",
    bg: "#E5F7FA",
  },
];

const TRUST_STRIP = [
  {
    icon: FiShield,
    title: "Enterprise Security",
    desc: "SOC 2 • GDPR • HIPAA",
  },
  { icon: FiLock, title: "Private & Secure", desc: "Your data stays yours" },
  {
    icon: FiCloud,
    title: "Scalable Architecture",
    desc: "Built for enterprise scale",
  },
  {
    icon: FiActivity,
    title: "High Performance",
    desc: "Fast, reliable, and efficient",
  },
  {
    icon: FiShield,
    title: "Fully Customizable",
    desc: "Tailored to your needs",
  },
];

export default function PremiumAIArchitecture() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeStep = ARCHITECTURE_STEPS[activeIdx];

  return (
    <Section className="relative w-full bg-[#F4F7FA]   overflow-hidden ">
      {/* Blueprint Grid Background - Extremely clean and subtle */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-white to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
        {/* --- 1. Header Section --- */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <SectionBadge title="ENTERPRISE AI ARCHITECTURE" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0B1E35] leading-tight mb-6 tracking-tight"
          >
            Generative AI <span className="text-[#D68029]">Pipeline</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed"
          >
            A secure, mathematically robust 5-stage architecture that transforms
            your raw enterprise data into highly intelligent, autonomous
            workflows.
          </motion.p>
        </div>
      </div>

      {/* --- 2. Sleek Tech Marquee (Full-Width End-to-End) --- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full overflow-hidden relative mb-20 py-2 select-none z-10 group"
      >
        {/* Fade edges for smooth entry/exit */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#F4F7FA] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#F4F7FA] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 items-center w-max animate-marquee group-hover:[animation-play-state:paused] py-2">
          {[...TECH_CHIPS, ...TECH_CHIPS, ...TECH_CHIPS].map((chip, idx) => {
            const Icon = chip.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-6 py-3 bg-white border border-slate-200/90 rounded-full shadow-sm text-sm font-bold text-slate-700 hover:text-slate-900 hover:border-[#D68029]/50 hover:shadow-md transition-all duration-300 transform hover:scale-105 cursor-pointer shrink-0"
              >
                <Icon className="w-4.5 h-4.5 text-[#D68029]" />
                {chip.label}
              </div>
            );
          })}
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

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-10">

        {/* --- 3. Dynamic Island Pipeline Navigator --- */}
        <div className="relative w-full max-w-4xl mx-auto mb-10 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 px-2 ">
          {/* Connecting Track Line */}
          <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-200 rounded-full -translate-y-1/2 z-0 hidden lg:block" />

          <div className="flex items-center justify-between gap-3 min-w-[600px] lg:min-w-0  cursor-pointer">
            {ARCHITECTURE_STEPS.map((step, idx) => {
              const isActive = activeIdx === idx;
              return (
                <motion.button
                  key={step.num}
                  layout
                  onClick={() => setActiveIdx(idx)}
                  style={{ cursor: "pointer" }}
                  className={`relative z-10 flex cursor-pointer items-center justify-center rounded-full border-2 outline-none transition-colors duration-300 shadow-sm ${
                    isActive
                      ? "bg-[#D68029] border-[#D68029] text-white px-6 py-3 h-14"
                      : "bg-white border-slate-200 text-slate-400 w-14 h-14 hover:border-[#D68029]/50 hover:text-[#D68029]"
                  }`}
                >
                  <span className="font-black text-lg">{step.num}</span>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="ml-3 font-bold whitespace-nowrap text-[15px]"
                    >
                      {step.title}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* --- 4. Premium Glass Detail Panel --- */}
        <div className="w-full  mx-auto mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.num}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-[2.5rem] p-6 lg:p-12 shadow-[0_20px_60px_rgba(11,30,53,0.05)] border border-slate-100"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Holographic Image Area */}
                {activeStep.image && (
                  <div className="relative w-full h-[320px] md:h-[450px] rounded-[2rem] bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-100 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,128,41,0.05)_0%,transparent_70%)]" />
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative w-[85%] h-[85%]"
                    >
                      <Image
                        src={activeStep.image}
                        alt={activeStep.title}
                        fill
                        sizes="(max-width: 768px) 90vw, 500px"
                        className="object-contain drop-shadow-xl"
                      />
                    </motion.div>
                  </div>
                )}

                {/* Right: Technical Content */}
                <div className="flex flex-col cursor-pointer">
                  <span className="text-[#D68029] font-black tracking-widest uppercase text-xs mb-3">
                    Stage {activeStep.num}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#0B1E35] mb-4 leading-tight">
                    {activeStep.title}
                  </h3>
                  <p className="text-slate-500 text-base md:text-lg mb-8 font-medium">
                    {activeStep.subtitle}
                  </p>

                  {/* Feature Items List (Stages 2, 4, 5) */}
                  {activeStep.items && (
                    <div className="flex flex-col gap-4">
                      {activeStep.items.map((item, iIdx) => {
                        const ItemIcon = item.icon;
                        return (
                          <div
                            key={iIdx}
                            className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-[#D68029]/20 transition-all duration-300"
                          >
                            <div className="w-12 h-12 shrink-0 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-[#D68029]">
                              <ItemIcon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <p className="text-[15px] font-black text-[#0B1E35] mb-1">
                                {item.title}
                              </p>
                              <p className="text-[13px] text-slate-500 font-bold mb-2">
                                {item.desc}
                              </p>
                              {item.detail && (
                                <p className="text-[13px] text-slate-400 font-medium leading-relaxed border-t border-slate-200 pt-2">
                                  {item.detail}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Bullets List (Stage 1) */}
                  {activeStep.bullets && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeStep.bullets.map((b, bIdx) => {
                        const BulletIcon = b.icon;
                        return (
                          <div
                            key={bIdx}
                            className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#D68029]/20 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#D68029] shrink-0">
                              <BulletIcon className="w-4 h-4" />
                            </div>
                            <span className="text-[13px] font-bold text-slate-700">
                              {b.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Tags (Stage 3) */}
                  {activeStep.tags && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {activeStep.tags.map((tag, tIdx) => (
                        <div
                          key={tIdx}
                          className="px-4 py-2 rounded-xl bg-[#0B1E35] text-white text-xs font-bold tracking-wide shadow-sm"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Next Step Button */}
                  {activeIdx < ARCHITECTURE_STEPS.length - 1 && (
                    <button
                      onClick={() => setActiveIdx(activeIdx + 1)}
                      className="mt-8 self-start inline-flex items-center gap-2 text-sm font-black text-[#D68029] hover:text-[#0B1E35] transition-colors cursor-pointer"
                    >
                      Next: {ARCHITECTURE_STEPS[activeIdx + 1].title}
                      <FiChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- 5. Output Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16 max-w-7xl mx-auto">
          {OUTPUT_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                whileHover={{ y: -6 }}
                className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-sm border border-white/50"
                  style={{ backgroundColor: card.bg, color: card.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-[16px] font-black text-[#0B1E35] mb-2">
                  {card.title}
                </h4>
                <p className="text-slate-500 text-[13px] font-medium leading-relaxed">
                  {card.desc}
                </p>

                <div
                  className="w-8 h-1 rounded-full mt-5 transition-all duration-300 group-hover:w-full opacity-50 group-hover:opacity-100"
                  style={{ backgroundColor: card.color }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* --- 6. Trust Strip --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0B1E35] rounded-[24px] p-6 md:p-8 shadow-xl max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {TRUST_STRIP.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#D68029] group-hover:scale-110">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-[13px] font-bold text-white leading-tight mb-0.5">
                      {item.title}
                    </h5>
                    <p className="text-[11px] font-semibold text-slate-400 leading-tight tracking-wide">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
