"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  LuReceipt,
  LuBrain,
  LuDatabase,
  LuShieldCheck,
  LuUserCheck,
  LuCalculator,
  LuBell,
  LuActivity,
} from "react-icons/lu";
import Section from "../Section";
import SectionBadge from "../new-home-components/SectionBadge";

// ==========================================
// 1. DATA & SPATIAL CONFIGURATION
// ==========================================

const NODES = [
  {
    id: "input",
    label: "Ingestion",
    icon: LuReceipt,
    color: "#3B82F6",
    x: 15,
    y: 50,
    delay: 0,
  },
  {
    id: "read",
    label: "OCR & Vision",
    icon: LuBrain,
    color: "#6366F1",
    x: 30,
    y: 20,
    delay: 0.1,
  },
  {
    id: "extract",
    label: "Data Parsing",
    icon: LuDatabase,
    color: "#8B5CF6",
    x: 30,
    y: 80,
    delay: 0.2,
  },
  {
    id: "validate",
    label: "ERP Sync",
    icon: LuShieldCheck,
    color: "#10B981",
    x: 70,
    y: 20,
    delay: 0.4,
  },
  {
    id: "approve",
    label: "Human in Loop",
    icon: LuUserCheck,
    color: "#F59E0B",
    x: 70,
    y: 80,
    delay: 0.5,
  },
  {
    id: "pay",
    label: "Ledger Update",
    icon: LuCalculator,
    color: "#EC4899",
    x: 85,
    y: 35,
    delay: 0.6,
  },
  {
    id: "notify",
    label: "Alert Dispatched",
    icon: LuBell,
    color: "#06B6D4",
    x: 85,
    y: 65,
    delay: 0.7,
  },
];

const CONNECTIONS = [
  { from: "input", to: "core" },
  { from: "read", to: "core" },
  { from: "extract", to: "core" },
  { from: "core", to: "validate" },
  { from: "core", to: "approve" },
  { from: "validate", to: "pay" },
  { from: "approve", to: "notify" },
];

// ==========================================
// 2. 3D CAMERA WRAPPER (ISOLATES HOOKS)
// ==========================================

function MouseCamera({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 150, mass: 0.8 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 150, mass: 0.8 });

  const rotateX = useTransform(smoothY, [-1, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [-1, 1], [-4, 4]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center absolute inset-0"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "2000px",
      }}
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// 3. 3D HOLOGRAM PATHWAYS WITH TRAVELING ORBS
// ==========================================

const AnimatedPaths = ({ activeNode }: { activeNode: string | null }) => {
  // Calculates full branch paths to ensure proper stage flow logic
  const getActivePaths = () => {
    if (!activeNode) return CONNECTIONS.map((c) => `${c.from}-${c.to}`);

    if (["input", "read", "extract"].includes(activeNode)) {
      return [`${activeNode}-core`];
    }
    if (activeNode === "core") {
      return CONNECTIONS.map((c) => `${c.from}-${c.to}`);
    }
    if (["validate", "pay"].includes(activeNode)) {
      return ["core-validate", "validate-pay"];
    }
    if (["approve", "notify"].includes(activeNode)) {
      return ["core-approve", "approve-notify"];
    }
    return [];
  };

  const activePaths = getActivePaths();

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full drop-shadow-lg"
      style={{ zIndex: 0 }}
    >
      <defs>
        <filter id="orb-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {CONNECTIONS.map((conn, i) => {
        const getCoords = (id: string) => {
          if (id === "core") return { x: 50, y: 50 };
          const node = NODES.find((n) => n.id === id);
          return node ? { x: node.x, y: node.y } : { x: 50, y: 50 };
        };

        const start = getCoords(conn.from);
        const end = getCoords(conn.to);

        // Converted from bezier curves to straight lines (L) to match the provided visual layout
        const d = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;

        const isPathActive =
          activeNode === null ||
          activePaths.includes(`${conn.from}-${conn.to}`);

        return (
          <g
            key={`path-group-${i}`}
            style={{
              opacity: isPathActive ? 1 : 0.15,
              transition: "opacity 0.4s ease-in-out",
            }}
          >
            {/* 3D Track Base (Dark Mode adjusted stroke) */}
            <path
              d={d}
              fill="none"
              stroke="#334155"
              strokeWidth="0.4"
              className="opacity-60"
              strokeDasharray="1 1"
            />

            {/* Traveling Data Orb */}
            <circle
              r="1.2"
              fill={NODES.find((n) => n.id === conn.from)?.color || "#3B82F6"}
              filter="url(#orb-glow)"
            >
              <animateMotion
                path={d}
                dur="3s"
                repeatCount="indefinite"
                begin={`${i * 0.3}s`}
              />
            </circle>
          </g>
        );
      })}
    </svg>
  );
};

// ==========================================
// 4. UI COMPONENTS
// ==========================================

const NodeCard = ({ node, isActive, isHovered, onHover }: any) => {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        width: "180px",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: node.delay, type: "spring" }}
        whileHover={{ scale: 1.05, translateZ: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className={`relative flex items-center gap-4 p-3 pr-5 rounded-2xl transition-all duration-500 backdrop-blur-xl border ${
            isHovered
              ? "bg-slate-800 shadow-[0_20px_40px_rgba(0,0,0,0.5)] border-slate-600"
              : isActive
                ? "bg-slate-800/90 shadow-[0_10px_20px_rgba(0,0,0,0.3)] border-slate-700/80"
                : "bg-slate-800/40 opacity-40 shadow-none border-transparent scale-95"
          }`}
        >
          <div
            className="absolute inset-0 rounded-2xl blur-xl opacity-20 transition-opacity duration-300"
            style={{
              backgroundColor: node.color,
              opacity: isHovered ? 0.4 : 0,
            }}
          />

          <div
            className="relative w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md z-10"
            style={{
              background: `linear-gradient(135deg, ${node.color}, ${node.color}dd)`,
            }}
          >
            <node.icon className="w-5 h-5" />
          </div>

          <div className="relative z-10">
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">
              Stage {NODES.indexOf(node) + 1}
            </p>
            <h4 className="text-sm font-semibold text-slate-200 whitespace-nowrap">
              {node.label}
            </h4>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const AICoreEngine = ({ isHoveringNode }: { isHoveringNode: boolean }) => {
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="relative flex items-center justify-center w-72 h-72"
        animate={{
          scale: isHoveringNode ? 1.06 : 1,
          translateZ: isHoveringNode ? 40 : 20,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 18,
        }}
      >
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full border border-dashed border-blue-500/30"
        />

        {/* Middle Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-6 rounded-full border border-blue-400/30"
        />

        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-14 rounded-full border border-orange-400/30"
        />

        {/* Ambient Glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-52 h-52 rounded-full bg-gradient-to-r from-blue-500/20 via-indigo-400/20 to-orange-400/20 blur-3xl"
        />

        {/* Glass Platform (Dark Mode) */}
        <motion.div
          whileHover={{
            scale: 1.05,
          }}
          className="relative w-40 h-40 rounded-[34px] bg-slate-800/90 backdrop-blur-xl border border-slate-700 flex items-center justify-center overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
        >
          {/* Moving Shine */}
          <motion.div
            animate={{
              y: ["-100%", "120%"],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 h-[220%] bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"
          />

          {/* Soft Glow */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="absolute w-28 h-28 rounded-full bg-blue-500/20 blur-2xl"
          />

          {/* Core */}
          <div className="relative z-10 w-24 h-24 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center shadow-inner border border-slate-800">
            <motion.div
              animate={{
                scale: [1, 1.12, 1],
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              <LuActivity className="w-11 h-11 text-blue-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Pulse Dots */}
        {[0, 90, 180, 270].map((angle) => (
          <motion.div
            key={angle}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: angle / 180,
            }}
            className="absolute w-3.5 h-3.5 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
            style={{
              left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 130}px)`,
              top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 130}px)`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Label */}
        <motion.div
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="absolute -bottom-14 bg-slate-950 text-slate-200 text-xs font-bold tracking-[0.25em] uppercase px-5 py-2 rounded-full shadow-2xl border border-slate-800"
        >
          AI Engine
        </motion.div>
      </motion.div>
    </div>
  );
};

// ==========================================
// 5. MAIN LAYOUT
// ==========================================

export default function NeuralCanvasFlow() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Derives node activation to ensure that full logic branches stay lit
  const isNodeActive = (nodeId: string) => {
    if (activeNode === null) return true;
    if (activeNode === nodeId || nodeId === "core") return true;

    // Left input nodes highlight isolation
    if (["input", "read", "extract"].includes(activeNode)) {
      return false;
    }

    // Right output validate flow
    if (["validate", "pay"].includes(activeNode)) {
      return ["validate", "pay"].includes(nodeId);
    }

    // Right output approve flow
    if (["approve", "notify"].includes(activeNode)) {
      return ["approve", "notify"].includes(nodeId);
    }

    return false;
  };

  return (
    <Section className="relative w-full overflow-hidden bg-[#0B1120]">
      {/* Dark Theme Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(#334155 1.5px, transparent 1.5px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="text-center mb-16 max-w-3xl mx-auto relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-4"
        >
          <SectionBadge title="System Topology" />
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="common-h2 text-slate-100"
        >
          A Live autonomous{" "}
          <span className="text-[#D27E2B]"> decision routing.</span>
        </motion.h2>
      </div>

      <div
        className="relative w-full h-[600px] max-w-6xl mx-auto mt-12"
        style={{ transformStyle: "preserve-3d" }}
      >
        <MouseCamera>
          <div
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            <AnimatedPaths activeNode={activeNode} />
            <AICoreEngine isHoveringNode={activeNode !== null} />

            {NODES.map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                isActive={isNodeActive(node.id)}
                isHovered={activeNode === node.id}
                onHover={setActiveNode}
              />
            ))}
          </div>
        </MouseCamera>
      </div>
    </Section>
  );
}
