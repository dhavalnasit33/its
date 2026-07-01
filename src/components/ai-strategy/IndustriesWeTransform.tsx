"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/Section";
import Row from "@/components/Row";
import {
  LuMegaphone,
  LuBriefcase,
  LuGraduationCap,
  LuHeart,
  LuLandmark,
  LuBuilding,
  LuCar,
  LuRadioTower,
  LuTruck,
  LuShoppingCart,
  LuFactory,
  LuPlane,
  LuCpu,
} from "react-icons/lu";
import Motion from "../motionbar";

interface IndustryFeature {
  title: string;
  items: string[];
}

interface IndustryData {
  id: string;
  name: string;
  iconName: string;
  description: string;
  imageUrl?: string;
  features: IndustryFeature[];
}

const INDUSTRIES_DATA: IndustryData[] = [
  {
    id: "marketing",
    name: "Marketing and Advertising",
    iconName: "megaphone",
    description:
      "Supercharge your campaigns with AI-driven audience intelligence, hyper-personalization, and predictive performance analytics to maximize marketing ROI.",
    imageUrl: "/strategic/marketing.png",
    features: [
      {
        title: "Principal Advantages and Use Cases",
        items: [
          "AI-powered audience segmentation and customer profiling",
          "Personalized marketing campaigns across multiple channels",
          "Predictive analytics for customer behavior and sales forecasting",
          "Automated content creation for ads, emails, and social media",
        ],
      },
      {
        title: "Software Resources and Tools",
        items: [
          "CRM and customer data platforms (Salesforce, HubSpot)",
          "Marketing automation tools (Mailchimp, ActiveCampaign)",
          "Advertising platforms (Google Ads, Meta Ads Manager)",
          "Analytics and SEO tools (Google Analytics, SEMrush)",
        ],
      },
    ],
  },

  {
    id: "business",
    name: "Business Services",
    iconName: "briefcase",
    description:
      "Streamline enterprise workflows, automate back-office operations, and enable decision intelligence with custom AI automation.",
    imageUrl: "/strategic/business.png",
    features: [
      {
        title: "Principal Advantages and Applications",
        items: [
          "Automate repetitive business processes with AI",
          "Improve decision-making using predictive analytics",
          "Enhance customer support with intelligent virtual assistants",
          "Optimize financial planning and operational efficiency",
          "Reduce manual workload through workflow automation",
        ],
      },
      {
        title: "Software Resources and Tools",
        items: [
          "Enterprise Resource Planning (ERP) platforms",
          "Customer Relationship Management (CRM) software",
          "Robotic Process Automation (RPA) tools",
          "Business Intelligence and analytics platforms",
        ],
      },
    ],
  },

  {
    id: "education",
    name: "Education",
    iconName: "graduation",
    description:
      "Transform learning experiences with adaptive learning systems, smart assessment assistants, and automated student support services.",
    imageUrl: "/strategic/education.png",
    features: [
      {
        title: "Key Benefits and Use Cases",
        items: [
          "Deliver personalized learning experiences",
          "Provide AI-powered tutoring and student assistance",
          "Automate grading and performance evaluation",
          "Track student progress with learning analytics",
          "Generate engaging educational content automatically",
        ],
      },
      {
        title: "Software Tools and Solutions",
        items: [
          "Learning Management Systems (LMS)",
          "AI tutoring platforms",
          "Online assessment and proctoring software",
          "Educational content creation tools",
        ],
      },
    ],
  },

  {
    id: "healthcare",
    name: "Healthcare and Wellness",
    iconName: "heart",
    description:
      "Deploy AI solutions for diagnostic support, hospital resource allocation, and remote patient monitoring to elevate care quality.",
    imageUrl: "/strategic/healthcare.png",
    features: [
      {
        title: "Principal Advantages and Applications",
        items: [
          "Improve diagnostic accuracy with AI imaging",
          "Enable remote patient monitoring and telemedicine",
          "Predict diseases using healthcare analytics",
          "Automate clinical documentation and reporting",
          "Support personalized treatment recommendations",
        ],
      },
      {
        title: "Software Resources and Tools",
        items: [
          "Electronic Health Record (EHR) systems",
          "Telemedicine platforms",
          "Medical imaging AI software",
          "Healthcare analytics dashboards",
        ],
      },
    ],
  },

  {
    id: "fintech",
    name: "Fintech and Financial Services",
    iconName: "landmark",
    description:
      "Optimize financial operations with automated fraud detection, algorithmic risk modeling, and AI-powered robo-advisory engines.",
    imageUrl: "/strategic/fintech.png",
    features: [
      {
        title: "Key Advantages and Applications",
        items: [
          "Detect fraudulent transactions in real time",
          "Automate credit scoring and loan approvals",
          "Deliver AI-powered investment recommendations",
          "Improve financial risk assessment and compliance",
          "Provide personalized financial planning services",
        ],
      },
      {
        title: "Software Tools and Solutions",
        items: [
          "Digital banking platforms",
          "Fraud detection systems",
          "Investment and trading software",
          "Financial analytics platforms",
        ],
      },
    ],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    iconName: "building",
    description:
      "Incorporate machine learning to forecast property values, optimize building operations, and personalize property recommendations.",
    imageUrl: "/strategic/real-estate.png",
    features: [
      {
        title: "Key Benefits and Use Cases",
        items: [
          "AI-powered property valuation and pricing",
          "Personalized property recommendations",
          "Real estate market trend forecasting",
          "Automated lease and document management",
          "Investment opportunity analysis",
        ],
      },
      {
        title: "Software Tools and Solutions",
        items: [
          "Property Management Systems (PMS)",
          "Real Estate CRM platforms",
          "Property valuation software",
          "Virtual property tour solutions",
        ],
      },
    ],
  },

  {
    id: "automotive",
    name: "Automotive",
    iconName: "car",
    description:
      "Enhance vehicle safety, optimize manufacturing, and improve fleet management through AI-powered solutions.",
    imageUrl: "/strategic/automotive.png",
    features: [
      {
        title: "Key Benefits and Use Cases",
        items: [
          "Predictive vehicle maintenance",
          "AI-powered driver assistance systems",
          "Manufacturing quality inspection",
          "Fleet management optimization",
          "Electric vehicle battery monitoring",
        ],
      },
      {
        title: "Software Tools and Solutions",
        items: [
          "Vehicle telematics platforms",
          "Fleet management software",
          "Automotive diagnostic systems",
          "Manufacturing automation tools",
        ],
      },
    ],
  },

  {
    id: "telecom",
    name: "Telecom",
    iconName: "tower",
    description:
      "Improve network performance, automate customer support, and optimize operations using AI-driven technologies.",
    imageUrl: "/strategic/telecom.png",
    features: [
      {
        title: "Key Benefits and Use Cases",
        items: [
          "Predictive network maintenance",
          "AI-driven traffic optimization",
          "Customer churn prediction",
          "Automated customer support",
          "Network performance monitoring",
        ],
      },
      {
        title: "Software Tools and Solutions",
        items: [
          "OSS/BSS management systems",
          "AI customer service chatbots",
          "Network monitoring platforms",
          "Telecom analytics software",
        ],
      },
    ],
  },

  {
    id: "logistics",
    name: "Logistics & Supply Chain",
    iconName: "truck",
    description:
      "Optimize transportation, warehouse operations, and inventory management with AI-powered logistics solutions.",
    imageUrl: "/strategic/logistics.png",
    features: [
      {
        title: "Key Benefits and Use Cases",
        items: [
          "Smart route optimization",
          "Warehouse inventory forecasting",
          "Supply chain demand prediction",
          "Fleet performance monitoring",
          "Automated warehouse operations",
        ],
      },
      {
        title: "Software Tools and Solutions",
        items: [
          "Warehouse Management Systems (WMS)",
          "Transportation Management Systems (TMS)",
          "Fleet tracking platforms",
          "Supply chain analytics software",
        ],
      },
    ],
  },

  {
    id: "retail",
    name: "Retail and E-commerce",
    iconName: "cart",
    description:
      "Increase customer engagement and sales with AI-driven recommendations, pricing optimization, and shopping experiences.",
    imageUrl: "/strategic/retail.png",
    features: [
      {
        title: "Key Benefits and Use Cases",
        items: [
          "Personalized product recommendations",
          "Dynamic pricing optimization",
          "Customer behavior analysis",
          "Inventory demand forecasting",
          "AI-powered virtual shopping assistants",
        ],
      },
      {
        title: "Software Tools and Solutions",
        items: [
          "Shopify and WooCommerce AI plugins",
          "Point-of-Sale (POS) systems",
          "Inventory management software",
          "E-commerce analytics platforms",
        ],
      },
    ],
  },

  {
    id: "manufacturing",
    name: "Manufacturing",
    iconName: "factory",
    description:
      "Improve production efficiency, product quality, and factory automation with intelligent AI solutions.",
    imageUrl: "/strategic/manufacturing.png",
    features: [
      {
        title: "Principal Advantages and Applications",
        items: [
          "Predictive equipment maintenance",
          "Automated quality inspection",
          "Production planning optimization",
          "Supply chain performance monitoring",
          "Smart factory automation",
        ],
      },
      {
        title: "Software Resources and Tools",
        items: [
          "Manufacturing Execution Systems (MES)",
          "Industrial IoT monitoring platforms",
          "CAD/CAM design software",
          "Production analytics dashboards",
        ],
      },
    ],
  },

  {
    id: "travel",
    name: "Travel and Hospitality",
    iconName: "plane",
    description:
      "Deliver personalized travel experiences, automate bookings, and optimize hospitality services with AI.",
    imageUrl: "/strategic/travel.png",
    features: [
      {
        title: "Key Benefits and Use Cases",
        items: [
          "Personalized travel recommendations",
          "Dynamic pricing for flights and hotels",
          "AI-powered booking assistance",
          "Guest experience personalization",
          "Customer feedback analysis",
        ],
      },
      {
        title: "Software Tools and Solutions",
        items: [
          "Hotel Property Management Systems",
          "Online booking platforms",
          "Virtual concierge software",
          "Hospitality analytics tools",
        ],
      },
    ],
  },

  {
    id: "technology",
    name: "Technology",
    iconName: "cpu",
    description:
      "Accelerate software development, strengthen cybersecurity, and optimize cloud infrastructure with AI-powered technologies.",

    features: [
      {
        title: "Principal Advantages and Uses",
        items: [
          "AI-assisted software development",
          "Cloud infrastructure optimization",
          "Cybersecurity threat detection",
          "Automated system monitoring",
          "Intelligent DevOps automation",
        ],
      },
      {
        title: "Tools and Solutions",
        items: [
          "AI coding assistants",
          "Cloud monitoring platforms",
          "Cybersecurity management software",
          "DevOps automation tools",
        ],
      },
    ],
  },
];

function IndustryIcon({ name }: { name: string }) {
  const iconClass = "w-5 h-5 text-[#D68029]";
  switch (name) {
    case "megaphone":
      return <LuMegaphone className={iconClass} />;
    case "briefcase":
      return <LuBriefcase className={iconClass} />;
    case "graduation":
      return <LuGraduationCap className={iconClass} />;
    case "heart":
      return <LuHeart className={iconClass} />;
    case "landmark":
      return <LuLandmark className={iconClass} />;
    case "building":
      return <LuBuilding className={iconClass} />;
    case "car":
      return <LuCar className={iconClass} />;
    case "tower":
      return <LuRadioTower className={iconClass} />;
    case "truck":
      return <LuTruck className={iconClass} />;
    case "cart":
      return <LuShoppingCart className={iconClass} />;
    case "factory":
      return <LuFactory className={iconClass} />;
    case "plane":
      return <LuPlane className={iconClass} />;
    case "cpu":
      return <LuCpu className={iconClass} />;
    default:
      return <LuBriefcase className={iconClass} />;
  }
}

export default function IndustriesWeTransform() {
  const [selectedId, setSelectedId] = useState<string>("marketing");
  const selectedIndustry =
    INDUSTRIES_DATA.find((ind) => ind.id === selectedId) || INDUSTRIES_DATA[0];

  return (
    <Section className="bg-white py-16 lg:py-24">
      <Row>
        {/* Section Heading */}
        <div className="text-center mb-16 mx-auto">
          <h2 className="common-h2 text-center w-full text-black">
            Industries We Transform Through Strategic{" "}
            <span className="text-[#D68029]">AI Consulting</span>
          </h2>
          <Motion />
        </div>

        {/* Tab-Sidebar layout grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start w-full">
          {/* Left Column: Tab list */}
          <div className="w-full lg:w-[32%] flex overflow-x-auto lg:overflow-x-visible lg:flex-col gap-3 scrollbar-none shrink-0 border-b border-gray-100 lg:border-b-0">
            {INDUSTRIES_DATA.map((ind) => {
              const isSelected = ind.id === selectedId;
              return (
                <button
                  key={ind.id}
                  onClick={() => setSelectedId(ind.id)}
                  className={`relative flex items-center gap-4 cursor-pointer px-5 py-4 w-fit lg:w-full rounded-2xl border text-left font-semibold text-sm lg:text-[17px] transition-all duration-300 whitespace-nowrap 
                    lg:whitespace-normal shrink-0 hover:bg-white hover:border hover:border-[#D68029] hover:text-[#0d1b2a] group
                    ${
                      isSelected
                        ? "bg-white border-gray-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] text-[#0d1b2a]"
                        : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-50"
                    }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isSelected
                        ? "bg-[#D68029]/10 scale-105"
                        : "bg-white border border-gray-100 shadow-sm group-hover:scale-105"
                    }`}
                  >
                    <IndustryIcon name={ind.iconName} />
                  </div>
                  <span className="pr-4 lg:pr-0">{ind.name}</span>

                  {/* Selected orange vertical pill bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#D68029] rounded-l-full hidden lg:block"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Display details of selected industry */}
          <div className="w-full lg:w-[68%] min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full flex flex-col"
              >
                {/* 1. Main Industry Banner Image */}
                {selectedIndustry.imageUrl && (
                  <div className="w-full mb-8 rounded-2xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08)] border border-gray-100 bg-gray-50 flex justify-center">
                    <img
                      src={selectedIndustry.imageUrl}
                      alt={selectedIndustry.name}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )}

                {/* 2. Description Header */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-10">
                  <p className="text-[#0d1b2a] font-semibold text-lg leading-relaxed border-l-4 border-[#d68029] pl-5">
                    {selectedIndustry.description}
                  </p>
                </div>

                {/* 3. Sub-sections (Text only, grouped in cards for a clean look) */}
                <div className="space-y-6">
                  {selectedIndustry.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-6 shadow-[0_4px_15px_-2px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_4px_25px_-2px_rgba(0,0,0,0.06)] transition-shadow duration-300"
                    >
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d68029] to-[#f7b733] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                          {idx + 1}
                        </div>
                        <h4 className="text-xl md:text-2xl font-bold text-[#0d1b2a]">
                          {feature.title}
                        </h4>
                      </div>

                      <ul className="space-y-3 pl-1 md:pl-2">
                        {feature.items.map((item, bulletIdx) => (
                          <li
                            key={bulletIdx}
                            className="flex gap-3 items-start text-[#5a5a5a] text-[17px] leading-relaxed"
                          >
                            <span className="text-[#D68029] font-black select-none text-xl mt-0.5">
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Row>
    </Section>
  );
}
