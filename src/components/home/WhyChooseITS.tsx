"use client";

import { useEffect, useState } from "react";
import Motion from "@/components/motionbar";
import { SingleResponse, WhyChooseItem } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import apiService from "@/lib/apiService";

export default function WhyChooseITS() {
  const [whyChooseData, setWhyChooseData] = useState<WhyChooseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWhyChoose = async () => {
      setLoading(true);
      try {
        const responce = await apiService<SingleResponse<WhyChooseItem[]>>('/choose_its_home');
        if (responce.success) {
          setWhyChooseData(responce.data || []);
        } else {
          setWhyChooseData([]);
        }
      } catch (error) {
        console.error("Error fetching Why Choose ITS data:", error);

      }
      finally {
        setLoading(false);
      }
    }
    fetchWhyChoose();
  }, []);

  return (
    <div className="w-full relative mx-auto  bg-white py-20 lg:pt-3 z-10">
      <div className="w-full max-w-[90%] lg:max-w-[80%] relative mx-auto flex flex-wrap">

        <div className="text-center pb-10 mb-2.5 w-full">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}>
              <h2 className="text-center w-full font-bold text-black tracking-tight text-2xl  md:text-3xl lg:text-[40px]/[120%]  ">
                Why Choose ITS
              </h2>
              <Motion />
            </motion.div>
          </div>
        </div>
        {loading ? (
          <p className="text-center mt-8 text-gray-500">Loading...</p>
        ) : (
          <div className="grid w-full md:grid-cols-3 relative">
            {Array.isArray(whyChooseData) && whyChooseData.length > 0 ? (
              <>
                {whyChooseData.map((item, index) => (
                  <div
                    key={item.id ?? `whychoose-${index}`}
                    className="p-8 bg-white"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={60}
                      height={60}
                      className="h-12 w-12 mb-4"
                    />
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: item?.description || "",
                      }}
                    />
                      {/* {item.description}
                    </p> */}
                  </div>
                ))}

                {/* Last special CTA card */}
                <div className="p-8 flex flex-col items-center justify-center bg-white text-center">
                  <h3 className="text-2xl font-bold mb-6 leading-snug">
                    <span className="text-[#d68029]">Empower </span>
                    <span className="text-gray-900">Your Business with </span>
                    <span className="text-[#d68029]">Dedicated Developers</span>
                  </h3>


                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    className="bg-[#12203d] relative inline-flex items-center justify-center w-max overflow-hidden text-white rounded-xl group"
                  >
                    <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D68029] rounded group-hover:w-80 group-hover:h-80"></span>
                    <a
                      href="/#contact-form-section"
                      className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold">
                      <span className="flex flex-row gap-3 uppercase justify-center">
                        Talk to Our Experts

                      </span>
                    </a>
                  </motion.div>






                </div>
              </>
            ) : (
              <p>No data available</p>
            )}

            {/* Column dividers */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/3 w-px bg-gray-400" />
            <div className="hidden md:block absolute top-0 bottom-0 left-2/3 w-px bg-gray-400" />

            {/* Row divider */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
}
