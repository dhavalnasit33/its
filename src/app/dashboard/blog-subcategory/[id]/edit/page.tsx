'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/lib/apiService';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import BlogSubcategoryForm, { BlogSubcategoryFormValues } from '@/components/dashboard/blog-subcategory/BlogSubcategoryForm';

export default function EditBlogubCategoryPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { toast } = useToast();

  const [initialData, setInitialData] = useState<BlogSubcategoryFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await apiService<{
          success: boolean;
          data: BlogSubcategoryFormValues;
        }>(`/blog-subcategory/${id}`, { method: 'GET' });

        if (res.success) {
          setInitialData(res.data);
        } else {
          toast({ title: 'Error', description: 'Subcategory not found', variant: 'destructive' });
          router.push('/dashboard/blog-subcategory');
        }
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to load subcategory', variant: 'destructive' });
        router.push('/dashboard/blog-subcategory');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, router, toast]);

  const handleEdit = async (data: BlogSubcategoryFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>(`/blog-subcategory/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.success) {
        toast({ title: 'Success', description: res.message });
        router.push('/dashboard/blog-subcategory');
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
        title="Edit Blog Subcategory"
        description="Update blog subcategory details"
      />
       {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      ) : initialData ? (
      <Card className="border border-slate-100 shadow-sm bg-white">
        <CardContent className="pt-6">
          <BlogSubcategoryForm
            onSubmit={handleEdit} 
            initialData={initialData} 
            onCancel={() => router.push('/dashboard/blog-subcategory')}
          />
        </CardContent>
      </Card>
      ) : (
        <p>Entry not found.</p>
      )}
    </div>
  );
}