"use client";

import { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, Loader2 } from "lucide-react";
import { TiptapEditorNoSSR } from "@/components/shared/TiptapEditor";
import { Textarea } from "@/components/ui/textarea";


// ---------- Slug generation function ----------
const generateSlug = (text: string): string => {
  // 1. Remove HTML tags
  const plainText = text.replace(/<[^>]+>/g, "");

  // 2. Generate clean slug
  return plainText
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

// ---------- App URL config ----------
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
// const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";



// ---------------- Schema -----------------
const blogSchema = z.object({
  categories: z.string().min(2, "Category required"),
  subCategories: z.string().min(2, "SubCategory required"),
  slug: z.string().min(1).max(200),
  image: z.string().url("Valid image URL required"),
  details: z.object({
    title: z.string().min(2, "Title required"),
    description: z.string().min(5, "Description required"),
    author: z.string().min(2, "Author required"),
    answerOrDetails: z.string().min(5, "Answer/Details required"),
  }),
  seo_title: z.string().optional(),
  meta_description: z.string().max(500, "Meta description is too long").optional(),
  seo_keyphrase: z.string().optional(),
  cover_image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type BlogFormValues = z.infer<typeof blogSchema>;

interface BlogFormProps {
  initialData?: BlogFormValues | null;
  onSubmit: (data: BlogFormValues) => Promise<void>;
}

const CLOUDINARY_CLOUD_NAME = "dctvxbvuz";
const CLOUDINARY_UPLOAD_PRESET = "ITS_ADMIN";

export default function BlogForm({ initialData, onSubmit }: BlogFormProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      categories: "",
      subCategories: "",
      image: "",
      slug: "",
      details: {
        title: "",
        description: "",
        author: "",
        answerOrDetails: "",
      },
      seo_title: "",
      meta_description: "",
      seo_keyphrase: "",
      cover_image: "",
    },
  });
  const subCategoryValue = form.watch("details.title");
  const slugValue = form.watch("slug");

  useEffect(() => {
    if (subCategoryValue && !initialData?.slug) {
      const generatedSlug = generateSlug(subCategoryValue);
      form.setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [subCategoryValue, initialData?.slug, form]);

  // ✅ Reset form whenever initialData changes (for Edit dialog)
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  // Upload Image
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await response.json();
      if (data.secure_url) {
        form.setValue("image", data.secure_url, { shouldValidate: true });
        toast({ title: "Image Uploaded", description: "Image uploaded successfully." });
      } else throw new Error(data.error?.message || "Upload failed");
    } catch (error: any) {
      toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
      const data = await response.json();
      if (data.secure_url) {
        form.setValue("cover_image", data.secure_url, { shouldValidate: true });
        toast({ title: "Cover Image Uploaded" });
      } else throw new Error(data.error?.message || "Upload failed");
    } catch (error: any) {
      toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
      if (coverImageInputRef.current) coverImageInputRef.current.value = "";
    }
  };

  // Submit handler
  const handleSubmit: SubmitHandler<BlogFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      form.reset(); // optional: reset after submit
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Something went wrong", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Category */}
        <FormField control={form.control} name="categories" render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl><Input placeholder="Enter category" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* SubCategory */}
        <FormField control={form.control} name="subCategories" render={({ field }) => (
          <FormItem>
            <FormLabel>Sub Category</FormLabel>
            <FormControl><Input placeholder="Enter sub category" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Image Upload */}
        <FormField control={form.control} name="image" render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <div className="flex items-center gap-4 ">
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                ref={imageInputRef}
                onChange={handleImageUpload}
                disabled={isUploading || isSubmitting}
              />
              <Button
                type="button"
                className=" border border-gray-300"
                onClick={() => imageInputRef.current?.click()}
                disabled={isUploading || isSubmitting}
              >
                {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                Upload Image
              </Button>

              {field.value && (
                <img src={field.value} alt="Preview" className="h-16 w-16 rounded-md object-cover border" />
              )}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        {/* Details: Title */}
        <FormField control={form.control} name="details.title" render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <div className="border-gray-300 shadow-md rounded-md">
                <TiptapEditorNoSSR
                  value={field.value || ""}
                  onChange={(value) => {
                    field.onChange(value);
                    form.setValue("details.title", value, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField
          control={form.control}
          name="slug"
          render={() => {
            const slugValue = form.watch("slug");
            const permalink = `${APP_URL}/services/${slugValue}`;

            return (
              <FormItem>
                <FormLabel>Permalink</FormLabel>
                <FormControl>
                  <div className="space-y-1">
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

        {/* Hidden slug field for submission */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => <input type="hidden" {...field} />}
        />
        {/* Details: Description */}
        <FormField control={form.control} name="details.description" render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <div className="border-gray-300 shadow-md rounded-md">
                <TiptapEditorNoSSR
                  value={field.value || ""}
                  onChange={(value) => {
                    field.onChange(value);
                    form.setValue("details.description", value, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Details: Author */}
        <FormField
          control={form.control}
          name="details.author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* Details: Answer */}
        <FormField control={form.control} name="details.answerOrDetails" render={({ field }) => (
          <FormItem>
            <FormLabel>Answer / Details</FormLabel>
            <FormControl>
              <div className="border border-gray-300 shadow-md rounded-md max-h-72 overflow-y-auto">
                <TiptapEditorNoSSR
                  value={field.value || ""}
                  onChange={(value) => {
                    field.onChange(value);
                    form.setValue("details.answerOrDetails", value, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <details className="group rounded-lg border bg-gray-50 p-4 open:shadow-lg">
          <summary className="cursor-pointer text-lg font-medium text-gray-800 group-open:text-blue-600">
            SEO Settings
          </summary>
          <div className="mt-4 space-y-6 pt-4 border-t">
            {/* SEO Title */}
            <FormField control={form.control} name="seo_title" render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Title</FormLabel>
                <FormControl><Input placeholder="Enter the SEO title (for search results)" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* SEO Keyphrase */}
            <FormField control={form.control} name="seo_keyphrase" render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Keyphrases</FormLabel>
                <FormControl><Textarea rows={2} placeholder="Enter keywords separated by commas" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Meta Description */}
            <FormField control={form.control} name="meta_description" render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl><Textarea rows={3} placeholder="Enter a brief summary for search results" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Cover Image */}
            <FormField control={form.control} name="cover_image" render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image (for Social Media)</FormLabel>
                <div className="flex items-center gap-4">
                  <Input type="file" accept="image/*" className="hidden" ref={coverImageInputRef} onChange={handleCoverImageUpload} disabled={isUploading} />
                  <Button type="button" variant="outline" onClick={() => coverImageInputRef.current?.click()} disabled={isUploading}>
                    {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                    Upload Cover Image
                  </Button>
                  {field.value && <img src={field.value} alt="Cover Preview" className="h-16 w-16 rounded-md object-cover border" />}
                </div>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </details>

        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600" disabled={isSubmitting || isUploading}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
