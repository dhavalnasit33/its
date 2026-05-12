'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import EngagementModelForm, { EngagementModelFormValues } from "@/components/dashboard/EngagementModel/EngagementModelfrom";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { EngagementModel } from "@/types";

export default function EditEngagementModelPage() {
  const router = useRouter();
  const { id } = useParams();
  const { toast } = useToast();
  const [item, setItem] = useState<EngagementModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await apiService<{ success: boolean; data: EngagementModel }>(`/engagement-model/${id}`, {
          method: "GET",
        });

        if (res.success) {
          setItem(res.data);
        } else {
          toast({ title: "Error", description: "Failed to fetch engagement model data.", variant: "destructive" });
          router.push("/dashboard/EngagementModel");
        }
      } catch (error) {
        toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
        router.push("/dashboard/EngagementModel");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchItem();
  }, [id, router, toast]);

  const handleSubmit = async (data: EngagementModelFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>(`/engagement-model/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.success) {
        toast({ title: "Success", description: "Engagement model updated successfully." });
        router.push("/dashboard/EngagementModel");
      } else {
        throw new Error(res.message || "Failed to update engagement model.");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Engagement Model"
        description="Update the engagement model details"
      />
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        ) : item ? (
          <EngagementModelForm
            initialData={item}
            onSubmit={handleSubmit}
            onCancel={() => router.push("/dashboard/EngagementModel")}
          />

        ) : (
          <p>Entry not found.</p>
        )}
      </div>
    </div>
  );
}
