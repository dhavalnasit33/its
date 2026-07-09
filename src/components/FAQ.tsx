"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import Motion from "@/components/motionbar";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Row from "@/components/Row";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
  title?: string;
  sideTitle?: string;
  sideSubtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function FAQ({
  faqs,
  title = "Frequently Asked Questions (FAQ)",
  sideTitle = "Do you have more questions?",
  sideSubtitle = "We are here to Answer you...",
  buttonText = "Explore More",
  buttonHref = "/faqs",
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <Section className="py-20 lg:py-28">
      <Row className="flex gap-8 flex-col">
        <div className="flex flex-wrap w-full relative content-start">
          {/* FAQ Header */}
          <div className="text-center pb-10 mb-2.5 w-full">
            <h2 className="text-center w-full text-black common-h2">
              {title}
            </h2>
            <Motion />
          </div>

          <div className="w-full mt-7.5 relative">
            <div className="w-full gap-8 box-border relative flex flex-col lg:flex-row mx-auto">
              
              {/* Sticky Sidebar */}
              <div className="w-full max-w-full lg:max-w-[29.99%] flex relative min-h-px">
                <div className="flex items-start content-start w-full flex-wrap top-[120px] z-10 h-fit sticky">
                  <div className="mb-5">
                    <h6 className="text-xl text-[#d68029] font-semibold">
                      {sideTitle}
                    </h6>
                  </div>
                  <div className="w-full relative mb-5">
                    <h2 className="font-semibold text-4xl xl:text-[45px] leading-10 xl:leading-12.5">
                      {sideSubtitle}
                    </h2>
                  </div>
                  <div className="w-full text-center flex justify-start">
                    <Button
                      motionProps={{
                        initial: { opacity: 0, scale: 0.8 },
                        whileInView: { opacity: 1, scale: 1 },
                        viewport: { once: true, amount: 0.2 },
                        transition: { duration: 0.5, ease: "easeOut", delay: 0.1 }
                      }}
                      text={buttonText}
                      href={buttonHref}
                      icon="/navbar/btn_icon.png"
                    />
                  </div>
                </div>
              </div>

              {/* FAQ List */}
              <div className="w-full max-w-full lg:max-w-[70%] flex relative min-h-px">
                <div className="flex w-full content-start relative flex-wrap">
                  <div className="w-full text-start box-border relative">
                    {faqs.length > 0 &&
                      faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                          <div
                            key={idx}
                            className="mb-5 w-full rounded-lg bg-white p-2.5 shadow-[0_0_9px_0px_rgba(0,0,0,0.25)] border border-[#d5d8dc] box-border"
                          >
                            <div
                              className="cursor-pointer w-full py-4 px-5 box-border flex items-center justify-between font-bold gap-2"
                              onClick={() => toggle(idx)}
                            >
                              <span className="font-semibold text-[20px] text-black">
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
                                    duration: 0.6,
                                    ease: "easeInOut",
                                    delay: 0.1,
                                  }}
                                  className="overflow-hidden"
                                >
                                  <div className="block w-full px-5 pb-4 text-[#7a7a7a] text-md">
                                    <div
                                      className="prose max-w-none font-normal text-[#6f6f6f] [&_a]:text-[#d68029] [&_a]:no-underline"
                                      dangerouslySetInnerHTML={{
                                        __html: faq.answer,
                                      }}
                                    />
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
        </div>
      </Row>
    </Section>
  );
}
