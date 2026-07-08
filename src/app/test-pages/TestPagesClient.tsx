"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  FiCheck,
  FiX,
  FiCpu,
  FiMessageSquare,
  FiGitMerge,
  FiShield,
  FiGlobe,
  FiSmartphone,
  FiBarChart2,
  FiTarget,
  FiSearch,
  FiMessageCircle,
  FiChevronRight,
  FiBookOpen,
  FiActivity,
  FiHeart,
  FiCreditCard,
  FiShoppingCart,
  FiHome,
  FiTruck,
  FiCompass,
  FiLink,
  FiUsers,
  FiZap,
  FiTrendingUp,
  FiCalendar,
  FiLayers,
  FiCode,
  FiRepeat,
  FiMonitor,
  FiLayout,
  FiCloud,
  FiBell,
  FiBriefcase,
  FiDatabase,
  FiExternalLink,
  FiGithub,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";
import {
  FaLongArrowAltRight,
  FaRocket,
  FaChartLine,
  FaStar,
} from "react-icons/fa";

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
import WhyChoosePremium from "@/components/home/WhyChoosePremium";
import apiService from "@/lib/apiService";
import { HomePageData, SingleResponse, WhyChooseItem, CreativeWork, PaginatedResponse } from "@/types";
import Button from "@/components/Button";
import FAQ from "@/components/FAQ";

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

const homeFAQs = [
  {
    question: "What types of software development services do you offer?",
    answer:
      "We provide end-to-end software development services including AI solutions, custom software development, web applications, mobile apps, enterprise software, SaaS platforms, cloud solutions, UI/UX design, and business automation tailored to your requirements.",
  },
  {
    question: "Can you develop custom AI solutions for our business?",
    answer:
      "Yes. We design and develop custom AI solutions such as AI chatbots, virtual assistants, workflow automation, document processing, recommendation engines, generative AI applications, and LLM-powered business platforms that align with your business goals.",
  },
  {
    question: "How do you ensure the software can scale as our business grows?",
    answer:
      "Our solutions are built using scalable architectures, cloud-native technologies, and industry best practices. This allows your application to support increasing users, data, and business growth without major redevelopment.",
  },
  {
    question: "Can you work with our existing software or legacy systems?",
    answer:
      "Absolutely. We can modernize legacy applications, integrate with existing systems, migrate outdated platforms, and add new features while minimizing disruption to your business operations.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "Our team specializes in React, Next.js, Node.js, Flutter, Python, Laravel, .NET, MongoDB, PostgreSQL, AWS, Docker, OpenAI, Gemini, Claude, LangChain, and other modern web, mobile, cloud, and AI technologies.",
  },
  {
    question: "How do you manage the software development process?",
    answer:
      "We follow an agile development approach that includes discovery, planning, UI/UX design, development, testing, deployment, and post-launch support. Clients receive regular progress updates and milestone reviews throughout the project.",
  },
  {
    question: "How do you ensure the security of our application and business data?",
    answer:
      "Security is integrated into every stage of development. We implement secure coding standards, encrypted data storage, role-based access control, authentication, regular security reviews, and NDA agreements whenever required.",
  },
  {
    question: "Will we have a dedicated development team for our project?",
    answer:
      "Yes. Depending on your project scope, you'll work with a dedicated team that may include a project manager, solution architect, UI/UX designer, developers, QA engineers, and technical consultants to ensure smooth project execution.",
  },
  {
    question: "Do you provide maintenance and technical support after launch?",
    answer:
      "Yes. We offer ongoing maintenance, security updates, performance optimization, bug fixes, cloud monitoring, feature enhancements, and long-term technical support to keep your software running efficiently.",
  },
  {
    question: "How long does it typically take to develop a custom software solution?",
    answer:
      "Project timelines depend on complexity, features, and integrations. After understanding your requirements, we provide a detailed project roadmap with estimated milestones, delivery schedule, and development timeline.",
  },
  {
    question: "How do you estimate the cost of a software development project?",
    answer:
      "Project pricing is based on your business requirements, project scope, technology stack, integrations, and timeline. After an initial consultation, we provide a transparent proposal with detailed estimates and deliverables.",
  },
  {
    question: "Why should businesses choose Inspire Techno Solution as their technology partner?",
    answer:
      "We combine technical expertise, AI innovation, scalable development practices, transparent communication, and long-term support to deliver secure, high-performance digital solutions that help businesses innovate, grow, and stay competitive.",
  },
];

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

// --- NEW DATA FOR AI EXPERTISE & PORTFOLIO ---
const aiExpertise = [
  {
    category: "Generative AI & LLMs",
    icon: FiMessageSquare,
    description:
      "Implementing state-of-the-art language models for intelligent text generation, summarization, and comprehension.",
    tools: [
      "OpenAI GPT-4",
      "Anthropic Claude 3",
      "Meta Llama 3",
      "Google Gemini",
    ],
    color: "from-blue-500/20 to-indigo-500/10",
    iconColor: "text-blue-400",
  },
  {
    category: "RAG & Vector Databases",
    icon: FiDatabase,
    description:
      "Enhancing AI accuracy by securely connecting LLMs to your private enterprise data and knowledge bases.",
    tools: ["Pinecone", "Milvus", "LangChain", "LlamaIndex"],
    color: "from-[#d68029]/20 to-[#d68029]/5",
    iconColor: "text-[#d68029]",
  },
  {
    category: "AI Agents & Automation",
    icon: FiCpu,
    description:
      "Building autonomous AI agents that plan, execute, and automate complex multi-step workflows with zero human intervention.",
    tools: ["AutoGPT", "CrewAI", "Zapier AI", "Custom Agents"],
    color: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
  },
  {
    category: "Computer Vision",
    icon: FiMonitor,
    description:
      "Extracting meaningful information from digital images, videos, and visual inputs for automated analysis.",
    tools: ["OpenCV", "YOLO", "TensorFlow", "PyTorch"],
    color: "from-purple-500/20 to-fuchsia-500/10",
    iconColor: "text-purple-400",
  },
];

const portfolioProjects = [
  {
    title: "OneChat AI",
    category: "AI SaaS Platform",
    description:
      "A powerful all-in-one AI platform built with Flutter Web, Node.js, and React. Features include AI chat, image generation, video generation, document processing, PDF tools, AI writing, Google Authentication, Stripe subscriptions, affiliate system, SEO optimization, and dozens of integrated AI models with a modern, scalable architecture.",
    icon: FiCpu,
    stack: [
      "Flutter Web",
      "Node.js",
      "React",
      "Next.js",
      "OpenAI",
      "Stripe",
      "Google OAuth",
      "AWS",
    ],
    image: "portfolio/onechat-ai.png",
    theme: "blue",
  },

  {
    title: "MyCRA",
    category: "E-Commerce Platform",
    description:
      "A modern e-commerce platform designed for a seamless online shopping experience. Developed with secure authentication, Google Login, Stripe payment integration, responsive product catalog, order management, customer accounts, and a scalable backend for high-performance online retail operations.",
    icon: FiShoppingBag,
    stack: [
      "React",
      "Node.js",
      "MongoDB",
      "Stripe",
      "Google OAuth",
      "Express.js",
      "REST API",
    ],
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2070&auto=format&fit=crop",
    theme: "orange",
  },

  {
    title: "Unity Healthcare",
    category: "Healthcare E-Commerce",
    description:
      "A healthcare commerce platform built using Next.js and Node.js for selling healthcare and wellness products online. Includes secure user authentication, product management, shopping cart, online payments, order tracking, admin dashboard, SEO optimization, and a fast, responsive user experience.",
    icon: FiHeart,
    stack: [
      "Next.js",
      "Node.js",
      "React",
      "MongoDB",
      "Stripe",
      "Tailwind CSS",
      "REST API",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    theme: "emerald",
  },
];

export default function TestPagesClient() {
  const { navStructure } = useWebsiteSettings();
  const [activeCaseStudy, setActiveCaseStudy] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const [homePageData, setHomePageData] = React.useState<HomePageData | null>(
    null,
  );
  const [whyChooseData, setWhyChooseData] = React.useState<WhyChooseItem[]>([]);
  const [portfolioWorks, setPortfolioWorks] = React.useState<CreativeWork[]>([]);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const sliderTimerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const stepDeliverables = [
    [
      "Requirement Analysis",
      "Target Audience Definition",
      "Tech Feasibility Study",
      "Consulting Report",
    ],
    [
      "Project Roadmap Design",
      "Wireframes & UI UX Mockups",
      "System Architecture Plan",
      "Sprint Planning",
    ],
    [
      "Responsive Frontend Coding",
      "Robust Backend Systems",
      "AI Model / LLM Integration",
      "API Development",
    ],
    [
      "QA Testing & Bug Fixes",
      "Security Auditing",
      "CI/CD Cloud Deployment",
      "Performance Optimization",
    ],
    [
      "24/7 Monitoring & Support",
      "Continuous Backups",
      "SLA Maintenance",
      "Feature Roadmap Planning",
    ],
  ];

  const stepDurations = [
    "1 - 2 Weeks",
    "2 - 3 Weeks",
    "4 - 8 Weeks",
    "2 - 3 Weeks",
    "Ongoing / SLA",
  ];

  React.useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const response =
          await apiService<SingleResponse<HomePageData>>("/homepage");
        if (response.success) {
          setHomePageData(response.data);
        }
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    };
    fetchHomepageData();

    const fetchWhyChoose = async () => {
      try {
        const res =
          await apiService<SingleResponse<WhyChooseItem[]>>("/choose_its_home");
        if (res.success) setWhyChooseData(res.data || []);
      } catch (err) {
        console.error("Error fetching WhyChoose data:", err);
      }
    };
    fetchWhyChoose();

    // Fetch web-development creative works for portfolio slider
    const fetchPortfolioWorks = async () => {
    
      try {
        const res = await apiService<PaginatedResponse<CreativeWork>>("/creative-work", {
          params: {   limit: 12, category: "6a0c58a850ca8a2da030dc58" },
        });
        if (res.success && res.data?.length) {
          setPortfolioWorks(res.data);
        }
      } catch (err) {
        console.error("Error fetching portfolio works:", err);
      }
    };
    fetchPortfolioWorks();
  }, []);

  // Auto-play portfolio slider
  useEffect(() => {
    if (portfolioWorks.length <= 1) return;
    sliderTimerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % portfolioWorks.length);
    }, 3500);
    return () => {
      if (sliderTimerRef.current) clearInterval(sliderTimerRef.current);
    };
  }, [portfolioWorks.length]);

  const caseStudies = [
    {
      tabLabel: "Popular",
      tabIcon: FaStar,

      title: "AI-Powered Business Automation Platform",

      description:
        "Our most popular solution combines AI, web, and cloud technologies to automate business processes, improve productivity, and accelerate digital transformation for modern organizations.",

      tags: ["AI", "Automation", "Enterprise"],

      stats: [
        {
          value: "70%",
          label: "Productivity Boost",
          icon: FiTrendingUp,
          arrow: "up",
        },
        {
          value: "50+",
          label: "AI Integrations",
          icon: FiCpu,
          arrow: "up",
        },
        {
          value: "99.9%",
          label: "System Uptime",
          icon: FiShield,
          arrow: "up",
        },
      ],

      features: [
        {
          title: "AI Workflow Automation",
          description:
            "Automate repetitive business tasks using intelligent AI workflows.",
          icon: FiCpu,
          colorClass: "bg-[#ff7a1a]",
        },
        {
          title: "Business Process Integration",
          description:
            "Connect CRM, ERP, APIs, and third-party platforms seamlessly.",
          icon: FiGitMerge,
          colorClass: "bg-[#2563eb]",
        },
        {
          title: "Real-Time Analytics",
          description:
            "Track performance with dashboards and actionable business insights.",
          icon: FiBarChart2,
          colorClass: "bg-[#10b981]",
        },
      ],

      details: {
        industry: "All Industries",
        duration: "Agile Delivery",
        team: "AI • Web • Mobile",
        techStack: "React • Node.js • Python • OpenAI",
      },
    },

    {
      tabLabel: "AI Automation",
      tabIcon: FiCpu,

      title: "Custom AI Solutions for Modern Businesses",

      description:
        "Build intelligent AI applications including chatbots, virtual assistants, document processing, and workflow automation powered by modern LLM technologies.",

      tags: ["OpenAI", "LLM", "Python"],

      stats: [
        {
          value: "24/7",
          label: "AI Availability",
          icon: FiMessageSquare,
          arrow: "up",
        },
        {
          value: "80%",
          label: "Task Automation",
          icon: FiZap,
          arrow: "up",
        },
        {
          value: "100+",
          label: "API Integrations",
          icon: FiLink,
          arrow: "up",
        },
      ],

      features: [
        {
          title: "AI Chatbots",
          description:
            "Enterprise AI assistants for customer support and sales.",
          icon: FiMessageCircle,
          colorClass: "bg-[#ff7a1a]",
        },
        {
          title: "LLM Integration",
          description: "OpenAI and custom AI model integration.",
          icon: FiCpu,
          colorClass: "bg-[#2563eb]",
        },
        {
          title: "Workflow Automation",
          description: "Reduce manual work with AI-powered automation.",
          icon: FiRepeat,
          colorClass: "bg-[#10b981]",
        },
      ],

      details: {
        industry: "AI Solutions",
        duration: "Custom Timeline",
        team: "AI Engineers",
        techStack: "Python • OpenAI • LangChain",
      },
    },

    {
      tabLabel: "Business Website",
      tabIcon: FiGlobe,

      title: "High-Performance Business Websites",

      description:
        "Develop modern, secure, and SEO-friendly websites that strengthen your online presence and drive measurable business growth.",

      tags: ["React", "Next.js", "SEO"],

      stats: [
        {
          value: "95+",
          label: "Performance Score",
          icon: FiActivity,
          arrow: "up",
        },
        {
          value: "3x",
          label: "Faster Loading",
          icon: FiZap,
          arrow: "up",
        },
        {
          value: "100%",
          label: "Responsive",
          icon: FiMonitor,
          arrow: "up",
        },
      ],

      features: [
        {
          title: "Modern UI/UX",
          description: "Responsive and engaging website experiences.",
          icon: FiLayout,
          colorClass: "bg-[#ff7a1a]",
        },
        {
          title: "SEO Optimized",
          description: "Built to improve visibility and search rankings.",
          icon: FiSearch,
          colorClass: "bg-[#2563eb]",
        },
        {
          title: "Secure Architecture",
          description: "Reliable and scalable backend development.",
          icon: FiShield,
          colorClass: "bg-[#10b981]",
        },
      ],

      details: {
        industry: "Business Websites",
        duration: "4–12 Weeks",
        team: "UI/UX • Frontend • Backend",
        techStack: "React • Next.js • Node.js",
      },
    },

    {
      tabLabel: "Mobile App",
      tabIcon: FiSmartphone,

      title: "Cross-Platform Mobile Applications",

      description:
        "Create scalable Android and iOS applications with intuitive user experiences, cloud connectivity, and enterprise-grade performance.",

      tags: ["Flutter", "Android", "iOS"],

      stats: [
        {
          value: "2x",
          label: "Faster Development",
          icon: FiSmartphone,
          arrow: "up",
        },
        {
          value: "99%",
          label: "Crash-Free",
          icon: FiShield,
          arrow: "up",
        },
        {
          value: "One Code",
          label: "Multiple Platforms",
          icon: FiLayers,
          arrow: "up",
        },
      ],

      features: [
        {
          title: "Cross-Platform Apps",
          description: "Single codebase for Android and iOS.",
          icon: FiSmartphone,
          colorClass: "bg-[#ff7a1a]",
        },
        {
          title: "Cloud Integration",
          description: "Secure backend and real-time synchronization.",
          icon: FiCloud,
          colorClass: "bg-[#2563eb]",
        },
        {
          title: "Push Notifications",
          description: "Keep users engaged with instant updates.",
          icon: FiBell,
          colorClass: "bg-[#10b981]",
        },
      ],

      details: {
        industry: "Mobile Applications",
        duration: "6–16 Weeks",
        team: "Flutter • Android • iOS",
        techStack: "Flutter • Firebase • Node.js",
      },
    },

    {
      tabLabel: "Enterprise",
      tabIcon: FiBriefcase,

      title: "Enterprise Software Solutions",

      description:
        "Custom ERP, CRM, and enterprise platforms designed to streamline operations, improve collaboration, and support long-term business growth.",

      tags: ["ERP", "CRM", "Cloud"],

      stats: [
        {
          value: "100K+",
          label: "Transactions",
          icon: FiDatabase,
          arrow: "up",
        },
        {
          value: "99.9%",
          label: "Availability",
          icon: FiShield,
          arrow: "up",
        },
        {
          value: "24/7",
          label: "Enterprise Support",
          icon: FiTrendingUp,
          arrow: "up",
        },
      ],

      features: [
        {
          title: "ERP & CRM Systems",
          description: "Custom business management solutions.",
          icon: FiBriefcase,
          colorClass: "bg-[#ff7a1a]",
        },
        {
          title: "API Integration",
          description: "Connect existing software and services.",
          icon: FiGitMerge,
          colorClass: "bg-[#2563eb]",
        },
        {
          title: "Cloud Deployment",
          description: "Secure, scalable cloud infrastructure.",
          icon: FiCloud,
          colorClass: "bg-[#10b981]",
        },
      ],

      details: {
        industry: "Enterprise Software",
        duration: "Custom Timeline",
        team: "Full-Stack Engineers",
        techStack: "React • Node.js • AWS",
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
      title: "Discovery & Consulting",
      description:
        "We understand your business goals, project requirements, and technical challenges.",
      icon: FiSearch,
      color: "#0d1b2a", // Navy Blue
      borderColor: "border-[#0d1b2a]",
      textColor: "text-[#0d1b2a]",
      glowColor: "group-hover:shadow-[0_0_25px_rgba(13,27,42,0.25)]",
    },
    {
      number: "02",
      title: "Planning & Design",
      description:
        "We create the project roadmap, system architecture, UI/UX, and choose the right tech stack.",
      icon: FiLayers,
      color: "#d68029", // Orange
      borderColor: "border-[#d68029]",
      textColor: "text-[#d68029]",
      glowColor: "group-hover:shadow-[0_0_25px_rgba(214,128,41,0.25)]",
    },
    {
      number: "03",
      title: "Development & AI",
      description:
        "We build scalable web, mobile, cloud, and AI solutions using React, Node.js, and OpenAI.",
      icon: FiCode,
      color: "#0d1b2a", // Navy Blue
      borderColor: "border-[#0d1b2a]",
      textColor: "text-[#0d1b2a]",
      glowColor: "group-hover:shadow-[0_0_25px_rgba(13,27,42,0.25)]",
    },
    {
      number: "04",
      title: "Testing & Deployment",
      description:
        "We ensure quality through testing and deploy securely for high performance and reliability.",
      icon: FaRocket,
      color: "#d68029", // Orange
      borderColor: "border-[#d68029]",
      textColor: "text-[#d68029]",
      glowColor: "group-hover:shadow-[0_0_25px_rgba(214,128,41,0.25)]",
    },
    {
      number: "05",
      title: "Support & Growth",
      description:
        "We provide ongoing maintenance, feature enhancements, and continuous technical support.",
      icon: FaChartLine,
      color: "#0d1b2a", // Navy Blue
      borderColor: "border-[#0d1b2a]",
      textColor: "text-[#0d1b2a]",
      glowColor: "group-hover:shadow-[0_0_25px_rgba(13,27,42,0.25)]",
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
    {
      title: "Cybersecurity",
      icon: FiShield,
      bgColor: "bg-slate-50",
      iconColor: "text-slate-500",
    },
    {
      title: "Legal Tech",
      icon: FiBriefcase,
      bgColor: "bg-teal-50",
      iconColor: "text-teal-500",
    },
    {
      title: "Media & Entertainment",
      icon: FiMonitor,
      bgColor: "bg-pink-50",
      iconColor: "text-pink-500",
    },
    {
      title: "AgriTech",
      icon: FiGlobe,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-500",
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
    <main className="relative w-full bg-white text-gray-900 ">
      {/* ── SECTION 1: HERO SECTION ── */}
      <Hero
        heroSecton={homePageData?.heroSecton}
        scrollToId="challenges-section"
      />

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

      {/* ── SECTION 3: OUR SERVICES ── */}
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
                        <div className="w-12 h-12 rounded-full border border-orange-200 bg-orange-100 flex items-center justify-center text-[#d68029]">
                          <FiSmartphone className="w-5 h-5" />
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
                          <FiShield className="w-5 h-5" />
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
                          <AIConsultingIcon className="w-5 h-5" />
                        </div>

                        <h4 className="text-lg font-bold text-[#0d1b2a] leading-snug">
                          eCommerce & CMS Development
                        </h4>
                      </div>

                      <p className="fonts_16 text-gray-600">
                        Develop fast, secure, and user-friendly eCommerce and
                        CMS websites.
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

      {/* ── NEW SECTION: AI EXPERTISE ── */}
      <Section className="bg-[#030812] py-24 relative overflow-hidden">
        {/* Subtle background grids/glows for premium AI feel */}
        <div className="absolute inset-0 z-0">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_top,rgba(214,128,41,0.05)_0%,transparent_50%)]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <Row className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#d68029] text-xs font-extrabold uppercase tracking-widest block mb-3">
              AI Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white leading-[1.2]">
              Our <span className="text-[#d68029]">AI Expertise</span> &
              Technologies
            </h2>
            <p className="text-slate-400 fonts_16 mt-4">
              We leverage state-of-the-art artificial intelligence models,
              frameworks, and infrastructure to build intelligent,
              next-generation applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {aiExpertise.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative cursor-pointer bg-[#0a1220]/80 backdrop-blur-md border border-slate-800 rounded-[24px] p-8 hover:bg-[#0c182d] hover:border-slate-700 transition-all duration-300"
                >
                  <div className="flex items-start gap-5 mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 border border-white/5`}
                    >
                      <Icon className={`w-7 h-7 ${item.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#d68029] transition-colors duration-300">
                        {item.category}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-2.5">
                    {item.tools.map((tool, toolIdx) => (
                      <span
                        key={toolIdx}
                        className="px-3 py-1.5 cursor-pointer rounded-lg bg-slate-800/50 border border-slate-700/50 text-[12px] font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-default"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Row>
      </Section>

      {/* ── SECTION 4: OUR DEVELOPMENT PROCESS & INDUSTRIES / CASE STUDIES ── */}
      <Section className="bg-white relative overflow-hidden py-24">
        <Row>
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#d68029] text-xs font-bold uppercase tracking-widest block mb-3">
              METHODOLOGY
            </span>
            <h2 className="common-h2 text-[#0d1b2a]">
              Our <span className="text-[#d68029]">Development</span> Process
            </h2>
            <p className="text-slate-500 mt-4 text-sm sm:text-base max-w-xl mx-auto">
              We follow a structured, collaborative methodology to transform
              your ideas into scalable, production-ready digital products.
            </p>
          </div>

          {/* Interactive Stepper Container */}
          <div className="max-w-[1400px] w-full mx-auto mb-20">
            {/* Step Tabs Selector */}
            <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 mb-16 bg-white border border-slate-100 p-3 rounded-[24px] shadow-[0_10px_30px_rgba(13,27,42,0.02)] z-10">
              {processSteps.map((step, idx) => {
                const isActive = activeStep === idx;
                const isCompleted = idx < activeStep;
                const Icon = step.icon;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`flex items-center cursor-pointer gap-3 px-6 py-4 rounded-[18px] w-full md:w-auto transition-all duration-300 text-left relative overflow-hidden ${
                      isActive
                        ? "bg-[#0d1b2a] text-white shadow-lg shadow-[#0d1b2a]/20 scale-[1.02]"
                        : "hover:bg-slate-100 text-slate-600"
                    }`}
                  >
                    {/* Step Icon or Completed Check */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors duration-300 ${
                        isActive
                          ? "bg-[#d68029] border-[#d68029] text-white"
                          : isCompleted
                            ? "bg-emerald-50 border-emerald-250 text-emerald-600"
                            : "bg-slate-100 border-slate-200 text-slate-500"
                      }`}
                    >
                      {isCompleted ? (
                        <FiCheck className="w-5 h-5 stroke-[3]" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <span
                        className={`block text-[10px] font-extrabold uppercase tracking-wider ${
                          isActive ? "text-[#d68029]" : "text-slate-400"
                        }`}
                      >
                        Step {step.number}
                      </span>
                      <span className="block text-sm font-bold leading-tight mt-0.5 whitespace-nowrap">
                        {step.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Showcase Split Pane */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[460px]">
              {/* Left Side: Premium Interactive Visual Mockup */}
              <div className="lg:col-span-6 bg-[#030b1a] rounded-[32px] p-8 md:p-10 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[360px] lg:min-h-full">
                {/* Glowing decorative gradient behind mockup */}
                <div
                  className="absolute -top-1/4 -right-1/4 w-[280px] h-[280px] rounded-full blur-[80px] opacity-40 transition-colors duration-500"
                  style={{ backgroundColor: processSteps[activeStep].color }}
                />

                {/* Mockup Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-xs text-slate-500 font-mono ml-2">
                      inspire_process_v1.sh
                    </span>
                  </div>
                  <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded border border-slate-800">
                    {processSteps[activeStep].title.toUpperCase()}
                  </span>
                </div>

                {/* Dynamic Content Showcase based on active step */}
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex items-center justify-center my-6 relative z-10"
                >
                  {activeStep === 0 && (
                    <div className="w-full font-mono text-[13px] text-slate-350 bg-slate-900/40 p-5 rounded-2xl border border-slate-800/80">
                      <p className="text-[#d68029] font-bold">
                        // 1. Discovery & Consulting
                      </p>
                      <p className="text-slate-500 mt-2">
                        Initializing project scope analysis...
                      </p>
                      <div className="mt-4 space-y-1">
                        <p className="text-emerald-400">
                          ✓ Target audience identified
                        </p>
                        <p className="text-emerald-400">
                          ✓ Tech stack options evaluated
                        </p>
                        <p className="text-blue-400">
                          ⚡ Core challenges mapping: Complete
                        </p>
                      </div>
                      <div className="mt-4 bg-slate-950/80 p-2.5 rounded border border-slate-800 flex justify-between items-center">
                        <span className="text-slate-550">
                          Project Readiness:
                        </span>
                        <span className="font-bold text-emerald-400">
                          98% Fit
                        </span>
                      </div>
                    </div>
                  )}

                  {activeStep === 1 && (
                    <div className="w-full bg-[#070e1c] border border-slate-800/60 p-6 rounded-2xl flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400">
                          Figma Wireframe Preview
                        </span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#d68029] animate-pulse" />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-20 bg-slate-800/40 rounded-lg border border-slate-800/30 flex flex-col justify-between p-2">
                          <span className="text-[9px] text-slate-500">
                            Header
                          </span>
                          <div className="h-1.5 w-8 bg-slate-700 rounded" />
                        </div>
                        <div className="h-20 bg-[#d68029]/10 rounded-lg border border-[#d68029]/30 flex flex-col justify-between p-2">
                          <span className="text-[9px] text-[#d68029] font-bold">
                            Hero Section
                          </span>
                          <div className="h-1.5 w-12 bg-[#d68029] rounded" />
                        </div>
                        <div className="h-20 bg-slate-800/40 rounded-lg border border-slate-800/30 flex flex-col justify-between p-2">
                          <span className="text-[9px] text-slate-500">
                            Footer
                          </span>
                          <div className="h-1.5 w-6 bg-slate-700 rounded" />
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-400 flex justify-between bg-slate-950/60 p-2 rounded">
                        <span>Roadmap Duration:</span>
                        <span className="text-slate-200 font-bold">
                          12 Weeks Total
                        </span>
                      </div>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div className="w-full font-mono text-[12px] text-slate-350 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/60 flex flex-col gap-2">
                      <div className="flex justify-between text-slate-500 border-b border-slate-900 pb-2 mb-1">
                        <span>File: app/page.tsx</span>
                        <span className="text-[#d68029]">React 18</span>
                      </div>
                      <p>
                        <span className="text-purple-400">import</span> React{" "}
                        <span className="text-purple-400">from</span>{" "}
                        <span className="text-green-300">
                          &apos;react&apos;
                        </span>
                        ;
                      </p>
                      <p>
                        <span className="text-purple-400">import</span> &#123;
                        OpenAI &#125;{" "}
                        <span className="text-purple-400">from</span>{" "}
                        <span className="text-green-300">
                          &apos;openai&apos;
                        </span>
                        ;
                      </p>
                      <p className="mt-2 text-slate-500">
                        // Creating AI pipeline
                      </p>
                      <p>
                        <span className="text-blue-400">const</span>{" "}
                        <span className="text-yellow-300">initAI</span> ={" "}
                        <span className="text-purple-400">async</span> () =&gt;
                        &#123;
                      </p>
                      <p className="pl-4">
                        await{" "}
                        <span className="text-blue-300">
                          openai.chat.completions.create
                        </span>
                        (&#123; ... &#125;)
                      </p>
                      <p>&#125;;</p>
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div className="w-full bg-slate-900/30 border border-slate-800/80 p-6 rounded-2xl flex flex-col gap-3">
                      <span className="text-xs font-bold text-slate-400">
                        Quality Assurance Summary
                      </span>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-800">
                          <span className="text-[11px] text-slate-300">
                            Unit Tests Passed
                          </span>
                          <span className="text-emerald-400 font-bold text-xs">
                            142/142 (100%)
                          </span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-800">
                          <span className="text-[11px] text-slate-300">
                            Lighthouse Performance
                          </span>
                          <span className="text-emerald-400 font-bold text-xs">
                            98 / 100
                          </span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-800">
                          <span className="text-[11px] text-slate-300">
                            Security Check
                          </span>
                          <span className="text-[#d68029] font-bold text-xs">
                            Passed A+
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeStep === 4 && (
                    <div className="w-full bg-[#070e1c] border border-slate-800/60 p-5 rounded-2xl flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400">
                          24/7 Monitoring Dashboard
                        </span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold animate-pulse">
                          LIVE
                        </span>
                      </div>
                      <div className="flex items-end gap-1 h-20 px-2 bg-slate-950 rounded-lg justify-between pt-4">
                        <div className="w-4 bg-emerald-500 h-[60%] rounded-t" />
                        <div className="w-4 bg-emerald-500 h-[70%] rounded-t" />
                        <div className="w-4 bg-emerald-500 h-[80%] rounded-t" />
                        <div className="w-4 bg-[#d68029] h-[95%] rounded-t" />
                        <div className="w-4 bg-emerald-500 h-[65%] rounded-t" />
                        <div className="w-4 bg-emerald-500 h-[75%] rounded-t" />
                        <div className="w-4 bg-emerald-500 h-[85%] rounded-t" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                        <div className="bg-slate-900 p-2 rounded">
                          <span className="block text-slate-500">Uptime</span>
                          <span className="font-bold text-slate-200">
                            99.99%
                          </span>
                        </div>
                        <div className="bg-slate-900 p-2 rounded">
                          <span className="block text-slate-500">Response</span>
                          <span className="font-bold text-slate-200">
                            142ms
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Footer text */}
                <div className="text-[10px] text-slate-400 font-mono flex justify-between relative z-10 border-t border-slate-800 pt-3">
                  <span>INSPIRE Techno Solution</span>
                  <span>v1.0.0</span>
                </div>
              </div>

              {/* Right Side: Detailed Copy Content */}
              <div className="lg:col-span-6 flex flex-col justify-center p-2 lg:p-4">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col h-full justify-between"
                >
                  <div>
                    {/* Stage number bubble */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d68029]/10 text-[#d68029] text-xs font-extrabold uppercase tracking-wider mb-6">
                      Phase {processSteps[activeStep].number}
                    </div>

                    {/* Step Title */}
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b2a] leading-tight mb-5 tracking-tight">
                      {processSteps[activeStep].title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                      {processSteps[activeStep].description}
                    </p>

                    {/* Deliverables checklist */}
                    <div className="space-y-4 mb-8">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0d1b2a]">
                        Key Deliverables
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {stepDeliverables[activeStep].map((item, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                              <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                            </span>
                            <span className="text-sm font-semibold text-slate-700">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions / CTA bar */}
                  <div className="border-t border-slate-100 pt-6 mt-auto flex items-center gap-4 flex-wrap">
                    <Button
                      text="Request Consulting"
                      bgColor="#0d1b2a"
                      hoverColor="#D27E2B"
                      href="#contact-form-section"
                      icon="/navbar/btn_icon.png"
                    />
                    {/* <button className="h-11 px-6 rounded-xl bg-[#0d1b2a] text-white text-sm font-bold shadow-md hover:bg-[#1a2c42] hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                      Request Consulting <FiChevronRight className="w-4 h-4" />
                    </button> */}
                    <span className="text-[13px] font-semibold text-slate-500">
                      Estimated duration:{" "}
                      <strong className="text-slate-800">
                        {stepDurations[activeStep]}
                      </strong>
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Dynamic Full Width Case Studies Showcase */}
          <div className="mt-24 pt-16 max-w-[1400px] w-full mx-auto">
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
              <div className="flex flex-wrap justify-center items-center gap-3 max-w-5xl mx-auto">
                {caseStudies.map((study, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCaseStudy(idx)}
                    className={`min-w-[170px] h-11 cursor-pointer flex items-center justify-center gap-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                      activeCaseStudy === idx
                        ? "bg-[#e06c16] text-white shadow-md shadow-[#e06c16]/20"
                        : "bg-white border border-slate-200 text-[#334155] hover:bg-slate-50"
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
                          className="bg-[#28384d] cursor-pointer rounded-2xl p-5 flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300"
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
                            className="group relative cursor-pointer bg-white/70 backdrop-blur-xl border border-white rounded-[24px] p-5 lg:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(214,128,41,0.08)] hover:-translate-y-1 transition-all duration-400 cursor-default overflow-hidden"
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

      {/* ── SECTION: PREMIUM PORTFOLIO SHOWCASE ── */}
      <Section className="bg-white py-20 lg:py-28 relative overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#d68029]/[0.03] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#0d1b2a]/[0.03] blur-3xl pointer-events-none" />

        <Row>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">

            {/* ── LEFT CONTENT COLUMN ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col max-w-xl"
            >
              {/* Premium Label */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[#d68029] text-[11px] font-extrabold uppercase tracking-[0.2em]">
                  FEATURED PROJECTS
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#d68029]/50 to-transparent max-w-[80px]" />
              </div>

              {/* Main Headline */}
              <h2 className="text-[clamp(28px,4vw,46px)] font-extrabold text-[#0d1b2a] leading-[1.15] tracking-tight mb-6">
                Building Digital Products{" "}
                <span className="text-[#d68029]">That Drive</span>{" "}
                Business Growth
              </h2>

              {/* Supporting Paragraph */}
              <p className="text-[#6b7280] text-base sm:text-[17px] leading-[1.8] mb-10 font-normal">
                Explore a selection of our recent AI platforms, enterprise
                software, mobile applications, SaaS products, and
                high-performance business websites built for startups and global
                enterprises.
              </p>

              {/* 2×2 Feature Highlights Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  {
                    icon: FiCpu,
                    label: "AI Development",
                  },
                  {
                    icon: FiDatabase,
                    label: "Enterprise Software",
                  },
                  {
                    icon: FiSmartphone,
                    label: "Mobile Applications",
                  },
                  {
                    icon: FiCloud,
                    label: "SaaS Platforms",
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
                      className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-100 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_24px_rgba(214,128,41,0.10)] hover:border-[#d68029]/20 transition-all duration-300 group cursor-default"
                    >
                      {/* Icon Circle */}
                      <div className="w-10 h-10 rounded-full bg-[#d68029]/8 border border-[#d68029]/15 flex items-center justify-center shrink-0 group-hover:bg-[#d68029]/15 transition-colors duration-300">
                        <Icon className="w-4.5 h-4.5 text-[#d68029]" strokeWidth={1.8} />
                      </div>
                      <span className="text-[14px] font-semibold text-[#0d1b2a] leading-tight">
                        {item.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.45 }}
              >
                <a
                  href="/our-portfolio"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white text-[15px] tracking-wide shadow-[0_8px_30px_rgba(214,128,41,0.35)] transition-all duration-300"
                  style={{
                    background: "#D68029",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#0D1B2A";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(13,27,42,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#D68029";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(214,128,41,0.35)";
                  }}
                >
                  Explore Portfolio
                  <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>
            </motion.div>

            {/* ── RIGHT LAPTOP SLIDER COLUMN ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="relative w-full flex flex-col items-center"
            >
              {/* Ambient glow behind laptop */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[80%] h-[60%] rounded-full bg-[#d68029]/10 blur-3xl" />
              </div>

              {/* Laptop frame wrapper */}
              <div className="relative w-full max-w-[620px] mx-auto">

                {/* ─── Laptop body ─── */}
                <div className="relative w-full">

                  {/* Screen bezel */}
                  <div className="relative bg-[#1a1a2e] rounded-t-[16px] rounded-b-[4px] shadow-2xl border border-[#2d2d4e] pt-[5%] px-[3.5%] pb-[2%]">

                    {/* Camera notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#333355]" />

                    {/* Screen area */}
                    <div className="relative w-full aspect-[16/10] bg-gray-900 rounded-[8px] overflow-hidden shadow-inner">

                      {/* Slides */}
                      {portfolioWorks.length > 0 ? (
                        portfolioWorks.map((work, idx) => (
                          <div
                            key={work._id}
                            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                            style={{
                              opacity: activeSlide === idx ? 1 : 0,
                              zIndex: activeSlide === idx ? 2 : 1,
                            }}
                          >
                            <img
                              src={work.image}
                              alt={work.title}
                              className="w-full h-full object-cover object-top"
                            />
                            {/* Project title overlay at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
                              <p className="text-white text-sm font-bold leading-tight">{work.title}</p>
                              <p className="text-[#d68029] text-[11px] font-semibold uppercase tracking-wider mt-0.5">Web Development</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        // Skeleton placeholder while loading
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b2a] to-[#1a2c42] flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-12 h-12 border-2 border-[#d68029]/30 border-t-[#d68029] rounded-full animate-spin mx-auto mb-3" />
                            <p className="text-slate-500 text-xs">Loading projects...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Laptop base/hinge */}
                  <div className="relative bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] h-[14px] rounded-b-[4px] shadow-md">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[25%] h-[6px] bg-[#111] rounded-b-[8px]" />
                  </div>

                  {/* Laptop stand */}
                  <div className="relative flex justify-center">
                    <div
                      className="bg-gradient-to-b from-[#1a1a1a] to-[#111] shadow-xl"
                      style={{
                        width: "35%",
                        height: "18px",
                        clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
                      }}
                    />
                  </div>

                  {/* Laptop foot bar */}
                  <div className="flex justify-center">
                    <div className="w-[55%] h-[4px] bg-gradient-to-r from-transparent via-[#333] to-transparent rounded-full" />
                  </div>
                </div>

                {/* Slider dot indicators */}
                {portfolioWorks.length > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    {portfolioWorks.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => {
                          setActiveSlide(dotIdx);
                          if (sliderTimerRef.current) clearInterval(sliderTimerRef.current);
                          sliderTimerRef.current = setInterval(() => {
                            setActiveSlide((prev) => (prev + 1) % portfolioWorks.length);
                          }, 3500);
                        }}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          activeSlide === dotIdx
                            ? "w-6 h-2.5 bg-[#d68029]"
                            : "w-2.5 h-2.5 bg-slate-300 hover:bg-[#d68029]/60"
                        }`}
                        aria-label={`Go to slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Project name caption below */}
                {portfolioWorks.length > 0 && (
                  <div className="text-center mt-4">
                    <motion.p
                      key={activeSlide}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-[#0d1b2a] font-bold text-[15px] tracking-tight"
                    >
                      {portfolioWorks[activeSlide]?.title}
                    </motion.p>
                    <p className="text-[#d68029] text-[12px] font-semibold uppercase tracking-widest mt-0.5">
                      Web Development
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

          </div>
        </Row>

      </Section>

      <TechnologyShowcase />
      <WhyChoosePremium items={whyChooseData} />

      {/* ── SECTION 5: GLOBAL PRESENCE & INDUSTRIES WE SERVE ── */}
      <Section className="bg-[#fafcff] py-12 lg:py-16 relative overflow-hidden border-y border-slate-100">
        {/* Full width container with responsive padding */}
        <Row>
          <div className="w-full relative">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
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

                  {/* Grid of 8 cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {industryCards.map((card, idx) => {
                      const Icon = card.icon;
                      return (
                        <motion.div
                          key={idx}
                          whileHover={{ y: -2 }}
                          className="bg-white border cursor-pointer border-slate-100 rounded-2xl py-3 px-2 flex flex-col items-center text-center shadow-[0_2px_15px_rgba(0,0,0,0.015)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all duration-300 min-h-[120px] justify-center"
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
              </div>

              {/* Vertical Divider (Hidden on mobile) */}
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

                {/* Stats & Map Flex Layout (Fixed Responsive Gap & Wrapping) */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start w-full relative mt-6 flex-1 gap-8 sm:gap-4">
                  {/* Stats list stack */}
                  <div className="flex flex-col gap-6 z-10 w-full sm:w-[160px] shrink-0 pt-2">
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
                        40+
                      </span>
                      <span className="block text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-wide">
                        Happy Clients
                      </span>
                    </div>

                    {/* 750+ and 24/7 Side by Side */}
                    <div className="flex gap-8 sm:gap-10">
                      <div>
                        <span className="block text-4xl font-bold text-[#d68029] tracking-tight">
                          750+
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
                  <div className="relative flex-1 w-full aspect-[1.4/1] sm:aspect-[1.8/1] flex items-center justify-center">
                    {/* World Map Background */}
                    <div
                      className="absolute inset-0 opacity-95 pointer-events-none"
                      style={{
                        backgroundImage: 'url("/home-test/map.png")',
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        backgroundSize: "contain",
                      }}
                    />
                    {/* Adjusted Pins */}
                    <MapPin top="30%" left="18%" /> {/* North America West */}
                    <MapPin top="38%" left="26%" /> {/* North America East */}
                    <MapPin top="68%" left="32%" /> {/* South America */}
                    <MapPin top="34%" left="50%" /> {/* Europe */}
                    <MapPin top="54%" left="53%" /> {/* Africa */}
                    <MapPin top="40%" left="60%" /> {/* Middle East */}
                    <MapPin top="52%" left="69%" /> {/* India */}
                    <MapPin top="70%" left="81%" /> {/* Australia */}
                    {/* Our Global Network Widget Card */}
                    <div className="absolute -bottom-10 sm:-bottom-20 right-0 sm:right-5 bg-[#030b1a] border border-[#d68029]/30 rounded-xl p-3 sm:p-4 shadow-2xl w-[140px] sm:w-[180px] z-20 text-white hidden md:block">
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
      <FAQ
        faqs={homeFAQs}
        title="Frequently Asked Questions (FAQ)"
        sideTitle="Have Queries?"
        sideSubtitle="We are here to Answer you..."
        buttonText="Enquire Now"
        buttonHref="#contact-form-section"
      />
      <EngagementModels />
    </main>
  );
}
