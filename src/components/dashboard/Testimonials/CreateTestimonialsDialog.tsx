'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import TestimonialsForm, { TestimonialFormValues } from "./TestimonialsForm";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";

interface CreateTestimonialsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
}

export default function CreateTestimonialsDialog({ isOpen, onOpenChange, onSuccess }: CreateTestimonialsDialogProps) {
  const { toast } = useToast();

  const handleCreate = async (data: TestimonialFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>("/testimonials", {
        method: "POST",
        body: data as any,
      });

      if (res.success) {
        toast({ title: "Success", description: res.message });
        onSuccess();
        onOpenChange(false);
      } else {
        toast({ title: "Error", description: res.message, variant: "destructive" });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Something went wrong", variant: "destructive" });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto  ">
        <DialogHeader>
          <DialogTitle>Add Testimonial</DialogTitle>
          <DialogDescription>Fill in the details below to add a new testimonial.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <TestimonialsForm onSubmit={handleCreate} initialData={null} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
