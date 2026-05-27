
"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import { TiptapEditorNoSSR } from "@/components/shared/TiptapEditor";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUpload from "@/components/ui/imagupload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import apiService from "@/lib/apiService";
import { Input } from "@/components/ui/input";
import { APP_URL } from "@/config";
import CustomCKEditor from "@/components/shared/Ckeditor";
// import ImageUpload from "@/components/shared/ImageUpload";

// ---------- Slug ----------
const generateSlug = (text: string): string =>
  text.toLowerCase().trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");



// ---------- Schema ----------
const servicestepperSchema = z.object({
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Sub Category is required"),
  name: z.string().min(1, "Name is required"),
  mainTitle: z.string().min(1, "Main Title is required"),
  description: z.string(),
  subMainTitle: z.string().min(1, "Sub MainTitle is required"),
  slug: z.string().min(1).max(200),
  subMainTitleDescription: z.string().min(1, "Sub Main Title Description is required"),
  contentBlocks: z.array(z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().min(1, "Image is required"),
  })),
  WhyWorkWithThis: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().min(1, "Image is required"),
    content: z.array(z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
    })),
  }),
  workProgress: z.string().optional(),
  toolsAndTechnology: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    details: z.array(z.object({
      section: z.number().min(1, "Section is required"),
      title: z.string().min(1, "Title is required"),
      keyPoints: z.array(z.string().min(1, "Each key point must not be empty")).min(1, "Key Points is required"),
    })),
  }),
  whyCompanyPerfersThis: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    content: z.array(z.object({
      name: z.string().min(1, "Name is required"),
      image: z.string().min(1, "Image is required"),
    })),
  }),
  faqs: z.array(z.object({
    question: z.string().min(1, "Question is required"),
    answer: z.string().min(1, "Answer is required"),
  })),

  seo: z.object({
    title: z.string().optional(),
    keyphrase: z.string().optional(),
    seoDescription: z.string().optional(),
    featureImage: z.string().optional(),
  }).optional(),




});

export type ServiceStepperFormValues = z.infer<typeof servicestepperSchema>;

interface ServiceManagerFormprops {
  initialData?: ServiceStepperFormValues | null;
  onSubmit: (data: ServiceStepperFormValues) => Promise<void>;
  onCancel?: () => void;
}

interface CategoryItem {
  _id: string;
  category: string;
}

interface SubCategoryItem {
  _id: string;
  category: string; // category ID (string)
  subcategory: string;
}


export default function ServiceStepperForm({ initialData, onSubmit, onCancel }: ServiceManagerFormprops) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const isFirstRender = useRef(true);

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategoryItem[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategoryItem[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);

  const form = useForm<ServiceStepperFormValues>({
    resolver: zodResolver(servicestepperSchema),
    defaultValues: {
      category: typeof initialData?.category === 'object' && initialData.category
        ? (initialData.category as any)._id
        : (initialData?.category || ""),
      subCategory: typeof initialData?.subCategory === 'object' && initialData.subCategory
        ? (initialData.subCategory as any)._id
        : (initialData?.subCategory || ""),
      name: (initialData as any)?.name || "",
      slug: initialData?.slug || "",
      mainTitle: initialData?.mainTitle || "",
      description: initialData?.description || "",
      subMainTitle: initialData?.subMainTitle || "",
      subMainTitleDescription: initialData?.subMainTitleDescription || "",
      contentBlocks: initialData?.contentBlocks?.length
        ? initialData.contentBlocks
        : [{ title: "", description: "", image: "" }],
      WhyWorkWithThis: initialData?.WhyWorkWithThis || {
        title: "", description: "", image: "",
        content: [{ title: "", description: "" }],
      },
      workProgress: initialData?.workProgress || "",
      toolsAndTechnology: initialData?.toolsAndTechnology || {
        title: "", description: "",
        details: [{ section: 0, title: "", keyPoints: [""] }],
      },
      whyCompanyPerfersThis: initialData?.whyCompanyPerfersThis || {
        title: "", description: "",
        content: [{ name: "", image: "" }],
      },
      faqs: initialData?.faqs || [{ question: "", answer: "" }],



      seo: initialData?.seo || {
        title: "",
        keyphrase: "",
        seoDescription: "",
        featureImage: "",
      },

    },
  });


  const nameValue = form.watch("name");
  const subCategoryValue = form.watch("subCategory");
  const selectedCategoryId = form.watch("category");


  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    if (nameValue) {
      form.setValue("slug", generateSlug(nameValue), { shouldValidate: true });
    }
  }, [nameValue]);

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
      }>("/category?limit=100&page=1", { method: "GET" });

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

  // ─── SubCategories fetch ───
  const fetchAllSubCategories = async () => {
    setLoadingSubCategories(true);
    try {
      const res = await apiService<{
        success: boolean;
        data: SubCategoryItem[];
      }>("/subcategory?limit=100&page=1", { method: "GET" });

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


  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, type } = result;
    if (type === "section") {
      const sections = form.getValues("toolsAndTechnology.details") || [];
      const [removed] = sections.splice(source.index, 1);
      sections.splice(destination.index, 0, removed);
      form.setValue("toolsAndTechnology.details", sections, { shouldDirty: true, shouldValidate: true });
    } else if (type.startsWith("keyPoint-")) {
      const sectionIdx = parseInt(type.split("-")[1]);
      const keyPoints = form.getValues(`toolsAndTechnology.details.${sectionIdx}.keyPoints`) || [];
      const [removed] = keyPoints.splice(source.index, 1);
      keyPoints.splice(destination.index, 0, removed);
      form.setValue(`toolsAndTechnology.details.${sectionIdx}.keyPoints`, keyPoints, { shouldDirty: true, shouldValidate: true });
    }
  };

  const handleFormSubmit: SubmitHandler<ServiceStepperFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      form.reset();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card >
      <div className="p-6">
        {/* <CardContent > */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={(val) => {
                              field.onChange(val);
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
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subCategory"
                      render={({ field }) => (
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
                      )}
                    />

                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter service name (e.g. ReactJS Development)"
                              {...field}
                              onBlur={(e) => field.onChange(e.target.value.trim())}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 text-sm mt-1" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="mainTitle"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Main Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter main title"
                              {...field}
                              onBlur={(e) => field.onChange(e.target.value.trim())}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 text-sm mt-1" />
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
                          <FormItem>
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

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            {/* <Textarea placeholder="Enter description" {...field} /> */}
                            <CustomCKEditor
                              value={field.value || ""}
                              onChange={(data: string) => {
                                  field.onChange(data);
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 text-sm mt-1" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* ─────────────── SUBMAIN TITLE ─────────────── */}
                <Card>
                  <CardHeader>
                    <CardTitle>SubMain Title</CardTitle>
                  </CardHeader>
                  <CardContent className=" space-y-6">

                    {/* <div className="space-y-4 "> */}
                    <FormField
                      control={form.control}
                      name="subMainTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sub Main Title</FormLabel>
                          <FormControl><Input placeholder="Enter sub main title" {...field} /></FormControl>
                          <FormMessage className="text-red-600 text-sm mt-1" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subMainTitleDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sub Main Title Description</FormLabel>
                          <FormControl>
                            {/* <Textarea placeholder="Enter sub main title description" {...field} /> */}
                            <CustomCKEditor
                                value={field.value || ""}
                                onChange={(data: string) => {
                                    field.onChange(data);
                                }}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 text-sm mt-1" />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center justify-between">
                      <FormLabel>Feature Points</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const arr = form.getValues("contentBlocks") || [];
                          form.setValue("contentBlocks", [...arr, { title: "", description: "", image: "" }], { shouldDirty: true, shouldValidate: true });
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Content Block
                      </Button>
                    </div>

                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      {form.watch("contentBlocks")?.map((block, idx) => (
                        <Card key={idx} className="relative p-4 border-dashed">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                            onClick={() => {
                              const arr = form.getValues("contentBlocks") || [];
                              form.setValue("contentBlocks", arr.filter((_, i) => i !== idx), { shouldDirty: true, shouldValidate: true });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <div className="space-y-4 pt-4">
                            {["title", "description"].map((fieldName) => (
                              <FormField
                                key={fieldName}
                                control={form.control}
                                name={`contentBlocks.${idx}.${fieldName}` as any}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</FormLabel>
                                    <FormControl>
                                      {fieldName === "description"
                                        ? <CustomCKEditor
                                            value={field.value || ""}
                                            onChange={(data: string) => {
                                                field.onChange(data);
                                            }}
                                          />
                                        // <Textarea placeholder="Enter description" {...field} />
                                        : <Input placeholder={`Enter ${fieldName}`} {...field} />
                                      }
                                    </FormControl>
                                    <FormMessage className="text-red-600 text-sm mt-1" />
                                  </FormItem>
                                )}
                              />
                            ))}

                            {/* ✅ ImageUpload component */}
                            <FormField
                              control={form.control}
                              name={`contentBlocks.${idx}.image` as any}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Image</FormLabel>
                                  <FormControl>
                                    <ImageUpload
                                      value={field.value || ""}
                                      onChange={(url) => form.setValue(`contentBlocks.${idx}.image`, url, { shouldValidate: true })}
                                      disabled={isSubmitting}
                                      className="w-full h-32"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-600 text-sm mt-1" />
                                </FormItem>
                              )}
                            />
                          </div>
                        </Card>
                      ))}
                    </div>
                    {/* </div> */}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Why Work</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="flex-1 space-y-6">
                        <FormField
                          control={form.control}
                          name="WhyWorkWithThis.title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <CustomCKEditor value={field.value || ""} onChange={(v) => { field.onChange(v); form.setValue("WhyWorkWithThis.title", v, { shouldDirty: true, shouldValidate: true }); }} />
                              </FormControl>
                              <FormMessage className="text-red-600 text-sm mt-1" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="WhyWorkWithThis.description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                {/* <Textarea placeholder="Enter description" {...field} value={field.value ?? ""} /> */}
                                <CustomCKEditor
                                      value={field.value || ""}
                                      onChange={(data: string) => {
                                          field.onChange(data);
                                      }}
                                  />
                                </FormControl>
                              <FormMessage className="text-red-600 text-sm mt-1" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <FormLabel>Work Points</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const arr = form.getValues("WhyWorkWithThis").content || [];
                          form.setValue("WhyWorkWithThis.content", [...arr, { title: "", description: "" }], { shouldDirty: true, shouldValidate: true });
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Content
                      </Button>
                    </div>




                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      {form.watch("WhyWorkWithThis")?.content?.map((_, idx) => (
                        <Card key={idx} className="relative p-4 border-dashed">
                          {/* <h5 className="font-semibold">Content {idx + 1}</h5> */}

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                            onClick={() => {
                              const arr = form.getValues("WhyWorkWithThis.content") || [];
                              form.setValue("WhyWorkWithThis.content", arr.filter((_, i) => i !== idx), { shouldDirty: true, shouldValidate: true });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>

                          <div className="space-y-4 pt-4">
                            {["title", "description"].map((f) => (
                              <FormField
                                key={f}
                                control={form.control}
                                name={`WhyWorkWithThis.content.${idx}.${f}` as any}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{f}</FormLabel>
                                    <FormControl>
                                      {f === "description"
                                        ? <CustomCKEditor
                                              value={field.value || ""}
                                              onChange={(data: string) => {
                                                  field.onChange(data);
                                              }}
                                          />
                                        // <Textarea placeholder="Enter description" {...field} value={field.value ?? ""} />
                                        : <Input placeholder={`Enter ${f}`} {...field} value={field.value ?? ""} />
                                      }
                                    </FormControl>
                                    <FormMessage className="text-red-600 text-sm mt-1" />
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* ─────────────── TOOLS & TECHNOLOGY ─────────────── */}
                <DragDropContext onDragEnd={onDragEnd}>
                  <Card>
                    {/* <div className="flex justify-between items-center border-b">
                  <CardHeader>
                    <CardTitle>
                      Tools & Technology
                      </CardTitle>
                    </CardHeader>
                  <Button
                    type="button"
                    className="m-3"
                    onClick={() => {
                      const arr = form.getValues("toolsAndTechnology.details") || [];
                      form.setValue("toolsAndTechnology.details", [...arr, { section: 0, title: "", keyPoints: [""] }], { shouldDirty: true, shouldValidate: true });
                    }}
                  >
                    Add Section
                  </Button>
                </div> */}
                    <CardHeader>
                      <CardTitle>Tools & Technology</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="toolsAndTechnology.title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <CustomCKEditor value={field.value || ""} onChange={(v) => { field.onChange(v); form.setValue("toolsAndTechnology.title", v, { shouldDirty: true, shouldValidate: true }); }} />
                            </FormControl>
                            <FormMessage className="text-red-600 text-sm mt-1" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="toolsAndTechnology.description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tool Description</FormLabel>
                            <FormControl>
                              <CustomCKEditor value={field.value || ""} onChange={(v) => { field.onChange(v); form.setValue("toolsAndTechnology.description", v, { shouldDirty: true, shouldValidate: true }); }} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />




                      <div className="flex items-center justify-between">
                        <FormLabel>Technology Points</FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const arr = form.getValues("toolsAndTechnology.details") || [];
                            form.setValue("toolsAndTechnology.details", [...arr, { section: 0, title: "", keyPoints: [""] }], { shouldDirty: true, shouldValidate: true });
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Section
                        </Button>
                      </div>

                      <Droppable droppableId="sections" type="section">
                        {(provided) => (
                          <div ref={provided.innerRef} className="grid gap-4 grid-cols-1 md:grid-cols-2" {...provided.droppableProps}>
                            {form.watch("toolsAndTechnology")?.details?.map((detail, idx) => (
                              <Draggable key={idx} draggableId={`section-${idx}`} index={idx}>
                                {(provided) => (
                                  <Card ref={provided.innerRef} {...provided.draggableProps} className="relative p-4 border-dashed">
                                    <div className="border-b  p-2 " {...provided.dragHandleProps}>
                                      <h3 className="text-md font-semibold">Section {idx + 1}</h3>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                        onClick={() => {
                                          const arr = form.getValues("toolsAndTechnology.details") || [];
                                          if (arr.length > 1) form.setValue("toolsAndTechnology.details", arr.filter((_, i) => i !== idx), { shouldDirty: true, shouldValidate: true });
                                        }}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>

                                    <div className="space-y-4 pt-6">
                                      <FormField
                                        control={form.control}
                                        name={`toolsAndTechnology.details.${idx}.section`}
                                        render={({ field }) => (
                                          <FormItem className="border p-2 border-gray-300 rounded flex items-center gap-6">
                                            <FormLabel className="mb-0">Select Section</FormLabel>
                                            <FormControl>
                                              <div className="flex gap-6">
                                                {[1, 2, 3, 4].map((num) => (
                                                  <label key={num} className="flex items-center space-x-2">
                                                    <input type="radio" value={num} checked={field.value === num} onChange={(e) => field.onChange(Number(e.target.value))} className="h-4 w-4 text-blue-600" />
                                                    <span>{num}</span>
                                                  </label>
                                                ))}
                                              </div>
                                            </FormControl>
                                            <FormMessage className="text-red-600 text-sm mt-1" />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`toolsAndTechnology.details.${idx}.title` as any}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl><Input placeholder="Enter Title" {...field} /></FormControl>
                                            <FormMessage className="text-red-600 text-sm mt-1" />
                                          </FormItem>
                                        )}
                                      />

                                      <Droppable droppableId={`keypoints-${idx}`} type={`keyPoint-${idx}`}>
                                        {(provided) => (
                                          <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
                                            {detail.keyPoints?.map((kp, kidx) => (
                                              <Draggable key={kidx} draggableId={`keypoint-${idx}-${kidx}`} index={kidx}>
                                                {(provided) => (
                                                  <div ref={provided.innerRef} {...provided.draggableProps} className="flex items-center gap-2">
                                                    <div {...provided.dragHandleProps} className="cursor-move p-2 bg-gray-100 rounded">☰</div>
                                                    <FormField
                                                      control={form.control}
                                                      name={`toolsAndTechnology.details.${idx}.keyPoints.${kidx}` as const}
                                                      render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                          <FormControl><Input className="w-full h-10" placeholder={`Key Point ${kidx + 1}`} {...field} /></FormControl>
                                                          <FormMessage className="text-red-600 text-sm mt-1" />
                                                        </FormItem>
                                                      )}
                                                    />
                                                    <Button
                                                      type="button"
                                                      variant="ghost"
                                                      size="icon"
                                                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                                      onClick={() => {
                                                        const arr = form.getValues(`toolsAndTechnology.details.${idx}.keyPoints`) || [];
                                                        if (arr.length > 1) form.setValue(`toolsAndTechnology.details.${idx}.keyPoints`, arr.filter((_, i) => i !== kidx), { shouldDirty: true, shouldValidate: true });
                                                      }}
                                                    >
                                                      <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                  </div>
                                                )}
                                              </Draggable>
                                            ))}
                                            {provided.placeholder}
                                          </div>
                                        )}
                                      </Droppable>

                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const arr = form.getValues(`toolsAndTechnology.details.${idx}.keyPoints`) || [];
                                          form.setValue(`toolsAndTechnology.details.${idx}.keyPoints`, [...arr, ""], { shouldDirty: true, shouldValidate: true });
                                        }}
                                      >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Key Point
                                      </Button>

                                    </div>
                                  </Card>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </CardContent>
                  </Card>
                </DragDropContext>

                {/* ─────────────── WHY COMPANY PREFERS ─────────────── */}
                <Card>
                  {/* <div className="flex justify-between border-b items-center">
                <CardHeader>
                  <CardTitle>
                    Why Company Prefers
                  </CardTitle> 
                </CardHeader>
                <Button
                  type="button"
                  className="m-3"
                  onClick={() => {
                    const current = form.getValues("whyCompanyPerfersThis.content") || [];
                    form.setValue("whyCompanyPerfersThis.content", [...current, { name: "", image: "" }], { shouldDirty: true, shouldValidate: true });
                  }}
                >
                  Add
                </Button>
              </div> */}
                  <CardHeader>
                    <CardTitle>Why Company Prefers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="whyCompanyPerfersThis.title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <CustomCKEditor value={field.value || ""} onChange={(v) => { field.onChange(v); form.setValue("whyCompanyPerfersThis.title", v, { shouldDirty: true, shouldValidate: true }); }} />
                          </FormControl>
                          <FormMessage className="text-red-600 text-sm mt-1" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="whyCompanyPerfersThis.description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <CustomCKEditor value={field.value || ""} onChange={(v) => { field.onChange(v); form.setValue("whyCompanyPerfersThis.description", v, { shouldDirty: true, shouldValidate: true }); }} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center justify-between">
                      <FormLabel>Prefer Points</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const current = form.getValues("whyCompanyPerfersThis.content") || [];
                          form.setValue("whyCompanyPerfersThis.content", [...current, { name: "", image: "" }], { shouldDirty: true, shouldValidate: true });
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>

                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      {form.watch("whyCompanyPerfersThis")?.content?.map((c, cidx) => (
                        <Card key={cidx} className="relative p-4 border-dashed">
                          {/* <h4 className="font-semibold">Content Block {cidx + 1}</h4> */}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                            onClick={() => {
                              const current = form.getValues("whyCompanyPerfersThis.content") || [];
                              if (current.length > 1) form.setValue("whyCompanyPerfersThis.content", current.filter((_, i) => i !== cidx), { shouldDirty: true, shouldValidate: true });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>

                          <div className="space-y-4 pt-4">

                            <FormField
                              control={form.control}
                              name={`whyCompanyPerfersThis.content.${cidx}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <CustomCKEditor value={field.value || ""} onChange={(v) => { field.onChange(v); form.setValue(`whyCompanyPerfersThis.content.${cidx}.name`, v, { shouldDirty: true, shouldValidate: true }); }} />
                                  </FormControl>
                                  <FormMessage className="text-red-600 text-sm mt-1" />
                                </FormItem>
                              )}
                            />

                            {/* ✅ whyCompanyPerfersThis image */}
                            <FormField
                              control={form.control}
                              name={`whyCompanyPerfersThis.content.${cidx}.image`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Image</FormLabel>
                                  <FormControl>
                                    <ImageUpload
                                      value={field.value || ""}
                                      onChange={(url) => form.setValue(`whyCompanyPerfersThis.content.${cidx}.image`, url, { shouldValidate: true })}
                                      disabled={isSubmitting}
                                      className="w-full h-32"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-600 text-sm mt-1" />
                                </FormItem>
                              )}
                            />



                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* ─────────────── FAQ ─────────────── */}
                <Card>
                  <CardHeader>
                    <CardTitle>FAQ</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {form.watch("faqs")?.map((f, idx) => (
                      <div key={idx} className="border border-gray-300 shadow-md p-5 rounded-md flex flex-col space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">Question {idx + 1}</h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className=" text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                            onClick={() => {
                              const arr = form.getValues("faqs") || [];
                              if (arr.length > 1) form.setValue("faqs", arr.filter((_, i) => i !== idx), { shouldDirty: true, shouldValidate: true });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>

                        </div>
                        <FormField
                          control={form.control}
                          name={`faqs.${idx}.question` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl><Input placeholder="Enter Question" {...field} /></FormControl>
                              <FormMessage className="text-red-600 text-sm mt-1" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`faqs.${idx}.answer` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Answer</FormLabel>
                              <FormControl>
                                <CustomCKEditor value={field.value || ""} onChange={(v) => { field.onChange(v); form.setValue(`faqs.${idx}.answer`, v, { shouldDirty: true, shouldValidate: true }); }} />
                              </FormControl>
                              <FormMessage className="text-red-600 text-sm mt-1" />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>


                {/* seo data */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-primary">
                      SEO Settings
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="flex-1 space-y-6">
                        <FormField
                          control={form.control}
                          name="seo.title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SEO Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter SEO title" {...field} />
                              </FormControl>
                              <FormMessage className="text-red-600 text-sm mt-1" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="seo.keyphrase"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Keyphrase</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter keyphrase" {...field} />
                              </FormControl>
                              <FormMessage className="text-red-600 text-sm mt-1" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="seo.seoDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SEO Description</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Enter SEO description" {...field} />
                              </FormControl>
                              <FormMessage className="text-red-600 text-sm mt-1" />
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* <div className="w-full lg:w-[300px] space-y-6 mt-8 lg:mt-0">

                    <FormField
                      control={form.control}
                      name="seo.featureImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Featured Image</FormLabel>
                          <FormControl>
                            <ImageUpload
                              value={field.value || ""}
                              onChange={(url) => form.setValue("seo.featureImage", url, { shouldValidate: true })}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 text-sm mt-1" />
                        </FormItem>
                      )}
                    />

                  </div> */}
                    </div>

                  </CardContent>
                </Card>
              </div>
              <div className="space-y-8 lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Service Manager Images</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="WhyWorkWithThis.image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Why Work Image</FormLabel>
                          <FormControl>
                            <ImageUpload
                              value={field.value || ""}
                              onChange={(url) => form.setValue("WhyWorkWithThis.image", url, { shouldValidate: true })}
                              disabled={isSubmitting}
                              className="w-full h-48"
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 text-sm mt-1" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="seo.featureImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SEO Feature Image (Social Share)</FormLabel>
                          <FormControl>
                            <ImageUpload
                              value={field.value || ""}
                              onChange={(url) => form.setValue("seo.featureImage", url, { shouldValidate: true })}
                              disabled={isSubmitting}
                              className="w-full h-48"
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 text-sm mt-1" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>






            {/* ─────────────── SUBMIT ─────────────── */}
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
                  initialData ? "Update Service" : "Create Service"
                )}
              </Button>
            </div>

          </form>
        </Form>
        {/* </CardContent > */}
      </div>
    </Card >
  );
}