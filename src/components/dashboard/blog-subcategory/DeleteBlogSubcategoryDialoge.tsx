
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
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import apiService from '@/lib/apiService';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Trash2 } from 'lucide-react';

interface SubCategoryItem {
  _id: string;
  category: string;
  categoryName?: string;
  subcategory: string;
}

interface DeleteBlogSubcategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  item: SubCategoryItem;
  onSuccess: () => void;
}

export default function DeleteBlogSubcategoryDialoge({
  isOpen,
  onOpenChange,
  item,
  onSuccess,
}: DeleteBlogSubcategoryDialogProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await apiService<{ success: boolean; message: string }>(
        `/blog-subcategory/${item._id}`,
        { method: 'DELETE' }
      );

      if (res.success) {
        toast({ title: 'Deleted', description: 'Subcategory deleted successfully' });
        onSuccess();
        onOpenChange(false);
      } else {
        toast({ title: 'Error', description: res.message, variant: 'destructive' });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            Delete Subcategory
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the blog subcategory{' '}
            <strong>&quot;{item.subcategory}&quot;</strong> under parent blog category{' '}
            <strong>&quot;{item.categoryName || item.category}&quot;</strong>.
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
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}