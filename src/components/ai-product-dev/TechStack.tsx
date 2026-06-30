"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Motion from "@/components/motionbar";
import TechBackground from "@/components/home/TechBackground";

const TABS = ["LLMs", "Vector Database", "Frameworks", "Cloud", "Frontend", "Backend"] as const;
type Tab = typeof TABS[number];

const TECH_DATA: Record<Tab, Array<{ name: string; emoji: string; desc?: string }>> = {
  "LLMs": [
    { name: "GPT-4o", emoji: "🟢", desc: "OpenAI" },
    { name: "Claude 3.5", emoji: "🟠", desc: "Anthropic" },
    { name: "Gemini Pro", emoji: "🔵", desc: "Google" },
    { name: "Llama 3", emoji: "🦙", desc: "Meta" },
    { name: "Mistral", emoji: "⭐", desc: "MistralAI" },
    { name: "Grok", emoji: "✖️", desc: "xAI" },
    { name: "DeepSeek", emoji: "🌊", desc: "DeepSeek" },
    { name: "Qwen", emoji: "⚡", desc: "Alibaba" },
  ],
  "Vector Database": [
    { name: "Pinecone", emoji: "🌲", desc: "Managed Vector DB" },
    { name: "Weaviate", emoji: "🔷", desc: "Open Source" },
    { name: "Qdrant", emoji: "🎯", desc: "High Performance" },
    { name: "Chroma", emoji: "🎨", desc: "Embedding Store" },
    { name: "Milvus", emoji: "🚀", desc: "Open Source" },
    { name: "pgvector", emoji: "🐘", desc: "PostgreSQL" },
    { name: "Faiss", emoji: "🔍", desc: "Meta Research" },
    { name: "Redis Vector", emoji: "🔴", desc: "In-Memory" },
  ],
  "Frameworks": [
    { name: "LangChain", emoji: "🔗", desc: "LLM Orchestration" },
    { name: "LlamaIndex", emoji: "🦙", desc: "Data Framework" },
    { name: "CrewAI", emoji: "👥", desc: "Multi-Agent" },
    { name: "AutoGen", emoji: "🤖", desc: "Microsoft" },
    { name: "Haystack", emoji: "🌾", desc: "NLP Pipelines" },
    { name: "LangGraph", emoji: "📊", desc: "Stateful Agents" },
    { name: "DSPy", emoji: "💎", desc: "Prompt Optimization" },
    { name: "Semantic Kernel", emoji: "🧠", desc: "Microsoft SDK" },
  ],
  "Cloud": [
    { name: "AWS Bedrock", emoji: "☁️", desc: "Amazon" },
    { name: "Azure OpenAI", emoji: "🔷", desc: "Microsoft" },
    { name: "Google Vertex", emoji: "🔵", desc: "Google Cloud" },
    { name: "AWS SageMaker", emoji: "📡", desc: "ML Platform" },
    { name: "GCP AI Platform", emoji: "🌐", desc: "Google" },
    { name: "Cloudflare AI", emoji: "🌥️", desc: "Edge AI" },
    { name: "Replicate", emoji: "♻️", desc: "Model API" },
    { name: "Together AI", emoji: "🤝", desc: "Open Models" },
  ],
  "Frontend": [
    { name: "Next.js", emoji: "▲", desc: "React Framework" },
    { name: "React", emoji: "⚛️", desc: "UI Library" },
    { name: "TypeScript", emoji: "🔷", desc: "Type Safety" },
    { name: "Tailwind CSS", emoji: "🎨", desc: "Utility CSS" },
    { name: "Vercel", emoji: "▲", desc: "Deployment" },
    { name: "shadcn/ui", emoji: "🎯", desc: "Components" },
    { name: "Framer Motion", emoji: "🎬", desc: "Animations" },
    { name: "Recharts", emoji: "📊", desc: "Data Viz" },
  ],
  "Backend": [
    { name: "FastAPI", emoji: "⚡", desc: "Python API" },
    { name: "Node.js", emoji: "🟢", desc: "Runtime" },
    { name: "Python", emoji: "🐍", desc: "AI/ML" },
    { name: "PostgreSQL", emoji: "🐘", desc: "Database" },
    { name: "Redis", emoji: "🔴", desc: "Cache/Queue" },
    { name: "Docker", emoji: "🐳", desc: "Containers" },
    { name: "Kubernetes", emoji: "☸️", desc: "Orchestration" },
    { name: "Celery", emoji: "🌿", desc: "Task Queue" },
  ],
};

function TechCard({ name, emoji, desc }: { name: string; emoji: string; desc?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      whileHover={{ scale: 1.03 }}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/15 bg-white/5 hover:border-[#D27E2B]/50 hover:bg-white/10 transition-all duration-300 cursor-default"
    >
      <span className="text-3xl">{emoji}</span>
      <span className="text-sm font-bold text-white text-center">{name}</span>
      {desc && <span className="text-[11px] text-slate-400 text-center">{desc}</span>}
    </motion.div>
  );
}

export default function TechStack() {
  const [activeTab, setActiveTab] = useState<Tab>("LLMs");

  return (
    <Section
      className="overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 80% 10%, rgba(210, 126, 43, 0.12), transparent 25%),
          #0F172A
        `,
      }}
    >
      <TechBackground />
      <Row>
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-300 mb-5"
          >
            Our Stack
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-center text-white"
          >
            Technology <span className="text-[#D27E2B]">Stack</span>
          </motion.h2>
          <Motion />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#D27E2B] text-white shadow-lg shadow-[#D27E2B]/30"
                  : "bg-white/5 text-slate-300 border border-white/15 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tech grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-3"
          >
            {TECH_DATA[activeTab].map((tech) => (
              <TechCard key={tech.name} name={tech.name} emoji={tech.emoji} desc={tech.desc} />
            ))}
          </motion.div>
        </AnimatePresence>
      </Row>
    </Section>
  );
}
