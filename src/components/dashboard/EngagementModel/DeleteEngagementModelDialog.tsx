'use client';

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
import { useState } from "react";

interface DeleteEngagementModelDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  item: { _id: string; modelTitle: string } | null;
  onSuccess: () => void;
}

export default function DeleteEngagementModelDialog({ isOpen, onOpenChange, item, onSuccess }: DeleteEngagementModelDialogProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!item) return;
    try {
      setIsDeleting(true)
      const res = await apiService<{ success: boolean; message: string }>(`/engagement-model/${item._id}`, { method: "DELETE" });
      if (res.success) {
        toast({ title: "Deleted", description: res.message });
        onSuccess();
        onOpenChange(false);

      } else {
        toast({ title: "Error", description: res.message, variant: "destructive" });
      }
      setIsDeleting(false)

    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Something went wrong", variant: "destructive" });

    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Engagement Model</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{item?.modelTitle}</strong>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting} >Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
