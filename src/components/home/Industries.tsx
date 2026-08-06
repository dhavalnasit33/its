"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExpertiesIndustries, SingleResponse } from "@/types";
import apiService from "@/lib/apiService";
import Motion from "../motionbar";
import Row from "../Row";



/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function Industries() {
  const [industriesData, setIndustriesData] = useState<ExpertiesIndustries[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [activeIndex, setActiveIndex] = useState(2); // Default active card
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchIndustries = useCallback(async () => {
    setLoadingData(true);
    try {
      const response = await apiService<SingleResponse<ExpertiesIndustries[]>>(
        "/expertise-industries"
      );
      if (response.success && response.data && response.data.length > 0) {
        setIndustriesData(response.data);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    fetchIndustries();
  }, [fetchIndustries]);

  // Use fetched API data directly
  const listToDisplay = industriesData;

  // Total count for cyclical calculation
  const totalItems = listToDisplay.length;

  // Handles smooth centering & cyclical wrap-around for active card selection
  const handleCardSelect = useCallback(
    (index: number) => {
      const cyclicalIndex = (index + totalItems) % totalItems;
      setActiveIndex(cyclicalIndex);
    },
    [totalItems]
  );

  const scrollPrev = () => {
    handleCardSelect(activeIndex - 1);
  };

  const scrollNext = () => {
    handleCardSelect(activeIndex + 1);
  };

  // Generate 9 relative slots centered around activeIndex for infinite cyclical 3D coverflow
  const visibleSlots = Array.from({ length: 9 }, (_, i) => i - 4); // [-4, -3, -2, -1, 0, 1, 2, 3, 4]

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "#060913" }} // Pure Cosmic Space background
    >
      {/* ── Ambient Background Glow Effects ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[550px] rounded-full opacity-20 blur-[150px]"
          style={{
            background: "radial-gradient(circle, #D68029 0%, #f59e0b 40%, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ── Section Header (Preserved) ── */}
      <div className="relative z-10 text-center mb-12 md:mb-16">
        <Row>
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
                color: "#94a3b8",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#D68029" }}
              />
              Industries We Serve
            </span>
          </div>

          {/* Heading */}
          <h2 className="common-h2 text-center w-full mb-3">
            <span className="text-white">Our Smart</span>{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f59e0b 30%, #d97706 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Expertise Industries
            </span>
          </h2>

          <Motion />

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg mt-2 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#64748b" }}
          >
            From early-stage startups to global enterprises — tailored digital
            products across every major vertical.
          </p>
        </Row>
      </div>

      {/* ── Centered Infinite Cyclical 3D Coverflow Carousel ── */}
      <div className="relative z-10 w-full max-w-[98%] lg:max-w-[95%] 2xl:max-w-[1400px] mx-auto overflow-hidden">
        <div
          ref={containerRef}
          className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 overflow-hidden pb-10 pt-6"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "center center",
            minHeight: "560px",
          }}
        >
          {totalItems > 0 &&
            visibleSlots.map((relativeOffset) => {
              const realIndex = (activeIndex + relativeOffset + totalItems * 100) % totalItems;
              const industry = listToDisplay[realIndex];
              const isActive = relativeOffset === 0;
              const isLeftOfActive = relativeOffset < 0;

              // 3D Shutter rotation angle: left cards tilt right (16deg), active card flat (0deg), right cards tilt left (-16deg)
              const rotationY = isActive ? 0 : isLeftOfActive ? 16 : -16;

              const bgImage = industry.bgImage || "/industries/business-1.png";

              return (
                <div
                  key={`${realIndex}-${relativeOffset}`}
                  onClick={() => handleCardSelect(realIndex)}
                  className={`relative flex-shrink-0 rounded-3xl overflow-hidden cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] h-[460px] sm:h-[500px] antialiased ${
                    isActive
                      ? "w-[280px] sm:w-[330px] md:w-[370px] z-30"
                      : "w-[100px] sm:w-[125px] md:w-[145px] opacity-75 hover:opacity-100 z-10"
                  }`}
                  style={{
                    transform: isActive ? "none" : `rotateY(${rotationY}deg) scale(0.97)`,
                    transformStyle: "preserve-3d",
                    border: isActive
                      ? "2px solid #D68029"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: isActive
                      ? "0 0 35px rgba(214, 128, 41, 0.45), 0 20px 40px rgba(0,0,0,0.8)"
                      : "0 10px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  {/* Glass Shutter Reflection & Shading */}
                  <div
                    className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%)"
                        : isLeftOfActive
                        ? "linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(255,255,255,0.05) 100%)"
                        : "linear-gradient(to left, rgba(0,0,0,0.35) 0%, rgba(255,255,255,0.05) 100%)",
                    }}
                  />

                  {/* Background Image Layer */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={bgImage}
                      alt={industry.title}
                      fill
                      sizes="400px"
                      className="object-cover object-center transition-transform duration-700"
                      style={{
                        transform: isActive ? "scale(1.05)" : "scale(1)",
                      }}
                      priority={isActive}
                    />

                    {/* Gradient Overlay for Readability */}
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{
                        background: isActive
                          ? "linear-gradient(to bottom, rgba(6, 9, 19, 0.35) 0%, rgba(6, 9, 19, 0.75) 30%, rgba(6, 9, 19, 0.95) 65%, rgba(6, 9, 19, 0.99) 100%)"
                          : "linear-gradient(to bottom, rgba(6, 9, 19, 0.45) 0%, rgba(6, 9, 19, 0.85) 50%, rgba(6, 9, 19, 0.98) 100%)",
                      }}
                    />
                  </div>

                  {/* ── CARD CONTENT WITH STAGGERED ENTRANCE ANIMATIONS ── */}
                  <AnimatePresence mode="wait">
                    {isActive ? (
                      <motion.div
                        key={`active-${industry._id || realIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="relative z-20 flex flex-col justify-end h-full p-6 sm:p-8 text-left"
                      >
                        {/* Active Icon Badge with Spring Scale & Glow */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5, y: 15 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-2xl"
                          style={{
                            background: "linear-gradient(135deg, rgba(214, 128, 41, 0.4) 0%, rgba(245, 158, 11, 0.25) 100%)",
                            border: "1.5px solid rgba(245, 158, 11, 0.6)",
                            boxShadow: "0 8px 24px -4px rgba(214, 128, 41, 0.5)",
                          }}
                        >
                          <Image
                            src={industry.image}
                            alt={industry.title}
                            width={28}
                            height={28}
                            className="object-contain"
                            style={{ width: "28px", height: "28px" }}
                          />
                        </motion.div>

                        {/* Active Title with Accent Line */}
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.1 }}
                          className="flex flex-col gap-1.5"
                        >
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug antialiased">
                            {industry.title}
                          </h3>
                          {/* Amber Accent Bar */}
                          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#D68029] to-amber-400 my-1" />
                        </motion.div>

                        {/* Active Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.18 }}
                          className="text-sm sm:text-base leading-relaxed text-slate-100 mt-2 line-clamp-5 font-normal antialiased"
                          dangerouslySetInnerHTML={{ __html: industry?.description || "" }}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`collapsed-${industry._id || realIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-20 flex flex-col justify-end items-center h-full p-4 text-center"
                      >
                        {/* Collapsed Icon Badge */}
                        <div
                          className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 shadow-md"
                          style={{
                            background: "rgba(255, 255, 255, 0.08)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            backdropFilter: "blur(6px)",
                          }}
                        >
                          <Image
                            src={industry.image}
                            alt={industry.title}
                            width={20}
                            height={20}
                            className="object-contain"
                            style={{ width: "20px", height: "20px" }}
                          />
                        </div>

                        {/* Collapsed Title */}
                        <h3 className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate w-full drop-shadow-md">
                          {industry.title}
                        </h3>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
        </div>

        {/* ── Navigation Controls (Infinite Cyclical Arrows + Dots) ── */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6">
          <button
            onClick={scrollPrev}
            className="p-2.5 rounded-full border border-white/15 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/40 transition-all cursor-pointer"
            aria-label="Previous Industry"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {listToDisplay.map((_: any, dotIndex: number) => (
              <button
                key={dotIndex}
                onClick={() => handleCardSelect(dotIndex)}
                aria-label={`Go to industry ${dotIndex + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  dotIndex === activeIndex
                    ? "w-7 h-2 bg-[#D68029]"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="p-2.5 rounded-full border border-white/15 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/40 transition-all cursor-pointer"
            aria-label="Next Industry"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}