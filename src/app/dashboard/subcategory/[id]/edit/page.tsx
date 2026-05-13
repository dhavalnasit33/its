
'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/lib/apiService';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import SubCategoryForm, { SubcategoryFormValues } from '@/components/dashboard/subcategory/subcategoryFrom';
import PageHeader from '@/components/shared/PageHeader';

export default function EditSubCategoryPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { toast } = useToast();

  const [initialData, setInitialData] = useState<SubcategoryFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await apiService<{
          success: boolean;
          data: SubcategoryFormValues;
        }>(`/subcategory/${id}`, { method: 'GET' });

        if (res.success) {
          setInitialData(res.data);
        } else {
          toast({ title: 'Error', description: 'Subcategory not found', variant: 'destructive' });
          router.push('/dashboard/subcategory');
        }
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to load subcategory', variant: 'destructive' });
        router.push('/dashboard/subcategory');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleEdit = async (data: SubcategoryFormValues) => {
    const res = await apiService<{ success: boolean; message: string }>(`/subcategory/${id}`, {
      method: 'PUT',
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

  if (loading) {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Subcategory not found.</p>
        <Button onClick={() => router.push('/dashboard/subcategory')} className="mt-4">
          Back to List
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* <div>
          <h1 className="text-2xl font-bold">Edit Subcategory</h1>
          <p className="text-sm text-muted-foreground mt-1">Update subcategory details</p>
        </div>
        <Button onClick={() => router.push('/dashboard/subcategory')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button> */}
         <PageHeader
            title="Edit Subcategory"
            description="Update subcategory details"
          />
      </div>
      <SubCategoryForm onSubmit={handleEdit} initialData={initialData} />
    </>
  );
}