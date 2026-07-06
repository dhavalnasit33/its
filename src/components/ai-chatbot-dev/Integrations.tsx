"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuMessageSquare,
  LuUserCheck,
  LuLifeBuoy,
  LuZap,
  LuShoppingBag,
  LuCloud,
  LuCheck,
  LuArrowRight,
  LuPlug,
  LuLink2,
  LuRefreshCw,
  LuCode,
  LuShield,
  LuTrendingUp,
} from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Image from "next/image";

const BASE = "/ai-strategy/ai-chartbot-development";

const TABS = [
  {
    id: "communication",
    label: "Communication",
    icon: LuMessageSquare,
    tag: "COMMUNICATION",
    color: "#3B82F6",
    light: "#EAF3FF",
    border: "#BFDBFE",
    title: "Connect your chatbot with communication platforms",
    description: "Engage with your customers on the platforms they use the most. Never miss a conversation.",
    image: `${BASE}/communication.png`,
    features: [
      "Real-time messaging",
      "Instant notifications",
      "Seamless conversation sync",
      "Better customer engagement"
    ],
    integrations: [
      { name: "WhatsApp", image: `${BASE}/whatsapp-logo.svg`, desc: "Connect with customers on WhatsApp in real-time.", status: "Connected" },
      { name: "Slack", image: `${BASE}/slack-logo.svg`, desc: "Receive updates and respond within Slack.", status: "Connected" },
      { name: "Microsoft Teams", image: `${BASE}/team.svg`, desc: "Collaborate and chat seamlessly with Teams.", status: "Connected" },
      { name: "Telegram", image: `${BASE}/telegram-logo.svg`, desc: "Engage with your audience on Telegram instantly.", status: "Connected" },
      { name: "Messenger", image: `${BASE}/facebook-messenger-logo.svg`, desc: "Reply to Facebook Messenger conversations.", status: "Connected" }
    ]
  },
  {
    id: "crm",
    label: "CRM",
    icon: LuUserCheck,
    tag: "CRM",
    color: "#F97316",
    light: "#FFF2E8",
    border: "#FED7AA",
    title: "Convert conversations into sales opportunities",
    description: "Automatically create leads, update contacts, assign opportunities, and synchronize customer information.",
    image: `${BASE}/CRM.png`,
    features: [
      "Automated lead capture",
      "Two-way contact sync",
      "Sales pipeline updates",
      "Complete customer timeline"
    ],
    integrations: [
      { name: "HubSpot", image: `${BASE}/hubspot-logo.svg`, desc: "Sync contacts and automate lead management.", status: "Connected" },
      { name: "Salesforce", image: `${BASE}/salesforce-logo.svg`, desc: "Sync conversational data with Salesforce CRM.", status: "Connected" },
      { name: "Zoho CRM", image: `${BASE}/zoho-logo.svg`, desc: "Streamline customer relationships and deals.", status: "Connected" },
      { name: "Freshsales", image: `${BASE}/freshsales.svg`, desc: "Track sales pipelines and contact context.", status: "Connected" }
    ]
  },
  {
    id: "helpdesk",
    label: "Helpdesk",
    icon: LuLifeBuoy,
    tag: "HELPDESK",
    color: "#8B5CF6",
    light: "#F4F0FF",
    border: "#DDD6FE",
    title: "AI Customer support ticket automation",
    description: "Automatically create support tickets, classify customer issues, and route conversations to human agents.",
    image: `${BASE}/helpdesk.png`,
    features: [
      "Smart ticket creation",
      "Intelligent priority routing",
      "Auto issue classification",
      "Seamless agent handoff"
    ],
    integrations: [
      { name: "Zendesk", image: `${BASE}/zendesk.svg`, desc: "Create and update tickets from conversations.", status: "Connected" },
      { name: "Freshdesk", image: `${BASE}/freshdesk.svg`, desc: "Sync support queries and customer tickets.", status: "Connected" },
      { name: "Intercom", image: `${BASE}/intercom-logo.svg`, desc: "Deliver hybrid AI support with live chat.", status: "Connected" }
    ]
  },
  {
    id: "automation",
    label: "Automation",
    icon: LuZap,
    tag: "AUTOMATION",
    color: "#EC4899",
    light: "#FDF2F8",
    border: "#FBCFE8",
    title: "Automate every business workflow",
    description: "Connect your chatbot with automation platforms to eliminate repetitive tasks and run background workflows.",
    image: `${BASE}/automation.png`,
    features: [
      "Trigger event webhooks",
      "Run multi-app workflows",
      "Automate background tasks",
      "Integrate custom APIs"
    ],
    integrations: [
      { name: "Zapier", image: `${BASE}/zapier.svg`, desc: "Connect your chatbot to 6,000+ business apps.", status: "Connected" },
      { name: "Make", image: `${BASE}/make-logo.svg`, desc: "Create complex visual automation scenarios.", status: "Connected" },
      { name: "n8n", image: `${BASE}/n8n-logo.svg`, desc: "Build secure node-based workflow integrations.", status: "Connected" }
    ]
  },
  {
    id: "ecommerce",
    label: "Ecommerce",
    icon: LuShoppingBag,
    tag: "ECOMMERCE",
    color: "#10B981",
    light: "#ECFDF5",
    border: "#A7F3D0",
    title: "Sell more with AI-powered commerce",
    description: "Deliver personalized shopping experiences, automate order tracking, and improve customer satisfaction.",
    image: `${BASE}/e-commerce.png`,
    features: [
      "Live order tracking status",
      "Smart product search",
      "Personalized recommendations",
      "Cart recovery workflows"
    ],
    integrations: [
      { name: "Shopify", image: `${BASE}/shopify.svg`, desc: "Sync catalog and process order lookups.", status: "Connected" },
      { name: "WooCommerce", image: `${BASE}/wooCommerce.svg`, desc: "Automate WordPress store customer queries.", status: "Connected" },
      { name: "Magento", image: `${BASE}/magento.svg`, desc: "Enterprise ecommerce catalog integrations.", status: "Connected" }
    ]
  },
  {
    id: "cloud",
    label: "Cloud & Storage",
    icon: LuCloud,
    tag: "CLOUD STORAGE",
    color: "#06B6D4",
    light: "#ECFEFF",
    border: "#A5F3FC",
    title: "Access your knowledge bases instantly",
    description: "Connect cloud storage platforms so your AI chatbot can search files and answer questions based on documents.",
    image: `${BASE}/cloud-storage.png`,
    features: [
      "Vector document search",
      "Real-time knowledge sync",
      "Secure cloud file access",
      "Instant info retrieval"
    ],
    integrations: [
      { name: "Google Drive", image: `${BASE}/google-drive.svg`, desc: "Ingest and search Drive docs securely.", status: "Connected" },
      { name: "Dropbox", image: `${BASE}/dropbox-logo.svg`, desc: "Sync files to knowledge databases.", status: "Connected" },
      { name: "OneDrive", image: `${BASE}/onedrive-logo.svg`, desc: "Access corporate SharePoint and OneDrive.", status: "Connected" },
      { name: "Notion", image: `${BASE}/notion-logo.svg`, desc: "Search workspace wikis and knowledge bases.", status: "Connected" }
    ]
  }
];

const HIGHLIGHTS = [
  { title: "100+", desc: "Integrations", icon: LuLink2 },
  { title: "Real-time", desc: "Data Sync", icon: LuRefreshCw },
  { title: "No-code", desc: "Easy Setup", icon: LuCode },
  { title: "Secure", desc: "& Reliable", icon: LuShield },
  { title: "Scalable", desc: "For Any Business", icon: LuTrendingUp },
  { title: "Automated", desc: "Workflows", icon: LuZap }
];

export default function Integrations() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const activeData = TABS.find((t) => t.id === activeTab) || TABS[0];
  const { color, light, border } = activeData;

  return (
    <Section className="py-24! overflow-hidden relative bg-[#FAFBFD]">
      <Row>
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full bg-[#D27E2B]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D27E2B] mb-5"
          >
            INTEGRATION CATEGORIES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-[#0F172A]"
          >
            Connect With Your <span className="text-[#D27E2B]">Favorite Tools</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-gray-500 font-medium max-w-xl leading-relaxed"
          >
            Easily connect your AI chatbot with the tools you already use and automate your workflows seamlessly.
          </motion.p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-5xl mx-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-300"
                style={
                  isActive
                    ? {
                        background: "#0F172A",
                        borderColor: "#0F172A",
                        color: "#fff",
                        boxShadow: `0 4px 16px ${tab.color}30`,
                      }
                    : {
                        background: "#fff",
                        borderColor: "#E2E8F0",
                        color: "#64748B",
                      }
                }
              >
                <Icon
                  className="w-4 h-4 transition-colors duration-300"
                  style={{ color: isActive ? tab.color : "#94A3B8" }}
                />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-[24px] p-8 mb-12 mx-auto overflow-hidden"
            style={{
              border: `1.5px solid ${border}`,
              boxShadow: `0 12px 40px ${color}12`,
            }}
          >
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-stretch">

              {/* Left Column */}
              <div className="flex-1 flex flex-col justify-center gap-6">
                {/* Tag */}
                <span
                  className="inline-block w-fit text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ background: light, color: color }}
                >
                  {activeData.tag}
                </span>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] leading-tight mb-3">
                    {activeData.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">
                    {activeData.description}
                  </p>

                  {/* Checklist */}
                  <div className="grid grid-cols-1   gap-3">
                    {activeData.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: light }}
                        >
                          <LuCheck className="w-3 h-3 stroke-3" style={{ color: color }} />
                        </span>
                        <span className="text-xs sm:text-sm text-gray-700 font-semibold">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Column: 3D Illustration */}
              <div className="w-full lg:flex-1 min-w-[280px] max-w-[420px] flex items-center justify-center shrink-0 mx-auto">
                <div className="relative w-[320px] h-[320px] lg:w-[360px] lg:h-[360px] flex items-center justify-center">
                  <Image
                    src={activeData.image}
                    alt={activeData.label}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Integration Cards */}
              <div className="w-full lg:w-[40%] flex flex-col gap-3 justify-center shrink-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeData.integrations.map((integration, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-5 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        border: `1.5px solid ${border}`,
                        boxShadow: `0 4px 12px ${color}08`,
                      }}
                    >
                      {/* Logo */}
                      <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
                        <Image
                          src={integration.image}
                          alt={integration.name}
                          fill
                          className="object-contain"
                        />
                      </div>

                      {/* Name + desc */}
                      <div>
                        <h4 className="text-sm font-extrabold text-[#0F172A] mb-1">
                          {integration.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed max-w-[180px]">
                          {integration.desc}
                        </p>
                      </div>

                      {/* Status pill — colored per tab */}
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-full"
                        style={{ background: light, color: color, border: `1px solid ${border}` }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full animate-pulse"
                          style={{ background: color }}
                        />
                        {integration.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>


        {/* Highlights Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-100 p-4 shadow-xs flex flex-col items-center text-center gap-2 hover:shadow-md hover:border-gray-200 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: light, color: color }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-sm sm:text-base font-extrabold text-[#0F172A] leading-tight">
                    {item.title}
                  </h5>
                  <p className="text-[14px] sm:text-[15px] text-gray-400 font-medium leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </Row>
    </Section>
  );
}
