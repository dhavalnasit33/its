"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Motion from "@/components/motionbar";
import apiService from "@/lib/apiService";
import { HirePageData, SingleResponse, TechStackDetail } from "@/types";
import HireFormSection from "@/components/hire/HireForm";
import { FaCheck } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import TechnologyTabs from "@/components/home/TechnologySection";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import NotFoundPage from "@/components/NotFoundPage";
import ParallaxShape from "@/components/home/ParallaxShape";

function chunkArray<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size),
  );
}

function transpose<T>(matrix: T[][]): T[][] {
  return matrix[0].map((_, colIndex) =>
    matrix.map((row) => row[colIndex]).filter(Boolean),
  );
}

export default function HirepageTechnologClient({ subPageSlug }: { subPageSlug?: string }) {
  const params = useParams();
  const slug = subPageSlug || (Array.isArray(params.slug) ? params.slug[0] : params.slug);
  const [pageData, setPageData] = useState<HirePageData | null>(null);
  const [Loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [matchCatgeory, setMatchCatgeory] = useState<string>("");
  console.log("🚀 ~ HirepageTechnolog ~ matchCatgeory:", matchCatgeory);
  // Default the active accordion to the first item (index 0)
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiService<{ success: boolean; data: string[] }>(
          "/blogs/categories",
        );
        setCategories(["All", ...res.data]);
        // Find matching category based on slug
        if (slug) {
          const slugString = Array.isArray(slug) ? slug[0] : slug;
          const matchedCategory = findMatchingCategory(slugString, res.data);
          if (matchedCategory) {
            setMatchCatgeory(matchedCategory);
          }
        }
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [slug]);

  const findMatchingCategory = (
    slug: string,
    categories: string[],
  ): string | null => {
    const slugLower = slug.toLowerCase();

    // Common technology mappings
    const techMappings: { [key: string]: string[] } = {
      wordpress: ["wordpress", "cms"],
      shopify: ["shopify", "ecommerce"],
      laravel: ["laravel", "php"],
      react: ["react", "reactjs"],
      angular: ["angular", "angularjs"],
      vue: ["vue", "vue.js"],
      node: ["node", "nodejs"],
      flutter: ["flutter"],
      ionic: ["ionic"],
      android: ["android"],
      iphone: ["iphone", "ios"],
      uiux: ["ui/ux", "design"],
      php: ["php", "core php"],
      codeigniter: ["codeigniter"],
      "full-stack": ["codeigniter", "web development", "full stack"],
    };

    // First, try exact matches from mappings
    for (const [techKey, techTerms] of Object.entries(techMappings)) {
      if (slugLower.includes(techKey)) {
        const matchedCat = categories.find((cat) =>
          techTerms.some((term) =>
            cat.toLowerCase().includes(term.toLowerCase()),
          ),
        );
        if (matchedCat) return matchedCat;
      }
    }

    // Fallback: find any category that appears in the slug
    for (const category of categories) {
      const categoryWords = category.toLowerCase().split(/[\s\/&]+/);
      const hasMatch = categoryWords.some(
        (word) => word.length > 2 && slugLower.includes(word),
      );

      if (hasMatch) return category;
    }

    return null;
  };

  // This function will handle opening and closing the accordion items
  const toggleAccordion = (index: number) => {
    // If the clicked item is already open, close it. Otherwise, open the new item.
    setActiveIndex(activeIndex === index ? null : index);
  };
  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const responce = await apiService<SingleResponse<HirePageData>>(
          `/hire-page/slug/${slug}`,
          { method: "GET" },
        );
        if (responce.success) {
          setPageData(responce.data);
          setLoading(false);
        } else {
          console.log(responce.message);
          setPageData(null);
          setLoading(false);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error.message);
      } finally {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLoading(false);
      }
    };
    if (slug) {
      fetchPageData();
    }
  }, [slug]);

  if (Loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d68029]"></div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <NotFoundPage />
      </div>
    );
  }

  const getHighlightedTitle = () => {
    const fullTitle = pageData.hireDevelopersAsYourNeeds.title;
    const techNameSingular = pageData.title.replace(/^Hire\s*/, "");
    const techNamePlural = techNameSingular + "s";

    let termToHighlight = "";

    if (fullTitle.includes(techNamePlural)) {
      termToHighlight = techNamePlural;
    } else if (fullTitle.includes(techNameSingular)) {
      termToHighlight = techNameSingular;
    }

    if (termToHighlight) {
      const parts = fullTitle.split(termToHighlight);
      const partAfterHighlight = parts[1] || ""; // The part after the highlighted term
      const breakPoint = "your";

      // Check if we can split the remaining part to add a line break
      if (partAfterHighlight.includes(breakPoint)) {
        const finalParts = partAfterHighlight.split(breakPoint);
        return (
          <>
            {parts[0]}
            <span className="text-[#d68029]">{termToHighlight}</span>
            {finalParts[0]}
            <br />
            {breakPoint}
            {finalParts[1]}
          </>
        );
      }

      // Fallback if "according" isn't in the title
      return (
        <>
          {parts[0]}
          <span className="text-[#d68029]">{termToHighlight}</span>
          {parts[1]}
        </>
      );
    }

    return fullTitle; // Return original title if no highlight term is found
  };

  return (
    <main className="w-full">
      {/* section 1 : hero section */}
      <section
        id="hero1"
        className="relative py-12.5 hire_hero_section common_background_gradient w-full z-10 bg-white"
      >
        <video
          autoPlay
          loop
          muted
          src="/hire/hire_bg.mp4"
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        ></video>

        <div className="absolute inset-0 bg-[#0a1a33]/90"></div>
        <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto relative flex justify-center mb-10">
          <h1 className="inline-flex gap-1 items-center rounded-full border border-white bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-widest text-slate-200">
            {pageData.title.toLowerCase().startsWith("hire") ? (
              <>
                {/* <span className="text-[#d68029] uppercase">
                                HIRE <div className="w-1 h-1 bg-[#d68029]" />
                              </span> {" "} */}
                <span className="text-[#d68029] uppercase inline-flex items-center gap-1">
                  HIRE
                  <span className="w-1 h-1 bg-[#d68029] rounded-full inline-block"></span>
                </span>{" "}
                {pageData.title.replace(/^hire\s*/i, "")}
              </>
            ) : (
              pageData.title
            )}
          </h1>
        </div>
        <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto relative flex  ">
          <div className="w-full flex flex-wrap  content-start relative ">
            <section className="w-full relative">
              <div className="flex flex-col lg:flex-row items-start w-full gap-10 mx-auto relative ">
                <div className="w-full  lg:max-w-[50%] flex relative min-h-px ">
                  <div className="flex items-center content-center flex-wrap relative w-full ">
                    <motion.div
                      className="mb-2.5 w-full relative"
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: 0.2,
                      }}
                    >
                      <div className="mb-2.5 w-full relative ">
                        <h1 className="font-bold text-4xl md:text-[42px] lg:text-[46px]/[130%] tracking-[1.2px] relative  text-white font-bricolage">
                          {pageData.title.toLowerCase().startsWith("hire") ? (
                            <>
                              <span className="text-[#d68029] uppercase">
                                HIRE
                              </span>{" "}
                              {pageData.title.replace(/^hire\s*/i, "")}
                            </>
                          ) : (
                            pageData.title
                          )}
                        </h1>
                      </div>
                    </motion.div>
                    <motion.div
                      className="mb-5 relative w-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.6,
                      }}
                    >
                      {/* <div className="mb-5 relative w-full "> */}
                      <div
                        className="font-medium text-slate-300 rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer text-base  md:text-lg leading-8 tracking-wide"
                        dangerouslySetInnerHTML={{
                          __html: pageData?.description || "",
                        }}
                      />
                      {/* </div> */}
                    </motion.div>
                    <div className="mb-7  relative w-full">
                      <motion.div
                        className=" mt-2.5 relative "
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                          delay: 0.6,
                        }}
                      >
                        <div className="relative hire_developers_list">
                          <ul className="list-none rounded-xl border border-white/10 bg-[#ffffff08] p-5 lg:p-6 shadow-[0_24px_80px_-28px_rgba(0,0,0,0.7)] backdrop-blur-md sm:p-8">
                            {pageData.keyPoints.map((item, index) => (
                              <li
                                key={index}
                                className="pl-12 relative mb-3.5 text-[16px] text-slate-300 font-normal
                                flex gap-3 rounded-md border border-transparent bg-[#ffffff06] px-3 py-2.5  leading-relaxed  transition hover:border-white/10 hover:bg-white/[0.07]"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </div>
                    <div className="flex relative min-h-px  w-full max-w-full  rounded-xl border border-[#ffffff08] bg-white/[0.04] p-5 lg:p-6 shadow-[0_24px_80px_-28px_rgba(0,0,0,0.7)] backdrop-blur-md sm:p-8 ">
                      <div className="w-full relative flex flex-col items-center content-center justify-center">
                        <motion.div
                          initial={{ opacity: 0, y: -60 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="mb-6 w-full flex content-start common_htags left_htags"
                        >
                          <h2 className=" relative  text-white common-h2">
                            {pageData.successSpeacks.title}
                          </h2>
                        </motion.div>
                        <div className="w-full  relative text-slate-300 text-base md:text-lg leading-8 tracking-wide font-normal ">
                          <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                              duration: 0.6,
                              ease: "easeOut",
                              delay: 0.2,
                            }}
                          >
                            {/* {pageData.successSpeacks.description && ( */}
                            <div
                              className="prose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline"
                              dangerouslySetInnerHTML={{
                                __html:
                                  pageData?.successSpeacks?.description || "",
                              }}
                            />
                            {/* )} */}
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="w-full relative mt-10">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                          delay: 0.6,
                        }}
                        className="bg-[#D68029] relative w-auto inline-flex items-center justify-center w-max overflow-hidden text-white  group"
                      >
                        <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#12203d]  group-hover:w-full group-hover:h-full"></span>
                        <a href="#hero1"
                          className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold">
                          <span className="flex flex-row gap-3 items-center justify-center">
                            Get Started Today!
                            <Image
                              src="/hire/Frame-2-4.png"
                              alt="FRAME"
                              width={30}
                              height={30}
                            />
                          </span>
                        </a>
                      </motion.div>
                    </div> */}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
                  className="w-full  shadow-[0_0_80px_10px_#0000001a] rounded-xl lg:max-w-[50%] flex relative mx-auto p-5 lg:p-6 min-h-px
                   h-full border border-white/10 bg-[#ffffff08] backdrop-blur-md"
                >
                  <HireFormSection />
                </motion.div>
              </div>
            </section>
            {/* <section className="w-full relative  pt-7.5 lg:pt-25">
              <div className="flex mx-auto gap-8 flex-col lg:flex-row relative ">
                <div className="flex relative min-h-px w-full max-w-full lg:max-w-[50%]">
                  <div className="flex relative w-full p-2.5 content-start">
                    {pageData.successSpeacks.image ? (
                      <Image
                        src={pageData.successSpeacks.image}
                        alt={pageData.successSpeacks.title}
                        width={500}
                        height={290}
                        className="w-full h-auto drop-shadow-lg inline-block align-middle"
                      />
                    ) : (
                      <div className="w-full h-125 bg-gray-200 rounded-lg animate-pulse"></div>
                    )}
                  </div>
                </div>
                <div className="flex relative min-h-px  w-full max-w-full lg:max-w-[50%]">
                  <div className="w-full relative flex flex-col items-center content-center justify-center   p-2.5">
                    <motion.div
                      initial={{ opacity: 0, y: -60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="mb-6 w-full flex content-start common_htags left_htags"
                    >
                      <h2 className="text-3xl sm:text-4xl md:text-[40px] relative leading-[120%] text-white font-bold">
                        {pageData.successSpeacks.title}
                      </h2>
                    </motion.div>
                    <div className="w-full  relative text-slate-300 text-base md:text-lg leading-8 tracking-wide font-normal ">
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                          delay: 0.2,
                        }}
                      >
                        {pageData.successSpeacks.description && (
                          <div
                            className="prose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline"
                            dangerouslySetInnerHTML={{
                              __html: pageData.successSpeacks.description,
                            }}
                          />
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}
          </div>
        </div>
      </section>
      {/* section 2 : hire accodiong to your needs  */}
      <section className="relative py-12.5 w-full z-20 bg-white">
        <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto relative flex">
          <div className="flex relative min-h-px w-full">
            <div className="flex  content-start relative w-full flex-wrap">
              <div className="text-center pb-2.5  mb-2.5 w-full">
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                  >
                    <h2 className="text-center w-full text-black common-h2">
                      {getHighlightedTitle()}
                    </h2>
                  </motion.div>
                  <Motion />
                </div>
              </div>
              <div className="w-full mb-5 text-[#6f6f6f] font-normal relative">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <p className="text-center text-base md:text-lg leading-8 tracking-wide">
                    Here you can hire talented{" "}
                    <span>
                      {pageData.hireDevelopersAsYourNeeds.title
                        .replace("Hire Top 1%", "")
                        .replace("according to your needs", "")
                        .trim()}
                    </span>{" "}
                    at the best price who can understand your business needs.
                  </p>
                </motion.div>
              </div>
              <section className="w-full mt-8 relative">
                <div className="flex flex-col lg:flex-row gap-8 w-full">
                  {/* Left Column: Info Boxes */}
                  <div className="w-full lg:w-1/3 xl:w-1/4">
                    <div className="grid grid-cols-1   gap-5">
                      {/* Box 1: 24*7 Availability */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay: 0.1,
                        }}
                        className="w-full rounded-sm relative px-5 py-2.5 shadow-[0_2px_7px_-3px_rgba(0,0,0,0.25)] bg-white"
                      >
                        <div className="flex items-center flex-row text-start gap-4">
                          <Image
                            src={"/hire/24_7-Availability.png"}
                            alt="24*7 available"
                            width={65}
                            height={50}
                            className="h-12.5 w-16.25 object-contain"
                          />
                          <h4 className="text-black text-lg font-semibold">
                            24*7 Availability
                          </h4>
                        </div>
                      </motion.div>
                      {/* Box 2: 20+ Experts */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay: 0.3,
                        }}
                        className="w-full rounded-sm relative px-5 py-2.5 shadow-[0_2px_7px_-3px_rgba(0,0,0,0.25)] bg-white"
                      >
                        <div className="flex items-center flex-row text-start gap-4">
                          <Image
                            src={"/hire/150-Experts.png"}
                            alt="20+ experts"
                            width={65}
                            height={50}
                            className="h-12.5 w-16.25 object-contain"
                          />
                          <h4 className="text-black text-lg font-semibold">
                            20+ Experts
                          </h4>
                        </div>
                      </motion.div>
                      {/* Box 3: Hourly Hiring */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay: 0.5,
                        }}
                        className="w-full rounded-sm relative px-5 py-2.5 shadow-[0_2px_7px_-3px_rgba(0,0,0,0.25)] bg-white"
                      >
                        <div className="flex items-center flex-row text-start gap-4">
                          <Image
                            src={"/hire/Hourly-Hiring.png"}
                            alt="Hourly Hiring"
                            width={65}
                            height={50}
                            className="h-12.5 w-16.25 object-contain"
                          />
                          <h4 className="text-black text-lg font-semibold">
                            Hourly Hiring
                          </h4>
                        </div>
                      </motion.div>
                      {/* Box 4: Full-Time hiring */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay: 0.7,
                        }}
                        className="w-full rounded-sm relative px-5 py-2.5 shadow-[0_2px_7px_-3px_rgba(0,0,0,0.25)] bg-white"
                      >
                        <div className="flex items-center flex-row text-start gap-4">
                          <Image
                            src={"/hire/Full-Time-hiring.png"}
                            alt="full time hiring"
                            width={65}
                            height={50}
                            className="h-12.5 w-16.25 object-contain"
                          />
                          <h4 className="text-black text-lg font-semibold">
                            Full-Time hiring
                          </h4>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Right Column: Pricing Cards */}
                  <div className="w-full lg:flex-1 flex flex-col md:flex-row gap-8">
                    {/* Price Card 1 */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="flex-1 flex flex-col relative border-2 border-[#eeeeee] bg-white hover:border-[#d68029]  transition-all duration-300 group  rounded-md p-5"
                    >
                      <div className="text-center mb-5">
                        <h6 className="my-2.5 font-bold text-black">
                          {
                            pageData.hireDevelopersAsYourNeeds.planDetails[0]
                              .timelLine
                          }
                          <br />
                          <span className="text-[41px] font-bold group-hover:text-[#d68029] transition-colors duration-300 ">
                            {
                              pageData.hireDevelopersAsYourNeeds.planDetails[0]
                                .price
                            }
                          </span>
                        </h6>
                      </div>
                      <ul className="list-none m-0 p-0">
                        {pageData.hireDevelopersAsYourNeeds.planDetails[0].keyPoints.map(
                          (item, index) => (
                            <li
                              key={index}
                              className="p-0 mb-3 flex items-center"
                            >
                              <span className="flex text-gray-400 text-2xl w-8 group-hover:text-[#d68029] transition-colors duration-300">
                                <FaCheck />
                              </span>
                              <span className="text-black self-center ps-1 text-lg font-normal">
                                {item}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>
                    </motion.div>

                    {/* Price Card 2 */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="flex-1 flex flex-col relative border-2 border-[#eeeeee] bg-white hover:border-[#d68029]  transition-all duration-300 group  rounded-md p-5"
                    >
                      <div className="text-center mb-5">
                        <h6 className="my-2.5 font-bold text-black">
                          {
                            pageData.hireDevelopersAsYourNeeds.planDetails[1]
                              .timelLine
                          }
                          <br />
                          <span className="text-[41px] font-bold group-hover:text-[#d68029] transition-colors duration-300 ">
                            {
                              pageData.hireDevelopersAsYourNeeds.planDetails[1]
                                .price
                            }
                          </span>
                        </h6>
                      </div>
                      <ul className="list-none m-0 p-0">
                        {pageData.hireDevelopersAsYourNeeds.planDetails[1].keyPoints.map(
                          (item, index) => (
                            <li
                              key={index}
                              className="p-0 mb-3 flex items-center"
                            >
                              <span className="flex text-gray-400 text-2xl w-8 group-hover:text-[#d68029] transition-colors duration-300">
                                <FaCheck />
                              </span>
                              <span className="text-black self-center ps-1 text-lg font-normal">
                                {item}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
      {/* section3 : benifits  */}
      <section
        className="relative z-10 mt-[-6%] bg-[url('/hire/Rectangle-4181.png')] 
         bg-center bg-size[100%_auto] 
         px-0 pt-37.5 pb-12.5 
         transition-[background,border,border-radius,box-shadow] duration-300 
         max-[1200px]:mt-0 max-[1200px]:py-10"
      >
        <div className="flex relative mx-auto w-full max-w-[90%] lg:max-w-[80%]">
          <div className="flex w-full relative min-h-px">
            <div className="flex flex-wrap content-start w-full  relative">
              <div className="mb-5 w-full text-center relative hiring_model_benefits">
                <h4 className="text-center relative text-black pb-6.25 text-[20px] font-semibold">
                  Benefits
                </h4>
              </div>
              <section className="w-full  relative ">
                <div className="flex w-full xl:mx-auto max-w-full lg:max-w-[90%] xl:max-w-[80%]">
                  {pageData?.hireDevelopersAsYourNeeds?.benefits && (
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 w-full  max-w-full min-h-px   list-none rhombus_icon_list relative p-0">
                      {pageData.hireDevelopersAsYourNeeds.benefits.map(
                        (benefit, index) => (
                          <li
                            key={index}
                            className="flex items-center  relative text-lg"
                          >
                            <span className="text-[#6f6f6f] text-lg  relative font-medium">
                              {benefit}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  )}
                </div>
              </section>
              <div className="w-full text-center mt-14">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  className="bg-[#12203d] relative -top-6 inline-flex items-center justify-center w-max overflow-hidden text-white rounded-xl group"
                >
                  <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D68029] rounded group-hover:w-full group-hover:h-full"></span>
                  <a
                    href="#contact-form-section"
                    className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold"
                  >
                    <span className="flex flex-row gap-3  items-center justify-center">
                      Schedule a Developer Interview
                      <Image
                        src="/navbar/btn_icon.png"
                        alt="Get a Quote Arrow"
                        width={20}
                        height={20}
                      />
                    </span>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section 4 : hire daticated */}
      <section className="relative w-full py-12.5 z-10 bg-white">
        <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex gap-8 flex-col-reverse relative lg:flex-row">
          <div className="flex w-full relative min-h-px max-w-full lg:max-w-[50%]">
            <div className="flex flex-col  content-center justify-center items-center relative w-full">
              <motion.div
                initial={{ opacity: 0, y: -60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-6 text-left w-full common_htags left_htags"
              >
                <h2 className="common-h2-small relative text-black">
                  {pageData.hireDadiated.title}
                </h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full relative"
              >
                {/* {pageData.hireDadiated.description && ( */}
                <div
                  className="prose max-w-none text-base font-normal text-[#6f6f6f] leading-8 tracking-wide
                                                [&_p]:mb-4 [&_p:last-child]:mb-0  [&_a]:text-[#d68029] [&_a]:no-underline [&_a:hover]:underline"
                  dangerouslySetInnerHTML={{
                    __html: pageData?.hireDadiated?.description || "",
                  }}
                />
                {/* )} */}
              </motion.div>
            </div>
          </div>
          <div className="flex w-full relative min-h-px content-center items-center max-w-full lg:max-w-[50%]">
            <div className="flex flex-col content-center items-center relative w-full">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full text-center relative"
              >
                {pageData.hireDadiated.image ? (
                  <Image
                    src={pageData.hireDadiated.image}
                    alt={pageData.hireDadiated.title}
                    width={343}
                    height={334}
                    className="w-full h-auto drop-shadow-lg inline-block align-middle"
                  />
                ) : (
                  <div className="w-full h-85.75 bg-gray-200 rounded-lg animate-pulse"></div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* section5: Or experties */}
      <section className="w-full relative py-12.5 bg-[#fff9f2] overflow-x-hidden z-10">
        <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex relative">
          <div className="flex w-full relative min-h-px">
            <div className="w-full flex flex-wrap content-start relative ">
              <div className="text-center pb-10 mb-2.5 w-full">
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: -70 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                  >
                    <h2 className="text-center w-full common-h2 text-black ">
                      Our Expertise
                    </h2>
                    <Motion />
                  </motion.div>
                </div>
              </div>
              <section className="w-full mt-0 md:mt-7 relative ">
                {/* Responsive Grid for Expertise Cards */}
                {pageData?.ourExpertise?.keyPoints && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 w-full">
                    {pageData.ourExpertise.keyPoints.map((item, index) => {
                      const isLeftGroup = Math.floor(index / 2) % 2 === 0;
                      return (
                        <motion.div
                          key={index}
                          className="bg-white p-6 rounded-[3px] border-b-[3px] border-b-[#d68029] flex justify-between flex-col"
                          initial={{ opacity: 0, x: isLeftGroup ? -80 : 80 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            // Stagger items within each pair
                            delay: (index % 2) * 0.1,
                          }}
                        >
                          <h4 className="text-5xl font-bold text-transparent  font-poppins  [-webkit-text-stroke:2px_#FFB061] mb-4">
                            {String(index + 1).padStart(2, "0")}
                          </h4>
                          <p className="text-black text-xl font-semibold leading-snug">
                            {item}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Talk to Expert Button */}
              </section>
              <div className="w-full text-center mt-7.5 md:mt-15">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  className="bg-[#12203d] relative inline-flex items-center justify-center w-max overflow-hidden text-white rounded-xl group"
                >
                  <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D68029] rounded group-hover:w-full group-hover:h-full"></span>
                  <a
                    href="#contact-form-section"
                    className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold"
                  >
                    <span className="flex flex-row gap-3 justify-center">
                      Talk to our{" "}
                      {pageData.title
                        .replace(/^Hire\s*/, "")
                        .replace(/Developers?$/i, "")
                        .trim()}{" "}
                      Expert
                      <Image
                        src="/navbar/btn_icon.png"
                        alt="Get a Quote Arrow"
                        width={20}
                        height={20}
                        className="rotate-90"
                      />
                    </span>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* section 6 tech stack */}
      <section className="relative  py-12.5 mx-auto w-full z-20 common_background_gradient z-10 bg-white">
        <div className="w-full max-w-[90%] lg:max-w-[80%] flex flex-col relative mx-auto">
          {/* 🔽 Background gradient */}

          {/* 🔼 Foreground content */}
          <div className=" flex w-full max-w-full md:max-w-[66.23%] relative min-h-px  ">
            <div className="flex flex-col content-center items-center relative w-full">
              <motion.div
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-6 text-left w-full common_htags left_htags"
              >
                <h2 className=" relative common-h2 text-black">
                  {pageData.techStack.title}
                </h2>
              </motion.div>
              <div className="w-full relative">
                {/* {pageData.techStack.description && ( */}
                <div
                  className="prose max-w-none text-lg font-normal text-[#6f6f6f] leading-8 tracking-wide
                                            [&_p]:mb-4   [&_a]:text-[#d68029] [&_a]:no-underline [&_a:hover]:underline"
                  dangerouslySetInnerHTML={{
                    __html: pageData?.techStack?.description || "",
                  }}
                />
                {/* )} */}
              </div>
            </div>
          </div>
          {/* ✅ Cards Grid */}

          {(() => {
            // find all unique sections in details
            const sections = [
              ...new Set(
                pageData.techStack.details.map(
                  (d: TechStackDetail) => d.section,
                ),
              ),
            ].sort((a, b) => a - b);

            return (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 relative items-start z-20"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
              >
                {sections.map((sectionNum: number) => {
                  const sectionItems = pageData.techStack.details.filter(
                    (tool: TechStackDetail) => tool.section === sectionNum,
                  );
                  return (
                    <div key={sectionNum} className="flex flex-col gap-6">
                      {sectionItems.map(
                        (toolCategory: TechStackDetail, idx: number) => (
                          <div
                            key={`${sectionNum}-${idx}`}
                            className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 h-auto"
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
                                    />
                                    <span>{item}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  );
                })}
              </motion.div>
            );
          })()}
        </div>
      </section>
      {/* section 7 : why hire from its ? */}
      <section className="w-full  relative py-12.5 z-10 bg-white">
        <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex relative">
          <div className="flex w-full relative min-h-px">
            <div className="w-full flex flex-wrap content-start relative ">
              <div className="text-center pb-10 mb-2.5 w-full">
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                  >
                    <h2 className="text-center w-full  text-black common-h2 ">
                      {pageData.whyHireUs.title}
                    </h2>
                    <Motion />
                  </motion.div>
                </div>
              </div>
              <section className="w-full z-20 relative hire_wordpress_its_inner_sec">
                <div className="grid w-full relative grid-cols-1 lg:grid-cols-2 z-20  mx-auto gap-8">
                  {pageData.whyHireUs.details.map((item, index) => {
                    let bgColorClass = "";
                    if (index === 0 || index === 3) {
                      bgColorClass = "bg-[#ffebeb]"; // Color for 1st and 4th items
                    } else if (index === 1 || index === 2) {
                      bgColorClass = "bg-[#f3f1ff]"; // Color for 2nd and 3rd items
                    }
                    return (
                      <motion.div
                        className={`w-full h-full rounded-[20px] p-3.75 lg:p-7.5
    shadow-[0_0_10.3px_0_#00000040]
    ${bgColorClass}`}
                        key={index}
                        whileHover={{ scale: 0.9 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="flex flex-col h-full">
                          <div className="mb-5">
                            <h4 className="text-[25px] text-[#12203d] font-medium break-words">
                              {item.title}
                            </h4>
                          </div>

                          <div className="flex-1">
                            <div
                              className="md:text-lg prose max-w-none text-lg font-normal text-[#6f6f6f] leading-8 tracking-wide [&_a]:text-[#d68029] [&_a]:no-underline [&_a:hover]:underline"
                              dangerouslySetInnerHTML={{
                                __html: item?.description || "",
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* section 8 : unloack power  */}
      <section className="relative w-full py-12.5 z-10 bg-white">
        <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex gap-8 flex-col  relative lg:flex-row">
          <div className="flex w-full relative min-h-px content-center items-center max-w-full lg:max-w-[50%]">
            <div className="flex flex-col  content-center items-center relative w-full">
              <motion.div
                animate={{ x: [0, 20, -20, 0] }} // toggle movement
                transition={{
                  duration: 0.4,
                  repeat: 20, // total animation time = 1s
                  ease: "easeInOut",
                }}
                className="w-full text-center relative"
              >
                {pageData.unloackPower.image ? (
                  <Image
                    src={pageData.unloackPower.image}
                    alt={pageData.unloackPower.title}
                    width={447}
                    height={333}
                    className="w-full h-auto drop-shadow-lg inline-block align-middle"
                  />
                ) : (
                  <div className="w-full h-85.75 bg-gray-200 rounded-lg animate-pulse"></div>
                )}
              </motion.div>
            </div>
          </div>
          <div className="flex w-full relative min-h-px max-w-full lg:max-w-[50%]">
            <div className="flex flex-col content-center items-center relative w-full">
              <motion.div
                initial={{ opacity: 0, y: -60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-6 text-left w-full common_htags left_htags"
              >
                <h2 className="common-h2 relative   text-black">
                  {pageData.unloackPower.title}
                </h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full relative"
              >
                {/* {pageData.unloackPower.description && ( */}
                <div
                  className="prose max-w-none text-lg font-normal text-[#6f6f6f] leading-8 tracking-wide
                                                [&_p]:mb-4 [&_p:last-child]:mb-0 [&_a]:text-[#d68029] [&_a]:no-underline [&_a:hover]:underline"
                  dangerouslySetInnerHTML={{
                    __html: pageData?.unloackPower?.description || "",
                  }}
                />
                {/* )} */}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* section 9 : hire progress */}
      <section className="relative w-full bg-[#f8f8f8] py-12.5 z-10">
        <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex flex-col">
          {/* Section Title */}
          <div className="text-center pb-10 mb-2.5 w-full">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <h2 className="text-center w-full text-black common-h2">
                {pageData.title.replace(/^Hire\s*/, "").trim()} 4 steps hiring
                process
              </h2>
              <Motion />
            </motion.div>
          </div>

          {/* Hiring Process Timeline */}
          <div className="relative w-full">
            {/* The flex container for the 4 steps */}
            <div className="flex flex-col md:flex-row justify-between relative">
              {pageData.hireingProcess.steps.map((step, index) => {
                // Assign classes based on position for the CSS to target
                const positionClass =
                  index === 0
                    ? "first_item"
                    : index === pageData.hireingProcess.steps.length - 1
                      ? "last_item"
                      : "middle_item";

                // Array of images - make sure these paths are correct in your /public folder
                const images = [
                  "/hire/3-31.png",
                  "/hire/4-31.png",
                  "/hire/1-32.png",
                  "/hire/2-31.png",
                ];

                return (
                  <motion.div
                    initial={{ opacity: 0, x: -90 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    // 2. Remove the staggered delay so they animate at the same time
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    key={index}
                    className={`w-full md:w-1/4   flex flex-col items-center process_image_box_block  ${index == 0 ? "first_item" : index == 1 || index == 2 ? "middle_item" : "last_item"} `}
                  >
                    <div
                      className={` elementor-image-box-wrapper   relative  text-center w-full pb-12.5 md:pb-0 mb-8 md:mb-0`}
                    >
                      <div
                        className={`elementor-image-box-img  flex justify-center md:justify-start  relative pb-4 mb-4 ${positionClass}`}
                      >
                        <Image
                          src={images[index]}
                          alt={step}
                          width={111}
                          height={139}
                          className="inline-block"
                        />
                      </div>
                      <div className="box-border text-center ">
                        <h3 className="text-black mx-auto w-full max-w-[90%] md:max-w-[60%] text-lg mb-4  font-semibold">
                          {step}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* section : 10 Tecnology taht we work with  */}
      <ParallaxShape type="bottom" bg="bg-[#f8f8f8]" />
      <TechnologyTabs />
      <ParallaxShape type="top" />

      {/* section 11: faq question */}
      <section className="relative w-full py-12.5 bg-white z-10">
        <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex gap-8 flex-col  relative  ">
          <div className="flex flex-wrap  w-full relative content-start">
            <div className="text-center pb-10 mb-2.5 w-full">
              <h2 className="text-center w-full text-black common-h2">
                Frequently Asked Questions (FAQ)
              </h2>
              <Motion />
            </div>
            <section className="w-full mt-7.5 relative  ">
              <div className="w-full gap-8 box-border relative flex flex-col lg:flex-row mx-auto">
                <div className="w-full max-w-full lg:max-w-[29.99%] flex  relative min-h-px">
                  <div className="flex items-start content-start w-full flex-wrap top-[13%] z-10 h-fit sticky ">
                    <div className="mb-5">
                      <h6 className="text-xl text-[#d68029] font-semibold">
                        Do you have more questions?
                      </h6>
                    </div>
                    <div className="w-full relative mb-5">
                      <h2 className="font-semibold text-4xl xl:text-[45px] leading-10 xl:leading-12.5 ">
                        We are here to Answer you...
                      </h2>
                    </div>
                    <div className="w-full text-center flex justify-start ">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay: 0.1,
                        }}
                        className="bg-[#12203d] relative inline-flex items-center justify-center w-max overflow-hidden text-white rounded-xl group"
                      >
                        <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D68029] rounded group-hover:w-full group-hover:h-full"></span>
                        <a
                          href="/faqs"
                          className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold"
                        >
                          <span className="flex flex-row gap-3  items-center justify-center">
                            Explore More
                            <Image
                              src="/navbar/btn_icon.png"
                              alt="Get a Quote Arrow"
                              width={20}
                              height={20}
                            />
                          </span>
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-full lg:max-w-[70%] flex relative min-h-px">
                  <div className="flex w-full content-start relative flex-wrap">
                    <div className="w-full text-start box-border relative">
                      {pageData.faq.length > 0 &&
                        pageData.faq.map((item, index) => {
                          const isOpen = activeIndex === index;
                          return (
                            <div
                              key={index}
                              className="mb-5 w-full rounded-lg bg-white p-2.5 shadow-[0_0_9px_0px_rgba(0,0,0,0.25)] border border-[#d5d8dc] box-border  "
                            >
                              <div
                                className="cursor-pointer py-4 px-5 box-border w-full  flex items-center justify-between font-bold"
                                onClick={() => toggleAccordion(index)}
                              >
                                <span className="font-medium w-full text-[20px] text-black">
                                  {item.question}
                                </span>
                                <span className="w-[1.5em] inline-block">
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
                                    <div className="block px-5 py-4 text-[#7a7a7a] text-md">
                                      <div
                                        className="prose max-w-none font-normal text-[#6f6f6f] [&_a]:text-[#d68029] [&_a]:no-underline [&_a:hover]:underline"
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
            </section>
          </div>
        </div>
      </section>
      <RelatedBlogs subCategory={matchCatgeory} />
    </main>
  );
}
