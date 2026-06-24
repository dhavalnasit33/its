import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNavigationStructure } from "@/lib/navigationService";
import { getSeoData } from "@/lib/seoService";
import apiService from "@/lib/apiService";
import { Blog, SingleResponse } from "@/types";
import HirepageTechnologClient from "@/app/hire/[slug]/HirepageTechnologClient";
import BlogDetailPageClient from "@/app/blog/[slug]/blogDetailPageClient";

type Props = {
  params: Promise<{ slug: string; subSlug: string }>;
};

async function getSystemIdentifier(parentSlug: string): Promise<string | null> {
  const nav = await getNavigationStructure();
  const mainNav = nav.mainNav || [];
  const match = mainNav.find((link) => link.slug === parentSlug);
  return match?.systemIdentifier || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: parentSlug, subSlug: slug } = await params;
  const systemIdentifier = await getSystemIdentifier(parentSlug);

  if (systemIdentifier === "hire") {
    const seoData = await getSeoData(slug);
    const pageUrl = `https://inspiretechnosolution.com/${parentSlug}/${slug}`;
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
        images: [seoData.cover_image || "/default-og-image.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: seoData.seo_title || seoData.title,
        description: seoData.meta_description || "",
        images: [seoData.cover_image || "/default-og-image.png"],
        site: "@inspiretechnosolution",
      },
    };
  }

  if (systemIdentifier === "blog") {
    const pageUrl = `https://inspiretechnosolution.com/${parentSlug}/${slug}`;

    // Hardcoded overrides for duplicate metadata blogs
    if (slug === "node-streams-a-sneak-peak") {
      return {
        title: "Node Streams: A Sneak-Peek | ITS Blog",
        description: "Learn how to work with Node.js streams, including read/write streams, piping data, and optimization techniques for handling large datasets.",
        alternates: {
          canonical: pageUrl,
        },
        openGraph: {
          title: "Node Streams: A Sneak-Peek | ITS Blog",
          description: "Learn how to work with Node.js streams, including read/write streams, piping data, and optimization techniques for handling large datasets.",
          url: pageUrl,
          type: "article",
          images: ["/feature-logo.jpg"],
        },
        twitter: {
          card: "summary_large_image",
          title: "Node Streams: A Sneak-Peek | ITS Blog",
          description: "Learn how to work with Node.js streams, including read/write streams, piping data, and optimization techniques for handling large datasets.",
          images: ["/feature-logo.jpg"],
          site: "@inspiretechnosolution",
        },
      };
    }

    if (slug === "best-way-to-register-common-components-globally-in-vuejs") {
      return {
        title: "Best Way to Register Common Components Globally in VueJS | ITS Blog",
        description: "Discover how to register reusable VueJS components globally for cleaner code, better maintainability, and streamlined development workflows.",
        alternates: {
          canonical: pageUrl,
        },
        openGraph: {
          title: "Best Way to Register Common Components Globally in VueJS | ITS Blog",
          description: "Discover how to register reusable VueJS components globally for cleaner code, better maintainability, and streamlined development workflows.",
          url: pageUrl,
          type: "article",
          images: ["/feature-logo.jpg"],
        },
        twitter: {
          card: "summary_large_image",
          title: "Best Way to Register Common Components Globally in VueJS | ITS Blog",
          description: "Discover how to register reusable VueJS components globally for cleaner code, better maintainability, and streamlined development workflows.",
          images: ["/feature-logo.jpg"],
          site: "@inspiretechnosolution",
        },
      };
    }

    try {
      const res = await apiService<SingleResponse<Blog>>(
        `/blogs/slug/${encodeURIComponent(slug)}`
      );
      const blog = res.data;
      if (!blog) {
        return {
          title: "Blog Post | Inspire Techno Solution",
          alternates: {
            canonical: pageUrl,
          },
          openGraph: {
            title: "Blog Post | Inspire Techno Solution",
            url: pageUrl,
            type: "article",
            images: ["/feature-logo.jpg"],
          },
          twitter: {
            card: "summary_large_image",
            title: "Blog Post | Inspire Techno Solution",
            images: ["/feature-logo.jpg"],
            site: "@inspiretechnosolution",
          },
        };
      }

      return {
        title: blog.seo_title || blog.details.title.replace(/<[^>]*>/g, ""),
        description:
          blog.meta_description ||
          blog.details.description.replace(/<[^>]*>/g, "").substring(0, 160),
        keywords: blog.seo_keyphrase
          ? blog.seo_keyphrase.split(",").map((k) => k.trim())
          : [],
        alternates: {
          canonical: pageUrl,
        },
        openGraph: {
          title: blog.seo_title || blog.details.title.replace(/<[^>]*>/g, ""),
          description:
            blog.meta_description ||
            blog.details.description.replace(/<[^>]*>/g, "").substring(0, 160),
          url: pageUrl,
          type: "article",
          images: [blog.cover_image || blog.image || "//feature-logo.jpg"],
        },
        twitter: {
          card: "summary_large_image",
          title: blog.seo_title || blog.details.title.replace(/<[^>]*>/g, ""),
          description:
            blog.meta_description ||
            blog.details.description.replace(/<[^>]*>/g, "").substring(0, 160),
          images: [blog.cover_image || blog.image || "/feature-logo.jpg"],
          site: "@inspiretechnosolution",
        },
      };
    } catch {
      return { title: "Blog Post | Inspire Techno Solution" };
    }
  }

  const pageUrl = `https://inspiretechnosolution.com/${parentSlug}/${slug}`;
  return {
    title: "Not Found | Inspire Techno Solution",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Not Found | Inspire Techno Solution",
      url: pageUrl,
      type: "website",
      images: ["/feature-logo.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Not Found | Inspire Techno Solution",
      images: ["/feature-logo.jpg"],
      site: "@inspiretechnosolution",
    },
  };
}

export default async function DynamicSubPage({ params }: Props) {
  const { slug: parentSlug, subSlug: slug } = await params;
  const systemIdentifier = await getSystemIdentifier(parentSlug);

  if (systemIdentifier === "hire") {
    const seoData = await getSeoData(slug);
    if (!seoData) {
      notFound();
    }
    const pageTitle = seoData.title || seoData.seo_title || `Hire ${slug.replace(/-/g, ' ')}`;

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
          "item": `https://inspiretechnosolution.com/${parentSlug}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": pageTitle,
          "item": `https://inspiretechnosolution.com/${parentSlug}/${slug}`
        }
      ]
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <HirepageTechnologClient subPageSlug={slug} />
      </>
    );
  }

  if (systemIdentifier === "blog") {
    try {
      const res = await apiService<SingleResponse<Blog>>(
        `/blogs/slug/${encodeURIComponent(slug)}`
      );
      const blog = res.data;
      if (!blog) notFound();

      let blogTitle = blog.seo_title || blog.details.title.replace(/<[^>]*>/g, "");
      if (slug === "node-streams-a-sneak-peak") {
        blogTitle = "Node Streams: A Sneak-Peek";
      } else if (slug === "best-way-to-register-common-components-globally-in-vuejs") {
        blogTitle = "Best Way to Register Common Components Globally in VueJS";
      }

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
            "name": "Blog",
            "item": `https://inspiretechnosolution.com/${parentSlug}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": blogTitle,
            "item": `https://inspiretechnosolution.com/${parentSlug}/${slug}`
          }
        ]
      };

      return (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
          <BlogDetailPageClient
            blog={blog}
            tocItems={[]}
            processedContent={blog.details.answerOrDetails || ""}
          />
        </>
      );
    } catch (error) {
      console.error("Failed to fetch blog in dynamic route:", error);
      notFound();
    }
  }

  notFound();
}
