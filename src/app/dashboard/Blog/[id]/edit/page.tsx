'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { Blogs } from "@/types";
import BlogForm, { BlogFormValues } from "@/components/dashboard/Blogs/BlogForm";

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();
  const { toast } = useToast();
  const [item, setItem] = useState<Blogs | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await apiService<{ success: boolean; data: Blogs }>(`/blogs/${id}`, {
          method: "GET",
        });

        if (res.success) {
          setItem(res.data);
        } else {
          toast({ title: "Error", description: "Failed to fetch blogs data.", variant: "destructive" });
          router.push("/dashboard/Blog");
        }
      } catch (error) {
        toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
        router.push("/dashboard/Blog");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchItem();
  }, [id, router, toast]);

  const handleSubmit = async (data: BlogFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>(`/blogs/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.success) {
        toast({ title: "Success", description: "Blogs updated successfully." });
        router.push("/dashboard/Blog");
      } else {
        throw new Error(res.message || "Failed to update Blogs");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Blog"
        description="Update the blog details below."
      />
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      ) : item ? (
        <BlogForm
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
