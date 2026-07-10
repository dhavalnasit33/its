"use client";

import React from "react";
import CommonFAQ from "@/components/FAQ";

const STRATEGY_FAQS = [
  {
    question: "What is an AI Readiness Audit?",
    answer:
      "An AI Readiness Audit is a comprehensive evaluation of your organization's data infrastructure, legacy technology stack, operational workflows, security systems, and employee skills. We analyze these areas to determine how prepared your business is to deploy and scale generative AI or automated agent pipelines, highlighting critical gaps that must be addressed first.",
  },
  {
    question: "How does ITS identify which processes are best suited for AI?",
    answer:
      "We use our proprietary value-difficulty framework. We audit your workflows to map tasks based on volume, repetitiveness, error rates, and manual lookup hours. We prioritize high-volume, structured tasks (like document search, lead routing, customer ticket replies) that offer high financial return (ROI) with minimal workflow disruption.",
  },
  {
    question: "What security and regulatory compliance frameworks do you support?",
    answer:
      "Data sovereignty and compliance are central to our consulting services. We design solutions aligned with GDPR, HIPAA, SOC 2, and CCPA. Depending on your regulatory needs, we map architecture for private cloud deployments (AWS, Azure, GCP), localized database hosting, and secure PII scrubbing filters before data touches any language models.",
  },
  {
    question: "How do we calculate the return on investment (ROI) for an AI implementation?",
    answer:
      "We model ROI across two main dimensions: direct cost reduction (reducing ticket handling times, automating customer channels) and productivity multipliers (hours saved per operator searching documents, automating pipeline updates). Most businesses see operational overhead reductions of 40% to 70% within the first 3 months of deploying custom workflows.",
  },
  {
    question: "Can we transition from proprietary models (like OpenAI) to custom/open-source LLMs later?",
    answer:
      "Yes, absolutely. We intentionally design model-flexible (LLM-agnostic) architectures. By isolating your business database and prompt management layers from the model API, you can seamlessly swap between proprietary models (such as GPT-4o or Claude 3.5) and open-source models (such as Llama 3 or Mistral) without needing to rebuild your systems.",
  },
  {
    question: "How long does a typical AI Strategy consultation engagement take?",
    answer:
      "A standard strategy engagement ranges from 3 to 6 weeks. This includes the initial operational audit, interactive value modeling sessions, technology stacking workshops, and the final delivery of your custom AI implementation roadmap.",
  },
];

export default function FAQ() {
  return (
    <CommonFAQ 
      faqs={STRATEGY_FAQS} 
      title="AI Strategy & Consulting FAQs"
      sideTitle="Still have questions?"
      sideSubtitle="Let's align your AI roadmap..."
    />
  );
}
