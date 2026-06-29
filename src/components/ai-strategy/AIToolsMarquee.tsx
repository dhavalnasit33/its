"use client";

import React, { useState } from "react";
import Image from "next/image"; 
import { AI_TOOLS } from "@/data/constants";
import Row from "@/components/Row";
import Section from "../Section";

const DUPLICATED = [...AI_TOOLS, ...AI_TOOLS, ...AI_TOOLS];

function AIToolItem({ logo, name }: { logo: string; name: string }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="flex items-center justify-center px-6 py-3 rounded-xl  shrink-0 hover:border-[#D68029]/40 transition-colors duration-200 min-w-30 h-14"
    >
      {!logo || hasError ? (
        <span className="text-[#0d1b2a] text-sm font-bold whitespace-nowrap">
          {name}
        </span>
      ) : (
        <Image
          src={logo}
          alt={name}
          width={40}
          height={40}
          className="h-10 w-auto object-contain"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}

export default function AIToolsMarquee() {
  return (
    <Section className=" bg-white  overflow-hidden select-none">
      <Row >
        <p className="text-center text-gray-600 opacity-70 text-sm font-bold uppercase tracking-widest mb-10">
          Trusted by innovative companies worldwide
        </p>
      </Row>

      {/* Marquee track */}
      <div className="relative w-full overflow-hidden group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-10 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {DUPLICATED.map((tool, idx) => (
            <AIToolItem key={idx} logo={tool.logo} name={tool.name} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </Section>
  );
}
