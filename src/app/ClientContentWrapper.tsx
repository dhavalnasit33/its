// src/app/ClientContentWrapper.tsx

"use client"; // ✨ FIX: This directive is essential for using hooks.

import dynamic from "next/dynamic";

const ContactFooterPage = dynamic(() => import("@/components/Footer/page"), {
  ssr: true,
});

const SideBlurb = dynamic(() => import("@/components/SideInfo"), { ssr: false });
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: false });
const CookieConsent = dynamic(() => import("@/components/CookieConsent"), { ssr: false });
const ContactPopup = dynamic(() => import("@/components/ContactPopup"), { ssr: false });

// This component now exclusively handles the wrapper structure.
export default function ClientContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
      <ContactFooterPage />
      <SideBlurb />
      <WhatsAppButton />
      <CookieConsent />
      <ContactPopup />
    </main>
  );
}