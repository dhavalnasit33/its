'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/lib/apiService';
import SubCategoryForm, { SubcategoryFormValues } from '@/components/dashboard/subcategory/subcategoryFrom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";

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
  }, [id, router, toast]);

  const handleEdit = async (data: SubcategoryFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>(`/subcategory/${id}`, {
        method: 'PUT',
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

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading subcategory data...</p>
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
    <div className="space-y-6">
      <PageHeader
        title="Edit Subcategory"
        description="Update subcategory details"
      />
      <Card className="border border-slate-100 shadow-sm bg-white">
        <CardContent className="pt-6">
          <SubCategoryForm 
            onSubmit={handleEdit} 
            initialData={initialData} 
            onCancel={() => router.push('/dashboard/subcategory')}
          />
        </CardContent>
      </Card>
    </div>
  );
}