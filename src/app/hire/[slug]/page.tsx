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

    const pageUrl = `https://inspiretechnosolution.com/hire/${slug}`;
    if (!seoData) {
        return {
            title: "Hire Developer | Inspire Techno Solution",
            alternates: {
                canonical: pageUrl,
            },
            openGraph: {
                title: "Hire Developer | Inspire Techno Solution",
                url: pageUrl,
                type: "website",
                images: ["/feature-logo.jpg"],
            },
            twitter: {
                card: "summary_large_image",
                title: "Hire Developer | Inspire Techno Solution",
                images: ["/feature-logo.jpg"],
                site: "@inspiretechnosolution",
            },
        };
    }
    return {
        title: seoData.title || seoData.seo_title,
        description: seoData.meta_description,
        keywords: seoData.seo_keyphrase
            ? seoData.seo_keyphrase.split(",").map((k) => k.trim())
            : [],
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            title: seoData.title || seoData.seo_title,
            description: seoData.meta_description || "",
            url: pageUrl,
            type: "website",
            images: [seoData.cover_image || "/feature-logo.jpg"],
        },
        twitter: {
            card: "summary_large_image",
            title: seoData.title || seoData.seo_title,
            description: seoData.meta_description || "",
            images: [seoData.cover_image || "/feature-logo.jpg"],
            site: "@inspiretechnosolution",
        },
    };
}

import { notFound, redirect } from "next/navigation";
import { getNavigationStructure } from "@/lib/navigationService";

// This is your new page component
export default async function HirepageTechnolog({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const nav = await getNavigationStructure();
    const hireLink = nav.mainNav.find((link) => link.systemIdentifier === "hire");
    const currentHireSlug = hireLink?.slug || "hire";

    // If the current slug for the main Hire page is not "hire", redirect to the new route
    if (currentHireSlug !== "hire") {
        redirect(`/${currentHireSlug}/${slug}`);
    }

    const seoData = await getSeoData(slug);
    const pageTitle = seoData?.title || `Hire ${slug.replace(/-/g, ' ')}`;

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inspiretechnosolution.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Hire Developers",
          "item": "https://inspiretechnosolution.com/hire"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": pageTitle,
          "item": `https://inspiretechnosolution.com/hire/${slug}`
        }
      ]
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <HirepageTechnologClient />
      </>
    );
}
