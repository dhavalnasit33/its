// "use client";
// import React, { useEffect, useState } from "react";
// import { motion, useInView } from "framer-motion";
// import Image from "next/image";


// interface RoundStatsCardProps {
//   value: string;
//   label: string;
// }


// export default function RoundStatsCard({ value, label } : RoundStatsCardProps) {
//   const [count, setCount] = useState(0);
//   const ref = React.useRef(null);
//   const isInView = useInView(ref, { once: true });

//   useEffect(() => {
//     if (isInView) {
//       let start = 0;
//       const end = parseInt(value.replace(/\D/g, ""));
//       const duration = 500; // ms
//       const stepTime = Math.abs(Math.floor(duration / end));

//       const timer = setInterval(() => {
//         start += 1;
//         setCount(start);
//         if (start >= end) {
//           clearInterval(timer);
//         }
//       }, stepTime);
//     }
//   }, [isInView, value]);

//   return (
//     <motion.div
//       ref={ref}
//       className="flex flex-col items-center  gap-1 px-3"
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5 }}
//     >
//        {/* <div className="w-20 h-20 aspect-square rounded-full flex items-center justify-center bg-[linear-gradient(90deg,#472424,rgba(216,230,255,0))]"> */}
//           <h4 className="text-[40px] md:text-[56px] font-extrabold text-[#0d1b2a]  ">
//             {count}
//             {value.replace(/[0-9]/g, "")}
//           </h4>
//         {/* </div> */}
//       <p className="text-gray-600 font-bold opacity-70 text-sm sm:text-md text-center break-all ">{label}</p>
//     </motion.div>
//   );
// }


"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import apiService from "@/lib/apiService";
import { HomePageData } from "@/types";

/* ======================================================
   ROUND STATS CARD
====================================================== */

function RoundStatsCard({ value, label }: { value: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const end = Number(value.replace(/[^\d]/g, "")) || 0;
    if (!end) return;

    let start = 0;
    const step = Math.max(1, Math.ceil(end / 60));

    const timer = setInterval(() => {
      start += step;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-2 px-3 py-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h4 className="text-[40px] md:text-[56px] font-extrabold text-[#0d1b2a]">
        {count}
        {value.replace(/[0-9]/g, "")}
      </h4>

      <p className="text-gray-600 font-bold opacity-70 text-sm sm:text-base text-center">
        {label}
      </p>
    </motion.div>
  );
}

/* ======================================================
   STATS GRID (HOME PAGE AUTO FETCH)
====================================================== */

interface StatsGridProps {
  columns?: 2 | 3 | 4;
  bordered?: boolean;
}

export default function StatsGrid({
  columns = 4,
  bordered = true,
}: StatsGridProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomePageStats = async () => {
      try {
        const res = await apiService<{ data: HomePageData }>("/homepage");

        const stats =
          res?.data?.reasonsToChoose?.deatailBox || [];

        setData(stats);
      } catch (err) {
        console.error("StatsGrid API error:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHomePageStats();
  }, []);

  if (loading || !data.length) return null;

  const gridCols =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 3
      ? "md:grid-cols-3"
      : "md:grid-cols-4";

  return (
    <div className={`grid grid-cols-2 ${gridCols} justify-center max-md:gap-y-6`}>
      {data.map((item, idx) => (
        <div
          key={idx}
          className={`
            relative overflow-hidden
            ${bordered ? "border-r border-gray-300" : ""}
            ${(idx + 1) % columns === 0 ? "border-r-0" : ""}
          `}
        >
          <RoundStatsCard value={item.total} label={item.title} />
        </div>
      ))}
    </div>
  );
}