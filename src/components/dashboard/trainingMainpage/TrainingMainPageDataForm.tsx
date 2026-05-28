"use client";

import { useEffect, useRef, useState } from "react";
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
    TrainingMainPageDataFormValues,
    TrainingMainPageDataSchema,
} from "@/types";
import ImageUpload from "@/components/ui/imagupload";
import CustomCKEditor from "@/components/shared/Ckeditor";
import { APP_URL } from "@/config";

interface TrainingFormProps {
    initialData?: TrainingMainPageDataFormValues | null;
    onSubmit: (data: TrainingMainPageDataFormValues) => Promise<void>;
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

export default function TrainingMainPageDataForm({
    initialData,
    onSubmit,
    onCancel,
}: TrainingFormProps) {
    const { toast } = useToast();
    const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);
    const isFirstRender = useRef(true);
    

    const form = useForm<TrainingMainPageDataFormValues>({
        resolver: zodResolver(TrainingMainPageDataSchema),
        defaultValues: initialData || {
            pagename: "",
            slug: "",
            heroSection: { subTitle: "", mainTitle: "", description: "", image: "" },
            aboutusSection: {
                image: "",
                subTitle: "",
                mainTitle: "",
                description: "",
                detailbox: { title: "", detailbox: [{ heading: "", description: "" }] },
            },
            itsInstituteFacilitiesSection: {
                title: "",
                points: [{ heading: "", image: "" }],
            },
            rightCoursePickSection: {
                mainHeading: "",
                cardBox: [{ heading: "", image: "" }],
                subTitle: "",
                mainTitle: "",
                description: "",
                detailbox: [{ image: "", title: "", description: "" }],
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

    const {
        fields: aboutDetails,
        append: appendAboutDetail,
        remove: removeAboutDetail,
    } = useFieldArray({
        control: form.control as any,
        name: "aboutusSection.detailbox.detailbox",
    });

    const {
        fields: facilityPoints,
        append: appendFacilityPoint,
        remove: removeFacilityPoint,
    } = useFieldArray({
        control: form.control as any,
        name: "itsInstituteFacilitiesSection.points",
    });

    const {
        fields: courseCards,
        append: appendCourseCard,
        remove: removeCourseCard,
    } = useFieldArray({
        control: form.control as any,
        name: "rightCoursePickSection.cardBox",
    });

    const {
        fields: courseDetails,
        append: appendCourseDetail,
        remove: removeCourseDetail,
    } = useFieldArray({
        control: form.control as any,
        name: "rightCoursePickSection.detailbox",
    });

    const handleFormSubmit: SubmitHandler<TrainingMainPageDataFormValues> = async (data) => {
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
                            <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control as any}
                                    name="heroSection.subTitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subtitle</FormLabel>
                                            <FormControl><Input placeholder="Hero subtitle" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control as any}
                                    name="heroSection.mainTitle"
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
                                    name="heroSection.description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                {/* <Textarea placeholder="Hero description" rows={4} {...field} /> */}
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

                        {/* About Us Section */}
                        <Card>
                            <CardHeader><CardTitle>About Us Section</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control as any}
                                    name="aboutusSection.subTitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subtitle</FormLabel>
                                            <FormControl><Input placeholder="About Us subtitle" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control as any}
                                    name="aboutusSection.mainTitle"
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
                                    name="aboutusSection.description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl><Input placeholder="About Us description" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control as any}
                                    name="aboutusSection.image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>About Us Image</FormLabel>
                                            <FormControl>
                                                <ImageUpload value={field.value} onChange={field.onChange} className="w-full h-48" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="p-4 border rounded-md space-y-4">
                                    <FormField
                                        control={form.control as any}
                                        name="aboutusSection.detailbox.title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Details Box Title</FormLabel>
                                                <FormControl><Input placeholder="Details section title" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-between items-center">
                                        <FormLabel>Details</FormLabel>
                                        <Button type="button" variant="outline" size="sm" onClick={() => appendAboutDetail({ heading: "", description: "" })}>
                                            <Plus className="h-4 w-4 mr-2" /> Add Detail
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        {aboutDetails.map((item, index) => (
                                            <Card key={item.id} className="p-4 relative border-dashed">
                                                <Button 
                                                    type="button" 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10" 
                                                    onClick={() => removeAboutDetail(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                                <div className="space-y-4 pt-4">
                                                    <FormField
                                                        control={form.control as any}
                                                        name={`aboutusSection.detailbox.detailbox.${index}.heading`}
                                                        render={({ field }) => (
                                                            <FormItem><FormLabel>Heading</FormLabel><FormControl><Input placeholder="Detail heading" {...field} /></FormControl><FormMessage /></FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control as any}
                                                        name={`aboutusSection.detailbox.detailbox.${index}.description`}
                                                        render={({ field }) => (
                                                            <FormItem><FormLabel>Description</FormLabel><FormControl><Input placeholder="Detail description" {...field} /></FormControl><FormMessage /></FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Facilities Section */}
                        <Card>
                            <CardHeader><CardTitle>ITS Institute Facilities</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control as any}
                                    name="itsInstituteFacilitiesSection.title"
                                    render={({ field }) => (
                                        <FormItem><FormLabel>Section Title</FormLabel><FormControl><Input placeholder="Facilities title" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}
                                />
                                <div className="flex justify-between items-center">
                                    <FormLabel>Facility Points</FormLabel>
                                    <Button type="button" variant="outline" size="sm" onClick={() => appendFacilityPoint({ heading: "", image: "" })}>
                                        <Plus className="h-4 w-4 mr-2" /> Add Point
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {facilityPoints.map((item, index) => (
                                        <Card key={item.id} className="p-4 relative border-dashed">
                                            <Button 
                                                type="button" 
                                                variant="ghost" 
                                                size="icon" 
                                                className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10" 
                                                onClick={() => removeFacilityPoint(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            <div className="space-y-4 pt-4">
                                                <FormField
                                                    control={form.control as any}
                                                    name={`itsInstituteFacilitiesSection.points.${index}.heading`}
                                                    render={({ field }) => (
                                                        <FormItem><FormLabel>Heading</FormLabel><FormControl><Input placeholder="Point heading" {...field} /></FormControl><FormMessage /></FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control as any}
                                                    name={`itsInstituteFacilitiesSection.points.${index}.image`}
                                                    render={({ field }) => (
                                                        <FormItem><FormLabel>Icon/Image</FormLabel><FormControl><ImageUpload value={field.value} onChange={field.onChange} className="w-full h-32" /></FormControl><FormMessage /></FormItem>
                                                    )}
                                                />
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Course Pick Section */}
                        <Card>
                            <CardHeader><CardTitle>Right Course Pick Section</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control as any}
                                    name="rightCoursePickSection.mainHeading"
                                    render={({ field }) => (
                                        <FormItem><FormLabel>Main Heading</FormLabel><FormControl><Input placeholder="Section main heading" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}
                                />
                                <div className="p-4 border rounded-md space-y-4">
                                    <div className="flex justify-between items-center">
                                        <FormLabel>Course Cards</FormLabel>
                                        <Button type="button" variant="outline" size="sm" onClick={() => appendCourseCard({ heading: "", image: "" })}>
                                            <Plus className="h-4 w-4 mr-2" /> Add Card
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {courseCards.map((item, index) => (
                                            <Card key={item.id} className="p-4 relative border-dashed">
                                                <Button 
                                                    type="button" 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10" 
                                                    onClick={() => removeCourseCard(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                                <div className="space-y-4 pt-4">
                                                    <FormField
                                                        control={form.control as any}
                                                        name={`rightCoursePickSection.cardBox.${index}.heading`}
                                                        render={({ field }) => (
                                                            <FormItem><FormLabel>Heading</FormLabel><FormControl><Input placeholder="Card heading" {...field} /></FormControl><FormMessage /></FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control as any}
                                                        name={`rightCoursePickSection.cardBox.${index}.image`}
                                                        render={({ field }) => (
                                                            <FormItem><FormLabel>Card Image</FormLabel><FormControl><ImageUpload value={field.value} onChange={field.onChange} className="w-full h-32" /></FormControl><FormMessage /></FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                                <FormField
                                    control={form.control as any}
                                    name="rightCoursePickSection.subTitle"
                                    render={({ field }) => (
                                        <FormItem><FormLabel>Subtitle</FormLabel><FormControl><Input placeholder="Subsection subtitle" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control as any}
                                    name="rightCoursePickSection.mainTitle"
                                    render={({ field }) => (
                                        <FormItem><FormLabel>Main Title</FormLabel><FormControl><Input placeholder="Subsection main title" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control as any}
                                    name="rightCoursePickSection.description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Subsection description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="p-4 border rounded-md space-y-4">
                                    <div className="flex justify-between items-center">
                                        <FormLabel>Course Details</FormLabel>
                                        <Button type="button" variant="outline" size="sm" onClick={() => appendCourseDetail({ image: "", title: "", description: "" })}>
                                            <Plus className="h-4 w-4 mr-2" /> Add Detail
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        {courseDetails.map((item, index) => (
                                            <Card key={item.id} className="p-4 relative border-dashed">
                                                <Button 
                                                    type="button" 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10" 
                                                    onClick={() => removeCourseDetail(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                                <div className="space-y-4 pt-4">
                                                    <FormField
                                                        control={form.control as any}
                                                        name={`rightCoursePickSection.detailbox.${index}.title`}
                                                        render={({ field }) => (
                                                            <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Detail title" {...field} /></FormControl><FormMessage /></FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control as any}
                                                        name={`rightCoursePickSection.detailbox.${index}.description`}
                                                        render={({ field }) => (
                                                            <FormItem><FormLabel>Description</FormLabel><FormControl><Input placeholder="Detail description" {...field} /></FormControl><FormMessage /></FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control as any}
                                                        name={`rightCoursePickSection.detailbox.${index}.image`}
                                                        render={({ field }) => (
                                                            <FormItem><FormLabel>Image</FormLabel><FormControl><ImageUpload value={field.value} onChange={field.onChange} className="w-full h-32" /></FormControl><FormMessage /></FormItem>
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
                                        <FormItem><FormLabel>Focus Keyphrase</FormLabel><FormControl><Input placeholder="e.g. Training ITS" {...field} /></FormControl><FormMessage /></FormItem>
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
                            initialData ? "Update Training Content" : "Create Training Content"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
