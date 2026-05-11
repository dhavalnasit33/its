import { Metadata } from "next";
import { getSeoData } from "@/lib/seoService"; // Import the client component
import HomeClient from "./home/HomeClient";

// This is the server-side function to generate metadata
export async function generateMetadata(): Promise<Metadata> {
  // Pass an empty string for the homepage
  const seoData = await getSeoData("homepage");
  console.log("🚀 ~ generateMetadata ~ seoData:", seoData)

  // Fallback if the API fails
  if (!seoData) {
    return { title: "Home | Inspire Techno Solution" };
    // return {title: "abc"}
  }

  // Return dynamic metadata from the API
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

// This is the server component for the page route
export default function HomePage() {
  // It simply renders the client component that holds the UI
  return <HomeClient />;
}