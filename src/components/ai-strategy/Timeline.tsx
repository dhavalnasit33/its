"use client";

import React from "react";
import { motion } from "framer-motion";
import { TIMELINE_STEPS } from "@/data/constants";
import Row from "@/components/Row";
import Section from "../Section";
import Motion from "../motionbar";
import TechBackground from "../home/TechBackground";

function StepIcon({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      );
    case 1:
      return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 2:
      return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case 3:
      return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    case 4:
      return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      );
    case 5:
      return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
    <Section className=" overflow-hidden bg-[#0d1b2a]" style={{
						background: `
						radial-gradient(circle at 18% 20%, rgba(214, 128, 41, 0.15), transparent 28%),
						radial-gradient(circle at 85% 70%, rgba(14, 165, 233, 0.15), transparent 20%),
						radial-gradient(circle at 40% 90%, rgba(13,67,93,.10), transparent 15%),
						#030b1a					
						`
						// #141F3D #030b1a bg-gradient-to-br from-slate-950/75 via-slate-950/80 to-slate-900/75
					}}>
      <TechBackground />
      {/* <div className="absolute inset-0 bg-[#020617]/50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(252,74,26,0.14),transparent)]"></div> */}
     
      <Row>
        {/* Centered Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            // className="inline-block text-[#D68029] text-sm font-bold uppercase tracking-widest mb-3"
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-300 mb-5"
          >
            Our Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            // className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#0d1b2a] leading-tight mb-4"
            className="common-h2 text-center w-full  text-white"
          >
            AI Consulting {" "}<span className="text-[#D68029]">Progress</span>
          </motion.h2>
          <Motion />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            // className="text-gray-500 text-sm sm:text-base leading-relaxed"
            // className=" text-lg font-normal text-[#6f6f6f] leading-8 tracking-wide "
            className="text-slate-200 text-base sm:text-lg md:text-xl mt-4 max-w-3xl mx-auto"
          >
            A proven step-by-step approach to turn your business challenges into
            intelligent solutions.
          </motion.p>
          {/* <div className="flex justify-center mt-4 gap-1">
            <span className="w-10 h-1 rounded-full bg-[#D68029]" />
            <span className="w-3 h-1 rounded-full bg-[#D68029]/40" />
          </div> */}
          
        </div>

        {/* Timeline Container */}
        <div className="relative w-full">
          {/* Central track line (Desktop: middle, Mobile: left) */}
          <div className="absolute left-7 md:left-1/2 md:-translate-x-1/2 top-28 sm:top-20 max-[480px]:bottom-30 bottom-28 sm:bottom-20 w-0.5 bg-[#D68029]" />

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
                  <div className="w-full md:w-1/2 pl-18 md:pl-0 md:pr-16 order-2 md:order-1 flex justify-start md:justify-end">
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        // className="w-full md:max-w-lg bg-[#0d1b2a]/60 p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg hover:border-[#D68029] transition-all duration-300 group"
                        className="w-full md:max-w-lg  border border-white/30 shadow-md hover:shadow-lg hover:border-[#D68029] 
                         duration-300 group backdrop-blur-md
                        flex flex-col items-start  p-4 rounded-md bg-[#ffffff08] transition-colors "
                      >
                        {/* <span className="text-[#D68029] text-sm font-bold uppercase tracking-wider block mb-1">
                          {step.number} &mdash; Step
                        </span> */}
                        {/* <span className="inline-flex items-center rounded-full border border-[#D68029] bg-[#D68029]/5 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest   text-[#D68029] mb-2"> */}
                         <span className="px-4 py-1 cursor-pointer rounded-full font-medium text-[12px] transition-all duration-300 bg-[#ff7f000f] text-[#D68029] border border-[#D68029] shadow-md mb-2">
                        {step.number} &mdash; Step
                        </span>
                        {/* <h3 className="text-xl lg:text-2xl font-bold text-[#0d1b2a] mb-2 group-hover:text-[#D68029] transition-colors"> */}
                        <h3 className="text-xl lg:text-2xl font-bold text-[#ffffff] mb-2 group-hover:text-[#D68029] transition-colors">
                          {step.title}
                        </h3>
                        {/* <p className="fonts_16 text-gray-500"> */}
                        <p className="fonts_16 text-slate-300">
                          {step.description}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Center Node Icon (Desktop: Center, Mobile: Left) */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 z-10 order-1 md:order-2 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#d68029] border-2 border-white/50 hover:border-[#D68029] flex items-center justify-center shadow-md transition-colors duration-300">
                      <StepIcon index={idx} />
                    </div>
                  </div>

                  {/* Right Side: Spacer for Odd Steps, Card for Even Steps */}
                  <div className="w-full md:w-1/2  pl-18 md:pl-16 md:pr-0 order-2 md:order-3 flex justify-start">
                    {!isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        // className="w-full md:max-w-lg bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg hover:border-[#D68029] transition-all duration-300 group"
                        className="w-full md:max-w-lg  border border-white/30 shadow-md hover:shadow-lg hover:border-[#D68029] 
                         duration-300 group backdrop-blur-md
                        flex flex-col items-start  p-4 rounded-md bg-[#ffffff08] transition-colors "
                     >
                        {/* <span className="text-[#D68029] text-sm font-bold uppercase tracking-wider block mb-1">
                          {step.number} &mdash; Step
                        </span> */}
                         {/* <span className="inline-flex items-center rounded-full border border-[#D68029] bg-[#D68029]/5 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest   text-[#D68029] mb-2"> */}
                        <span className="px-4 py-1 cursor-pointer rounded-full font-medium text-[12px] transition-all duration-300 bg-[#ff7f000f] text-[#D68029] border border-[#D68029] shadow-md mb-2">
                        {step.number} &mdash; Step
                        </span>
                        {/* <h3 className="text-xl lg:text-2xl font-bold text-[#0d1b2a] mb-2 group-hover:text-[#D68029] transition-colors"> */}
                         <h3 className="text-xl lg:text-2xl font-bold text-[#ffffff] mb-2 group-hover:text-[#D68029] transition-colors ">
                          {step.title}
                        </h3>
                        <p className="fonts_16 text-slate-300">
                        {/* <p className="text-gray-600  fonts_16"> */}
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
