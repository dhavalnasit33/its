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

export async function getSeoData(slug: string): Promise<SeoData | null> {
  if (!slug) return null; // ✅ block empty

  try {
    const response = await apiService<SingleResponse<SeoData>>(
      `/seo-manager/slug/${slug}`,
      {
        cache: "force-cache", // 🔥 IMPORTANT
      }
    );

    return response.success ? response.data : null;
  } catch (error) {
    console.error(`❌ SEO Error for ${slug}:`, error);
    return null;
  }
}
