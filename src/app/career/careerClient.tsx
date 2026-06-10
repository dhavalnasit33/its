"use client";

import Image from "next/image";
import { easeInOut, motion, Variants } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import apiService from "@/lib/apiService";
import Motion from "@/components/motionbar";
import NotFoundPage from "@/components/NotFoundPage";
import { CareerContent, OpenningPosition, SingleResponse } from "@/types";
import ApplyPositionModal from "@/components/career/ApplyPositionModal";

export default function CareerClient() {
  const [careerData, setCareerData] = useState<CareerContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [avialblePositionData, setAvialblePositionData] = useState<
    OpenningPosition[] | []
  >([]);
  const [avialblePositionDataLoading, setAvialblePositionDataLoading] =
    useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPositionId, setSelectedPositionId] = useState<
    string | undefined
  >(undefined);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      const res =
        await apiService<SingleResponse<CareerContent>>("/career-content");
      if (res.success) {
        setCareerData(res.data);
      } else {
        console.error(res.message);
        setCareerData(null);
      }
    } catch (error) {
      console.error("❌ Error fetching career content:", error);
      setCareerData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchAvialblePositionData = useCallback(async () => {
    setAvialblePositionDataLoading(true);
    try {
      const res =
        await apiService<SingleResponse<OpenningPosition[]>>(
          "/opennig-position",
        );
      if (res.success) {
        setAvialblePositionData(res.data);
      } else {
        console.error(res.message);
        setAvialblePositionData([]);
      }
    } catch (error) {
      console.error("❌ Error fetching openning positions:", error);
      setAvialblePositionData([]);
    } finally {
      setAvialblePositionDataLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAvialblePositionData();
  }, []);

  if (!careerData && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <NotFoundPage />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };


  const cardVariants: Variants = {
    hidden: (i: number) => ({
      opacity: 0,
      x: i % 2 === 0 ? -100 : 100,
      scale: 0.9,
    }),

    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
      },
    },
  };

  return (
    <>
      {/* HERO */}
      {/* SECTION 1: Career HERO */}
      <section className=" w-full mx-auto py-12.5 common_background_gradient">
        <div className="w-full max-w-[90%] xl:max-w-[80%] mx-auto relative gap-8  flex flex-col-reverse lg:flex-row items-center justify-center ">
          {/* Left Content */}
          <div className="w-full z-10 max-w-full xl:max-w-[65%] items-center content-center text-gray-800">
            {/* Heading (top → bottom) */}
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="mb-5"
            >
              <h1 className="text-4xl md:text-[42px]  lg:text-[46px]/[130%] tracking-[1.2px] font-semibold">
                {careerData?.heroSection.title}
              </h1>
            </motion.div>
            {/* Paragraph (bottom → top) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="mb-6 w-full"
            >
              <p className="text-black text-base sm:text-lg md:text-[18px]/[30px] tracking-wide font-medium "
                // {careerData?.heroSection.description}
                dangerouslySetInnerHTML={{ __html: careerData?.heroSection?.description  || "" }}
              />
            </motion.div>
            {/* Button (bottom → top) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              <div className="bg-[#D68029] relative inline-flex items-center justify-center w-max overflow-hidden text-white rounded-xl group">
                <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#21203d] rounded group-hover:w-64 group-hover:h-64"></span>
                <a
                  href="#openning-position"
                  className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold"
                >
                  <span className="flex flex-row gap-3 justify-center">
                    Check Current Openings
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
          {/* Right Image and Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative z-10 w-full max-w-full xl:max-w-[35%]   "
          >
            {/* Main Illustration */}

            {careerData?.heroSection.image ? (
              <Image
                src={careerData?.heroSection.image}
                alt="Isometric illustration"
                width={425}
                height={490}
                className="w-full h-fit drop-shadow-lg"
              />
            ) : (
              <div className="w-full h-7.5 bg-gray-200 rounded-lg animate-pulse"></div>
            )}
          </motion.div>
        </div>
      </section>

      {/* section 2 : openning position */}
      <section className="w-full   relative py-16 scroll-mt-14" id="openning-position">
        <div className="w-full max-w-[90%] lg:max-w-[80%] relative mx-auto">
          <div className="flex flex-wrap relative mx-auto">
            <motion.div
              className="flex flex-col items-center w-full justify-center text-center mb-10"
              initial={{ opacity: 0, y: -100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <h2 className="common-h2 text-gray-900 relative">
                Current Open Positions At ITS
              </h2>
              <Motion />
            </motion.div>

            <motion.div
              className="w-full grid gap-6 md:gap-8"
              initial={{ opacity: 0, y: 60 }} // start below
              whileInView={{ opacity: 1, y: 0 }} // move up into place
              viewport={{ once: true, amount: 0.08 }} // trigger when visible
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8,
                delay: 0.1,
              }}
            >
              {avialblePositionDataLoading
                ? // Skeleton Loader (3 cards example)
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl flex flex-col xl:flex-row justify-between items-center shadow-[0_0_10px_0_#9FADCB] px-6.25 py-5 animate-pulse"
                  >
                    {/* Image Skeleton */}
                    <div className="w-full max-w-24 h-24 bg-gray-200 rounded-lg" />

                    {/* Content Skeleton */}
                    <div className="w-full flex-1 mt-4 xl:mt-0 xl:ml-6">
                      <div className="h-6 bg-gray-200 rounded w-2/3 mb-3"></div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                      </div>
                    </div>

                    {/* Button Skeleton */}
                    <div className="w-full xl:w-auto mt-4 xl:mt-0">
                      <div className="h-10 w-32 bg-gray-200 rounded-md"></div>
                    </div>
                  </div>
                ))
                : avialblePositionData &&
                avialblePositionData.length > 0 &&
                avialblePositionData.map((position) => (
                  <div
                    key={position._id}
                    className="rounded-2xl flex flex-col xl:flex-row justify-between items-center shadow-[0_0_10px_0_#9FADCB] px-6.25 py-5"
                  >
                    {/* Image */}
                    <div className="w-full max-w-24 mb-4 xl:mb-0">
                      {position.image ? (
                        <Image
                          src={position.image}
                          alt="position illustration"
                          width={96}
                          height={96}
                          className="w-full max-w-24 max-h-24 h-full drop-shadow-lg"
                        />
                      ) : (
                        <div className="w-full h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="w-full flex-1 xl:ml-6">
                      <h4 className="text-black text-2xl md:text-3xl font-semibold mb-3">
                        {position.name}
                      </h4>
                      <div className="flex flex-col sm:flex-row lg:flex-wrap gap-4">
                        <div className="flex items-center gap-2 md:px-7.5 md:pl-0 md:border-r md:border-r-[#b0b0b0] ">
                          <h6 className="text-black text-lg  font-medium">
                            Experience:
                          </h6>
                          <p className="text-gray-600 text-md  ">
                            {position.experience}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 md:px-7.5 md:border-r md:border-r-[#b0b0b0] ">
                          <h6 className="text-black text-lg  font-medium">
                            No. of Openings:
                          </h6>
                          <p className="text-gray-600 text-md  ">
                            {position.openning}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 md:px-7.5   ">
                          <h6 className="text-black text-lg  font-medium">
                            Qualifications:
                          </h6>
                          <p className="text-gray-600 text-md  ">
                            {position.qualifications}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Button */}
                    <div className="w-full xl:w-auto mt-4 xl:mt-0">
                      <button
                        onClick={() => {
                          setSelectedPositionId(position._id);
                          setIsModalOpen(true);
                        }}
                        className="cursor-pointer text-[#12203d] text-lg font-medium rounded-md bg-white px-5 py-2 border-2 border-[#12203d] hover:text-white hover:bg-[#d68029] hover:border-[#d68029] w-full"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
            </motion.div>
          </div>
        </div>
      </section>
      {/* section 3 : how career at its  */}
      <section className="w-full flex   py-12.5  bg-white">
        <div className="w-full max-w-[90%] lg:max-w-[80%] flex flex-col lg:flex-row items-center justify-center relative mx-auto gap-7.5 ">
          {/* Left Image (Animated Logo) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full  flex items-center justify-center"
          >
            <div className="relative w-full h-auto   flex justify-center items-center">
              {careerData?.careerAtIts?.image ? (
                <Image
                  src={careerData?.careerAtIts?.image}
                  alt="Who We Are - Circle"
                  width={548}
                  height={545}
                  className="w-full   max-w-[90%]  h-auto animate-spin-slow"
                />
              ) : (
                <div className="w-full h-75 bg-gray-200 rounded-lg animate-pulse"></div>
              )}
            </div>
          </motion.div>
          {/* Right Content */}
          <div className="w-full  lg:max-w-2xl text-gray-900">
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6 common_htags left_htags"
            >
              <h2 className="common-h2 relative   ">
                {careerData?.careerAtIts?.title}
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 160 }} // Start lower & hidden
              whileInView={{ opacity: 1, y: 0 }} // Move up into place
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
              className="rhombus_icon_list  text-[#6f6f6f]   text-[18px]/[30px] font-medium leading-7 sm:leading-8  "
               dangerouslySetInnerHTML={{
                      __html: careerData?.careerAtIts?.points || "",
                    }}
            >
              {/* {careerData?.careerAtIts.points?.map((desc, idx) => (
                <li key={idx} className="mb-[4%] relative   ">

                  <p>{desc}</p>
                </li>
              ))} */}
            </motion.div>
          </div>
        </div>
      </section>
      {/* section 4 : why choose its  */}
      <section className="w-full py-16 overflow-x-hidden">
        <motion.div
          className=" text-center mb-10 w-full max-w-[90%] lg:max-w-[80%] mx-auto relative"
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {loading ? (
            <div className="h-10 bg-gray-200 rounded-md w-72 animate-pulse"></div>
          ) : (
            <h2 className="text-3xl sm:text-[40px] font-semibold text-gray-900 relative">
              {careerData?.whyJoinIts.title}
            </h2>
          )}
          <Motion />
        </motion.div>

        {/* --- FIX: Added a key to this container to ensure animation re-runs after loading --- */}
        <div
          className="w-full max-w-[90%] lg:max-w-[80%] mt-7.5 flex justify-center mx-auto"
          key={loading ? "skeleton" : "content"}
        >
          {loading ? (
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-[18px] flex items-center min-h-45 p-5 bg-white shadow-md animate-pulse"
                >
                  <div className="flex flex-row items-center w-full">
                    <div className="mr-3.75 h-20 w-20 bg-gray-200 rounded-md"></div>
                    <div className="flex flex-col flex-1">
                      <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {careerData?.whyJoinIts.points?.map((point, idx) => (
                <motion.div
                  key={idx}
                  className="rounded-[18px] flex items-center min-h-45 h-full p-5 bg-white shadow-[0_0_6px_0_#97abd4] cursor-pointer"
                  variants={cardVariants}
                  custom={idx}
                  // --- NEW: Simplified hover effect ---
                  whileHover={{ scale: 0.9 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-lg/[32px] font-normal text-[#6f6f6f]">
                    <div className="flex flex-row items-center text-start">
                      <div className="mr-3.75 shrink-0">
                        <Image
                          src={point.image}
                          alt={point.title}
                          width={80}
                          height={91}
                          className="max-w-20 max-h-22.75"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-black text-[30px] break-all font-semibold my-1.25"
                          //  {point.title} 
                           dangerouslySetInnerHTML={{ __html: point?.title || "" }}/>
                        {/* </h3> */}
                        {/* <div className="text-[#6f6f6f] text-[18px]/[32px] break-all font-normal"
                          // {point.description}
                        /> */}
                        <div className="text-[#6f6f6f] text-[18px]/[32px] break-all font-normal"
                          dangerouslySetInnerHTML={{ __html: point?.description  || "", }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
      <ApplyPositionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        positions={avialblePositionData}
        selectedPositionId={selectedPositionId}
      />
    </>
  );
}
