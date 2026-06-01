"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import TechnologySection from "@/components/home/TechnologySection";
import WebProcess from "@/components/home/WebProcess";
import Industries from "@/components/home/Industries";
import WorldProjects from "@/components/home/WorldProjects";
import Reviews from "@/components/home/Reviews";
import Testimonials from "@/components/home/Testimonials";
import EngagementModel from "@/components/home/EngagementModel";
import Motion from "@/components/motionbar";
import WhyChooseITS from "@/components/home/WhyChooseITS";
import { getSeoData } from "@/lib/seoService";
import { Metadata } from "next";
import { HomePageData, SingleResponse } from "@/types";
import apiService from "@/lib/apiService";
import NotFoundPage from "@/components/NotFoundPage";
import Link from "next/link";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import RoundStatsCard from "@/components/home/RoundStatsCard";
import ParticlesBg from "@/components/home/Particles";
import AutoTextSlider from "@/components/home/AutoTextSlider";
import AiServices from "@/components/home/AiServices";
import ParallaxShape from "@/components/home/ParallaxShape";

const NextArrow = (props: any) => {
	const { onClick } = props;
	return (
		<button
			onClick={onClick}
			className="absolute top-1/2 -right-12 z-10 h-10 w-10 -translate-y-1/2 transform cursor-pointer rounded-full bg-white text-gray-700 shadow-[0_0_16px_#D6802940] transition-colors duration-300 flex items-center justify-center hover:bg-[#d68029] hover:text-white"
		>
			<FaChevronRight />
		</button>
	);
};

const PrevArrow = (props: any) => {
	const { onClick } = props;
	return (
		<button
			onClick={onClick}
			className="absolute top-1/2 -left-12 z-10 h-10 w-10 -translate-y-1/2 transform cursor-pointer rounded-full bg-white text-gray-700 shadow-[0_0_16px_#D6802940] transition-colors duration-300 flex items-center justify-center hover:bg-[#d68029] hover:text-white"
		>
			<FaChevronLeft />
		</button>
	);
};


export default function HomeClient() {
	const MotionImage = motion(Image);
	const fadeInVariant = {
		hidden: { opacity: 0, y: 40 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
		}),
	};

	const [gettingHomePageData, setGettingHomePageData] = useState(true);
	const [homePageData, setHomePageData] = useState<HomePageData | null>(null);

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
		fetchHomepageData();
	}, [fetchHomepageData]);

	if (gettingHomePageData) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d68029]"></div>
			</div>
		);
	}
	if (!homePageData) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<NotFoundPage />
			</div>
		);
	}
	const sliderSettings = {
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,

				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,

					centerMode: true,
					centerPadding: '20px',
				},
			},
		],
	};


	const glowColors = [
		"rgba(16, 185, 129, 0.25)",
		"rgba(14, 165, 233, 0.25)",
		"rgba(139, 92, 246, 0.25)",
		"rgba(245, 158, 11, 0.25)",
		"rgba(244, 63, 94, 0.25)",
		"rgba(20, 184, 166, 0.25)",
	];


	const sliderStyles = `
      .slick-slider {
        width: 100%;
      }
      .slick-list {
        margin: 0 -5px;
      }
      .slick-slide > div {
        padding: 0 5px;
      }
      .slick-slide img {
        max-width: 100%;
        height: auto;
      }
    `;

	const formattedTitle = homePageData?.aisection?.mainTitle?.replace(
		/<strong>(.*?)<\/strong>/g,
		`<strong class="bg-gradient-to-r from-orange-400 via-amber-300 to-sky-300 bg-clip-text text-transparent">$1</strong>`
	);



	return (
		<main className="relative isolate w-full bg-white text-gray-900">
			<style dangerouslySetInnerHTML={{ __html: sliderStyles }} />
			<Image
				src="/home/Group 37.png"
				alt="Decorative blob"
				width={200}
				height={50}
				className="absolute left-0 top-50 hidden lg:flex -translate-x-10 h-118.75"
			/>

			<section className="w-full relative py-12 sm:py-25 lg:py-32 overflow-hidden z-10 ">
				<div className="absolute inset-0 z-0 bg-gradient-to-r from-[#1a0f0f] via-[#0b0f1a] to-[#001a2e]" />

				<div className="absolute inset-0 z-1">
					<ParticlesBg
					/>
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
				<div className="absolute inset-0 z-[1] pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.06)_0,rgba(0,0,0,0.06)_4px)]" />

				<div className="w-full max-w-[95%] z-10 lg:max-w-[80%] relative mx-auto px-4  font-bricolage  ">
					<motion.div
						className="text-center mb-2 "
						initial={{ y: -300, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.5, ease: "easeOut" }}
					>

						<div className="mb-5 md:mb-7 ">
							<div
								className="rose text-[clamp(26px,5vw,64px)] text-white  font-normal tracking-[-0.03em] leading-[1.08] opacity-[0.92]  "
								dangerouslySetInnerHTML={{ __html: homePageData?.heroSecton?.title || ""}}
							/>
							<AutoTextSlider data={homePageData.heroSecton.technologySection} />
						</div>

						<div className="yellow-text max-w-[800px] mx-auto mb-[36px] text-center text-[15px] md:text-[15px] leading-[1.75] text-white"
							dangerouslySetInnerHTML={{ __html: homePageData?.heroSecton?.description || "", }}
						/>

						<div className="flex justify-center">
							<motion.div
								className="mb-17"
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
						</div>


					</motion.div>

					<motion.div className="flex flex-wrap gap-4 md:gap-3 justify-center md:mb-9" >
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
					</motion.div>
				</div>

				<div className="absolute bottom-0 left-0 right-0 h-[150px] bg-[linear-gradient(0deg,#030b1a_0,transparent)] pointer-events-none z-[10]" />
			</section>







			<section className="w-full relative py-10 md:py-20 overflow-hidden text-white z-10">
				<video
					autoPlay
					loop
					muted
					src="/home/bg_video.mp4"
					playsInline
					className="absolute top-0 left-0 w-full h-full object-cover"
				>
				</video>
				<div className="absolute inset-0 bg-gradient-to-br from-slate-950/75 via-slate-950/80 to-slate-900/75 pointer-events-none"></div>

				<div className="relative z-10 container mx-auto max-w-7xl px-4 flex flex-col lg:flex-row gap-5 lg:gap-14 items-stretch">
					<div className="lg:w-2/5 flex flex-col">
						<div className="flex">
							<span className="inline-flex items-center rounded-full border border-white bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-200 mb-4">
								{homePageData?.aisection?.subtitle}
							</span>
						</div>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 font-bricolage"
							dangerouslySetInnerHTML={{ __html: formattedTitle }}
						/>
						<p className="text-sm sm:text-base text-slate-300 leading-relaxed sm:mb-6 mb-3">{homePageData?.aisection?.description}</p>
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							whileHover={{ y: -2 }}
							transition={{ duration: 0.1, ease: "easeOut" }}
						>
							<a href="/#contact-form-section" className="primary_button  group inline-block overflow-hidden">
								<span className="absolute top-0 left-[-100%] w-[60%] h-full bg-[linear-gradient(90deg,transparent,hsla(0,0%,100%,0.2),transparent)] animate-shine" />
								Explore AI Services
							</a>
						</motion.div>
					</div>

					<div className="lg:w-3/5 grid sm:grid-cols-2 gap-2 sm:gap-5">
					
						{homePageData?.aisection?.deatailBox?.map((item, idx) => (
							<div key={idx}
								className="relative group rounded-xl overflow-hidden h-full">
								<span
									className="absolute -top-5 -right-5 h-32 w-32  blur-2xl z-10"
									style={{
										background: `radial-gradient(circle, ${glowColors[idx % glowColors.length]}, transparent 70%)`,
									}}
								/>
								<div className="h-full">
								<AiServices
									title={item.title}
									heading={item.heading}
									description={item.description}
									glowColor={glowColors[idx % glowColors.length]}
								/>
								</div>
							</div>
						))}
					
					</div>
				</div>
			</section>








			{/* <section className="w-full relative max-w-[90%] lg:max-w-[80%] mx-auto px-6 md:px-8 lg:px-10 pb-20 text-center">
				<motion.h2
					className="text-2xl md:text-3xl font-bold mb-4"
					initial={{ opacity: 0, y: -40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.9, ease: "easeOut" }}
					viewport={{ once: true, amount: 0.3 }}
				>
					<div
						className="    rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
						dangerouslySetInnerHTML={{ __html: homePageData.reasonsToChoose.mainTitle }}
					/>
				</motion.h2>

				<Motion />

				<motion.div
					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
					initial={{ opacity: 0, scale: 0.9, y: 50 }}
					whileInView={{ opacity: 1, scale: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
					viewport={{ once: true, amount: 0.3 }}
				>
					{
						homePageData.reasonsToChoose.deatailBox.length > 0 &&
						homePageData.reasonsToChoose.deatailBox.map((item, idx) => (
							<div
								key={idx}
								className="relative group rounded-xl overflow-hidden p-6 bg-white shadow-[0_0_16.9px_0_rgba(102,102,102,0.25)]"
							>
								<div
									className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
									style={{
										background: `radial-gradient(circle, ${glowColors[idx % glowColors.length]}, transparent 70%)`,
									}}
								/>
								<StatsCard
									value={item.total}
									label={item.title}
									// icon={item.image}
								/>
							</div>
						))}
				</motion.div>
			</section> */}

			<section className="w-full relative lg:pb-0 py-20 bg-white z-10 ">
				<div className="w-full max-w-[90%] lg:max-w-[80%] relative mx-auto px-6 md:px-8 lg:px-10  grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div className="relative w-full flex justify-center lg:justify-end items-center">
						<Image
							src={homePageData.aboutOurCompany.image}
							alt="Global Network"
							width={500}
							height={500}
							className="w-full  lg:max-w-125 h-auto object-contain"
						/>
						<motion.div
							className="absolute -bottom-8 md:-bottom-4 xl:bottom-1 left-auto lg:left-auto max-[400px]:-right-1/3 max-[500px]:-right-1/4 -right-1/5 sm:-right-1/5 lg:right-5 transform -translate-x-1/2 lg:translate-x-0 bg-black text-white px-2 md:px-6 py-2 md:py-4 rounded-lg shadow-lg"
							initial={{ opacity: 0, scale: 0.7 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.7, ease: "easeOut" }}
							viewport={{ once: true }}
						>
							<div className="flex items-center gap-3">
								<div className="bg-yellow-500 p-2 rounded">
									<Image
										src={homePageData.aboutOurCompany.buttonContent.image}
										alt="Award Icon"
										width={60}
										height={60}
										className="w-6 h-6"
									/>
								</div>
								<div>
									<p className=" text-xl md:text-3xl font-bold">{homePageData.aboutOurCompany.buttonContent.total}</p>
									<p className="text-xs tracking-wide uppercase">
										{homePageData.aboutOurCompany.buttonContent.label}
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
							{homePageData.aboutOurCompany.subtitle}
						</p>
						{/* <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug"> */}
							<h2
								className="text-3xl md:text-4xl font-bold mb-4 leading-snug rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
								dangerouslySetInnerHTML={{ __html: homePageData?.aboutOurCompany?.mainTitle || "" }}
							/>
						{/* </h2> */}
						<p className="text-gray-600 mb-6" dangerouslySetInnerHTML={{ __html: homePageData?.aboutOurCompany?.description || "" }}/>

							{/* {homePageData.aboutOurCompany.description}
						</p> */}

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
							{
								homePageData.aboutOurCompany.deatailBox.length > 0 &&
								homePageData.aboutOurCompany.deatailBox.map((data, index) => (

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

						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
							className="bg-[#12203d] relative inline-flex items-center justify-center w-max overflow-hidden text-white rounded-xl group"
						>
							<span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#D68029] rounded group-hover:w-80 group-hover:h-80"></span>
							<a
								href="/#contact-form-section"
								className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold">
								<span className="flex flex-row gap-3 uppercase justify-center">
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
						</motion.div>

					</div>
				</div>
			</section>

			<ParallaxShape type="bottom" />

			<TechnologySection />

			<ParallaxShape type="top" />

			<WhyChooseITS />
			{/* <WebProcess /> */}
			<Industries />
			<section className="w-full py-12 bg-white z-10 relative">
				<div className="w-full mx-auto flex flex-col gap-12">
					<div className="mb-8 mx-auto flex flex-col items-center text-center px-4">
						<h2 className="text-center w-full font-bold text-black tracking-tight text-2xl md:text-3xl lg:text-[40px]/[120%]">
							<div
								className=" rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
								dangerouslySetInnerHTML={{ __html: homePageData?.overseasWebAgencies?.mainTitle || "" }}
							/>
						</h2>

						<Motion />

						<p className="text-black font-bold max-w-xl text-sm sm:text-base md:text-lg leading-relaxed mt-4"
							dangerouslySetInnerHTML={{ __html: homePageData?.overseasWebAgencies?.desctiption || "" }}
						/>
							{/* {homePageData.overseasWebAgencies.desctiption}
						</p> */}
					</div>
					<div className="flex flex-col lg:flex-row items-center lg:items-center justify-center-safe w-full  gap-10">
						<div className="w-full lg:w-2/4">
							<Image
								src={homePageData.overseasWebAgencies.image}
								alt="World Map"
								width={1200}
								height={600}
								unoptimized
								className="w-full h-auto rounded-lg  "
							/>
						</div>

						<div className="w-full lg:w-1/4">
							<div className="mb-6 text-center lg:text-left">
								<p className="text-gray-500 text-lg mb-2">{homePageData.overseasWebAgencies.detail.subtitle}</p>
								<h3 className="text-3xl font-bold text-gray-900">
									{homePageData.overseasWebAgencies.detail.title}
								</h3>
							</div>
						</div>
					</div>
					{/* Button */}
					<div className="flex justify-center">
						<Link href="/our-portfolio">
							<button className="group cursor-pointer relative inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full font-semibold text-[#0A1128] text-sm sm:text-base overflow-hidden">
								<span className="absolute inset-0 flex">
									<span className="h-full w-10 rounded-full bg-[#F1F1F1] transition-all duration-300 group-hover:w-100"></span>
								</span>

								<span className="relative z-10 flex items-center gap-2">
									See our projects
									<span className="transition-transform duration-300 group-hover:translate-x-1">
										→
									</span>
								</span>
							</button>
						</Link>
					</div>
				</div>
			</section>
			<Reviews />
			<Testimonials />
			<EngagementModel />
		</main>
	);
}

type FeatureCardProps = {
	icon: React.ReactNode;
	title: string;
	desc: string;
};

function FeatureCard({ icon, title, desc }: FeatureCardProps) {
	return (
		<div className="group relative rounded-2xl    border border-gray-200 bg-white p-6 m-4 md:m-0 shadow-sm transition-shadow hover:shadow-lg">
			<div className="absolute right-3 top-3 flex gap-1 opacity-60">
				<span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
				<span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
				<span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
			</div>
			<div className="mb-3">{icon}</div>
			<h3 className="text-base font-semibold mb-2">{title}</h3>
			<p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
		</div>
	);
}
