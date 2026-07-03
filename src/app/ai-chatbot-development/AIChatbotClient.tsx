"use client";

import React from "react";
import Section from "@/components/Section";
import Row from "@/components/Row";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/FAQ";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";
import PlatformSlider from "@/components/home/PlatformSlider";
import StatsGrid from "@/components/home/RoundStatsCard"; 
// Import AI Chatbot Sub-components
import Hero from "@/components/ai-chatbot-dev/Hero";
import AIChatbotSolutions from "@/components/ai-chatbot-dev/AIChatbotSolutions";
import ConversationFlow from "@/components/ai-chatbot-dev/ConversationFlow";
import PowerfulCapabilities from "@/components/ai-chatbot-dev/PowerfulCapabilities";
import IndustryUseCases from "@/components/ai-chatbot-dev/IndustryUseCases";
import Integrations from "@/components/ai-chatbot-dev/Integrations";
import WhyAIChatbots from "@/components/ai-chatbot-dev/WhyAIChatbots";
import DevelopmentProcess from "@/components/ai-chatbot-dev/DevelopmentProcess";
import SuccessMetrics from "@/components/ai-chatbot-dev/SuccessMetrics";
import FinalCTA from "@/components/ai-chatbot-dev/FinalCTA";

const CHATBOT_FAQS = [
  {
    question: "What platforms can your AI chatbots integrate with?",
    answer:
      "Our AI chatbots integrate seamlessly with popular messaging channels like WhatsApp, Facebook Messenger, Slack, Microsoft Teams, and Telegram. They can also be embedded directly on websites, web apps, and connected to enterprise systems like HubSpot, Salesforce, Shopify, Zendesk, and Notion.",
  },
  {
    question: "How do you prevent chatbots from sharing incorrect information?",
    answer:
      "We implement Retrieval-Augmented Generation (RAG) coupled with strict semantic guardrails. The chatbot only retrieves responses from verified knowledge bases (company docs, wikis, product databases). Additionally, we program verification layers to block hallucinations and off-topic conversations.",
  },
  {
    question: "Can the chatbot hand over conversations to human agents?",
    answer:
      "Yes, absolutely. We build robust human-in-the-loop (HITL) routing workflows. When a query exceeds the bot's confidence score or when a user requests agent help, the bot instantly flags and hands over the conversation history to your support team via Slack, Zendesk, or HubSpot.",
  },
  {
    question: "Which language models (LLMs) do you use?",
    answer:
      "We build with leading model suites including OpenAI GPT-4o, Anthropic Claude 3.5, Google Gemini Pro, and Meta Llama 3. We choose the optimal model depending on latency, cost, and complexity constraints, maintaining LLM-agnostic architecture so you can swap models anytime.",
  },
  {
    question: "Do you support multi-language conversations?",
    answer:
      "Yes. Our chatbots automatically detect the user's input language and respond fluently in over 100 languages. This allows you to scale international customer support without hiring multilingual support staff.",
  },
  {
    question: "How long does it take to deploy a custom AI chatbot?",
    answer:
      "A standard knowledge base chatbot can be designed, tested, and deployed within 4–6 weeks. Complex enterprise bots with CRM syncs, voice capabilities, and multi-system integrations typically require 8–12 weeks.",
  },
];

export default function AIChatbotClient() {
  const { navStructure } = useWebsiteSettings();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Chatbot Development",
    provider: {
      "@type": "Organization",
      name: "Inspire Techno Solution",
      url: "https://inspiretechnosolution.com",
    },
    description:
      "Build premium conversational AI chatbots powered by GPT, Claude, and Gemini to automate customer support, sales, and operations.",
    areaServed: "Worldwide",
    serviceType: "AI Chatbot Development",
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
        name: "AI Chatbot Development",
        item: "https://inspiretechnosolution.com/ai-chatbot-development",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CHATBOT_FAQS.map((faq) => ({
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

      <main className="relative bg-white ">
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

        {/* ── 2. Solutions Grid ── */}
        <AIChatbotSolutions />

  
        {/* ── 3. Conversation Flow ── */}
        <ConversationFlow />

        {/* ── 5. Industry Use Cases ── */}
        <IndustryUseCases />
        
      {/* ── 4. Powerful Capabilities ── */}
        <PowerfulCapabilities />

        {/* ── 6. Integrations Grid ── */}
        <Integrations />

        {/* ── 7. Why AI Chatbots Comparison ── */}
        <WhyAIChatbots />

        {/* ── 8. Development Process ── */}
        <DevelopmentProcess />

        {/* ── 9. Success Metrics & Statistics ── */}
        <SuccessMetrics />

        {/* ── 10. Testimonials ── */}
        <Testimonials />

        {/* ── 11. FAQ Accordion ── */}
        <FAQ faqs={CHATBOT_FAQS} />

        {/* ── 12. Final CTA Banner ── */}
        <FinalCTA />
      </main>
    </>
  );
}
