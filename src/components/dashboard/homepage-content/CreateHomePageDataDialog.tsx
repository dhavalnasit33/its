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
import HomePageDataForm from "./HomePageDataForm";
import { HomePageDataFormValues } from "@/types";

interface CreateDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSuccess: () => void;
}

export default function CreateHomePageDataDialog({
    isOpen,
    onOpenChange,
    onSuccess,
}: CreateDialogProps) {
    const { toast } = useToast();

    const handleCreate = async (data: HomePageDataFormValues) => {
        try {
            // Using the PATCH endpoint for upsert functionality
            const res = await apiService<{ success: boolean; message: string }>(
                "/homepage",
                {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (res.success) {
                toast({
                    title: "Success",
                    description: res.message || "Homepage content created.",
                });
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
                    <DialogTitle>Create Homepage Content</DialogTitle>
                    <DialogDescription>
                        Fill in all the sections for the main homepage.
                    </DialogDescription>
                </DialogHeader>
                <HomePageDataForm onSubmit={handleCreate} initialData={null} />
            </DialogContent>
        </Dialog>
    );
}
