
// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { useToast } from "@/hooks/use-toast";
// import { UploadCloud, Loader2 } from "lucide-react";
// import { TiptapEditorNoSSR } from "@/components/shared/TiptapEditor";
// import { Textarea } from "@/components/ui/textarea";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";



// // ---------------- Schema -----------------
// const pageSchema = z.object({
//     title: z.string().optional(),
//     description: z.string().optional(),
//     slug: z.string().min(1).max(200),
//     image: z.string().url("Valid image URL required"),
//     seo_title: z.string().optional(),
//     meta_description: z.string().max(500, "Meta description is too long").optional(),
//     seo_keyphrase: z.string().optional(),
//     cover_image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
// });

// export type PageFormValues = z.infer<typeof pageSchema>;

// interface PageFormProps {
//     initialData?: PageFormValues | null;
//     onSubmit: (data: PageFormValues) => Promise<void>;
// }


// const CLOUDINARY_CLOUD_NAME = "dctvxbvuz";
// const CLOUDINARY_UPLOAD_PRESET = "ITS_ADMIN";

// export default function BlogForm({ initialData, onSubmit }: PageFormProps) {
//     const { toast } = useToast();


//     const router = useRouter();

//     const [isUploading, setIsUploading] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const imageInputRef = useRef<HTMLInputElement>(null);
//     const coverImageInputRef = useRef<HTMLInputElement>(null);

//     const form = useForm<PageFormValues>({
//         resolver: zodResolver(pageSchema),
//         defaultValues: {
//             title: "",
//             description: "",
//             image: "",
//             slug: "",
//             seo_title: "",
//             meta_description: "",
//             seo_keyphrase: "",
//             cover_image: "",
//         },
//     });

//     useEffect(() => {
//         if (initialData) {
//             form.reset(initialData);
//         }
//     }, [initialData, form]);


//     const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (!file) return;

//         setIsUploading(true);
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

//         try {
//             const response = await fetch(
//                 `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
//                 { method: "POST", body: formData }
//             );
//             const data = await response.json();
//             if (data.secure_url) {
//                 form.setValue("image", data.secure_url, { shouldValidate: true });
//                 toast({ title: "Image Uploaded", description: "Image uploaded successfully." });
//             } else throw new Error(data.error?.message || "Upload failed");
//         } catch (error: any) {
//             toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
//         } finally {
//             setIsUploading(false);
//             if (imageInputRef.current) imageInputRef.current.value = "";
//         }
//     };


//     const handleSubmit: SubmitHandler<PageFormValues> = async (data) => {
//         setIsSubmitting(true);
//         try {
//             await onSubmit(data);
//             form.reset();
//         } catch (error: any) {
//             toast({ title: "Error", description: error.message || "Something went wrong", variant: "destructive" });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
//     return (
//         <>
//             <Card>
//                 <CardHeader>
//                     Home  page
//                 </CardHeader>
//                 <CardContent>

//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">

//                             <FormField control={form.control} name="title" render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>page Title</FormLabel>
//                                     <FormControl><Input placeholder="Enter the page title" {...field} /></FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )} />

//                             <FormField control={form.control} name="description" render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>page description</FormLabel>
//                                     <FormControl><Input placeholder="Enter the page description" {...field} /></FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )} />

//                             <FormField control={form.control} name="image" render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Image</FormLabel>
//                                     <div className="flex items-center gap-4 ">
//                                         <Input
//                                             type="file"
//                                             accept="image/*"
//                                             className="hidden"
//                                             ref={imageInputRef}
//                                             onChange={handleImageUpload}
//                                             disabled={isUploading || isSubmitting}
//                                         />
//                                         <Button
//                                             type="button"
//                                             className=" border border-gray-300"
//                                             onClick={() => imageInputRef.current?.click()}
//                                             disabled={isUploading || isSubmitting}
//                                         >
//                                             {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
//                                             Upload Image
//                                         </Button>

//                                         {field.value && (
//                                             <img src={field.value} alt="Preview" className="h-16 w-16 rounded-md object-cover border" />
//                                         )}
//                                     </div>
//                                     <FormMessage />
//                                 </FormItem>
//                             )} />

//                             <FormField control={form.control} name="seo_title" render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>SEO Title</FormLabel>
//                                     <FormControl><Input placeholder="Enter the SEO title (for search results)" {...field} /></FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )} />

//                             <FormField control={form.control} name="seo_keyphrase" render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>SEO Keyphrases</FormLabel>
//                                     <FormControl><Textarea rows={2} placeholder="Enter keywords separated by commas" {...field} /></FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )} />

//                             <FormField control={form.control} name="meta_description" render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Meta Description</FormLabel>
//                                     <FormControl><Textarea rows={3} placeholder="Enter a brief summary for search results" {...field} /></FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )} />

//                             <div className="flex gap-3 justify-end">

//                                 <Button
//                                     variant="secondary"
//                                     onClick={() => router.push("/dashboard/pages")}
//                                 >Cancel</Button>

//                                 <Button type="submit"
//                                     className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
//                                     disabled={isSubmitting || isUploading}>
//                                     {isSubmitting ? "Saving..." : "Save"}
//                                 </Button>
//                             </div>

//                         </form>
//                     </Form>
//                 </CardContent>
//             </Card>
//         </>
//     )
// }



'use client';
import PageCreate, { PageFormValues } from '@/components/dashboard/pages/createpagefrom';
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast';
import apiService from '@/lib/apiService';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';


interface CreateCategoryManagerDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSuccess: () => void;
}

export default function CreateCategoryManagerDialogProps({
    isOpen,
    onOpenChange,
}: CreateCategoryManagerDialogProps) {

    const { toast } = useToast();

    const router = useRouter();
    const handleCreate = async (data: PageFormValues) => {
        try {

            const res = await apiService<{ success: boolean; message: string }>("/page", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            console.log("API Response:", res);

            if (res.success) {
                toast({ title: "Success", description: res.message });
                router.push("/dashboard/category");
            } else {
                toast({ title: "Error", description: res.message, variant: "destructive" });

            }
        } catch (error: any) {
            toast({ title: "Error", description: error.message || "Something went wrong", variant: "destructive" });
        }
    };

    return (
        <>
            <div className="flex justify-between itmes-center border-b py-4 mb-4">
                <h1 className="text-2xl font-bold">Create category</h1>
                <Button
                    onClick={() => router.push("/dashboard/category")}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
            </div>
            <PageCreate onSubmit={handleCreate} initialData={null} />

        </>
    )
}

