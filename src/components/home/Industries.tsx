
"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ExpertiesIndustries, SingleResponse } from "@/types";
import apiService from "@/lib/apiService";
import Motion from "../motionbar";
import Row from "../Row";

const ROW_GRADIENTS = [
    ["from-rose-500", "to-orange-400"],
    ["from-violet-500", "to-purple-400"],
    ["from-amber-500", "to-yellow-400"],
    ["from-sky-500", "to-cyan-400"],
    ["from-orange-600", "to-amber-500"],
    ["from-teal-500", "to-emerald-400"],
    ["from-yellow-500", "to-lime-400"],
    ["from-indigo-500", "to-blue-400"],
    ["from-pink-500", "to-rose-400"],
    ["from-blue-500", "to-cyan-400"],
    ["from-slate-500", "to-gray-400"],
    ["from-rose-400", "to-pink-300"],
    ["from-orange-500", "to-red-400"],
    ["from-emerald-500", "to-teal-400"],
    ["from-red-600", "to-rose-500"],
    ["from-sky-400", "to-blue-300"],
    ["from-violet-400", "to-indigo-300"],
    ["from-lime-500", "to-green-400"],
    ["from-purple-500", "to-violet-400"],
    ["from-fuchsia-500", "to-pink-400"],
];

const GLOW_COLORS = [
    "rgba(244,63,94,0.3)",
    "rgba(139,92,246,0.3)",
    "rgba(245,158,11,0.3)",
    "rgba(14,165,233,0.3)",
    "rgba(234,88,12,0.3)",
    "rgba(20,184,166,0.3)",
    "rgba(234,179,8,0.3)",
    "rgba(99,102,241,0.3)",
    "rgba(236,72,153,0.3)",
    "rgba(59,130,246,0.3)",
    "rgba(100,116,139,0.3)",
    "rgba(251,113,133,0.3)",
    "rgba(249,115,22,0.3)",
    "rgba(16,185,129,0.3)",
    "rgba(220,38,38,0.3)",
    "rgba(56,189,248,0.3)",
    "rgba(167,139,250,0.3)",
    "rgba(132,204,22,0.3)",
    "rgba(168,85,247,0.3)",
    "rgba(217,70,239,0.3)",
];

const NAVBAR_HEIGHT = 80;

export default function Industries() {
    const [industriesData, setIndustriesData] = useState<ExpertiesIndustries[]>([]);
    const [loadingData, setLoadingData] = useState(false);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const [titleHeight, setTitleHeight] = useState(0);

    const fetchIndustries = useCallback(async () => {
        setLoadingData(true);
        try {
            const response = await apiService<SingleResponse<ExpertiesIndustries[]>>(
                "/expertise-industries"
            );
            if (response.success) {
                setIndustriesData(response.data || []);
            }
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoadingData(false);
        }
    }, []);

    useEffect(() => {
        fetchIndustries();
    }, [fetchIndustries]);

    useEffect(() => {
        if (!titleRef.current) return;
        const measure = () => {
            setTitleHeight(titleRef.current?.offsetHeight ?? 0);
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(titleRef.current);
        return () => ro.disconnect();
    }, []);

    const skeletonCount = 8;
    const displayData = loadingData
        ? Array.from({ length: skeletonCount })
        : industriesData;

    const rows: (ExpertiesIndustries | null)[][] = [];
    for (let i = 0; i < displayData.length; i += 4) {
        rows.push(displayData.slice(i, i + 4) as any);
    }

    const PEEK_PX = 8;
    const ROW_0_TOP = NAVBAR_HEIGHT + titleHeight;

    return (
        <section
            className="relative"
            style={{ 
                // background: "#060610",
                background: "#0d1b2a", overflow: "visible" }}
        >
            <div
                ref={titleRef}
                className="text-center w-full sticky !pt-16 md:!pt-22 lg:!pt-25  "
                style={{
                    top: `${NAVBAR_HEIGHT}px`,
                    zIndex: 999,
                    // background: "#060610",
                    background: "#0d1b2a",
                    paddingBottom: "50px",
                }}
            >   
                {/* <div className="w-full max-w-[90%] lg:max-w-[80%] relative mx-auto "> */}
                <Row >
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-300 mb-5">
                    Industries We Serve
                </span>
                <h2 className="common-h2 text-center w-full ">
                    <span className="text-white">Our Smart</span>{" "}
                    <span className="text-[#D68029]">Expertise Industries</span>
                </h2>
                <Motion />
                <p className="text-slate-200 text-base sm:text-lg md:text-xl mt-4 max-w-3xl mx-auto">
                    From early-stage startups to global enterprises - tailored digital
                    products across every major vertical.
                </p>
                </Row>
                {/* </div> */}
            </div>

            <div className="relative" >
                {rows.map((row, rowIndex) => {
                    const topValue = titleHeight > 0
                        ? ROW_0_TOP + rowIndex * PEEK_PX
                        : NAVBAR_HEIGHT + rowIndex * PEEK_PX;

                    const zIndex = 100 + rowIndex * 10;

                    const isFirst = rowIndex === 0;
                    const isLast = rowIndex === rows.length - 1;

                    return (
                        <div
                            key={rowIndex}
                            ref={(el) => { rowRefs.current[rowIndex] = el; }}
                            // className="sticky px-4"
                            className="sticky"
                            style={{
                                top: `${topValue}px`,
                                zIndex,
                                // background: "#060610",
                                background: "#0d1b2a",
                                boxShadow: isFirst
                                    ? "none"
                                    : "0 -16px 40px 8px rgba(0,0,0,0.3)",
                                borderRadius: isFirst ? "0" : "24px 24px 0 0",
                                paddingTop: isFirst ? "12px" : "12px",
                                // overflow: "visible",
                            }}
                        >
                            <div
                                // className="container max-w-7xl mx-auto"
                                className={`container w-full max-w-[90%] lg:max-w-[80%] 2xl:max-w-7xl mx-auto relative ${
                                    isLast ? "pb-20" : "pb-6"
                                }`}
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {row.map((item, colIndex) => {
                                        const globalIndex = rowIndex * 4 + colIndex;
                                        const gradients = ROW_GRADIENTS[globalIndex % ROW_GRADIENTS.length];
                                        const glowColor = GLOW_COLORS[globalIndex % GLOW_COLORS.length];

                                        if (loadingData) {
                                            return (
                                                <div
                                                    key={colIndex}
                                                    className="rounded-2xl border p-5 flex flex-col gap-3"
                                                    style={{
                                                        borderColor: "rgba(255,255,255,0.07)",
                                                        background: "rgba(255,255,255,0.03)",
                                                        minHeight: "180px",
                                                    }}
                                                >
                                                    <div className="w-12 h-12 rounded-xl bg-neutral-800 animate-pulse" />
                                                    <div className="w-32 h-4 rounded bg-neutral-800 animate-pulse mt-2" />
                                                    <div className="w-full h-3 rounded bg-neutral-800 animate-pulse" />
                                                    <div className="w-3/4 h-3 rounded bg-neutral-800 animate-pulse" />
                                                </div>
                                            );
                                        }

                                        const industry = item as ExpertiesIndustries;

                                        return (
                                            <div
                                                key={industry._id || colIndex}
                                                className="group relative rounded-2xl border border-white/[0.09] bg-white/[0.02] backdrop-blur-sm p-5 flex flex-col gap-3 overflow-hidden cursor-pointer"

                                                onMouseEnter={(e) => {
                                                    const el = e.currentTarget;

                                                    el.style.borderColor = "rgba(227,134,48,0.15)";
                                                    el.style.background = "rgba(255,255,255,0.06)";
                                                    el.style.boxShadow = `
                                                        0 20px 60px rgba(0,0,0,0.65),
                                                        0 0 22px ${glowColor},
                                                        0 0 80px rgba(255,255,255,0.05),
                                                        inset 0 1px 0 rgba(255,255,255,0.06)
                                                    `;

                                                    const glow = el.querySelector<HTMLElement>(".glow-blob");
                                                    if (glow) glow.style.opacity = "1";
                                                }}

                                                onMouseLeave={(e) => {
                                                    const el = e.currentTarget;
                                                    el.style.borderColor = "rgba(255,255,255,0.07)";
                                                    el.style.background = "rgba(255,255,255,0.03)";
                                                    el.style.boxShadow = `
                                                        0 10px 30px rgba(0,0,0,0.45),
                                                        0 0 0 1px rgba(255,255,255,0.04),
                                                        0 0 40px rgba(255,255,255,0.03),
                                                        inset 0 1px 0 rgba(255,255,255,0.04)
                                                    `;

                                                    const glow = el.querySelector<HTMLElement>(".glow-blob");
                                                    if (glow) glow.style.opacity = "0";
                                                }}
                                            >
                                                <div
                                                    className="glow-blob absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                                                    // className="glow-blob absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl pointer-events-none"
                                                    style={{
                                                        background: `radial-gradient(circle, ${glowColor} 0%, transparent 75%)`,
                                                        opacity: 0,
                                                        transition: "opacity 0.5s",
                                                    }}
                                                />

                                                <div
                                                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[0]} ${gradients[1]} flex-shrink-0 shadow-lg`}
                                                    style={{ transition: "transform 0.3s" }}
                                                    onMouseEnter={(e) => {
                                                        (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                                                    }}
                                                >
                                                    <Image
                                                        src={industry.image}
                                                        alt={industry.title}
                                                        width={34}
                                                        height={34}
                                                        className="object-contain"
                                                    />
                                                </div>

                                                <div>
                                                    <h4 className="text-sm sm:text-[15px] font-semibold text-white leading-snug mb-1">
                                                        {industry.title}
                                                    </h4>
                                                    <p
                                                        className="text-sm leading-relaxed text-[#cccccc]"
                                                        style={{
                                                            transition: "color 0.3s",
                                                        }}
                                                         dangerouslySetInnerHTML={{
                                                            __html: industry?.description || "",
                                                        }}
                                                        />
                                                        {/* {industry.description}
                                                    </p> */}
                                                </div>

                                                <div className="mt-auto pt-1">
                                                    <a href="#">
                                                        <span
                                                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#475569] group-hover:text-[#e38630]"
                                                        >
                                                            Explore
                                                            <svg
                                                                width="11"
                                                                height="11"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2.5"
                                                            >
                                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                                            </svg>
                                                        </span>
                                                    </a>

                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}










