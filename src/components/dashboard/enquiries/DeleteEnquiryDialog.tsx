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
import type { Enquiry } from "@/types";

interface DeleteEnquiryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  enquiryToDelete: Enquiry | null;
  onSuccess: () => void;
}

export default function DeleteEnquiryDialog({
  isOpen,
  onOpenChange,
  enquiryToDelete,
  onSuccess,
}: DeleteEnquiryDialogProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteEnquiry = async () => {
    if (!enquiryToDelete) return;
    setIsDeleting(true);
    try {
      const res = await apiService<{ success: boolean; message: string }>(
        `/enquiries/${enquiryToDelete._id}`,
        { method: "DELETE" }
      );
      if (res.success) {
        toast({
          title: "Deleted",
          description: "Enquiry has been deleted successfully.",
        });
        onSuccess();
        onOpenChange(false);
      } else {
        toast({
          title: "Error",
          description: res.message || "Failed to delete enquiry.",
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

  if (!enquiryToDelete) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold">Delete Submission Record</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this enquiry submitted by <strong>{enquiryToDelete.name}</strong>?
            This will also permanently clear any uploaded resume/files linked to this submission. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDeleteEnquiry();
            }}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Permanently Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
