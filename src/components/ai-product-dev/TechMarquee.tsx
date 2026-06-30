"use client";

import React from "react";
import Row from "@/components/Row";
import Section from "@/components/Section";

const TECH_TOOLS = [
  { name: "OpenAI", logo: "" },
  { name: "Claude", logo: "" },
  { name: "Gemini", logo: "" },
  { name: "Meta", logo: "" },
  { name: "Llama", logo: "" },
  { name: "Mistral", logo: "" },
  { name: "Perplexity", logo: "" },
  { name: "DeepSeek", logo: "" },
  { name: "Qwen", logo: "" },
  { name: "Grok", logo: "" },
  { name: "Pinecone", logo: "" },
  { name: "LangChain", logo: "" },
  { name: "CrewAI", logo: "" },
  { name: "AutoGen", logo: "" },
];

const DUPLICATED = [...TECH_TOOLS, ...TECH_TOOLS, ...TECH_TOOLS];

const TOOL_ICONS: Record<string, string> = {
  "OpenAI": "🟢",
  "Claude": "🟠",
  "Gemini": "🔵",
  "Meta": "🔷",
  "Llama": "🦙",
  "Mistral": "⭐",
  "Perplexity": "🔍",
  "DeepSeek": "🌊",
  "Qwen": "⚡",
  "Grok": "✖️",
  "Pinecone": "🌲",
  "LangChain": "🔗",
  "CrewAI": "🚀",
  "AutoGen": "🤖",
};

function TechItem({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#D27E2B]/40 hover:bg-[#D27E2B]/5 transition-all duration-300 shrink-0 min-w-[130px]">
      <span className="text-xl">{TOOL_ICONS[name] || "✦"}</span>
      <span className="text-sm font-bold text-[#0F172A] whitespace-nowrap">{name}</span>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <Section className="bg-white overflow-hidden select-none border-y border-gray-100">
      <Row>
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Trusted Technologies & Platforms
          </span>
        </div>
      </Row>

      {/* Marquee track */}
      <div className="relative w-full overflow-hidden group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 w-max animate-marquee-custom group-hover:[animation-play-state:paused]">
          {DUPLICATED.map((tool, idx) => (
            <TechItem key={idx} name={tool.name} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-custom {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee-custom {
          animation: marquee-custom 35s linear infinite;
        }
      `}</style>
    </Section>
  );
}
