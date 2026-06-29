"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Row from "@/components/Row";
import Section from "../Section";
import Button from "../Button";

export default function CTA() {
  return (
    <Section className="relative bg-[#0d1b2a]  overflow-hidden  lg:py-0! border border-white/5 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
      {/* <div className="absolute -left-34 -bottom-20 rotate-22">
         <Image
                src="/ai-strategy/rocket-illustration.png"
                alt="Build AI Strategy"
                width={300}
                height={350}
                className="w-full h-auto lg:h-120 drop-shadow-2xl" 
              />
      </div> */}
      <Row>
        {/* <div className="relative bg-[#0d1b2a] rounded-3xl overflow-hidden px-8 py-14 md:px-16 md:py-16"> */}
        {/* <div className="relative bg-[#0d1b2a] rounded-3xl overflow-hidden  px-8 py-10 md:px-12 md:py-12  "> */}
          {/* Ambient glow */}
          <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-[#D68029]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-48 w-56 h-56 rounded-full bg-[#0EA5E9]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ">
            {/* Left: Content */}
            <div className="order-2 lg:order-1">
              {/* <motion.p
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-[#D68029] text-sm font-bold uppercase tracking-widest mb-3"
              >
                Ready to Transform Your Business?
              </motion.p> */}
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest
               text-slate-300 mb-5">
                 Ready to Transform Your Business?
                </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                // className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-white leading-tight mb-4"
                className="common-h2  w-full text-white mb-4"
              >
                Ready to Build Your{" "}
                <span className="text-[#D68029]">AI Strategy?</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="fonts_16 text-white/70 mb-8 lg:max-w-lg"
              >
                Let's turn your business challenges into AI-powered opportunities.
                Start with a free consultation today.
              </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-[#D68029] relative w-auto inline-flex items-center justify-center rounded-lg overflow-hidden text-white hover:text-[#0d1b2a] transition-all duration-700 ease-in-out group"
              >
                  <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#ffffff]  rounded group-hover:w-full group-hover:h-full"></span>
                  <a href="#contact-form-section"
                      className="relative tracking-tight text-sm sm:text-base  px-6 py-2 sm:px-8 sm:py-4 cursor-pointer font-semibold">
                      <span className="flex flex-row gap-3 items-center justify-center">
                          Book Free Consultation
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

            {/* Right: Rocket illustration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-end order-1 lg:order-2"
            >
              <Image
                src="/ai-strategy/rocket_img.png"
                alt="Build AI Strategy"
                width={800}
                height={800}
                priority
                unoptimized
                className="w-full h-auto lg:h-120 drop-shadow-2xl object-contain" 
              />
          </motion.div>
          </div>
        {/* </div> */}
      </Row>
    </Section>
  );
}
