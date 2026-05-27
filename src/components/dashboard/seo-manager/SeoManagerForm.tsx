// components/dashboard/seoManager/SeoManagerForm.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UploadCloud, Link, Link2Off,  } from "lucide-react";
import { SeoManagerFormValues, SeoManagerSchema } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUpload from "@/components/ui/imagupload";

const MAX_META_DESCRIPTION_LENGTH = 500;
const CLOUDINARY_CLOUD_NAME = "dctvxbvuz";
const CLOUDINARY_UPLOAD_PRESET = "ITS_ADMIN";

interface SeoManagerFormProps {
    initialData?: SeoManagerFormValues | null;
    onSubmit: (data: SeoManagerFormValues) => Promise<void>;
    onCancel?: () => void;
}

export default function SeoManagerForm({ initialData, onSubmit, onCancel }: SeoManagerFormProps) {
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 🆕 FIX: Ensure no null values in form data
    const getSafeInitialData = () => {
        if (!initialData) {
            return {
                title: "",
                slug: "",
                seo_keyphrase: "",
                seo_title: "",
                meta_description: "",
                cover_image: "",
                linkedService: "",
                linkedHirePage: "",
                linkedType: "independent",
                isAutoManaged: false
            };
        }

        // 🆕 Convert any null values to empty strings
        return {
            title: initialData.title || "",
            slug: initialData.slug || "",
            seo_keyphrase: initialData.seo_keyphrase || "",
            seo_title: initialData.seo_title || "",
            meta_description: initialData.meta_description || "",
            cover_image: initialData.cover_image || "",
            linkedService: initialData.linkedService || "",
            linkedHirePage: initialData.linkedHirePage || "",
            linkedType: initialData.linkedType || "independent",
            isAutoManaged: initialData.isAutoManaged || false
        };
    };

    const form = useForm<SeoManagerFormValues>({
        resolver: zodResolver(SeoManagerSchema)as any,
        defaultValues: getSafeInitialData()as any,
    });

    // Generate slug from title
    const generateSlug = (text: string): string => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    // Watch title to auto-generate slug
    const titleValue = form.watch("title");
    const metaDescriptionValue = form.watch("meta_description") || "";

    // Auto-generate slug when title changes (only if slug is empty or matches the previous title)
    useEffect(() => {
        if (titleValue && (!initialData?.slug || form.getValues("slug") === generateSlug(initialData.title || ""))) {
            const newSlug = generateSlug(titleValue);
            form.setValue("slug", newSlug, { shouldValidate: true });
        }
    }, [titleValue, initialData, form]);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (!data.secure_url) throw new Error(data.error?.message || "Upload failed");

            form.setValue("cover_image", data.secure_url, { shouldValidate: true });
            toast({ title: "Image Uploaded", description: "Cover image uploaded successfully." });
        } catch (error: any) {
            toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
        } finally {
            setIsUploading(false);
        }
    };

    const handleFormSubmit: SubmitHandler<SeoManagerFormValues> = async (data) => {
        setIsSubmitting(true);
        try {
            // 🆕 FIX: Ensure no null values in submitted data
            const submitData = {
                title: data.title || "",
                slug: data.slug || "",
                seo_keyphrase: data.seo_keyphrase || "",
                seo_title: data.seo_title || "",
                meta_description: data.meta_description || "",
                cover_image: data.cover_image || "",
                // For new entries, ensure they're independent
                ...(!initialData && {
                    linkedType: "independent",
                    isAutoManaged: false,
                    linkedService: "",
                    linkedHirePage: ""
                }),
                // For existing entries, preserve their values
                ...(initialData && {
                    linkedService: data.linkedService || "",
                    linkedHirePage: data.linkedHirePage || "",
                    linkedType: data.linkedType || "independent",
                    isAutoManaged: data.isAutoManaged || false
                })
            };

            await onSubmit(submitData as any);
            if (!initialData) {
                form.reset();
            }
        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const isAutoManaged = initialData?.isAutoManaged;
    const linkedType = initialData?.linkedType;

    return (
        <Card>
            <CardContent className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Management Type Indicator */}
                        {initialData && (
                            <div className={`flex items-center gap-3 p-4 rounded-lg border ${isAutoManaged
                                    ? "bg-green-50 border-green-200"
                                    : "bg-blue-50 border-blue-200"
                                }`}>
                                {isAutoManaged ? (
                                    <Link className="w-5 h-5 text-green-600" />
                                ) : (
                                    <Link2Off className="w-5 h-5 text-blue-600" />
                                )}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm font-semibold ${isAutoManaged ? "text-green-800" : "text-blue-800"
                                            }`}>
                                            {isAutoManaged ? "Auto-Managed" : "Independent"}
                                        </span>
                                        {isAutoManaged && linkedType && (
                                            <span className="text-xs bg-white px-2 py-1 rounded border">
                                                Linked to {linkedType} page
                                            </span>
                                        )}
                                    </div>
                                    {isAutoManaged ? (
                                        <p className="text-xs text-green-600 mt-1">
                                            Changes will sync with the linked {linkedType} page automatically.
                                        </p>
                                    ) : (
                                        <p className="text-xs text-blue-600 mt-1">
                                            This entry is manually managed and won't sync with any service/hire pages.
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Title */}
                        <Card className="shadow-none">
                            
                             <CardContent className="space-y-6 pt-6">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter title (e.g., Homepage SEO)"
                                                    {...field}
                                                    value={field.value || ""} // 🆕 FIX: Ensure no null
                                                    disabled={isAutoManaged}
                                                />
                                            </FormControl>
                                            {isAutoManaged && (
                                                <p className="text-xs text-amber-600">
                                                    Title is managed by the linked {linkedType} page
                                                </p>
                                            )}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Slug */}
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter slug (auto-generated from title)"
                                                    {...field}
                                                    value={field.value || ""} // 🆕 FIX: Ensure no null
                                                    disabled={isAutoManaged}
                                                />
                                            </FormControl>
                                            {isAutoManaged && (
                                                <p className="text-xs text-amber-600">
                                                    Slug is managed by the linked {linkedType} page
                                                </p>
                                            )}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        
                        {/* SEO Title */}
                        <Card  className="shadow-none">
                            <CardHeader>
                                <CardTitle className="text-primary">
                                    SEO Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="seo_title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>SEO Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter SEO title (appears in browser tab)"
                                                {...field}
                                                value={field.value || ""} // 🆕 FIX: Ensure no null
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* SEO Keyphrase */}
                            <FormField
                                control={form.control}
                                name="seo_keyphrase"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>SEO Keyphrases</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={3}
                                                placeholder="Enter keyphrases separated by commas (e.g., web development, app development, software solutions)"
                                                {...field}
                                                value={field.value || ""} // 🆕 FIX: Ensure no null
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Meta Description */}
                            <FormField
                                control={form.control}
                                name="meta_description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Meta Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={3}
                                                placeholder="Enter meta description (appears in search results)"
                                                maxLength={MAX_META_DESCRIPTION_LENGTH}
                                                {...field}
                                                value={field.value || ""} // 🆕 FIX: Ensure no null
                                            />
                                        </FormControl>
                                        <div className="text-right text-sm text-muted-foreground mt-1">
                                            {(field.value || "").length} / {MAX_META_DESCRIPTION_LENGTH}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Hidden fields for linked data */}
                            <div className="hidden">
                                <FormField
                                    control={form.control}
                                    name="linkedService"
                                    render={({ field }) => (
                                        <Input
                                            type="hidden"
                                            {...field}
                                            value={field.value || ""} // 🆕 FIX: Ensure no null
                                        />
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="linkedHirePage"
                                    render={({ field }) => (
                                        <Input
                                            type="hidden"
                                            {...field}
                                            value={field.value || ""} // 🆕 FIX: Ensure no null
                                        />
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="linkedType"
                                    render={({ field }) => (
                                        <Input
                                            type="hidden"
                                            {...field}
                                            value={field.value || ""} // 🆕 FIX: Ensure no null
                                        />
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isAutoManaged"
                                    render={({ field }) => (
                                        <Input
                                            type="hidden"
                                            {...field}
                                            value={field.value ? "true" : "false"} // 🆕 FIX: Convert boolean to string
                                        />
                                    )}
                                />
                            </div>
                        </CardContent>
                        </Card>
                    </div>

                        <div className="space-y-8 lg:col-span-1">
                        {/* Cover Image */}
                        <FormField
                            control={form.control}
                            name="cover_image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cover Image</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            disabled={isSubmitting}
                                            className="w-full h-48"
                                        />
                                        {/* <Button
                                            type="button"
                                            onClick={() => document.getElementById("coverImageUpload")?.click()}
                                            disabled={isUploading}
                                        >
                                            {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <UploadCloud className="h-4 w-4 mr-2" />}
                                            Upload Cover Image
                                        </Button>
                                        {field.value && (
                                            <div className="flex items-center gap-2">
                                                <img src={field.value} alt="Preview" className="h-16 w-16 object-cover rounded-md border" />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => window.open(field.value, '_blank')}
                                                >
                                                    View
                                                </Button>
                                            </div>
                                        )} */}
                                   </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-end gap-3 border-t pt-6 mt-8">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || isUploading}>
                                {isSubmitting || isUploading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {initialData ? "Updating..." : "Creating..."}
                                </>
                                ) : (
                                initialData ? "Update Seo" : "Create Seo"
                                )}
                        </Button>
                    </div>

                        {/* Auto-managed warning */}
                        {isAutoManaged && (
                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                <p className="text-sm text-amber-800">
                                    <strong>Note:</strong> This is an auto-managed entry. Title and slug changes will sync with the linked {linkedType} page.
                                    Other fields (SEO Title, Keyphrases, Meta Description, Cover Image) can be edited independently.
                                </p>
                            </div>
                        )}
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}