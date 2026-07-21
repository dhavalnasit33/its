"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import Section from "@/components/Section";
import Row from "@/components/Row";
import Button from "@/components/Button";
import SectionBadge from "./SectionBadge";

// Service definitions with matching themes and tags
const SERVICES = [
  {
    title: "Web Development",
    desc: "Fast, responsive, and secure custom web platforms built using modern scalable frameworks.",
    image: "/home-test/web-development.png",
    tags: ["React", "Next.js", "Node.js", "+3"],
    href: "/reactjs-development",
    theme: {
      primary: "#3B82F6",
      softBg: "#EEF5FF",
      hoverGlow: "rgba(59,130,246,0.25)",
    },
    positionClass: "xl:absolute xl:left-[246px] xl:top-[30px]",
    delay: 0.1,
  },
  {
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile apps with fluid animations and secure integrations.",
    image: "/home-test/mobile-app-development.png",
    tags: ["Flutter", "Android", "iOS", "+1"],
    href: "/flutter-app-development",
    theme: {
      primary: "#22C55E",
      softBg: "#F0FFF5",
      hoverGlow: "rgba(34,197,94,0.22)",
    },
    positionClass: "xl:absolute xl:left-[613px] xl:top-[30px]",
    delay: 0.2,
  },
  {
    title: "UI/UX & Design",
    desc: "User-friendly designs backed by research, wireframing, and high-fidelity interactive prototypes.",
    image: "/home-test/ui-ux-design.png",
    tags: ["UI Design", "UX Research", "Figma"],
    href: "/uiux-design",
    theme: {
      primary: "#8B5CF6",
      softBg: "#F7F2FF",
      hoverGlow: "rgba(139,92,246,0.25)",
    },
    positionClass: "xl:absolute xl:left-[62px] xl:top-[346px]",
    delay: 0.3,
  },
  {
    title: "eCommerce & CMS Development",
    desc: "Robust eCommerce storefronts and flexible CMS architecture with smooth checkout experiences.",
    image: "/home-test/ecommerce-cms.png",
    tags: ["Shopify", "WooCommerce", "WordPress"],
    href: "/wordpress-development",
    theme: {
      primary: "#F59E0B",
      softBg: "#FFF8EC",
      hoverGlow: "rgba(245,158,11,0.25)",
    },
    positionClass: "xl:absolute xl:left-[797px] xl:top-[346px]",
    delay: 0.4,
  },
  {
    title: "AI & ML Development",
    desc: "Advanced machine learning models and conversational AI that automate enterprise operations.",
    image: "/home-test/ai-solutions.png",
    tags: ["AI Chatbots", "AI Agents", "Automation", "+3"],
    href: "/ai-services",
    theme: {
      primary: "#D68029",
      softBg: "#FFF5EA",
      hoverGlow: "rgba(214,128,41,0.28)",
    },
    positionClass: "xl:absolute xl:left-[246px] xl:top-[662px]",
    delay: 0.5,
  },
  {
    title: "Custom Software Development",
    desc: "Bespoke, secure software architectures tailored to simplify and automate your operations.",
    image: "/home-test/custom-software.png",
    tags: ["SaaS", "ERP", "CRM", "+2"],
    href: "/our-service",
    theme: {
      primary: "#2563EB",
      softBg: "#EFF6FF",
      hoverGlow: "rgba(37,99,235,0.22)",
    },
    positionClass: "xl:absolute xl:left-[613px] xl:top-[662px]",
    delay: 0.6,
  },
];

const HexagonCard = ({ service }: { service: (typeof SERVICES)[0] }) => {
  const { title, desc, image, tags, href, theme, delay } = service;

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`group relative w-[340px] h-[390px] flex flex-col items-center justify-center cursor-pointer transition-all duration-500 hover:-translate-y-3 outline-none focus:outline-none`}
    >
      {/* Theme-related background hover glow */}
      <div
        className="absolute -inset-10 rounded-[50px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, ${theme.hoverGlow} 0%, transparent 70%)`,
        }}
      />

      {/* Background SVG Hexagon with Shadow and Border */}
      <div
        className="absolute inset-0 w-full h-full transition-all duration-500 filter drop-shadow-[0_8px_20px_rgba(15,23,42,0.04)] group-hover:drop-shadow-[0_8px_16px_var(--hover-glow)] z-0"
        style={
          {
            "--hover-glow": theme.hoverGlow,
          } as React.CSSProperties
        }
      >
        <svg
          viewBox="0 0 100 115"
          className="w-full h-full fill-white stroke-[#E5E7EB] stroke-[0.5] transition-colors duration-500"
        >
          <path
            d="M 50 3
               Q 50 3 52 4
               L 96 29
               Q 98 31 98 34
               L 98 81
               Q 98 84 96 86
               L 52 111
               Q 50 112 48 111
               L 4 86
               Q 2 84 2 81
               L 2 34
               Q 2 31 4 29
               L 48 4
               Q 50 3 50 3
               Z"
            className="group-hover:stroke-[var(--hover-color)]  group-hover:stroke-[0.5]  transition-all duration-500"
            style={
              {
                "--hover-color": theme.primary,
              } as React.CSSProperties
            }
          />
        </svg>
      </div>

      {/* Card Contents — constrained to the hexagon's safe (flat-side) zone so nothing
          can render past the pointed top/bottom tips of the SVG shape behind it */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-9 pb-4 px-8 text-center overflow-hidden">
        {/* Top: 3D Illustration / Icon */}
        <div className="relative w-[76px] h-[76px] flex items-center justify-center shrink-0 group-hover:scale-108 transition-transform duration-500 mb-2">
          {/* Subtle Glow behind Icon */}
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ backgroundColor: theme.softBg }}
          />
          <Image
            src={image}
            alt={title}
            width={68}
            height={68}
            className="object-contain relative z-10"
            priority
          />
        </div>

        {/* Middle: Content */}
        <div className="flex flex-col items-center justify-center max-w-[250px] mb-3 shrink-0">
          <h4
            className="text-sm lg:text-base font-extrabold text-[#0D1B2A] leading-snug mb-1.5 group-hover:text-[var(--hover-color)] transition-colors duration-500"
            style={
              {
                "--hover-color": theme.primary,
              } as React.CSSProperties
            }
          >
            {title}
          </h4>
          <p className="text-sm lg:text-base text-slate-500 leading-relaxed font-normal line-clamp-3">
            {desc}
          </p>
        </div>

        {/* Bottom: Tags & Action Button */}
        <div className="w-full flex flex-col items-center gap-2.5 shrink-0">
          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[250px]">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap"
                style={{
                  backgroundColor: theme.softBg,
                  color: theme.primary,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Arrow Button */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-500 group-hover:scale-105"
            style={{ backgroundColor: theme.primary }}
          >
            <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:rotate-[-45deg]" />
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default function ServicesSection() {
  return (
    <Section className="lg:py-18! common_background_gradient relative overflow-hidden">
      <Row className="relative z-10 mx-auto px-4">
        {/* Top Centered Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <SectionBadge title="OUR SERVICES" />
          </motion.div>
 
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="common-h2 text-[#0d1b2a]"
          >
            Custom Software, <span className="text-[#d68029]">  Web, Mobile &amp; AI</span> Development Services
          </motion.h2>
 
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 mt-4 text-sm sm:text-base max-w-3xl mx-auto"
          >
            Empower your business with custom software, web development, mobile
applications, AI solutions, UI/UX design, cloud integration, and ongoing
support. We build scalable, secure, and high-performance digital products
tailored to your unique business needs.
          </motion.p>
           {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center w-full mt-8"
          >
            <Button
              text="View All Services"
              icon="/navbar/btn_icon.png"
              className="w-[220px]"
              bgColor="#0D1B2A"
              hoverColor="#D27E2B"
              href="#contact-form-section"
            />
          </motion.div> */}
        </div>

        {/* Honeycomb Layout Container */}
        <div className="relative w-full h-auto xl:h-[1082px] flex flex-col items-center gap-8 xl:block max-w-[1200px] mx-auto">
          {/* Central Dark Hexagon (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden xl:flex absolute left-[430px] top-[346px] w-[340px] h-[390px] flex-col items-center justify-center text-center p-9 z-20"
          >
            <div className="absolute inset-0 w-full h-full filter drop-shadow-[0_15px_35px_rgba(15,23,42,0.35)] z-0">
              <svg
                viewBox="0 0 100 115"
                className="w-full h-full fill-[#0B1528] stroke-amber-500/35 stroke-1"
              >
                <path
                  d="M 50 3
                     Q 50 3 52 4
                     L 96 29
                     Q 98 31 98 34
                     L 98 81
                     Q 98 84 96 86
                     L 52 111
                     Q 50 112 48 111
                     L 4 86
                     Q 2 84 2 81
                     L 2 34
                     Q 2 31 4 29
                     L 48 4
                     Q 50 3 50 3
                     Z"
                />
              </svg>
            </div>

            <div className="relative z-10 text-white flex flex-col items-center justify-center h-full">
              {/* Animated icon badge */}
              <div className="relative w-20 h-20 flex items-center justify-center mb-6">
                {/* Soft breathing glow behind everything */}
                <div className="absolute inset-0 rounded-full bg-amber-500/25 blur-xl animate-pulse" />

                {/* Slow-rotating dashed outer ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-amber-500/50 animate-[spin_9s_linear_infinite]" />

                {/* Static faint inner ring for depth */}
                <div className="absolute inset-[6px] rounded-full border border-white/15 bg-white/5" />

                {/* Orbiting spark dot */}
                <div className="absolute inset-0 animate-[spin_5s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_3px_rgba(245,158,11,0.7)]" />
                </div>

                {/* Center diamond, counter-rotating slowly for a subtle shimmer */}
                <div className="relative w-8 h-8 rotate-45 rounded-[4px] bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 shadow-[0_0_18px_rgba(245,158,11,0.55)] animate-[spin_9s_linear_infinite_reverse] flex items-center justify-center">
                  <div className="w-2 h-2 -rotate-45 bg-white rounded-full" />
                </div>
              </div>

              <h3 className="text-2xl font-extrabold tracking-tight mb-4">
                Complete{" "}
                <span className="text-amber-500 block">Digital Solutions</span>
              </h3>
              <p className="text-[14px] text-slate-300 font-semibold leading-relaxed max-w-[250px]">
                Building powerful digital products that help your business grow
                and scale.
              </p>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 xl:block relative z-10">
            {SERVICES.map((service, index) => (
              <div
                key={index}
                className={`${service.positionClass} flex justify-center w-full xl:w-auto`}
              >
                <HexagonCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </Row>
    </Section>
  );
}
