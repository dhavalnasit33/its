"use client";

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
import type { TestimonialFormValues } from "./TestimonialsForm";
import { useState } from "react";

interface DeleteTestimonialsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  item: Testimonial | null;
  onSuccess: () => void;
}
interface Testimonial {
  _id: string;
  name: string;
  description: string;
  location: string;
  image: string;
}
export default function DeleteTestimonialsDialog({
  isOpen,
  onOpenChange,
  item,
  onSuccess,
}: DeleteTestimonialsDialogProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!item?._id) return;
    try {
      setIsDeleting(true);
      const res = await apiService<{ success: boolean; message: string }>(
        `/testimonials/${item._id}`,
        { method: "DELETE" },
      );
      if (res.success) {
        toast({ title: "Deleted", description: res.message });
        onSuccess();
        onOpenChange(false);
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
      }
      setIsDeleting(false);
    } catch (error: any) {
      setIsDeleting(false);
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className=" ">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{item?.name}</strong>? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting} >Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            // className="bg-red-600 hover:bg-red-700"
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
