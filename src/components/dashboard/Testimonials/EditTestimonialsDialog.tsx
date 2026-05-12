"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import TestimonialsForm, { TestimonialFormValues } from "./TestimonialsForm";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import type { TestimonialFormValues as TestimonialType } from "./TestimonialsForm";

interface EditTestimonialsDialogProps {
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

export default function EditTestimonialsDialog({
  isOpen,
  onOpenChange,
  item,
  onSuccess,
}: EditTestimonialsDialogProps) {
  const { toast } = useToast();
  const [currentItemData, setCurrentItemData] =
    useState<TestimonialFormValues | null>(null);

  useEffect(() => {
    if (isOpen && item) {
      setCurrentItemData({
        name: item.name,
        description: item.description,
        location: item.location,
        image: item.image || "",
      });
    } else if (!isOpen) {
      setCurrentItemData(null);
    }
  }, [isOpen, item]);

  const handleSubmit = async (values: TestimonialFormValues) => {
    if (!item?._id) return;
    try {
      const res = await apiService<{ success: boolean; message: string }>(
        `/testimonials/${item._id}`,
        {
          method: "PUT",
          body: values as any,
        },
      );

      if (res.success) {
        toast({ title: "Success", description: res.message });
        onSuccess();
        onOpenChange(false);
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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto  ">
        <DialogHeader>
          <DialogTitle>Edit Testimonial</DialogTitle>
          <DialogDescription>
            Update the details for "{item?.name || "this testimonial"}".
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {currentItemData && (
            <TestimonialsForm
              initialData={currentItemData}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
