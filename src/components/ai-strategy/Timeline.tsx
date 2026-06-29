"use client";

import React from "react";
import { motion } from "framer-motion";
import { TIMELINE_STEPS } from "@/data/constants";
import Row from "@/components/Row";
import Section from "../Section";
import Motion from "../motionbar";

function StepIcon({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <svg className="w-5 h-5 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      );
    case 1:
      return (
        <svg className="w-5 h-5 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 2:
      return (
        <svg className="w-5 h-5 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case 3:
      return (
        <svg className="w-5 h-5 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    case 4:
      return (
        <svg className="w-5 h-5 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      );
    case 5:
      return (
        <svg className="w-5 h-5 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Timeline() {
  return (
    <Section className=" overflow-hidden">
      <Row>
        {/* Centered Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#D68029] text-xs font-bold uppercase tracking-widest mb-3"
          >
            Our Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            // className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#0d1b2a] leading-tight mb-4"
            className="common-h2 text-center w-full  text-black mb-4"
          >
            AI Consulting Progress
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-sm sm:text-base leading-relaxed"
          >
            A proven step-by-step approach to turn your business challenges into
            intelligent solutions.
          </motion.p>
          {/* <div className="flex justify-center mt-4 gap-1">
            <span className="w-10 h-1 rounded-full bg-[#D68029]" />
            <span className="w-3 h-1 rounded-full bg-[#D68029]/40" />
          </div> */}
          <Motion />
        </div>

        {/* Timeline Container */}
        <div className="relative w-full">
          {/* Central track line (Desktop: middle, Mobile: left) */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-20 bottom-20 w-0.5 bg-gray-100" />

          {/* Steps List */}
          <div className="space-y-12 md:space-y-16">
            {TIMELINE_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={step.number}
                  className="relative flex flex-col md:flex-row items-start md:items-center w-full"
                >
                  {/* Left Side: Card for Odd Steps, Spacer for Even Steps */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:pr-12 order-2 md:order-1 flex justify-start md:justify-end">
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="w-full md:max-w-lg bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg hover:border-[#D68029]/20 transition-all duration-300 group"
                      >
                        <span className="text-[#D68029] text-xs font-bold uppercase tracking-wider block mb-1">
                          {step.number} &mdash; Step
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-[#0d1b2a] mb-2 group-hover:text-[#D68029] transition-colors">
                          {step.title}
                        </h3>
                        <p className="fonts_16 text-gray-500">
                          {step.description}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Center Node Icon (Desktop: Center, Mobile: Left) */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 z-10 order-1 md:order-2 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 hover:border-[#D68029] flex items-center justify-center shadow-md transition-colors duration-300">
                      <StepIcon index={idx} />
                    </div>
                  </div>

                  {/* Right Side: Spacer for Odd Steps, Card for Even Steps */}
                  <div className="w-full md:w-1/2  pl-16 md:pl-12 md:pr-0 order-2 md:order-3 flex justify-start">
                    {!isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="w-full md:max-w-lg bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg hover:border-[#D68029]/20 transition-all duration-300 group"
                      >
                        <span className="text-[#D68029] text-xs font-bold uppercase tracking-wider block mb-1">
                          {step.number} &mdash; Step
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-[#0d1b2a] mb-2 group-hover:text-[#D68029] transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-gray-500  fonts_16">
                          {step.description}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Row>
    </Section>
  );
}
