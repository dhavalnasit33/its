"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import type { YoastSEO, YoastSEOFormValues } from "@/types";
import YoastSEOForm from "@/components/dashboard/yoast-seo/YoastSEOForm";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function YoastSEOManagerPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [contentId, setContentId] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<YoastSEOFormValues | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      // Fetching all entries
      const res = await apiService<{
        success: boolean;
        data: YoastSEO[];
      }>("/yoast-seo");

      if (res.success && res.data && res.data.length > 0) {
        // If there's an existing record, grab the first one
        const record = res.data[0];
        setContentId(record._id);

        setInitialData({
          seo_keyphrase: record.seo_keyphrase || "",
          seo_title: record.seo_title || "",
          meta_description: record.meta_description || "",
          cover_image: record.cover_image || "",
          page_description: record.page_description || "",
        });
      } else {
        setContentId(null);
        setInitialData(null);
      }
    } catch (error: any) {
      console.error("❌ Error fetching Yoast SEO content:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSubmit = async (values: YoastSEOFormValues) => {
    try {
      let res;
      if (contentId) {
        // Update existing record
        res = await apiService<{ success: boolean; data: YoastSEO }>(
          `/yoast-seo/${contentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
      } else {
        // Create new record
        res = await apiService<{ success: boolean; data: YoastSEO }>("/yoast-seo", {
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
          description: contentId
            ? "Yoast SEO configuration updated successfully"
            : "Yoast SEO configuration created successfully",
        });
        if (!contentId && res.data) {
          setContentId(res.data._id);
        }
        fetchContent();
      } else {
        throw new Error("Failed to save Yoast SEO content");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        <p className="text-muted-foreground animate-pulse">Loading Yoast SEO content...</p>
      </div>
    );
  }

  return (
    <div className="p-6 w-full space-y-6">
      <Card className="border border-slate-100 shadow-md bg-white">
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">
              {contentId ? "Update Yoast SEO Configuration" : "Create Yoast SEO Configuration"}
            </h2>
            <p className="text-muted-foreground text-sm">
              Manage your site-wide focus keyphrases, snippet layout tags, page detail description, and search social images.
            </p>
          </div>
          <YoastSEOForm
            initialData={initialData}
            onSubmit={handleSubmit}
            onCancel={() => fetchContent()}
          />
        </CardContent>
      </Card>
    </div>
  );
}
