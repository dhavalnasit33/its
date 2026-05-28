'use client';

import ServiceCategoryForm from '@/components/dashboard/service-category/ServiceCategoryForm';
import { ServiceCategoryFormValues } from '@/types';
import PageHeader from '@/components/shared/PageHeader';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/lib/apiService';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';

export default function CreateServiceCategoryPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleCreate = async (data: ServiceCategoryFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>('/service-category', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.success) {
        toast({ title: 'Success', description: res.message });
        router.push('/dashboard/service-category-page');
      } else {
        toast({ title: 'Error', description: res.message, variant: 'destructive' });
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Something went wrong', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Service Category"
        description="Add a new category for the Service Manager"
      />
      <Card className="border border-slate-100 shadow-sm bg-white">
        <CardContent className="pt-6">
          <ServiceCategoryForm
            onSubmit={handleCreate}
            initialData={null}
            onCancel={() => router.push('/dashboard/service-category-page')}
          />
        </CardContent>
      </Card>
    </div>
  );
}
