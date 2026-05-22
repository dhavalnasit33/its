
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import type { ServiceManager } from "@/types/index";
import ServiceStepperForm, { ServiceStepperFormValues } from "@/components/dashboard/service-manager/ServiceManagerForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/shared/PageHeader";

export default function EditServicePage() {
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();
    const { toast } = useToast();

    const [initialData, setInitialData] = useState<ServiceStepperFormValues | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const res = await apiService<{
                    success: boolean;
                    data: ServiceStepperFormValues
                }>(`/service/id/${id}`, { method: "GET" });


                if (res.success) {
                    setInitialData(res.data);
                } else {
                    toast({
                        title: "Error",
                        description: "Service not found",
                        variant: "destructive"
                    });
                    router.push("/dashboard/service-manager");
                }
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to load service data",
                    variant: "destructive"
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleEdit = async (data: ServiceStepperFormValues) => {
        try {
            const res = await apiService<{ success: boolean; message: string }>(`/service/${id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (res.success) {
                toast({ title: "Success", description: res.message });
                router.push("/dashboard/service-manager");
            } else {
                toast({ title: "Error", description: res.message, variant: "destructive" });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Something went wrong",
                variant: "destructive"
            });
        }
    };

    if (loading) return (
        <div className="p-6 flex items-center justify-center min-h-[400px]">
            <p className="text-gray-500">Loading service data...</p>
        </div>
    );

    if (!initialData) return (
        <div className="p-6 text-center">
            <p>Service not found.</p>
            <Button onClick={() => router.push("/dashboard/service-manager")} className="mt-4">
                Back to List
            </Button>
        </div>
    );

    return (
        <>
            <div className="space-y-6">
                 <PageHeader
                    title="Edit Service"
                    description="Update Services "
                    />
            </div>
            
            <ServiceStepperForm 
                onSubmit={handleEdit} 
                initialData={initialData}
                onCancel={() => router.push("/dashboard/service-manager")}  />
        </>
    );
}