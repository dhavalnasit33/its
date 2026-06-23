import { motion } from "framer-motion";
import Row from "@/components/Row";
import Section from "@/components/Section";
import SitemapSection from "@/components/sitemap/SitemapSection";
import { getNavigationStructure } from "@/lib/navigationService";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sitemap | Inspire Techno Solution",
  description: "Explore the sitemap of Inspire Techno Solution to navigate our services, company pages, careers, portfolios, and blogs.",
  alternates: {
    canonical: "https://inspiretechnosolution.com/sitemap",
  },
  openGraph: {
    title: "Sitemap | Inspire Techno Solution",
    description: "Explore the sitemap of Inspire Techno Solution to navigate our services, company pages, careers, portfolios, and blogs.",
    url: "https://inspiretechnosolution.com/sitemap",
    type: "website",
    images: ["/feature-logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sitemap | Inspire Techno Solution",
    description: "Explore the sitemap of Inspire Techno Solution to navigate our services, company pages, careers, portfolios, and blogs.",
    images: ["/feature-logo.jpg"],
    site: "@inspiretechnosolution",
  },
};

export default async function SitemapPage() {
  const navStructure = await getNavigationStructure();

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
        "name": "Sitemap",
        "item": "https://inspiretechnosolution.com/sitemap"
      }
    ]
  };

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
    <Section className="common_background_gradient blog_hero_section flex flex-col items-center justify-center gap-10 ">
        <Row className="flex z-20">
            <div className="flex flex-wrap w-full mx-auto justify-center items-center">
              <div
                // initial={{ opacity: 0, y: -50 }}
                // whileInView={{ opacity: 1, y: 0 }}
                // viewport={{ once: true, amount: 0.1 }}
                // transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-5 w-full text-center"
              >
                <h1 className="text-center text-4xl md:text-[42px] lg:text-[46px]/[130%] text-black tracking-[1.2px] font-semibold">
                  Website Sitemap: <span className="text-[#d68029]">Navigate</span> with Ease
                  {/* <span className="text-[#d68029]">
                    Inspire Techno Solution
                  </span>{" "}
                  <br />
                  Tech Blog */}
                </h1>
              </div>
              <div
                // initial={{ opacity: 0, y: 50 }}
                // whileInView={{ opacity: 1, y: 0 }}
                // viewport={{ once: true, amount: 0.1 }}
                // transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full text-center text-black font-medium text-[18px]/[30px] flex justify-center mt-4"
              >
                <p className="text-[18px]/[32px] tracking-[0.02em] font-normal max-w-full xl:max-w-4/5">
                  Discover everything in one place. Browse through our services, company pages, blog sections, and resources to quickly find what you need at 
                  <Link
                    href="/"
                    className="text-[#d68029] font-semibold underline mx-1"
                  >
                    Inspire Techno Solution
                  </Link>
                 .
                </p>
              </div>
            </div>
        </Row>
    </Section>

    <SitemapSection navStructure={navStructure} />
    </>
  );
}