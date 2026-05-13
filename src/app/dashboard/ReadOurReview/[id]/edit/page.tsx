'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import PageHeader from "@/components/shared/PageHeader";
import ReadOurReviewForm, { ReadOurReviewFormValues } from "@/components/dashboard/ReadOurReview/ReadOurReviewForm";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ReadOurReview, SingleResponse } from "@/types";

export default function EditReadOurReviewPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [initialData, setInitialData] = useState<ReadOurReviewFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiService<SingleResponse<ReadOurReview>>(`/read-our-review/${params.id}`, {
          method: "GET",
        });

        if (res.success) {
          setInitialData({
            name: res.data.name,
            image: res.data.image,
          });
        } else {
          toast({ title: "Error", description: "Failed to fetch data", variant: "destructive" });
          router.push("/dashboard/ReadOurReview");
        }
      } catch {
        toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
        router.push("/dashboard/ReadOurReview");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id, router, toast]);

  const handleSubmit = async (data: ReadOurReviewFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>(`/read-our-review/${params.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.success) {
        toast({ title: "Success", description: "Review entry updated successfully" });
        router.push("/dashboard/ReadOurReview");
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
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-24 ml-auto" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Edit Review Link"
        description="Update external review platform entry"
      />

      <Card>
        <CardContent className="pt-6">
          <ReadOurReviewForm
            initialData={initialData}
            onSubmit={handleSubmit}
            onCancel={() => router.push("/dashboard/ReadOurReview")}
          />
        </CardContent>
      </Card>
    </div>
  );
}
