"use client";

import React from "react";
import { motion } from "framer-motion";
import { LuCheck, LuX, LuSparkles } from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Image from "next/image";
import SectionBadge from "../new-home-components/SectionBadge";

const COMPARISON_ROWS = [
  {
    feature: "Availability",
    traditional: "9 AM – 6 PM (Business Hours)",
    chatbot: "24/7 Always On (365 Days)",
  },
  {
    feature: "Response Time",
    traditional: "Minutes to Hours (Queues)",
    chatbot: "Instant (Under 2 Seconds)",
  },
  {
    feature: "Cost",
    traditional: "High (Requires Large Staff)",
    chatbot: "70% Lower Support Cost",
  },
  {
    feature: "Scalability",
    traditional: "Limited (Prone to Bottlenecks)",
    chatbot: "Unlimited Concurrent Chats",
  },
  {
    feature: "Consistency",
    traditional: "Varies by Agent Training",
    chatbot: "Always Accurate & Brand Aligned",
  },
  {
    feature: "Data & Insights",
    traditional: "Manual Logs & Reports",
    chatbot: "Real-time Structured Analytics",
  },
];

export default function WhyAIChatbots() {
  return (
    <Section className="bg-[#030b1a] py-24! text-white overflow-hidden relative">
      {/* Premium accent glows */}
      <div className="absolute right-[-100px] bottom-[-100px] w-[500px] h-[500px] rounded-full bg-[#D27E2B]/10 blur-[120px] pointer-events-none" />
      <div className="absolute left-[-150px] top-[-100px] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <Row>
        {/* Header Block: Centered at the top */}
        <div className="relative z-10 mx-auto mb-16 max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <SectionBadge title="Why Choose Us" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-white"
          >
            Why AI Chatbots <span className="text-[#D27E2B]">Are Better</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Traditional support teams are limited by shifts, capacity, and human
            variance. AI chatbots resolve up to 80% of customer queries
            instantly, scaling down cost and overhead.
          </motion.p>
        </div>

        {/* Content Block: Left Image, Right Table */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full mx-auto relative z-10">
          {/* Bottom Left: Visual Graphic Illustration */}
          <div className="w-full lg:w-[40%] flex justify-center items-center shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-full flex justify-center"
            >
              {/* Backlight glow */}
              <div className="absolute inset-0 rounded-full bg-[#D27E2B]/10 blur-3xl scale-110 z-0 pointer-events-none" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="z-10 w-full"
              >
                <Image
                  src="/ai-strategy/ai-chartbot-development/chatbot-image.png"
                  alt="AI Chatbot Comparison Illustration"
                  width={500}
                  height={500}
                  className="object-contain w-full h-auto select-none drop-shadow-[0_20px_40px_rgba(210,126,43,0.2)]"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Right: Sleek Comparative Grid */}
          <div className="flex-1 w-full bg-[#07111e] rounded-[24px] border border-white/5 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative">
            {/* Glossy top edge reflection */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D27E2B]/50 to-transparent" />

            {/* Table Header */}
            <div className="grid grid-cols-3 bg-[#0c1827] border-b border-white/5 px-6 py-5 text-xs sm:text-sm font-black uppercase tracking-widest items-stretch">
              <span className="text-left text-slate-400 border-r border-white/5 pr-4 flex items-center">
                Features
              </span>
              <span className="text-left text-slate-400 border-r border-white/5 px-4 flex items-center justify-start">
                Traditional Support
              </span>
              <span className="text-left text-[#D27E2B] pl-4 flex items-center justify-start gap-1.5">
                <LuSparkles className="w-3.5 h-3.5" />
                AI Chatbot
              </span>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-white/5">
              {COMPARISON_ROWS.map((row, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  key={row.feature}
                  className="grid grid-cols-3 px-6 text-xs sm:text-sm font-bold items-stretch hover:bg-white/[0.02] transition-colors group"
                >
                  {/* Feature Title */}
                  <span className="text-left text-white font-extrabold group-hover:text-[#D27E2B] transition-colors border-r border-white/5 pr-4 py-4 flex items-center">
                    {row.feature}
                  </span>

                  {/* Traditional Support Column */}
                  <span className="text-left text-slate-400 font-medium flex justify-start items-center gap-1.5 border-r border-white/5 px-4 py-4">
                    <LuX className="w-4 h-4 text-red-500/80 shrink-0" />
                    <span className="text-slate-400/90">{row.traditional}</span>
                  </span>

                  {/* AI Chatbot Column (Highlighted with left alignment) */}
                  <div className="py-2.5 pl-4 flex items-center">
                    <div className="w-full py-2 px-3.5 rounded-xl bg-[#D27E2B]/5 border border-[#D27E2B]/10 flex justify-start items-center gap-2 shadow-[inset_0_1px_0_rgba(210,126,43,0.1)] group-hover:border-[#D27E2B]/30 group-hover:bg-[#D27E2B]/10 transition-all duration-300">
                      <LuCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-white font-extrabold">
                        {row.chatbot}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Row>
    </Section>
  );
}
