"use client";

import { useState, useEffect, useRef } from "react";
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
import { APP_URL } from "@/config";

interface AboutUsFormProps {
  initialData?: AboutUsContentFormValues | null;
  onSubmit: (data: AboutUsContentFormValues) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}; 
export default function AboutUsForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting: externalIsSubmitting,
}: AboutUsFormProps) {
  const { toast } = useToast();
  const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);
  const isSubmitting = externalIsSubmitting || internalIsSubmitting;
  const isFirstRender = useRef(true);

  const form = useForm<AboutUsContentFormValues>({
    resolver: zodResolver(AboutUsContentSchema) as any,
    defaultValues: initialData || {
      pagename: "",
      slug: "",
      heroSection: {
        title: "",
        subtitle: "",
        description: "",
        image: "",
        ratings: [
          { rating: 0, image: "" } // must have at least 1
        ],
        // points: [
        //   { label: "", image: "" },
        //   { label: "", image: "" },
        //   { label: "", image: "" },
        //   { label: "", image: "" },
        // ],
      },
      whyCompany: {
        title: "",
        description: "",
        companyDetails: [
          {
            image: "",
            title: "",
            description: "",
          },
        ],
      },
      // whoWeAre: { description: "", image: "" },
      goals: {
        goalsDetails: {
          title: "",
          description: "",
        },
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
      flags: {
        title: "",
        flagsDetails: [
          {
            image: "",
            title: "",
          },
        ],
      },
      seo: {
        title: "",
        keyphrase: "",
        seoDescription: "",
        featureImage: "",
      },
    },
  });

  useEffect(() => {
  if (initialData) {
    form.reset(initialData);
  }
}, [initialData, form]);

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
    
     const {
        fields: ratingFields,
        append: appendRating,
        remove: removeRating,
      } = useFieldArray({
        control: form.control,
        name: "heroSection.ratings",
      });

  const {
        fields: comapnyDetails,
        append: appendComapnyDetail,
        remove: removeCompanyDetail,
    } = useFieldArray({
        control: form.control as any,
        name: "whyCompany.companyDetails",
    });
    const {
        fields: flagsDetails,
        append: appendFlagsDetail,
        remove: removeFlagsDetail,
    } = useFieldArray({
        control: form.control as any,
        name: "flags.flagsDetails",
    });

  // Sync initialData when it changes
  // useEffect(() => {
  //   if (initialData) {
  //      const fixedPoints = [...initialData.heroSection.points];

  //   while (fixedPoints.length < 4) {
  //     fixedPoints.push({
  //       label: "",
  //       image: "",
  //     });
  //   }
  //     form.reset({...initialData,
  //        heroSection: {
  //         ...initialData.heroSection,
  //         points: initialData.heroSection.points.slice(0, 4),
  //       },
  //   });
  //   }
  // }, [initialData, form]);

   
  // const { fields: heroPoints, append: appendHeroPoint, remove: removeHeroPoint } = useFieldArray<any>({
  //   control: form.control as any,
  //   name: "heroSection.points",
  // });

  // const { fields: whoWeArePoints, append: appendWhoWeArePoint, remove: removeWhoWeArePoint } = useFieldArray<any>({
  //   control: form.control as any,
  //   name: "whoWeAre.description",
  // });

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
                  name="heroSection.subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtitle</FormLabel>
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
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div> */}
                </div>
              </CardContent>
            </Card>

            {/* ratings */}
             <Card>
                <CardHeader>
                    <CardTitle>Ratings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <FormLabel>Ratings Boxes</FormLabel>
                        <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            onClick={() => appendRating({ rating:0, image: "" })}
                        >
                            <Plus className="h-4 w-4 mr-2" /> Add Ratings
                        </Button>
                    </div>
                    <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 mt-4">
                        {ratingFields.map((item, index) => (
                            <Card key={item.id} className="p-4 relative border-dashed">
                                <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10" 
                                    onClick={() => removeRating(index)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                                
                                <div className="space-y-4 pt-4">
                                  <FormField
                                    control={form.control as any}
                                    name={`heroSection.ratings.${index}.rating`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Rating (0-5)</FormLabel>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            min={0}
                                            max={5}
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                    <FormField
                                      control={form.control as any}
                                      name={`heroSection.ratings.${index}.image`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Image</FormLabel>
                                          <FormControl>
                                            <ImageUpload
                                              value={field.value}
                                              onChange={field.onChange}
                                              className="h-40"
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

            {/* why company section */}
            <Card>
              <CardHeader>
                <CardTitle>Why Company Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                    <div className="p-4 border rounded-md space-y-4">
                      <FormField
                          control={form.control as any}
                          name="whyCompany.title"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Title</FormLabel>
                                  <FormControl>
                                    <CustomCKEditor
                                      value={field.value || ""}
                                      onChange={(data: string) => { field.onChange(data); }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                              </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control as any}
                          name="whyCompany.description"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <CustomCKEditor
                                      value={field.value || ""}
                                      onChange={(data: string) => { field.onChange(data); }}
                                    /> 
                                  </FormControl>
                                  <FormMessage />
                              </FormItem>
                          )}
                      />
                      <div className="flex justify-between items-center">
                          <FormLabel>Comapny Details</FormLabel>
                          <Button type="button" variant="outline" size="sm" onClick={() => appendComapnyDetail({ image: "", title: "", description: "" })}>
                              <Plus className="h-4 w-4 mr-2" /> Add Company Detail
                          </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {comapnyDetails.map((item, index) => (
                              <Card key={item.id} className="p-4 relative border-dashed">
                                  <Button 
                                      type="button" 
                                      variant="ghost" 
                                      size="icon" 
                                      className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10" 
                                      onClick={() => removeCompanyDetail(index)}
                                  >
                                      <Trash2 className="h-4 w-4" />
                                  </Button>
                                  <div className="space-y-4 pt-4">
                                       <FormField
                                        control={form.control}
                                        name={`whyCompany.companyDetails.${index}.image`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Image</FormLabel>
                                            <FormControl>
                                              <ImageUpload
                                                value={field.value}
                                                onChange={field.onChange}
                                                className="h-40"
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                          control={form.control as any}
                                          name={`whyCompany.companyDetails.${index}.title`}
                                          render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>title</FormLabel><FormControl><Input placeholder="Detail title" {...field} /></FormControl><FormMessage />
                                              </FormItem>
                                          )}
                                      />
                                      <FormField
                                          control={form.control as any}
                                          name={`whyCompany.companyDetails.${index}.description`}
                                          render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                  <CustomCKEditor
                                                    value={field.value || ""}
                                                    onChange={(data: string) => { field.onChange(data); }}
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
            {/* <Card>
              <CardHeader>
                <CardTitle>Who We Are</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <FormField
                    control={form.control as any}
                    name="whoWeAre.description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <CustomCKEditor
                                    value={
                                        typeof field.value === "string"
                                            ? field.value
                                            : ""
                                    }
                                    onChange={(data: string) => {
                                        field.onChange(data || "");
                                    }}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
              </CardContent>
            </Card> */}

            {/* Goals Section */}
            <Card>
              
              <CardHeader>
                <CardTitle>Our Goals (Mission, Vision, Values)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <FormField
                  control={form.control}
                  name="goals.goalsDetails.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goals Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Goals Title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="goals.goalsDetails.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goals Description</FormLabel>
                      <FormControl>
                        <CustomCKEditor
                          value={field.value || ""}
                          onChange={(data) => field.onChange(data)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

            {/* flag section */}
                    
                    <Card>
              <CardHeader>
                <CardTitle>Flag Slider Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                    <div className="p-4 border rounded-md space-y-4">
                      <FormField
                          control={form.control as any}
                          name="flags.title"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Title</FormLabel>
                                  <FormControl>
                                    <CustomCKEditor
                                      value={field.value || ""}
                                      onChange={(data: string) => { field.onChange(data); }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                              </FormItem>
                          )}
                      />
                      <div className="flex justify-between items-center">
                          <FormLabel>Country Flags Details</FormLabel>
                          <Button type="button" variant="outline" size="sm" onClick={() => appendFlagsDetail({ image: "", title: ""})}>
                              <Plus className="h-4 w-4 mr-2" /> Add Country Flags
                          </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {flagsDetails.map((item, index) => (
                              <Card key={item.id} className="p-4 relative border-dashed">
                                  <Button 
                                      type="button" 
                                      variant="ghost" 
                                      size="icon" 
                                      className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10" 
                                      onClick={() => removeFlagsDetail(index)}
                                  >
                                      <Trash2 className="h-4 w-4" />
                                  </Button>
                                  <div className="space-y-4 pt-4">
                                       <FormField
                                        control={form.control}
                                        name={`flags.flagsDetails.${index}.image`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Image</FormLabel>
                                            <FormControl>
                                              <ImageUpload
                                                value={field.value}
                                                onChange={field.onChange}
                                                className="h-40"
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                          control={form.control as any}
                                          name={`flags.flagsDetails.${index}.title`}
                                          render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>title</FormLabel><FormControl><Input placeholder="Detail title" {...field} /></FormControl><FormMessage />
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
                {/* <FormField
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
                /> */}
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
