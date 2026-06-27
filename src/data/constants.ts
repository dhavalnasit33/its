import type {
  AiTool,
  TimelineStep,
  AiSolution,
  Industry,
  ResultStat, 
  FAQ,
} from "../types";

export const AI_TOOLS: AiTool[] = [
  { name: "ChatGPT", logo: "/ai-strategy/chatgpt.svg" },
  { name: "Claude", logo: "/ai-strategy/claude.svg" },
  { name: "Gemini", logo: "/ai-strategy/gemini.svg" },
  { name: "Grok", logo: "/ai-strategy/grok.svg" },
  { name: "Meta", logo: "/ai-strategy/meta.svg" },
  {name:"Deepseek", logo:"/ai-strategy/deepseek.svg"},
  {name:"Grok", logo:"/ai-strategy/grok.svg"},
  { name: "Perplexity", logo: "/ai-strategy/perplexity.svg" },
  { name: "Mistral AI", logo: "/ai-strategy/mistral.svg" },
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    number: "01",
    title: "Discovery & Understanding",
    description:
      "We study your business challenges, goals, and current systems to build a complete picture.",
  },
  {
    number: "02",
    title: "Opportunity Assessment",
    description:
      "We identify high-impact AI opportunities that deliver maximum ROI for your business.",
  },
  {
    number: "03",
    title: "Strategy & Roadmap",
    description:
      "We create a clear AI strategy and actionable implementation plan tailored to your goals.",
  },
  {
    number: "04",
    title: "Proof of Concept (PoC)",
    description:
      "We build and validate AI prototypes to ensure feasibility before full deployment.",
  },
  {
    number: "05",
    title: "Implementation",
    description:
      "We develop, integrate and deploy AI solutions into your business with minimal disruption.",
  },
  {
    number: "06",
    title: "Optimization & Support",
    description:
      "We continuously monitor, optimize and scale your AI solution for sustained performance.",
  },
];

export const AI_SOLUTIONS: AiSolution[] = [
  {
    icon: "/ai-strategy/solutions/readiness.svg",
    title: "AI Readiness Assessment",
    description: "Evaluate your business readiness for AI adoption with a detailed gap analysis.",
  },
  {
    icon: "/ai-strategy/solutions/strategy.svg",
    title: "AI Strategy & Roadmap",
    description: "Build a customized AI strategy aligned with your business goals and timelines.",
  },
  {
    icon: "/ai-strategy/solutions/usecase.svg",
    title: "Use Case Discovery",
    description: "Identify and prioritize AI use cases with the highest impact and feasibility.",
  },
  {
    icon: "/ai-strategy/solutions/data.svg",
    title: "Data Strategy & Engineering",
    description: "Design data architecture and pipelines for AI success at scale.",
  },
  {
    icon: "/ai-strategy/solutions/llm.svg",
    title: "LLM & GenAI Consulting",
    description: "Leverage LLMs to create intelligent and transformative solutions for your business.",
  },
  {
    icon: "/ai-strategy/solutions/automation.svg",
    title: "Automation Planning",
    description: "Workflow automation to boost productivity and efficiency across your operations.",
  },
  {
    icon: "/ai-strategy/solutions/model.svg",
    title: "AI Model Development & Training",
    description: "Build and fine-tune AI models tailored to your specific business needs.",
  },
  {
    icon: "/ai-strategy/solutions/poc.svg",
    title: "Proof of Concept (PoC)",
    description: "Validate ideas quickly with scalable prototypes before full-scale development.",
  },
  {
    icon: "/ai-strategy/solutions/mlops.svg",
    title: "MLOps & Deployment",
    description: "End-to-end deployment and monitoring of AI models in production environments.",
  },
  {
    icon: "/ai-strategy/solutions/support.svg",
    title: "Ongoing Support & Optimization",
    description: "Continuous support to improve and scale your AI solution post-deployment.",
  },
];



export const RESULT_STATS: ResultStat[] = [
  { value: "500", suffix: "+", label: "Projects Delivered", icon: "/ai-strategy/results/projects.svg" },
  { value: "98", suffix: "%", label: "Client Satisfaction", icon: "/ai-strategy/results/satisfaction.svg" },
  { value: "60", suffix: "%+", label: "Increase in Productivity", icon: "/ai-strategy/results/productivity.svg" },
  { value: "40", suffix: "%", label: "Cost Reduction on Average", icon: "/ai-strategy/results/cost.svg" },
];



export const FAQS: FAQ[] = [
  {
    question: "What is AI strategy consulting?",
    answer:
      "AI strategy consulting helps businesses identify the right AI opportunities, define a clear implementation roadmap, and build AI solutions that drive measurable outcomes. We align technology with your specific business goals.",
  },
  {
    question: "How long does it take to build an AI roadmap?",
    answer:
      "A typical AI roadmap engagement takes 3–6 weeks depending on the complexity of your business. This includes discovery, opportunity assessment, prioritization, and roadmap documentation.",
  },
  {
    question: "Do you work with small businesses?",
    answer:
      "Absolutely. We work with businesses of all sizes — from startups exploring their first AI use case to large enterprises scaling existing AI systems. Our approach is always tailored to your stage and budget.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We work with the full spectrum of AI technologies including OpenAI, Claude, Gemini, LangChain, TensorFlow, PyTorch, and cloud platforms like AWS, GCP, and Azure. We recommend the best stack for your specific needs.",
  },
  {
    question: "Will I get support after deployment?",
    answer:
      "Yes. We provide ongoing support and optimization services post-deployment. Our team continuously monitors, tunes, and scales your AI solution to ensure it keeps delivering value.",
  },
];



export const FOOTER_STATS = [
  { value: "12+", label: "Glorious Years" },
  { value: "40+", label: "Happy Clients" },
  { value: "750+", label: "Projects Delivered" },
  { value: "20+", label: "Professionals" },
];
