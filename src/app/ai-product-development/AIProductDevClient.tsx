"use client";

import React from "react";
import Section from "@/components/Section";
import Row from "@/components/Row";
import PlatformSlider from "@/components/home/PlatformSlider";
import StatsGrid from "@/components/home/RoundStatsCard";
import Testimonials from "@/components/home/Testimonials";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";

import Hero from "@/components/ai-product-dev/Hero";
import AISolutionsGrid from "@/components/ai-product-dev/AISolutionsGrid";
import DevelopmentJourney from "@/components/ai-product-dev/DevelopmentJourney";
import WhyChooseUs from "@/components/ai-product-dev/WhyChooseUs";
import Industries from "@/components/ai-product-dev/Industries";

import FAQ from "@/components/FAQ";
import GlobalLogoMarquee from "@/components/common/GlobalLogoMarquee";
import CTA from "@/components/common/CTA";


const CUSTOM_FAQS = [
  {
    question: "What types of AI products do you build?",
    answer:
      "We build a wide range of AI products including AI chatbots, autonomous agents, document AI systems, voice AI, computer vision solutions, predictive analytics platforms, workflow automation tools, and recommendation engines. Each product is custom-designed for your specific business requirements.",
  },
  {
    question: "How long does it take to build an AI product?",
    answer:
      "The timeline depends on the complexity of your project. A typical AI chatbot or automation tool takes 6–12 weeks. More complex systems like computer vision platforms or full enterprise AI products may take 3–6 months. We always provide a detailed timeline during the discovery phase.",
  },
  {
    question: "Do you work with our existing data and infrastructure?",
    answer:
      "Yes, absolutely. We conduct a thorough data and infrastructure audit during the discovery phase and design AI solutions that integrate seamlessly with your existing systems — whether it's a cloud environment, on-premise infrastructure, or a hybrid setup.",
  },
  {
    question: "Which LLMs and AI models do you use?",
    answer:
      "We are LLM-agnostic and work with all major models including GPT-4o, Claude 3.5, Gemini Pro, Llama 3, Mistral, and more. Our architecture is designed to be model-flexible so you can swap or upgrade models without rebuilding your entire AI system.",
  },
  {
    question: "How do you ensure the security of our data?",
    answer:
      "Security is a top priority. We implement end-to-end encryption, role-based access control, and data anonymization techniques. We can also deploy AI solutions on your private cloud or on-premise infrastructure to ensure complete data sovereignty and compliance with GDPR, HIPAA, or any other regulations relevant to your industry.",
  },
  {
    question: "What happens after the AI product is deployed?",
    answer:
      "Deployment is just the beginning of our partnership. We provide 24/7 monitoring, proactive maintenance, model retraining as your data evolves, and version upgrades. We also offer dedicated support plans to ensure your AI product continues to perform at its best as your business scales.",
  },
];

export default function AIProductDevClient() {
  const { navStructure } = useWebsiteSettings();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Product Development",
    provider: {
      "@type": "Organization",
      name: "Inspire Techno Solution",
      url: "https://inspiretechnosolution.com",
    },
    description:
      "Design, develop and deploy premium AI products built specifically for your business—from AI agents and automation to enterprise-grade machine learning systems.",
    areaServed: "Worldwide",
    serviceType: "AI Development",
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
        name: "AI Product Development",
        item: "https://inspiretechnosolution.com/ai-product-development",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What types of AI products do you build?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We build AI chatbots, autonomous agents, document AI systems, voice AI, computer vision solutions, predictive analytics platforms, workflow automation tools, and recommendation engines.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to build an AI product?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A typical AI chatbot or automation tool takes 6–12 weeks. More complex systems like computer vision platforms or full enterprise AI products may take 3–6 months.",
        },
      },
    ],
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
        {/* ── 1. Hero ── */}
        <Hero />

        {/* ── 2. Platform Slider (reused from home) ── */}
        <Section className="bg-[#0d1b2a] z-10 py-6!">
          <Row>
            <PlatformSlider items={services} />
          </Row>
        </Section>

        {/* ── 3. Stats Grid (reused from home) ── */}
        <Section className="bg-gray-50 py-14!">
          <Row className=" mx-auto ">
            <StatsGrid columns={4} bordered />
          </Row>
        </Section>

        {/* ── 4. Trusted Technologies Marquee ── */}
        <GlobalLogoMarquee />

        {/* ── 5. AI Solutions Grid ── */}
        <AISolutionsGrid />

        {/* ── 6. Development Journey Timeline ── */}
        <DevelopmentJourney />

        {/* ── 7. Why Choose Us ── */}
        <WhyChooseUs />

        {/* ── 9. Industries ── */}
        <Industries />

        {/* ── 10. CTA Banner ── */}
       <CTA 
          highlightedText="Custom AI Product?" 
        />

        {/* ── 11. Testimonials (reused) ── */}
        <Testimonials />

        {/* ── 12. FAQ ── */}
        <FAQ faqs={CUSTOM_FAQS} />
      </main>
    </>
  );
}
