"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import { SingleResponse, HomePageDataFormValues, HomePageData } from "@/types";
import { Loader2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import HomePageDataForm from "@/components/dashboard/homepage-content/HomePageDataForm";

export default function HomepageContentPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentId, setContentId] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<HomePageDataFormValues | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await apiService<SingleResponse<HomePageData>>("/homepage");

      if (res.success && res.data) {
        const record = res.data;
        setContentId(record._id);

        setInitialData({
          pagename: record.pagename || "",
          slug: record.slug || "",
          heroSecton: record.heroSecton,
          reasonsToChoose: record.reasonsToChoose,
          aisection: record.aisection,
          aboutOurCompany: record.aboutOurCompany,
          overseasWebAgencies: record.overseasWebAgencies,
          seo: record.seo
        });
      }
    } catch (error: any) {
      console.error("❌ Error fetching home page content:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSubmit = async (values: HomePageDataFormValues) => {
    setIsSubmitting(true);
    try {
      let res;
      if (contentId) {
        // Update existing record
        res = await apiService<SingleResponse<HomePageData>>(`/homepage/${contentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      } else {
        // Create new record
        res = await apiService<SingleResponse<HomePageData>>("/homepage", {
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
          description: contentId ? "Home content updated successfully" : "Home content created successfully",
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
                contentId ? "Edit Homepage Content" : "Create Homepage content"
              }
            </h2>
            <p className="text-muted-foreground">Manage the content and SEO for the home page</p>
          </div>
          <HomePageDataForm
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