import { Metadata } from "next";
import AIStrategyClient from "./AIStrategyClient";

export const metadata: Metadata = {
  title:
    "AI Strategy Consulting Services | Inspire Techno Solution",
  description:
    "Drive business growth with AI strategy consulting, digital transformation, automation, and AI implementation experts.",
  keywords: [
    "AI Strategy",
    "AI Consulting",
    "AI Roadmap",
    "Machine Learning",
    "Generative AI",
    "LLM Consulting",
    "AI Implementation",
    "Business AI",
  ],
  alternates: {
    canonical: "https://inspiretechnosolution.com/ai-strategy-consulting",
  },
  openGraph: {
    title: "AI Strategy Consulting Services | Inspire Techno Solution",
    description:
      "Build smarter AI-powered business solutions with expert strategy and consulting services.",
    url: "https://inspiretechnosolution.com/ai-strategy-consulting",
    type: "website",
    images: ["/feature-logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Strategy & Consulting | Inspire Techno Solution",
    description: "Build smarter AI-powered business solutions.",
    images: ["/feature-logo.jpg"],
    site: "@inspiretechnosolution",
  },
};

export default function AIStrategyPage() {
  return <AIStrategyClient />;
}