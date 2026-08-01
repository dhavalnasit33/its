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
  LuBrain,
  LuDatabase,
  LuNetwork,
  LuChevronRight,
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

// Tech Stack Categories
const TECH_CATEGORIES = [
  {
    id: "models",
    category: "AI Models We Integrate",
    tagline: "Frontier Reasoning Models We Integrate Into Client Solutions",
    icon: LuBrain,
    accentColor: "#6366F1",
    items: [
      {
        name: "ChatGPT",
        logo: "/ai-strategy/brand-image/openai-logo.svg",
        tag: "OpenAI Models",
        desc: "We integrate OpenAI's multimodal reasoning and chain-of-thought models into client applications for native tool-calling and complex task planning.",
        features: [
          "128K Context Window",
          "Native Function Calling",
          "Multimodal Reasoning",
        ],
      },
      {
        name: "Claude",
        logo: "/ai-strategy/brand-image/claude-ai-logo.svg",
        tag: "Anthropic Models",
        desc: "We leverage Anthropic's Claude models when client solutions require long-context document analysis, coding accuracy, and safe autonomous behavior.",
        features: ["200K+ Context Window", "Extended Thinking", "Computer Use"],
      },
      {
        name: "Gemini",
        logo: "/ai-strategy/brand-image/google-gemini-logo.svg",
        tag: "Google DeepMind",
        desc: "We build enterprise solutions with Google Gemini when clients need massive context windows for multi-page document processing and video analysis.",
        features: [
          "1M+ Token Context",
          "Native Multimodality",
          "Grounded Search",
        ],
      },
      {
        name: "Llama 3",
        logo: "/ai-strategy/brand-image/meta-logo.svg",
        tag: "Open Weights",
        desc: "We fine-tune and deploy open-weights models like Llama 3 for clients requiring private on-premises or VPC hosting with full data privacy.",
        features: [
          "Private VPC Hosting",
          "Custom Fine-Tuning",
          "On-Premises AI",
        ],
      },
      {
        name: "Mistral AI",
        logo: "/ai-strategy/brand-image/mistral-ai-logo.svg",
        icon: LuBrain,
        tag: "Frontier Models",
        desc: "We implement Mistral models when building lightweight, ultra-fast agentic workflows with low latency requirement.",
        features: ["High Efficiency", "Mixture of Experts", "Low Latency"],
      },
      {
        name: "DeepSeek",
        logo: "/ai-strategy/brand-image/deepseek-logo.svg",
        icon: LuBrain,
        tag: "Reasoning Models",
        desc: "We integrate open reasoning models for clients needing specialized mathematical, code, and analytical logic execution.",
        features: ["Deep Reasoning", "Chain-of-Thought", "Code & Math Focus"],
      },
    ],
  },
  {
    id: "frameworks",
    category: "Agent Development Frameworks",
    tagline: "Frameworks We Use To Architect Autonomous Multi-Agent Systems",
    icon: LuCpu,
    accentColor: "#D27E2B",
    items: [
      {
        name: "OpenAI Agents SDK",
        logo: "/ai-strategy/brand-image/openai-logo.svg",
        tag: "Core Agent SDK",
        desc: "We utilize OpenAI Agents SDK to build stateful agent loops, tool-calling schema enforcement, and multi-agent handoff routines.",
        features: [
          "Structured Outputs",
          "Native Tool Calling",
          "Python & Node.js",
        ],
      },
      {
        name: "CrewAI",
        logo: "/ai-strategy/brand-image/crewai-logo.svg",
        tag: "Role-Based Framework",
        desc: "We build role-based multi-agent teams using CrewAI to automate complex cross-departmental business processes.",
        features: ["Process Automation", "Task Delegation", "Memory Stores"],
      },
      {
        name: "LangGraph",
        logo: "/ai-strategy/brand-image/langgraph-logo.svg",
        tag: "Cyclic State Graphs",
        desc: "We design resilient, stateful workflows using LangGraph for multi-step agent applications requiring cyclic loops and human checkpoints.",
        features: [
          "Human-in-the-loop",
          "State Persistence",
          "Error Recovery",
        ],
      },
      {
        name: "AutoGen",
        logo: "/ai-strategy/brand-image/microsoft-logo.svg",
        tag: "Conversational Multi-Agent",
        desc: "We build multi-agent conversational networks using AutoGen to solve complex collaborative problem-solving tasks.",
        features: [
          "Code Execution",
          "Group Chat Manager",
          "Customizable Agents",
        ],
      },
    ],
  },
  {
    id: "memory",
    category: "Enterprise Knowledge & Memory",
    tagline: "Vector Memory & RAG Architectures We Implement",
    icon: LuDatabase,
    accentColor: "#EC4899",
    items: [
      {
        name: "Vector Database",
        icon: LuDatabase,
        tag: "Semantic Search",
        desc: "We set up high-performance vector databases to allow AI agents to instantly search and retrieve relevant company knowledge.",
        features: [
          "Semantic Similarity Search",
          "Embedding Indexing",
          "Sub-Second Retrieval",
        ],
      },
      {
        name: "Knowledge Graph",
        icon: LuNetwork,
        tag: "Graph Reasoning",
        desc: "We map business entities and relationships into knowledge graphs so agents can reason over connected business data.",
        features: [
          "Entity Relationships",
          "Graph Traversal Queries",
          "Structured Reasoning",
        ],
      },
      {
        name: "RAG Pipelines",
        icon: LuWorkflow,
        tag: "Retrieval-Augmented Generation",
        desc: "We build enterprise RAG pipelines to ground agent responses directly in your verified company documents.",
        features: [
          "Zero Hallucinations",
          "Dynamic Context Injection",
          "Source Citation",
        ],
      },
      {
        name: "Redis Enterprise",
        logo: "/ai-strategy/brand-image/redis-logo.svg",
        tag: "In-Memory Caching",
        desc: "We configure Redis in-memory datastores for low-latency session memory and caching across active agent sessions.",
        features: [
          "Sub-Millisecond Latency",
          "Vector Search Module",
          "Session & Cache Store",
        ],
      },
    ],
  },
  {
    id: "integration",
    category: "Business System Integration",
    tagline: "Protocols & Gateways We Use To Connect AI With Software",
    icon: LuLayers,
    accentColor: "#3B82F6",
    items: [
      {
        name: "MCP (Model Context Protocol)",
        logo: "/ai-strategy/brand-image/model-context-protocol-(mcp)-logo.svg",
        tag: "Standard Protocol",
        desc: "We implement Model Context Protocol (MCP) servers to securely expose enterprise tools, databases, and APIs to AI agents.",
        features: [
          "Standardized Schemas",
          "Secure OAuth Authorization",
          "Custom Tool Adapters",
        ],
      },
      {
        name: "REST APIs & Webhooks",
        logo: "/ai-strategy/brand-image/rest-api-logo.svg",
        tag: "Enterprise Connectors",
        desc: "We build custom REST API connectors to link AI agents with Salesforce, SAP, HubSpot, Zendesk, Jira, and internal backends.",
        features: ["OAuth2 Security", "Rate Limiting", "JSON Payload Mapping"],
      },
      {
        name: "Event Triggers",
        logo: "/ai-strategy/brand-image/webhook-logo.svg",
        tag: "Real-Time Listeners",
        desc: "We set up event-driven webhooks so AI agents automatically trigger whenever customer requests or status changes occur.",
        features: [
          "Real-Time Automation",
          "Payload Verification",
          "Retry Pipelines",
        ],
      },
    ],
  },
  {
    id: "cloud",
    category: "Production Deployment Stack",
    tagline: "Cloud Platforms & Tools We Use To Deploy Secure Solutions",
    icon: LuCloud,
    accentColor: "#10B981",
    items: [
      {
        name: "Microsoft Azure",
        logo: "/ai-strategy/brand-image/azure-logo.svg",
        tag: "Cloud Deployment",
        desc: "We deploy enterprise AI solutions on Microsoft Azure when organizations require private endpoints, HIPAA/SOC2 compliance, and RBAC security.",
        features: ["Private Endpoints", "RBAC Governance", "Azure OpenAI Service"],
      },
      {
        name: "AWS",
        logo: "/ai-strategy/brand-image/aws-logo.svg",
        tag: "Cloud Infrastructure",
        desc: "We build cloud-native AI applications on AWS using Amazon Bedrock, Lambda serverless functions, and secure S3 knowledge bases.",
        features: ["Bedrock Agents", "Serverless Scale", "IAM Security"],
      },
      {
        name: "Google Cloud",
        logo: "/ai-strategy/brand-image/google-cloud-logo.svg",
        tag: "AI Cloud Platform",
        desc: "We deploy client AI workflows on Google Cloud Platform using Vertex AI and BigQuery vector search integrations.",
        features: ["Vertex AI Search", "Gemini Integration", "Enterprise Privacy"],
      },
      {
        name: "Kubernetes & Docker",
        logo: "/ai-strategy/brand-image/docker-logo.svg",
        tag: "Container Deployment",
        desc: "We package and deploy client AI agent microservices using Docker containers and Kubernetes for reliable production operations.",
        features: [
          "Auto-Scaling Pods",
          "Container Security",
          "CI/CD Integration",
        ],
      },
    ],
  },
];

const ALL_TOOLS = TECH_CATEGORIES.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, accentColor: cat.accentColor })),
);

export default function AgenticTechStack() {
  const [activeCategoryId, setActiveCategoryId] = useState(
    TECH_CATEGORIES[0].id,
  );
  const [activeItemIdx, setActiveItemIdx] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeCategory =
    TECH_CATEGORIES.find((c) => c.id === activeCategoryId) ||
    TECH_CATEGORIES[0];
  const activeItem =
    activeCategory.items[
      Math.min(activeItemIdx, activeCategory.items.length - 1)
    ];

  const selectTool = (catId: string, idx: number) => {
    setActiveCategoryId(catId);
    setActiveItemIdx(idx);
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        if (window.innerWidth < 1024) {
          panelRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } else {
          panelRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      });
    }
  };

  return (
    <Section className="py-20 lg:py-28 relative overflow-hidden bg-slate-50/70 border-t border-slate-200/70 text-slate-900">
      {/* Refined Background Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-slate-200/40 via-white/10 to-transparent blur-3xl pointer-events-none" />

      <Row>
        <div className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center gap-3 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block  "
          >
            <SectionBadge title="ENTERPRISE STACK" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-black"
          >
            Agentic Tech
            <span className="text-[#D27E2B]"> Stack</span>
          </motion.h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium max-w-2xl leading-relaxed">
            We build production-ready autonomous agents using industry-standard
            frameworks, enterprise protocol bridges, and battle-tested cloud
            platforms.
          </p>
        </div>

        {/* Logo Marquee */}
        <motion.div
          {...fadeUp(0.05)}
          className="relative z-10 mb-16 w-screen  left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50/70 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50/70 to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-agentic-marquee hover:[animation-play-state:paused] py-2">
            {[...ALL_TOOLS, ...ALL_TOOLS].map((tool, i) => {
              const toolObj = tool as {
                logo?: string;
                icon?: React.ElementType;
                name: string;
                accentColor?: string;
              };
              return (
                <div
                  key={i}
                  className="flex cursor-pointer items-center gap-3 mx-3 px-5 py-2.5 rounded-full bg-white border border-slate-200/80 shadow-sm shrink-0 transition-transform hover:scale-105"
                >
                  <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                    {toolObj.logo ? (
                      <Image
                        src={toolObj.logo}
                        alt={toolObj.name}
                        width={20}
                        height={20}
                        className="w-full h-full object-contain"
                      />
                    ) : toolObj.icon ? (
                      <toolObj.icon
                        className="w-4 h-4"
                        style={{ color: toolObj.accentColor || "#4F46E5" }}
                      />
                    ) : null}
                  </div>
                  <span className="text-[13px] font-bold text-slate-700 whitespace-nowrap">
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
              animation: agentic-marquee 40s linear infinite;
            }
          `}</style>
        </motion.div>

        {/* ── Main Interactive Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
          {/* LEFT: Accordion/Tab Category Cards */}
          <motion.div
            {...fadeUp(0.1)}
            className="lg:col-span-5 flex flex-col gap-4 relative"
          >
            {TECH_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActiveLayer = activeCategoryId === cat.id;

              return (
                <div
                  key={cat.id}
                  onClick={() => selectTool(cat.id, 0)}
                  className={`w-full rounded-[1.5rem] transition-all duration-300 overflow-hidden bg-white cursor-pointer group ${
                    isActiveLayer
                      ? "shadow-md border-[1.5px]"
                      : "shadow-sm border border-slate-100 hover:border-slate-300 hover:shadow"
                  }`}
                  style={{
                    borderColor: isActiveLayer ? cat.accentColor : undefined,
                  }}
                >
                  {/* Category Header */}
                  <div className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left outline-none">
                    <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-[1rem] flex items-center justify-center transition-all duration-300 ${
                          isActiveLayer
                            ? "shadow-inner border"
                            : "bg-slate-50 group-hover:scale-105"
                        }`}
                        style={{
                          backgroundColor: isActiveLayer
                            ? `${cat.accentColor}15`
                            : undefined,
                          borderColor: isActiveLayer
                            ? `${cat.accentColor}30`
                            : undefined,
                          color: isActiveLayer ? cat.accentColor : "#64748B",
                        }}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div className="min-w-0">
                        <h4
                          className={`text-lg sm:text-[1.35rem] font-bold tracking-tight truncate transition-colors ${
                            isActiveLayer ? "text-slate-900" : "text-slate-700"
                          }`}
                        >
                          {cat.category}
                        </h4>
                        <p className="text-[13px] sm:text-sm text-slate-500 font-medium truncate mt-0.5">
                          {cat.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Explicit Click Affordance / Status Indicator */}
                    <div className="flex items-center justify-center w-8 h-8 shrink-0">
                      {isActiveLayer ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2.5 h-2.5 rounded-full"
                          style={{
                            backgroundColor: cat.accentColor,
                            boxShadow: `0 0 0 6px ${cat.accentColor}15`,
                          }}
                        />
                      ) : (
                        <LuChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 transition-transform duration-300 group-hover:translate-x-1" />
                      )}
                    </div>
                  </div>

                  {/* Expandable Sub-Tools */}
                  <AnimatePresence initial={false}>
                    {isActiveLayer && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 flex flex-wrap gap-2.5 sm:gap-3">
                          {cat.items.map((item, idx) => {
                            const itemObj = item as {
                              logo?: string;
                              icon?: React.ElementType;
                            };
                            const isActiveItem =
                              activeCategoryId === cat.id &&
                              activeItemIdx === idx;

                            return (
                              <button
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectTool(cat.id, idx);
                                }}
                                className={`flex items-center gap-2 sm:gap-2.5 pl-2 sm:pl-2.5 pr-4 sm:pr-5 py-1.5 sm:py-2 rounded-full border text-[13px] sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                                  isActiveItem
                                    ? "shadow-sm scale-105"
                                    : "hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-sm"
                                }`}
                                style={
                                  isActiveItem
                                    ? {
                                        backgroundColor: cat.accentColor,
                                        borderColor: cat.accentColor,
                                        color: "#FFFFFF",
                                      }
                                    : {
                                        backgroundColor: "#FFFFFF",
                                        borderColor: "#E2E8F0",
                                        color: "#475569",
                                      }
                                }
                              >
                                {itemObj.logo ? (
                                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden shadow-sm p-1">
                                    <Image
                                      src={itemObj.logo}
                                      alt={item.name}
                                      width={18}
                                      height={18}
                                      className="w-full h-full object-contain"
                                    />
                                  </span>
                                ) : itemObj.icon ? (
                                  <span
                                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm"
                                    style={{
                                      color: isActiveItem
                                        ? cat.accentColor
                                        : "#64748B",
                                    }}
                                  >
                                    <itemObj.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                  </span>
                                ) : null}
                                {item.name}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

          {/* RIGHT: Detail Panel */}
          <motion.div
            ref={panelRef}
            {...fadeUp(0.15)}
            className="lg:col-span-7 lg:sticky lg:top-32 bg-white border border-slate-200/80 rounded-[2rem] p-8 sm:p-10 shadow-xl shadow-slate-200/40 relative overflow-hidden min-h-[460px] flex flex-col justify-between scroll-mt-28"
          >
            {/* Dynamic Background Glow */}
            <div
              className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.08] pointer-events-none transition-colors duration-700"
              style={{ backgroundColor: activeCategory.accentColor }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory.id}-${activeItemIdx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative z-10 flex flex-col gap-8"
              >
                {/* Layer Eyebrow */}
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${activeCategory.accentColor}15`,
                      color: activeCategory.accentColor,
                    }}
                  >
                    <activeCategory.icon className="w-4 h-4" />
                    {activeCategory.category} Layer
                  </span>
                </div>

                {/* Tool Header */}
                <div className="flex items-center gap-5">
                  {(() => {
                    const itemObj = activeItem as {
                      logo?: string;
                      icon?: React.ElementType;
                    };
                    return itemObj.logo ? (
                      <div className="w-20 h-20 shrink-0 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center p-4">
                        <Image
                          src={itemObj.logo}
                          alt={activeItem.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : itemObj.icon ? (
                      <div
                        className="w-20 h-20 shrink-0 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center"
                        style={{ color: activeCategory.accentColor }}
                      >
                        <itemObj.icon className="w-8 h-8" />
                      </div>
                    ) : null;
                  })()}
                  <div className="min-w-0">
                    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                      {activeItem.name}
                    </h3>
                    <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200/80">
                      {activeItem.tag}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="pl-1">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">
                    What it does
                  </h4>
                  <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-2xl">
                    {activeItem.desc}
                  </p>
                </div>

                {/* Core Capabilities */}
                <div className="pl-1">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">
                    Core capabilities
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {activeItem.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-white text-slate-800 border border-slate-200/80 shadow-sm"
                      >
                        <LuCircleCheck
                          className="w-4 h-4"
                          style={{ color: activeCategory.accentColor }}
                        />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Panel Footer */}
            <div className="relative z-10 pt-8 mt-8 border-t border-slate-100 flex items-center justify-between text-sm text-slate-400 font-bold">
              <span>{activeCategory.tagline}</span>
              <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-600">
                {activeItemIdx + 1} / {activeCategory.items.length}
              </span>
            </div>
          </motion.div>
        </div>
      </Row>
    </Section>
  );
}
