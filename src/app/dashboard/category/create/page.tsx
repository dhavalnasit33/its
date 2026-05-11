'use client';
import CategoryFrom, { categorycreateFormValues } from '@/components/dashboard/category/categoryform';
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast';
import apiService from '@/lib/apiService';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';


interface CreateCategoryManagerDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
}

export default function CreateCategoryManagerDialogProps({
  isOpen,
  onOpenChange,
}: CreateCategoryManagerDialogProps) {

  const { toast } = useToast();

  const router = useRouter();
  const handleCreate = async (data: categorycreateFormValues) => {
    try {
      console.log("Submitting data:", data);
      // const res = await apiService<{ success: boolean; message: string }>("/category", {
      //   method: "POST",
      //   body: JSON.stringify(data),
      //   headers: { "Content-Type": "application/json" },
      // });
      const res = await apiService<{ success: boolean; message: string }>("/category", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      console.log("API Response:", res);

      if (res.success) {
        toast({ title: "Success", description: res.message });
        router.push("/dashboard/category");
      } else {
        toast({ title: "Error", description: res.message, variant: "destructive" });

      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Something went wrong", variant: "destructive" });
    }
  };

  return (
    <>
      <div className="flex justify-between itmes-center border-b py-4 mb-4">
        <h1 className="text-2xl font-bold">Create category</h1>
        <Button
          onClick={() => router.push("/dashboard/category")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
      <CategoryFrom onSubmit={handleCreate} initialData={null} />

    </>
  )
}

