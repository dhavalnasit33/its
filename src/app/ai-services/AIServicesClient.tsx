"use client";

import Section from "@/components/Section";
import Row from "@/components/Row";
import PlatformSlider from "@/components/home/PlatformSlider";
import StatsGrid from "@/components/home/RoundStatsCard";
import GlobalLogoMarquee from "@/components/common/GlobalLogoMarquee";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/common/CTA";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";

import Hero from "@/components/ai-services/Hero";
import ChooseYourAISolution from "@/components/ai-services/ChooseYourAISolution";
import BusinessChallengesVsOutcomes from "@/components/ai-services/BusinessChallengesVsOutcomes";
import AiDeliveryFramework from "@/components/ai-services/AiDeliveryFramework";
import IndustriesWeServe from "@/components/ai-services/IndustriesWeServe";

const AI_SERVICES_FAQS = [
  {
    question: "What AI services do you offer?",
    answer:
      "We provide enterprise AI services including AI strategy, AI product development, AI chatbots, AI agents, workflow automation, LLM development, and Generative AI solutions.",
  },
  {
    question: "Can you build custom AI solutions for our business?",
    answer:
      "Yes. We design and develop AI solutions around your business goals, data, workflows, integrations, security requirements, and long-term scalability needs.",
  },
];

export default function AIServicesClient() {
  const { navStructure } = useWebsiteSettings();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Enterprise AI Solutions & Development Services",
    provider: {
      "@type": "Organization",
      name: "Inspire Techno Solution",
      url: "https://inspiretechnosolution.com",
    },
    description:
      "Build enterprise AI solutions including AI strategy, AI chatbots, AI automation, AI agents, AI product development, and Generative AI services for modern businesses.",
    areaServed: "Worldwide",
    serviceType: "AI Services",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://inspiretechnosolution.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Services",
        item: "https://inspiretechnosolution.com/ai-services",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: AI_SERVICES_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const services =
    navStructure?.servicesNav?.flatMap(
      (category) =>
        category.links?.map((service) => ({
          title: service.title,
          slug: service.slug,
        })) || [],
    ) || [];

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="relative">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Platform Slider (reused from home) */}
        <Section className="bg-[#0d1b2a] z-10 py-6!">
          <Row>
            <PlatformSlider items={services} />
          </Row>
        </Section>

        {/* 3. Stats Grid (reused from home) */}
        <Section className="bg-gray-50 py-14!">
          <Row className=" mx-auto ">
            <StatsGrid columns={4} bordered />
          </Row>
        </Section>

        {/* 4. Trusted Technologies Marquee */}
        <GlobalLogoMarquee />

        <ChooseYourAISolution />
        <AiDeliveryFramework />
        <BusinessChallengesVsOutcomes />

        <IndustriesWeServe />

        {/* 9. CTA */}
        {/* <CTA highlightedText="Enterprise AI Solution?" /> */}

        {/* 10. Testimonials */}
        <Testimonials />

        {/* 11. FAQ */}
        <FAQ faqs={AI_SERVICES_FAQS} />
      </main>
    </>
  );
}
