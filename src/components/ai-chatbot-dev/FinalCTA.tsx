"use client";

import React from "react";
import { motion } from "framer-motion";
import { LuCalendar } from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Image from "next/image";
import SectionBadge from "../new-home-components/SectionBadge";

export default function FinalCTA() {
  return (
    <Section className="bg-[#0F172A] py-24! text-white relative overflow-hidden">
      {/* Decorative vector background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D27E2B]/10 blur-[120px] pointer-events-none" />

      <Row>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12  mx-auto w-full relative z-10">
          {/* Left Column: CTA Headers */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <motion.span
                                  initial={{ opacity: 0, y: 20 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  className="inline-block mb-4"
                                >
                                  <SectionBadge title="Transform Your Customer Experience" />
                                </motion.span>
            
            <h2 className="common-h2 text-white mb-4">
              Ready to Build Your <span className="text-[#D27E2B]">Custom AI Chatbot?</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg font-medium">
              Supercharge your customer support, automate lead generation, and streamline business operations. Speak with our AI architects to design your conversational assistant today.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            
              <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#D68029] relative w-auto inline-flex items-center justify-center rounded-lg overflow-hidden text-white hover:text-[#0d1b2a] transition-all duration-700 ease-in-out group"
            >
              <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#ffffff]  rounded group-hover:w-full group-hover:h-full"></span>
              <a
                href="#contact-form-section"
                className="relative tracking-tight text-sm sm:text-base px-6 py-2 sm:px-8 sm:py-4 cursor-pointer font-semibold"
              >
                <span className="flex flex-row gap-3 items-center justify-center">
                   Get Started Now
                  <div className="group">
                    <Image
                      src="/navbar/btn_icon.png"
                      alt="FRAME"
                      width={20}
                      height={20}
                      className="transition-all duration-700 ease-in-out group-hover:brightness-0 group-hover:sepia w-5 h-5"
                    />
                  </div>
                </span>
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
            className="w-full lg:w-[45%] flex justify-center items-center shrink-0"
          >
            <div className="relative">
              <Image
                src="/ai-strategy/ai-chartbot-development/cta-seection.png"
                alt="AI Chatbot Solution Demo"
                width={850}
                height={850}
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </Row>
    </Section>
  );
}
