'use client';

import { useState } from 'react';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import apiService from '@/lib/apiService';
import type { ServiceTecnology, SingleResponse } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface DeleteServiceTechnologyDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  serviceTech: ServiceTecnology | null;
  onSuccess: () => void;
}

export default function DeleteServiceTechnologyDialog({ 
  isOpen, 
  onOpenChange, 
  serviceTech, 
  onSuccess 
}: DeleteServiceTechnologyDialogProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!serviceTech?._id) return;
    setIsDeleting(true);
    try {
      const response = await apiService<SingleResponse<null>>(`/service-technology/${serviceTech._id}`, {
        method: 'DELETE',
      });

      if (response.success) {
        toast({ title: 'Success', description: response.message || 'Service technology deleted successfully.' });
        onSuccess();
        onOpenChange(false);
      } else {
        toast({ title: 'Error', description: response.message || 'Failed to delete service technology.', variant: 'destructive' });
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'An unexpected error occurred.', variant: 'destructive' });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!serviceTech) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the service technology
            &quot;<strong>{serviceTech.label}</strong>&quot;.
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
