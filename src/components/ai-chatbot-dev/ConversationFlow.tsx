"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LuUser,
  LuSparkles,
  LuDatabase,
  LuCpu,
  LuSettings,
  LuMessageSquare,
  LuUserCheck,
  LuTrendingUp,
} from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";

const FLOW_STEPS = [
  { label: "User Message", desc: "User inputs text or voice", icon: LuUser, color: "#3B82F6" },
  { label: "Understand Intent", desc: "NLU processing & sentiment", icon: LuSparkles, color: "#6366F1" },
  { label: "Search Knowledge", desc: "RAG & vector databases", icon: LuDatabase, color: "#8B5CF6" },
  { label: "LLM Reasoning", desc: "Context mapping & processing", icon: LuCpu, color: "#EC4899" },
  { label: "Take Action", desc: "APIs & Tool calling", icon: LuSettings, color: "#EF4444" },
  { label: "Generate Response", desc: "Natural response creation", icon: LuMessageSquare, color: "#10B981" },
  { label: "Human Handoff", desc: "Live-chat routing if needed", icon: LuUserCheck, color: "#F59E0B" },
  { label: "Learn & Improve", desc: "Continuous model training", icon: LuTrendingUp, color: "#14B8A6" },
];

export default function ConversationFlow() {
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
            Workflow Architecture
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-[#0F172A]"
          >
            How Our <span className="text-[#D27E2B]">AI Chatbots</span> Work
          </motion.h2>
          <div className="w-12 h-1 bg-[#D27E2B] mx-auto mt-4 rounded-full" />
        </div>

        {/* Horizontal Pipeline */}
        <div className="relative w-full overflow-x-auto pb-8 scrollbar-hide">
          {/* Connecting line */}
          <div className="absolute top-[38px] left-[60px] right-[60px] h-[3px] bg-gray-100 hidden lg:block z-0">
            {/* Pulsing indicator line */}
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#D27E2B] to-transparent"
            />
          </div>

          <div className="flex gap-8 lg:justify-between items-start min-w-[1000px] px-4 relative z-10">
            {FLOW_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="flex flex-col items-center text-center w-28 shrink-0 group"
                >
                  {/* Step node */}
                  <div
                    className="w-[76px] h-[76px] rounded-full bg-white border-2 flex items-center justify-center shadow-lg transition-all duration-300 relative group-hover:scale-110"
                    style={{
                      borderColor: step.color,
                      boxShadow: `0 8px 30px ${step.color}15`,
                    }}
                  >
                    {/* Inner glowing dot */}
                    <div
                      className="absolute inset-1.5 rounded-full opacity-0 group-hover:opacity-10 transition-opacity"
                      style={{ backgroundColor: step.color }}
                    />
                    <Icon className="w-6 h-6" style={{ color: step.color }} />

                    {/* Numeric Badge */}
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0F172A] text-white text-[9px] font-black flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Connected line connector for mobile/flex wrapper spacing */}
                  {idx < FLOW_STEPS.length - 1 && (
                    <div className="absolute top-[38px] left-[calc(112px*${idx}+76px)] w-8 h-[2px] bg-gray-200 lg:hidden" />
                  )}

                  {/* Label */}
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#0F172A] mt-4 mb-1 group-hover:text-[#D27E2B] transition-colors leading-tight">
                    {step.label}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-semibold leading-normal max-w-[100px]">
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
