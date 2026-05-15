"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import PageHeader from "@/components/shared/PageHeader";
import OpenningPositionForm from "@/components/dashboard/openning-position/OpenningPositionForm";
import { Card, CardContent } from "@/components/ui/card";
import { OpenningPositionFormValues } from "@/types";

export default function CreateOpenningPositionPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: OpenningPositionFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>(
        "/opennig-position",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (res.success) {
        toast({
          title: "Success",
          description: "Job opening created successfully",
        });
        router.push("/dashboard/openning-position");
      } else {
        throw new Error(res.message || "Failed to create position");
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
    <div className="p-6 space-y-6">
      <PageHeader
        title="Create Job Opening"
        description="Add a new position to the careers page"
      />

      <Card>
        <CardContent className="pt-6">
          <OpenningPositionForm
            onSubmit={handleSubmit}
            onCancel={() => router.push("/dashboard/openning-position")}
          />
        </CardContent>
      </Card>
    </div>
  );
}
