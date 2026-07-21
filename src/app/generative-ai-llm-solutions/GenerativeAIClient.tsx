"use client";

import React from "react";
import Section from "@/components/Section";
import Row from "@/components/Row";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/FAQ";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";
import PlatformSlider from "@/components/home/PlatformSlider";
import StatsGrid from "@/components/home/RoundStatsCard";

// Import Generative AI Sub-components
import Hero from "@/components/generative-ai-llm-solutions/Hero";
import GenerativeAISolutions from "@/components/generative-ai-llm-solutions/GenerativeAISolutions";
import LLMProcess from "@/components/generative-ai-llm-solutions/LLMProcess";
import GlobalLogoMarquee from "@/components/common/GlobalLogoMarquee";
import CTA from "@/components/common/CTA";
import EnterpriseAIArchitecture from "@/components/generative-ai-llm-solutions/EnterpriseAIArchitecture";

const GENERATIVE_AI_FAQS = [
  {
    question: "What is Retrieval-Augmented Generation (RAG) and why is it useful?",
    answer:
      "RAG is a framework that connects Large Language Models (LLMs) dynamically to external, verified data sources (like company wiki directories, manuals, database records). Instead of relying on static training weights which can cause model hallucination, the LLM queries the vector index first to generate accurate, source-cited responses.",
  },
  {
    question: "Can we fine-tune open-source models like Llama 3, Mistral, or Qwen?",
    answer:
      "Yes, absolutely. We clean and format your internal training data, create instruction-response pairs, and run supervised fine-tuning (SFT) or Parameter-Efficient Fine-Tuning (PEFT/LoRA) on GPU instances. This allows you to host private models tailored to your brand voice and data privacy needs.",
  },
  {
    question: "How do you handle enterprise data privacy with public LLM models?",
    answer:
      "For public models (like OpenAI or Anthropic), we enforce strict data privacy protocols. We route queries through API endpoints that guarantee zero data retention for training. Additionally, we filter personal identifiable information (PII) before it leaves your systems. For absolute compliance, we deploy open-weights models inside private VPC boundaries.",
  },
  {
    question: "Can these models connect to vector databases and corporate systems?",
    answer:
      "Yes. We integrate generative AI solutions with leading vector databases (Pinecone, Milvus, Qdrant, Chroma, pgvector) and orchestrate pipelines via frameworks like LangChain and LlamaIndex. This lets your models query SQL databases, search document repositories, and update CRMs automatically.",
  },
  {
    question: "How do you evaluate generative AI performance and hallucination rates?",
    answer:
      "We implement comprehensive evaluation matrices (e.g., using Ragas or G-Eval) to score model answers on faithfulness, answer relevance, context recall, and semantic correctness. We run rigorous automated validation sweeps before deploying prompt changes to production.",
  },
  {
    question: "What are the token costs and compute resource constraints at scale?",
    answer:
      "We build semantic caching layers (like GPTCache) to reduce redundant API queries, optimizing prompt lengths and choosing cost-efficient model sizes (like GPT-4o-mini or quantized local models) where applicable. We monitor usage statistics closely to maintain balanced token-cost profiles.",
  },
];

export default function GenerativeAIClient() {
  const { navStructure } = useWebsiteSettings();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Generative AI & LLM Solutions",
    provider: {
      "@type": "Organization",
      name: "Inspire Techno Solution",
      url: "https://inspiretechnosolution.com",
    },
    description:
      "Deploy custom Generative AI applications, RAG search systems, and fine-tuned language models powered by OpenAI, Claude, and Llama.",
    areaServed: "Worldwide",
    serviceType: "Generative AI & LLM Solutions",
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
        name: "Generative AI & LLM Solutions",
        item: "https://inspiretechnosolution.com/generative-ai-llm-solutions",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GENERATIVE_AI_FAQS.map((faq) => ({
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
        {/* ── 1. Hero Section ── */}
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

        {/* ── 5. Solutions Grid ── */}
        <GenerativeAISolutions />

        <EnterpriseAIArchitecture />

        {/* ── 6. Process Step Workflow ── */}
        {/* <LLMProcess /> */}

        {/* ── 7. Call To Action Banner ── */}
        <CTA highlightedText="Generative AI Solution?" />

        {/* ── 8. Testimonials ── */}
        <Testimonials />

        {/* ── 9. FAQ Accordion ── */}
        <FAQ faqs={GENERATIVE_AI_FAQS} />
      </main>
    </>
  );
}
