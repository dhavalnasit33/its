"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LuGlobe,
  LuLifeBuoy,
  LuCoins,
  LuMessageSquare,
  LuMic,
  LuBookOpen,
  LuUsers,
  LuKey,
} from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";
import SectionBadge from "../new-home-components/SectionBadge";

const SOLUTIONS = [
  {
    title: "Website Chatbots",
    description:
      "Engage visitors, answer queries, capture contact details, and generate qualified leads in real-time on your site.",
    icon: LuGlobe,
    color: "#3B82F6",
    illustration: "🌐",
  },
  {
    title: "Customer Support Bots",
    description:
      "Provide 24/7 support, resolve repetitive questions instantly, and route complex tickets to human agents.",
    icon: LuLifeBuoy,
    color: "#10B981",
    illustration: "🛠️",
  },
  {
    title: "Sales Assistants",
    description:
      "Recommend products, answer pricing queries, qualify prospects, and close more deals automatically.",
    icon: LuCoins,
    color: "#F59E0B",
    illustration: "💰",
  },
  {
    title: "WhatsApp AI Bots",
    description:
      "Automate customer conversations, broadcast updates, and support clients directly inside WhatsApp.",
    icon: LuMessageSquare,
    color: "#25D366",
    illustration: "💬",
  },
  {
    title: "Voice AI Agents",
    description:
      "Deliver human-like speech interactions for phone support, call routing, and voice-assisted workflows.",
    icon: LuMic,
    color: "#8B5CF6",
    illustration: "🎙️",
  },
  {
    title: "Knowledge Base Bots",
    description:
      "Instantly search through documents, wiki databases, FAQs, and company policies to answer customer queries.",
    icon: LuBookOpen,
    color: "#EC4899",
    illustration: "📚",
  },
  {
    title: "HR & Recruitment Bots",
    description:
      "Screen job applicants, answer candidate queries, coordinate interviews, and streamline employee onboarding.",
    icon: LuUsers,
    color: "#14B8A6",
    illustration: "👥",
  },
  {
    title: "Internal Employee Bots",
    description:
      "Help internal teams query IT requests, access HR portal guidelines, search policy docs, and request database logs.",
    icon: LuKey,
    color: "#64748B",
    illustration: "🔑",
  },
];

export default function AIChatbotSolutions() {
  return (
    <Section id="chatbot-solutions" className=" py-20!">
      <Row>
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.span
             initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <SectionBadge title="  AI Solutions We Build" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-[#0F172A]"
          >
            AI Chatbot Solutions{" "}
            <span className="text-[#D27E2B]">We Build</span>
          </motion.h2>
          <div className="w-12 h-1 bg-[#D27E2B] mx-auto mt-4 rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SOLUTIONS.map((sol, index) => {
            const Icon = sol.icon;
            return (
              <motion.div
                key={sol.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="cursor-pointer bg-white rounded-[22px] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(210,126,43,0.14)] hover:-translate-y-2 p-6 flex flex-col justify-between hover:border-[#D27E2B]/30 transition-all duration-300 group"
              >
                <div>
                  {/* Top Bar: Icon & Illustration */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${sol.color}15`,
                        color: sol.color,
                      }}
                    >
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                    <span className="text-2xl">{sol.illustration}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F172A] mb-3 group-hover:text-[#D27E2B] transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed mb-6">
                    {sol.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Row>
    </Section>
  );
}
