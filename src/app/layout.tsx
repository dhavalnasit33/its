import { Bricolage_Grotesque, Exo_2, Inter } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import { SnackbarProvider } from "@/components/ui/snackbar-provider";
import "./globals.css";
import apiService from "@/lib/apiService";
import ClientContentWrapper from "./ClientContentWrapper";
import { GoogleTagManager } from "@next/third-parties/google";
import SideBlurb from "@/components/SideInfo";
import { WebsiteSettingsProvider } from "@/context/WebsiteSettingsContext";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-exo2",
});

// const inter = Inter({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   variable: "--font-inter",
// });

// const bricolage = Bricolage_Grotesque({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   variable: "--font-bricolage",
// });

import {
  getNavigationStructure,
  NavigationStructure,
} from "@/lib/navigationService";

async function getWebsiteSettings(): Promise<any> {
  try {
    const response = await apiService<any>("/website-settings", {
      next: { revalidate: 3600 }, // Cache for 60 min
    });
    if (response && response.success) {
      return response.data;
    }
    return null;
  } catch (error: any) {
    console.error("❌ Error in getWebsiteSettings:", error.message || error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const navStructure = await getNavigationStructure();
  const websiteSettings = await getWebsiteSettings();

  return (
    <html lang="en" className={exo2.className}>
    {/* <html
      lang="en"
      className={`${exo2.variable} ${inter.variable} `}
    > */}
      <GoogleTagManager gtmId="GTM-5FSVQSMT" />
      <body>
        <SnackbarProvider>
          <WebsiteSettingsProvider
            initialSettings={websiteSettings}
            navStructure={navStructure}
          >
            <Navbar navStructure={navStructure} />
            <ClientContentWrapper>{children}</ClientContentWrapper>
            <SideBlurb />
          </WebsiteSettingsProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
