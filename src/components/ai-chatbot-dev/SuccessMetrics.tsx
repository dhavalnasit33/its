"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LuBot,
  LuHeart,
  LuTerminal,
  LuClock,
  LuSparkles,
  LuCoins,
  LuTrendingUp,
  LuActivity,
} from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";

const STATS = [
  { value: "500+", label: "Chatbots Delivered", icon: LuBot },
  { value: "98%", label: "Customer Satisfaction", icon: LuHeart },
  { value: "40+", label: "AI Engineers", icon: LuTerminal },
  { value: "24/7", label: "Support & SLA Availability", icon: LuClock },
];

const METRICS = [
  { title: "Resolution Rate", value: "85%", desc: "Queries resolved fully without human agent routing.", icon: LuSparkles, color: "#10B981" },
  { title: "Avg. Response Time", value: "< 2s", desc: "Instant response for high user engagement.", icon: LuClock, color: "#3B82F6" },
  { title: "Cost Reduction", value: "70%", desc: "Support cost overhead reduction after deployment.", icon: LuCoins, color: "#EC4899" },
  { title: "Support Availability", value: "100%", desc: "Active through holidays, weekends, and shifts.", icon: LuActivity, color: "#8B5CF6" },
  { title: "More Conversations", value: "10x", desc: "Scale total concurrent user requests effortlessly.", icon: LuTrendingUp, color: "#F59E0B" },
  { title: "Messages Processed", value: "50M+", desc: "Robust data scaling for enterprise workflows.", icon: LuBot, color: "#14B8A6" },
];

export default function SuccessMetrics() {
  return (
    <Section className="bg-gray-50 py-20!">
      <Row>
        {/* ── 1. Top Statistics Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 max-w-5xl mx-auto w-full">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.02)] p-6 text-center group hover:border-[#D27E2B]/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D27E2B]/10 text-[#D27E2B] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-3xl font-extrabold text-[#0F172A] leading-tight mb-1.5">{stat.value}</h3>
                <p className="text-xs text-gray-500 font-extrabold uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* ── 2. Bottom Success Metrics Dashboard ── */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D27E2B] mb-5 shadow-sm"
          >
            Business Impact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-[#0F172A]"
          >
            Success <span className="text-[#D27E2B]">Metrics</span>
          </motion.h2>
          <div className="w-12 h-1 bg-[#D27E2B] mx-auto mt-4 rounded-full" />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white rounded-[22px] border border-gray-150 shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)] p-6.5 hover:border-[#D27E2B]/30 transition-all duration-300 group flex items-start gap-4"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${metric.color}12`, color: metric.color }}
                >
                  <Icon className="w-5.5 h-5.5" />
                </div>
                <div>
                  <span className="text-2xl font-black text-gray-900 block mb-1">{metric.value}</span>
                  <h4 className="text-sm sm:text-base font-extrabold text-[#0F172A] mb-1.5 group-hover:text-[#D27E2B] transition-colors leading-none">
                    {metric.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                    {metric.desc}
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
