"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LuLanguages,
  LuShuffle,
  LuDatabase,
  LuCalendar,
  LuTrendingUp,
  LuZap,
  LuInfo,
  LuPhone,
  LuUserCheck,
  LuPackage,
  LuFileSearch,
  LuShieldAlert,
} from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";

const CAPABILITIES = [
  { title: "24/7 Availability", desc: "Instantly respond to customers anytime, day or night.", icon: LuInfo, color: "#3B82F6" },
  { title: "Multi-language Support", desc: "Converse in over 100 languages naturally.", icon: LuLanguages, color: "#10B981" },
  { title: "Contextual Memory", desc: "Remember past interactions to maintain continuity.", icon: LuDatabase, color: "#8B5CF6" },
  { title: "Knowledge Base Integration", desc: "Synch with docs, wiki pages, PDFs, and guides.", icon: LuFileSearch, color: "#F59E0B" },
  { title: "CRM & API Integration", desc: "Connect with Salesforce, HubSpot, and custom tools.", icon: LuShuffle, color: "#EF4444" },
  { title: "Lead Capture & Qualification", desc: "Ask questions, qualify prospects, and sync leads.", icon: LuUserCheck, color: "#14B8A6" },
  { title: "Appointment Booking", desc: "Schedule meetings and calendar sync seamlessly.", icon: LuCalendar, color: "#6366F1" },
  { title: "Order Tracking & Updates", desc: "Fetch real-time delivery status for orders.", icon: LuPackage, color: "#EC4899" },
  { title: "Payment & Invoice Support", desc: "Integrate Stripe or PayPal to generate invoices.", icon: LuZap, color: "#F43F5E" },
  { title: "Analytics & Reporting", desc: "Detailed logs, query trends, and resolution stats.", icon: LuTrendingUp, color: "#06B6D4" },
  { title: "Workflow Automation", desc: "Trigger background actions and notifications.", icon: LuZap, color: "#84CC16" },
  { title: "Secure & Compliant", desc: "GDPR ready, end-to-end data security.", icon: LuShieldAlert, color: "#64748B" },
];

export default function PowerfulCapabilities() {
  return (
    <Section className="bg-gray-50 py-20! border-y border-gray-100">
      <Row>
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D27E2B] mb-5 shadow-sm"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-[#0F172A]"
          >
            Powerful <span className="text-[#D27E2B]">Capabilities</span>
          </motion.h2>
          <div className="w-12 h-1 bg-[#D27E2B] mx-auto mt-4 rounded-full" />
        </div>

        {/* 12-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="bg-white rounded-2xl border border-gray-200/60 p-5 hover:border-[#D27E2B]/40 hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] transition-all duration-300 group flex flex-col items-start"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mb-4"
                  style={{ backgroundColor: `${cap.color}12`, color: cap.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-[#0F172A] mb-2 group-hover:text-[#D27E2B] transition-colors leading-tight">
                  {cap.title}
                </h4>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  {cap.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Row>
    </Section>
  );
}
