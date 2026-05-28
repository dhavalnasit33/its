"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import ServiceCategoryForm from "@/components/dashboard/service-category/ServiceCategoryForm";
import { ServiceCategoryFormValues } from "@/types";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditServiceCategoryPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { toast } = useToast();

  const [initialData, setInitialData] = useState<ServiceCategoryFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await apiService<{
          success: boolean;
          data: ServiceCategoryFormValues;
        }>(`/service-category/${id}`, { method: "GET" });

        if (res.success) {
          setInitialData(res.data);
        } else {
          toast({
            title: "Error",
            description: "Failed to retrieve service category details",
            variant: "destructive",
          });
          router.push("/dashboard/service-category-page");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong while fetching details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleEdit = async (data: ServiceCategoryFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>(
        `/service-category/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.success) {
        toast({ title: "Success", description: res.message });
        router.push("/dashboard/service-category-page");
      } else {
        toast({ title: "Error", description: res.message, variant: "destructive" });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Service Category"
        description="Update the service category details"
      />
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      ) : initialData ? (
        <Card className="border border-slate-100 shadow-sm bg-white">
          <CardContent className="pt-6">
            <ServiceCategoryForm
              onSubmit={handleEdit}
              initialData={initialData}
              onCancel={() => router.push("/dashboard/service-category-page")}
            />
          </CardContent>
        </Card>
      ) : (
        <p>Service category not found.</p>
      )}
    </div>
  );
}
