"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionBadgeProps {
  title: string;
}

export default function SectionBadge({ title }: SectionBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-block mb-4"
    >
      <span className="px-5 py-2 rounded-full bg-[#d68029]/15 border border-[#d68029]/40 text-[#d68029] text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-2">
        {/* Animated Pinging Dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d68029] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d68029]"></span>
        </span>

        {/* Dynamic Text */}
        {title}
      </span>
    </motion.div>
  );
}
