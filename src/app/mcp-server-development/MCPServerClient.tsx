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

// Import MCP Server Development Components
import Hero from "@/components/mcp-server-development/Hero";
import MCPServices from "@/components/mcp-server-development/MCPServices";
import ConnectedSystems from "@/components/mcp-server-development/ConnectedSystems";
import EnterpriseSecurity from "@/components/mcp-server-development/EnterpriseSecurity";
import HowMCPWorks from "@/components/mcp-server-development/HowMCPWorks";

const MCP_FAQS = [
  {
    question:
      "What is Model Context Protocol (MCP) and why do enterprises need custom MCP servers?",
    answer:
      "Model Context Protocol (MCP) is an open standard developed to securely connect AI assistants and autonomous agents with local data sources, enterprise databases, custom APIs, and SaaS applications. Custom MCP servers allow AI models (such as Claude, ChatGPT, and custom LLMs) to execute real-world business actions safely within your security boundaries.",
  },
  {
    question:
      "Are custom MCP servers compatible with both Claude Desktop and OpenAI Assistants?",
    answer:
      "Yes! We design standards-compliant MCP servers using JSON-RPC protocol schemas that work natively with Claude Desktop, OpenAI Assistants SDK, Cursor AI, LangChain, LlamaIndex, and custom enterprise agent frameworks.",
  },
  {
    question:
      "How do you ensure zero-trust security and data privacy in custom MCP servers?",
    answer:
      "We implement enterprise-grade security protocols including OAuth2 / OIDC authentication, API key rotation, role-based access control (RBAC), TLS 1.3 encryption, parameter validation, and explicit human-in-the-loop (HITL) approval gates before executing write or modification operations.",
  },
  {
    question:
      "Which business systems and enterprise tools can be connected via custom MCP servers?",
    answer:
      "We build custom MCP connectors for SQL/NoSQL databases (Postgres, Snowflake, MongoDB), CRMs (Salesforce, HubSpot), ERPs (SAP, Oracle), collaboration tools (Slack, Jira, GitHub, Notion), and internal REST/GraphQL backend microservices.",
  },
  {
    question:
      "Can custom MCP servers support multi-agent communication and service discovery?",
    answer:
      "Yes. We build multi-agent MCP architectures where specialized AI agents (e.g. Audit Agent, Sales Agent, Support Agent) automatically discover available MCP tools, negotiate context handoffs, and collaborate on complex enterprise workflows.",
  },
  {
    question:
      "What is the typical timeline and process for custom MCP server development?",
    answer:
      "A tailored enterprise MCP server with 2 to 4 core system connectors can be developed, tested, and deployed in 2 to 4 weeks. Full enterprise deployments include CI/CD pipelines, containerization (Docker/Kubernetes), monitoring, and ongoing support.",
  },
];

export default function MCPServerClient() {
  const { navStructure } = useWebsiteSettings();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom MCP Server Development Services",
    provider: {
      "@type": "Organization",
      name: "Inspire Techno Solution",
      url: "https://inspiretechnosolution.com",
    },
    description:
      "Custom Model Context Protocol (MCP) server development services for secure enterprise AI integration with APIs, databases, CRMs, and internal systems.",
    areaServed: "Worldwide",
    serviceType: "MCP Server Development Services",
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
        name: "Custom MCP Server Development",
        item: "https://inspiretechnosolution.com/mcp-server-development",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: MCP_FAQS.map((faq) => ({
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

      <main className="w-full relative overflow-x-hidden bg-white">
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
          <Row className="mx-auto">
            <StatsGrid columns={4} bordered />
          </Row>
        </Section>

        {/* ── 4. Trusted Technologies Marquee ── */}
        <GlobalLogoMarquee />

        {/* ── 5. Enterprise MCP Development Services (6 Cards) ── */}
        <MCPServices />

        <HowMCPWorks />

        {/* ── 6. Enterprise Systems We Connect (18 System Cards Grid) ── */}
        <ConnectedSystems />

        {/* ── 7. Enterprise Security Dashboard (Dark Theme) ── */}
        <EnterpriseSecurity />

        {/* ── 8. Call To Action Banner ── */}
        <CTA highlightedText="Custom MCP Server for Your Enterprise?" />

        {/* ── 7. Testimonials ── */}
        <Testimonials />

        {/* ── 8. FAQ Accordion (MCP Specific) ── */}
        <FAQ faqs={MCP_FAQS} />
      </main>
    </>
  );
}
