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
import type { TranningContact } from "@/types";

interface DeleteTrainingContactDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  contactToDelete: TranningContact | null;
  onSuccess: () => void;
}

export default function DeleteTrainingContactDialog({
  isOpen,
  onOpenChange,
  contactToDelete,
  onSuccess,
}: DeleteTrainingContactDialogProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteContact = async () => {
    if (!contactToDelete) return;
    setIsDeleting(true);
    try {
      const res = await apiService<{ success: boolean; message: string }>(
        `/tranning-contact/${contactToDelete._id}`,
        { method: "DELETE" }
      );
      if (res.success) {
        toast({
          title: "Deleted",
          description: "Training request has been deleted successfully.",
        });
        onSuccess();
        onOpenChange(false);
      } else {
        toast({
          title: "Error",
          description: res.message || "Failed to delete training request.",
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

  if (!contactToDelete) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold">Delete Training Submission Record</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this training enquiry submitted by <strong>{contactToDelete.fullname}</strong>?
            This action is permanent and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDeleteContact();
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
