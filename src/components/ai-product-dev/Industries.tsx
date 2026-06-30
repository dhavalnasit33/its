"use client";

import React from "react";
import { motion } from "framer-motion";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Motion from "@/components/motionbar";

interface Industry {
  id: string;
  title: string;
  description: string;
  emoji: string;
  gradient: string;
  accent: string;
  useCases: string[];
}

const INDUSTRIES: Industry[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    description: "AI-powered diagnostics, patient risk scoring, clinical NLP, and intelligent care coordination systems.",
    emoji: "🏥",
    gradient: "from-blue-50 to-indigo-50",
    accent: "#3B82F6",
    useCases: ["Medical Imaging AI", "Clinical NLP", "Drug Discovery"],
  },
  {
    id: "finance",
    title: "Finance",
    description: "Fraud detection, algorithmic trading, credit risk models, and intelligent financial advisory platforms.",
    emoji: "💰",
    gradient: "from-green-50 to-emerald-50",
    accent: "#10B981",
    useCases: ["Fraud Detection", "Risk Assessment", "Algo Trading"],
  },
  {
    id: "retail",
    title: "Retail",
    description: "Personalized shopping experiences, demand forecasting, visual search, and inventory optimization.",
    emoji: "🛍️",
    gradient: "from-pink-50 to-rose-50",
    accent: "#F43F5E",
    useCases: ["Recommendation AI", "Demand Forecast", "Visual Search"],
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "Predictive maintenance, quality control vision, supply chain AI, and production optimization engines.",
    emoji: "🏭",
    gradient: "from-orange-50 to-amber-50",
    accent: "#D27E2B",
    useCases: ["Predictive Maintenance", "Quality Vision AI", "Supply Chain"],
  },
  {
    id: "education",
    title: "Education",
    description: "Adaptive learning platforms, intelligent tutoring systems, automated assessment, and student analytics.",
    emoji: "🎓",
    gradient: "from-purple-50 to-violet-50",
    accent: "#8B5CF6",
    useCases: ["Adaptive Learning", "AI Tutors", "Performance Analytics"],
  },
  {
    id: "logistics",
    title: "Logistics",
    description: "Route optimization, autonomous vehicle AI, warehouse automation, and last-mile delivery intelligence.",
    emoji: "🚚",
    gradient: "from-cyan-50 to-sky-50",
    accent: "#06B6D4",
    useCases: ["Route Optimization", "Warehouse AI", "Fleet Intelligence"],
  },
  {
    id: "insurance",
    title: "Insurance",
    description: "Automated underwriting, claims processing AI, customer churn prediction, and risk assessment models.",
    emoji: "🛡️",
    gradient: "from-teal-50 to-green-50",
    accent: "#14B8A6",
    useCases: ["Claims Automation", "Risk Models", "Churn Prediction"],
  },
  {
    id: "real-estate",
    title: "Real Estate",
    description: "Property valuation AI, virtual property tours, market prediction, and intelligent lead qualification.",
    emoji: "🏢",
    gradient: "from-slate-50 to-gray-100",
    accent: "#64748B",
    useCases: ["Price Prediction", "Virtual Tours", "Lead Scoring"],
  },
];

function IndustryCard({ industry, index }: { industry: Industry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={`group relative flex flex-col h-full rounded-[22px] overflow-hidden bg-gradient-to-br ${industry.gradient} border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 transition-all duration-400 p-6`}
    >
      {/* Large emoji illustration */}
      <div className="w-full flex justify-center mb-5">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-sm"
          style={{ backgroundColor: `${industry.accent}18` }}
        >
          {industry.emoji}
        </div>
      </div>

      <h3 className="text-lg font-extrabold text-[#0F172A] mb-2 text-center">{industry.title}</h3>
      <p className="text-xs text-gray-500 text-center leading-relaxed mb-4 flex-1">{industry.description}</p>

      {/* Use cases */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {industry.useCases.map((uc) => (
          <span
            key={uc}
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full border"
            style={{ color: industry.accent, borderColor: `${industry.accent}40`, backgroundColor: `${industry.accent}10` }}
          >
            {uc}
          </span>
        ))}
      </div>

      {/* Bottom hover bar */}
      <div
        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-out rounded-b-[22px]"
        style={{ backgroundColor: industry.accent }}
      />
    </motion.div>
  );
}

export default function Industries() {
  return (
    <Section className="bg-gray-50/60">
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
            Industries We Serve
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-center text-[#0F172A]"
          >
            AI Solutions Across Industries
          </motion.h2>
          <Motion />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-base sm:text-lg mt-4 max-w-2xl mx-auto"
          >
            We build domain-specific AI products with deep industry expertise across 8+ verticals.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {INDUSTRIES.map((industry, idx) => (
            <IndustryCard key={industry.id} industry={industry} index={idx} />
          ))}
        </div>
      </Row>
    </Section>
  );
}
