// "use client";

// import HireFormSection from "@/components/hire/HireForm";
// import Motion from "@/components/motionbar";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState, useRef, useCallback, useEffect } from "react";
// import { FaCheck } from "react-icons/fa";
// import { FaPlus, FaMinus } from "react-icons/fa";
// import HireTabs from "@/components/hire/HireTabs";
// import dynamic from "next/dynamic";
// import RelatedBlogs from "@/components/blog/RelatedBlogs";
// import { HireMainPageData, SingleResponse } from "@/types";
// import apiService from "@/lib/apiService";
// import NotFoundPage from "@/components/NotFoundPage";

// export default function HireDevelopersPageClient() {
//     const [activeIndex, setActiveIndex] = useState<number | null>(0);

//     const faqRef = useRef<HTMLElement>(null);

//     const scrollToFAQ = () => {
//         faqRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     };

//     const toggleAccordion = (index: number) => {
//         setActiveIndex(activeIndex === index ? null : index);
//     };

//     const [gettingHireMainPageData, setGettingHireMainPageData] = useState(true);
//     const [hireMainPageData, setHireMainPageData] =
//         useState<HireMainPageData | null>(null);

//     const fetchHireMainPageContent = useCallback(async () => {
//         setGettingHireMainPageData(true);
//         try {
//             const responce = await apiService<SingleResponse<HireMainPageData>>(
//                 "/hire-main-page"
//             );
//             if (responce.success) {
//                 setHireMainPageData(responce.data);
//             } else {
//                 console.error(responce.message);
//             }
//         } catch (error: any) {
//             console.error(error.message);
//         } finally {
//             setGettingHireMainPageData(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchHireMainPageContent();
//     }, [fetchHireMainPageContent]);

//     if (gettingHireMainPageData) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d68029]"></div>
//             </div>
//         );
//     }

//     if (!hireMainPageData) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <NotFoundPage />
//             </div>
//         );
//     }






//     const getHighlightedTitle = () => {
//         const fullTitle = hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.title;
//         const techNameSingular = hireMainPageData.pricePathAndFAQ.title.replace(/^Hire\s*/, "");
//         const techNamePlural = techNameSingular + 's';

//         let termToHighlight = "";

//         if (fullTitle.includes(techNamePlural)) {
//             termToHighlight = techNamePlural;
//         } else if (fullTitle.includes(techNameSingular)) {
//             termToHighlight = techNameSingular;
//         }

//         if (termToHighlight) {
//             const parts = fullTitle.split(termToHighlight);
//             const partAfterHighlight = parts[1] || ""; // The part after the highlighted term
//             const breakPoint = "your";

//             // Check if we can split the remaining part to add a line break
//             if (partAfterHighlight.includes(breakPoint)) {
//                 const finalParts = partAfterHighlight.split(breakPoint);
//                 return (
//                     <>
//                         {parts[0]}
//                         <span className="text-[#d68029]">{termToHighlight}</span>
//                         {finalParts[0]}
//                         <br />
//                         {breakPoint}
//                         {finalParts[1]}
//                     </>
//                 );
//             }

//             // Fallback if "according" isn't in the title
//             return (
//                 <>
//                     {parts[0]}
//                     <span className="text-[#d68029]">{termToHighlight}</span>
//                     {parts[1]}
//                 </>
//             );
//         }

//         return fullTitle; // Return original title if no highlight term is found
//     };
//     // State to manage the active tab, defaulting to the first item's title
//     // const [activeTab, setActiveTab] = useState(hireData[0].title);

//     // Find the currently active tab's data
//     // const activeData = hireData.find(tab => tab.title === activeTab);
//     return (
//         <main className="w-full">
//             {/* section 1 : hero section */}
//             <section id="hero"
//                 className="relative py-12.5  common_background_gradient w-full">
//                 <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto relative flex  ">
//                     <div className="w-full flex flex-wrap p-2.5 content-start relative ">
//                         <section className="w-full relative">
//                             <div className="flex flex-col lg:flex-row items-center w-full  gap-8 mx-auto relative ">
//                                 <div className="w-full max-w-[90%] lg:max-w-[60%] flex relative min-h-px">
//                                     <div className="flex items-center content-center p-2.5 flex-wrap relative w-full ">
//                                         <motion.div
//                                             className="mb-2.5 w-full relative"
//                                             initial={{ opacity: 0, y: -30 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             transition={{
//                                                 duration: 0.6,
//                                                 ease: "easeOut",
//                                                 delay: 0.2,
//                                             }}
//                                         >
//                                             <div className="mb-2.5 w-full relative ">
//                                                 <h1 className="font-semibold  text-3xl sm:text-4xl md:text-[42px] xl:text-[46px] leading-[130%] tracking-[1.2px] relative  text-black ">
//                                                     {/* <span className="text-[#D68029]">Hire</span> Dedicated <br />
//                                                     Developers */}
//                                                     {hireMainPageData.mainTitle ? (
//                                                         <div
//                                                             className="  text-black rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
//                                                             dangerouslySetInnerHTML={{
//                                                                 __html: hireMainPageData.mainTitle,
//                                                             }}
//                                                         />
//                                                     ) : (
//                                                         hireMainPageData.mainTitle
//                                                     )}
//                                                 </h1>
//                                             </div>
//                                         </motion.div>
//                                         <motion.div
//                                             className="mb-5 relative w-full"
//                                             initial={{ opacity: 0, y: 20 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             transition={{
//                                                 duration: 0.8,
//                                                 ease: "easeOut",
//                                                 delay: 0.6,
//                                             }}
//                                         >
//                                             <div className="mb-5 relative w-full">
//                                                 <div className="mt-6 text-gray-600 leading-relaxed">
//                                                     {hireMainPageData.description ? (
//                                                         <div
//                                                             className="font-medium text-black rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
//                                                             dangerouslySetInnerHTML={{
//                                                                 __html: hireMainPageData.description,
//                                                             }}
//                                                         />
//                                                     ) : (
//                                                         hireMainPageData.description
//                                                     )}
//                                                     {/* Hire dedicated developers from ITS today and watch your business grow. When you hire from ITS, our developers become an integral part of your team. Each team member is carefully chosen based on the criteria and expertise you demand. They engage themselves in your project, adhering to your company’s culture and   achieving your strategic objectives. */}
//                                                 </div>
//                                             </div>
//                                         </motion.div>
//                                         {/* <div className="mb-5 mt-2.5 relative " >
//                                             <motion.div
//                                                 className="mb-5 mt-2.5 relative "
//                                                 initial={{ opacity: 0, y: 60 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
//                                             >
//                                                 <div className="relative hire_developers_list">
//                                                     <ul className="list-none">
//                                                         {
//                                                             pageData.keyPoints.map((item, index) => (
//                                                                 <li key={index} className="pl-9 relative mb-[14px] text-[18px] text-black font-normal">
//                                                                     {item}
//                                                                 </li>
//                                                             ))
//                                                         }
//                                                     </ul>
//                                                 </div>
//                                             </motion.div>
//                                         </div> */}
//                                         <div className="w-full relative">
//                                             {/* <motion.div
//                                                 className="mb-5 mt-2.5 relative "
//                                                 initial={{ opacity: 0, y: 20 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 transition={{
//                                                     duration: 1,
//                                                     ease: "easeOut",
//                                                     delay: 0.6,
//                                                 }}
//                                             >
//                                                 <a href="#hero">
//                                                     <button className="relative text-base gap-4 bg-[#d68029] hover:bg-[#12203d] transition-colors duration-300 cursor-pointer  text-white px-15 w-auto flex flex-row items-center py-2.5   ">
//                                                         Get Started Today!
//                                                         <Image
//                                                             src="/hire/Frame-2-4.png"
//                                                             alt="FRAME"
//                                                             width={30}
//                                                             height={30}
//                                                         />
//                                                     </button>
//                                                 </a>
//                                             </motion.div> */}
//                                             <motion.div
//                                                 initial={{ opacity: 0, y: 20 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 transition={{
//                                                     duration: 1,
//                                                     ease: "easeOut",
//                                                     delay: 0.6,
//                                                 }}
//                                                 className="bg-[#D68029] relative w-auto inline-flex items-center justify-center w-max overflow-hidden text-white  group"
//                                             >
//                                                 <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#12203d]  group-hover:w-full group-hover:h-full"></span>
//                                                 <a href="#hero"
//                                                     className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-2 sm:px-8 sm:py-4 cursor-pointer font-semibold">
//                                                     <span className="flex flex-row gap-3 items-center justify-center">
//                                                         Get Started Today!
//                                                         <Image
//                                                             src="/hire/Frame-2-4.png"
//                                                             alt="FRAME"
//                                                             width={30}
//                                                             height={30}
//                                                         />
//                                                     </span>
//                                                 </a>
//                                             </motion.div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <motion.div
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
//                                     className="w-full max-w-[90%] shadow-[0_0_80px_10px_#0000001a] lg:max-w-[40%] flex relative mx-auto   bg-white p-2.5 xl:p-7.5 min-h-px"
//                                 >
//                                     <HireFormSection />
//                                 </motion.div>
//                             </div>
//                         </section>

//                         {/* section 2 */}
//                     </div>
//                 </div>
//             </section>
//             <section className="w-full relative py-12.5  not-first:  ">
//                 <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex relative">
//                     <div className="flex w-full relative min-h-px">
//                         <div className="w-full flex flex-wrap p-2.5 content-start relative ">
//                             <div className="text-center pb-10 mb-2.5 w-full">
//                                 <div className="text-center">
//                                     <motion.div
//                                         initial={{ opacity: 0, y: -70 }}
//                                         whileInView={{ opacity: 1, y: 0 }}
//                                         viewport={{ once: true, amount: 0.3 }}
//                                         transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
//                                     >
//                                         <h2 className="text-center w-full font-bold text-black tracking-tight text-2xl  md:text-3xl lg:text-[40px]/[120%]  ">
//                                             {/* Hire Dedicated Web and Mobile  App Development Team */}
//                                             {hireMainPageData.developmentTeamSection.heading ? (
//                                                 <div
//                                                     className="font-medium   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
//                                                     dangerouslySetInnerHTML={{
//                                                         __html:
//                                                             hireMainPageData.developmentTeamSection.heading,
//                                                     }}
//                                                 />
//                                             ) : (
//                                                 hireMainPageData.developmentTeamSection.heading
//                                             )}
//                                         </h2>
//                                         <Motion />
//                                     </motion.div>
//                                 </div>
//                             </div>
//                             <div className="w-full  mx-auto flex gap-8 flex-col-reverse relative lg:flex-row">
//                                 <div className="flex w-full relative min-h-px max-w-full lg:max-w-[50%]">
//                                     <div className="flex flex-col p-2.5 content-center justify-center  items-center relative w-full">
//                                         <motion.div
//                                             initial={{ opacity: 0, y: 80 }}
//                                             whileInView={{ opacity: 1, y: 0 }}
//                                             viewport={{ once: true, amount: 0.3 }}
//                                             transition={{ duration: 0.6, ease: "easeOut" }}
//                                             className="w-full relative"
//                                         >
//                                             <div className="w-full flex flex-col mb-6 wrap-break-words text-base font-normal text-[#6f6f6f] leading-8 tracking-wide">
//                                                 {/* <p>
//                                                     Hiring a dedicated developer also allows you to scale up and down your  resources cost-effectively.
//                                                 </p>
//                                                 <p>
//                                                     Getting highly qualified and dedicated developers for hire is extremely challenging in today&apos;s times. But it won&apos;t be a headache for you because, at
//                                                     <span className="text-[#d68029] font-semibold"> ITS  </span>  , we use a specialised team outsourcing strategy that enables you to hire dedicated developers of different technologies easily, scaling them as required.
//                                                 </p>
//                                                 <p>
//                                                     You may avoid the stress of recruiting and managing these developers by hiring dedicated developers and teams from us, allowing you to focus on your core business in peace. Hiring a dedicated developer also allows you to scale up and down your resources cost-effectively.
//                                                 </p> */}
//                                                 {hireMainPageData.developmentTeamSection.description ? (
//                                                     <div
//                                                         className="font-medium   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
//                                                         dangerouslySetInnerHTML={{
//                                                             __html:
//                                                                 hireMainPageData.developmentTeamSection
//                                                                     .description,
//                                                         }}
//                                                     />
//                                                 ) : (
//                                                     hireMainPageData.developmentTeamSection.description
//                                                 )}
//                                             </div>
//                                         </motion.div>
//                                     </div>
//                                 </div>
//                                 <div className="flex w-full relative min-h-px content-center items-center max-w-full lg:max-w-[50%]">
//                                     <div className="flex flex-col p-2.5 content-center items-center relative w-full">
//                                         <motion.div
//                                             initial={{ opacity: 0 }}
//                                             whileInView={{ opacity: 1 }}
//                                             viewport={{ once: true, amount: 0.3 }}
//                                             transition={{ duration: 0.7, ease: "easeOut" }}
//                                             className="w-full text-center relative"
//                                         >
//                                             {hireMainPageData.developmentTeamSection.image ? (
//                                                 <Image
//                                                     src={hireMainPageData.developmentTeamSection.image}
//                                                     alt={"Web and Mobie App Development Team"}
//                                                     width={343}
//                                                     height={334}
//                                                     className="w-full h-auto drop-shadow-lg inline-block align-middle"
//                                                     priority
//                                                 />
//                                             ) : (
//                                                 <div className="w-full  bg-gray-200 rounded-lg animate-pulse">
//                                                     No image{" "}
//                                                 </div>
//                                             )}
//                                         </motion.div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             {/* section 3 Hire Dedicated Web and Mobile App Developers */}
//             <section className="w-full relative py-12.5 not-first:">
//                 <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex relative">
//                     <div className="w-full flex flex-wrap p-2.5 content-start relative">
//                         <div className="text-center pb-10 mb-2.5 w-full">
//                             <motion.div
//                                 initial={{ opacity: 0, y: -70 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 viewport={{ once: true, amount: 0.3 }}
//                                 transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
//                             >
//                                 <h2 className="text-center w-full font-bold text-black tracking-tight text-2xl  md:text-3xl lg:text-[40px]/[120%]  ">
//                                     {/* Hire Dedicated Web and Mobile App Developers */}
//                                     {hireMainPageData.dedicatedDeveloperSection.maintitle ? (
//                                         <div
//                                             className="font-medium   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
//                                             dangerouslySetInnerHTML={{
//                                                 __html:
//                                                     hireMainPageData.dedicatedDeveloperSection.maintitle,
//                                             }}
//                                         />
//                                     ) : (
//                                         hireMainPageData.dedicatedDeveloperSection.maintitle
//                                     )}
//                                 </h2>
//                                 <Motion />
//                             </motion.div>
//                         </div>

//                         {/* HERE IS THE CHANGE */}
//                         <HireTabs
//                             hireData={hireMainPageData.dedicatedDeveloperSection.services}
//                         />
//                     </div>
//                 </div>
//             </section>
//             {/* section 4 : why hire developer for your  fro project  */}
//             <section className="w-full relative py-12.5     ">
//                 <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex relative">
//                     <div className="flex w-full relative min-h-px">
//                         <div className="w-full flex flex-wrap p-2.5 content-start relative ">
//                             <div className="text-center pb-10 mb-2.5 w-full">
//                                 <div className="text-center">
//                                     <motion.div
//                                         initial={{ opacity: 0, y: -70 }}
//                                         whileInView={{ opacity: 1, y: 0 }}
//                                         viewport={{ once: true, amount: 0.3 }}
//                                         transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
//                                     >
//                                         <h2 className="text-center w-full font-bold text-black tracking-tight text-2xl  md:text-3xl lg:text-[40px]/[120%]  ">
//                                             {/* Why Hire Developers For Your Project? */}
//                                             {hireMainPageData.whyHireDeveloperforYourProject
//                                                 .mainTitle ? (
//                                                 <div
//                                                     className="   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
//                                                     dangerouslySetInnerHTML={{
//                                                         __html:
//                                                             hireMainPageData.whyHireDeveloperforYourProject
//                                                                 .mainTitle,
//                                                     }}
//                                                 />
//                                             ) : (
//                                                 hireMainPageData.whyHireDeveloperforYourProject
//                                                     .mainTitle
//                                             )}
//                                         </h2>
//                                         <Motion />
//                                     </motion.div>
//                                 </div>
//                             </div>
//                             <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//                                 {hireMainPageData.whyHireDeveloperforYourProject.detailBox.map(
//                                     (item, index) => (
//                                         <motion.div
//                                             key={index}
//                                             className="bg-white p-8 rounded-xl cursor-pointer  text-center flex flex-col items-center justify-center transition-shadow duration-300 shadow-[0_0px_7px_0px_rgba(0,0,0,0.25)]"
//                                             initial={{ opacity: 0, y: 50 }}
//                                             whileInView={{ opacity: 1, y: 0 }}
//                                             viewport={{ once: true, amount: 0.5 }}
//                                             transition={{ duration: 0.5, delay: index * 0.1 }}
//                                             whileHover={{ scale: 0.85 }}
//                                         >
//                                             <div className="bg-[#FEEFCF] rounded-full p-5 mb-5 inline-flex ">
//                                                 <Image
//                                                     src={item.image}
//                                                     alt={item.label}
//                                                     width={100}
//                                                     height={100}
//                                                     className="object-contain"
//                                                 />
//                                             </div>
//                                             <h3 className="font-semibold text-xl text-gray-800">
//                                                 {item.label}
//                                             </h3>
//                                         </motion.div>
//                                     )
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             {/* section 5 :   Why choose ITS for dedicated resources  */}
//             <section className="w-full relative py-12.5 overflow-x-hidden">
//                 <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex relative">
//                     <div className="flex w-full relative min-h-px">
//                         <div className="w-full flex flex-wrap p-2.5 content-start relative ">
//                             <div className="text-center pb-10 mb-2.5 w-full">
//                                 <motion.div
//                                     initial={{ opacity: 0, y: -70 }}
//                                     whileInView={{ opacity: 1, y: 0 }}
//                                     viewport={{ once: true, amount: 0.3 }}
//                                     transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
//                                 >
//                                     <h2 className="text-center w-full font-bold text-black tracking-tight text-2xl  md:text-3xl lg:text-[40px]/[120%]">
//                                         {/* Why choose ITS for dedicated resources? */}
//                                         {hireMainPageData.whyChooseItsForDedicatedResources
//                                             .mainTitle ? (
//                                             <div
//                                                 className="   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
//                                                 dangerouslySetInnerHTML={{
//                                                     __html:
//                                                         hireMainPageData.whyChooseItsForDedicatedResources
//                                                             .mainTitle,
//                                                 }}
//                                             />
//                                         ) : (
//                                             hireMainPageData.whyChooseItsForDedicatedResources
//                                                 .mainTitle
//                                         )}
//                                     </h2>
//                                     <Motion />
//                                 </motion.div>
//                             </div>

//                             {/* Mobile and Tablet View: Simple Grid Layout */}
//                             <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 xl:hidden ">
//                                 {hireMainPageData.whyChooseItsForDedicatedResources.detailBox.map(
//                                     (item, index) => (
//                                         <motion.div
//                                             key={index}
//                                             className="w-full h-full"
//                                             initial={{ opacity: 0, y: 50 }}
//                                             whileInView={{ opacity: 1, y: 0 }}
//                                             viewport={{ once: true, amount: 0.5 }}
//                                             transition={{ duration: 0.5, delay: index * 0.1 }}
//                                             whileHover={{ scale: 0.95 }}
//                                         >
//                                             <div className="bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.1)] overflow-hidden h-full flex flex-col">
//                                                 <div className="p-5 bg-[#FFF7E8] flex items-center gap-5">
//                                                     <Image
//                                                         src={item.image}
//                                                         alt={item.label}
//                                                         width={40}
//                                                         height={40}
//                                                         className="object-contain shrink-0"
//                                                     />
//                                                     <h3 className="font-bold text-lg text-[#12203D]">
//                                                         {item.label}
//                                                     </h3>
//                                                 </div>
//                                                 <div className="p-5 grow">
//                                                     <p className="text-gray-600 text-base leading-relaxed">
//                                                         {item.description}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </motion.div>
//                                     )
//                                 )}
//                             </div>

//                             {/* Desktop View: Absolute Positioning Layout */}
//                             <div className="hidden xl:block relative w-full max-w-full mx-auto aspect-1400/980 my-16 ">
//                                 {/* The connecting lines image */}
//                                 <motion.div
//                                     className="absolute inset-0"
//                                     initial={{ opacity: 0, scale: 0.8 }}
//                                     whileInView={{ opacity: 1, scale: 1 }}
//                                     transition={{ duration: 0.8, ease: "easeOut" }}
//                                     viewport={{ once: true, amount: 0.3 }}
//                                 >
//                                     <Image
//                                         src="/hire/main/Group-1000013400.png"
//                                         alt="Process flow"
//                                         layout="fill"
//                                         objectFit="contain"
//                                     />
//                                 </motion.div>

//                                 {/* Absolutely Positioned Cards */}
//                                 <motion.div
//                                     initial={{ opacity: 0, x: -100 }}
//                                     whileInView={{ opacity: 1, x: 0 }}
//                                     transition={{ duration: 0.7, delay: 0.2 }}
//                                     viewport={{ once: true, amount: 0.3 }}
//                                     whileHover={{ scale: 0.95 }}
//                                     className="absolute -top-[6%] left-[6.5%] w-[42%] cursor-pointer"
//                                 >
//                                     <Card
//                                         {...hireMainPageData.whyChooseItsForDedicatedResources
//                                             .detailBox[0]}
//                                     />
//                                 </motion.div>

//                                 <motion.div
//                                     initial={{ opacity: 0, x: 100 }}
//                                     whileInView={{ opacity: 1, x: 0 }}
//                                     transition={{ duration: 0.7, delay: 0.4 }}
//                                     viewport={{ once: true, amount: 0.3 }}
//                                     whileHover={{ scale: 0.95 }}
//                                     className="absolute -top-[6%] right-[5%] w-[42%] cursor-pointer"
//                                 >
//                                     <Card
//                                         {...hireMainPageData.whyChooseItsForDedicatedResources
//                                             .detailBox[1]}
//                                     />
//                                 </motion.div>

//                                 <motion.div
//                                     initial={{ opacity: 0, x: -100 }}
//                                     whileInView={{ opacity: 1, x: 0 }}
//                                     transition={{ duration: 0.7, delay: 0.6 }}
//                                     viewport={{ once: true, amount: 0.3 }}
//                                     whileHover={{ scale: 0.95 }}
//                                     className="absolute top-1/2 -translate-y-1/2 left-[6.5%] w-[42%] cursor-pointer"
//                                 >
//                                     <Card
//                                         {...hireMainPageData.whyChooseItsForDedicatedResources
//                                             .detailBox[2]}
//                                     />
//                                 </motion.div>

//                                 <motion.div
//                                     initial={{ opacity: 0, x: 100 }}
//                                     whileInView={{ opacity: 1, x: 0 }}
//                                     transition={{ duration: 0.7, delay: 0.8 }}
//                                     viewport={{ once: true, amount: 0.3 }}
//                                     whileHover={{ scale: 0.95 }}
//                                     className="absolute top-3/5 -translate-y-1/2 right-[5%] w-[42%] cursor-pointer"
//                                 >
//                                     <Card
//                                         {...hireMainPageData.whyChooseItsForDedicatedResources
//                                             .detailBox[3]}
//                                     />
//                                 </motion.div>

//                                 <motion.div
//                                     initial={{ opacity: 0, x: -100 }}
//                                     whileInView={{ opacity: 1, x: 0 }}
//                                     transition={{ duration: 0.7, delay: 1 }}
//                                     viewport={{ once: true, amount: 0.3 }}
//                                     whileHover={{ scale: 0.95 }}
//                                     className="absolute -bottom-[8%] left-[6.5%] w-[42%] cursor-pointer"
//                                 >
//                                     <Card
//                                         {...hireMainPageData.whyChooseItsForDedicatedResources
//                                             .detailBox[4]}
//                                     />
//                                 </motion.div>

//                                 <div className="absolute bottom-[3%] right-[10%]">
//                                     <motion.div
//                                         viewport={{ once: true, amount: 0.3 }}
//                                         initial={{ opacity: 0, y: 20, scale: 0.5 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         whileInView={{ opacity: 1, scale: 1 }}
//                                         transition={{
//                                             duration: 1,
//                                             delay: 0.6,
//                                         }}
//                                         className="bg-[#D68029] relative w-auto inline-flex items-center justify-center w-max overflow-hidden text-white  group"
//                                     >
//                                         <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#12203d]  group-hover:w-full group-hover:h-full"></span>
//                                         <a href="#hero"
//                                             className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-2 sm:px-8 sm:py-4 cursor-pointer font-semibold">
//                                             <span className="flex flex-row gap-3 items-center justify-center">
//                                                 Get Started Today!
//                                                 <Image
//                                                     src="/hire/Frame-2-4.png"
//                                                     alt="FRAME"
//                                                     width={30}
//                                                     height={30}
//                                                 />
//                                             </span>
//                                         </a>
//                                     </motion.div>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* section 6 build my dream team & scale development team */}
//             <section className="w-full relative py-12.5">
//                 <div className="w-full max-w-full mx-auto">
//                     <motion.div
//                         className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden  shadow-lg"
//                         initial="hidden"
//                         whileInView="visible"
//                         viewport={{ once: true, amount: 0.3 }}
//                         variants={{
//                             hidden: {},
//                             visible: {
//                                 transition: {
//                                     staggerChildren: 0.2,
//                                 },
//                             },
//                         }}
//                     >
//                         {/* Left Card: Build My Dream Team */}
//                         <motion.div
//                             className="bg-[#d68029] p-8 md:p-12 flex flex-col items-center xl:items-start text-center"
//                             variants={{
//                                 hidden: { opacity: 0, x: -100 },
//                                 visible: {
//                                     opacity: 1,
//                                     x: 0,
//                                     transition: { duration: 0.6, ease: "easeOut" },
//                                 },
//                             }}
//                         >
//                             <h3 className="text-xl font-semibold text-[#12203d]  ">
//                                 {hireMainPageData.hireDedicatedResourcesAndTalents[0]
//                                     .subTitle ? (
//                                     <div
//                                         className="   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
//                                         dangerouslySetInnerHTML={{
//                                             __html:
//                                                 hireMainPageData.hireDedicatedResourcesAndTalents[0]
//                                                     .subTitle,
//                                         }}
//                                     />
//                                 ) : (
//                                     hireMainPageData.hireDedicatedResourcesAndTalents[0].subTitle
//                                 )}
//                             </h3>
//                             <h2 className="text-3xl md:text-4xl font-bold text-[#12203d]  my-4">
//                                 {/* To Build <span className=""> Development Team </span> */}
//                                 {hireMainPageData.hireDedicatedResourcesAndTalents[0]
//                                     .mainTitle ? (
//                                     <div
//                                         className="   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
//                                         dangerouslySetInnerHTML={{
//                                             __html:
//                                                 hireMainPageData.hireDedicatedResourcesAndTalents[0]
//                                                     .mainTitle,
//                                         }}
//                                     />
//                                 ) : (
//                                     hireMainPageData.hireDedicatedResourcesAndTalents[0].mainTitle
//                                 )}
//                             </h2>
//                             <p className="text-white/90 flex flex-row text-sm md:text-base mb-8">
//                                 {hireMainPageData.hireDedicatedResourcesAndTalents[0].keyPoints
//                                     .length > 0 &&
//                                     hireMainPageData.hireDedicatedResourcesAndTalents[0].keyPoints.map(
//                                         (item, index) => (
//                                             <React.Fragment key={index}>
//                                                 <span>{item}</span>
//                                                 {index <
//                                                     hireMainPageData.hireDedicatedResourcesAndTalents[0]
//                                                         .keyPoints.length - 1 && ( // Corrected logic to avoid trailing separator
//                                                         <span className="mx-2 text-[#12203d] ">|</span>
//                                                     )}
//                                             </React.Fragment>
//                                         )
//                                     )}
//                                 {/* <span className="mx-2 text-[#12203d] ">|</span>
//                                 <span>
//                                     Cost-Effective Rates
//                                 </span>
//                                 <span className="mx-2 text-[#12203d] ">|</span>
//                                 <span>
//                                     No Long-term Lock-Ins
//                                 </span> */}
//                             </p>


//                             <a href="#contact-form-section">
//                                 <button
//                                     className="bg-white text-[#d68029] font-bold py-3 px-8 rounded-full hover:text-white hover:bg-[#12203d] transition-colors duration-300 cursor-pointer"
//                                 >
//                                     {hireMainPageData.hireDedicatedResourcesAndTalents[0].buttonTitle}
//                                 </button>
//                             </a>




//                         </motion.div>

//                         {/* Right Card: Add Dedicated Talents */}
//                         <motion.div
//                             className="bg-[#12203d] p-8 md:p-12 flex flex-col items-center xl:items-start text-center"
//                             variants={{
//                                 hidden: { opacity: 0, x: 100 },
//                                 visible: {
//                                     opacity: 1,
//                                     x: 0,
//                                     transition: { duration: 0.6, ease: "easeOut" },
//                                 },
//                             }}
//                         >
//                             <h3 className="text-xl font-semibold text-[#d68029] ">
//                                 {hireMainPageData.hireDedicatedResourcesAndTalents[1]
//                                     .subTitle ? (
//                                     <div
//                                         className="   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
//                                         dangerouslySetInnerHTML={{
//                                             __html:
//                                                 hireMainPageData.hireDedicatedResourcesAndTalents[1]
//                                                     .subTitle,
//                                         }}
//                                     />
//                                 ) : (
//                                     hireMainPageData.hireDedicatedResourcesAndTalents[1].subTitle
//                                 )}
//                             </h3>
//                             <h2 className="text-3xl md:text-4xl font-bold text-white my-4">
//                                 {hireMainPageData.hireDedicatedResourcesAndTalents[1]
//                                     .mainTitle ? (
//                                     <div
//                                         className="   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
//                                         dangerouslySetInnerHTML={{
//                                             __html:
//                                                 hireMainPageData.hireDedicatedResourcesAndTalents[1]
//                                                     .mainTitle,
//                                         }}
//                                     />
//                                 ) : (
//                                     hireMainPageData.hireDedicatedResourcesAndTalents[1].mainTitle
//                                 )}
//                             </h2>
//                             <p className="text-white/90 flex flex-row  text-sm md:text-base mb-8">
//                                 {hireMainPageData.hireDedicatedResourcesAndTalents[1].keyPoints
//                                     .length > 0 &&
//                                     hireMainPageData.hireDedicatedResourcesAndTalents[1].keyPoints.map(
//                                         (item, index) => (
//                                             <React.Fragment key={index}>
//                                                 <span>{item}</span>
//                                                 {index <
//                                                     hireMainPageData.hireDedicatedResourcesAndTalents[1]
//                                                         .keyPoints.length - 1 && ( // Corrected logic to avoid trailing separator
//                                                         <span className="mx-2 text-[#d68029] ">|</span>
//                                                     )}
//                                             </React.Fragment>
//                                         )
//                                     )}
//                             </p>.
//                             <a href="#contact-form-section">
//                                 <button
//                                     className="bg-white text-[#12203d] font-bold py-3 px-8 rounded-full hover:text-white hover:bg-[#d68029] transition-colors duration-300 cursor-pointer"
//                                 >
//                                     {hireMainPageData.hireDedicatedResourcesAndTalents[1].buttonTitle}

//                                 </button>
//                             </a>

//                         </motion.div>
//                     </motion.div>
//                 </div>
//             </section>
//             <section className="relative py-12.5 w-full z-20">
//                 <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto relative flex">
//                     <div className="flex relative min-h-px w-full">
//                         <div className="flex p-2.5 content-start relative w-full flex-wrap">
//                             <div className="text-center pb-2.5  mb-2.5 w-full">
//                                 <div className="text-center">
//                                     <motion.div
//                                         initial={{ opacity: 0, y: 80 }}
//                                         whileInView={{ opacity: 1, y: 0 }}
//                                         viewport={{ once: true, amount: 0.3 }}
//                                         transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
//                                     >
//                                         <h2 className="text-center w-full font-bold text-black tracking-tight text-2xl  md:text-3xl lg:text-[40px]/[120%]  ">
//                                             {getHighlightedTitle()}
//                                         </h2>
//                                     </motion.div>
//                                     <Motion />
//                                 </div>
//                             </div>
//                             <div className="w-full mb-5 text-[#6f6f6f] font-normal relative">
//                                 <motion.div
//                                     initial={{ opacity: 0, y: -10 }}
//                                     whileInView={{ opacity: 1, y: 0 }}
//                                     viewport={{ once: true, amount: 0.3 }}
//                                     transition={{ duration: 0.6, ease: "easeOut" }}
//                                 >
//                                     <p className="text-center text-base md:text-lg leading-8 tracking-wide">
//                                         Here you can hire talented{" "}
//                                         <span>
//                                             {hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.title
//                                                 .replace("Hire Top 1%", "")
//                                                 .replace("according to your needs", "")
//                                                 .trim()}
//                                         </span>{" "}
//                                         at the best price who can understand your business needs.
//                                     </p>
//                                 </motion.div>
//                             </div>
//                             <section className="w-full mt-8 relative">
//                                 <div className="flex flex-col lg:flex-row gap-8 w-full">
//                                     {/* Left Column: Info Boxes */}
//                                     <div className="w-full lg:w-1/3 xl:w-1/4">
//                                         <div className="grid grid-cols-1   gap-5">
//                                             {/* Box 1: 24*7 Availability */}
//                                             <motion.div
//                                                 initial={{ opacity: 0, scale: 0.9 }}
//                                                 whileInView={{ opacity: 1, scale: 1 }}
//                                                 viewport={{ once: true, amount: 0.3 }}
//                                                 transition={{
//                                                     duration: 0.5,
//                                                     ease: "easeOut",
//                                                     delay: 0.1,
//                                                 }}
//                                                 className="w-full rounded-sm relative px-5 py-2.5 shadow-[0_2px_7px_-3px_rgba(0,0,0,0.25)] bg-white"
//                                             >
//                                                 <div className="flex items-center flex-row text-start gap-4">
//                                                     <Image
//                                                         src={"/hire/24_7-Availability.png"}
//                                                         alt="24*7 available"
//                                                         width={65}
//                                                         height={50}
//                                                         className="h-12.5 w-16.25 object-contain"
//                                                     />
//                                                     <h3 className="text-black text-lg font-semibold">
//                                                         24*7 Availability
//                                                     </h3>
//                                                 </div>
//                                             </motion.div>
//                                             {/* Box 2: 20+ Experts */}
//                                             <motion.div
//                                                 initial={{ opacity: 0, scale: 0.9 }}
//                                                 whileInView={{ opacity: 1, scale: 1 }}
//                                                 viewport={{ once: true, amount: 0.3 }}
//                                                 transition={{
//                                                     duration: 0.5,
//                                                     ease: "easeOut",
//                                                     delay: 0.3,
//                                                 }}
//                                                 className="w-full rounded-sm relative px-5 py-2.5 shadow-[0_2px_7px_-3px_rgba(0,0,0,0.25)] bg-white"
//                                             >
//                                                 <div className="flex items-center flex-row text-start gap-4">
//                                                     <Image
//                                                         src={"/hire/150-Experts.png"}
//                                                         alt="20+ experts"
//                                                         width={65}
//                                                         height={50}
//                                                         className="h-12.5 w-16.25 object-contain"
//                                                     />
//                                                     <h3 className="text-black text-lg font-semibold">
//                                                         20+ Experts
//                                                     </h3>
//                                                 </div>
//                                             </motion.div>
//                                             {/* Box 3: Hourly Hiring */}
//                                             <motion.div
//                                                 initial={{ opacity: 0, scale: 0.9 }}
//                                                 whileInView={{ opacity: 1, scale: 1 }}
//                                                 viewport={{ once: true, amount: 0.3 }}
//                                                 transition={{
//                                                     duration: 0.5,
//                                                     ease: "easeOut",
//                                                     delay: 0.5,
//                                                 }}
//                                                 className="w-full rounded-sm relative px-5 py-2.5 shadow-[0_2px_7px_-3px_rgba(0,0,0,0.25)] bg-white"
//                                             >
//                                                 <div className="flex items-center flex-row text-start gap-4">
//                                                     <Image
//                                                         src={"/hire/Hourly-Hiring.png"}
//                                                         alt="Hourly Hiring"
//                                                         width={65}
//                                                         height={50}
//                                                         className="h-12.5 w-16.25 object-contain"
//                                                     />
//                                                     <h3 className="text-black text-lg font-semibold">
//                                                         Hourly Hiring
//                                                     </h3>
//                                                 </div>
//                                             </motion.div>
//                                             {/* Box 4: Full-Time hiring */}
//                                             <motion.div
//                                                 initial={{ opacity: 0, scale: 0.9 }}
//                                                 whileInView={{ opacity: 1, scale: 1 }}
//                                                 viewport={{ once: true, amount: 0.3 }}
//                                                 transition={{
//                                                     duration: 0.5,
//                                                     ease: "easeOut",
//                                                     delay: 0.7,
//                                                 }}
//                                                 className="w-full rounded-sm relative px-5 py-2.5 shadow-[0_2px_7px_-3px_rgba(0,0,0,0.25)] bg-white"
//                                             >
//                                                 <div className="flex items-center flex-row text-start gap-4">
//                                                     <Image
//                                                         src={"/hire/Full-Time-hiring.png"}
//                                                         alt="full time hiring"
//                                                         width={65}
//                                                         height={50}
//                                                         className="h-12.5 w-16.25 object-contain"
//                                                     />
//                                                     <h3 className="text-black text-lg font-semibold">
//                                                         Full-Time hiring
//                                                     </h3>
//                                                 </div>
//                                             </motion.div>
//                                         </div>
//                                     </div>

//                                     {/* Right Column: Pricing Cards */}
//                                     <div className="w-full lg:flex-1 flex flex-col md:flex-row gap-8">
//                                         {/* Price Card 1 */}
//                                         <motion.div
//                                             initial={{ opacity: 0, scale: 0.5 }}
//                                             whileInView={{ opacity: 1, scale: 1 }}
//                                             viewport={{ once: true, margin: "0px 0px -100px 0px" }}
//                                             transition={{ duration: 0.7, ease: "easeOut" }}
//                                             className="flex-1 flex flex-col relative border-2 border-[#eeeeee] bg-white hover:border-[#d68029]  transition-all duration-300 group  rounded-md p-5 cursor-pointer"
//                                         >
//                                             <div className="text-center mb-5">
//                                                 <h6 className="my-2.5 font-bold text-black">
//                                                     {
//                                                         hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.planDetails[0]
//                                                             .timelLine
//                                                     }
//                                                     <br />
//                                                     <span className="text-[41px] font-bold group-hover:text-[#d68029] transition-colors duration-300 ">
//                                                         {
//                                                             hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.planDetails[0]
//                                                                 .price
//                                                         }
//                                                     </span>
//                                                 </h6>
//                                             </div>
//                                             <ul className="list-none m-0 p-0">
//                                                 {hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.planDetails[0].keyPoints.map(
//                                                     (item, index) => (
//                                                         <li
//                                                             key={index}
//                                                             className="p-0 mb-3 flex items-center"
//                                                         >
//                                                             <span className="flex text-gray-400 text-2xl w-8 group-hover:text-[#d68029] transition-colors duration-300">
//                                                                 <FaCheck />
//                                                             </span>
//                                                             <span className="text-black self-center ps-1 text-lg font-normal">
//                                                                 {item}
//                                                             </span>
//                                                         </li>
//                                                     )
//                                                 )}
//                                             </ul>
//                                         </motion.div>

//                                         {/* Price Card 2 */}
//                                         <motion.div
//                                             initial={{ opacity: 0, scale: 0.5 }}
//                                             whileInView={{ opacity: 1, scale: 1 }}
//                                             viewport={{ once: true, margin: "0px 0px -100px 0px" }}
//                                             transition={{ duration: 0.7, ease: "easeOut" }}
//                                             className="flex-1 flex flex-col relative border-2 border-[#eeeeee] bg-white hover:border-[#d68029]  transition-all duration-300 group  rounded-md p-5 cursor-pointer"
//                                         >
//                                             <div className="text-center mb-5">
//                                                 <h6 className="my-2.5 font-bold text-black">
//                                                     {
//                                                         hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.planDetails[1]
//                                                             .timelLine
//                                                     }
//                                                     <br />
//                                                     <span className="text-[41px] font-bold group-hover:text-[#d68029] transition-colors duration-300 ">
//                                                         {
//                                                             hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.planDetails[1]
//                                                                 .price
//                                                         }
//                                                     </span>
//                                                 </h6>
//                                             </div>
//                                             <ul className="list-none m-0 p-0">
//                                                 {hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.planDetails[1].keyPoints.map(
//                                                     (item, index) => (
//                                                         <li
//                                                             key={index}
//                                                             className="p-0 mb-3 flex items-center"
//                                                         >
//                                                             <span className="flex text-gray-400 text-2xl w-8 group-hover:text-[#d68029] transition-colors duration-300">
//                                                                 <FaCheck />
//                                                             </span>
//                                                             <span className="text-black self-center ps-1 text-lg font-normal">
//                                                                 {item}
//                                                             </span>
//                                                         </li>
//                                                     )
//                                                 )}
//                                             </ul>
//                                         </motion.div>
//                                     </div>
//                                 </div>
//                             </section>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             {/* section 8 : benifits  */}
//             <section
//                 className="relative z-0 mt-[-9%] bg-[url('/hire/Rectangle-4181.png')] 
//                    bg-center bg-size-[100%_auto] 
//                    px-0 pt-37.5 pb-12.5 
//                    transition-[background,border,border-radius,box-shadow] duration-300 
//                    max-[1200px]:mt-10 max-[1200px]:py-5"
//             >
//                 <div className="flex relative mx-auto w-full max-w-[90%] lg:max-w-[80%]">
//                     <div className="flex w-full relative min-h-px">
//                         <div className="flex flex-wrap p-2.5 content-start w-full  relative">
//                             <div className="mb-5 w-full text-center relative hiring_model_benefits">
//                                 <h4 className="text-center relative text-black pb-6.25 text-[20px] font-semibold">
//                                     Benefits
//                                 </h4>
//                             </div>
//                             <section className="w-full  relative ">
//                                 <div className="flex w-full xl:mx-auto max-w-full lg:max-w-[90%] xl:max-w-[80%]">
//                                     {hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.benefits && (
//                                         <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 w-full max-w-full min-h-px list-none rhombus_icon_list relative p-0">
//                                             {hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.benefits.map(
//                                                 (benefit, index) => (
//                                                     <li
//                                                         key={index}
//                                                         className="flex items-center relative text-lg"
//                                                     >
//                                                         <span className="text-[#6f6f6f] text-lg relative font-medium">
//                                                             {benefit}
//                                                         </span>
//                                                     </li>
//                                                 )
//                                             )}
//                                         </ul>
//                                     )}
//                                 </div>
//                             </section>

//                             <div className="w-full text-center mt-10">
//                                 <motion.div
//                                     initial={{ opacity: 0, scale: 0.8 }}
//                                     whileInView={{ opacity: 1, scale: 1 }}
//                                     viewport={{ once: true, amount: 0.2 }}
//                                     transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
//                                     className="bg-[#12203d] relative -top-6 inline-flex items-center justify-center w-max overflow-hidden text-white rounded-xl group"
//                                 >
//                                     <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D68029] rounded group-hover:w-full group-hover:h-full"></span>
//                                     <a href="#contact-form-section"
//                                         className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold">
//                                         <span className="flex flex-row gap-3  items-center justify-center">
//                                             Schedule a Developer Interview
//                                             <Image
//                                                 src="/navbar/btn_icon.png"
//                                                 alt="Get a Quote Arrow"
//                                                 width={20}
//                                                 height={20}
//                                             />
//                                         </span>
//                                     </a>
//                                 </motion.div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             {/* section 9: faq question */}
//             <section ref={faqRef} className="relative w-full py-12.5 pt-20">
//                 <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex gap-8 flex-col  relative  ">
//                     <div className="flex flex-wrap  w-full relative p-2.5 content-start">
//                         <div className="text-center pb-10 mb-2.5 w-full">
//                             <h2 className="text-center w-full font-bold text-black tracking-tight text-2xl md:text-3xl lg:text-[40px]/[120%]">
//                                 Frequently Asked Questions (FAQ)
//                             </h2>
//                             <Motion />
//                         </div>
//                         <section className="w-full mt-7.5 relative  ">
//                             <div className="w-full gap-8 box-border relative flex flex-col lg:flex-row mx-auto">
//                                 <div className="w-full max-w-full lg:max-w-[29.99%] flex  relative min-h-px">
//                                     <div className="flex items-start content-start p-2.5 w-full flex-wrap top-[13%] z-10 h-fit sticky ">
//                                         <div className="mb-5">
//                                             <div className="text-xl text-[#d68029] font-semibold">
//                                                 Do you have more questions?
//                                             </div>
//                                         </div>
//                                         <div className="w-full relative mb-5">
//                                             <h3 className="font-semibold text-4xl xl:text-[45px] leading-10 xl:leading-12.5 ">
//                                                 We are here to Answer you...
//                                             </h3>
//                                         </div>
//                                         <div className="w-full text-center flex justify-start ">
//                                             <motion.div
//                                                 initial={{ opacity: 0, scale: 0.8 }}
//                                                 whileInView={{ opacity: 1, scale: 1 }}
//                                                 viewport={{ once: true, amount: 0.2 }}
//                                                 transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
//                                                 className="bg-[#12203d] relative inline-flex items-center justify-center w-max overflow-hidden text-white rounded-xl group"
//                                             >
//                                                 <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D68029] rounded group-hover:w-full group-hover:h-full"></span>
//                                                 <a href="/faqs"
//                                                     className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold">
//                                                     <span className="flex flex-row gap-3  items-center justify-center">
//                                                         Explore More
//                                                         <Image
//                                                             src="/navbar/btn_icon.png"
//                                                             alt="Get a Quote Arrow"
//                                                             width={20}
//                                                             height={20}
//                                                         />
//                                                     </span>
//                                                 </a>
//                                             </motion.div>

//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="w-full max-w-full lg:max-w-[70%] flex relative min-h-px">
//                                     <div className="flex p-2.5 w-full content-start relative flex-wrap">
//                                         <div className="w-full text-start box-border relative">
//                                             {hireMainPageData.pricePathAndFAQ.faq.length > 0 &&
//                                                 hireMainPageData.pricePathAndFAQ.faq.map((item, index) => {
//                                                     const isOpen = activeIndex === index;
//                                                     return (
//                                                         <div
//                                                             key={index}
//                                                             className="mb-5 w-full rounded-lg bg-white p-2.5 shadow-[0_0_9px_0px_rgba(0,0,0,0.25)] border border-[#d5d8dc] box-border  "
//                                                         >
//                                                             <div
//                                                                 className="cursor-pointer w-full py-4 px-5 box-border  flex items-center justify-between font-semibold"
//                                                                 onClick={() => toggleAccordion(index)}
//                                                             >
//                                                                 <span className="font-medium   text-[20px] text-black">
//                                                                     {item.question}
//                                                                 </span>
//                                                                 <span className="w-[1em] inline-block">
//                                                                     {isOpen ? <FaMinus /> : <FaPlus />}
//                                                                 </span>
//                                                             </div>
//                                                             <AnimatePresence initial={false}>
//                                                                 {isOpen && (
//                                                                     <motion.div
//                                                                         initial={{ height: 0, opacity: 0 }}
//                                                                         animate={{ height: "auto", opacity: 1 }}
//                                                                         exit={{ height: 0, opacity: 0 }}
//                                                                         transition={{
//                                                                             duration: 0.6,
//                                                                             ease: "easeInOut",
//                                                                             delay: 0.1,
//                                                                         }}
//                                                                         className="overflow-hidden"
//                                                                     >
//                                                                         <div className="block w-full px-5 py-4 text-[#7a7a7a] text-md">
//                                                                             <div
//                                                                                 className="prose max-w-none  font-normal text-[#6f6f6f]  
//                                                                                     [&_a]:text-[#d68029] [&_a]:no-underline "
//                                                                                 dangerouslySetInnerHTML={{
//                                                                                     __html: item.answer,
//                                                                                 }}
//                                                                             />
//                                                                         </div>
//                                                                     </motion.div>
//                                                                 )}
//                                                             </AnimatePresence>
//                                                         </div>
//                                                     );
//                                                 })}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </section>
//                     </div>
//                 </div>
//             </section>
//             <RelatedBlogs subCategory="CMS Development" />
//         </main>
//     );
// }

// // Helper component for the cards in "Why Choose ITS" section
// const Card = ({
//     image,
//     label,
//     description,
// }: {
//     image: string;
//     label: string;
//     description: string;
// }) => (
//     <div className="bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.1)] overflow-hidden h-full flex flex-col">
//         <div className="p-5 bg-[#f3d9bf] flex items-center gap-5">
//             <Image
//                 src={image}
//                 alt={label}
//                 width={40}
//                 height={40}
//                 className="object-contain shrink-0"
//             />
//             <h3 className="font-bold text-lg text-[#12203D]">{label}</h3>
//         </div>
//         <div className="p-5 grow">
//             <p className="text-gray-600 text-base leading-relaxed">{description}</p>
//         </div>
//     </div>
// );








"use client";

import HireFormSection from "@/components/hire/HireForm";
import Motion from "@/components/motionbar";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import HireTabs from "@/components/hire/HireTabs";
import dynamic from "next/dynamic";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { HireMainPageData, SingleResponse } from "@/types";
import apiService from "@/lib/apiService";
import NotFoundPage from "@/components/NotFoundPage";
import Section from "@/components/Section";
import Row from "@/components/Row";
import Button from "@/components/Button";
import UnderConstructionPage from "@/components/UnderConstruction";

export default function HireDevelopersPageClient({ initialData }: { initialData?: HireMainPageData | null }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const faqRef = useRef<HTMLElement>(null);

    const scrollToFAQ = () => {
        faqRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const [gettingHireMainPageData, setGettingHireMainPageData] = useState(!initialData);
    const [hireMainPageData, setHireMainPageData] =
        useState<HireMainPageData | null>(initialData || null);

    const fetchHireMainPageContent = useCallback(async () => {
        setGettingHireMainPageData(true);
        try {
            const responce = await apiService<SingleResponse<HireMainPageData>>(
                "/hire-main-page"
            );
            if (responce.success) {
                setHireMainPageData(responce.data);
            } else {
                console.error(responce.message);
            }
        } catch (error: any) {
            console.error(error.message);
        } finally {
            setGettingHireMainPageData(false);
        }
    }, []);

    useEffect(() => {
        if (initialData) {
            setHireMainPageData(initialData);
            setGettingHireMainPageData(false);
            return;
        }
        fetchHireMainPageContent();
    }, [fetchHireMainPageContent, initialData]);

    if (gettingHireMainPageData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d68029]"></div> */}
                 <Image
                    src="/LoderIcon.png" // place image in public folder
                    alt="Loading"
                    width={80}
                    height={80}
                    // className="animate-spin"
                    />
            </div>
        );
    }

    if (!hireMainPageData) {
        return (
            // <div className="min-h-screen flex items-center justify-center">
            //     <NotFoundPage />
            // </div>
            <UnderConstructionPage />
        );
    }






    const getHighlightedTitle = () => {
        const fullTitle = hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.title;
        const techNameSingular = hireMainPageData.pricePathAndFAQ.title.replace(/^Hire\s*/, "");
        const techNamePlural = techNameSingular + 's';

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
    // State to manage the active tab, defaulting to the first item's title
    // const [activeTab, setActiveTab] = useState(hireData[0].title);

    // Find the currently active tab's data
    // const activeData = hireData.find(tab => tab.title === activeTab);
    return (
        <main className="w-full">
            <Section id="hero"
                className="hire_hero_section common_background_gradient  bg-white ">

                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/hire/hire_bg.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-[#0a1a33]/90"></div>


                {/* <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto relative flex  "> */}
                <Row className="flex  ">
                    <div className="flex flex-col lg:flex-row content-start w-full gap-10 mx-auto relative ">
                        <div className="w-full max-w-full lg:max-w-[60%] flex relative min-h-px">
                            <div className="flex items-center content-center  flex-wrap relative w-full ">
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
                                    {/* <div className="mb-2.5 w-full relative "> */}
                                        <div className="mb-2.5 w-full relative   text-black ">
                                            {hireMainPageData.mainTitle ? (
                                                <h1
                                                    className="font-bold text-4xl md:text-[42px] lg:text-[46px]/[130%] tracking-[1.2px] relative  text-white "
                                                    dangerouslySetInnerHTML={{
                                                        __html: hireMainPageData.mainTitle.replace(/<\/?h[1-6][^>]*>/gm, ""),
                                                    }}
                                                />
                                            ) : (
                                                hireMainPageData.mainTitle
                                            )}
                                        </div>
                                    {/* </div> */}
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
                                    <div className="mb-5 relative w-full">
                                        <div className="mt-6 text-gray-600 leading-relaxed">
                                            {hireMainPageData.description ? (
                                                <div
                                                    className="font-medium text-slate-300 rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer text-base  md:text-lg leading-8 tracking-wide"
                                                    dangerouslySetInnerHTML={{
                                                        __html: hireMainPageData?.description || "",
                                                    }}
                                                />
                                            ) : (
                                                hireMainPageData.description
                                            )}
                                        </div>
                                    </div>
                                </motion.div>

                                <div className="w-full relative">

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 1,
                                            ease: "easeOut",
                                            delay: 0.6,
                                        }}
                                        className="bg-[#D68029] relative w-auto inline-flex items-center justify-center  overflow-hidden text-white hover:text-[#0d1b2a] transition-all duration-700 ease-in-out group"
                                    >
                                        <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#ffffff]   group-hover:w-full group-hover:h-full"></span>
                                        <a href="#hero"
                                            className="relative tracking-tight text-sm sm:text-base  px-6 py-2 sm:px-8 sm:py-4 cursor-pointer font-semibold">
                                            <span className="flex flex-row gap-3 items-center justify-center">
                                                Get Started Today!
                                                <div className="group">
                                                <Image
                                                    src="/hire/Frame-2-4.png"
                                                    alt="FRAME"
                                                    width={30}
                                                    height={30}
                                                     className="transition-all duration-700 ease-in-out group-hover:brightness-0 group-hover:sepia"
                                                />
                                                </div>
                                            </span>
                                        </a>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
                            // className="w-full max-w-[90%] shadow-[0_0_80px_10px_#0000001a] lg:max-w-[40%] flex relative mx-auto p-2.5 xl:p-7.5 min-h-px h-full border border-white/10 bg-[#ffffff08] backdrop-blur-md rounded-xl"
                          className=" w-full lg:max-w-[40%]  mx-auto  flex flex-col gap-4 p-5 xl:p-6 overflow-hidden rounded-xl
                                    border border-white/10 bg-[#ffffff08] backdrop-blur-md shadow-[0_0_80px_10px_#0000001a] "
                        >
                            <HireFormSection />
                        </motion.div>
                    </div>
                </Row>
                {/* </div> */}
            </Section>


            {/* Hire Dedicated Web and Mobile App Development Team */}
            <Section className=" not-first:  ">
                {/* <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex relative"> */}
                <Row className="flex">
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
                                        {/* <div className="text-center w-full common-h2 text-black "> */}
                                            {/* Hire Dedicated Web and Mobile  App Development Team */}
                                            {/* {hireMainPageData.developmentTeamSection.heading ? (
                                                <div
                                                    className="font-medium   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            hireMainPageData?.developmentTeamSection?.heading || "",
                                                    }}
                                                />
                                            ) : (
                                                hireMainPageData?.developmentTeamSection?.heading || ""
                                            )} */}
                                            <h2
                                                className="text-center w-full common-h2 text-black   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        hireMainPageData?.developmentTeamSection?.heading.replace(/<\/?h[1-6][^>]*>/gm, "") || "",
                                                }}
                                            />
                                        {/* </div> */}
                                        <Motion />
                                    </motion.div>
                                </div>
                            </div>
                            <div className="w-full  mx-auto flex gap-8 flex-col-reverse relative lg:flex-row">
                                <div className="flex w-full relative min-h-px max-w-full lg:max-w-[50%]">
                                    <div className="flex flex-col  content-center justify-center  items-center relative w-full">
                                        <motion.div
                                            initial={{ opacity: 0, y: 80 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.3 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            className="w-full relative"
                                        >
                                            <div className="w-full flex flex-col mb-6 wrap-break-words text-lg font-normal text-[#6f6f6f] leading-8 tracking-wide">
                                                {/* <p>
                                                    Hiring a dedicated developer also allows you to scale up and down your  resources cost-effectively.
                                                </p>
                                                <p>
                                                    Getting highly qualified and dedicated developers for hire is extremely challenging in today&apos;s times. But it won&apos;t be a headache for you because, at
                                                    <span className="text-[#d68029] font-semibold"> ITS  </span>  , we use a specialised team outsourcing strategy that enables you to hire dedicated developers of different technologies easily, scaling them as required.
                                                </p>
                                                <p>
                                                    You may avoid the stress of recruiting and managing these developers by hiring dedicated developers and teams from us, allowing you to focus on your core business in peace. Hiring a dedicated developer also allows you to scale up and down your resources cost-effectively.
                                                </p> */}
                                                {/* {hireMainPageData.developmentTeamSection.description ? (
                                                    <div
                                                        className="font-medium   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                hireMainPageData?.developmentTeamSection?.description || "",
                                                        }}
                                                    />
                                                ) : (
                                                    hireMainPageData?.developmentTeamSection?.description || ""
                                                )} */}
                                                <div
                                                    className="font-medium [&_p]:mb-4
    										[&_p:last-child]:mb-0  rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            hireMainPageData?.developmentTeamSection?.description || "",
                                                    }}
                                                />
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                                <div className="flex w-full relative min-h-px content-center items-center max-w-full lg:max-w-[50%]">
                                    <div className="flex flex-col  content-center items-center relative w-full">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true, amount: 0.3 }}
                                            transition={{ duration: 0.7, ease: "easeOut" }}
                                            className="w-full text-center relative"
                                        >
                                            {hireMainPageData.developmentTeamSection.image ? (
                                                <Image
                                                    src={hireMainPageData.developmentTeamSection.image}
                                                    alt={"Web and Mobile App Development Team"}
                                                    width={343}
                                                    height={334}
                                                    className="w-full h-auto drop-shadow-lg inline-block align-middle"
                                                    priority
                                                />
                                            ) : (
                                                <div className="w-full  bg-gray-200 rounded-lg animate-pulse">
                                                    No image{" "}
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
                {/* </div> */}
            </Section>
            {/* section 3 Hire Dedicated Web and Mobile App Developers */}
            <Section className="not-first:">
                {/* <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex relative"> */}
                <Row className="flex">
                    <div className="w-full flex flex-wrap content-start relative">
                        <div className="text-center pb-10 mb-2.5 w-full">
                            <motion.div
                                initial={{ opacity: 0, y: -70 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                            >
                                {/* <div className="text-center w-full  text-black common-h2"> */}
                                    {/* Hire Dedicated Web and Mobile App Developers */}
                                    {/* {hireMainPageData.dedicatedDeveloperSection.maintitle ? (
                                        <div
                                            className="font-medium   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    hireMainPageData.dedicatedDeveloperSection.maintitle,
                                            }}
                                        />
                                    ) : (
                                        hireMainPageData.dedicatedDeveloperSection.maintitle
                                    )} */}
                                    <h2
                                        className="text-center w-full  text-black common-h2  rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                hireMainPageData?.dedicatedDeveloperSection?.maintitle.replace(/<\/?h[1-6][^>]*>/gm, "") || "",
                                        }}
                                    />
                                {/* </div> */}
                                <Motion />
                            </motion.div>
                        </div>

                        {/* HERE IS THE CHANGE */}
                        <HireTabs
                            hireData={hireMainPageData.dedicatedDeveloperSection.services}
                        />
                    </div>
                </Row>
                {/* </div> */}
            </Section>
            {/* section 4 : why hire developer for your  fro project  */}
            <Section >
                {/* <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex relative"> */}
                <Row className="flex">
                    <div className="flex w-full relative min-h-px">
                        <div className="w-full flex flex-wrap  content-start relative ">
                            <div className="text-center pb-10 mb-2.5 w-full">
                                <div className="text-center">
                                    <motion.div
                                        initial={{ opacity: 0, y: -70 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                                    >
                                        {/* <div className="text-center w-full  text-black common-h2"> */}
                                            {/* Why Hire Developers For Your Project? */}
                                            {/* {hireMainPageData.whyHireDeveloperforYourProject
                                                .mainTitle ? (
                                                <div
                                                    className="   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            hireMainPageData.whyHireDeveloperforYourProject
                                                                .mainTitle,
                                                    }}
                                                />
                                            ) : (
                                                hireMainPageData.whyHireDeveloperforYourProject
                                                    .mainTitle
                                            )} */}
                                            <h2
                                                className="  text-center w-full  text-black common-h2 rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        hireMainPageData?.whyHireDeveloperforYourProject?.mainTitle.replace(/<\/?h[1-6][^>]*>/gm, "") || "",
                                                }}
                                            />
                                        {/* </div> */}
                                        <Motion />
                                    </motion.div>
                                </div>
                            </div>
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {hireMainPageData.whyHireDeveloperforYourProject.detailBox.map(
                                    (item, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-white p-8 rounded-xl cursor-pointer  text-center flex flex-col items-center justify-center transition-shadow duration-300 shadow-[0_0px_7px_0px_rgba(0,0,0,0.25)]"
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.5 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            whileHover={{ scale: 0.85 }}
                                        >
                                            <div className="bg-[#FEEFCF] rounded-full p-5 mb-5 inline-flex ">
                                                <Image
                                                    src={item.image}
                                                    alt={item.label}
                                                    width={100}
                                                    height={100}
                                                    className="object-contain"
                                                />
                                            </div>
                                            <h4 className="font-semibold text-xl text-gray-800">
                                                {item.label}
                                            </h4>
                                        </motion.div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </Row>
                {/* </div> */}
            </Section>
            {/* section 5 :   Why choose ITS for dedicated resources  */}
            <Section className=" overflow-x-hidden">
                {/* <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex relative"> */}
             <Row className="flex">
                    <div className="flex w-full relative min-h-px">
                        <div className="w-full flex flex-wrap  content-start relative ">
                            <div className="text-center pb-10 mb-2.5 w-full">
                                <motion.div
                                    initial={{ opacity: 0, y: -70 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                                >
                                    {/* <div className="text-center w-full  text-black common-h2"> */}
                                        {/* Why choose ITS for dedicated resources? */}
                                        {/* {hireMainPageData.whyChooseItsForDedicatedResources
                                            .mainTitle ? (
                                            <div
                                                className="   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        hireMainPageData.whyChooseItsForDedicatedResources
                                                            .mainTitle,
                                                }}
                                            />
                                        ) : (
                                            hireMainPageData.whyChooseItsForDedicatedResources
                                                .mainTitle
                                        )} */}
                                        <h2
                                            className=" text-center w-full  text-black common-h2  rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    hireMainPageData?.whyChooseItsForDedicatedResources?.mainTitle.replace(/<\/?h[1-6][^>]*>/gm, "")
 || "",
                                            }}
                                        />
                                    {/* </div> */}
                                    <Motion />
                                </motion.div>
                            </div>

                            {/* Mobile and Tablet View: Simple Grid Layout */}
                            <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 xl:hidden ">
                                {hireMainPageData.whyChooseItsForDedicatedResources.detailBox.map(
                                    (item, index) => (
                                        <motion.div
                                            key={index}
                                            className="w-full h-full"
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.5 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            whileHover={{ scale: 0.95 }}
                                        >
                                            <div className="bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.1)] overflow-hidden h-full flex flex-col">
                                                <div className="p-5 bg-[#FFF7E8] flex items-center gap-5">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.label}
                                                        width={40}
                                                        height={40}
                                                        className="object-contain shrink-0"
                                                    />
                                                    <h4 className="font-bold text-lg text-[#12203D]">
                                                        {item.label}
                                                    </h4>
                                                </div>
                                                <div className="p-5 grow">
                                                    <p className="text-gray-600 text-base leading-relaxed"
                                                    dangerouslySetInnerHTML={{
                                                __html:
                                                    item?.description || "",
                                            }} />
                                                        {/* {item.description}
                                                    </p> */}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                )}
                            </div>

                            {/* Desktop View: Absolute Positioning Layout */}
                            <div className="hidden xl:block relative w-full max-w-full mx-auto aspect-1400/980 my-16 ">
                                {/* The connecting lines image */}
                                <motion.div
                                    className="absolute inset-0"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    <Image
                                        src="/hire/main/Group-1000013400.png"
                                        alt="Process flow"
                                        fill
                                        className="object-contain"
                                    />
                                </motion.div>

                                {/* Absolutely Positioned Cards */}
                                <motion.div
                                    initial={{ opacity: 0, x: -100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    whileHover={{ scale: 0.95 }}
                                    className="absolute -top-[6%] left-[6.5%] w-[42%] cursor-pointer"
                                >
                                    <Card
                                        {...hireMainPageData.whyChooseItsForDedicatedResources
                                            .detailBox[0]}
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: 0.4 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    whileHover={{ scale: 0.95 }}
                                    className="absolute -top-[6%] right-[5%] w-[42%] cursor-pointer"
                                >
                                    <Card
                                        {...hireMainPageData.whyChooseItsForDedicatedResources
                                            .detailBox[1]}
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: 0.6 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    whileHover={{ scale: 0.95 }}
                                    className="absolute top-1/2 -translate-y-1/2 left-[6.5%] w-[42%] cursor-pointer"
                                >
                                    <Card
                                        {...hireMainPageData.whyChooseItsForDedicatedResources
                                            .detailBox[2]}
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: 0.8 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    whileHover={{ scale: 0.95 }}
                                    className="absolute top-3/5 -translate-y-1/2 right-[5%] w-[42%] cursor-pointer"
                                >
                                    <Card
                                        {...hireMainPageData.whyChooseItsForDedicatedResources
                                            .detailBox[3]}
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: 1 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    whileHover={{ scale: 0.95 }}
                                    className="absolute -bottom-[8%] left-[6.5%] w-[42%] cursor-pointer"
                                >
                                    <Card
                                        {...hireMainPageData.whyChooseItsForDedicatedResources
                                            .detailBox[4]}
                                    />
                                </motion.div>

                                <div className="absolute bottom-[3%] right-[10%]">
                                    <motion.div
                                        viewport={{ once: true, amount: 0.3 }}
                                        initial={{ opacity: 0, y: 20, scale: 0.5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 1,
                                            delay: 0.6,
                                        }}
                                        // className="bg-[#D68029] relative w-auto inline-flex items-center justify-center w-max overflow-hidden text-white  group"
                                        className="relative  inline-flex items-center justify-center overflow-hidden gap-2 bg-[#D68029]  text-sm font-semibold text-white transition-colors group"
                                    >
                                        <span className="absolute w-0 h-0 transition-all duration-750 delay-300 ease-in-out bg-[#0d1b2a] rounded group-hover:w-full group-hover:h-56"></span>

                                        <a href="#hero"
                                            // className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-2 sm:px-8 sm:py-4 cursor-pointer font-semibold"
                                             className="relative tracking-tight rounded-[10px] text-sm sm:text-base font-semibold px-6 py-2 sm:px-8 sm:py-4 text-white transition-colors ">
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
                                </div>

                            </div>
                        </div>
                    </div>
                </Row>
                {/* </div> */}
            </Section>

            {/* section 6 build my dream team & scale development team */}
            <section className="w-full relative pt-12.5">
                <div className="w-full max-w-full mx-auto">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden  shadow-lg"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.2,
                                },
                            },
                        }}
                    >

                        <motion.div
                            className="bg-[#d68029] p-8 md:p-12 flex flex-col items-center xl:items-start text-center"
                            variants={{
                                hidden: { opacity: 0, x: -100 },
                                visible: {
                                    opacity: 1,
                                    x: 0,
                                    transition: { duration: 0.6, ease: "easeOut" },
                                },
                            }}
                        >
                            <div className="text-xl font-semibold text-[#12203d]  ">
                                {/* {hireMainPageData.hireDedicatedResourcesAndTalents[0]
                                    .subTitle ? (
                                    <div
                                        className="   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                hireMainPageData.hireDedicatedResourcesAndTalents[0]
                                                    .subTitle,
                                        }}
                                    />
                                ) : (
                                    hireMainPageData.hireDedicatedResourcesAndTalents[0].subTitle
                                )} */}
                                <div
                                    className="   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            hireMainPageData?.hireDedicatedResourcesAndTalents[0]?.subTitle || "",
                                    }}
                                />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-[#12203d]  my-4">

                                {/* {hireMainPageData.hireDedicatedResourcesAndTalents[0]
                                    .mainTitle ? (
                                    <div
                                        className="   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                hireMainPageData.hireDedicatedResourcesAndTalents[0]
                                                    .mainTitle,
                                        }}
                                    />
                                ) : (
                                    hireMainPageData.hireDedicatedResourcesAndTalents[0].mainTitle
                                )} */}
                                <h3
                                        className="   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                hireMainPageData?.hireDedicatedResourcesAndTalents[0]?.mainTitle.replace(/<\/?h[1-6][^>]*>/gm, "") || "",
                                        }}
                                    />
                            </div>
                            <p className="text-white/90 flex flex-row text-sm md:text-base mb-8">
                                {hireMainPageData.hireDedicatedResourcesAndTalents[0].keyPoints
                                    .length > 0 &&
                                    hireMainPageData.hireDedicatedResourcesAndTalents[0].keyPoints.map(
                                        (item, index) => (
                                            <React.Fragment key={index}>
                                                <span>{item}</span>
                                                {index <
                                                    hireMainPageData.hireDedicatedResourcesAndTalents[0]
                                                        .keyPoints.length - 1 && (
                                                        <span className="mx-2 text-[#12203d] ">|</span>
                                                    )}
                                            </React.Fragment>
                                        )
                                    )}

                            </p>
                            <a href="#contact-form-section" className="mt-2 relative  inline-flex items-center justify-center overflow-hidden gap-2 rounded-full bg-[#ffffff]  text-sm font-semibold text-white transition-colors group"
>                               <span className="absolute w-0 h-0 transition-all duration-750 delay-300 ease-in-out bg-[#12203d] rounded group-hover:w-full group-hover:h-56"></span>
                                <button
                                    // className="bg-white text-[#d68029] font-bold py-3 px-8 rounded-full hover:text-white hover:bg-[#12203d] transition-colors duration-300 cursor-pointer"
                                 className="relative tracking-tight rounded-[10px] cursor-pointer text-sm sm:text-base font-semibold py-3 px-8 text-[#d68029] hover:text-[#ffffff] transition-colors duration-750 delay-300 ease-in-out"
                                >
                                <span className="flex flex-row gap-3  justify-center">
                                    {hireMainPageData.hireDedicatedResourcesAndTalents[0].buttonTitle}
                                </span>
                                </button>
                            </a>




                        </motion.div>

                        {/* Right Card: Add Dedicated Talents */}
                        <motion.div
                            className="bg-[#12203d] p-8 md:p-12 flex flex-col items-center xl:items-start text-center"
                            variants={{
                                hidden: { opacity: 0, x: 100 },
                                visible: {
                                    opacity: 1,
                                    x: 0,
                                    transition: { duration: 0.6, ease: "easeOut" },
                                },
                            }}
                        >
                            {/* <div className="text-xl font-semibold text-[#d68029] "> */}
                                {/* {hireMainPageData.hireDedicatedResourcesAndTalents[1]
                                    .subTitle ? (
                                    <div
                                        className="   rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                hireMainPageData.hireDedicatedResourcesAndTalents[1]
                                                    .subTitle,
                                        }}
                                    />
                                ) : (
                                    hireMainPageData.hireDedicatedResourcesAndTalents[1].subTitle
                                )} */}
                                <div
                                    className=" text-xl font-semibold text-[#d68029] rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            hireMainPageData?.hireDedicatedResourcesAndTalents[1]?.subTitle || "",
                                    }}
                                />
                            {/* </div> */}
                            {/* <h2 className="text-3xl md:text-4xl font-bold text-white my-4">
                                {hireMainPageData.hireDedicatedResourcesAndTalents[1]
                                    .mainTitle ? (
                                    <div
                                        className="rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                hireMainPageData.hireDedicatedResourcesAndTalents[1]
                                                    .mainTitle,
                                        }}
                                    />
                                ) : (
                                    hireMainPageData.hireDedicatedResourcesAndTalents[1].mainTitle
                                )}
                            </h2> */}
                            <h3
                                className="  text-3xl md:text-4xl font-bold text-white my-4 rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
                                dangerouslySetInnerHTML={{
                                    __html:
                                        hireMainPageData?.hireDedicatedResourcesAndTalents[1]?.mainTitle.replace(/<\/?h[1-6][^>]*>/gm, "") || "",
                                }}
                            />
                            <p className="text-white/90 flex flex-row  text-sm md:text-base mb-8">
                                {hireMainPageData.hireDedicatedResourcesAndTalents[1].keyPoints
                                    .length > 0 &&
                                    hireMainPageData.hireDedicatedResourcesAndTalents[1].keyPoints.map(
                                        (item, index) => (
                                            <React.Fragment key={index}>
                                                <span>{item}</span>
                                                {index <
                                                    hireMainPageData.hireDedicatedResourcesAndTalents[1]
                                                        .keyPoints.length - 1 && ( // Corrected logic to avoid trailing separator
                                                        <span className="mx-2 text-[#d68029] ">|</span>
                                                    )}
                                            </React.Fragment>
                                        )
                                    )}
                            </p>
                            {/* <a href="#contact-form-section">
                                <button
                                    className="bg-white text-[#12203d] font-bold py-3 px-8 rounded-full hover:text-white hover:bg-[#d68029] transition-colors duration-300 cursor-pointer"
                                >
                                    {hireMainPageData.hireDedicatedResourcesAndTalents[1].buttonTitle}

                                </button>
                            </a> */}
                             <a href="#contact-form-section" className="mt-2 relative  inline-flex items-center justify-center overflow-hidden gap-2 rounded-full bg-[#ffffff]  text-sm font-semibold text-white transition-colors group">
                                <span className="absolute w-0 h-0 transition-all duration-750 delay-300 ease-in-out bg-[#d68029] rounded group-hover:w-full group-hover:h-56"></span>
                                <button
                                    // className="bg-white text-[#d68029] font-bold py-3 px-8 rounded-full hover:text-white hover:bg-[#12203d] transition-colors duration-300 cursor-pointer"
                                    className="relative tracking-tight rounded-[10px] cursor-pointer text-sm sm:text-base font-semibold py-3 px-8 text-[#0d1b2a] hover:text-[#ffffff] transition-colors duration-750 delay-300 ease-in-out "
                                >
                                <span className="flex flex-row gap-3  justify-center">
                                    {hireMainPageData.hireDedicatedResourcesAndTalents[1].buttonTitle}
                                </span>
                                </button>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* hire top 1% wordpress devlopers */}
            <Section className="z-10 bg-white xl:!pb-0 ">
                {/* <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto relative flex"> */}
                <Row className="flex">
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
                                        <h2 className="text-center w-full  text-black common-h2">
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
                                            {hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.title
                                                .replace("Hire Top 1%", "")
                                                .replace("according to your needs", "")
                                                .trim()}
                                        </span>{" "}
                                        at the best price who can understand your business needs.
                                    </p>
                                </motion.div>
                            </div>
                            <div className="w-full mt-8 relative z-30 xl:-mb-20">
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
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                                            transition={{ duration: 0.7, ease: "easeOut" }}
                                            className="flex-1 flex flex-col relative border-2 border-[#eeeeee] bg-white hover:border-[#d68029]  transition-all duration-300 group  rounded-md p-5 cursor-pointer"
                                        >
                                            <div className="text-center mb-5">
                                                <h6 className="my-2.5 font-bold text-black">
                                                    {
                                                        hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.planDetails[0]
                                                            .timelLine
                                                    }
                                                    <br />
                                                    <span className="text-[41px] font-bold group-hover:text-[#d68029] transition-colors duration-300 ">
                                                        {
                                                            hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.planDetails[0]
                                                                .price
                                                        }
                                                    </span>
                                                </h6>
                                            </div>
                                            <ul className="list-none m-0 p-0">
                                                {hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.planDetails[0].keyPoints.map(
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
                                                    )
                                                )}
                                            </ul>
                                        </motion.div>

                                        {/* Price Card 2 */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                                            transition={{ duration: 0.7, ease: "easeOut" }}
                                            className="flex-1 flex flex-col relative border-2 border-[#eeeeee] bg-white hover:border-[#d68029]  transition-all duration-300 group  rounded-md p-5 cursor-pointer"
                                        >
                                            <div className="text-center mb-5">
                                                <h6 className="my-2.5 font-bold text-black">
                                                    {
                                                        hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.planDetails[1]
                                                            .timelLine
                                                    }
                                                    <br />
                                                    <span className="text-[41px] font-bold group-hover:text-[#d68029] transition-colors duration-300 ">
                                                        {
                                                            hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.planDetails[1]
                                                                .price
                                                        }
                                                    </span>
                                                </h6>
                                            </div>
                                            <ul className="list-none m-0 p-0">
                                                {hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.planDetails[1].keyPoints.map(
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
                                                    )
                                                )}
                                            </ul>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
                {/* </div> */}
            </Section>
            {/* section 8 : benifits  */}
            <section
                // className="relative z-0 mt-[-9%] bg-[url('/hire/Rectangle-4181.png')] 
                //    bg-center bg-size-[100%_auto] 
                //    px-0 pt-40.5 pb-16 
                //    transition-[background,border,border-radius,box-shadow] duration-300 
                //    max-[1280px]:mt-10 max-[1280px]:py-12.5"
                  className="relative z-1  bg-[url('/hire/Rectangle-4181.png')] 
         bg-center bg-cover bg-size[100%_auto] 
         px-0 pt-12.5 xl:pt-37.5 pb-12.5 
         transition-[background,border,border-radius,box-shadow] duration-300 
         max-[1280px]:py-16 "
            >
                {/* <div className="flex relative mx-auto w-full max-w-[90%] lg:max-w-[80%]"> */}
                  <Row className="flex">
                    <div className="flex w-full relative min-h-px">
                        <div className="flex flex-wrap content-start w-full  relative">
                            <div className="mb-5 w-full text-center relative hiring_model_benefits">
                                <h4 className="text-center relative text-black pb-6.25 text-[20px] font-semibold">
                                    Benefits
                                </h4>
                            </div>
                            <div className="w-full  relative ">
                                <div className="flex w-full xl:mx-auto max-w-full lg:max-w-[90%] xl:max-w-[80%]">
                                    {hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.benefits && (
                                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 w-full max-w-full min-h-px list-none rhombus_icon_list relative p-0">
                                            {hireMainPageData.pricePathAndFAQ.hireDevelopersAsYourNeeds.benefits.map(
                                                (benefit, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center relative text-lg"
                                                    >
                                                        <span className="text-[#6f6f6f] text-lg relative font-medium">
                                                            {benefit}
                                                        </span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className="w-full text-center mt-8 lg:mt-14">
                                {/* <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                                    // className="bg-[#12203d] relative -top-6 inline-flex items-center justify-center w-max overflow-hidden text-white rounded-xl group"
                                    className="relative inline-flex items-center justify-center overflow-hidden gap-2 rounded-xl bg-[#0d1b2a]  text-sm font-semibold text-white transition-colors group"
                                >
                                    <span className="absolute w-0 h-0 transition-all duration-750 delay-300 ease-in-out bg-[#D68029] rounded group-hover:w-full group-hover:h-56"></span>
                                    <a href="#contact-form-section"
                                        // className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold"
                                        className="relative tracking-tight rounded-[10px] text-sm sm:text-base font-semibold px-6 py-3 sm:px-8 sm:py-4 text-white transition-colors ">
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
                                </motion.div> */}
                                <Button
                                    motionProps={{
                                        initial: { opacity: 0, scale: 0.8 },
                                        whileInView:{ opacity: 1, scale: 1 },
                                        viewport:{ once: true, amount: 0.2 },
                                        transition:{ duration: 0.5, ease: "easeOut", delay: 0.1 }
                                    }}
                                    text="Schedule a Developer Interview"
                                    href="#contact-form-section"
                                    icon="/navbar/btn_icon.png"
                                />
                                
                            </div>
                        </div>
                    </div>
                </Row>
                {/* </div> */}
            </section>
            {/* section 9: faq question */}
            <Section ref={faqRef}>
                {/* <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex gap-8 flex-col  relative  "> */}
                <Row className=" flex gap-8 flex-col">
                    <div className="flex flex-wrap  w-full relative content-start">
                        <div className="text-center pb-10 mb-2.5 w-full">
                            <h2 className="text-center w-full  text-black common-h2">
                                Frequently Asked Questions (FAQ)
                            </h2>
                            <Motion />
                        </div>
                        <section className="w-full mt-7.5 relative  ">
                            <div className="w-full gap-8 box-border relative flex flex-col lg:flex-row mx-auto">
                                <div className="w-full max-w-full lg:max-w-[29.99%] flex  relative min-h-px">
                                    <div className="flex items-start content-start  w-full flex-wrap top-[13%] z-10 h-fit sticky ">
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
                                            {/* <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true, amount: 0.2 }}
                                                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                                                // className="bg-[#12203d] relative inline-flex items-center justify-center w-max overflow-hidden text-white rounded-xl group"
                                                className="relative inline-flex items-center justify-center overflow-hidden gap-2 rounded-xl bg-[#0d1b2a]  text-sm font-semibold text-white transition-colors group"
                                            >
                                                <span className="absolute w-0 h-0 transition-all duration-750 delay-300 ease-in-out bg-[#D68029] rounded group-hover:w-56 group-hover:h-56"></span>

                                                <a href="/faqs"
                                                    // className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold">
                                                    className="relative tracking-tight rounded-[10px] text-sm sm:text-base font-semibold px-6 py-3 sm:px-8 sm:py-4 text-white transition-colors ">
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
                                            </motion.div> */}
                                                <Button
                                                    motionProps={{
                                                        initial: { opacity: 0, scale: 0.8 },
                                                        whileInView:{ opacity: 1, scale: 1 },
                                                        viewport:{ once: true, amount: 0.2 },
                                                        transition:{ duration: 0.5, ease: "easeOut", delay: 0.1 }
                                                    }}
                                                    text="Explore More"
                                                    href="/faqs"
                                                    icon="/navbar/btn_icon.png"
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full max-w-full lg:max-w-[70%] flex relative min-h-px">
                                    <div className="flex  w-full content-start relative flex-wrap">
                                        <div className="w-full text-start box-border relative">
                                            {hireMainPageData.pricePathAndFAQ.faq.length > 0 &&
                                                hireMainPageData.pricePathAndFAQ.faq.map((item, index) => {
                                                    const isOpen = activeIndex === index;
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="mb-5 w-full rounded-lg bg-white p-2.5 shadow-[0_0_9px_0px_rgba(0,0,0,0.25)] border border-[#d5d8dc] box-border  "
                                                        >
                                                            <div
                                                                className="cursor-pointer w-full py-4 px-5 box-border  flex items-center justify-between font-bold gap-2"
                                                                onClick={() => toggleAccordion(index)}
                                                            >
                                                                <span className="font-semibold   text-[20px] text-black">
                                                                    {item.question}
                                                                </span>
                                                                <span className="w-[1em] inline-block">
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
                                                                                className="prose max-w-none  font-normal text-[#6f6f6f]  
                                                                                    [&_a]:text-[#d68029] [&_a]:no-underline "
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: item.answer,
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
                </Row>
            </Section>
            <RelatedBlogs subCategory="CMS Development" />
        </main>
    );
}

const Card = ({
    image,
    label,
    description,
}: {
    image: string;
    label: string;
    description: string;
}) => (
    <div className="bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.1)] overflow-hidden h-full flex flex-col">
        <div className="p-5 bg-[#f3d9bf] flex items-center gap-5">
            <Image
                src={image}
                alt={label}
                width={40}
                height={40}
                className="object-contain shrink-0"
            />
            <h4 className="font-bold text-lg text-[#12203D]">{label}</h4>
        </div>
        <div className="p-5 grow">
            <p className="text-gray-600 text-base leading-relaxed">{description}</p>
        </div>
    </div>
);
