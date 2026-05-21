'use client';

import { useRouter } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import FaqsForm, { FaqsFormValues } from "@/components/dashboard/Faqs/FaqsForm";

export default function CreateFaqsPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: FaqsFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>("/faqs", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

    console.log("API RESPONSE:", res);
      if (res.success) {
        toast({ title: "Success", description: "Faqs created successfully." });
        router.push("/dashboard/Faqs");
      } else {
        throw new Error(res.message || "Failed to create Faqs.");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <>
    <div className="space-y-6">
      <PageHeader
        title="Create Faqs"
        description="Fill in the details below to create a new Faqs entry."
      />
      </div>
      <FaqsForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/Faqs")}
      />
    </>
  );
}
