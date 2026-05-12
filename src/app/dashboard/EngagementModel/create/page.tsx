'use client';

import { useRouter } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import EngagementModelForm, { EngagementModelFormValues } from "@/components/dashboard/EngagementModel/EngagementModelfrom";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";

export default function CreateEngagementModelPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: EngagementModelFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>("/engagement-model", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.success) {
        toast({ title: "Success", description: "Engagement model created successfully." });
        router.push("/dashboard/EngagementModel");
      } else {
        throw new Error(res.message || "Failed to create engagement model.");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Engagement Model"
        description="Create a new engagement model entry"
      />
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <EngagementModelForm
          onSubmit={handleSubmit}
          onCancel={() => router.push("/dashboard/EngagementModel")}
        />

      </div>
    </div>
  );
}
