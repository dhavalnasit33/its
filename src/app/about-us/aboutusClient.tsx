

"use client";

import Image from "next/image";
import { LuListTodo } from "react-icons/lu";
import { FaLightbulb, FaStar } from "react-icons/fa";
import { easeInOut, motion } from "framer-motion";
import { HiOutlineUser } from "react-icons/hi";
import { useCallback, useEffect, useState } from "react";
import { AboutUs, SingleResponse, WhyChooseItem } from "@/types";
import apiService from "@/lib/apiService";
import dynamic from "next/dynamic";
import Motion from "@/components/motionbar";
// import TechnologyTabs from "../../components/home/TechnologySection";

const WhyChoosePremium = dynamic(() => import("@/components/home/WhyChoosePremium"), { ssr: false });
const GlobalPresenceAndIndustriesSection = dynamic(() => import("@/components/new-home-components/GlobalPresenceAndIndustriesSection"), { ssr: false });
const Reviews = dynamic(() => import("@/components/home/Reviews"), { ssr: false });
const TechnologyShowcase = dynamic(()=>import("@/components/home/TechnologyShowcase"), { ssr: false });

// import Industries from "@/components/home/Industries";
import Testimonials from "@/components/home/Testimonials";
import NotFoundPage from "@/components/NotFoundPage";

// import { Metadata } from "next";
// import { getSeoData } from "@/lib/seoService";
import ParallaxShape from "@/components/home/ParallaxShape";
import Section from "@/components/Section";
import Row from "@/components/Row";
// import Button from "@/components/Button";
// import { FaEye } from "react-icons/fa6";
// import { BiBarChart } from "react-icons/bi";
// import { FiTarget } from "react-icons/fi";
import PlatformSlider from "@/components/home/PlatformSlider";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";

import "swiper/css";
import UnderConstructionPage from "@/components/UnderConstruction";
import StatsGrid from "@/components/home/RoundStatsCard";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";


interface AboutUsClientProps {
  title: string;
  initialData?: AboutUs | null;
}



const marqueeStyles = `
  @keyframes marqueeCountries {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .animate-marquee-countries {
    display: flex;
    width: max-content;
    animation: marqueeCountries 30s linear infinite;
  }

  .animate-marquee-countries:hover {
    animation-play-state: paused;
  }
`;


// export default function AboutClient() {
export default function AboutUsClient({ title, initialData }: AboutUsClientProps) {
  // const floatAnimation = {
  //   initial: { x: 0 },
  //   animate: { x: [5, -5, 5], y: [5, -5, 5] },
  //   transition: { duration: 4, repeat: Infinity, ease: easeInOut, delay: 0.5 },
  // };
  const renderStars = (rating: number) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FaStar
        key={i}
        className={i <= rating ? "text-yellow-400" : "text-gray-300"}
      />
    );
  }

  return stars;
};

  const [gettngAboutUsData, setGettngAboutUsData] = useState(!initialData);
  const [aboutUsData, setAboutUsData] = useState<AboutUs | null>(initialData || null);
  const [whyChooseData, setWhyChooseData] = useState<WhyChooseItem[]>([]);
  const { navStructure } = useWebsiteSettings();
  const fetchAboutUsData = useCallback(async () => {
    setGettngAboutUsData(true);
    try {
      const response = await apiService<SingleResponse<AboutUs>>("/about-us");
      if (response.success) {
        setAboutUsData(response.data || null);
      } else {
        console.log("Failed to fetch About Us data:", response.message);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setGettngAboutUsData(false);
    }
  }, []);

  useEffect(() => {
    if (initialData) {
      setAboutUsData(initialData);
      setGettngAboutUsData(false);
    } else {
      fetchAboutUsData();
    }

    const fetchWhyChoose = async () => {
      try {
        const res = await apiService<SingleResponse<WhyChooseItem[]>>("/choose_its_home");
        if (res.success) setWhyChooseData(res.data || []);
      } catch (err) {
        console.error("Error fetching WhyChoose data:", err);
      }
    };
    fetchWhyChoose();
  }, [fetchAboutUsData, initialData]);

  console.log("Hero Section:", aboutUsData?.heroSection);
  
  const marqueeCountries = [
  ...(aboutUsData?.flags?.flagsDetails || []),
  ...(aboutUsData?.flags?.flagsDetails || []),
];

const services = navStructure?.servicesNav?.flatMap((category) =>
		category.links?.map((service) => ({
			title: service.title,
			slug: service.slug,
		})) || []
		) || [];

  if (gettngAboutUsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D68029]"></div> */}
          <Image
            src="/LoderIcon.png" // place image in public folder
            alt="Loading"
            width={80}
            height={80}
          />
        </div>
    );
  }

  if (!aboutUsData) {
    return (
      // <div className="min-h-screen flex items-center justify-center">
      //   <NotFoundPage />
      // </div>
      <UnderConstructionPage />
    );
  }
 

  return (
    <>
      {/* SECTION 1: ABOUT US HERO */}
      <Section className="relative w-full items-center justify-center gap-10 common_background_gradient bg-white z-1  md:pb-44! ">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/aboutus/banner-bg.png"
            alt=""
            fill
            className="object-cover opacity-10"
          />
        </div>

        {/* Left Content */}
        <Row>
        <div className="w-full z-10   text-center lg:max-w-5xl mx-auto">
          {/* Heading (top → bottom) */}
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="rose text-5xl md:text-6xl lg:text-[52px]/[130%]  font-bold tracking-[-0.03em] leading-[1.08]  "
          >
            {/* <h1 className="text-3xl sm:text-4xl md:text-[46px] leading-snug font-semibold"> */}
              {aboutUsData.heroSection.title}
            {/* </h1> */}
          </motion.h1>
           <motion.h2
                    initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rose text-4xl md:text-[42px]  lg:text-[46px]/[130%]  font-bold tracking-[-0.03em] leading-[1.08]  "
            dangerouslySetInnerHTML={{ __html: aboutUsData?.heroSection?.subtitle.replace(/<\/?h[1-6][^>]*>/gm, "") || "" }}
          />

          {/* Paragraph (bottom → top) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mb-12 w-full mt-4"
          >
            <div className="text-[#6f6f6f] text-base sm:text-lg md:text-[18px] font-medium leading-7 sm:leading-8 "
              // {aboutUsData.heroSection.description}
              dangerouslySetInnerHTML={{ __html: aboutUsData?.heroSection?.description  || "", }}
            />
          </motion.div>
  
        {/* <div className="max-auto w-full lg:max-w-xl"> */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}>
          <ul className="inline-flex flex-wrap sm:flex-row  items-center justify-center bg-white shadow-md rounded-2xl md:rounded-full px-6 py-4  text-center  text-md md:text-lg">
            <li className="text-gray-700 font-medium flex ">
              Global Clients <span className="  text-[#d68029] px-3"> | </span>
            </li>


            <li className="text-gray-700 font-medium flex">
              Transparent Processes<span className=" text-[#d68029] px-3"> | </span>
            </li>

            <li className="text-gray-700 font-medium">
              100% Client Satisfaction
            </li>
          </ul>
        </motion.div>

        </div>
        </Row>
       
      </Section>
       {/* <section className="relative z-10 -mb-40 bg-white z-1" > */}
       <Section className="relative z-10 bg-white md:pb-6! transition-[background,border,border-radius,box-shadow] duration-300 overflow-visible ">
	        <Row>
						<motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.5, 
                ease: "easeOut",
              }} 
              
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-[540px]:grid-cols-1 md:-mt-42.5 xl:-mt-45 max-w-187.5! mx-auto">
						{aboutUsData?.heroSection?.ratings.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.15)] flex flex-col justify-center items-center"
              >
            <p className="text-[16px] font-medium">
              Rating {item.rating}/5
            </p>
              <div className="flex items-center gap-1 mt-2 mb-6">
              {renderStars(item.rating)}
            </div>

                <Image
                  src={item.image}
                  alt={item.image}
                  width={180}
                  height={50}
                  className="object-contain w-34 h-10"
                />
              </div>
            ))}
						</motion.div>
					</Row>
        </Section>
    
    

    {/* section: 2 why infotech */}
    <Section className=" bg-white z-10">
      <Row >

        {/* Heading */}
        <div className="w-full md:max-w-3xl">
          <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 content-start common_htags left_htags"
          >
          <h2 className=" w-full common-h2 text-black   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
            dangerouslySetInnerHTML={{
                __html: aboutUsData?.whyCompany?.title.replace(/<\/?h[1-6][^>]*>/gm, "") || "",
            }}/>
          </motion.div>
      
          <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-gray-600 text-lg leading-8"
              dangerouslySetInnerHTML={{
                __html: aboutUsData?.whyCompany?.description || "",
            }}/>
          {/* </motion.p> */}
        </div>

        {/* Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10 md:mt-16">

          {aboutUsData?.whyCompany?.companyDetails?.map((item, index) => (
            <div
            key={index}
              className="group relative overflow-hidden rounded-2xl border  border-gray-200  bg-white  p-6 sm:p-8 transition-all duration-300  hover:shadow-lg "
            >
              <div className=" absolute top-0 left-0 h-1 w-0  bg-[#d68029]  transition-all duration-500  ease-out group-hover:w-full "/>
              <div className=" mb-8 ">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={64}
  height={64}
                  className="w-16 h-16 object-contain "
                />
              </div>

              <h4 className="text-2xl font-bold mb-2">
                {item.title}
              </h4>

              <p className="text-gray-600 fonts_16 "
                dangerouslySetInnerHTML={{
                __html:
                    item.description.replace(/<[^>]*>/g, "") || "",
            }}/>
              {/* </p> */}
            </div>
          ))}

        </motion.div>
      </Row>
    </Section>
        


        {/* reasons choose section */}
        <Section  className="bg-[#0d1b2a] z-10 py-6! ">
				<Row>
					<PlatformSlider items={services}/>
				</Row>
			</Section>
      <Section className="bg-gray-50 py-14!">
					 <Row className=" mx-auto ">
					 	<StatsGrid  columns={4} bordered />
					</Row>
			</Section>
    
{/* section: 4 years */}
  <Section  className="bg-white z-10 scroll-mt-10">
				<Row className="flex gap-10 flex-col-reverse relative lg:flex-row ">
					
					{/* LEFT SIDE */}

					<div className="flex  flex-col w-full relative min-h-px max-w-full lg:max-w-[50%] ">
            <Image
              src="/aboutus/counts.png"
              alt="count"
               width={250}
                height={250}
                className="mb-8 "
                
            />
            
             <motion.div
                initial={{ opacity: 0, y: -60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className=" mb-6 content-start common_htags left_htags"
               >
              <h2 className="common-h2"  
                dangerouslySetInnerHTML={{
                  __html:
                      aboutUsData?.goals?.goalsDetails?.title.replace(/<\/?h[1-6][^>]*>/gm, "") || "",
                }}
              />
            </motion.div>
            <motion.div
            initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-[#6f6f6f] text-base sm:text-lg md:text-[18px] font-medium leading-7 sm:leading-8 mb-2 [&_p]:mb-4 [&_p:last-child]:mb-0 rose" 
                dangerouslySetInnerHTML={{
                __html:
                    aboutUsData?.goals?.goalsDetails?.description.replace(/<[^>]*>/g, "") || "",
            }}
            >
           </motion.div>
          </div>

          <div className=" w-full relative min-h-px max-w-full lg:max-w-[50%]">


          <div className="mb-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }} 
              className="h-full bg-white rounded-[20px] p-6 shadow-[0_0_20px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col justify-between
              transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
              <div>
                <div className="w-18 h-18 rounded-2xl flex items-center justify-center mb-6 bg-orange-100">
                  {/* <FiTarget className="w-7 h-7 text-blue-600" /> */}
                   {aboutUsData?.goals?.missionImage && (
                      <Image
                        src={aboutUsData.goals.missionImage}
                        alt="Mission icon"
                        width={47}
                        height={47}
                      />
                    )}
                </div>

                <h4 className="common-h2-small mb-4">
                 {aboutUsData?.goals?.missionTitle}
                </h4>

                {/* <p className=" text-lg font-normal text-[#6f6f6f] leading-8 tracking-wide   [&_p]:mb-4 ">
                  To give every startup the same engineering
                  quality as a top-tier agency — without
                  the bloated cost or 9-month timeline.
                </p> */}
                <p className="text-[#6f6f6f] text_16  "
                      dangerouslySetInnerHTML={{ __html: aboutUsData?.goals?.missionDescription  || "" }}
                    />
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-4 py-1 border-gray-300 text-[#6f6f6f]  rounded-full border">
                  Coding
                </span>

                <span className="px-4 py-1 border-gray-300 text-[#6f6f6f]  rounded-full border">
                  Design
                </span>

                <span className="px-4 py-1 border-gray-300 text-[#6f6f6f]  rounded-full border">
                  Strategy
                </span>

                <span className="px-4 py-1 border-[#d68029] rounded-full border bg-[#d68029]  text-white flex gap-2 items-center">
                  Launch
                  <Image 
                      src="/navbar/btn_icon.png"
                      alt="btn-icon"
                      width={14}
                      height={14}
                      className="object-contain"/>
                </span>
              </div>

            </motion.div>
          </div>
          {/* RIGHT COLUMN */}
            <motion.div
             initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                //  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="grid md:grid-cols-2 gap-6">

              {/* Vision */}
              <div className="bg-white rounded-[20px] p-6 shadow-[0_0_20px_rgba(0,0,0,0.15)] border border-gray-100 transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] ">

                <div className="w-18 h-18 rounded-2xl flex items-center justify-center mb-6 bg-orange-100">
                  {/* <FaEye className="w-7 h-7 text-indigo-600" /> */}
                   {aboutUsData?.goals?.visionImage && (
                      <Image
                        src={aboutUsData.goals.visionImage}
                        alt="Vision icon"
                        width={47}
                        height={47}
                      />
                    )}
                </div>

                <h4 className="common-h2-small mb-4">
                  {aboutUsData?.goals?.visionTitle}
                </h4>

                <p className="text_16 text-[#6f6f6f]   [&_p]:mb-4"   
                  dangerouslySetInnerHTML={{ __html: aboutUsData?.goals?.visionDescription  || "" }}
                />

              </div>

              {/* Values */}
              <div
                className="bg-white rounded-[20px] p-6 shadow-[0_0_20px_rgba(0,0,0,0.15)]  border border-gray-100 transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                <div className="w-18 h-18 rounded-2xl flex items-center justify-center mb-6 bg-orange-100">
                  {aboutUsData?.goals?.valuesImage && (
                      <Image
                        src={aboutUsData.goals.valuesImage}
                        alt="Values icon"
                        width={47}
                        height={47}
                      />
                    )}
                </div>

                <h4 className="common-h2-small mb-4">
                  {aboutUsData?.goals?.valuesTitle}
                </h4>
                <div className="text_16 text-[#6f6f6f]   "   
                  dangerouslySetInnerHTML={{ __html: aboutUsData?.goals?.valuesDescription  || "" }}
                />
              </div>

            </motion.div>
      </div>
				</Row>

			</Section>


      {/* <Section className="py-16  relative bg-white z-10">
        <Row>
            <motion.div 
              initial={{ opacity: 0, y: -70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
               className="flex flex-col items-center w-full justify-center text-center mb-10">
              <h2 className="common-h2 text-gray-900 relative">
                Just Know About Our Goals
              </h2>
              <Motion />
            </motion.div>

          <div className="mb-8">
            <motion.div
                           initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                transition={{ duration: 0.6, ease: "easeOut" }} 
            className="h-full bg-white rounded-[20px] p-8 shadow-[0_0_20px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col justify-between">

              <div>
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 bg-orange-100">
                   {aboutUsData?.goals?.missionImage && (
                      <Image
                        src={aboutUsData.goals.missionImage}
                        alt="Mission icon"
                        width={47}
                        height={47}
                      />
                    )}
                </div>

                <h4 className="common-h2-small mb-4">
                 {aboutUsData?.goals?.missionTitle}
                </h4>
                <p className="text-[#6f6f6f] text-base sm:text-lg"
                      dangerouslySetInnerHTML={{ __html: aboutUsData?.goals?.missionDescription  || "" }}
                    />
              </div>

              <div className="flex flex-wrap gap-3 mt-16">
                <span className="px-4 py-1 border-gray-300 text-[#6f6f6f]  rounded-full border">
                  Coding
                </span>

                <span className="px-4 py-1 border-gray-300 text-[#6f6f6f]  rounded-full border">
                  Design
                </span>

                <span className="px-4 py-1 border-gray-300 text-[#6f6f6f]  rounded-full border">
                  Strategy
                </span>

                <span className="px-4 py-1 border-[#d68029] text-[#6f6f6f]  rounded-full border bg-[#d68029]  text-white flex gap-2 items-center">
                  Launch
                  <Image 
                      src="/navbar/btn_icon.png"
                      alt="btn-icon"
                      width={10}
                      height={10}
                      className="w-[16px] h-[16px] object-contain"/>
                </span>
              </div>

            </motion.div>
          </div>
            <motion.div
             initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                 whileHover={{ y: -10, transition: { duration: 0.3 } }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="grid md:grid-cols-2 gap-8">

              <div className="bg-white rounded-[20px] p-8 shadow-[0_0_20px_rgba(0,0,0,0.15)] border border-gray-100">

                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 bg-orange-100  ">
                   {aboutUsData?.goals?.visionImage && (
                      <Image
                        src={aboutUsData.goals.visionImage}
                        alt="Vision icon"
                        width={47}
                        height={47}
                      />
                    )}
                </div>

                <h4 className="common-h2-small mb-4">
                  {aboutUsData?.goals?.visionTitle}
                </h4>

                <p className="text-lg font-normal text-[#6f6f6f] leading-8 tracking-wide   [&_p]:mb-4">
                 {aboutUsData?.goals?.visionDescription}
                </p>

              </div>

              <div
                className="bg-white rounded-[20px] p-8 shadow-[0_0_20px_rgba(0,0,0,0.15)]  border border-gray-100">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 bg-orange-100">
                  {aboutUsData?.goals?.valuesImage && (
                      <Image
                        src={aboutUsData.goals.valuesImage}
                        alt="Values icon"
                        width={47}
                        height={47}
                      />
                    )}
                </div>

                <h4 className="common-h2-small mb-4">
                  {aboutUsData?.goals?.valuesTitle}
                </h4>

                <p className="text-lg font-normal text-[#6f6f6f] leading-8 tracking-wide   [&_p]:mb-4">
                  {aboutUsData?.goals?.valuesDescription}
                </p>

              </div>

            </motion.div>
      </Row>
    </Section> */}



          {/* flags slider section */}
    <Section className="relative bg-white overflow-hidden py-16 lg:pb-0!">
      <style dangerouslySetInnerHTML={{ __html: marqueeStyles }} />

      <Row>
        <div className="flex flex-col items-center w-full justify-center text-center mb-10">
           <motion.h2
              initial={{ opacity: 0, y: -70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.3,
              }}
            className="common-h2 text-black pb-4 "
            dangerouslySetInnerHTML={{ __html: aboutUsData?.flags?.title.replace(/<\/?h[1-6][^>]*>/gm, "") || "" }}
          />
          <Motion />
        </div>
      </Row>

      <div className="relative w-full overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-white to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-white to-transparent z-20 pointer-events-none" />

        <div className="animate-marquee-countries gap-8 px-4">

          {marqueeCountries.map((country, index) => (
            <div
              key={`${country.title}-${index}`}
              className="
                flex flex-col gap-2 items-center justify-center
                h-36
                w-52.5
                shrink-0
                rounded-[13px]
                bg-white
                shadow-[0px_4px_15px_rgba(0,0,0,0.08)]
                transition-all duration-300
                hover:shadow-lg
              "
            >
              <h5 className="text-md font-medium whitespace-nowrap mb-1">
                {country.title}
              </h5>

              <Image
                src={country.image}
                alt={country.title}
                width={130}
                height={52}
                className="rounded-sm object-cover" 
              />
            </div>
          ))}

        </div>
      </div>
    </Section>


      <ParallaxShape type="bottom" />
      {/* <TechnologyTabs /> */}
      {/* <ParallaxShape type="top"  bg="bg-[#0d1b2a]"/> */}

      {/* <section className="bg-[rgba(255,255,255,0.08)] relative -mb-1 ">
				<span className="clipped-top bg-white h-[150px] w-full none lg:block rounded-tl-[100px] rounded-tr-[100px]" />
			</section> */}
      
      {/* <Industries /> */}
      <TechnologyShowcase/>
      <WhyChoosePremium items={whyChooseData} />
      <GlobalPresenceAndIndustriesSection />
     <Reviews/>
      <Testimonials />
    </>
  );
}
