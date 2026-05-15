"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import { CareerContent, CareerContentFormValues, SingleResponse } from "@/types";
import CareerContentForm from "@/components/dashboard/career/CareerContentForm";
import { Loader2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

export default function CareerContentPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [contentId, setContentId] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<CareerContentFormValues | null>(null);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const res = await apiService<SingleResponse<CareerContent>>("/career-content");

            if (res.success && res.data) {
                const record = res.data;
                setContentId(record._id || null);

                setInitialData({
                    heroSection: record.heroSection,
                    careerAtIts: record.careerAtIts,
                    whyJoinIts: record.whyJoinIts,
                    seo: record.seo || {
                        title: "",
                        keyphrase: "",
                        seoDescription: "",
                        featureImage: "",
                    },
                });
            }
        } catch (error: any) {
            console.error("❌ Error fetching Career content:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    const handleSubmit = async (values: CareerContentFormValues) => {
        setIsSubmitting(true);
        try {
            let res;
            if (contentId) {
                // Update existing record
                res = await apiService<SingleResponse<CareerContent>>(`/career-content/${contentId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });
            } else {
                // Create new record
                res = await apiService<SingleResponse<CareerContent>>("/career-content", {
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
                    description: contentId ? "Career content updated successfully" : "Career content created successfully",
                });
                if (!contentId && res.data) {
                    setContentId(res.data._id || null);
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
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Loading Career content...</p>
            </div>
        );
    }

    return (
        <div className="p-6 w-full space-y-6">
            {/* <PageHeader
                title="Career Page Management"
                description="Manage the content and SEO for the public-facing careers page"
            /> */}

            <Card>
                <CardContent className="p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold tracking-tight">
                            {
                                contentId ? "Update Career Page" : "Create Career Page"
                            }
                        </h2>
                        <p className="text-muted-foreground">Manage the content and SEO for the public-facing careers page</p>
                    </div>
                    <CareerContentForm
                        initialData={initialData}
                        onSubmit={handleSubmit}
                        onCancel={() => fetchContent()}
                    />
                </CardContent>
            </Card>
        </div>
    );
}