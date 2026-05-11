// src/app/ClientContentWrapper.tsx

"use client"; // ✨ FIX: This directive is essential for using hooks.

import { useState, useEffect } from "react";
import Loader from "@/components/PageLoader";
import ContactFooterPage from "@/components/Footer/page";

// This component now exclusively handles the client-side loading state.
export default function ClientContentWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    // Simulate initial page loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show ContactPage a bit after children appear
    if (!isLoading) {
      const contactTimer = setTimeout(() => setShowContact(true), 500);
      return () => clearTimeout(contactTimer);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main>
          {children}
          {showContact && <ContactFooterPage />}
        </main>
      )}
    </>
  );
}