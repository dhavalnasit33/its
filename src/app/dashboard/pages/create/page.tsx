
'use client';

import PageCreate, { PageFormValues } from '@/components/dashboard/pages/createpagefrom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/lib/apiService';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreatePagePage() {
  const { toast } = useToast();
  const router    = useRouter();

  const handleCreate = async (data: PageFormValues) => {
    const res = await apiService<{ success: boolean; message: string }>(
      "/page",
      {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      }
    );

    if (res.success) {
      toast({ title: "Success", description: res.message || "Page created successfully." });
      router.push("/dashboard/pages");
    } else {
      throw new Error(res.message || "Failed to create page");
    }
  };

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Create Page"
          description="Create a new Page"
        />
      </div>
      <PageCreate 
        onSubmit={handleCreate} 
        initialData={null} 
        />
    </>
  );
}