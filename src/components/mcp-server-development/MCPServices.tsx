"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LuServer,
  LuLayers,
  LuLock,
  LuWorkflow,
  LuCpu,
  LuShieldCheck,
  LuArrowRight,
  LuCircleCheck,
  LuCode,
  LuZap,
  LuKey,
  LuDatabase,
  LuTerminal,
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

export default function MCPServices() {
  return (
    <Section id="mcp-services" className="py-20 lg:py-28 relative overflow-hidden bg-slate-50/60 text-slate-900 border-t border-slate-200/70">
      {/* Light Background Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-br from-orange-100/50 via-amber-50/40 to-indigo-50/30 rounded-full blur-3xl pointer-events-none" />

      <Row>
        {/* Section Header */}
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center gap-3 relative z-10"
        >
          <SectionBadge title="OUR MCP DEVELOPMENT SERVICES" />

          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold leading-tight tracking-tight text-[#0F172A]">
            Enterprise MCP <span className="text-[#D27E2B]">Development Services</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            We design, build, secure, and deploy custom Model Context Protocol (MCP) servers that enable AI agents and assistants to safely execute enterprise software workflows.
          </p>
        </motion.div>

        {/* ── BENTO GRID LAYOUT ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 relative z-10">

          {/* CARD 1: Custom MCP Server Development (Featured Wide Card - lg:col-span-8) */}
          <motion.div
            {...fadeUp(0.1)}
            whileHover={{ y: -6 }}
            className="lg:col-span-8 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-3xl p-7 sm:p-9 shadow-xs hover:shadow-xl hover:border-[#D27E2B]/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D27E2B] via-amber-400 to-[#D27E2B]" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                {/* 3D Gradient Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/15 to-amber-500/20 border border-[#D27E2B]/30 flex items-center justify-center text-[#D27E2B] shadow-xs group-hover:scale-110 transition-transform">
                  <LuServer className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-[#D27E2B] bg-orange-50 px-3 py-1 rounded-full border border-orange-200/60">
                  Architecture & Protocol Engineering
                </span>
              </div>

              <h3 className="text-2xl font-black text-[#0F172A] mb-3 tracking-tight group-hover:text-[#D27E2B] transition-colors">
                Custom MCP Server Development
              </h3>

              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed mb-6 max-w-2xl">
                Design and build custom Model Context Protocol servers tailored to your business workflows, APIs, and enterprise software ecosystem.
              </p>
            </div>

            {/* Sub-Feature Visual & Tech Chips */}
            <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                  JSON-RPC 2.0 Schema
                </span>
                <span className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                  Python & TS SDKs
                </span>
                <span className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                  Tailored API Wrappers
                </span>
              </div>

              <a
                href="#contact-form-section"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#D27E2B] group-hover:translate-x-1 transition-transform"
              >
                Build Custom Server <LuArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* CARD 2: Enterprise Tool Integration (lg:col-span-4) */}
          <motion.div
            {...fadeUp(0.15)}
            whileHover={{ y: -6 }}
            className="lg:col-span-4 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-3xl p-7 sm:p-8 shadow-xs hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-500" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-13 h-13 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <LuLayers className="w-6.5 h-6.5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  CRM, ERP & DB Connectors
                </span>
              </div>

              <h3 className="text-xl font-black text-[#0F172A] mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
                Enterprise Tool Integration
              </h3>

              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed mb-6">
                Connect AI assistants with CRMs, ERPs, databases, SaaS platforms, and internal applications using secure MCP implementations.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
              <span className="text-sm font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                Salesforce & SAP
              </span>
              <span className="text-sm font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                Postgres & SQL
              </span>
            </div>
          </motion.div>

          {/* CARD 3: Secure Authentication & Access (lg:col-span-4) */}
          <motion.div
            {...fadeUp(0.2)}
            whileHover={{ y: -6 }}
            className="lg:col-span-4 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-3xl p-7 sm:p-8 shadow-xs hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-500" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-13 h-13 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <LuLock className="w-6.5 h-6.5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  OAuth2, RBAC & Zero-Trust
                </span>
              </div>

              <h3 className="text-xl font-black text-[#0F172A] mb-3 tracking-tight group-hover:text-emerald-600 transition-colors">
                Secure Authentication & Access
              </h3>

              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed mb-6">
                Implement OAuth, API keys, role-based access control, and permission validation to protect enterprise resources.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
              <span className="text-sm font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                OAuth2 / OIDC
              </span>
              <span className="text-sm font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                RBAC Access Control
              </span>
            </div>
          </motion.div>

          {/* CARD 4: API & Workflow Orchestration (lg:col-span-4) */}
          <motion.div
            {...fadeUp(0.25)}
            whileHover={{ y: -6 }}
            className="lg:col-span-4 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-3xl p-7 sm:p-8 shadow-xs hover:shadow-xl hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-purple-500" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-13 h-13 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <LuWorkflow className="w-6.5 h-6.5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                  Multi-Step Tool Calling
                </span>
              </div>

              <h3 className="text-xl font-black text-[#0F172A] mb-3 tracking-tight group-hover:text-purple-600 transition-colors">
                API & Workflow Orchestration
              </h3>

              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed mb-6">
                Develop intelligent MCP services that coordinate API calls, automate workflows, and streamline business operations.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
              <span className="text-sm font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                Multi-Step Tool Calling
              </span>
              <span className="text-sm font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                Real-Time Telemetry
              </span>
            </div>
          </motion.div>

          {/* CARD 5: Multi-Agent MCP Infrastructure (lg:col-span-4) */}
          <motion.div
            {...fadeUp(0.3)}
            whileHover={{ y: -6 }}
            className="lg:col-span-4 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-3xl p-7 sm:p-8 shadow-xs hover:shadow-xl hover:border-pink-500/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-pink-500" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-13 h-13 rounded-2xl bg-pink-50 border border-pink-200 text-pink-600 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <LuCpu className="w-6.5 h-6.5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100">
                  Agent Service Discovery
                </span>
              </div>

              <h3 className="text-xl font-black text-[#0F172A] mb-3 tracking-tight group-hover:text-pink-600 transition-colors">
                Multi-Agent MCP Infrastructure
              </h3>

              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed mb-6">
                Enable multiple AI agents to securely discover, access, and collaborate through standardized MCP-based communication.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
              <span className="text-sm font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                Agent Discovery
              </span>
              <span className="text-sm font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                Context Routing
              </span>
            </div>
          </motion.div>

          {/* CARD 6: Deployment & Enterprise Support (Featured Full-Width Bottom Card - lg:col-span-12) */}
          <motion.div
            {...fadeUp(0.35)}
            whileHover={{ y: -4 }}
            className="lg:col-span-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-7 sm:p-9 shadow-xl border border-slate-800 relative overflow-hidden group cursor-pointer"
          >
            {/* Soft Ambient Inner Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#D27E2B]/20 via-orange-500/10 to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D27E2B] text-white flex items-center justify-center shadow-md">
                    <LuShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D27E2B] bg-[#D27E2B]/15 px-3 py-1 rounded-full border border-[#D27E2B]/30">
                    Containerization & 24/7 SLA
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
                  Deployment & Enterprise Support
                </h3>

                <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed mb-6">
                  Deploy production-ready MCP servers with continuous monitoring, scaling, version management, and long-term technical support.
                </p>

                <div className="flex flex-wrap gap-2.5">
                  <span className="text-sm font-bold text-slate-200 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                    Docker & Kubernetes
                  </span>
                  <span className="text-sm font-bold text-slate-200 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                    CI/CD Pipelines
                  </span>
                  <span className="text-sm font-bold text-slate-200 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                    24/7 SLA & Maintenance
                  </span>
                  <span className="text-sm font-bold text-slate-200 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                    Telemetry & Monitoring
                  </span>
                </div>
              </div>

         
            </div>
          </motion.div>

        </div>
      </Row>
    </Section>
  );
}
