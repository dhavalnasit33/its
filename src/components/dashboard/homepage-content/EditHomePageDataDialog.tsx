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
import { HomePageData, HomePageDataFormValues } from "@/types";

interface EditDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSuccess: () => void;
    initialData: HomePageData | null;
}

export default function EditHomePageDataDialog({
    isOpen,
    onOpenChange,
    onSuccess,
    initialData,
}: EditDialogProps) {
    const { toast } = useToast();

    const handleUpdate = async (data: HomePageDataFormValues) => {
        if (!initialData?._id) return;
        console.log("initialData",initialData)
        try {
            const res = await apiService<{ success: boolean; message: string }>(
                `/homepage/${initialData._id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (res.success) {
                toast({
                    title: "Success",
                    description: res.message || "Homepage content updated.",
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
                    <DialogTitle>Edit Homepage Content</DialogTitle>
                    <DialogDescription>
                        Update the details for the main homepage.
                    </DialogDescription>
                </DialogHeader>
                {initialData && (
                    <HomePageDataForm
                        onSubmit={handleUpdate}
                        initialData={initialData} // The API and form data structures match
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
