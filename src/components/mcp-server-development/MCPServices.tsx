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

const MCP_SERVICES = [
  {
    icon: LuServer,
    title: "Custom MCP Server Development",
    description:
      "Design and build custom Model Context Protocol servers tailored to your business workflows, APIs, and enterprise software ecosystem.",
    highlights: ["Custom JSON-RPC Schema", "Tailored API Wrappers", "Python & TypeScript SDKs"],
    accent: "#D27E2B",
  },
  {
    icon: LuLayers,
    title: "Enterprise Tool Integration",
    description:
      "Connect AI assistants with CRMs, ERPs, databases, SaaS platforms, and internal applications using secure MCP implementations.",
    highlights: ["Salesforce & SAP Integrations", "Database Connectors", "Legacy System Bridges"],
    accent: "#3B82F6",
  },
  {
    icon: LuLock,
    title: "Secure Authentication & Access",
    description:
      "Implement OAuth, API keys, role-based access control, and permission validation to protect enterprise resources.",
    highlights: ["OAuth2 & OIDC Auth", "RBAC Access Controls", "Zero-Trust Data Governance"],
    accent: "#10B981",
  },
  {
    icon: LuWorkflow,
    title: "API & Workflow Orchestration",
    description:
      "Develop intelligent MCP services that coordinate API calls, automate workflows, and streamline business operations.",
    highlights: ["Multi-Step Tool Calling", "Automated Error Handling", "Real-Time Telemetry"],
    accent: "#8B5CF6",
  },
  {
    icon: LuCpu,
    title: "Multi-Agent MCP Infrastructure",
    description:
      "Enable multiple AI agents to securely discover, access, and collaborate through standardized MCP-based communication.",
    highlights: ["Agent Service Discovery", "Inter-Agent Protocol", "Context Routing"],
    accent: "#EC4899",
  },
  {
    icon: LuShieldCheck,
    title: "Deployment & Enterprise Support",
    description:
      "Deploy production-ready MCP servers with monitoring, scaling, version management, and long-term technical support.",
    highlights: ["Containerized Deployments", "CI/CD Pipeline Setup", "24/7 SLA & Maintenance"],
    accent: "#F59E0B",
  },
];

export default function MCPServices() {
  return (
    <Section id="mcp-services" className="py-20 lg:py-28 relative overflow-hidden bg-white text-slate-900">
      {/* Light Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-orange-100/40 via-indigo-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      <Row>
        {/* Section Header */}
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center gap-3 relative z-10"
        >
          <SectionBadge title="OUR MCP SERVICES" />

          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold leading-tight tracking-tight text-[#0F172A]">
            Enterprise MCP <span className="text-[#D27E2B]">Development Services</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            We build secure, scalable, and standards-compliant MCP servers that
            enable AI applications to communicate with enterprise systems, internal
            tools, and business data through reliable software integrations.
          </p>
        </motion.div>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {MCP_SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                {...fadeUp(0.1 + idx * 0.05)}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-slate-50/70 border border-slate-200/90 rounded-3xl p-7 shadow-xs hover:shadow-md hover:border-[#D27E2B]/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Accent Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: service.accent }}
                />

                <div>
                  {/* Icon Header */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xs border transition-all group-hover:scale-110"
                    style={{
                      backgroundColor: `${service.accent}15`,
                      borderColor: `${service.accent}30`,
                      color: service.accent,
                    }}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-black text-[#0F172A] mb-3 tracking-tight group-hover:text-[#D27E2B] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-4 border-t border-slate-200/60">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2.5">
                    KEY CAPABILITIES
                  </span>
                  <div className="flex flex-col gap-2">
                    {service.highlights.map((item, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-center gap-2 text-xs font-bold text-slate-700"
                      >
                        <LuCircleCheck
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: service.accent }}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Row>
    </Section>
  );
}
