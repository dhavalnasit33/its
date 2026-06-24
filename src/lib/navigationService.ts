import apiService from "@/lib/apiService";
import { CACHE_REVALIDATE_TIME } from "@/config";


export type NavLink = {
  title: string;
  slug: string;
  systemIdentifier?: string;
};

export type NavCategoryGroup = {
  category: string;
  icon: string;
  links: NavLink[];
};

export type NavigationStructure = {
  mainNav: NavLink[];
  servicesNav: NavCategoryGroup[];
  hireNav: NavCategoryGroup[];
};

export async function getNavigationStructure(): Promise<NavigationStructure> {
  try {
    const response = await apiService<any>(
      "/seo-manager/navigation-structure",
      {
        next: { revalidate: CACHE_REVALIDATE_TIME },
      },
    );
    // console.log("Response:", response);

    if (response && response.success) {
      return response.data;
    }

    console.error("⚠️ Navigation data structure mismatch:", response);
    return { mainNav: [], servicesNav: [], hireNav: [] };
  } catch (error: any) {
    console.error(
      "❌ Error in getNavigationStructure:",
      error.message || error,
    );
    return { mainNav: [], servicesNav: [], hireNav: [] };
  }
}
