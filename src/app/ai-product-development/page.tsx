import { Metadata } from "next";
import AIProductDevClient from "./AIProductDevClient";

export const metadata: Metadata = {
  title:
    "AI Product Development Services | Inspire Techno Solution",
  description:
    "Build innovative AI products with custom development, automation, ML, and scalable AI solutions by experts.",
  keywords: [
    "AI Product Development",
    "Custom AI Development",
    "AI Agents",
    "LLM Integration",
    "Computer Vision",
    "Predictive Analytics",
    "Enterprise Automation",
    "Machine Learning Development",
    "AI Software Company",
    "Generative AI Development",
  ],
  alternates: {
    canonical: "https://inspiretechnosolution.com/ai-product-development",
  },
  openGraph: {
    title: "AI Product Development Services | Inspire Techno Solution",
    description:
      "We design, build, and deploy premium AI products, from autonomous agents to enterprise machine learning systems. Partner with our expert team.",
    url: "https://inspiretechnosolution.com/ai-product-development",
    type: "website",
    images: ["https://inspiretechnosolution.com/feature-logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Product Development Services | Inspire Techno Solution",
    description:
      "We design, build, and deploy premium AI products, from autonomous agents to enterprise machine learning systems. Partner with our expert team.",
    images: ["https://inspiretechnosolution.com/feature-logo.jpg"],
    site: "@inspiretechnosolution",
  },
};

export default function AIProductDevelopmentPage() {
  return <AIProductDevClient />;
}
