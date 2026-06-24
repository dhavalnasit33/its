import { Metadata } from "next";
import { getSeoData } from "@/lib/seoService";
import { notFound } from "next/navigation";

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

  // Hardcoded overrides for Privacy Policy and Terms & Conditions fallbacks
  if (slug === "privacy-policy") {
    return {
      title: "Privacy Policy | Inspire Techno Solution",
      description: "Learn how Inspire Techno Solution collects, uses, and safeguards your personal data when you visit our website or engage with our services.",
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        title: "Privacy Policy | Inspire Techno Solution",
        description: "Learn how Inspire Techno Solution collects, uses, and safeguards your personal data when you visit our website or engage with our services.",
        url: pageUrl,
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
  }

  if (slug === "terms-condition") {
    return {
      title: "Terms & Conditions | Inspire Techno Solution",
      description: "Read the Terms & Conditions governing your access and use of Inspire Techno Solution's website, products, and services.",
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        title: "Terms & Conditions | Inspire Techno Solution",
        description: "Read the Terms & Conditions governing your access and use of Inspire Techno Solution's website, products, and services.",
        url: pageUrl,
        type: "website",
        images: ["/feature-logo.jpg"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Terms & Conditions | Inspire Techno Solution",
        description: "Read the Terms & Conditions governing your access and use of Inspire Techno Solution's website, products, and services.",
        images: ["/feature-logo.jpg"],
        site: "@inspiretechnosolution",
      },
    };
  }

  if (!seoData) {
    const formattedSlug = slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    const defaultTitle = `${formattedSlug} Services | Inspire Techno Solution`;
    const defaultDesc = `Professional ${formattedSlug} services by Inspire Techno Solution. We deliver high-quality, scalable, and secure web and mobile app development solutions.`;
    return {
      title: defaultTitle,
      description: defaultDesc,
      keywords: [formattedSlug, "Web Development", "Mobile App Development", "Software Development", "Inspire Techno Solution"],
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        title: defaultTitle,
        description: defaultDesc,
        url: pageUrl,
        type: "website",
        images: ["/feature-logo.jpg"],
      },
      twitter: {
        card: "summary_large_image",
        title: defaultTitle,
        description: defaultDesc,
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

import { API_BASE_URL } from "@/config";

export const revalidate = 3600;

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seoData = await getSeoData(slug);

  if (!seoData) {
    notFound();
  }

  // Common BreadcrumbList schema
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
        "name": seoData.title,
        "item": `https://inspiretechnosolution.com/${slug}`
      }
    ]
  };

  const renderWithSchemas = (element: React.ReactNode, extraSchemas: any[] = []) => {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {extraSchemas.filter(Boolean).map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {element}
      </>
    );
  };

  // 1. If this slug maps to a system identifier (core static page)
  if (seoData.systemIdentifier) {
    const displayTitle = seoData.seo_title || seoData.title;
    let component = null;

    let initialData: any = null;
    let initialExtraData: any = null;
    let initialThirdData: any = null;

    if (seoData.systemIdentifier === "about-us") {
      try {
        const res = await fetch(`${API_BASE_URL}/about-us`, { next: { revalidate: 3600 } });
        if (res.ok) {
          const json = await res.json();
          initialData = json.data || json;
        }
      } catch (e) {
        console.error("SSR about-us fetch failed:", e);
      }
    } else if (seoData.systemIdentifier === "career") {
      try {
        const [resContent, resPositions] = await Promise.all([
          fetch(`${API_BASE_URL}/career-content`, { next: { revalidate: 3600 } }),
          fetch(`${API_BASE_URL}/opennig-position`, { next: { revalidate: 3600 } }),
        ]);
        if (resContent.ok) {
          const json = await resContent.json();
          initialData = json.data || json;
        }
        if (resPositions.ok) {
          const json = await resPositions.json();
          initialExtraData = json.data || json;
        }
      } catch (e) {
        console.error("SSR career fetch failed:", e);
      }
    } else if (seoData.systemIdentifier === "hire") {
      try {
        const res = await fetch(`${API_BASE_URL}/hire-main-page`, { next: { revalidate: 3600 } });
        if (res.ok) {
          const json = await res.json();
          initialData = json.data || json;
        }
      } catch (e) {
        console.error("SSR hire fetch failed:", e);
      }
    } else if (seoData.systemIdentifier === "portfolio") {
      try {
        const [resContent, resCategories, resWorks] = await Promise.all([
          fetch(`${API_BASE_URL}/portfolio-content`, { next: { revalidate: 3600 } }),
          fetch(`${API_BASE_URL}/portfolio-category`, { next: { revalidate: 3600 } }),
          fetch(`${API_BASE_URL}/creative-work?page=1&limit=12`, { next: { revalidate: 3600 } }),
        ]);
        if (resContent.ok) {
          const json = await resContent.json();
          initialData = json.data || json;
        }
        if (resCategories.ok) {
          const json = await resCategories.json();
          initialExtraData = json.data || json;
        }
        if (resWorks.ok) {
          const json = await resWorks.json();
          initialThirdData = json.data || json;
        }
      } catch (e) {
        console.error("SSR portfolio fetch failed:", e);
      }
    } else if (seoData.systemIdentifier === "training") {
      try {
        const res = await fetch(`${API_BASE_URL}/training-main-page`, { next: { revalidate: 3600 } });
        if (res.ok) {
          const json = await res.json();
          initialData = json.data || json;
        }
      } catch (e) {
        console.error("SSR training fetch failed:", e);
      }
    }

    switch (seoData.systemIdentifier) {
      case "about-us":
        component = <AboutClient title={displayTitle} initialData={initialData} />;
        break;
      case "blog":
        component = <BlogPageClient />;
        break;
      case "career":
        component = <CareerClient initialData={initialData} initialPositions={initialExtraData} />;
        break;
      case "contact":
        component = <ContactClient />;
        break;
      case "hire":
        component = <HireDevelopersPage initialData={initialData} />;
        break;
      case "portfolio":
        component = <PortfolioClient initialData={initialData} initialCategories={initialExtraData} initialWorks={initialThirdData} />;
        break;
      case "services":
        component = <OurServicesClient />;
        break;
      case "training":
        component = <TrainingPageClient initialData={initialData} />;
        break;
      default:
        break;
    }
    if (component) {
      return renderWithSchemas(component);
    }
  }

  // 2. If it is linked to a Service page details
  if (seoData.linkedType === "service") {
    let serviceData = null;
    let serviceSchema = null;
    let faqSchema = null;

    try {
      const response = await fetch(`${API_BASE_URL}/service/slug/${slug}`, {
        next: { revalidate: 3600 }
      });
      if (response.ok) {
        const json = await response.json();
        serviceData = json?.data || json;
      }
    } catch (error) {
      console.error("Error fetching service details in SSR:", error);
    }

    serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": seoData.seo_title || seoData.title,
      "description": seoData.meta_description || "",
      "url": `https://inspiretechnosolution.com/${slug}`,
      "provider": {
        "@type": "Organization",
        "name": "Inspire Techno Solution",
        "url": "https://inspiretechnosolution.com",
        "logo": "https://inspiretechnosolution.com/logo.png"
      },
      "areaServed": "Worldwide"
    };

    if (serviceData?.faqs && serviceData.faqs.length > 0) {
      faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": serviceData.faqs.map((faq: any) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };
    }

    return renderWithSchemas(
      <ServicePageClient initialData={serviceData || undefined} />,
      [serviceSchema, faqSchema]
    );
  }

  // 3. If it is an independent custom page (e.g. Privacy Policy)
  if (seoData.linkedType === "independent") {
    let pageData = null;
    try {
      const response = await fetch(`${API_BASE_URL}/page/public/slug/${slug}`, {
        next: { revalidate: 3600 }
      });
      if (response.ok) {
        const json = await response.json();
        pageData = json?.data || json;
      }
    } catch (error) {
      console.error("Error fetching generic page details in SSR:", error);
    }

    if (!pageData) {
      notFound();
    }

    return renderWithSchemas(<GenericPageClient initialData={pageData} />);
  }

  notFound();
}
