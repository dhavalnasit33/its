"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";

import { AboutUsContent, AboutUsContentFormValues, SingleResponse } from "@/types";
import AboutUsForm from "@/components/dashboard/AboutUs/AboutUsForm";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutUsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentId, setContentId] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<AboutUsContentFormValues | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const res = await apiService<SingleResponse<AboutUsContent>>("/about-us");

        if (res.success && res.data) {
          const record = res.data;
          setContentId(record._id);

          // Map API data to form values
          setInitialData({
            pagename: record.pagename || "",
            slug: record.slug || "",
            heroSection: record.heroSection,
            whoWeAre: record.whoWeAre,
            goals: record.goals,
            seo: record.seo || {
              title: "",
              keyphrase: "",
              seoDescription: "",
              featureImage: null,
            },
          });
        }
      } catch (error: any) {
        console.error("❌ Error fetching About Us content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleSubmit = async (values: AboutUsContentFormValues) => {
    setIsSubmitting(true);
    try {
      let res;
      if (contentId) {
        // Update existing record
        res = await apiService<SingleResponse<AboutUsContent>>(`/about-us/${contentId}`, {
          method: "PUT",
          body: values as any,
        });
      } else {
        // Create new record
        res = await apiService<SingleResponse<AboutUsContent>>("/about-us", {
          method: "POST",
          body: values as any,
        });
      }

      if (res.success) {
        toast({
          title: "Success",
          description: contentId ? "About Us content updated successfully" : "About Us content created successfully",
        });
        if (!contentId && res.data) {
          setContentId(res.data._id);
        }
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
        <p className="text-muted-foreground animate-pulse">Loading About Us content...</p>
      </div>
    );
  }

  return (
    <div className="p-6 w-full ">

      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight">
              {initialData ? "Update About Us Content" : "Create About Us Content"}
            </h2>
            <p className="text-muted-foreground">
              Manage the Hero section, Who We Are details, Company Goals, and SEO settings for the About Us page.
            </p>
          </div>

          <AboutUsForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onCancel={() => setInitialData({ ...initialData! })}
          />
        </CardContent>
      </Card>

    </div>
  );
}