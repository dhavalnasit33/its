"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  FiChevronRight,
  FiHeart,
  FiCreditCard,
  FiShoppingCart,
  FiBookOpen,
  FiHome,
  FiTruck,
  FiCompass,
  FiCpu,
  FiShield,
  FiBriefcase,
  FiMonitor,
  FiGlobe,
} from "react-icons/fi";
import Section from "@/components/Section";
import Row from "@/components/Row";
import SectionBadge from "./SectionBadge";

const MapPin = ({
  top,
  left,
  label,
}: {
  top: string;
  left: string;
  label?: string;
}) => (
  <div
    className="absolute -translate-x-1/2 -translate-y-full group cursor-pointer"
    style={{ top, left }}
  >
    {/* Ping Animation */}
    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-orange-400 animate-ping opacity-30"></span>

    {/* Marker */}
    <FaMapMarkerAlt className="text-[#d68029] drop-shadow-lg relative z-10 w-3.5 h-3.5 sm:w-[22px] sm:h-[22px]" />

    {/* White Center Dot */}
    <span className="absolute top-[4px] sm:top-[7px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white z-20"></span>

    {/* Tooltip on hover */}
    {label && (
      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap rounded-md bg-[#030b1a] px-2 py-1 text-[10px] font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
        {label}
      </span>
    )}
  </div>
);

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

export default function GlobalPresenceAndIndustriesSection() {
  return (
    <Section className="bg-[#fafcff] py-20 lg:py-28 relative overflow-hidden border-y border-slate-100">
      {/* Full width container with responsive padding */}
      <Row>
        <div className="w-full relative">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
            {/* Left Column: Industries We Serve */}
            <div className="flex-1 flex flex-col justify-between w-full lg:w-[44%]">
              <div>
                <SectionBadge title="INDUSTRIES WE SERVE" />

                <h2 className="text-3xl md:text-[32px] font-bold text-[#0d1b2a] leading-[1.25] mb-6">
                  AI solutions tailored for <br className="hidden sm:block" />
                  every industry
                </h2>

                {/* Grid of 12 cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {industryCards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -2 }}
                        className="bg-white border cursor-pointer border-[#d68029]/10 hover:border-[#d68029]/50 rounded-2xl py-3 px-2 flex flex-col items-center text-center shadow-[0_2px_15px_rgba(0,0,0,0.015)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]   transition-all duration-300 min-h-[120px] justify-center"
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
            <div className="flex-1 flex flex-col justify-start w-full lg:w-[54%] pb-10 sm:pb-16 lg:pb-4">
              <div className="mb-4">
                <SectionBadge title="GLOBAL PRESENCE" />

                <h2 className="text-3xl md:text-[32px] font-bold text-[#0d1b2a] leading-[1.25]">
                  Serving Clients <br className="hidden sm:block" />
                  Worldwide
                </h2>
              </div>

              {/* Stats & Map Flex Layout (Fixed Responsive Gap & Wrapping) */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start w-full relative mt-6 flex-1 gap-8 sm:gap-3">
                {/* Stats list stack */}
                <div className="flex flex-col gap-6 z-10 w-full sm:w-[130px] shrink-0 pt-2">
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

                {/* Map taking remaining space */}
                <div className="relative flex-1 w-full min-w-0 aspect-[1.5/1] sm:aspect-[1.7/1] lg:aspect-[1.55/1] flex items-center justify-center">
                  {/* World Map Background */}
                  <div
                    className="absolute inset-0 opacity-95 pointer-events-none scale-[1.15] sm:scale-125 lg:scale-[1.35]"
                    style={{
                      backgroundImage: 'url("/home-test/map.png")',
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                      backgroundSize: "contain",
                    }}
                  />
                     {/* Adjusted Pins */}
                  <MapPin top="17%" left="8%" /> {/* North America West */}
                  <MapPin top="28%" left="12%" /> {/* North America East */}
                  <MapPin top="66%" left="23%" /> {/* South America */}
                  <MapPin top="30%" left="48%" /> {/* Europe */}
                  <MapPin top="50%" left="52%" /> {/* Africa */}
                  <MapPin top="16%" left="82%" /> {/* Russia */}
                  <MapPin top="44%" left="78%" /> {/* India */}
                  <MapPin top="73%" left="98%" /> {/* Australia */}
                  {/* Our Global Network Widget Card */}
                  <div className="absolute -bottom-8 sm:-bottom-14 lg:-bottom-16 right-0 sm:right-2 bg-[#030b1a] border border-[#d68029]/30 rounded-xl p-3 sm:p-4 shadow-2xl w-[130px] sm:w-[160px] lg:w-[180px] z-20 text-white hidden sm:block">
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
                          <FiChevronRight className="text-slate-550 group-hover:text-[#d68029] transition-colors" />
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
  );
}