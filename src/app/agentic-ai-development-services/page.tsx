import { Metadata } from "next";
import AgenticAIClient from "./AgenticAIClient";

export const metadata: Metadata = {
  title: "Agentic AI Development Services | Autonomous AI Agents & Workforce",
  description:
    "Build intelligent, autonomous AI agents that reason, plan, execute multi-step workflows, collaborate across departments, and integrate with enterprise tools.",
  keywords: [
    "Agentic AI Development Services",
    "Autonomous AI Agents",
    "AI Workforce",
    "Multi-Agent Collaboration",
    "LangGraph Development",
    "CrewAI Solutions",
    "Model Context Protocol (MCP)",
    "Enterprise AI Agents",
  ],
  alternates: {
    canonical: "https://inspiretechnosolution.com/agentic-ai-development-services",
  },
  openGraph: {
    title: "Agentic AI Development Services | Autonomous AI Agents",
    description:
      "Build intelligent AI agents that can reason, plan, make decisions, use enterprise tools, and execute complex workflows autonomously.",
    url: "https://inspiretechnosolution.com/agentic-ai-development-services",
    type: "website",
    images: ["https://inspiretechnosolution.com/feature-logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic AI Development Services | Autonomous AI Workforce",
    description:
      "Build intelligent AI agents that execute complex workflows autonomously.",
    images: ["https://inspiretechnosolution.com/feature-logo.jpg"],
    site: "@inspiretechnosolution",
  },
};

export default function AgenticAIPage() {
  return <AgenticAIClient />;
}
