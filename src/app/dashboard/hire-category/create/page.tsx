'use client';

import CategoryFrom, {  CategoryFormValues } from '@/components/dashboard/category/categoryform';
import PageHeader from '@/components/shared/PageHeader';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/lib/apiService';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";

export default function CreateHireCategoryPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleCreate = async (data: CategoryFormValues) => {
    try {
      console.log("Submitting data:", data);
      const res = await apiService<{ success: boolean; message: string }>("/hire-category", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      console.log("API Response:", res);

      if (res.success) {
        toast({ title: "Success", description: res.message });
        router.push("/dashboard/hire-category");
      } else {
        toast({ title: "Error", description: res.message, variant: "destructive" });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Something went wrong", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Hire Category"
        description="Create a new system assignment hire category"
      />
      <Card className="border border-slate-100 shadow-sm bg-white">
        <CardContent className="pt-6">
          <CategoryFrom 
            onSubmit={handleCreate} 
            initialData={null} 
            onCancel={() => router.push("/dashboard/hire-category")}
            showModuleType={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
