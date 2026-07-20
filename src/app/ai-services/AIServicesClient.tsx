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
    answer: "We provide enterprise AI services including AI strategy, custom AI product development, AI chatbots, autonomous AI agents, workflow automation, LLM fine-tuning, and Generative AI solutions.",
  },
  {
    question: "Can you build custom AI solutions for our business?",
    answer:
      "Yes. We design and develop custom AI solutions tailored to your unique business goals, workflows, existing data pipelines, integrations, and security requirements.",
  },
 {
    question: "How do I know if my business is ready for AI?",
    answer: "If your business relies on repetitive tasks, customer interactions, large amounts of data, or manual decision-making, AI can likely improve efficiency and productivity. We assess your current processes and identify the highest-impact AI opportunities."
  },
  {
    question: "Which industries can benefit from AI solutions?",
    answer: "We build AI solutions for healthcare, finance, retail, manufacturing, logistics, education, insurance, real estate, SaaS, and many other industries. Every solution is customized to the specific needs of your business."
  },
  {
    question: "Can AI integrate with our existing software and systems?",
    answer: "Yes. Our AI solutions integrate seamlessly with CRMs, ERPs, websites, mobile apps, databases, APIs, cloud platforms, and third-party business tools without disrupting your existing workflows."
  },
  {
    question: "How long does it take to develop an AI solution?",
    answer: "The development timeline depends on project complexity. A proof of concept can take 2–6 weeks, while enterprise AI platforms and custom products typically require 2–6 months, including development, testing, and deployment."
  },
  {
    question: "Do you work with OpenAI, Claude, Gemini, and other LLMs?",
    answer: "Yes. We develop solutions using leading AI models including OpenAI GPT, Claude, Gemini, Llama, Mistral, DeepSeek, Qwen, and other open-source or enterprise-grade language models based on your project requirements."
  },
  {
    question: "Will my business data remain secure and private?",
    answer: "Absolutely. We implement enterprise-grade security practices including encrypted data storage, secure API communication, access controls, compliance standards, and private deployment options to protect sensitive business information."
  },
  {
    question: "Can AI automate repetitive business processes?",
    answer: "Yes. We develop AI-powered automation for customer support, document processing, lead qualification, reporting, workflow approvals, internal operations, and many other repetitive business tasks."
  },
  {
    question: "Do you provide AI consulting before development?",
    answer: "Yes. Every engagement begins with AI consulting, where we evaluate your business goals, identify use cases, define technical architecture, estimate ROI, and create a practical implementation roadmap."
  },
  {
    question: "What happens after the AI solution is deployed?",
    answer: "We provide continuous monitoring, model optimization, performance improvements, maintenance, security updates, and ongoing support to ensure your AI solution continues delivering long-term business value."
  },
  {
    question: "Can AI help reduce operational costs?",
    answer: "Yes. AI reduces manual effort, improves decision-making, automates repetitive workflows, minimizes human error, and optimizes business operations, resulting in significant cost savings over time."
  },
  {
    question: "Do you offer scalable AI solutions for growing businesses?",
    answer: "Yes. Our AI platforms are built with scalable cloud-native architectures that can support growing workloads, increasing users, larger datasets, and future AI capabilities as your business expands."
  },
  {
    question: "Why choose Inspire AI Solutions for enterprise AI development?",
    answer: "We combine AI strategy, engineering expertise, modern LLM technologies, enterprise integrations, and long-term support to deliver secure, scalable, and ROI-driven AI solutions tailored to your business objectives."
  }
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
