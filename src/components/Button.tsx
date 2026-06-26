"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  href: string;
    onClick?: () => void;

  bgColor?: string;
  hoverColor?: string;
  textColor?: string;

  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  iconPosition?: "left" | "right";

  className?: string;
  textClassName?: string;

  target?: string;
  children?: ReactNode;

  motionProps?: MotionProps;
}

export default function Button({
  text,
  href,
  onClick,
  bgColor = "#0d1b2a",
  hoverColor = "#D68029",
  textColor = "#ffffff",

  icon,
  iconWidth = 20,
  iconHeight = 20,
  iconPosition = "right",

  className = "",
  textClassName = "",

  target,
  children,

  motionProps,
}: ButtonProps) {
  return (
    <motion.div
      {...motionProps}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-lg group cursor-pointer ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <span
        className="absolute w-0 h-0 rounded transition-all duration-750 delay-300 ease-in-out group-hover:w-90 group-hover:h-80"
        style={{
          backgroundColor: hoverColor,
        }}
      />

      <Link
        href={href}
        onClick={onClick}
        target={target}
        className={`relative tracking-tight  text-sm sm:text-base z-10 px-6 py-3 sm:px-8 sm:py-3 font-semibold ${textClassName}`}
      >
        {children ? (
          children
        ) : (
          <span className="flex flex-row gap-3 items-center justify-center">
            {icon && iconPosition === "left" && (
              <Image
                src={icon}
                alt={text}
                width={iconWidth}
                height={iconHeight} 
                className="h-5 w-5"
              />
            )}

            {text}

            {icon && iconPosition === "right" && (
              <Image
                src={icon}
                alt={text}
                width={iconWidth}
                height={iconHeight} 
                className="h-5 w-5"
              />
            )}
          </span>
        )}
      </Link>
    </motion.div>
  );
}