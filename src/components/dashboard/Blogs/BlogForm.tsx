"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import CustomCKEditor from "@/components/shared/Ckeditor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUpload from "@/components/ui/imagupload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import apiService from "@/lib/apiService";
import { APP_URL } from "@/config";


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
// const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
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

interface CategoryItem {
  _id: string;
  category: string;
}

interface SubCategoryItem {
  _id: string;
  category: string; // parent category ID
  subcategory: string;
}

export default function BlogForm({ initialData, onSubmit,  onCancel, }: BlogFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategoryItem[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategoryItem[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      categories: typeof initialData?.categories === 'object' && initialData.categories
        ? (initialData.categories as any)._id || ""
        : (initialData?.categories || ""),
      subCategories: typeof initialData?.subCategories === 'object' && initialData.subCategories
        ? (initialData.subCategories as any)._id || ""
        : (initialData?.subCategories || ""),
      image: initialData?.image || "",
      slug: initialData?.slug || "",
      details: {
        title: initialData?.details?.title || "",
        description: initialData?.details?.description || "",
        author: initialData?.details?.author || "",
        answerOrDetails: initialData?.details?.answerOrDetails || "",
      },
      seo_title: initialData?.seo_title || "",
      meta_description: initialData?.meta_description || "",
      seo_keyphrase: initialData?.seo_keyphrase || "",
      cover_image: initialData?.cover_image || "",
    },
  });

  const subCategoryValue = form.watch("details.title");
  const selectedCategoryId = form.watch("categories");

  useEffect(() => {
    fetchCategories();
    fetchAllSubCategories();
  }, []);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await apiService<{
        success: boolean;
        data: CategoryItem[];
      }>("/category?moduleType=blogs&limit=100&page=1", { method: "GET" });

      if (res.success) {
        setCategories(res.data);
      } else {
        toast({
          title: "Error",
          description: "Failed to load categories",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Category fetch error:", err);
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      });
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchAllSubCategories = async () => {
    setLoadingSubCategories(true);
    try {
      const res = await apiService<{
        success: boolean;
        data: SubCategoryItem[];
      }>("/subcategory?moduleType=blogs&limit=100&page=1", { method: "GET" });

      if (res.success) {
        setSubCategories(res.data);
      } else {
        toast({
          title: "Error",
          description: "Failed to load subcategories",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("SubCategory fetch error:", err);
      toast({
        title: "Error",
        description: "Failed to load subcategories",
        variant: "destructive",
      });
    } finally {
      setLoadingSubCategories(false);
    }
  };

  useEffect(() => {
    if (selectedCategoryId && subCategories.length > 0) {
      const filtered = subCategories.filter(
        (s) => s.category === selectedCategoryId
      );
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
    }
  }, [selectedCategoryId, subCategories]);

  useEffect(() => {
    if (subCategoryValue && !initialData?.slug) {
      const generatedSlug = generateSlug(subCategoryValue);
      form.setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [subCategoryValue, initialData?.slug, form]);

  // ✅ Reset form whenever initialData changes (for Edit dialog)
  useEffect(() => {
    if (initialData) {
      const formattedData = {
        ...initialData,
        categories: typeof initialData.categories === 'object' && initialData.categories
          ? (initialData.categories as any)._id || ""
          : (initialData.categories || ""),
        subCategories: typeof initialData.subCategories === 'object' && initialData.subCategories
          ? (initialData.subCategories as any)._id || ""
          : (initialData.subCategories || ""),
      };
      form.reset(formattedData);
    }
  }, [initialData, form]);

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
            <FormField control={form.control} name="categories" render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(val) => {
                    field.onChange(val);
                    // Reset subcategory if category changes
                    form.setValue("subCategories", "");
                  }}
                  value={field.value}
                  disabled={loadingCategories}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          loadingCategories
                            ? "Loading categories..."
                            : "Select a category"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.category}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        No categories found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-600 text-sm mt-1" />
              </FormItem>
            )} />

            {/* SubCategory */}
            <FormField control={form.control} name="subCategories" render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={loadingSubCategories || !selectedCategoryId}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !selectedCategoryId
                            ? "First select a category"
                            : loadingSubCategories
                              ? "Loading subcategories..."
                              : filteredSubCategories.length === 0
                                ? "No subcategories found"
                                : "Select a subcategory"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filteredSubCategories.length > 0 ? (
                      filteredSubCategories.map((sub) => (
                        <SelectItem key={sub._id} value={sub._id}>
                          {sub.subcategory}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        {!selectedCategoryId
                          ? "Select category first"
                          : "No subcategories for this category"}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-600 text-sm mt-1" />
              </FormItem>
            )} />

            {/* Image Upload */}
            <FormField control={form.control} name="image" render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value || ""}
                    onChange={field.onChange}
                    disabled={isSubmitting}
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
                const permalink = `${APP_URL}/blog/${slugValue}`;

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
              <CardHeader>
                <CardTitle className="text-primary">
                    SEO Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
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
                          <FormControl>
                            <Input placeholder="Enter keywords separated by commas" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      {/* Meta Description */}
                      <FormField control={form.control} name="meta_description" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Description</FormLabel>
                          <FormControl>
                            <Textarea rows={3} placeholder="Enter a brief summary for search results" {...field} />
                          </FormControl>
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
                              value={field.value || ""}
                              onChange={field.onChange}
                              disabled={isSubmitting}
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

              <Button type="submit" disabled={isSubmitting}>
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
