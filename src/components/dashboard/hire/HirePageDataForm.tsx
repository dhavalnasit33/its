"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { TiptapEditorNoSSR } from "@/components/shared/TiptapEditor";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  GripVertical,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { HirePageDataFormValues, HirePageDataSchema } from "@/types";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUpload from "@/components/ui/imagupload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiService from "@/lib/apiService";
import { APP_URL } from "@/config";
import CustomCKEditor from "@/components/shared/Ckeditor";

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

interface CategoryItem {
  _id: string;
  category: string;
}

interface HirePageFormProps {
  initialData?: HirePageDataFormValues | null;
  onSubmit: (data: HirePageDataFormValues) => Promise<void>;
}

export default function HirePageForm({
  initialData,
  onSubmit,
}: HirePageFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isFirstRender = useRef(true);

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Accordion/Collapse states for tech stack & pricing details
  const [expandedTechIndex, setExpandedTechIndex] = useState<number | null>(0);
  const [expandedPlanIndex, setExpandedPlanIndex] = useState<number | null>(0);
  const [expandedValueIndex, setExpandedValueIndex] = useState<number | null>(
    0,
  );
  const [expandedFAQIndex, setExpandedFAQIndex] = useState<number | null>(0);

  const form = useForm<HirePageDataFormValues>({
    resolver: zodResolver(HirePageDataSchema),
    defaultValues: initialData || {
      category: "",
      name: "",
      title: "",
      slug: "",
      description: "",
      keyPoints: [""],
      successSpeacks: { title: "", description: "", image: "" },
      hireDadiated: { title: "", description: "", image: "" },
      unloackPower: { title: "", description: "", image: "" },
      ourExpertise: { keyPoints: [""] },
      hireingProcess: { steps: [""] },
      whyHireUs: { title: "", details: [{ title: "", description: "" }] },
      techStack: {
        title: "",
        description: "",
        details: [{ title: "", section: 1, keyPoints: [""] }],
      },
      hireDevelopersAsYourNeeds: {
        title: "",
        planDetails: [{ timelLine: "", price: "", keyPoints: [""] }],
        benefits: [""],
      },
      faq: [{ question: "", answer: "" }],
      seo: {
        title: "",
        keyphrase: "",
        seoDescription: "",
        featureImage: "",
      },
    },
  });

  const selectedCategoryId = form.watch("category");
  const nameValue = form.watch("name");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = await apiService<{ success: boolean; data: CategoryItem[] }>(
          "/hire-category?moduleType=hire&limit=100&page=1"
        );
        if (res.success) setCategories(res.data);
      } catch (err) {
        console.error("Category fetch error:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle Slug Autogeneration based on Name
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (nameValue) {
      form.setValue("slug", generateSlug(nameValue), {
        shouldValidate: true,
      });
    }
  }, [nameValue, form]);

  // Drag and Drop tech stack details & keyPoints handlers
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, type } = result;

    if (type === "techDetail") {
      const details = form.getValues("techStack.details") || [];
      const [removed] = details.splice(source.index, 1);
      details.splice(destination.index, 0, removed);
      form.setValue("techStack.details", details, { shouldValidate: true });
    } else if (type.startsWith("techKeyPoint-")) {
      const detailIndex = parseInt(type.split("-")[1]);
      const keyPoints =
        form.getValues(`techStack.details.${detailIndex}.keyPoints`) || [];
      const [removed] = keyPoints.splice(source.index, 1);
      keyPoints.splice(destination.index, 0, removed);
      form.setValue(`techStack.details.${detailIndex}.keyPoints`, keyPoints, {
        shouldValidate: true,
      });
    }
  };

  const handleFormSubmit: SubmitHandler<HirePageDataFormValues> = async (
    data,
  ) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Field Arrays for scrolling content
  const {
    fields: keyPointsFields,
    append: appendKeyPoint,
    remove: removeKeyPoint,
  } = useFieldArray({
    control: form.control,
    name: "keyPoints" as any,
  });

  const {
    fields: planDetailsFields,
    append: appendPlanDetail,
    remove: removePlanDetail,
  } = useFieldArray({
    control: form.control,
    name: "hireDevelopersAsYourNeeds.planDetails",
  });

  const {
    fields: benefitsFields,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({
    control: form.control,
    name: "hireDevelopersAsYourNeeds.benefits" as any,
  });

  const {
    fields: expertiseFields,
    append: appendExpertise,
    remove: removeExpertise,
  } = useFieldArray({
    control: form.control,
    name: "ourExpertise.keyPoints" as any,
  });

  const {
    fields: techStackFields,
    append: appendTechStack,
    remove: removeTechStack,
  } = useFieldArray({
    control: form.control,
    name: "techStack.details",
  });

  const {
    fields: whyHireUsFields,
    append: appendWhyHireUs,
    remove: removeWhyHireUs,
  } = useFieldArray({
    control: form.control,
    name: "whyHireUs.details",
  });

  const {
    fields: hiringStepsFields,
    append: appendHiringStep,
    remove: removeHiringStep,
  } = useFieldArray({
    control: form.control,
    name: "hireingProcess.steps" as any,
  });

  // useEffect(() => {
  //   if (keyPointsFields.length === 0) {
  //     appendKeyPoint("");
  //   }
  // }, [keyPointsFields, appendKeyPoint]);

  // useEffect(() => {
  //   if (benefitsFields.length === 0) {
  //     appendBenefit("");
  //   }
  // }, [benefitsFields, appendBenefit]);

  // useEffect(() => {
  //   if (hiringStepsFields.length === 0) {
  //     appendHiringStep("");
  //   }
  // }, [hiringStepsFields, appendHiringStep]);

  const {
    fields: faqFields,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({
    control: form.control,
    name: "faq",
  });

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Left Column Form Sections */}
              <div className="lg:col-span-2 space-y-8">
                {/* Page Classification */}
                <Card>
                  <CardHeader>
                    <CardTitle>Page Classification</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. React Developer"
                              {...field}
                            />
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
                        const permalink = `${APP_URL}/hire/${slugValue}`;
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

                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Description & Key Points */}
                <Card>
                  <CardHeader>
                    <CardTitle>Main Content & Key Points</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Main Description</FormLabel>
                          <FormControl>
                            <CustomCKEditor
                              value={field.value || ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <div className="flex justify-between items-center ">
                        <FormLabel>Bullet Key Points</FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => appendKeyPoint("")}
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add Point
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {keyPointsFields.map((field, idx) => (
                          <Card
                            key={field.id}
                            className="p-4 relative border-dashed"
                          >
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                              onClick={() => removeKeyPoint(idx)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>

                            <div className="flex flex-col items-center  gap-2 pt-4">
                              <FormField
                                control={form.control}
                                name={`keyPoints.${idx}`}
                                render={({ field: pointField }) => (
                                  <FormItem className="w-full">
                                    <FormLabel>Key Point</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter Key Points"
                                        {...pointField}
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
                    </div>
                  </CardContent>
                </Card>

                {/* Success Speaks */}
                <Card>
                  <CardHeader>
                    <CardTitle>Success Speaks Section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="successSpeacks.title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter section title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="successSpeacks.description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <CustomCKEditor
                              value={field.value || ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="successSpeacks.image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload Image</FormLabel>
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

                {/* Hire Dedicated */}
                <Card>
                  <CardHeader>
                    <CardTitle>Hire Dedicated Section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="hireDadiated.title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter section title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="hireDadiated.description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <CustomCKEditor
                              value={field.value || ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="hireDadiated.image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload Image</FormLabel>
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

                {/* Pricing Plans & Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Hire Developers As Your Needs (Pricing & Benefits)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="hireDevelopersAsYourNeeds.title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Section Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Main section title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <FormLabel className="text-sm font-semibold">
                          Pricing Plans
                        </FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            appendPlanDetail({
                              timelLine: "",
                              price: "",
                              keyPoints: [""],
                            });
                            setExpandedPlanIndex(planDetailsFields.length);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add Plan
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {planDetailsFields.map((planField, planIdx) => {
                          const isExpanded = expandedPlanIndex === planIdx;
                          const planTitle = form.watch(
                            `hireDevelopersAsYourNeeds.planDetails.${planIdx}.timelLine`,
                          );

                          return (
                            <Card
                              key={planField.id}
                              className="relative border-dashed bg-muted/5 overflow-hidden"
                            >
                              <div
                                className="flex items-center justify-between p-4 bg-muted/20 cursor-pointer hover:bg-muted/30 transition-colors"
                                onClick={() =>
                                  setExpandedPlanIndex(
                                    isExpanded ? null : planIdx,
                                  )
                                }
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                                    {planIdx + 1}
                                  </div>
                                  <span className="font-semibold text-sm">
                                    {planTitle || `Plan ${planIdx + 1}`}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removePlanDetail(planIdx);
                                      if (expandedPlanIndex === planIdx)
                                        setExpandedPlanIndex(null);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4 " />
                                  </Button>
                                  {isExpanded ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </div>
                              </div>

                              {isExpanded && (
                                <CardContent className="space-y-4 pt-4 border-t border-dashed">
                                  <FormField
                                    control={form.control}
                                    name={`hireDevelopersAsYourNeeds.planDetails.${planIdx}.timelLine`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Timeline</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="e.g. Full-Time"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name={`hireDevelopersAsYourNeeds.planDetails.${planIdx}.price`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="e.g. $2400/month"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <PlanKeyPoints
                                    control={form.control}
                                    planIndex={planIdx}
                                  />
                                </CardContent>
                              )}
                            </Card>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4 ">
                      <div className="flex justify-between items-center">
                        <FormLabel className="text-sm font-semibold">
                          Benefits
                        </FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => appendBenefit("")}
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add Benefit
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {benefitsFields.map((field, idx) => (
                          <Card
                            key={field.id}
                            className="p-4 relative border-dashed"
                          >
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                              onClick={() => removeBenefit(idx)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <div className="flex flex-col items-center  gap-2 pt-4">
                              <FormField
                                control={form.control}
                                name={`hireDevelopersAsYourNeeds.benefits.${idx}`}
                                render={({ field: benefitField }) => (
                                  <FormItem className="w-full">
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder={`Benefit ${idx + 1}`}
                                        {...benefitField}
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
                    </div>
                  </CardContent>
                </Card>

                {/* Our Expertise */}
                <Card>
                  <CardHeader>
                    <CardTitle>Our Expertise</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center ">
                      <FormLabel className="text-sm font-semibold">
                        Expertise Points
                      </FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendExpertise("")}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Point
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {expertiseFields.map((field, idx) => (
                        <Card
                          key={field.id}
                          className="p-4 relative border-dashed"
                        >
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                            onClick={() => removeExpertise(idx)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <div className="flex flex-col items-center  gap-2 pt-4">
                            <FormField
                              control={form.control as any}
                              name={`ourExpertise.keyPoints.${idx}`}
                              render={({ field }) => (
                                <FormItem className="w-full">
                                  <FormLabel>Key Points</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={`Expertise Point ${idx + 1}`}
                                      {...field}
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
                  </CardContent>
                </Card>

                {/* Drag & Drop Tech Stack */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tech Stack</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="techStack.title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Main Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Tech Stack" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="techStack.description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <CustomCKEditor
                              value={field.value || ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DragDropContext onDragEnd={onDragEnd}>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center ">
                          <FormLabel>Tech Sections (Re-orderable)</FormLabel>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              appendTechStack({
                                title: "",
                                section: 1,
                                keyPoints: [""],
                              })
                            }
                          >
                            <Plus className="h-4 w-4 mr-2" /> Add Tech Section
                          </Button>
                        </div>

                        <Droppable
                          droppableId="techStackDetails"
                          type="techDetails"
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="space-y-4"
                            >
                              {techStackFields.map((field, idx) => {
                                const isExpanded = expandedTechIndex === idx;
                                const techTitle = form.watch(
                                  `techStack.details.${idx}.title`,
                                );

                                return (
                                  <Draggable
                                    key={field.id}
                                    draggableId={field.id}
                                    index={idx}
                                  >
                                    {(provided) => (
                                      <Card
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="relative border-dashed overflow-hidden  bg-muted/5"
                                      >
                                        <div className="flex items-center justify-between p-4 bg-muted/20  hover:bg-muted/30 transition-colors">
                                          <div className="flex items-center gap-3">
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                                              {idx + 1}
                                            </div>
                                            <span className="font-semibold text-sm">
                                              {techTitle || `Plan ${idx + 1}`}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="icon"
                                              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                              onClick={() =>
                                                removeTechStack(idx)
                                              }
                                            >
                                              <Trash2 className="h-4 w-4 " />
                                            </Button>
                                            <div
                                              className="cursor-pointer p-1"
                                              onClick={() =>
                                                setExpandedTechIndex(
                                                  isExpanded ? null : idx,
                                                )
                                              }
                                            >
                                              {isExpanded ? (
                                                <ChevronUp className="h-4 w-4" />
                                              ) : (
                                                <ChevronDown className="h-4 w-4" />
                                              )}
                                            </div>
                                          </div>
                                        </div>

                                        {isExpanded && (
                                          <CardContent className="space-y-4 pt-4 border-t border-dashed ">
                                            <FormField
                                              control={form.control}
                                              name={`techStack.details.${idx}.section`}
                                              render={({ field }) => (
                                                <FormItem className="border p-3 rounded-md flex items-center gap-4">
                                                  <FormLabel className="font-semibold flex-shrink-0 mb-0">
                                                    Section Column
                                                  </FormLabel>
                                                  <FormControl>
                                                    <div className="flex gap-4">
                                                      {[1, 2, 3, 4].map(
                                                        (num) => (
                                                          <label
                                                            key={num}
                                                            className="flex items-center space-x-2 cursor-pointer"
                                                          >
                                                            <input
                                                              type="radio"
                                                              value={num}
                                                              checked={
                                                                field.value ===
                                                                num
                                                              }
                                                              onChange={(e) =>
                                                                field.onChange(
                                                                  Number(
                                                                    e.target
                                                                      .value,
                                                                  ),
                                                                )
                                                              }
                                                              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                            />
                                                            <span>{num}</span>
                                                          </label>
                                                        ),
                                                      )}
                                                    </div>
                                                  </FormControl>
                                                  <FormMessage />
                                                </FormItem>
                                              )}
                                            />
                                            <FormField
                                              control={form.control}
                                              name={`techStack.details.${idx}.title`}
                                              render={({ field }) => (
                                                <FormItem>
                                                  <FormLabel>
                                                    Section Title
                                                  </FormLabel>
                                                  <FormControl>
                                                    <Input
                                                      placeholder="e.g. Backend"
                                                      {...field}
                                                    />
                                                  </FormControl>
                                                  <FormMessage />
                                                </FormItem>
                                              )}
                                            />
                                            <TechStackKeyPoints
                                              control={form.control}
                                              detailIndex={idx}
                                            />
                                          </CardContent>
                                        )}
                                      </Card>
                                    )}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    </DragDropContext>
                  </CardContent>
                </Card>

                {/* Why Hire Us */}
                <Card>
                  <CardHeader>
                    <CardTitle>Why Hire Us Section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="whyHireUs.title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Main Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Main Title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <FormLabel className="text-sm font-semibold">
                          Value Points
                        </FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            appendWhyHireUs({ title: "", description: "" });
                            setExpandedValueIndex(whyHireUsFields.length);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add Value Point
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {whyHireUsFields.map((valueField, valueIdx) => {
                          const isExpanded = expandedValueIndex === valueIdx;
                          // const valueTitle = form.watch(`WhyHireUsDetail.${valueIdx}title`);
                          const valueTitle = form.watch(
                            `whyHireUs.details.${valueIdx}.title`,
                          );

                          return (
                            <Card
                              key={valueField.id}
                              className="relative border-dashed bg-muted/5 overflow-hidden"
                            >
                              <div
                                className="flex items-center justify-between p-4 bg-muted/20 cursor-pointer hover:bg-muted/30 transition-colors"
                                onClick={() =>
                                  setExpandedValueIndex(
                                    isExpanded ? null : valueIdx,
                                  )
                                }
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                                    {valueIdx + 1}
                                  </div>
                                  <span className="font-semibold text-sm">
                                    {valueTitle || `Plan ${valueIdx + 1}`}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeWhyHireUs(valueIdx);
                                      if (expandedValueIndex === valueIdx)
                                        setExpandedValueIndex(null);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4 " />
                                  </Button>
                                  {isExpanded ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </div>
                              </div>

                              {isExpanded && (
                                <CardContent className="space-y-4 pt-4 border-t border-dashed">
                                  <FormField
                                    control={form.control}
                                    name={`whyHireUs.details.${valueIdx}.title`}
                                    render={({ field: subField }) => (
                                      <FormItem className="w-full">
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="e.g. High Integrity"
                                            {...subField}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name={`whyHireUs.details.${valueIdx}.description`}
                                    render={({ field: subField }) => (
                                      <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                          <CustomCKEditor
                                            value={subField.value || ""}
                                            onChange={subField.onChange}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <ValueKeyPoints
                                    control={form.control}
                                    valueIndex={valueIdx}
                                  />
                                </CardContent>
                              )}
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Unlock Power */}
                <Card>
                  <CardHeader>
                    <CardTitle>Unlock Power Section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="unloackPower.title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter section title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="unloackPower.description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <CustomCKEditor
                              value={field.value || ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="unloackPower.image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload Image</FormLabel>
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

                {/* Hiring Process */}
                <Card>
                  <CardHeader>
                    <CardTitle>Hiring Process Steps</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center ">
                      <FormLabel className="text-sm font-semibold">
                        Workflow Steps
                      </FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendHiringStep("")}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Step
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {hiringStepsFields.map((field, idx) => (
                        <Card
                          key={field.id}
                          className="p-4 relative border-dashed"
                        >
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                            onClick={() => removeHiringStep(idx)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <div className="flex flex-col items-center  gap-2 pt-4">
                            <FormField
                              control={form.control}
                              name={`hireingProcess.steps.${idx}`}
                              render={({ field: stepField }) => (
                                <FormItem className="w-full">
                                  <FormLabel>Step</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={`Step ${idx + 1}`}
                                      {...stepField}
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
                  </CardContent>
                </Card>

                {/* FAQs */}
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions (FAQs)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center ">
                      <FormLabel className="text-sm font-semibold">
                        FAQ Items
                      </FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          appendFaq({ question: "", answer: "" });
                          setExpandedFAQIndex(faqFields.length);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add FAQ
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {faqFields.map((field, idx) => {
                        const isExpanded = expandedFAQIndex === idx;
                        const faqTitle = form.watch(`faq.${idx}.question`);

                        return (
                          <Card
                            key={field.id}
                            className="relative border-dashed bg-muted/5 overflow-hidden"
                          >
                            <div
                              className="flex items-center justify-between p-4 bg-muted/20 cursor-pointer hover:bg-muted/30 transition-colors"
                              onClick={() =>
                                setExpandedFAQIndex(isExpanded ? null : idx)
                              }
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                                  {idx + 1}
                                </div>
                                <span className="font-semibold text-sm">
                                  {faqTitle || `Category ${idx + 1}`}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFaq(idx);
                                    if (expandedFAQIndex === idx)
                                      setExpandedFAQIndex(null);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </div>
                            </div>

                            {isExpanded && (
                              <CardContent className="space-y-4 pt-4 border-t border-dashed ">
                                <FormField
                                  control={form.control}
                                  name={`faq.${idx}.question`}
                                  render={({ field: subField }) => (
                                    <FormItem>
                                      <FormLabel>Question</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Enter Question"
                                          {...subField}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name={`faq.${idx}.answer`}
                                  render={({ field: subField }) => (
                                    <FormItem>
                                      <FormLabel>Answer</FormLabel>
                                      <FormControl>
                                        <CustomCKEditor
                                          value={subField.value || ""}
                                          onChange={subField.onChange}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </CardContent>
                            )}
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* SEO Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-primary">SEO Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="seo.title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SEO Meta Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Meta Title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="seo.keyphrase"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Focus Keyphrase</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Hire Devs" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="seo.seoDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write a summary..."
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Right Column Sections - Page Media Only */}
              <div className="space-y-8 lg:col-span-1">
                <Card className="">
                  <CardHeader>
                    <CardTitle>Page Media</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="seo.featureImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SEO Social Feature Image</FormLabel>
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

            {/* Form Footer Action Buttons */}
            <div className="flex justify-end gap-3 border-t pt-6 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/hire")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : initialData ? (
                  "Update Hire Page Data"
                ) : (
                  "Create Hire Page Data"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

const ValueKeyPoints = ({
  control,
  valueIndex,
}: {
  control: any;
  valueIndex: number;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: ` whyHireUs.details.${valueIndex}.title`,
  });

  useEffect(() => {
    if (fields.length === 0) {
      append("");
    }
  }, [fields, append]);

  return <></>;
};

const PlanKeyPoints = ({
  control,
  planIndex,
}: {
  control: any;
  planIndex: number;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `hireDevelopersAsYourNeeds.planDetails.${planIndex}.keyPoints`,
  });

  useEffect(() => {
    if (fields.length === 0) {
      append("");
    }
  }, [fields, append]);

  return (
    <div className="space-y-2  mt-3">
      <div className="flex justify-between items-center">
        <FormLabel className="text-xs font-semibold">
          Plan Benefits / Items
        </FormLabel>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => append("")}
        >
          <Plus className="h-3 w-3 mr-1" /> Add Point
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field, pointIdx) => (
          <Card key={field.id} className="p-4 relative border-dashed">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
              onClick={() => remove(pointIdx)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div className="space-y-4 pt-4">
              <FormField
                control={control}
                name={`hireDevelopersAsYourNeeds.planDetails.${planIndex}.keyPoints.${pointIdx}`}
                render={({ field: pointField }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>keyPoints</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Point ${pointIdx + 1}`}
                        {...pointField}
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
    </div>
  );
};

const TechStackKeyPoints = ({
  control,
  detailIndex,
}: {
  control: any;
  detailIndex: number;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `techStack.details.${detailIndex}.keyPoints`,
  });

  useEffect(() => {
    if (fields.length === 0) {
      append("");
    }
  }, [fields, append]);

  return (
    <Droppable
      droppableId={`techKeyPoint-${detailIndex}`}
      type={`techKeyPoint-${detailIndex}`}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="space-y-3  "
        >
          {fields.map((field, pointIdx) => (
            <Draggable key={field.id} draggableId={field.id} index={pointIdx}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  className="flex items-center gap-2 "
                >
                  <div
                    {...provided.dragHandleProps}
                    className="cursor-move p-2 bg-gray-100 rounded"
                  >
                    ☰
                  </div>
                  <FormField
                    control={control}
                    name={`techStack.details.${detailIndex}.keyPoints.${pointIdx}`}
                    render={({ field: pointField }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            className="w-full h-10"
                            placeholder={`Tool ${pointIdx + 1}`}
                            {...pointField}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 text-sm mt-1" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text- destructive/90 hover:bg-destructive/10"
                    onClick={() => remove(pointIdx)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </Draggable>
          ))}
          <div className="flex justify-between items-center">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => append("")}
            >
              <Plus className="h-3 w-3 mr-1" /> Add Tool
            </Button>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
