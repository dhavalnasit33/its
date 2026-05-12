'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import TestimonialForm, { TestimonialFormValues } from "@/components/dashboard/Testimonials/TestimonialsForm";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { Testimonials } from "@/types";

export default function EditTestimonialPage() {
  const router = useRouter();
  const { id } = useParams();
  const { toast } = useToast();
  const [item, setItem] = useState<Testimonials | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await apiService<{ success: boolean; data: Testimonials }>(`/testimonials/${id}`, {
          method: "GET",
        });

        if (res.success) {
          setItem(res.data);
        } else {
          toast({ title: "Error", description: "Failed to fetch testimonial data.", variant: "destructive" });
          router.push("/dashboard/Testimonials");
        }
      } catch (error) {
        toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
        router.push("/dashboard/Testimonials");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchItem();
  }, [id, router, toast]);

  const handleSubmit = async (data: TestimonialFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>(`/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.success) {
        toast({ title: "Success", description: "Testimonial updated successfully." });
        router.push("/dashboard/Testimonials");
      } else {
        throw new Error(res.message || "Failed to update testimonial.");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Testimonial"
        description="Update the client testimonial details"
      />
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        ) : item ? (
          <TestimonialForm
            initialData={item}
            onSubmit={handleSubmit}
            onCancel={() => router.push("/dashboard/Testimonials")}
          />
        ) : (
          <p>Testimonial not found.</p>
        )}
      </div>
    </div>
  );
}
