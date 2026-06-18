"use client";

import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
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
const CareerGrid = dynamic(() => import("@/components/CareerGrid"))

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

export default function TrainingPageClient() {
    // Media query for tablet and larger screens (e.g., iPad portrait)
    const isTabletOrLarger = useMediaQuery("(min-width: 768px)");

    // Media query for desktop screens
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    const [gettingTrainingPageData, setGettingTrainingPageData] = useState(true);
    const [trainingMainPageData, setTrainingMainPageData] = useState<TrainingMainPageData | null>(null);

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
        fetchTrainingContent()
    }, [fetchTrainingContent]);

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
            <div className="min-h-screen flex items-center justify-center">
                <NotFoundPage />
            </div>
        )
    }

    return (
        <div className="min-h-screen overflow-hidden ">
            {/* HERO SECTION */}
            {/* <section className="relative  w-full  common_background_gradient">
                <div className="relative max-w-384 mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"> */}
            <Section className=" common_background_gradient ">
                {/* <div className="relative w-full max-w-[90%] lg:max-w-[80%] mx-auto"> */}
                <Row >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Content Left */}
                    <div className="order-2 md:order-1 z-10">
                        {/* First p tag - from top slow */}
                        <motion.h6
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-[#D68029] font-medium uppercase tracking-wide"
                        >
                            {/* Learn New Things Daily */}
                            {trainingMainPageData?.heroSection?.subTitle || ""}
                        </motion.h6>

                        {/* H1 - from top faster */}
                        <motion.h1
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
                        </motion.h1>

                        {/* Second p - from bottom */}
                        <motion.p
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                            className="text-gray-600 mt-4"
                        >
                            {/* Industry oriented training and courses are developed by top IT
                            trainers */}
                            {trainingMainPageData?.heroSection.description}
                        </motion.p>

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
            <Section >
                {/* <div className="relative w-full  max-w-[90%] lg:max-w-[80%] mx-auto "> */}
                <Row>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12 items-center ">
                    {/* Image */}
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

                    {/* Text Content */}
                    <div className="text-left pb-24">
                        {/* Small heading */}
                        <motion.p
                            className="text-[#d68029] uppercase tracking-widest font-semibold mb-2"
                            initial={{ opacity: 0, y: -40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            {/* About Us */}
                            {trainingMainPageData?.aboutusSection.subTitle}
                        </motion.p>

                        {/* Main heading */}
                        <motion.div
                            initial={{ opacity: 0, y: -40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Knowledge is power.
                            <br />
                            Information is liberating. */}
                            {/* {
                                trainingMainPageData?.aboutusSection.mainTitle ? (
                                    <div
                                        className="prose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline"
                                        dangerouslySetInnerHTML={{ __html: trainingMainPageData?.aboutusSection.mainTitle }}
                                    />
                                ) : (
                                    <span>
                                        Knowledge is power.
                                        <br />
                                        Information is liberating.
                                    </span>
                                )
                            } */}
                            <h2
                                className="common-h2 leading-tight text-black prose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline"
                                dangerouslySetInnerHTML={{ __html: trainingMainPageData?.aboutusSection?.mainTitle.replace(/<\/?h[1-6][^>]*>/gm, "") || "" }}
                            />
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            className="text-gray-500 mt-4 max-w-4xl text-[1.1rem] mx-auto"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {/* We stepped in the market with the goal to help students, working
                            professionals and <br />
                            other interested candidates get that dream job or open that
                            desired freelance <br />
                            business in some of the most popular Computer / IT fields. */}
                            {trainingMainPageData?.aboutusSection.description}
                        </motion.p>

                        {/* Subheading */}
                        <motion.h3
                            className="text-xl font-bold mt-8"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            {/* People Love To Learn With Us */}
                            {trainingMainPageData?.aboutusSection.detailbox.title}
                        </motion.h3>

                        {/* Stats */}
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
                                            {/* 90% of students see their course through to completion. */}
                                            {data.description}
                                        </p>
                                    </div>
                                ))
                            }
                            {/* <div className="text-left">
                                <p className="text-2xl font-bold text-[#D68029]">9/10</p>
                                <p className="text-gray-500 mt-1 text-sm">
                                    9/10 companies reported better learning outcomes.
                                </p>
                            </div> */}
                        </motion.div>

                        {/* Button */}
                        {/* <motion.a
                            href="#contact-form-section"
                            className="relative flex flex-row w-fit  cursor-pointer overflow-hidden mt-10 px-5 sm:px-6 py-2.5 sm:py-3 
                            bg-[#0b1833] text-white text-sm sm:text-base font-medium    rounded-lg shadow-md"
                            whileHover="hover"
                            initial="rest"
                            animate="rest"
                            variants={{
                                rest: { scale: 1 },
                                hover: { scale: 1.02 },
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <motion.span
                                className="absolute inset-0 bg-linear-to-r from-[#D68025] to-[#D68029]"
                                variants={{
                                    rest: { scaleX: 0, originX: 0.5 }, // hidden at rest (from center)
                                    hover: { scaleX: 1, originX: 0.5 }, // expands outwards on hover
                                }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                style={{ transformOrigin: "center" }}
                            />

                            <span className="relative z-10 flex items-center gap-2">
                                Learn More <FiArrowRight />
                            </span>
                        </motion.a> */}
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
                </Row>
                {/* </div> */}
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
                                        className="relative bg-white min-h-40 sm:min-h-45 shadow-2xl px-5 sm:px-6 py-8 sm:py-10 flex flex-col text-xl sm:text-2xl font-semibold rounded-xl"
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
                        <div className="space-y-6 md:space-y-8 lg:pl-6 order-1 lg:order-2">
                            <motion.h6
                                className="uppercase text-[#D68029] font-semibold tracking-wider mt-16"
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
                                className="common-h2 leading-snug mt-3"
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
                                className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed mt-6"
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
                                        className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mt-8"
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
                                            <p className="text-gray-600 text-sm sm:text-md mt-2 sm:mt-3 leading-relaxed">
                                                {/* “Trusted by Thousands” Lorem Ipsum is simply dummy text of
                                                the printing and typesetting industry. Lorem Ipsum has been
                                                the industry's standard dummy text ever since the 1500s. */}
                                                {data.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))
                            }

                            {/* Life Time Support (from bottom slower) */}
                            {/* <motion.div
                                className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mt-8"
                                initial={{ y: 100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                viewport={{ once: true }}
                            >
                                <div className="flex-shrink-0">
                                    <Image
                                        src="/training/support.svg"
                                        alt="Support"
                                        width={32}
                                        height={32}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl sm:text-2xl">
                                        Life Time Support
                                    </h3>
                                    <p className="text-gray-600 text-sm sm:text-md mt-2 sm:mt-3 leading-relaxed">
                                        Lorem Ipsum is simply dummy text of the printing and
                                        industry Lorem Ipsum.
                                    </p>
                                </div>
                            </motion.div> */}
                        </div>
                    </div>
                    </Row>
                {/* </div> */}
            </Section>
        </div>
    );
}
