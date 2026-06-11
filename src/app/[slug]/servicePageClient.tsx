
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import Motion from "@/components/motionbar";
import {
  ITSService,
  ToolsAndTechnologyDetail,
  WhyCompanyPrefersContent,
} from "@/types/index";
import apiService from "@/lib/apiService";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  easeOut,
} from "framer-motion";
import { FaPlus, FaMinus, FaMicrosoft } from "react-icons/fa";
import Loader from "@/components/PageLoader";
import Link from "next/link";
import NotFoundPage from "@/components/NotFoundPage";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";
import Section from "@/components/Section";

// ✅ FIX 1: Lazy load ALL below-fold heavy components
const EngagementModels = dynamic(
  () => import("@/components/home/EngagementModel"),
  {
    loading: () => (
      <div className="h-40 w-full animate-pulse bg-gray-100 rounded-lg" />
    ),
    ssr: false,
  }
);
const Reviews = dynamic(() => import("@/components/home/Reviews"), {
  loading: () => (
    <div className="h-40 w-full animate-pulse bg-gray-100 rounded-lg" />
  ),
  ssr: false,
});
const Testimonials = dynamic(() => import("@/components/home/Testimonials"), {
  loading: () => (
    <div className="h-40 w-full animate-pulse bg-gray-100 rounded-lg" />
  ),
  ssr: false,
});

// ✅ FIX 2: Simple mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

export default function ServicePageClient() {
  const { phonePrimary, phonePrimaryClean, supportEmail, microsoftHandle, blogSlug, portfolioSlug, hireSlug } = useWebsiteSettings();
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<ITSService | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  // ✅ FIX 2: Use mobile detection + reduced motion
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const noAnim = isMobile || shouldReduceMotion;

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // ✅ FIX 3: Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const json = await apiService<{ data: ITSService }>(
          `/service/slug/${slug}`,
          { method: "GET" }
        );
        const result = json?.data || (json as unknown as ITSService);
        if (!result) {
          setNotFound(true);
        } else {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching service:", error);
        setNotFound(true);
      }
    };
    if (slug) fetchData();
  }, [slug]);

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <NotFoundPage />
      </div>
    );
  }

  if (!data) return <Loader />;

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: noAnim ? 0 : 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: noAnim ? 0 : 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: noAnim ? 0.2 : 0.6, ease: easeOut },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: noAnim ? 0 : 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: noAnim ? 0.2 : 0.6, ease: easeOut },
    },
  };

  return (
    <main className="w-full">

      <Section className="common_background_gradient py-18 md:py-22 lg:py-28">
        {/* <div className="w-full max-w-full mx-auto relative flex flex-wrap"> */}

          {/* HERO */}
          {/* <div className="relative w-full text-center py-18 md:py-22 lg:py-28 common_background_gradient"> */}
            {!isMobile && (
              <>
                <Image
                  src="/iphone-app/bg_left_arrow.svg"
                  alt=""
                  width={160}
                  height={160}
                  className="absolute top-16 left-0 opacity-80 hidden md:block"
                  loading="lazy"
                />
                <Image
                  src="/iphone-app/bg_right_arrow.svg"
                  alt=""
                  width={160}
                  height={160}
                  className="absolute top-60 right-0 opacity-80 hidden md:block"
                  loading="lazy"
                />
              </>
            )}

            {/* Blurred white circle */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div className="w-[80vw] max-w-137.5 aspect-square bg-white/30 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10  w-full max-w-[90%] lg:max-w-[80%] mx-auto text-center">
              <motion.h1
                className="text-[2.3rem] md:text-[4rem] xl:text-[5rem] font-semibold mb-6 text-black break-words"
                initial={{ y: noAnim ? 0 : -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: noAnim ? 0.2 : 0.8, ease: "easeOut" }}
              >
                {data.mainTitle}
              </motion.h1>

              <motion.div
                initial={{ y: noAnim ? 0 : 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: noAnim ? 0.2 : 0.8,
                  ease: "easeOut",
                  delay: noAnim ? 0 : 0.2,
                }}
              >
                <p className="text-gray-700 max-w-7xl mx-auto text-lg md:text-xl leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: data?.description || "" }}
                />
                {/* {data.description}
                </p> */}
                <div className="mt-6">
                  <Image
                    src="/iphone-app/stylish-underline.svg"
                    alt="underline"
                    width={200}
                    height={12}
                    className="mx-auto"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            {/* </div> */}
          </div>

          {/* CONTACT BAR */}
          {/* <div className="relative w-full z-20 bg-[#0b1833] text-white px-4 sm:px-6 md:px-12 lg:px-36 py-3 text-sm"> */}
          
        {/* </div> */}
      </Section>
      <div className="relative w-full z-20 bg-[#0b1833] text-white  py-3 text-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 text-center lg:text-left w-full relative max-w-[90%] lg:max-w-[90%] mx-auto">
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <Image
                    src="/iphone-app/India-Flag.svg"
                    alt="IN"
                    width={20}
                    height={14}
                    loading="lazy"
                  />
                  <a
                    href={`tel:${phonePrimaryClean}`}
                    className="break-all px-2 lg:px-3.75 text-center font-medium text-[18px]"
                  >
                    {phonePrimary}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/iphone-app/Support-Email.svg"
                    alt="email"
                    width={20}
                    height={14}
                    loading="lazy"
                  />
                  <a
                    href={`mailto:${supportEmail}`}
                    className="break-all px-2 lg:px-3.75 text-center font-medium text-[18px]"
                  >
                    {supportEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <FaMicrosoft size={20} className="shrink-0 text-white" />
                  <a
                    href={microsoftHandle.startsWith("http") ? microsoftHandle : `https://teams.microsoft.com/l/chat/0/0?users=${microsoftHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all px-2 lg:px-3.75 text-center font-medium text-[18px]"
                  >
                    {microsoftHandle}
                  </a>
                </div>
              </div>
              <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm font-medium">
                <li><Link href={`/${portfolioSlug}`} className="hover:underline">PORTFOLIO</Link></li>
                <li><Link href={`/${blogSlug}`} className="hover:underline">BLOG</Link></li>
                <li><Link href={`/${hireSlug}`} className="hover:underline">GET IN TOUCH</Link></li>
              </ul>
            </div>
          </div>

          {/* INTRO */}
          <Section>
          {data.subMainTitle && (
              <div className="text-center  w-full max-w-[90%] lg:max-w-[80%] mx-auto relative ">
                <motion.h2
                  className="common-h2 leading-snug "
                  initial={{ y: noAnim ? 0 : -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: noAnim ? 0.2 : 0.8, ease: "easeOut" }}
                >
                  Elevate Your Digital Presence with Inspire Techno
                  Solution&apos;s Tailored <br />
                  <span className="text-[#D68029]">{data.mainTitle}</span>{" "}
                  Services
                  <Motion />
                </motion.h2>
                <motion.p
                  className="mt-6 text-gray-600 max-w-7xl mx-auto fonts_16"
                  initial={{ y: noAnim ? 0 : 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: noAnim ? 0.2 : 0.8,
                    ease: "easeOut",
                    delay: noAnim ? 0 : 0.2,
                  }}
                  dangerouslySetInnerHTML={{ __html: data?.subMainTitleDescription || "" }}
                />
                {/* {data.subMainTitleDescription} */}
                {/* </motion.p> */}
            </div>
          )}
          </Section>

      {/* =============== SECTION 2: SERVICES + WHY CHOOSE US =============== */}
      <section className="relative w-full">
        <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto relative flex flex-wrap">

          {/* SERVICES GRID */}
          <motion.div
            className="pb-16 grid grid-cols-1 sm:grid-cols-1  md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {data.contentBlocks?.length > 0 ? (
              <>
                {data.contentBlocks.map((service, idx) => {
                  const showDedicatedCard = data.contentBlocks.length === 8;
                  const isLastContentBlock = idx === data.contentBlocks.length - 1;
                  const shouldShowMobileBorder = showDedicatedCard || !isLastContentBlock;

                  return (
                  <motion.div
                    key={idx}
                    // className={`flex flex-col gap-4 px-0 py-6 md:p-6  md:border-gray-400 border-gray-400  max-[768px]:border-b
                    //   ${idx % 3 < 2 ? "md:border-r" : ""}
                    //   ${Math.floor(idx / 3) <
                    //     Math.ceil(data.contentBlocks.length / 3) - 1
                    //     ? "md:border-b"
                    //     : ""
                    //   }`}
                     className={` flex flex-col gap-4 px-0 py-6 md:p-6 border-gray-400
                      ${shouldShowMobileBorder ? "max-[768px]:border-b" : ""}
                      ${idx % 3 < 2 ? "md:border-r" : ""}
                      ${
                        Math.floor(idx / 3) <
                        Math.ceil(data.contentBlocks.length / 3) - 1
                          ? "md:border-b"
                          : ""
                      }
                    `}
                    variants={itemVariants}
                    viewport={{ once: true, amount: 0.1 }}
                  >
                  {/* <motion.div
                    key={idx}
                    className={`
                      flex flex-col gap-4 px-0 py-6 md:p-6
                      border-gray-400
                      ${shouldShowMobileBorder ? "max-[768px]:border-b" : ""}
                      ${idx % 3 < 2 ? "md:border-r" : ""}
                      ${
                        Math.floor(idx / 3) <
                        Math.ceil(data.contentBlocks.length / 3) - 1
                          ? "md:border-b"
                          : ""
                      }
                    `}
                  > */}
                    {service.image && (
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={60}
                        height={60}
                        loading="lazy"
                        quality={75}
                      />
                    )}
                    <h4 className="font-semibold text-lg">{service.title}</h4>
                    <p className="text-gray-600 fonts_16"
                      dangerouslySetInnerHTML={{ __html: service?.description || "" }}
                    />
                    {/* {service.description}
                    </p> */}
                  </motion.div>
      );
                })}

                {data.contentBlocks.length === 8 && (
                  <motion.div
                    className="flex flex-col items-center justify-center text-center p-6 lg:border-gray-400"
                    variants={itemVariants}
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <h2 className="text-xl font-semibold">
                      <span className="text-[#d97b2f]">Empower</span>{" "}
                      <span className="text-[#0b1833]">Your Business</span>{" "}
                      <span className="text-[#d97b2f]">with</span>
                    </h2>
                    <h2 className="text-xl font-semibold text-[#d97b2f] mt-2">
                      Dedicated Developers
                    </h2>
                    {/* <motion.button
                      className="relative overflow-hidden mt-6 px-6 py-3 bg-[#0b1833] text-white font-medium rounded-md shadow-md"
                      initial="rest"
                      whileHover={noAnim ? undefined : "hover"}
                      animate="rest"
                      variants={{
                        rest: { scale: 1 },
                        hover: { scale: 1.03 },
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-[#D68029] to-[#D68029]"
                        variants={{
                          rest: { scaleX: 0, originX: 0.5 },
                          hover: { scaleX: 1, originX: 0.5 },
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      />
                      <span className="relative z-10">Talk to Our Experts</span>
                    </motion.button> */}
                    <motion.a
                      href="#contact-form-section"
                      className="relative overflow-hidden px-5 sm:px-6 py-2.5 sm:py-3 mt-6 bg-[#0b1833] text-white text-sm sm:text-base font-medium rounded-lg shadow-md"
                      whileHover="hover"
                      initial="rest"
                      animate="rest"
                      // variants={{
                      //   rest: { scale: 1 },
                      //   hover: { scale: 1.02 },
                      // }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* Background Animation Layer */}
                      <motion.span
                        className="absolute inset-0 rounded-lg bg-linear-to-r from-[#D68025] to-[#D68029]"
                        variants={{
                          rest: { scaleX: 0, originX: 0.5 }, // hidden at rest (from center)
                          hover: { scaleX: 1, originX: 0.5 }, // expands outwards on hover
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{ transformOrigin: "center" }}
                      />

                      {/* Button Text */}
                      <span className="relative z-10">Talk to Our Experts</span>
                    </motion.a>

                  </motion.div>
                )}
              </>
              ) : (
              <div className="col-span-full flex flex-col items-center justify-center text-center py-20">
                <h2 className="text-2xl md:text-3xl font-semibold">
                  <span className="text-[#d97b2f]">Empower</span>{" "}
                  <span className="text-[#0b1833]">Your Business</span>{" "}
                  <span className="text-[#d97b2f]">with</span>
                </h2>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#d97b2f] mt-2">
                  Dedicated Developers
                </h2>
                <button className="mt-6 px-6 py-3 bg-[#0b1833] text-white font-medium rounded-md shadow-md hover:bg-[#131f47] transition">
                  Talk to Our Experts
                </button>
              </div>
              )}
              </motion.div>

         
        </div>
      </section>
       {/* WHY CHOOSE US */}
       <Section>
          {data.WhyWorkWithThis && (
            // <div className="py-20 w-full">
            <>
              <div className="text-center mb-12">
                <motion.div
                  initial={{ y: noAnim ? 0 : -50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: noAnim ? 0.2 : 0.8, ease: "easeOut" }}
                >
                  <h2
                    className="common-h2 leading-snug"
                    dangerouslySetInnerHTML={{ __html: data?.WhyWorkWithThis?.title.replace(/<\/?h[1-6][^>]*>/gm, "") || "" }}
                  />
                  <div className="flex justify-center mt-4">
                    <Motion />
                  </div>
                </motion.div>
                {data.WhyWorkWithThis.description && (
                  <motion.p
                    className="text-gray-600 mt-6 max-w-5xl mx-auto text-md md:text-xl"
                    initial={{ y: noAnim ? 0 : 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: noAnim ? 0.2 : 0.8,
                      ease: "easeOut",
                      delay: noAnim ? 0 : 0.2,
                    }}
                    dangerouslySetInnerHTML={{ __html: data?.WhyWorkWithThis?.description || "" }}
                  />
                  //   {data.WhyWorkWithThis.description}
                  // </motion.p>
                )}
              </div>

              <div className="w-full relative max-w-[90%] lg:max-w-[80%] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 order-2 lg:order-1">
                  {data.WhyWorkWithThis.content?.map((item, idx) => (
                    <div key={idx}>
                      <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                      <p className="text-gray-600 fonts_16"
                        dangerouslySetInnerHTML={{ __html: item?.description || "" }}
                      />
                      {/* {item.description}
                      </p> */}
                    </div>
                  ))}
                </div>

                {data.WhyWorkWithThis.image && (
                  <motion.div
                    className="flex justify-center order-1 lg:order-2"
                    initial={{ opacity: 0 }}
                    whileInView={
                      noAnim
                        ? { opacity: 1 }
                        : { opacity: 1, x: [0, -10, 10, -10, 10, 0] }
                    }
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: noAnim ? 0.3 : 1.5, ease: "easeInOut" }}
                  >
                    {/* ✅ FIX 5: Proper image sizing */}
                    <Image
                      src={data.WhyWorkWithThis.image}
                      alt="Why Choose Us"
                      width={700}
                      height={700}
                      sizes="(max-width: 768px) 90vw, 50vw"
                      className="object-contain w-full max-w-[500px] h-auto"
                      loading="lazy"
                      quality={75}
                    />
                  </motion.div>
                )}
              </div>
              </div>
            </>
          )}
        </Section>

      {/* =============== SECTION 3: TOOLS & TECHNOLOGY =============== */}
      <Section >
        <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto relative">
          <div className="absolute inset-0 z-0 common_background_gradient"></div>

          <div className="relative w-full z-10">
            <div className="text-left  pb-12">
              <motion.div
                initial={{ opacity: 0, y: noAnim ? 0 : -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: noAnim ? 0.2 : 0.8, ease: "easeOut" }}
                className="relative common_htags left_htags"
              >
                <h2
                  className="common-h2-small leading-snug py-2 relative"
                  dangerouslySetInnerHTML={{
                    __html: data?.toolsAndTechnology?.title.replace(/<\/?h[1-6][^>]*>/gm, "") || "",
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: noAnim ? 0 : 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: noAnim ? 0.2 : 0.8, ease: "easeOut" }}
              >
                <p className="mt-6 text-gray-600 max-w-3xl fonts_16"
                  dangerouslySetInnerHTML={{ __html: data?.toolsAndTechnology?.description || "", }}
                />
                {/* {data.toolsAndTechnology.description}
                </p> */}
              </motion.div>
            </div>

            {(() => {
              const sections = [
                ...new Set(
                  data.toolsAndTechnology.details.map(
                    (d: ToolsAndTechnologyDetail) => d.section
                  )
                ),
              ].sort((a, b) => a - b);

              return (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
                  initial={{ scale: noAnim ? 1 : 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: noAnim ? 0.2 : 0.7, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {sections.map((sectionNum: number) => {
                    const sectionItems =
                      data.toolsAndTechnology.details.filter(
                        (tool: ToolsAndTechnologyDetail) =>
                          tool.section === sectionNum
                      );
                    return (
                      <div key={sectionNum} className="flex flex-col gap-6">
                        {sectionItems.map(
                          (
                            toolCategory: ToolsAndTechnologyDetail,
                            idx: number
                          ) => (
                            <div
                              key={`${sectionNum}-${idx}`}
                              className="bg-white shadow-sm border border-gray-200 rounded-lg p-6"
                            >
                              <h4 className="font-bold text-2xl mb-4">
                                {toolCategory.title}
                              </h4>
                              <div>
                              <ul className="space-y-2 text-gray-600 text-[1rem]">
                                {toolCategory.keyPoints?.map(
                                  (item: string, i: number) => (
                                    <li
                                      key={i}
                                      className="flex items-center gap-2"
                                    >
                                      <Image
                                        src="/iphone-app/List-Arrow-Icon.svg"
                                        alt=""
                                        width={24}
                                        height={24}
                                        className="shrink-0"
                                        loading="lazy"
                                      />
                                      <span>{item}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              );
            })()}
          </div>
        </div>
      </Section>

      {/* =============== SECTION 4: WHY COMPANY PREFERS =============== */}
      {data.whyCompanyPerfersThis && (
        <Section >
          <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <motion.div
                  initial={{ y: noAnim ? 0 : -50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: noAnim ? 0.2 : 0.8, ease: "easeOut" }}
                  className="mb-6 w-full flex content-start common_htags left_htags"
                >
                  <h2
                    className="common-h2-small leading-snug"
                    dangerouslySetInnerHTML={{
                      __html: data?.whyCompanyPerfersThis?.title.replace(/<\/?h[1-6][^>]*>/gm, "") || "",
                    }}
                  />
                  {/* <div className="relative w-20 sm:w-24 h-1 bg-[#d68029] mb-4">
                    <div className="absolute right-0 top-1/2 w-2 h-2 bg-[#d68029] transform -translate-y-1/2 rotate-45"></div>
                  </div> */}
                </motion.div>

                <motion.p
                  className="text-gray-700 fonts_16 md:text-lg mb-6 [&_p]:mb-4
    										[&_p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{
                    __html: data?.whyCompanyPerfersThis?.description || "",
                  }}
                  initial={{ y: noAnim ? 0 : 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: noAnim ? 0.2 : 0.8,
                    ease: "easeOut",
                    delay: noAnim ? 0 : 0.2,
                  }}
                />

                <motion.button
                  // className="relative cursor-pointer overflow-hidden px-5 sm:px-6 py-2.5 sm:py-3 bg-[#0b1833] text-white text-sm sm:text-base font-medium rounded-lg shadow-md"
                  										className="relative hidden xl:inline-flex items-center justify-center overflow-hidden rounded-xl bg-[#0d1b2a] group "

                  // whileHover={noAnim ? undefined : "hover"}
                  // initial="rest"
                  // animate="rest"
                  // variants={{
                  //   rest: { scale: 1 },
                  //   hover: { scale: 1.02 },
                  // }}
                  // transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  initial={{ opacity: 0, y: 40 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.9, ease: "easeOut", delay: 0.9 }}
                >
                  {/* <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-[#D68025] to-[#D68029]"
                    variants={{
                      rest: { scaleX: 0, originX: 0.5 },
                      hover: { scaleX: 1, originX: 0.5 },
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{ transformOrigin: "center" }}
                  /> */}
                  <motion.span
										className="absolute left-1/2 top-1/2 w-0 h-0
													-translate-x-1/2 -translate-y-1/2
													rounded bg-[#D68029]
													transition-all duration-700 ease-in-out
													group-hover:w-full group-hover:h-56"
													
										/>
                  <a href="#contact-form-section" className="relative tracking-tight rounded-[10px] text-sm sm:text-base font-semibold px-6 py-3 sm:px-8 sm:py-4 text-white transition-colors ">
                    <span className="relative z-10">
                      Let&apos;s Discuss Your Project Idea
                    </span>
                  </a>
                </motion.button>
              </div>

              {/* Right: Cards */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {data.whyCompanyPerfersThis.content?.map(
                  (item: WhyCompanyPrefersContent, idx: number) => (
                    <motion.div
                      key={idx}
                      variants={cardVariants}
                      className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition"
                    >
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="mx-auto mb-4 object-contain"
                          loading="lazy"
                          quality={75}
                        />
                      )}
                      <h4
                        className="text-base sm:text-lg text-gray-800 font-medium"
                        dangerouslySetInnerHTML={{ __html: item?.name.replace(/<\/?h[1-6][^>]*>/gm, "") || "" }}
                      />
                    </motion.div>
                  )
                )}
              </motion.div>
            </div>
          </div>
        </Section>
      )}

      {/* ✅ FIX 1: Lazy loaded below-fold sections */}
      <EngagementModels />
      <Reviews />
      <Testimonials />

      {/* =============== SECTION 5: FAQ =============== */}
      <section className="relative w-full py-12">
        <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto">
          {/* FAQ Header */}
          <div className="text-center pb-10 mb-2.5 w-full">
            <h1 className="text-center w-full font-bold text-black tracking-tight text-2xl md:text-3xl lg:text-[40px]/[120%]">
              Frequently Asked Questions (FAQ)
            </h1>
            <Motion />
          </div>

          <div className="w-full mt-7.5 relative">
            <div className="w-full gap-8 box-border relative flex flex-col lg:flex-row mx-auto">

              {/* ✅ FIX 6: Sticky sidebar - no scroll-based animation (removed useScroll/useTransform) */}
              <div className="w-full lg:w-[30%] flex relative">
                <div className="flex items-start content-start  w-full flex-wrap top-[13%] z-10 h-fit lg:sticky">
                  <div className="mb-5">
                    <h5 className="text-xl text-[#d68029] font-semibold">
                      Do you have more questions?
                    </h5>
                  </div>
                  <div className="w-full relative mb-5">
                    <h2 className="font-semibold text-4xl xl:text-[45px] leading-10 xl:leading-12.5">
                      We are here to Answer you...
                    </h2>
                  </div>
                  <div className="w-full flex justify-start">
                    <motion.div
                      initial={{ opacity: 0, scale: noAnim ? 1 : 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: noAnim ? 0.2 : 0.5,
                        ease: "easeOut",
                        delay: noAnim ? 0 : 0.1,
                      }}
                      // className="bg-[#12203d] relative inline-flex items-center justify-center w-max overflow-hidden text-white rounded-xl group"
                      className="relative hidden xl:inline-flex items-center justify-center overflow-hidden gap-2 rounded-xl bg-[#0d1b2a]  text-sm font-semibold text-white transition-colors group"
                    >
                      {/* <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D68029] rounded group-hover:w-full group-hover:h-full"></span> */}
                      <span className="absolute w-0 h-0 transition-all duration-750 delay-300 ease-in-out bg-[#D68029] rounded group-hover:w-56 group-hover:h-56"></span>
                      <a
                        href="/faqs"
                        // className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold"
                        className="relative tracking-tight rounded-[10px] text-sm sm:text-base font-semibold px-6 py-3 sm:px-8 sm:py-4 text-white transition-colors "
                      >
                        <span className="flex flex-row gap-3 items-center justify-center">
                          Explore More
                          <Image
                            src="/navbar/btn_icon.png"
                            alt="Explore More"
                            width={20}
                            height={20}
                            loading="lazy"
                          />
                        </span>
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* FAQ List */}
              <div className="w-full lg:w-[70%] flex relative">
                <div className="flex  w-full content-start flex-wrap">
                  <div className="w-full text-start">
                    {data.faqs.length > 0 &&
                      data.faqs.map((item, index) => {
                        const isOpen = activeIndex === index;
                        return (
                          <div
                            key={index}
                            className="mb-5 w-full rounded-lg bg-white p-2.5 shadow-[0_0_9px_0px_rgba(0,0,0,0.25)] border border-[#d5d8dc]"
                          >
                            <div
                              className="cursor-pointer py-4 px-5 w-full flex items-center justify-between font-semibold gap-2"
                              onClick={() => toggleAccordion(index)}
                            >
                              <span className="font-medium text-[20px] text-black">
                                {item.question}
                              </span>
                              <span className="w-[1em] inline-block shrink-0">
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
                                    <div
                                      className="prose max-w-none font-normal text-[#6f6f6f] [&_a]:text-[#d68029] [&_a]:no-underline"
                                      dangerouslySetInnerHTML={{
                                        __html: item?.answer || "",
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
      </section>
    </main>
  );
}