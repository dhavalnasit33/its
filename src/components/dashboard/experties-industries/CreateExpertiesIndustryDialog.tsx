"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import ExpertiesIndustryForm, { ExpertiesIndustryFormValues } from "./ExpertiesIndustryForm";

interface CreateExpertiesIndustryDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
}

export default function CreateExpertiesIndustryDialog({
  isOpen,
  onOpenChange,
  onSuccess,
}: CreateExpertiesIndustryDialogProps) {
  const { toast } = useToast();

  const handleCreate = async (data: ExpertiesIndustryFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>("/expertise-industries", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
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
      <DialogContent className="sm:max-w-lg md:max-w-xl max-h-[90vh] w-full overflow-y-auto bg-white rounded-2xl shadow-2xl p-6">
        <DialogHeader>
          <DialogTitle>Add Experties Industry</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new industry of expertise.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <ExpertiesIndustryForm onSubmit={handleCreate} initialData={null} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
