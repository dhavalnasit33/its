// "use client";

// import Image from "next/image";
// import { LuListTodo } from "react-icons/lu";
// import { FaStar } from "react-icons/fa";
// import { easeInOut, motion } from "framer-motion";
// import { HiOutlineUser } from "react-icons/hi";
// import { useCallback, useEffect, useState } from "react";
// import { AboutUs, SingleResponse } from "@/types";
// import apiService from "@/lib/apiService";
// import Motion from "@/components/motionbar";
// import TechnologyTabs from "../../components/home/TechnologySection";
// import Industries from "@/components/home/Industries";
// import Testimonials from "@/components/home/Testimonials";
// import NotFoundPage from "@/components/NotFoundPage";

// import { Metadata } from "next";
// import { getSeoData } from "@/lib/seoService";
// import ParallaxShape from "@/components/home/ParallaxShape";
// import Section from "@/components/Section";
// import Row from "@/components/Row";
// import Button from "@/components/Button";
// import UnderConstructionPage from "@/components/UnderConstruction";
// interface AboutUsClientProps {
//   title: string;
// }

// // export default function AboutClient() {
// export default function AboutUsClient({ title }: AboutUsClientProps) {
//   const floatAnimation = {
//     initial: { x: 0 },
//     animate: { x: [5, -5, 5], y: [5, -5, 5] },
//     transition: { duration: 4, repeat: Infinity, ease: easeInOut, delay: 0.5 },
//   };

//   const [gettngAboutUsData, setGettngAboutUsData] = useState(true);
//   const [aboutUsData, setAboutUsData] = useState<AboutUs | null>(null);

//   const fetchAboutUsData = useCallback(async () => {
//     setGettngAboutUsData(true);
//     try {
//       const response = await apiService<SingleResponse<AboutUs>>("/about-us");
//       if (response.success) {
//         setAboutUsData(response.data || []);
//       } else {
//         console.log("Failed to fetch About Us data:", response.message);
//       }
//     } catch (error: any) {
//       console.log(error.message);
//     } finally {
//       setGettngAboutUsData(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAboutUsData();
//   }, []);

//   if (gettngAboutUsData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D68029]"></div> */}
//           <Image
//             src="/LoderIcon.png" // place image in public folder
//             alt="Loading"
//             width={80}
//             height={80}
//           />
//         </div>
//     );
//   }

//   if (!aboutUsData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <NotFoundPage />
//       </div>
//     );
//   }
 

//   return (
//     <>
//       {/* SECTION 1: ABOUT US HERO */}
//       <Section className=" w-full flex flex-col-reverse xl:flex-row items-center justify-center px-6 sm:px-8 md:px-20 gap-10 common_background_gradient bg-white z-10">
//         {/* Left Content */}
//         <div className="w-full z-10 max-w-[100%] lg:max-w-[90%] xl:max-w-xl text-gray-800">
//           {/* Subtitle */}  
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.2, ease: "easeOut" }}
//             className="flex items-center mb-4 space-x-2 text-gray-500 uppercase text-sm sm:text-md tracking-widest font-semibold"
//           >
//             <Image
//               src="/aboutus/sub-title-icon.svg"
//               alt="sub-title icon"
//               width={18}
//               height={18}
//             />
//             <h6>About Our Company</h6>
//           </motion.div>
//           {/* Heading (top → bottom) */}
//           <motion.h1
//             initial={{ opacity: 0, y: -40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
//             className="mb-5 text-4xl md:text-[42px] lg:text-[46px] leading-snug font-semibold"
//           >
//             {/* <h1 className="text-3xl sm:text-4xl md:text-[46px] leading-snug font-semibold"> */}
//               {aboutUsData.heroSection.title}
//             {/* </h1> */}
//           </motion.h1>
//           {/* Paragraph (bottom → top) */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
//             className="mb-6 w-full"
//           >
//             <p className="text-[#6f6f6f] text-base sm:text-lg md:text-[18px] font-medium leading-7 sm:leading-8"
//               // {aboutUsData.heroSection.description}
//               dangerouslySetInnerHTML={{ __html: aboutUsData?.heroSection?.description  || "", }}
//             />
//           </motion.div>
//           {/* Button (bottom → top) */}
//           {/* <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
//           >
//             <div className="bg-[#D68029] relative inline-flex items-center justify-center w-max overflow-hidden text-white rounded-xl group">
//               <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#21203d] rounded group-hover:w-56 group-hover:h-56"></span>
//               <a
//                 href="#contact-form-section"
//                 className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold"
//               >
//                 <span className="flex flex-row gap-3 justify-center">
//                   Let&apos;s Discuss
//                 </span>
//               </a>
//             </div>
//           </motion.div> */}
//           {/* <motion.div 
//            initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
//             className="relative inline-flex items-center justify-center overflow-hidden gap-2 rounded-xl bg-[#D68029]   font-semibold text-white transition-colors group" >
//               <span className="absolute w-0 h-0 transition-all duration-750 delay-300 ease-in-out bg-[#0d1b2a] rounded group-hover:w-56 group-hover:h-56"></span>
//               <a
//                   href="#contact-form-section"
//                   className="relative tracking-tight rounded-[10px] text-sm sm:text-base font-semibold px-6 py-3 sm:px-8 sm:py-4 text-white transition-colors ">
//               <span className="flex flex-row gap-3 justify-center">
//                   Let&apos;s Discuss
//               </span>
//               </a>
//           </motion.div> */}
//           <Button
//                 motionProps={{
//                     initial: { opacity: 0, y: 40 },
//                     animate:{ opacity: 1, y: 0 },
//                     transition:{ duration: 0.8, ease: "easeOut", delay: 0.6 }
//                 }}
//                 bgColor="#D68029"
//                 hoverColor="#0d1b2a"
//                 text="Let&apos;s Discuss"
//                 href="#contact-form-section"
//             />
//         </div>
//         {/* Right Image and Stats */}
//         <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-3xl">
//           {/* Main Illustration */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//           >
//             <Image
//               src={aboutUsData.heroSection.image}
//               alt="Isometric illustration"
//               width={623}
//               height={623}
//               className="w-full h-auto drop-shadow-lg"
//             />
//           </motion.div>
//           {/* Floating Bubbles */}
//           {Array.isArray(aboutUsData?.heroSection?.points) && aboutUsData.heroSection.points.map((point, index) => {
//             const labelParts = point.label.split(" ");
//             const mainText = labelParts[0];
//             const subText = labelParts.slice(1).join(" ");
//             const positions = [
//               "top-[6%] left-[2%] sm:top-[12%] sm:-left-0 md:top-[16%] md:left-[3%]", // Top-left
//               "top-[8%] right-[1%] sm:top-[16%] sm:right-[1%] md:top-[22%] md:-right-[3%]", // Top-right
//               "bottom-[8%] left-0 sm:bottom-[12%] sm:-left-0 md:bottom-[14%] md:-left-[3%]", // Bottom-left
//               "bottom-[5%] right-[1%] sm:bottom-[11%] sm:-right-[1%] md:bottom-[14%] md:-right-[6%]", // Bottom-right
//             ];
//             return (
//               <motion.div
//                 key={index}
//                 {...floatAnimation}
//                 className={`
//                                     absolute z-10 pointer-events-none select-none
//                                     flex items-center gap-2 md:gap-3 bg-white/90 backdrop-blur-sm drop-shadow-lg rounded-2xl
//                                     p-2 md:p-4 w-max text-[13px] md:text-xl font-semibold text-gray-800
//                                     ${positions[index % positions.length]}
//                                 `}
//               >
//                 {point.image ? (
//                   <Image
//                     src={point.image}
//                     alt={`${point.label} icon`}
//                     width={40}
//                     height={40}
//                     className=" w-8 sm:w-12 h-8  sm:h-12 object-contain sm:mr-2"
//                   />
//                 ) : (
//                   <div className=" w-8 sm:w-10 h-8  sm:h-10 bg-gray-200 rounded-md animate-pulse sm:mr-2"></div>
//                 )}
//                 <p className="flex flex-col leading-tight">
//                   {mainText}
//                   <span className="text-[11px] sm:text-md md:text-lg lg:text-xl font-medium">
//                     {subText}
//                   </span>
//                 </p>
//               </motion.div>
//             );
//           })}
//           {/* Bubbles stay visible on ALL sizes; positions change per breakpoint */}
//           {/* Top-left */}
//           {/* <motion.div
//                         {...floatAnimation}
//                         className="
//               absolute z-10 pointer-events-none select-none
//               top-[6%] left-[2%]
//               sm:top-[12%] sm:-left-0
//               md:top-[16%] md:left-[3%]
//               flex items-center gap-2 md:gap-3 bg-white/90 backdrop-blur-sm drop-shadow-lg rounded-2xl
//               p-2 md:p-4 w-max md:w-56 lg:w-60 text-[13px] md:text-xl font-semibold text-gray-800
//             "
//                     >
//                         <span className=" p-1 sm:p-1.5 md:p-2 bg-[#d68029] mr-2 md:mr-4 rounded-md text-white inline-flex items-center justify-center">
//                             <LuListTodo className=" text-sm md:text-lg lg:text-2xl " />
//                         </span>
//                         <p className="flex flex-col leading-tight">
//                             20+
//                             <span className="text-[11px] sm:text-md md:text-lg lg:text-xl font-medium">
//                                 Professionals
//                             </span>
//                         </p>
//                     </motion.div> */}
//           {/* Top-right */}
//           {/* <motion.div
//                         {...floatAnimation}
//                         className="
//               absolute z-10 pointer-events-none select-none
//               top-[8%] right-[1%]
//               sm:top-[16%] sm:right-[1%]
//               md:top-[22%] md:-right-[3%]
//               flex items-center gap-2 md:gap-3 bg-white/90 backdrop-blur-sm drop-shadow-lg rounded-2xl
//               p-2 md:p-4 w-max md:w-56 lg:w-60 text-[13px] md:text-xl font-semibold text-gray-800
//             "
//                     >
//                         <span className="p-1 sm:p-1.5 md::p-2 rounded-md mr-2 md:mr-4 text-[#f2c94c] inline-flex items-center justify-center">
//                             <FaStar className=" text-sm md:text-lg lg:text-2xl " />
//                         </span>
//                         <p className="flex flex-col leading-tight">
//                             100+
//                             <span className="text-[11px] sm:text-md md:text-lg lg:text-xl font-medium">
//                                 Happy Clients
//                             </span>
//                         </p>
//                     </motion.div> */}
//           {/* Bottom-left */}
//           {/* <motion.div
//                         {...floatAnimation}
//                         className="
//     absolute z-10 pointer-events-none select-none
//               bottom-[8%] left-0
//               sm:bottom-[12%] sm:-left-0
//               md:bottom-[14%] md:-left-[3%]
//               flex items-center gap-2 md::gap-3 bg-white/90 backdrop-blur-sm drop-shadow-lg rounded-2xl
//               p-2 md:p-4 w-max md:w-56 lg:w-60 text-[13px] md:text-xl font-semibold text-gray-800
//             "
//                     >
//                         <span className="p-1.5 md:p-2 bg-[#d68029] mr-2 md:mr-4 rounded-md text-white inline-flex items-center justify-center">
//                             <Image
//                                 src="/aboutus/LAPDServiceStripe.png"
//                                 alt="Years Icon"
//                                 width={20}
//                                 height={20}
//                                 className=" text-sm md:text-2xl w-[20px] md:w-[30px] "
//                             />
//                         </span>
//                         <p className="flex flex-col leading-tight">
//                             8+
//                             <span className="text-[11px] sm:text-md md:text-lg lg:text-xl font-medium">
//                                 Glorious Years
//                             </span>
//                         </p>
//                     </motion.div> */}
//           {/* Bottom-right */}
//           {/* <motion.div {...floatAnimation}
//                         className="
//               absolute z-10 pointer-events-none select-none
//               bottom-[5%] right-[1%]
//               sm:bottom-[11%] sm:-right-[1%]
//               md:bottom-[14%] md:-right-[6%]
//               flex items-center gap-2 md:gap-3 bg-white/90 backdrop-blur-sm drop-shadow-lg rounded-2xl
//               p-2 md:p-4 w-max md:w-[250px] lg:w-[270px] text-[13px] md:text-xl font-semibold text-gray-800
//             "
//                     >
//                         <span className="p-1.5 md:p-2 bg-[#d68029] mr-2 md:mr-4 rounded-md text-white inline-flex items-center justify-center">
//                             <HiOutlineUser className=" text-sm md:text-lg lg:text-2xl " />
//                         </span>
//                         <p className="flex flex-col leading-tight">
//                             750+
//                             <span className="text-[11px] sm:text-md md:text-lg lg:text-xl font-medium">
//                                 Projects Delivered
//                             </span>
//                         </p>
//                     </motion.div> */}
//         </div>
//       </Section>

//       {/* SECTION 2: WHO WE ARE */}
//       {/* <section className="w-full mx-auto py-[50px] relative bg-white">
//                 <div className="  w-full max-w-[90%] lg:max-w-[80%] mx-auto   relative">
//                     <div className=" w-full flex flex-col lg:flex-row items-center justify-center gap-10 ">

//                         <motion.div
//                             initial={{ opacity: 0, y: 40 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.8, delay: 0.6 }}
//                             className="w-full   flex items-center justify-center"
//                         >
//                             <div className="relative w-full h-auto p-12 md:p-20 flex justify-center items-center">
//                                 {aboutUsData?.whoWeAre?.image && (
//                                     <Image
//                                         src={aboutUsData.whoWeAre.image}
//                                         alt="Who We Are - Circle"
//                                         width={800}
//                                         height={800}
//                                         className="w-full h-auto animate-spin-slow"
//                                     />
//                                 )}
//                             </div>
//                         </motion.div> 
//                         <div className="w-full   text-gray-900">
//                             <motion.div
//                                 initial={{ opacity: 0, y: -40 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 viewport={{ once: true, amount: 0.3 }}
//                                 transition={{ duration: 0.6, ease: "easeOut" }}
//                                 className="mb-6 common_htags left_htags"
//                             >
//                                 <h2 className="text-3xl sm:text-4xl md:text-[46px] relative leading-snug font-semibold">
//                                     Who We Are
//                                 </h2>
//                             </motion.div>
//                             <motion.ul
//                                 initial={{ opacity: 0, y: 160 }}   // Start lower & hidden
//                                 whileInView={{ opacity: 1, y: 0 }} // Move up into place
//                                 viewport={{ once: true, amount: 0.3 }}
//                                 transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
//                                 className="rhombus_icon_list  text-[#6f6f6f]   text-[18px]/[30px] font-medium leading-7 sm:leading-8  "
//                             >
//                                 {aboutUsData?.whoWeAre?.description?.map((desc, idx) => (
//                                     <li key={idx}  > */}
//       {/* <Image
//                                     src="/square-list-icon.svg"
//                                     alt="Bullet point icon"
//                                     width={16}
//                                     height={16}
//                                     className="mr-3 mt-6"
//                                 /> */}
//       {/* <p>{desc}</p>
//                                     </li>
//                                 ))}
//                             </motion.ul>

//                         </div>
//                     </div>
//                 </div>
//             </section> */}

//       <Section className="bg-white ">
//         {/* <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex gap-8 flex-col relative lg:flex-row"> */}
//         <Row className="flex gap-8 flex-col relative lg:flex-row">
//           <div className="flex w-full relative min-h-px content-center items-center max-w-full lg:max-w-[50%]">
//             <div className="flex flex-col  content-center items-center relative w-full">
//               <motion.div
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.6 }}
//                 className="w-full text-center relative"
//               >
//                 <div className="relative w-full h-auto px-12 md:px-20 flex justify-center items-center">
//                   {aboutUsData?.whoWeAre?.image ? (
//                     <Image
//                       src={aboutUsData.whoWeAre.image}
//                       alt="Who We Are - Circle"
//                       width={800}
//                       height={800}
//                       className="w-full h-auto "
//                     />
//                   ) : (
//                     <div className="w-full h-85.75 bg-gray-200 rounded-lg animate-pulse"></div>
//                   )}
//                 </div>

//                 {/* {aboutUsData?.whoWeAre?.image && (
//                                     <Image
//                                         src={aboutUsData.whoWeAre.image}
//                                         alt="Who We Are - Circle"
//                                         width={800}
//                                         height={800}
//                                         className="w-full h-auto animate-spin-slow"
//                                     />
//                                 )} */}
//               </motion.div>
//             </div>
//           </div>
//           <div className="flex w-full relative min-h-px max-w-full lg:max-w-[50%]">
//             <div className="flex flex-col content-center justify-center  items-center relative w-full">
//               <motion.div
//                 initial={{ opacity: 0, y: -60 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{ duration: 0.6, ease: "easeOut" }}
//                 className="mb-6 text-left w-full common_htags left_htags"
//               >
//                 <h2 className="common-h2-small relative text-black">
//                   Who We Are
//                 </h2>
//               </motion.div>
//               <motion.div
//                 initial={{ opacity: 0, y: 160 }} // Start lower & hidden
//                 whileInView={{ opacity: 1, y: 0 }} // Move up into place
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
//                 className="rhombus_icon_list  text-[#6f6f6f]   text-[18px]/[30px] font-medium leading-7 sm:leading-8  "
//                 dangerouslySetInnerHTML={{
//                       __html: aboutUsData?.whoWeAre?.description || "",
//                     }}
//               >
//                 {/* {aboutUsData?.whoWeAre?.description?.map((desc, idx) => (
//                   <li key={idx}>
//                     <Image
//                                     src="/square-list-icon.svg"
//                                     alt="Bullet point icon"
//                                     width={16}
//                                     height={16}
//                                     className="mr-3 mt-6"
//                                 />
//                     <p>{desc}</p>
//                   </li>
//                 ))} */}
//               </motion.div>
//             </div>
//           </div>
//         </Row>
//         {/* </div> */}
//       </Section>

//       {/* SECTION 3: JUST KNOW ABOUT OUR GOALS */}
//       <Section
//         className=" bg-white
//             [background:linear-gradient(90deg,#ff9f3_0%,rgba(255,249,243,0)_55.69%)]"
//       >
//         {/* <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto relative"> */}
//         <Row>
//           <div className="flex flex-col items-center justify-center text-center w-full relative">
//             <div className="flex flex-col items-center w-full justify-center text-center mb-10">
//               <h2 className="common-h2 text-gray-900 relative">
//                 Just Know About Our Goals
//               </h2>
//               <Motion />
//             </div>

//             <div className="flex flex-col gap-8 md:gap-12   w-full mx-auto">
//               {/* Mission */}
//               <motion.div
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{ duration: 0.6, ease: "easeOut" }}
//                 className="flex flex-col md:flex-row justify-center md:items-center relative"
//               >
//                 <div className="shrink-0 mx-auto items-center text-[30px] font-bold text-[#ffce9d] md:pr-6">
//                   <span>01</span>
//                 </div>
//                 <div className="relative flex flex-col md:flex-row items-center w-full py-4">
//                   <div className="shrink-0 flex items-center px-6 mr-4 md:border-l md:border-[#ffce9d]">
//                     {aboutUsData?.goals?.missionImage && (
//                       <Image
//                         src={aboutUsData.goals.missionImage}
//                         alt="Mission icon"
//                         width={47}
//                         height={47}
//                       />
//                     )}
//                   </div>
//                   <div className="flex-1 text-center md:text-left">
//                     <h4 className="text-[20px] font-semibold text-black mb-2">
//                       {aboutUsData?.goals?.missionTitle}
//                     </h4>
//                     <p className="text-[#6f6f6f] text-base sm:text-lg"
//                       //  {aboutUsData?.goals?.missionDescription} 
//                       dangerouslySetInnerHTML={{ __html: aboutUsData?.goals?.missionDescription  || "" }}
//                     />
//                   </div>
//                 </div>
//               </motion.div>
//               <hr className="border-t border-gray-200" />

//               {/* Vision */}
//               <motion.div
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
//                 className="flex flex-col md:flex-row justify-center md:items-center relative"
//               >
//                 <div className="shrink-0 mx-auto items-center text-[30px] font-bold text-[#ffce9d] md:pr-6">
//                   <span>02</span>
//                 </div>
//                 <div className="relative flex flex-col md:flex-row items-center w-full py-4">
//                   <div className="shrink-0 flex items-center px-6 mr-4 md:border-l md:border-[#ffce9d]">
//                     {aboutUsData?.goals?.visionImage && (
//                       <Image
//                         src={aboutUsData.goals.visionImage}
//                         alt="Vision icon"
//                         width={47}
//                         height={47}
//                       />
//                     )}
//                   </div>
//                   <div className="flex-1 text-center md:text-left">
//                     <h4 className="text-[20px] font-semibold text-black mb-2">
//                       {aboutUsData?.goals?.visionTitle}
//                     </h4>
//                     <p className="text-[#6f6f6f] text-base sm:text-lg">
//                       {aboutUsData?.goals?.visionDescription}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//               <hr className="border-t border-gray-200" />

//               {/* Core Values */}
//               <motion.div
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
//                 className="flex flex-col md:flex-row justify-center md:items-center relative"
//               >
//                 <div className="shrink-0 mx-auto items-center text-[30px] font-bold text-[#ffce9d] md:pr-6">
//                   <span>03</span>
//                 </div>
//                 <div className="relative flex flex-col md:flex-row items-center w-full py-4">
//                   <div className="shrink-0 flex items-center px-6 mr-4 md:border-l md:border-[#ffce9d]">
//                     {aboutUsData?.goals?.valuesImage && (
//                       <Image
//                         src={aboutUsData.goals.valuesImage}
//                         alt="Values icon"
//                         width={47}
//                         height={47}
//                       />
//                     )}
//                   </div>
//                   <div className="flex-1 text-center md:text-left">
//                     <h4 className="text-[20px] font-semibold text-black mb-2">
//                       {aboutUsData?.goals?.valuesTitle}
//                     </h4>
//                     <p className="text-[#6f6f6f] text-base sm:text-lg">
//                       {aboutUsData?.goals?.valuesDescription}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </Row>
//         {/* </div> */}
//       </Section>

//       {/* SECTION 4: UNIQUE FEATURES */}
//       {/* SECTION 4: UNIQUE FEATURES */}
//       <Section className="bg-white overflow-x-hidden lg:!pb-0">
//         {/* <div className="w-full max-w-[90%] lg:max-w-[80%] relative mx-auto"> */}
//         <Row>
//           <div className="flex flex-col lg:flex-row items-center w-full  justify-between gap-8">
//             {/* Left Features - 3 items */}
//             <motion.div
//               initial={{ opacity: 0, x: -150 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
//               className="w-full xl:w-72  flex flex-col sm:flex-row lg:flex-col justify-center lg:justify-end gap-8 lg:gap-20"
//             >
//               <div className="bg-[#e5f2ff] py-6 px-6 sm:px-2 lg:px-6 rounded-2xl shadow-md flex justify-center items-center gap-4 w-full  lg:w-auto">
//                 <div className="p-1.5 lg:p-3">
//                   <Image
//                     src="/aboutus/upwork.png"
//                     alt="Upwork Icon"
//                     width={45}
//                     height={45}
//                   />
//                 </div>
//                 <div className="text-left">
//                   <h4 className="font-semibold text-[#12203d] text-lg">
//                     Upwork <br /> Top Rated+
//                   </h4>
//                 </div>
//               </div>

//               <div className="bg-[#fde6f0] py-6 px-6 sm:px-2 lg:px-6 rounded-2xl shadow-md flex  justify-center items-center gap-4 w-full  lg:w-auto">
//                 <div className="p-1.5 lg:p-3">
//                   <Image
//                     src="/aboutus/freelancer.png"
//                     alt="Freelancer Icon"
//                     width={45}
//                     height={45}
//                   />
//                 </div>
//                 <div className="text-left">
//                   <h4 className="font-semibold text-[#12203d] text-lg">
//                     Preferred <br /> Freelancer
//                   </h4>
//                 </div>
//               </div>

//               <div className="bg-[#d9f3e9] py-6 px-6 sm:px-2 lg:px-6 rounded-2xl shadow-md flex  justify-center items-center gap-4 w-full  lg:w-auto">
//                 <div className="p-1.5 lg:p-3">
//                   <Image
//                     src="/aboutus/industry.png"
//                     alt="Industry Icon"
//                     width={45}
//                     height={45}
//                   />
//                 </div>
//                 <div className="text-left">
//                   <h4 className="font-semibold text-[#12203d] text-lg">
//                     8+ Years of <br /> Industry
//                   </h4>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Center Image */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.7 }}
//               className="w-full max-w-lg  mx-auto lg:mx-0 "
//             >
//               <Image
//                 src="/aboutus/Virtual-reality-amico.png"
//                 alt="Unique Features Illustration"
//                 width={563}
//                 height={563}
//                 className="w-full h-auto"
//               />
//             </motion.div>

//             {/* Right Features - 3 items */}
//             <motion.div
//               initial={{ opacity: 0, x: 150 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
//               className="w-full  xl:w-72  flex flex-col sm:flex-row lg:flex-col justify-center lg:justify-start gap-8 lg:gap-20"
//             >
//               <div className="bg-[#eff4d6] py-6 px-6 sm:px-2 lg:px-6 rounded-2xl shadow-md flex  justify-center items-center gap-4 w-full  xl:w-auto">
//                 <div className="p-1.5 lg:p-3">
//                   <Image
//                     src="/aboutus/growth.png"
//                     alt="Growth Icon"
//                     width={45}
//                     height={45}
//                   />
//                 </div>
//                 <div className="text-left">
//                   <h4 className="font-semibold text-[#12203d] text-lg">
//                     2x Growth <br /> Rate
//                   </h4>
//                 </div>
//               </div>

//               <div className="bg-[#f7e5ff] py-6 px-6 sm:px-2 lg:px-6 rounded-2xl shadow-md flex  justify-center items-center gap-4 w-full  xl:w-auto">
//                 <div className="p-1.5 lg:p-3">
//                   <Image
//                     src="/aboutus/team.png"
//                     alt="Teamwork Icon"
//                     width={45}
//                     height={45}
//                   />
//                 </div>
//                 <div className="text-left">
//                   <h4 className="font-semibold text-[#12203d] text-lg">
//                     300+ Experts <br /> Team
//                   </h4>
//                 </div>
//               </div>

//               <div className="bg-[#fff1e0] py-6 px-6 sm:px-2 lg:px-6 rounded-2xl shadow-md flex  justify-center items-center gap-4 w-full xl:w-auto">
//                 <div className="p-1.5 lg:p-3">
//                   <Image
//                     src="/aboutus/projects.png"
//                     alt="Project Icon"
//                     width={45}
//                     height={45}
//                   />
//                 </div>
//                 <div className="text-left">
//                   <h4 className="font-semibold text-[#12203d] text-lg">
//                     720+ Projects <br /> Accomplished
//                   </h4>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </Row>
//         {/* </div> */}
//       </Section>

//      {/* <section className="bg-[rgba(255,255,255,0.08)] relative z-10">
// 				<span className="clipped-bottom bg-white h-[150px] w-full none lg:block rounded-tl-[100px] rounded-tr-[100px]" />
// 			</section> */}
//       <ParallaxShape type="bottom" />
//       <TechnologyTabs />
//       {/* <ParallaxShape type="top"  bg="bg-[#0d1b2a]"/> */}

//       {/* <section className="bg-[rgba(255,255,255,0.08)] relative -mb-1 ">
// 				<span className="clipped-top bg-white h-[150px] w-full none lg:block rounded-tl-[100px] rounded-tr-[100px]" />
// 			</section> */}
      
//       <Industries />
//       <Testimonials />
//     </>
//   );
// }




"use client";

import Image from "next/image";
import { LuListTodo } from "react-icons/lu";
import { FaLightbulb, FaStar } from "react-icons/fa";
import { easeInOut, motion } from "framer-motion";
import { HiOutlineUser } from "react-icons/hi";
import { useCallback, useEffect, useState } from "react";
import { AboutUs, SingleResponse } from "@/types";
import apiService from "@/lib/apiService";
import Motion from "@/components/motionbar";
import TechnologyTabs from "../../components/home/TechnologySection";
import Industries from "@/components/home/Industries";
import Testimonials from "@/components/home/Testimonials";
import NotFoundPage from "@/components/NotFoundPage";

import { Metadata } from "next";
import { getSeoData } from "@/lib/seoService";
import ParallaxShape from "@/components/home/ParallaxShape";
import Section from "@/components/Section";
import Row from "@/components/Row";
import Button from "@/components/Button";
import UnderConstructionPage from "@/components/UnderConstruction";
import { FaEye } from "react-icons/fa6";
import { BiBarChart } from "react-icons/bi";
import { FiTarget } from "react-icons/fi";
import PlatformSlider from "@/components/home/PlatformSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";


interface AboutUsClientProps {
  title: string;
}

const ratings = [
  {
    rating: "5.0",
    stars: 5,
    logo: "/home/clutch-logo.png",
    name: "Clutch",
  },
  {
    rating: "5.0",
    stars: 5,
    logo: "/home/upwork-logo.png",
    name: "GoodFirms",
  },
  {
    rating: "4.9",
    stars: 4.5,
    logo: "/home/google-logo.png",
    name: "Google",
  },
  {
    rating: "4.7",
    stars: 4,
    logo: "/home/glassdoor-logo.png",
    name: "AmbitionBox",
  },
];

const features = [
  {
    title: "Global Exposure",
    icon: "/aboutus/global.png",
    description:
      "We speak the language of code, in every time zone. We've delivered top-notch software solutions in the USA, UK, Canada, Europe, and Australia for 8+ years.",
  },
  {
    title: "Lasting Impact",
    icon: "/aboutus/lasting.png",
    description:
      "We unlock your business's hidden potential. Through customized solutions and lasting partnerships. That's the Patoliya Infotech difference.",
  },
  {
    title: "Digital Architects",
    icon: "/aboutus/digital.png",
    description:
      "Our top-tech magicians don't simply code; they create solutions in PHP, MERN, MEAN, hybrids, mobile magic, and AI.",
  },
];

const statsData = [
  {
    count: "12",
    suffix: "+",
    label: "Glorious Years",
  },
  {
    count: "40",
    suffix: "+",
    label: "Happy Clients",
  },
  {
    count: "750",
    suffix: "+",
    label: "Projects Delivers",
  },
  {
    count: "20",
    suffix: "+",
    label: "Professionals",
  },
];

const countries = [
  { name: "USA", flag: "/aboutus/usa.png" },
  { name: "Japan", flag: "/aboutus/japan.png" },
  { name: "Canada", flag: "/aboutus/canada.png" },
  { name: "United Kingdom", flag: "/aboutus/uk.png" },
  { name: "Australia", flag: "/aboutus/australia.png" },
  { name: "Germany", flag: "/aboutus/germany.png" },
  { name: "Israel", flag: "/aboutus/Israel.png" },
  
  { name: "Italy", flag: "/aboutus/italy.png" },
  { name: "France", flag: "/aboutus/france.png" },
  { name: "Norway", flag: "/aboutus/norway.png" },
  { name: "Singapore", flag: "/aboutus/singapore.png" },
  { name: "Sweden", flag: "/aboutus/sweden.png" },
];

// export default function AboutClient() {
export default function AboutUsClient({ title }: AboutUsClientProps) {
  const floatAnimation = {
    initial: { x: 0 },
    animate: { x: [5, -5, 5], y: [5, -5, 5] },
    transition: { duration: 4, repeat: Infinity, ease: easeInOut, delay: 0.5 },
  };
  

  const [gettngAboutUsData, setGettngAboutUsData] = useState(true);
  const [aboutUsData, setAboutUsData] = useState<AboutUs | null>(null);

  const fetchAboutUsData = useCallback(async () => {
    setGettngAboutUsData(true);
    try {
      const response = await apiService<SingleResponse<AboutUs>>("/about-us");
      if (response.success) {
        setAboutUsData(response.data || []);
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
    fetchAboutUsData();
  }, []);

  console.log("Hero Section:", aboutUsData?.heroSection);
  
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
      <div className="min-h-screen flex items-center justify-center">
        <NotFoundPage />
      </div>
    );
  }
 

  return (
    <>
      {/* SECTION 1: ABOUT US HERO */}
      <Section className="relative w-full items-center justify-center  gap-10 common_background_gradient     bg-white z-1  md:!pb-44 ">
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
            className="rose text-4xl md:text-[42px]  lg:text-[46px]/[130%]  font-bold tracking-[-0.03em] leading-[1.08] text-[#d68029] "
          >
              Inspire Techno Solution
            {/* </h1> */}
          </motion.h2>

          {/* Paragraph (bottom → top) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mb-12 w-full mt-4"
          >
            <p className="text-[#6f6f6f] text-base sm:text-lg md:text-[18px] font-medium leading-7 sm:leading-8"
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
       <Section className="relative z-10 bg-white md:!pb-6 transition-[background,border,border-radius,box-shadow] duration-300 overflow-visible ">
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
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-[540px]:grid-cols-1 md:-mt-[170px] xl:-mt-[180px] !max-w-[750px] mx-auto">
						{ratings.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.15)] flex flex-col justify-center items-center"
              >
                <div>
                  <h3 className="text-[18px] font-medium">
                    Rating {item.rating}
                  </h3>
                  <div className="grow overflow-hidden mt-2 mb-6">
                    <div className="flex items-center gap-1 text-yellow-400  text-xs">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </div>
                  </div>
                </div>
                <Image
                  src={item.logo}
                  alt={item.name}
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
        className=" mb-6 content-start common_htags left_htags"
        >
          <h2 className="common-h2   text-black pb-4">
            Why{" "}
            <span className="text-[#d68029] ">
              Inspire Techno Solutions?
            </span>
          </h2>
        </motion.div>
      
        <motion.div
        // initial={{ opacity: 0, y: 30 }}
        //         whileInView={{ opacity: 1, y: 0 }}
        //         viewport={{ once: true, amount: 0.2 }}
        //         transition={{ duration: 0.6, ease: "easeOut" , delay: 0.6}}
        initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-gray-600 text-lg leading-8">
            Expertise earns respect, ethics earn trust,
            and results earn long-term partnerships.
            That's the standard we hold ourselves to,
            every single project.
          </p>
        </motion.div>
        </div>

        {/* Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10 md:mt-16">

          {features.map((item, index) => (
            <div
            key={index}
              className="group relative overflow-hidden rounded-2xl border  border-gray-200  bg-white  p-6 sm:p-8 transition-all duration-300  hover:shadow-lg "
            >
              <div className=" absolute top-0 left-0 h-1 w-0  bg-[#d68029]  transition-all duration-500  ease-out group-hover:w-full "/>
              <div className=" mb-8 ">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-16 h-16 object-contain "
                />
              </div>

              <h4 className="text-2xl font-bold mb-2">
                {item.title}
              </h4>

              <p className="text-gray-600 fonts_16">
                {item.description}
              </p>
            </div>
          ))}

        </motion.div>
      </Row>
    </Section>
        
        <Section  className="bg-[#0d1b2a] z-10 !py-6 ">
				<Row>
					<PlatformSlider />
				</Row>
			</Section>
      <Section className="bg-gray-50 !py-14">
        <Row>
            <div className="grid grid-cols-2 md:grid-cols-4  justify-center max-md:gap-y-6 ">
    {statsData.map((item, index) => (
      <div
          key={index}
          className={`
          relative  overflow-hidden border-r border-gray-300
          ${(index % 4 === 3) ? "border-r-0" : ""}
          `}
        >
      <motion.div
        key={index}
        className="flex flex-col items-center  gap-1 px-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
        }}
      >
        <h4 className="text-[40px] md:text-[56px] font-extrabold text-[#0d1b2a]">
          {item.count}
          {item.suffix}
        </h4>

        <p className="text-gray-600 font-bold opacity-70 text-sm sm:text-md text-center break-all ">
          {item.label}
        </p>
      </motion.div>
      </div>
    ))}
  </div>
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
                className=" mb-6 content-start common_htags left_htags">
              <h2 className="common-h2">
              Years of Innovation, Growth & Client Satisfaction
              </h2>
            </motion.div>
            <motion.div
            initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
            <p className="text-[#6f6f6f] text-base sm:text-lg md:text-[18px] font-medium leading-7 sm:leading-8 mb-2" >At Synarion IT Solutions, we’ve spent over seven years helping businesses unlock growth through smart technology. Our commitment to innovation, reliable project execution, and a client-first approach has made us a trusted name in the IT industry.</p>

            <p className="text-[#6f6f6f] text-base sm:text-lg md:text-[18px] font-medium leading-7 sm:leading-8">We don’t just deliver software — we deliver peace of mind, measurable results, and long-term partnerships. With a skilled team of developers, designers, and strategists, we turn your ideas into scalable, future-ready digital solutions tailored to your goals.</p>
            </motion.div>
          </div>
					<div className=" w-full relative min-h-px max-w-full lg:max-w-[50%]">
					 <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="flex w-full relative min-h-px max-w-full "
            >
              <Image
                src="/aboutus/Virtual-reality-amico.png"
                alt="Unique Features Illustration"
                width={563}
                height={563}
                className="w-full h-auto"
              />
            </motion.div>
					</div>
				</Row>

			</Section>


      <Section className="py-16  relative bg-white z-10">
        <Row>
            {/* <motion.div 
              initial={{ opacity: 0, y: -70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}></motion.div> */}
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
          {/* RIGHT COLUMN */}
            <motion.div
             initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                 whileHover={{ y: -10, transition: { duration: 0.3 } }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="grid md:grid-cols-2 gap-8">

              {/* Vision */}
              <div className="bg-white rounded-[20px] p-8 shadow-[0_0_20px_rgba(0,0,0,0.15)] border border-gray-100">

                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 bg-orange-100  ">
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

                <p className="text-lg font-normal text-[#6f6f6f] leading-8 tracking-wide   [&_p]:mb-4">
                 {aboutUsData?.goals?.visionDescription}
                </p>

              </div>

              {/* Values */}
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
    </Section>


    <Section className="py-16  relative bg-white z-10 lg:!pb-0">
      <Row>
        <div className="flex flex-col items-center w-full justify-center text-center mb-10">
          <motion.div
                  initial={{ opacity: 0, y: -70 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}>
            <h2 className="common-h2   text-black pb-4">
                We deliver{" "}
                <span className="text-[#d68029] ">
                  Digital Development
                </span>{" "}
                Solution across
              </h2>
            <Motion />
          </motion.div>
          </div>

          <div className="flex items-center gap-4 overflow-hidden bg-gray-100 rounded-lg py-4">
          <div className="flex-1 min-w-0 gap-2">
            <Swiper
              modules={[Autoplay]}
                slidesPerView="auto"
                spaceBetween={30}
                loop={true}
                speed={3000}
                allowTouchMove={false}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                }}
                className="serviceSwiper"
            >

              {countries.map((country) => (
                <SwiperSlide
                  key={country.name}
                  className="!w-auto"
                >
                  <div className="flex flex-col items-center gap-3 rounded-full ">
                    <span className="text-md font-medium whitespace-nowrap mb-1">
                      {country.name}
                    </span>
                    <Image
                      src={country.flag}
                      alt={country.name}
                      width={110}
                      height={52}
                      className="rounded-sm object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Row>
    </Section>
  

{/* 
      <Section className="bg-white ">
        <Row className="flex gap-8 flex-col relative lg:flex-row">
          <div className="flex w-full relative min-h-px content-center items-center max-w-full lg:max-w-[50%]">
            <div className="flex flex-col  content-center items-center relative w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-full text-center relative"
              >
                <div className="relative w-full h-auto px-12 md:px-20 flex justify-center items-center">
                  {aboutUsData?.whoWeAre?.image ? (
                    <Image
                      src={aboutUsData.whoWeAre.image}
                      alt="Who We Are - Circle"
                      width={800}
                      height={800}
                      className="w-full h-auto "
                    />
                  ) : (
                    <div className="w-full h-85.75 bg-gray-200 rounded-lg animate-pulse"></div>
                  )}
                </div>

              
              </motion.div>
            </div>
          </div>
          <div className="flex w-full relative min-h-px max-w-full lg:max-w-[50%]">
            <div className="flex flex-col content-center justify-center  items-center relative w-full">
              <motion.div
                initial={{ opacity: 0, y: -60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-6 text-left w-full common_htags left_htags"
              >
                <h2 className="common-h2-small relative text-black">
                  Who We Are
                </h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 160 }} // Start lower & hidden
                whileInView={{ opacity: 1, y: 0 }} // Move up into place
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
                className="rhombus_icon_list  text-[#6f6f6f]   text-[18px]/[30px] font-medium leading-7 sm:leading-8  "
                dangerouslySetInnerHTML={{
                      __html: aboutUsData?.whoWeAre?.description || "",
                    }}
              >
              </motion.div>
            </div>
          </div>
        </Row>
      </Section> */}

      {/* SECTION 3: JUST KNOW ABOUT OUR GOALS */}
      {/* <Section
        className=" bg-white
            [background:linear-gradient(90deg,#ff9f3_0%,rgba(255,249,243,0)_55.69%)]"
      >
        <Row>
          <div className="flex flex-col items-center justify-center text-center w-full relative">
            <div className="flex flex-col items-center w-full justify-center text-center mb-10">
              <h2 className="common-h2 text-gray-900 relative">
                Just Know About Our Goals
              </h2>
              <Motion />
            </div>

            <div className="flex flex-col gap-8 md:gap-12   w-full mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col md:flex-row justify-center md:items-center relative"
              >
                <div className="shrink-0 mx-auto items-center text-[30px] font-bold text-[#ffce9d] md:pr-6">
                  <span>01</span>
                </div>
                <div className="relative flex flex-col md:flex-row items-center w-full py-4">
                  <div className="shrink-0 flex items-center px-6 mr-4 md:border-l md:border-[#ffce9d]">
                    {aboutUsData?.goals?.missionImage && (
                      <Image
                        src={aboutUsData.goals.missionImage}
                        alt="Mission icon"
                        width={47}
                        height={47}
                      />
                    )}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-[20px] font-semibold text-black mb-2">
                      {aboutUsData?.goals?.missionTitle}
                    </h4>
                    <p className="text-[#6f6f6f] text-base sm:text-lg"
                      dangerouslySetInnerHTML={{ __html: aboutUsData?.goals?.missionDescription  || "" }}
                    />
                  </div>
                </div>
              </motion.div>
              <hr className="border-t border-gray-200" />

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="flex flex-col md:flex-row justify-center md:items-center relative"
              >
                <div className="shrink-0 mx-auto items-center text-[30px] font-bold text-[#ffce9d] md:pr-6">
                  <span>02</span>
                </div>
                <div className="relative flex flex-col md:flex-row items-center w-full py-4">
                  <div className="shrink-0 flex items-center px-6 mr-4 md:border-l md:border-[#ffce9d]">
                    {aboutUsData?.goals?.visionImage && (
                      <Image
                        src={aboutUsData.goals.visionImage}
                        alt="Vision icon"
                        width={47}
                        height={47}
                      />
                    )}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-[20px] font-semibold text-black mb-2">
                      {aboutUsData?.goals?.visionTitle}
                    </h4>
                    <p className="text-[#6f6f6f] text-base sm:text-lg">
                      {aboutUsData?.goals?.visionDescription}
                    </p>
                  </div>
                </div>
              </motion.div>
              <hr className="border-t border-gray-200" />

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                className="flex flex-col md:flex-row justify-center md:items-center relative"
              >
                <div className="shrink-0 mx-auto items-center text-[30px] font-bold text-[#ffce9d] md:pr-6">
                  <span>03</span>
                </div>
                <div className="relative flex flex-col md:flex-row items-center w-full py-4">
                  <div className="shrink-0 flex items-center px-6 mr-4 md:border-l md:border-[#ffce9d]">
                    {aboutUsData?.goals?.valuesImage && (
                      <Image
                        src={aboutUsData.goals.valuesImage}
                        alt="Values icon"
                        width={47}
                        height={47}
                      />
                    )}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-[20px] font-semibold text-black mb-2">
                      {aboutUsData?.goals?.valuesTitle}
                    </h4>
                    <p className="text-[#6f6f6f] text-base sm:text-lg">
                      {aboutUsData?.goals?.valuesDescription}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Row>
      </Section> */}

      {/* SECTION 4: UNIQUE FEATURES */}
      {/* SECTION 4: UNIQUE FEATURES */}
      {/* <Section className="bg-white overflow-x-hidden lg:!pb-0">
        <Row>
          <div className="flex flex-col lg:flex-row items-center w-full  justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, x: -150 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="w-full xl:w-72  flex flex-col sm:flex-row lg:flex-col justify-center lg:justify-end gap-8 lg:gap-20"
            >
              <div className="bg-[#e5f2ff] py-6 px-6 sm:px-2 lg:px-6 rounded-2xl shadow-md flex justify-center items-center gap-4 w-full  lg:w-auto">
                <div className="p-1.5 lg:p-3">
                  <Image
                    src="/aboutus/upwork.png"
                    alt="Upwork Icon"
                    width={45}
                    height={45}
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-[#12203d] text-lg">
                    Upwork <br /> Top Rated+
                  </h4>
                </div>
              </div>

              <div className="bg-[#fde6f0] py-6 px-6 sm:px-2 lg:px-6 rounded-2xl shadow-md flex  justify-center items-center gap-4 w-full  lg:w-auto">
                <div className="p-1.5 lg:p-3">
                  <Image
                    src="/aboutus/freelancer.png"
                    alt="Freelancer Icon"
                    width={45}
                    height={45}
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-[#12203d] text-lg">
                    Preferred <br /> Freelancer
                  </h4>
                </div>
              </div>

              <div className="bg-[#d9f3e9] py-6 px-6 sm:px-2 lg:px-6 rounded-2xl shadow-md flex  justify-center items-center gap-4 w-full  lg:w-auto">
                <div className="p-1.5 lg:p-3">
                  <Image
                    src="/aboutus/industry.png"
                    alt="Industry Icon"
                    width={45}
                    height={45}
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-[#12203d] text-lg">
                    8+ Years of <br /> Industry
                  </h4>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-lg  mx-auto lg:mx-0 "
            >
              <Image
                src="/aboutus/Virtual-reality-amico.png"
                alt="Unique Features Illustration"
                width={563}
                height={563}
                className="w-full h-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 150 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="w-full  xl:w-72  flex flex-col sm:flex-row lg:flex-col justify-center lg:justify-start gap-8 lg:gap-20"
            >
              <div className="bg-[#eff4d6] py-6 px-6 sm:px-2 lg:px-6 rounded-2xl shadow-md flex  justify-center items-center gap-4 w-full  xl:w-auto">
                <div className="p-1.5 lg:p-3">
                  <Image
                    src="/aboutus/growth.png"
                    alt="Growth Icon"
                    width={45}
                    height={45}
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-[#12203d] text-lg">
                    2x Growth <br /> Rate
                  </h4>
                </div>
              </div>

              <div className="bg-[#f7e5ff] py-6 px-6 sm:px-2 lg:px-6 rounded-2xl shadow-md flex  justify-center items-center gap-4 w-full  xl:w-auto">
                <div className="p-1.5 lg:p-3">
                  <Image
                    src="/aboutus/team.png"
                    alt="Teamwork Icon"
                    width={45}
                    height={45}
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-[#12203d] text-lg">
                    300+ Experts <br /> Team
                  </h4>
                </div>
              </div>

              <div className="bg-[#fff1e0] py-6 px-6 sm:px-2 lg:px-6 rounded-2xl shadow-md flex  justify-center items-center gap-4 w-full xl:w-auto">
                <div className="p-1.5 lg:p-3">
                  <Image
                    src="/aboutus/projects.png"
                    alt="Project Icon"
                    width={45}
                    height={45}
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-[#12203d] text-lg">
                    720+ Projects <br /> Accomplished
                  </h4>
                </div>
              </div>
            </motion.div>
          </div>
        </Row>
      </Section> */}

     {/* <section className="bg-[rgba(255,255,255,0.08)] relative z-10">
				<span className="clipped-bottom bg-white h-[150px] w-full none lg:block rounded-tl-[100px] rounded-tr-[100px]" />
			</section> */}
      <ParallaxShape type="bottom" />
      <TechnologyTabs />
      {/* <ParallaxShape type="top"  bg="bg-[#0d1b2a]"/> */}

      {/* <section className="bg-[rgba(255,255,255,0.08)] relative -mb-1 ">
				<span className="clipped-top bg-white h-[150px] w-full none lg:block rounded-tl-[100px] rounded-tr-[100px]" />
			</section> */}
      
      <Industries />
      <Testimonials />
    </>
  );
}
