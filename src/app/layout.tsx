import { Bricolage_Grotesque, Exo_2, Inter } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import { SnackbarProvider } from "@/components/ui/snackbar-provider";
import "./globals.css";
import apiService from "@/lib/apiService";
import ClientContentWrapper from "./ClientContentWrapper";
import SideBlurb from "@/components/SideInfo";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-exo2",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bricolage",
});

type NavLink = {
  title: string;
  slug: string;
  systemIdentifier: string;
};

type NavCategoryGroup = {
  category: string;
  icon: string;
  links: NavLink[];
};

export type NavigationStructure = {
  mainNav: NavLink[];
  servicesNav: NavCategoryGroup[];
  hireNav: NavCategoryGroup[];
};

async function getNavigationStructure(): Promise<NavigationStructure> {
  try {
    const response = await apiService<any>(
      "/seo-manager/navigation-structure",
      {
        next: { revalidate: 3600 }, // 60 minit data changed
      },
    );
    console.count("SEO API Call Counter");

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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const navStructure = await getNavigationStructure();

  return (
    // <html lang="en" className={exo2.className}>
    <html
      lang="en"
      className={`${exo2.variable} ${inter.variable} ${bricolage.variable}`}
    >
      <body>
        <SnackbarProvider>
          <Navbar navStructure={navStructure} />
          <ClientContentWrapper>{children}</ClientContentWrapper>
          <SideBlurb />
        </SnackbarProvider>
      </body>
    </html>
  );
}
