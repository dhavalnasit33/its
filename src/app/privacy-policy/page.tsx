import { Metadata } from "next";
import Row from "@/components/Row";
import Section from "@/components/Section";
import PrivacyPolicy from "@/components/privacy-policy/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy | Inspire Techno Solution",
  description: "Learn how Inspire Techno Solution collects, uses, and safeguards your personal data when you visit our website or engage with our services.",
  alternates: {
    canonical: "https://inspiretechnosolution.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Inspire Techno Solution",
    description: "Learn how Inspire Techno Solution collects, uses, and safeguards your personal data when you visit our website or engage with our services.",
    url: "https://inspiretechnosolution.com/privacy-policy",
    type: "website",
    images: ["/feature-logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Inspire Techno Solution",
    description: "Learn how Inspire Techno Solution collects, uses, and safeguards your personal data when you visit our website or engage with our services.",
    images: ["/feature-logo.jpg"],
    site: "@inspiretechnosolution",
  },
};

export default async function PrivacyPage() {
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
        "name": "Privacy Policy",
        "item": "https://inspiretechnosolution.com/privacy-policy"
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
                className="mb-5 w-full text-center"
              >
                <h1 className="text-center text-4xl md:text-[42px] lg:text-[46px]/[130%] text-black tracking-[1.2px] font-semibold">
                   Privacy <span className="text-[#D68029]">Policy</span>
                </h1>
              </div>
              <div
                className="w-full text-center text-black font-medium text-[18px]/[30px] flex justify-center mt-4"
              >
                <p className="text-[18px]/[32px] tracking-[0.02em] font-normal max-w-full xl:max-w-4/5">
                    We value your trust and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                    data when you visit our website or engage with our services.
                </p>
              </div>
            </div>
        </Row>
    </Section>
    <PrivacyPolicy />
    </>
  );
}