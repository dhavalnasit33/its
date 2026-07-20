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
    desc: "Modern, scalable and high-performance websites and web applications.",
    image: "/home-test/web-development.png",
    tags: ["React", "Next.js", "Node.js", "+3"],
    href: "/reactjs-development",
    theme: {
      primary: "#3B82F6",
      softBg: "#EEF5FF",
      hoverGlow: "rgba(59,130,246,0.25)",
    },
    positionClass: "xl:absolute xl:left-[240px] xl:top-[20px]",
    delay: 0.1,
  },
  {
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile applications for iOS & Android.",
    image: "/home-test/mobile-app-development.png",
    tags: ["Flutter", "Android", "iOS", "+1"],
    href: "/flutter-app-development",
    theme: {
      primary: "#22C55E",
      softBg: "#F0FFF5",
      hoverGlow: "rgba(34,197,94,0.22)",
    },
    positionClass: "xl:absolute xl:left-[620px] xl:top-[20px]",
    delay: 0.2,
  },
  {
    title: "UI/UX & Design",
    desc: "User-centered designs that create intuitive and engaging experiences.",
    image: "/home-test/ui-ux-design.png",
    tags: ["UI Design", "UX Research", "Figma"],
    href: "/uiux-design",
    theme: {
      primary: "#8B5CF6",
      softBg: "#F7F2FF",
      hoverGlow: "rgba(139,92,246,0.25)",
    },
    positionClass: "xl:absolute xl:left-[50px] xl:top-[315px]",
    delay: 0.3,
  },
  {
    title: "eCommerce & CMS Development",
    desc: "Powerful eCommerce and CMS solutions to grow your online business.",
    image: "/home-test/ecommerce-cms.png",
    tags: ["Shopify", "WooCommerce", "WordPress"],
    href: "/wordpress-development",
    theme: {
      primary: "#F59E0B",
      softBg: "#FFF8EC",
      hoverGlow: "rgba(245,158,11,0.25)",
    },
    positionClass: "xl:absolute xl:left-[810px] xl:top-[315px]",
    delay: 0.4,
  },
  {
    title: "AI Solutions",
    desc: "Intelligent automation and AI-powered solutions that simplify and accelerate your business.",
    image: "/home-test/ai-solutions.png",
    tags: ["AI Chatbots", "AI Agents", "Automation", "+3"],
    href: "/our-service",
    theme: {
      primary: "#D68029",
      softBg: "#FFF5EA",
      hoverGlow: "rgba(214,128,41,0.28)",
    },
    positionClass: "xl:absolute xl:left-[240px] xl:top-[610px]",
    delay: 0.5,
  },
  {
    title: "Custom Software Development",
    desc: "Custom-built software solutions tailored to your unique business needs.",
    image: "/home-test/custom-software.png",
    tags: ["SaaS", "ERP", "CRM", "+2"],
    href: "/our-service",
    theme: {
      primary: "#2563EB",
      softBg: "#EFF6FF",
      hoverGlow: "rgba(37,99,235,0.22)",
    },
    positionClass: "xl:absolute xl:left-[620px] xl:top-[610px]",
    delay: 0.6,
  },
];

// 3D Hexagon Grid Background with interactive hover
const HexGridBg = () => {
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  // Pointy-top hexagon grid (like reference image)
  const COLS = 22;
  const ROWS = 16;
  const R = 52;     // circumradius (center to vertex)
  const GAP = 5;    // gap between hexes

  // Pointy-top hex: vertices at 30°, 90°, 150°, 210°, 270°, 330°
  const hexPoints = (cx: number, cy: number, r: number) => {
    const angles = [30, 90, 150, 210, 270, 330];
    return angles
      .map((a) => {
        const rad = (Math.PI / 180) * a;
        return `${cx + r * Math.cos(rad)},${cy + r * Math.sin(rad)}`;
      })
      .join(' ');
  };

  const hexes: { x: number; y: number; idx: number }[] = [];
  // Pointy-top layout spacing
  const colW = Math.sqrt(3) * R + GAP;
  const rowH = 1.5 * R + GAP;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const x = col * colW + (row % 2 === 0 ? 0 : colW / 2);
      const y = row * rowH;
      hexes.push({ x: x + R, y: y + R, idx: row * COLS + col });
    }
  }

  const totalW = COLS * colW + colW / 2 + R;
  const totalH = ROWS * rowH + R;

  const HOVER_COLORS = [
    '#3B82F6', '#22C55E', '#8B5CF6',
    '#F59E0B', '#D68029', '#2563EB',
    '#EC4899', '#14B8A6',
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${totalW} ${totalH}`}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none xl:pointer-events-auto"
      >
        <defs>
          {/* Linear gradient from top-left to bottom-right — flat lit tile look */}
          <linearGradient id="hexNormal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e8edf2" />
          </linearGradient>
          {/* Per-color hover gradients */}
          {HOVER_COLORS.map((c, i) => (
            <linearGradient key={i} id={`hexHover${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor={c} stopOpacity="0.10" />
              <stop offset="100%" stopColor={c} stopOpacity="0.22" />
            </linearGradient>
          ))}
          <filter id="hexShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#b0bec5" floodOpacity="0.22" />
          </filter>
          <filter id="hexShadowHover" x="-8%" y="-8%" width="116%" height="116%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#64748b" floodOpacity="0.3" />
          </filter>
        </defs>

        {hexes.map(({ x, y, idx }) => {
          const isHovered = hoveredIdx === idx;
          const colorIdx = idx % HOVER_COLORS.length;
          const fill = isHovered ? `url(#hexHover${colorIdx})` : 'url(#hexNormal)';
          const stroke = isHovered ? HOVER_COLORS[colorIdx] : '#dde3ea';
          const strokeW = isHovered ? 1.5 : 0.7;
          return (
            <polygon
              key={idx}
              points={hexPoints(x, y, R - GAP / 2)}
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeW}
              filter={isHovered ? 'url(#hexShadowHover)' : 'url(#hexShadow)'}
              style={{
                transition: 'fill 0.35s ease, stroke 0.35s ease, transform 0.35s ease',
                cursor: 'default',
                transformOrigin: `${x}px ${y}px`,
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            />
          );
        })}
      </svg>
    </div>
  );
};



const HexagonCard = ({ service }: { service: typeof SERVICES[0] }) => {
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
          background: `radial-gradient(circle, ${theme.hoverGlow} 0%, transparent 70%)`
        }}
      />

      {/* Background SVG Hexagon with Shadow and Border */}
      <div 
        className="absolute inset-0 w-full h-full transition-all duration-500 filter drop-shadow-[0_8px_20px_rgba(15,23,42,0.04)] group-hover:drop-shadow-[0_22px_40px_var(--hover-glow)] z-0"
        style={{
          "--hover-glow": theme.hoverGlow,
        } as React.CSSProperties}
      >
        <svg
          viewBox="0 0 100 115"
          className="w-full h-full fill-white stroke-[#E5E7EB] stroke-[1.2] transition-colors duration-500"
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
            className="group-hover:stroke-[var(--hover-color)] transition-all duration-500"
            style={{
              "--hover-color": theme.primary,
            } as React.CSSProperties}
          />
        </svg>
      </div>

      {/* Card Contents */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-9 px-7 text-center">
        {/* Top: 3D Illustration / Icon */}
        <div className="relative w-[115px] h-[115px] flex items-center justify-center mt-1 group-hover:scale-108 transition-transform duration-500">
          {/* Subtle Glow behind Icon */}
          <div 
            className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
            style={{ backgroundColor: theme.softBg }}
          />
          <Image
            src={image}
            alt={title}
            width={110}
            height={110}
            className="object-contain relative z-10"
            priority
          />
        </div>

        {/* Middle: Content */}
        <div className="flex-1 flex flex-col items-center justify-center   max-w-[270px]">
          <h4 className="text-[17px] font-extrabold text-[#0D1B2A] leading-tight mb-2 group-hover:text-[var(--hover-color)] transition-colors duration-500"
              style={{
                "--hover-color": theme.primary,
              } as React.CSSProperties}>
            {title}
          </h4>
          <p className="text-[12px] lg:text-[14px] text-slate-500 leading-relaxed font-medium">
            {desc}
          </p>
        </div>

        {/* Bottom: Tags & Action Button */}
        <div className="w-full flex flex-col items-center gap-4 mt-auto">
          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[280px]">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[12px] font-bold tracking-wider px-2 py-0.5 rounded-full"
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
            className="w-8.5 h-8.5 rounded-full flex items-center justify-center text-white transition-all duration-500 group-hover:scale-105"
            style={{ backgroundColor: theme.primary }}
          >
            <FiArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:rotate-[-45deg]" />
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default function ServicesSection() {
  return (
    <Section className="services_hex_background py-20   relative font-sans">
      {/* 3D Interactive Hexagon Grid Background */}
      <HexGridBg />

      <Row className="relative z-10 mx-auto px-4">
        {/* Top Centered Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-8 ">
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
            className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0d1b2a] leading-[1.2] mt-3 mb-6"
          >
            Intelligent Solutions for Modern Businesses
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8"
          >
            End-to-end AI and software development services designed to transform
your ideas into digital reality. We build scalable, innovative solutions
that optimize workflows, drive growth, and deliver lasting value.

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

        {/* Honeycomb Layout Container */}
        <div className="relative w-full h-auto xl:h-[1050px] flex flex-col items-center gap-8 xl:block max-w-[1200px] mx-auto">
          
          {/* Central Dark Hexagon (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden xl:flex absolute left-[430px] top-[315px] w-[340px] h-[390px] flex-col items-center justify-center text-center p-9 z-20"
          >
            <div className="absolute inset-0 w-full h-full filter drop-shadow-[0_15px_35px_rgba(15,23,42,0.35)] z-0">
              <svg viewBox="0 0 100 115" className="w-full h-full fill-[#0B1528] stroke-amber-500/35 stroke-[1.5]">
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
              {/* Outer icon decoration */}
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mb-5 bg-white/5">
                <div className="w-7 h-7 border-2 border-amber-500 rotate-45 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
                </div>
              </div>
              
              <h3 className="text-2xl font-extrabold tracking-tight mb-4">
                Complete <span className="text-amber-500 block">Digital Solutions</span>
              </h3>
              <p className="text-[13px] text-slate-300 font-semibold leading-relaxed max-w-[230px]">
                Building powerful digital products that help your business grow and scale.
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
