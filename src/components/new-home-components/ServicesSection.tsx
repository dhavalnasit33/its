"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FiPenTool, FiCode, FiTablet, FiShoppingCart } from "react-icons/fi";
import Section from "@/components/Section";
import Row from "@/components/Row";
import Button from "@/components/Button";
import SectionBadge from "./SectionBadge";

const AIAutomationIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <circle cx="12" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="18" r="3" />
    <path d="M12 9v4c0 1-1 2-2 2H7.5" />
    <path d="M12 13c0 1 1 2 2 2h3.5" />
  </svg>
);

const AIConsultingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <circle cx="12" cy="11.5" r="3" strokeWidth="1.5" />
    <path d="M12 8.5v3M10.5 11.5h3" strokeWidth="1.5" />
  </svg>
);

export default function ServicesSection() {
  return (
    <Section className="bg-white py-20 lg:py-28 relative">
      <Row>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Heading & Button */}
          <div className="w-full lg:w-[28%] flex flex-col justify-start pt-4">
            <SectionBadge title=" OUR SERVICES" />

            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0d1b2a] leading-[1.2] mt-3 mb-6">
              Intelligent Solutions for Modern Businesses
            </h2>
            <p className="text-slate-500 fonts_16 leading-relaxed mb-8 max-w-sm">
              End-to-end AI and software development services designed to
              transform your ideas into digital reality. We build scalable,
              innovative solutions that drive growth and deliver lasting value.
            </p>
            <Button
              text="View All Services"
              icon="/navbar/btn_icon.png"
              className="max-w-[250px]"
              bgColor="#0D1B2A"
              hoverColor="#D27E2B"
              href="#contact-form-section"
            />
          </div>

          {/* Right Column: Grid Layout */}
          <div className="w-full lg:w-[72%] flex flex-col lg:flex-row gap-6">
            {/* Featured Tall Card - AI Automation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full lg:w-[35%] [min-h-520px] rounded-[28px] overflow-hidden shadow-2xl group cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src="/home-test/card.png"
                alt="AI Automation Background"
                fill
                className="object-cover scale-120 transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* Optional dark overlay */}
              <div className="absolute inset-0 bg-[#08192D]/20" />

              {/* Card Content */}
              <div className="relative z-10 flex flex-col justify-between h-full p-10">
                <div>
                  <div className="w-20 h-20 rounded-full border border-[#d68029] bg-[#d68029]/10 flex items-center justify-center mb-8 backdrop-blur-sm">
                    <AIAutomationIcon className="w-8 h-8 text-[#d68029]" />
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-5">
                    AI Automation
                  </h3>

                  <p className="text-slate-300 leading-8 max-w-[260px]">
                    Automate repetitive tasks, streamline workflows, and reduce
                    manual effort to boost productivity, lower costs, and
                    improve business efficiency.
                  </p>
                </div>

                <FaLongArrowAltRight className="w-6 h-6 text-[#d68029] transition-transform duration-300 group-hover:translate-x-2" />
              </div>
            </motion.div>

            {/* Grid Cards Container */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Row 1 - 2 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[48%]">
                {/* Web Dev */}
                <motion.a
                  href="/reactjs-development"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white text-slate-800 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full border border-slate-200 bg-slate-200 flex items-center justify-center text-slate-600">
                        <FiCode className="w-5 h-5" />
                      </div>

                      <h4 className="text-lg font-bold text-[#0d1b2a] leading-snug">
                        Web <br /> Development
                      </h4>
                    </div>

                    <p className="fonts_16 text-gray-600">
                      Modern, scalable and high-performance web applications
                      built with latest technologies.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center">
                    <FaLongArrowAltRight className="w-4 h-4 text-[#d68029] group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </motion.a>

                {/* Mobile App */}
                <motion.a
                  href="/flutter-app-development"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white text-slate-800 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full border border-slate-200 bg-slate-200 flex items-center justify-center text-slate-600">
                        <FiTablet className="w-5 h-5" />
                      </div>

                      <h4 className="text-lg font-bold text-[#0d1b2a] leading-snug">
                        Mobile App Developer
                      </h4>
                    </div>

                    <p className="fonts_16 text-gray-600">
                      Develop powerful Android, iOS, and cross-platform mobile
                      applications.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center">
                    <FaLongArrowAltRight className="w-4 h-4 text-[#d68029] group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </motion.a>
              </div>

              {/* Row 2 - 3 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[48%]">
                {/* UI/UX */}
                <motion.a
                  href="/uiux-design"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white text-slate-800 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full border border-slate-200 bg-slate-200 flex items-center justify-center text-slate-600">
                        <FiPenTool className="w-5 h-5" />
                      </div>

                      <h4 className="text-lg font-bold text-[#0d1b2a] leading-snug">
                        UI/UX & Design Services
                      </h4>
                    </div>

                    <p className="fonts_16 text-gray-600">
                      Design intuitive and engaging user experiences that
                      delight customers.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center">
                    <FaLongArrowAltRight className="w-4 h-4 text-[#d68029] group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </motion.a>

                {/* eCommerce */}
                <motion.a
                  href="/wordpress-development"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white text-slate-800 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full border border-slate-200 bg-slate-200 flex items-center justify-center text-slate-600">
                        <FiShoppingCart className="w-5 h-5" />
                      </div>

                      <h4 className="text-lg font-bold text-[#0d1b2a] leading-snug">
                        eCommerce & CMS Development
                      </h4>
                    </div>

                    <p className="fonts_16 text-gray-600">
                      Develop fast, secure, and user-friendly eCommerce and CMS
                      websites.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center">
                    <FaLongArrowAltRight className="w-4 h-4 text-[#d68029] group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </Section>
  );
}
