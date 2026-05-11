import { Metadata } from "next";
import { getSeoData } from "@/lib/seoService"; 
import HirepageTechnologClient from "./HirepageTechnologClient";

type Props = {
    params: Promise<{ slug: string }>; // 👈 mark as async
};

// This function generates the specific SEO for the service sub-page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params; // 👈 await params here
    const seoData = await getSeoData(slug);
    console.log("🚀 ~ generateMetadata ~ seoData:", seoData)

    if (!seoData) {
        return { title: "Hire Developer | Inspire Techno Solution" };
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

// This is your new page component
export default async function HirepageTechnolog({ params }: { params: { slug: string } }) {
    // Here params is still sync ✅
    return <HirepageTechnologClient />;
}
