
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// "use client";

// import Image from "next/image";
// import { AnimatePresence, easeInOut, motion } from "framer-motion";
// import { useCallback, useEffect, useRef, useState } from "react";
// import apiService from "@/lib/apiService";
// import Motion from "@/components/motionbar";
// import {
//     CreativeWork,
//     PaginatedResponse,
//     PortfolioContent,
//     SingleResponse,
// } from "@/types";
// import Link from "next/link";
// import Reviews from "@/components/home/Reviews";
// import Testimonials from "@/components/home/Testimonials";
// import NotFoundPage from "@/components/NotFoundPage";

// const categories = [
//     { label: "Show All", value: "All" },
//     { label: "Mobile App", value: "mobile-app" },
//     { label: "UI/UX", value: "ui-ux" },
//     { label: "Web Development", value: "web-development" },
// ];


// export default function PortfolioClient() {
//     const floatAnimation = {
//         initial: { x: 0 },
//         animate: { x: [10, -10, 10], y: [10, -10, 10] },
//         transition: {
//             duration: 3.5,
//             repeat: Infinity,
//             ease: easeInOut,
//             delay: 0.5,
//         },
//     };
//     const observerRef = useRef<IntersectionObserver | null>(null);
//     const loadMoreRef = useRef<HTMLDivElement | null>(null);

//     const [gettingProtfolioConetentData, setGettingProtfolioConetentData] =
//         useState(false);
//     const [portfolioContentData, setPortfolioContentData] =
//         useState<PortfolioContent | null>(null);

//     const [creativeWorkData, setCreativeWorkData] = useState<CreativeWork[]>([]);
//     const [selectedCategory, setSelectedCategory] = useState<string>("All");
//     const [page, setPage] = useState<number>(1);
//     const [totalPages, setTotalPages] = useState<number>(1);

//     const [initialLoading, setInitialLoading] = useState(false);
//     const [loadingMore, setLoadingMore] = useState(false);

//     const fetchPortfolioContent = useCallback(async () => {
//         setGettingProtfolioConetentData(true);
//         try {
//             const response = await apiService<SingleResponse<PortfolioContent>>(`/portfolio-content`);
//             if (response.success) {
//                 setPortfolioContentData(response.data || null);
//             } else {
//                 console.error(response.message);
//             }
//         } catch (error: any) {
//             console.error(error.message);
//         } finally {
//             setGettingProtfolioConetentData(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchPortfolioContent();
//     }, [fetchPortfolioContent]);

//     const fetchCreativeWorkData = useCallback(
//         async (reset = false) => {
//             if (reset) {
//                 setInitialLoading(true);
//             } else {
//                 setLoadingMore(true);
//             }

//             try {
//                 const params: Record<string, any> = { page, limit: 9 };
//                 if (selectedCategory !== "All") {
//                     params.category = selectedCategory;
//                 }
//                 const response = await apiService<PaginatedResponse<CreativeWork>>("/creative-work", { params });

//                 if (response.success) {
//                     setCreativeWorkData((prev) =>
//                         reset ? response.data : [...prev, ...response.data]
//                     );
//                     setTotalPages(response.pagination.pages);
//                 }
//             } catch (err) {
//                 console.error("Error fetching creative works:", err);
//             } finally {
//                 setInitialLoading(false);
//                 setLoadingMore(false);
//             }
//         },
//         [page, selectedCategory]
//     );

//     // ✅ DELETED the problematic useEffect block that was here.

//     // fetch when page/category changes
//     useEffect(() => {
//         // When category changes, page is reset to 1, triggering a fetch with reset=true
//         fetchCreativeWorkData(page === 1);
//     }, [page, selectedCategory, fetchCreativeWorkData]);

//     // IntersectionObserver for infinite scroll
//     useEffect(() => {
//         if (observerRef.current) observerRef.current.disconnect();

//         observerRef.current = new IntersectionObserver((entries) => {
//             if (
//                 entries[0].isIntersecting &&
//                 page < totalPages &&
//                 !loadingMore &&
//                 !initialLoading
//             ) {
//                 setPage((prev) => prev + 1);
//             }
//         });

//         if (loadMoreRef.current) {
//             observerRef.current.observe(loadMoreRef.current);
//         }

//         return () => {
//             if (observerRef.current) observerRef.current.disconnect();
//         };
//     }, [totalPages, page, loadingMore, initialLoading]);


//     const handleCategoryClick = (category: string) => {
//         if (selectedCategory === category) return; // Prevent re-fetch if category is the same
//         setSelectedCategory(category);
//         setPage(1); // This will trigger the useEffect to fetch new data
//     };

//     const CreativeWorkSkeleton = () => (
//         <div className="relative rounded-lg overflow-hidden shadow-md border border-gray-200">
//             {/* Image placeholder */}
//             <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
//             {/* Hover overlay mimic (bottom bar) */}
//             <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/20 animate-pulse"></div>
//         </div>
//     );

//     if (!portfolioContentData && !gettingProtfolioConetentData) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <NotFoundPage />
//             </div>
//         )
//     }

//     return (
//         <>
//             {/* HERO */}
//             {/* SECTION 1: ABOUT US HERO */}
//             <section className=" w-full flex flex-col-reverse xl:flex-row items-center justify-center px-4 sm:px-8 md:px-20 py-10 pb-20 gap-10 common_background_gradient">
//                 {/* Left Content */}
//                 <div className="w-full z-10 max-w-xl md:max-w-2xl text-gray-800">
//                     {/* Heading (top → bottom) */}
//                     <motion.div
//                         initial={{ opacity: 0, y: -40 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
//                         className="mb-5"
//                     >
//                         <h1 className="text-3xl sm:text-4xl md:text-[46px] leading-snug font-semibold">
//                             {portfolioContentData?.heroSection.title}
//                         </h1>
//                     </motion.div>
//                     {/* Paragraph (bottom → top) */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 40 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
//                         className="mb-6 w-full"
//                     >
//                         <p className="text-[#6f6f6f] text-base sm:text-lg md:text-[18px] font-medium leading-7 sm:leading-8">
//                             {portfolioContentData?.heroSection.description}
//                         </p>
//                     </motion.div>
//                     {/* Button (bottom → top) */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 40 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
//                     >
//                         <div className="bg-[#D68029] relative inline-flex items-center justify-center w-max overflow-hidden text-white rounded-xl group">
//                             <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#21203d] rounded group-hover:w-56 group-hover:h-56"></span>
//                             <a className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold">
//                                 <span className="flex flex-row gap-3 justify-center">
//                                     Let&apos;s Discuss
//                                 </span>
//                             </a>
//                         </div>
//                     </motion.div>
//                 </div>
//                 {/* Right Image and Stats */}
//                 <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-3xl">
//                     {/* Main Illustration */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 40 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8, delay: 0.6 }}
//                     >
//                         {portfolioContentData?.heroSection.image ? (
//                             <Image
//                                 src={portfolioContentData.heroSection.image}
//                                 alt="Isometric illustration"
//                                 width={594}
//                                 height={499}
//                                 className="w-full h-auto drop-shadow-lg"
//                             />
//                         ) : (
//                             <div className="w-full h-[300px] bg-gray-200 rounded-lg animate-pulse"></div>
//                         )}

//                     </motion.div>
//                     {/* Bubbles stay visible on ALL sizes; positions change per breakpoint */}
//                     {/* Top-left */}
//                     <motion.div
//                         {...floatAnimation}
//                         className="absolute z-10 pointer-events-none select-none
//         top-[14%] left-[2%] sm:top-[12%] sm:-left-0 md:top-[17%] md:left-[4%]
//         flex items-center gap-2 md:gap-3 bg-white/90 backdrop-blur-sm drop-shadow-lg rounded-2xl p-2 md:p-[15px] w-max md:w-56 lg:w-60 text-[13px] md:text-xl font-semibold text-gray-800"
//                     >
//                         {portfolioContentData?.heroSection.points[0]?.image ? (
//                             <Image
//                                 src={portfolioContentData.heroSection.points[0].image}
//                                 alt="Statistic icon"
//                                 width={40}
//                                 height={40}
//                                 className="w-10 h-10 object-contain mr-2"
//                             />
//                         ) : (
//                             <div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse mr-2"></div>
//                         )}

//                         <p className="flex flex-col leading-tight">
//                             {portfolioContentData?.heroSection.points[0].label.split(' ')[0]}
//                             <span className="text-[11px] sm:text-md md:text-lg lg:text-xl font-medium">
//                                 {portfolioContentData?.heroSection.points[0].label.split(' ').slice(1).join(' ')}
//                             </span>
//                         </p>
//                     </motion.div>

//                     {/* Top-right */}
//                     <motion.div
//                         {...floatAnimation}
//                         className="absolute z-10 pointer-events-none select-none
//         flex items-center gap-2 md:gap-3 bg-white/90 backdrop-blur-sm drop-shadow-lg rounded-2xl p-2 md:p-[15px] w-max md:w-56 lg:w-60 text-[13px] md:text-xl font-semibold text-gray-800
//         top-[19%] -right-[2%] sm:top-[16%] sm:right-[1%] md:top-[19%] md:-right-[11%]  mb-[20px]"
//                     >
//                         {portfolioContentData?.heroSection.points[1]?.image ? (
//                             <Image
//                                 src={portfolioContentData.heroSection.points[1].image}
//                                 alt="Statistic icon"
//                                 width={40}
//                                 height={40}
//                                 className="w-10 h-10 object-contain mr-2"
//                             />
//                         ) : (
//                             <div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse mr-2"></div>
//                         )}

//                         <p className="flex flex-col  leading-tight">
//                             {portfolioContentData?.heroSection.points[1].label.split(' ')[0]}
//                             <span className="text-[11px] sm:text-md md:text-lg lg:text-xl font-medium">
//                                 {portfolioContentData?.heroSection.points[1].label.split(' ').slice(1).join(' ')}
//                             </span>
//                         </p>
//                     </motion.div>

//                     {/* Bottom-left */}
//                     <motion.div
//                         {...floatAnimation}
//                         className="absolute z-10 pointer-events-none select-none
//         flex items-center gap-2 md:gap-3 bg-white/90 backdrop-blur-sm drop-shadow-lg rounded-2xl p-2 md:p-[15px] md:mb-[20px] w-max md:w-56 lg:w-60 text-[13px] md:text-xl font-semibold text-gray-800
//         bottom-[8%] left-0 sm:bottom-[12%] sm:-left-0 md:bottom-[0%] md:-left-[0%]"
//                     >
//                         {portfolioContentData?.heroSection.points[2]?.image ? (
//                             <Image
//                                 src={portfolioContentData.heroSection.points[2].image}
//                                 alt="Statistic icon"
//                                 width={60}
//                                 height={60}
//                                 className="w-10 h-10 object-contain mr-2"
//                             />
//                         ) : (
//                             <div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse mr-2"></div>
//                         )}

//                         <p className="flex flex-col   leading-tight">
//                             {portfolioContentData?.heroSection.points[2].label.split(' ')[0]}
//                             <span className="text-[11px] sm:text-md md:text-lg lg:text-xl font-medium">
//                                 {portfolioContentData?.heroSection.points[2].label.split(' ').slice(1).join(' ')}
//                             </span>
//                         </p>
//                     </motion.div>

//                     {/* Bottom-right */}
//                     <motion.div
//                         {...floatAnimation}
//                         className="absolute z-10 pointer-events-none select-none
//         flex items-center gap-2 md:gap-3 bg-white/90 backdrop-blur-sm drop-shadow-lg rounded-2xl p-2 md:p-4 w-max md:w-[250px] lg:w-[270px] text-[13px] md:text-xl font-semibold text-gray-800
//         bottom-[5%] right-[1%] sm:bottom-[11%] sm:-right-[1%] md:bottom-[0%] md:-right-0%]"
//                     >
//                         {portfolioContentData?.heroSection.points[3]?.image ? (
//                             <Image
//                                 src={portfolioContentData.heroSection.points[3].image}
//                                 alt="Statistic icon"
//                                 width={40}
//                                 height={40}
//                                 className="w-10 h-10 object-contain mr-2"
//                             />
//                         ) : (
//                             <div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse mr-2"></div>
//                         )}

//                         <p className="flex flex-col leading-tight">
//                             {portfolioContentData?.heroSection.points[3].label.split(' ')[0]}
//                             <span className="text-[11px] sm:text-md md:text-lg lg:text-xl font-medium">
//                                 {portfolioContentData?.heroSection.points[3].label.split(' ').slice(1).join(' ')}
//                             </span>
//                         </p>
//                     </motion.div>

//                 </div>
//             </section>


//             {/* CREATIVE WORK */}
//             <section className="w-full relative py-16">
//                 <div className="w-full max-w-[90%] lg:max-w-[80%] relative mx-auto">
//                     <div className="w-full flex flex-wrap p-2.5">

//                         <motion.div className="flex flex-col items-center w-full justify-center text-center mb-10"
//                             initial={{ opacity: 0, y: -60 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             viewport={{ once: true, amount: 0.3 }}
//                             transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
//                         >
//                             <h2 className="text-3xl sm:text-4xl md:text-[46px] font-semibold text-gray-900 relative">
//                                 All Creative Work
//                             </h2>
//                             <Motion />
//                         </motion.div>

//                         {/* Categories */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 60 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.6, ease: "easeOut" }}
//                         >
//                             <div className="flex flex-wrap justify-center gap-3 mb-12">
//                                 {categories.map((cat) => (
//                                     <div
//                                         key={cat.value}
//                                         onClick={() => handleCategoryClick(cat.value)}
//                                         className={`cursor-pointer px-[14px] text-[14px] md:text-[20px]  py-[10px]  font-semibold text-gray-900  
//                 hover:border-b-4 hover:rounded-b hover:border-b-[#d68029] hover:text-[#d68029] transition-all duration-200
//                ${selectedCategory === cat.value
//                                                 ? "border-b-4 border-b-[#d68029] rounded-b text-[#d68029]"
//                                                 : "border-b-4 border-transparent"
//                                             }`}
//                                     >
//                                         {cat.label}
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Grid */}
//                             {initialLoading ? (
//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                                     {Array.from({ length: 6 }).map((_, i) => (
//                                         <CreativeWorkSkeleton key={i} />
//                                     ))}
//                                 </div>
//                             ) : creativeWorkData.length === 0 ? (
//                                 <div className="text-center py-12">
//                                     <p className="text-gray-500 text-lg">No creative work found.</p>
//                                 </div>
//                             ) : (
//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 

//                                         {creativeWorkData.map((work) => (
//                                             <motion.div
//                                                 key={work._id}
//                                                 layout
//                                                 initial={{ opacity: 0, scale: 0.9 }}
//                                                 animate={{ opacity: 1, scale: 1 }}
//                                                 exit={{ opacity: 0, scale: 0.9 }}
//                                                 transition={{ duration: 0.3, ease: "easeInOut" }}
//                                             > 
//                                                 <Link
//                                                     key={work._id}
//                                                     href={work.url || "#"}
//                                                     target="_blank"
//                                                     className="relative group overflow-hidden rounded-lg shadow-md border border-gray-200"
//                                                 >
//                                                     {work.image ? (
//                                                         <Image
//                                                             src={work.image}
//                                                             alt={work.title}
//                                                             width={640}
//                                                             height={450}
//                                                             className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
//                                                         />
//                                                     ) : (
//                                                         <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
//                                                     )}
//                                                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                                                         <h3 className="text-white text-lg font-semibold text-center px-4">
//                                                             {work.title}
//                                                         </h3>
//                                                     </div>
//                                                 </Link>
//                                             </motion.div>
//                                         ))} 
//                                 </div>
//                             )}

//                             {/* Loading More Spinner */}
//                             {loadingMore && (
//                                 <div className="flex justify-center items-center py-6">
//                                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d68029]"></div>
//                                 </div>
//                             )}

//                             {/* Invisible div for observer */}
//                             <div ref={loadMoreRef} className="h-10"></div>
//                         </motion.div>
//                     </div>
//                 </div>
//             </section>

//             <Reviews />
//             <Testimonials />
//         </>
//     );
// }



"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useMediaQuery } from "@/hook/useMediaQuery";
import apiService from "@/lib/apiService";

// UI & Animation
// import Motion from "../motionbar";
import Motion from "@/components/motionbar";

import { PulseLoader } from "react-spinners";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import type { Swiper as SwiperCore } from "swiper";
import "swiper/css";

// --- Types (No changes) ---
type Testimonial = {
    _id: string;
    name: string;
    image: string;
    location: string;
    description: string;
    page?: number;
};

type Pagination = {
    current: number;
    pages: number;
    total: number;
};

type PaginatedResponse<T> = {
    success: boolean;
    data: T[];
    pagination: Pagination;
};

// --- Skeleton Component (No changes) ---
const TestimonialSkeleton = () => (
    <div className="relative w-full h-80 shrink-0 flex flex-col bg-white p-8 rounded-2xl shadow-lg border border-gray-100 animate-pulse">
        {/* Skeleton content... */}
    </div>
);

const Testimonials: React.FC = () => {
    // --- Configuration (No changes) ---
    const PAGE_SIZE = 10;
    const WINDOW_SIZE = 30;
    const TRIGGER_DISTANCE_END = 5;

    // --- State Management ---
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());

    const [isFetching, setIsFetching] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const [itemsPerPage, setItemsPerPage] = useState(3);
    const isMobile = useMediaQuery("(max-width: 767px)");
    const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

    useEffect(() => {
        if (isMobile) setItemsPerPage(1);
        else if (isTablet) setItemsPerPage(2);
        else setItemsPerPage(3);
    }, [isMobile, isTablet]);

    // --- Data Fetching Logic (No changes) ---
    const fetchPage = useCallback(async (pageToFetch: number) => {
        if (isFetching || loadedPages.has(pageToFetch)) return;
        if (pagination && (pageToFetch <= 0 || pageToFetch > pagination.pages)) return;

        setIsFetching(true);
        try {
            const response = await apiService<PaginatedResponse<Testimonial>>(
                "/testimonials",
                { params: { page: pageToFetch, limit: PAGE_SIZE } }
            );

            if (response.success && response.data.length > 0) {
                const newData = response.data.map(item => ({ ...item, page: pageToFetch }));

                setTestimonials(prev => {
                    const combined = [...prev, ...newData];

                    // Remove duplicates by _id
                    const unique = combined.filter(
                        (item, index, self) =>
                            index === self.findIndex((t) => t._id === item._id)
                    );

                    // Keep only latest WINDOW_SIZE testimonials
                    return unique.length > WINDOW_SIZE ? unique.slice(unique.length - WINDOW_SIZE) : unique;
                });

                setLoadedPages(prev => new Set(prev).add(pageToFetch));
                setPagination(response.pagination);
            }
        } catch (err) {
            console.error("Could not load testimonials.", err);
        } finally {
            setIsFetching(false);
            if (initialLoading) setInitialLoading(false);
        }
    }, [isFetching, loadedPages, pagination, initialLoading]);

    // --- Initial Load (No changes) ---
    useEffect(() => {
        fetchPage(1);
    }, []);

    const handleNext = () => swiperInstance?.slideNext();
    const handlePrev = () => swiperInstance?.slidePrev();

    // Check if there are more pages to fetch from the API
    const hasMorePages = pagination ? Math.max(...loadedPages) < pagination.pages : true;
    const canLoop = testimonials.length > itemsPerPage;
    return (
        <section className="py-20 bg-gray-50 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center pb-5 mb-2.5 w-full">
                    <h2 className="text-center w-full font-bold text-gray-800 tracking-tight text-3xl md:text-4xl">
                        Testimonials from our Clients
                    </h2>
                    <Motion />
                </div>

                <div className="py-5">
                    <Swiper
                        onSwiper={setSwiperInstance}
                        modules={[A11y]}
                        spaceBetween={32} // ✅ Added proper spacing
                        grabCursor={true}
                        slidesPerView={itemsPerPage}
                        loop={canLoop}
                        // ❌ Removed loop and centeredSlides
                        centeredSlides={!isMobile && !isTablet}
                        className="w-full" // ✅ Simplified className
                        onSlideChange={(swiper) => {
                            // ✅ FIX: This guard prevents the double-fetch on load
                            if (initialLoading || testimonials.length === 0) return;

                            // Update navigation button states
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);

                            // Trigger logic to fetch the next page
                            const isNearEnd = swiper.realIndex >= testimonials.length - TRIGGER_DISTANCE_END;
                            if (isNearEnd && hasMorePages && !isFetching) {
                                fetchPage(Math.max(...loadedPages) + 1);
                            }
                        }}
                    >
                        {initialLoading ? (
                            Array.from({ length: itemsPerPage }).map((_, i) => (
                                <SwiperSlide key={`skeleton-${i}`}><TestimonialSkeleton /></SwiperSlide>
                            ))
                        ) : (
                            testimonials.map((testimonial, index) => (
                                <SwiperSlide key={index} className="py-16">
                                    {({ isActive }) => (
                                        // ✅ MODIFICATION 2: Conditionally apply classes
                                        <div className={`
                                            relative bg-white p-8 rounded-2xl border border-gray-100 flex flex-col h-80 text-left
                                            transition-all duration-500 ease-in-out
                                            ${isActive ? 'lg:shadow-2xl shadow-lg lg:-translate-y-6' : 'shadow-lg lg:mt-6'}`
                                        }>
                                            <div className="absolute -top-10 right-6 text-white p-3">
                                                <Image src={"/home/testimonail-quote.png"} alt={"quote"} width={60} height={60} />
                                            </div>
                                            <div className="flex items-center gap-4 mb-5">
                                                {testimonial.image ?
                                                    <Image src={testimonial.image} alt={testimonial.name} width={64} height={64} className="w-16 h-16 rounded-full object-cover" /> :
                                                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">{testimonial.name.charAt(0)}</div>
                                                }
                                                <div>
                                                    <h4 className="font-semibold text-lg text-gray-900">{testimonial.name}</h4>
                                                    <span className="text-sm text-gray-500">{testimonial.location}</span>
                                                </div>
                                            </div>
                                            <div className="grow">
                                                <p className="text-gray-600 leading-relaxed break-all italic">“{testimonial.description}”</p>
                                            </div>
                                        </div>
                                    )}
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                </div>

                <div className="flex justify-center items-center gap-4">
                    {/* disabled={isBeginning  }*/}
                    <button onClick={handlePrev} className="p-3 rounded-lg shadow-md text-white cursor-pointer disabled:bg-gray-300 disabled:opacity-50 bg-linear-to-br from-[#d68029] to-[#ffc700] hover:scale-110 transition-transform duration-200">
                        <MdArrowBack size={24} />
                    </button>
                    <div className="w-16 h-10 flex items-center justify-center">
                        {isFetching && !initialLoading && <PulseLoader size={8} color={"#f89b29"} />}
                    </div>
                    {/*  disabled={isEnd && !hasMorePages} */}
                    <button onClick={handleNext} className="p-3 rounded-lg shadow-md text-white cursor-pointer disabled:bg-gray-300 disabled:opacity-50 bg-linear-to-br from-[#d68029] to-[#ffc700] hover:scale-110 transition-transform duration-200">
                        <MdArrowForward size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;