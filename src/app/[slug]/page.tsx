
import { Metadata } from "next";
import { getSeoData } from "@/lib/seoService";
import ServicePageClient from "./servicePageClient";

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
      description: "Top -Tier Web & App Devlopment Services"
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

export default async function ServicePage({ params }: { params: { slug: string } }) {
  return <ServicePageClient />;
}
