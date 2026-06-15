import { Metadata } from "next";
import { getSeoData } from "@/lib/seoService";
import NotFoundPage from "@/components/NotFoundPage";

import ServicePageClient from "./servicePageClient";
import AboutClient from "@/app/about-us/aboutusClient";
import CareerClient from "@/app/career/careerClient";
import ContactClient from "@/app/contact/contactClient";
// import FaqsClient from "@/app/faqs/faqsClient";
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
  console.log("seo data ", seoData);

  console.log("METADATA PAGE:", slug);

  const pageUrl = `https://inspiretechnosolution.com/${slug}`;
  if (!seoData) {
    return {
      title: "Our Service | Inspire Techno Solution",
      description: "Top-Tier Web & App Development Services",
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        title: "Our Service | Inspire Techno Solution",
        description: "Top-Tier Web & App Development Services",
        url: pageUrl,
        type: "website",
        images: ["/feature-logo.jpg"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Our Service | Inspire Techno Solution",
        description: "Top-Tier Web & App Development Services",
        images: ["/feature-logo.jpg"],
        site: "@inspiretechnosolution",
      },
    };
  }
  return {
    title: seoData.seo_title || seoData.title,
    description: seoData.meta_description,
    keywords: seoData.seo_keyphrase
      ? seoData.seo_keyphrase.split(",").map((k) => k.trim())
      : [],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: seoData.seo_title || seoData.title,
      description: seoData.meta_description || "",
      url: pageUrl,
      type: "website",
      images: [seoData.cover_image || "/feature-logo.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.seo_title || seoData.title,
      description: seoData.meta_description || "",
      images: [seoData.cover_image || "/feature-logo.jpg"],
      site: "@inspiretechnosolution",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
      case "blog":
        return <BlogPageClient />;
      case "career":
        return <CareerClient />;
      case "contact":
        return <ContactClient />;
      case "hire":
        return <HireDevelopersPage />;
      case "portfolio":
        return <PortfolioClient />;
      case "services":
        return <OurServicesClient />;
      case "training":
        return <TrainingPageClient />;
      // case "faqs":
      //   return <FaqsClient />;
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
