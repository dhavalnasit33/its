'use client';

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import PageHeader from "@/components/shared/PageHeader";
import CreativeWorkForm, { CreativeWorkFormValues } from "@/components/dashboard/creativeWork/CreativeWorkForm";
import { Card, CardContent } from "@/components/ui/card";

export default function CreateCreativeWorkPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: CreativeWorkFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>("/creative-work", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.success) {
        toast({ title: "Success", description: "Creative work entry created successfully" });
        router.push("/dashboard/creativeWork");
      } else {
        throw new Error(res.message || "Failed to create entry");
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
        title="Add New Creative Work"
        description="Create a new portfolio creative work entry"
      />

      <Card>
        <CardContent className="pt-6">
          <CreativeWorkForm
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
          />
        </CardContent>
      </Card>
    </div>
  );
}
