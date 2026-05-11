// src/components/AppProvider.tsx

"use client";

import { useState, useEffect, ReactNode } from "react";
import { SnackbarProvider } from "@/components/ui/snackbar-provider";
import Navbar from "@/components/navbar/navbar";
import Loader from "@/components/PageLoader";
import ContactFooterPage from "@/components/Footer/page";

export default function AppProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [showContact, setShowContact] = useState(false);
 const [navStructure, setNavStructure] = useState<any>([]);
    useEffect(() => {
        // simulate initial page loading
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // show ContactPage a bit after children appear
        if (!isLoading) {
            const contactTimer = setTimeout(() => setShowContact(true), 500); // adjust delay
            return () => clearTimeout(contactTimer);
        }
    }, [isLoading]);

    return (
        <SnackbarProvider>
            {/* <Navbar /> */}
            <Navbar navStructure={navStructure} />
            {isLoading ? (
                <Loader /> // show loader initially
            ) : (
                <main>
                    {children} {/* first render children */}
                    {showContact && <ContactFooterPage />} {/* show ContactPage after delay */}
                </main>
            )}
        </SnackbarProvider>
    );
}