"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  LuHeartPulse,
  LuTrendingUp,
  LuShoppingBag,
  LuCpu,
  LuTruck,
  LuGraduationCap,
  LuShoppingCart,
  LuShield,
} from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Motion from "@/components/motionbar";

interface Industry {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
  icon: React.ComponentType<any>;
  features: string[];
}

const INDUSTRIES: Industry[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    description:
      "AI for diagnostics, patient care, medical imaging, and clinical decision support.",
    image: "/industries/healthcare.png",
    color: "#3B82F6",
    icon: LuHeartPulse,
    features: [
      "Medical Imaging",
      "Predictive Diagnostics",
      "Patient Risk Analysis",
    ],
  },
  {
    id: "finance",
    title: "Finance",
    description:
      "Fraud detection, risk analysis, automated reporting, and financial forecasting.",
    image: "/industries/finance.png",
    color: "#F97316",
    icon: LuTrendingUp,
    features: ["Fraud Detection", "Risk & Compliance", "Algorithmic Insights"],
  },
  {
    id: "retail",
    title: "Retail",
    description:
      "Personalized recommendations, demand forecasting, customer insights, and inventory optimization.",
    image: "/industries/retail.png",
    color: "#A855F7",
    icon: LuShoppingBag,
    features: [
      "Recommendation Engine",
      "Customer Insights",
      "Inventory Optimization",
    ],
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description:
      "Predictive maintenance, quality inspection, production monitoring, and process automation.",
    image: "/industries/manufacturing.png",
    color: "#10B981",
    icon: LuCpu,
    features: [
      "Predictive Maintenance",
      "Quality Inspection",
      "Process Automation",
    ],
  },
  {
    id: "logistics",
    title: "Logistics",
    description:
      "Route optimization, supply chain intelligence, fleet tracking, and delivery planning.",
    image: "/industries/logistics.png",
    color: "#F59E0B",
    icon: LuTruck,
    features: [
      "Route Optimization",
      "Supply Chain Visibility",
      "Real-time Tracking",
    ],
  },
  {
    id: "education",
    title: "Education",
    description:
      "Personalized learning, intelligent tutoring, student analytics, and adaptive education.",
    image: "/industries/education.png",
    color: "#3B82F6",
    icon: LuGraduationCap,
    features: [
      "Adaptive Learning",
      "Student Performance",
      "Intelligent Tutoring",
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    description:
      "AI-driven product recommendations, smarter search, personalized shopping, and conversions.",
    image: "/industries/ecommerce.png",
    color: "#EC4899",
    icon: LuShoppingCart,
    features: ["Smart Search", "Personalization", "Conversion Optimization"],
  },
  {
    id: "insurance",
    title: "Insurance",
    description:
      "Automated underwriting, claims processing, risk assessment, and fraud prevention.",
    image: "/industries/insurance.png",
    color: "#14B8A6",
    icon: LuShield,
    features: ["Claims Automation", "Risk Assessment", "Fraud Detection"],
  },
];

function IndustryCard({
  industry,
  index,
}: {
  industry: Industry;
  index: number;
}) {
  const IconComponent = industry.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative flex flex-col h-full rounded-[28px] overflow-hidden bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:border-slate-200 transition-all duration-400"
    >
      {/* Top Image */}
      <div className="relative w-full h-[160px] overflow-hidden bg-slate-100">
        <Image
          src={industry.image}
          alt={`${industry.title} AI Solutions`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-100 group-hover:scale-105"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" /> */}
      </div>

      {/* Overlapping Floating Icon Box */}
      <div
        className="absolute top-[136px] left-6 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg z-10 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: industry.color }}
      >
        <IconComponent className="w-5.5 h-5.5 text-white" />
      </div>

      {/* Card Body */}
      <div className="p-6 pt-8 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-bold text-[#0F172A] mt-1 transition-all duration-300">
          {industry.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 leading-relaxed mt-2.5 min-h-[60px] flex-1">
          {industry.description}
        </p>

        {/* Bullet checklist features */}
        <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
          {industry.features.map((feat, fIdx) => (
            <div
              key={fIdx}
              className="flex items-center gap-2.5 text-slate-600"
            >
              <span className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center bg-transparent">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                  style={{ color: industry.color }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span className="text-xs font-semibold leading-none">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Glowing bottom hover bar */}
      <div
        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ backgroundColor: industry.color }}
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
            className="text-slate-500 text-base sm:text-lg mt-4 max-w-2xl mx-auto"
          >
            We build domain-specific AI products with deep industry expertise
            across 8+ verticals.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {INDUSTRIES.map((industry, idx) => (
            <IndustryCard key={industry.id} industry={industry} index={idx} />
          ))}
        </div>
      </Row>
    </Section>
  );
}
