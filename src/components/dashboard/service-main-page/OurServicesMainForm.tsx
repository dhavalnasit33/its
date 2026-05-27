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
import { OurServicesMainFormValues, OurServicesMainSchema } from "@/types";
import ImageUpload from "@/components/ui/imagupload";
import CustomCKEditor from "@/components/shared/Ckeditor";

interface ServiceOption {
    _id: string;
    mainTitle: string;
    category: string;
    subCategory: string;
}

interface ServiceMainFormProps {
    initialData?: OurServicesMainFormValues | null;
    onSubmit: (data: OurServicesMainFormValues) => Promise<void>;
    onCancel?: () => void;
}

export default function OurServicesMainForm({
    initialData,
    onSubmit,
    onCancel,
}: ServiceMainFormProps) {
    const { toast } = useToast();
    const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);
    const [services, setServices] = useState<ServiceOption[]>([]);
    const [expandedHeroIndex, setExpandedHeroIndex] = useState<number | null>(0);
    const [expandedTechIndex, setExpandedTechIndex] = useState<number | null>(0);

    const form = useForm<OurServicesMainFormValues>({
        resolver: zodResolver(OurServicesMainSchema),
        defaultValues: initialData || {
            mainTitle: "",
            description: "",
            heroSections: [{ title: "", image: "", points: [] }],
            technologyDetails: [
                {
                    title: "",
                    description: "",
                    image: "",
                    technologyDetail: [],
                    developmentDetail: [],
                },
            ],
            seo: {
                title: "",
                keyphrase: "",
                seoDescription: "",
                featureImage: "",
            },
        },
    });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await apiService<{
                    success: boolean;
                    data: ServiceOption[];
                }>("/service/admin-id");
                if (res.success) setServices(res.data);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch services list.",
                    variant: "destructive",
                });
            }
        };
        fetchServices();
    }, [toast]);

    const {
        fields: heroFields,
        append: appendHero,
        remove: removeHero,
    } = useFieldArray({ control: form.control as any, name: "heroSections" });

    const {
        fields: techDetailFields,
        append: appendTechDetail,
        remove: removeTechDetail,
    } = useFieldArray({ control: form.control as any, name: "technologyDetails" });

    const handleFormSubmit: SubmitHandler<OurServicesMainFormValues> = async (data) => {
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
                        {/* Basic Info Section */}
                        <Card>
                            <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
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
                            </CardContent>
                        </Card>

                        {/* Hero Sections */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Hero Sections</CardTitle>
                                <Button type="button" variant="outline" size="sm" onClick={() => appendHero({ title: "", image: "", points: [] })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add Hero Section
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {heroFields.map((field, index) => {
                                    const sectionTitle = form.watch(`heroSections.${index}.title`);
                                    const isExpanded = expandedHeroIndex === index;

                                    return (
                                        <Card key={field.id} className="relative border-dashed bg-muted/5 overflow-hidden">
                                            <div
                                                className="flex items-center justify-between p-4 bg-muted/20 cursor-pointer hover:bg-muted/30 transition-colors"
                                                onClick={() => setExpandedHeroIndex(isExpanded ? null : index)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                                                        {index + 1}
                                                    </div>
                                                    <span className="font-semibold text-sm">
                                                        {sectionTitle || `Hero Section ${index + 1}`}
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
                                                            removeHero(index);
                                                            if (expandedHeroIndex === index) setExpandedHeroIndex(null);
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
                                                        name={`heroSections.${index}.title`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Section Title</FormLabel>
                                                                <FormControl><Input {...field} placeholder="Enter section title" /></FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control as any}
                                                        name={`heroSections.${index}.image`}
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
                                                    <div className="p-4 border rounded-md bg-muted/10">
                                                        <PointsWithServiceArray
                                                            nestIndex={index}
                                                            fieldName={`heroSections.${index}.points`}
                                                            services={services}
                                                        />
                                                    </div>
                                                </CardContent>
                                            )}
                                        </Card>
                                    );
                                })}
                            </CardContent>
                        </Card>

                        {/* Technology Details */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Technology Details</CardTitle>
                                <Button type="button" variant="outline" size="sm" onClick={() => appendTechDetail({ title: "", description: "", image: "", technologyDetail: [], developmentDetail: [] })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add Tech Section
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {techDetailFields.map((field, index) => {
                                    const sectionTitle = form.watch(`technologyDetails.${index}.title`);
                                    const isExpanded = expandedTechIndex === index;

                                    return (
                                        <Card key={field.id} className="relative border-dashed bg-muted/5 overflow-hidden">
                                            <div
                                                className="flex items-center justify-between p-4 bg-muted/20 cursor-pointer hover:bg-muted/30 transition-colors"
                                                onClick={() => setExpandedTechIndex(isExpanded ? null : index)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                                                        {index + 1}
                                                    </div>
                                                    <span className="font-semibold text-sm">
                                                        {sectionTitle || `Tech Detail Section ${index + 1}`}
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
                                                            removeTechDetail(index);
                                                            if (expandedTechIndex === index) setExpandedTechIndex(null);
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
                                                        name={`technologyDetails.${index}.title`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Section Title</FormLabel>
                                                                <FormControl><Input {...field} placeholder="Enter section title" /></FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control as any}
                                                        name={`technologyDetails.${index}.description`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Section Description</FormLabel>
                                                                <FormControl><CustomCKEditor value={field.value} onChange={field.onChange} /></FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control as any}
                                                        name={`technologyDetails.${index}.image`}
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
                                                    <div className="p-4 border rounded-md bg-muted/10 space-y-6">
                                                        <SimplePointsArray
                                                            nestIndex={index}
                                                            fieldName={`technologyDetails.${index}.technologyDetail`}
                                                        />
                                                        <div className="border-t pt-4">
                                                            <PointsWithServiceArray
                                                                nestIndex={index}
                                                                fieldName={`technologyDetails.${index}.developmentDetail`}
                                                                services={services}
                                                            />
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            )}
                                        </Card>
                                    );
                                })}
                            </CardContent>
                        </Card>

                        {/* SEO Settings */}
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
                                        <FormItem><FormLabel>Focus Keyphrase</FormLabel><FormControl><Input placeholder="e.g. IT Services" {...field} /></FormControl><FormMessage /></FormItem>
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

                    <div className="w-full lg:col-span-1 space-y-6 mt-8 lg:mt-0">
                        {/* Right Column: SEO Feature Image Only */}
                        <Card >
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
                            initialData ? "Update Service Content" : "Create Service Content"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

const PointsWithServiceArray = ({
    nestIndex,
    fieldName,
    services,
}: {
    nestIndex: number;
    fieldName: string;
    services: ServiceOption[];
}) => {
    const { control } = useFormContext<OurServicesMainFormValues>();
    const { fields, append, remove } = useFieldArray({
        control: control as any,
        name: fieldName,
    });

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <FormLabel>Development Points (With Service Link)</FormLabel>
                <Button type="button" size="sm" variant="outline" onClick={() => append({ label: "", image: "", serviceId: "" })}>
                    <Plus className="h-4 w-4 mr-2" /> Add Point
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field, pointIndex) => (
                    <Card key={field.id} className="p-3 relative bg-background">
                        <div className="flex justify-end">
                            <Button type="button" variant="ghost" size="icon" className=" text-destructive hover:text-destructive/90 hover:bg-destructive/10" onClick={() => remove(pointIndex)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="space-y-3 ">
                            <FormField
                                control={control as any}
                                name={`${fieldName}.${pointIndex}.label`}
                                render={({ field }) => (
                                    <FormItem><FormLabel>Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )}
                            />
                            <FormField
                                control={control as any}
                                name={`${fieldName}.${pointIndex}.serviceId`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Link to Service</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select service..." /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                {services.map((s) => (
                                                    <SelectItem key={s._id} value={s._id}>{s.mainTitle}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control as any}
                                name={`${fieldName}.${pointIndex}.image`}
                                render={({ field }) => (
                                    <FormItem><FormLabel>Icon</FormLabel><FormControl><ImageUpload value={field.value} onChange={field.onChange} className="h-24" /></FormControl><FormMessage /></FormItem>
                                )}
                            />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

const SimplePointsArray = ({
    nestIndex,
    fieldName,
}: {
    nestIndex: number;
    fieldName: string;
}) => {
    const { control } = useFormContext<OurServicesMainFormValues>();
    const { fields, append, remove } = useFieldArray({
        control: control as any,
        name: fieldName,
    });

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <FormLabel>Technology Points (No Link)</FormLabel>
                <Button type="button" size="sm" variant="outline" onClick={() => append({ label: "", image: "" })}>
                    <Plus className="h-4 w-4 mr-2" /> Add Point
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field, pointIndex) => (
                    <Card key={field.id} className="p-3 relative bg-background">
                        <div className="flex justify-end">
                            <Button type="button" variant="ghost" size="icon" className=" text-destructive hover:text-destructive/90 hover:bg-destructive/10" onClick={() => remove(pointIndex)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="space-y-3 ">
                            <FormField
                                control={control as any}
                                name={`${fieldName}.${pointIndex}.label`}
                                render={({ field }) => (
                                    <FormItem><FormLabel>Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )}
                            />
                            <FormField
                                control={control as any}
                                name={`${fieldName}.${pointIndex}.image`}
                                render={({ field }) => (
                                    <FormItem><FormLabel>Icon</FormLabel><FormControl><ImageUpload value={field.value} onChange={field.onChange} className="h-24" /></FormControl><FormMessage /></FormItem>
                                )}
                            />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
