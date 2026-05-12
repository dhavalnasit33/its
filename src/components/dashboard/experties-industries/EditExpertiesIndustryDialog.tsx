"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ExpertiesIndustryForm, { ExpertiesIndustryFormValues } from "./ExpertiesIndustryForm";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";

interface EditExpertiesIndustryDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
  initialData: { id: string } & ExpertiesIndustryFormValues | null;
}

export default function EditExpertiesIndustryDialog({
  isOpen,
  onOpenChange,
  onSuccess,
  initialData,
}: EditExpertiesIndustryDialogProps) {
  const { toast } = useToast();

  const handleUpdate = async (data: ExpertiesIndustryFormValues) => {
    if (!initialData?.id) return;

    try {
      const res = await apiService<{ success: boolean; message: string }>(
        `/expertise-industries/${initialData.id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );

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
          <DialogTitle>Edit Experties Industry</DialogTitle>
          <DialogDescription>
            Update the fields below to modify this industry.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {initialData && <ExpertiesIndustryForm onSubmit={handleUpdate} initialData={initialData} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
