import { Metadata } from "next";
import { getSeoData } from "@/lib/seoService";
import AboutClient from "./aboutusClient";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoData("about-us");

  if (!seoData) {
    return { title: "About Us | Inspire Techno Solution" };
  }

  return {
    title: seoData.seo_title || seoData.title,
    description: seoData.meta_description,
    keywords: seoData.seo_keyphrase ? seoData.seo_keyphrase.split(',').map(k => k.trim()) : [],
    openGraph: {
      title: seoData.seo_title || seoData.title,
      description: seoData.meta_description || "",
      images: [seoData.cover_image || '/default-og-image.png'],
    },
  };
}

export default async function About() {
  // 1. SEO Data fetch karo
  const seoData = await getSeoData("about-us");

  // 2. Title nirdharit karo
  const displayTitle = seoData?.seo_title || seoData?.title || "About Us";

  // 3. Client component ne title pass karo
  return <AboutClient title={displayTitle} />;
}