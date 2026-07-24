"use client";

import React from "react";
import Section from "@/components/Section";
import Row from "@/components/Row";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/FAQ";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";
import PlatformSlider from "@/components/home/PlatformSlider";
import StatsGrid from "@/components/home/RoundStatsCard";
import GlobalLogoMarquee from "@/components/common/GlobalLogoMarquee";
import CTA from "@/components/common/CTA";

// Import Agentic AI Sub-components
import Hero from "@/components/agentic-ai-development-services/Hero";

const AGENTIC_AI_FAQS = [
  {
    question:
      "What is Agentic AI and how is it different from standard AI models or chatbots?",
    answer:
      "Unlike standard chatbots that simply answer questions, Agentic AI systems are autonomous execution engines. They can decompose complex business goals into sub-tasks, reason through multi-step plans, invoke enterprise APIs and tools (CRMs, ERPs, databases), self-correct errors, and complete end-to-end workflows autonomously.",
  },
  {
    question:
      "What frameworks and technologies do you use to build autonomous AI agents?",
    answer:
      "We build production-grade agentic platforms using industry-leading frameworks including OpenAI Agents SDK, LangGraph, CrewAI, AutoGen, and Model Context Protocol (MCP). We implement state persistence, vector memory, and deterministic tool-calling layers.",
  },
  {
    question:
      "How do AI agents integrate securely with our existing enterprise software?",
    answer:
      "We build secure API connectors using Model Context Protocol (MCP) and REST/GraphQL interfaces. Your AI agents securely authenticate and interact with systems like Salesforce, SAP, HubSpot, Slack, Jira, GitHub, Outlook, and custom SQL databases within your private VPC boundary.",
  },
  {
    question:
      "How do you prevent AI agent hallucinations and infinite execution loops?",
    answer:
      "We implement strict human-in-the-loop (HITL) approval gates for critical actions (such as wire transfers or email dispatches), deterministic output schema validation, maximum iteration caps, and automated verification loops before task completion.",
  },
  {
    question:
      "Can multiple specialized AI agents collaborate with each other?",
    answer:
      "Yes, absolutely. We specialize in Multi-Agent Collaboration systems where specialized agents (e.g. Sales Agent, Finance Agent, Legal Agent, HR Agent) delegate sub-tasks, negotiate data handoffs, and report progress back to an AI Master Orchestrator.",
  },
  {
    question:
      "How long does it take to deploy a custom AI workforce agent in production?",
    answer:
      "An enterprise AI agent prototype with 2 to 3 core tool integrations can be deployed in 2 to 4 weeks. Full multi-agent workforce orchestration with enterprise security and audit logging typically takes 6 to 8 weeks.",
  },
];

export default function AgenticAIClient() {
  const { navStructure } = useWebsiteSettings();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agentic AI Development Services",
    provider: {
      "@type": "Organization",
      name: "Inspire Techno Solution",
      url: "https://inspiretechnosolution.com",
    },
    description:
      "Build intelligent autonomous AI agents and AI workforce platforms powered by OpenAI Agents SDK, LangGraph, CrewAI, and Model Context Protocol.",
    areaServed: "Worldwide",
    serviceType: "Agentic AI Development Services",
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
        name: "Agentic AI Development Services",
        item: "https://inspiretechnosolution.com/agentic-ai-development-services",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: AGENTIC_AI_FAQS.map((faq) => ({
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

        {/* ── 2. Platform Slider ── */}
        <Section className="bg-[#0d1b2a] z-10 py-6!">
          <Row>
            <PlatformSlider items={services} />
          </Row>
        </Section>

        {/* ── 3. Stats Grid ── */}
        <Section className="bg-gray-50 py-14!">
          <Row className="mx-auto">
            <StatsGrid columns={4} bordered />
          </Row>
        </Section>

        {/* ── 4. Trusted Technologies Marquee ── */}
        <GlobalLogoMarquee />

        {/* ── 5. Call To Action Banner ── */}
        <CTA highlightedText="Autonomous AI Workforce?" />

        {/* ── 6. Testimonials ── */}
        <Testimonials />

        {/* ── 7. FAQ Accordion (Agentic AI Specific) ── */}
        <FAQ faqs={AGENTIC_AI_FAQS} />
      </main>
    </>
  );
}
