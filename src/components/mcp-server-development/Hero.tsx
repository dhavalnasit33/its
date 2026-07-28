"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LuCheck,
  LuShieldCheck,
  LuLock,
  LuCpu,
  LuDatabase,
  LuGlobe,
  LuLayers,
  LuWorkflow,
  LuServer,
  LuZap,
  LuArrowRight,
} from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Button from "@/components/Button";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

const TRUST_CHIPS = [
  "OpenAI Compatible",
  "Claude Compatible",
  "Enterprise APIs",
  "Secure Tool Calling",
  "Zero-Trust Security",
  "Production Ready",
];

export default function Hero() {
  return (
    <Section className="lg:py-20! common_background_gradient relative overflow-hidden text-slate-900">
      <Row>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10 w-full">
          {/* ── Left Column: Value Proposition & Hero Info ── */}
          <div className="w-full max-w-full lg:max-w-[48%]">
            {/* Badge */}
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 text-[#D27E2B] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-6">
                <span className="w-5 h-0.5 bg-[#D27E2B]" />
                ENTERPRISE MCP SERVER DEVELOPMENT
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-4xl md:text-[46px] xl:text-[54px] font-extrabold mb-6 leading-[1.15] tracking-tight text-[#0F172A]"
            >
              Build Secure MCP Servers{" "}
              <span className="text-[#D27E2B]">
                That Connect AI With Your Business Systems
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-medium"
            >
              We develop secure, enterprise-grade Model Context Protocol (MCP)
              servers that enable AI assistants and autonomous agents to safely
              connect with your APIs, databases, SaaS platforms, and internal
              business systems. From custom integrations to production-ready
              deployments, we build scalable MCP solutions tailored to your
              organization's workflows.
            </motion.p>

            {/* Trust Chips Grid */}
            <motion.div
              {...fadeUp(0.3)}
              className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 mb-10"
            >
              {TRUST_CHIPS.map((chip) => (
                <div key={chip} className="flex items-center gap-2.5 text-[#0F172A]">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#D27E2B]/10 flex items-center justify-center">
                    <LuCheck className="w-3 h-3 text-[#D27E2B] stroke-[3]" />
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-700">
                    {chip}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-4 mb-12">
              <Button
                bgColor="#D27E2B"
                hoverColor="#0F172A"
                text="Build Your MCP Server"
                href="#contact-form-section"
                icon="/navbar/btn_icon.png"
              />

              <motion.div className="border border-[#0F172A]/20 hover:border-[#D27E2B] relative w-auto inline-flex items-center justify-center rounded-lg overflow-hidden text-[#ffffff] hover:text-[#ffffff] transition-all duration-700 ease-in-out group bg-[#0F172A] shadow-sm">
                <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D27E2B] rounded group-hover:w-full group-hover:h-full"></span>
                <a
                  href="#mcp-services"
                  className="relative tracking-tight text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3 cursor-pointer font-semibold flex items-center gap-2 z-10"
                >
                  Schedule Consultation
                  <Image
                    src="/navbar/btn_icon.png"
                    alt="Arrow"
                    width={20}
                    height={20}
                    className="transition-all duration-700 ease-in-out brightness-0 invert group-hover:brightness-0 group-hover:invert w-5 h-5 rotate-90"
                  />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Right Column: Interactive Enterprise MCP Gateway Architecture Visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full max-w-full lg:max-w-[48%] relative"
          >
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 via-orange-300/10 to-indigo-400/20 rounded-3xl blur-3xl" />

            {/* Main Software Architecture Card */}
            <div className="relative z-10 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden">
              {/* Card Top Title Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
                    ENTERPRISE MCP GATEWAY // ONLINE
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                  v1.4.0 (JSON-RPC)
                </span>
              </div>

              {/* ── TOP: AI Clients & Assistants ── */}
              <div className="mb-6">
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400 block mb-2">
                  AI ASSISTANTS & AUTONOMOUS AGENTS
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5 flex items-center gap-2 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#D27E2B]" />
                    <span className="text-xs font-extrabold truncate">Claude Desktop</span>
                  </div>
                  <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5 flex items-center gap-2 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-extrabold truncate">OpenAI Agents</span>
                  </div>
                  <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5 flex items-center gap-2 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-xs font-extrabold truncate">Custom LLM</span>
                  </div>
                </div>
              </div>

              {/* ── MIDDLE: Central Custom MCP Server Gateway Hub ── */}
              <div className="relative py-5 px-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/15 to-amber-500/10 border border-[#D27E2B]/40 shadow-inner mb-6 text-center">
                <div className="absolute inset-0 bg-[#D27E2B]/5 animate-pulse rounded-2xl pointer-events-none" />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 rounded-xl bg-[#D27E2B] text-white flex items-center justify-center shadow-md">
                      <LuServer className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">Custom MCP Server</h4>
                      <p className="text-[11px] text-amber-200/80 font-medium">
                        Zero-Trust Security • OAuth2 • Tool Calling
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-[#D27E2B]/20 text-[#D27E2B] border border-[#D27E2B]/40 px-2.5 py-1 rounded-full">
                    <LuZap className="w-3 h-3" />
                    Active Gateway
                  </span>
                </div>
              </div>

              {/* ── BOTTOM: Connected Enterprise Systems ── */}
              <div>
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400 block mb-2">
                  ENTERPRISE DATA & SYSTEM INTEGRATIONS
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-blue-400 text-[11px] font-bold">
                      <LuDatabase className="w-3.5 h-3.5" />
                      Postgres DB
                    </div>
                    <span className="text-[10px] text-slate-400">SQL Queries</span>
                  </div>

                  <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-orange-400 text-[11px] font-bold">
                      <LuLayers className="w-3.5 h-3.5" />
                      SAP ERP
                    </div>
                    <span className="text-[10px] text-slate-400">Invoices & Ops</span>
                  </div>

                  <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold">
                      <LuGlobe className="w-3.5 h-3.5" />
                      Salesforce
                    </div>
                    <span className="text-[10px] text-slate-400">CRM Records</span>
                  </div>

                  <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-purple-400 text-[11px] font-bold">
                      <LuWorkflow className="w-3.5 h-3.5" />
                      Custom APIs
                    </div>
                    <span className="text-[10px] text-slate-400">REST / Webhooks</span>
                  </div>
                </div>
              </div>

              {/* Security Banner Footer */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <LuShieldCheck className="w-4 h-4" />
                  Role-Based Access Control (RBAC)
                </span>
                <span className="hidden sm:inline text-slate-500 font-mono">
                  TLS 1.3 Encrypted
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Row>
    </Section>
  );
}
