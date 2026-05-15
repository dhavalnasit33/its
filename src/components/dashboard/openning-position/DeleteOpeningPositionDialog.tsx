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
import { OpenningPosition, SingleResponse } from "@/types";

interface DeleteOpeningPositionDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  opening: OpenningPosition | null;
  onSuccess: () => void;
}

export default function DeleteOpeningPositionDialog({ 
  isOpen, 
  onOpenChange, 
  opening, 
  onSuccess 
}: DeleteOpeningPositionDialogProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!opening?._id) return;
    setIsDeleting(true);
    try {
      const response = await apiService<SingleResponse<null>>(`/opennig-position/${opening._id}`, {
        method: 'DELETE',
      });

      if (response.success) {
        toast({ title: 'Success', description: response.message || 'Opening position deleted successfully.' });
        onSuccess();
        onOpenChange(false);
      } else {
        toast({ title: 'Error', description: response.message || 'Failed to delete opening position.', variant: 'destructive' });
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'An unexpected error occurred.', variant: 'destructive' });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!opening) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the opening position
            &quot;<strong>{opening.name}</strong>&quot;.
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
            {isDeleting ? 'Deleting...' : 'Yes, delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
