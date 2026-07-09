"use client";

import React, { useEffect, useState } from "react";
import Section from "@/components/Section";
import Row from "@/components/Row";
import Hero from "@/components/home/Hero";
// import StatsGrid from "@/components/home/RoundStatsCard";
// import PlatformSlider from "@/components/home/PlatformSlider";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";
// import Reviews from "@/components/home/Reviews";
// import Testimonials from "@/components/home/Testimonials";
// import EngagementModels from "@/components/home/EngagementModel";
// import TechnologyShowcase from "@/components/home/TechnologyShowcase";
// import WhyChoosePremium from "@/components/home/WhyChoosePremium";
import apiService from "@/lib/apiService";
import { HomePageData, WhyChooseItem, CreativeWork, SingleResponse } from "@/types";
import FAQ from "@/components/FAQ";

// Import newly refactored section components
// import ServicesSection from "../../components/new-home-components/ServicesSection";
// import ChallengesSection from "../../components/new-home-components/ChallengesSection";
// import AIExpertiseSection from "../../components/new-home-components/AIExpertiseSection";
// import DevelopmentProcessSection from "../../components/new-home-components/DevelopmentProcessSection";
// import PortfolioSection from "../../components/new-home-components/PortfolioSection";
// import GlobalPresenceAndIndustriesSection from "../../components/new-home-components/GlobalPresenceAndIndustriesSection";
// import CaseStudiesSection from "@/components/new-home-components/CaseStudiesSection";


import dynamic from "next/dynamic";
const Reviews = dynamic(() => import("@/components/home/Reviews"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/home/Testimonials"), { ssr: false });
const EngagementModels = dynamic(() => import("@/components/home/EngagementModel"), { ssr: false });
const TechnologyShowcase = dynamic(()=>import("@/components/home/TechnologyShowcase"), { ssr: false });
const WhyChoosePremium = dynamic(()=>import("@/components/home/WhyChoosePremium"), { ssr: false });
const PlatformSlider = dynamic(()=>import("@/components/home/PlatformSlider"), { ssr: false });
const StatsGrid = dynamic(()=>import("@/components/home/RoundStatsCard"), { ssr: false });
const ServicesSection = dynamic(()=>import("@/components/new-home-components/ServicesSection"), { ssr: false });
const ChallengesSection = dynamic(()=>import("@/components/new-home-components/ChallengesSection"), { ssr: false });
const AIExpertiseSection = dynamic(()=>import("@/components/new-home-components/AIExpertiseSection"), { ssr: false });
const DevelopmentProcessSection = dynamic(()=>import("@/components/new-home-components/DevelopmentProcessSection"), { ssr: false });
const PortfolioSection = dynamic(()=>import("@/components/new-home-components/PortfolioSection"), { ssr: false });
const GlobalPresenceAndIndustriesSection = dynamic(()=>import("@/components/new-home-components/GlobalPresenceAndIndustriesSection"), { ssr: false });
const CaseStudiesSection = dynamic(()=>import("@/components/new-home-components/CaseStudiesSection"), { ssr: false });

const homeFAQs = [
  {
    question: "What types of software development services do you offer?",
    answer:
      "We provide end-to-end software development services including AI solutions, custom software development, web applications, mobile apps, enterprise software, SaaS platforms, cloud solutions, UI/UX design, and business automation tailored to your requirements.",
  },
  {
    question: "Can you develop custom AI solutions for our business?",
    answer:
      "Yes. We design and develop custom AI solutions such as AI chatbots, virtual assistants, workflow automation, document processing, recommendation engines, generative AI applications, and LLM-powered business platforms that align with your business goals.",
  },
  {
    question: "How do you ensure the software can scale as our business grows?",
    answer:
      "Our solutions are built using scalable architectures, cloud-native technologies, and industry best practices. This allows your application to support increasing users, data, and business growth without major redevelopment.",
  },
  {
    question: "Can you work with our existing software or legacy systems?",
    answer:
      "Absolutely. We can modernize legacy applications, integrate with existing systems, migrate outdated platforms, and add new features while minimizing disruption to your business operations.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "Our team specializes in React, Next.js, Node.js, Flutter, Python, Laravel, .NET, MongoDB, PostgreSQL, AWS, Docker, OpenAI, Gemini, Claude, LangChain, and other modern web, mobile, cloud, and AI technologies.",
  },
  {
    question: "How do you manage the software development process?",
    answer:
      "We follow an agile development approach that includes discovery, planning, UI/UX design, development, testing, deployment, and post-launch support. Clients receive regular progress updates and milestone reviews throughout the project.",
  },
  {
    question: "How do you ensure the security of our application and business data?",
    answer:
      "Security is integrated into every stage of development. We implement secure coding standards, encrypted data storage, role-based access control, authentication, regular security reviews, and NDA agreements whenever required.",
  },
  {
    question: "Will we have a dedicated development team for our project?",
    answer:
      "Yes. Depending on your project scope, you'll work with a dedicated team that may include a project manager, solution architect, UI/UX designer, developers, QA engineers, and technical consultants to ensure smooth project execution.",
  },
  {
    question: "Do you provide maintenance and technical support after launch?",
    answer:
      "Yes. We offer ongoing maintenance, security updates, performance optimization, bug fixes, cloud monitoring, feature enhancements, and long-term technical support to keep your software running efficiently.",
  },
  {
    question: "How long does it typically take to develop a custom software solution?",
    answer:
      "Project timelines depend on complexity, features, and integrations. After understanding your requirements, we provide a detailed project roadmap with estimated milestones, delivery schedule, and development timeline.",
  },
  {
    question: "How do you estimate the cost of a software development project?",
    answer:
      "Project pricing is based on your business requirements, project scope, technology stack, integrations, and timeline. After an initial consultation, we provide a transparent proposal with detailed estimates and deliverables.",
  },
  {
    question: "Why should businesses choose Inspire Techno Solution as their technology partner?",
    answer:
      "We combine technical expertise, AI innovation, scalable development practices, transparent communication, and long-term support to deliver secure, high-performance digital solutions that help businesses innovate, grow, and stay competitive.",
  },
];

export default function TestPagesClient() {
  const { navStructure } = useWebsiteSettings();
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null);
  const [whyChooseData, setWhyChooseData] = useState<WhyChooseItem[]>([]);
  const [portfolioWorks, setPortfolioWorks] = useState<CreativeWork[]>([]);

  const services =
    navStructure?.servicesNav?.flatMap(
      (category) =>
        category.links?.map((service) => ({
          title: service.title,
          slug: service.slug,
        })) || [],
    ) || [];

  async function getRandomPortfolioProjects(): Promise<CreativeWork[]> {
    try {
      const response = await apiService<SingleResponse<CreativeWork[]>>(
        "/creative-work/creative-work-random",
        {
          bypassCacheRead: true, // ensure we always request a fresh random set from the server
        },
      );
      if (response.success && Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching random portfolio projects:", error);
      return [];
    }
  }

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const response = await apiService<SingleResponse<HomePageData>>("/homepage");
        if (response.success) {
          setHomePageData(response.data);
        }
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    };
    fetchHomepageData();

    const fetchWhyChoose = async () => {
      try {
        const res = await apiService<SingleResponse<WhyChooseItem[]>>("/choose_its_home");
        if (res.success) setWhyChooseData(res.data || []);
      } catch (err) {
        console.error("Error fetching WhyChoose data:", err);
      }
    };
    fetchWhyChoose();

    const fetchPortfolioWorks = async () => {
      try {
        const data = await getRandomPortfolioProjects();
        if (data && data.length) {
          setPortfolioWorks(data);
        }
      } catch (err) {
        console.error("Error fetching portfolio works:", err);
      }
    };
    fetchPortfolioWorks();
  }, []);

  return (
    <main className="relative w-full bg-white text-gray-900 ">
      <Hero
        heroSecton={homePageData?.heroSecton}
        scrollToId="challenges-section"
      />

      <Section className="bg-[#0d1b2a] z-10 py-6! ">
        <Row>
          <PlatformSlider items={services} />
        </Row>
      </Section>

      <Section className="bg-gray-50 py-14! ">
        <Row className=" mx-auto ">
          <StatsGrid columns={4} bordered />
        </Row>
      </Section>

      <ServicesSection />

      <AIExpertiseSection />
      <CaseStudiesSection/>
      <DevelopmentProcessSection />
      <PortfolioSection portfolioWorks={portfolioWorks} />
      <TechnologyShowcase />
      <WhyChoosePremium items={whyChooseData} />
      <GlobalPresenceAndIndustriesSection />
      <ChallengesSection />

      <Reviews />

      <Testimonials />

      <FAQ
        faqs={homeFAQs}
        title="Frequently Asked Questions (FAQ)"
        sideTitle="Have Queries?"
        sideSubtitle="We are here to Answer you..."
        buttonText="Enquire Now"
        buttonHref="#contact-form-section"
      />

      <EngagementModels />
    </main>
  );
}
