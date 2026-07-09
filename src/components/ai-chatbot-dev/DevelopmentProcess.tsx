"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LuSearch,
  LuMessageSquare,
  LuBook,
  LuPuzzle,
  LuShieldCheck,
  LuRocket,
  LuTrendingUp,
  LuShield,
  LuLayers,
  LuSparkles,
  LuUsers,
} from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery",
    desc: "We analyze your workflows, audience, and goals to define the right strategy.",
    icon: LuSearch,
    pos: "lg:left-[12%] lg:top-[45%]",
  },
  {
    num: "02",
    title: "Conversation Design",
    desc: "Mapping intelligent conversation flows, tone, intent, and user experience.",
    icon: LuMessageSquare,
    pos: "lg:left-[28%] lg:top-[18%]",
  },
  {
    num: "03",
    title: "Knowledge Base",
    desc: "Import documents, FAQs, APIs, and data sources to build a smart foundation.",
    icon: LuBook,
    pos: "lg:left-[28%] lg:top-[75%]",
  },
  {
    num: "04",
    title: "LLM Integration",
    desc: "Integrate advanced LLMs, configure prompts, and connect the right APIs and tools.",
    icon: LuPuzzle,
    pos: "lg:left-[50%] lg:top-[90%]",
  },
  {
    num: "05",
    title: "Testing & Guardrails",
    desc: "Rigorous testing to ensure accuracy, safety, and reliable performance.",
    icon: LuShieldCheck,
    pos: "lg:left-[72%] lg:top-[75%]",
  },
  {
    num: "06",
    title: "Deployment",
    desc: "Launch across your platforms — web, WhatsApp, Slack, voice & more.",
    icon: LuRocket,
    pos: "lg:left-[72%] lg:top-[18%]",
  },
  {
    num: "07",
    title: "Optimization",
    desc: "Monitor performance, analyze conversations, and continuously improve results.",
    icon: LuTrendingUp,
    pos: "lg:left-[88%] lg:top-[45%]",
  },
];

const BOTTOM_FEATURES = [
  {
    title: "Secure by Design",
    desc: "Enterprise-grade security and data protection.",
    icon: LuShield,
  },
  {
    title: "Scalable Architecture",
    desc: "Built to scale with your business and users.",
    icon: LuLayers,
  },
  {
    title: "AI-Powered",
    desc: "Leveraging the latest AI models & tools.",
    icon: LuSparkles,
  },
  {
    title: "Human-Centered",
    desc: "Designed for clarity, usability and trust.",
    icon: LuUsers,
  },
];

export default function DevelopmentProcess() {
  return (
    <Section className="bg-[#050914] py-20 lg:py-32 overflow-hidden relative select-none">
      {/* ── BACKGROUND ELEMENTS ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(30,58,138,0.2)_0%,transparent_60%)] blur-3xl" />

        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[120px]" />

        <div className="absolute bottom-[-20%] left-0 w-full h-[60%] opacity-20 [transform:perspective(1000px)_rotateX(75deg)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e533_1px,transparent_1px),linear-gradient(to_bottom,#4f46e533_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#050914] to-[#050914]" />
        </div>

        {/* 3D FLOATING DECORATIONS */}
        <div className="absolute top-[10%] left-[5%] hidden 2xl:flex flex-col gap-4 animate-[bounce_8s_infinite]">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-500/10 border-t-2 border-l-2 border-white/20 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.3)] transform rotate-12" />
        </div>
        <div className="absolute top-[15%] right-[5%] hidden 2xl:flex flex-col gap-2 animate-[pulse_6s_infinite]">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400/20 to-blue-500/10 border-t-2 border-l-2 border-white/20 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.3)] transform -rotate-12 translate-x-4" />
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-500/10 border-t-2 border-l-2 border-white/20 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.3)] transform rotate-6" />
        </div>
        <div className="absolute bottom-[10%] left-[5%] hidden 2xl:block w-32 h-32 rounded-full border-[16px] border-blue-500/10 backdrop-blur-sm shadow-[0_0_30px_rgba(59,130,246,0.2)] border-t-blue-400/30 border-l-blue-400/30 transform rotateX-45 rotate-12 animate-[spin_20s_linear_infinite]" />
        <div className="absolute bottom-[15%] right-[8%] hidden 2xl:block w-24 h-24 rounded-full border-[12px] border-purple-500/10 backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.2)] border-t-purple-400/30 border-r-purple-400/30 transform rotateX-45 -rotate-12 animate-[spin_15s_linear_infinite_reverse]" />
      </div>

      <Row className="relative z-10 max-w-[1400px] mx-auto">
        {/* ── HEADER SECTION ── */}
        <div className="text-center mb-8 lg:mb-12 max-w-3xl mx-auto relative z-20">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#0c1327] border border-blue-500/30 mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <LuSparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-300">
              OUR METHODOLOGY
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            AI Chatbot{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Development Process
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A strategic, human-centered approach powered by AI.
            <br className="hidden sm:block" />
            From discovery to optimization — built for real impact.
          </motion.p>
        </div>

        {/* ── RADIAL LAYOUT AREA ── */}
        <div className="relative w-full lg:h-[750px] flex flex-col lg:block items-center mt-10 lg:mt-0 z-10">
          {/* ORBITAL RINGS */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[40%] border border-cyan-400/30 rounded-[100%] rotate-[-12deg] shadow-[0_0_15px_rgba(34,211,238,0.1)] z-0">
              <div className="absolute top-[50%] left-[-3px] w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(34,211,238,0.8)]" />
              <div className="absolute top-[20%] right-[10%] w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_3px_rgba(34,211,238,0.9)] animate-pulse" />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[45%] border border-purple-500/30 rounded-[100%] rotate-[15deg] shadow-[0_0_15px_rgba(168,85,247,0.1)] z-0">
              <div className="absolute bottom-[10%] left-[20%] w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_12px_3px_rgba(168,85,247,0.9)] animate-pulse" />
              <div className="absolute top-[40%] right-[-2px] w-1.5 h-1.5 rounded-full bg-purple-300 shadow-[0_0_10px_2px_rgba(168,85,247,0.8)]" />
            </div>
          </div>

          {/* ── CENTRAL IMAGE (Enlarged) ── */}
          <div className="hidden lg:flex absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center z-10">
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-[340px] h-[340px] flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-[60px] animate-[pulse_3s_infinite]" />

              <img
                src="/ai-strategy/ai-chartbot-development/mind.png"
                alt="AI Core Brain"
                className="w-[280px] h-[280px] object-contain relative z-10 drop-shadow-[0_0_35px_rgba(59,130,246,0.6)]"
              />
            </motion.div>
          </div>

          {/* ── PROCESS CARDS (Reduced width, updated positions) ── */}
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`
                  w-full max-w-[320px] mx-auto lg:max-w-none lg:w-[230px] xl:w-[250px]
                  bg-gradient-to-br from-[#121935]/80 to-[#0a0f1d]/90 
                  border border-white/5 border-t-white/10 border-l-white/10 
                  p-5 rounded-[20px] backdrop-blur-xl 
                  shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(59,130,246,0.05)]
                  transition-all duration-300 relative group
                  lg:absolute lg:-translate-x-1/2 lg:-translate-y-1/2
                  mb-8 lg:mb-0
                  ${step.pos} z-20 hover:z-30 hover:-translate-y-[calc(50%+4px)]
                `}
              >
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-4 w-4 h-[1px] bg-cyan-500/50" />
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-4 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#0a0f1e] border border-blue-500/40 flex items-center justify-center font-bold text-white text-[13px] z-10 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  {step.num}
                </div>

                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 group-hover:text-cyan-400">
                  <Icon className="w-4 h-4 drop-shadow-md" />
                </div>

                <h4 className="text-white font-bold text-[14px] mb-1.5 tracking-tight leading-tight">
                  {step.title}
                </h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ── BOTTOM FEATURE BAR ── */}
        <div className="mt-8 lg:mt-12 relative z-20">
          <div className="bg-[#0b1021]/80 border border-white/5 border-t-white/10 backdrop-blur-xl rounded-full p-4 lg:px-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
              {BOTTOM_FEATURES.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-center gap-3 p-2 lg:px-4"
                  >
                    <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <h5 className="font-semibold text-white text-[12px]">
                        {feature.title}
                      </h5>
                      <p className="text-[10px] text-slate-400 leading-snug">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Row>
    </Section>
  );
}
