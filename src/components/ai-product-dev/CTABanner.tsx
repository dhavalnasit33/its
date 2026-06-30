"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Row from "@/components/Row";
import Section from "@/components/Section";
import TechBackground from "@/components/home/TechBackground";

export default function CTABanner() {
  return (
    <Section
      className="relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(210, 126, 43, 0.20), transparent 40%),
          radial-gradient(circle at 80% 30%, rgba(14, 165, 233, 0.12), transparent 35%),
          #0F172A
        `,
      }}
    >
      <TechBackground />
      <Row>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Rocket illustration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-start order-1 lg:order-1"
          >
            {/* Rocket SVG illustration */}
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-[#D27E2B]/20 blur-3xl scale-75" />
              
              {/* Rocket body */}
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Trail */}
                  <ellipse cx="100" cy="165" rx="18" ry="30" fill="#D27E2B" opacity="0.3"/>
                  <ellipse cx="100" cy="170" rx="10" ry="20" fill="#D27E2B" opacity="0.5"/>
                  
                  {/* Rocket body */}
                  <path d="M100 20 C100 20 130 50 130 100 L100 130 L70 100 C70 50 100 20 100 20Z" fill="#1e3a5f"/>
                  <path d="M100 20 C100 20 115 50 115 100 L100 130 L100 20Z" fill="#2d5986"/>
                  
                  {/* Nose cone */}
                  <path d="M100 20 C100 20 85 40 85 60 L100 55 L115 60 C115 40 100 20 100 20Z" fill="#D27E2B"/>
                  
                  {/* Window */}
                  <circle cx="100" cy="80" r="14" fill="#0F172A" stroke="#D27E2B" strokeWidth="2.5"/>
                  <circle cx="100" cy="80" r="9" fill="#1e3a5f"/>
                  <circle cx="97" cy="77" r="3" fill="white" opacity="0.5"/>
                  
                  {/* Fins */}
                  <path d="M70 100 L55 130 L70 120 Z" fill="#D27E2B"/>
                  <path d="M130 100 L145 130 L130 120 Z" fill="#D27E2B"/>
                  
                  {/* Engine nozzle */}
                  <path d="M85 128 L100 145 L115 128 Z" fill="#f0a050"/>
                  
                  {/* Stars */}
                  {[[30, 30], [160, 40], [20, 80], [175, 90], [40, 150], [170, 155]].map(([x, y], i) => (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="2"
                      fill="white"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ))}

                  {/* Orbiting dots */}
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "100px 80px" }}
                  >
                    <circle cx="100" cy="52" r="3.5" fill="#D27E2B" opacity="0.8"/>
                  </motion.g>
                </svg>
              </div>

              {/* Floating tags around rocket */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-0 bg-white/10 backdrop-blur border border-white/20 rounded-xl px-3 py-2"
              >
                <span className="text-[11px] font-bold text-white">🚀 AI Product</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-0 bg-white/10 backdrop-blur border border-white/20 rounded-xl px-3 py-2"
              >
                <span className="text-[11px] font-bold text-white">⚡ Enterprise AI</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="order-2 lg:order-2">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-300 mb-6"
            >
              Ready to Build?
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6"
            >
              Ready To Build Your{" "}
              <span className="text-[#D27E2B]">AI Product?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Let's transform your idea into a scalable AI solution. Talk to our AI architects and get a free technical consultation — no commitment required.
            </motion.p>

            {/* Benefits list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-3 mb-10"
            >
              {["Free technical consultation", "AI Product roadmap", "Expert team of 40+ AI engineers"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D27E2B]/20 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-[#D27E2B]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-300 font-medium">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href="#contact-form-section"
                className="group inline-flex items-center gap-3 bg-[#D27E2B] hover:bg-white text-white hover:text-[#0F172A] font-bold text-base px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#D27E2B]/30 hover:shadow-xl"
              >
                Book Free Consultation
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </Row>
    </Section>
  );
}
