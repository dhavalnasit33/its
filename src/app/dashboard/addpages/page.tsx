"use client";

import { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UploadCloud, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiService from "@/lib/apiService";

const pageSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    slug: z.string().min(1).max(200),
    image: z.string().url("Valid image URL required"),
    seo_title: z.string().optional(),
    meta_description: z.string().max(500, "Meta description is too long").optional(),
    seo_keyphrase: z.string().optional(),
    cover_image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type PageFormValues = z.infer<typeof pageSchema>;

const CLOUDINARY_CLOUD_NAME = "dctvxbvuz";
const CLOUDINARY_UPLOAD_PRESET = "ITS_ADMIN";

export default function AddPagesPage() {
    const { toast } = useToast();
    const router = useRouter();

    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<PageFormValues>({
        resolver: zodResolver(pageSchema),
        defaultValues: {
            title: "",
            description: "",
            image: "",
            slug: "",
            seo_title: "",
            meta_description: "",
            seo_keyphrase: "",
            cover_image: "",
        },
    });

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                { method: "POST", body: formData }
            );
            const data = await response.json();
            if (data.secure_url) {
                form.setValue("image", data.secure_url, { shouldValidate: true });
                toast({ title: "Image Uploaded", description: "Image uploaded successfully." });
            } else throw new Error(data.error?.message || "Upload failed");
        } catch (error: any) {
            toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
        } finally {
            setIsUploading(false);
            if (imageInputRef.current) imageInputRef.current.value = "";
        }
    };

    const onSubmit = async (data: PageFormValues) => {
        setIsSubmitting(true);
        try {
            const res = await apiService<{ success: boolean; message: string }>(
                "/page",
                {
                    method:  "POST",
                    headers: { "Content-Type": "application/json" },
                    body:    JSON.stringify(data),
                }
            );

            if (res.success) {
                toast({ title: "Success", description: res.message || "Page created successfully." });
                router.push("/dashboard/pages");
            } else {
                throw new Error(res.message || "Failed to create page");
            }
        } catch (error: any) {
            toast({ title: "Error", description: error.message || "Something went wrong", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Card>
                <CardHeader>
                    Home page
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField control={form.control} name="title" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>page Title</FormLabel>
                                    <FormControl><Input placeholder="Enter the page title" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="description" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>page description</FormLabel>
                                    <FormControl><Input placeholder="Enter the page description" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="image" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <div className="flex items-center gap-4 ">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            ref={imageInputRef}
                                            onChange={handleImageUpload}
                                            disabled={isUploading || isSubmitting}
                                        />
                                        <Button
                                            type="button"
                                            className=" border border-gray-300"
                                            onClick={() => imageInputRef.current?.click()}
                                            disabled={isUploading || isSubmitting}
                                        >
                                            {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                                            Upload Image
                                        </Button>

                                        {field.value && (
                                            <img src={field.value} alt="Preview" className="h-16 w-16 rounded-md object-cover border" />
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="slug" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl><Input placeholder="Enter the URL slug" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="seo_title" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>SEO Title</FormLabel>
                                    <FormControl><Input placeholder="Enter the SEO title (for search results)" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="seo_keyphrase" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>SEO Keyphrases</FormLabel>
                                    <FormControl><Textarea rows={2} placeholder="Enter keywords separated by commas" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="meta_description" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Meta Description</FormLabel>
                                    <FormControl><Textarea rows={3} placeholder="Enter a brief summary for search results" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <div className="flex gap-3 justify-end">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => router.push("/dashboard/pages")}
                                >Cancel</Button>
                                <Button type="submit"
                                    className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                                    disabled={isSubmitting || isUploading}>
                                    {isSubmitting ? "Saving..." : "Save"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    );
}
