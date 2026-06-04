import { Metadata } from "next";
import apiService from "@/lib/apiService";
import { Blog, SingleResponse } from "@/types";
import { notFound, redirect } from "next/navigation";
import BlogDetailPageClient from "./blogDetailPageClient";

// ✅ Notice the change: params is Promise
type Props = {
  params: Promise<{ slug: string }>;
};

// Pre-generate static params
export async function generateStaticParams() {
  try {
    const apiUrl = API_BASE_URL || "https://itsbackend-production.up.railway.app";
    const res = await fetch(`${apiUrl}/api/blogs/slugs`);
    const response = await res.json();

    if (response.success && Array.isArray(response.data)) {
      return response.data
        .map((item: unknown) => {
          if (typeof item === "string") {
            return { slug: item };
          }
          if (
            item &&
            typeof item === "object" &&
            "slug" in item &&
            typeof (item as { slug: unknown }).slug === "string"
          ) {
            return { slug: (item as { slug: string }).slug };
          }
          return null;
        })
        .filter((item: { slug: string } | null): item is { slug: string } => item !== null);
    }
  } catch (error) {
    console.error("Failed to fetch blog slugs for generateStaticParams:", error);
  }
  return [];
}

// Generate SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // ✅ await params

  try {
    const res = await apiService<SingleResponse<Blog>>(
      `/blogs/slug/${encodeURIComponent(slug)}`
    );
    const blog = res.data;

    if (!blog) {
      return { title: "Blog Post | Inspire Techno Solution" };
    }

    return {
      title: blog.seo_title || blog.details.title.replace(/<[^>]*>/g, ""),
      description:
        blog.meta_description ||
        blog.details.description.replace(/<[^>]*>/g, "").substring(0, 160),
      keywords: blog.seo_keyphrase
        ? blog.seo_keyphrase.split(",").map((k) => k.trim())
        : [],
      openGraph: {
        title: blog.seo_title || blog.details.title.replace(/<[^>]*>/g, ""),
        description:
          blog.meta_description ||
          blog.details.description.replace(/<[^>]*>/g, "").substring(0, 160),
        images: [blog.cover_image || blog.image || "/default-og-image.png"],
      },
    };
  } catch (error) {
    return { title: "Blog Post | Inspire Techno Solution" };
  }
}

import { getNavigationStructure } from "@/lib/navigationService";
import { API_BASE_URL } from "@/config";

// ✅ Fix BlogPage too
export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const nav = await getNavigationStructure();
  const blogLink = nav.mainNav.find((link) => link.systemIdentifier === "blog");
  const currentBlogSlug = blogLink?.slug || "blog";

  // If the current slug for the main Blog page is not "blog", redirect to the new route
  if (currentBlogSlug !== "blog") {
    redirect(`/${currentBlogSlug}/${slug}`);
  }

  try {
    const res = await apiService<SingleResponse<Blog>>(
      `/blogs/slug/${encodeURIComponent(slug)}`
    );
    const blog = res.data;
    if (!blog) notFound();

    // Avoid server-side HTML parsing to keep runtime compatible on Netlify.
    return (
      <BlogDetailPageClient
        blog={blog}
        tocItems={[]}
        processedContent={blog.details.answerOrDetails || ""}
      />
    );

  } catch (error) {
    console.error("Failed to fetch blog:", error);
    notFound();
  }
}
