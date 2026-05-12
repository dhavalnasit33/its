'use client';

import { useRouter } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import HomeChooseItsForm, { HomeChooseItsFormValues } from "@/components/dashboard/Why-Choose-ITS/HomeChooseItsForm";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";

export default function CreateHomeChooseItsPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: HomeChooseItsFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>("/choose_its_home", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });


      if (res.success) {
        toast({ title: "Success", description: "Entry created successfully." });
        router.push("/dashboard/Why-Choose-ITS");
      } else {
        throw new Error(res.message || "Failed to create entry.");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Why Choose ITS"
        description="Create a new entry for the Why Choose ITS section"

      />
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <HomeChooseItsForm
          onSubmit={handleSubmit}
          onCancel={() => router.push("/dashboard/Why-Choose-ITS")}
        />

      </div>
    </div>
  );
}
