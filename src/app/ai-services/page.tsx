import { Metadata } from "next";
import AIServicesClient from "./AIServicesClient";

export const metadata: Metadata = {
  title:
    "Enterprise AI Solutions & Development Services | Inspire Techno Solution",
  description:
    "Build enterprise AI solutions including AI strategy, AI chatbots, AI automation, AI agents, AI product development, and Generative AI services for modern businesses.",
  keywords: [
    "AI Services",
    "Enterprise AI Solutions",
    "AI Development",
    "AI Chatbots",
    "AI Agents",
    "Generative AI",
    "AI Product Development",
    "AI Automation",
    "LLM Development",
    "Artificial Intelligence Company",
  ],
  alternates: {
    canonical: "https://inspiretechnosolution.com/ai-services",
  },
  openGraph: {
    title:
      "Enterprise AI Solutions & Development Services | Inspire Techno Solution",
    description:
      "Build enterprise AI solutions including AI strategy, AI chatbots, AI automation, AI agents, AI product development, and Generative AI services for modern businesses.",
    url: "https://inspiretechnosolution.com/ai-services",
    type: "website",
    images: ["/feature-logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Enterprise AI Solutions & Development Services | Inspire Techno Solution",
    description:
      "Build enterprise AI solutions including AI strategy, AI chatbots, AI automation, AI agents, AI product development, and Generative AI services for modern businesses.",
    images: ["/feature-logo.jpg"],
    site: "@inspiretechnosolution",
  },
};

export default function AIServicesPage() {
  return <AIServicesClient />;
}
