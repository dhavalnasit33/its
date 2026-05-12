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
import apiService from "@/lib/apiService";
import type { ExpertiesIndustries } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface DeleteExpertiesIndustryDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  industry: ExpertiesIndustries | null;
  onSuccess: () => void;
}

export default function DeleteExpertiesIndustryDialog({
  isOpen,
  onOpenChange,
  industry,
  onSuccess,
}: DeleteExpertiesIndustryDialogProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!industry?._id) return;
    setIsDeleting(true);
    try {
      const response = await apiService<{ success: boolean; message: string }>(
        `/expertise-industries/${industry._id}`,
        { method: "DELETE" }
      );

      if (response.success) {
        toast({ title: "Success", description: response.message || "Industry deleted successfully." });
        onSuccess();
        onOpenChange(false);
      } else {
        toast({ title: "Error", description: response.message || "Failed to delete industry.", variant: "destructive" });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!industry) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the industry
            &quot;<strong>{industry.title}</strong>&quot;.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting} onClick={() => onOpenChange(false)}>
            Cancel
          </AlertDialogCancel>
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

