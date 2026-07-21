"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LuCompass,
  LuCpu,
  LuDatabase,
  LuFileCheck,
  LuTrendingUp,
} from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";

const STEPS = [
  {
    number: "01",
    title: "Discovery & LLM Strategy",
    description:
      "We identify high-value AI opportunities, determine model feasibility (open vs. closed source), and map token-cost/performance expectations.",
    icon: LuCompass,
  },
  {
    number: "02",
    title: "Data Preparation & RAG Setup",
    description:
      "Our engineers securely clean, chunk, and index your company documents into vector databases (Pinecone, pgvector) to enable context-aware accuracy.",
    icon: LuDatabase,
  },
  {
    number: "03",
    title: "Prompt Engineering & Tuning",
    description:
      "We build semantic guardrails, optimize system instructions, and fine-tune models to consistently output format-compliant, accurate results.",
    icon: LuCpu,
  },
  {
    number: "04",
    title: "Integration & API Orchestration",
    description:
      "We embed the model output into your existing business systems, software tools, CRMs, and web frontends via scalable serverless middleware.",
    icon: LuFileCheck,
  },
  {
    number: "05",
    title: "Evaluations & Continuous Tuning",
    description:
      "We measure model latency, token costs, hallucination rates, and user feedback, tuning hyperparameters and prompt parameters dynamically.",
    icon: LuTrendingUp,
  },
];

export default function LLMProcess() {
  return (
    <Section className="py-24! bg-white relative overflow-hidden">
      <Row>
        {/* Header matching GenerativeAISolutions premium style */}
        <div className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center gap-4">
          <span className="inline-flex items-center rounded-full bg-[#F97316]/8 px-4.5 py-1.5 text-xs font-black uppercase tracking-widest text-[#F97316]">
            OUR WORKFLOW
          </span>
          <h2 className="text-3xl md:text-[40px] font-black text-[#0F172A] leading-tight tracking-tight">
            How We Build <span className="bg-gradient-to-r from-[#F97316] via-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">LLM Solutions</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-medium max-w-2xl leading-relaxed mt-1">
            From initial strategy and vector indexing to custom fine-tuning and ongoing cost-evaluation.
          </p>
          {/* Double-colored slider accent */}
          <div className="flex items-center justify-center h-[3.5px] w-24 bg-slate-100 rounded-full overflow-hidden mt-3">
            <div className="h-full w-1/3 bg-[#F97316]" />
            <div className="h-full w-2/3 bg-[#8B5CF6]" />
          </div>
        </div>

        {/* Horizontal/Vertical Steps Layout */}
        <div className="relative flex flex-col lg:flex-row gap-8 justify-between items-stretch max-w-6xl mx-auto w-full">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex-1 bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col items-center text-center group cursor-default"
              >
                {/* Step Circle & Icon */}
                <div className="relative mb-6 shrink-0">
                  <div className="w-16 h-16 rounded-full bg-white border border-[#D27E2B] flex items-center justify-center shadow-xs relative z-10 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="w-6 h-6 text-[#D27E2B]" />
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 shadow-xs z-20">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="text-base font-bold text-[#0F172A] mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-[220px] mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Lines for Desktop */}
                {idx < 4 && (
                  <div className="hidden lg:block absolute top-[45px] left-[calc(50%+45px)] w-[calc(100%-90px)] h-[1.5px] bg-[#D27E2B]/20 z-0">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-[#D27E2B]/40 transform rotate-45" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Row>
    </Section>
  );
}
