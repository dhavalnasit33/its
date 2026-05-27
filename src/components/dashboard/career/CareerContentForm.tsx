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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2 } from "lucide-react";
import {
    CareerContentFormValues,
    CareerContentSchema,
} from "@/types";
import ImageUpload from "@/components/ui/imagupload";
import CustomCKEditor from "@/components/shared/Ckeditor";
import { APP_URL } from "@/config";

interface CareerFormProps {
    initialData?: CareerContentFormValues | null;
    onSubmit: (data: CareerContentFormValues) => Promise<void>;
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

export default function CareerContentForm({
    initialData,
    onSubmit,
    onCancel,
}: CareerFormProps) {
    const { toast } = useToast();
    const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);
     const isFirstRender = useRef(true);

    const form = useForm<CareerContentFormValues>({
        resolver: zodResolver(CareerContentSchema),
        defaultValues: initialData || {
            pagename: "",
            slug: "",
            heroSection: { title: "", description: "", image: "" },
            careerAtIts: { title: "", image: "", points: ""
                    // points: [""] 
            },
            whyJoinIts: { title: "", points: [{ title: "", description: "", image: "" }] },
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

    // const {
    //     fields: careerPoints,
    //     append: appendCareerPoint,
    //     remove: removeCareerPoint,
    // } = useFieldArray({
    //     control: form.control as any,
    //     name: "careerAtIts.points",
    // });

    const {
        fields: whyJoinPoints,
        append: appendWhyJoinPoint,
        remove: removeWhyJoinPoint,
    } = useFieldArray({
        control: form.control as any,
        name: "whyJoinIts.points",
    });

    const handleFormSubmit: SubmitHandler<CareerContentFormValues> = async (data) => {
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
                                        <Input placeholder="Career Page" {...field} />
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
                            <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control as any}
                                    name="heroSection.title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl><Input placeholder="Hero title" {...field} /></FormControl>
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
                                                {/* <Textarea placeholder="Hero description" rows={3} {...field} /> */}
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
                                            <FormLabel>Hero Image</FormLabel>
                                            <FormControl>
                                                <ImageUpload value={field.value} onChange={field.onChange} className="w-full h-48" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* Career At ITS Section */}
                        <Card>
                            <CardHeader><CardTitle>Career At ITS Section</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control as any}
                                    name="careerAtIts.title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Section Title</FormLabel>
                                            <FormControl><Input placeholder="Section title" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control as any}
                                    name="careerAtIts.image"
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
                                <FormField
                                    control={form.control as any}
                                    name="careerAtIts.points"
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
                                                {/* <CustomCKEditor
                                                    value={field.value || ""}
                                                    onChange={(data: string) => {
                                                        field.onChange(data);
                                                    }}
                                                /> */}
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <FormLabel>Key Points</FormLabel>
                                        <Button type="button" variant="outline" size="sm" onClick={() => appendCareerPoint("")}>
                                            <Plus className="h-4 w-4 mr-2" /> Add Point
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        {careerPoints.map((item, index) => (
                                            <div key={item.id} className="flex gap-2">
                                                <FormField
                                                    control={form.control as any}
                                                    name={`careerAtIts.points.${index}`}
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormControl><Input placeholder="Enter point" {...field} /></FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                                    onClick={() => removeCareerPoint(index)}
                                                    disabled={careerPoints.length === 1}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div> */}
                                
                            </CardContent>
                        </Card>

                        {/* Why Join ITS Section */}
                        <Card>
                            <CardHeader><CardTitle>Why Join ITS Section</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control as any}
                                    name="whyJoinIts.title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Section Title</FormLabel>
                                            <FormControl><Input placeholder="Section title" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <FormLabel>Benefit Points</FormLabel>
                                        <Button type="button" variant="outline" size="sm" onClick={() => appendWhyJoinPoint({ title: "", description: "", image: "" })}>
                                            <Plus className="h-4 w-4 mr-2" /> Add Benefit
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {whyJoinPoints.map((item, index) => (
                                            <Card key={item.id} className="p-4 relative border-dashed">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                                    onClick={() => removeWhyJoinPoint(index)}
                                                    disabled={whyJoinPoints.length === 1}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                                <div className="space-y-4 pt-4">
                                                    <FormField
                                                        control={form.control as any}
                                                        name={`whyJoinIts.points.${index}.title`}
                                                        render={({ field }) => (
                                                            <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Benefit title" {...field} /></FormControl><FormMessage /></FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control as any}
                                                        name={`whyJoinIts.points.${index}.description`}
                                                        render={({ field }) => (
                                                            <FormItem><FormLabel>Description</FormLabel><FormControl>
                                                                {/* <Textarea placeholder="Benefit description" rows={2} {...field} /> */}
                                                                <CustomCKEditor
                                                                    value={field.value || ""}
                                                                    onChange={(data: string) => {
                                                                        field.onChange(data);
                                                                    }}
                                                                />
                                                            </FormControl><FormMessage /></FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control as any}
                                                        name={`whyJoinIts.points.${index}.image`}
                                                        render={({ field }) => (
                                                            <FormItem><FormLabel>Icon/Image</FormLabel><FormControl><ImageUpload value={field.value} onChange={field.onChange} className="w-full h-32" /></FormControl><FormMessage /></FormItem>
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
                        <Card>
                            <CardHeader><CardTitle className="text-primary">SEO Settings</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
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
                                        <FormItem><FormLabel>Focus Keyphrase</FormLabel><FormControl><Input placeholder="e.g. Career ITS" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control as any}
                                    name="seo.seoDescription"
                                    render={({ field }) => (
                                        <FormItem><FormLabel>Meta Description</FormLabel><FormControl>
                                            <Textarea placeholder="Brief summary for search results" rows={4} {...field} />
                                        </FormControl><FormMessage /></FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8 lg:col-span-1">
                        {/* Right Column: SEO Feature Image Only */}
                        <Card>
                            <CardHeader><CardTitle>SEO Media</CardTitle></CardHeader>
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
                            initialData ? "Update Career Content" : "Create Career Content"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
