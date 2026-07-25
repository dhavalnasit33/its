"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuCpu,
  LuWorkflow,
  LuLayers,
  LuCloud,
  LuCircleCheck,
  LuCode,
  LuZap,
  LuSparkles,
  LuBrain,
  LuDatabase,
  LuNetwork,
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

// Tech Stack Categories — ordered top (user-facing) to bottom (infrastructure)
const TECH_CATEGORIES = [
  {
    id: "models",
    category: "Foundation Models",
    tagline: "The Reasoning Layer Powering Every Agent",
    icon: LuBrain,
    accentColor: "#6366F1",
    items: [
      {
        name: "ChatGPT",
        logo: "/ai-strategy/brand-image/openai-logo.svg",
        tag: "OpenAI",
        desc: "Multimodal reasoning and chain-of-thought models powering tool-calling and complex task planning.",
        features: ["128K Context Window", "Native Function Calling", "Multimodal Input"],
      },
      {
        name: "Claude",
        logo: "/ai-strategy/brand-image/claude-ai-logo.svg",
        tag: "Anthropic",
        desc: "Constitutional AI models tuned for long-context reasoning, coding accuracy, and safe autonomous behavior.",
        features: ["200K+ Context Window", "Extended Thinking", "Computer Use"],
      },
      {
        name: "Gemini",
        logo: "/ai-strategy/brand-image/google-gemini-logo.svg",
        tag: "Google DeepMind",
        desc: "Natively multimodal models with massive context windows for enterprise-scale document and video reasoning.",
        features: ["1M+ Token Context", "Native Multimodality", "Grounded Search"],
      },
      {
        name: "Llama 3",
        logo: "/ai-strategy/brand-image/meta-logo.svg",
        tag: "Open Weights",
        desc: "High-performance open-weights LLM for private enterprise deployment and fine-tuning.",
        features: ["Private Deployment", "Custom Fine-Tuning", "On-Premises AI"],
      },
      {
        name: "Mistral AI",
        logo: "/ai-strategy/brand-image/mistral-ai-logo.svg",        
        icon: LuBrain,
        tag: "Frontier LLM",
        desc: "Efficient, high-speed open-weight models optimized for reasoning and agentic workflows.",
        features: ["High Efficiency", "Mixture of Experts", "Low Latency"],
      },
      {
        name: "DeepSeek",
        logo: "/ai-strategy/brand-image/deepseek-logo.svg",        
        icon: LuBrain,
        tag: "Reasoning Model",
        desc: "Advanced open-weights reasoning model specializing in complex math, code, and logic.",
        features: ["Deep Reasoning", "Chain-of-Thought", "Code & Math Focus"],
      },
    ],
  },
  {
    id: "frameworks",
    category: "Agent Frameworks",
    tagline: "Autonomous Orchestration & Multi-Agent SDKs",
    icon: LuCpu,
    accentColor: "#D27E2B",
    items: [
      {
        name: "OpenAI Agents SDK",
        logo: "/ai-strategy/brand-image/openai-logo.svg",
        tag: "Core SDK",
        desc: "Stateful agent loops, tool-calling schema enforcement, and handoff execution.",
        features: ["Structured Outputs", "Native Tool Calling", "Python & Node.js"],
      },
      {
        name: "CrewAI",
        logo: "/ai-strategy/brand-image/crewai-logo.svg",
        tag: "Role-Based Agents",
        desc: "Autonomous multi-agent collaboration with role delegation and structured tasks.",
        features: ["Process Automation", "Task Delegation", "Memory Stores"],
      },
      {
        name: "LangGraph",
        logo: "/ai-strategy/brand-image/langgraph-logo.svg",
        tag: "Cyclic Graphs",
        desc: "Stateful, multi-actor agent orchestration using directed cyclic graph architectures.",
        features: ["Human-in-the-loop", "Time Travel Debugging", "State Persistence"],
      },
      {
        name: "AutoGen",
        logo: "/ai-strategy/brand-image/microsoft-logo.svg",
        tag: "Conversational Multi-Agent",
        desc: "Multi-agent conversation framework for complex problem-solving workflows.",
        features: ["Code Execution", "Group Chat Manager", "Customizable Agents"],
      },
    ],
  },
  {
    id: "memory",
    category: "Memory & Knowledge",
    tagline: "Vector Storage & Retrieval for Long-Term Context",
    icon: LuDatabase,
    accentColor: "#EC4899",
    items: [
      {
        name: "Vector Database",
        icon: LuDatabase,
        tag: "Semantic Search",
        desc: "Stores high-dimensional embeddings for fast semantic similarity search across unstructured content.",
        features: ["Semantic Similarity Search", "Embedding Storage", "Approximate Nearest Neighbor"],
      },
      {
        name: "Knowledge Graph",
        icon: LuNetwork,
        tag: "Graph Reasoning",
        desc: "Structures entities and relationships so agents can reason over connected facts instead of flat text chunks.",
        features: ["Entity Relationships", "Graph Traversal Queries", "Structured Reasoning"],
      },
      {
        name: "RAG",
        icon: LuWorkflow,
        tag: "Retrieval-Augmented Generation",
        desc: "Grounds model responses in retrieved documents instead of relying on parametric memory alone.",
        features: ["Reduced Hallucination", "Dynamic Context Injection", "Source Attribution"],
      },
      {
        name: "Redis",
        logo: "/ai-strategy/brand-image/redis-logo.svg",
        tag: "In-Memory Store",
        desc: "In-memory data store used for low-latency caching, session state, and vector search extensions in agent pipelines.",
        features: ["Sub-Millisecond Latency", "Vector Search Module", "Session & Cache Store"],
      },
    ],
  },
  {
    id: "integration",
    category: "Enterprise Integration",
    tagline: "Standardized Tooling & Secure Protocol Gateways",
    icon: LuLayers,
    accentColor: "#3B82F6",
    items: [
      {
        name: "MCP (Model Context Protocol)",
        logo: "/ai-strategy/brand-image/model-context-protocol-(mcp)-logo.svg",
        tag: "Universal Protocol",
        desc: "Open standard for connecting AI agents securely to local data sources and enterprise tools.",
        features: ["Standardized Schema", "Secure Authorization", "Universal Adapters"],
      },
      {
        name: "REST APIs",
        logo: "/ai-strategy/brand-image/rest-api-logo.svg",
        tag: "Enterprise Connectors",
        desc: "Bidirectional HTTP integration with Salesforce, SAP, HubSpot, Jira, and custom backend APIs.",
        features: ["OAuth2 / API Key", "Rate Limiting", "JSON Payload Mapping"],
      },
      {
        name: "Webhooks",
        logo: "/ai-strategy/brand-image/webhook-logo.svg",
        tag: "Event-Driven Hooks",
        desc: "Real-time event listeners triggering AI agent workflows upon status changes or incoming data.",
        features: ["Asynchronous Triggers", "Payload Verification", "Retry Pipelines"],
      },
    ],
  },
  {
    id: "cloud",
    category: "Cloud & Infrastructure",
    tagline: "Scalable Enterprise Deployment Platforms",
    icon: LuCloud,
    accentColor: "#10B981",
    items: [
      {
        name: "Azure AI",
        logo: "/ai-strategy/brand-image/azure-logo.svg",
        tag: "Enterprise Cloud",
        desc: "Azure OpenAI Service, AI Search, vector indexing, and enterprise security compliance.",
        features: ["Private Endpoints", "RBAC Security", "Vector Search"],
      },
      {
        name: "AWS",
        logo: "/ai-strategy/brand-image/aws-logo.svg",
        tag: "Cloud Infrastructure",
        desc: "Amazon Bedrock, SageMaker, Lambda serverless execution, and S3 knowledge bases.",
        features: ["Bedrock Agents", "Serverless Scale", "IAM Governance"],
      },
      {
        name: "GCP (Google Cloud)",
        logo: "/ai-strategy/brand-image/google-cloud-logo.svg",
        tag: "AI Hypercomputer",
        desc: "Vertex AI Agent Builder, Gemini Models, and BigQuery vector search integrations.",
        features: ["Vertex AI Search", "Gemini 1.5 Pro", "Enterprise Privacy"],
      },
      {
        name: "Kubernetes",
        logo: "/ai-strategy/brand-image/kubernetes-logo.svg",
        tag: "Container Orchestration",
        desc: "Orchestrates containerized agent workloads with auto-scaling, self-healing, and rolling deployments.",
        features: ["Auto-Scaling", "Self-Healing Pods", "Rolling Deployments"],
      },
      {
        name: "Docker",
        logo: "/ai-strategy/brand-image/docker-logo.svg",
        tag: "Containerization",
        desc: "Packages agents and their dependencies into portable, reproducible containers for any environment.",
        features: ["Reproducible Builds", "Multi-Stage Images", "Registry Distribution"],
      },
    ],
  },
];

// Flattened list of every tool across all categories, used to drive the
// logo marquee — a single "trusted stack" wall independent of the active tab.
const ALL_TOOLS = TECH_CATEGORIES.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, accentColor: cat.accentColor }))
);

export default function AgenticTechStack() {
  const [activeCategoryId, setActiveCategoryId] = useState(TECH_CATEGORIES[0].id);
  const [activeItemIdx, setActiveItemIdx] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeCategory =
    TECH_CATEGORIES.find((c) => c.id === activeCategoryId) || TECH_CATEGORIES[0];
  const activeItem =
    activeCategory.items[Math.min(activeItemIdx, activeCategory.items.length - 1)];

  const selectTool = (catId: string, idx: number) => {
    setActiveCategoryId(catId);
    setActiveItemIdx(idx);
    // Smoothly bring the detail panel into view when selecting any chip across desktop & mobile
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        if (window.innerWidth < 1024) {
          panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // On desktop, scroll smoothly so the sticky detail panel is centered / aligned in viewport
          panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    }
  };

  return (
    <Section className="py-20 lg:py-28 relative overflow-hidden bg-slate-50/70 border-t border-slate-200/70 text-slate-900">
      {/* Soft Ambient Light Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-orange-100/50 via-indigo-50/40 to-transparent blur-3xl pointer-events-none" />

      <Row>
        {/* Section Header */}
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-14 max-w-3xl mx-auto flex flex-col items-center gap-3 relative z-10"
        >
          <SectionBadge title="ENTERPRISE STACK" />
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold leading-tight tracking-tight text-[#0F172A]">
            Agentic Tech <span className="text-[#D27E2B]">Stack</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            We build production-ready autonomous agents using industry-standard frameworks, enterprise protocol bridges, and battle-tested cloud platforms.
          </p>
        </motion.div>

        {/* ── Logo Marquee: full ecosystem at a glance (Full Bleed Edge-to-Edge) ── */}
        <motion.div {...fadeUp(0.05)} className="relative z-10 mb-14 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
          {/* Fade edges for smooth entry/exit */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-agentic-marquee hover:[animation-play-state:paused] py-1">
            {[...ALL_TOOLS, ...ALL_TOOLS].map((tool, i) => {
              const toolObj = tool as { logo?: string; icon?: React.ElementType; name: string; accentColor?: string };
              return (
                <div
                  key={i}
                  className="flex items-center gap-2.5 mx-2.5 px-4 py-2.5 rounded-full bg-white border border-slate-200/90 shadow-xs shrink-0"
                >
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                    {toolObj.logo ? (
                      <Image
                        src={toolObj.logo}
                        alt={toolObj.name}
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                      />
                    ) : toolObj.icon ? (
                      <toolObj.icon
                        className="w-4 h-4"
                        style={{ color: toolObj.accentColor || "#D27E2B" }}
                      />
                    ) : null}
                  </div>
                  <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
                    {toolObj.name}
                  </span>
                </div>
              );
            })}
          </div>
          <style>{`
            @keyframes agentic-marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .animate-agentic-marquee {
              animation: agentic-marquee 32s linear infinite;
            }
          `}</style>
        </motion.div>

        {/* ── Layered Stack (left) + Detail Panel (right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">

          {/* LEFT: Literal tech-stack layers, widest at the foundation */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-5 flex flex-col items-center">
            {TECH_CATEGORIES.map((cat, catIdx) => {
              const Icon = cat.icon;
              const isActiveLayer = activeCategoryId === cat.id;
              const layerWidth =
                [
                  "w-full sm:w-[68%]",
                  "w-full sm:w-[76%]",
                  "w-full sm:w-[84%]",
                  "w-full sm:w-[92%]",
                  "w-full",
                ][catIdx] || "w-full";

              return (
                <React.Fragment key={cat.id}>
                  {catIdx > 0 && (
                    <div className="w-0.5 h-5 border-l-2 border-dashed border-slate-300" />
                  )}
                  <div
                    className={`${layerWidth} rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isActiveLayer
                        ? "border-slate-300 shadow-md bg-white"
                        : "border-slate-200/80 bg-white/60 hover:bg-white"
                    }`}
                    style={isActiveLayer ? { borderColor: `${cat.accentColor}60` } : undefined}
                  >
                    {/* Layer header — click selects this layer's first tool */}
                    <button
                      onClick={() => selectTool(cat.id, 0)}
                      className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left cursor-pointer transition-colors hover:bg-slate-50/80"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border"
                          style={{
                            backgroundColor: `${cat.accentColor}15`,
                            borderColor: `${cat.accentColor}40`,
                            color: cat.accentColor,
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-base font-black text-[#0F172A] truncate">{cat.category}</h4>
                          <p className="text-xs text-slate-500 font-semibold truncate">{cat.tagline}</p>
                        </div>
                      </div>
                      <span
                        className="shrink-0 text-xs  font-bold px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: `${cat.accentColor}15`, color: cat.accentColor }}
                      >
                        {cat.items.length}
                      </span>
                    </button>

                    {/* Tool chips — click selects that exact tool for the panel.
                        Bigger icon badge + category-accent active fill so it reads
                        clearly as a clickable, selectable control at a glance. */}
                    <div className="flex flex-wrap gap-2.5 px-5 pb-5">
                      {cat.items.map((item, idx) => {
                        const itemObj = item as { logo?: string; icon?: React.ElementType };
                        const isActiveItem = activeCategoryId === cat.id && activeItemIdx === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => selectTool(cat.id, idx)}
                            className="flex items-center gap-2 pl-2 pr-3.5 py-2 rounded-xl border text-[13px] font-extrabold transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-none"
                            style={
                              isActiveItem
                                ? {
                                    backgroundColor: cat.accentColor,
                                    borderColor: cat.accentColor,
                                    color: "#FFFFFF",
                                  }
                                : {
                                    backgroundColor: "#F8FAFC",
                                    borderColor: "#E2E8F0",
                                    color: "#334155",
                                  }
                            }
                          >
                            {itemObj.logo ? (
                              <span className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0 overflow-hidden p-1 shadow-xs">
                                <Image
                                  src={itemObj.logo}
                                  alt={item.name}
                                  width={20}
                                  height={20}
                                  className="w-full h-full object-contain"
                                />
                              </span>
                            ) : itemObj.icon ? (
                              <span
                                className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-xs"
                                style={{ color: isActiveItem ? cat.accentColor : "#D27E2B" }}
                              >
                                <itemObj.icon className="w-4 h-4" />
                              </span>
                            ) : null}
                            {item.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </motion.div>

          {/* RIGHT: Detail panel for whichever tool is selected */}
          <motion.div
            ref={panelRef}
            {...fadeUp(0.15)}
            className="lg:col-span-7 lg:sticky lg:top-28 bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-8 shadow-sm relative overflow-hidden min-h-[420px] flex flex-col justify-between scroll-mt-24"
          >
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
              style={{ backgroundColor: activeCategory.accentColor }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory.id}-${activeItemIdx}`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="relative z-10 flex flex-col gap-6"
              >
                {/* Layer eyebrow */}
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest w-fit"
                  style={{ color: activeCategory.accentColor }}
                >
                  <activeCategory.icon className="w-3.5 h-3.5" />
                  {activeCategory.category} Layer
                </span>

                {/* Tool Header */}
                <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                  {(() => {
                    const itemObj = activeItem as { logo?: string; icon?: React.ElementType };
                    return itemObj.logo ? (
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-center p-3">
                        <Image
                          src={itemObj.logo}
                          alt={activeItem.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : itemObj.icon ? (
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#D27E2B]">
                        <itemObj.icon className="w-6 h-6" />
                      </div>
                    ) : null;
                  })()}
                  <div className="min-w-0">
                    <h3 className="text-[26px] font-black text-[#0F172A] tracking-tight truncate">
                      {activeItem.name}
                    </h3>
                    <span className="inline-block mt-1 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      {activeItem.tag}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                    What it does
                  </h4>
                  <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
                    {activeItem.desc}
                  </p>
                </div>

                {/* Full capability list */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5">
                    Core capabilities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeItem.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-extrabold bg-slate-50 text-slate-700 border border-slate-200"
                      >
                        <LuCircleCheck className="w-3.5 h-3.5 text-[#D27E2B]" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Panel footer: quick jump between siblings in the same layer */}
            <div className="relative z-10 pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-bold">
              <span>{activeCategory.tagline}</span>
              <span>
                {activeItemIdx + 1} / {activeCategory.items.length}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Infrastructure Assurance */}
        {/* <motion.div
          {...fadeUp(0.3)}
          className="mt-14 pt-6 border-t border-slate-200/80 text-center flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 font-bold relative z-10"
        >
          <span className="flex items-center gap-1.5">
            <LuSparkles className="w-4 h-4 text-[#D27E2B]" />
            Enterprise Security & ISO 27001 Compliant
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <LuCircleCheck className="w-4 h-4 text-emerald-500" />
            Model Agnostic Architecture
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <LuLayers className="w-4 h-4 text-blue-500" />
            Zero Vendor Lock-in
          </span>
        </motion.div> */}
      </Row>
    </Section>
  );
}