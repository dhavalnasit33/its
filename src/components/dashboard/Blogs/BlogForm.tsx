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
import { Textarea } from "@/components/ui/textarea";
import CustomCKEditor from "@/components/shared/Ckeditor";
import CardHeader from "@mui/material/CardHeader";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ImageUpload from "@/components/ui/imagupload";


// ---------- Slug generation function ----------
const generateSlug = (text: string): string => {
  const plainText = text.replace(/<[^>]+>/g, "");

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
  onCancel?: () => void;
}

const CLOUDINARY_CLOUD_NAME = "dctvxbvuz";
const CLOUDINARY_UPLOAD_PRESET = "ITS_ADMIN";

export default function BlogForm({ initialData, onSubmit,  onCancel, }: BlogFormProps) {
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
  // const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
    const handleImageUpload = async (file: File) => {
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

  // const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  const handleCoverImageUpload = async (file: File) => {
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
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="shadow-none">
                  <CardContent className="p-6 space-y-6">
            {/* Category */}
            <FormField control={form.control as any} name="categories" render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* SubCategory */}
            <FormField control={form.control} name="subCategories" render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter sub category" {...field} />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Image Upload */}
            <FormField control={form.control} name="image" render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  {/* <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={imageInputRef}
                    onChange={handleImageUpload}
                    disabled={isUploading || isSubmitting}
                  /> */}
                  <ImageUpload
                    type="file"
                    accept="image/*"
                    value={field.value || ""}
                    ref={imageInputRef}
                    onChange={handleImageUpload}
                    disabled={isUploading || isSubmitting}
                    className="w-68 h-48"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Details: Title */}
            <FormField control={form.control} name="details.title" render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                    <CustomCKEditor value={field.value || ""}  onChange={(value) => {
                        field.onChange(value);
                        form.setValue("details.title", value, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
                      }}
                      />
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
                    <CustomCKEditor
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
                    <CustomCKEditor
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
                </FormControl>
                <FormMessage/>
              </FormItem>
            )} 
            />
            </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 ">
               <CardTitle className="text-primary">SEO Settings</CardTitle>
                    <div className=" space-y-6  ">
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
                      </div>
                </CardContent>
            </Card>
            </div>
            
             <div className="space-y-8 lg:col-span-1">
              <Card>
                  <CardContent className="space-y-6 pt-6">
                      {/* Cover Image */}
                      <CardTitle>SEO Media</CardTitle>
                      <FormField control={form.control} name="cover_image" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cover Image (for Social Media)</FormLabel>
                          <FormControl>
                            <ImageUpload
                            type="file" accept="image/*"
                              value={field.value || ""}
                              ref={coverImageInputRef} 
                              onChange={handleCoverImageUpload}
                              disabled={isUploading}
                              className="w-full h-48"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    {/* </div> */}
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

              <Button type="submit" disabled={isSubmitting || isUploading }>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {initialData ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  initialData ? "Update Blog" : "Create Blog"
                )}
              </Button>
            </div>
            
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
