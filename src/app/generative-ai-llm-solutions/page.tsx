import { Metadata } from "next";
import GenerativeAIClient from "./GenerativeAIClient";

export const metadata: Metadata = {
  title: "Generative AI & LLM Solutions | Inspire Techno Solution",
  description:
    "Partner with us to deploy custom enterprise Generative AI applications, Retrieval-Augmented Generation (RAG) platforms, and fine-tuned LLM models.",
  keywords: [
    "Generative AI",
    "LLM Solutions",
    "Retrieval-Augmented Generation",
    "RAG systems",
    "Model Fine-Tuning",
    "Llama 3 development",
    "Custom AI Agent development",
    "AI Consulting",
  ],
  alternates: {
    canonical: "https://inspiretechnosolution.com/generative-ai-llm-solutions",
  },
  openGraph: {
    title: "Generative AI & LLM Solutions | Inspire Techno Solution",
    description:
      "Partner with us to deploy custom enterprise Generative AI applications, Retrieval-Augmented Generation (RAG) platforms, and fine-tuned LLM models.",
    url: "https://inspiretechnosolution.com/generative-ai-llm-solutions",
    type: "website",
    images: ["https://inspiretechnosolution.com/feature-logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Generative AI & LLM Solutions | Inspire Techno Solution",
    description:
      "Partner with us to deploy custom enterprise Generative AI applications, Retrieval-Augmented Generation (RAG) platforms, and fine-tuned LLM models.",
    images: ["https://inspiretechnosolution.com/feature-logo.jpg"],
    site: "@inspiretechnosolution",
  },
};

export default function GenerativeAIPage() {
  return <GenerativeAIClient />;
}
