"use client";

import { useEffect, useState } from "react";
import apiService from "@/lib/apiService";
import { OurServicesMain, SingleResponse, OurServicesMainFormValues } from "@/types";
import PageHeader from "@/components/shared/PageHeader";
import { useToast } from "@/hooks/use-toast";
import OurServicesMainForm from "@/components/dashboard/service-main-page/OurServicesMainForm";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";


export default function OurServicesMainPage() {
    const { toast } = useToast();
    const [data, setData] = useState<OurServicesMain | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const res = await apiService<SingleResponse<OurServicesMain[]>>(
                "/service-main/admin"
            );
            // The API returns an array, we take the first one if it exists
            if (res.success && res.data && res.data.length > 0) {
                setData(res.data[0]);
            } else {
                setData(null);
            }
        } catch (error) {
            console.error("❌ Error fetching services content:", error);
            toast({
                title: "Error",
                description: "Failed to load service page content.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    const handleSave = async (formData: OurServicesMainFormValues) => {
        try {
            if (data?._id) {
                // Update existing
                const res = await apiService<SingleResponse<OurServicesMain>>(
                    `/service-main/${data._id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    }
                );
                if (res.success) {
                    toast({ title: "Success", description: "Service page updated successfully." });
                    setData(res.data);
                }
            } else {
                // Create new
                const res = await apiService<SingleResponse<OurServicesMain>>(
                    "/service-main",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    }
                );
                if (res.success) {
                    toast({ title: "Success", description: "Service page created successfully." });
                    setData(res.data);
                }
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to save content.",
                variant: "destructive",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // Map internal data to form values
    const formInitialData: OurServicesMainFormValues | null = data ? {
        mainTitle: data.mainTitle,
        description: data.description,
        heroSections: data.heroSections.map(hs => ({
            title: hs.title,
            image: hs.image,
            points: hs.points.map(p => ({
                label: p.label,
                image: p.image,
                serviceId: typeof p.serviceId === 'object' ? p.serviceId._id : p.serviceId
            }))
        })),
        technologyDetails: data.technologyDetails.map(td => ({
            title: td.title,
            description: td.description,
            image: td.image,
            technologyDetail: td.technologyDetail.map(p => ({ label: p.label, image: p.image })),
            developmentDetail: td.developmentDetail.map(p => ({
                label: p.label,
                image: p.image,
                serviceId: typeof p.serviceId === 'object' ? p.serviceId._id : p.serviceId
            }))
        })),
        seo: {
            title: data.seo?.title || "",
            keyphrase: data.seo?.keyphrase || "",
            seoDescription: data.seo?.seoDescription || "",
            featureImage: data.seo?.featureImage || "",
        }
    } : null;

    return (
        <div className="p-6 w-full "> {/* container mx-auto py-6 space-y-6 */}
            {/* <PageHeader
                title="Service Main Page Management"
                description="Modernize and manage your IT services main page content and SEO settings."
            /> */}
            <Card>
                <CardContent className="p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold">
                            {
                                data?._id ? "Update" : "Create"
                            }
                            Service Main Page Management
                        </h2>
                        <p className="text-muted-foreground">Manage your service main page content and SEO settings.</p>
                    </div>
                    <OurServicesMainForm
                        initialData={formInitialData}
                        onSubmit={handleSave}
                        onCancel={() => fetchContent()}
                    />
                </CardContent>
            </Card >
        </div >
    );
}
