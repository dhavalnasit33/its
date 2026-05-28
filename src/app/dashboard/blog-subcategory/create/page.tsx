'use client';

import PageHeader from '@/components/shared/PageHeader';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/lib/apiService';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import BlogSubcategoryForm, { BlogSubcategoryFormValues } from '@/components/dashboard/blog-subcategory/BlogSubcategoryForm';

export default function CreateBlogSubCategoryPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleCreate = async (data: BlogSubcategoryFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>('/blog-subcategory', {
        method: 'POST',
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
        title="Create Blog Subcategory"
        description="Add a new blog subcategory to the system"
      />
      <Card className="border border-slate-100 shadow-sm bg-white">
        <CardContent className="pt-6">
          <BlogSubcategoryForm 
            onSubmit={handleCreate} 
            initialData={null} 
            onCancel={() => router.push('/dashboard/blog-subcategory')}
          />
        </CardContent>
      </Card>
    </div>
  );
}