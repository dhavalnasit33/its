// src/components/hire/HireTabs.tsx

"use client";

import { useState, useEffect } from 'react';
import apiService from '@/lib/apiService';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { dedicatedDeveloperSectionService, } from '@/types';

// You need to pass the hireData to this component
type HireTabsProps = {
    hireData: dedicatedDeveloperSectionService[]
};

export default function HireTabs({ hireData }: HireTabsProps) {
    // All the state and logic is now contained in this client component
    const [activeTab, setActiveTab] = useState(hireData[0].title);
    const activeData = hireData.find(tab => tab.title === activeTab);
    const [hireSlug, setHireSlug] = useState("hire");

    useEffect(() => {
        const fetchHireSlug = async () => {
            try {
                const res = await apiService<{ success: boolean; data: any }>(
                    "/seo-manager/navigation-structure"
                );
                if (res && res.success && res.data?.mainNav) {
                    const hireLink = res.data.mainNav.find(
                        (link: any) => link.systemIdentifier === "hire"
                    );
                    if (hireLink) {
                        setHireSlug(hireLink.slug);
                    }
                }
            } catch (err) {
                console.error("Error fetching hire slug in tabs:", err);
            }
        };
        fetchHireSlug();
    }, []);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex max-[480px]:flex-col w-full justify-center">
                {hireData.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(tab.title)}
                        className={`${activeTab === tab.title
                            ? "bg-[#d68029] text-white"
                            : "text-black hover:text-white hover:bg-[#d68029] hover:border-[#d68029]"
                            } relative py-4 px-2 cursor-pointer w-full md:px-6 border-b-2 border-gray-200 font-semibold text-lg md:text-xl transition-colors`}
                    >
                        {activeTab === tab.title && (
                            <motion.div
                                layoutId="active-hire-tab-indicator"
                                className="absolute -bottom-0.5  left-0 right-0 h-0.75 bg-[#d68029]"
                            />
                        )}
                        {tab.title}
                    </button>
                ))}
            </div>
            <div className="w-full mt-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        {activeData?.serviceItemBox.map((service) => (
                            <Link href={`/${hireSlug}/${service.hirepageId.slug}`} key={service.hirepageId.title}>
                                <div className="flex items-center gap-4 p-4 px-6 border border-gray-200 rounded shadow-sm hover:border-[#d68029] hover:shadow-md transition-all duration-300 cursor-pointer h-full">
                                    <Image
                                        src={service.image}
                                        alt={service.hirepageId.title}
                                        width={50}
                                        height={50}
                                        className="object-contain"
                                    />
                                    <span className="font-semibold text-gray-800 text-base md:text-lg ">
                                        {service.hirepageId.title}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}