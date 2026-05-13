
// "use client";

// import { useEffect, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { useToast } from "@/hooks/use-toast";
// import { Textarea } from "@/components/ui/textarea";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import ImageUpload from "@/components/ui/imagupload";

// const seoSchema = z.object({
//     title: z.string().optional(),
//     keyphrase: z.string().optional(),
//     seoDescription: z.string().max(500, "Meta description is too long").optional(),
//     featureImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
// });

// const pageSchema = z.object({
//     title: z.string().min(1, "Title is required"),
//     description: z.string().optional(),
//     slug: z
//         .string()
//         .min(1, "Slug is required")
//         .max(200)
//         .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens only"),
//     image: z.string().url("Valid image URL required").optional().or(z.literal("")),
//     seo: seoSchema,
// });

// export type PageFormValues = z.infer<typeof pageSchema>;

// interface PageFormProps {
//     initialData?: PageFormValues | null;
//     onSubmit: (data: PageFormValues) => Promise<void>;
// }

// export default function PageCreate({ initialData, onSubmit }: PageFormProps) {
//     const { toast } = useToast();
//     const router = useRouter();
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const defaultValues: PageFormValues = {
//         title: "",
//         description: "",
//         slug: "",
//         image: "",
//         seo: {
//             title: "",
//             keyphrase: "",
//             seoDescription: "",
//             featureImage: "",
//         },
//     };

//     const form = useForm<PageFormValues>({
//         resolver: zodResolver(pageSchema),
//         defaultValues,
//     });

//     useEffect(() => {
//         if (initialData) {
//             form.reset({
//                 ...defaultValues,
//                 ...initialData,
//                 seo: {
//                     ...defaultValues.seo,
//                     ...(initialData.seo ?? {}),
//                 },
//             });
//         }
//     }, [initialData]);

//     const watchTitle = form.watch("title");
//     useEffect(() => {
//         if (!initialData) {
//             const slug = watchTitle
//                 .toLowerCase()
//                 .trim()
//                 .replace(/[^a-z0-9\s-]/g, "")
//                 .replace(/\s+/g, "-")
//                 .replace(/-+/g, "-");
//             form.setValue("slug", slug, { shouldValidate: false });
//         }
//     }, [watchTitle, initialData]);

//     const handleSubmit: SubmitHandler<PageFormValues> = async (data) => {
//         setIsSubmitting(true);
//         try {
//             await onSubmit(data);
//             if (!initialData) form.reset(defaultValues);
//         } catch (error: any) {
//             toast({
//                 title: "Error",
//                 description: error.message || "Something went wrong",
//                 variant: "destructive",
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">

//                 <Card>
//                     <CardHeader className="text-xl font-bold">Page Details</CardHeader>
//                     <CardContent className="space-y-4">

//                         <FormField
//                             control={form.control}
//                             name="title"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Page Title <span className="text-red-500">*</span></FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="Enter the page title" {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <FormField
//                             control={form.control}
//                             name="description"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Page Description</FormLabel>
//                                     <FormControl>
//                                         <Textarea
//                                             placeholder="Enter the page description"
//                                             rows={4}
//                                             {...field}
//                                         />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader className="text-xl font-bold">SEO Settings</CardHeader>
//                     <CardContent className="space-y-4">

//                         <div className="flex flex-col lg:flex-row gap-8">
//                             <div className="flex-1 space-y-8">
//                                 <FormField
//                                     control={form.control}
//                                     name="seo.title"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>SEO Title</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Enter SEO title" {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 <FormField
//                                     control={form.control}
//                                     name="seo.keyphrase"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Keyphrase</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Enter focus keyphrase" {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 <FormField
//                                     control={form.control}
//                                     name="seo.seoDescription"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>SEO Description</FormLabel>
//                                             <FormControl>
//                                                 <Textarea
//                                                     placeholder="Enter SEO description (max 500 chars)"
//                                                     rows={3}
//                                                     {...field}
//                                                 />
//                                             </FormControl>
//                                             <div className="flex justify-between items-center mt-1">
//                                                 <FormMessage />
//                                             </div>
//                                         </FormItem>
//                                     )}
//                                 />
//                             </div>
//                             <div className="w-full lg:w-[300px] space-y-6 mt-8 lg:mt-0">

//                                 <FormField
//                                     control={form.control}
//                                     name="seo.featureImage"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Featured Image</FormLabel>
//                                             <FormControl>
//                                                 <ImageUpload
//                                                     value={field.value || ""}
//                                                     onChange={(url) =>
//                                                         form.setValue("seo.featureImage", url, { shouldValidate: true })
//                                                     }
//                                                     disabled={isSubmitting}
//                                                 />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>

//                 <div className="flex gap-3 justify-end">
//                     <Button
//                         type="button"
//                         variant="secondary"
//                         onClick={() => router.push("/dashboard/pages")}
//                         disabled={isSubmitting}
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         type="submit"
//                         className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
//                         disabled={isSubmitting}
//                     >
//                         {isSubmitting ? "Saving..." : initialData ? "Update" : "Save"}
//                     </Button>
//                 </div>

//             </form>
//         </Form>
//     );
// }


"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUpload from "@/components/ui/imagupload";

const seoSchema = z.object({
    title: z.string().optional(),
    keyphrase: z.string().optional(),
    seoDescription: z.string().max(500, "Meta description is too long").optional(),
    featureImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

const pageSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    slug: z
        .string()
        .min(1, "Slug is required")
        .max(200)
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens only"),
    image: z.string().url("Valid image URL required").optional().or(z.literal("")),
    seo: seoSchema,
});

export type PageFormValues = z.infer<typeof pageSchema>;

interface PageFormProps {
    initialData?: PageFormValues | null;
    onSubmit: (data: PageFormValues) => Promise<void>;
}

export default function PageCreate({ initialData, onSubmit }: PageFormProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const defaultValues: PageFormValues = {
        title: "",
        description: "",
        slug: "",
        image: "",
        seo: {
            title: "",
            keyphrase: "",
            seoDescription: "",
            featureImage: "",
        },
    };

    const form = useForm<PageFormValues>({
        resolver: zodResolver(pageSchema),
        defaultValues,
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                ...defaultValues,
                ...initialData,
                seo: {
                    ...defaultValues.seo,
                    ...(initialData.seo ?? {}),
                },
            });
        }
    }, [initialData]);

    const watchTitle = form.watch("title");
    useEffect(() => {
        if (!initialData) {
            const slug = watchTitle
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-");
            form.setValue("slug", slug, { shouldValidate: false });
        }
    }, [watchTitle, initialData]);

    const handleSubmit: SubmitHandler<PageFormValues> = async (data) => {
        setIsSubmitting(true);
        try {
            await onSubmit(data);
            if (!initialData) form.reset(defaultValues);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // <ShadowCard>
         <Card>
        <CardContent className="p-6">
        <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">

                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                    
                        <Card className="shadow-none">
                            <CardHeader>
                                <CardTitle>
                                    Page Details
                                </CardTitle>
                                </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Page Title <span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter the page title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Page Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Enter the page description"
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
                
                        <Card  className="shadow-none">
                            <CardHeader>
                                <CardTitle className="text-primary">
                                    SEO Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">

                                <div className="flex flex-col lg:flex-row gap-8">
                                    <div className="flex-1 space-y-8">
                                        <FormField
                                            control={form.control}
                                            name="seo.title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>SEO Title</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter SEO title" {...field} />
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
                                                    <FormLabel>Keyphrase</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter focus keyphrase" {...field} />
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
                                                    <FormLabel>SEO Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Enter SEO description (max 500 chars)"
                                                            rows={3}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    
                                </div>
                            </CardContent>
                        </Card>
                
                    </div>
    
                    <div className="space-y-8 lg:col-span-1">
                        <FormField
                            control={form.control}
                            name="seo.featureImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Featured Image</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value || ""}
                                            onChange={(url) =>
                                                form.setValue("seo.featureImage", url, { shouldValidate: true })
                                            }
                                            disabled={isSubmitting}
                                            className="w-full h-48"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                  </div>

                    <div className="flex justify-end gap-3 border-t pt-6 mt-8">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/dashboard/pages")}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : initialData ? "Update" : "Save"}
                        </Button>
                    </div>
                </form>
        </Form>
        </CardContent>
        </Card>
    );
}