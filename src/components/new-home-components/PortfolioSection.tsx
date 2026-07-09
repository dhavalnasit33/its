"use client";

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FiCpu, FiDatabase, FiSmartphone, FiCloud } from "react-icons/fi";
import Section from "@/components/Section";
import Row from "@/components/Row";
import Button from "@/components/Button";
import { CreativeWork } from "@/types";

import "swiper/css";
import SectionBadge from "./SectionBadge";

interface PortfolioSectionProps {
  portfolioWorks: CreativeWork[];
}

export default function PortfolioSection({ portfolioWorks }: PortfolioSectionProps) {
  return (
    <Section className="bg-white py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#d68029]/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#0d1b2a]/[0.03] blur-3xl pointer-events-none" />

      <Row>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* ── LEFT CONTENT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col max-w-xl"
          >
            {/* Premium Label */}
            <div className="flex items-center gap-3 mb-6">
               <SectionBadge title="RECENT PROJECTS" />
              <div className="flex-1 h-px bg-gradient-to-r from-[#d68029]/50 to-transparent max-w-[80px]" />
            </div>

            {/* Main Headline */}
            <h2 className="text-[clamp(28px,4vw,46px)] font-extrabold text-[#0d1b2a] leading-[1.15] tracking-tight mb-6">
              Building Digital Products{" "}
              <span className="text-[#d68029]">That Drive</span> Business
              Growth
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-[#6b7280] text-base sm:text-[17px] leading-[1.8] mb-10 font-normal">
              Explore a selection of our recent AI platforms, enterprise
              software, mobile applications, SaaS products, and
              high-performance business websites built for startups and global
              enterprises.
            </p>

            {/* 2×2 Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                {
                  icon: FiCpu,
                  label: "AI Development",
                },
                {
                  icon: FiDatabase,
                  label: "Enterprise Software",
                },
                {
                  icon: FiSmartphone,
                  label: "Mobile Applications",
                },
                {
                  icon: FiCloud,
                  label: "SaaS Platforms",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
                    className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-100 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_24px_rgba(214,128,41,0.10)] hover:border-[#d68029]/20 transition-all duration-300 group cursor-default"
                  >
                    {/* Icon Circle */}
                    <div className="w-10 h-10 rounded-full bg-[#d68029]/8 border border-[#d68029]/15 flex items-center justify-center shrink-0 group-hover:bg-[#d68029]/15 transition-colors duration-300">
                      <Icon
                        className="w-4.5 h-4.5 text-[#d68029]"
                        strokeWidth={1.8}
                      />
                    </div>
                    <span className="text-[14px] font-semibold text-[#0d1b2a] leading-tight">
                      {item.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <Button
              bgColor="#D27E2B"
              hoverColor="#0F172A"
              className=" max-w-[250px] "
              text="Explore Portfolio"
              href="/our-portfolio"
              icon={"/navbar/btn_icon.png"}
            />
          </motion.div>

          {/* ── RIGHT SLIDER COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="relative w-full flex flex-col justify-center min-w-0"
            style={{ clipPath: "inset(-100px -2000px -100px 0px)" }}
          >
            <Swiper
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView={1.2}
              centeredSlides={false}
              loop={true}
              speed={1000}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 16 },
                768: { slidesPerView: 1.1, spaceBetween: 20 },
                1024: { slidesPerView: 1.2, spaceBetween: 24 },
              }}
              className="w-[108%] lg:w-[112%] h-[440px] lg:h-[470px] xl:h-[500px] pb-16 !overflow-visible"
            >
              {portfolioWorks && portfolioWorks.length > 0 ? (
                portfolioWorks.map((work) => (
                  <SwiperSlide key={work._id} className="pt-2">
                    {/* Clean, Simple Image Card */}
                    <div className="relative w-full rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 group">
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full aspect-[640/450] object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                // Loading Skeleton
                <SwiperSlide>
                  <div className="bg-slate-100 rounded-[24px] aspect-[16/10] flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-[#d68029]/30 border-t-[#d68029] rounded-full animate-spin" />
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </motion.div>
        </div>
      </Row>
    </Section>
  );
}
