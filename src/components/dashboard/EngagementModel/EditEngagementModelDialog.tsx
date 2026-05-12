"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import EngagementModelForm, {
  EngagementModelFormValues,
} from "./EngagementModelfrom";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";

interface EditEngagementModelDialogProps {
  _id: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  item: EngagementModelFormValues | null;
  onSuccess: () => void;
}

// 1. Props mathi _id ne ahiya extract karo
export default function EditEngagementModelDialog({
  _id,
  isOpen,
  onOpenChange,
  item,
  onSuccess,
}: EditEngagementModelDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentItemData, setCurrentItemData] =
    useState<EngagementModelFormValues | null>(null);

  useEffect(() => {
    if (isOpen && item) setCurrentItemData(item);
    else setCurrentItemData(null);
  }, [isOpen, item]);

  const handleSubmit = async (data: EngagementModelFormValues) => {
    if (!item) return;
    setIsSubmitting(true);
    try {
      // 2. item._id ni jagyae direct _id use karo
      const res = await apiService<{ success: boolean; message: string }>(
        `/engagement-model/${_id}`, 
        {
          method: "PUT",
          body: data as any,
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Edit Engagement Model</DialogTitle>
          <DialogDescription>
            Update the details of "{item?.modelTitle}"
          </DialogDescription>
        </DialogHeader>
        {currentItemData && (
          <div className="py-4">
            <EngagementModelForm
              initialData={currentItemData}
              onSubmit={handleSubmit}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
