"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuCheck,
  LuArrowRight,
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
    chatPreview: {
      botName: "Health Bot",
      avatar: "🏥",
      userMsg: "Can I book an appointment with Dr. Smith?",
      botMsg:
        "I found an open slot today at 4:30 PM. Would you like me to book it for you? 📅",
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
    chatPreview: {
      botName: "Wealth Guard",
      avatar: "💳",
      userMsg: "What's my credit card balance?",
      botMsg:
        "Your current balance is $420.50. Payment is due by next Tuesday, July 8th. 📆",
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
    chatPreview: {
      botName: "Retail Concierge",
      avatar: "🛍️",
      userMsg: "Where is my parcel #1029?",
      botMsg:
        "Your parcel is with the courier and will arrive today between 1:00 PM and 3:00 PM. 📦",
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
    chatPreview: {
      botName: "Inspire Campus",
      avatar: "🎓",
      userMsg: "When is the Python exam?",
      botMsg:
        "The Python Basics exam is scheduled for July 12th at 10:00 AM in Room 302. 📝",
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
    chatPreview: {
      botName: "Property Finder",
      avatar: "🏡",
      userMsg: "Are there 3-bed houses under $400k?",
      botMsg:
        "Yes, I found 3 matching properties in your target zip code. Would you like to view the list? 📋",
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
    chatPreview: {
      botName: "Fly Assist",
      avatar: "✈️",
      userMsg: "Can I add 1 extra bag to flight AA-34?",
      botMsg:
        "Yes, you can add 1 bag for $35. Would you like to charge your card on file? 💳",
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
    chatPreview: {
      botName: "LogiBot",
      avatar: "🚛",
      userMsg: "What's the status of cargo container 88A?",
      botMsg:
        "Container 88A has cleared customs and is currently en route to the dispatch hub. 📍",
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
    chatPreview: {
      botName: "Cart Genius",
      avatar: "⚡",
      userMsg: "Do you have any active promo codes?",
      botMsg:
        "I've applied coupon 'SAVE15' for 15% off your order! Your new total is $84.15. 🛒",
    },
  },
];

export default function IndustryUseCases() {
  const [activeTab, setActiveTab] = useState(INDUSTRIES[0].id);
  const activeData =
    INDUSTRIES.find((ind) => ind.id === activeTab) || INDUSTRIES[0];

  return (
    <Section className=" py-24! overflow-hidden relative">
      {/* Subtle background accents */}
      <div className="pointer-events-none absolute left-[-200px] top-0 h-[500px] w-[500px] rounded-full bg-[#D27E2B]/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-200px] bottom-0 h-[500px] w-[500px] rounded-full bg-blue-500/3 blur-[120px]" />

      <Row>
        {/* Header */}
        <div className="relative z-10 mx-auto mb-16 max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D27E2B] shadow-sm"
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
            Tailored AI chatbot solutions for every industry — from healthcare to
            ecommerce.
          </motion.p>
        </div>

        {/* Industry Tab Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative z-10 mb-8 flex flex-wrap items-center justify-center gap-2.5"
        >
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            const isActive = ind.id === activeTab;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all duration-300 ${
                  isActive
                    ? "border-transparent text-white shadow-lg scale-105"
                    : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                }`}
                style={
                  isActive
                    ? {
                        background: `linear-gradient(135deg, ${ind.color}CC, ${ind.color}88)`,
                        boxShadow: `0 4px 20px ${ind.color}40`,
                      }
                    : {}
                }
              >
                <Icon className="h-3.5 w-3.5" />
                {ind.name}
              </button>
            );
          })}
        </motion.div>

        {/* Main Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
          >
            {/* Top edge highlight */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${activeData.color}80, transparent)`,
              }}
            />

            <div className="flex flex-col md:flex-row items-stretch">
              {/* Left: Text Content */}
              <div className="flex flex-1 flex-col justify-center gap-6 p-8 md:p-10">
                {/* Industry label */}
                <div
                  className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-widest"
                  style={{
                    background: `${activeData.color}15`,
                    color: activeData.color,
                    border: `1px solid ${activeData.color}30`,
                  }}
                >
                  <activeData.icon className="h-3.5 w-3.5" />
                  {activeData.name}
                </div>

                <div>
                  <h3 className="text-2xl font-black text-[#0F172A] sm:text-3xl mb-3">
                    {activeData.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed sm:text-base font-medium max-w-md">
                    {activeData.description}
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  {activeData.benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.06 }}
                      className="flex items-start gap-3"
                    >
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                        style={{ background: `${activeData.color}20` }}
                      >
                        <LuCheck
                          className="h-3 w-3"
                          style={{ color: activeData.color }}
                        />
                      </span>
                      <span className="text-sm font-semibold text-gray-700 leading-snug">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#contact-form-section"
                  className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-extrabold transition-all duration-300 hover:gap-3"
                  style={{
                    color: activeData.color,
                    borderColor: `${activeData.color}40`,
                    background: `${activeData.color}08`,
                  }}
                >
                  Explore This Use Case
                  <LuArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Right: Premium Chat Preview */}
              <div className="flex w-full shrink-0 items-center justify-center border-t border-gray-100 bg-gray-50/60 p-8 md:w-[340px] md:border-l md:border-t-0">
                <div
                  className="relative w-full max-w-[300px] overflow-hidden rounded-2xl border shadow-xl"
                  style={{
                    background: "#ffffff",
                    borderColor: `${activeData.color}30`,
                    boxShadow: `0 8px 30px rgba(0,0,0,0.08), 0 0 0 1px ${activeData.color}15`,
                  }}
                >
                  {/* Chat header */}
                  <div
                    className="flex items-center gap-3 border-b px-4 py-3"
                    style={{ borderColor: `${activeData.color}20` }}
                  >
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full text-lg"
                      style={{ background: `${activeData.color}20` }}
                    >
                      {activeData.chatPreview.avatar}
                    </div>
                    <div>
                      <h5 className="text-[12px] font-black text-gray-900 leading-none">
                        {activeData.chatPreview.botName}
                      </h5>
                      <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        Online
                      </span>
                    </div>
                    <div className="ml-auto">
                      <LuBot
                        className="h-5 w-5"
                        style={{ color: activeData.color }}
                      />
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="flex flex-col gap-3 p-4 pb-3 min-h-[200px] justify-end">
                    {/* User message */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="flex justify-end"
                    >
                      <div
                        className="max-w-[85%] rounded-2xl rounded-tr-none px-3 py-2 shadow-sm"
                        style={{
                          background: `linear-gradient(135deg, ${activeData.color}CC, ${activeData.color}99)`,
                        }}
                      >
                        <p className="text-[11px] font-semibold text-white leading-relaxed">
                          {activeData.chatPreview.userMsg}
                        </p>
                      </div>
                    </motion.div>

                    {/* Bot response */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="flex items-start gap-2 max-w-[85%]"
                    >
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px]"
                        style={{ background: `${activeData.color}15` }}
                      >
                        {activeData.chatPreview.avatar}
                      </div>
                      <div
                        className="rounded-2xl rounded-tl-none border px-3 py-2 shadow-sm"
                        style={{
                          background: "#f8fafc",
                          borderColor: `${activeData.color}25`,
                        }}
                      >
                        <p className="text-[11px] font-semibold text-gray-700 leading-relaxed">
                          {activeData.chatPreview.botMsg}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Input row */}
                  <div
                    className="flex items-center gap-2 border-t px-3 py-2.5"
                    style={{ borderColor: `${activeData.color}15` }}
                  >
                    <div className="flex-1 rounded-xl bg-gray-50 border border-gray-200 px-3 py-1.5 text-[10px] text-gray-400 font-semibold">
                      Type message...
                    </div>
                    <button
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl transition-opacity hover:opacity-80"
                      style={{ background: `${activeData.color}CC` }}
                    >
                      <LuSend className="h-3 w-3 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Row>
    </Section>
  );
}
