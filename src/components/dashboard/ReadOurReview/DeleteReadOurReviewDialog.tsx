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
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ReadOurReview } from "@/types";

interface DeleteReadOurReviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  item: ReadOurReview;
  onSuccess: () => void;
}

export default function DeleteReadOurReviewDialog({
  isOpen,
  onOpenChange,
  item,
  onSuccess,
}: DeleteReadOurReviewDialogProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await apiService<{ success: boolean; message: string }>(`/read-our-review/${item._id}`, {
        method: "DELETE",
      });

      if (res.success) {
        toast({ title: "Success", description: "Entry deleted successfully" });
        onSuccess();
      } else {
        throw new Error(res.message || "Failed to delete");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the review link for{" "}
            <span className="font-semibold">{item.name}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
