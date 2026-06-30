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
  },
  {
    id: "finance",
    title: "Finance",
    description:
      "Fraud detection, risk analysis, automated reporting, and financial forecasting.",
    image: "/industries/finance.png",
    color: "#EF4444",
    icon: LuTrendingUp,
  },
  {
    id: "retail",
    title: "Retail",
    description:
      "Personalized recommendations, demand forecasting, customer insights, and inventory optimization.",
    image: "/industries/retail.png",
    color: "#F59E0B",
    icon: LuShoppingBag,
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description:
      "Predictive maintenance, quality inspection, production monitoring, and process automation.",
    image: "/industries/manufacturing.png",
    color: "#10B981",
    icon: LuCpu,
  },
  {
    id: "logistics",
    title: "Logistics",
    description:
      "Route optimization, supply chain intelligence, fleet tracking, and delivery planning.",
    image: "/industries/logistics.png",
    color: "#F97316",
    icon: LuTruck,
  },
  {
    id: "education",
    title: "Education",
    description:
      "Personalized learning, intelligent tutoring, student analytics, and adaptive education.",
    image: "/industries/education.png",
    color: "#6366F1",
    icon: LuGraduationCap,
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    description:
      "AI-driven product recommendations, smarter search, personalized shopping, and conversions.",
    image: "/industries/ecommerce.png",
    color: "#D946EF",
    icon: LuShoppingCart,
  },
  {
    id: "insurance",
    title: "Insurance",
    description:
      "Automated underwriting, claims processing, risk assessment, and fraud prevention.",
    image: "/industries/insurance.png",
    color: "#14B8A6",
    icon: LuShield,
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
      className="group relative flex flex-col h-full rounded-[22px] overflow-hidden bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-400"
    >
      {/* Top Image */}
      <div className="relative w-full h-[150px] overflow-hidden bg-slate-100">
        <Image
          src={industry.image}
          alt={`${industry.title} AI Solutions`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Icon & Title Row */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white"
            style={{ backgroundColor: industry.color }}
          >
            <IconComponent className="w-4.5 h-4.5 text-white" />
          </div>
          <h3 className="text-base font-bold text-[#0F172A]">
            {industry.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs md:text-sm text-slate-500 leading-relaxed mt-3 flex-1">
          {industry.description}
        </p>
      </div>

      {/* Bottom hover bar */}
      <div
        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-out rounded-b-[22px]"
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
            className="text-gray-500 text-base sm:text-lg mt-4 max-w-2xl mx-auto"
          >
            We build domain-specific AI products with deep industry expertise
            across 8+ verticals.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {INDUSTRIES.map((industry, idx) => (
            <IndustryCard key={industry.id} industry={industry} index={idx} />
          ))}
        </div>
      </Row>
    </Section>
  );
}
