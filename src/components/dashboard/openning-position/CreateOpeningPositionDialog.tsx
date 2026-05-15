"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import OpeningPositionForm, { OpeningPositionFormValues } from "./OpeningPositionForm";

interface CreateOpeningPositionDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
}

export default function CreateOpeningPositionDialog({
  isOpen,
  onOpenChange,
  onSuccess,
}: CreateOpeningPositionDialogProps) {
  const { toast } = useToast();

  const handleCreate = async (data: OpeningPositionFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>("/opennig-position", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      console.log("🚀 ~ handleCreate ~ res:", res)

      if (res.success) {
        toast({ title: "Success", description: res.message });
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
    finally {
        onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg md:max-w-xl max-h-[90vh] w-full overflow-y-auto rounded-2xl shadow-2xl p-6">
        <DialogHeader>
          <DialogTitle>Add Opening Position</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new job opening position.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <OpeningPositionForm onSubmit={handleCreate} initialData={null} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
