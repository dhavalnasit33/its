'use client';

import { useRouter } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import TestimonialForm, { TestimonialFormValues } from "@/components/dashboard/Testimonials/TestimonialsForm";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";

export default function CreateTestimonialPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: TestimonialFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>("/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.success) {
        toast({ title: "Success", description: "Testimonial created successfully." });
        router.push("/dashboard/Testimonials");
      } else {
        throw new Error(res.message || "Failed to create testimonial.");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Testimonial"
        description="Create a new client testimonial"
      />
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <TestimonialForm
          onSubmit={handleSubmit}
          onCancel={() => router.push("/dashboard/Testimonials")}
        />
      </div>
    </div>
  );
}
