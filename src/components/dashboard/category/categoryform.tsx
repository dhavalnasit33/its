'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ImageUpload from "@/components/ui/imagupload";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

const categorySchema = z.object({
    category: z.string().min(1, "Category is required"),
    image: z.string().optional(),
})

export type categorycreateFormValues = z.infer<typeof categorySchema>;

interface categoryManagerFormprops {
    initialData?: categorycreateFormValues | null;
    onSubmit: (data: categorycreateFormValues) => Promise<void>;
}

export default function CategoryFrom({ initialData, onSubmit }: categoryManagerFormprops) {
    const { toast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<categorycreateFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            category: initialData?.category || "",
            image: initialData?.image || "",

        }
    })
    const handleFormSubmit: SubmitHandler<categorycreateFormValues> = async (data) => {
        console.log("Form data before submit:", data);
        setIsSubmitting(true);
        try {
            await onSubmit(data);
            form.reset();
        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <>
            <Card>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">

                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>category</FormLabel>
                                        <FormControl><Input placeholder="Enter category" {...field} /></FormControl>
                                        <FormMessage className="text-red-600 text-sm mt-1" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <ImageUpload
                                                value={field.value || ""}
                                                onChange={(url) =>
                                                    form.setValue("image", url, { shouldValidate: true })
                                                }
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-600 text-sm mt-1" />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-between mt-4">
                                <Button type="button" onClick={() => router.back()}>
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}

