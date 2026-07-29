"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuShieldCheck,
  LuKey,
  LuLock,
  LuFileText,
  LuZap,
  LuUserCheck,
  LuActivity,
  LuCircleCheck,
  LuTerminal,
  LuShieldAlert,
  LuArrowRight,
  LuCheck,
} from "react-icons/lu";
import Section from "@/components/Section";
import Row from "@/components/Row";
import SectionBadge from "@/components/new-home-components/SectionBadge";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

const SECURITY_PILLARS = [
  {
    id: "authentication",
    step: "01",
    title: "Authentication",
    category: "Identity & Tokens",
    statusText: "OAuth 2.0 / OpenID Connect",
    icon: LuKey,
    color: "#D27E2B",
    description:
      "Authenticate users and applications using OAuth 2.0 and OpenID Connect, allowing AI clients to securely obtain and validate access tokens through enterprise identity providers.",
    bullets: ["OAuth 2.0 Flows", "Identity Providers", "Access Tokens"],
    pipelineStep: "Identity Check",
    telemetryLog: "[AUTH_OK] OAuth 2.0 access token validated.",
  },
  {
    id: "authorization",
    step: "02",
    title: "Authorization",
    category: "Access Enforcement",
    statusText: "Role-Based Access Control",
    icon: LuUserCheck,
    color: "#3B82F6",
    description:
      "Define granular permissions so AI agents and users can access only the tools, APIs, and resources they are explicitly authorized to use.",
    bullets: ["Granular Tool Scopes", "Role Mapping", "Least Privilege"],
    pipelineStep: "Permission Gate",
    telemetryLog: "[RBAC_PASS] Permission check passed for requested tool invocation.",
  },
  {
    id: "transport",
    step: "03",
    title: "Transport Security",
    category: "In-Transit Protection",
    statusText: "TLS Encryption",
    icon: LuLock,
    color: "#10B981",
    description:
      "Encrypt all communication between AI clients, MCP servers, and enterprise services using modern TLS protocols to protect data in transit.",
    bullets: ["TLS 1.3 Encryption", "In-Transit Protection", "Certificate Validation"],
    pipelineStep: "TLS Transport",
    telemetryLog: "[TLS_OK] TLS 1.3 session established.",
  },
  {
    id: "audit",
    step: "04",
    title: "Audit Logging",
    category: "Operational Traceability",
    statusText: "Audit Logging Enabled",
    icon: LuFileText,
    color: "#8B5CF6",
    description:
      "Record authentication events, tool invocations, permission checks, and API activity to support operational monitoring and compliance requirements.",
    bullets: ["Tool Invocations", "Event Traceability", "SIEM Monitoring"],
    pipelineStep: "Audit Trail",
    telemetryLog: "[AUDIT_LOG] Event recorded: Tool invocation logged successfully.",
  },
  {
    id: "secrets",
    step: "05",
    title: "Secret Management",
    category: "Credential Management",
    statusText: "Credential Management",
    icon: LuShieldAlert,
    color: "#EC4899",
    description:
      "Securely manage API keys, access tokens, and service credentials using encrypted storage and controlled access policies.",
    bullets: ["Encrypted Storage", "API Key Security", "Access Policies"],
    pipelineStep: "Credential Vault",
    telemetryLog: "[CREDENTIALS] Access token retrieved from secure credential store.",
  },
  {
    id: "ratelimit",
    step: "06",
    title: "Rate Limiting",
    category: "Traffic Management",
    statusText: "Rate Limiting Policies",
    icon: LuZap,
    color: "#F59E0B",
    description:
      "Control request frequency and enforce usage policies to reduce abuse, prevent overload, and improve service reliability.",
    bullets: ["Request Quotas", "Abuse Prevention", "Service Reliability"],
    pipelineStep: "Traffic Sentinel",
    telemetryLog: "[RATE_LIMIT] Request within configured rate limits.",
  },
];

export default function EnterpriseSecurity() {
  const [selectedId, setSelectedId] = useState<string>("authentication");
  const activePillar = SECURITY_PILLARS.find((p) => p.id === selectedId) || SECURITY_PILLARS[0];

  return (
    <Section className="py-20 lg:py-28 relative overflow-hidden bg-[#070D1B] text-white border-t border-slate-800">
      {/* Dark Ambient Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(210,126,43,0.12)_0%,rgba(16,185,129,0.08)_40%,transparent_75%)] rounded-full blur-3xl pointer-events-none" />

      <Row>
        {/* Section Header */}
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-14 max-w-3xl mx-auto flex flex-col items-center gap-3 relative z-10"
        >
          <SectionBadge title="ENTERPRISE SECURITY" />

          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold leading-tight tracking-tight text-white">
            Enterprise-Grade Security <br />
            <span className="text-[#D27E2B]">Built Into Every MCP Server</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            Security is built into every MCP server we develop. We implement authentication, authorization, encrypted communication, audit logging, and secure credential management to help AI applications interact safely with enterprise software and business data.
          </p>
        </motion.div>

        {/* ── 2-COLUMN BALANCED EQUAL-HEIGHT SECURITY ARCHITECTURE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">

          {/* MOBILE / TABLET ONLY: Compact Wrapped Pillar Grid Selector (lg:hidden) */}
          <div className="lg:hidden col-span-1 flex flex-wrap justify-center gap-2 mb-4 w-full">
            {SECURITY_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = selectedId === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedId(pillar.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all shrink-0 ${
                    isSelected
                      ? "bg-slate-900 border-[#D27E2B] text-white shadow-md shadow-[#D27E2B]/20"
                      : "bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <Icon
                    className="w-4 h-4 shrink-0"
                    style={{ color: isSelected ? "#D27E2B" : pillar.color }}
                  />
                  <span>{pillar.step}. {pillar.title}</span>
                </button>
              );
            })}
          </div>

          {/* DESKTOP ONLY (lg:grid): 6 Interactive Security Cards in 2-Column Grid */}
          <div className="hidden lg:grid lg:col-span-6 grid-cols-1 sm:grid-cols-2 gap-4">
            {SECURITY_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = selectedId === pillar.id;

              return (
                <motion.div
                  key={pillar.id}
                  {...fadeUp(0.05 + idx * 0.04)}
                  onClick={() => setSelectedId(pillar.id)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between group ${
                    isSelected
                      ? "bg-slate-900/90 border-[#D27E2B] shadow-lg shadow-[#D27E2B]/15"
                      : "bg-slate-950/50 backdrop-blur-md border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60"
                  }`}
                >
                  {/* Left Active Accent Bar */}
                  <div
                    className="absolute top-0 left-0 bottom-0 w-1.5 transition-opacity"
                    style={{
                      backgroundColor: pillar.color,
                      opacity: isSelected ? 1 : 0.3,
                    }}
                  />

                  <div>
                    <div className="flex items-center justify-between gap-2 pl-1.5 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                        style={{
                          backgroundColor: `${pillar.color}15`,
                          borderColor: `${pillar.color}35`,
                          color: pillar.color,
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <span
                        className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border"
                        style={{
                          backgroundColor: `${pillar.color}15`,
                          borderColor: `${pillar.color}35`,
                          color: pillar.color,
                        }}
                      >
                        {pillar.category}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-extrabold text-white leading-tight pl-1.5 mb-1.5">
                      {pillar.title}
                    </h4>

                    <span className="text-xs font-mono font-extrabold text-[#D27E2B] pl-1.5 block mb-2">
                      Status: {pillar.statusText}
                    </span>

                    <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed pl-1.5 line-clamp-2">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-3.5 mt-4 border-t border-slate-800/70 flex items-center justify-between pl-1.5">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      LAYER {pillar.step}
                    </span>
                    <span
                      className={`text-xs font-bold inline-flex items-center gap-1.5 ${
                        isSelected ? "text-[#D27E2B]" : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      {isSelected ? "ACTIVE" : "INSPECT"} <LuArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT COLUMN (6 Cols): Persistent Glass Gateway & Live Security Pipeline Console */}
          <div className="lg:col-span-6 bg-slate-950/80 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            
            {/* Top Console Status Bar */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b border-slate-800/80 mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-mono font-bold tracking-widest text-emerald-400 uppercase">
                      ENTERPRISE MCP SECURITY GATEWAY // ACTIVE
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      Real-Time Security Enforcement & Telemetry Stream
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-md font-bold">
                    OAuth 2.0
                  </span>
                  <span className="text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2.5 py-1 rounded-md font-bold">
                    OpenID Connect
                  </span>
                  <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-md font-bold">
                    TLS 1.3
                  </span>
                  <span className="text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/30 px-2.5 py-1 rounded-md font-bold">
                    RBAC
                  </span>
                </div>
              </div>

              {/* 6-Step Visual Security Pipeline Checkpoints (Desktop / Tablet) */}
              <div className="hidden sm:block mb-6">
                <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-bold">
                  SECURITY CONTROL CHECKPOINTS
                </h5>

                <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {SECURITY_PILLARS.map((p) => {
                    const isCurrent = p.id === activePillar.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedId(p.id)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                          isCurrent
                            ? "bg-slate-900 border-[#D27E2B] shadow-md shadow-[#D27E2B]/20"
                            : "bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <span className="text-xs font-mono font-bold text-slate-400">
                          {p.step}
                        </span>
                        <span
                          className={`text-xs font-bold truncate max-w-full mt-0.5 ${
                            isCurrent ? "text-white" : "text-slate-300"
                          }`}
                        >
                          {p.title.split(" ")[0]}
                        </span>
                        <div
                          className="w-2 h-2 rounded-full mt-1.5"
                          style={{
                            backgroundColor: isCurrent ? p.color : "#475569",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Selected Node Deep-Dive Panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-5 sm:p-6 mb-6 relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ backgroundColor: activePillar.color }}
                  />

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 border"
                        style={{
                          backgroundColor: `${activePillar.color}20`,
                          borderColor: `${activePillar.color}40`,
                          color: activePillar.color,
                        }}
                      >
                        {React.createElement(activePillar.icon, { className: "w-5 h-5 sm:w-6 sm:h-6" })}
                      </div>
                      <div>
                        <span
                          className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider"
                          style={{ color: activePillar.color }}
                        >
                          {activePillar.category}
                        </span>
                        <h3 className="text-base sm:text-xl font-black text-white leading-tight">
                          {activePillar.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-[11px] sm:text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg shrink-0">
                      {activePillar.statusText}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed mb-4">
                    {activePillar.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {activePillar.bullets.map((bullet, bIdx) => (
                      <span
                        key={bIdx}
                        className="text-xs font-mono font-bold text-slate-200 bg-slate-950 border border-slate-700/80 px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                      >
                        <LuCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        {bullet}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Live Terminal Output Box */}
            <div className="bg-slate-950 border border-slate-800/90 rounded-xl p-3.5 sm:p-4 font-mono text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-slate-400 pb-2 mb-2 border-b border-slate-900 gap-1 text-xs">
                <span className="flex items-center gap-2 text-slate-300 font-bold">
                  <LuTerminal className="w-4 h-4 text-[#D27E2B] shrink-0" /> SECURITY_TELEMETRY.log
                </span>
                <span className="text-emerald-400 font-bold text-[11px] sm:text-xs">● REAL-TIME MONITORING</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={activePillar.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-emerald-400 font-bold leading-relaxed"
                >
                  {activePillar.telemetryLog}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Bottom Assurance Badges */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300 font-bold">
                <LuCircleCheck className="w-4 h-4 text-emerald-400" /> Security Controls Implemented
              </span>

              <div className="flex items-center gap-2">
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">OAuth 2.0</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">OpenID Connect</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">TLS 1.3</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">RBAC</span>
              </div>
            </div>

          </div>

        </div>
      </Row>
    </Section>
  );
}
