'use client';

import SubCategoryForm, { SubcategoryFormValues } from '@/components/dashboard/subcategory/subcategoryFrom';
import PageHeader from '@/components/shared/PageHeader';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/lib/apiService';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";

export default function CreateSubCategoryPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleCreate = async (data: SubcategoryFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>('/subcategory', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.success) {
        toast({ title: 'Success', description: res.message });
        router.push('/dashboard/subcategory');
      } else {
        toast({ title: 'Error', description: res.message, variant: 'destructive' });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Subcategory"
        description="Add a new subcategory to the system"
      />
      <Card className="border border-slate-100 shadow-sm bg-white">
        <CardContent className="pt-6">
          <SubCategoryForm 
            onSubmit={handleCreate} 
            initialData={null} 
            onCancel={() => router.push('/dashboard/subcategory')}
          />
        </CardContent>
      </Card>
    </div>
  );
}