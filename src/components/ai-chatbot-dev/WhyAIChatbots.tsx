"use client";

import React from "react";
import { motion } from "framer-motion";
import { LuCheck, LuX } from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";

const COMPARISON_ROWS = [
  {
    feature: "Availability",
    traditional: "9 AM – 6 PM (Business Hours)",
    chatbot: "24/7 Always On (365 Days)",
    isSuperior: true,
  },
  {
    feature: "Response Time",
    traditional: "Minutes to Hours (Queues)",
    chatbot: "Instant (Under 2 Seconds)",
    isSuperior: true,
  },
  {
    feature: "Cost",
    traditional: "High (Requires Large Staff)",
    chatbot: "70% Lower Support Cost",
    isSuperior: true,
  },
  {
    feature: "Scalability",
    traditional: "Limited (Prone to Bottlenecks)",
    chatbot: "Unlimited Concurrent Chats",
    isSuperior: true,
  },
  {
    feature: "Consistency",
    traditional: "Varies by Agent Training",
    chatbot: "Always Accurate & Brand Aligned",
    isSuperior: true,
  },
  {
    feature: "Data & Insights",
    traditional: "Manual Logs & Reports",
    chatbot: "Real-time Structured Analytics",
    isSuperior: true,
  },
];

export default function WhyAIChatbots() {
  return (
    <Section className="bg-[#0F172A] py-20! text-white overflow-hidden relative">
      {/* Subtle orange background glow */}
      <div className="absolute right-[-100px] bottom-[-100px] w-96 h-96 rounded-full bg-[#D27E2B]/10 blur-3xl" />

      <Row>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full max-w-6xl mx-auto">
          {/* Left Column: Visual graphic */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center items-center lg:items-start text-center lg:text-left shrink-0">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D27E2B] mb-5 shadow-sm"
            >
              Why AI Chatbots
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6"
            >
              Why AI Chatbots <span className="text-[#D27E2B]">Are Better</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-350 text-sm sm:text-base leading-relaxed mb-8 max-w-md font-medium"
            >
              Traditional support teams are limited by shifts, capacity, and human variance. AI chatbots resolve up to 80% of customer queries instantly, scaling down cost and overhead.
            </motion.p>
            
            {/* Robot Illustration Frame Mock */}
            <div className="w-48 h-48 rounded-full border border-white/10 bg-white/5 flex items-center justify-center relative shadow-lg">
              <div className="absolute inset-2.5 rounded-full border border-[#D27E2B]/20" />
              <span className="text-6xl animate-bounce" style={{ animationDuration: '3s' }}>🤖</span>
            </div>
          </div>

          {/* Right Column: Comparative Dashboard Table */}
          <div className="flex-1 w-full bg-[#182640] rounded-[24px] border border-white/10 overflow-hidden shadow-2xl">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-[#0F172A] border-b border-white/10 px-5 py-4.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-center items-center">
              <span className="text-left text-slate-400">Features</span>
              <span className="text-slate-300">Traditional Support</span>
              <span className="text-[#D27E2B]">AI Chatbot</span>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-white/10">
              {COMPARISON_ROWS.map((row, idx) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-3 px-5 py-4 text-xs sm:text-sm font-bold text-center items-center hover:bg-white/5 transition-colors"
                >
                  {/* Feature Title */}
                  <span className="text-left text-slate-300 font-extrabold">{row.feature}</span>
                  
                  {/* Traditional Support */}
                  <span className="text-slate-400 font-semibold">{row.traditional}</span>
                  
                  {/* AI Chatbot (Highlighted) */}
                  <span className="text-[#D27E2B] font-extrabold flex justify-center items-center gap-1">
                    <LuCheck className="w-4 h-4 text-green-500 shrink-0 stroke-[3]" />
                    {row.chatbot}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Row>
    </Section>
  );
}
