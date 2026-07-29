"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LuDatabase,
  LuGlobe,
  LuLayers,
  LuWorkflow,
  LuCode,
  LuFolderGit2,
  LuMessageSquare,
  LuFileText,
  LuCloud,
  LuChevronLeft,
  LuChevronRight,
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

const CONNECTED_SYSTEMS = [
  {
    name: "Salesforce",
    category: "CRM & Sales Platform",
    logo: "/ai-strategy/brand-image/salesforce-logo.svg",
    icon: LuGlobe,
    accentColor: "#00A1E0",
    description: "Connect AI agents with Salesforce CRM records, leads, opportunities, and automated sales pipeline workflows.",
    tags: ["REST / SOAP APIs", "Lead Enrichment", "OAuth2 Auth"],
  },
  {
    name: "SAP",
    category: "ERP & Operations",
    logo: "/ai-strategy/brand-image/SAP-logo.svg",
    icon: LuLayers,
    accentColor: "#008FD3",
    description: "Integrate AI assistants with SAP ERP modules for automated purchase orders, inventory checks, and financial reporting.",
    tags: ["OData & RFC Bridges", "Purchase Orders", "Inventory Sync"],
  },
  {
    name: "Slack",
    category: "Team Collaboration",
    logo: "/ai-strategy/brand-image/slack-logo.svg",
    icon: LuMessageSquare,
    accentColor: "#4A154B",
    description: "Build interactive Slack bot MCP servers that trigger real-time AI actions, incident responses, and team notifications.",
    tags: ["Real-Time Webhooks", "Interactive Bots", "Slack Bolt SDK"],
  },
  {
    name: "GitHub",
    category: "Developer Ecosystem",
    logo: "/ai-strategy/brand-image/github-logo.svg",
    icon: LuFolderGit2,
    accentColor: "#181717",
    description: "Enable AI coding assistants to manage pull requests, issues, code search, automated reviews, and CI/CD triggers.",
    tags: ["REST & GraphQL", "PR Automation", "Repository Search"],
  },
  {
    name: "Google Drive",
    category: "Document Knowledge",
    logo: "/ai-strategy/brand-image/google-drive.svg",
    icon: LuCloud,
    accentColor: "#4285F4",
    description: "Provide secure AI vector context and semantic document retrieval across Google Docs, Sheets, Slides, and Drive files.",
    tags: ["Google Workspace API", "Vector Context", "OAuth2 Token Sync"],
  },
  {
    name: "Notion",
    category: "Knowledge Base",
    logo: "/ai-strategy/brand-image/notion-logo.svg",
    icon: LuFileText,
    accentColor: "#000000",
    description: "Connect AI assistants directly to Notion databases, team wikis, project boards, and company knowledge hubs.",
    tags: ["Notion API", "Wiki Retrieval", "Database Queries"],
  },
  {
    name: "SharePoint",
    category: "Enterprise Content",
    logo: "/ai-strategy/brand-image/microsoft-sharepoint.svg",
    icon: LuFileText,
    accentColor: "#0078D4",
    description: "Grant AI agents compliant, role-based access to Microsoft SharePoint document libraries, sites, and Intranet assets.",
    tags: ["Microsoft Graph API", "Document Search", "Azure AD / Entra ID"],
  },
  {
    name: "PostgreSQL",
    category: "Databases & Warehouses",
    logo: "/ai-strategy/brand-image/postgresql-logo.svg",
    icon: LuDatabase,
    accentColor: "#336791",
    description: "Enable natural language text-to-SQL querying and structured data retrieval from PostgreSQL databases.",
    tags: ["Natural Text-to-SQL", "Parameterized Queries", "Connection Pools"],
  },
  {
    name: "Jira & Confluence",
    category: "Project & Task Management",
    logo: "/ai-strategy/brand-image/jira-logo.svg",
    icon: LuWorkflow,
    accentColor: "#0052CC",
    description: "Connect AI agents with Jira projects, backlog items, sprint tracking, and automated ticket resolution.",
    tags: ["Jira REST API", "Issue Tracking", "Sprint Automation"],
  },
  {
    name: "HubSpot",
    category: "Inbound Marketing & CRM",
    logo: "/ai-strategy/brand-image/hubspot-logo.svg",
    icon: LuGlobe,
    accentColor: "#FF7A59",
    description: "Integrate AI assistants with HubSpot marketing automation, lead scoring, deals, and customer contacts.",
    tags: ["HubSpot API", "Lead Scoring", "Deal Pipeline Sync"],
  },
  {
    name: "Zendesk",
    category: "Customer Support & Helpdesk",
    logo: "/ai-strategy/brand-image/zendesk.svg",
    icon: LuMessageSquare,
    accentColor: "#03363D",
    description: "Build AI agent MCP servers that create, update, search, and resolve customer support tickets automatically.",
    tags: ["Zendesk API", "Ticket Resolution", "Support Automation"],
  },
  {
    name: "Stripe",
    category: "Payments & Financial Ops",
    logo: "/ai-strategy/brand-image/stripe-logo.svg",
    icon: LuCode,
    accentColor: "#635BFF",
    description: "Enable AI assistants to query subscription status, invoice history, payment metrics, and financial reporting.",
    tags: ["Stripe API", "Financial Telemetry", "Invoice Queries"],
  },
  {
    name: "n8n & Workflows",
    category: "Workflow Automation",
    logo: "/ai-strategy/brand-image/n8n-logo.svg",
    icon: LuWorkflow,
    accentColor: "#FF6584",
    description: "Bridge multi-step workflow automation platforms and webhooks into enterprise MCP server tool definitions.",
    tags: ["n8n & Zapier", "Webhook Triggers", "Flow Automation"],
  },
  {
    name: "Zoho Suite",
    category: "CRM & Enterprise Software",
    logo: "/ai-strategy/brand-image/zoho-logo.svg",
    icon: LuGlobe,
    accentColor: "#C0272D",
    description: "Connect AI agents with Zoho CRM, Desk, Inventory, and Analytics for automated business workflow execution.",
    tags: ["Zoho API", "CRM Workflows", "Desk Integration"],
  },
  {
    name: "Freshworks",
    category: "Customer Support & Service",
    logo: "/ai-strategy/brand-image/freshdesk.svg",
    icon: LuMessageSquare,
    accentColor: "#2F9E44",
    description: "Integrate AI assistants with Freshdesk and Freshsales to automate ticket triage and customer communication.",
    tags: ["Freshdesk API", "Support Triage", "CRM Sync"],
  },
  {
    name: "Shopify",
    category: "E-Commerce & Orders",
    logo: "/ai-strategy/brand-image/shopify.svg",
    icon: LuLayers,
    accentColor: "#96BF48",
    description: "Enable AI agents to query orders, update catalog inventory, handle customer refunds, and manage store operations.",
    tags: ["Shopify Admin API", "Order Fulfillment", "Inventory Tools"],
  },
  {
    name: "REST APIs",
    category: "Custom API Bridges",
    logo: "/ai-strategy/brand-image/rest-api-logo.svg",
    icon: LuCode,
    accentColor: "#D27E2B",
    description: "Expose any internal or third-party RESTful web service to AI assistants with structured JSON-RPC tool wrappers.",
    tags: ["OpenAPI / Swagger", "JSON-RPC Schema", "Custom Endpoints"],
  },
  {
    name: "Internal Tools",
    category: "Custom Systems & Webhooks",
    logo: "/ai-strategy/brand-image/webhook-logo.svg",
    icon: LuWorkflow,
    accentColor: "#8B5CF6",
    description: "Bridge legacy software, proprietary microservices, and internal webhooks to custom MCP server gateways.",
    tags: ["Legacy Wrappers", "Webhook Telemetry", "Private VPC Bridges"],
  },
];

function SystemLogo({
  logo,
  name,
  IconComponent,
  accentColor,
  sizeClass = "w-5 h-5",
}: {
  logo?: string;
  name: string;
  IconComponent: React.ElementType;
  accentColor: string;
  sizeClass?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (!hasError && logo) {
    return (
      <Image
        src={logo}
        alt={`${name} Logo`}
        width={32}
        height={32}
        onError={() => setHasError(true)}
        className={`${sizeClass} object-contain`}
      />
    );
  }
  return <IconComponent className={sizeClass} style={{ color: accentColor }} />;
}

export default function ConnectedSystems() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const ROTATION_INTERVAL = 4000;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CONNECTED_SYSTEMS.length);
    }, ROTATION_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CONNECTED_SYSTEMS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? CONNECTED_SYSTEMS.length - 1 : prev - 1));
  };

  return (
    <Section className="py-20 lg:py-28 relative overflow-hidden bg-white text-slate-900 border-t border-slate-200/70">
      
      {/* Inject Keyframe Animation for Progress Bar */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fillProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#D27E2B]/10 via-amber-50/40 to-transparent rounded-[100%] blur-3xl pointer-events-none" />

      <Row>
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-12 max-w-3xl mx-auto flex flex-col items-center gap-3 relative z-10"
        >
          <SectionBadge title="ENTERPRISE SYSTEMS WE CONNECT" />
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold leading-tight tracking-tight text-[#0F172A]">
            Enterprise Systems <span className="text-[#D27E2B]">We Connect</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            We build secure, production-grade Model Context Protocol (MCP) server
            connectors for your existing CRM, ERP, databases, cloud storage,
            collaboration platforms, and custom software systems.
          </p>
        </motion.div>

        <div
          className="flex flex-col gap-12 relative z-20"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* TOP: Wrapped Tab List */}
          <div className="w-full relative px-4">
            <div className="flex flex-wrap justify-center gap-3 py-2 w-full   mx-auto">
              {CONNECTED_SYSTEMS.map((system, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={system.name}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative cursor-pointer flex items-center gap-2.5 px-3.5 py-2 rounded-full border transition-all duration-300 shrink-0 ${
                      isActive
                        ? "bg-white shadow-sm"
                        : "bg-slate-50/60 border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-500"
                    }`}
                    style={{
                      borderColor: isActive ? system.accentColor : undefined,
                    }}
                  >
                    <div className="relative z-10 shrink-0">
                      <SystemLogo
                        logo={system.logo}
                        name={system.name}
                        IconComponent={system.icon}
                        accentColor={isActive ? system.accentColor : "#94A3B8"}
                        sizeClass="w-4 h-4 sm:w-5 sm:h-5"
                      />
                    </div>
                    <span className={`relative z-10 text-sm sm:text-base font-bold ${isActive ? 'text-[#0F172A]' : 'text-slate-600'}`}>
                      {system.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BOTTOM: Circular Full Width Rotating Card Carousel */}
          <div className="w-full min-h-[460px] sm:min-h-[480px] relative flex items-center justify-center overflow-visible perspective-[1400px] py-4">
            
            {/* Side Navigation Arrows (Desktop / Tablet Only) */}
            <button 
              onClick={handlePrev}
              className="hidden sm:flex items-center justify-center absolute left-2 sm:left-6 lg:left-12 z-50 p-3 sm:p-4 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-full shadow-2xl hover:bg-white hover:scale-110 hover:border-[#D27E2B] transition-all text-[#0F172A] hover:text-[#D27E2B] active:scale-95 cursor-pointer"
              aria-label="Previous card"
            >
              <LuChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>

            <button 
              onClick={handleNext}
              className="hidden sm:flex items-center justify-center absolute right-2 sm:right-6 lg:right-12 z-50 p-3 sm:p-4 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-full shadow-2xl hover:bg-white hover:scale-110 hover:border-[#D27E2B] transition-all text-[#0F172A] hover:text-[#D27E2B] active:scale-95 cursor-pointer"
              aria-label="Next card"
            >
              <LuChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>

            {/* Cards Mapping */}
            {CONNECTED_SYSTEMS.map((system, idx) => {
              const totalCards = CONNECTED_SYSTEMS.length;
              
              let offset = idx - activeIndex;

              // Circular Math
              if (offset > totalCards / 2) {
                offset -= totalCards;
              } else if (offset < -totalCards / 2) {
                offset += totalCards;
              }
              
              // Render only surrounding cards to save DOM elements
              if (Math.abs(offset) > 4) return null;

              const isCenter = offset === 0;

              return (
                <motion.div
                  key={system.name}
                  onClick={() => setActiveIndex(idx)}
                  animate={{
                    x: offset * 140, 
                    y: Math.abs(offset) * 12,
                    scale: 1 - Math.abs(offset) * 0.12,
                    opacity: 1 - Math.abs(offset) * 0.35,
                    zIndex: 50 - Math.abs(offset),
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 28,
                    mass: 0.9
                  }}
                  className={`absolute w-full max-w-md bg-white border rounded-[2rem] overflow-hidden p-8 sm:p-9 transition-colors duration-300 ${
                    isCenter ? 'cursor-default' : 'cursor-pointer hover:bg-slate-50'
                  }`}
                  style={{
                    pointerEvents: "auto",
                    // Apply dynamic colored shadow and tinted border to the active card
                    boxShadow: isCenter 
                      ? `0 25px 50px -12px ${system.accentColor}40` // Hex 40 = ~25% opacity
                      : `0 4px 6px -1px rgba(0,0,0,0.05)`,
                    borderColor: isCenter ? `${system.accentColor}60` : '#e2e8f0'
                  }}
                >
                  {/* Dynamic Progress Indicator (Top Border) */}
                  <div className="absolute top-0 left-0 right-0 h-[6px] bg-slate-100/50">
                    {isCenter ? (
                      <div
                        key={activeIndex} 
                        className="h-full"
                        style={{ 
                          backgroundColor: system.accentColor,
                          animation: `fillProgress ${ROTATION_INTERVAL}ms linear forwards`,
                          animationPlayState: isPaused ? "paused" : "running"
                        }}
                      />
                    ) : (
                      <div 
                        className="h-full w-full"
                        style={{ 
                          backgroundColor: system.accentColor,
                          opacity: 0.3
                        }} 
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-5 mb-6 mt-2">
                    {/* Card Logo Box */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center p-3 sm:p-4 shadow-sm shrink-0">
                      <SystemLogo
                        logo={system.logo}
                        name={system.name}
                        IconComponent={system.icon}
                        accentColor={system.accentColor}
                        sizeClass="w-full h-full"
                      />
                    </div>

                    {/* Card Titles */}
                    <div className="flex flex-col overflow-hidden">
                      <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mb-1 truncate">
                        {system.name}
                      </h3>
                      <span
                        className="text-[10px] sm:text-[12px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 sm:px-3 sm:py-1 rounded-full border self-start truncate max-w-full"
                        style={{
                          backgroundColor: `${system.accentColor}10`,
                          borderColor: `${system.accentColor}30`,
                          color: system.accentColor,
                        }}
                      >
                        {system.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-medium min-h-[60px]">
                    {system.description}
                  </p>

                  {/* Footer Tags */}
                  <div className="pt-5 border-t border-slate-100 flex flex-wrap gap-2">
                    {system.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-sm  font-bold text-slate-600 bg-slate-100/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md border border-slate-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dedicated Mobile Navigation Controls (Visible on mobile screens) */}
          <div className="flex sm:hidden items-center justify-center gap-4 mt-6 relative z-50">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-md text-xs font-bold text-[#0F172A] active:bg-slate-100"
            >
              <LuChevronLeft className="w-4 h-4 text-[#D27E2B]" /> Prev
            </button>
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              {activeIndex + 1} / {CONNECTED_SYSTEMS.length}
            </span>
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-md text-xs font-bold text-[#0F172A] active:bg-slate-100"
            >
              Next <LuChevronRight className="w-4 h-4 text-[#D27E2B]" />
            </button>
          </div>
        </div>
      </Row>
    </Section>
  );
}