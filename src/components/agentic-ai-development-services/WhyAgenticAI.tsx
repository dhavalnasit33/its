"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  LuBrain,
  LuLayers,
  LuLightbulb,
  LuListChecks,
  LuUserCheck,
  LuLock,
  LuChevronsUp,
  LuChevronsDown,
} from "react-icons/lu";

import Section from "../Section";
import Row from "../Row";
import SectionBadge from "../new-home-components/SectionBadge";

// ==========================================
// 1. DATA CONFIGURATION
// ==========================================
const FEATURES_LEFT = [
  {
    id: "auto-decision",
    title: "Context-Aware\nDecisions",
    description:
      "Agents analyze complex variables and execute\noptimal actions within defined boundaries.",
    icon: LuBrain,
  },
  {
    id: "tool-integration",
    title: "Secure API\nIntegration",
    description:
      "Seamlessly connects to legacy ERPs, CRMs,\ndatabases, and custom backend protocols.",
    icon: LuLayers,
  },
  {
    id: "continuous-learning",
    title: "Self-Correcting\nExecution",
    description:
      "Agents reflect on failed runs, retry queries,\nand automatically correct semantic errors.",
    icon: LuLightbulb,
  },
];

const FEATURES_RIGHT = [
  {
    id: "multi-step",
    title: "Hierarchical\nWorkflows",
    description:
      "Run long-running, multi-stage tasks across\nmultiple departments with state persistence.",
    icon: LuListChecks,
  },
  {
    id: "human-approval",
    title: "Human-in-the-Loop\nGates",
    description:
      "Integrate approval checkpoints for high-value\ntransactions and sensitive enterprise actions.",
    icon: LuUserCheck,
  },
  {
    id: "enterprise-security",
    title: "Enterprise\nGovernance",
    description:
      "Ensure absolute data privacy, full auditability,\nrole-based permissions, and VPC hosting.",
    icon: LuLock,
  },
];

// ==========================================
// 2. ANIMATED SVG CONNECTOR COMPONENT
// ==========================================
const ConnectorSVG = ({
  isLeft,
  index,
}: {
  isLeft: boolean;
  index: number;
}) => {
  const strokeColor = isLeft ? "#93C5FD" : "#FDBA74";
  const nodeColor = isLeft ? "#3B82F6" : "#F97316";

  let pathD = "";
  let node1 = { x: 0, y: 0 };
  let node2 = { x: 0, y: 0 };

  if (isLeft) {
    if (index === 0) {
      pathD = "M 0 15 L 30 15 L 100 85";
      node1 = { x: 30, y: 15 };
      node2 = { x: 100, y: 85 };
    } else if (index === 1) {
      pathD = "M 0 50 L 100 50";
      node1 = { x: 50, y: 50 };
      node2 = { x: 100, y: 50 };
    } else {
      pathD = "M 0 85 L 30 85 L 100 15";
      node1 = { x: 30, y: 85 };
      node2 = { x: 100, y: 15 };
    }
  } else {
    if (index === 0) {
      pathD = "M 100 15 L 70 15 L 0 85";
      node1 = { x: 70, y: 15 };
      node2 = { x: 0, y: 85 };
    } else if (index === 1) {
      pathD = "M 100 50 L 0 50";
      node1 = { x: 50, y: 50 };
      node2 = { x: 0, y: 50 };
    } else {
      pathD = "M 100 85 L 70 85 L 0 15";
      node1 = { x: 70, y: 85 };
      node2 = { x: 0, y: 15 };
    }
  }

  return (
    <div
      className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-[4rem] xl:w-[6rem] h-[120px] pointer-events-none z-0 ${
        isLeft
          ? "right-[-4rem] xl:right-[-6rem]"
          : "left-[-4rem] xl:left-[-6rem]"
      }`}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.path
          d={pathD}
          stroke={strokeColor}
          strokeWidth="1.5"
          fill="none"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: {
                duration: 1.2,
                ease: "easeInOut",
                delay: 0.3 + index * 0.2,
              },
            },
          }}
        />
        {(index === 0 || index === 2) && (
          <motion.circle
            cx={node1.x}
            cy={node1.y}
            r="3"
            fill="#fff"
            stroke={nodeColor}
            strokeWidth="1.5"
            variants={{
              hidden: { scale: 0, opacity: 0 },
              visible: {
                scale: 1,
                opacity: 1,
                transition: { delay: 0.8 + index * 0.2 },
              },
            }}
          />
        )}
        <motion.circle
          cx={node2.x}
          cy={node2.y}
          r="4"
          fill={nodeColor}
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: {
              scale: 1,
              opacity: 1,
              transition: { delay: 1 + index * 0.2 },
            },
          }}
        />
      </motion.svg>
    </div>
  );
};

// ==========================================
// 3. 3D INTERACTIVE CARD COMPONENT
// ==========================================
function InteractiveCard({
  feature,
  index,
  direction,
}: {
  feature: any;
  index: number;
  direction: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = feature.icon;
  const isLeft = direction === "left";

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const accentColor = isLeft ? "text-[#3B82F6]" : "text-[#F97316]";
  const dashColor = isLeft ? "bg-[#3B82F6]" : "bg-[#F97316]";

  let marginClass = "";
  if (index === 0) marginClass = "lg:-mt-16";
  if (index === 2) marginClass = "lg:mt-16";

  const floatAnimation = {
    y: [0, -4, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: index * 0.5,
    },
  };

  // FIX: Properly isolate padding so lg:p-7 doesn't override the side padding
  const paddingClass = isLeft
    ? "py-6 pl-6 pr-[4.5rem] lg:py-7 lg:pl-7 lg:pr-[5.5rem]"
    : "py-6 pr-6 pl-[4.5rem] lg:py-7 lg:pr-7 lg:pl-[5.5rem]";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      // animate={floatAnimation}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.15,
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative flex items-center w-full max-w-[350px] z-10 cursor-pointer group ${marginClass} ${
        isLeft ? "ml-auto" : "mr-auto"
      }`}
    >
      <ConnectorSVG isLeft={isLeft} index={index} />

      {/* Main Card Body */}
      <div
        className={`relative w-full bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all duration-300 group-hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] z-10 text-left ${paddingClass}`}
      >
        <h3 className="text-[15px] font-bold leading-snug whitespace-pre-line mb-2 text-slate-800 transition-colors duration-300 group-hover:text-slate-900">
          {feature.title}
        </h3>
        <p className="text-[12px] font-medium leading-relaxed text-slate-500 whitespace-pre-line mb-4">
          {feature.description}
        </p>
        <div
          className={`h-[3px] w-6 rounded-full ${dashColor} transition-all duration-300 group-hover:w-10`}
        />
      </div>

      {/* Overlapping Icon Base */}
      <div
        style={{ transform: "translateZ(15px)" }}
        className={`absolute top-1/2 -translate-y-1/2 ${
          isLeft ? "-right-6" : "-left-6"
        } w-16 h-16 bg-white rounded-2xl shadow-[0_8px_20px_rgb(0,0,0,0.06)] border border-slate-50 flex items-center justify-center z-20 transition-transform duration-300 group-hover:scale-105`}
      >
        <div
          className={`w-11 h-11 rounded-full shadow-[inset_0_3px_8px_rgb(0,0,0,0.06)] bg-slate-50/50 flex items-center justify-center`}
        >
          <Icon className={`w-5 h-5 ${accentColor}`} />
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// 4. BACKGROUND
// ==========================================
const StaticBackground = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-visible hidden lg:flex">
      <div className="absolute top-[8%] flex flex-col items-center text-slate-300/50">
        <LuChevronsUp size={24} />
      </div>
      <div className="absolute bottom-[8%] flex flex-col items-center text-slate-300/50">
        <LuChevronsDown size={24} />
      </div>

      <div className="absolute w-[440px] h-[440px] xl:w-[580px] xl:h-[580px] rounded-full border border-slate-200/30" />
      <div className="absolute w-[340px] h-[340px] xl:w-[460px] xl:h-[460px] rounded-full border border-slate-200/20" />
    </div>
  );
};

// ==========================================
// 5. MAIN COMPONENT
// ==========================================
export default function WhyAgenticAI() {
  return (
    <Section className="relative w-full overflow-hidden bg-[#F8FAFC] py-24 lg:py-32 font-sans perspective-1000">
      <Row>
        <div className="text-center mb-16 max-w-3xl mx-auto relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <SectionBadge title="Intelligent Business Automation" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-slate-900"
          >
            Engineered for{" "}
            <span className="text-[#D27E2B]">Enterprise-Grade Automation</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg text-slate-600 leading-8 max-w-3xl mx-auto"
          >
            Scale your operational capacity with autonomous systems designed for predictability, security, and seamless tool integration.
          </motion.p>
        </div>
        <div className="relative w-full max-w-[1280px] mx-auto min-h-[600px] flex items-center justify-center mt-5">
          <StaticBackground />

          <div
            className="grid
              grid-cols-1
              lg:grid-cols-[350px_480px_350px]
              gap-0
              items-center
              justify-center
              w-full"
          >
            <div className="flex flex-col gap-10">
              {FEATURES_LEFT.map((feature, i) => (
                <InteractiveCard
                  key={feature.id}
                  feature={feature}
                  index={i}
                  direction="left"
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring", bounce: 0.3 }}
              className="
                relative
                w-[320px]
                h-[320px]
                lg:w-[480px]
                lg:h-[480px]
                mx-auto
                flex
                items-center
                justify-center
                shrink-0
                z-20
                group"
            >
              <motion.img
                animate={{ y: [-6, 6, -6] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                src="ai-strategy/agentic-ai-development-services/ai-core-3d.png"
                alt="AI Hexagonal Core"
                className="w-[115%] h-[115%] object-contain drop-shadow-2xl"
              />
            </motion.div>

            <div className="flex flex-col gap-10">
              {FEATURES_RIGHT.map((feature, i) => (
                <InteractiveCard
                  key={feature.id}
                  feature={feature}
                  index={i}
                  direction="right"
                />
              ))}
            </div>
          </div>
        </div>
      </Row>
    </Section>
  );
}
