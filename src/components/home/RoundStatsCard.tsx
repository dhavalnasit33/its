"use client";
import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";


interface RoundStatsCardProps {
  value: string;
  label: string;
}

export default function RoundStatsCard({ value, label } : RoundStatsCardProps) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.replace(/\D/g, ""));
      const duration = 500; // ms
      const stepTime = Math.abs(Math.floor(duration / end));

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) {
          clearInterval(timer);
        }
      }, stepTime);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="   flex items-center  gap-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
       <div className="w-20 h-20 aspect-square rounded-full flex items-center justify-center bg-[linear-gradient(90deg,#472424,rgba(216,230,255,0))]">
          <h3 className="text-2xl font-bold text-white tracking-tight leading-6">
            {count}
            {value.replace(/[0-9]/g, "")}
          </h3>
        </div>
      <p className="text-white opacity-70 font-medium  text-sm w-[115px] ">{label}</p>
    </motion.div>
  );
}
