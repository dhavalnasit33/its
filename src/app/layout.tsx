import { Bricolage_Grotesque, Exo_2, Inter } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import { SnackbarProvider } from "@/components/ui/snackbar-provider";
import "./globals.css";
import apiService from "@/lib/apiService";
import ClientContentWrapper from "./ClientContentWrapper";
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
import { getYoastSeoData } from "@/lib/seoService";
import ScrollToTop from "@/components/ScrollToTop";

interface ParsedScript {
  src?: string;
  async?: boolean;
  defer?: boolean;
  content: string;
}

function parseGoogleTags(htmlString: string) {
  if (!htmlString) return { scripts: [], noscripts: [] };

  const scripts: ParsedScript[] = [];
  const noscripts: string[] = [];

  // Match script tags and capture their opening tag and content
  const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(htmlString)) !== null) {
    const attrsString = match[1];
    const content = match[2];

    const srcMatch = /src=["']([^"']+)["']/i.exec(attrsString);
    const asyncMatch = /\basync\b/i.test(attrsString);
    const deferMatch = /\bdefer\b/i.test(attrsString);

    scripts.push({
      src: srcMatch ? srcMatch[1] : undefined,
      async: asyncMatch,
      defer: deferMatch,
      content,
    });
  }

  // Match noscript tags
  const noscriptRegex = /<noscript\b[^>]*>([\s\S]*?)<\/noscript>/gi;
  while ((match = noscriptRegex.exec(htmlString)) !== null) {
    noscripts.push(match[1]);
  }

  return { scripts, noscripts };
}

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
  const yoastSeo = await getYoastSeoData();
  const { scripts, noscripts } = parseGoogleTags(yoastSeo?.googletags || "");

  return (
    <html lang="en" className={exo2.className}>
      <head>
        {/* <link rel="canonical" href="https://inspiretechnosolution.com/" /> */}
        <meta name="robots" content="index, follow" />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://inspiretechnosolution.com/"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://inspiretechnosolution.com/"
        />
        <link rel="icon" href={websiteSettings?.favicon || "/favicon.ico"} />
        {/*  <GoogleTagManager gtmId="GTM-5FSVQSMT" /> */}
        {scripts.map((script, index) => (
          <script
            key={`yoast-script-${index}`}
            src={script.src}
            async={script.async}
            defer={script.defer}
            dangerouslySetInnerHTML={
              script.content ? { __html: script.content } : undefined
            }
          />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SiteNavigationElement",
              name: [
                "Home",
                "About Us",
                "Our Services",
                "Hire Us",
                "Our Portfolio",
              ],
              url: [
                "https://inspiretechnosolution.com/",
                "https://inspiretechnosolution.com/about-us/",
                "https://inspiretechnosolution.com/our-service/",
                "https://inspiretechnosolution.com/hire/",
                "https://inspiretechnosolution.com/my-portfolio/",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://inspiretechnosolution.com/#organization",
              name: "Inspire Techno Solution",
              url: "https://inspiretechnosolution.com/",
              logo: "https://inspiretechnosolution.com/logo.png",
              image: "https://inspiretechnosolution.com/feature-logo.jpg",
              description:
                "Inspire Techno Solution is a leading web and mobile app development company in India specializing in WordPress, ReactJS, NodeJS, PHP, Shopify, UI/UX Design, and custom software solutions.",
              email: "support@inspiretechnosolution.com",
              telephone: "+91-9327220484",
              areaServed: [
                {
                  "@type": "Country",
                  name: "India",
                },
                {
                  "@type": "Country",
                  name: "Germany",
                },
                {
                  "@type": "Country",
                  name: "United States",
                },
              ],
              knowsAbout: [
                "WordPress Development",
                "ReactJS Development",
                "NodeJS Development",
                "PHP Development",
                "MERN Development",
                "UI/UX Design",
                "Web Development",
                "Mobile App Development",
              ],
              founder: {
                "@type": "Person",
                name: "Dhaval Nasit",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "302, Dhara Arcade Motavarachha Nr.Mahadevchowk",
                addressLocality: "Surat",
                addressRegion: "Gujarat",
                postalCode: "394101",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.facebook.com/inspiretechnosolution",
                "https://www.instagram.com/inspiretechnosolution/",
                "https://www.linkedin.com/company/inspiretechnosolution/",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-9327220484",
                contactType: "customer service",
                availableLanguage: ["English", "Hindi", "Gujarati"],
              },
            }),
          }}
        />
      </head>
      <body>
        <ScrollToTop />
        {noscripts.map((htmlContent, index) => (
          <noscript
            key={`yoast-noscript-${index}`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        ))}
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
