'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import ExpertiesIndustryForm, { ExpertiesIndustryFormValues } from "@/components/dashboard/experties-industries/ExpertiesIndustryForm";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { ExpertiesIndustries } from "@/types";

export default function EditExpertiseIndustryPage() {
  const router = useRouter();
  const { id } = useParams();
  const { toast } = useToast();
  const [item, setItem] = useState<ExpertiesIndustries | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await apiService<{ success: boolean; data: ExpertiesIndustries }>(`/expertise-industries/${id}`, {

          method: "GET",
        });

        if (res.success) {
          setItem(res.data);
        } else {
          toast({ title: "Error", description: "Failed to fetch data.", variant: "destructive" });
          router.push("/dashboard/expertise-industry");
        }
      } catch (error) {
        toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
        router.push("/dashboard/expertise-industry");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchItem();
  }, [id, router, toast]);

  const handleSubmit = async (data: ExpertiesIndustryFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>(`/expertise-industries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.success) {
        toast({ title: "Success", description: "Updated successfully." });
        router.push("/dashboard/expertise-industry");
      } else {
        throw new Error(res.message || "Failed to update.");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Expertise Industry"
        description="Update the expertise industry details"
      />
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        ) : item ? (
          <ExpertiesIndustryForm
            initialData={item}
            onSubmit={handleSubmit}
            onCancel={() => router.push("/dashboard/expertise-industry")}
          />
        ) : (
          <p>Entry not found.</p>
        )}
      </div>
    </div>
  );
}
