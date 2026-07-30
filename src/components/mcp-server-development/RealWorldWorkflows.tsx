"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LuMessageSquare,
  LuUsers,
  LuFileSearch,
  LuSparkles,
  LuBell,
  LuGithub,
  LuCode,
  LuGitPullRequest,
  LuActivity,
  LuHash,
  LuArrowRight,
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

const workflows = [
  {
    title: "AI Customer Support Agent",
    steps: [
      { name: "Customer Question", icon: LuMessageSquare },
      { name: "Read CRM Data", icon: LuUsers },
      { name: "Fetch Order Details", icon: LuFileSearch },
      { name: "Generate Response", icon: LuSparkles },
      { name: "Update Ticket", icon: LuSparkles }, // Updated Icon mapping
      { name: "Notify Customer", icon: LuBell },
    ],
  },
  {
    title: "Developer Assistant",
    steps: [
      { name: "Read GitHub Repository", icon: LuGithub },
      { name: "Analyze Code", icon: LuCode },
      { name: "Create Pull Request", icon: LuGitPullRequest },
      { name: "Run Tests", icon: LuActivity },
      { name: "Notify on Slack", icon: LuHash },
    ],
  },
];

export default function RealWorldWorkflows() {
  return (
    <Section
      id="mcp-workflows"
      className="py-20 lg:py-28 relative overflow-hidden bg-[#F8FAFC] text-slate-900"
    >
      <Row>
        {/* Section Header */}
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center gap-4 relative z-10"
        >
          <SectionBadge title="REAL MCP USE CASES" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-black"
          >
            Power Real-World
            <span className="text-[#D27E2B]"> AI Workflows</span>
          </motion.h2>
        </motion.div>

        {/* ── WORKFLOW CARDS GRID ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-[1400px] mx-auto">
          {workflows.map((workflow, workflowIndex) => (
            <motion.div
              key={workflowIndex}
              {...fadeUp(0.1 + workflowIndex * 0.1)}
              className="bg-white border border-slate-200/60 rounded-3xl p-6 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
            >
              <h3 className="text-[19px] font-bold text-slate-900 mb-8 tracking-wide">
                {workflow.title}
              </h3>

              {/* Steps Container */}
              <div className="flex items-start flex-wrap sm:flex-nowrap gap-y-8 gap-x-2 sm:gap-x-4">
                {workflow.steps.map((step, stepIndex) => {
                  const Icon = step.icon;
                  const isLast = stepIndex === workflow.steps.length - 1;

                  return (
                    <React.Fragment key={stepIndex}>
                      {/* Individual Step */}
                      <div className="flex flex-col items-center flex-1 min-w-[70px] sm:min-w-0">
                        {/* Icon Container */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-center mb-4 transition-transform hover:scale-105 hover:border-blue-100 hover:shadow-blue-500/10 cursor-default">
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                        </div>

                        {/* Step Title */}
                        <p className="text-[11px] sm:text-[12px] font-semibold text-slate-600 text-center leading-tight max-w-[90px]">
                          {step.name}
                        </p>
                      </div>

                      {/* Right Arrow Connector (except after the last item) */}
                      {!isLast && (
                        <div className="hidden sm:flex mt-5 text-slate-300">
                          <LuArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </Row>
    </Section>
  );
}
