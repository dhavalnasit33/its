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
const CareerGrid = dynamic(() => import("@/components/CareerGrid"))

const trainingPrograms = [
    { icon: FiMonitor, color: "#3B82F6", title: "Web Development", desc: "HTML, CSS, JavaScript, React, Node.js, MongoDB" },
    { icon: FiSmartphone, color: "#16A34A", title: "Mobile App Development", desc: "Flutter, React Native, Android Studio" },
    { icon: FiPenTool, color: "#DB2777", title: "UI/UX Design", desc: "Figma, Adobe XD, Photoshop, UI Design Principles" },
    { icon: FiCode, color: "#7C3AED", title: "PHP & Laravel Development", desc: "Core PHP, MySQL, Laravel Framework" },
    { icon: FiTrendingUp, color: "#D68029", title: "Digital Marketing", desc: "SEO, Social Media, Google Ads, Analytics" },
];

const internshipPrograms = [
    { icon: FiCode, title: "Web Development Internship", desc: "Work on live projects and enhance coding skills" },
    { icon: FiSmartphone, title: "Mobile App Internship", desc: "Build and deploy real mobile applications" },
    { icon: FiPenTool, title: "UI/UX Design Internship", desc: "Design real user interfaces and UX flows" },
    { icon: FiTrendingUp, title: "Digital Marketing Internship", desc: "SEO, SMM & Paid Campaigns on live projects" },
    { icon: FiEdit3, title: "Content Writing Internship", desc: "Write, optimize and manage content projects" },
];

const whyChooseSteps = [
    { num: "01", icon: FiBookOpen, title: "Learn", desc: "Industry-relevant curriculum crafted by experts" },
    { num: "02", icon: FiMonitor, title: "Practice", desc: "Hands-on projects and real-world assignments" },
    { num: "03", icon: FiTrendingUp, title: "Grow", desc: "Enhance your skills and build your confidence" },
    { num: "04", icon: FiBriefcase, title: "Succeed", desc: "Get placed with top companies with our assistance" },
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

export default function TrainingPageClient({ initialData }: { initialData?: TrainingMainPageData | null }) {
    // Media query for tablet and larger screens (e.g., iPad portrait)
    const isTabletOrLarger = useMediaQuery("(min-width: 768px)");

    // Media query for desktop screens
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    const [gettingTrainingPageData, setGettingTrainingPageData] = useState(!initialData);
    const [trainingMainPageData, setTrainingMainPageData] = useState<TrainingMainPageData | null>(initialData || null);

    const fetchTrainingContent = useCallback(async () => {
        setGettingTrainingPageData(true);
        try {
            const responce = await apiService<SingleResponse<TrainingMainPageData>>('/training-main-page');
            if (responce.success) {
                setTrainingMainPageData(responce.data);
            } else {
                console.error(responce.message);
            }
        } catch (error: any) {
            console.error(error.message)
        } finally {
            setGettingTrainingPageData(false)
        }
    }, [])

    useEffect(() => {
        if (initialData) {
            setTrainingMainPageData(initialData);
            setGettingTrainingPageData(false);
            return;
        }
        fetchTrainingContent()
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
        )
    }

    return (
        <div className="min-h-screen overflow-hidden ">
            {/* HERO SECTION */}
            {/* <section className="relative  w-full  common_background_gradient">
                <div className="relative max-w-384 mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"> */}
            <Section className=" lg:py-12! common_background_gradient ">
                {/* <div className="relative w-full max-w-[90%] lg:max-w-[80%] mx-auto"> */}
                <Row >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Content Left */}
                    <div className="order-2 md:order-1 z-10">
                        {/* First p tag - from top slow */}
                        <motion.span
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-[#D68029] font-medium uppercase tracking-wide"
                        >
                            {/* Learn New Things Daily */}
                            {trainingMainPageData?.heroSection?.subTitle || ""}
                        </motion.span>

                        {/* H1 - from top faster */}
                        <motion.div
                            initial={{ opacity: 0, y: -60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                            className="text-4xl md:text-[42px] xl:text-5xl font-bold leading-tight mt-3"
                        >
                            {/* Education Is A <br />
                            Path To <span className="text-[#D68029]">Success</span> <br />
                            In Life */}
                            {/* {
                                trainingMainPageData?.heroSection.mainTitle ? (

                                    <div
                                        className="prose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline"
                                        dangerouslySetInnerHTML={{ __html: trainingMainPageData?.heroSection.mainTitle }}
                                    />
                                ) : (
                                    <span>
                                        Education Is A <br />
                                        Path To <span className="text-[#D68029]">Success</span> <br />
                                        In Life
                                    </span>
                                )
                            } */}
                            <div
                                className="prose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline"
                                dangerouslySetInnerHTML={{ __html: trainingMainPageData?.heroSection?.mainTitle || "" }}
                            />
                        </motion.div>

                        {/* Second p - from bottom */}
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                            className="text-gray-600 mt-4 prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: trainingMainPageData?.heroSection?.description || "" }}
                        />

                        {/* Animated Button - from bottom slower */}


                        {/* <motion.div
                            initial={{ opacity: 0, y: 70 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                            className="mt-6"
                        >
                            <div 
                            // className="bg-[#D68029] relative inline-flex items-center justify-center w-max overflow-hidden text-white rounded-xl group">
                             className="relative inline-flex items-center justify-center overflow-hidden gap-2 rounded-xl bg-[#D68029]  text-sm font-semibold text-white transition-colors group"
>
                                                    <span className="absolute w-0 h-0 transition-all duration-750 delay-300 ease-in-out bg-[#0d1b2a] rounded group-hover:w-56 group-hover:h-56"></span>
                                <a href="#contact-form-section" className="  relative tracking-tight rounded-[10px] text-sm sm:text-base font-semibold px-6 py-3 sm:px-8 sm:py-4 text-white transition-color">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Get Started Today
                                        <Image
                                            src="/navbar/btn_icon.png"
                                            alt="Button Icon"
                                            width={20}
                                            height={20}
                                            className="object-contain"
                                        />
                                    </span>
                                </a>
                            </div>
                        </motion.div> */}
                        <Button
						  	motionProps={{
								initial: { opacity: 0, y: 70 },
								animate:{ opacity: 1, y: 0 },
								transition: { duration: 0.8, ease: "easeOut", delay: 0.5 },
							}}
                            bgColor="#D68029"
                            hoverColor="#0d1b2a"
							text="Get Started Today"
							href="#contact-form-section"
							icon="/navbar/btn_icon.png"
                            className="mt-6"
						/>

                        {/* Ellipse Image (below button) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
                            className="mt-6"
                        >

                            <Image
                                src="/training/Ellipse-921.png"
                                alt="Ellipse Decoration"
                                width={75}
                                height={75}
                                className="object-contain"
                            />
                        </motion.div>
                    </div>

                    {/* Content Right (Hero Image with wiggle synced to text start) */}
                    <div className="flex justify-center relative order-1 md:order-2">
                        <motion.div
                            initial={{ opacity: 0, x: 0 }}
                            animate={{ opacity: 1, x: [0, 15, -15, 10, -10, 0] }}
                            transition={{
                                opacity: { duration: 1, ease: "easeOut" }, // fade-in same time as first <p>
                                x: { duration: 2, ease: "easeInOut" }, // wiggle effect
                            }}
                            className="relative"
                        >
                            {
                                trainingMainPageData?.heroSection.image ? (
                                    <Image
                                        src={trainingMainPageData?.heroSection.image || "/training/training-hero-image.png"}
                                        alt="Training Illustration"
                                        width={600}
                                        height={600}
                                        className="drop-shadow-xl relative z-10"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-125 bg-gray-200 rounded-lg animate-pulse"></div>
                                )
                            }

                        </motion.div>
                    </div>
                </div>
                </Row>
                {/* </div> */}
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
                    {isDesktop ? (
                        <CareerGraph />       // For screens 1024px and wider
                    ) : (
                        <CareerGrid />        // For screens between 768px and 1023px
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
                            Our Programs
                        </p>
                        <h2 className="common-h2">
                            Choose The Right Path To{" "}
                            <span className="text-[#D68029]">Build Your Career</span>
                        </h2>
                        <div className="mt-4 flex justify-center mb-2">
                            <Motion />
                        </div>
                        <p className="text-gray-500 mt-3 text-sm sm:text-base">
                            Whether you want to learn from scratch or gain real-world
                            experience, we have a program designed for you.
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
                            <span className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#D68029] to-[#f0a84e]" />

                            {/* Fixed-height header so both cards' lists start at the same line */}
                            <div className="min-h-32 sm:min-h-28">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-12 h-12 shrink-0 rounded-xl bg-[#D68029]/10 flex items-center justify-center">
                                        <FiBookOpen className="text-[#D68029]" size={24} />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-[#0b1833]">
                                        Training Programs
                                    </h3>
                                </div>
                                <p className="text-gray-500 text-sm sm:text-base">
                                    Learn from industry experts with our job-oriented training
                                    programs and upgrade your skills.
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
                                                <h4 className="font-semibold text-[#0b1833] text-sm sm:text-base group-hover:text-white transition-colors">
                                                    {item.title}
                                                </h4>
                                                <p className="text-gray-500 text-xs sm:text-sm group-hover:text-gray-300 transition-colors">
                                                    {item.desc}
                                                </p>
                                            </div>
                                            <FiArrowRight className="shrink-0 text-gray-400 group-hover:text-[#D68029] group-hover:translate-x-1 transition-all" />
                                        </motion.a>
                                    );
                                })}
                            </motion.div>

                            <a
                                href="#contact-form-section"
                                className="inline-flex items-center gap-2 mt-6 text-[#D68029] font-semibold text-sm sm:text-base hover:gap-3 transition-all self-start"
                            >
                                View All Training Programs <FiArrowRight />
                            </a>
                        </motion.div>

                        {/* INTERNSHIP PROGRAMS CARD */}
                        <motion.div
                            className="relative bg-[#0b1833] rounded-2xl shadow-xl p-6 sm:p-8 overflow-hidden text-white flex flex-col h-full"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <span className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#f0a84e] to-[#D68029]" />
                            <span className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#D68029]/10" />
                            <span className="absolute -right-4 bottom-10 w-24 h-24 rounded-full bg-[#D68029]/10" />

                            {/* Fixed-height header matching the Training card so both lists start level */}
                            <div className="relative min-h-32 sm:min-h-28">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-12 h-12 shrink-0 rounded-xl bg-white/10 flex items-center justify-center">
                                        <FiBriefcase className="text-[#D68029]" size={24} />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold">
                                        Internship Programs
                                    </h3>
                                </div>
                                <p className="text-gray-300 text-sm sm:text-base">
                                    Work on real projects, gain practical exposure and build
                                    your professional portfolio.
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
                                                <Icon className="text-[#f0a84e] group-hover:text-white transition-colors" size={18} />
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

                            <a
                                href="#contact-form-section"
                                className="relative inline-flex items-center gap-2 mt-6 text-[#f0a84e] font-semibold text-sm sm:text-base hover:gap-3 transition-all self-start"
                            >
                                View All Internship Programs <FiArrowRight />
                            </a>
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
                            <h3 className="text-2xl sm:text-3xl font-bold text-[#0b1833]">
                                Why Choose Our Programs?
                            </h3>
                            <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm sm:text-base">
                                Our proven approach helps you learn, grow and succeed in
                                your career.
                            </p>
                        </motion.div>

                        {/* ===== DESKTOP / TABLET: zig-zag vertical roadmap ===== */}
                        <div className="hidden md:block relative max-w-3xl mx-auto mt-16">
                            {/* center connecting line */}
                            <span className="absolute left-1/2 top-4 bottom-4 w-px border-l-2 border-dashed border-[#D68029]/40 -translate-x-1/2" />

                            <div className="flex flex-col gap-16">
                                {whyChooseSteps.map((step, idx) => {
                                    const Icon = step.icon;
                                    const isEven = idx % 2 === 0;
                                    return (
                                        <motion.div
                                            key={idx}
                                            className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-x-6"
                                            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, amount: 0.4 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        >
                                            {/* Left column content (only for even steps) */}
                                            <div className={isEven ? "text-right" : ""}>
                                                {isEven && (
                                                    <>
                                                        <h4 className="font-bold text-[#0b1833] text-lg">
                                                            {step.title}
                                                        </h4>
                                                        <p className="text-gray-500 text-sm mt-1">
                                                            {step.desc}
                                                        </p>
                                                    </>
                                                )}
                                            </div>

                                            {/* Center node */}
                                            <div className="relative z-10 mx-auto">
                                                <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-100">
                                                    <Icon className="text-[#0b1833]" size={28} />
                                                </div>
                                                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#D68029] text-white text-xs font-bold flex items-center justify-center shadow-md">
                                                    {step.num}
                                                </span>
                                            </div>

                                            {/* Right column content (only for odd steps) */}
                                            <div className={!isEven ? "" : ""}>
                                                {!isEven && (
                                                    <>
                                                        <h4 className="font-bold text-[#0b1833] text-lg">
                                                            {step.title}
                                                        </h4>
                                                        <p className="text-gray-500 text-sm mt-1">
                                                            {step.desc}
                                                        </p>
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
                            <span className="absolute left-8 top-2 bottom-2 w-px border-l-2 border-dashed border-[#D68029]/40" />

                            <div className="flex flex-col gap-8">
                                {whyChooseSteps.map((step, idx) => {
                                    const Icon = step.icon;
                                    return (
                                        <motion.div
                                            key={idx}
                                            className="relative flex items-start gap-4"
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.3 }}
                                            transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
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
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
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
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4"
                    >
                        {trainingMainPageData?.itsInstituteFacilitiesSection.points.map((card, i) => (
                            <div
                                key={i}
                                className="group bg-gray-100 p-6 rounded-lg min-h-52.5 text-center flex flex-col items-center justify-center space-y-4 shadow-sm transition duration-300 hover:shadow-lg hover:bg-[#D68029] hover:text-white"
                            >
                                {
                                    card.image ? (

                                        <Image
                                            src={card.image}
                                            alt={card.heading}
                                            width={64}
                                            height={64}
                                            className="transition duration-300 group-hover:filter group-hover:brightness-0 group-hover:invert"
                                        />
                                    ) : (
                                        <div className="w-full h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                                    )
                                }
                                <h4 className="font-semibold text-lg">{card.heading}</h4>
                            </div>
                        ))}
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
                        {/* LEFT SIDE: 4 CARDS */}
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-1 mt-10"
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            {
                                // [
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
                                trainingMainPageData?.rightCoursePickSection.cardBox.map((card, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="relative bg-white min-h-40 sm:min-h-48 shadow-2xl px-5 sm:px-6 py-8 sm:py-10 flex flex-col text-xl sm:text-2xl font-semibold rounded-xl"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }} // 👈 no delay
                                        viewport={{ once: true }}
                                    >
                                        <div className="absolute top-0 right-3 sm:right-5 bg-[#0B1C3F] w-12 h-16 sm:w-14 sm:h-20 flex items-center justify-center rounded-full rounded-tl-xl rounded-tr-xl">
                                            {
                                                card.image ? (

                                                    <Image
                                                        src={card.image}
                                                        alt={card.heading}
                                                        width={32}
                                                        height={32}
                                                    />
                                                ) : (
                                                    <div className="w-full h-15 bg-gray-200 rounded-lg animate-pulse"></div>
                                                )
                                            }
                                        </div>
                                        <h4 className="mt-auto text-center sm:text-left">
                                            {card.heading}
                                        </h4>
                                    </motion.div>
                                ))}
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
                                {
                                    trainingMainPageData?.rightCoursePickSection.description
                                }
                            </motion.p>

                            {/* Trusted By Thousands (from bottom) */}
                            {
                                trainingMainPageData?.rightCoursePickSection.detailbox.map((data, index) => (

                                    <motion.div
                                        key={index}
                                        className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mt-4"
                                        initial={{ y: 80, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="shrink-0">
                                            {
                                                data.image ? (
                                                    <Image
                                                        src={data.image || "/training/trusted.svg"}
                                                        alt={data.title}
                                                        width={32}
                                                        height={32}
                                                    />
                                                ) : (
                                                    <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>

                                                )
                                            }

                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl sm:text-2xl">
                                                {/* Trusted By Thousands */}
                                                {data.title}
                                            </h4>
                                            <p className="text-gray-600 text-sm sm:text-md mt-2  leading-relaxed">
                                                {/* “Trusted by Thousands” Lorem Ipsum is simply dummy text of
                                                the printing and typesetting industry. Lorem Ipsum has been
                                                the industry's standard dummy text ever since the 1500s. */}
                                                {data.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))
                            }

    
                        </div>
                    </div>
                    </Row>
                {/* </div> */}
            </Section>
        </div>
    );
}