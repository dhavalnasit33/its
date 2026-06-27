"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { FAQS } from "@/data/constants";
import { FaPlus, FaMinus } from "react-icons/fa";
import Motion from "@/components/motionbar";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Row from "@/components/Row";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <Section>
      <Row>
        {/* FAQ Header */}
        <div className="text-center pb-10 mb-2.5 w-full">
          <h2 className="text-center w-full text-black common-h2">
            Frequently Asked Questions (FAQ)
          </h2>
          <Motion />
        </div>

        <div className="w-full mt-7.5 relative">
          <div className="w-full gap-8 box-border relative flex flex-col lg:flex-row mx-auto">
            {/* Sticky Sidebar */}
            <div className="w-full lg:w-[30%] flex relative">
              <div className="flex items-start content-start w-full flex-wrap top-[13%] z-10 h-fit lg:sticky">
                <div className="mb-5">
                  <h5 className="text-xl text-[#d68029] font-semibold">
                    Do you have more questions?
                  </h5>
                </div>
                <div className="w-full relative mb-5">
                  <h2 className="font-semibold text-4xl xl:text-[45px] leading-10 xl:leading-12.5 text-black">
                    We are here to Answer you...
                  </h2>
                </div>
                <Button
                  text="Explore More"
                  href="/faqs"
                  icon="/navbar/btn_icon.png"
                />
              </div>
            </div>

            {/* FAQ List */}
            <div className="w-full lg:w-[70%] flex relative">
              <div className="flex w-full content-start flex-wrap">
                <div className="w-full text-start">
                  {FAQS.map((faq, idx) => {
                    const isOpen = openIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="mb-5 w-full rounded-lg bg-white p-2.5 shadow-[0_0_9px_0px_rgba(0,0,0,0.25)] border border-[#d5d8dc]"
                      >
                        <div
                          className="cursor-pointer py-4 px-5 w-full flex items-center justify-between font-semibold gap-2"
                          onClick={() => toggle(idx)}
                        >
                          <span className="font-semibold text-base sm:text-lg text-black">
                            {faq.question}
                          </span>
                          <span className="w-[1em] inline-block shrink-0 text-black">
                            {isOpen ? <FaMinus /> : <FaPlus />}
                          </span>
                        </div>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.4,
                                ease: "easeInOut",
                              }}
                              className="overflow-hidden"
                            >
                              <div className="block px-5 w-full pb-4 text-[#7a7a7a]">
                                <p className="font-normal text-[#6f6f6f] text-sm sm:text-base leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </Section>
  );
}
