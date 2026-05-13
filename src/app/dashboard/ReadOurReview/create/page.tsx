'use client';

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import PageHeader from "@/components/shared/PageHeader";
import ReadOurReviewForm, { ReadOurReviewFormValues } from "@/components/dashboard/ReadOurReview/ReadOurReviewForm";
import { Card, CardContent } from "@/components/ui/card";

export default function CreateReadOurReviewPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: ReadOurReviewFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>("/read-our-review", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.success) {
        toast({ title: "Success", description: "Review entry created successfully" });
        router.push("/dashboard/ReadOurReview");
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
        title="Add New Review Link"
        description="Create a new external review platform entry"

      />

      <Card>
        <CardContent className="pt-6">
          <ReadOurReviewForm
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
          />
        </CardContent>
      </Card>
    </div>
  );
}
