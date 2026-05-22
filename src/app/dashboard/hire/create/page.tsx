"use client";

import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import HirePageForm from "@/components/dashboard/hire/HirePageDataForm";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import { HirePageDataFormValues } from "@/types";

export default function CreateHirePage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleCreate = async (data: HirePageDataFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>("/hire-page", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.success) {
        toast({ title: "Success", description: res.message || "Hire Page created successfully." });
        router.push("/dashboard/hire");
      } else {
        toast({ title: "Error", description: res.message || "Failed to create.", variant: "destructive" });
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
    <>
      <div className="space-y-6 mb-6">
        <PageHeader
          title="Create Hire Page"
          description="Create a new Hire Page with rich content modules."
        />
      </div>
      <HirePageForm onSubmit={handleCreate} initialData={null} />
    </>
  );
}
