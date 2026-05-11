"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import FaqsForm, { FaqsFormValues } from "./FaqsForm";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import { Faqs } from "@/types";
import { title } from "node:process";


interface EditFaqsDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    faqsId: string;
    initialData: Faqs;
    onSuccess: () => void;
}



export default function EditFaqsDialog({
    isOpen,
    onOpenChange,
    faqsId,
    initialData,
    onSuccess,
}: EditFaqsDialogProps) {
    const { toast } = useToast();
    const formData: FaqsFormValues = {
        categories: initialData.categories,
        title: initialData.title,
        answer: initialData.answer,
    }


    const handleEdit = async (data: FaqsFormValues): Promise<void> => {
        try {
            const apiData = {
                categories: data.categories,
                title: data.title,
                answer: data.answer,
            };

            const res = await apiService<{ success: boolean; message: string }>(
                `/faqs/${faqsId}`,
                {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (res.success) {
                toast({ title: "Success", description: res.message || "Faqs updated successfully" });
                onSuccess();
                onOpenChange(false);
            } else {
                toast({
                    title: "Error",
                    description: res.message || "Failed to update Faqs",
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
            <DialogContent className="sm:max-w-lg max-h-[90vh]  md:max-w-2xl lg:max-w-5xl xl:max-w-4xl  overflow-y-auto bg-white">
                <DialogHeader>
                    <DialogTitle>Edit Blog</DialogTitle>
                    <DialogDescription>Update the blog details below.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <FaqsForm onSubmit={handleEdit} initialData={formData} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
