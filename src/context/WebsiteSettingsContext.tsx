"use client";

import React, { createContext, useContext, useState } from "react";
import { NavigationStructure } from "@/lib/navigationService";

export interface WebsiteSettings {
  favicon: string;
  logo_img: string;
  address: string[];
  emails: {
    email: string;
    emailType: "hr" | "solution" | "sales" | "contact";
    _id?: string;
  }[];
  phone: string[];
  social_media: {
    socialMediaName: string;
    link: string;
    image: string;
    _id?: string;
  }[];
}

const defaultSettings: WebsiteSettings = {
  favicon: "",
  logo_img: "",
  address: ["215-Dhara Arcade, Digital Valley (Mota Varachha), Surat-394101, Gujarat, India"],
  emails: [
    { email: "hr@inspiretechnosolution.com", emailType: "hr" },
    { email: "solutions@inspiretechnosolution.com", emailType: "solution" },
    { email: "sales@inspiretechnosolution.com", emailType: "sales" },
    { email: "contact@inspiretechnosolution.com", emailType: "contact" }
  ],
  phone: ["+91 93272 20484"],
  social_media: []
};

interface WebsiteSettingsContextProps {
  settings: WebsiteSettings;
  navStructure: NavigationStructure;
  blogSlug: string;
  privacySlug: string;
  termsSlug: string;
  portfolioSlug: string;
  hireSlug: string;
  hrEmail: string;
  solutionEmail: string;
  salesEmail: string;
  contactEmail: string;
  supportEmail: string;
  phonePrimary: string;
  phonePrimaryClean: string;
  addressPrimary: string;
  skypeHandle: string;
  microsoftHandle: string;
  linkedinLink: string;
  whatsApplink: string;
  facebookLink: string;
  instagramLink: string;
  youtubeLink: string;
  behanceLink: string;
}

const defaultNavStructure: NavigationStructure = {
  mainNav: [],
  servicesNav: [],
  hireNav: [],
};

const WebsiteSettingsContext = createContext<WebsiteSettingsContextProps>({
  settings: defaultSettings,
  navStructure: defaultNavStructure,
  blogSlug: "blog",
  privacySlug: "privacy-policy",
  termsSlug: "terms-condition",
  portfolioSlug: "our-portfolio",
  hireSlug: "hire",
  hrEmail: "hr@inspiretechnosolution.com",
  solutionEmail: "solutions@inspiretechnosolution.com",
  salesEmail: "sales@inspiretechnosolution.com",
  contactEmail: "contact@inspiretechnosolution.com",
  supportEmail: "Support@inspiretechnosolution.com",
  phonePrimary: "+91 93272 20484",
  phonePrimaryClean: "+919327220484",
  addressPrimary: "215-Dhara Arcade, Digital Valley (Mota Varachha), Surat-394101, Gujarat, India",
  skypeHandle: "dhaval.nasit1",
  microsoftHandle: "dhaval.nasit1",
  // linkedinLink: "https://www.linkedin.com/posts/inspiretechnosolution_urgent-urgentopening-developer-activity-7143130049964134400-6P2I",
  linkedinLink: "https://www.linkedin.com/company/inspiretechnosolution/",
  // facebookLink: "https://www.facebook.com/inspiretechnosolution/about/",
  facebookLink: "https://www.facebook.com/inspiretechnosolution",
  // instagramLink: "https://www.instagram.com/inspiretechnosolution/",
  instagramLink: "https://www.instagram.com/inspiretechnosolution/",
  whatsApplink: "https://api.whatsapp.com/send?phone=919327220484",
  youtubeLink: "https://www.youtube.com/channel/UCZn9F8mZ8k97Vtk9S6v8IPQ",
  behanceLink: "#",
});

function cleanPhoneNumber(numStr: string): string {
  // Remove all spaces and non-numeric characters except +
  return numStr.replace(/[^\d+]/g, "");
}

export function WebsiteSettingsProvider({
  children,
  initialSettings,
  navStructure,
}: {
  children: React.ReactNode;
  initialSettings: WebsiteSettings | null;
  navStructure: NavigationStructure;
}) {
  const [settings] = useState<WebsiteSettings>(() => {
    if (!initialSettings) return defaultSettings;
    return {
      favicon: initialSettings.favicon || defaultSettings.favicon,
      logo_img: initialSettings.logo_img || defaultSettings.logo_img,
      address: initialSettings.address?.length ? initialSettings.address : defaultSettings.address,
      emails: initialSettings.emails?.length ? initialSettings.emails : defaultSettings.emails,
      phone: initialSettings.phone?.length ? initialSettings.phone : defaultSettings.phone,
      social_media: initialSettings.social_media || defaultSettings.social_media,
    };
  });

  const hrEmail = settings.emails.find(e => e.emailType === "hr")?.email || "hr@inspiretechnosolution.com";
  const solutionEmail = settings.emails.find(e => e.emailType === "solution")?.email || "solutions@inspiretechnosolution.com";
  const salesEmail = settings.emails.find(e => e.emailType === "sales")?.email || "sales@inspiretechnosolution.com";
  const contactEmail = settings.emails.find(e => e.emailType === "contact")?.email || "contact@inspiretechnosolution.com";
  // Fallback support email using contact email or default Support@inspiretechnosolution.com
  const supportEmail = settings.emails.find(e => e.emailType === "contact")?.email || "Support@inspiretechnosolution.com";

  const phonePrimary = settings.phone[0] || "+91 93272 20484";
  const phonePrimaryClean = cleanPhoneNumber(phonePrimary);

  const addressPrimary = settings.address[0] || "215-Dhara Arcade, Digital Valley (Mota Varachha), Surat-394101, Gujarat, India";

  // Look for skype/microsoft handle in social media (either "skype" or "microsoft")
  const skypeMedia = settings.social_media.find(
    s => s.socialMediaName.toLowerCase() === "skype" || s.socialMediaName.toLowerCase() === "microsoft"
  );
  const microsoftHandle = skypeMedia && skypeMedia.link ? skypeMedia.link : "dhaval.nasit1";
  const skypeHandle = microsoftHandle;

  // Social media links
  const linkedinLink = settings.social_media.find(s => s.socialMediaName.toLowerCase() === "linkedin")?.link || "https://www.linkedin.com/company/inspiretechnosolution/";
  const whatsApplink = settings.social_media.find(s => s.socialMediaName.toLowerCase() === "whatsapp")?.link || " https://api.whatsapp.com/send?phone=919327220484";
  const facebookLink = settings.social_media.find(s => s.socialMediaName.toLowerCase() === "facebook")?.link || "https://www.facebook.com/inspiretechnosolution/";
  const instagramLink = settings.social_media.find(s => s.socialMediaName.toLowerCase() === "instagram")?.link || "https://www.instagram.com/inspiretechnosolution/";
  const youtubeLink = settings.social_media.find(s => s.socialMediaName.toLowerCase() === "youtube")?.link || "https://www.youtube.com/channel/UCZn9F8mZ8k97Vtk9S6v8IPQ";
  const behanceLink = settings.social_media.find(s => s.socialMediaName.toLowerCase() === "behance")?.link || "#";

  // Precompute dynamic navigation slugs
  const blogLink = (navStructure?.mainNav || []).find(
    (link) => link.systemIdentifier === "blog"
  );
  const privacyLink = (navStructure?.mainNav || []).find(
    (link) => link.systemIdentifier === "privacy-policy"
  );
  const termsLink = (navStructure?.mainNav || []).find(
    (link) => link.systemIdentifier === "terms-condition"
  );
  const portfolioLink = (navStructure?.mainNav || []).find(
    (link) => link.systemIdentifier === "portfolio"
  );
  const hireLink = (navStructure?.mainNav || []).find(
    (link) => link.systemIdentifier === "hire"
  );
  const blogSlug = blogLink?.slug || "blog";
  const privacySlug = privacyLink?.slug || "privacy-policy";
  const termsSlug = termsLink?.slug || "terms-condition";
  const portfolioSlug = portfolioLink?.slug || "our-portfolio";
  const hireSlug = hireLink?.slug || "hire";
  // console.log("NAV STRUCTURE:", navStructure);
  return (
    <WebsiteSettingsContext.Provider
      value={{
        settings,
        navStructure,
        blogSlug,
        privacySlug,
        termsSlug,
        portfolioSlug,
        hireSlug,
        hrEmail,
        solutionEmail,
        salesEmail,
        contactEmail,
        supportEmail,
        phonePrimary,
        phonePrimaryClean,
        addressPrimary,
        skypeHandle,
        microsoftHandle,
        linkedinLink,
        whatsApplink,
        facebookLink,
        instagramLink,
        youtubeLink,
        behanceLink,
      }}
    >
      {children}
    </WebsiteSettingsContext.Provider>
  );
}

export function useWebsiteSettings() {
  const context = useContext(WebsiteSettingsContext);
  if (!context) {
    throw new Error("useWebsiteSettings must be used within a WebsiteSettingsProvider");
  }
  return context;
}
