"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ServicesContent from "@/components/our-services/content";
import EngagementModels from "@/components/home/EngagementModel";
import Reviews from "@/components/home/Reviews";
import Testimonials from "@/components/home/Testimonials";
import { useCallback, useEffect, useState } from "react";
import { OurServicesMain, SingleResponse } from "@/types";
import apiService from "@/lib/apiService";
import NotFoundPage from "../NotFoundPage";
import Link from "next/link";

export default function OurServicesClient() {

	const [gettingOurServiceData, setGettingOurServiceData] = useState(true);
	const [ourServicePageData, setOurServicePageData] = useState<OurServicesMain | null>(null);

	const fetchOurServiceContent = useCallback(async () => {
		setGettingOurServiceData(true);
		try {
			const responce = await apiService<SingleResponse<OurServicesMain>>('/service-main');
			if (responce.success) {
				setOurServicePageData(responce.data);

			} else {
				console.error(responce.message)
			}
		} catch (error: any) {
			console.error(error.message)
		} finally {
			setGettingOurServiceData(false)
		}
	}, [])

	useEffect(() => {
		fetchOurServiceContent();
	}, [fetchOurServiceContent])

	if (gettingOurServiceData) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d68029]"></div>
			</div>
		);
	}

	if (!ourServicePageData) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<NotFoundPage />
			</div>
		)
	}

	return (
		<>
			<section className="relative w-full common_background_gradient">
				{/*   px-4 md:px-6  */}
				<div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex flex-col">
					<div
						className="absolute w-full inset-0 bg-cover bg-center z-0 hidden md:block"
						style={{
							backgroundImage: "url('/services/Vector-2.png')",
							backgroundSize: "1400px 740px",
							backgroundRepeat: "no-repeat",
							backgroundPosition: "center",
						}}
					/>

					<div className="w-full  mx-auto text-center relative z-10">
						{/* Floating decorative elements */}
						<motion.div
							className="hidden lg:block absolute top-20 left-4 lg:top-72 lg:left-32 w-10 h-10 lg:w-auto lg:h-auto"
							animate={{ y: [0, -15, 0] }}
							transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
						>
							<Image
								src="/services/Lightning.svg"
								alt="Lightning"
								width={50}
								height={50}
							/>
						</motion.div>

						<motion.div
							className="hidden lg:block absolute top-6 right-4 lg:right-32 w-10 h-10 lg:w-auto lg:h-auto"
							animate={{ y: [0, 15, 0] }}
							transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
						>
							<Image
								src="/services/Soft-Star.svg"
								alt="Star"
								width={50}
								height={50}
							/>
						</motion.div>

						{/* Hero content */}
						<div className="relative z-10 py-12 md:py-16">
							<motion.h1
								initial={{ opacity: 0, y: -50 }} // start above
								animate={{ opacity: 1, y: 0 }} // drop into position
								transition={{ duration: 0.8, ease: "easeOut" }} // smooth drop
								className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6 md:mb-10 leading-snug"
							>
								<div
									className="  text-black rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
									dangerouslySetInnerHTML={{ __html: ourServicePageData.mainTitle }}
								/>
							</motion.h1>

							<motion.h1
								initial={{ opacity: 0, y: 50 }} // start hidden and shifted down
								animate={{ opacity: 1, y: 0 }} // fade in and slide up
								transition={{ duration: 0.8, ease: "easeOut" }} // smooth timing
								className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6 md:mb-10 leading-snug"
							>
								<div className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-6 md:mb-8 px-2">

									{ourServicePageData.description ? (
										<div
											className="font-medium text-black rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
											dangerouslySetInnerHTML={{ __html: ourServicePageData.description }}
										/>

									) : ourServicePageData.description}
								</div>

							</motion.h1>

							<motion.a
								href="#contact-form-section"
								className="relative overflow-hidden px-5 sm:px-6 py-2.5 sm:py-3 
             bg-[#0b1833] text-white text-sm sm:text-base font-medium 
             rounded-lg shadow-md"
								whileHover="hover"
								initial="rest"
								animate="rest"
								variants={{
									rest: { scale: 1 },
									hover: { scale: 1.02 },
								}}
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
								<span className="relative z-10">Get Started</span>
							</motion.a>

							{/* Service Cards */}
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }} // start smaller and transparent
								animate={{ opacity: 1, scale: 1 }} // grow to full size
								transition={{ duration: 0.8, ease: "easeOut" }} // smooth timing
								className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-14 w-full gap-4 justify-center justify-items-center items-center mx-auto "
							>
								{
									ourServicePageData.heroSections.length > 0 &&
									ourServicePageData.heroSections.map((data, index) => (
										<div key={index} className={`${index % 2 == 0 ? ' md:-translate-y-4 ' : ' md:translate-y-6 lg:translate-y-16  '}  transition-transform duration-300`}>
											<div
												className="p-2  m-2  rounded-xl border-2 border-dashed border-gray-800 bg-white shadow-md 
                 								flex flex-col justify-center h-100 w-65 sm:w-70 md:w-75 transform transition-transform duration-300 hover:scale-95"
											>
												<div className="relative flex items-center justify-center w-24 h-24 mx-auto mb-4">
													{/* 1. Background Shape Image (positioned behind) */}

													<Image
														src={index == 0 ? "/services/Vector-1.png" : (index == 1 ? "/services/Vector2.png" : "/services/Vector-3.png")}
														alt=""
														layout="fill"
														objectFit="contain"
														className="absolute inset-0 z-0"
													/>


													{data.image ? (
														<Image
															src={data.image}
															alt={data.title}
															width={60}
															height={60}
															unoptimized
															className="relative z-10"
														/>
													) : (
														<div className="w-full h-15 bg-gray-200 rounded-lg animate-pulse"></div>
													)}
												</div>
												<h3 className="text-lg sm:text-xl font-bold mb-4 text-center" >
													{data.title}
												</h3>
												<ul className="text-gray-600 space-y-1.5 lg:space-y-3 text-left text-sm sm:text-base">
													{data.points.map((item, i) => (
														<li
															key={i}
															className="flex ml-8 gap-3 hover:text-black transition mt-6"
														>

															<Link href={item.serviceId.slug} className="flex flex-row gap-2 items-center" >
																{item.image && (
																	<Image
																		src={item.image}
																		alt={item.label}
																		width={20}
																		height={20}
																		unoptimized
																	/>
																)}
																{item.label}
															</Link>
														</li>
													))}
												</ul>
											</div>
										</div>
									))
								}

							</motion.div>
						</div>
					</div>
				</div>

			</section>
			<section className="w-full py-12.5 relative  ">
				<div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto relative flex flex-wrap">
					{ourServicePageData.technologyDetails.map((service, index) => (
						<div
							key={index}
							className={`w-full relative mx-auto flex flex-col md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""
								} items-center justify-between gap-10  xl:px-12 py-16`}
						>
							{/* Image */}
							<motion.div
								className="flex-1 flex justify-center"
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									x: [0, -20, 20, -10, 10, 0],
								}}
								transition={{ duration: 1.2, ease: "easeInOut" }}
								viewport={{ once: true, amount: 0.5 }}
							>
								{
									service.image ? (

										<Image
											src={service.image}
											alt={service.title}
											width={0}
											height={0}
											sizes="100vw"
											className="w-125 md:w-162.25 lg:w-175 h-auto object-contain"
										/>
									) :
										(
											<div className="w-full h-175 bg-gray-200 rounded-lg animate-pulse"></div>
										)
								}
							</motion.div>

							{/* Content */}
							<div className="flex-1">
								<motion.div
									initial={{ opacity: 0, y: -50 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{ duration: 0.8, ease: "easeOut" }}
									className=" relative common_htags left_htags "
								>
									<h2 className="relative text-3xl md:text-4xl font-bold mb-4">
										{service.title}
									</h2>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
									className="text-gray-700 text-lg mb-3"
								>
									{/* {service.subtitle} */}
									{service.description ? (
										<div
											className="font-medium text-black rose max-w-none [&_a]:no-underline [&_a]:text-[#d68029] [&_a:hover]:underline [&_a]:cursor-pointer  "
											dangerouslySetInnerHTML={{ __html: service.description }}
										/>

									) : service.description}
								</motion.div>



								{/* Tech Icons */}
								<motion.div
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
									className="flex items-center gap-6 mb-6 flex-wrap"
								>
									{service.technologyDetail.map((data, i) => (
										<div key={i} className="flex flex-col items-center">
											{
												data.image &&
												<Image src={data.image} alt={data.label} width={40} height={40} />
											}
											<span className="text-sm mt-1">{data.label}</span>
										</div>
									))}
								</motion.div>

								{/* List */}
								<motion.ul
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
									className="mb-6 text-gray-700 grid gap-3 grid-cols-1 md:grid-cols-2"
								>
									{service.developmentDetail.map((data, i) => (
										<li key={i} className="flex items-center gap-3">
											<Link href={data.serviceId.slug} className="flex flex-row gap-2 items-center">
												<Image src={data.image} alt={data.label} width={24} height={24} />
												{data.label}
											</Link>
										</li>
									))}
								</motion.ul>

								{/* Button with link */}
								<Link href={service.developmentDetail[0].serviceId.slug}>
									<motion.button
										className="relative overflow-hidden px-5 sm:px-6 py-2.5 sm:py-3 
						 bg-[#0b1833] text-white text-sm sm:text-base font-medium 
						 rounded-lg shadow-md cursor-pointer"
										initial={{ opacity: 0, y: 40 }}
										animate="rest"
										whileHover="hover"
										variants={{
											rest: { scale: 1, opacity: 1, y: 0 },
											hover: { scale: 1.02 },
										}}
										transition={{ type: "spring", stiffness: 300, damping: 20 }}
									>
										<motion.span
											className="absolute inset-0 bg-linear-to-r from-[#D68025] to-[#D68029]"
											variants={{
												rest: { scaleX: 0, originX: 0.5 },
												hover: { scaleX: 1, originX: 0.5 },
											}}
											transition={{ duration: 0.4, ease: "easeInOut" }}
											style={{ transformOrigin: "center" }}
										/>
										<span className="relative z-10">Know More</span>
									</motion.button>
								</Link>
							</div>
						</div>
					))}
				</div>
			</section>
			{/* <ServicesContent /> */}
			<EngagementModels />
			<Reviews />
			<Testimonials />
		</>
	);
}

type ServiceItem = {
	icon?: React.ReactNode;
	imageSrc?: string;
	text: string;
};

type ServiceCardProps = {
	iconBg: string;
	iconSrc: string;
	title: string;
	items: ServiceItem[];
};

function ServiceCard({ iconSrc, title, items }: ServiceCardProps) {
	return (
		<div
			className="p-2  m-2  rounded-xl border-2 border-dashed border-gray-800 bg-white shadow-md 
                 flex flex-col justify-center h-100 w-65 sm:w-70 md:w-75 transform transition-transform duration-300 hover:scale-95"
		>
			<div
				className={`flex items-center justify-center w-20 h-20 rounded-full  mx-auto mb-4`}
			>
				<Image src={iconSrc} alt={title} width={80} height={80} unoptimized />
			</div>
			<h3
				className="text-lg sm:text-2
      
      xl font-bold mb-4 text-center"
			>
				{title}
			</h3>
			<ul className="text-gray-600 space-y-1.5 lg:space-y-3 text-left text-sm sm:text-base">
				{items.map((item, i) => (
					<li
						key={i}
						className="flex ml-8 gap-3 hover:text-black transition mt-6"
					>
						{item.icon && (
							<span className="text-gray-800 text-xl ">{item.icon}</span>
						)}
						{item.imageSrc && (
							<Image
								src={item.imageSrc}
								alt={item.text}
								width={20}
								height={20}
								unoptimized
							/>
						)}
						{item.text}
					</li>
				))}
			</ul>
		</div>
	);
}
