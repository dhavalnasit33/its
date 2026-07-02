"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import {
  FiCheck,
  FiX,
  FiCpu,
  FiMessageSquare,
  FiSettings,
  FiShield,
  FiGlobe,
  FiSmartphone,
  FiPhone,
  FiTarget,
  FiSearch,
  FiCodesandbox,
  FiChevronRight,
  FiBookOpen,
  FiActivity,
  FiHeart,
  FiCreditCard,
  FiShoppingCart,
  FiHome,
  FiTruck,
  FiCompass,
} from "react-icons/fi";
import {
  FaLongArrowAltRight,
  FaRocket,
  FaHeadset,
  FaBrain,
  FaRegLightbulb,
} from "react-icons/fa";
import {
  LuBot,
  LuCpu,
  LuShield,
  LuGlobe,
  LuSmartphone,
  LuWorkflow,
} from "react-icons/lu";
import Section from "@/components/Section";
import Row from "@/components/Row";
import Hero from "@/components/home/Hero";
import StatsGrid from "@/components/home/RoundStatsCard";
import PlatformSlider from "@/components/home/PlatformSlider";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";
import Image from "next/image";

const MapPin = ({ top, left }: { top: string; left: string }) => (
  <div
    className="absolute -translate-x-1/2 -translate-y-full group cursor-pointer"
    style={{ top, left }}
  >
    {/* Ping Animation */}
    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-orange-400 animate-ping opacity-30"></span>

    {/* Marker */}
    <FaMapMarkerAlt
      size={22}
      className="text-[#d68029] drop-shadow-lg relative z-10"
    />

    {/* White Center Dot */}
    <span className="absolute top-[7px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white z-20"></span>
  </div>
);

// Custom SVG components to match reference designs exactly
const ChatbotIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <rect x="8" y="8" width="8" height="5.5" rx="1.5" strokeWidth="1.5" />
    <circle cx="10.5" cy="11" r="0.75" fill="currentColor" />
    <circle cx="13.5" cy="11" r="0.75" fill="currentColor" />
    <path d="M10 13.8h4" strokeWidth="1" />
    <line x1="12" y1="8" x2="12" y2="6.5" strokeWidth="1.5" />
    <circle cx="12" cy="6" r="0.5" fill="currentColor" />
  </svg>
);

const CustomAIDevIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <circle cx="12" cy="12" r="3" />
    <path
      d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
      strokeWidth="2.5"
    />
    <circle cx="12" cy="5" r="1.2" fill="currentColor" />
    <circle cx="12" cy="19" r="1.2" fill="currentColor" />
    <circle cx="5" cy="12" r="1.2" fill="currentColor" />
    <circle cx="19" cy="12" r="1.2" fill="currentColor" />
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

const WebDevIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <rect x="3" y="3" width="18" height="15" rx="2" />
    <line x1="3" y1="8" x2="21" y2="8" />
    <line x1="9" y1="8" x2="9" y2="18" />
    <circle cx="6" cy="5.5" r="0.5" fill="currentColor" />
    <circle cx="8" cy="5.5" r="0.5" fill="currentColor" />
    <circle cx="10" cy="5.5" r="0.5" fill="currentColor" />
  </svg>
);

const MobileAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <rect x="5" y="2" width="14" height="20" rx="2.5" />
    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
    <rect x="8" y="5" width="8" height="10" rx="1" strokeWidth="1.5" />
    <circle cx="12" cy="10" r="1.5" strokeWidth="1.5" />
  </svg>
);

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

export default function TestPagesClient() {
  const { navStructure } = useWebsiteSettings();
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

  // Section 2 Data
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

  // Section 4 Data
  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description: "We analyze your business needs and challenges.",
      icon: FiSearch,
    },
    {
      number: "02",
      title: "Strategy",
      description: "We design the right AI solution for you.",
      icon: FiTarget,
    },
    {
      number: "03",
      title: "Development",
      description: "We build, test & iterate with agility.",
      icon: FiCodesandbox,
    },
    {
      number: "04",
      title: "Deployment",
      description: "We deploy securely & seamlessly.",
      icon: FaRocket,
    },
    {
      number: "05",
      title: "Support",
      description: "We optimize & support for continuous growth.",
      icon: FaHeadset,
    },
  ];

  const industryCards = [
    {
      title: "Healthcare",
      icon: FiHeart,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      title: "Fintech",
      icon: FiCreditCard,
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      title: "E-commerce",
      icon: FiShoppingCart,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      title: "Education",
      icon: FiBookOpen,
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-500",
    },
    {
      title: "Real Estate",
      icon: FiHome,
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
    },
    {
      title: "Logistics",
      icon: FiTruck,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      title: "Travel",
      icon: FiCompass,
      bgColor: "bg-sky-50",
      iconColor: "text-sky-500",
    },
    {
      title: "Manufacturing",
      icon: FiCpu,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-500",
    },
  ];

  const services =
    navStructure?.servicesNav?.flatMap(
      (category) =>
        category.links?.map((service) => ({
          title: service.title,
          slug: service.slug,
        })) || [],
    ) || [];

  return (
    <main className="relative w-full bg-white text-gray-900 overflow-x-hidden">
      {/* ── SECTION 1: HERO SECTION ── */}
      <Hero scrollToId="challenges-section" />

      <Section className="bg-[#0d1b2a] z-10 py-6! ">
        <Row>
          <PlatformSlider items={services} />
        </Row>
      </Section>

      <Section className="bg-gray-50 py-14!">
        <Row className=" mx-auto ">
          <StatsGrid columns={4} bordered />
        </Row>
      </Section>

      {/* ── SECTION 3: OUR SERVICES (UPDATED TO MATCH IMAGE 2) ── */}
      <Section className="bg-white py-20 lg:py-28 relative">
        <Row>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Heading & Button */}
            <div className="w-full lg:w-[28%] flex flex-col justify-start pt-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#d68029]">
                OUR SERVICES
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0d1b2a] leading-[1.2] mt-3 mb-6">
                Intelligent Solutions for Modern Businesses
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm">
                End-to-end AI and software development services designed to
                transform your ideas into digital reality.
              </p>

              <Link
                href="#contact-form-section"
                className="self-start border border-slate-300 text-slate-700 hover:border-slate-400 hover:text-[#0d1b2a] font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 group text-sm"
              >
                View All Services
                <FaLongArrowAltRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
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

                    <p className="text-slate-300 leading-8 [max-w-260px]">
                      Automate repetitive tasks and workflows to boost
                      productivity and reduce operational costs.
                    </p>
                  </div>

                  <FaLongArrowAltRight className="w-6 h-6 text-[#d68029] transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </motion.div>

              {/* Grid Cards Container */}
              <div className="flex-1 flex flex-col gap-6">
                {/* Row 1 - 2 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[48%]">
                  {/* AI Chatbots */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white text-slate-800 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full border border-slate-200 bg-slate-200 flex items-center justify-center text-slate-600 transition-colors group-hover:bg-slate-100 shrink-0">
                          <ChatbotIcon className="w-5 h-5" />
                        </div>
                        <h4 className="text-[17px] font-bold text-[#0d1b2a] leading-snug">
                          AI Chatbots
                        </h4>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Build smart conversational AI agents that engage
                        customers and drive business growth.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center">
                      <FaLongArrowAltRight className="w-4 h-4 text-[#d68029] group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </motion.div>

                  {/* Custom AI Dev */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white text-slate-800 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full border border-orange-200 bg-orange-100 flex items-center justify-center text-[#d68029] shrink-0">
                          <CustomAIDevIcon className="w-5 h-5" />
                        </div>
                        <h4 className="text-[17px] font-bold text-[#0d1b2a] leading-snug">
                          Custom AI Development
                        </h4>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Custom AI models and applications tailored to your
                        unique business challenges.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center">
                      <FaLongArrowAltRight className="w-4 h-4 text-[#d68029] group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </motion.div>
                </div>

                {/* Row 2 - 3 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[48%]">
                  {/* AI Consulting */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white text-slate-800 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full border border-slate-200 bg-slate-200 flex items-center justify-center text-slate-600 transition-colors group-hover:bg-slate-100 shrink-0">
                          <AIConsultingIcon className="w-5 h-5" />
                        </div>
                        <h5 className="text-[15px] font-bold text-[#0d1b2a] leading-snug">
                          AI Consulting
                        </h5>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        Expert AI strategy and consulting to identify
                        opportunities and drive transformation.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center">
                      <FaLongArrowAltRight className="w-4 h-4 text-[#d68029] group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </motion.div>

                  {/* Web Dev */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white text-slate-800 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full border border-slate-200 bg-slate-200 flex items-center justify-center text-slate-600 transition-colors group-hover:bg-slate-100 shrink-0">
                          <WebDevIcon className="w-5 h-5" />
                        </div>
                        <h5 className="text-[15px] font-bold text-[#0d1b2a] leading-snug">
                          Web Development
                        </h5>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        Modern, scalable and high-performance web applications
                        built with latest technologies.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center">
                      <FaLongArrowAltRight className="w-4 h-4 text-[#d68029] group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Section>
      {/* ============================
    CHALLENGES VS SOLUTIONS
============================= */}

      <Section
        id="challenges-section"
        className="relative overflow-hidden bg-gradient-to-b from-[#030d22] to-[#081838] py-24"
      >
        {/* Background Glow */}
        {/* ================= Background ================= */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Main Center Glow */}
          <div
            className="
      absolute
      left-1/2
      top-1/2
      w-[1100px]
      h-[700px]
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      opacity-60
      blur-3xl
      bg-[radial-gradient(circle,rgba(30,64,175,0.18)_0%,rgba(15,23,42,0.08)_45%,transparent_75%)]
    "
          />

          {/* Left Glow */}
          <div
            className="
      absolute
      left-[-220px]
      top-1/2
      w-[420px]
      h-[420px]
      -translate-y-1/2
      rounded-full
      bg-[#1E40AF]/10
      blur-[140px]
    "
          />

          {/* Right Glow */}
          <div
            className="
      absolute
      right-[-220px]
      top-1/2
      w-[420px]
      h-[420px]
      -translate-y-1/2
      rounded-full
      bg-[#1E40AF]/10
      blur-[140px]
    "
          />

          {/* Top Highlight */}
          <div
            className="
      absolute
      left-1/2
      top-0
      h-[220px]
      w-[800px]
      -translate-x-1/2
      bg-[radial-gradient(circle,rgba(255,122,26,0.08)_0%,transparent_70%)]
    "
          />
        </div>

        {/* Max width reduced to pull outer elements inward */}
        <div className="relative z-10 mx-auto w-[96%] max-w-[1250px]">
          {/* VS Badge */}
          {/* ================= VS CENTER ================= */}
          <div className="hidden lg:flex absolute left-1/2 top-4 -translate-x-1/2 z-30 flex-col items-center">
            {/* Soft Orange Glow */}
            <div className="absolute inset-0 w-20 h-20 rounded-full bg-[#ff7a1a]/20 blur-2xl" />

            {/* VS Circle */}
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#061325] bg-gradient-to-br from-[#FFA63A] via-[#FF8A1E] to-[#F97316] text-[18px] font-black text-white shadow-[0_0_28px_rgba(255,122,26,0.45)]">
              VS
            </div>

            {/* Vertical Line */}
            <div className="mt-3 h-[360px] w-px bg-gradient-to-b from-[#7A879B]/35 via-[#556274]/20 to-transparent" />
          </div>

          {/* Main Layout */}

          {/* Changed justify-between to justify-center and added gap to reduce space */}
          <div className="flex flex-col justify-center gap-10 lg:gap-16 lg:flex-row">
            {/* ================= LEFT COLUMN ================= */}

            {/* Added lg:items-end to push the content block towards the center */}
            <div className="relative w-full lg:w-[46%] flex flex-col items-center lg:items-end lg:pr-6">
              {/* Left Side Graphic */}
              <img
                src="/home-test/left-lines.png"
                alt=""
                className="absolute left-[-230px] top-[49px] hidden xl:block w-[295px] opacity-95 select-none pointer-events-none"
              />

              {/* Heading */}

              <div className="mb-8 w-full max-w-[450px] lg:w-[86%] text-left">
                <span className="block text-[34px] font-semibold text-white tracking-wide">
                  Your Business
                </span>

                <h2 className="mt-1 text-[31px] font-bold leading-tight text-[#ff7a1a]">
                  Challenges
                </h2>
              </div>

              {/* Challenge Cards */}

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
                    whileHover={{
                      x: 5,
                      scale: 1.01,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="
      group
      flex
      items-center
      h-[50px]
      rounded-[12px]
      border
      border-[#294368]
      bg-gradient-to-r
      from-[#162544]
      via-[#18294A]
      to-[#1A2C4D]
      px-4
      transition-all
      duration-300
      hover:border-[#3F5F91]
      hover:shadow-[0_8px_20px_rgba(0,0,0,.28)]
    "
                  >
                    {/* Icon */}

                    <div
                      className="
        mr-4
        flex
        h-5
        w-5
        shrink-0
        items-center
        justify-center
        rounded-full
        border
        border-[#2F68C8]
        bg-[#1B4FB8]
        shadow-[0_0_10px_rgba(59,130,246,.30)]
      "
                    >
                      <FiX className="h-[11px] w-[11px] text-white stroke-[3]" />
                    </div>

                    {/* Text */}

                    <span className="text-[13px] font-medium text-[#EDF4FF]">
                      {challenge}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            {/* ================= RIGHT COLUMN ================= */}

            {/* Changed from lg:items-end to lg:items-start to push the content block left towards the center */}
            <div className="relative w-full lg:w-[46%] flex flex-col items-center lg:items-start lg:pl-6">
              {/* Right Side Graphic */}
              <img
                src="/home-test/right-lines.png"
                alt=""
                className="absolute right-[-220px] top-[14px] hidden xl:block w-[235px] opacity-95 select-none pointer-events-none"
              />

              {/* Heading */}

              {/* Removed text-right to match the left-aligned look in your second image */}
              <div className="mb-8 w-full max-w-[450px] lg:w-[86%] text-right">
                <span className="block text-[34px] font-semibold tracking-wide text-white">
                  Our AI-Powered
                </span>

                <h2 className="mt-1 text-[31px] font-bold leading-tight text-[#ff7a1a]">
                  Solutions
                </h2>
              </div>

              {/* Solution Cards */}

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
                    whileHover={{
                      x: -5,
                      scale: 1.01,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="
      group
      flex
      items-center
      h-[50px]
      rounded-[12px]
      border
      border-[#294368]
      bg-gradient-to-r
      from-[#162544]
      via-[#18294A]
      to-[#1A2C4D]
      px-4
      transition-all
      duration-300
      hover:border-[#ff7a1a]/40
      hover:shadow-[0_8px_20px_rgba(0,0,0,.28)]
    "
                  >
                    {/* Icon */}

                    <div
                      className="
        mr-4
        flex
        h-5
        w-5
        shrink-0
        items-center
        justify-center
        rounded-full
        border
        border-[#ff9d3b]
        bg-[#ff7a1a]
        shadow-[0_0_10px_rgba(255,122,26,.35)]
      "
                    >
                      <FiCheck className="h-[11px] w-[11px] text-white stroke-[3]" />
                    </div>

                    {/* Text */}

                    <span className="text-[13px] font-medium text-[#EDF4FF]">
                      {solution}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── SECTION 4: OUR AI DEVELOPMENT PROCESS & INDUSTRIES / CASE STUDIES ── */}
      <Section className="bg-white relative overflow-hidden">
        <Row>
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0d1b2a] leading-tight">
              Our <span className="text-[#d68029]">AI Development</span> Process
            </h2>
          </div>

          {/* Timeline Process Flow */}
          <div className="relative max-w-[1400px] w-full mx-auto mt-16 px-4">
            {/* Vertical Line - Mobile/Tablet only */}
            <div className="lg:hidden absolute left-8 top-4 bottom-4 w-[2px] bg-orange-200 z-0" />

            {/* Steps Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6 relative z-10">
              {processSteps.map((step, idx) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className="flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center gap-6 lg:gap-0 group relative"
                  >
                    {/* Step Circle & Number Badge */}
                    <div className="relative mb-6 lg:mb-8 shrink-0">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white border border-[#d68029] flex items-center justify-center shadow-sm relative z-10 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(214,128,41,0.2)]">
                        <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-[#d68029]" />
                      </div>

                      {/* Step Number Round Badge */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 shadow-sm z-20">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2 lg:pt-0">
                      <h4 className="text-lg lg:text-xl font-bold text-[#0d1b2a] mb-2">
                        {step.title}
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-[200px] mx-auto lg:mx-auto">
                        {step.description}
                      </p>
                    </div>

                    {/* Desktop Connecting Line with Chevron Arrow */}
                    {idx < 4 && (
                      <div className="hidden lg:block absolute top-[40px] left-[calc(50%+50px)] w-[calc(100%-100px)] h-[2px] bg-orange-200 z-0">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-orange-300 transform rotate-45" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Split Layout: Industries We Empower & Case Studies */}
          <div className="mt-16 pt-16 max-w-[1400px] w-full mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_auto_1.15fr] gap-10 items-stretch">
              {/* Left Column: Industries We Empower */}
              <div className="flex flex-col justify-center">
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_2.2fr] gap-8 items-center">
                  {/* Left part: Title, Description, Button */}
                  <div className="flex flex-col justify-between h-full py-2">
                    <div>
                      <h3 className="text-3xl font-extrabold text-[#0d1b2a] leading-tight">
                        Industries <br />
                        <span className="text-[#d68029]">We Empower</span>
                      </h3>
                      <p className="text-slate-500 text-sm mt-4 leading-relaxed max-w-xs">
                        AI solutions for every industry and business vertical.
                      </p>
                    </div>
                    <Link
                      href="#contact-form-section"
                      className="mt-8 self-start border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-[#0d1b2a] font-bold px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 text-xs"
                    >
                      View All Industries
                      <FaLongArrowAltRight className="w-3.5 h-3.5 text-[#d68029]" />
                    </Link>
                  </div>

                  {/* Right part: Grid of 8 cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {industryCards.map((card, idx) => {
                      const Icon = card.icon;
                      return (
                        <motion.div
                          key={idx}
                          whileHover={{ y: -3, scale: 1.02 }}
                          className="bg-white border border-slate-100 rounded-2xl p-3.5 flex flex-col items-center text-center shadow-[0_4px_15px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:border-slate-200 transition-all duration-300 min-h-[115px] justify-center"
                        >
                          <div
                            className={`w-9 h-9 rounded-full ${card.bgColor} flex items-center justify-center text-base ${card.iconColor} mb-2.5 shrink-0`}
                          >
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                          <span className="text-[13px] font-bold text-slate-800 leading-tight">
                            {card.title}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden lg:block w-px bg-slate-200/80 mx-2" />

              {/* Right Column: Case Studies */}
              <div className="flex flex-col justify-center">
                <div className="flex items-end justify-between mb-6 gap-4">
                  <div>
                    <h3 className="text-3xl font-extrabold text-[#0d1b2a] leading-tight">
                      Case Studies <br />
                      <span className="text-[#d68029]">
                        Real Results, Real Impact
                      </span>
                    </h3>
                  </div>
                  <Link
                    href="#contact-form-section"
                    className="text-slate-600 hover:text-slate-900 font-bold text-xs flex items-center gap-1 shrink-0 pb-1.5 transition-colors"
                  >
                    Explore Our Work
                    <FiChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Case Study Card */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-[#f8fafc] border border-slate-100 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:border-slate-200/80 transition-all duration-300 min-h-[290px]"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr] gap-6 items-center w-full">
                    {/* Left Column: Heading & Stats */}
                    <div className="flex flex-col justify-center">
                      <h4 className="text-lg md:text-xl font-extrabold text-[#0d1b2a] mb-2 leading-snug">
                        AI Chatbot for E-commerce Brand
                      </h4>
                      <div className="w-full h-px bg-slate-200/60 my-4" />

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div>
                          <span className="block text-2xl font-black text-[#d68029] tracking-tight">
                            +65%
                          </span>
                          <span className="block text-[10px] font-bold text-slate-500 mt-1 leading-snug">
                            Customer Engagement
                          </span>
                        </div>
                        <div>
                          <span className="block text-2xl font-black text-[#d68029] tracking-tight">
                            -40%
                          </span>
                          <span className="block text-[10px] font-bold text-slate-500 mt-1 leading-snug">
                            Support Cost
                          </span>
                        </div>
                        <div>
                          <span className="block text-2xl font-black text-[#d68029] tracking-tight">
                            +32%
                          </span>
                          <span className="block text-[10px] font-bold text-slate-500 mt-1 leading-snug">
                            Sales Growth
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Mockup Image */}
                    <div className="relative w-full h-[160px] md:h-[190px] flex items-center justify-center overflow-hidden">
                      <Image
                        src="/home-test/mobile.png"
                        alt="AI Chatbot Showcase"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  {/* Slider dot pagination */}
                  <div className="flex justify-center gap-1.5 mt-6 border-t border-slate-200/40 pt-4">
                    <span className="w-2 h-2 rounded-full bg-[#d68029]" />
                    <span className="w-2 h-2 rounded-full bg-slate-200" />
                    <span className="w-2 h-2 rounded-full bg-slate-200" />
                    <span className="w-2 h-2 rounded-full bg-slate-200" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Row>
      </Section>

      {/* ── SECTION 5: GLOBAL PRESENCE & TRANSFORM BUSINESS ── */}
      <Section className="bg-white relative">
        <Row>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Global Presence & Stylized Dotted Map */}
            <div className="relative min-h-[320px] flex flex-col md:flex-row items-center gap-8">
              {/* Left Part: Text & Stats */}
              <div className="w-full md:w-[48%] shrink-0 z-10">
                <span className="text-[#d68029] text-xs font-extrabold uppercase tracking-widest block mb-3">
                  OUR IMPACT
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d1b2a] leading-tight mb-5">
                  Global Presence, <br />
                  <span className="text-[#d68029]">Local Support</span>
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 max-w-sm">
                  We work with clients worldwide and deliver solutions that make
                  an impact globally.
                </p>

                {/* Stats Counters */}
                <div className="flex items-center gap-8">
                  <div>
                    <h4 className="text-3xl md:text-4xl font-black text-[#0d1b2a]">
                      20+
                    </h4>
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-wider mt-1">
                      Countries Served
                    </p>
                  </div>
                  <div className="w-px h-10 bg-slate-200" />
                  <div>
                    <h4 className="text-3xl md:text-4xl font-black text-[#0d1b2a]">
                      5+
                    </h4>
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-wider mt-1">
                      Global Offices
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Part: Dotted Map Watermark */}
              <div className="relative w-full md:w-[52%] h-[480px] flex items-center justify-center">
                {/* World Map */}
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    backgroundImage:
                      'url("https://res.cloudinary.com/dctvxbvuz/image/upload/v1782469240/ydydz7sp8skfxquzyyar.gif")',
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    filter: "grayscale(100%) brightness(1.2)",
                  }}
                />

                {/* Pins */}
                <MapPin top="30%" left="18%" />
                <MapPin top="34%" left="30%" />
                <MapPin top="24%" left="63%" />
                <MapPin top="33%" left="88%" />
                <MapPin top="60%" left="25%" />
                <MapPin top="46%" left="56%" />
                <MapPin top="68%" left="86%" />
              </div>
            </div>

            {/* Right Column: Premium Dark CTA Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#040d21] text-white p-8 md:p-12 rounded-3xl border border-slate-900 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[380px] group"
            >
              {/* Decorative Neural Net Globe Watermark */}
              <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-[280px] h-[280px] opacity-75 pointer-events-none select-none">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full animate-[spin_60s_linear_infinite]"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#f97316"
                    strokeWidth="0.3"
                    fill="none"
                    strokeDasharray="3 6"
                    opacity="0.3"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f97316"
                    strokeWidth="0.5"
                    fill="none"
                    opacity="0.4"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="#fb923c"
                    strokeWidth="0.2"
                    fill="none"
                    strokeDasharray="5 2"
                    opacity="0.3"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    stroke="#fb923c"
                    strokeWidth="0.6"
                    fill="none"
                    opacity="0.5"
                  />
                  <path
                    d="M50,10 Q65,30 80,50 Q65,70 50,90 Q35,70 20,50 Q35,30 50,10 Z"
                    stroke="#f97316"
                    strokeWidth="0.4"
                    fill="none"
                    opacity="0.4"
                  />
                  <path
                    d="M10,50 Q30,65 50,80 Q70,65 90,50 Q70,35 50,20 Q30,35 10,50 Z"
                    stroke="#f97316"
                    strokeWidth="0.4"
                    fill="none"
                    opacity="0.4"
                  />
                  <line
                    x1="50"
                    y1="10"
                    x2="50"
                    y2="90"
                    stroke="#f97316"
                    strokeWidth="0.3"
                    opacity="0.3"
                  />
                  <line
                    x1="10"
                    y1="50"
                    x2="90"
                    y2="50"
                    stroke="#f97316"
                    strokeWidth="0.3"
                    opacity="0.3"
                  />
                  <circle cx="50" cy="10" r="1.5" fill="#f97316" />
                  <circle cx="90" cy="50" r="1.5" fill="#f97316" />
                  <circle cx="50" cy="90" r="1.5" fill="#f97316" />
                  <circle cx="10" cy="50" r="1.5" fill="#f97316" />
                  <circle cx="27" cy="27" r="1.2" fill="#fb923c" />
                  <circle cx="73" cy="27" r="1.2" fill="#fb923c" />
                  <circle cx="73" cy="73" r="1.2" fill="#fb923c" />
                  <circle cx="27" cy="73" r="1.2" fill="#fb923c" />
                  <circle cx="50" cy="30" r="2" fill="#ffedd5" />
                  <circle cx="50" cy="70" r="2" fill="#ffedd5" />
                  <circle cx="30" cy="50" r="2" fill="#ffedd5" />
                  <circle cx="70" cy="50" r="2" fill="#ffedd5" />
                </svg>
              </div>

              <div className="relative z-10 max-w-sm">
                <h3 className="text-3xl md:text-[38px] font-extrabold text-white leading-tight mb-4">
                  Ready to Transform <br />
                  Your Business?
                </h3>
                <p className="text-slate-300 text-sm md:text-[15px] leading-relaxed mb-8">
                  Let's build intelligent solutions that drive innovation,
                  growth and real results.
                </p>

                <Link
                  href="#contact-form-section"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff9a1f] to-[#f97316] hover:from-[#f97316] hover:to-[#ea580c] px-8 py-3.5 text-sm font-bold uppercase rounded-full shadow-[0_4px_20px_rgba(214,128,41,0.35)] text-white group-hover:scale-[1.02] transition-all duration-300"
                >
                  Book a Free Consultation
                  <FaLongArrowAltRight className="w-4 h-4 text-white" />
                </Link>
              </div>

              {/* Contact Call details */}
              <div className="relative z-10 flex items-center gap-3 mt-8 border-t border-slate-800/80 pt-6">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[#d68029]">
                  <FiPhone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                    Or Call Us:
                  </span>
                  <a
                    href="tel:+13024987213"
                    className="text-white hover:text-[#d68029] font-bold text-sm md:text-base tracking-wide transition-colors"
                  >
                    +1 (302) 498-7213
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </Row>
      </Section>
    </main>
  );
}
