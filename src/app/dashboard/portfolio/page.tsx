"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import { PortfolioContent, PortfolioContentFormValues, SingleResponse } from "@/types";
import PortfolioContentForm from "@/components/dashboard/portfolio/PortfolioContentForm";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PortfolioContentPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentId, setContentId] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<PortfolioContentFormValues | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await apiService<SingleResponse<PortfolioContent>>("/portfolio-content");

      if (res.success && res.data) {
        const record = res.data;
        setContentId(record._id);

        setInitialData({
          heroSection: record.heroSection,
          seo: record.seo || {
            title: "",
            keyphrase: "",
            seoDescription: "",
            featureImage: null,
          },
        });
      }
    } catch (error: any) {
      console.error("❌ Error fetching Portfolio content:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSubmit = async (values: PortfolioContentFormValues) => {
    setIsSubmitting(true);
    try {
      let res;
      if (contentId) {
        // Update existing record
        res = await apiService<SingleResponse<PortfolioContent>>(`/portfolio-content/${contentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      } else {
        // Create new record
        res = await apiService<SingleResponse<PortfolioContent>>("/portfolio-content", {
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
          description: contentId ? "Portfolio content updated successfully" : "Portfolio content created successfully",
        });
        if (!contentId && res.data) {
          setContentId(res.data._id);
        }
        // Refresh data to ensure consistency
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
        <p className="text-muted-foreground animate-pulse">Loading Portfolio content...</p>
      </div>
    );
  }

  return (
    <div className="p-6 w-full ">
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight">
              {contentId ? "Update Portfolio Content" : "Create Portfolio Content"}
            </h2>
            <p className="text-muted-foreground">
              Manage the Hero section, Portfolio details, and SEO settings for the Portfolio page.
            </p>
          </div>

          <PortfolioContentForm
            initialData={initialData}
            onSubmit={handleSubmit}
            onCancel={() => fetchContent()}
          />
        </CardContent>
      </Card>
    </div>
  );
}
