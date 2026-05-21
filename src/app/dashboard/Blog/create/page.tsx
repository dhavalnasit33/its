'use client';

import { useRouter } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import BlogForm, { BlogFormValues } from "@/components/dashboard/Blogs/BlogForm";

export default function CreateBlogPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: BlogFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>("/blogs", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

    console.log("API RESPONSE:", res);
      if (res.success) {
        toast({ title: "Success", description: "Blogs created successfully." });
        router.push("/dashboard/Blog");
      } else {
        throw new Error(res.message || "Failed to create Blog.");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <>
    <div className="space-y-6">
      <PageHeader
        title="Create Blog"
        description="Fill in the details below to create a new blog entry."
      />
      </div>
      <BlogForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/Blog")}
      />
    </>
  );
}
