"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
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
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, Plus } from "lucide-react";
import { AboutUsContentFormValues, AboutUsContentSchema } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUpload from "@/components/ui/imagupload";
import CustomCKEditor from "@/components/shared/Ckeditor";

interface AboutUsFormProps {
  initialData?: AboutUsContentFormValues | null;
  onSubmit: (data: AboutUsContentFormValues) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export default function AboutUsForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting: externalIsSubmitting,
}: AboutUsFormProps) {
  const { toast } = useToast();
  const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);
  const isSubmitting = externalIsSubmitting || internalIsSubmitting;

  const form = useForm<AboutUsContentFormValues>({
    resolver: zodResolver(AboutUsContentSchema) as any,
    defaultValues: initialData || {
      heroSection: {
        title: "",
        description: "",
        image: "",
        points: { label: "", image: "" },
      },
      whoWeAre: { description: "", image: "" },
      goals: {
        missionTitle: "",
        missionDescription: "",
        missionImage: "",
        visionTitle: "",
        visionDescription: "",
        visionImage: "",
        valuesTitle: "",
        valuesDescription: "",
        valuesImage: "",
      },
      seo: {
        title: "",
        keyphrase: "",
        seoDescription: "",
        featureImage: "",
      },
    },
  });

  // Sync initialData when it changes
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  // const { fields: heroPoints, append: appendHeroPoint, remove: removeHeroPoint } = useFieldArray<any>({
  //   control: form.control as any,
  //   name: "heroSection.points",
  // });

  const { fields: whoWeArePoints, append: appendWhoWeArePoint, remove: removeWhoWeArePoint } = useFieldArray<any>({
    control: form.control as any,
    name: "whoWeAre.description",
  });

  const handleFormSubmit: SubmitHandler<AboutUsContentFormValues> = async (data) => {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit as any)} className="space-y-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
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

                <div className="space-y-4">
                  {/* <div className="flex items-center justify-between">
                    <FormLabel>Feature Points</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendHeroPoint({ label: "", image: "" })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Point
                    </Button>
                  </div> */}
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {heroPoints.map((field, index) => (
                      <Card key={field.id} className="relative p-4 border-dashed">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                          onClick={() => removeHeroPoint(index)}
                          disabled={heroPoints.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="space-y-4 pt-4">
                          <FormField
                            control={form.control as any}
                            name={`heroSection.points.${index}.label`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Innovation" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control as any}
                            name={`heroSection.points.${index}.image`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Icon/Image</FormLabel>
                                <FormControl>
                                  <ImageUpload
                                    value={field.value}
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
                  </div> */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <Card
                        key={index}
                        className="relative p-4 border border-dashed rounded-xl"
                      >
                        <div className="space-y-4">
                          <FormField
                            control={form.control as any}
                            name={`heroSection.points.${index}.label`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Innovation" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control as any}
                            name={`heroSection.points.${index}.image`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Icon/Image</FormLabel>
                                <FormControl>
                                  <ImageUpload
                                    value={field.value}
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
                </div>
              </CardContent>
            </Card>

            {/* Who We Are Section */}
            <Card>
              <CardHeader>
                <CardTitle>Who We Are</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <FormLabel>Description Paragraphs</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendWhoWeArePoint("")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Paragraph
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {whoWeArePoints.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-start">
                        <FormField
                          control={form.control as any}
                          name={`whoWeAre.description.${index}`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                {/* <Textarea placeholder={`Paragraph ${index + 1}`} rows={3} {...field} /> */}
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
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="mt-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                          onClick={() => removeWhoWeArePoint(index)}
                          disabled={whoWeArePoints.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Goals Section */}
            <Card>
              <CardHeader>
                <CardTitle>Our Goals (Mission, Vision, Values)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Mission */}
                <div className="space-y-4 p-4 border rounded-lg bg-gray-50/50">
                  <h3 className="font-semibold text-lg border-b pb-2">Mission</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <FormField
                        control={form.control as any}
                        name="goals.missionTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Our Mission" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control as any}
                        name="goals.missionDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              {/* <Textarea placeholder="Mission details..." rows={4} {...field} /> */}
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
                    </div>
                    <FormField
                      control={form.control as any}
                      name="goals.missionImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            <ImageUpload
                              value={field.value}
                              onChange={field.onChange}
                              className="h-48"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Vision */}
                <div className="space-y-4 p-4 border rounded-lg bg-gray-50/50">
                  <h3 className="font-semibold text-lg border-b pb-2">Vision</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <FormField
                        control={form.control as any}
                        name="goals.visionTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Our Vision" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control as any}
                        name="goals.visionDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              {/* <Textarea placeholder="Vision details..." rows={4} {...field} /> */}
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
                    </div>
                    <FormField
                      control={form.control as any}
                      name="goals.visionImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            <ImageUpload
                              value={field.value}
                              onChange={field.onChange}
                              className="h-48"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Values */}
                <div className="space-y-4 p-4 border rounded-lg bg-gray-50/50">
                  <h3 className="font-semibold text-lg border-b pb-2">Values</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <FormField
                        control={form.control as any}
                        name="goals.valuesTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Our Values" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control as any}
                        name="goals.valuesDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              {/* <Textarea placeholder="Values details..." rows={4} {...field} /> */}
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
                    </div>
                    <FormField
                      control={form.control as any}
                      name="goals.valuesImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            <ImageUpload
                              value={field.value}
                              onChange={field.onChange}
                              className="h-48"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Text Content */}
            <Card  >
              <CardHeader  >
                <CardTitle className="text-primary">SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 ">
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
                        <Input placeholder="e.g. IT services company" {...field} />
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
            {/* Right Column: All Images */}
            <Card>
              <CardHeader>
                <CardTitle>Page Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
                <FormField
                  control={form.control as any}
                  name="whoWeAre.image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Who We Are Image</FormLabel>
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
                          className="w-full h-40"
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
              initialData ? "Update About Us" : "Create About Us"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
