"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Motion from "@/components/motionbar";

import { HomePageData, SingleResponse } from "@/types";
import apiService from "@/lib/apiService";
import { notFound as nextNotFound } from "next/navigation";
import Link from "next/link";

// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import RoundStatsCard from "@/components/home/RoundStatsCard";
import AutoTextSlider from "@/components/home/AutoTextSlider";
// import AiServices from "@/components/home/AiServices";
import ParallaxShape from "@/components/home/ParallaxShape";
// import CurveDivider from "@/components/home/CurveDivider";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";
import { useParams } from "next/navigation";
import Section from "@/components/Section";
import Row from "@/components/Row";
import Button from "@/components/Button";



import dynamic from "next/dynamic";
// import ContactPopup from "@/components/ContactPopup";
import { FiClock, FiHeart, FiShield, FiUsers } from "react-icons/fi";
import PlatformSlider from "@/components/home/PlatformSlider";
// import { getNavigationStructure, NavigationStructure } from "@/lib/navigationService";
import { FaChartLine, FaLongArrowAltRight, FaRobot } from "react-icons/fa";
import UnderConstructionPage from "@/components/UnderConstruction";
import StatsGrid from "@/components/home/RoundStatsCard";

// Dynamically import heavy/below-the-fold components to improve PageSpeed and load performance
const ParticlesBg = dynamic(() => import("@/components/home/Particles"), { ssr: false });
const TechnologySection = dynamic(() => import("@/components/home/TechnologySection"), { ssr: false });
const WhyChooseITS = dynamic(() => import("@/components/home/WhyChooseITS"), { ssr: false });
const Industries = dynamic(() => import("@/components/home/Industries"), { ssr: false });
const Reviews = dynamic(() => import("@/components/home/Reviews"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/home/Testimonials"), { ssr: false });
const EngagementModel = dynamic(() => import("@/components/home/EngagementModel"), { ssr: false });
const AiServicesSlider = dynamic(() => import("@/components/home/AiServicesSlider"), { ssr: false });


export default function HomeClient({ initialData }: { initialData?: HomePageData }) {
	const MotionImage = motion.create(Image);
	const fadeInVariant = {
		hidden: { opacity: 0, y: 40 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
		}),
	};

	const [gettingHomePageData, setGettingHomePageData] = useState(!initialData);
	const [homePageData, setHomePageData] = useState<HomePageData | null>(initialData || null);
	const { portfolioSlug } = useWebsiteSettings();
	const { slug } = useParams<{ slug: string }>();
	const [notFound, setNotFound] = useState(false);
	const [data, setData] = useState<HomePageData | null>(null);
	const [isMobile, setIsMobile] = useState(false);
	 const { navStructure } = useWebsiteSettings();
	// const [navStructure, setNavStructure] = useState<NavigationStructure | null>(null);

	// useEffect(() => {
	// const fetchNavData = async () => {
	// 	try {
	// 	const data = await getNavigationStructure();
	// 	setNavStructure(data);
	// 	} catch (error) {
	// 	console.error(error);
	// 	}
	// };

	// fetchNavData();
	// }, []);


	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);
	   

	useEffect(() => {
		const fetchData = async () => {
			try {
				const json = await apiService<{ data: HomePageData }>(
					`/homepage/slug/${slug}`,
					{ method: "GET" }
				);
				const result = json?.data || (json as unknown as HomePageData);
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
		// return (
		// 	<div className="min-h-screen flex items-center justify-center">
		// 		<NotFoundPage />
		// 	</div>
		// );
		nextNotFound();
	}

	const fetchHomepageData = useCallback(async () => {
		setGettingHomePageData(true);
		try {
			const responce = await apiService<SingleResponse<HomePageData>>(
				"/homepage"
			);
			if (responce.success) {
				setHomePageData(responce.data);
			} else {
				console.error(responce.message);
			}
		} catch (error: any) {
			console.error(error.message);
		} finally {
			setGettingHomePageData(false);
		}
	}, []);

	useEffect(() => {
		if (!initialData) {
			fetchHomepageData();
		}
	}, [fetchHomepageData, initialData]);

	const services = navStructure?.servicesNav?.flatMap((category) =>
		category.links?.map((service) => ({
			title: service.title,
			slug: service.slug,
		})) || []
		) || [];

	if (gettingHomePageData) {
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
	

	if (!homePageData) {
		return (
			// <div className="min-h-screen flex items-center justify-center">
			// 	<NotFoundPage />
			// </div>
			<UnderConstructionPage />
		);
	}
	// const sliderSettings = {
	// 	speed: 500,
	// 	slidesToShow: 3,
	// 	slidesToScroll: 1,
	// 	arrows: true,
	// 	nextArrow: <NextArrow />,
	// 	prevArrow: <PrevArrow />,
	// 	autoplaySpeed: 3000,
	// 	responsive: [
	// 		{
	// 			breakpoint: 1024,
	// 			settings: {
	// 				slidesToShow: 2,
	// 			},
	// 		},
	// 		{
	// 			breakpoint: 768,
	// 			settings: {
	// 				slidesToShow: 1,

	// 			},
	// 		},
	// 		{
	// 			breakpoint: 480,
	// 			settings: {
	// 				slidesToShow: 1,

	// 				centerMode: true,
	// 				centerPadding: '20px',
	// 			},
	// 		},
	// 	],
	// };


	const glowColors = [
		"rgba(16, 185, 129, 0.25)",
		"rgba(14, 165, 233, 0.25)",
		"rgba(139, 92, 246, 0.25)",
		"rgba(245, 158, 11, 0.25)",
		"rgba(244, 63, 94, 0.25)",
		"rgba(20, 184, 166, 0.25)",
	];


	const statsData = [
  {
    icon: FiShield,
    title: "NDA on Day One",
    description: "Your clients never find us",
  },
  {
    icon: FiClock,
    title: "48hr Kickoff",
    description: "Projects start fast",
  },
  {
    icon: FiUsers,
    title: "40+ Agency Partners",
    description: "US, UK, Australia & Canada",
  },
  {
    icon: FiHeart,
    title: "95% Retention Rate",
    description: "Partnerships since 2012",
  },
];

	// const sliderStyles = `
    //   .slick-slider {
    //     width: 100%;
    //   }
    //   .slick-list {
    //     margin: 0 -5px;
    //   }
    //   .slick-slide > div {
    //     padding: 0 5px;
    //   }
    //   .slick-slide img {
    //     max-width: 100%;
    //     height: auto;
    //   }
    // `;

	const formattedTitle = homePageData?.aisection?.mainTitle?.replace(
		/<strong>(.*?)<\/strong>/g,
		// `<strong class="bg-gradient-to-r from-orange-400 via-amber-300 to-sky-300 bg-clip-text text-transparent">$1</strong>`
		`<strong >$1</strong>`  
	);

	const handleScroll = ( e: React.MouseEvent<HTMLButtonElement> ) => {
  e.preventDefault();

  const section = document.getElementById("ai-service");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

	return (
		<>
		{/* <ContactPopup /> */}

		<main className="relative isolate w-full bg-white text-gray-900">
			{/* <style dangerouslySetInnerHTML={{ __html: sliderStyles }} /> */}
			{/* <Image
				src="/home/Group 37.png"
				alt="Decorative blob"
				width={200}
				height={50}
				priority
				className="absolute left-0 top-50 hidden lg:flex -translate-x-10 w-full  h-118.75"
			/> */}

			<section className="w-full relative py-12 sm:py-25 lg:py-32 overflow-hidden z-10 pb-20! ">
				<div className="absolute inset-0 z-0 bg-linear-to-r from-[#1a0f0f] via-[#0b0f1a] to-[#001a2e]" />

				<div className="absolute inset-0 z-1">
					{!isMobile && <ParticlesBg />}
				</div>
				<div
					className="absolute inset-0 z-0"
					// style={{
					// 	background: `
					// 	radial-gradient(circle at 18% 20%, rgba(252,74,26,0.23), transparent 28%),
					// 	radial-gradient(circle at 85% 70%, rgba(247,183,51,0.15), transparent 20%),
					// 	radial-gradient(circle at 40% 90%, rgba(13,67,93,.25), transparent 15%),
					// 	#030b1a
					// 	`
					// 	// #141F3D
					// }}
					style={{
						background: `
						radial-gradient(circle at 18% 20%, rgba(214, 128, 41, 0.15), transparent 28%),
						radial-gradient(circle at 85% 70%, rgba(14, 165, 233, 0.15), transparent 20%),
						radial-gradient(circle at 40% 90%, rgba(13,67,93,.10), transparent 15%),
						#030b1a					
						`
						// #141F3D #030b1a bg-gradient-to-br from-slate-950/75 via-slate-950/80 to-slate-900/75
					}}
				/>
				<div className="absolute inset-0 z-1 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.06)_0,rgba(0,0,0,0.06)_4px)]" />

				{/* <div className="w-full max-w-[95%] z-10 lg:max-w-[80%] relative mx-auto px-4   "> */}
				<Row className="z-10">
					<motion.div
						className="text-center"
						initial={{ y: -300, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
					>
						{/* <h1
								className="rose text-[clamp(26px,5vw,64px)] text-white  font-normal tracking-[-0.03em] leading-[1.08] opacity-[0.92]  "
								dangerouslySetInnerHTML={{ __html: homePageData?.heroSecton?.title.replace(/<[^>]*>?/gm, "" )}}
							/>
						<div className="mb-5 md:mb-7 ">
							
							<AutoTextSlider data={homePageData.heroSecton.technologySection} />
						</div> */}
							<h1 className="rose text-[clamp(26px,5vw,64px)] text-white font-normal tracking-[-0.03em] leading-[1.08] opacity-[0.92]">
								{homePageData?.heroSecton?.title?.replace(/<[^>]*>?/gm, "")}
								<AutoTextSlider data={homePageData?.heroSecton?.technologySection} />
							</h1>

						<div className="yellow-text max-w-200 mx-auto mb-16 md:mb-20 text-center fonts_16 text-white"
							dangerouslySetInnerHTML={{ __html: homePageData?.heroSecton?.description || "", }}
						/>

						{/* <div className="flex justify-center">
							<motion.div
								className="mb-14"
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								whileHover={{ y: -2 }}
								transition={{ duration: 0.1, ease: "easeOut" }}
							>
								<a href="/#contact-form-section" className="primary_button  group inline-block overflow-hidden">
									<span className="flex gap-2 items-center justify-center ">
										<span className="absolute top-0 left-[-100%] w-[60%] h-full bg-[linear-gradient(90deg,transparent,hsla(0,0%,100%,0.2),transparent)] animate-shine"></span>

										Build Your AI Solution
										<Image
											src="/navbar/arrow.png"
											alt="Get a Quote Arrow"
											width={16}
											height={16}
											className="object-contain transition-transform duration-300 group-hover:translate-x-1"
										/>
									</span>
								</a>
							</motion.div>
						</div> */}
						<div className="flex flex-wrap relative w-full justify-center mb-10 md:mb-14">
							<div className="relative flex flex-wrap items-center w-full max-w-[550px]">

								<Link
								href="#contact-form-section"
								className=" w-full sm:flex-1 bg-white
									text-[#0d1b2a] text-sm md:text-base font-semibold uppercase text-center max-sm:mb-3 leading-5 py-3 px-8 md:px-16 max-[640px]:rounded-lg sm:rounded-l-xl  transition-all
									duration-300  hover:bg-linear-to-r hover:from-[#20548b] hover:to-[#0d1b2a] hover:text-white "
								>
									Request a Callback
								</Link>

								<span
								className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  z-10 flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#0d1b2a]
									text-white  text-sm font-medium  uppercase shadow-[0_0_0_4px_rgba(255,255,255,0.25)] sm:shadow-[0_0_0_6px_rgba(255,255,255,0.25)]  "
								>
									OR
								</span>

								<Link
								href="#contact-form-section"
								className=" w-full sm:flex-1 bg-linear-to-r from-[#d68029] to-[#f7b733] text-[#0d1b2a] text-sm md:text-base font-semibold uppercase text-center leading-5
									py-3 px-8 md:px-16 max-[640px]:rounded-lg sm:rounded-r-xl  transition-all duration-300   hover:bg-linear-to-r hover:from-[#0d1b2a] hover:to-[#20548b] hover:text-white"
								>
									Schedule Free Consultation
								</Link>

							</div>
						</div>

					
					</motion.div>

					 <div className="max-w-[500px] lg:max-w-[840px] mx-auto px-4">
						<div className="h-px bg-[rgba(255,255,255,0.1)] mt-16 md:mt-21 mb-10"></div>
						<div className="grid grid-cols-2 lg:grid-cols-4 max-lg:gap-4">
						{statsData.map((item, index) => {
							const Icon = item.icon;

							return (
							<div key={index}
								className="relative flex flex-col items-center text-center px-4 max-lg:py-5 max-lg:bg-[rgba(255,255,255,0.04)] max-lg:rounded-lg"
							>
								{index !== statsData.length - 1 && (
									<div className=" hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-24 bg-linear-to-b from-transparent via-[#D68029] to-transparent " />
								)}
								<Icon
									size={34}
									className="text-[#ff7a1a]/80 mb-3"
								/>

								<p className="text-white opacity-90 font-bold text-sm">
									{item.title}
								</p>

								<p className="text-white opacity-70 mt-2 font-medium text-xs">
									{item.description}
								</p>
							</div>
							);
						})}
						</div>
					</div>


<div className=" text-center mt-20 md:mt-26">
<button
						onClick={handleScroll}
						className=" inline-flex -center justify-center p-1 border-2 border-[#f7b733] rounded-full  cursor-pointer "
					>
						<div className=" relative w-[30px] h-[60px] border-2 border-white rounded-full " >
							<div className=" absolute left-1/2 top-6 w-3  h-3  bg-white rounded-full mx-auto animate-scrollDot " />
						</div>
					</button>
				</div>
					{/* <motion.div className="flex flex-wrap gap-4 md:gap-3 justify-center md:mb-9" >
						{
							homePageData.reasonsToChoose.deatailBox.length > 0 &&
							homePageData.reasonsToChoose.deatailBox.map((item, idx) => (
								<div
									key={idx}
									className="relative  rounded-xl overflow-hidden "
								>
									<RoundStatsCard
										value={item.total}
										label={item.title}
									/>
								</div>
							))}
					</motion.div> */}
				</Row>
				{/* </div> */}

				<div className="absolute bottom-0 left-0 right-0 h-[150px] bg-[linear-gradient(0deg,#030b1a_0,transparent)] pointer-events-none z-10" />
			</section>

			<Section  className="bg-[#0d1b2a] z-10 py-6! ">
				<Row>
					<PlatformSlider items={services} />
				</Row>
			</Section>

			<Section className="bg-gray-50 py-14!">
					 <Row className=" mx-auto ">
						{/* <motion.div className="grid grid-cols-2 md:grid-cols-4  justify-center max-md:gap-y-6 " >
						{
							homePageData.reasonsToChoose.deatailBox.length > 0 &&
							homePageData.reasonsToChoose.deatailBox.map((item, idx) => (
								<div
									key={idx}
									// className="relative  rounded-xl overflow-hidden "
									className={`
									relative  overflow-hidden border-r border-gray-300
									${(idx % 4 === 3) ? "border-r-0" : ""}
									`}
								>
									<RoundStatsCard
										value={item.total}
										label={item.title}
									/>
								</div>
							))}
					</motion.div> */}
					 <StatsGrid  columns={4} bordered />
					</Row>
			</Section>

			<Section id="ai-service" className="bg-white z-10 scroll-mt-10">
				<Row>
					<div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16 lg:mb-24">
					
					{/* LEFT SIDE */}

					<div>
						<h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
							dangerouslySetInnerHTML={{ __html: formattedTitle?.replace(/<\/?h[1-6][^>]*>/gi, "") }}
						/>
					</div>
					<div>
						<p className="text-lg font-normal text-[#6f6f6f] leading-8 tracking-wide "
							dangerouslySetInnerHTML={{
								__html: homePageData?.aisection?.description || "",
							}}
						/>

						<Button
						// 	motionProps={{
						// 	initial: { opacity: 0, scale: 0.8 },
						// 	whileInView: { opacity: 1, scale: 1 },
						// 	viewport: { once: true, amount: 0.2},
						// 	transition: { duration: 0.4, ease: "easeInOut" },
						// }}
						bgColor="#d68029"
						hoverColor="#0d1b2a"
						text="Let's Build Something That Scales"
						href="#contact-form-section"
						icon="/navbar/btn_icon.png"
						className="mt-8"
						/>
					</div>
					</div>
				</Row>
				<Row className="p-1 py-2">
					<AiServicesSlider
						deatailBox={homePageData?.aisection?.deatailBox}
						glowColors={glowColors}
					/>
				</Row>
			</Section>

			<Section className="lg:pb-0!  bg-white">
				{/* <CurveDivider type="top" fillColor="#ffffff" className="absolute top-0 left-0 w-full transform -translate-y-[99%] z-10" /> */}
				{/* <div className="w-full max-w-[90%] lg:max-w-[80%] relative mx-auto   grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> */}
				<Row className=" grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div className="relative w-full flex justify-center lg:justify-center items-center">
						<Image
							src={homePageData?.aboutOurCompany?.image}
							alt="Global Network"
							width={500}
							height={500}
							  sizes="(max-width: 768px) 100vw, 500px"
							className="w-full  lg:max-w-125 h-auto object-contain"
						/>
						<motion.div
							className="absolute -bottom-7 md:-bottom-4 xl:bottom-1 left-auto lg:left-auto max-[400px]:-right-1/6 max-[500px]:-right-1/5 -right-1/6 sm:-right-1/7 
							lg:right-5 transform -translate-x-1/2 lg:translate-x-0 bg-black text-white px-2 md:px-6 py-2 md:py-4 rounded-lg shadow-lg"
							initial={{ opacity: 0, scale: 0.7 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.7, ease: "easeOut" }}
							viewport={{ once: true }}
						>
							<div className="flex items-center gap-3">
								<div className="bg-yellow-500 p-2 rounded">
									<Image
										src={homePageData?.aboutOurCompany?.buttonContent?.image}
										alt="Award Icon"
										width={60}
										height={60}
										className="w-6 h-6"
									/>
								</div>
								<div>
									<h4 className=" text-xl md:text-3xl font-bold">{homePageData?.aboutOurCompany?.buttonContent?.total}</h4>
									<p className="text-xs tracking-wide uppercase">
										{homePageData?.aboutOurCompany?.buttonContent?.label}
									</p>
								</div>
							</div>
						</motion.div>
					</div>

					<div className="w-full relative z-20 ">
						<p className="text-gray-500 uppercase text-sm font-semibold mb-2 flex items-center gap-2">
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3 5h18M3 12h18M3 19h18"
								/>
							</svg>
							{homePageData?.aboutOurCompany?.subtitle}
						</p>
						{/* <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug"> */}
							<h2
								className="common-h2-small mb-4 leading-snug rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
								dangerouslySetInnerHTML={{ __html: homePageData?.aboutOurCompany?.mainTitle.replace(/<\/?h[1-6][^>]*>/gm, "") || "" }}
							/>
						{/* </h2> */}
						<div className="fonts_16 text-gray-600 mb-6 [&_p]:mb-4 [&_p:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: homePageData?.aboutOurCompany?.description || "" }}/>

							{/* {homePageData.aboutOurCompany.description}
						</p> */}

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
							{
								homePageData?.aboutOurCompany?.deatailBox.length > 0 &&
								homePageData?.aboutOurCompany?.deatailBox.map((data, index) => (

									<div className="flex items-center gap-3" key={index}>
										<Image
											src={data.image}
											alt={data.label}
											width={80}
											height={80}
											className=" w-12 h-12  lg:w-16 lg:h-16"
										/>
										<p className="font-semibold">{data.label}</p>
									</div>
								))
							}

						</div>

						{/* <motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
							// className="bg-[#0d1b2a] relative  hidden xl:inline-flex items-center justify-center w-max overflow-hidden gap-2 text-white rounded-xl  transition-colors group"
							className="relative inline-flex items-center justify-center overflow-hidden gap-2 rounded-xl bg-[#0d1b2a]  text-sm font-semibold text-white transition-colors group"
						>
							<span className="absolute w-0 h-0 transition-all duration-750 delay-300 ease-in-out bg-[#D68029] rounded group-hover:w-56 group-hover:h-56"></span>
							<a
								href="/#contact-form-section"
								// className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold">
								 className="relative tracking-tight rounded-[10px] text-sm sm:text-base font-semibold px-6 py-3 sm:px-8 sm:py-4 text-white transition-colors ">
								<span className="flex flex-row gap-3  justify-center">
									Get a quote
									<Image
										src="/navbar/btn_icon.png"
										alt="Get a Quote Arrow"
										width={20}
										height={20}
										className=" "
									/>
								</span>
							</a>
						</motion.div> */}
						<Button
							motionProps={{
								initial: { opacity: 0, scale: 0.8 },
								whileInView: { opacity: 1, scale: 1 },
								viewport: { once: true, amount: 0.2},
								transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
							}}
							text="Get a Quote"
							href="/#contact-form-section"
							icon="/navbar/btn_icon.png"
							className="mb-2"
						/>

					</div>
					{/* <CurveDivider type="bottom" fillColor="#ffffff" className="absolute bottom-0 left-0 w-full transform translate-y-[99%] z-10" /> */}
					</Row>
				{/* </div> */}
			</Section>

			<ParallaxShape type="top" />
			<ParallaxShape type="bottom" />

			<TechnologySection />

			<ParallaxShape type="top" />

			<WhyChooseITS />
			{/* <WebProcess /> */}
			<Industries />
			<Section className=" bg-white ">
				<div className="w-full mx-auto flex flex-col gap-12">
					{/* <div className="w-full max-w-[90%] lg:max-w-[80%] relative mx-auto text-center flex flex-col items-center"> */}
					<Row className=" text-center flex flex-col items-center">
						{/* <h2 className="text-center w-full font-bold text-black tracking-tight text-2xl md:text-3xl lg:text-[40px]/[120%]"> */}
							<h2
								className="common-h2 text-center w-full  text-black rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
								dangerouslySetInnerHTML={{ __html: homePageData?.overseasWebAgencies?.mainTitle.replace(/<\/?h[1-6][^>]*>/gm, "") || "" }}
							/>
						{/* </h2> */}

						<Motion />

						<p className="text-black font-bold max-w-xl text-sm sm:text-base md:text-lg leading-relaxed mt-4"
							dangerouslySetInnerHTML={{ __html: homePageData?.overseasWebAgencies?.desctiption || "" }}
						/>
							{/* {homePageData.overseasWebAgencies.desctiption}
						</p> */}
					</Row>
					{/* </div> */}
					{/* <div className="w-full max-w-[90%] lg:max-w-[80%] relative mx-auto flex flex-col lg:flex-row items-center lg:items-center justify-center-safe gap-10"> */}
					<Row className="flex flex-col lg:flex-row items-center lg:items-center justify-center-safe gap-10">
						<div className="w-full lg:w-4/6">
							<Image
								src={homePageData?.overseasWebAgencies?.image}
								alt="World Map"
								width={1200}
								height={600}
								unoptimized
								className="w-full h-auto rounded-lg  "
							/>
						</div>

						<div className="w-full lg:w-2/6">
							<div className="mb-6 text-center lg:text-left">
								<p className="text-gray-500 text-lg mb-2">{homePageData?.overseasWebAgencies?.detail?.subtitle}</p>
								<h3 className="text-3xl font-bold text-gray-900">
									{homePageData?.overseasWebAgencies?.detail?.title}
								</h3>
							</div>
						</div>
						</Row>
					{/* </div> */}
					{/* Button */}
					{/* <div className="flex justify-center w-full max-w-[90%] lg:max-w-[80%] relative mx-auto "> */}
					<Row className="flex justify-center">
						<Link
							href={`/${portfolioSlug}`}
							className="group relative inline-flex items-center overflow-hidden rounded-full"
							>
							<span
								className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-12 md:h-14 md:w-14 rounded-full bg-gray-200 transition-all duration-500 ease-in-out group-hover:w-full "
							></span>
							<span className="relative z-10 flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 text-md md:text-xl font-semibold text-[#12203d]">
								See our projects <FaLongArrowAltRight className="inline-block" />
							</span>
							</Link>

						{/* <Link href={`/${blogSlug}`} className="hover:underline">BLOG</Link> */}
					</Row>
					{/* </div> */}
				</div>
			</Section>
			<Reviews />
			<Testimonials />
			<EngagementModel />
		</main>
		</>
	);
}


