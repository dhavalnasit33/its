
"use client"
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import FaqsForm, { FaqsFormValues } from "./FaqsForm";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
interface CreateFaqsDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSuccess: () => void;
}

export default function CreateFaqsDialog({ isOpen, onOpenChange, onSuccess }: CreateFaqsDialogProps) {
    const { toast } = useToast();

    const handleCreate = async (data: FaqsFormValues): Promise<void> => {
        try {
            const res = await apiService<{ success: boolean; message: string }>("/Faqs", {
                method: "POST",
                body: data as any,
            });

            if (res.success) {
                toast({ title: "Success", description: res.message || "Faqs created successfully" });
                onSuccess();
                onOpenChange(false);
            } else {
                toast({ title: "Error", description: res.message || "Failed to create Faqs", variant: "destructive" });
            }
        } catch (error: any) {
            toast({ title: "Error", description: error.message || "Something went wrong", variant: "destructive" });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg max-h-[90vh]  md:max-w-2xl lg:max-w-5xl xl:max-w-4xl  overflow-y-auto bg-white">
                <DialogHeader>
                    <DialogTitle>Create Faqs</DialogTitle>
                    <DialogDescription>Fill in the details below to create a new Faqs entry.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <FaqsForm onSubmit={handleCreate} initialData={null} />

                </div>
            </DialogContent>
        </Dialog>
    );
}

