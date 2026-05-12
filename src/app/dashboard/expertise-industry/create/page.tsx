'use client';

import { useRouter } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import ExpertiesIndustryForm, { ExpertiesIndustryFormValues } from "@/components/dashboard/experties-industries/ExpertiesIndustryForm";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";

export default function CreateExpertiseIndustryPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: ExpertiesIndustryFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>("/expertise-industries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.success) {
        toast({ title: "Success", description: "Expertise industry created successfully." });
        router.push("/dashboard/expertise-industry");
      } else {
        throw new Error(res.message || "Failed to create expertise industry.");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Expertise Industry"
        description="Create a new entry for expertise industries"
      />
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <ExpertiesIndustryForm
          onSubmit={handleSubmit}
          onCancel={() => router.push("/dashboard/expertise-industry")}
        />
      </div>
    </div>
  );
}
