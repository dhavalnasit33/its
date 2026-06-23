import { Metadata } from "next";
import { getSeoData } from "@/lib/seoService";
import HomeClient from "./home/HomeClient";
import apiService from "@/lib/apiService";
import { HomePageData, SingleResponse } from "@/types";

// This is the server-side function to generate metadata
export async function generateMetadata(): Promise<Metadata> {
  // Pass an empty string for the homepage
  const seoData = await getSeoData("homepage");
  console.log("🚀 ~ generateMetadata ~ seoData:", seoData)

  // Fallback if the API fails
  if (!seoData) {
    return { title: "Home | Inspire Techno Solution" };
  }

  // Return dynamic metadata from the API
  const pageUrl = "https://inspiretechnosolution.com";
  return {
    title: seoData.seo_title || seoData.title,
    description: seoData.meta_description,
    keywords: seoData.seo_keyphrase ? seoData.seo_keyphrase.split(',').map(k => k.trim()) : [],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: seoData.seo_title || seoData.title,
      description: seoData.meta_description || "",
      url: pageUrl,
      type: "website",
      images: [seoData.cover_image || '/feature-logo.jpg'],
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.seo_title || seoData.title,
      description: seoData.meta_description || "",
      images: [seoData.cover_image || '/feature-logo.jpg'],
      site: "@inspiretechnosolution",
    },
  };
}

export const revalidate = 3600;

// This is the server component for the page route
export default async function HomePage() {
  let homepageData: HomePageData | null = null;
  try {
    const response = await apiService<SingleResponse<HomePageData>>("/homepage");
    if (response.success) {
      homepageData = response.data;
    }
  } catch (error) {
    console.error("Error fetching homepage data on server:", error);
  }

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Inspire Techno Solution",
    "url": "https://inspiretechnosolution.com",
    "logo": "https://inspiretechnosolution.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/inspiretechnosolution",
      "https://twitter.com/inspiretechno",
      "https://www.linkedin.com/company/inspire-techno-solution"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://inspiretechnosolution.com"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HomeClient initialData={homepageData || undefined} />
    </>
  );
}