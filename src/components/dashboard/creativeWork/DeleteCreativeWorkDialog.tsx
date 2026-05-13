"use client";

import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import { SingleResponse } from "@/types";

interface DeleteCreativeWorkDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    creativeWork: { _id: string; title: string } | null;
    onSuccess: () => void;
}

export default function DeleteCreativeWorkDialog({ isOpen, onOpenChange, creativeWork, onSuccess }: DeleteCreativeWorkDialogProps) {
    const { toast } = useToast();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!creativeWork?._id) return;
        setIsDeleting(true);

        try {
            const response = await apiService<SingleResponse<null>>(`/creative-work/${creativeWork._id}`, {
                method: "DELETE",
            });

            if (response.success) {
                toast({ title: "Success", description: response.message || "Creative work deleted successfully." });
                onSuccess();
                onOpenChange(false);
            } else {
                toast({ title: "Error", description: response.message || "Failed to delete creative work.", variant: "destructive" });
            }
        } catch (error: any) {
            toast({ title: "Error", description: error.message || "An unexpected error occurred.", variant: "destructive" });
        } finally {
            setIsDeleting(false);
        }
    };

    if (!creativeWork) return null;

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the creative work
                        &quot;<strong>{creativeWork.title}</strong>&quot;.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting} onClick={() => onOpenChange(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isDeleting ? "Deleting..." : "Yes, delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
