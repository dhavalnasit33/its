"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FiSearch,
  FiLayers, 
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
  FaStar,
} from "react-icons/fa";
import Section from "@/components/Section";
import Row from "@/components/Row";
 
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

export default function CaseStudiesSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);

  return (
    <Section className="bg-white relative overflow-hidden py-24">
      <Row>
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
