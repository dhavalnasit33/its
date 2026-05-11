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
import type { HomeChooseIts } from "@/types";

interface DeleteHomeChooseItsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  item: HomeChooseIts | null;
  onSuccess: () => void;
}

export default function DeleteHomeChooseItsDialog({
  isOpen,
  onOpenChange,
  item,
  onSuccess,
}: DeleteHomeChooseItsDialogProps) {
  const { toast } = useToast();


const handleDelete = async () => {
  if (!item) return;
  try {
    const res = await apiService<{ success: boolean; message: string }>(
      `/choose_its_home/${item._id}`,
      { method: "DELETE" }
    );

    if (res.success) {
      toast({ title: "Deleted", description: res.message });
        onSuccess();
       onOpenChange(false);
   // Let parent handle closing
    } else {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    }
  } catch (error: any) {
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
          <AlertDialogTitle>Delete Entry</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong>{item?.title}</strong>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
          className="border-gray-300"
          >Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
