import { Metadata } from "next";
import { getSeoData } from "@/lib/seoService";
import FaqsClient from "./faqsClient";

// This is the server
export async function generateMetadata(): Promise<Metadata> {

    const seoData = await getSeoData("faqs");
    console.log("🚀 ~ generateMetadata ~ seoData:", seoData)

    // Fallback if the API fails
    if (!seoData) {
        return { title: "FAQs | Inspire Techno Solution" };
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
export default function Faqs() {
    return <FaqsClient />;
}