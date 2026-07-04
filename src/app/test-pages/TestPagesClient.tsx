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
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiCalendar,
} from "react-icons/fi";
import {
  FaLongArrowAltRight,
  FaRocket,
  FaHeadset,
  FaBrain,
  FaRegLightbulb,
  FaUniversity,
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
import Reviews from "@/components/home/Reviews";
import Testimonials from "@/components/home/Testimonials";
import EngagementModels from "@/components/home/EngagementModel";
import TechnologyShowcase from "@/components/home/TechnologyShowcase";

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
  const [activeCaseStudy, setActiveCaseStudy] = React.useState(0);

  const caseStudies = [
    {
      tabLabel: "E-commerce Brand",
      tabIcon: FiShoppingBag,
      title: "AI Chatbot for E-commerce Brand",
      description:
        "Deploying a conversational AI system that handles customer inquiries, recommends personalized products, and automates order tracking in real-time.",
      tags: ["NLP", "Retail", "Automation"],
      stats: [
        {
          value: "65%",
          label: "Customer Engagement",
          arrow: "up",
          icon: FiUsers,
        },
        {
          value: "40%",
          label: "Support Cost",
          arrow: "down",
          icon: FiDollarSign,
        },
        {
          value: "32%",
          label: "Sales Growth",
          arrow: "up",
          icon: FiTrendingUp,
        },
      ],
      image: "/home-test/mobile-1.png",
      features: [
        {
          title: "Smart Conversations",
          description: "Understands intent and delivers accurate answers",
          icon: FiMessageSquare,
          colorClass:
            "bg-[#6320a3] text-white shadow-[0_4px_12px_rgba(99,32,163,0.2)]",
        },
        {
          title: "Product Recommendations",
          description:
            "AI suggests the right products based on user preferences",
          icon: FiShoppingCart,
          colorClass:
            "bg-[#ff7a1a] text-white shadow-[0_4px_12px_rgba(255,122,26,0.2)]",
        },
        {
          title: "Order Tracking",
          description: "Real-time updates and automated notifications",
          icon: FiTruck,
          colorClass:
            "bg-[#34c759] text-white shadow-[0_4px_12px_rgba(52,199,89,0.2)]",
        },
      ],
      details: {
        industry: "Retail / E-commerce",
        duration: "3 Months",
        team: "AI Engineers, NLP Experts, Front-end Developers",
        techStack: "OpenAI, Node.js, React, MongoDB, Redis",
      },
    },
    {
      tabLabel: "AI Diagnostics Support System",
      tabIcon: FiShield,
      title: "AI Diagnostics Support System",
      description:
        "Developing an AI-powered diagnostic support platform that assists healthcare professionals by analyzing medical images, detecting abnormalities with high accuracy, and accelerating clinical decision-making for improved patient outcomes.",
      tags: ["Computer Vision", "Healthcare", "Deep Learning"],
      stats: [
        {
          value: "80%",
          label: "Diagnosis Speed",
          arrow: "up",
          icon: FiActivity,
        },
        { value: "99.2%", label: "Detection Rate", arrow: "up", icon: FiCheck },
        { value: "60%", label: "Human Error", arrow: "down", icon: FiX },
      ],
      image: "/home-test/mobile-1.png",
      features: [
        {
          title: "Anomaly Detection",
          description:
            "Identifies fractures, pneumonia, or tumors with clinical-grade precision",
          icon: FiSearch,
          colorClass:
            "bg-[#6320a3] text-white shadow-[0_4px_12px_rgba(99,32,163,0.2)]",
        },
        {
          title: "Speed & Performance",
          description:
            "Reduces time-to-diagnosis by up to 80% to expedite care",
          icon: FiActivity,
          colorClass:
            "bg-[#ff7a1a] text-white shadow-[0_4px_12px_rgba(255,122,26,0.2)]",
        },
        {
          title: "PACS Integration",
          description: "Integrates seamlessly into existing DICOM databases",
          icon: FiShield,
          colorClass:
            "bg-[#34c759] text-white shadow-[0_4px_12px_rgba(52,199,89,0.2)]",
        },
      ],
      details: {
        industry: "Healthcare / Medicine",
        duration: "6 Months",
        team: "ML Researchers, Radiologists, Cloud Architects",
        techStack: "Python, PyTorch, AWS, Docker, PACS/DICOM",
      },
    },
    {
      tabLabel: "Fintech",
      tabIcon: FaUniversity,
      title: "Predictive Analytics for Fintech",
      description:
        "Building an AI-driven fraud detection and predictive analytics platform that monitors financial transactions in real time, identifies suspicious activities, assesses risk, and strengthens security while minimizing false positives.",
      tags: ["Anomaly Detection", "Fintech", "Security"],
      stats: [
        { value: "95%", label: "Fraud Detection", arrow: "up", icon: FiShield },
        { value: "75%", label: "False Positives", arrow: "down", icon: FiX },
        { value: "2ms", label: "Response Speed", arrow: "up", icon: FiCpu },
      ],
      image: "/home-test/mobile-1.png",
      features: [
        {
          title: "Risk Scoring",
          description:
            "Calculates risk levels on each transaction in real-time",
          icon: FiTarget,
          colorClass:
            "bg-[#6320a3] text-white shadow-[0_4px_12px_rgba(99,32,163,0.2)]",
        },
        {
          title: "Behavioral Profiling",
          description:
            "Adapts continuously to user behavior to minimize false flags",
          icon: FiUsers,
          colorClass:
            "bg-[#ff7a1a] text-white shadow-[0_4px_12px_rgba(255,122,26,0.2)]",
        },
        {
          title: "Instant Blocking",
          description: "Flags and suspends suspicious activities under 2ms",
          icon: FiShield,
          colorClass:
            "bg-[#34c759] text-white shadow-[0_4px_12px_rgba(52,199,89,0.2)]",
        },
      ],
      details: {
        industry: "Fintech / Banking",
        duration: "4 Months",
        team: "Data Scientists, Security Experts, Backend Developers",
        techStack: "Python, Spark, Kafka, Scala, PostgreSQL",
      },
    },
  ];

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
      title: "Finance",
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
      title: "Travel & Hospitality",
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
              <p className="text-slate-500 fonts_16  leading-relaxed mb-8 max-w-sm">
                End-to-end AI and software development services designed to
                transform your ideas into digital reality. We build scalable,
                innovative solutions that drive growth and deliver lasting
                value.
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
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white text-slate-800 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full border border-slate-200 bg-slate-200 flex items-center justify-center text-slate-600">
                          <AIAutomationIcon className="w-5 h-5" />
                        </div>

                        <h4 className="text-lg font-bold text-[#0d1b2a] leading-snug">
                          Web Development
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
                        <div className="w-12 h-12 rounded-full border border-orange-200 bg-orange-100 flex items-center justify-center text-[#d68029]">
                          <FiSmartphone className="w-5 h-5" />
                        </div>

                        <h4 className="text-lg font-bold text-[#0d1b2a] leading-snug">
                          App Development
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
                  </motion.div>
                </div>

                {/* Row 2 - 3 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[48%]">
                  {/* AI Consulting */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white text-slate-800 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full border border-slate-200 bg-slate-200 flex items-center justify-center text-slate-600">
                          <FiShield className="w-5 h-5" />
                        </div>

                        <h4 className="text-lg font-bold text-[#0d1b2a] leading-snug">
                          UI/UX Design
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
                        <div className="w-12 h-12 rounded-full border border-slate-200 bg-slate-200 flex items-center justify-center text-slate-600">
                          <AIConsultingIcon className="w-5 h-5" />
                        </div>

                        <h4 className="text-lg font-bold text-[#0d1b2a] leading-snug">
                          AI Chatbots
                        </h4>
                      </div>

                      <p className="fonts_16 text-gray-600">
                        Build smart conversational AI agents that engage
                        customers and drive business growth.
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
        {/* ================= Background Glow ================= */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-1/2 top-1/2 w-[1100px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl bg-[radial-gradient(circle,rgba(30,64,175,0.18)_0%,rgba(15,23,42,0.08)_45%,transparent_75%)]" />
          <div className="absolute left-[-220px] top-1/2 w-[420px] h-[420px] -translate-y-1/2 rounded-full bg-[#1E40AF]/10 blur-[140px]" />
          <div className="absolute right-[-220px] top-1/2 w-[420px] h-[420px] -translate-y-1/2 rounded-full bg-[#1E40AF]/10 blur-[140px]" />
          <div className="absolute left-1/2 top-0 h-[220px] w-[800px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(255,122,26,0.08)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 mx-auto w-[96%] max-w-[1250px]">
          {/* ================= VS CENTER ================= */}
          <div className="hidden lg:flex absolute left-1/2 top-4 -translate-x-1/2 z-30 flex-col items-center">
            <div className="absolute inset-0 w-20 h-20 rounded-full bg-[#ff7a1a]/20 blur-2xl" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#061325] bg-gradient-to-br from-[#FFA63A] via-[#FF8A1E] to-[#F97316] text-[18px] font-black text-white shadow-[0_0_28px_rgba(255,122,26,0.45)] hover:scale-110 transition-transform duration-300 cursor-default">
              VS
            </div>
            <div className="mt-3 h-[360px] w-px bg-gradient-to-b from-[#7A879B]/35 via-[#556274]/20 to-transparent" />
          </div>

          {/* ================= Main Layout ================= */}
          <div className="flex flex-col justify-center gap-10 lg:gap-16 lg:flex-row">
            {/* ================= LEFT COLUMN (CHALLENGES) ================= */}
            <div className="relative w-full lg:w-[46%] flex flex-col items-center lg:items-end lg:pr-6">
              <img
                src="/home-test/left-lines.png"
                alt=""
                className="absolute left-[-230px] top-[49px] hidden xl:block w-[295px] opacity-95 select-none pointer-events-none"
              />

              <div className="mb-8 w-full max-w-[450px] lg:w-[86%] text-left">
                <span className="block text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  Your Business
                </span>
                <h2 className="mt-1 text-3xl sm:text-[36px] font-bold leading-tight text-[#ff7a1a]">
                  Challenges
                </h2>
              </div>

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
                    whileHover={{ scale: 1.03, x: 8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="
                      group relative flex items-center h-[54px] rounded-xl border border-[#294368] 
                      bg-gradient-to-r from-[#162544] via-[#18294A] to-[#1A2C4D] px-5 
                      overflow-hidden cursor-pointer
                      transition-all duration-300 
                      hover:border-[#3B82F6]/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]
                    "
                  >
                    {/* Hover Light Sweep Effect */}
                    <div className="absolute inset-0 -translate-x-[150%] skew-x-[30deg] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%]" />

                    {/* Icon */}
                    <div
                      className="
                      relative z-10 mr-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full 
                      border border-[#2F68C8] bg-[#1B4FB8] shadow-[0_0_10px_rgba(59,130,246,.30)]
                      transition-transform duration-300 group-hover:scale-110 group-hover:rotate-90
                    "
                    >
                      <FiX className="h-[12px] w-[12px] text-white stroke-[3]" />
                    </div>

                    {/* Text */}
                    <span className="relative z-10 text-sm sm:text-base font-medium text-[#EDF4FF] transition-colors duration-300 group-hover:text-white">
                      {challenge}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* ================= RIGHT COLUMN (SOLUTIONS) ================= */}
            <div className="relative w-full lg:w-[46%] flex flex-col items-center lg:items-start lg:pl-6">
              <img
                src="/home-test/right-lines.png"
                alt=""
                className="absolute right-[-220px] top-[14px] hidden xl:block w-[235px] opacity-95 select-none pointer-events-none"
              />

              <div className="mb-8 w-full max-w-[450px] lg:w-[86%] text-left">
                <span className="block text-2xl sm:text-3xl font-bold tracking-wide text-white">
                  Our AI-Powered
                </span>
                <h2 className="mt-1 text-3xl sm:text-[36px] font-bold leading-tight text-[#ff7a1a]">
                  Solutions
                </h2>
              </div>

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
                    whileHover={{ scale: 1.03, x: -8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="
                      group relative flex items-center h-[54px] rounded-xl border border-[#294368] 
                      bg-gradient-to-r from-[#162544] via-[#18294A] to-[#1A2C4D] px-5 
                      overflow-hidden cursor-pointer
                      transition-all duration-300 
                      hover:border-[#ff7a1a]/60 hover:shadow-[0_0_20px_rgba(255,122,26,0.25)]
                    "
                  >
                    {/* Hover Light Sweep Effect */}
                    <div className="absolute inset-0 -translate-x-[150%] skew-x-[30deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%]" />

                    {/* Icon */}
                    <div
                      className="
                      relative z-10 mr-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full 
                      border border-[#ff9d3b] bg-[#ff7a1a] shadow-[0_0_10px_rgba(255,122,26,.35)]
                      transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12
                    "
                    >
                      <FiCheck className="h-[12px] w-[12px] text-white stroke-[3]" />
                    </div>

                    {/* Text */}
                    <span className="relative z-10 text-sm sm:text-base font-medium text-[#EDF4FF] transition-colors duration-300 group-hover:text-[#ffea9d]">
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
            <h2 className="common-h2 text-[#0d1b2a]">
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
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-[200px] mx-auto lg:mx-auto">
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

          {/* Dynamic Full Width Case Studies Showcase */}
          <div className="mt-16 pt-16 max-w-[1400px] w-full mx-auto">
            {/* Heading */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[#d68029] text-xs font-bold uppercase tracking-widest block mb-3">
                CASE STUDIES
              </span>
              <h2 className="common-h2 text-[#0d1b2a]">
                Real Results,{" "}
                <span className="relative inline-block">
                  Real
                  <span className="absolute bottom-[2px] left-0 w-full h-[3px] bg-[#d68029] rounded-full" />
                </span>{" "}
                <span className="text-[#d68029]">Impact</span>
              </h2>
              <p className="fonts_16 text-gray-600 mt-4">
                Discover how businesses are leveraging AI to solve challenges,
                improve efficiency, and achieve measurable growth.
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex flex-col gap-8">
              {/* Tabs selector */}
              <div className="flex flex-wrap justify-center gap-3">
                {caseStudies.map((study, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCaseStudy(idx)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all duration-300 ${
                      activeCaseStudy === idx
                        ? "bg-[#e06c16] text-white shadow-md shadow-[#e06c16]/20"
                        : "bg-white border border-slate-200/80 text-[#334155] hover:bg-slate-50 hover:text-slate-800"
                    }`}
                  >
                    {/* Icon */}
                    {React.createElement(study.tabIcon, {
                      className: `w-4 h-4 ${
                        activeCaseStudy === idx
                          ? "text-white"
                          : "text-slate-500"
                      }`,
                    })}
                    {study.tabLabel}
                  </button>
                ))}
              </div>

              {/* Showcase Container */}
              {/* Showcase Container */}
              <motion.div
                key={activeCaseStudy}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-[32px] overflow-hidden shadow-[0_15px_50px_rgba(214,128,41,0.08)] transition-all duration-300 flex flex-col lg:flex-row relative"
              >
                {/* Left Column: Info & Stats (Navy Blue bg) */}
                <div className="w-full lg:w-[55%] bg-[#1c2a40] p-8 md:p-12 lg:p-12 xl:p-14 flex flex-col justify-between relative overflow-hidden">
                  {/* Subtle dot pattern background */}
                  <div
                    className="absolute bottom-0 left-0 w-64 h-64 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(#ffffff 1.5px, transparent 1.5px)",
                      backgroundSize: "16px 16px",
                    }}
                  />

                  <div className="relative z-10 lg:pr-24">
                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-3 mb-6 md:mb-8">
                      {caseStudies[activeCaseStudy].tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="bg-transparent border border-[#ff7a1a] text-[#ff7a1a] px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-3xl lg:text-[40px] font-bold text-white leading-[1.2] mb-5 tracking-tight">
                      {caseStudies[activeCaseStudy].title}
                    </h3>

                    <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
                      {caseStudies[activeCaseStudy].description}
                    </p>
                  </div>

                  {/* Stats counters */}
                  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 xl:gap-5 mt-auto lg:pr-14">
                    {caseStudies[activeCaseStudy].stats.map((stat, statIdx) => {
                      const StatIcon = stat.icon;
                      return (
                        <div
                          key={statIdx}
                          className="bg-[#28384d] rounded-2xl p-5 flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-[#ff7a1a] flex items-center justify-center shrink-0">
                              <StatIcon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-2xl lg:text-[28px] font-bold text-white tracking-tight">
                              {stat.value}
                            </span>
                          </div>
                          <div className="text-[13px] font-medium text-slate-300 flex items-center gap-1.5 pt-1">
                            <span>{stat.label}</span>
                            <span
                              className={`font-bold text-sm ${stat.arrow === "up" ? "text-green-400" : "text-green-400"}`}
                            >
                              {stat.arrow === "up" ? "↗" : "↘"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Premium Feature Cards (No Image) */}
                <div className="w-full lg:w-[45%] bg-[#fffcf8] p-8 md:p-12 xl:p-14 relative flex flex-col justify-center min-h-[480px] overflow-hidden z-0">
                  {/* Decorative Ambient Glows */}
                  <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-[#ff7a1a]/10 blur-[100px] rounded-full pointer-events-none" />
                  <div className="absolute bottom-[-10%] left-[-20%] w-[300px] h-[300px] bg-[#6320a3]/10 blur-[80px] rounded-full pointer-events-none" />

                  {/* Subtle Dotted overlay for texture */}
                  <div
                    className="absolute inset-0 opacity-[0.15] pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(#d68029 1.5px, transparent 1.5px)",
                      backgroundSize: "24px 24px",
                    }}
                  />

                  {/* Feature Cards Container */}
                  <div className="relative z-10 flex flex-col gap-4 w-full max-w-[500px] mx-auto">
                    {/* Small context header */}
                    <div className="mb-4 px-2">
                      <span className="text-[#d68029] text-[11px] font-extrabold uppercase tracking-widest block mb-1">
                        Key Capabilities
                      </span>
                      <h4 className="text-2xl font-bold text-[#0d1b2a]">
                        Platform Features
                      </h4>
                    </div>

                    {caseStudies[activeCaseStudy].features.map(
                      (feat, featIdx) => {
                        const FeatIcon = feat.icon;

                        return (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: featIdx * 0.15,
                              duration: 0.5,
                            }}
                            key={featIdx}
                            className="group relative bg-white/70 backdrop-blur-xl border border-white rounded-[24px] p-5 lg:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(214,128,41,0.08)] hover:-translate-y-1 transition-all duration-400 cursor-default overflow-hidden"
                          >
                            {/* Accent Line on hover */}
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ff7a1a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="flex items-center gap-5 pr-6">
                              {/* Icon Container with glowing effect */}
                              <div className="relative shrink-0">
                                <div
                                  className={`absolute inset-0 blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300 ${feat.colorClass}`}
                                />
                                <div
                                  className={`relative w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center shadow-sm ${feat.colorClass}`}
                                >
                                  <FeatIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                                </div>
                              </div>

                              {/* Text Content */}
                              <div className="flex-1">
                                <h4 className="text-[16px] lg:text-[17px] font-bold text-[#0d1b2a] leading-tight mb-1.5 group-hover:text-[#d68029] transition-colors duration-300">
                                  {feat.title}
                                </h4>
                                <p className="text-[13px] lg:text-[14px] text-slate-500 font-medium leading-relaxed">
                                  {feat.description}
                                </p>
                              </div>
                            </div>

                            {/* Hover Arrow Indicator */}
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                              <FiChevronRight className="w-6 h-6 text-[#d68029]" />
                            </div>
                          </motion.div>
                        );
                      },
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Bottom details bar */}
              <div className="bg-white border border-slate-200/50 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap items-stretch justify-between gap-6">
                  {/* Item 1: Industry */}
                  <div className="flex-1 flex items-center gap-4 min-w-[200px] px-2">
                    <div className="w-11 h-11 rounded-full bg-[#f3f0ff] border border-[#e8d5ff] text-[#7c3aed] flex items-center justify-center shrink-0">
                      <FiTarget className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        Industry
                      </span>
                      <span className="block text-sm font-bold text-[#0d1b2a] mt-0.5 leading-snug">
                        {caseStudies[activeCaseStudy].details.industry}
                      </span>
                    </div>
                  </div>

                  <div className="hidden lg:block w-px bg-slate-200/80 self-stretch my-1" />

                  {/* Item 2: Duration */}
                  <div className="flex-1 flex items-center gap-4 min-w-[200px] px-2">
                    <div className="w-11 h-11 rounded-full bg-[#fff8f2] border border-[#ffe0cc] text-[#ff7a1a] flex items-center justify-center shrink-0">
                      <FiCalendar className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        Duration
                      </span>
                      <span className="block text-sm font-bold text-[#0d1b2a] mt-0.5 leading-snug">
                        {caseStudies[activeCaseStudy].details.duration}
                      </span>
                    </div>
                  </div>

                  <div className="hidden lg:block w-px bg-slate-200/80 self-stretch my-1" />

                  {/* Item 3: Team Involved */}
                  <div className="flex-1 flex items-center gap-4 min-w-[200px] px-2">
                    <div className="w-11 h-11 rounded-full bg-[#ebfbf3] border border-[#c3fae8] text-[#10b981] flex items-center justify-center shrink-0">
                      <FiUsers className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        Team Involved
                      </span>
                      <span className="block text-sm font-bold text-[#0d1b2a] mt-0.5 leading-snug">
                        {caseStudies[activeCaseStudy].details.team}
                      </span>
                    </div>
                  </div>

                  <div className="hidden lg:block w-px bg-slate-200/80 self-stretch my-1" />

                  {/* Item 4: Tech Stack */}
                  <div className="flex-1 flex items-center gap-4 min-w-[200px] px-2">
                    <div className="w-11 h-11 rounded-full bg-[#f0f7ff] border border-[#d0e8ff] text-[#3b82f6] flex items-center justify-center shrink-0">
                      <FaRocket className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        Tech Stack
                      </span>
                      <span className="block text-sm font-bold text-[#0d1b2a] mt-0.5 leading-snug">
                        {caseStudies[activeCaseStudy].details.techStack}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Section>
      <TechnologyShowcase />
      {/* ── SECTION 5: GLOBAL PRESENCE & INDUSTRIES WE SERVE ── */}
      {/* ── SECTION 5: GLOBAL PRESENCE & INDUSTRIES WE SERVE ── */}
      <Section className="bg-white py-12 lg:py-16 relative overflow-hidden">
        <Row className="max-w-[1600px] mx-auto">
          {/* Main Card Container - Reduced padding to decrease overall height */}
          <div className="bg-[#fafcff] rounded-[32px] p-6 lg:p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
              {/* Left Column: Industries We Serve */}
              <div className="flex-1 flex flex-col justify-between w-full lg:w-[48%]">
                <div>
                  <span className="text-[#d68029] text-xs font-bold uppercase tracking-widest block mb-2">
                    INDUSTRIES WE SERVE
                  </span>
                  <h2 className="text-3xl md:text-[32px] font-bold text-[#0d1b2a] leading-[1.25] mb-6">
                    AI solutions tailored for <br className="hidden sm:block" />
                    every industry
                  </h2>

                  {/* Grid of 8 cards - Removed aspect-square, adjusted padding to reduce height */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {industryCards.map((card, idx) => {
                      const Icon = card.icon;
                      return (
                        <motion.div
                          key={idx}
                          whileHover={{ y: -2 }}
                          className="bg-white border border-slate-100 rounded-2xl py-3 px-2 flex flex-col items-center text-center shadow-[0_2px_15px_rgba(0,0,0,0.015)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all duration-300 min-h-[120px] justify-center"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#f0f4f8] flex items-center justify-center text-[#d68029] mb-2 shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[13px] font-bold text-slate-700 leading-tight">
                            {card.title}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <Link
                  href="#contact-form-section"
                  className="mt-8 self-start border border-orange-200 hover:bg-orange-50 text-[#d68029] font-bold px-6 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm"
                >
                  Explore All Industries
                  <FaLongArrowAltRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Vertical Divider */}
              <div className="hidden lg:block w-px bg-slate-200/80 mx-2" />

              {/* Right Column: Global Presence */}
              <div className="flex-1 flex flex-col justify-start w-full lg:w-[50%]">
                <div className="mb-4">
                  <span className="text-[#d68029] text-xs font-bold uppercase tracking-widest block mb-2">
                    GLOBAL PRESENCE
                  </span>
                  <h2 className="text-3xl md:text-[32px] font-bold text-[#0d1b2a] leading-[1.25]">
                    Serving Clients <br className="hidden sm:block" />
                    Worldwide
                  </h2>
                </div>

                {/* Stats & Map Flex Layout */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start w-full relative mt-4 flex-1">
                  {/* Stats list stack - Font sizes increased */}
                  <div className="flex flex-col gap-6 z-10 w-full sm:w-[150px] shrink-0 pt-2">
                    <div>
                      <span className="block text-4xl font-bold text-[#d68029] tracking-tight">
                        20+
                      </span>
                      <span className="block text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-wide">
                        Countries
                      </span>
                    </div>
                    <div>
                      <span className="block text-4xl font-bold text-[#d68029] tracking-tight">
                        120+
                      </span>
                      <span className="block text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-wide">
                        Happy Clients
                      </span>
                    </div>

                    {/* 150+ and 24/7 Side by Side */}
                    <div className="flex gap-10">
                      <div>
                        <span className="block text-4xl font-bold text-[#d68029] tracking-tight">
                          150+
                        </span>
                        <span className="block text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-wide">
                          Projects
                        </span>
                      </div>
                      <div>
                        <span className="block text-4xl font-bold text-[#d68029] tracking-tight">
                          24/7
                        </span>
                        <span className="block text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-wide">
                          Support Coverage
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Map taking remaining space */}
                  <div className="relative w-full h-[260px] sm:h-full min-h-[280px] flex-1 flex items-center justify-center ml-[70px] mt-[-70px]">
                    {/* World Map Background */}
                    <div
                      className="absolute inset-0 opacity-95 pointer-events-none scale-110 sm:scale-125 transform origin-center"
                      style={{
                        backgroundImage: 'url("/home-test/map.png")',
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    />

                    {/* Adjusted Pins */}
                    <MapPin top="32%" left="18%" />
                    <MapPin top="36%" left="32%" />
                    <MapPin top="26%" left="58%" />
                    <MapPin top="34%" left="78%" />
                    <MapPin top="60%" left="25%" />
                    <MapPin top="48%" left="52%" />
                    <MapPin top="66%" left="75%" />

                    {/* Our Global Network Widget Card - Texts slightly enlarged */}
                    <div className="absolute -bottom-20 left-80 bg-[#030b1a] border border-[#d68029]/30 rounded-xl p-4 shadow-2xl w-[180px] z-20 text-white">
                      <h4 className="text-xs font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d68029]" />
                        Our Global Network
                      </h4>
                      <ul className="flex flex-col gap-2.5">
                        {[
                          "North America",
                          "Europe",
                          "Middle East",
                          "Asia Pacific",
                        ].map((region) => (
                          <li
                            key={region}
                            className="flex items-center justify-between text-[11px] text-slate-300 hover:text-[#d68029] transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center gap-1.5">
                              <FaMapMarkerAlt className="text-[#d68029] text-[10px]" />
                              <span>{region}</span>
                            </div>
                            <FiChevronRight className="text-slate-500 group-hover:text-[#d68029] transition-colors" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Section>

      <Reviews />
      <Testimonials />
      <EngagementModels />
    </main>
  );
}
