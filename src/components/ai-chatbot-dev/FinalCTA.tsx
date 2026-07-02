"use client";

import React from "react";
import { motion } from "framer-motion";
import { LuCalendar, LuMessageSquareCode } from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Button from "@/components/Button";

export default function FinalCTA() {
  return (
    <Section className="bg-[#0F172A] py-24! text-white relative overflow-hidden">
      {/* Decorative vector background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D27E2B]/10 blur-[120px] pointer-events-none" />

      <Row>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-5xl mx-auto w-full relative z-10">
          {/* Left Column: CTA Headers */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D27E2B]"
            >
              Get Started Today
            </motion.span>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold leading-tight text-white">
              Ready to Build Your <span className="text-[#D27E2B]">AI Chatbot?</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg font-medium">
              Transform customer support, boost sales pipeline metrics, and scale business operations with custom chatbots. Speak with our AI architects today.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Button
                bgColor="#D27E2B"
                hoverColor="#ffffff"
                text="Start Project"
                href="#contact-form-section"
                icon="/navbar/btn_icon.png"
              />
              <motion.div className="border border-white/20 hover:border-[#D27E2B] relative w-auto inline-flex items-center justify-center rounded-lg overflow-hidden text-white hover:text-white transition-all duration-700 ease-in-out group bg-transparent shadow-sm">
                <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D27E2B] rounded group-hover:w-full group-hover:h-full"></span>
                <a
                  href="#contact-form-section"
                  className="relative tracking-tight text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3 cursor-pointer font-semibold flex items-center gap-2"
                >
                  Book Consultation
                  <LuCalendar className="w-4 h-4 text-slate-300 group-hover:text-white" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Visual illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[40%] flex justify-center items-center shrink-0"
          >
            <div className="w-56 h-56 rounded-full border-2 border-dashed border-[#D27E2B]/40 flex items-center justify-center relative bg-[#13213D] shadow-2xl">
              <div className="absolute inset-4 rounded-full border border-white/10 bg-[#0F172A] flex items-center justify-center">
                <LuMessageSquareCode className="w-16 h-16 text-[#D27E2B] animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
      </Row>
    </Section>
  );
}
