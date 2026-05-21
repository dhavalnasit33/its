"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray, SubmitHandler, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, Loader2, Plus, Trash2 } from "lucide-react";
import apiService from "@/lib/apiService";
import { HireMainPageDataFormValues, HireMainPageDataSchema } from "@/types";
import ImageUpload from "@/components/ui/imagupload";
import CustomCKEditor from "@/components/shared/Ckeditor";

interface HirePageOption {
  _id: string;
  title: string;
  category: string;
  subCategory: string;
}

interface HireMainFormProps {
  initialData?: HireMainPageDataFormValues | null;
  onSubmit: (data: HireMainPageDataFormValues) => Promise<void>;
  onCancel?: () => void;
}

export default function HireMainPageForm({
  initialData,
  onSubmit,
  onCancel,
}: HireMainFormProps) {
  const { toast } = useToast();
  const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);
  const [hirePageOptions, setHirePageOptions] = useState<HirePageOption[]>([]);
  const [expandedDedicatedIndex, setExpandedDedicatedIndex] = useState<number | null>(0);

  const form = useForm<HireMainPageDataFormValues>({
    resolver: zodResolver(HireMainPageDataSchema),
    defaultValues: initialData || {
      mainTitle: "",
      description: "",
      pricePathAndFAQ: "",
      developmentTeamSection: { heading: "", description: "", image: "" },
      dedicatedDeveloperSection: { maintitle: "", services: [] },
      whyHireDeveloperforYourProject: { mainTitle: "", detailBox: [] },
      whyChooseItsForDedicatedResources: { mainTitle: "", detailBox: [] },
      hireDedicatedResourcesAndTalents: [],
      seo: {
        title: "",
        keyphrase: "",
        seoDescription: "",
        featureImage: "",
      },
    },
  });

  useEffect(() => {
    const fetchHirePages = async () => {
      try {
        const res = await apiService<{ data: HirePageOption[] }>(
          "/hire-page/admin-id"
        );
        setHirePageOptions(res.data || []);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch hire pages.",
          variant: "destructive",
        });
      }
    };
    fetchHirePages();
  }, [toast]);

  const {
    fields: dedicatedServices,
    append: appendDedicatedService,
    remove: removeDedicatedService,
  } = useFieldArray({
    control: form.control as any,
    name: "dedicatedDeveloperSection.services",
  });

  const {
    fields: whyHireDetails,
    append: appendWhyHireDetail,
    remove: removeWhyHireDetail,
  } = useFieldArray({
    control: form.control as any,
    name: "whyHireDeveloperforYourProject.detailBox",
  });

  const {
    fields: whyChooseDetails,
    append: appendWhyChooseDetail,
    remove: removeWhyChooseDetail,
  } = useFieldArray({
    control: form.control as any,
    name: "whyChooseItsForDedicatedResources.detailBox",
  });

  const {
    fields: resourcesTalents,
    append: appendResourceTalent,
    remove: removeResourceTalent,
  } = useFieldArray({
    control: form.control as any,
    name: "hireDedicatedResourcesAndTalents",
  });

  const handleFormSubmit: SubmitHandler<HireMainPageDataFormValues> = async (data) => {
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
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            {/* Basic Info Section */}
            <Card>
              <CardHeader><CardTitle>Hero & Basic Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control as any}
                  name="mainTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Title</FormLabel>
                      <FormControl>
                        <CustomCKEditor value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <CustomCKEditor value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name="pricePathAndFAQ"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link to Pricing & FAQ Page</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a hire page..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {hirePageOptions.map((s) => (
                            <SelectItem key={s._id} value={s._id}>
                              {s.title} ({typeof s.subCategory === 'object' && s.subCategory ? (s.subCategory as any).subcategory : s.subCategory})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Development Team Section */}
            <Card>
              <CardHeader><CardTitle>Development Team Section</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control as any}
                  name="developmentTeamSection.heading"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Heading</FormLabel>
                      <FormControl>
                        <CustomCKEditor value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name="developmentTeamSection.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <CustomCKEditor value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name="developmentTeamSection.image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section Image</FormLabel>
                      <FormControl>
                        <ImageUpload value={field.value} onChange={field.onChange} className="w-full h-48" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Dedicated Developer Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Dedicated Developer Section</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => appendDedicatedService({ title: "", serviceItemBox: [] })}>
                  <Plus className="h-4 w-4 mr-2" /> Add Category
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control as any}
                  name="dedicatedDeveloperSection.maintitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Title for Section</FormLabel>
                      <FormControl>
                        <CustomCKEditor value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-6">
                  {dedicatedServices.map((service, serviceIndex) => {
                    const categoryTitle = form.watch(`dedicatedDeveloperSection.services.${serviceIndex}.title`);
                    const isExpanded = expandedDedicatedIndex === serviceIndex;

                    return (
                      <Card key={service.id} className="relative border-dashed bg-muted/5 overflow-hidden">
                        <div
                          className="flex items-center justify-between p-4 bg-muted/20 cursor-pointer hover:bg-muted/30 transition-colors"
                          onClick={() => setExpandedDedicatedIndex(isExpanded ? null : serviceIndex)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                              {serviceIndex + 1}
                            </div>
                            <span className="font-semibold text-sm">
                              {categoryTitle || `Category ${serviceIndex + 1}`}
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
                                removeDedicatedService(serviceIndex);
                                if (expandedDedicatedIndex === serviceIndex) setExpandedDedicatedIndex(null);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </div>
                        </div>

                        {isExpanded && (
                          <CardContent className="space-y-4 pt-4 border-t border-dashed">
                            <FormField
                              control={form.control as any}
                              name={`dedicatedDeveloperSection.services.${serviceIndex}.title`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Category Title</FormLabel>
                                  <FormControl><Input placeholder="e.g. Web Development" {...field} /></FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="p-4 border rounded-md bg-muted/20">
                              <ServiceItemBoxArray
                                serviceIndex={serviceIndex}
                                hirePageOptions={hirePageOptions}
                              />
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Why Hire Us Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Why Hire Developer Section</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => appendWhyHireDetail({ image: "", label: "" })}>
                  <Plus className="h-4 w-4 mr-2" /> Add Item
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control as any}
                  name="whyHireDeveloperforYourProject.mainTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section Main Title</FormLabel>
                      <FormControl>
                        <CustomCKEditor value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {whyHireDetails.map((item, index) => (
                    <Card key={item.id} className="p-4 relative border-dashed">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"

                        onClick={() => removeWhyHireDetail(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="space-y-4 pt-4">
                        <FormField
                          control={form.control as any}
                          name={`whyHireDeveloperforYourProject.detailBox.${index}.label`}
                          render={({ field }) => (
                            <FormItem><FormLabel>Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                          )}
                        />
                        <FormField
                          control={form.control as any}
                          name={`whyHireDeveloperforYourProject.detailBox.${index}.image`}
                          render={({ field }) => (
                            <FormItem><FormLabel>Icon</FormLabel><FormControl><ImageUpload value={field.value} onChange={field.onChange} className="w-full h-32" /></FormControl><FormMessage /></FormItem>
                          )}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Why Choose ITS Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Why Choose ITS Section</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => appendWhyChooseDetail({ image: "", label: "", description: "" })}>
                  <Plus className="h-4 w-4 mr-2" /> Add Item
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control as any}
                  name="whyChooseItsForDedicatedResources.mainTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section Main Title</FormLabel>
                      <FormControl>
                        <CustomCKEditor value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {whyChooseDetails.map((item, index) => (
                    <Card key={item.id} className="p-4 relative border-dashed">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"

                        onClick={() => removeWhyChooseDetail(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="space-y-4 pt-4">
                        <FormField
                          control={form.control as any}
                          name={`whyChooseItsForDedicatedResources.detailBox.${index}.label`}
                          render={({ field }) => (
                            <FormItem><FormLabel>Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                          )}
                        />
                        <FormField
                          control={form.control as any}
                          name={`whyChooseItsForDedicatedResources.detailBox.${index}.description`}
                          render={({ field }) => (
                            <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                          )}
                        />
                        <FormField
                          control={form.control as any}
                          name={`whyChooseItsForDedicatedResources.detailBox.${index}.image`}
                          render={({ field }) => (
                            <FormItem><FormLabel>Icon</FormLabel><FormControl><ImageUpload value={field.value} onChange={field.onChange} className="w-full h-32" /></FormControl><FormMessage /></FormItem>
                          )}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resources & Talents Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Hire Dedicated Resources & Talents</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => appendResourceTalent({ subTitle: "", mainTitle: "", keyPoints: [""], buttonTitle: "" })}>
                  <Plus className="h-4 w-4 mr-2" /> Add Section
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {resourcesTalents.map((item, index) => (
                  <Card key={item.id} className="p-4 relative border-dashed bg-muted/10">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      onClick={() => removeResourceTalent(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="space-y-4 pt-4">
                      <FormField
                        control={form.control as any}
                        name={`hireDedicatedResourcesAndTalents.${index}.subTitle`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subtitle</FormLabel>
                            <FormControl><CustomCKEditor value={field.value} onChange={field.onChange} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control as any}
                        name={`hireDedicatedResourcesAndTalents.${index}.mainTitle`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Main Title</FormLabel>
                            <FormControl><CustomCKEditor value={field.value} onChange={field.onChange} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control as any}
                        name={`hireDedicatedResourcesAndTalents.${index}.buttonTitle`}
                        render={({ field }) => (
                          <FormItem><FormLabel>Button Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )}
                      />
                      <KeyPointsArray nestIndex={index} />
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* SEO Text Content */}
            <Card>
              <CardHeader><CardTitle className="text-primary">SEO Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control as any}
                  name="seo.title"
                  render={({ field }) => (
                    <FormItem><FormLabel>SEO Title</FormLabel><FormControl><Input placeholder="Search engine title" {...field} /></FormControl><FormMessage /></FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name="seo.keyphrase"
                  render={({ field }) => (
                    <FormItem><FormLabel>Focus Keyphrase</FormLabel><FormControl><Input placeholder="e.g. Hire Developer" {...field} /></FormControl><FormMessage /></FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name="seo.seoDescription"
                  render={({ field }) => (
                    <FormItem><FormLabel>Meta Description</FormLabel><FormControl><Textarea placeholder="Brief summary for search results" rows={4} {...field} /></FormControl><FormMessage /></FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className=" w-full lg:w-[350px] space-y-6 mt-8 lg:mt-0">
            {/* Right Column: SEO Feature Image Only */}
            <Card className="sticky top-24">
              <CardHeader><CardTitle>Page Media</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control as any}
                  name="seo.featureImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO Feature Image (Social Share)</FormLabel>
                      <FormControl>
                        <ImageUpload value={field.value || ""} onChange={field.onChange} className="w-full h-48" />
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
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>
            ) : (
              initialData ? "Update Hire Page Content" : "Create Hire Page Content"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

const ServiceItemBoxArray = ({
  serviceIndex,
  hirePageOptions,
}: {
  serviceIndex: number;
  hirePageOptions: HirePageOption[];
}) => {
  const { control } = useFormContext<HireMainPageDataFormValues>();
  const { fields, append, remove } = useFieldArray({
    control: control as any,
    name: `dedicatedDeveloperSection.services.${serviceIndex}.serviceItemBox`,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FormLabel>Service Items</FormLabel>
        <Button type="button" size="sm" variant="outline" onClick={() => append({ image: "", hirepageId: "" })}>
          <Plus className="h-4 w-4 mr-2" /> Add Service
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-4">
        {fields.map((itemField, itemIndex) => (
          <Card key={itemField.id} className="p-2  relative bg-background">
            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className=" text-destructive hover:text-destructive/90 hover:bg-destructive/10"

                onClick={() => remove(itemIndex)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1  gap-4 pt-2">
              <FormField
                control={control as any}
                name={`dedicatedDeveloperSection.services.${serviceIndex}.serviceItemBox.${itemIndex}.image`}
                render={({ field }) => (
                  <FormItem><FormLabel>Service Icon</FormLabel><FormControl><ImageUpload value={field.value} onChange={field.onChange} className="h-24" /></FormControl><FormMessage /></FormItem>
                )}
              />
              <FormField
                control={control as any}
                name={`dedicatedDeveloperSection.services.${serviceIndex}.serviceItemBox.${itemIndex}.hirepageId`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link to Hire Page</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select page..." /></SelectTrigger></FormControl>
                      <SelectContent>
                        {hirePageOptions.map((s) => (
                          <SelectItem key={s._id} value={s._id}>{s.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

const KeyPointsArray = ({ nestIndex }: { nestIndex: number }) => {
  const { control } = useFormContext<HireMainPageDataFormValues>();
  const { fields, append, remove } = useFieldArray({
    control: control as any,
    name: `hireDedicatedResourcesAndTalents.${nestIndex}.keyPoints`,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FormLabel>Key Points</FormLabel>
        <Button type="button" variant="outline" size="sm" onClick={() => append("")}>
          <Plus className="h-4 w-4 mr-2" /> Add Key Point
        </Button>
      </div>
      <div className="space-y-2">
        {fields.map((field, k) => (
          <div key={field.id} className="flex items-center gap-2">
            <FormField
              control={control as any}
              name={`hireDedicatedResourcesAndTalents.${nestIndex}.keyPoints.${k}`}
              render={({ field: pointField }) => (
                <FormItem className="flex-grow">
                  <FormControl><Input {...pointField} placeholder={`Key Point ${k + 1}`} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant="ghost" size="icon" onClick={() => remove(k)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
};