"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AI_TOOLS } from "@/data/constants"; // Pulling the same logos for both pages
import Row from "@/components/Row";
import Section from "@/components/Section";

// Triple the array for a seamless infinite loop
const DUPLICATED = [...AI_TOOLS, ...AI_TOOLS, ...AI_TOOLS];

function LogoItem({ logo, name }: { logo: string; name: string }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex items-center justify-center px-6 py-3 shrink-0 min-w-30 h-14 transition-transform duration-300 hover:scale-105">
      {!logo || hasError ? (
        <span className="text-[#0d1b2a] text-lg font-bold whitespace-nowrap">
          {name}
        </span>
      ) : (
        <Image
          src={logo}
          alt={name}
          width={150} // Wider width to accommodate full text logos like "Mistral AI"
          height={40}
          className="h-8 md:h-10 w-auto object-contain"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}

export default function GlobalLogoMarquee() {
  return (
    <Section className="bg-white overflow-hidden select-none py-10 border-y border-gray-100">
      <Row>
        <p className="text-center text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-10">
          Trusted by innovative companies worldwide
        </p>
      </Row>

      {/* Marquee track */}
      <div className="relative w-full overflow-hidden group">
        {/* Fade edges for smooth entry/exit */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-12 md:gap-16 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {DUPLICATED.map((tool, idx) => (
            <LogoItem key={idx} logo={tool.logo} name={tool.name} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </Section>
  );
}
