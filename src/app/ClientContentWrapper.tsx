// src/app/ClientContentWrapper.tsx

"use client"; // ✨ FIX: This directive is essential for using hooks.

import { useState, useEffect } from "react";
import Loader from "@/components/PageLoader";
import ContactFooterPage from "@/components/Footer/page";

// This component now exclusively handles the client-side loading state.
export default function ClientContentWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <main>
        {children}
        <ContactFooterPage />
      </main>
    </>
  );
}