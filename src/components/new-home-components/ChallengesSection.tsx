"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiX, FiCheck } from "react-icons/fi";
import Section from "@/components/Section";

const challenges = [
  "Manual work & repetitive tasks",
  "Slow customer response",
  "High operational costs",
  "Data scattered & unstructured",
  "Lack of insights for decisions",
];

const solutions = [
  "Intelligent automation that works 24/7",
  "AI chatbots for instant customer engagement",
  "Smart solutions that reduce costs",
  "Centralized data with advanced analytics",
  "AI-driven insights for better decisions",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ChallengesSection() {
  return (
    <Section
      id="challenges-section"
      className="relative overflow-hidden bg-gradient-to-b from-[#030d22] to-[#081838] py-24"
    >
      {/* ================= Background Glow ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-1/2 w-[1100px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl bg-[radial-gradient(circle,rgba(30,64,175,0.18)_0%,rgba(15,23,42,0.08)_45%,transparent_75%)]" />
        <div className="absolute left-[-220px] top-1/2 w-[420px] h-[420px] -translate-y-1/2 rounded-full bg-[#1E40AF]/10 blur-[140px]" />
        <div className="absolute right-[-220px] top-1/2 w-[420px] h-[420px] -translate-y-1/2 rounded-full bg-[#1E40AF]/10 blur-[140px]" />
        <div className="absolute left-1/2 top-0 h-[220px] w-[800px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(255,122,26,0.08)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto w-[96%] max-w-[1250px]">
        {/* ================= VS CENTER ================= */}
        <div className="hidden lg:flex absolute left-1/2 top-4 -translate-x-1/2 z-30 flex-col items-center">
          <div className="absolute inset-0 w-20 h-20 rounded-full bg-[#ff7a1a]/20 blur-2xl" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#061325] bg-gradient-to-br from-[#FFA63A] via-[#FF8A1E] to-[#F97316] text-[18px] font-black text-white shadow-[0_0_28px_rgba(255,122,26,0.45)] hover:scale-110 transition-transform duration-300 cursor-default">
            VS
          </div>
          <div className="mt-3 h-[360px] w-px bg-gradient-to-b from-[#7A879B]/35 via-[#556274]/20 to-transparent" />
        </div>

        {/* ================= Main Layout ================= */}
        <div className="flex flex-col justify-center gap-10 lg:gap-16 lg:flex-row">
          {/* ================= LEFT COLUMN (CHALLENGES) ================= */}
          <div className="relative w-full lg:w-[46%] flex flex-col items-center lg:items-end lg:pr-6">
            <img
              src="/home-test/left-lines.png"
              alt=""
              className="absolute left-[-230px] top-[49px] hidden xl:block w-[295px] opacity-95 select-none pointer-events-none"
            />

            <div className="mb-8 w-full max-w-[450px] lg:w-[86%] text-left">
              <span className="block text-2xl sm:text-3xl font-bold text-white tracking-wide">
                Your Business
              </span>
              <h2 className="mt-1 text-3xl sm:text-[36px] font-bold leading-tight text-[#ff7a1a]">
                Challenges
              </h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-3 w-full max-w-[450px] lg:w-[86%]"
            >
              {challenges.map((challenge, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, x: 8 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="
                    group relative flex items-center h-[54px] rounded-xl border border-[#294368] 
                    bg-gradient-to-r from-[#162544] via-[#18294A] to-[#1A2C4D] px-5 
                    overflow-hidden cursor-pointer
                    transition-all duration-300 
                    hover:border-[#3B82F6]/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]
                  "
                >
                  {/* Hover Light Sweep Effect */}
                  <div className="absolute inset-0 -translate-x-[150%] skew-x-[30deg] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%]" />

                  {/* Icon */}
                  <div
                    className="
                    relative z-10 mr-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full 
                    border border-[#2F68C8] bg-[#1B4FB8] shadow-[0_0_10px_rgba(59,130,246,.30)]
                    transition-transform duration-300 group-hover:scale-110 group-hover:rotate-90
                  "
                  >
                    <FiX className="h-[12px] w-[12px] text-white stroke-[3]" />
                  </div>

                  {/* Text */}
                  <span className="relative z-10 text-sm sm:text-base font-medium text-[#EDF4FF] transition-colors duration-300 group-hover:text-white">
                    {challenge}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN (SOLUTIONS) ================= */}
          <div className="relative w-full lg:w-[46%] flex flex-col items-center lg:items-start lg:pl-6">
            <img
              src="/home-test/right-lines.png"
              alt=""
              className="absolute right-[-220px] top-[14px] hidden xl:block w-[235px] opacity-95 select-none pointer-events-none"
            />

            <div className="mb-8 w-full max-w-[450px] lg:w-[86%] text-left">
              <span className="block text-2xl sm:text-3xl font-bold tracking-wide text-white">
                Our AI-Powered
              </span>
              <h2 className="mt-1 text-3xl sm:text-[36px] font-bold leading-tight text-[#ff7a1a]">
                Solutions
              </h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-3 w-full max-w-[450px] lg:w-[86%]"
            >
              {solutions.map((solution, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, x: -8 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="
                    group relative flex items-center h-[54px] rounded-xl border border-[#294368] 
                    bg-gradient-to-r from-[#162544] via-[#18294A] to-[#1A2C4D] px-5 
                    overflow-hidden cursor-pointer
                    transition-all duration-300 
                    hover:border-[#ff7a1a]/60 hover:shadow-[0_0_20px_rgba(255,122,26,0.25)]
                  "
                >
                  {/* Hover Light Sweep Effect */}
                  <div className="absolute inset-0 -translate-x-[150%] skew-x-[30deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%]" />

                  {/* Icon */}
                  <div
                    className="
                    relative z-10 mr-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full 
                    border border-[#ff9d3b] bg-[#ff7a1a] shadow-[0_0_10px_rgba(255,122,26,.35)]
                    transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12
                  "
                  >
                    <FiCheck className="h-[12px] w-[12px] text-white stroke-[3]" />
                  </div>

                  {/* Text */}
                  <span className="relative z-10 text-sm sm:text-base font-medium text-[#EDF4FF] transition-colors duration-300 group-hover:text-[#ffea9d]">
                    {solution}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}
