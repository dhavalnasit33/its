
'use client';
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import ServiceStepperForm, { ServiceStepperFormValues } from "@/components/dashboard/service-manager/ServiceManagerForm";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

interface CreateServiceManagerDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSuccess: () => void;
}

export default function CreateServiceManagerDialog({
    isOpen,
    onOpenChange,
    onSuccess
}: CreateServiceManagerDialogProps) {
    const { toast } = useToast();

    const router = useRouter();
    const handleCreate = async (data: ServiceStepperFormValues) => {
        try {
            const res = await apiService<{ success: boolean; message: string }>("/service", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (res.success) {
                toast({ title: "Success", description: res.message });
                onSuccess();
            } else {
                toast({ title: "Error", description: res.message, variant: "destructive" });
            }
        } catch (error: any) {
            toast({ title: "Error", description: error.message || "Something went wrong", variant: "destructive" });
        }
    };

    return (
        <>
            <div className="space-y-6">
                <PageHeader
                    title="Create Service"
                    description="Create a new Services "
                />
            </div>
            <ServiceStepperForm onSubmit={handleCreate} initialData={null} />

        </>

    );
}
