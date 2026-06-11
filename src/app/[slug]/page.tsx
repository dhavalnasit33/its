
import { Metadata } from "next";
import { getSeoData } from "@/lib/seoService";
import NotFoundPage from "@/components/NotFoundPage";

import ServicePageClient from "./servicePageClient";
import AboutClient from "@/app/about-us/aboutusClient";
import CareerClient from "@/app/career/careerClient";
import ContactClient from "@/app/contact/contactClient";
import FaqsClient from "@/app/faqs/faqsClient";
import BlogPageClient from "@/app/blog/blogPageClient";
import PortfolioClient from "@/app/our-portfolio/portfolioClient";
import OurServicesClient from "@/components/our-services/ourServicesClient";
import TrainingPageClient from "@/app/training/trainingPageClient";
import HireDevelopersPage from "@/app/hire/HireDevelopersPageClient";
import GenericPageClient from "./genericPageClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; 
  const seoData = await getSeoData(slug);
  console.log("🚀 ~ generateMetadata ~ seoData:", seoData)

  if (!seoData) {
    return {
      title: "Our Service | Inspire Techno Solution",
      description: "Top-Tier Web & App Development Services"
    };
  }

  return {
    title: seoData.seo_title || seoData.title,
    description: seoData.meta_description,
    keywords: seoData.seo_keyphrase
      ? seoData.seo_keyphrase.split(",").map((k) => k.trim())
      : [],
    openGraph: {
      title: seoData.seo_title || seoData.title,
      description: seoData.meta_description || "",
      images: [seoData.cover_image || "/default-og-image.png"],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seoData = await getSeoData(slug);

  if (!seoData) {
    return <NotFoundPage />;
  }

  // 1. If this slug maps to a system identifier (core static page)
  if (seoData.systemIdentifier) {
    const displayTitle = seoData.seo_title || seoData.title;
    switch (seoData.systemIdentifier) {
      case "about-us":
        return <AboutClient title={displayTitle} />;
      case "career":
        return <CareerClient />;
      case "contact":
        return <ContactClient />;
      // case "faqs":
      //   return <FaqsClient />;
      case "blog":
        return <BlogPageClient />;
      case "portfolio":
        return <PortfolioClient />;
      case "services":
        return <OurServicesClient />;
      case "training":
        return <TrainingPageClient />;
      case "hire":
        return <HireDevelopersPage />;
      default:
        break;
    }
  }

  // 2. If it is linked to a Service page details
  if (seoData.linkedType === "service") {
    return <ServicePageClient />;
  }

  // 3. If it is an independent custom page (e.g. Privacy Policy)
  if (seoData.linkedType === "independent") {
    return <GenericPageClient />;
  }

  return <NotFoundPage />;
}
