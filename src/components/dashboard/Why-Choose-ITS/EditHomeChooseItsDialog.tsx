
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import HomeChooseItsForm, { type HomeChooseItsFormValues } from './HomeChooseItsForm';
import apiService from '@/lib/apiService';
import type { HomeChooseIts, SingleResponse } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface EditHomeChooseItsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  item: HomeChooseIts | null;
  onSuccess: () => void;
}


export default function EditHomeChooseItsDialog({ isOpen, onOpenChange, item, onSuccess }: EditHomeChooseItsDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingItem, setIsLoadingItem] = useState(false);
  const [currentItemData, setCurrentItemData] = useState<HomeChooseItsFormValues | null>(null);

  useEffect(() => {
    if (isOpen && item) {
      setCurrentItemData({
        title: item.title,
        description: item.description,
        image: item.image || '',
      });
    } else if (!isOpen) {
      setCurrentItemData(null);
    }
  }, [isOpen, item]);

  const handleSubmit = async (values: HomeChooseItsFormValues) => {
    if (!item?._id) return;
    setIsSubmitting(true);
    try {
      const response = await apiService<SingleResponse<HomeChooseIts>>(`/choose_its_home/${item._id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        // body: values,
      });

      if (response.success) {
        toast({ title: 'Success', description: response.message || 'Entry updated successfully.' });
        onSuccess();
        onOpenChange(false);
      } else {
        toast({ title: 'Error', description: response.message || 'Failed to update entry.', variant: 'destructive' });
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'An unexpected error occurred.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!item && isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>Item data is missing.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto  ">
        <DialogHeader>
          <DialogTitle>Edit Why Choose ITS</DialogTitle>
          <DialogDescription>
            Update the details for &quot;{item?.title || 'this entry'}&quot;.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoadingItem ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : currentItemData ? (
            <HomeChooseItsForm
              initialData={currentItemData}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              onCancel={() => onOpenChange(false)}
            />
          ) : (
            <p>Loading item data or item not found...</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
