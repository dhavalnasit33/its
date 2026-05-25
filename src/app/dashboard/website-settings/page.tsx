"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import type { WebsiteSettings, WebsiteSettingsFormValues } from "@/types";
import WebsiteSettingsForm from "@/components/dashboard/website-settings/WebsiteSettingsForm";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function WebsiteSettingsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [contentId, setContentId] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<WebsiteSettingsFormValues | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await apiService<{
        success: boolean;
        data: WebsiteSettings;
      }>("/website-settings");

      if (res.success && res.data) {
        const record = res.data;
        setContentId(record._id);

        setInitialData({
          favicon: record.favicon || "",
          logo_img: record.logo_img || "",
          address: record.address?.map((addr) => ({ value: addr })) || [{ value: "" }],
          emails: record.emails?.map((e) => ({
            email: e.email || "",
            emailType: e.emailType || "contact",
          })) || [{ email: "", emailType: "contact" }],
          phone: record.phone?.map((ph) => ({ value: ph })) || [{ value: "" }],
          social_media: record.social_media?.map((sm) => ({
            socialMediaName: sm.socialMediaName,
            link: sm.link,
            image: sm.image,
          })) || [{ socialMediaName: "", link: "", image: "", }],
        });
      } else {
        setContentId(null);
        setInitialData(null);
      }
    } catch (error: any) {
      console.error("❌ Error fetching Website Settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSubmit = async (values: WebsiteSettingsFormValues) => {
    
    try {
      // Map form arrays to pure string arrays for backend submission
      const payload = {
        favicon: values.favicon,
        logo_img: values.logo_img,
        address: values.address.map((a) => a.value).filter(Boolean),
        emails: values.emails.filter((e) => e.email),
        phone: values.phone.map((p) => p.value).filter(Boolean),
        social_media: values.social_media.filter((s) => s.socialMediaName || s.link || s.image),
      };
        console.log("PAYLOAD =>", payload);
      let res;
      if (contentId) {
        // Update existing record (PUT route on backend handles this at root path)
        res = await apiService<{ success: boolean; data: WebsiteSettings }>(
          "/website-settings",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
      } else {
        // Create new record
        res = await apiService<{ success: boolean; data: WebsiteSettings }>(
          "/website-settings",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
      }

      if (res.success) {
        toast({
          title: "Success",
          description: contentId
            ? "Website settings updated successfully."
            : "Website settings created successfully.",
        });
        if (!contentId && res.data) {
          setContentId(res.data._id);
        }
        fetchContent();
      } else {
        throw new Error("Failed to save settings.");
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
        <p className="text-muted-foreground animate-pulse">Loading Website Settings...</p>
      </div>
    );
  }

  return (
    <div className="p-6 w-full space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">
              {contentId ? "Update Website Settings" : "Create Website Settings"}
            </h2>
            <p className="text-muted-foreground text-sm">
              Configure global details for the website including the favicon tab logo, physical offices, helpline telephone lists, and active social media profiles.
            </p>
          </div>
          <WebsiteSettingsForm
            initialData={initialData}
            onSubmit={handleSubmit}
            onCancel={() => fetchContent()}
          />
        </CardContent>
      </Card>
    </div>
  );
}
