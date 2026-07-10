"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuBot,
  LuDatabase,
  LuCpu,
  LuMessageSquare,
  LuArrowRight,
  LuServer,
  LuGlobe,
  LuCircleCheck,
  LuTrendingUp,
  LuShieldCheck,
  LuClock,
} from "react-icons/lu";
import Section from "../Section";
import Row from "../Row";
import SectionBadge from "../new-home-components/SectionBadge";

// Added a 5th solution, expanded metrics, and added deployment timelines
const SOLUTIONS = [
  {
    id: "support",
    name: "Customer Support Automation",
    badge: "SUPPORT BOT",
    desc: "Automate repetitive support queries across user channels using verified knowledge documents with seamless human agent handoffs.",
    sources: ["Website FAQs", "PDF SOPs", "Zendesk API"],
    orchestration: [
      "Retrieval-Augmented Gen (RAG)",
      "PII Privacy Filter",
      "Vector Search",
    ],
    models: ["GPT-4o API", "Claude 3.5 Sonnet"],
    channels: ["Web Widget", "WhatsApp Business", "Zendesk Desk"],
    metrics: [
      { label: "Ticket Deflection", value: "45%" },
      { label: "Resolution Time", value: "< 2s" },
      { label: "CSAT Score", value: "+18%" },
    ],
    timeline: "2-3 Weeks",
    color: "#D27E2B",
  },
  {
    id: "document",
    name: "Enterprise Document Intelligence",
    badge: "DOCUMENT SEARCH",
    desc: "Index complex manuals, legal contracts, and financial spreadsheets into a private vector search engine for instant natural language querying.",
    sources: ["PDF Manuals", "Sharepoint Sync", "Notion Databases"],
    orchestration: [
      "Semantic Chunking",
      "OCR Scan Layer",
      "Hybrid Keyword Search",
    ],
    models: ["Mistral Large", "Custom Llama 3"],
    channels: ["Internal Web App", "Slack App", "REST API Endpoint"],
    metrics: [
      { label: "Search Accuracy", value: "98%" },
      { label: "Time Saved/Wk", value: "12 hrs" },
      { label: "Data Processed", value: "5M+ Docs" },
    ],
    timeline: "3-4 Weeks",
    color: "#00C897",
  },
  {
    id: "sales",
    name: "Predictive Sales Copilot",
    badge: "SALES ASSISTANT",
    desc: "Qualify website visitors in real-time, retrieve CRM timeline metrics, suggest product listings, and schedule calendar appointments.",
    sources: ["HubSpot CRM", "SQL Database", "Stripe API"],
    orchestration: [
      "Intent Classification",
      "Calendar Logic",
      "Dynamic Prompts",
    ],
    models: ["Claude 3.5 Sonnet", "Gemini 1.5 Pro"],
    channels: ["Website Popup", "Email Autopilot", "Salesforce Panel"],
    metrics: [
      { label: "Lead Conversion", value: "+22%" },
      { label: "Meetings Booked", value: "3x" },
      { label: "Response Rate", value: "95%" },
    ],
    timeline: "4-6 Weeks",
    color: "#3B82F6",
  },
  {
    id: "workflow",
    name: "AI-Powered Workflow Automation",
    badge: "WORKFLOW AGENTS",
    desc: "Coordinate database actions, run software tests, flag system log anomalies, and auto-dispatch Slack notifications via model tool-calling.",
    sources: ["System Logs", "GitHub Repository", "Webhooks"],
    orchestration: [
      "Function Tool-Calling",
      "Cron Listeners",
      "Error Fallbacks",
    ],
    models: ["GPT-4o API", "Mistral Codestral"],
    channels: ["Slack Channels", "Dev Console", "Webhook Dispatches"],
    metrics: [
      { label: "Task Automation", value: "85%" },
      { label: "Error Reduction", value: "60%" },
      { label: "Cost Savings", value: "40%" },
    ],
    timeline: "4-8 Weeks",
    color: "#8B5CF6",
  },
  {
    id: "analytics",
    name: "Business Intelligence Agent",
    badge: "DATA ANALYTICS",
    desc: "Translate natural language questions into complex SQL queries, generating real-time interactive charts and executive summaries.",
    sources: ["Snowflake Data Cloud", "PostgreSQL", "Google Analytics"],
    orchestration: ["Text-to-SQL Engine", "Query Validation", "Schema Mapping"],
    models: ["Claude 3.5 Sonnet", "GPT-4o API"],
    channels: ["Tableau Extension", "Custom Dashboard", "Teams Bot"],
    metrics: [
      { label: "Query Speed", value: "< 5s" },
      { label: "Data Accessibility", value: "100%" },
      { label: "Report Gen", value: "Instant" },
    ],
    timeline: "5-7 Weeks",
    color: "#EC4899",
  },
];

export default function SolutionBlueprint() {
  const [activeTab, setActiveTab] = useState(SOLUTIONS[0].id);
  const activeSolution =
    SOLUTIONS.find((s) => s.id === activeTab) || SOLUTIONS[0];

  return (
    <Section className="bg-[#0A0F1C] py-20! lg:py-28! border-y border-white/5 relative overflow-hidden">
      {/* Dark Theme Dynamic Backgrounds */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#D27E2B]/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-500/10 to-transparent blur-[120px] pointer-events-none" />

      <Row>
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            {/* Assuming SectionBadge supports dark mode or is transparent */}
            <SectionBadge title="Architecture" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Solution <span className="text-[#D27E2B]">Blueprint</span>
          </motion.h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-[#D27E2B] to-[#e69b55] mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(210,126,43,0.5)]" />
          <p className="text-base font-medium text-slate-400 max-w-xl mt-6 leading-relaxed">
            Select an operational AI solution to visualize its target-state
            system architecture, from data sources to deployment channels.
          </p>
        </div>

        {/* 3D Tab Selector (Dark Mode) */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 max-w-5xl mx-auto [perspective:1000px]">
          {SOLUTIONS.map((sol) => (
            <motion.button
              key={sol.id}
              onClick={() => setActiveTab(sol.id)}
              whileHover={{ translateZ: 10, y: -2 }}
              whileTap={{ translateZ: 0, y: 0 }}
              className={`cursor-pointer px-7 py-3.5 rounded-2xl border text-sm font-bold tracking-wide transition-all duration-300 transform-gpu ${
                sol.id === activeTab
                  ? "bg-gradient-to-b from-[#1E293B] to-[#0F172A] border-white/20 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.8),_inset_0_1px_1px_rgba(255,255,255,0.15)]"
                  : "bg-[#131B2C]/80 border-white/5 text-slate-400 hover:bg-[#1E293B] hover:text-white hover:border-white/10 shadow-sm"
              }`}
              style={
                sol.id === activeTab
                  ? { color: sol.color, borderColor: `${sol.color}50` }
                  : {}
              }
            >
              {sol.name}
            </motion.button>
          ))}
        </div>

        {/* 3D Blueprint Layout Panel (Dark Mode) */}
        <div className="max-w-7xl mx-auto w-full [perspective:1200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSolution.id}
              initial={{ opacity: 0, rotateX: 10, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, rotateX: -10, y: -40, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-gradient-to-b from-[#151E32] to-[#0B101E] rounded-[40px] border border-white/10 p-8 lg:p-12 relative overflow-visible transform-style-3d shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)]"
            >
              {/* Info top banner */}
              <div className="flex flex-col xl:flex-row justify-between items-start gap-8 mb-12 border-b border-white/5 pb-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-xs font-extrabold px-4 py-1.5 rounded-full border inline-flex items-center gap-2 shadow-sm"
                      style={{
                        backgroundColor: `${activeSolution.color}15`,
                        color: activeSolution.color,
                        borderColor: `${activeSolution.color}30`,
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]"
                        style={{ backgroundColor: activeSolution.color }}
                      />
                      {activeSolution.badge}
                    </motion.span>

                    {/* NEW: Deployment Timeline Badge */}
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                      <LuClock className="w-3.5 h-3.5 text-slate-400" />
                      {activeSolution.timeline}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    {activeSolution.name}
                  </h3>
                  <p className="text-base text-slate-400 font-medium max-w-2xl mt-3 leading-relaxed">
                    {activeSolution.desc}
                  </p>
                </div>

                {/* Expanded Metrics Display (Dark Mode) */}
                <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full xl:w-auto">
                  {activeSolution.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="bg-[#0F172A] rounded-2xl p-4 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex-1 sm:w-32 text-center flex flex-col justify-center"
                    >
                      <LuTrendingUp className="w-5 h-5 mx-auto mb-2 text-slate-500" />
                      <div className="text-2xl font-black text-white">
                        {metric.value}
                      </div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 mt-1">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic 3D Pipeline Diagram (Dark Mode) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8 items-stretch relative z-10">
                {/* Background Connecting Line */}
                <div className="hidden md:block absolute top-1/2 left-10 right-10 h-1 bg-gradient-to-r from-[#1E293B] via-[#334155] to-[#1E293B] -translate-y-1/2 z-0 rounded-full" />

                {/* 3D Column Cards */}
                {[
                  {
                    title: "Sources",
                    icon: LuDatabase,
                    data: activeSolution.sources,
                    sub: "Data Ingestion Layer",
                  },
                  {
                    title: "Orchestrator",
                    icon: LuServer,
                    data: activeSolution.orchestration,
                    sub: "Logic & Vector Search",
                  },
                  {
                    title: "Model Layer",
                    icon: LuCpu,
                    data: activeSolution.models,
                    sub: "LLM Integration Modules",
                  },
                  {
                    title: "Channels",
                    icon: LuGlobe,
                    data: activeSolution.channels,
                    sub: "Deployment Interfaces",
                  },
                ].map((col, idx) => (
                  <motion.div
                    key={col.title}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="relative z-10 rounded-3xl bg-[#1E293B]/80 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-between gap-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)]"
                  >
                    {/* Visual Connector Arrow */}
                    {idx !== 3 && (
                      <div className="hidden md:flex absolute -right-6 lg:-right-7 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0F172A] rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-white/10 items-center justify-center z-20">
                        <LuArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-[#0F172A] border border-white/5 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
                        <col.icon className="w-5 h-5 text-slate-300" />
                      </div>
                      <span className="text-sm font-black uppercase tracking-wider text-white">
                        {col.title}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3 relative z-10">
                      {col.data.map((item, i) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="group relative bg-[#0F172A] rounded-xl border border-white/5 p-3.5 shadow-sm hover:border-white/20 transition-all duration-300 flex items-center gap-3"
                        >
                          <LuCircleCheck
                            className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110 drop-shadow-[0_0_5px_currentColor]"
                            style={{ color: activeSolution.color }}
                          />
                          <span className="text-xs font-bold text-slate-300 leading-tight">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">
                        {col.sub}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom footer status */}
              <div className="mt-12 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between text-xs font-bold text-slate-400">
                <span className="flex items-center gap-2">
                  <LuShieldCheck className="w-4 h-4 text-emerald-400" />
                  Enterprise-Grade Security & SOC2 Compliant
                </span>
                <span className="flex items-center gap-1 mt-2 sm:mt-0">
                  <LuBot
                    className="w-4 h-4"
                    style={{ color: activeSolution.color }}
                  />
                  ITS Strategy Solution Blueprints
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Row>
    </Section>
  );
}
