'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { Blogs, Faqs } from "@/types";
import BlogForm, { BlogFormValues } from "@/components/dashboard/Blogs/BlogForm";
import FaqsForm, { FaqsFormValues } from "@/components/dashboard/Faqs/FaqsForm";

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();
  const { toast } = useToast();
  const [item, setItem] = useState<Faqs | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await apiService<{ success: boolean; data: Faqs }>(`/faqs/${id}`, {
          method: "GET",
        });

        if (res.success) {
          setItem(res.data);
        } else {
          toast({ title: "Error", description: "Failed to fetch faqs data.", variant: "destructive" });
          router.push("/dashboard/Faqs");
        }
      } catch (error) {
        toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
        router.push("/dashboard/Faqs");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchItem();
  }, [id, router, toast]);

  const handleSubmit = async (data: FaqsFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>(`/faqs/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.success) {
        toast({ title: "Success", description: "Faqs updated successfully." });
        router.push("/dashboard/Faqs");
      } else {
        throw new Error(res.message || "Failed to update Faqs");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Faqs"
        description="Update the Faqs details below."
      />
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      ) : item ? (
        <FaqsForm
          initialData={item}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/dashboard/Blog")}
        />

      ) : (
        <p>Entry not found.</p>
      )}
    </div>
  );
}
