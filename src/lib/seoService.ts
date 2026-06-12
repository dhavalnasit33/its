import { SingleResponse } from "@/types";
import apiService from "@/lib/apiService";

export interface SeoData {
  _id: string;
  title: string;
  slug: string;
  seo_keyphrase?: string;
  seo_title?: string;
  meta_description?: string;
  cover_image?: string;
  systemIdentifier?: string | null;
  linkedType?: string;
  linkedPage?: string | null;
}

export interface YoastSeoData {
  _id: string;
  seo_keyphrase?: string;
  seo_title?: string;
  meta_description?: string;
  cover_image?: string;
  page_description?: string;
  googletags?: string;
}

export async function getYoastSeoData(): Promise<YoastSeoData | null> {
  try {
    const response = await apiService<{ success: boolean; data: YoastSeoData }>(
      "/yoast-seo/public",
      {
        next: { revalidate: 3600 }, // Cache for 60 min
      }
    );
    return response.success ? response.data : null;
  } catch (error) {
    console.error("❌ Yoast SEO Error:", error);
    return null;
  }
}

export async function getSeoData(slug: string): Promise<SeoData | null> {
  if (!slug) return null; // ✅ block empty

  try {
    const response = await apiService<SingleResponse<SeoData>>(
      `/seo-manager/slug/${slug}`,
      {
        next: { revalidate: 60 },
      }
    );

    const seo = response.success ? response.data : null;

    // If no page-specific SEO data is found, fallback to Yoast SEO data
    if (!seo || (!seo.seo_title && !seo.meta_description)) {
      const yoast = await getYoastSeoData();
      if (yoast) {
        return {
          _id: yoast._id,
          title: yoast.seo_title || "",
          slug: slug,
          seo_keyphrase: yoast.seo_keyphrase || "",
          seo_title: yoast.seo_title || "",
          meta_description: yoast.meta_description || "",
          cover_image: yoast.cover_image || "",
          systemIdentifier: null,
          linkedType: "yoast-fallback",
          linkedPage: null,
        };
      }
    }

    return seo;
  } catch (error) {
    console.error(`❌ SEO Error for ${slug}:`, error);
    // Fallback on error too
    const yoast = await getYoastSeoData();
    if (yoast) {
      return {
        _id: yoast._id,
        title: yoast.seo_title || "",
        slug: slug,
        seo_keyphrase: yoast.seo_keyphrase || "",
        seo_title: yoast.seo_title || "",
        meta_description: yoast.meta_description || "",
        cover_image: yoast.cover_image || "",
        systemIdentifier: null,
        linkedType: "yoast-fallback",
        linkedPage: null,
      };
    }
    return null;
  }
}
