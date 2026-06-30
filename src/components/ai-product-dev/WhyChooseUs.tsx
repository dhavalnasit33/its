"use client";

import React from "react";
import { motion } from "framer-motion";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Motion from "@/components/motionbar";
import { useCountUp } from "@/hook/useCountUp";

const STATS = [
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 40, suffix: "+", label: "AI Experts" },
  { value: 24, suffix: "/7", label: "Support" },
];

const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Enterprise Security",
    desc: "SOC2-aligned, end-to-end encryption, and on-premise deployment options.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    title: "Scalable Architecture",
    desc: "Built to grow with your business — from 100 to 10 million users.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Future-Ready AI",
    desc: "LLM-agnostic designs so you can upgrade models without rebuilding.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Dedicated Engineers",
    desc: "A dedicated team of AI engineers assigned to your project.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Transparent Communication",
    desc: "Weekly demos, clear reporting, and real-time project dashboards.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Long-Term Partnership",
    desc: "We're your long-term AI partner — not just a project vendor.",
  },
];

function StatCounter({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const { count, ref } = useCountUp(value);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <p className="text-4xl font-extrabold text-[#D27E2B]">
        {count}{suffix}
      </p>
      <p className="text-sm text-slate-300 font-medium mt-1">{label}</p>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  return (
    <Section className="bg-white">
      <Row>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Large Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Illustration card */}
            <div className="relative rounded-[24px] bg-gradient-to-br from-[#0F172A] to-[#1e3a5f] overflow-hidden aspect-[4/3] shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              {/* Grid pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 300">
                <defs>
                  <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="#D27E2B"/>
                  </pattern>
                </defs>
                <rect width="400" height="300" fill="url(#dots)"/>
              </svg>

              {/* Glows */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#D27E2B]/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-blue-500/15 blur-3xl" />

              {/* Center content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8 p-8">
                {/* Team illustration */}
                <div className="flex items-end gap-3">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, y: 20 }}
                      whileInView={{ scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <div
                        className="w-12 h-12 rounded-full border-2 border-[#D27E2B] flex items-center justify-center text-white text-lg"
                        style={{ backgroundColor: i === 2 ? "#D27E2B" : "#ffffff15" }}
                      >
                        {["👩‍💻", "🤖", "👨‍🔬", "👩‍🎨", "🧑‍💼"][i]}
                      </div>
                      <div className="mt-2 w-1 bg-[#D27E2B]/30 rounded-full"
                        style={{ height: `${(i + 1) * 12}px` }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* AI Neural visualization */}
                <div className="flex items-center gap-3">
                  {["Discovery", "Build", "Deploy"].map((text, i) => (
                    <React.Fragment key={text}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + i * 0.2 }}
                        className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-semibold"
                      >
                        {text}
                      </motion.div>
                      {i < 2 && (
                        <svg className="w-4 h-4 text-[#D27E2B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating stat badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              animate={{ y: [0, -8, 0] }}
              className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-5 py-4 border border-gray-100"
            >
              <p className="text-2xl font-extrabold text-[#0F172A]">98%</p>
              <p className="text-xs text-gray-500 font-medium">Client Satisfaction</p>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[#D27E2B] text-xs font-bold uppercase tracking-widest mb-4"
            >
              Why Choose Inspire
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-extrabold text-[#0F172A] leading-tight mb-6"
            >
              Your Trusted Partner for{" "}
              <span className="text-[#D27E2B]">AI Product Development</span>
            </motion.h2>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-4 gap-4 mb-10 p-6 rounded-2xl bg-[#0F172A]"
            >
              {STATS.map((stat, idx) => (
                <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} index={idx} />
              ))}
            </motion.div>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
                  className="flex gap-3 items-start group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#D27E2B]/10 text-[#D27E2B] flex items-center justify-center shrink-0 group-hover:bg-[#D27E2B] group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F172A]">{feature.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{feature.desc}</p>
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
