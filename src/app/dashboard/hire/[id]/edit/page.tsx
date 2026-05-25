"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import HirePageForm from "@/components/dashboard/hire/HirePageDataForm";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { HirePageDataFormValues } from "@/types";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditHirePage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { toast } = useToast();

  const [initialData, setInitialData] = useState<HirePageDataFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await apiService<{
          success: boolean;
          data: any;
        }>(`/hire-page/${id}`, { method: "GET" });

        if (res.success && res.data) {
          const item = res.data;
          // Transform category and subCategory populated objects to ID strings
          const transformed: HirePageDataFormValues = {
            category: typeof item.category === "object" && item.category ? item.category._id : (item.category || ""),
            subCategory: typeof item.subCategory === "object" && item.subCategory ? item.subCategory._id : (item.subCategory || ""),
            title: item.title || "",
            slug: item.slug || "",
            description: item.description || "",
            keyPoints: item.keyPoints || [""],
            successSpeacks: item.successSpeacks || { title: "", description: "", image: "" },
            hireDadiated: item.hireDadiated || { title: "", description: "", image: "" },
            unloackPower: item.unloackPower || { title: "", description: "", image: "" },
            ourExpertise: item.ourExpertise || { keyPoints: [""] },
            hireingProcess: item.hireingProcess || { steps: [""] },
            whyHireUs: item.whyHireUs || { title: "", details: [{ title: "", description: "" }] },
            techStack: item.techStack || { title: "", description: "", details: [{ title: "", section: 0, keyPoints: [""] }] },
            hireDevelopersAsYourNeeds: item.hireDevelopersAsYourNeeds || {
              title: "",
              planDetails: [{ timelLine: "", price: "", keyPoints: [""] }],
              benefits: [""],
            },
            faq: item.faq || [{ question: "", answer: "" }],
            seo: item.seo ? {
              title: item.seo.title || "",
              keyphrase: item.seo.keyphrase || "",
              seoDescription: item.seo.seoDescription || "",
              featureImage: item.seo.featureImage || "",
            } : {
              title: "",
              keyphrase: "",
              seoDescription: "",
              featureImage: "",
            },
          };
          setInitialData(transformed);
        } else {
          toast({
            title: "Error",
            description: "Hire Page Data not found",
            variant: "destructive",
          });
          router.push("/dashboard/hire");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load hire data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, router, toast]);

  const handleEdit = async (data: HirePageDataFormValues) => {
    try {
      const res = await apiService<{ success: boolean; message: string }>(`/hire-page/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.success) {
        toast({ title: "Success", description: res.message || "Hire page updated successfully." });
        router.push("/dashboard/hire");
      } else {
        toast({ title: "Error", description: res.message || "Failed to update.", variant: "destructive" });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  // if (loading) {
  //   return (
  //     <div className="space-y-4 p-4">
  //     <Skeleton className="h-10 w-full" />
  //         <Skeleton className="h-32 w-full" />
  //         <Skeleton className="h-10 w-32" />
  //     </div>
  //   );
  // }

  // if (!initialData) return (
  //   <div className="p-6 text-center">
  //     <p>Hire page data not found.</p>
  //     <Button onClick={() => router.push("/dashboard/hire")} className="mt-4">
  //       Back to List
  //     </Button>
  //   </div>
  // );

  return (
    <>
      <div className="space-y-6 mb-6">
        <PageHeader
          title="Edit Hire Page"
          description="Update Hire Page content modules and settings."
        />
      </div>
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      ) : initialData ? (
        <HirePageForm onSubmit={handleEdit} initialData={initialData} />
       ) : (
        <p>Entry not found.</p>
      )}
    </>
  );
}
