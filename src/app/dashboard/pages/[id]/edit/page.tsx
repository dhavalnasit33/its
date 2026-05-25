

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import PageCreate, { PageFormValues } from "@/components/dashboard/pages/createpagefrom";
import PageHeader from "@/components/shared/PageHeader";

export default function EditPagePage() {
  const { id }    = useParams<{ id: string }>();
  const { toast } = useToast();
  const router    = useRouter();

  const [initialData, setInitialData] = useState<PageFormValues | null>(null);
  const [isLoading, setIsLoading]     = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await apiService<{
          success: boolean;
          data: {
            _id: string;
            title: string;        
            description: string;
            slug: string;
            image: string;
            seo: {
              title: string;
              keyphrase: string;
              seoDescription: string;
              featureImage: string;
            };
          };
        }>(`/page/${id}`, { method: "GET" });

        if (res.success && res.data) {
          setInitialData({
            title:       res.data.title,
            description: res.data.description,
            slug:        res.data.slug,
            image:       res.data.image,
            seo: {
              title:          res.data.seo?.title          || "",
              keyphrase:      res.data.seo?.keyphrase      || "",
              seoDescription: res.data.seo?.seoDescription || "",
              featureImage:   res.data.seo?.featureImage   || "",
            },
          });
        } else {
          toast({ title: "Error", description: "Page not found.", variant: "destructive" });
          router.push("/dashboard/pages");
        }
      } catch {
        toast({ title: "Error", description: "Failed to load page.", variant: "destructive" });
        router.push("/dashboard/pages");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchPage();
  }, [id]);

  const handleSubmit = async (data: PageFormValues) => {
    const res = await apiService<{ success: boolean; message: string }>(
      `/page/${id}`,
      {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      }
    );

    if (res.success) {
      toast({ title: "Success", description: "Page updated successfully." });
      router.push("/dashboard/pages");
    } else {
      throw new Error(res.message || "Failed to update page");
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="space-y-4 p-4">
  //       <Skeleton className="h-10 w-full" />
  //         <Skeleton className="h-32 w-full" />
  //         <Skeleton className="h-10 w-32" />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Edit Page"
          description="Update a Page"
        />
      </div>
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      ) : initialData ? (
      <PageCreate initialData={initialData} onSubmit={handleSubmit} />
      ) : (
        <p>Entry not found.</p>
      )}
    </>
  );
}