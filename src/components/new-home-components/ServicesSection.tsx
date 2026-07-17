"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import {
  FiPenTool,
  FiCode,
  FiTablet,
  FiShoppingCart,
  FiTool,
} from "react-icons/fi";
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

function FloatingParticles() {
  const particles = Array.from({ length: 24 });

  return (
    <>
      {particles.map((_, i) => {
        const size = Math.random() * 6 + 3;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 8 + 8;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              background:
                i % 3 === 0 ? "#D68029" : i % 2 === 0 ? "#FFD18A" : "#0D1B2A",
              boxShadow:
                i % 3 === 0
                  ? "0 0 18px rgba(214,128,41,.8)"
                  : "0 0 12px rgba(13,27,42,.25)",
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, 0],
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </>
  );
}

// Reusable Card Component with smooth fade-up animation
const ServiceCard = ({ icon, title, desc, delay, className, href }: any) => (
  <motion.a
    href={href || "#"}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={`flex bg-gradient-to-b from-white to-[#fcfdff] p-7 rounded-[30px] border border-white/90 shadow-[0_2px_8px_rgba(15,23,42,0.04),0_20px_45px_rgba(15,23,42,0.08),0_45px_80px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_10px_30px_rgba(214,128,41,0.15),0_30px_70px_rgba(15,23,42,0.10)] hover:-translate-y-3 hover:scale-[1.02] transition-all duration-500 group w-full lg:w-[370px] xl:w-[420px] relative overflow-hidden cursor-pointer z-20 ${className}`}
  >
    <div className="absolute -inset-6 rounded-[40px] bg-[#D68029]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
    {/* <div className="absolute inset-0 rounded-[30px] bg-gradient-to-b from-white/80 via-white/30 to-transparent pointer-events-none" /> */}
    <div className="shrink-0 w-[58px] h-[58px] rounded-full bg-gradient-to-br from-[#22364b] via-[#102235] to-[#081522] flex items-center justify-center mr-5 shadow-[0_8px_25px_rgba(13,27,42,0.35),inset_0_1px_2px_rgba(255,255,255,0.15)] ring-1 ring-white/10 group-hover:scale-110 transition-all duration-500">
      {icon}
    </div>
    <div className="flex-1 pb-6">
      <h4 className="text-[16px] font-extrabold text-[#0d1b2a] mb-2 leading-tight group-hover:text-[#d68029] transition-colors">
        {title}
      </h4>
      <p className="text-[13px] text-slate-500 leading-[1.6]">{desc}</p>
    </div>
    <div className="absolute bottom-5 right-5">
      <FaLongArrowAltRight className="w-4 h-4 text-[#d68029] group-hover:translate-x-1 transition-transform" />
    </div>
  </motion.a>
);

export default function ServicesSection() {
  return (
    <section className="bg-white py-24 lg:py-32 relative overflow-hidden font-sans">
      <Row className="relative z-10 max-w-[1320px] mx-auto px-4">
        {/* Top Centered Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <SectionBadge title=" OUR SERVICES" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0d1b2a] leading-[1.2] mt-3 mb-6"
          >
            Intelligent Solutions for Modern Businesses
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8"
          >
            End-to-end AI and software development services designed to
            transform your ideas into digital reality. We build scalable,
            innovative solutions that drive growth and deliver lasting value.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center w-full"
          >
            <Button
              text="View All Services"
              icon="/navbar/btn_icon.png"
              className="w-[220px]"
              bgColor="#0D1B2A"
              hoverColor="#D27E2B"
              href="#contact-form-section"
            />
          </motion.div>
        </div>

        {/* Orbit Layout Container */}
        <div className="relative w-full h-auto lg:h-[950px] flex flex-col gap-6 lg:block">
          {/* Orbit Rings (Slightly enhanced opacity since lines are gone) */}
          <div className="hidden lg:block absolute top-[180px] left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full border-dashed border-slate-300/80 animate-[spin_40s_linear_infinite] pointer-events-none" />
          <div className="hidden lg:block absolute top-[145px] left-1/2 -translate-x-1/2 w-[590px] h-[590px] rounded-full border border-slate-200/60 animate-[spin_30s_linear_infinite_reverse] pointer-events-none" />
          <div className="hidden lg:block absolute top-[110px] left-1/2 -translate-x-1/2 w-[660px] h-[660px] rounded-full border border-slate-100/80 animate-[spin_50s_linear_infinite] pointer-events-none" />

          <div className="absolute inset-0 pointer-events-none z-10">
            <FloatingParticles />
          </div>

          {/* Central Globe (Boosted background glow for depth) */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:flex absolute top-[60px] left-1/2 -translate-x-1/2 w-[780px] xl:w-[880px] h-[780px] xl:h-[880px] z-10 pointer-events-none items-center justify-center"
          >
            {/* Main orange glow - slightly larger and brighter to fill space */}
            <div className="absolute w-[480px] h-[480px] rounded-full bg-[#D68029]/20 blur-[100px]" />

            {/* Blue depth glow */}
            <div className="absolute w-[650px] h-[650px] rounded-full bg-[#0D1B2A]/5 blur-[150px]" />

            <div className="absolute w-[650px] h-[650px] rounded-full bg-[#0D1B3A]/5 blur-[150px]" />

            <Image
              src="/home-test/center-globe.png"
              alt="Global Network"
              fill
              priority
              className="object-contain drop-shadow-[0_30px_60px_rgba(214,128,41,0.25)]"
            />
          </motion.div>

          {/* Cards Grid - Adjusted for a mathematically perfect ellipse */}
          <div className="flex flex-col gap-6 lg:block lg:w-full lg:h-full z-20 relative">
            {/* --- LEFT SIDE CARDS --- */}
            <ServiceCard
              title="AI & ML Development"
              desc="Automate workflows, reduce manual effort, and improve business efficiency with AI."
              icon={<AIAutomationIcon className="w-6 h-6 text-[#d68029]" />}
              className="lg:absolute lg:top-[100px] lg:left-[20px] xl:left-[40px]"
              delay={0.1}
            />

            <ServiceCard
              title="Mobile App Developer"
              desc="Develop powerful Android, iOS, and cross-platform mobile applications."
              icon={<FiTablet className="w-6 h-6 text-[#d68029]" />}
              className="lg:absolute lg:top-[390px] lg:left-[-30px] xl:left-[-10px]"
              delay={0.3}
              href="/flutter-app-development"
            />

            <ServiceCard
              title="eCommerce & CMS Development"
              desc="Develop fast, secure, and user-friendly eCommerce and CMS websites."
              icon={<FiShoppingCart className="w-6 h-6 text-[#d68029]" />}
              className="lg:absolute lg:bottom-[130px] lg:left-[20px] xl:left-[40px]"
              delay={0.5}
              href="/wordpress-development"
            />

            {/* --- RIGHT SIDE CARDS --- */}
            <ServiceCard
              title="Web Development"
              desc="Modern, scalable and high-performance web applications built with latest technologies."
              icon={<FiCode className="w-6 h-6 text-[#f5a53b]" />}
              className="lg:absolute lg:top-[100px] lg:right-[20px] xl:right-[40px]"
              delay={0.2}
              href="/reactjs-development"
            />

            <ServiceCard
              title="UI/UX & Design Services"
              desc="Design intuitive and engaging user experiences that delight customers."
              icon={<FiPenTool className="w-6 h-6 text-[#d68029]" />}
              className="lg:absolute lg:top-[390px] lg:right-[-30px] xl:right-[-10px]"
              delay={0.4}
              href="/uiux-design"
            />

            <ServiceCard
              title="Custom Development"
              desc="Build tailor-made software solutions engineered around your unique business needs."
              icon={<FiTool className="w-6 h-6 text-[#d68029]" />}
              className="lg:absolute lg:bottom-[130px] lg:right-[20px] xl:right-[40px]"
              delay={0.6}
              href="/our-service"
            />
          </div>

          {/* Central Image Fallback for Mobile Only */}
          <div className="flex lg:hidden w-full justify-center mt-12 relative h-[500px]">
            <Image
              src="/home-test/center-globe.png"
              alt="Global Network"
              fill
              className="object-contain scale-125"
              sizes="100vw"
            />
          </div>
        </div>
      </Row>
    </section>
  );
}
