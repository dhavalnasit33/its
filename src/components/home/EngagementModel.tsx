"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Motion from "../motionbar";
import { EngagementModel } from "@/types";
import Link from "next/link";
import apiService from "@/lib/apiService";
import TechBackground from "./TechBackground";
import Section from "../Section";
import Row from "../Row";

const themes = [
  {
    gradient: "from-[#0EA5E9]/40 via-[#0EA5E9]/10 to-slate-600/10",
    box: "bg-[#0EA5E9]",

    bg: "bg-[#0EA5E9]/20",
    border: "border-[#0EA5E9]/40 hover:border-[#0EA5E9]",
    text: "text-[#0EA5E9]",
    button: "bg-[#0EA5E9] hover:bg-[#0EA5E9] text-white",
  },
  {
    gradient: "from-[#D68029]/70 via-[rgba(214, 128, 41, 0.8)]/10 to-slate-600/10",
    box: "bg-[#D68029]",
    bg: "bg-[#D68029]/20",
    border: "border-[#D68029]/40 hover:border-[#D68029]",
    text: "text-[#D68029]",
    button: "bg-[#D68029] hover:bg-[#D68029] text-white",
  },
  {
    gradient: "from-emerald-500/40 via-emerald-800/10 to-slate-600/10",
    box: "bg-emerald-500",
    bg: "bg-emerald-500/20",
    border: "border-emerald-400/40 hover:border-emerald-400",
    text: "text-emerald-200",
    button: "bg-emerald-500 hover:bg-emerald-600 text-white",
  },
];

export default function EngagementModels() {
  const [models, setModels] = useState<EngagementModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const res = await apiService<{ success: boolean; data: any[] }>(
          "/engagement-model"
        );

        const items = Array.isArray(res.data) ? res.data : [];
        setModels(items);
      } catch (err: any) {
        console.error("❌ Error fetching models:", err);
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <Section className="overflow-hidden">
      {/* <video
        autoPlay
        loop
        muted
        src="/home/wave.mp4"
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      ></video> */}
      <TechBackground />
      {/* <div className="absolute inset-0 bg-[#0a1a33]/90" /> */}

      {/* <div className="w-full max-w-7xl mx-auto relative flex flex-wrap p-2.5 z-10 "> */}
      {/* <div className="w-full max-w-[90%] lg:max-w-[80%] 2xl:max-w-7xl mx-auto relative flex flex-wrap  z-10 "> */}
      <Row className="2xl:max-w-7xl! flex flex-wrap  z-10 ">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col justify-center mb-6 w-full relative "
        >
          <h2 className="common-h2 text-center w-full  text-black ">

            <span className="text-[#D68029]">Build Your Dream</span>{" "}
            <span className="text-white">Team With Our Engagement Model</span>
          </h2>
          <Motion />
        </motion.div>


        <div
          className={`grid gap-8 w-full mx-auto relative justify-center ${models.length === 1
            ? "grid-cols-1"
            : models.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
        >
          {models.map((model, index) => {
            const theme = themes[index % themes.length];
            const details = [...(model.keyPoints || [])];
            if (model.supportModel) details.push(model.supportModel);

            const directions = [
              { x: -80, y: 0 },
              { x: 0, y: 80 },
              { x: 80, y: 0 },
            ];
            const initialAnim = directions[index % 2];
            const supportItem = details.find(
              (d) =>
                d.toLowerCase().includes("24x7") ||
                d.toLowerCase().includes("24*7")
            );

            const filteredDetails = details.filter(
              (d) =>
                !d.toLowerCase().includes("24x7") &&
                !d.toLowerCase().includes("24*7")
            );

            const normalItems = filteredDetails.slice(0, -2);
            const boxItems = filteredDetails.slice(-2);
            const isBoxLayout = index < 2;

            return (
              <motion.div
                key={model._id}
                initial={{ opacity: 0, ...initialAnim }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className={` relative p-7 rounded-2xl justify-between text-white flex flex-col  overflow-hidden transition 
                  bg-linear-to-br ${theme.gradient}  border ${theme.border} 
                `}


                style={{
                  boxShadow:
                    index === 0
                      ? "0 0 25px rgba(19,81,125,0.25)"
                      : index === 1
                        ? "0 0 25px rgba(214,128,41,0.25)"
                        : "0 0 25px rgba(16,185,129,0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    index === 0
                      ? "0 0 25px rgba(19,81,125,0.3), 0 0 80px rgba(19,81,125,0.1)"
                      : index === 1
                        ? "0 0 25px rgba(214,128,41,0.3), 0 0 80px rgba(214,128,41,0.1)"
                        : "0 0 25px rgba(16,185,129,0.3), 0 0 80px rgba(16,185,129,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    index === 0
                      ? "0 0 25px rgba(19,81,125,0.25)"
                      : index === 1
                        ? "0 0 25px rgba(214,128,41,0.25)"
                        : "0 0 25px rgba(16,185,129,0.25)";
                }}
              >
                <div>

                  <div className="flex items-center gap-4  mb-6">
                    <div className={`w-14 h-14 ${theme.box} backdrop-blur-md rounded-md flex items-center justify-center`}>
                      <Image
                        src={model.modelImage}
                        alt={model.modelTitle}
                        width={40}
                        height={40}
                        className="object-contain filter brightness-0 invert"
                      />
                    </div>
                    <h4 className="text-xl font-bold ">{model.modelTitle}</h4>
                  </div>


                  <p className="text-sm text-white opacity-70 leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{
                      __html: model?.modelDescription || "",
                    }}
                  />
                  {/* {model.modelDescription}
                  </p> */}



                  <ul className="text-sm text-white  space-y-2 mb-6 text-left">

                    {normalItems.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-white opacity-70">
                        <span className="w-1 h-1 bg-white opacity-70 rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <ul>
                    <li className="list-none">
                      <div className={`rounded-md p-4 border ${theme.bg} ${theme.border}`}>

                        {boxItems.map((detail, i) => (
                          <div
                            key={i}
                            className={`
                              flex items-center gap-2
                              ${i === 0
                                ? `font-bold text-xl ${theme.text} mb-1`
                                : "text-xs text-white opacity-70 "
                              }
                            `}
                          >
                            {detail}
                          </div>
                        ))}

                      </div>
                    </li>

                  </ul>

                  {supportItem && (
                    <li className="flex items-center gap-2 text-white/80 my-10">
                      <Image src="/home/Checkmark.png" alt="check" width={16} height={16} />
                      24x7 Support
                    </li>
                  )}

                  <Link href="/hire">
                    <div className={`
                    w-full text-center py-3 rounded-md font-semibold
                    transition duration-300
                    ${theme.button}
                    hover:shadow-lg hover:scale-105
                  `}>
                      Get Started
                    </div>
                  </Link>

                </div>
              </motion.div>
            );
          })}
        </div>
      </Row>
      {/* </div> */}
    </Section>
  );
}











