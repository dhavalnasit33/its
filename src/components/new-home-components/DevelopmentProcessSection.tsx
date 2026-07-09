"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiCheck,
  FiSearch,
  FiLayers,
  FiCode,
  FiCpu,
  FiGitMerge,
  FiBarChart2,
  FiShield,
  FiMessageSquare,
  FiZap,
  FiLink,
  FiMessageCircle,
  FiRepeat,
  FiGlobe,
  FiActivity,
  FiMonitor,
  FiLayout,
  FiBriefcase,
  FiCloud,
  FiBell,
  FiDatabase,
  FiChevronRight,
  FiTarget,
  FiCalendar,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";
import {
  FaRocket,
  FaChartLine,
  FaStar,
} from "react-icons/fa";
import Section from "@/components/Section";
import Row from "@/components/Row";
import Button from "@/components/Button";

const processSteps = [
  {
    number: "01",
    title: "Discovery & Consulting",
    description:
      "We understand your business goals, project requirements, and technical challenges.",
    icon: FiSearch,
    color: "#0d1b2a", // Navy Blue
    borderColor: "border-[#0d1b2a]",
    textColor: "text-[#0d1b2a]",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(13,27,42,0.25)]",
  },
  {
    number: "02",
    title: "Planning & Design",
    description:
      "We create the project roadmap, system architecture, UI/UX, and choose the right tech stack.",
    icon: FiLayers,
    color: "#d68029", // Orange
    borderColor: "border-[#d68029]",
    textColor: "text-[#d68029]",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(214,128,41,0.25)]",
  },
  {
    number: "03",
    title: "Development & AI",
    description:
      "We build scalable web, mobile, cloud, and AI solutions using React, Node.js, and OpenAI.",
    icon: FiCode,
    color: "#0d1b2a", // Navy Blue
    borderColor: "border-[#0d1b2a]",
    textColor: "text-[#0d1b2a]",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(13,27,42,0.25)]",
  },
  {
    number: "04",
    title: "Testing & Deployment",
    description:
      "We ensure quality through testing and deploy securely for high performance and reliability.",
    icon: FaRocket,
    color: "#d68029", // Orange
    borderColor: "border-[#d68029]",
    textColor: "text-[#d68029]",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(214,128,41,0.25)]",
  },
  {
    number: "05",
    title: "Support & Growth",
    description:
      "We provide ongoing maintenance, feature enhancements, and continuous technical support.",
    icon: FaChartLine,
    color: "#0d1b2a", // Navy Blue
    borderColor: "border-[#0d1b2a]",
    textColor: "text-[#0d1b2a]",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(13,27,42,0.25)]",
  },
];

const stepDeliverables = [
  [
    "Requirement Analysis",
    "Target Audience Definition",
    "Tech Feasibility Study",
    "Consulting Report",
  ],
  [
    "Project Roadmap Design",
    "Wireframes & UI UX Mockups",
    "System Architecture Plan",
    "Sprint Planning",
  ],
  [
    "Responsive Frontend Coding",
    "Robust Backend Systems",
    "AI Model / LLM Integration",
    "API Development",
  ],
  [
    "QA Testing & Bug Fixes",
    "Security Auditing",
    "CI/CD Cloud Deployment",
    "Performance Optimization",
  ],
  [
    "24/7 Monitoring & Support",
    "Continuous Backups",
    "SLA Maintenance",
    "Feature Roadmap Planning",
  ],
];

const stepDurations = [
  "1 - 2 Weeks",
  "2 - 3 Weeks",
  "4 - 8 Weeks",
  "2 - 3 Weeks",
  "Ongoing / SLA",
];

const caseStudies = [
  {
    tabLabel: "Popular",
    tabIcon: FaStar,
    title: "AI-Powered Business Automation Platform",
    description:
      "Our most popular solution combines AI, web, and cloud technologies to automate business processes, improve productivity, and accelerate digital transformation for modern organizations.",
    tags: ["AI", "Automation", "Enterprise"],
    stats: [
      {
        value: "70%",
        label: "Productivity Boost",
        icon: FiTrendingUp,
        arrow: "up",
      },
      {
        value: "50+",
        label: "AI Integrations",
        icon: FiCpu,
        arrow: "up",
      },
      {
        value: "99.9%",
        label: "System Uptime",
        icon: FiShield,
        arrow: "up",
      },
    ],
    features: [
      {
        title: "AI Workflow Automation",
        description:
          "Automate repetitive business tasks using intelligent AI workflows.",
        icon: FiCpu,
        colorClass: "bg-[#ff7a1a]",
      },
      {
        title: "Business Process Integration",
        description:
          "Connect CRM, ERP, APIs, and third-party platforms seamlessly.",
        icon: FiGitMerge,
        colorClass: "bg-[#2563eb]",
      },
      {
        title: "Real-Time Analytics",
        description:
          "Track performance with dashboards and actionable business insights.",
        icon: FiBarChart2,
        colorClass: "bg-[#10b981]",
      },
    ],
    details: {
      industry: "All Industries",
      duration: "Agile Delivery",
      team: "AI • Web • Mobile",
      techStack: "React • Node.js • Python • OpenAI",
    },
  },
  {
    tabLabel: "AI Automation",
    tabIcon: FiCpu,
    title: "Custom AI Solutions for Modern Businesses",
    description:
      "Build intelligent AI applications including chatbots, virtual assistants, document processing, and workflow automation powered by modern LLM technologies.",
    tags: ["OpenAI", "LLM", "Python"],
    stats: [
      {
        value: "24/7",
        label: "AI Availability",
        icon: FiMessageSquare,
        arrow: "up",
      },
      {
        value: "80%",
        label: "Task Automation",
        icon: FiZap,
        arrow: "up",
      },
      {
        value: "100+",
        label: "API Integrations",
        icon: FiLink,
        arrow: "up",
      },
    ],
    features: [
      {
        title: "AI Chatbots",
        description:
          "Enterprise AI assistants for customer support and sales.",
        icon: FiMessageCircle,
        colorClass: "bg-[#ff7a1a]",
      },
      {
        title: "LLM Integration",
        description: "OpenAI and custom AI model integration.",
        icon: FiCpu,
        colorClass: "bg-[#2563eb]",
      },
      {
        title: "Workflow Automation",
        description: "Reduce manual work with AI-powered automation.",
        icon: FiRepeat,
        colorClass: "bg-[#10b981]",
      },
    ],
    details: {
      industry: "AI Solutions",
      duration: "Custom Timeline",
      team: "AI Engineers",
      techStack: "Python • OpenAI • LangChain",
    },
  },
  {
    tabLabel: "Business Website",
    tabIcon: FiGlobe,
    title: "High-Performance Business Websites",
    description:
      "Develop modern, secure, and SEO-friendly websites that strengthen your online presence and drive measurable business growth.",
    tags: ["React", "Next.js", "SEO"],
    stats: [
      {
        value: "95+",
        label: "Performance Score",
        icon: FiActivity,
        arrow: "up",
      },
      {
        value: "3x",
        label: "Faster Loading",
        icon: FiZap,
        arrow: "up",
      },
      {
        value: "100%",
        label: "Responsive",
        icon: FiMonitor,
        arrow: "up",
      },
    ],
    features: [
      {
        title: "Modern UI/UX",
        description: "Responsive and engaging website experiences.",
        icon: FiLayout,
        colorClass: "bg-[#ff7a1a]",
      },
      {
        title: "SEO Optimized",
        description: "Built to improve visibility and search rankings.",
        icon: FiSearch,
        colorClass: "bg-[#2563eb]",
      },
      {
        title: "Secure Architecture",
        description: "Reliable and scalable backend development.",
        icon: FiShield,
        colorClass: "bg-[#10b981]",
      },
    ],
    details: {
      industry: "Business Websites",
      duration: "4–12 Weeks",
      team: "UI/UX • Frontend • Backend",
      techStack: "React • Next.js • Node.js",
    },
  },
  {
    tabLabel: "Mobile App",
    tabIcon: FiLayers, // Changed from FiSmartphone as it corresponds to index 3
    title: "Cross-Platform Mobile Applications",
    description:
      "Create scalable Android and iOS applications with intuitive user experiences, cloud connectivity, and enterprise-grade performance.",
    tags: ["Flutter", "Android", "iOS"],
    stats: [
      {
        value: "2x",
        label: "Faster Development",
        icon: FiLayout, // Using FiLayout/FiLayers consistently
        arrow: "up",
      },
      {
        value: "99%",
        label: "Crash-Free",
        icon: FiShield,
        arrow: "up",
      },
      {
        value: "One Code",
        label: "Multiple Platforms",
        icon: FiLayers,
        arrow: "up",
      },
    ],
    features: [
      {
        title: "Cross-Platform Apps",
        description: "Single codebase for Android and iOS.",
        icon: FiLayout, // Match original icons
        colorClass: "bg-[#ff7a1a]",
      },
      {
        title: "Cloud Integration",
        description: "Secure backend and real-time synchronization.",
        icon: FiCloud,
        colorClass: "bg-[#2563eb]",
      },
      {
        title: "Push Notifications",
        description: "Keep users engaged with instant updates.",
        icon: FiBell,
        colorClass: "bg-[#10b981]",
      },
    ],
    details: {
      industry: "Mobile Applications",
      duration: "6–16 Weeks",
      team: "Flutter • Android • iOS",
      techStack: "Flutter • Firebase • Node.js",
    },
  },
  {
    tabLabel: "Enterprise",
    tabIcon: FiBriefcase,
    title: "Enterprise Software Solutions",
    description:
      "Custom ERP, CRM, and enterprise platforms designed to streamline operations, improve collaboration, and support long-term business growth.",
    tags: ["ERP", "CRM", "Cloud"],
    stats: [
      {
        value: "100K+",
        label: "Transactions",
        icon: FiDatabase,
        arrow: "up",
      },
      {
        value: "99.9%",
        label: "Availability",
        icon: FiShield,
        arrow: "up",
      },
      {
        value: "24/7",
        label: "Enterprise Support",
        icon: FiTrendingUp,
        arrow: "up",
      },
    ],
    features: [
      {
        title: "ERP & CRM Systems",
        description: "Custom business management solutions.",
        icon: FiBriefcase,
        colorClass: "bg-[#ff7a1a]",
      },
      {
        title: "API Integration",
        description: "Connect existing software and services.",
        icon: FiGitMerge,
        colorClass: "bg-[#2563eb]",
      },
      {
        title: "Cloud Deployment",
        description: "Secure, scalable cloud infrastructure.",
        icon: FiCloud,
        colorClass: "bg-[#10b981]",
      },
    ],
    details: {
      industry: "Enterprise Software",
      duration: "Custom Timeline",
      team: "Full-Stack Engineers",
      techStack: "React • Node.js • AWS",
    },
  },
];

// Note: To match the original icons on case studies tabs:
caseStudies[3].tabIcon = FiLayers; // Match FiLayers icon for Mobile App tab

export default function DevelopmentProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);

  return (
    <Section className="bg-white relative overflow-hidden py-24">
      <Row>
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#d68029] text-xs font-bold uppercase tracking-widest block mb-3">
            METHODOLOGY
          </span>
          <h2 className="common-h2 text-[#0d1b2a]">
            Our <span className="text-[#d68029]">Development</span> Process
          </h2>
          <p className="text-slate-500 mt-4 text-sm sm:text-base max-w-xl mx-auto">
            We follow a structured, collaborative methodology to transform
            your ideas into scalable, production-ready digital products.
          </p>
        </div>

        {/* Interactive Stepper Container */}
        <div className="max-w-[1400px] w-full mx-auto mb-20">
          {/* Step Tabs Selector */}
          <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 mb-16 bg-white border border-slate-100 p-3 rounded-[24px] shadow-[0_10px_30px_rgba(13,27,42,0.02)] z-10">
            {processSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              const isCompleted = idx < activeStep;
              const Icon = step.icon;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center cursor-pointer gap-3 px-6 py-4 rounded-[18px] w-full md:w-auto transition-all duration-300 text-left relative overflow-hidden ${
                    isActive
                      ? "bg-[#0d1b2a] text-white shadow-lg shadow-[#0d1b2a]/20 scale-[1.02]"
                      : "hover:bg-slate-100 text-slate-600"
                  }`}
                >
                  {/* Step Icon or Completed Check */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors duration-300 ${
                      isActive
                        ? "bg-[#d68029] border-[#d68029] text-white"
                        : isCompleted
                          ? "bg-emerald-50 border-emerald-250 text-emerald-600"
                          : "bg-slate-100 border-slate-200 text-slate-500"
                    }`}
                  >
                    {isCompleted ? (
                      <FiCheck className="w-5 h-5 stroke-[3]" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <span
                      className={`block text-[10px] font-extrabold uppercase tracking-wider ${
                        isActive ? "text-[#d68029]" : "text-slate-400"
                      }`}
                    >
                      Step {step.number}
                    </span>
                    <span className="block text-sm font-bold leading-tight mt-0.5 whitespace-nowrap">
                      {step.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Showcase Split Pane */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[460px]">
            {/* Left Side: Premium Interactive Visual Mockup */}
            <div className="lg:col-span-6 bg-[#030b1a] rounded-[32px] p-8 md:p-10 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[360px] lg:min-h-full">
              {/* Glowing decorative gradient behind mockup */}
              <div
                className="absolute -top-1/4 -right-1/4 w-[280px] h-[280px] rounded-full blur-[80px] opacity-40 transition-colors duration-500"
                style={{ backgroundColor: processSteps[activeStep].color }}
              />

              {/* Mockup Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-slate-500 font-mono ml-2">
                    inspire_process_v1.sh
                  </span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded border border-slate-800">
                  {processSteps[activeStep].title.toUpperCase()}
                </span>
              </div>

              {/* Dynamic Content Showcase based on active step */}
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex items-center justify-center my-6 relative z-10"
              >
                {activeStep === 0 && (
                  <div className="w-full font-mono text-[13px] text-slate-350 bg-slate-900/40 p-5 rounded-2xl border border-slate-800/80">
                    <p className="text-[#d68029] font-bold">
                      // 1. Discovery & Consulting
                    </p>
                    <p className="text-slate-500 mt-2">
                      Initializing project scope analysis...
                    </p>
                    <div className="mt-4 space-y-1">
                      <p className="text-emerald-400">
                        ✓ Target audience identified
                      </p>
                      <p className="text-emerald-400">
                        ✓ Tech stack options evaluated
                      </p>
                      <p className="text-blue-400">
                        ⚡ Core challenges mapping: Complete
                      </p>
                    </div>
                    <div className="mt-4 bg-slate-950/80 p-2.5 rounded border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-550">Project Readiness:</span>
                      <span className="font-bold text-emerald-400">
                        98% Fit
                      </span>
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="w-full bg-[#070e1c] border border-slate-800/60 p-6 rounded-2xl flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400">
                        Figma Wireframe Preview
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#d68029] animate-pulse" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-20 bg-slate-800/40 rounded-lg border border-slate-800/30 flex flex-col justify-between p-2">
                        <span className="text-[9px] text-slate-500">
                          Header
                        </span>
                        <div className="h-1.5 w-8 bg-slate-700 rounded" />
                      </div>
                      <div className="h-20 bg-[#d68029]/10 rounded-lg border border-[#d68029]/30 flex flex-col justify-between p-2">
                        <span className="text-[9px] text-[#d68029] font-bold">
                          Hero Section
                        </span>
                        <div className="h-1.5 w-12 bg-[#d68029] rounded" />
                      </div>
                      <div className="h-20 bg-slate-800/40 rounded-lg border border-slate-800/30 flex flex-col justify-between p-2">
                        <span className="text-[9px] text-slate-500">
                          Footer
                        </span>
                        <div className="h-1.5 w-6 bg-slate-700 rounded" />
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-400 flex justify-between bg-slate-950/60 p-2 rounded">
                      <span>Roadmap Duration:</span>
                      <span className="text-slate-200 font-bold">
                        12 Weeks Total
                      </span>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="w-full font-mono text-[12px] text-slate-350 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/60 flex flex-col gap-2">
                    <div className="flex justify-between text-slate-500 border-b border-slate-900 pb-2 mb-1">
                      <span>File: app/page.tsx</span>
                      <span className="text-[#d68029]">React 18</span>
                    </div>
                    <p>
                      <span className="text-purple-400">import</span> React{" "}
                      <span className="text-purple-400">from</span>{" "}
                      <span className="text-green-300">&apos;react&apos;</span>;
                    </p>
                    <p>
                      <span className="text-purple-400">import</span> &#123;
                      OpenAI &#125;{" "}
                      <span className="text-purple-400">from</span>{" "}
                      <span className="text-green-300">&apos;openai&apos;</span>;
                    </p>
                    <p className="mt-2 text-slate-500">
                      // Creating AI pipeline
                    </p>
                    <p>
                      <span className="text-blue-400">const</span>{" "}
                      <span className="text-yellow-300">initAI</span> ={" "}
                      <span className="text-purple-400">async</span> () =&gt;
                      &#123;
                    </p>
                    <p className="pl-4">
                      await{" "}
                      <span className="text-blue-300">
                        openai.chat.completions.create
                      </span>
                      (&#123; ... &#125;)
                    </p>
                    <p>&#125;;</p>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="w-full bg-slate-900/30 border border-slate-800/80 p-6 rounded-2xl flex flex-col gap-3">
                    <span className="text-xs font-bold text-slate-400">
                      Quality Assurance Summary
                    </span>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-800">
                        <span className="text-[11px] text-slate-300">
                          Unit Tests Passed
                        </span>
                        <span className="text-emerald-400 font-bold text-xs">
                          142/142 (100%)
                        </span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-800">
                        <span className="text-[11px] text-slate-300">
                          Lighthouse Performance
                        </span>
                        <span className="text-emerald-400 font-bold text-xs">
                          98 / 100
                        </span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-800">
                        <span className="text-[11px] text-slate-300">
                          Security Check
                        </span>
                        <span className="text-[#d68029] font-bold text-xs">
                          Passed A+
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 4 && (
                  <div className="w-full bg-[#070e1c] border border-slate-800/60 p-5 rounded-2xl flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400">
                        24/7 Monitoring Dashboard
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold animate-pulse">
                        LIVE
                      </span>
                    </div>
                    <div className="flex items-end gap-1 h-20 px-2 bg-slate-950 rounded-lg justify-between pt-4">
                      <div className="w-4 bg-emerald-500 h-[60%] rounded-t" />
                      <div className="w-4 bg-emerald-500 h-[70%] rounded-t" />
                      <div className="w-4 bg-emerald-500 h-[80%] rounded-t" />
                      <div className="w-4 bg-[#d68029] h-[95%] rounded-t" />
                      <div className="w-4 bg-emerald-500 h-[65%] rounded-t" />
                      <div className="w-4 bg-emerald-500 h-[75%] rounded-t" />
                      <div className="w-4 bg-emerald-500 h-[85%] rounded-t" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                      <div className="bg-slate-900 p-2 rounded">
                        <span className="block text-slate-550">Uptime</span>
                        <span className="font-bold text-slate-200">99.99%</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded">
                        <span className="block text-slate-550">Response</span>
                        <span className="font-bold text-slate-200">142ms</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Footer text */}
              <div className="text-[10px] text-slate-400 font-mono flex justify-between relative z-10 border-t border-slate-800 pt-3">
                <span>INSPIRE Techno Solution</span>
                <span>v1.0.0</span>
              </div>
            </div>

            {/* Right Side: Detailed Copy Content */}
            <div className="lg:col-span-6 flex flex-col justify-center p-2 lg:p-4">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  {/* Stage number bubble */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d68029]/10 text-[#d68029] text-xs font-extrabold uppercase tracking-wider mb-6">
                    Phase {processSteps[activeStep].number}
                  </div>

                  {/* Step Title */}
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b2a] leading-tight mb-5 tracking-tight">
                    {processSteps[activeStep].title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                    {processSteps[activeStep].description}
                  </p>

                  {/* Deliverables checklist */}
                  <div className="space-y-4 mb-8">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0d1b2a]">
                      Key Deliverables
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {stepDeliverables[activeStep].map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                          <span className="text-sm font-semibold text-slate-700">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions / CTA bar */}
                <div className="border-t border-slate-100 pt-6 mt-auto flex items-center gap-4 flex-wrap">
                  <Button
                    text="Request Consulting"
                    bgColor="#0d1b2a"
                    hoverColor="#D27E2B"
                    href="#contact-form-section"
                    icon="/navbar/btn_icon.png"
                  />
                  <span className="text-[13px] font-semibold text-slate-500">
                    Estimated duration:{" "}
                    <strong className="text-slate-800">
                      {stepDurations[activeStep]}
                    </strong>
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Dynamic Full Width Case Studies Showcase */}
        <div className="mt-24 pt-16 max-w-[1400px] w-full mx-auto">
          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#d68029] text-xs font-bold uppercase tracking-widest block mb-3">
              CASE STUDIES
            </span>
            <h2 className="common-h2 text-[#0d1b2a]">
              Real Results,{" "}
              <span className="relative inline-block">
                Real
                <span className="absolute bottom-[2px] left-0 w-full h-[3px] bg-[#d68029] rounded-full" />
              </span>{" "}
              <span className="text-[#d68029]">Impact</span>
            </h2>
            <p className="fonts_16 text-gray-600 mt-4">
              Discover how businesses are leveraging AI to solve challenges,
              improve efficiency, and achieve measurable growth.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex flex-col gap-8">
            {/* Tabs selector */}
            <div className="flex flex-wrap justify-center items-center gap-3 max-w-5xl mx-auto">
              {caseStudies.map((study, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCaseStudy(idx)}
                  className={`min-w-[170px] h-11 cursor-pointer flex items-center justify-center gap-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    activeCaseStudy === idx
                      ? "bg-[#e06c16] text-white shadow-md shadow-[#e06c16]/20"
                      : "bg-white border border-slate-200 text-[#334155] hover:bg-slate-50"
                  }`}
                >
                  {/* Icon */}
                  {React.createElement(study.tabIcon, {
                    className: `w-4 h-4 ${
                      activeCaseStudy === idx ? "text-white" : "text-slate-500"
                    }`,
                  })}
                  {study.tabLabel}
                </button>
              ))}
            </div>

            {/* Showcase Container */}
            <motion.div
              key={activeCaseStudy}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-[32px] overflow-hidden shadow-[0_15px_50px_rgba(214,128,41,0.08)] transition-all duration-300 flex flex-col lg:flex-row relative"
            >
              {/* Left Column: Info & Stats (Navy Blue bg) */}
              <div className="w-full lg:w-[55%] bg-[#1c2a40] p-8 md:p-12 lg:p-12 xl:p-14 flex flex-col justify-between relative overflow-hidden">
                {/* Subtle dot pattern background */}
                <div
                  className="absolute bottom-0 left-0 w-64 h-64 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(#ffffff 1.5px, transparent 1.5px)",
                    backgroundSize: "16px 16px",
                  }}
                />

                <div className="relative z-10 lg:pr-24">
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-3 mb-6 md:mb-8">
                    {caseStudies[activeCaseStudy].tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="bg-transparent border border-[#ff7a1a] text-[#ff7a1a] px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-3xl lg:text-[40px] font-bold text-white leading-[1.2] mb-5 tracking-tight">
                    {caseStudies[activeCaseStudy].title}
                  </h3>

                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
                    {caseStudies[activeCaseStudy].description}
                  </p>
                </div>

                {/* Stats counters */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 xl:gap-5 mt-auto lg:pr-14">
                  {caseStudies[activeCaseStudy].stats.map((stat, statIdx) => {
                    const StatIcon = stat.icon;
                    return (
                      <div
                        key={statIdx}
                        className="bg-[#28384d] cursor-pointer rounded-2xl p-5 flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-[#ff7a1a] flex items-center justify-center shrink-0">
                            <StatIcon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-2xl lg:text-[28px] font-bold text-white tracking-tight">
                            {stat.value}
                          </span>
                        </div>
                        <div className="text-[13px] font-medium text-slate-300 flex items-center gap-1.5 pt-1">
                          <span>{stat.label}</span>
                          <span className="font-bold text-sm text-green-400">
                            {stat.arrow === "up" ? "↗" : "↘"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Premium Feature Cards (No Image) */}
              <div className="w-full lg:w-[45%] bg-[#fffcf8] p-8 md:p-12 xl:p-14 relative flex flex-col justify-center min-h-[480px] overflow-hidden z-0">
                {/* Decorative Ambient Glows */}
                <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-[#ff7a1a]/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-20%] w-[300px] h-[300px] bg-[#6320a3]/10 blur-[80px] rounded-full pointer-events-none" />

                {/* Subtle Dotted overlay for texture */}
                <div
                  className="absolute inset-0 opacity-[0.15] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(#d68029 1.5px, transparent 1.5px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Feature Cards Container */}
                <div className="relative z-10 flex flex-col gap-4 w-full max-w-[500px] mx-auto">
                  {/* Small context header */}
                  <div className="mb-4 px-2">
                    <span className="text-[#d68029] text-[11px] font-extrabold uppercase tracking-widest block mb-1">
                      Key Capabilities
                    </span>
                    <h4 className="text-2xl font-bold text-[#0d1b2a]">
                      Platform Features
                    </h4>
                  </div>

                  {caseStudies[activeCaseStudy].features.map((feat, featIdx) => {
                    const FeatIcon = feat.icon;

                    return (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: featIdx * 0.15,
                          duration: 0.5,
                        }}
                        key={featIdx}
                        className="group relative cursor-pointer bg-white/70 backdrop-blur-xl border border-white rounded-[24px] p-5 lg:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(214,128,41,0.08)] hover:-translate-y-1 transition-all duration-400 cursor-default overflow-hidden"
                      >
                        {/* Accent Line on hover */}
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ff7a1a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="flex items-center gap-5 pr-6">
                          {/* Icon Container with glowing effect */}
                          <div className="relative shrink-0">
                            <div
                              className={`absolute inset-0 blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300 ${feat.colorClass}`}
                            />
                            <div
                              className={`relative w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center shadow-sm ${feat.colorClass}`}
                            >
                              <FeatIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                            </div>
                          </div>

                          {/* Text Content */}
                          <div className="flex-1">
                            <h4 className="text-[16px] lg:text-[17px] font-bold text-[#0d1b2a] leading-tight mb-1.5 group-hover:text-[#d68029] transition-colors duration-300">
                              {feat.title}
                            </h4>
                            <p className="text-[13px] lg:text-[14px] text-slate-500 font-medium leading-relaxed">
                              {feat.description}
                            </p>
                          </div>
                        </div>

                        {/* Hover Arrow Indicator */}
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <FiChevronRight className="w-6 h-6 text-[#d68029]" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Bottom details bar */}
            <div className="bg-white border border-slate-200/50 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
              <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap items-stretch justify-between gap-6">
                {/* Item 1: Industry */}
                <div className="flex-1 flex items-center gap-4 min-w-[200px] px-2">
                  <div className="w-11 h-11 rounded-full bg-[#f3f0ff] border border-[#e8d5ff] text-[#7c3aed] flex items-center justify-center shrink-0">
                    <FiTarget className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Industry
                    </span>
                    <span className="block text-sm font-bold text-[#0d1b2a] mt-0.5 leading-snug">
                      {caseStudies[activeCaseStudy].details.industry}
                    </span>
                  </div>
                </div>

                <div className="hidden lg:block w-px bg-slate-200/80 self-stretch my-1" />

                {/* Item 2: Duration */}
                <div className="flex-1 flex items-center gap-4 min-w-[200px] px-2">
                  <div className="w-11 h-11 rounded-full bg-[#fff8f2] border border-[#ffe0cc] text-[#ff7a1a] flex items-center justify-center shrink-0">
                    <FiCalendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Duration
                    </span>
                    <span className="block text-sm font-bold text-[#0d1b2a] mt-0.5 leading-snug">
                      {caseStudies[activeCaseStudy].details.duration}
                    </span>
                  </div>
                </div>

                <div className="hidden lg:block w-px bg-slate-200/80 self-stretch my-1" />

                {/* Item 3: Team Involved */}
                <div className="flex-1 flex items-center gap-4 min-w-[200px] px-2">
                  <div className="w-11 h-11 rounded-full bg-[#ebfbf3] border border-[#c3fae8] text-[#10b981] flex items-center justify-center shrink-0">
                    <FiUsers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Team Involved
                    </span>
                    <span className="block text-sm font-bold text-[#0d1b2a] mt-0.5 leading-snug">
                      {caseStudies[activeCaseStudy].details.team}
                    </span>
                  </div>
                </div>

                <div className="hidden lg:block w-px bg-slate-200/80 self-stretch my-1" />

                {/* Item 4: Tech Stack */}
                <div className="flex-1 flex items-center gap-4 min-w-[200px] px-2">
                  <div className="w-11 h-11 rounded-full bg-[#f0f7ff] border border-[#d0e8ff] text-[#3b82f6] flex items-center justify-center shrink-0">
                    <FaRocket className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Tech Stack
                    </span>
                    <span className="block text-sm font-bold text-[#0d1b2a] mt-0.5 leading-snug">
                      {caseStudies[activeCaseStudy].details.techStack}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </Section>
  );
}
