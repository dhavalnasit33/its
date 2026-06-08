"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const colors = {
    Programming: "from-orange-400 to-amber-500",
    "Non Programming": "from-cyan-400 to-blue-500",
};

const careerData = [
    {
        name: "Programming",
        children: [
            {
                name: "Mobile",
                children: [
                    {
                        name: "Gaming",
                        children: [{ name: "Unity", imageUrl: "/training/unity.svg" }],
                    },
                    {
                        name: "Application",
                        children: [
                            {
                                name: "Native",
                                children: [
                                    { name: "Android", imageUrl: "/training/android.svg" },
                                    { name: "iOS", imageUrl: "/training/ios.svg" },
                                ],
                            },
                            {
                                name: "Hybrid",
                                children: [
                                    { name: "React Native", imageUrl: "/training/react.svg" },
                                    { name: "Flutter", imageUrl: "/training/flutter.svg" },
                                    { name: "Ionic", imageUrl: "/training/ionic.svg" },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                name: "Web",
                children: [
                    {
                        name: "Front End",
                        children: [
                            { name: "HTML/CSS", imageUrl: "/training/html.svg" },
                            { name: "Java Script", imageUrl: "/training/javascript.svg" },
                            { name: "Angular", imageUrl: "/training/angular.svg" },
                            { name: "React JS", imageUrl: "/training/react.svg" },
                        ],
                    },
                    {
                        name: "Back End",
                        children: [
                            { name: "PHP", imageUrl: "/training/php.svg" },
                            { name: "Python", imageUrl: "/training/python.svg" },
                            { name: "Node JS", imageUrl: "/training/node.svg" },
                        ],
                    },
                    {
                        name: "Server",
                        children: [
                            { name: "Linux", imageUrl: "/training/linux.svg" },
                            { name: "AWS", imageUrl: "/training/aws.svg" },
                            { name: "CI/CD", imageUrl: "/training/cicd.svg" },
                            { name: "Networking", imageUrl: "/training/network.svg" },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "Non Programming",
        children: [
            {
                name: "UI/UX",
                children: [
                    { name: "Photoshop", imageUrl: "/training/photoshop.svg" },
                    { name: "Illustrator", imageUrl: "/training/illustrator.svg" },
                    { name: "Figma", imageUrl: "/training/figma.svg" },
                    { name: "Sketch", imageUrl: "/training/sketch.svg" },
                    { name: "XD", imageUrl: "/training/xd.svg" },
                ],
            },
            {
                name: "SEO",
                children: [
                    {
                        name: "Search Engine Optimization",
                        imageUrl: "/training/seo.svg",
                    },
                ],
            },
        ],
    },
];

type DataItem = {
    name: string;
    imageUrl?: string;
    children?: DataItem[];
};

const TechChip = ({ item }: { item: DataItem }) => (
    <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        className="relative flex flex-col items-center gap-2 px-4 py-3 rounded-xl 
               bg-white border border-gray-200 shadow-sm 
               hover:shadow-md transition cursor-pointer"
    >
        {/* pastel ping dot */}
        <span className="absolute -top-2 -left-2 w-2.5 h-2.5 rounded-full bg-[#d68029] animate-ping"></span>
        {item.imageUrl && (
            <Image src={item.imageUrl} alt={item.name} width={34} height={34} />
        )}
        <span className="text-xs font-medium text-gray-800">{item.name}</span>
    </motion.div>
);

const SubCluster = ({ category }: { category: DataItem }) => {
    const hasChildren = category.children && category.children.length > 0;

    return (
        <div className="relative flex flex-col gap-4">
            {/* Path connector */}
            <div className="absolute left-1/2 -top-4 w-0.5 h-4 bg-gray-200"></div>

            <h3 className="text-center text-sm font-semibold text-gray-900 uppercase tracking-wide">
                {category.name}
            </h3>
            <div className="flex flex-wrap justify-center gap-4 relative">
                {hasChildren &&
                    category.children?.map((child, i) =>
                        child.imageUrl ? (
                            <TechChip key={i} item={child} />
                        ) : (
                            <SubCluster key={i} category={child} />
                        )
                    )}
            </div>
        </div>
    );
};

export default function CareerGrid() {
    return (
        <div className="relative min-h-screen w-full max-w-[90%] lg:max-w-[80%] mx-auto py-16 bg-white overflow-hidden text-gray-900">
            {/* floating pastel blobs */}

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                {careerData.map((mainCategory, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: index * 0.2 }}
                        className="relative p-8 rounded-2xl bg-white border border-gray-200 shadow-lg overflow-hidden"
                    >
                        {/* pastel blobs only inside card */}
                        <div className="absolute -top-10 -left-10 w-72 h-72 bg-orange-300/30 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-300/30 rounded-full blur-2xl"></div>

                        {/* card content */}
                        <h2 className="text-2xl font-bold text-center mb-10 relative z-10">
                            {mainCategory.name}
                        </h2>
                        <div className="flex flex-col gap-12 relative z-10">
                            {mainCategory.children.map((subCategory, i) => (
                                <SubCluster key={i} category={subCategory} />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
