"use client";

import React from "react";
import { motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Image from "next/image";

const BASE = "/ai-strategy/ai-chartbot-development";

const CAPABILITIES = [
  {
    title: "24/7 Availability",
    desc: "Always on to support your customers anytime, day or night.",
    image: `${BASE}/24x7_Availability.png`,
  },
  {
    title: "Multi-language Support",
    desc: "Communicate naturally in 100+ languages across the globe.",
    image: `${BASE}/multi-language-support.png`,
  },
  {
    title: "Contextual Memory",
    desc: "Remembers past interactions and provides personalized responses.",
    image: `${BASE}/contextual_memory.png`,
  },
  {
    title: "Knowledge Base Integration",
    desc: "Sync documents, PDFs, URLs and knowledge sources seamlessly.",
    image: `${BASE}/knowledge_base_Integration.png`,
  },
  {
    title: "CRM & API Integration",
    desc: "Connect with CRM, APIs and third-party tools effortlessly.",
    image: `${BASE}/crm-api-integration.png`,
  },
  {
    title: "Lead Capture & Qualification",
    desc: "Capture leads, qualify prospects and sync directly to your CRM.",
    image: `${BASE}/lead-capture-qualification.png`,
  },
  {
    title: "Appointment Booking",
    desc: "Schedule, reschedule and manage appointments automatically.",
    image: `${BASE}/appointment-booking.png`,
  },
  {
    title: "Order Tracking & Updates",
    desc: "Provide real-time order status and delivery updates instantly.",
    image: `${BASE}/order-tracking-updates.png`,
  },
  {
    title: "Payment & Invoice Support",
    desc: "Generate invoices and handle payments securely in chat.",
    image: `${BASE}/payment-invoice-support.png`,
  },
  {
    title: "Analytics & Reporting",
    desc: "Track conversations, performance and customer satisfaction.",
    image: `${BASE}/analytics-reporting.png`,
  },
  {
    title: "Workflow Automation",
    desc: "Automate tasks, triggers and notifications with smart workflows.",
    image: `${BASE}/workflow-automation.png`,
  },
  {
    title: "Secure & Compliant",
    desc: "Enterprise-grade security with GDPR ready infrastructure.",
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
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full bg-[#D27E2B]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D27E2B] mb-5"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-[#0F172A]"
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
              className="group relative flex flex-col rounded-2xl bg-white border border-gray-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(210,126,43,0.14)] hover:border-[#D27E2B]/30"
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
              <h4 className="mb-2 text-sm font-extrabold leading-tight text-[#0F172A] sm:text-base">
                {cap.title}
              </h4>

              {/* Description */}
              <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500 font-medium">
                {cap.desc}
              </p>

              {/* Learn more link */}
              <a
                href="#contact-form-section"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#D27E2B] hover:gap-2.5 transition-all duration-200"
              >
                Learn more
                <LuArrowRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </Row>
    </Section>
  );
}