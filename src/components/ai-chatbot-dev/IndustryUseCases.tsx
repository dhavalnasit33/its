"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuCheck,
  LuActivity,
  LuDollarSign,
  LuShoppingBag,
  LuGraduationCap,
  LuGlobe,
  LuPlane,
  LuTruck,
  LuLaptop,
  LuBot,
  LuSend, 
} from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";

const INDUSTRIES = [
  {
    id: "healthcare",
    name: "Healthcare",
    icon: LuActivity,
    color: "#3B82F6",
    title: "Healthcare Assistant",
    description:
      "Automate patient scheduling, answer treatment FAQs, and handle preliminary symptom triage securely.",
    benefits: [
      "Secure patient data management (HIPAA-aligned)",
      "Instant appointment scheduling & doctor calendars sync",
      "Symptom checker & triage routing to specialist staff",
    ],
    stat: { value: "68%", label: "Faster Response" },
    chatPreview: {
      botName: "Health Bot",
      avatar: "🏥",
      userMsg: "Can I book an appointment with Dr. Smith?",
      botMsg: "I found an open slot today at 4:30 PM. Would you like me to book it for you? 📅",
    },
  },
  {
    id: "finance",
    name: "Finance",
    icon: LuDollarSign,
    color: "#10B981",
    title: "Finance & Wealth Bot",
    description:
      "Respond to account queries, calculate loan qualifications, and streamline basic card service operations.",
    benefits: [
      "Secure account verification & balance checks",
      "Instant mortgage & loan interest calculations",
      "Proactive budget tracking & spending warnings",
    ],
    stat: { value: "3x", label: "Resolution Speed" },
    chatPreview: {
      botName: "Wealth Guard",
      avatar: "💳",
      userMsg: "What's my credit card balance?",
      botMsg: "Your current balance is $420.50. Payment is due by next Tuesday, July 8th. 📆",
    },
  },
  {
    id: "retail",
    name: "Retail",
    icon: LuShoppingBag,
    color: "#F59E0B",
    title: "Retail Support Assistant",
    description:
      "Track shipment deliveries, manage return tickets, and address product sizing questions.",
    benefits: [
      "Shipment updates & automated live tracking reports",
      "Return code creation & refund approval assistance",
      "Size and dimension chart recommendation bots",
    ],
    stat: { value: "91%", label: "CSAT Score" },
    chatPreview: {
      botName: "Retail Concierge",
      avatar: "🛍️",
      userMsg: "Where is my parcel #1029?",
      botMsg: "Your parcel is with the courier and will arrive today between 1:00 PM and 3:00 PM. 📦",
    },
  },
  {
    id: "education",
    name: "Education",
    icon: LuGraduationCap,
    color: "#8B5CF6",
    title: "Education & Campus Bot",
    description:
      "Guide student course selections, process registrar FAQs, and manage campus event schedules.",
    benefits: [
      "Registrar FAQ response & class schedules query",
      "Course enrollment guide & prerequisite validation",
      "Campus events announcement & map location finding",
    ],
    stat: { value: "80%", label: "Query Automation" },
    chatPreview: {
      botName: "Inspire Campus",
      avatar: "🎓",
      userMsg: "When is the Python exam?",
      botMsg: "The Python Basics exam is scheduled for July 12th at 10:00 AM in Room 302. 📝",
    },
  },
  {
    id: "realestate",
    name: "Real Estate",
    icon: LuGlobe,
    color: "#EC4899",
    title: "Real Estate Property Bot",
    description:
      "Match prospective buyers with listings, schedule property tours, and collect lead criteria.",
    benefits: [
      "Lead budget & property preferences filtering",
      "Instant home viewing tour appointment booking",
      "Mortgage calculator & documentation checklist",
    ],
    stat: { value: "2x", label: "Lead Conversion" },
    chatPreview: {
      botName: "Property Finder",
      avatar: "🏡",
      userMsg: "Are there 3-bed houses under $400k?",
      botMsg: "Yes, I found 3 matching properties in your target zip code. Would you like to view the list? 📋",
    },
  },
  {
    id: "travel",
    name: "Travel",
    icon: LuPlane,
    color: "#06B6D4",
    title: "Travel & Booking Agent",
    description:
      "Automate booking changes, cancel flight tickets, and guide baggage policy inquiries.",
    benefits: [
      "Flight status lookup & booking confirmation checks",
      "Ticket cancellation & travel credit calculations",
      "Baggage fee guidelines & check-in reminders",
    ],
    stat: { value: "24/7", label: "Availability" },
    chatPreview: {
      botName: "Fly Assist",
      avatar: "✈️",
      userMsg: "Can I add 1 extra bag to flight AA-34?",
      botMsg: "Yes, you can add 1 bag for $35. Would you like to charge your card on file? 💳",
    },
  },
  {
    id: "logistics",
    name: "Logistics",
    icon: LuTruck,
    color: "#EF4444",
    title: "Logistics & Dispatch Assistant",
    description:
      "Query fleet shipping timelines, confirm delivery addresses, and report cargo exceptions.",
    benefits: [
      "Real-time dispatch schedules & driver assignment logs",
      "Customer address verification & location confirmation",
      "Cargo delays notification & priority rescheduling",
    ],
    stat: { value: "55%", label: "Cost Reduction" },
    chatPreview: {
      botName: "LogiBot",
      avatar: "🚛",
      userMsg: "What's the status of cargo container 88A?",
      botMsg: "Container 88A has cleared customs and is currently en route to the dispatch hub. 📍",
    },
  },
  {
    id: "ecommerce",
    name: "Ecommerce",
    icon: LuLaptop,
    color: "#D27E2B",
    title: "Ecommerce Recommendation Bot",
    description:
      "Provide personalized shopping recommendations, apply coupon discounts, and recover abandoned carts.",
    benefits: [
      "Dynamic product recommendations matching visitor history",
      "Discount coupon validations & abandoned cart recovery",
      "Direct checkout links & support routing",
    ],
    stat: { value: "35%", label: "Revenue Uplift" },
    chatPreview: {
      botName: "Cart Genius",
      avatar: "⚡",
      userMsg: "Do you have any active promo codes?",
      botMsg: "I've applied coupon 'SAVE15' for 15% off your order! Your new total is $84.15. 🛒",
    },
  },
];

export default function IndustryUseCases() {
  const [activeTab, setActiveTab] = useState(INDUSTRIES[0].id);
  const activeData = INDUSTRIES.find((ind) => ind.id === activeTab) || INDUSTRIES[0];

  return (
    <Section className="py-24! overflow-hidden relative">
      <div className="pointer-events-none absolute left-[-200px] top-0 h-[600px] w-[600px] rounded-full bg-[#D27E2B]/4 blur-[130px]" />
      <div className="pointer-events-none absolute right-[-200px] bottom-0 h-[500px] w-[500px] rounded-full bg-blue-400/4 blur-[130px]" />

      <Row>
        {/* ── Header ── */}
        <div className="relative z-10 mx-auto mb-14 max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center rounded-full border border-[#D27E2B]/20 bg-[#D27E2B]/8 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D27E2B]"
          >
            Use Cases
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-[#0F172A]"
          >
            Chatbot Use Cases{" "}
            <span className="text-[#D27E2B]">Across Industries</span>
          </motion.h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#D27E2B]" />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-sm font-medium text-gray-500 sm:text-base"
          >
            Tailored AI chatbot solutions for every industry — from healthcare to ecommerce.
          </motion.p>
        </div>

        {/* ── Main Layout ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8"
        >
          {/* ── LEFT: Vertical Sidebar Tabs (Centered grid/row on mobile) ── */}
          <div className="flex flex-row flex-wrap justify-center gap-2 lg:w-[200px] lg:flex-col lg:flex-nowrap lg:gap-1.5 lg:shrink-0 w-full ">
            {INDUSTRIES.map((ind) => {
              const Icon = ind.icon;
              const isActive = ind.id === activeTab;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveTab(ind.id)}
                  className={`cursor-pointer group flex items-center justify-center lg:justify-start gap-2.5 rounded-xl border p-2.5 sm:px-3.5 sm:py-2.5 text-xs font-bold uppercase tracking-wide transition-all duration-250 shrink-0 ${
                    isActive
                      ? "border-transparent text-white shadow-lg"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-800 hover:shadow-sm hover:-translate-y-0.5"
                  }`}
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(135deg, ${ind.color}E6, ${ind.color}AA)`,
                          boxShadow: `0 6px 24px ${ind.color}35`,
                        }
                      : {}
                  }
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition-all duration-250"
                    style={
                      isActive
                        ? { background: "rgba(255,255,255,0.25)" }
                        : { background: `${ind.color}15`, color: ind.color }
                    }
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="hidden sm:inline">{ind.name}</span>
                </button>
              );
            })}
          </div>

          {/* ── RIGHT: Content Panel ── */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.07)]"
              >
                {/* Colored top stripe */}
                <div
                  className="absolute inset-x-0 top-0 h-1 rounded-t-2xl"
                  style={{
                    background: `linear-gradient(90deg, ${activeData.color}, ${activeData.color}60, transparent)`,
                  }}
                />

                <div className="flex flex-col md:flex-row">
                  {/* Content Left */}
                  <div className="flex flex-1 flex-col gap-6 p-7 md:p-8">
                    {/* Industry badge + stat */}
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-widest"
                        style={{
                          background: `${activeData.color}12`,
                          color: activeData.color,
                          border: `1px solid ${activeData.color}25`,
                        }}
                      >
                        <activeData.icon className="h-3.5 w-3.5" />
                        {activeData.name}
                      </div>
                      {/* Stat badge */}
                      <div
                        className="flex flex-col items-end rounded-xl px-3.5 py-2 text-right"
                        style={{ background: `${activeData.color}08`, border: `1px solid ${activeData.color}20` }}
                      >
                        <span className="text-xl font-black leading-none" style={{ color: activeData.color }}>
                          {activeData.stat.value}
                        </span>
                        <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-400">
                          {activeData.stat.label}
                        </span>
                      </div>
                    </div>

                    {/* Title + description */}
                    <div>
                      <h3 className="mb-2.5 text-xl font-black text-[#0F172A] sm:text-2xl">
                        {activeData.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-500 font-medium sm:text-base max-w-md">
                        {activeData.description}
                      </p>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-2.5">
                      {activeData.benefits.map((benefit, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.07 }}
                          className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5"
                        >
                          <span
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                            style={{ background: `${activeData.color}18` }}
                          >
                            <LuCheck className="h-3 w-3" style={{ color: activeData.color }} />
                          </span>
                          <span className="text-xs font-semibold text-gray-700 sm:text-sm">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>

                  
                  </div>

                  {/* Chat Preview Right */}
                  <div
                    className="flex w-full shrink-0 items-center justify-center border-t border-gray-100 p-6 md:w-[300px] md:border-l md:border-t-0"
                    style={{ background: `${activeData.color}05` }}
                  >
                    <div
                      className="w-full overflow-hidden rounded-2xl border bg-white shadow-lg"
                      style={{
                        borderColor: `${activeData.color}25`,
                        boxShadow: `0 8px 32px ${activeData.color}15`,
                      }}
                    >
                      {/* Chat header */}
                      <div
                        className="flex items-center gap-3 border-b px-4 py-3"
                        style={{
                          background: `linear-gradient(135deg, ${activeData.color}12, ${activeData.color}06)`,
                          borderColor: `${activeData.color}18`,
                        }}
                      >
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-full text-base shadow-sm"
                          style={{ background: `${activeData.color}20` }}
                        >
                          {activeData.chatPreview.avatar}
                        </div>
                        <div className="flex-1">
                          <h5 className="text-[12px] font-black text-gray-900 leading-none">
                            {activeData.chatPreview.botName}
                          </h5>
                          <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                            Online
                          </span>
                        </div>
                        <LuBot className="h-4 w-4 opacity-50" style={{ color: activeData.color }} />
                      </div>

                      {/* Messages */}
                      <div className="flex min-h-[180px] flex-col justify-end gap-3 p-4">
                        {/* User */}
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="flex justify-end"
                        >
                          <div
                            className="max-w-[88%] rounded-2xl rounded-tr-sm px-3 py-2"
                            style={{
                              background: `linear-gradient(135deg, ${activeData.color}D9, ${activeData.color}A0)`,
                            }}
                          >
                            <p className="text-[11px] font-semibold leading-relaxed text-white">
                              {activeData.chatPreview.userMsg}
                            </p>
                          </div>
                        </motion.div>

                        {/* Bot */}
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.28 }}
                          className="flex items-end gap-2 max-w-[88%]"
                        >
                          <div
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px]"
                            style={{ background: `${activeData.color}18` }}
                          >
                            {activeData.chatPreview.avatar}
                          </div>
                          <div
                            className="rounded-2xl rounded-tl-sm border px-3 py-2"
                            style={{
                              background: "#F8FAFC",
                              borderColor: `${activeData.color}20`,
                            }}
                          >
                            <p className="text-[11px] font-semibold leading-relaxed text-gray-700">
                              {activeData.chatPreview.botMsg}
                            </p>
                          </div>
                        </motion.div>
                      </div>

                      {/* Input */}
                      <div
                        className="flex items-center gap-2 border-t px-3 py-2.5"
                        style={{ borderColor: `${activeData.color}12` }}
                      >
                        <div className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-[10px] font-semibold text-gray-400">
                          Type message...
                        </div>
                        <button
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl shadow-sm transition-opacity hover:opacity-80"
                          style={{ background: activeData.color }}
                        >
                          <LuSend className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </Row>
    </Section>
  );
}
