"use client";

import Section from "@/components/Section";
import Row from "@/components/Row";
import PlatformSlider from "@/components/home/PlatformSlider";
import StatsGrid from "@/components/home/RoundStatsCard";
import Hero from "@/components/ai-strategy/Hero";
import Timeline from "@/components/ai-strategy/Timeline";
import Solutions from "@/components/ai-strategy/Solutions";
import Results from "@/components/ai-strategy/Results";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/ai-strategy/CTA";
import FAQ from "@/components/ai-strategy/FAQ";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";
import IndustriesWeTransform from "@/components/ai-strategy/IndustriesWeTransform";
import GlobalLogoMarquee from "@/components/common/GlobalLogoMarquee";

export default function AIStrategyClient() {
  const { navStructure } = useWebsiteSettings();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Strategy & Consulting",
    provider: {
      "@type": "Organization",
      name: "Inspire Techno Solution",
      url: "https://inspiretechnosolution.com",
    },
    description:
      "Expert AI strategy and consulting services to help businesses identify opportunities and implement AI solutions.",
    areaServed: "Worldwide",
    serviceType: "AI Consulting",
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
        name: "AI Strategy & Consulting",
        item: "https://inspiretechnosolution.com/ai-strategy-consulting",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is AI strategy consulting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI strategy consulting helps businesses identify the right AI opportunities, define a clear implementation roadmap, and build AI solutions that drive measurable outcomes.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to build an AI roadmap?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A typical AI roadmap engagement takes 3–6 weeks depending on the complexity of your business.",
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

        {/* ── 3. Platform Slider (reused from home) ── */}
        <Section className="bg-[#0d1b2a] z-10 py-6!">
          <Row>
            <PlatformSlider items={services} />
          </Row>
        </Section>

        {/* ── 4. Stats Grid (reused from home) ── */}
        <Section className="bg-gray-50 py-14!">
          <Row className=" mx-auto ">
            <StatsGrid columns={4} bordered />
          </Row>
        </Section>

        {/* ── 2. AI Tools Marquee (trusted by) ── */}
        <GlobalLogoMarquee />

        {/* ── 5. AI Solutions Grid ── */}
        <Solutions />

        {/* ── 6. AI Consulting Timeline / Process ── */}
        <Timeline />

        {/* ── 7. Industries We Transform ── */}
        <IndustriesWeTransform />

        {/* ── 11. CTA ── */}
        <CTA />

        {/* ── 10. Testimonials ── */}
        <Testimonials />

        {/* ── 9. Real Impact & Measurable Results ── */}
        <Results />

        {/* ── 12. FAQ ── */}
        <FAQ />
      </main>
    </>
  );
}
