"use client";

import Image from "next/image";
import {
  FiArrowRight,
  FiBookOpen,
  FiMonitor,
  FiSmartphone,
  FiPenTool,
  FiCode,
  FiTrendingUp,
  FiEdit3,
  FiBriefcase,
} from "react-icons/fi";
import { motion } from "framer-motion";
import CareerGraph from "@/components/CareerGraph";
import Motion from "@/components/motionbar";
import CareerList from "@/components/CareerList";
import { useMediaQuery } from "@/hook/useMediaQuery";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { SingleResponse, TrainingMainPageData } from "@/types";
import apiService from "@/lib/apiService";
import NotFoundPage from "@/components/NotFoundPage";
import Section from "@/components/Section";
import Row from "@/components/Row";
import Button from "@/components/Button";
import UnderConstructionPage from "@/components/UnderConstruction";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";
import {
  BiChart,
  BiClipboard,
  BiCloudDownload,
  BiCompass,
} from "react-icons/bi";
const CareerGrid = dynamic(() => import("@/components/CareerGrid"));
import {
  FaLayerGroup,
  FaDiagramProject,
  FaPen,
  FaClock,
  FaShieldHalved,
  FaUserCheck,
  FaUserGroup,
  FaLaptopCode,
  FaHandshake,
} from "react-icons/fa6";
import TrainingContactForm from "@/components/Footer/TrainingContactForm";
import CommonFAQ from "@/components/FAQ";

const trainingPrograms = [
  {
    icon: FiMonitor,
    color: "#3B82F6",
    title: "Full-Stack Web Development",
    desc: "React.js, Next.js, Node.js, Express, MongoDB & REST APIs",
    hoverDesc:
      "Master HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB, REST APIs, Git, deployment, and real-world full-stack development projects.",
  },
  {
    icon: FiSmartphone,
    color: "#16A34A",
    title: "Mobile App Development",
    desc: "Flutter, React Native, iOS & Android App Development",
    hoverDesc:
      "Learn Flutter, React Native, Android Studio, Firebase, API integration, state management, and publish Android & iOS apps.",
  },
  {
    icon: FiPenTool,
    color: "#DB2777",
    title: "UI/UX Design & Prototyping",
    desc: "Figma, Adobe XD, Wireframing, UI Design & User Research",
    hoverDesc:
      "Create professional UI/UX designs using Figma, Adobe XD, Photoshop, wireframing, prototyping, design systems, and user research.",
  },
  {
    icon: FiCode,
    color: "#7C3AED",
    title: "PHP & Laravel Web Development",
    desc: "Backend PHP, MySQL Databases, Laravel MVC & Web Security",
    hoverDesc:
      "Build secure web applications using PHP, MySQL, Laravel, MVC architecture, authentication, REST APIs, and deployment.",
  },
  {
    icon: FiTrendingUp,
    color: "#D68029",
    title: "Digital Marketing & SEO",
    desc: "Search Engine Optimization, Google Ads, SMM & Web Analytics",
    hoverDesc:
      "Learn SEO, Google Ads, Facebook Ads, Social Media Marketing, Analytics, Email Marketing, and content marketing strategies.",
  },
];

const internshipPrograms = [
  {
    icon: FiCode,
    title: "Web Development Internship",
    desc: "Build production-ready web apps on live corporate projects",
  },
  {
    icon: FiSmartphone,
    title: "Mobile App Development Internship",
    desc: "Deploy cross-platform mobile apps to App & Play Stores",
  },
  {
    icon: FiPenTool,
    title: "UI/UX Design Internship",
    desc: "Design real-world user interfaces, wireframes, and UX flows",
  },
  {
    icon: FiTrendingUp,
    title: "Digital Marketing & SEO Internship",
    desc: "Execute SEO audits, run ad campaigns, and drive traffic",
  },
  {
    icon: FiEdit3,
    title: "Content Writing & Strategy Internship",
    desc: "Write SEO-optimized blog posts, copy, and digital content",
  },
];

const whyChooseSteps = [
  {
    num: "01",
    icon: BiCompass,
    points: "15-minute career fit call",
    title: "Discover",
    desc: "Take a free skill assessment and career consultation to find the track that matches your goals, background, and timeline.",
  },
  {
    num: "02",
    icon: FiBookOpen,
    points: "120+ hours of expert-led content",
    title: "Learn",
    desc: "Work through an industry-relevant curriculum built with hiring partners and refreshed every quarter to match real job requirements.",
  },
  {
    num: "03",
    icon: FiMonitor,
    points: "8 capstone projects",
    title: "Practice",
    desc: "Apply every concept immediately through hands-on labs, sandbox environments, and real client-style assignments.",
  },
  {
    num: "04",
    icon: BiClipboard,
    points: "1:1 mentor review after every module",
    title: "Assess",
    desc: "Get evaluated by mentors against real hiring rubrics, with detailed feedback on where you're strong and what to sharpen next.",
  },
  {
    num: "05",
    icon: FiTrendingUp,
    points: "Personalized growth plan",
    title: "Grow",
    desc: "Close skill gaps through targeted practice, mock interviews, and portfolio reviews that build genuine confidence, not just knowledge.",
  },
  {
    num: "06",
    icon: FiBriefcase,
    points: "92% placement rate within 90 days",
    title: "Succeed",
    desc: "Get placed with our hiring partners through dedicated placement support, resume prep, and direct introductions to recruiters.",
  },
];

const cards = [
  { icon: "/training/trainer.svg", text: "Industry Expert Trainers" },
  { icon: "/training/counseling.svg", text: "Career Counselling" },
  { icon: "/training/placement.svg", text: "100% Placement Assistance" },
  { icon: "/training/softskill.svg", text: "SoftSkill Improvement Sessions" },
  { icon: "/training/job.svg", text: "Job Oriented Courses" },
  { icon: "/training/interview.svg", text: "Interview Support" },
  { icon: "/training/personalized.svg", text: "Personalized Attention" },
  { icon: "/training/community.svg", text: "Lifetime Support Community" },
];

const heroHighlights = [
  { icon: FaLayerGroup, label: "Industry Relevant\nCurriculum" },
  { icon: FaDiagramProject, label: "Hands-on\nProjects" },
  { icon: FaPen, label: "Certificate of\nCompletion" },
  { icon: FaClock, label: "Flexible\nBatch Timings" },
  { icon: FaShieldHalved, label: "100% Practical\nLearning" },
  { icon: FaUserCheck, label: "Placement\nAssistance" },
];

const heroTrustPoints = [
  { icon: FaUserGroup, label: "Expert Trainers" },
  { icon: FaLaptopCode, label: "Real Projects" },
  { icon: FaHandshake, label: "Placement Support" },
];

const trainingFAQs = [
  {
    question: "What types of IT training programs do you offer?",
    answer:
      "We offer comprehensive, job-oriented training courses across multiple disciplines including Full-Stack Web Development (React.js, Next.js, Node.js, Express, MongoDB), Mobile App Development (Flutter, React Native), UI/UX Design and Prototyping (Figma, Adobe XD), PHP & Laravel Development, and Digital Marketing & SEO. All courses are taught by industry experts with hands-on labs.",
  },
  {
    question: "Who can apply for your internship programs?",
    answer:
      "Our internship programs are open to college students, recent graduates, self-taught developers, and career switchers looking to build their professional portfolios. We accept applicants with basic programming or design knowledge who want to gain hands-on, real-world experience working on live client projects.",
  },
  {
    question: "Do you provide placement assistance after course completion?",
    answer:
      "Yes, we provide 100% placement assistance. This includes resume-building workshops, career counseling sessions, mock interview preparation, soft skills improvement, and direct placement opportunities through our network of hiring partners.",
  },
  {
    question: "What is the duration of the training and internship courses?",
    answer:
      "The duration varies depending on the course. On average, our technical training courses run for 3 to 6 months, offering flexible batch timings to accommodate students and working professionals. Our internships typically range from 2 to 6 months.",
  },
  {
    question: "Will I work on live client projects during the internship?",
    answer:
      "Absolutely. Unlike standard classroom assignments, our internship programs focus entirely on practical experience. You will work alongside senior engineers on live client websites, mobile apps, and digital marketing campaigns, helping you build a high-quality portfolio.",
  },
  {
    question: "Will I receive a certificate of completion?",
    answer:
      "Yes, upon successful completion of your training or internship program, you will be awarded an industry-recognized Certificate of Completion. For interns, we also provide a detailed letter of recommendation highlighting the specific projects you worked on and your key technical contributions.",
  },
  {
    question: "What is the fee structure for the courses?",
    answer:
      "Our fee structure is highly competitive and designed to be affordable for students. We offer flexible payment plans, installment options, and special discounts for early registration. Please contact our support team or fill out the enquiry form for detailed pricing on specific courses.",
  },
  {
    question: "Are the classes conducted online or offline?",
    answer:
      "We offer hybrid options to suit your needs. You can choose to attend in-person classes at our institute for hands-on, face-to-face learning and collaboration, or participate in interactive online live sessions if you prefer learning from home.",
  },
  {
    question:
      "Do I need a technical background or computer science degree to enroll?",
    answer:
      "No, a technical background or a CS degree is not required. Our IT training courses are structured from basic to advanced levels, making them accessible to beginners, self-taught individuals, and career switchers.",
  },
  {
    question:
      "Is there a coding test or interview to qualify for the internship program?",
    answer:
      "We conduct a basic assessment or fit-call interview to evaluate your fundamental knowledge and passion. This helps us place you in the correct track (Web, Mobile, Design, or Marketing) to ensure you get the maximum benefit from the internship.",
  },
  // --- NEW SEO-FRIENDLY FAQS ADDED BELOW ---
  {
    question:
      "Do you offer weekend batches or flexible timings for working professionals?",
    answer:
      "Yes, we offer flexible learning options, including weekend batches and evening classes. These are specifically designed for working professionals who want to upgrade their skills in software development, mobile app creation, or digital marketing without leaving their current jobs.",
  },
  {
    question: "What makes your IT training institute different from others?",
    answer:
      "Our IT training institute focuses on 100% practical, project-based learning. Instead of just theoretical concepts, our industry-expert trainers guide you through hands-on projects, sandbox environments, and corporate-level assignments, ensuring you are completely job-ready for the modern tech industry upon graduation.",
  },
  {
    question:
      "Do you provide portfolio building and interview preparation support?",
    answer:
      "Yes, comprehensive portfolio building is a core part of our UI/UX design, web development, and digital marketing training. You will complete multiple capstone projects to showcase to employers. Additionally, we conduct technical mock interviews and HR screening prep to help you stand out to hiring managers.",
  },
  {
    question:
      "Are these certification courses valid for jobs abroad or remote tech roles?",
    answer:
      "Absolutely. The modern tech stacks we teach—such as React, Node.js, Flutter, and UI/UX design—are highly sought after by employers globally. The industry-recognized Certificate of Completion you receive adds significant value to your resume, making you a strong candidate for both local and remote tech jobs.",
  },
  {
    question:
      "Can I switch to a career in IT if I am from a non-technical background?",
    answer:
      "Absolutely! Many of our most successful students and interns come from non-IT backgrounds like commerce, arts, or non-computer engineering. Our foundational modules in software development, UI/UX design, and digital marketing are tailored to help career switchers build practical skills from scratch. With dedicated mentorship, step-by-step guidance, and real-world projects, you can smoothly transition into a high-paying tech career regardless of your previous degree.",
  },
];
export default function TrainingPageClient({
  initialData,
}: {
  initialData?: TrainingMainPageData | null;
}) {
  // Media query for tablet and larger screens (e.g., iPad portrait)
  const isTabletOrLarger = useMediaQuery("(min-width: 768px)");

  // Media query for desktop screens
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [gettingTrainingPageData, setGettingTrainingPageData] =
    useState(!initialData);
  const [trainingMainPageData, setTrainingMainPageData] =
    useState<TrainingMainPageData | null>(initialData || null);

  const fetchTrainingContent = useCallback(async () => {
    setGettingTrainingPageData(true);
    try {
      const responce = await apiService<SingleResponse<TrainingMainPageData>>(
        "/training-main-page",
      );
      if (responce.success) {
        setTrainingMainPageData(responce.data);
      } else {
        console.error(responce.message);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setGettingTrainingPageData(false);
    }
  }, []);

  useEffect(() => {
    if (initialData) {
      setTrainingMainPageData(initialData);
      setGettingTrainingPageData(false);
      return;
    }
    fetchTrainingContent();
  }, [fetchTrainingContent, initialData]);

  if (gettingTrainingPageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d68029]"></div> */}
        <Image
          src="/LoderIcon.png" // place image in public folder
          alt="Loading"
          width={80}
          height={80}
        />
      </div>
    );
  }

  if (!trainingMainPageData) {
    return (
      // <div className="min-h-screen flex items-center justify-center">
      //     <NotFoundPage />
      // </div>
      <UnderConstructionPage />
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-clip ">
      {/* HERO SECTION */}
      <Section className="relative lg:py-14! common_background_gradient overflow-hidden">
        {/* Background Overlay */}
        <motion.div
          className="absolute inset-0 max-sm:hidden z-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            opacity: { duration: 1, ease: "easeOut" },
          }}
        >
          <div
            className="absolute top-8 right-20 w-26 h-15 opacity-30 hidden md:block"
            style={{
              backgroundImage: "radial-gradient(#D68029  2px, transparent 2px)",
              backgroundSize: "12px 12px",
            }}
          />

          {/* Replaced invalid Tailwind classes with standard arbitrary values to ensure smooth circular backgrounds */}
          <div className="absolute -right-[15%] -top-[20%] w-[600px] h-[600px] xl:w-[900px] xl:h-[900px] rounded-full bg-[#D68029]/10 -rotate-12" />
          <div className="absolute -right-[5%] top-[0%] w-[500px] h-[500px] xl:w-[750px] xl:h-[750px] rounded-full bg-[#D68029]/10 -rotate-12" />
          <div className="absolute right-0 top-[15%] w-[400px] h-[400px] xl:w-[600px] xl:h-[600px] rounded-full bg-[#D68029]/10 -rotate-12" />
        </motion.div>

        {/* Content Row - Added relative z-10 to keep it above background blobs */}
        <Row className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Left */}
            <div className="order-2 lg:order-1 z-10">
              <motion.span
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-[#D68029] font-medium uppercase tracking-wide"
              >
                {trainingMainPageData?.heroSection?.subTitle || ""}
              </motion.span>

              <motion.div
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className="text-4xl md:text-[42px] xl:text-5xl font-bold leading-tight mt-3"
              >
                <h1
                  className="text-4xl md:text-[42px] xl:text-5xl font-extrabold mb-5 leading-snug text-black rose max-w-none "
                  dangerouslySetInnerHTML={{
                    __html:
                      trainingMainPageData?.heroSection?.mainTitle.replace(
                        /<\/?h[1-6][^>]*>/gm,
                        "",
                      ) || "",
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                className="text-[#6f6f6f] text-base sm:text-lg md:text-[18px] font-medium leading-7 sm:leading-8 mb-8 lg:max-w-2xl"
                dangerouslySetInnerHTML={{
                  __html: trainingMainPageData?.heroSection?.description || "",
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                className="flex flex-wrap gap-4 mb-14"
              >
                <Button
                  bgColor="#D68029"
                  hoverColor="#0d1b2a"
                  text="Explore Programs"
                  href="#contact-form-section"
                />
                <motion.div className="border border-[#0d1b2a] hover:border-[#D68029] relative w-auto inline-flex items-center justify-center rounded-lg overflow-hidden text-[#0d1b2a] hover:text-[#ffffff] transition-all duration-700 ease-in-out group">
                  <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D27E2B] rounded group-hover:w-full group-hover:h-full"></span>
                  <a
                    href="#contact-form-section"
                    className="relative tracking-tight text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3 cursor-pointer font-semibold"
                  >
                    <span className="flex flex-row gap-3 items-center justify-center">
                      Enquire Now
                      <Image
                        src="/navbar/btn_icon.png"
                        alt="Arrow"
                        width={20}
                        height={20}
                        className="transition-all duration-700 ease-in-out brightness-0 group-hover:brightness-0 group-hover:invert w-5 h-5"
                      />
                    </span>
                  </a>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex flex-wrap gap-x-8 gap-y-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              >
                {heroTrustPoints.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                        <Icon className="w-5 h-5 text-[#d68029]" />
                      </div>
                      <span className="fonts_16 font-semibold  leading-tight whitespace-pre-line">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Content Right */}
            <div className="flex justify-center relative order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: [0, 15, -15, 10, -10, 0] }}
                transition={{
                  opacity: { duration: 1, ease: "easeOut" },
                  x: { duration: 2, ease: "easeInOut" },
                }}
                className="relative w-full"
              >
                {trainingMainPageData?.heroSection.image ? (
                  <Image
                    src={
                      trainingMainPageData?.heroSection.image ||
                      "/training/training-hero-image.png"
                    }
                    alt="Training Illustration"
                    width={780}
                    height={780}
                    className="drop-shadow-xl relative z-10 w-full"
                    priority
                  />
                ) : (
                  <div className="w-full h-125 bg-gray-200 rounded-lg animate-pulse"></div>
                )}
              </motion.div>
            </div>
          </div>
        </Row>
      </Section>

      {/* section:2  */}
      <Section
        className="relative z-10 py-10!  "
        //  style={{ clipPath: "polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px)" }}
      >
        <Row>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className=" mx-auto bg-white rounded-2xl shadow-md px-4 py-6 md:py-7"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-y-6 gap-x-2">
              {heroHighlights.map((item, i) => {
                const Icon = item.icon;
                const isLast = i === heroHighlights.length - 1;
                return (
                  <div
                    key={i}
                    // className={`flex max-sm:flex-col items-center gap-3 px-2 ${
                    //   !isLast ? "border-r border-gray-200" : ""
                    // }`}
                    className={` flex max-sm:flex-col items-center gap-3 px-2
                                        ${!isLast ? "border-r border-gray-200" : ""}
                                        ${i === 4 ? "lg:col-start-2 xl:col-start-auto" : ""}
                                    `}
                  >
                    <div className="w-9 h-9 shrink-0 rounded-full bg-[#d68029]/10 flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5 text-[#d68029]" />
                    </div>
                    <p className="text-[13px] md:text-sm font-semibold  leading-tight whitespace-pre-line">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </Row>
      </Section>

      {/* CAREER TREE SECTION */}
      <Section className="max-w-full text-center">
        {/* <div className="w-full max-w-[90%] lg:max-w-[80%] relative mx-auto"> */}
        <Row>
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="common-h2 text-black"
          >
            Choose <span className="text-[#D68029]">Your Career</span>
            <Motion />
          </motion.h2>
        </Row>
        {/* </div> */}
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="mt-3"
        >
          {/* LOGIC TO RENDER THE CORRECT COMPONENT */}
          {
            isDesktop ? (
              <CareerGraph /> // For screens 1024px and wider
            ) : (
              <CareerGrid /> // For screens between 768px and 1023px
            )
            //  : (
            //     <CareerList />        // For screens under 768px
            // )
          }
        </motion.div>
      </Section>

      {/* <section className="py-20">
                <div className="max-w-384 mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"> */}
      {/* <Section > */}
      {/* <div className="relative w-full  max-w-[90%] lg:max-w-[80%] mx-auto "> */}
      {/* <Row>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12 items-center "> 
                    <motion.div
                        className="relative flex justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <div className="overflow-hidden ">
                            {
                                trainingMainPageData?.aboutusSection.image ? (
                                    <Image
                                        src={trainingMainPageData?.aboutusSection.image}
                                        alt="A smiling woman working on her laptop."
                                        width={700}
                                        height={700}
                                    />

                                ) : (
                                    <div className="w-full h-162.5 bg-gray-200 rounded-lg animate-pulse"></div>
                                )
                            }
                        </div>
                    </motion.div> 
                    <div className="text-left pb-24"> 
                        <motion.p
                            className="text-[#d68029] uppercase tracking-widest font-semibold mb-2"
                            initial={{ opacity: 0, y: -40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                        > 
                            {trainingMainPageData?.aboutusSection.subTitle}
                        </motion.p> 

                        <motion.div
                            initial={{ opacity: 0, y: -40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h2
                                className="common-h2 leading-tight text-black prose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline"
                                dangerouslySetInnerHTML={{ __html: trainingMainPageData?.aboutusSection?.mainTitle.replace(/<\/?h[1-6][^>]*>/gm, "") || "" }}
                            />
                        </motion.div>

                        <motion.p
                            className="text-gray-500 mt-4 max-w-4xl text-[1.1rem] mx-auto"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {trainingMainPageData?.aboutusSection.description}
                        </motion.p>

                        <motion.h3
                            className="text-xl font-bold mt-8"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            {trainingMainPageData?.aboutusSection.detailbox.title}
                        </motion.h3>

                        <motion.div
                            className="flex justify-center items-center gap-8 lg:gap-12 mt-4"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            {
                                trainingMainPageData?.aboutusSection.detailbox.detailbox.map((data, index) => (

                                    <div className="text-left" key={index}>
                                        <h4 className="text-2xl font-bold text-[#D68029]">{data.heading}</h4>
                                        <p className="text-gray-600 mt-1 text-sm">
                                            {data.description}
                                        </p>
                                    </div>
                                ))
                            }

                        </motion.div>
                         <Button
						  	motionProps={{
								initial: { opacity: 0, y: 70 },
								animate:{ opacity: 1, y: 0 },
								transition: { type: "spring", stiffness: 300, damping: 20  },
							}}
							text="Learn More"
							href="#contact-form-section"
							icon="/navbar/btn_icon.png"
                            className="mt-10"
						/>
                    </div>
                </div>
                </Row> */}
      {/* </div> */}
      {/* </Section> */}
      {/* NEW SECTION: Training & Internship Programs */}
      <Section className="bg-gray-50 overflow-hidden">
        <Row>
          {/* Heading */}
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[#d68029] uppercase tracking-widest font-semibold mb-2">
              Professional IT Training & Internships
            </p>
            <h2 className="common-h2">
              Accelerate Your Career with Industry-Leading{" "}
              <span className="text-[#D68029]">
                Tech Training & Internship Programs
              </span>
            </h2>
            <div className="mt-4 flex justify-center mb-2">
              <Motion />
            </div>
            <p className="text-lg font-normal text-[#6f6f6f] leading-8 tracking-wide mt-3 ">
              Gain in-demand technical skills, work on live client projects, and
              secure your future with our comprehensive, job-oriented IT
              training courses and professional hands-on internships designed
              for developers, designers, and marketers.
            </p>
          </motion.div>

          {/* Program Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-12 items-stretch">
            {/* TRAINING PROGRAMS CARD */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-xl p-6 sm:p-8 overflow-hidden flex flex-col h-full"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-[#D68029] to-[#f0a84e]" />

              {/* Fixed-height header so both cards' lists start at the same line */}
              <div className="min-h-32 sm:min-h-28">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-[#D68029]/10 flex items-center justify-center">
                    <FiBookOpen className="text-[#D68029]" size={24} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0b1833]">
                    Job-Oriented Training Courses
                  </h3>
                </div>
                <p className="text-gray-500 text-sm sm:text-base">
                  Master cutting-edge technologies with structured, expert-led
                  training courses. Build a solid theoretical foundation and
                  transition into practical skills with real-world coding
                  projects.
                </p>
              </div>

              <motion.div
                className="space-y-3 flex-1"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {trainingPrograms.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={idx}
                      href="#contact-form-section"
                      className="group flex items-center gap-4 p-3 sm:p-4 rounded-xl border border-gray-100 hover:border-transparent hover:bg-[#0b1833] transition-colors duration-300"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div
                        className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}1A` }}
                      >
                        <Icon style={{ color: item.color }} size={18} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#0b1833] text-sm sm:text-base group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm group-hover:text-gray-300 transition-colors">
                          {item.desc}
                        </p>
                      </div>
                      <FiArrowRight className="shrink-0 text-gray-400 group-hover:text-[#D68029] group-hover:translate-x-1 transition-all" />
                    </motion.a>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* INTERNSHIP PROGRAMS CARD */}
            <motion.div
              className="relative bg-[#0b1833] rounded-2xl shadow-xl p-6 sm:p-8 overflow-hidden text-white flex flex-col h-full"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-[#f0a84e] to-[#D68029]" />
              <span className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#D68029]/10" />
              <span className="absolute -left-6 bottom-10 w-24 h-24 rounded-full bg-[#D68029]/10" />

              {/* Fixed-height header matching the Training card so both lists start level */}
              <div className="relative min-h-32 sm:min-h-28">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-white/10 flex items-center justify-center">
                    <FiBriefcase className="text-[#D68029]" size={24} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    Hands-On Internship Programs
                  </h3>
                </div>
                <p className="text-gray-300 text-sm sm:text-base">
                  Bridge the gap between academic learning and industry demands.
                  Work on live projects, gain real corporate exposure, and build
                  a high-caliber professional portfolio.
                </p>
              </div>

              <motion.div
                className="relative space-y-3 flex-1"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {internshipPrograms.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={idx}
                      href="#contact-form-section"
                      className="group flex items-center gap-4 p-3 sm:p-4 rounded-xl border border-white/10 hover:border-transparent hover:bg-[#D68029] transition-colors duration-300"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-colors">
                        <Icon
                          className="text-[#f0a84e] group-hover:text-white transition-colors"
                          size={18}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm sm:text-base">
                          {item.title}
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm group-hover:text-white/90 transition-colors">
                          {item.desc}
                        </p>
                      </div>
                      <FiArrowRight className="shrink-0 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </motion.a>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </Row>
      </Section>

      {/* NEW SECTION: Why Choose Our Programs */}
      <Section className="bg-white overflow-hidden">
        <Row>
          {/* WHY CHOOSE OUR PROGRAMS */}
          <div className="mt-0">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="common-h2  ">Why Choose Our Programs?</h2>
              <Motion />
              <p className="text-lg font-normal text-[#6f6f6f] leading-8 tracking-wide mt-2 max-w-2xl mx-auto">
                Our proven approach helps you learn, grow and succeed in your
                career.
              </p>
            </motion.div>

            {/* ===== DESKTOP / TABLET: zig-zag vertical roadmap ===== */}
            <div className="hidden md:block relative max-w-4xl mx-auto mt-16">
              {/* center connecting line */}
              {/* <span className="absolute left-1/2 top-14  bottom-14 w-px border-l-2 border-dashed border-[#D68029]/40 -translate-x-1/2" /> */}
              <div className="absolute left-1/2 top-2 bottom-10 -translate-x-1/2 h-full w-47.5 pointer-events-none">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 180 1250"
                  preserveAspectRatio="none"
                >
                  <path
                    d="
                                            M90 40
                                            C90 130 170 160 150 220
                                            C150 270 30 320 30 400
                                            C30 480 150 510 150 600
                                            C150 690 30 720 30 820
                                            C30 900 150 950 150 1040
                                            C150 1100 120 1140 90 1180
                                        "
                    fill="none"
                    stroke="#D68029"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeDasharray="8 8"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-16">
                {whyChooseSteps.map((step, idx) => {
                  const Icon = step.icon;
                  const isEven = idx % 2 === 0;
                  return (
                    <motion.div
                      key={idx}
                      className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-x-14"
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      {/* Left column content (only for even steps) */}
                      <div className={isEven ? "text-right" : ""}>
                        {isEven && (
                          <>
                            <h4 className="font-bold text-[#0b1833] text-xl">
                              {step.title}
                            </h4>
                            <p className="text-gray-500 fonts_16 mt-1">
                              {step.desc}
                            </p>
                            <span className="mt-3 text-sm text-[#D68029] font-semibold step-point inline-flex items-center gap-3 flex-row-reverse">
                              {step.points}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Center node */}
                      <div className="relative z-10 mx-auto">
                        <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-100 ">
                          <Icon className="text-[#0b1833]" size={28} />
                        </div>
                        {/* <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#D68029] text-white text-xs font-bold flex items-center justify-center shadow-md">
                                                    {step.num}
                                                </span> */}
                        <span
                          className={`absolute -top-1 ${
                            isEven ? "-right-1" : "-left-1"
                          } w-7 h-7 rounded-full bg-[#D68029] text-white text-xs font-bold flex items-center justify-center shadow-md`}
                        >
                          {step.num}
                        </span>
                      </div>

                      {/* Right column content (only for odd steps) */}
                      <div className={!isEven ? "" : ""}>
                        {!isEven && (
                          <>
                            <h4 className="font-bold text-[#0b1833] text-xl">
                              {step.title}
                            </h4>
                            <p className="text-gray-500 fonts_16 mt-1">
                              {step.desc}
                            </p>
                            <span className="mt-3 text-sm text-[#D68029] font-semibold step-point inline-flex items-center gap-3">
                              {step.points}
                            </span>
                          </>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* ===== MOBILE: left-aligned vertical roadmap ===== */}
            <div className="md:hidden relative mt-12 max-w-sm mx-auto">
              <span className="absolute left-8 top-2 max-[400px]:bottom-30 min-[100px]:bottom-24 w-px border-l-2 border-dashed border-[#D68029]" />

              <div className="flex flex-col gap-8">
                {whyChooseSteps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={idx}
                      className="relative flex items-start gap-8"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: idx * 0.1,
                      }}
                    >
                      <div className="relative z-10 shrink-0">
                        <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-100">
                          <Icon className="text-[#0b1833]" size={22} />
                        </div>
                        <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#D68029] text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                          {step.num}
                        </span>
                      </div>
                      <div className="pt-3">
                        <h4 className="font-bold text-[#0b1833]">
                          {step.title}
                        </h4>
                        <p className="text-gray-500 text-sm mt-1">
                          {step.desc}
                        </p>
                        <span className="mt-3 text-sm text-[#D68029] font-semibold step-point inline-flex items-center gap-3 ">
                          {step.points}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </Row>
      </Section>

      <Section className="lg:py-10!">
        <Row>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[#0d1b2a] rounded-2xl"></div>

            {/* Content */}
            <div className="relative z-10  justify-between gap-10 px-8 py-10 lg:py-18 lg:px-14 grid grid-cols-1 lg:grid-cols-2 items-center">
              {/* Left Content */}

              <div className=" ">
                <h2 className="common-h2 text-white">
                  Ready to Start Your{" "}
                  <span className="text-[#D68029]">Journey?</span>
                </h2>

                <p className="mt-4 fonts_16 text-white/70 ">
                  Join our training or internship program and take the first
                  step towards a successful career in the IT industry.
                </p>
              </div>

              {/* Right Buttons */}

              {/* <div className="flex flex-col sm:flex-row gap-5 lg:justify-end"> */}
              <div className="flex  flex-wrap gap-4 sm:gap-5 lg:justify-end items-stretch sm:items-center">
                <motion.div className="bg-[#D68029] relative w-auto inline-flex items-center justify-center rounded-lg overflow-hidden text-white hover:text-[#0d1b2a] transition-all duration-700 ease-in-out group">
                  <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#ffffff]  rounded group-hover:w-full group-hover:h-full"></span>
                  <a
                    href="#contact-form-section"
                    className="relative tracking-tight text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3 cursor-pointer font-semibold"
                  >
                    <span className="flex flex-row gap-3 items-center justify-center">
                      Enquire Now
                      <div className="group">
                        <Image
                          src="/navbar/btn_icon.png"
                          alt="FRAME"
                          width={20}
                          height={20}
                          className="transition-all duration-700 ease-in-out group-hover:brightness-0 group-hover:sepia w-5 h-5"
                        />
                      </div>
                    </span>
                  </a>
                </motion.div>

                <motion.div className="border border-[#ffffff] hover:border-[#D68029] relative w-auto inline-flex items-center justify-center rounded-lg overflow-hidden text-[#ffffff] hover:text-[#ffffff] transition-all duration-700 ease-in-out group">
                  <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D27E2B] rounded group-hover:w-full group-hover:h-full"></span>
                  <a
                    href="/our-service"
                    className="relative tracking-tight text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3 cursor-pointer font-semibold"
                  >
                    <span className="flex flex-row gap-3 items-center justify-center">
                      Explore Our Services
                    </span>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Row>
      </Section>

      {/* NEW SECTION: ITS Institute Facilities */}
      <Section className=" bg-white ">
        {/* Left Decorative Image */}
        <Image
          src="/training/image-124.png"
          alt="Decoration Left"
          width={50}
          height={50}
          className="absolute left-32 hidden lg:flex  top-72 transform -translate-y-1/2"
        />

        {/* Right Decorative Image */}
        <Image
          src="/training/image-115.png"
          alt="Decoration Right"
          width={80}
          height={80}
          className="absolute right-24 hidden lg:flex  top-28 transform -translate-y-1/2"
        />

        {/* <div className=" text-center relative z-10 w-full max-w-[90%] lg:max-w-[80%] mx-auto"> */}
        <Row className=" text-center  z-10">
          {/* Heading + Motion (from top) */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="common-h2 mb-4">
              {/* ITS Institute Facilities */}
              {trainingMainPageData?.itsInstituteFacilitiesSection.title}
            </h2>
            <div className="mt-4 flex justify-center mb-5">
              <Motion />
            </div>
          </motion.div>

          {/* Cards Grid (from bottom) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            // className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
          >
            {trainingMainPageData?.itsInstituteFacilitiesSection.points.map(
              (card, i) => (
                <div
                  key={i}
                  // className="group bg-gray-100 p-6 rounded-lg min-h-52.5 text-center flex flex-col items-center justify-center space-y-4 shadow-sm transition duration-300 hover:shadow-lg hover:bg-[#D68029] hover:text-white"
                  className=" group relative overflow-hidden rounded-lg bg-gray-100 min-h-52.5 p-8 flex flex-col items-center justify-center text-center
                                        cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-lg "
                >
                  <div
                    className=" absolute inset-0 translate-y-full  bg-linear-to-t  from-[#d68029] from-0%
    via-[#d68029] via-50%
    to-[#f7b733] to-100% transition-transform duration-500 ease-in-out 
                                group-hover:translate-y-0 "
                  />

                  {/* Decorative Dot */}
                  <span
                    className=" absolute top-4 right-4 z-10 h-3 w-3 rounded-full border-2 border-white/60 opacity-0 scale-50 transition-all duration-500 group-hover:opacity-100
                                group-hover:scale-100 "
                  />
                  <div className="relative z-20 flex flex-col items-center">
                    {card.image ? (
                      <Image
                        src={card.image}
                        alt={card.heading}
                        width={64}
                        height={64}
                        className="transition duration-300 group-hover:filter group-hover:brightness-0 group-hover:invert group-hover:-translate-y-1 group-hover:scale-110"
                      />
                    ) : (
                      // <div className="w-full h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="w-14 h-14 rounded bg-gray-300 animate-pulse" />
                    )}
                    {/* <h4 className="font-semibold text-lg"> */}
                    <h4 className=" mt-6 text-lg font-semibold text-[#0F1B33] transition-colors duration-300 group-hover:text-white">
                      {card.heading}
                    </h4>
                  </div>
                  <span className=" absolute bottom-5 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-white transition-all duration-500 group-hover:w-10  z-20 " />
                </div>
              ),
            )}
          </motion.div>
        </Row>
        {/* </div> */}
      </Section>

      {/* PICK THE RIGHT COURSE SECTION */}
      <Section className="bg-white ">
        {/* <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto relative"> */}
        <Row>
          {/* Section Title + Motion */}
          <div className="text-center mb-10 md:mb-12">
            <motion.h2
              className="common-h2 leading-snug"
              initial={{ y: -60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {/* Pick The Right Course <br className="sm:hidden" /> To Build Your
                            Career */}
              {trainingMainPageData?.rightCoursePickSection.mainHeading}
              <Motion />
            </motion.h2>
          </div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start cursor-pointer">
            {/* LEFT SIDE: 4 CARDS */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-1 mt-10"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {// [
              //     {
              //         img: "/training/expert.svg",
              //         alt: "Expert Faculty",
              //         text: "Expert Faculty",
              //     },
              //     {
              //         img: "/training/handson.svg",
              //         alt: "Hands-On Training",
              //         text: "Hands-On Training",
              //     },
              //     {
              //         img: "/training/community2.svg",
              //         alt: "Student Community",
              //         text: "Student Community",
              //     },
              //     {
              //         img: "/training/flexible.svg",
              //         alt: "Flexible Learning",
              //         text: "Flexible Learning Options",
              //     },
              // ]
              trainingMainPageData?.rightCoursePickSection.cardBox.map(
                (card, idx) => (
                  <motion.div
                    key={idx}
                    className="relative bg-white min-h-40 sm:min-h-48 shadow-2xl px-5 sm:px-6 py-8 sm:py-10 flex flex-col text-xl sm:text-2xl font-semibold rounded-xl group"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }} // 👈 no delay
                    viewport={{ once: true }}
                  >
                    <div
                      className="absolute top-0 right-3 sm:right-5 bg-[#0B1C3F] w-12 h-16 sm:w-14 sm:h-20 flex items-center justify-center rounded-full 
                                        rounded-tl-xl rounded-tr-xl  group-hover:bg-linear-to-r group-hover:from-[#d68029] group-hover:to-[#f7b733]   "
                    >
                      {card.image ? (
                        <Image
                          src={card.image}
                          alt={card.heading}
                          width={32}
                          height={32}
                        />
                      ) : (
                        <div className="w-full h-15 bg-gray-200 rounded-lg animate-pulse"></div>
                      )}
                    </div>
                    <h4 className="mt-auto text-center sm:text-left">
                      {card.heading}
                    </h4>
                  </motion.div>
                ),
              )}
            </motion.div>

            {/* RIGHT SIDE: TEXT CONTENT */}
            <div className="space-y-2 lg:pl-6 order-1 lg:order-2">
              <motion.h6
                className="uppercase text-[#D68029] font-semibold tracking-wider mt-10"
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {/* Why Choose Us */}
                {trainingMainPageData?.rightCoursePickSection.subTitle}
              </motion.h6>

              {/* Heading from top */}
              <motion.h2
                className="common-h2 leading-snug "
                initial={{ y: -60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {/* Creating A Community Of Life Long{" "}
                                <br className="hidden sm:block" /> Learners */}
                {trainingMainPageData?.rightCoursePickSection.mainTitle}
              </motion.h2>

              {/* Paragraph from bottom */}
              <motion.p
                className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed mt-2"
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {/* We stepped in the market with the goal to help students, working
                                professionals and other interested candidates get that dream job
                                or open that desired freelance business in some of the most
                                popular Computer / IT fields. */}
                {trainingMainPageData?.rightCoursePickSection.description}
              </motion.p>

              {/* Trusted By Thousands (from bottom) */}
              {trainingMainPageData?.rightCoursePickSection.detailbox.map(
                (data, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mt-6"
                    initial={{ y: 80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <div className="shrink-0">
                      {data.image ? (
                        <Image
                          src={data.image || "/training/trusted.svg"}
                          alt={data.title}
                          width={32}
                          height={32}
                        />
                      ) : (
                        <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl sm:text-2xl">
                        {/* Trusted By Thousands */}
                        {data.title}
                      </h4>
                      <p className="text-gray-600 fonts_16 mt-2 ">
                        {/* “Trusted by Thousands” Lorem Ipsum is simply dummy text of
                                                the printing and typesetting industry. Lorem Ipsum has been
                                                the industry's standard dummy text ever since the 1500s. */}
                        {data.description}
                      </p>
                    </div>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </Row>
      </Section>

      {/* FAQ SECTION */}
      <CommonFAQ
        faqs={trainingFAQs}
        title="Frequently Asked Questions (FAQ)"
        sideTitle="Have Queries?"
        sideSubtitle="We are here to Answer you..."
        buttonText="Enquire Now"
        buttonHref="#contact-form-section"
      />
    </div>
  );
}
