'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import EngagementModelForm, { EngagementModelFormValues } from "./EngagementModelfrom";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";

interface CreateEngagementModelDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
}

export default function CreateEngagementModelDialog({ isOpen, onOpenChange, onSuccess }: CreateEngagementModelDialogProps) {
  const { toast } = useToast();

  const handleCreate = async (data: EngagementModelFormValues): Promise<void> => {
    try {
        console.log("Data being sent to API:", JSON.stringify(data, null, 2));
      const res = await apiService<{ success: boolean; message: string }>("/engagement-model", {
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
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Create Engagement Model</DialogTitle>
          <DialogDescription>Fill in the details to add a new Engagement Model.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <EngagementModelForm onSubmit={handleCreate} initialData={null} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
