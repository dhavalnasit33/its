"use client";

import React from "react";

interface CurveDividerProps {
  type: "top" | "bottom";
  fillColor?: string;
  heightClass?: string;
  className?: string;
}

export default function CurveDivider({
  type,
  fillColor = "#ffffff",
  heightClass = "h-[60px] md:h-[120px]",
  className = "",
}: CurveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none z-10 ${className} ${heightClass}`}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        {type === "top" ? (
          <path
            d="M0,120 L0,60 C360,140 360,-20 720,60 C1080,140 1080,-20 1440,60 L1440,120 Z"
            fill={fillColor}
          />
        ) : (
          <path
            d="M0,0 L0,60 C360,-20 360,140 720,60 C1080,-20 1080,140 1440,60 L1440,0 Z"
            fill={fillColor}
          />
        )}
      </svg>
    </div>
  );
}
