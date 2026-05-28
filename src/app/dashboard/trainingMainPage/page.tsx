"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import { TrainingMainPageData, TrainingMainPageDataFormValues, SingleResponse } from "@/types";
import TrainingMainPageDataForm from "@/components/dashboard/trainingMainpage/TrainingMainPageDataForm";
import { Loader2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

export default function TrainingContentPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentId, setContentId] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<TrainingMainPageDataFormValues | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await apiService<SingleResponse<TrainingMainPageData>>("/training-main-page");

      if (res.success && res.data) {
        const record = res.data;
        setContentId(record._id);

        setInitialData({
          pagename: record.pagename || "",
          slug: record.slug || "",
          heroSection: record.heroSection,
          aboutusSection: record.aboutusSection,
          itsInstituteFacilitiesSection: record.itsInstituteFacilitiesSection,
          rightCoursePickSection: record.rightCoursePickSection,
          seo: record.seo || {
            title: "",
            keyphrase: "",
            seoDescription: "",
            featureImage: "",
          },
        });
      }
    } catch (error: any) {
      console.error("❌ Error fetching Training content:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSubmit = async (values: TrainingMainPageDataFormValues) => {
    setIsSubmitting(true);
    try {
      let res;
      if (contentId) {
        // Update existing record
        res = await apiService<SingleResponse<TrainingMainPageData>>(`/training-main-page/${contentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      } else {
        // Create new record
        res = await apiService<SingleResponse<TrainingMainPageData>>("/training-main-page", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      }

      if (res.success) {
        toast({
          title: "Success",
          description: contentId ? "Training content updated successfully" : "Training content created successfully",
        });
        if (!contentId && res.data) {
          setContentId(res.data._id);
        }
        fetchContent();
      } else {
        throw new Error(res.message || "Failed to save content");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Loading Training content...</p>
      </div>
    );
  }

  return (
    <div className="p-6 w-full space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight">
              {
                contentId ? "Update Training Main Page" : "Create Training Main Page"
              }
            </h2>
            <p className="text-muted-foreground">Manage the content and SEO for the training landing page</p>
          </div>
          <TrainingMainPageDataForm
            initialData={initialData}
            onSubmit={handleSubmit}
            onCancel={() => fetchContent()}
          />
        </CardContent>
      </Card>
      {/* <PageHeader
        title="Training Main Page"
        description="Manage the content and SEO for the training landing page"
      /> */}

    </div>
  );
}