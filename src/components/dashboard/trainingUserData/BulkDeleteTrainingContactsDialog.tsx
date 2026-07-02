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
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";

interface BulkDeleteTrainingContactsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIds: string[];
  onSuccess: () => void;
}

export default function BulkDeleteTrainingContactsDialog({
  isOpen,
  onOpenChange,
  selectedIds,
  onSuccess,
}: BulkDeleteTrainingContactsDialogProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    setIsDeleting(true);
    try {
      const res = await apiService<{ success: boolean; message: string }>(
        "/tranning-contact/bulk-delete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: selectedIds }),
        }
      );
      if (res.success) {
        toast({
          title: "Bulk Delete Completed",
          description: `Successfully deleted ${selectedIds.length} training requests.`,
        });
        onSuccess();
        onOpenChange(false);
      } else {
        toast({
          title: "Error",
          description: res.message || "Failed to bulk delete.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold">Bulk Delete Submission Records</AlertDialogTitle>
          <AlertDialogDescription>
            Are you completely sure you want to delete the <strong>{selectedIds.length}</strong> selected training records?
            This process is immediate and irreversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleBulkDelete();
            }}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting Selected..." : "Delete All Selected"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
