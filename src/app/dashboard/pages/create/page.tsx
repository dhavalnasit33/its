
'use client';

import PageCreate, { PageFormValues } from '@/components/dashboard/pages/createpagefrom';
import { Button } from '@/components/ui/button';
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
      <div className="flex justify-between items-center border-b py-4 mb-6">
        <h1 className="text-2xl font-bold">Create Page</h1>
        <Button onClick={() => router.push("/dashboard/pages")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>
      <PageCreate onSubmit={handleCreate} initialData={null} />
    </>
  );
}