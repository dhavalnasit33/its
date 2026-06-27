"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Row from "@/components/Row";

export default function CTA() {
  return (
    <section className="w-full py-16 md:py-20">
      <Row>
        <div className="relative bg-[#0d1b2a] rounded-3xl overflow-hidden px-8 py-14 md:px-16 md:py-16">
          {/* Ambient glow */}
          <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-[#D68029]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-48 w-56 h-56 rounded-full bg-[#0EA5E9]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: Content */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-[#D68029] text-xs font-bold uppercase tracking-widest mb-3"
              >
                Ready to Transform Your Business?
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-white leading-tight mb-4"
              >
                Ready to Build Your{" "}
                <span className="text-[#D68029]">AI Strategy?</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-300 text-base leading-relaxed mb-8 max-w-md"
              >
                Let's turn your business challenges into AI-powered opportunities.
                Start with a free consultation today.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href="#contact-form-section"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#D68029] text-white font-bold text-sm hover:bg-[#c27020] hover:shadow-xl hover:shadow-[#D68029]/30 hover:scale-105 transition-all duration-300"
                >
                  Book Free Consultation
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </div>

            {/* Right: Rocket illustration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <Image
                src="/ai-strategy/rocket-illustration.png"
                alt="Build AI Strategy"
                width={340}
                height={300}
                className="w-full max-w-xs h-auto object-contain drop-shadow-2xl"
              />
          </motion.div>
          </div>
        </div>
      </Row>
    </section>
  );
}
