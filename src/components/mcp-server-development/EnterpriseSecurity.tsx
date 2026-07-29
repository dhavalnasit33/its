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
  LuCpu,
  LuShieldAlert,
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

const SECURITY_NODES = [
  {
    id: "oauth",
    title: "OAuth2 & OIDC Auth",
    tagline: "Federated Identity & SSO",
    icon: LuKey,
    color: "#D27E2B",
    description:
      "Federated Single Sign-On (SSO), JWT token validation, and OAuth2 scopes ensuring AI agents authenticate strictly as authorized corporate users.",
    bullets: ["JWT Token Scopes", "Identity Provider SSO", "Token Auto-Rotation"],
    terminalLog: "[AUTH_OK] OAuth2 Bearer token validated for user_id: enterprise_admin",
  },
  {
    id: "rbac",
    title: "RBAC Access Control",
    tagline: "Least Privilege Enforcement",
    icon: LuUserCheck,
    color: "#3B82F6",
    description:
      "Granular tool execution permissions mapping AI assistant capabilities directly to individual employee authorization levels and security roles.",
    bullets: ["Tool-Level Scopes", "User Role Mapping", "Least Privilege"],
    terminalLog: "[RBAC_PASS] Permission check: Tool 'query_sql' allowed for role: AUDITOR",
  },
  {
    id: "encryption",
    title: "TLS 1.3 & AES-256",
    tagline: "End-to-End Data Protection",
    icon: LuLock,
    color: "#10B981",
    description:
      "Strict in-transit TLS 1.3 protocol encryption and AES-256 at-rest database storage ensuring total corporate data privacy.",
    bullets: ["TLS 1.3 Transport", "AES-256 Storage", "Zero-Knowledge"],
    terminalLog: "[CRYPTO] Handshake complete • TLS 1.3 Cipher: ECDHE-RSA-AES256-GCM",
  },
  {
    id: "audit",
    title: "Immutable Audit Logs",
    tagline: "Tamper-Proof Telemetry",
    icon: LuFileText,
    color: "#8B5CF6",
    description:
      "Comprehensive, tamper-proof logging of every AI tool call, parameter payload, execution timestamp, and server response.",
    bullets: ["SIEM Integration", "Tamper-Proof Logs", "Real-Time Telemetry"],
    terminalLog: "[AUDIT_LOG] Event #8942 logged: 'update_record' executed with 0 warnings",
  },
  {
    id: "secrets",
    title: "Secrets Vault Sync",
    tagline: "Zero Hardcoded Credentials",
    icon: LuShieldAlert,
    color: "#EC4899",
    description:
      "Native integration with HashiCorp Vault, AWS KMS, and Azure Key Vault so API credentials and tokens never touch client code.",
    bullets: ["HashiCorp Vault", "AWS KMS Sync", "Zero Leak Risk"],
    terminalLog: "[VAULT] Dynamic secret leased from HashiCorp Vault (TTL: 3600s)",
  },
  {
    id: "ratelimit",
    title: "Rate Limiting & DDoS",
    tagline: "API Quotas & Throttling",
    icon: LuZap,
    color: "#F59E0B",
    description:
      "Configurable API call quotas, circuit breakers, and rate limiters protecting internal microservices from spike overloads.",
    bullets: ["Circuit Breakers", "API Quotas", "Burst Protection"],
    terminalLog: "[THROTTLE] Rate limiter active: 1,200 req/min within safety threshold",
  },
];

export default function EnterpriseSecurity() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("oauth");
  const selectedNode = SECURITY_NODES.find((n) => n.id === selectedNodeId) || SECURITY_NODES[0];

  return (
    <Section className="py-20 lg:py-28 relative overflow-hidden bg-[#070D1B] text-white border-t border-slate-800">
      {/* Ambient Dark Holographic Glowing Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(210,126,43,0.12)_0%,rgba(16,185,129,0.08)_40%,transparent_70%)] rounded-full blur-3xl pointer-events-none" />

      <Row>
        {/* Section Header */}
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-14 max-w-3xl mx-auto flex flex-col items-center gap-3 relative z-10"
        >
          <SectionBadge title="ENTERPRISE SECURITY & GOVERNANCE" />

          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold leading-tight tracking-tight text-white">
            Enterprise <span className="text-[#D27E2B]">Security Architecture</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            Our custom MCP servers are engineered with military-grade zero-trust protocols, granular role-based access controls, and full audit telemetry to safeguard corporate resources.
          </p>
        </motion.div>

        {/* ── MISSION CONTROL GLASS DASHBOARD ── */}
        <div className="relative w-full max-w-[1280px] mx-auto z-10">
          
          {/* Main Glass Panel Frame */}
          <div className="bg-slate-900/50 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-6 sm:p-9 shadow-[0_0_80px_rgba(0,0,0,0.6)] relative overflow-hidden">
            
            {/* Top Security Status Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800/80 mb-8 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <div>
                  <h4 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                    ZERO-TRUST MCP SECURITY CONSOLE // ACTIVE
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono">
                    System Status: SECURE • Zero Data Leaks • 100% Policy Enforced
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
                  SOC2 READY
                </span>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full font-bold">
                  ISO 27001
                </span>
              </div>
            </div>

            {/* Dashboard Grid (3 Columns Left | 6 Columns Glass Shield Terminal | 3 Columns Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

              {/* LEFT COLUMN: 3 Glass Feature Panels */}
              <div className="lg:col-span-3 flex flex-col gap-4">
                {SECURITY_NODES.slice(0, 3).map((node, idx) => {
                  const Icon = node.icon;
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <motion.div
                      key={node.id}
                      {...fadeUp(0.1 + idx * 0.05)}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                        isSelected
                          ? "bg-slate-800/80 backdrop-blur-xl border-[#D27E2B] shadow-lg shadow-[#D27E2B]/10"
                          : "bg-slate-950/40 backdrop-blur-md border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60"
                      }`}
                    >
                      <div
                        className="absolute top-0 left-0 bottom-0 w-1 transition-opacity"
                        style={{
                          backgroundColor: node.color,
                          opacity: isSelected ? 1 : 0.3,
                        }}
                      />

                      <div className="flex items-center gap-3 mb-2 pl-2">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border"
                          style={{
                            backgroundColor: `${node.color}15`,
                            borderColor: `${node.color}35`,
                            color: node.color,
                          }}
                        >
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white leading-snug">
                            {node.title}
                          </h4>
                          <span
                            className="text-[10px] font-mono font-bold uppercase tracking-wider"
                            style={{ color: node.color }}
                          >
                            {node.tagline}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-300 leading-relaxed font-medium pl-2 line-clamp-2">
                        {node.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* CENTER COLUMN: Interactive Glass Terminal & 3D Shield Console */}
              <div className="lg:col-span-6 flex flex-col justify-between bg-slate-950/60 backdrop-blur-xl border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden shadow-inner min-h-[380px]">
                {/* Glowing Subtle Ambient Core */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${selectedNode.color} 0%, transparent 70%)`,
                  }}
                />

                {/* Central Glass Shield Header */}
                <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D27E2B] to-amber-600 text-white flex items-center justify-center shadow-lg">
                      <LuShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white tracking-tight">
                        {selectedNode.title}
                      </h3>
                      <p className="text-xs font-mono font-bold text-[#D27E2B]">
                        {selectedNode.tagline}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
                    ENFORCED
                  </span>
                </div>

                {/* Main Node Explanation & Bullets */}
                <div className="relative z-10 mb-6">
                  <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed mb-4">
                    {selectedNode.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {selectedNode.bullets.map((bullet, bIdx) => (
                      <span
                        key={bIdx}
                        className="text-xs font-mono font-bold text-slate-200 bg-slate-900/90 border border-slate-700/80 px-3 py-1 rounded-lg"
                      >
                        ✓ {bullet}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Live Simulated Terminal Security Log */}
                <div className="relative z-10 bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-slate-500 pb-2 mb-2 border-b border-slate-900 text-[10px]">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <LuTerminal className="w-3.5 h-3.5 text-[#D27E2B]" /> SECURITY_TELEMETRY_LOG.sh
                    </span>
                    <span className="text-emerald-400">● LIVE MONITORING</span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={selectedNode.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="text-emerald-400 font-bold"
                    >
                      {selectedNode.terminalLog}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* RIGHT COLUMN: 3 Glass Feature Panels */}
              <div className="lg:col-span-3 flex flex-col gap-4">
                {SECURITY_NODES.slice(3, 6).map((node, idx) => {
                  const Icon = node.icon;
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <motion.div
                      key={node.id}
                      {...fadeUp(0.1 + idx * 0.05)}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                        isSelected
                          ? "bg-slate-800/80 backdrop-blur-xl border-[#D27E2B] shadow-lg shadow-[#D27E2B]/10"
                          : "bg-slate-950/40 backdrop-blur-md border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60"
                      }`}
                    >
                      <div
                        className="absolute top-0 left-0 bottom-0 w-1 transition-opacity"
                        style={{
                          backgroundColor: node.color,
                          opacity: isSelected ? 1 : 0.3,
                        }}
                      />

                      <div className="flex items-center gap-3 mb-2 pl-2">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border"
                          style={{
                            backgroundColor: `${node.color}15`,
                            borderColor: `${node.color}35`,
                            color: node.color,
                          }}
                        >
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white leading-snug">
                            {node.title}
                          </h4>
                          <span
                            className="text-[10px] font-mono font-bold uppercase tracking-wider"
                            style={{ color: node.color }}
                          >
                            {node.tagline}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-300 leading-relaxed font-medium pl-2 line-clamp-2">
                        {node.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

            </div>

            {/* Bottom Security Compliance Badges */}
            <div className="mt-8 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <LuCircleCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>SOC2 Type II & HIPAA Compliance Architecture Ready</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">OAuth2.0</span>
                <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">RBAC</span>
                <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">AES-256</span>
                <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">HashiCorp Vault</span>
              </div>
            </div>

          </div>
        </div>
      </Row>
    </Section>
  );
}
