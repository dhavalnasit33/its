'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import HomeChooseItsForm, { HomeChooseItsFormValues } from "./HomeChooseItsForm";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";

interface CreateHomeChooseItsDialogProps {
  isOpen: boolean;  
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
}

export default function CreateHomeChooseItsDialog({ isOpen, onOpenChange, onSuccess }: CreateHomeChooseItsDialogProps) {
  const { toast } = useToast();

  // Make sure handleCreate returns Promise<void>
  const handleCreate = async (data: HomeChooseItsFormValues): Promise<void> => {
    try {
      const res = await apiService<{ success: boolean; message: string }>("/choose_its_home", {
        method: "POST",
        body: data as any,
      });

      if (res.success) {
        toast({ title: "Success", description: res.message });
        onSuccess(); // refresh parent
        onOpenChange(false); // close dialog
      } else {
        toast({ title: "Error", description: res.message, variant: "destructive" });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Something went wrong", variant: "destructive" });
    }
  };

  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>Add Why Choose ITS</DialogTitle>
          <DialogDescription>Fill in the details below to add a new entry.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <HomeChooseItsForm onSubmit={handleCreate} initialData={null} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
