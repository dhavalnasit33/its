// src/components/CareerList.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

// The data structure remains the same
const careerData = [
    {
        name: "Programming",
        children: [
            {
                name: "Mobile",
                children: [
                    { name: "Gaming", children: [{ name: "Unity", imageUrl: "/training/unity.svg" }] },
                    {
                        name: "Application",
                        children: [
                            { name: "Native", children: [{ name: "Android", imageUrl: "/training/android.svg" }, { name: "iOS", imageUrl: "/training/ios.svg" }] },
                            { name: "Hybrid", children: [{ name: "React Native", imageUrl: "/training/react.svg" }, { name: "Flutter", imageUrl: "/training/flutter.svg" }, { name: "Ionic", imageUrl: "/training/ionic.svg" }] },
                        ],
                    },
                ],
            },
            {
                name: "Web",
                children: [
                    { name: "Front End", children: [{ name: "HTML/CSS", imageUrl: "/training/html.svg" }, { name: "Java Script", imageUrl: "/training/javascript.svg" }, { name: "Angular", imageUrl: "/training/angular.svg" }, { name: "React JS", imageUrl: "/training/react.svg" }] },
                    { name: "Back End", children: [{ name: "PHP", imageUrl: "/training/php.svg" }, { name: "Python", imageUrl: "/training/python.svg" }, { name: "Node JS", imageUrl: "/training/node.svg" }] },
                    { name: "Server", children: [{ name: "Linux", imageUrl: "/training/linux.svg" }, { name: "AWS", imageUrl: "/training/aws.svg" }, { name: "CI/CD", imageUrl: "/training/cicd.svg" }, { name: "Networking", imageUrl: "/training/network.svg" }] },
                ],
            },
        ],
    },
    {
        name: "Non Programming",
        children: [
            { name: "UI/UX", children: [{ name: "Photoshop", imageUrl: "/training/photoshop.svg" }, { name: "Illustrator", imageUrl: "/training/illustrator.svg" }, { name: "Figma", imageUrl: "/training/figma.svg" }, { name: "Sketch", imageUrl: "/training/sketch.svg" }, { name: "XD", imageUrl: "/training/xd.svg" }] },
            { name: "SEO", children: [{ name: "Search Engine Optimization", imageUrl: "/training/seo.svg" }] },
        ],
    },
];

type TreeItemData = {
    name: string;
    imageUrl?: string;
    children?: TreeItemData[];
};

type TreeItemProps = {
    item: TreeItemData;
    isOpen: boolean;
    onToggle: () => void;
};

// A recursive component to render each level of the list
const TreeItem: React.FC<TreeItemProps> = ({ item, isOpen, onToggle }) => {
    const [openChildIndex, setOpenChildIndex] = useState<number | null>(null);
    const hasChildren = item.children && item.children.length > 0;

    // Handles clicks on children, ensuring only one is open at a time
    const handleChildToggle = (childIndex: number) => {
        setOpenChildIndex(prevIndex => (prevIndex === childIndex ? null : childIndex));
    };

    // Render a final technology item (no children)
    if (item.imageUrl) {
        return (
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                <Image src={item.imageUrl} alt={item.name} width={32} height={32} />
                <span className="font-semibold text-gray-800">{item.name}</span>
            </div>
        );
    }

    // Render a collapsible category
    return (
        <div className="rounded-lg overflow-hidden">
            <div
                onClick={onToggle}
                className={`p-4 font-bold cursor-pointer flex justify-between items-center transition-colors duration-300 ${isOpen ? 'bg-[#d68029] text-white' : 'bg-slate-800 text-white'
                    }`}
            >
                {item.name}
                {hasChildren && <span className={`text-xl transform transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>+</span>}
            </div>

            {/* Conditionally render children if this item is open */}
            {isOpen && hasChildren && (
                <div className="p-4 bg-gray-100 space-y-3">
                    {item.children?.map((child, index) => (
                        <TreeItem
                            key={index}
                            item={child}
                            isOpen={openChildIndex === index}
                            onToggle={() => handleChildToggle(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function CareerList() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        // If you click the same one that's open, it closes. Otherwise, it opens the new one.
        setOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <div className="space-y-4 px-4">
            {careerData.map((item, index) => (
                <TreeItem
                    key={index}
                    item={item}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                />
            ))}
        </div>
    );
}