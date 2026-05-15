"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import { HireMainPageData, HireMainPageDataFormValues, SingleResponse } from "@/types";
import HireMainPageForm from "@/components/dashboard/hire-main-page/HireMainPageForm";
import { Loader2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

export default function HireMainPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [contentId, setContentId] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<HireMainPageDataFormValues | null>(null);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const res = await apiService<SingleResponse<HireMainPageData>>("/hire-main-page/admin");

            if (res.success && res.data) {
                const record = res.data;
                setContentId(record._id);

                setInitialData({
                    mainTitle: record.mainTitle,
                    description: record.description,
                    developmentTeamSection: record.developmentTeamSection,
                    dedicatedDeveloperSection: {
                        maintitle: record.dedicatedDeveloperSection.maintitle,
                        services: record.dedicatedDeveloperSection.services.map(s => ({
                            title: s.title,
                            serviceItemBox: s.serviceItemBox.map(item => ({
                                image: item.image,
                                hirepageId: (item.hirepageId as any)?._id || item.hirepageId
                            }))
                        }))
                    },
                    whyHireDeveloperforYourProject: record.whyHireDeveloperforYourProject,
                    whyChooseItsForDedicatedResources: record.whyChooseItsForDedicatedResources,
                    hireDedicatedResourcesAndTalents: record.hireDedicatedResourcesAndTalents,
                    pricePathAndFAQ: (record.pricePathAndFAQ as any)?._id || record.pricePathAndFAQ,
                    seo: record.seo ? {
                        title: record.seo.title,
                        keyphrase: record.seo.keyphrase,
                        seoDescription: record.seo.seoDescription,
                        featureImage: record.seo.featureImage || "",
                    } : {
                        title: "",
                        keyphrase: "",
                        seoDescription: "",
                        featureImage: "",
                    },
                });
            }
        } catch (error: any) {
            console.error("❌ Error fetching Hire Main Page content:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    const handleSubmit = async (values: HireMainPageDataFormValues) => {
        try {
            let res;
            if (contentId) {
                // Update existing record
                res = await apiService<SingleResponse<HireMainPageData>>(`/hire-main-page/${contentId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });
            } else {
                // Create new record
                res = await apiService<SingleResponse<HireMainPageData>>("/hire-main-page", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });
            }

            if (res.success) {
                toast({
                    title: "Success",
                    description: contentId ? "Hire content updated successfully" : "Hire content created successfully",
                });
                if (!contentId && res.data) {
                    setContentId(res.data._id);
                }
                fetchContent();
            } else {
                throw new Error(res.message || "Failed to save content");
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Something went wrong",
                variant: "destructive",
            });
            throw error; // Re-throw to let form handle internal state if needed
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Loading Hire Main Page content...</p>
            </div>
        );
    }

    return (
        <div className="p-6 w-full ">
            <Card>
                <CardContent className="pt-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold tracking-tight">
                            {contentId ? "Update Hire Main Page" : "Create Hire Main Page"}
                        </h2>
                        <p className="text-muted-foreground">Manage the content and SEO for the hire main page</p>
                    </div>
                    <HireMainPageForm
                        initialData={initialData}
                        onSubmit={handleSubmit}
                        onCancel={() => fetchContent()}
                    />
                </CardContent>
            </Card>
            {/* <PageHeader
                title="Hire Main Page"
                description="Manage the landing page content for recruitment and dedicated resources"
            />
             */}
        </div>
    );
}