"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LuSearch,
  LuCompass,
  LuFileSpreadsheet,
  LuCpu,
  LuCheck,
  LuRocket,
  LuTrendingUp,
} from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery",
    desc: "Analyze support workflows, channel preferences, and requirements.",
    icon: LuSearch,
    color: "#D27E2B",
  },
  {
    num: "02",
    title: "Conversation Design",
    desc: "Map chatbot conversation flows, tone of voice, and intent trees.",
    icon: LuCompass,
    color: "#6366F1",
  },
  {
    num: "03",
    title: "Knowledge Base",
    desc: "Import company documentation, support logs, FAQs, and product catalogs.",
    icon: LuFileSpreadsheet,
    color: "#8B5CF6",
  },
  {
    num: "04",
    title: "LLM Integration",
    desc: "Configure RAG models, connect prompts, and link APIs.",
    icon: LuCpu,
    color: "#EC4899",
  },
  {
    num: "05",
    title: "Testing & Guardrails",
    desc: "Train for safety, prevent hallucinations, and validate accuracy.",
    icon: LuCheck,
    color: "#10B981",
  },
  {
    num: "06",
    title: "Deployment",
    desc: "Launch live on your website, WhatsApp, Slack, or voice channel.",
    icon: LuRocket,
    color: "#3B82F6",
  },
  {
    num: "07",
    title: "Optimization",
    desc: "Monitor conversation logs, retrain models, and expand capabilities.",
    icon: LuTrendingUp,
    color: "#14B8A6",
  },
];

export default function DevelopmentProcess() {
  return (
    <Section className="bg-white py-20! overflow-hidden relative">
      <Row>
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D27E2B] mb-5 shadow-sm"
          >
            Our Methodology
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-[#0F172A]"
          >
            AI Chatbot <span className="text-[#D27E2B]">Development Process</span>
          </motion.h2>
          <div className="w-12 h-1 bg-[#D27E2B] mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline wrapper */}
        <div className="relative w-full overflow-x-auto pb-10 scrollbar-hide">
          {/* Horizontal Line connector */}
          <div className="absolute top-[48px] left-[60px] right-[60px] h-[2px] bg-gray-100 z-0 hidden xl:block" />

          <div className="flex gap-8 xl:justify-between items-start min-w-[1100px] px-4 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="flex flex-col items-center text-center w-36 shrink-0 group"
                >
                  {/* Step Bubble */}
                  <div
                    className="w-20 h-20 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-md relative group-hover:scale-110 group-hover:border-[#D27E2B]/50 transition-all duration-300"
                    style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.02)" }}
                  >
                    <Icon className="w-6 h-6 text-[#0F172A] group-hover:text-[#D27E2B] transition-colors" />

                    {/* Step label index number */}
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#0F172A] text-[#D27E2B] text-[10px] font-black flex items-center justify-center border border-gray-100 shadow-sm">
                      {step.num}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#0F172A] mt-5 mb-1.5 group-hover:text-[#D27E2B] transition-colors leading-tight">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 font-semibold leading-relaxed px-2">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Row>
    </Section>
  );
}
