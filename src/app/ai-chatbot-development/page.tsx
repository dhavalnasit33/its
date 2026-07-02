import { Metadata } from "next";
import AIChatbotClient from "./AIChatbotClient";

export const metadata: Metadata = {
  title: "AI Chatbot Development Services | Inspire Techno Solution",
  description:
    "We build intelligent AI chatbots powered by GPT, Claude, and Gemini to automate support, sales, and lead generation for enterprise growth.",
  keywords: [
    "AI Chatbot Development",
    "Enterprise Chatbot",
    "GPT Chatbot Solutions",
    "WhatsApp AI Bot",
    "Customer Support Automation",
    "Voice AI Assistant",
    "Custom LLM Chatbot",
    "AI Lead Generation",
  ],
  alternates: {
    canonical: "https://inspiretechnosolution.com/ai-chatbot-development",
  },
  openGraph: {
    title: "AI Chatbot Development Services | Inspire Techno Solution",
    description:
      "We design, build, and deploy enterprise AI chatbots and automation workflows to streamline operation processes and customer experiences.",
    url: "https://inspiretechnosolution.com/ai-chatbot-development",
    type: "website",
    images: ["/feature-logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Chatbot Development | Inspire Techno Solution",
    description:
      "Deploy intelligent conversational AI solutions powered by GPT, Claude, and custom LLMs.",
    images: ["/feature-logo.jpg"],
    site: "@inspiretechnosolution",
  },
};

export default function AIChatbotPage() {
  return <AIChatbotClient />;
}
