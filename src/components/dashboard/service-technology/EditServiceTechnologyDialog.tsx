"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ServiceTechnologyForm, { ServiceTechnologyFormValues } from "./ServiceTechnologyForm";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";

interface EditServiceTechnologyDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
  initialData: { id: string } & ServiceTechnologyFormValues | null;
}

export default function EditServiceTechnologyDialog({
  isOpen,
  onOpenChange,
  onSuccess,
  initialData,
}: EditServiceTechnologyDialogProps) {
  const { toast } = useToast();

  const handleUpdate = async (data: ServiceTechnologyFormValues) => {
    if (!initialData?.id) return;

    try {
      const res = await apiService<{ success: boolean; message: string }>(
        `/service-technology/${initialData.id}`,
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
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg md:max-w-xl max-h-[90vh] w-full overflow-y-auto   rounded-2xl shadow-2xl p-6">
        <DialogHeader>
          <DialogTitle>Edit Service Technology</DialogTitle>
          <DialogDescription>
            Update the fields below to modify this Service Technology.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {initialData && (
            <ServiceTechnologyForm onSubmit={handleUpdate} initialData={initialData} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
