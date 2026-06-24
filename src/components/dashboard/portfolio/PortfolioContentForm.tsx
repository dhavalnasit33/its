"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2 } from "lucide-react";
import ImageUpload from "@/components/ui/imagupload";
import { PortfolioContentFormValues } from "@/types";
import * as z from "zod";
import CustomCKEditor from "@/components/shared/Ckeditor";
import { APP_URL } from "@/config";

const portfolioSchema = z.object({
  pagename: z.string(),
    slug: z.string(),
  heroSection: z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    image: z.string().url("Image required"),
    // points: z.array(
    //   z.object({
    //     label: z.string().min(2),
    //     image: z.string().url(),
    //   })
    // ).length(4),
    }),
  seo: z.object({
    title: z.string(),
    keyphrase: z.string(),
    seoDescription: z.string(),
    featureImage: z.string().nullable().optional().or(z.literal("")),
  }),
});

interface PortfolioContentFormProps {
  initialData?: PortfolioContentFormValues | null;
  onSubmit: (data: PortfolioContentFormValues) => Promise<void>;
  onCancel?: () => void;
}

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}; 

export default function PortfolioContentForm({
  initialData,
  onSubmit,
  onCancel,
}: PortfolioContentFormProps) {
  const { toast } = useToast();
  const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);
    const isFirstRender = useRef(true);

  const form = useForm<PortfolioContentFormValues>({
    resolver: zodResolver(portfolioSchema) as any,
    defaultValues: initialData || {
      pagename: "",
      slug: "",
      heroSection: {
        title: "",
        description: "",
        image: "",
        // points: [
        //   { label: "", image: "" },
        //   // { label: "", image: "" },
        //   // { label: "", image: "" },
        //   // { label: "", image: "" },
        // ],
      },
      seo: {
        title: "",
        keyphrase: "",
        seoDescription: "",
        featureImage: "",
      },
    },
  });
  const titleValue = form.watch("pagename");
     useEffect(() => {
         if (isFirstRender.current) {
           isFirstRender.current = false;
           return;
         }
         if (titleValue) {
           form.setValue("slug", generateSlug(titleValue), {
             shouldValidate: true,
           });
         }
       }, [titleValue, form]);
       

  // const { fields: heroPoints, append: appendHeroPoint, remove: removeHeroPoint } = useFieldArray({
  //   control: form.control as any,
  //   name: "heroSection.points",
  // });

  const handleFormSubmit: SubmitHandler<PortfolioContentFormValues> = async (data) => {
    setInternalIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setInternalIsSubmitting(false);
    }
  };

  const isSubmitting = internalIsSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit as any)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
             <Card>
                  <CardHeader>
                      <CardTitle>Page Settings</CardTitle>
                  </CardHeader>
  
                  <CardContent className="space-y-4">
  
                      <FormField
                      control={form.control}
                      name="pagename"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Page Name</FormLabel>
                          <FormControl>
                              <Input placeholder="Enter a Page Name..." {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                      />
                      <FormField
                          control={form.control}
                          name="slug"
                          render={() => {
                          const slugValue = form.watch("slug");
                          const permalink = `${APP_URL}/${slugValue}`;
                          return (
                              <FormItem className="mb-0">
                              <FormLabel>Permalink</FormLabel>
                              <FormControl>
                                  <div>
                                  {slugValue && (
                                      <div className="text-sm text-muted-foreground p-2 bg-gray-50 rounded-md border">
                                      <strong>URL:</strong>{" "}
                                      <a
                                          href={permalink}
                                          className="text-blue-600 hover:underline break-all"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                      >
                                          {permalink}
                                      </a>
                                      </div>
                                  )}
                                  </div>
                              </FormControl>
                              </FormItem>
                          );
                          }}
                      />
                      <FormField
                          control={form.control}
                          name="slug"
                          render={({ field }) => <input type="hidden" {...field} />}
                      />
                  </CardContent>
              </Card>
            {/* Hero Section */}
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control as any}
                  name="heroSection.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter hero title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control as any}
                  name="heroSection.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        {/* <Textarea placeholder="Enter hero description" rows={4} {...field} /> */}
                      <CustomCKEditor
                        value={field.value || ""}
                        onChange={(data: string) => {
                            field.onChange(data);
                        }}
                      />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control as any}
                  name="heroSection.image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hero Main Image</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          className="w-full h-48"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <div className="space-y-4">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Card
                      key={index}
                      className="relative p-4 border border-dashed rounded-xl"
                    >
                      <div className="space-y-4">

                        <FormField
                          control={form.control}
                          name={`heroSection.points.${index}.label`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Label</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Innovation"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`heroSection.points.${index}.image`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Icon/Image</FormLabel>

                              <FormControl>
                                <ImageUpload
                                  value={field.value || ""}
                                  onChange={field.onChange}
                                  className="w-full h-32"
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                      </div>
                    </Card>
                  ))}
                </div>
                  </div> */}
              </CardContent>
            </Card>

            {/* SEO Text Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control as any}
                  name="seo.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Search engine title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name="seo.keyphrase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Focus Keyphrase</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Portfolio ITS" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name="seo.seoDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Brief summary for search results" rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8 lg:col-span-1">
            {/* Right Column: SEO Feature Image Only */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control as any}
                  name="seo.featureImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO Feature Image (Social Share)</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value || ""}
                          onChange={field.onChange}
                          className="w-full h-48"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t pt-6 mt-8">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {initialData ? "Updating..." : "Creating..."}
              </>
            ) : (
              initialData ? "Update Portfolio" : "Create Portfolio"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
