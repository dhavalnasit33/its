"use client";

import React, { useState, useRef, useLayoutEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuBot,
  LuCpu,
  LuSearch,
  LuWorkflow,
  LuZap,
  LuShieldCheck,
  LuSend,
  LuCircleCheck,
  LuSparkles,
  LuActivity,
  LuChevronDown,
  LuChevronRight,
} from "react-icons/lu";
import Section from "../Section";
import Row from "../Row";
import SectionBadge from "../new-home-components/SectionBadge";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

// 6 Specialized AI Agents in the Mission Control Hierarchy
const AGENT_ROLES = [
  {
    id: "coordinator",
    role: "Coordinator Agent",
    tagline: "Master Router & Task Allocator",
    level: "top",
    icon: LuCpu,
    badgeBg: "bg-orange-500/15 text-[#D27E2B] border-[#D27E2B]/40",
    accentColor: "#D27E2B",
    description:
      "Acts as the team leader. Analyzes high-level business goals, decomposes them into sub-tasks, and delegates responsibilities to specialized agents.",
    tools: ["OpenAI Agents SDK", "Goal Router", "State Store"],
    action: "Assigned 4 Sub-tasks • Routing Workflow Stream",
    status: "Active Orchestrator",
  },
  {
    id: "research",
    role: "Research Agent",
    tagline: "Data Discovery & Fact Extraction",
    level: "middle-left",
    icon: LuSearch,
    badgeBg: "bg-blue-500/15 text-blue-400 border-blue-500/40",
    accentColor: "#3B82F6",
    description:
      "Ingests structured and unstructured data, queries vector databases, extracts relevant context, and verifies factual data accuracy.",
    tools: ["Vector DB", "Web Crawler", "RAG Pipeline"],
    action: "Scraped 1,420 Records • Ingested Fact Context",
    status: "Data Ready",
  },
  {
    id: "planning",
    role: "Planning Agent",
    tagline: "Strategic Sequencer",
    level: "middle-center",
    icon: LuWorkflow,
    badgeBg: "bg-purple-500/15 text-purple-400 border-purple-500/40",
    accentColor: "#8B5CF6",
    description:
      "Builds a deterministic, step-by-step execution roadmap. Evaluates alternative pathways, sets priority queues, and manages fallback logic.",
    tools: ["LangGraph", "Tree-of-Thought", "Plan Cache"],
    action: "Sequenced 6 Steps • Optimized Dependency Path",
    status: "Plan Verified",
  },
  {
    id: "execution",
    role: "Execution Agent",
    tagline: "API & Tool Operator",
    level: "middle-right",
    icon: LuZap,
    badgeBg: "bg-amber-500/15 text-amber-400 border-amber-500/40",
    accentColor: "#F59E0B",
    description:
      "Connects to enterprise software via Model Context Protocol (MCP). Invokes REST APIs, executes SQL queries, and runs external software tools.",
    tools: ["MCP Protocol", "Salesforce API", "SAP Connector"],
    action: "Updated CRM Leads • Dispatched SAP Invoices",
    status: "Tool Execution Complete",
  },
  {
    id: "quality",
    role: "Quality Review Agent",
    tagline: "Compliance & Safety Guard",
    level: "lower-middle",
    icon: LuShieldCheck,
    badgeBg: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
    accentColor: "#10B981",
    description:
      "Validates agent output against enterprise compliance rules, schema structures, and security policies before releasing final artifacts.",
    tools: ["JSON Schema Validator", "Audit Logger", "HITL Gate"],
    action: "Validated 100% Compliance • Zero Violations",
    status: "Passed Guardrails",
  },
  {
    id: "delivery",
    role: "Delivery Agent",
    tagline: "Output Dispatch & Notification",
    level: "bottom",
    icon: LuSend,
    badgeBg: "bg-cyan-500/15 text-cyan-400 border-cyan-500/40",
    accentColor: "#06B6D4",
    description:
      "Formats final outputs into polished reports, notifies team members via Slack/Email, and records completed events in enterprise audit logs.",
    tools: ["Slack Bot", "Gmail Dispatcher", "Audit Store"],
    action: "Sent Executive Report • Notified 12 Stakeholders",
    status: "Delivery Confirmed",
  },
];

type Point = { x: number; y: number };
type CanvasPoints = {
  coordinatorBottom: Point;
  researchTop: Point;
  researchBottom: Point;
  planningTop: Point;
  planningBottom: Point;
  executionTop: Point;
  executionBottom: Point;
  qualityTop: Point;
  qualityBottom: Point;
  deliveryTop: Point;
} | null;

export default function MultiAgentCollaboration() {
  const [activeAgentId, setActiveAgentId] = useState("coordinator");
  const panelRef = React.useRef<HTMLDivElement>(null);

  const activeAgent = AGENT_ROLES.find((a) => a.id === activeAgentId) || AGENT_ROLES[0];

  const coordinator = AGENT_ROLES[0];
  const research = AGENT_ROLES[1];
  const planning = AGENT_ROLES[2];
  const execution = AGENT_ROLES[3];
  const quality = AGENT_ROLES[4];
  const delivery = AGENT_ROLES[5];

  // ── Circuit Canvas connector measurement ──
  // Instead of faking the bus lines with fixed-percentage CSS (which drifts out
  // of alignment whenever the cards reflow/wrap), we measure the real on-screen
  // position of each socket dot and draw the connectors as an SVG overlay sized
  // to those exact coordinates. This keeps every line perfectly attached to its
  // node regardless of viewport width, font loading, or content length.
  const canvasRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [points, setPoints] = useState<CanvasPoints>(null);

  const setDotRef = (key: string) => (el: HTMLDivElement | null) => {
    dotRefs.current[key] = el;
  };

  const measure = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasRect = canvas.getBoundingClientRect();

    const center = (key: string): Point | null => {
      const el = dotRefs.current[key];
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - canvasRect.left,
        y: r.top + r.height / 2 - canvasRect.top,
      };
    };

    const keys = [
      "coordinatorBottom",
      "researchTop",
      "researchBottom",
      "planningTop",
      "planningBottom",
      "executionTop",
      "executionBottom",
      "qualityTop",
      "qualityBottom",
      "deliveryTop",
    ] as const;

    const next: Record<string, Point> = {};
    for (const key of keys) {
      const p = center(key);
      if (!p) return; // bail if layout isn't ready yet; try again next tick
      next[key] = p;
    }
    setPoints(next as unknown as CanvasPoints);
  }, []);

  useLayoutEffect(() => {
    // Measure after paint, then again on the next frame to catch any
    // font/webfont-driven reflow, and whenever the canvas resizes.
    measure();
    const raf = requestAnimationFrame(measure);

    const ro = new ResizeObserver(() => measure());
    if (canvasRef.current) ro.observe(canvasRef.current);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, [measure]);

  const handleAgentSelect = (id: string) => {
    setActiveAgentId(id);
    if (typeof window !== "undefined" && window.innerWidth < 1024 && panelRef.current) {
      const yOffset = -90; // Offset for sticky navbar header
      const y = panelRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <Section className="py-20 lg:py-28 relative overflow-hidden bg-[#0d1b2a] text-white">
      {/* Background Radial Light Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#D27E2B]/10 via-purple-600/10 to-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <Row>
        {/* Section Header */}
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center gap-3 relative z-10"
        >
          <SectionBadge title="INTER-AGENT TEAMWORK" />
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-black leading-tight tracking-tight text-white">
            Multi-Agent <span className="text-[#D27E2B]">Collaboration</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            Specialized AI agents working together in a real-time mission control hierarchy to solve complex enterprise business operations.
          </p>
        </motion.div>

        {/* ── Main Layout: Mission Control Canvas (Left) + Inspection Panel (Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* ── LEFT COLUMN: ARCHITECTURAL CIRCUIT CANVAS (Col-1 to Col-7) ── */}
          <motion.div
            {...fadeUp(0.1)}
            className="lg:col-span-7 bg-slate-950/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden flex flex-col items-center justify-between min-h-[620px]"
          >
            {/* Canvas System Header */}
            <div className="w-full flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D27E2B] shadow-[0_0_8px_#D27E2B]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">
                  SYSTEM ARCHITECTURE CANVAS
                </h3>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                Circuit Bus Connected
              </span>
            </div>

            {/* ── ARCHITECTURAL CIRCUIT BOARD NETWORK ── */}
            {/* Connector lines are drawn as an SVG overlay from measured socket
                positions (see `points`/`measure` above), so they always land
                exactly on each node's dot instead of relying on % guesses. */}
            <div ref={canvasRef} className="w-full relative flex flex-col items-center gap-14 sm:gap-16 py-2">

              {/* SVG Connector Overlay */}
              {points && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-0"
                  aria-hidden="true"
                >
                  {/* Coordinator ➔ Research / Planning / Execution */}
                  {(() => {
                    const midY =
                      points.coordinatorBottom.y +
                      (Math.min(points.researchTop.y, points.planningTop.y, points.executionTop.y) -
                        points.coordinatorBottom.y) /
                        2;
                    const branches: [Point, string][] = [
                      [points.researchTop, "#3B82F6"],
                      [points.planningTop, "#8B5CF6"],
                      [points.executionTop, "#F59E0B"],
                    ];
                    return branches.map(([to, color], i) => (
                      <path
                        key={`bus1-${i}`}
                        d={`M ${points.coordinatorBottom.x} ${points.coordinatorBottom.y} L ${points.coordinatorBottom.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y}`}
                        fill="none"
                        stroke={color}
                        strokeOpacity={0.65}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ));
                  })()}

                  {/* Research / Planning / Execution ➔ Quality Review */}
                  {(() => {
                    const midY2 =
                      (Math.max(points.researchBottom.y, points.planningBottom.y, points.executionBottom.y) +
                        points.qualityTop.y) /
                      2;
                    const branches: [Point, string][] = [
                      [points.researchBottom, "#3B82F6"],
                      [points.planningBottom, "#8B5CF6"],
                      [points.executionBottom, "#F59E0B"],
                    ];
                    return branches.map(([from, color], i) => (
                      <path
                        key={`bus2-${i}`}
                        d={`M ${from.x} ${from.y} L ${from.x} ${midY2} L ${points.qualityTop.x} ${midY2} L ${points.qualityTop.x} ${points.qualityTop.y}`}
                        fill="none"
                        stroke={color}
                        strokeOpacity={0.65}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ));
                  })()}

                  {/* Quality Review ➔ Delivery */}
                  <path
                    d={`M ${points.qualityBottom.x} ${points.qualityBottom.y} L ${points.deliveryTop.x} ${points.deliveryTop.y}`}
                    fill="none"
                    stroke="#06B6D4"
                    strokeOpacity={0.7}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    strokeLinecap="round"
                  />
                </svg>
              )}

              {/* Bus Pill Badges, positioned at the exact elbow midpoints */}
              {points && (
                <>
                  <div
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 bg-white/95 text-slate-900 border border-slate-300 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap"
                    style={{
                      left:
                        points.coordinatorBottom.x,
                      top:
                        points.coordinatorBottom.y +
                        (Math.min(points.researchTop.y, points.planningTop.y, points.executionTop.y) -
                          points.coordinatorBottom.y) /
                          2,
                    }}
                  >
                    <span>Task Distribution Bus</span>
                    <LuChevronRight className="w-3 h-3 text-[#D27E2B]" />
                  </div>

                  <div
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-purple-300 border border-purple-500/40 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap"
                    style={{
                      left: points.qualityTop.x,
                      top:
                        (Math.max(points.researchBottom.y, points.planningBottom.y, points.executionBottom.y) +
                          points.qualityTop.y) /
                        2,
                    }}
                  >
                    <span>Artifact Convergence</span>
                    <LuChevronDown className="w-3 h-3 text-purple-400" />
                  </div>

                  <div
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-cyan-300 border border-cyan-500/40 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-xs"
                    style={{
                      left: points.qualityBottom.x,
                      top: (points.qualityBottom.y + points.deliveryTop.y) / 2,
                    }}
                  >
                    Validated Stream
                  </div>
                </>
              )}

              {/* ── LEVEL 1: ORCHESTRATION HUB (Coordinator Node) ── */}
              <div className="relative z-10 flex flex-col items-center">
                <NodeCard
                  agent={coordinator}
                  isActive={activeAgentId === coordinator.id}
                  onClick={() => handleAgentSelect(coordinator.id)}
                  badgeText="Master Router"
                />

                {/* Bottom Circuit Output Terminal Socket */}
                <div
                  ref={setDotRef("coordinatorBottom")}
                  className="w-5 h-5 rounded-full bg-slate-950 border-2 border-[#D27E2B] flex items-center justify-center shadow-md -mt-2.5 z-20"
                >
                  <LuChevronDown className="w-3 h-3 text-[#D27E2B]" />
                </div>
              </div>

              {/* ── LEVEL 2: PARALLEL PROCESSING ENGINE (Research, Planning, Execution) ── */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 w-full">

                {/* Research Agent Node */}
                <div className="flex flex-col items-center">
                  <div
                    ref={setDotRef("researchTop")}
                    className="w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center shadow-xs -mb-2 z-20"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  </div>
                  <NodeCard
                    agent={research}
                    isActive={activeAgentId === research.id}
                    onClick={() => handleAgentSelect(research.id)}
                  />
                  <div
                    ref={setDotRef("researchBottom")}
                    className="w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center shadow-xs -mt-2 z-20"
                  >
                    <LuChevronDown className="w-2.5 h-2.5 text-blue-400" />
                  </div>
                </div>

                {/* Planning Agent Node */}
                <div className="flex flex-col items-center">
                  <div
                    ref={setDotRef("planningTop")}
                    className="w-4 h-4 rounded-full bg-slate-950 border-2 border-purple-500 flex items-center justify-center shadow-xs -mb-2 z-20"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  </div>
                  <NodeCard
                    agent={planning}
                    isActive={activeAgentId === planning.id}
                    onClick={() => handleAgentSelect(planning.id)}
                  />
                  <div
                    ref={setDotRef("planningBottom")}
                    className="w-4 h-4 rounded-full bg-slate-950 border-2 border-purple-500 flex items-center justify-center shadow-xs -mt-2 z-20"
                  >
                    <LuChevronDown className="w-2.5 h-2.5 text-purple-400" />
                  </div>
                </div>

                {/* Execution Agent Node */}
                <div className="flex flex-col items-center">
                  <div
                    ref={setDotRef("executionTop")}
                    className="w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-500 flex items-center justify-center shadow-xs -mb-2 z-20"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  </div>
                  <NodeCard
                    agent={execution}
                    isActive={activeAgentId === execution.id}
                    onClick={() => handleAgentSelect(execution.id)}
                  />
                  <div
                    ref={setDotRef("executionBottom")}
                    className="w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-500 flex items-center justify-center shadow-xs -mt-2 z-20"
                  >
                    <LuChevronDown className="w-2.5 h-2.5 text-amber-400" />
                  </div>
                </div>

              </div>

              {/* ── LEVEL 3: VERIFICATION & COMPLIANCE (Quality Review Node) ── */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  ref={setDotRef("qualityTop")}
                  className="w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-500 flex items-center justify-center shadow-xs -mb-2 z-20"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <NodeCard
                  agent={quality}
                  isActive={activeAgentId === quality.id}
                  onClick={() => handleAgentSelect(quality.id)}
                  badgeText="Compliance Guard"
                />
                <div
                  ref={setDotRef("qualityBottom")}
                  className="w-5 h-5 rounded-full bg-slate-950 border-2 border-emerald-500 flex items-center justify-center shadow-md -mt-2.5 z-20"
                >
                  <LuChevronDown className="w-3 h-3 text-emerald-400" />
                </div>
              </div>

              {/* ── LEVEL 4: DISPATCH OUTPUT (Delivery Agent Node) ── */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  ref={setDotRef("deliveryTop")}
                  className="w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-500 flex items-center justify-center shadow-xs -mb-2 z-20"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                </div>
                <NodeCard
                  agent={delivery}
                  isActive={activeAgentId === delivery.id}
                  onClick={() => handleAgentSelect(delivery.id)}
                  badgeText="Final Output Dispatch"
                />
              </div>

            </div>

            {/* Canvas Footer Bar */}
            <div className="w-full pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-bold mt-4">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <LuActivity className="w-3.5 h-3.5 animate-spin" />
                Orthogonal Bus Synchronized
              </span>
              <span className="text-slate-500">6 Synchronized Ports</span>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: ACTIVE AGENT INSPECTION PANEL (Col-8 to Col-12) ── */}
          <motion.div
            ref={panelRef}
            {...fadeUp(0.2)}
            className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md min-h-[620px] flex flex-col justify-between"
          >
            {/* Ambient Background Aura */}
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: activeAgent.accentColor }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeAgent.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 relative z-10"
              >
                {/* Agent Header */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-800">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 shadow-md"
                      style={{
                        backgroundColor: `${activeAgent.accentColor}20`,
                        borderColor: `${activeAgent.accentColor}50`,
                        color: activeAgent.accentColor,
                      }}
                    >
                      <activeAgent.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-white tracking-tight">
                          {activeAgent.role}
                        </h3>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
                      </div>
                      <p className="text-xs text-slate-400 font-semibold">
                        {activeAgent.tagline}
                      </p>
                    </div>
                  </div>

                  <span className={`text-xs font-black px-3 py-1 rounded-full border ${activeAgent.badgeBg}`}>
                    {activeAgent.status}
                  </span>
                </div>

                {/* Role Description */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                    ROLE RESPONSIBILITY
                  </h4>
                  <p className="text-sm text-slate-300 font-medium leading-relaxed">
                    {activeAgent.description}
                  </p>
                </div>

                {/* Live Activity Telemetry */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-400 flex items-center gap-1.5">
                      <LuSparkles className="w-3.5 h-3.5 text-[#D27E2B]" />
                      LIVE TELEMETRY STREAM
                    </span>
                    <span className="text-emerald-400 font-bold text-[11px]">
                      Latency: 14ms
                    </span>
                  </div>
                  <p className="text-xs font-mono text-emerald-300 font-medium bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                    &gt; {activeAgent.action}
                  </p>
                </div>

                {/* Integration Tool Stack Badges */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5">
                    TECHNOLOGY & INTERFACE STACK
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeAgent.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold bg-slate-800 text-slate-200 border border-slate-700"
                      >
                        <LuCircleCheck className="w-3.5 h-3.5 text-[#D27E2B]" />
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Pipeline Assurance */}
            <div className="pt-5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-bold relative z-10">
              <span className="flex items-center gap-2">
                <LuBot className="w-4 h-4 text-[#D27E2B]" />
                Zero Conflict Protocol Active
              </span>
              <span className="text-slate-500">6 Agents Synchronized</span>
            </div>
          </motion.div>

        </div>
      </Row>
    </Section>
  );
}

// Sub-component for rendering individual Agent Node Cards on the Canvas
function NodeCard({
  agent,
  isActive,
  onClick,
  badgeText,
}: {
  agent: (typeof AGENT_ROLES)[0];
  isActive: boolean;
  onClick: () => void;
  badgeText?: string;
}) {
  const AgentIcon = agent.icon;
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 shadow-md relative overflow-hidden group min-w-[140px] sm:min-w-[150px] ${
        isActive
          ? "bg-slate-800/95 border-[#D27E2B] shadow-lg shadow-[#D27E2B]/15 ring-1 ring-[#D27E2B]/50"
          : "bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80"
      }`}
    >
      {/* Node Dot / Icon */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div
          className="w-8.5 h-8.5 rounded-xl border flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-110"
          style={{
            backgroundColor: `${agent.accentColor}20`,
            borderColor: `${agent.accentColor}50`,
            color: agent.accentColor,
          }}
        >
          <AgentIcon className="w-4 h-4" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="text-xs font-black text-white leading-tight truncate">
              {agent.role}
            </h4>
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                backgroundColor: agent.accentColor,
                boxShadow: `0 0 6px ${agent.accentColor}`,
              }}
            />
          </div>
          <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
            {badgeText || agent.tagline}
          </p>
        </div>
      </div>
    </motion.div>
  );
}