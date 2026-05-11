"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";

interface DeleteBlogDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  blogId: string;
  onSuccess: () => void;
}

export default function DeleteBlogDialog({ isOpen, onOpenChange, blogId, onSuccess }: DeleteBlogDialogProps) {
  const { toast } = useToast();

  const handleDelete = async (): Promise<void> => {
    try {
      const res = await apiService<{ success: boolean; message: string }>(`/blogs/${blogId}`, {
        method: "DELETE",
      });

      if (res.success) {
        toast({ title: "Deleted", description: res.message });
        onSuccess();
        onOpenChange(false);
      } else {
        toast({ title: "Error", description: res.message, variant: "destructive" });
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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Delete Blog</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this blog? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}
            className="border-gray-300">Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white"
          >Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
