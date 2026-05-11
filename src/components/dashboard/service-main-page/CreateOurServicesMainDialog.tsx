"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import OurServicesMainForm from "./OurServicesMainForm";
import { OurServicesMainFormValues } from "@/types";

interface CreateDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSuccess: () => void;
}

export default function CreateOurServicesMainDialog({
    isOpen,
    onOpenChange,
    onSuccess,
}: CreateDialogProps) {
    const { toast } = useToast();

    const handleCreate = async (data: OurServicesMainFormValues) => {
        try {
            const res = await apiService<{ success: boolean; message: string }>(
                "/service-main",
                {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (res.success) {
                toast({ title: "Success", description: res.message });
                onSuccess();
                onOpenChange(false);
            } else {
                toast({
                    title: "Error",
                    description: res.message,
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Something went wrong",
                variant: "destructive",
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-6xl max-h-[95vh] w-full overflow-y-auto rounded-lg">
                <DialogHeader>
                    <DialogTitle>Create Our Services Content</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the main services page.
                    </DialogDescription>
                </DialogHeader>
                <OurServicesMainForm onSubmit={handleCreate} initialData={null} />
            </DialogContent>
        </Dialog>
    );
}
