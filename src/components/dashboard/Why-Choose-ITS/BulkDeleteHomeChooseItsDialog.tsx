'use client';

import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2 } from "lucide-react";

interface BulkDeleteHomeChooseItsDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    selectedIds: string[];
    onSuccess: () => void;
}

export default function BulkDeleteHomeChooseItsDialog({
    isOpen,
    onOpenChange,
    selectedIds,
    onSuccess,
}: BulkDeleteHomeChooseItsDialogProps) {
    const { toast } = useToast();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) return;
        setIsDeleting(true);
        try {
            const res = await apiService<{
                success: boolean;
                message: string;
                deletedCount: number;
            }>(`/choose_its_home/bulk-delete`, {
                method: "POST",
                body: JSON.stringify({ ids: selectedIds }),
                headers: { "Content-Type": "application/json" },
            });

            if (res.success) {
                toast({
                    title: "Deleted",
                    description: res.message || `${res.deletedCount} items deleted successfully`,
                });
                onSuccess();
                onOpenChange(false);
            } else {
                toast({
                    title: "Error",
                    description: res.message || "Failed to delete selected items",
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                        <Trash2 className="h-5 w-5" />
                        Delete Selected Items
                    </AlertDialogTitle>

                    <div className="space-y-3">
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete{" "}
                            <strong>{selectedIds.length} selected items</strong> and
                            remove them from our servers.
                        </AlertDialogDescription>
        
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                            <span className="text-red-700 text-sm">
                                You are about to delete{" "}
                                <span className="font-bold text-red-600">
                                    {selectedIds.length}
                                </span>{" "}
                                items.
                            </span>
                        </div>
                    </div>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={isDeleting}
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleBulkDelete}
                        disabled={isDeleting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isDeleting && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isDeleting ? "Deleting..." : `Delete ${selectedIds.length} Item(s)`}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
