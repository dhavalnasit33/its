import { Metadata } from "next";
import MCPServerClient from "./MCPServerClient";

export const metadata: Metadata = {
  title: "Custom MCP Server Development Services | Secure Enterprise AI Integration",
  description:
    "We design and build custom Model Context Protocol (MCP) servers for enterprise business systems, APIs, databases, CRMs, and autonomous AI agents.",
  keywords: [
    "Custom MCP Server Development",
    "Model Context Protocol Services",
    "Enterprise MCP Integration",
    "AI Tool Integration",
    "Claude MCP Server",
    "OpenAI MCP Development",
    "Secure AI Gateway",
    "Model Context Protocol Developers",
  ],
  alternates: {
    canonical: "https://inspiretechnosolution.com/mcp-server-development",
  },
  openGraph: {
    title: "Custom MCP Server Development Services | Secure AI Integration",
    description:
      "Design and build secure, enterprise-grade Model Context Protocol (MCP) servers connecting AI assistants with your business systems.",
    url: "https://inspiretechnosolution.com/mcp-server-development",
    type: "website",
    images: ["https://inspiretechnosolution.com/feature-logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom MCP Server Development Services | Inspire Techno Solution",
    description:
      "Enterprise Model Context Protocol (MCP) server development and secure AI integration.",
    images: ["https://inspiretechnosolution.com/feature-logo.jpg"],
    site: "@inspiretechnosolution",
  },
};

export default function MCPServerPage() {
  return <MCPServerClient />;
}
