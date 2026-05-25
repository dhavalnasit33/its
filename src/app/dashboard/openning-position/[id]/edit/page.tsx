"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import PageHeader from "@/components/shared/PageHeader";
import OpenningPositionForm from "@/components/dashboard/openning-position/OpenningPositionForm";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { OpenningPosition, OpenningPositionFormValues, SingleResponse } from "@/types";

export default function EditOpenningPositionPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [initialData, setInitialData] = useState<OpenningPositionFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiService<SingleResponse<OpenningPosition>>(
          `/opennig-position/${params.id}`
        );

        if (res.success && res.data) {
          setInitialData({
            name: res.data.name,
            image: res.data.image,
            openning: res.data.openning,
            qualifications: res.data.qualifications,
            experience: res.data.experience,
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch data",
            variant: "destructive",
          });
          router.push("/dashboard/openning-position");
        }
      } catch (error) {
        console.error("Error fetching opening:", error);
        router.push("/dashboard/openning-position");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) fetchData();
  }, [params.id, router, toast]);

  const handleSubmit = async (data: OpenningPositionFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>(
        `/opennig-position/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (res.success) {
        toast({
          title: "Success",
          description: "Job opening updated successfully",
        });
        router.push("/dashboard/openning-position");
      } else {
        throw new Error(res.message || "Failed to update position");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="p-6 space-y-6">
  //       <Skeleton className="h-10 w-48" />
  //       <Card>
  //         <CardContent className="pt-6 space-y-4">
  //           <Skeleton className="h-10 w-full" />
  //           <Skeleton className="h-64 w-full" />
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Edit Job Opening"
        description="Update the details of this position"
      />
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      ) : initialData ? (
      <Card>
        <CardContent className="pt-6">
          <OpenningPositionForm
            initialData={initialData}
            onSubmit={handleSubmit}
            onCancel={() => router.push("/dashboard/openning-position")}
          />
        </CardContent>
      </Card>
      ) : (
        <p>Entry not found.</p>
      )}
    </div>
  );
}
