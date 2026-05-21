'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import PageHeader from "@/components/shared/PageHeader";
import CreativeWorkForm, { CreativeWorkFormValues } from "@/components/dashboard/creativeWork/CreativeWorkForm";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CreativeWork, SingleResponse } from "@/types";

export default function EditCreativeWorkPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [initialData, setInitialData] = useState<CreativeWorkFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiService<SingleResponse<CreativeWork>>(`/creative-work/${params.id}`, {
          method: "GET",
        });

        if (res.success) {
          setInitialData({
            category: typeof res.data.category === "object" && res.data.category
              ? (res.data.category as any)._id || ""
              : res.data.category || "",
            title: res.data.title,
            image: res.data.image,
            url: res.data.url || "",
          });
        } else {
          toast({ title: "Error", description: "Failed to fetch data", variant: "destructive" });
          router.push("/dashboard/creativeWork");
        }
      } catch {
        toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
        router.push("/dashboard/creativeWork");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id, router, toast]);

  const handleSubmit = async (data: CreativeWorkFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>(`/creative-work/${params.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.success) {
        toast({ title: "Success", description: "Creative work entry updated successfully" });
        router.push("/dashboard/creativeWork");
      } else {
        throw new Error(res.message || "Failed to update entry");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-48" />
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Edit Creative Work"
        description="Update portfolio creative work entry"
      />

      <Card>
        <CardContent className="pt-6">
          <CreativeWorkForm
            initialData={initialData}
            onSubmit={handleSubmit}
            onCancel={() => router.push("/dashboard/creativeWork")}
          />
        </CardContent>
      </Card>
    </div>
  );
}
