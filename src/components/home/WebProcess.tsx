"use client";

import Image from "next/image";
import { ArcherContainer, ArcherElement } from "react-archer";
import Motion from "@/components/motionbar";
import { motion } from "framer-motion";

const steps = [
  { id: "design", title: "Design", img: "/home/design.jpg" },
  { id: "development", title: "Development", img: "/home/development.jpg" },
  { id: "testing", title: "Testing", img: "/home/testing.jpg" },
  { id: "delivery", title: "Delivery", img: "/home/delivery.jpg" },
];

export default function WebProcess() {
  return (
    <section className="text-center  relative w-full realtive  px-4 py-16 bg-white z-10">
      {/* Heading */}
      <div className="relatve  w-full max-w-[90%] lg:max-w-[80%] mx-auto flex flex-wrap">
        <div className="text-center pb-10 mb-2.5 w-full">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}>
              <h2 className="text-center w-full font-bold text-black tracking-tight text-2xl md:text-3xl lg:text-[40px]/[120%]">

                Our Expertise
              </h2>
              <Motion />
            </motion.div>
          </div>
        </div>
        {/* Desktop layout (with arrows) */}
        <div className="hidden w-full lg:flex justify-center">
          <div className="w-full   overflow-x-auto">
            <ArcherContainer
              strokeColor="#999"
              strokeWidth={2}
              lineStyle="curve"
              endMarker={false}
              className="w-full"
            >
              <div className="flex flex-wrap justify-center gap-x-20 gap-y-16">
                {steps.map((step, index) => {
                  const relations =
                    index < steps.length - 1
                      ? [
                        {
                          targetId: steps[index + 1].id,
                          targetAnchor: "left",
                          sourceAnchor: "right",
                          style: {
                            strokeDasharray: "6,6",
                            strokeColor: "#999",
                          },
                        },
                      ]
                      : [];

                  return (
                    <ArcherElement id={step.id} key={step.id} relations={relations as any}>
                      <div
                        className={`flex flex-col items-center  relative z-10 
                        ${index % 2 === 1 ? "lg:mt-40" : "lg:mt-0"}`}
                      >
                        {/* Oval platform */}
                        <div className="relative w-full max-w-43.75 lg:max-w-75 h-67.5 flex items-center justify-center">
                          <Image
                            src={step.img}
                            alt={step.title}
                            width={280}
                            height={280}
                            className="relative z-10  w-full h-auto"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-[#d68029] ">
                          {step.title}
                        </h3>
                      </div>
                    </ArcherElement>
                  );
                })}
              </div>
            </ArcherContainer>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-12 lg:hidden relative">
          <div className="absolute top-44 bottom-36 left-1/2 w-px border-l-2 border-dashed border-gray-400 transform -translate-x-1/2"></div>

          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              {/* Oval platform */}
              <div className="relative w-full  md:max-w-65  h-65 flex items-center justify-center">

                <Image
                  src={step.img}
                  alt={step.title}
                  width={280}
                  height={280}
                  className="relative z-10 max-w-[90%]   md:max-w-full h-auto"
                />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-[#d68029] mt-3">
                {step.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
