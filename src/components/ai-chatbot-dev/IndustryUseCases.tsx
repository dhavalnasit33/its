"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuCheck, LuArrowRight, LuActivity, LuDollarSign, LuShoppingBag, LuGraduationCap, LuGlobe, LuPlane, LuTruck, LuLaptop } from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";

const INDUSTRIES = [
  {
    id: "healthcare",
    name: "Healthcare",
    icon: LuActivity,
    title: "Healthcare Assistant",
    description: "Automate patient scheduling, answer treatment FAQs, and handle preliminary symptom triage securely.",
    benefits: [
      "Secure patient data management (HIPAA-aligned)",
      "Instant appointment scheduling & doctor calendars sync",
      "Symptom checker & triage routing to specialist staff",
    ],
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
    title: "Finance & Wealth Bot",
    description: "Respond to account queries, calculate loan qualifications, and streamline basic card service operations.",
    benefits: [
      "Secure account verification & balance checks",
      "Instant mortgage & loan interest calculations",
      "Proactive budget tracking & spending warnings",
    ],
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
    title: "Retail Support Assistant",
    description: "Track shipment deliveries, manage return tickets, and address product sizing questions.",
    benefits: [
      "Shipment updates & automated live tracking reports",
      "Return code creation & refund approval assistance",
      "Size and dimension chart recommendation bots",
    ],
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
    title: "Education & Campus Bot",
    description: "Guide student course selections, process registrar FAQs, and manage campus event schedules.",
    benefits: [
      "Registrar FAQ response & class schedules query",
      "Course enrollment guide & prerequisite validation",
      "Campus events announcement & map location finding",
    ],
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
    title: "Real Estate Property Bot",
    description: "Match prospective buyers with listings, schedule property tours, and collect lead criteria.",
    benefits: [
      "Lead budget & property preferences filtering",
      "Instant home viewing tour appointment booking",
      "Mortgage calculator & documentation checklist",
    ],
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
    title: "Travel & Booking Agent",
    description: "Automate booking changes, cancel flight tickets, and guide baggage policy inquiries.",
    benefits: [
      "Flight status lookup & booking confirmation checks",
      "Ticket cancellation & travel credit calculations",
      "Baggage fee guidelines & check-in reminders",
    ],
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
    title: "Logistics & Dispatch Assistant",
    description: "Query fleet shipping timelines, confirm delivery addresses, and report cargo exceptions.",
    benefits: [
      "Real-time dispatch schedules & driver assignment logs",
      "Customer address verification & location confirmation",
      "Cargo delays notification & priority rescheduling",
    ],
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
    title: "Ecommerce Recommendation Bot",
    description: "Provide personalized shopping recommendations, apply coupon discounts, and recover abandoned carts.",
    benefits: [
      "Dynamic product recommendations matching visitor history",
      "Discount coupon validations & abandoned cart recovery",
      "Direct checkout links & support routing",
    ],
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
    <Section className="bg-white py-20!">
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
            Use Cases
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-[#0F172A]"
          >
            Chatbot Use Cases <span className="text-[#D27E2B]">Across Industries</span>
          </motion.h2>
          <div className="w-12 h-1 bg-[#D27E2B] mx-auto mt-4 rounded-full" />
        </div>

        {/* Outer Split Layout */}
        <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-16 w-full max-w-6xl mx-auto mt-8">
          
          {/* Left Column: Interactive tabs */}
          <div className="w-full lg:w-[32%] flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide shrink-0">
            {INDUSTRIES.map((ind) => {
              const Icon = ind.icon;
              const isActive = ind.id === activeTab;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveTab(ind.id)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl border text-left font-bold transition-all whitespace-nowrap lg:whitespace-normal shrink-0 lg:shrink ${
                    isActive
                      ? "bg-[#0F172A] text-white border-[#0F172A] shadow-md scale-102"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#D27E2B]/50 hover:bg-gray-50"
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-[#D27E2B]" : "text-gray-400"}`} />
                  <span className="text-sm">{ind.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Content + Dynamic Mock Phone */}
          <div className="flex-1 flex flex-col md:flex-row items-center md:items-stretch gap-8 bg-gray-50 rounded-[24px] border border-gray-200/60 p-8 shadow-sm relative min-h-[380px]">
            
            {/* Dynamic textual info */}
            <div className="flex-1 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeData.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                    {activeData.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-semibold leading-relaxed">
                    {activeData.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {activeData.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#D27E2B]/10 flex items-center justify-center mt-0.5">
                          <LuCheck className="w-3 h-3 text-[#D27E2B] stroke-[3]" />
                        </span>
                        <span className="text-xs sm:text-sm text-gray-700 font-bold leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <a
                href="#contact-form-section"
                className="inline-flex items-center gap-2 mt-8 text-xs sm:text-sm font-extrabold text-[#D27E2B] hover:gap-3 transition-all self-start"
              >
                Explore All Use Cases
                <LuArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Simulated Live Phone Preview */}
            <div className="w-[280px] shrink-0 bg-white rounded-3xl border border-gray-200 shadow-lg p-3 flex flex-col justify-between relative overflow-hidden h-[340px]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-gray-150 rounded-b-xl" /> {/* Notch */}
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeData.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-between h-full pt-4"
                >
                  {/* Phone Header */}
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-[#D27E2B]/10 flex items-center justify-center text-xs">
                      {activeData.chatPreview.avatar}
                    </div>
                    <div>
                      <h5 className="text-[10px] font-black text-gray-900 leading-none">{activeData.chatPreview.botName}</h5>
                      <span className="text-[8px] text-green-500 font-bold mt-0.5 inline-block">Online</span>
                    </div>
                  </div>

                  {/* Message body */}
                  <div className="flex-1 flex flex-col justify-end space-y-2 pb-4">
                    {/* User bubble */}
                    <div className="bg-[#D27E2B] p-2 rounded-2xl rounded-tr-none text-white shadow-sm max-w-[85%] self-end">
                      <p className="text-[10px] font-semibold leading-normal">
                        {activeData.chatPreview.userMsg}
                      </p>
                    </div>

                    {/* Bot bubble */}
                    <div className="flex gap-1.5 items-start max-w-[85%] self-start">
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-[10px]">🤖</div>
                      <div className="bg-gray-50 border border-gray-200/60 p-2 rounded-2xl rounded-tl-none shadow-sm">
                        <p className="text-[10px] text-gray-800 font-semibold leading-normal">
                          {activeData.chatPreview.botMsg}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Input box */}
                  <div className="border-t border-gray-100 pt-2 flex gap-1.5">
                    <div className="bg-gray-50 border border-gray-200/60 rounded-lg px-2 py-1.5 text-[9px] flex-1 text-gray-400 font-semibold">
                      Type message...
                    </div>
                    <div className="bg-[#0F172A] text-white px-2.5 py-1.5 rounded-lg text-[9px] font-bold cursor-default">
                      Send
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Row>
    </Section>
  );
}
