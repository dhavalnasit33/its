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
  FiChevronRight,
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
  FiCheck
} from "react-icons/fi";
import Section from "@/components/Section";
import Row from "@/components/Row";
import SectionBadge from "../new-home-components/SectionBadge";

// --- Data Constants ---
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
    image: "/ai-strategy/generative-ai-llm-development/enterprise-ai-architecture-step-1.png",
    bullets: [
      { icon: FiFileText, label: "Unstructured Files (PDF, DOCX, Markdown)" },
      { icon: FiDatabase, label: "Relational DBs (PostgreSQL, MySQL)" },
      { icon: FiBriefcase, label: "Enterprise Hubs (Salesforce, HubSpot)" },
      { icon: FiGlobe, label: "SaaS Application APIs" },
      { icon: FiCloud, label: "Cloud Buckets (AWS S3, Google Cloud Storage)" },
      { icon: FiMail, label: "Communication Logs (Outlook, Gmail)" },
      { icon: FiServer, label: "Internal Knowledge Wikis (Notion, Confluence)" },
    ],
  },
  {
    num: "02",
    title: "Ingest & Process",
    subtitle: "Clean, split, and vectorize raw data pipelines.",
    image: "/ai-strategy/generative-ai-llm-development/enterprise-ai-architecture-step-2.png",
    items: [
      { icon: FiSettings, title: "Semantic Parsing & Chunking", desc: "Noise Filtering & Overlap Analysis", detail: "Normalizes raw text format boundaries, strips markup, and splits documentation files into contextually coherent paragraphs based on semantic transitions." },
      { icon: FiShare2, title: "Embedding Vector Generation", desc: "Text-to-Numeric Matrix Conversion", detail: "Routes processed text chunks through embedding models (e.g. OpenAI text-embedding-3-small, Cohere v3) to compute high-dimensional semantic arrays." },
      { icon: FiTarget, title: "Automated Metadata Tagging", desc: "Attribute Extraction & Enrichment", detail: "Applies entity recognition pipelines to catalog vectors with security clearances, update timestamps, tags, and document origin markers." },
    ],
  },
  {
    num: "03",
    title: "Knowledge Engine",
    subtitle: "Store, cache, and index vectorized intelligence.",
    image: "/ai-strategy/generative-ai-llm-development/enterprise-ai-architecture-step-3.png",
    caption: "Enterprise AI Core Memory",
    tags: ["Vector Databases (Pinecone, Qdrant)", "Graph Database (Neo4j GraphRAG)", "Hybrid Keyword-Semantic Search", "Hierarchical Storage Cache"],
  },
  {
    num: "04",
    title: "Retrieve & Reason",
    subtitle: "Orchestrate context assembly and reasoning models.",
    image: "/ai-strategy/generative-ai-llm-development/enterprise-ai-architecture-step-4.png",
    items: [
      {
        image: "/ai-strategy/generative-ai-llm-development/enterprise-ai-architecture-step-4.1.png",
        title: "Hybrid Retrieval Engine",
        desc: "Vector Similiarity & Keyword Matching",
        detail: "Performs real-time cosine similarity search across vector indexes combined with BM25 keyword matching to gather the top-K most relevant reference chunks.",
      },
      {
        image: "/ai-strategy/generative-ai-llm-development/enterprise-ai-architecture-step-4.2.png",
        title: "Autonomous Agent Orchestrator",
        desc: "Task Planner & Multi-Tool Router",
        detail: "Executes dynamic ReAct loops to route user questions, access external SaaS APIs, execute SQL query tools, and manage conversation memory states.",
      },
      {
        image: "/ai-strategy/generative-ai-llm-development/enterprise-ai-architecture-setp-4.3.png",
        title: "Frontier LLM Synthesizer",
        desc: "Prompt Processing & Semantic Guardrails",
        detail: "Evaluates context chunks and prompt structures using leading reasoning models (GPT-4o, Claude 3.5 Sonnet) while applying toxic content and jailbreak guardrails.",
      },
    ],
  },
  {
    num: "05",
    title: "Generate & Deliver",
    subtitle: "Deliver factual outputs and trigger integrated actions.",
    image: "/ai-strategy/generative-ai-llm-development/enterprise-ai-architecture-step-5.png",
    items: [
      {
        icon: FiGlobe,
        title: "Unified Web Dashboards & Chatbots",
        desc: "Conversational UI & Charts Rendering",
        detail: "Embeds chat widgets, tabular summary components, and visual reasoning pathways directly within your web apps and internal admin panels."
      },
      {
        icon: FiMail,
        title: "Workplace Chatbot Routing",
        desc: "Slack & Microsoft Teams Workflows",
        detail: "Deploys secure communication bots that respond to user queries directly inside employee channels, complete with context links."
      },
      {
        icon: FiUsers,
        title: "Intelligent Human Escalation",
        desc: "Zendesk & Salesforce CRM Handoff",
        detail: "Gracefully routes conversation logs and ticket summaries to live support representatives if prompt validation scores drop below parameters."
      }
    ],
  },
];

const OUTPUT_CARDS = [
  { icon: FiMessageSquare, title: "AI Chatbot", desc: "Intelligent conversations that understand your business context.", color: "#7C3AED", bg: "#F3EEFE" },
  { icon: FiSearch, title: "Enterprise Search", desc: "Find anything across your documents, data, and knowledge base.", color: "#D68029", bg: "#FDF1E4" },
  { icon: FiCpu, title: "AI Copilot", desc: "Assist employees with tasks, summaries, insights, and recommendations.", color: "#2563EB", bg: "#EAF1FE" },
  { icon: FiZap, title: "Workflow Automation", desc: "Automate processes and actions using AI agents and tools.", color: "#16A34A", bg: "#E9F9EF" },
  { icon: FiBarChart2, title: "Analytics & Insights", desc: "Generate reports, trends, and insights from your enterprise data.", color: "#0EA5B7", bg: "#E5F7FA" },
];

const TRUST_STRIP = [
  { icon: FiShield, title: "Enterprise Security", desc: "SOC 2 • GDPR • HIPAA" },
  { icon: FiLock, title: "Private & Secure", desc: "Your data stays yours" },
  { icon: FiCloud, title: "Scalable Architecture", desc: "Built for enterprise scale" },
  { icon: FiActivity, title: "High Performance", desc: "Fast, reliable, and efficient" },
  { icon: FiShield, title: "Fully Customizable", desc: "Tailored to your needs" },
];

export default function EnterpriseAIArchitecture() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeStep = ARCHITECTURE_STEPS[activeIdx];

  return (
    <Section className="bg-[#FCFCFD] py-20 lg:py-32 relative overflow-hidden">
      <Row className="">
        {/* ── 1. Header & Description ── */}
        <div className="text-center max-w-4xl mx-auto mb-12">
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
            className="text-3xl md:text-5xl font-extrabold text-[#0B1E35] leading-tight mb-6"
          >
            Enterprise Generative <span className="text-[#D68029]">AI & LLM Architecture</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-base md:text-lg leading-relaxed"
          >
            A modern, secure, and scalable architecture that transforms your enterprise data into
            intelligent conversations, insights, and automation.
          </motion.p>
        </div>

        {/* ── 2. Technology Chips ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {TECH_CHIPS.map((chip, idx) => {
            const Icon = chip.icon;
            return (
              <div
                key={idx}
                className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-[#0B1E35] shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center gap-2"
              >
                <Icon className="w-3.5 h-3.5 text-[#D68029]" />
                {chip.label}
              </div>
            );
          })}
        </motion.div>

        {/* ── 3. Interactive Step Selector + Detail Panel ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16 items-start">
          {/* Left: vertical stepper */}
          <div className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-24">
            <div className="relative flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {ARCHITECTURE_STEPS.map((step, idx) => {
                const isActive = idx === activeIdx;
                const isLast = idx === ARCHITECTURE_STEPS.length - 1;
                return (
                  <div key={step.num} className="relative flex lg:flex-col shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`cursor-pointer group flex items-center gap-3 w-full text-left px-3 py-3 rounded-2xl transition-all duration-300 ${
                        isActive ? "bg-[#FDF1E4]" : "hover:bg-slate-50"
                      }`}
                    >
                      <span
                        className={`relative z-10 w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                          isActive
                            ? "bg-[#D68029] border-[#D68029] text-white shadow-[0_4px_14px_rgba(214,128,41,0.35)]"
                            : "bg-white border-slate-200 text-slate-400 group-hover:border-[#D68029]/40 group-hover:text-[#D68029]"
                        }`}
                      >
                        {step.num}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block text-sm font-bold leading-tight whitespace-nowrap lg:whitespace-normal ${
                            isActive ? "text-[#0B1E35]" : "text-slate-500 group-hover:text-[#0B1E35]"
                          }`}
                        >
                          {step.title}
                        </span>
                        <span className="hidden lg:block text-xs text-slate-400 leading-tight mt-0.5">{step.subtitle}</span>
                      </span>
                    </button>

                    {/* connecting line */}
                    {!isLast && (
                      <div
                        className={`lg:ml-[35px] w-6 lg:w-0.5 h-0.5 lg:h-6 self-center lg:self-auto shrink-0 transition-colors duration-300 ${
                          idx < activeIdx ? "bg-[#D68029]" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: detail panel */}
          <div className="flex-1 w-full min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.num}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-100 rounded-[28px] p-6 md:p-8 shadow-[0_15px_50px_rgba(11,30,53,0.06)]"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Illustration */}
                  {activeStep.image && (
                    <div className="relative w-full h-[280px] md:h-[340px] rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 via-white to-orange-50/50 overflow-hidden order-1 md:order-none">
                      <div className="absolute -inset-6 rounded-full blur-3xl opacity-30 bg-[#D68029]/40" />
                      <Image
                        src={activeStep.image}
                        alt={activeStep.title}
                        fill
                        sizes="(max-width: 768px) 90vw, 420px"
                        className="object-contain relative z-10 p-6"
                      />
                    </div>
                  )}

                  {/* Text content */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-9 h-9 rounded-full bg-[#D68029]/15 text-[#D68029] flex items-center justify-center text-sm font-bold">
                        {activeStep.num}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-[#0B1E35]">{activeStep.title}</h3>
                    </div>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">{activeStep.subtitle}</p>

                    {activeStep.caption && (
                      <p className="text-sm font-bold text-[#D68029] mb-3">{activeStep.caption}</p>
                    )}

                    {/* Tags (step 3) */}
                    {activeStep.tags && (
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        {activeStep.tags.map((tag, tIdx) => (
                          <div
                            key={tIdx}
                            className="text-xs cursor-pointer font-semibold px-3 py-2.5 rounded-xl text-center border bg-white border-[#D68029]/20 text-[#0B1E35] transition-all duration-300 hover:border-[#D68029]/50 hover:bg-[#D68029]/5"
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Items (steps 2, 4 & 5) */}
                    {activeStep.items && (
                      <div className="flex flex-col gap-3">
                        {activeStep.items.map((item, iIdx) => {
                          const ItemIcon = "icon" in item ? item.icon : null;
                          const itemImage = "image" in item ? item.image : null;
                          return (
                            <div
                              key={iIdx}
                              className="flex items-start cursor-pointer gap-4 px-4 py-4 rounded-xl bg-slate-50 border border-slate-100 transition-all duration-300 hover:bg-[#FDF1E4] hover:border-[#D68029]/30"
                            >
                              <div className="relative w-11 h-11 shrink-0 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#D68029] overflow-hidden">
                                {itemImage ? (
                                  <Image src={itemImage} alt={item.title} fill sizes="40px" className="object-contain p-1.5" />
                                ) : ItemIcon ? (
                                  <ItemIcon className="w-5 h-5" />
                                ) : null}
                              </div>
                              <div className="text-left flex-1">
                                <p className="text-sm font-bold text-[#0B1E35] leading-tight mb-1">{item.title}</p>
                                <p className="text-xs text-slate-500 font-semibold leading-normal mb-1">{item.desc}</p>
                                {item.detail && (
                                  <p className="text-[11px] text-gray-400 font-medium leading-relaxed mt-2 pt-2 border-t border-slate-150">{item.detail}</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Bullets (step 1) */}
                    {activeStep.bullets && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {activeStep.bullets.map((b, bIdx) => {
                          const BulletIcon = b.icon;
                          return (
                            <div key={bIdx} className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors duration-300 cursor-pointer hover:bg-[#FDF1E4]">
                              <div className="w-7 h-7 shrink-0 rounded-md bg-[#D68029]/10 flex items-center justify-center text-[#D68029]">
                                <BulletIcon className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-sm text-slate-600">{b.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Next step button */}
                    {activeIdx < ARCHITECTURE_STEPS.length - 1 && (
                      <button
                        type="button"
                        onClick={() => setActiveIdx(activeIdx + 1)}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D68029] hover:gap-2.5 transition-all duration-300 cursor-pointer"
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
        </div>

        {/* ── 4. Bottom Output Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
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
                className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(11,30,53,0.03)] hover:shadow-[0_18px_40px_rgba(214,128,41,0.10)] transition-all duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: card.bg, color: card.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#0B1E35] mb-2">{card.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                <div className="w-8 h-1 rounded-full mt-4 transition-all duration-300 group-hover:w-12" style={{ backgroundColor: card.color }} />
              </motion.div>
            );
          })}
        </div>

        {/* ── 5. Bottom Trust Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="bg-slate-50 border border-slate-100 rounded-[24px] p-6 md:p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {TRUST_STRIP.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-[#0B1E35] leading-tight">{item.title}</h5>
                    <p className="text-xs font-medium text-slate-500 leading-tight">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Row>
    </Section>
  );
}