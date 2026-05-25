
"use client";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import { ServiceTechnologyForm, ServiceTechnologyFormValues } from "@/components/dashboard/service-Tecnology/ServiceTechnologyForm";

export default function CreateServiceTechnologyPage() {
    const { toast } = useToast();
    const router = useRouter();

    const handleCreate = async (data: ServiceTechnologyFormValues) => {
        const res = await apiService<{ success: boolean; message: string }>("/service-technology", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });

        if (res.success) {
            toast({ title: "Success", description: "Service technology created successfully" });
            router.push("/dashboard/service-Tecnology");
        } else {
            throw new Error(res.message || "Failed to create service technology");
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Create Service Technology"
                description="Add a new service technology component"
            />
            <ServiceTechnologyForm 
                onSubmit={handleCreate} 
                onCancel={() => router.push("/dashboard/service-Tecnology")}
            />
        </div>
    );
}
