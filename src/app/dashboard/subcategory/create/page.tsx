
'use client';
import SubCategoryForm, { SubcategoryFormValues } from '@/components/dashboard/subcategory/subcategoryFrom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/lib/apiService';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateSubCategoryPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleCreate = async (data: SubcategoryFormValues) => {
    const res = await apiService<{ success: boolean; message: string }>('/subcategory', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.success) {
      toast({ title: 'Success', description: res.message });
      router.push('/dashboard/subcategory');
    } else {
      throw new Error(res.message);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {/* <div>
          <h1 className="text-2xl font-bold">Create Subcategory</h1>
          <p className="text-sm text-muted-foreground mt-1">Add a new subcategory to the system</p>
        </div>
        <Button onClick={() => router.push('/dashboard/subcategory')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button> */}
         <PageHeader
                    title="Create Subcategory"
                    description="Add a new subcategory to the system"
                    />
      </div>
      <SubCategoryForm onSubmit={handleCreate} initialData={null} />
    </>
  );
}