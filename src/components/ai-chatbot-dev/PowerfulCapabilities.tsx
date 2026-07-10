"use client";

import React from "react";
import { motion } from "framer-motion";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Image from "next/image";
import SectionBadge from "../new-home-components/SectionBadge";

const BASE = "/ai-strategy/ai-chartbot-development";

const CAPABILITIES = [
  {
    title: "24/7 Availability",
    desc: "Deploy custom conversational AI agents that resolve customer queries instantly, providing seamless round-the-clock support without human intervention.",
    image: `${BASE}/24x7_Availability.png`,
  },
  {
    title: "Multi-language Support",
    desc: "Communicate globally with intelligent multilingual translation capabilities supporting over 100 languages naturally for localized client experiences.",
    image: `${BASE}/multi-language-support.png`,
  },
  {
    title: "Contextual Memory",
    desc: "Our state-of-the-art NLP models retain user preferences and past interactions to deliver hyper-personalized, context-aware chatbot conversations.",
    image: `${BASE}/contextual_memory.png`,
  },
  {
    title: "Knowledge Base Integration",
    desc: "Connect your AI agent to PDFs, websites, databases, and company wikis to generate accurate, source-backed answers in real-time.",
    image: `${BASE}/knowledge_base_Integration.png`,
  },
  {
    title: "CRM & API Integration",
    desc: "Synchronize data across platforms with pre-built connectors for Salesforce, HubSpot, and custom RESTful APIs for complete operational alignment.",
    image: `${BASE}/crm-api-integration.png`,
  },
  {
    title: "Lead Capture & Qualification",
    desc: "Automate top-of-funnel lead generation by qualifying visitors, collecting details, and routing warm prospects directly to your sales pipeline.",
    image: `${BASE}/lead-capture-qualification.png`,
  },
  {
    title: "Appointment Booking",
    desc: "Enable friction-free scheduling and calendar booking through conversational workflows integrated directly with Google Calendar or Outlook.",
    image: `${BASE}/appointment-booking.png`,
  },
  {
    title: "Order Tracking & Updates",
    desc: "Provide customers with real-time shipping milestones, delivery status, and order tracking notifications directly inside the chat window.",
    image: `${BASE}/order-tracking-updates.png`,
  },
  {
    title: "Payment & Invoice Support",
    desc: "Secure transactions using Stripe and PayPal integrations, allowing users to process payments and generate invoices directly in chat.",
    image: `${BASE}/payment-invoice-support.png`,
  },
  {
    title: "Analytics & Reporting",
    desc: "Optimize conversion rates with interactive dashboards tracking intent analysis, message volume, and customer satisfaction metrics.",
    image: `${BASE}/analytics-reporting.png`,
  },
  {
    title: "Workflow Automation",
    desc: "Connect conversational flows with backend processes using webhook triggers, automation routines, and instant messaging alerts.",
    image: `${BASE}/workflow-automation.png`,
  },
  {
    title: "Secure & Compliant",
    desc: "Designed with enterprise-grade data security protocols, secure token encryption, and full compliance with GDPR and HIPAA standards.",
    image: `${BASE}/secure-compliant.png`,
  },
];

export default function PowerfulCapabilities() {
  return (
    <Section className="bg-gray-50 py-20 border-y border-gray-100">
      <Row>
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center">
          <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="inline-block mb-4"
                    >
                      <SectionBadge title="Capabilities" />
                    </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-[#0F172A]"
          >
            Powerful{" "}
            <span className="text-[#D27E2B]">Capabilities</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-gray-500 font-medium max-w-xl leading-relaxed"
          >
            Everything you need to build, deploy and scale intelligent chatbots that
            automate conversations and deliver real business impact.
          </motion.p>
        </div>

        {/* 12-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map((cap, index) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative flex flex-col rounded-2xl bg-white border border-gray-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:cursor-pointer hover:shadow-[0_16px_48px_rgba(210,126,43,0.14)] hover:border-[#D27E2B]/30"
            >
              {/* Image */}
              <div className="mb-5 flex h-[90px] w-full items-center justify-start">
                <div className="relative h-[90px] w-[90px]">
                  <Image
                    src={cap.image}
                    alt={cap.title}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Title */}
              <h4 className="mb-2.5 text-sm font-extrabold leading-tight text-[#0F172A] sm:text-base">
                {cap.title}
              </h4>

              {/* Description */}
              <p className="text-sm leading-relaxed text-gray-500 font-medium">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Row>
    </Section>
  );
}