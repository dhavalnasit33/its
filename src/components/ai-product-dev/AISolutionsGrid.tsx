"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { LuMessageSquare, LuCpu, LuFileText, LuMic, LuEye, LuTrendingUp, LuSettings, LuLightbulb } from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Motion from "@/components/motionbar";

interface Solution {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  image?: string;
  accent: string;
}

const AI_SOLUTIONS: Solution[] = [
  {
    id: "chatbots",
    title: "AI Chatbots",
    description: "Intelligent, context-aware conversational agents that handle complex queries, automate support, and engage customers 24/7 across all channels.",
    accent: "#D27E2B",
    icon: LuMessageSquare,
    image: "/custom-ai-dev/solutions/chatbot.png",
  },
  {
    id: "agents",
    title: "AI Agents",
    description: "Autonomous AI agents that plan, reason, and execute multi-step tasks — from research and analysis to complex workflow automation.",
    accent: "#0F172A",
    icon: LuCpu,
    image: "/custom-ai-dev/solutions/agent.png",
  },
  {
    id: "document-ai",
    title: "Document AI",
    description: "Intelligent document processing systems that extract, classify, and understand data from PDFs, contracts, invoices, and unstructured content.",
    accent: "#D27E2B",
    icon: LuFileText,
    image: "/custom-ai-dev/solutions/document.png",
  },
  {
    id: "voice-ai",
    title: "Voice AI",
    description: "Custom voice AI solutions with natural speech recognition, synthesis, and intent understanding for IVR systems, voice assistants, and accessibility tools.",
    accent: "#0F172A",
    icon: LuMic,
    image: "/custom-ai-dev/solutions/voice.png",
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    description: "Visual intelligence systems for object detection, facial recognition, quality inspection, and real-time scene understanding in any environment.",
    accent: "#D27E2B",
    icon: LuEye,
    image: "/custom-ai-dev/solutions/vision.png",
  },
  {
    id: "predictive-analytics",
    title: "Predictive Analytics",
    description: "Machine learning models that forecast trends, detect anomalies, and surface actionable insights from your historical and real-time data.",
    accent: "#0F172A",
    icon: LuTrendingUp,
    image: "/custom-ai-dev/solutions/predictive.png",
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description: "End-to-end AI-powered automation for repetitive enterprise processes — reducing costs, eliminating errors, and freeing teams for strategic work.",
    accent: "#D27E2B",
    icon: LuSettings,
    image: "/custom-ai-dev/solutions/automation.png",
  },
  {
    id: "recommendation",
    title: "Recommendation Engine",
    description: "Personalized recommendation systems that analyze user behavior and preferences to increase engagement, conversions, and customer lifetime value.",
    accent: "#0F172A",
    icon: LuLightbulb,
    image: "/custom-ai-dev/solutions/recommendation.png",
  },
];

function SolutionMedia({ solution }: { solution: Solution }) {
  const [imgError, setImgError] = React.useState(false);
  const IconComponent = solution.icon;

  if (solution.image && !imgError) {
    return (
      <div className="relative w-7 h-7 flex items-center justify-center">
        <Image
          src={solution.image}
          alt={solution.title}
          width={28}
          height={28}
          className="object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return <IconComponent className="w-7 h-7" />;
}

function SolutionCard({ solution, index }: { solution: Solution; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative flex flex-col h-full rounded-[22px] overflow-hidden bg-white border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-400"
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ backgroundColor: solution.accent }}
      />

      <div className="flex flex-col h-full p-6">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300 shrink-0"
          style={{
            backgroundColor: `${solution.accent}14`,
            color: solution.accent,
          }}
        >
          <SolutionMedia solution={solution} />
        </div>

        {/* Text */}
        <h3
          className="text-lg font-bold mb-3 transition-colors duration-300"
          style={{ color: "#0F172A" }}
        >
          {solution.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{solution.description}</p>

        {/* Learn More */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <a
            href="#contact-form-section"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300 group-hover:gap-3"
            style={{ color: solution.accent }}
          >
            Learn More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function AISolutionsGrid() {
  return (
    <Section id="ai-solutions">
      <Row>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#D27E2B] text-xs font-bold uppercase tracking-widest mb-4"
          >
            What We Build
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-center text-[#0F172A]"
          >
            AI Solutions We Build
          </motion.h2>
          <Motion />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-base sm:text-lg mt-4 max-w-2xl mx-auto"
          >
            From intelligent chatbots to full-scale enterprise AI platforms, we deliver production-ready AI products tailored to your business goals.
          </motion.p>
        </div>

        {/* 8-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {AI_SOLUTIONS.map((solution, idx) => (
            <SolutionCard key={solution.id} solution={solution} index={idx} />
          ))}
        </div>
      </Row>
    </Section>
  );
}
