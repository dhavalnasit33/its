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
  LuCpu
} from "react-icons/lu";

interface IndustryFeature {
  title: string;
  items: string[];
}

interface IndustryData {
  id: string;
  name: string;
  iconName: string;
  description: string;
  features: IndustryFeature[];
}

const INDUSTRIES_DATA: IndustryData[] = [
  {
    id: "marketing",
    name: "Marketing and Advertising",
    iconName: "megaphone",
    description: "Supercharge your campaigns with AI-driven audience intelligence, hyper-personalization, and predictive performance analytics to maximize marketing ROI.",
    features: [
      {
        title: "Principal Advantages and Use Cases",
        items: [
          "Data-driven audience segmentation and profiling",
          "Automated hyper-personalization of ad creatives at scale",
          "Real-time campaign bidding and placement optimization",
          "Predictive customer lifetime value (LTV) forecasting",
          "Advanced sentiment analysis across social channels"
        ]
      },
      {
        title: "Software Resources and Tools",
        items: [
          "AI-powered CRM integrations",
          "Marketing automation and email platforms",
          "Programmatic advertising platforms (Meta & Google Ads)",
          "Predictive SEO and intent-mapping tools",
          "Multi-touch attribution analytics dashboards"
        ]
      },
      {
        title: "Future Prospects",
        items: [
          "Generative AI autonomous copywriters and video creators",
          "Synthetic consumer persona modeling and simulation",
          "Immersive spatial AR/VR interactive ads",
          "Zero-party data predictive targeting engines",
          "Conversational voice-activated advertising"
        ]
      }
    ]
  },
  {
    id: "business",
    name: "Business Services",
    iconName: "briefcase",
    description: "Streamline enterprise workflows, automate back-office operations, and enable decision intelligence with custom AI automation.",
    features: [
      {
        title: "Principal Advantages and Applications",
        items: [
          "Cognitive process automation to cut operational overhead",
          "Intelligent document parsing and auto-accounting",
          "Predictive HR hiring models and payroll analytics",
          "Compliance audits powered by NLP text processing",
          "Strategic IT cloud infrastructure utilization modeling"
        ]
      },
      {
        title: "Software Resources and Tools",
        items: [
          "Enterprise resource planning (ERP) AI plugins",
          "Intelligent HRMS and recruitment portals",
          "Workflow automation and RPA tools",
          "Predictive business intelligence (BI) systems"
        ]
      },
      {
        title: "Future Prospects",
        items: [
          "Autonomous digital workforce agents (AI Employees)",
          "Self-optimizing corporate operational frameworks",
          "Predictive macro-economic strategy simulators",
          "Fully automated enterprise resource scheduling"
        ]
      }
    ]
  },
  {
    id: "education",
    name: "Education",
    iconName: "graduation",
    description: "Transform learning experiences with adaptive learning systems, smart assessment assistants, and automated student support services.",
    features: [
      {
        title: "Key Benefits and Use Cases",
        items: [
          "Adaptive and customized learning paths for students",
          "Intelligent tutoring bots with 24/7 concept support",
          "Automated grading and targeted study feedback",
          "Student retention risk modeling and predictive alerts"
        ]
      },
      {
        title: "Software Tools and Solutions",
        items: [
          "AI-integrated Learning Management Systems (LMS)",
          "Natural language student support chatbots",
          "Identity verification and smart proctoring tools",
          "Interactive EdTech web & mobile applications"
        ]
      },
      {
        title: "Future Possibilities",
        items: [
          "AI-driven immersive classrooms using VR/AR",
          "Personalized virtual research companion agents",
          "Dynamic, real-time curriculum adjustment engines",
          "Non-intrusive focus and engagement analytical tools"
        ]
      }
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare and Wellness",
    iconName: "heart",
    description: "Deploy AI solutions for diagnostic support, hospital resource allocation, and remote patient monitoring to elevate care quality.",
    features: [
      {
        title: "Principal Advantages and Applications",
        items: [
          "Computer vision assistants for diagnostic imaging",
          "Telemetry analysis for remote patient monitoring",
          "Automated transcription for clinical documentation",
          "Resource forecasting for hospital bed management",
          "Personalized nutrition and physical therapy modeling"
        ]
      },
      {
        title: "Solutions and Software Tools",
        items: [
          "AI-enhanced EHR/EMR platforms",
          "Telehealth portals with built-in preliminary triage bots",
          "Image analysis pipelines (MRI/CT scans)",
          "Wearable wellness sensor synchronization hubs"
        ]
      },
      {
        title: "Future Prospects",
        items: [
          "Early-stage oncology and genomic pattern warning networks",
          "AI-guided micro-surgical robotic systems",
          "Fully custom-designed precision medicine formulas",
          "Prescriptive digital therapeutics platforms"
        ]
      }
    ]
  },
  {
    id: "fintech",
    name: "Fintech and Financial Services",
    iconName: "landmark",
    description: "Optimize financial operations with automated fraud detection, algorithmic risk modeling, and AI-powered robo-advisory engines.",
    features: [
      {
        title: "Key Advantages and Applications",
        items: [
          "Automated fraud monitoring and instant prevention",
          "AI credit underwriting for rapid lending decisions",
          "Robo-advisory and automated investment management",
          "Compliance mapping for financial regulations"
        ]
      },
      {
        title: "Software Tools and Solutions",
        items: [
          "Secure mobile banking frameworks",
          "Smart gateway payment routing",
          "Anomalous transaction detection engines",
          "Trading recommendation algorithms"
        ]
      },
      {
        title: "Future Prospects",
        items: [
          "Fully self-correcting financial portfolios",
          "Autonomous, risk-optimized micro-lending networks",
          "Biometric continuous identity verification",
          "Open banking conversational advisors"
        ]
      }
    ]
  },
  {
    id: "real-estate",
    name: "Real Estate",
    iconName: "building",
    description: "Incorporate machine learning to forecast property values, optimize building energy consumption, and personalize property match recommendations.",
    features: [
      {
        title: "Key Benefits and Use Cases",
        items: [
          "Intelligent Property Valuation (Automated Valuation Models)",
          "High-ROI commercial investment location scoring",
          "Smart lease abstraction and document management"
        ]
      },
      {
        title: "Software Tools and Solutions",
        items: [
          "AI-driven Property Management Systems (PMS)",
          "Intelligent PropTech CRM systems",
          "Energy usage optimization dashboards"
        ]
      },
      {
        title: "Future Possibilities",
        items: [
          "AI agent-led immersive virtual house showings",
          "Self-executing blockchain smart lease systems",
          "Climate change and demographic demand forecasting"
        ]
      }
    ]
  },
  {
    id: "automotive",
    name: "Automotive",
    iconName: "car",
    description: "Enhance safety systems, streamline factory assembly, and implement predictive vehicle maintenance through AI integrations.",
    features: [
      {
        title: "Key Benefits and Use Cases",
        items: [
          "Sensor fusion and computer vision for ADAS systems",
          "Telemetry-driven predictive vehicle breakdown warnings",
          "Production-line quality inspection using computer vision",
          "Dynamic EV battery management and routing optimization"
        ]
      },
      {
        title: "Software Tools and Solutions",
        items: [
          "Connected vehicle telematics portals",
          "Embedded firmware analytics",
          "AI fleet dispatch and navigation platforms"
        ]
      },
      {
        title: "Future Possibilities",
        items: [
          "Level 4 & 5 fully autonomous vehicle operations",
          "Smart city V2X (Vehicle-to-Everything) traffic grids",
          "Self-healing vehicle telemetry diagnostics"
        ]
      }
    ]
  },
  {
    id: "telecom",
    name: "Telecom",
    iconName: "tower",
    description: "Boost network efficiency, reduce downtime, and automate customer support using predictive network optimization algorithms.",
    features: [
      {
        title: "Key Benefits and Use Cases",
        items: [
          "Predictive maintenance for cell towers and fiber networks",
          "Automated network traffic congestion rerouting",
          "AI-driven customer subscription churn predictions"
        ]
      },
      {
        title: "Software Tools and Solutions",
        items: [
          "AI-enabled OSS/BSS monitoring tools",
          "Conversational customer care assistants",
          "Network capacity optimization software"
        ]
      },
      {
        title: "Future Possibilities",
        items: [
          "Self-healing autonomous networks powered by AI",
          "Dynamic 6G slicing allocation engines",
          "Smart edge computing device coordination"
        ]
      }
    ]
  },
  {
    id: "logistics",
    name: "Logistics & Supply Chain",
    iconName: "truck",
    description: "Optimize transit routes, predict warehouse demands, and minimize operational overheads with intelligent supply chain networks.",
    features: [
      {
        title: "Key Benefits and Use Cases",
        items: [
          "Real-time delivery route optimization algorithms",
          "High-precision warehouse demand planning",
          "Supplier reliability assessment modeling",
          "Automated container packing optimizations"
        ]
      },
      {
        title: "Software Tools and Solutions",
        items: [
          "AI-enhanced Warehouse Management Systems (WMS)",
          "Dispatch routing and tracking dashboards",
          "Predictive stock-level warning systems"
        ]
      },
      {
        title: "Future Possibilities",
        items: [
          "Fully autonomous distribution warehouses",
          "Decentralized ledger blockchain tracking pipelines",
          "Predictive weather and transit risk modeling"
        ]
      }
    ]
  },
  {
    id: "retail",
    name: "Retail and E-commerce",
    iconName: "cart",
    description: "Deploy AI recommendation engines, dynamic price optimization, and conversational virtual shoppers to drive higher conversion rates.",
    features: [
      {
        title: "Key Benefits and Use Cases",
        items: [
          "Algorithmic dynamic pricing optimization",
          "Hyper-personalized cross-sell recommendation engines",
          "Visual search and visual matching tools",
          "Inventory stocking level demand models"
        ]
      },
      {
        title: "Software Tools and Solutions",
        items: [
          "AI plugins for Shopify, Magento, and WooCommerce",
          "Intelligent point-of-sale (POS) systems",
          "Visual query search engine frameworks"
        ]
      },
      {
        title: "Future Possibilities",
        items: [
          "Immersive VR stores with virtual sales assistants",
          "Predictive auto-replenishment shopping models",
          "Autonomous micro-drone delivery networks"
        ]
      }
    ]
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    iconName: "factory",
    description: "Achieve smart factory status through machine vision quality inspection, predictive machine upkeep, and automated design cycles.",
    features: [
      {
        title: "Principal Advantages and Applications",
        items: [
          "Zero-defect computer vision camera checking",
          "Machine wear predictive maintenance scheduling",
          "Generative design part optimization",
          "Supply chain disruption impact simulations"
        ]
      },
      {
        title: "Software Resources and Tools",
        items: [
          "Manufacturing Execution Systems (MES) with AI modules",
          "Predictive sensor anomaly alerts",
          "Generative CAD part modeling suites"
        ]
      },
      {
        title: "Future Prospects",
        items: [
          "Digital Twin plant-wide operational replicas",
          "Intelligent cooperative industrial robots (cobots)",
          "End-to-end self-correcting assembly lines"
        ]
      }
    ]
  },
  {
    id: "travel",
    name: "Travel and Hospitality",
    iconName: "plane",
    description: "Implement predictive pricing, automated booking management, and personalized travel curation to elevate hospitality services.",
    features: [
      {
        title: "Key Benefits and Use Cases",
        items: [
          "Real-time dynamic room and flight pricing",
          "Personalized vacation itinerary builders",
          "AI check-in guest profiling systems"
        ]
      },
      {
        title: "Software Tools and Solutions",
        items: [
          "AI-driven Booking and PMS integrations",
          "Conversational hotel concierge assistants",
          "Hospitality customer feedback analytics"
        ]
      },
      {
        title: "Future Possibilities",
        items: [
          "AI virtual travel companion agents",
          "Smart room IoT predictive preset controls",
          "AR spatial historic tour systems"
        ]
      }
    ]
  },
  {
    id: "technology",
    name: "Technology",
    iconName: "cpu",
    description: "Accelerate software development, automate cloud infrastructure, and deploy cybersecurity response loops with core AI infrastructure.",
    features: [
      {
        title: "Principal Advantages and Uses",
        items: [
          "Automated code completion and bug detection",
          "Predictive cloud server auto-scaling",
          "Real-time cyberattack threat pattern isolation"
        ]
      },
      {
        title: "Tools and Solutions",
        items: [
          "LLM programming helper integrations",
          "Infrastructure monitoring AI systems",
          "Continuous intrusion pattern mapping"
        ]
      },
      {
        title: "Future Possibilities",
        items: [
          "Self-writing software architecture generators",
          "Autonomous devops engineers",
          "Self-patching cybersecurity firewall systems"
        ]
      }
    ]
  }
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
  const [selectedId, setSelectedId] = useState<string>("business");
  const selectedIndustry = INDUSTRIES_DATA.find((ind) => ind.id === selectedId) || INDUSTRIES_DATA[1];

  return (
    <Section className="bg-white py-16 lg:py-24">
      <Row>
        {/* Section Heading */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#0d1b2a] leading-tight">
            Industries We Transform Through Strategic AI Consulting
          </h2>
          {/* Divider accent */}
          <div className="flex justify-center mt-4 gap-1">
            <span className="w-10 h-1 rounded-full bg-[#D68029]" />
            <span className="w-3 h-1 rounded-full bg-[#D68029]/40" />
          </div>
        </div>

        {/* Tab-Sidebar layout grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start w-full">
          
          {/* Left Column: Tab list (vertical on desktop, horizontal scroll on mobile) */}
          <div className="w-full lg:w-[35%] flex overflow-x-auto lg:overflow-x-visible lg:flex-col gap-3 py-2 px-1 scrollbar-none shrink-0 border-b border-gray-100 lg:border-b-0">
            {INDUSTRIES_DATA.map((ind) => {
              const isSelected = ind.id === selectedId;
              return (
                <button
                  key={ind.id}
                  onClick={() => setSelectedId(ind.id)}
                  className={`relative flex cursor-pointer items-center gap-4 px-5 py-4 w-fit lg:w-full rounded-2xl border text-left font-semibold text-sm transition-all duration-300 whitespace-nowrap lg:whitespace-normal shrink-0 ${
                    isSelected
                      ? "bg-white border-gray-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] text-[#0d1b2a]"
                      : "bg-[#f8f9fa]/60 border-transparent text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? "bg-[#D68029]/10" : "bg-white border border-gray-100 shadow-sm"
                  }`}>
                    <IndustryIcon name={ind.iconName} />
                  </div>
                  <span className="pr-4 lg:pr-0">{ind.name}</span>

                  {/* Selected orange vertical pill bar on the right side of the card */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#D68029] rounded-l-full hidden lg:block"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Display details of selected industry */}
          <div className="w-full lg:w-[65%] min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full"
              >
                {/* Description */}
                <p className="text-[#0d1b2a] font-semibold text-lg sm:text-xl leading-relaxed mb-10 border-l-4 border-[#D68029]/30 pl-5">
                  {selectedIndustry.description}
                </p>

                {/* Sub-sections */}
                <div className="space-y-8">
                  {selectedIndustry.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-5 items-start">
                      {/* Orange Square Number Badge */}
                      <div className="w-7 h-7 rounded-md bg-[#D68029] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm mt-0.5">
                        {idx + 1}
                      </div>

                      {/* Content block */}
                      <div className="flex-1">
                        <h4 className="text-base sm:text-lg font-bold text-[#0d1b2a] mb-3">
                          {feature.title}
                        </h4>
                        <ul className="space-y-2 pl-1">
                          {feature.items.map((item, bulletIdx) => (
                            <li key={bulletIdx} className="flex gap-2.5 items-start text-gray-500 text-xs sm:text-sm leading-relaxed">
                              <span className="text-[#D68029] font-extrabold select-none mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
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
