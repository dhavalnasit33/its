"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiCode, FiServer, FiCloud, FiDatabase } from "react-icons/fi";
import { FaBrain, FaInfinity } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import TechBackground from "./TechBackground";
import Row from "../Row";

// Original technologies dataset
const technologies: Record<
  string,
  { image: string; label: string; desc: string }[]
> = {
  Mobile: [
    {
      image: "/technologies/ios.svg",
      label: "iOS",
      desc: "Native Apple Mobile",
    },
    {
      image: "/technologies/swift.svg",
      label: "Swift",
      desc: "Apple Programming Language",
    },
    {
      image: "/technologies/react-native.svg",
      label: "React Native",
      desc: "Cross-Platform Framework",
    },
    {
      image: "/technologies/android.svg",
      label: "Android",
      desc: "Native Google Mobile",
    },
    {
      image: "/technologies/ionic.svg",
      label: "Ionic",
      desc: "Hybrid Web-App Builder",
    },
    {
      image: "/technologies/kotlin.svg",
      label: "Kotlin",
      desc: "Modern Android Language",
    },
  ],
  "Back-End": [
    {
      image: "/technologies/java.svg",
      label: "Java",
      desc: "Robust Enterprise Runtime",
    },
    {
      image: "/technologies/nodejs.svg",
      label: "Node.js",
      desc: "High-Performance Server",
    },
    {
      image: "/technologies/dotnet.svg",
      label: ".NET Core",
      desc: "Enterprise API Platform",
    },
    {
      image: "/technologies/php.svg",
      label: "PHP",
      desc: "Classic Server-Side Scripting",
    },
    {
      image: "/technologies/cpp.svg",
      label: "C++",
      desc: "High-Speed Systems Engine",
    },
    {
      image: "/technologies/laravel.svg",
      label: "Laravel",
      desc: "Sleek PHP Web Framework",
    },
  ],
  "Front-End": [
    {
      image: "/technologies/html.svg",
      label: "HTML 5",
      desc: "Semantic Markup Standard",
    },
    {
      image: "/technologies/javascript.svg",
      label: "JavaScript",
      desc: "Dynamic Interface Language",
    },
    {
      image: "/technologies/angular.svg",
      label: "Angular",
      desc: "Robust Client Platform",
    },
    {
      image: "/technologies/reactjs.svg",
      label: "React.js",
      desc: "Interactive Component Library",
    },
    {
      image: "/technologies/vue.svg",
      label: "Vue.js",
      desc: "Sleek Frontend Framework",
    },
    {
      image: "/technologies/css.svg",
      label: "CSS 3",
      desc: "Styling & Responsive Layout",
    },
  ],
  DevOps: [
    {
      image: "/technologies/aws.svg",
      label: "AWS",
      desc: "Global Cloud Infrastructure",
    },
    {
      image: "/technologies/cloudflare.svg",
      label: "Cloudflare",
      desc: "Edge Firewall & CDN Network",
    },
    {
      image: "/technologies/docker.svg",
      label: "Docker",
      desc: "Containerized Deployments",
    },
    {
      image: "/technologies/kubernetes.svg",
      label: "Kubernetes",
      desc: "Automated Container Clusters",
    },
    {
      image: "/technologies/digitalocean.svg",
      label: "DigitalOcean",
      desc: "Sleek Developer Cloud Hosting",
    },
    {
      image: "/technologies/azure.svg",
      label: "Azure",
      desc: "Microsoft Enterprise Cloud",
    },
  ],
  Database: [
    {
      image: "/technologies/my-sql.svg",
      label: "MySQL",
      desc: "Relational Database Engine",
    },
    {
      image: "/technologies/firebase.svg",
      label: "Firebase",
      desc: "Serverless Real-Time Data",
    },
    {
      image: "/technologies/ms-sql.svg",
      label: "Ms SQL",
      desc: "Microsoft SQL Database",
    },
    {
      image: "/technologies/mongo-db.svg",
      label: "MongoDB",
      desc: "Document-Oriented NoSQL",
    },
    {
      image: "/technologies/postgresql.png",
      label: "PostgreSQL",
      desc: "Advanced Relational Database",
    },
    {
      image: "/technologies/redis.png",
      label: "Redis",
      desc: "High-Speed In-Memory Cache",
    },
  ],
};

const categories = [
  {
    id: "Front-End",
    label: "Frontend",
    desc: "Modern UI libraries\nand frameworks",
    icon: FiCode,
    color: "text-blue-500",
  },
  {
    id: "Back-End",
    label: "Backend",
    desc: "Robust runtime\nand APIs",
    icon: FiServer,
    color: "text-[#D68029]",
  },
  {
    id: "Mobile",
    label: "Mobile",
    desc: "Interactive native\nclient interfaces",
    icon: FaBrain,
    color: "text-purple-500",
  },
  {
    id: "DevOps",
    label: "DevOps",
    desc: "Automation, CI/CD\nand monitoring",
    icon: FaInfinity,
    color: "text-emerald-400",
  },
  {
    id: "Database",
    label: "Data",
    desc: "Databases and\ndata engineering",
    icon: FiDatabase,
    color: "text-blue-300",
  },
];

export default function TechnologyShowcase() {
  const [activeTab, setActiveTab] =
    useState<keyof typeof technologies>("Front-End");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // MATHEMATICALLY PERFECT ELLIPSE COORDINATES
  const getSlotProps = (index: number, total: number) => {
    if (total === 6) {
      return [
        { top: "8%", left: "50%" },
        { top: "28%", left: "78%" },
        { top: "72%", left: "75%" },
        { top: "83%", left: "50%" },
        { top: "72%", left: "19%" },
        { top: "28%", left: "16%" },
      ][index];
    }

    return [
      { top: "27%", left: "73%" }, // Top Right
      { top: "73%", left: "73%" }, // Bottom Right
      { top: "73%", left: "27%" }, // Bottom Left
      { top: "27%", left: "27%" }, // Top Left
    ][index];
  };

  return (
    <section className="w-full relative min-h-screen bg-[#030812] overflow-hidden select-none py-20 flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0">
        <TechBackground />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0)_0%,rgba(3,8,18,1)_80%)] pointer-events-none z-10" />

      <div className="w-full max-w-[1400px] relative z-20 px-4 flex flex-col items-center">
        {/* TOP HEADER */}
        <div className="text-center w-full mb-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-slate-300 uppercase">
              OUR TECHNOLOGY ECOSYSTEM
            </span>
          </div>

          <h2 className="text-center w-full common-h2 text-white">
            <span className="text-[#d68029]">Technologies</span> That We Work
            With
          </h2>

          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mt-4">
            Here you can see some of the most popular technologies including
            frameworks, libraries, and many more to create various applications.
          </p>
        </div>

        {/* ORBITAL SHOWCASE CENTER */}
        {isDesktop ? (
          <div className="relative w-full max-w-[1400px] h-[920px] flex items-center justify-center my-6 transform scale-75 md:scale-90 lg:scale-100">
            <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none z-0" />

            <div className="absolute w-[900px] h-[900px] rounded-full border border-blue-500/10 pointer-events-none" />
            <div className="absolute w-[700px] h-[700px] rounded-full border border-blue-500/15 pointer-events-none" />
            <div className="absolute w-[500px] h-[500px] rounded-full border border-[#D68029]/10 pointer-events-none" />

            {/* AI Core */}
            <motion.div
              className="absolute z-30 flex items-center justify-center"
              animate={{ y: [0, -10, 0], scale: [1, 1.03, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute w-[650px] h-[650px] rounded-full bg-blue-500/20 blur-[180px]" />
              <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-400/20 blur-[120px]" />
              <Image
                src="/home-test/ai-core-logo.png"
                alt="AI Core"
                width={650}
                height={650}
                priority
                className="relative z-20 select-none pointer-events-none drop-shadow-[0_0_60px_rgba(59,130,246,0.65)]"
              />
            </motion.div>

            {/* Dynamic Technology Nodes */}
            <AnimatePresence mode="popLayout">
              {technologies[activeTab].map((tech, idx) => {
                const layout = getSlotProps(
                  idx,
                  technologies[activeTab].length,
                );

                return (
                  <motion.div
                    key={tech.label}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.3 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: idx * 0.04,
                    }}
                    className="absolute z-30 flex items-center justify-center group cursor-pointer"
                    style={{
                      top: layout?.top,
                      left: layout?.left,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* WRAPPER FIX: Label is absolute so it doesn't affect the centering of the Bubble */}
                    {/* WRAPPER FIX: Label is absolute so it doesn't affect the centering of the Bubble */}
                    <div className="relative flex flex-col items-center justify-center">
                      {/* BUBBLE */}
                      <motion.div
                        whileHover={{ scale: 1.08, y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="relative shrink-0 z-10"
                      >
                        <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-3xl scale-125 opacity-70" />
                        <div className="relative w-[82px] h-[82px] rounded-full overflow-hidden border border-blue-400/30 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.16),rgba(255,255,255,.02)_45%,rgba(0,0,0,.3)_100%)] backdrop-blur-2xl shadow-[0_0_40px_rgba(59,130,246,.35)]">
                          <div className="absolute top-4 left-5 w-10 h-3 bg-white/40 blur-md rounded-full rotate-[-20deg]" />
                          <Image
                            src={tech.image}
                            alt={tech.label}
                            fill
                            className="object-contain p-4"
                          />
                        </div>
                      </motion.div>

                      {/* FIXED ROUNDED LABEL CARD - Aa bhag replace karjo */}
                      <div className="absolute -bottom-15 w-[130px] px-2 py-2 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl text-center shadow-lg z-20">
                        <h3 className="text-white font-semibold text-[13px] leading-tight">
                          {tech.label}
                        </h3>
                        <p className="text-[9px] text-slate-400 mt-0.5 leading-tight truncate">
                          {tech.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          /* MOBILE GRID */
          <div className="w-full min-h-[300px] mb-10 mt-6 px-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-2 gap-4 w-full"
              >
                {technologies[activeTab].map((tech) => (
                  <div
                    key={tech.label}
                    className="flex flex-col items-center justify-center p-6 bg-[#050d18]/70 border border-white/5 rounded-2xl shadow-lg relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
                    <div className="w-14 h-14 rounded-full bg-[#030810] border border-blue-500/20 flex items-center justify-center relative mb-3">
                      <Image
                        src={tech.image}
                        alt={tech.label}
                        width={26}
                        height={26}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm font-extrabold text-white tracking-tight">
                      {tech.label}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1 font-semibold text-center">
                      {tech.desc}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* BOTTOM TABS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 w-full mt-4 z-30">
          {categories.map((card) => {
            const Icon = card.icon;
            const isActive = activeTab === card.id;

            return (
              <button
                key={card.id}
                onClick={() =>
                  setActiveTab(card.id as keyof typeof technologies)
                }
                className={`group relative flex flex-col items-start p-4 md:p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-950/40 to-indigo-950/20 border-blue-500/40 shadow-[0_0_22px_rgba(59,130,246,0.15)]"
                    : "bg-[#0a1220]/80 border-slate-700/50 hover:border-slate-500 hover:bg-[#0c182d]/80"
                } backdrop-blur-sm`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabMarker"
                    className="absolute left-4 right-4 bottom-0 h-[2px] bg-blue-500 rounded-full"
                  />
                )}
                <div
                  className={`mb-3 p-2 rounded-full border transition-all duration-300 group-hover:scale-105 ${isActive ? "bg-blue-500/10 border-blue-500/30" : "bg-slate-800/50 border-slate-700"}`}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-blue-400 animate-pulse" : card.color}`}
                  />
                </div>
                <h4 className="text-white font-extrabold text-sm md:text-base mb-1 tracking-tight">
                  {card.label}
                </h4>
                <p className="text-slate-400 text-[10px] md:text-xs leading-snug whitespace-pre-line font-medium">
                  {card.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* FOOTER BADGES */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mt-12 pb-10 z-30 text-slate-300 text-xs md:text-sm font-semibold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <BsShieldCheck className="text-[#D68029] text-base" />
            <span>Enterprise Grade</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-blue-500 hidden md:block"></span>
          <div className="flex items-center gap-2">
            <span>Scalable Solutions</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-blue-500 hidden md:block"></span>
          <div className="flex items-center gap-2">
            <span>Secure Architectures</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-blue-500 hidden md:block"></span>
          <div className="flex items-center gap-2">
            <span>AI-First</span>
          </div>
        </div>
      </div>
    </section>
  );
}
