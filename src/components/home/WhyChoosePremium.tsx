"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { WhyChooseItem } from "@/types";
import Section from "../Section";
import Row from "../Row";
import SectionBadge from "../new-home-components/SectionBadge";
import Button from "../Button";

interface WhyChoosePremiumProps {
  items: WhyChooseItem[];
}

export default function WhyChoosePremium({ items }: WhyChoosePremiumProps) {
  return (
    <Section className="relative py-20 lg:py-24 bg-white overflow-hidden border-t border-slate-100">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute top-[-50px] right-[-150px] w-[500px] h-[500px] rounded-full bg-[#d68029]/5 blur-[130px]" />
      
      <Row>
        <div className="relative z-10 w-full flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* ── LEFT COLUMN: Text & Action Button ── */}
          <div className="w-full lg:w-[32%] flex flex-col justify-start items-start pt-2">
            <SectionBadge title="WHY CHOOSE INSPIRE" />
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0d1b2a] leading-[1.2] mt-3 mb-5">
              Your Success is Our Commitment
            </h2>
            <p className="text-slate-500 fonts_16 leading-relaxed mb-8 max-w-sm">
              We combine creativity, technology and strategy to deliver exceptional digital solutions.
            </p>
            <Button
              text="Know More About Us"
              bgColor="#d68029"
              hoverColor="#0d1b2a"
              className="max-w-[250px]"
              icon="/navbar/btn_icon.png"
              href="#contact-form-section"
            />
          </div>

          {/* ── RIGHT COLUMN: Features Grid ── */}
          <div className="w-full lg:w-[68%] grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-x-8 gap-y-12">
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <motion.div
                  key={item.id ?? `why-choose-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex items-start gap-4"
                >
                  {/* Icon Container with theme background */}
                  <div className="w-14 h-14 rounded-2xl bg-[#d68029]/10 flex items-center justify-center shrink-0 shadow-sm border border-[#d68029]/10 group transition-all duration-300">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={28}
                      height={28}
                      className="object-contain text-[#d68029]"
                      style={{ filter: "drop-shadow(0px 1px 1px rgba(214,128,41,0.2))" }}
                    />
                  </div>

                  {/* Text Container */}
                  <div className="flex flex-col gap-1.5 pt-1">
                    <h3 className="text-base font-bold text-[#0d1b2a] leading-tight">
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
              <p className="text-left text-gray-400 text-sm col-span-3">No data available.</p>
            )}
          </div>

        </div>
      </Row>
    </Section>
  );
}