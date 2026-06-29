"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link"; 
import { AiSolution } from "@/types";
import { AI_SOLUTIONS } from "@/data/constants";
import Row from "@/components/Row";
import Section from "../Section";
import Motion from "../motionbar";

function SolutionIcon({ solution }: { solution: AiSolution }) {
  const [hasError, setHasError] = React.useState(false);

  if (!solution.icon || hasError) {
    const title = solution.title.toLowerCase();
    
    if (title.includes("readiness") || title.includes("assessment")) {
      return (
        <svg className="w-6 h-6 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      );
    }
    if (title.includes("roadmap") || title.includes("strategy")) {
      return (
        <svg className="w-6 h-6 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      );
    }
    if (title.includes("discovery") || title.includes("use case")) {
      return (
        <svg className="w-6 h-6 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    }
    if (title.includes("data") || title.includes("engineering")) {
      return (
        <svg className="w-6 h-6 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      );
    }
    if (title.includes("llm") || title.includes("genai") || title.includes("consulting")) {
      return (
        <svg className="w-6 h-6 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      );
    }
    if (title.includes("automation") || title.includes("planning")) {
      return (
        <svg className="w-6 h-6 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 008 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      );
    }
    if (title.includes("model") || title.includes("development") || title.includes("training")) {
      return (
        <svg className="w-6 h-6 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    }
    if (title.includes("poc") || title.includes("proof")) {
      return (
        <svg className="w-6 h-6 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    }
    if (title.includes("mlops") || title.includes("deployment")) {
      return (
        <svg className="w-6 h-6 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    }
    // Generic sparkles
    return (
      <svg className="w-6 h-6 text-[#D68029]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    );
  }

  return (
    <Image
      src={solution.icon}
      alt={solution.title}
      width={26}
      height={26}
      className="object-contain"
      onError={() => setHasError(true)}
    />
  );
}

interface SolutionCardProps {
  solution: AiSolution;
  index: number;
}

function SolutionCard({ solution, index }: SolutionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      // className="group relative flex h-full flex-col gap-4 p-5 rounded-2xl overflow-hidden border border-gray-200 bg-white  hover:shadow-xl hover:shadow-[#D68029]/5 transition-all duration-300"
    className="group relative overflow-hidden rounded-xl h-full bg-linear-to-br  border-2 border-white/10 shadow-md    transition-all duration-500  bg-gray-100  gap-4    p-5     flex   flex-col"
    >
      <div className=" absolute top-0 left-0 h-1 w-0  bg-[#d68029]  transition-all duration-500  ease-out group-hover:w-full "></div>
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-[#D68029]/10 flex items-center justify-center shrink-0 group-hover:bg-[#D68029]/20 transition-colors duration-300">
        <SolutionIcon solution={solution} />
      </div>

      {/* Text */}
      <div>
        <h4 className=" text-xl font-bold mb-2 group-hover:text-[#D68029] transition-colors duration-300">
          {solution.title}
        </h4>
        <p className="text-gray-600 fonts_16">{solution.description}</p>
      </div>
    </motion.div>
  );
}

export default function Solutions() {
  return (
    <Section id="ai-solutions" >
      <Row>
        {/* Header */}
        <div className="text-center mb-12">
          {/* <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#D68029] text-sm font-bold uppercase tracking-widest mb-3"
          >
            What We Deliver
          </motion.span> */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            // className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#0d1b2a] leading-tight"
            className="common-h2 text-center w-full  text-black "
          >
            AI Solutions That Drive Real Value
          </motion.h2>
          {/* Divider accent */}
          {/* <div className="flex justify-center mt-4 gap-1">
            <span className="w-10 h-1 rounded-full bg-[#D68029]" />
            <span className="w-3 h-1 rounded-full bg-[#D68029]/40" />
          </div> */}
          <Motion />
        </div>

        {/* Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {AI_SOLUTIONS.map((solution, idx) => (
            <SolutionCard key={idx} solution={solution} index={idx} />
          ))}
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
          {AI_SOLUTIONS.map((solution, idx) => {
            const isLastTwo =
              AI_SOLUTIONS.length % 4 === 2 &&
              idx >= AI_SOLUTIONS.length - 2;

            return (
              <div
                key={idx}
                 className={`h-full ${
                  isLastTwo
                    ? idx === AI_SOLUTIONS.length - 2
                      ? "xl:col-start-2"
                      : "xl:col-start-3"
                    : ""
                }`}
              >
                <SolutionCard solution={solution} index={idx} />
              </div>
            );
          })}
      </div>
      </Row>
    </Section>
  );
}
