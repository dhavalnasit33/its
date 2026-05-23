"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import PageHeader from "@/components/shared/PageHeader";
import { ServiceTechnologyForm, ServiceTechnologyFormValues } from "@/components/dashboard/service-Tecnology/ServiceTechnologyForm";
import { Loader2 } from "lucide-react";
import type { ServiceTecnology } from "@/types/index";

interface EditPageProps {
    params: Promise<{ id: string }>;
}

export default function EditServiceTechnologyPage({ params }: EditPageProps) {
    const { id } = use(params);
    const { toast } = useToast();
    const router = useRouter();
    const [initialData, setInitialData] = useState<ServiceTechnologyFormValues | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await apiService<{ success: boolean; data: ServiceTecnology }>("/service-technology/" + id, {
                    method: "GET"
                });
                if (res.success && res.data) {
                    setInitialData({
                        image: res.data.image,
                        label: res.data.label,
                        serviceId: res.data.serviceId._id || (res.data.serviceId as any)
                    });
                } else {
                    toast({ title: "Error", description: "Failed to load technology details", variant: "destructive" });
                    router.push("/dashboard/service-Tecnology");
                }
            } catch (err) {
                console.error(err);
                toast({ title: "Error", description: "Failed to load technology details", variant: "destructive" });
                router.push("/dashboard/service-Tecnology");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [id, toast, router]);

    const handleUpdate = async (data: ServiceTechnologyFormValues) => {
        const res = await apiService<{ success: boolean; message: string }>("/service-technology/" + id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });

        if (res.success) {
            toast({ title: "Success", description: "Service technology updated successfully" });
            router.push("/dashboard/service-Tecnology");
        } else {
            throw new Error(res.message || "Failed to update service technology");
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title="Edit Service Technology"
                description="Update the service technology component"
            />
            {initialData && (
                <ServiceTechnologyForm initialData={initialData} onSubmit={handleUpdate} />
            )}
        </div>
    );
}
