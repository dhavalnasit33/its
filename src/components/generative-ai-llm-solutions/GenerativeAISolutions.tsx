"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LuBot,
  LuDatabase,
  LuChevronsUp,
  LuMessageSquare,
  LuFileText,
  LuSparkles,
} from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";

const SOLUTIONS = [
  {
    title: "AI Copilots",
    description: "Design context-aware assistants that integrate with internal tools to automate document summarization, code generation, and complex employee operations.",
    icon: LuBot,
    color: "#3B82F6", // Blue
  },
  {
    title: "RAG Systems",
    description: "Deploy semantic search vector databases to query company manuals, corporate wikis, and databases for highly accurate, citation-backed answers.",
    icon: LuDatabase,
    color: "#F97316", // Orange
  },
  {
    title: "Custom GPT Applications",
    description: "Train specialized models optimized for proprietary datasets to perform niche industry tasks, automated classification, and unique backend logic.",
    icon: LuChevronsUp,
    color: "#8B5CF6", // Purple
  },
  {
    title: "Enterprise Chatbots",
    description: "Build conversation pipelines that handle customer care, resolve repetitive queries, and execute instant human-handoff triggers.",
    icon: LuMessageSquare,
    color: "#10B981", // Green
  },
  {
    title: "Document Intelligence",
    description: "Extract structured insights, entities, and metadata from massive archives of PDFs, spreadsheets, scans, and unstructured media files.",
    icon: LuFileText,
    color: "#06B6D4", // Cyan
  },
  {
    title: "AI Content Generation",
    description: "Accelerate marketing copywriting, outbound email sequences, localization, and content creation matching your corporate brand guidelines.",
    icon: LuSparkles,
    color: "#EC4899", // Pink
  },
];

export default function GenerativeAISolutions() {
  return (
    <Section className="py-24! bg-[#FAFAFC] relative overflow-hidden">
      <Row>
        {/* Centered Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center gap-4">
          {/* Rounded Orange Badge */}
          <span className="inline-flex items-center rounded-full bg-[#F97316]/8 px-4.5 py-1.5 text-xs font-black uppercase tracking-widest text-[#F97316]">
            OUR SOLUTIONS
          </span>
          
          <h2 className="text-3xl md:text-[44px] font-black text-[#0F172A] leading-tight tracking-tight">
            What We <span className="bg-gradient-to-r from-[#F97316] via-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">Build</span>
          </h2>

          <p className="text-slate-500 text-sm sm:text-base font-medium max-w-2xl leading-relaxed mt-1">
            Powerful AI solutions and enterprise-grade systems built to transform the way you work.
          </p>

          {/* Double-colored slider accent */}
          <div className="flex items-center justify-center h-[3.5px] w-24 bg-slate-200 rounded-full overflow-hidden mt-3">
            <div className="h-full w-1/3 bg-[#F97316]" />
            <div className="h-full w-2/3 bg-[#8B5CF6]" />
          </div>
        </div>

        {/* 3-Column Card Grid on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  mx-auto w-full">
          {SOLUTIONS.map((solution, idx) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="group bg-white rounded-[24px] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-[350ms] ease-out flex flex-col gap-6 cursor-default relative overflow-hidden"
              >
                {/* Accent border on hover */}
                <div
                  className="absolute inset-x-0 top-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: solution.color }}
                />

                {/* Top Section: Left Logo / Right Title */}
                <div className="flex items-center gap-5 w-full">
                  {/* Square Icon Container with rounded corners */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: `${solution.color}08`,
                      borderColor: `${solution.color}18`,
                      color: solution.color,
                      boxShadow: `0 6px 20px ${solution.color}0a`,
                    }}
                  >
                    <Icon className="w-6.5 h-6.5" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-extrabold text-[#0F172A] leading-snug group-hover:text-[#D27E2B] transition-colors duration-300">
                    {solution.title}
                  </h3>
                </div>

                {/* Bottom Section: Left-aligned Description */}
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
                  {solution.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Row>
    </Section>
  );
}
