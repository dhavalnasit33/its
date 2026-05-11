"use client";
import { useEffect, useRef, useState } from "react";
import apiService from "@/lib/apiService";
import { motion } from "framer-motion";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Image from "next/image";
import NotFoundPage from "@/components/NotFoundPage";

interface Blog {
    _id: string;
    categories: string;
    subCategories?: string;
    slug: string;
    image: string;
    details: {
        title: string;
        description: string;
        author?: string;
    };
    seo_title?: string;
    meta_description?: string;
    seo_keyphrase?: string;
    cover_image?: string;
    createdAt: string; // Also good to have timestamps
}

interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        current: number;
        pages: number;
        total: number;
    };
}

export default function BlogPageClient() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const categoryRef = useRef<HTMLDivElement | null>(null);

    // 👇 Add these right after your other refs
    const navTypeRef = useRef<"reload" | "back_forward" | "navigate" | "unknown">(
        "unknown"
    );
    const restoredRef = useRef<boolean>(false);

    // ✅ Restore state if coming back from Blog Detail
    useEffect(() => {
        // 1) Detect navigation type
        let navType: "reload" | "back_forward" | "navigate" | "unknown" = "unknown";
        try {
            const navEntries = performance.getEntriesByType("navigation");
            if (navEntries.length) {
                navType = (navEntries[0] as PerformanceNavigationTiming).type as any;
            } else if ((performance as any).navigation) {
                const t = (performance as any).navigation.type;
                navType = t === 1 ? "reload" : t === 2 ? "back_forward" : "navigate";
            } else {
                navType = "navigate";
            }
        } catch {
            navType = "unknown";
        }
        navTypeRef.current = navType;

        // 2) Disable browser auto scroll restoration
        if ("scrollRestoration" in history)
            (history as any).scrollRestoration = "manual";

        // 3) Handle state based on navigation type
        const savedState = sessionStorage.getItem("blogListState");
        if (navType === "reload") {
            sessionStorage.removeItem("blogListState");
            window.scrollTo({ top: 0, behavior: "instant" });
        } else if (savedState) {
            try {
                const {
                    page: sPage,
                    category: sCategory,
                    scrollY,
                } = JSON.parse(savedState);
                setPage(sPage);
                setSelectedCategory(sCategory);
                restoredRef.current = true;
                setTimeout(
                    () => window.scrollTo({ top: scrollY, behavior: "instant" }),
                    100
                );
                sessionStorage.removeItem("blogListState");
            } catch {
                sessionStorage.removeItem("blogListState");
                window.scrollTo({ top: 0, behavior: "instant" });
            }
        } else {
            window.scrollTo({ top: 0, behavior: "instant" });
        }

        // 4) Handle bfcache restore
        const onPageShow = (e: PageTransitionEvent) => {
            if (e.persisted) {
                const saved = sessionStorage.getItem("blogListState");
                if (saved) {
                    try {
                        const {
                            page: sPage,
                            category: sCategory,
                            scrollY,
                        } = JSON.parse(saved);
                        setPage(sPage);
                        setSelectedCategory(sCategory);
                        restoredRef.current = true;
                        setTimeout(
                            () => window.scrollTo({ top: scrollY, behavior: "instant" }),
                            100
                        );
                        sessionStorage.removeItem("blogListState");
                    } catch {
                        sessionStorage.removeItem("blogListState");
                        window.scrollTo({ top: 0, behavior: "instant" });
                    }
                }
            }
        };
        window.addEventListener("pageshow", onPageShow);

        return () => {
            window.removeEventListener("pageshow", onPageShow);
            if ("scrollRestoration" in history)
                (history as any).scrollRestoration = "auto";
        };
    }, []);

    // ✅ Fetch Categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await apiService<{ success: boolean; data: string[] }>(
                    "/blogs/categories"
                );
                setCategories(["All", ...res.data]);
            } catch (error) {
                console.error("❌ Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // ✅ Fetch Blogs
    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const params: Record<string, any> = { page, limit: 12 };
                if (selectedCategory !== "All") {
                    params.category = selectedCategory;
                }

                const res = await apiService<PaginatedResponse<Blog>>("/blogs", {
                    params,
                });

                // ❌ Old behavior: window.scrollTo({ top: 0, behavior: "smooth" });
                // ✅ New behavior: scroll to categories section
                setTimeout(() => {
                    // Skip scroll when page was reloaded or restored from saved scroll
                    if (navTypeRef.current === "reload" || restoredRef.current) {
                        window.scrollTo({ top: 0, behavior: "instant" });
                    } else {
                        categoryRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    }
                }, 100);

                setBlogs(res.data);
                setTotalPages(res.pagination.pages);
            } catch (error) {
                console.error("❌ Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [page, selectedCategory]);

    const handleBlogClick = () => {
        sessionStorage.setItem(
            "blogListState",
            JSON.stringify({
                page,
                category: selectedCategory,
                scrollY: window.scrollY,
            })
        );
    };


    // ✅ Save state before navigating away
    // useEffect(() => {
    //     const saveState = () => {
    //         sessionStorage.setItem(
    //             "blogListState",
    //             JSON.stringify({
    //                 page,
    //                 category: selectedCategory,
    //                 scrollY: window.scrollY,
    //             })
    //         );
    //     };

    //     window.addEventListener("beforeunload", saveState);
    //     return () => {
    //         saveState();
    //         window.removeEventListener("beforeunload", saveState);
    //     };
    // }, [page, selectedCategory]);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        setPage(1);
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (!blogs) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <NotFoundPage />
            </div>
        )
    }

    // Skeleton Loader
    const BlogSkeleton = () => (
        <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
            <div className="bg-linear-to-r from-gray-200 to-gray-300 h-48 animate-pulse"></div>
            <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                    <div className="bg-gray-200 h-6 w-24 rounded-full animate-pulse"></div>
                </div>
                <div className="bg-gray-200 h-6 w-4/5 mb-3 rounded animate-pulse"></div>
                <div className="bg-gray-200 h-4 w-full mb-2 rounded animate-pulse"></div>
                <div className="bg-gray-200 h-4 w-5/6 mb-4 rounded animate-pulse"></div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="bg-gray-200 h-5 w-20 rounded animate-pulse"></div>
                    <div className="bg-gray-200 h-4 w-16 rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Hero Section */}
            <section data-cursor className="px-12.5 common_background_gradient blog_hero_section flex flex-col items-center justify-center gap-10 py-20 relative">
                <div className="flex w-full z-20">
                    <div className="flex mt-12.5 w-full">
                        <div className="flex p-2.5 flex-wrap w-full mx-auto justify-center items-center">
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="mb-5 w-full text-center"
                            >
                                <h1 className="text-center text-[46px]/[130%] text-black tracking-[1.2px] font-semibold">
                                    Exploring the{" "}
                                    <span className="text-[#d68029]">Inspire Techno Solution</span>{" "}
                                    <br />
                                    Tech Blog
                                </h1>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="w-full text-center text-black font-medium text-[18px]/[30px] flex justify-center mt-4"
                            >
                                <p className="text-[18px]/[32px] tracking-[0.02em] font-normal max-w-4/5">
                                    Empower yourself with the knowledge you need in the
                                    ever-changing tech landscape. Explore our diverse categories,
                                    engage with our content, and stay up-to-date by subscribing to
                                    our blog. Join us on this tech-savvy journey at
                                    <Link
                                        href="/"
                                        className="text-[#d68029] font-semibold underline mx-1"
                                    >
                                        Inspire Techno Solution
                                    </Link>
                                    Tech Blog.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blogs + Categories */}
            <section ref={categoryRef} className="px-4 md:px-8 lg:px-12 py-16 scroll-mt-24">
                <div className="w-full max-w-full lg:max-w-[80%] mx-auto">
                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => handleCategoryClick(category)}
                                className={`px-3.5 cursor-pointer py-2.5 rounded-e-xl rounded-t-xl text-[14px] font-semibold border transition-all duration-200 ${selectedCategory === category
                                    ? "bg-[#d68029] text-white border-[#d68029]"
                                    : "bg-[#ffd4a8] text-black border-[#ffd4a8] hover:bg-[#d68029] hover:text-white hover:border-[#d68029]"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Blogs */}
                    {loading ? (
                        <div className="grid max-[534px]:grid-cols-1 grid-cols-2 xl:grid-cols-3 max-[534px]:gap-4   gap-8">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <BlogSkeleton key={i} />
                            ))}
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                No blogs found in this category.
                            </p>
                        </div>
                    ) : (
                        <div className="grid max-[534px]:grid-cols-1 grid-cols-2 xl:grid-cols-3  max-[534px]:gap-4 gap-8">
                            {blogs.map((blog) => (
                                <div
                                    key={blog._id}
                                    className="flex flex-col overflow-hidden items-center justify-center rounded-md bg-white shadow-[0_0_12.2px_0_rgba(0,0,0,0.25)] scale-3d shadow-gray-200 transition-all duration-750 ease-in-out hover:scale-90 border border-gray-200"
                                >
                                    {
                                        blog.image ? (

                                            <Image
                                                src={blog.image}
                                                alt={blog.details.title}
                                                width={600}
                                                height={300}
                                                className="w-full h-auto "
                                            />
                                        ) : (
                                            <div className="w-full h-75 bg-gray-200 rounded-lg animate-pulse"></div>

                                        )
                                    }
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-2 mb-4">
                                            {blog.subCategories && (
                                                <span className="text-xs font-medium text-[#d68029] bg-[#fff4e9] px-3 py-1.5 rounded-full">
                                                    {blog.subCategories}
                                                </span>
                                            )}
                                            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                                                {blog.categories}
                                            </span>
                                        </div>
                                        <h2
                                            className="text-xl font-bold mb-3 line-clamp-2 text-gray-800"
                                            dangerouslySetInnerHTML={{
                                                __html: blog.details.title,
                                            }}
                                        />
                                        <p
                                            className="text-sm text-gray-600 line-clamp-3 [&_a]:no-underline [&_a]:text-gray-600 [&_a:hover]:text-[#d68029] [&_a:hover]:underline mb-4"
                                            dangerouslySetInnerHTML={{
                                                __html: blog.details.description,
                                            }}
                                        />
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <Link
                                                href={`/blog/${encodeURIComponent(blog.slug)}`}
                                                onClick={handleBlogClick}
                                                className="text-[#d68029] font-semibold text-sm flex items-center hover:underline"
                                            >
                                                Read More →
                                            </Link>
                                            <div className="text-xs text-gray-400">
                                                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && !loading && (
                        <Stack spacing={2} className="mt-16 flex items-center">
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                variant="outlined"
                                shape="rounded"
                                color="primary"
                                sx={{
                                    "& .MuiPaginationItem-root": {
                                        color: "#4B5563",
                                        "&.Mui-selected": {
                                            backgroundColor: "#d68029",
                                            color: "white",
                                            "&:hover": {
                                                backgroundColor: "#c27121",
                                            },
                                        },
                                        "&:hover": {
                                            backgroundColor: "#ffedd5",
                                        },
                                    },
                                }}
                            />
                        </Stack>
                    )}
                </div>
            </section>
        </>
    );
}
