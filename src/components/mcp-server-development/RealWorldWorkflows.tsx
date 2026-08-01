"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuHeadphones,
  LuCode,
  LuTrendingUp,
  LuReceipt,
  LuServer,
  LuCheck,
  LuZap,
  LuShieldCheck,
  LuUserCheck,
  LuDatabase,
  LuMail,
  LuGitPullRequest,
  LuMessageSquare,
  LuFileText,
  LuSparkles,
  LuArrowRight,
  LuPlay,
  LuPause,
} from "react-icons/lu";
import Section from "@/components/Section";
import Row from "@/components/Row";
import SectionBadge from "../new-home-components/SectionBadge";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

interface WorkflowStep {
  stepNumber: string;
  title: string;
  description: string;
  schemaTag: string;
  icon: React.ElementType;
}

interface WorkflowItem {
  id: string;
  tabLabel: string;
  tabIcon: React.ElementType;
  workflowTitle: string;
  subtitle: string;
  categoryBadge: string;
  color: string;
  steps: WorkflowStep[];
}

const WORKFLOW_LIBRARY: WorkflowItem[] = [
  {
    id: "customer-support",
    tabLabel: "Customer Support",
    tabIcon: LuHeadphones,
    workflowTitle: "Enterprise Customer Support Workflow",
    subtitle:
      "Automate complex customer inquiries by connecting AI assistants with your CRM, order management, and ticketing systems.",
    categoryBadge: "SUPPORT & HELPDESK",
    color: "#D27E2B",
    steps: [
      {
        stepNumber: "01",
        title: "Customer Support Request",
        description:
          "Customer submits a support request through chat, email, or a support portal.",
        schemaTag: "inbound.request",
        icon: LuMessageSquare,
      },
      {
        stepNumber: "02",
        title: "Retrieve CRM Profile",
        description:
          "Access customer profile, account information, and interaction history.",
        schemaTag: "mcp:crm.get_user",
        icon: LuUserCheck,
      },
      {
        stepNumber: "03",
        title: "Retrieve Order History",
        description:
          "Fetch recent orders, shipment status, invoices, and purchase records.",
        schemaTag: "mcp:erp.get_orders",
        icon: LuDatabase,
      },
      {
        stepNumber: "04",
        title: "Generate AI Response",
        description:
          "Create a context-aware response using business data retrieved through MCP tools.",
        schemaTag: "ai.synthesize",
        icon: LuSparkles,
      },
      {
        stepNumber: "05",
        title: "Update CRM Activity",
        description:
          "Record conversation details and customer interaction in the CRM.",
        schemaTag: "mcp:crm.log_activity",
        icon: LuFileText,
      },
      {
        stepNumber: "06",
        title: "Notify Customer",
        description:
          "Deliver the response through email, chat, or customer support channels.",
        schemaTag: "outbound.notify",
        icon: LuMail,
      },
    ],
  },
  {
    id: "software-development",
    tabLabel: "Software Development",
    tabIcon: LuCode,
    workflowTitle: "Software Development Workflow",
    subtitle:
      "Streamline code reviews, pull request audits, and developer collaboration via automated MCP repository bridges.",
    categoryBadge: "DEV & CI/CD",
    color: "#3B82F6",
    steps: [
      {
        stepNumber: "01",
        title: "Read Repository",
        description:
          "Retrieve repository metadata, changed files, and project structure.",
        schemaTag: "mcp:git.read_repo",
        icon: LuCode,
      },
      {
        stepNumber: "02",
        title: "Analyze Code Changes",
        description:
          "Review source code to identify issues, improvements, and potential risks.",
        schemaTag: "ai.code_analysis",
        icon: LuFileText,
      },
      {
        stepNumber: "03",
        title: "Generate Review Suggestions",
        description:
          "Create contextual recommendations based on coding standards and project rules.",
        schemaTag: "ai.suggest_fixes",
        icon: LuSparkles,
      },
      {
        stepNumber: "04",
        title: "Publish Review Comments",
        description:
          "Post review feedback directly to the pull request.",
        schemaTag: "mcp:git.post_comment",
        icon: LuGitPullRequest,
      },
      {
        stepNumber: "05",
        title: "Notify Development Team",
        description:
          "Send review completion notifications through Slack or Microsoft Teams.",
        schemaTag: "mcp:slack.send_msg",
        icon: LuMail,
      },
    ],
  },
  {
    id: "sales-operations",
    tabLabel: "Sales Operations",
    tabIcon: LuTrendingUp,
    workflowTitle: "Sales Operations & Lead Automation",
    subtitle:
      "Accelerate pipeline velocity by enriching incoming leads and syncing intelligence across CRMs and messaging tools.",
    categoryBadge: "SALES & REVENUE",
    color: "#10B981",
    steps: [
      {
        stepNumber: "01",
        title: "New Lead Captured",
        description:
          "Identify incoming lead from web forms, campaigns, or outbound inquiries.",
        schemaTag: "lead.ingest",
        icon: LuUserCheck,
      },
      {
        stepNumber: "02",
        title: "Retrieve CRM Context",
        description:
          "Pull account history, domain records, and existing opportunity details.",
        schemaTag: "mcp:crm.get_account",
        icon: LuDatabase,
      },
      {
        stepNumber: "03",
        title: "Enrich Company Data",
        description:
          "Fetch firmographic data, technographics, and revenue metrics via API.",
        schemaTag: "mcp:clearbit.enrich",
        icon: LuZap,
      },
      {
        stepNumber: "04",
        title: "Generate Sales Summary",
        description:
          "Synthesize lead background and generate tailored battlecards for account executives.",
        schemaTag: "ai.sales_battlecard",
        icon: LuSparkles,
      },
      {
        stepNumber: "05",
        title: "Assign Lead Owner",
        description:
          "Route lead to the optimal regional sales rep based on territory rules.",
        schemaTag: "mcp:crm.assign_owner",
        icon: LuUserCheck,
      },
      {
        stepNumber: "06",
        title: "Create Follow-up Tasks",
        description:
          "Schedule automated CRM tasks, calendar invites, and follow-up sequences.",
        schemaTag: "mcp:crm.schedule_task",
        icon: LuMail,
      },
    ],
  },
  {
    id: "finance",
    tabLabel: "Finance",
    tabIcon: LuReceipt,
    workflowTitle: "Automated Financial & Invoice Processing",
    subtitle:
      "Eliminate manual data entry by extracting invoice data, validating ERP records, and executing approval workflows.",
    categoryBadge: "FINANCE & ERP",
    color: "#8B5CF6",
    steps: [
      {
        stepNumber: "01",
        title: "Invoice Received",
        description:
          "Ingest incoming digital invoices, receipts, and vendor statements.",
        schemaTag: "invoice.ingest",
        icon: LuReceipt,
      },
      {
        stepNumber: "02",
        title: "Extract Structured Data",
        description:
          "Parse line items, totals, tax IDs, and payment terms using OCR & AI.",
        schemaTag: "ai.ocr_extract",
        icon: LuFileText,
      },
      {
        stepNumber: "03",
        title: "Validate ERP Records",
        description:
          "Cross-reference purchase orders and vendor profiles inside ERP system.",
        schemaTag: "mcp:sap.verify_po",
        icon: LuDatabase,
      },
      {
        stepNumber: "04",
        title: "Execute Approval Flow",
        description:
          "Route invoice through departmental approval thresholds and policies.",
        schemaTag: "mcp:approval.route",
        icon: LuShieldCheck,
      },
      {
        stepNumber: "05",
        title: "Post Transaction & Notify",
        description:
          "Log ledger entries, queue payment schedules, and notify finance team.",
        schemaTag: "mcp:erp.post_ledger",
        icon: LuCheck,
      },
    ],
  },
  {
    id: "it-operations",
    tabLabel: "IT Operations",
    tabIcon: LuServer,
    workflowTitle: "IT Service & Incident Automation",
    subtitle:
      "Automate internal IT requests, access provisioning, and system diagnostics with zero human latency.",
    categoryBadge: "IT & INFRASTRUCTURE",
    color: "#EC4899",
    steps: [
      {
        stepNumber: "01",
        title: "Service Request Submitted",
        description:
          "Receive IT incident report, access request, or infrastructure alert.",
        schemaTag: "itsm.request",
        icon: LuServer,
      },
      {
        stepNumber: "02",
        title: "Verify Identity & Permissions",
        description:
          "Validate employee identity, SSO status, and security clearance level.",
        schemaTag: "mcp:sso.auth_check",
        icon: LuUserCheck,
      },
      {
        stepNumber: "03",
        title: "Search Knowledge Base",
        description:
          "Query internal docs and diagnostic logs to determine resolution path.",
        schemaTag: "mcp:rag.search_docs",
        icon: LuDatabase,
      },
      {
        stepNumber: "04",
        title: "Execute Automation Script",
        description:
          "Trigger automated password resets, policy updates, or resource provisioning.",
        schemaTag: "mcp:ops.execute_script",
        icon: LuZap,
      },
      {
        stepNumber: "05",
        title: "Create Ticket & Notify",
        description:
          "Update ITSM dashboard, log audit history, and notify assigned engineer.",
        schemaTag: "mcp:jira.update_ticket",
        icon: LuFileText,
      },
    ],
  },
];

export default function RealWorldWorkflows() {
  const [activeTabId, setActiveTabId] = useState<string>("customer-support");
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(0);
  // Whether the pipeline is auto-advancing on its own vs. paused by user interaction
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const activeWorkflow =
    WORKFLOW_LIBRARY.find((w) => w.id === activeTabId) || WORKFLOW_LIBRARY[0];

  // Reset to step 1 and resume auto-play whenever the workflow tab changes
  useEffect(() => {
    setActiveStepIndex(0);
    setIsAutoPlaying(true);
  }, [activeTabId]);

  // Auto-cycle step highlight animation — only runs while isAutoPlaying is true,
  // so a user click/hover reliably "sticks" instead of being overwritten a moment later
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % activeWorkflow.steps.length;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, [isAutoPlaying, activeTabId, activeWorkflow.steps.length]);

  // User picked a step manually: show it immediately and pause auto-play so the
  // selection doesn't get overridden a second later. Auto-play resumes after a
  // short idle period so the demo keeps cycling if the user walks away.
  const handleStepSelect = (idx: number) => {
    setActiveStepIndex(idx);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (isAutoPlaying) return;
    const resumeTimer = setTimeout(() => setIsAutoPlaying(true), 6000);
    return () => clearTimeout(resumeTimer);
  }, [isAutoPlaying, activeStepIndex]);

  return (
    <Section
      id="mcp-workflows"
      className="py-20 lg:py-28 relative overflow-hidden bg-slate-50/80 text-slate-900 border-t border-slate-200/80"
    >
      {/* Soft Radial Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-orange-100/30 via-amber-50/20 to-indigo-50/20 rounded-full blur-3xl pointer-events-none" />

      <Row>
        {/* Section Header */}
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-12 max-w-3xl mx-auto flex flex-col items-center gap-3 relative z-10"
        >
          <SectionBadge title="REAL MCP WORKFLOWS" />

          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold leading-tight tracking-tight text-[#0F172A]">
            Real Enterprise Workflows <br />
            <span className="text-[#D27E2B]">Powered by Custom MCP Servers</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            Explore how custom Model Context Protocol (MCP) servers enable AI applications to securely retrieve business data, invoke enterprise tools, execute multi-step workflows, and return contextual responses across your software ecosystem.
          </p>
        </motion.div>

        {/* ── CATEGORY TABS ── */}
        <motion.div
          {...fadeUp(0.1)}
          className="flex flex-wrap justify-center items-center gap-2 mb-14 relative z-10 p-2 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 max-w-4xl mx-auto shadow-xs"
        >
          {WORKFLOW_LIBRARY.map((item) => {
            const Icon = item.tabIcon;
            const isActive = activeTabId === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTabId(item.id);
                  setActiveStepIndex(0);
                  setIsAutoPlaying(true);
                }}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#0F172A] text-white shadow-md scale-[1.02]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <Icon
                  className="w-4 h-4"
                  style={{ color: isActive ? "#D27E2B" : item.color }}
                />
                <span>{item.tabLabel}</span>
              </button>
            );
          })}
        </motion.div>

        {/* ── HORIZONTAL GEAR FLOW PIPELINE ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeWorkflow.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10  mx-auto"
          >
            {/* Title & Subtitle Banner */}
            <div className="text-center mb-12">
              <span
                className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border inline-block mb-3"
                style={{
                  backgroundColor: `${activeWorkflow.color}12`,
                  borderColor: `${activeWorkflow.color}30`,
                  color: activeWorkflow.color,
                }}
              >
                {activeWorkflow.categoryBadge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] mb-2 tracking-tight">
                {activeWorkflow.workflowTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto leading-relaxed">
                {activeWorkflow.subtitle}
              </p>

              {/* Autoplay status / manual control — makes it clear the pipeline is
                  interactive, and confirms to the user that their click registered */}
              <button
                onClick={() => setIsAutoPlaying((p) => !p)}
                className="mt-4 inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border cursor-pointer transition-colors"
                style={{
                  backgroundColor: isAutoPlaying ? `${activeWorkflow.color}10` : "#f1f5f9",
                  borderColor: isAutoPlaying ? `${activeWorkflow.color}30` : "#cbd5e1",
                  color: isAutoPlaying ? activeWorkflow.color : "#475569",
                }}
                title={isAutoPlaying ? "Pause auto-play" : "Resume auto-play"}
              >
                {isAutoPlaying ? (
                  <>
                    <LuPause className="w-3 h-3" />
                    Auto-playing — click any step to pause
                  </>
                ) : (
                  <>
                    <LuPlay className="w-3 h-3" />
                    Paused on your selection — click to resume
                  </>
                )}
              </button>
            </div>

            {/* ── 📱 TABLET & MOBILE VIEW (< 1280px / < xl): CLEAN VERTICAL TIMELINE ── */}
            <div className="xl:hidden relative max-w-2xl mx-auto px-2">
              {/* Vertical Step Rows */}
              <div className="flex flex-col gap-6 relative z-10">
                {activeWorkflow.steps.map((step, idx) => {
                  const isActive = activeStepIndex === idx;
                  const isCompleted = activeStepIndex !== null && idx <= activeStepIndex;
                  const isLineFilled = activeStepIndex !== null && idx < activeStepIndex;
                  const isLast = idx === activeWorkflow.steps.length - 1;
                  const StepIcon = step.icon;

                  return (
                    <div key={idx} className="flex items-stretch gap-4 relative">
                      {/* Left Column: Mini Gear Node + Connecting Line Segment */}
                      <div className="flex flex-col items-center shrink-0 w-12">
                        {/* Mini Gear Node */}
                        <div
                          onClick={() => handleStepSelect(idx)}
                          className="relative shrink-0 w-12 h-12 flex items-center justify-center z-10 cursor-pointer transition-transform duration-200 hover:scale-110"
                          title={`View step ${step.stepNumber}: ${step.title}`}
                        >
                          <motion.div
                            animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                            transition={
                              isActive
                                ? { repeat: Infinity, duration: 6, ease: "linear" }
                                : { duration: 0.4 }
                            }
                            className="absolute inset-0"
                          >
                            <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm">
                              {/* Gear Teeth */}
                              <g fill={isActive || isCompleted ? activeWorkflow.color : "#94a3b8"}>
                                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                                  <rect
                                    key={deg}
                                    x="52"
                                    y="4"
                                    width="16"
                                    height="16"
                                    rx="3"
                                    transform={`rotate(${deg} 60 60)`}
                                  />
                                ))}
                                <circle cx="60" cy="60" r="44" />
                              </g>
                              <circle
                                cx="60"
                                cy="60"
                                r="30"
                                fill={isActive ? "#0F172A" : isCompleted ? "#ffffff" : "#f8fafc"}
                                stroke={isActive || isCompleted ? activeWorkflow.color : "#cbd5e1"}
                                strokeWidth="3"
                              />
                            </svg>
                          </motion.div>

                          <StepIcon
                            className="w-5 h-5 z-10 transition-colors duration-300"
                            style={{ color: isActive || isCompleted ? activeWorkflow.color : "#64748b" }}
                          />
                        </div>

                        {/* Inter-Gear Vertical Line Segment to Next Gear */}
                        {!isLast && (
                          <div className="w-1 flex-1 my-1 rounded-full overflow-hidden bg-slate-200">
                            <motion.div
                              initial={{ height: "0%" }}
                              animate={{ height: isLineFilled ? "100%" : "0%" }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                              className="w-full h-full rounded-full"
                              style={{
                                backgroundColor: activeWorkflow.color,
                                boxShadow: isLineFilled ? `0 0 10px ${activeWorkflow.color}` : "none",
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Right Step Content Card */}
                      <motion.div
                        onClick={() => handleStepSelect(idx)}
                        whileHover={{ scale: 1.01 }}
                        className={`flex-1 cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all duration-300 ${
                          isActive
                            ? "bg-white shadow-xl"
                            : isCompleted
                            ? "bg-slate-50/90 border-slate-200 opacity-90"
                            : "bg-white/90 border-slate-200 shadow-xs"
                        }`}
                        style={{
                          borderColor: isActive ? activeWorkflow.color : undefined,
                          boxShadow: isActive
                            ? `0 12px 30px -5px ${activeWorkflow.color}25`
                            : undefined,
                        }}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                            style={{
                              backgroundColor: `${activeWorkflow.color}12`,
                              borderColor: `${activeWorkflow.color}30`,
                              color: activeWorkflow.color,
                            }}
                          >
                            STEP {step.stepNumber}
                          </span>

                          {(isActive || isCompleted) && (
                            <span
                              className="text-[10px] font-mono font-bold flex items-center gap-1 px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `${activeWorkflow.color}15`,
                                color: activeWorkflow.color,
                              }}
                            >
                              {isActive ? (
                                <motion.span
                                  animate={{ opacity: [1, 0.3, 1] }}
                                  transition={{ repeat: Infinity, duration: 1.2 }}
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: activeWorkflow.color }}
                                />
                              ) : (
                                <LuCheck className="w-3 h-3" />
                              )}
                              {isActive ? "IN PROGRESS" : "DONE"}
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm sm:text-base font-extrabold text-[#0F172A] mb-1 leading-snug">
                          {step.title}
                        </h4>

                        <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
                          {step.description}
                        </p>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {step.schemaTag}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── 💻 DESKTOP VIEW (>= 1280px / xl+): HORIZONTAL PIPELINE TRACK ── */}
            <div className="hidden xl:block relative pt-4">
              
              {/* Continuous Center-to-Center Progress Track (Desktop XL) */}
              <div
                className="absolute top-[72px] -translate-y-1/2 h-1.5 bg-slate-200/90 rounded-full z-0 overflow-hidden"
                style={{
                  left: activeWorkflow.steps.length === 6 ? "8.33%" : "10%",
                  right: activeWorkflow.steps.length === 6 ? "8.33%" : "10%",
                }}
              >
                {/* Active Glowing Progress Fill */}
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${
                      (Math.max(0, activeStepIndex ?? 0) /
                        (activeWorkflow.steps.length - 1)) *
                      100
                    }%`,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: activeWorkflow.color,
                    boxShadow: `0 0 12px ${activeWorkflow.color}`,
                  }}
                />
              </div>

              {/* HORIZONTAL STEPS GRID (Left-to-Right Flow) */}
              <div
                className={`grid ${
                  activeWorkflow.steps.length === 6
                    ? "grid-cols-6"
                    : "grid-cols-5"
                } gap-5 relative z-10`}
              >
                {activeWorkflow.steps.map((step, idx) => {
                  const isActive = activeStepIndex === idx;
                  const isCompleted = activeStepIndex !== null && idx <= activeStepIndex;
                  const StepIcon = step.icon;

                  return (
                    <div
                      key={idx}
                      className="relative flex flex-col items-center group"
                    >

                      {/* 1. TOP GEAR NODE */}
                      <div
                        onClick={() => handleStepSelect(idx)}
                        title={`View step ${step.stepNumber}: ${step.title}`}
                        className="relative shrink-0 w-28 h-28 flex items-center justify-center mb-4 z-10 cursor-pointer transition-transform duration-200 group-hover:scale-105"
                      >
                        <motion.div
                          animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                          transition={
                            isActive
                              ? { repeat: Infinity, duration: 6, ease: "linear" }
                              : { duration: 0.4 }
                          }
                          className="absolute inset-0"
                        >
                          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
                            <defs>
                              <radialGradient id={`h-gear-fill-desktop-${idx}`} cx="50%" cy="50%" r="50%">
                                <stop
                                  offset="0%"
                                  stopColor={isActive || isCompleted ? activeWorkflow.color : "#94a3b8"}
                                />
                                <stop
                                  offset="100%"
                                  stopColor={isActive || isCompleted ? activeWorkflow.color : "#64748b"}
                                />
                              </radialGradient>
                            </defs>

                            {/* 10 Blocky Mechanical Gear Teeth */}
                            <g fill={`url(#h-gear-fill-desktop-${idx})`}>
                              {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
                                <rect
                                  key={deg}
                                  x="52"
                                  y="4"
                                  width="16"
                                  height="16"
                                  rx="3"
                                  transform={`rotate(${deg} 60 60)`}
                                />
                              ))}
                              {/* Outer Gear Hub */}
                              <circle cx="60" cy="60" r="44" />
                            </g>

                            {/* Inner Core Hub */}
                            <circle
                              cx="60"
                              cy="60"
                              r="30"
                              fill={isActive ? "#0F172A" : isCompleted ? "#ffffff" : "#f8fafc"}
                              stroke={isActive || isCompleted ? activeWorkflow.color : "#cbd5e1"}
                              strokeWidth="3"
                              style={{ transition: "fill 0.4s, stroke 0.4s" }}
                            />

                            {/* Inner Ring Detail */}
                            <circle
                              cx="60"
                              cy="60"
                              r="23"
                              fill="none"
                              stroke={isActive || isCompleted ? `${activeWorkflow.color}70` : "#e2e8f0"}
                              strokeWidth="1.5"
                              strokeDasharray="4 4"
                            />
                          </svg>
                        </motion.div>

                        {/* Center Icon & Step Number */}
                        <div
                          className="relative z-10 flex flex-col items-center justify-center cursor-pointer"
                          onClick={() => handleStepSelect(idx)}
                        >
                          <StepIcon
                            className="w-6 h-6 mb-0.5 transition-colors duration-300"
                            style={{ color: isActive || isCompleted ? activeWorkflow.color : "#94a3b8" }}
                          />
                          <span
                            className="text-xs font-black font-mono tracking-wider transition-colors duration-300"
                            style={{ color: isActive || isCompleted ? activeWorkflow.color : "#94a3b8" }}
                          >
                            {step.stepNumber}
                          </span>
                        </div>
                      </div>

                      {/* 2. VERTICAL CONNECTOR ROD (Linking Gear to Card below) */}
                      <div
                        className="w-1 h-5 mb-2 rounded-full transition-colors duration-300"
                        style={{
                          backgroundColor: isActive || isCompleted ? activeWorkflow.color : "#cbd5e1",
                        }}
                      />

                      {/* 3. STEP CONTENT CARD (Positioned below Gear) */}
                      <motion.div
                        onClick={() => handleStepSelect(idx)}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        className={`w-full cursor-pointer rounded-2xl border p-5 transition-all duration-300 flex flex-col justify-between flex-1 relative ${
                          isActive
                            ? "bg-white shadow-xl"
                            : isCompleted
                            ? "bg-slate-50/90 border-slate-200 opacity-80"
                            : "bg-white/90 border-slate-200 hover:border-slate-300 hover:shadow-md shadow-xs"
                        }`}
                        style={{
                          borderColor: isActive ? activeWorkflow.color : undefined,
                          boxShadow: isActive
                            ? `0 14px 35px -8px ${activeWorkflow.color}25`
                            : undefined,
                        }}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span
                              className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                              style={{
                                backgroundColor: `${activeWorkflow.color}12`,
                                borderColor: `${activeWorkflow.color}30`,
                                color: activeWorkflow.color,
                              }}
                            >
                              STEP {step.stepNumber}
                            </span>

                            {(isActive || isCompleted) && (
                              <span
                                className="text-[10px] font-mono font-bold flex items-center gap-1 px-2 py-0.5 rounded-full"
                                style={{
                                  backgroundColor: `${activeWorkflow.color}15`,
                                  color: activeWorkflow.color,
                                }}
                              >
                                {isActive ? (
                                  <motion.span
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.2 }}
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: activeWorkflow.color }}
                                  />
                                ) : (
                                  <LuCheck className="w-3 h-3" />
                                )}
                                {isActive ? "IN PROGRESS" : "DONE"}
                              </span>
                            )}
                          </div>

                          <h4 className="text-sm sm:text-base font-extrabold text-[#0F172A] mb-1.5 leading-snug">
                            {step.title}
                          </h4>

                          <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
                            {step.description}
                          </p>
                        </div>

                        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded truncate max-w-[140px]">
                            {step.schemaTag}
                          </span>
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: activeWorkflow.color }}
                          />
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Assurance Bar */}
            <div className="mt-14 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                  className="w-2.5 h-2.5 rounded-full bg-emerald-500"
                />
                <span className="font-bold text-slate-700">
                  Automated Sequential MCP Execution Pipeline
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {["Zero Manual Overhead", "Encrypted Credentials", "Real-Time Telemetry"].map(
                  (item) => (
                    <span
                      key={item}
                      className="flex items-center gap-1 text-slate-600 font-semibold"
                    >
                      <LuCheck className="w-3.5 h-3.5 text-emerald-500" /> {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Row>
    </Section>
  );
}