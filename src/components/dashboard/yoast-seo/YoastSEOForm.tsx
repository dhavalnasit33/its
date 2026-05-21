"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Globe, Laptop, Smartphone, HelpCircle } from "lucide-react";
import type { YoastSEOFormValues } from "@/types";
import ImageUpload from "@/components/ui/imagupload";
import CustomCKEditor from "@/components/shared/Ckeditor";

interface YoastFormProps {
  initialData?: YoastSEOFormValues | null;
  onSubmit: (data: YoastSEOFormValues) => Promise<void>;
  onCancel?: () => void;
}

export default function YoastSEOForm({
  initialData,
  onSubmit,
  onCancel,
}: YoastFormProps) {
  const { toast } = useToast();
  const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");

  const form = useForm<YoastSEOFormValues>({
    defaultValues: {
      seo_keyphrase: "",
      seo_title: "",
      meta_description: "",
      cover_image: "",
      page_description: "",
    },
  });

  // Watch fields for Google Snippet preview & Yoast analysis
  const watchedTitle = form.watch("seo_title");
  const watchedMetaDesc = form.watch("meta_description");
  const watchedKeyphrase = form.watch("seo_keyphrase");
  const watchedPageDesc = form.watch("page_description");

  // Populate values when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    } else {
      form.reset({
        seo_keyphrase: "",
        seo_title: "",
        meta_description: "",
        cover_image: "",
        page_description: "",
      });
    }
  }, [initialData, form]);

  const handleFormSubmit: SubmitHandler<YoastSEOFormValues> = async (data) => {
    setInternalIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save Yoast SEO settings.",
        variant: "destructive",
      });
    } finally {
      setInternalIsSubmitting(false);
    }
  };

  // Length helper styling
  const getScoreColor = (value: string, idealMin: number, idealMax: number) => {
    const len = value?.length || 0;
    if (len === 0) return "bg-slate-200 text-slate-600";
    if (len >= idealMin && len <= idealMax) return "bg-emerald-100 text-emerald-800 border-emerald-300";
    if (len > 0 && len < idealMin) return "bg-amber-100 text-amber-800 border-amber-300";
    return "bg-rose-100 text-rose-800 border-rose-300";
  };

  const getScoreStatus = (value: string, idealMin: number, idealMax: number) => {
    const len = value?.length || 0;
    if (len === 0) return "Empty";
    if (len >= idealMin && len <= idealMax) return "Good";
    if (len > 0 && len < idealMin) return "Too Short";
    return "Too Long";
  };

  // Google Search snippet previews
  const previewTitle = watchedTitle || "Please enter an SEO title...";
  const previewMeta = watchedMetaDesc || "Please enter a meta description to see how your site search result will appear in search engine listings.";
  const previewUrl = `https://inspiretechnosolution.com/${watchedKeyphrase
    ? watchedKeyphrase.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    : "seo-optimized-page"
    }`;

  const isKeyphraseInTitle =
    watchedKeyphrase && watchedTitle?.toLowerCase().includes(watchedKeyphrase.toLowerCase());
  const isKeyphraseInMeta =
    watchedKeyphrase && watchedMetaDesc?.toLowerCase().includes(watchedKeyphrase.toLowerCase());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Form Fields (Col span 8) */}
          <div className="lg:col-span-8 space-y-6">
            <Card >
              <CardHeader >
                <CardTitle >Focus Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6 pt-0">
                <FormField
                  control={form.control}
                  name="seo_keyphrase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" flex items-center gap-1.5">
                        Focus Keyphrase
                        <span title="The search term you want this page to rank for.">
                          <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. inspire techno solution, best web developers"
                          maxLength={200}
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-end text-xs text-slate-500 mt-1 select-none font-mono">
                        {watchedKeyphrase?.length || 0} / 200
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seo_title"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>SEO Title</FormLabel>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${getScoreColor(watchedTitle, 40, 60)}`}>
                          Title Length: {watchedTitle?.length || 0} chars ({getScoreStatus(watchedTitle, 40, 60)})
                        </span>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="e.g. Inspire Techno Solution | Leading Software Development Company"
                          maxLength={200}
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-end text-xs text-slate-500 mt-1 select-none font-mono">
                        {watchedTitle?.length || 0} / 200
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="meta_description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>Meta Description</FormLabel>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${getScoreColor(watchedMetaDesc, 120, 160)}`}>
                          Desc Length: {watchedMetaDesc?.length || 0} chars ({getScoreStatus(watchedMetaDesc, 120, 160)})
                        </span>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="Provide a compelling meta description to increase click-through rate (ideal: 120-160 characters)"
                          rows={3}
                          maxLength={300}
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-end text-xs text-slate-500 mt-1 select-none font-mono">
                        {watchedMetaDesc?.length || 0} / 300
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card >
              <CardHeader >
                <CardTitle>Page Content</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <FormField
                  control={form.control}
                  name="page_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page Content / Description</FormLabel>
                      <FormControl>
                        <CustomCKEditor value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Google Search Snippet & Social OG Image (Col span 4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. Cover Image / OG Image */}
            <Card >
          
              <CardContent className="p-6 space-y-6 ">
                <CardTitle>Social Feature Image</CardTitle>
                <FormField
                  control={form.control}
                  name="cover_image"
                  render={({ field }) => (
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full h-44"
                      />
                    </FormControl>
                  )}
                />
                <span className="text-[10px] text-muted-foreground block leading-tight">
                  This cover image will appear when your page URL is shared on platforms like Facebook, WhatsApp, and Twitter.
                </span>
              </CardContent>
            </Card>

          </div>

        </div>

        <div className="flex justify-end gap-3 border-t pt-6">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={internalIsSubmitting}
            >
              Reset / Cancel
            </Button>
          )}
          <Button type="submit" disabled={internalIsSubmitting} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow font-semibold">
            {internalIsSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Changes...
              </>
            ) : initialData ? (
              "Update Yoast SEO Content"
            ) : (
              "Create Yoast SEO Content"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
