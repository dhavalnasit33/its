// 'use client';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useToast } from "@/hooks/use-toast";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ArrowLeft } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import * as z from "zod";

// const subcategorySchema = z.object({
//     subcategory: z.string().min(1, "SubCategory is required"),
//     category: z.string().min(1, "category is required")
// })

// export type subcategorycreateFormValues = z.infer<typeof subcategorySchema>;

// interface subCategory {
//     id: string;
//     name: string;
// }

// interface subcategoryManagerFormprops {
//     initialData?: subcategorycreateFormValues | null;
//     onSubmit: (data: subcategorycreateFormValues) => Promise<void>;
// }

// export default function SubCategoryFrom({ initialData, onSubmit }: subcategoryManagerFormprops) {
//     const { toast } = useToast();
//     const router = useRouter();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [categories, setCategories] = useState<subCategory[]>([]);
//     const form = useForm<subcategorycreateFormValues>({
//         resolver: zodResolver(subcategorySchema),
//         defaultValues: {
//             subcategory: initialData?.subcategory || "",
//             category: initialData?.category || "",
//         }
//     })
//     const handleFormSubmit: SubmitHandler<subcategorycreateFormValues> = async (data) => {
//         setIsSubmitting(true);
//         try {
//             await onSubmit(data);
//             form.reset();
//         } catch (error: any) {
//             toast({ title: "Error", description: error.message, variant: "destructive" });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
//     return (
//         <>
//             <Card>
//                 <CardContent>
//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">

//                             <FormField
//                                 control={form.control}
//                                 name="subcategory"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>category</FormLabel>
//                                         <FormControl><Input placeholder="Enter subcategory" {...field} /></FormControl>
//                                         <FormMessage className="text-red-600 text-sm mt-1" />
//                                     </FormItem>
//                                 )}
//                             />

//                             <FormField
//                                 control={form.control}
//                                 name="category"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>category</FormLabel>
//                                         <Select
//                                             onValueChange={field.onChange}
//                                             defaultValue={field.value}
//                                         >
//                                             <FormControl>
//                                                 <SelectTrigger>
//                                                     <SelectValue placeholder="Category select karo" />
//                                                 </SelectTrigger>
//                                             </FormControl>
//                                             <SelectContent>
//                                                 {categories.map((cat) => (
//                                                     <SelectItem key={cat.id} value={cat.id}>
//                                                         {cat.name}
//                                                     </SelectItem>
//                                                 ))}
//                                             </SelectContent>
//                                         </Select>
//                                         <FormMessage className="text-red-600 text-sm mt-1" />
//                                     </FormItem>
//                                 )}
//                             />
//                             <div className="flex justify-between mt-4">
//                                 <Button type="button" onClick={() => router.back()}>
//                                     <ArrowLeft className="h-4 w-4 mr-2" />
//                                     Back
//                                 </Button>
//                                 <Button type="submit" disabled={isSubmitting}>
//                                     {isSubmitting ? "Submitting..." : "Submit"}
//                                 </Button>
//                             </div>
//                         </form>
//                     </Form>
//                 </CardContent>
//             </Card >
//         </>
//     )
// }


'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import apiService from '@/lib/apiService';

const subcategorySchema = z.object({
    subcategory: z.string().min(1, 'Subcategory name is required'),
    category: z.string().min(1, 'Please select a category'),
});

export type SubcategoryFormValues = z.infer<typeof subcategorySchema>;

interface Category {
    _id: string;
    category: string;
}

interface SubcategoryFormProps {
    initialData?: SubcategoryFormValues | null;
    onSubmit: (data: SubcategoryFormValues) => Promise<void>;
}

export default function SubCategoryForm({ initialData, onSubmit }: SubcategoryFormProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    const form = useForm<SubcategoryFormValues>({
        resolver: zodResolver(subcategorySchema),
        defaultValues: {
            subcategory: initialData?.subcategory ?? '',
            category: initialData?.category ?? '',
        },
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoadingCategories(true);
        try {
            const res = await apiService<{
                success: boolean;
                data: Category[];
            }>('/category', { method: 'GET' });

            if (res.success) {
                setCategories(res.data);
            }
        } catch (err) {
            console.error('Failed to fetch categories', err);
            toast({
                title: 'Warning',
                description: 'Could not load categories. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoadingCategories(false);
        }
    };

    const handleFormSubmit: SubmitHandler<SubcategoryFormValues> = async (data) => {
        setIsSubmitting(true);
        try {
            await onSubmit(data);
            if (!initialData) {
                form.reset();
            }
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || 'Something went wrong',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card>
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">

                        <FormField
                            control={form.control}
                            name="subcategory"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subcategory Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter subcategory name" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-600 text-sm mt-1" />
                                </FormItem>
                            )}
                        />





                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={loadingCategories}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={
                                                        loadingCategories
                                                            ? "Loading categories..."
                                                            : "Select a category"
                                                    }
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.length > 0 ? (
                                                categories.map((cat) => (
                                                    <SelectItem key={cat._id} value={cat._id}>
                                                        {cat.category}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem value="none" disabled>
                                                    No categories found
                                                </SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-red-600 text-sm mt-1" />
                                </FormItem>
                            )}
                        />












                        <div className="flex justify-between mt-4">
                            <Button type="button" variant="outline" onClick={() => router.back()}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}