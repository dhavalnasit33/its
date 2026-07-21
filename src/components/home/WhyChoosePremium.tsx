"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { WhyChooseItem } from "@/types";
import Section from "../Section";
import Row from "../Row";
import Button from "../Button";
import SectionBadge from "../new-home-components/SectionBadge";

interface WhyChoosePremiumProps {
  items: WhyChooseItem[];
}

export default function WhyChoosePremium({ items }: WhyChoosePremiumProps) {
  return (
    <Section className="relative py-20 lg:py-24 bg-white overflow-hidden border-t border-slate-100">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute top-[-50px] right-[-150px] w-[500px] h-[500px] rounded-full bg-[#d68029]/5 blur-[130px]" />

      <Row>
        <div className="relative z-10 w-full flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
          
          {/* ── LEFT COLUMN: Text & Action Button ── */}
          <div className="w-full lg:w-[32%] flex flex-col justify-center items-start pt-2">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d68029]/5 border border-[#d68029]/20 text-[#d68029] text-xs font-bold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d68029] animate-pulse" />
              WHY CHOOSE INSPIRE
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0d1b2a] leading-[1.2] mt-1 mb-5 tracking-tight">
              Your Success is Our Commitment
            </h2>
            <p className="text-slate-500 fonts_16 leading-relaxed mb-8 max-w-sm">
              We combine creativity, technology and strategy to deliver
              exceptional digital solutions.
            </p>
            <Button
              text="Know More About Us"
              bgColor="#d68029"
              hoverColor="#0d1b2a"
              className="max-w-[250px]"
              icon="/navbar/btn_icon.png"
              href="/about-us"
            />
          </div>

          {/* ── RIGHT COLUMN: Features Grid ── */}
          <div className="w-full lg:w-[68%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <motion.div
                  key={item.id ?? `why-choose-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex flex-col sm:flex-row items-start gap-4 p-5 cursor-pointer rounded-[22px] border   bg-[#fffcf8]/40 hover:bg-white border-[#d68029]/10 hover:border-[#d68029]/50 hover:shadow-[0_15px_30px_rgba(214,128,41,0.06)] transition-all duration-300 group"
                >
                  {/* Icon Container with theme background */}
                  <div className="w-12 h-12 rounded-xl bg-[#d68029]/10 flex items-center justify-center shrink-0 border border-[#d68029]/10 group-hover:scale-105 group-hover:bg-[#d68029] transition-all duration-300">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={24}
                      height={24}
                      className="object-contain text-[#d68029] group-hover:brightness-0 group-hover:invert transition-all duration-350"
                    />
                  </div>

                  {/* Text Container */}
                  <div className="flex flex-col gap-1.5 pt-0.5">
                    <h3 className="text-base font-bold text-[#0d1b2a] leading-tight group-hover:text-[#d68029] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p
                      className="text-slate-500 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-left text-gray-400 text-sm col-span-3">
                No data available.
              </p>
            )}
          </div>
        </div>
      </Row>
    </Section>
  );
}
