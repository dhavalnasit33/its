"use client";
import Image from "next/image";
import { easeInOut, motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import apiService from "@/lib/apiService";
import Motion from "@/components/motionbar";
import {
    CreativeWork,
    PaginatedResponse,
    PortfolioCategory,
    PortfolioContent,
    SingleResponse,
} from "@/types";
import Link from "next/link";
import Reviews from "@/components/home/Reviews";
import Testimonials from "@/components/home/Testimonials";
import NotFoundPage from "@/components/NotFoundPage";
import Section from "@/components/Section";
import Row from "@/components/Row";
import Button from "@/components/Button";
import UnderConstructionPage from "@/components/UnderConstruction";
// const categories = [
//     { label: "Show All", value: "All" },
//     { label: "Mobile App", value: "mobile-app" },
//     { label: "UI/UX", value: "ui-ux" },
//     { label: "Web Development", value: "web-development" },
// ];
export default function PortfolioClient({
    initialData,
    initialCategories,
    initialWorks,
}: {
    initialData?: PortfolioContent | null;
    initialCategories?: PortfolioCategory[] | null;
    initialWorks?: PaginatedResponse<CreativeWork> | null;
}) {
    const floatAnimation = {
        initial: { x: 0 },
        animate: { x: [10, -10, 10], y: [10, -10, 10] },
        transition: {
            duration: 3.5,
            repeat: Infinity,
            ease: easeInOut,
            delay: 0.5,
        },
    };
    const [gettingProtfolioConetentData, setGettingProtfolioConetentData] = useState(!initialData);
    const [portfolioContentData, setPortfolioContentData] =
        useState<PortfolioContent | null>(initialData || null);
    const [creativeWorkData, setCreativeWorkData] = useState<CreativeWork[]>(initialWorks?.data || []);
    const [categories, setCategories] = useState<PortfolioCategory[]>(initialCategories || []);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(initialWorks?.pagination?.pages || 1);
    const [totalItems, setTotalItems] = useState<number>(initialWorks?.pagination?.total || 0);
    const [initialLoading, setInitialLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const fetchPortfolioContent = useCallback(async () => {
        setGettingProtfolioConetentData(true);
        try {
            const response = await apiService<SingleResponse<PortfolioContent>>(`/portfolio-content`);
            if (response.success) {
                setPortfolioContentData(response.data || null);
            } else {
                console.error(response.message);
            }
        } catch (error: any) {
            console.error(error.message);
        } finally {
            setGettingProtfolioConetentData(false);
        }
    }, []);

    const fetchCategories = async () => {
            try {
                const res = await apiService<SingleResponse<PortfolioCategory[]>>("/portfolio-category");

                if (res.success) {
                setCategories(res.data || null );
                }
            } catch (err) {
                console.error(err);
            }
        };
        useEffect(() => {
            if (initialCategories) {
                setCategories(initialCategories);
                return;
            }
            fetchCategories();
        }, [initialCategories]);
    useEffect(() => {
        if (initialData) {
            setPortfolioContentData(initialData);
            setGettingProtfolioConetentData(false);
            return;
        }
        fetchPortfolioContent();
    }, [fetchPortfolioContent, initialData]);
    const fetchCreativeWorkData = useCallback(
        async (reset = false) => {
            if (reset) {
                setInitialLoading(true);
            } else {
                setLoadingMore(true);
            }
            try {
                const currentPage = reset ? 1 : page;
                const params: Record<string, any> = { page: currentPage, limit: 12 };
                if (selectedCategory !== "All") {
                    params.category = selectedCategory;
                }

                const response = await apiService<PaginatedResponse<CreativeWork>>(
                    "/creative-work",
                    { params }
                );

                if (response.success) {
                    setCreativeWorkData((prev) =>
                        reset ? response.data : [...prev, ...response.data]
                    );
                    setTotalPages(response.pagination.pages);
                    setTotalItems(response.pagination.total);

                    // Background revalidation (Stale-While-Revalidate)
                    if (reset) {
                        apiService<PaginatedResponse<CreativeWork>>(
                            "/creative-work",
                            { params, bypassCacheRead: true }
                        ).then((freshResponse) => {
                            if (freshResponse.success) {
                                setCreativeWorkData((prev) => {
                                    const hasChanged = JSON.stringify(freshResponse.data) !== JSON.stringify(prev);
                                    return hasChanged ? freshResponse.data : prev;
                                });
                                setTotalPages(freshResponse.pagination.pages);
                                setTotalItems(freshResponse.pagination.total);
                            }
                        }).catch((err) => console.error("Background refresh error:", err));
                    }
                }
            } catch (err) {
                console.error("Error fetching creative works:", err);
            } finally {
                setInitialLoading(false);
                setLoadingMore(false);
            }
        },
        [page, selectedCategory]
    );
    useEffect(() => {
        setPage(1);
        fetchCreativeWorkData(true);
    }, [selectedCategory]);
    useEffect(() => {
        if (page === 1) return;
        fetchCreativeWorkData(false);
    }, [page]);
    const handleCategoryClick = (category: string) => {
        if (selectedCategory === category) return;
        setSelectedCategory(category);
    };
    const handleLoadMore = () => {
        if (page < totalPages && !loadingMore) {
            setPage((prev) => prev + 1);
        }
    };
    const CreativeWorkSkeleton = () => (
        <div className="relative rounded-lg overflow-hidden shadow-md border border-gray-200">
            <div className="w-full aspect-[640/450] bg-gray-200 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/20 animate-pulse"></div>
        </div>
    );
    if (gettingProtfolioConetentData) {
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
    if (!portfolioContentData) {
        return (
            // <div className="min-h-screen flex items-center justify-center">
            //     <NotFoundPage />
            // </div>
            <UnderConstructionPage />
        );
    }
    const hasMore = page < totalPages;
    const showing = creativeWorkData.length;

    return (
        <>
            <Section className="w-full flex flex-col-reverse xl:flex-row items-center justify-center px-6 sm:px-8 md:px-20  pb-20 gap-10 common_background_gradient">
                <div className="w-full z-10 max-w-[100%] lg:max-w-[90%] xl:max-w-xl text-gray-800">
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="mb-5"
                    >
                        <h1 className="text-4xl md:text-[42px] lg:text-[46px]/[130%] leading-snug font-semibold">
                            {portfolioContentData?.heroSection.title}
                        </h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        className="mb-6 w-full"
                    >
                        <p className="text-[#6f6f6f] text-base sm:text-lg md:text-[18px] font-medium leading-7 sm:leading-8">
                            {portfolioContentData?.heroSection.description}
                        </p>
                    </motion.div>
                    {/* <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                    >
                        <div className="bg-[#D68029] relative inline-flex items-center justify-center w-max overflow-hidden text-white rounded-xl group">
                            <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#21203d] rounded group-hover:w-56 group-hover:h-56"></span>
                            <Link href="/contact" className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold">
                                <span className="flex flex-row gap-3 justify-center">
                                    Let&apos;s Discuss
                                </span>
                            </Link>
                        </div>
                    </motion.div> */}
                     {/* <motion.div 
                       initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                        className="relative  inline-flex items-center justify-center overflow-hidden gap-2 rounded-xl bg-[#D68029]   font-semibold text-white transition-colors group" >
                                <span className="absolute w-0 h-0 transition-all duration-750 delay-300 ease-in-out bg-[#0d1b2a] rounded group-hover:w-56 group-hover:h-56"></span>
                                <a
                                    href="/contact"
                                    className="relative tracking-tight rounded-[10px] text-sm sm:text-base font-semibold px-6 py-3 sm:px-8 sm:py-4 text-white transition-colors ">
                                <span className="flex flex-row gap-3 justify-center">
                                    Let&apos;s Discuss
                                </span>
                                </a>
                            </motion.div> */}
                            <Button
                                motionProps={{
                                    initial: { opacity: 0, y: 40 },
                                    animate:{ opacity: 1, y: 0 },
                                    transition:{ duration: 0.8, ease: "easeOut", delay: 0.6 }
                                }}
                                bgColor="#D68029"
                                hoverColor="#0d1b2a"
                                text="Let&apos;s Discuss"
                                href="/contact"
                            />
                </div>
                <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        {portfolioContentData?.heroSection.image ? (
                            <Image
                                src={portfolioContentData.heroSection.image}
                                alt="Isometric illustration"
                                width={594}
                                height={499}
                                className="w-full h-auto drop-shadow-lg"
                            />
                        ) : (
                            <div className="w-full h-75 bg-gray-200 rounded-lg animate-pulse"></div>
                        )}
                    </motion.div>
                    {portfolioContentData?.heroSection.points.map((point, index) => {
                        const positions = [
                            "top-[8%] left-[2%] sm:top-[12%] sm:-left-0 md:top-[17%] md:left-[4%]",
                            "top-[12%] -right-[2%] sm:top-[16%] sm:right-[1%] md:top-[19%] md:-right-[11%]",
                            "bottom-[8%] left-0 sm:bottom-[12%] sm:-left-0 md:bottom-[0%] md:-left-[0%]",
                            "bottom-[5%] right-[1%] sm:bottom-[11%] sm:-right-[1%] md:bottom-[0%] md:-right-0%]"
                        ];
                        return (
                            <motion.div
                                key={index}
                                {...floatAnimation}
                                className={`absolute z-10 pointer-events-none select-none flex items-center gap-2 md:gap-3 bg-white/90 backdrop-blur-sm drop-shadow-lg rounded-2xl p-2 md:p-3.75 w-max text-[13px] md:text-xl font-semibold text-gray-800 ${positions[index]}`}
                            >
                                {point.image ? (
                                    <Image
                                        src={point.image}
                                        alt="Statistic icon"
                                        width={40}
                                        height={40}
                                        className="w-8 sm:w-10 h-8 sm:h-10 object-contain sm:mr-2"
                                    />
                                ) : (
                                    <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-200 rounded-md animate-pulse sm:mr-2"></div>
                                )}
                                <p className="flex flex-col leading-tight">
                                    {point.label.split(' ')[0]}
                                    <span className="text-[11px] sm:text-md md:text-lg lg:text-xl font-medium">
                                        {point.label.split(' ').slice(1).join(' ')}
                                    </span>
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </Section>
            <Section >
                {/* <div className="w-full max-w-[90%] lg:max-w-[80%] relative mx-auto"> */}
                <Row>
                    <div className="w-full flex flex-wrap">
                        <motion.div
                            className="flex flex-col items-center w-full justify-center text-center mb-10"
                            initial={{ opacity: 0, y: -60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                        >
                            <h2 className="common-h2  text-gray-900 relative">
                                All Creative Work
                            </h2>
                            <Motion />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="w-full"
                        >
                            <div className="flex flex-wrap justify-center gap-3 mb-12">
                                {/* {categories.map((cat) => (
                                    <div
                                        key={cat.value}
                                        onClick={() => handleCategoryClick(cat.value)}
                                        className={`cursor-pointer px-3.5 text-[14px] md:text-[20px] py-2.5 font-semibold text-gray-900  
                                            hover:border-b-4 hover:rounded-b hover:border-b-[#d68029] hover:text-[#d68029] transition-all duration-200
                                            ${selectedCategory === cat.value
                                                ? "border-b-4 border-b-[#d68029] rounded-b text-[#d68029]"
                                                : "border-b-4 border-transparent"
                                            }`}
                                    >
                                        {cat.label}
                                    </div>
                                ))} */}
                                <button
                                    onClick={() => setSelectedCategory("All")}
                                    className={`cursor-pointer px-3.5 text-[14px] md:text-[20px] py-2.5 font-semibold text-gray-900  
                                                hover:border-b-4 hover:rounded-b hover:border-b-[#d68029] hover:text-[#d68029] transition-all duration-200
                                    ${selectedCategory === "All"
                                        ? "border-b-4 border-b-[#d68029] rounded-b text-[#d68029]"
                                        : "border-b-4 border-transparent"
                                    }`}
                                >
                                    All
                                </button>
                                {categories.map((cat) => (
                                    <button
                                    key={cat._id}
                                    onClick={() => handleCategoryClick(cat._id)}
                                    className={`cursor-pointer px-3.5 text-[14px] md:text-[20px] py-2.5 font-semibold text-gray-900  
                                        hover:border-b-4 hover:rounded-b hover:border-b-[#d68029] hover:text-[#d68029] transition-all duration-200
                                        ${
                                        selectedCategory === cat._id
                                            ? "border-b-4 border-b-[#d68029] rounded-b text-[#d68029]"
                                            : "border-b-4 border-transparent"
                                        }`}
                                    >
                                    {cat.category}
                                    </button>
                                ))}
                            </div>

                            {initialLoading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {Array.from({ length: 9 }).map((_, i) => (
                                        <CreativeWorkSkeleton key={i} />
                                    ))}
                                </div>
                            ) : creativeWorkData.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">No creative work found for this category.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <AnimatePresence>
                                        {creativeWorkData.map((work, index) => {
                                            const hasUrl = !!work.url?.trim();
                                            return(
                                            <motion.div
                                                key={`${work._id ?? index}-${selectedCategory}`}
                                                layout
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <Link
                                                    // href={work.url || "#"}
                                                    // target="_blank"
                                                      href={hasUrl ? work.url : "#"}
                                                        target={hasUrl ? "_blank" : undefined}
                                                        onClick={(e) => {
                                                        if (!hasUrl) e.preventDefault();
                                                        }}
                                                        className={`relative block group overflow-hidden rounded-lg shadow-md border border-gray-200 ${
                                                        !hasUrl ? "cursor-pointer" : ""
                                                        }`}
                                                    // className="relative block group overflow-hidden rounded-lg shadow-md border border-gray-200"
                                                >
                                                    {work.image ? (
                                                        <Image
                                                            src={work.image}
                                                            alt={work.title}
                                                            width={640}
                                                            height={450}
                                                            className="w-full aspect-[640/450] object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                    ) : (
                                                        <div className="w-full aspect-[640/450] bg-gray-200"></div>
                                                    )}
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                        <h3 className="text-white text-lg font-semibold text-center px-4">
                                                            {work.title}
                                                        </h3>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>
                                </div>
                            )}
                            {!initialLoading && creativeWorkData.length > 0 && (
                                <div className="flex flex-col items-center gap-4 mt-12">
                                    {hasMore && (
                                        // <button
                                        //     onClick={handleLoadMore}
                                        //     disabled={loadingMore}
                                        //     className="mt-2 inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-[#d68029] hover:bg-[#c07020] active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                        // >
                                        //     {loadingMore ? (
                                        //         <>
                                        //             <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                        //             Loading...
                                        //         </>
                                        //     ) : (
                                        //         "Load More"
                                        //     )}
                                        // </button>
                                        <button
                                            onClick={handleLoadMore}
                                            disabled={loadingMore}
                                            className=" relative inline-flex items-center justify-center overflow-hidden
                                                gap-2 rounded-md font-semibold text-white bg-[#D68029] group disabled:opacity-60 disabled:cursor-not-allowed "
                                        >
                                        <span className=" absolute w-0 h-0 rounded bg-[#0d1b2a] transition-all duration-750 delay-300 ease-in-out group-hover:w-56 group-hover:h-56 " />
                                        <span className="relative tracking-tight rounded-md text-sm sm:text-base font-semibold px-8 py-3 text-white transition-colors ">
                                            {loadingMore ? (
                                            <>
                                                <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-md animate-spin" />
                                                Loading...
                                            </>
                                            ) : (
                                            "Load More"
                                            )}
                                        </span>
                                        </button>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </Row>
                {/* </div> */}
            </Section>
            <Reviews />
            <Testimonials />
        </>
    );
}