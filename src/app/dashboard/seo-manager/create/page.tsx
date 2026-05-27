'use client';

import { useRouter } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import HomeChooseItsForm, { HomeChooseItsFormValues } from "@/components/dashboard/Why-Choose-ITS/HomeChooseItsForm";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import { SeoManagerFormValues } from "@/types";
import SeoManagerForm from "@/components/dashboard/seo-manager/SeoManagerForm";

export default function CreateSeoManagerPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: SeoManagerFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>("/seo-manager", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });


      if (res.success) {
        toast({ title: "Success", description: "Entry created successfully." });
        router.push("/dashboard/seo-manager");
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
        title="Add New Seo"
        description="Create a new entry for the SEO Manager"

      />
      {/* <div className="rounded-xl border bg-card p-6 shadow-sm"> */}
        <SeoManagerForm
          onSubmit={handleSubmit}
          onCancel={() => router.push("/dashboard/seo-manager")}
        />

      {/* </div> */}
    </div>
  );
}
