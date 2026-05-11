"use client"
import React from 'react'
import { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { TiptapEditorNoSSR } from "@/components/shared/TiptapEditor";

// ---------------- Schema -----------------
const FaqsSchema = z.object({
    categories: z.string().min(2, "Category required"),
    title: z.string().min(2, "Title required"),
    answer: z.string().min(2, "answer required"),
});

interface FaqsFormProps {
    initialData?: FaqsFormValues | null;
    onSubmit: (data: FaqsFormValues) => Promise<void>;
}

export type FaqsFormValues = z.infer<typeof FaqsSchema>;

export default function FaqsForm({ initialData, onSubmit }: FaqsFormProps) {


    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const coverImageInputRef = useRef<HTMLInputElement>(null);


    const form = useForm<FaqsFormValues>({
        resolver: zodResolver(FaqsSchema),
        defaultValues: {
            categories: "",
            title: "",
            answer: "",
        },
    });
    useEffect(() => {
        if (initialData) {
            form.reset(initialData);
        }
    }, [initialData, form]);

    // Submit handler
    const handleSubmit: SubmitHandler<FaqsFormValues> = async (data) => {
        setIsSubmitting(true);
        try {
            await onSubmit(data);
            form.reset();
        } catch (error: any) {
            toast({ title: "Error", description: error.message || "Something went wrong", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {/* Category */}
                <FormField control={form.control} name="categories" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl><Input placeholder="Enter category" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* Details: Title */}
                <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Question</FormLabel>
                        <FormControl>
                            <div className="border-gray-300 shadow-md rounded-md">
                                <TiptapEditorNoSSR
                                    value={field.value || ""}
                                    onChange={(value) => {
                                        field.onChange(value);
                                        form.setValue("title", value, {
                                            shouldDirty: true,
                                            shouldTouch: true,
                                            shouldValidate: true,
                                        });
                                    }}
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />


                {/* Details: Answer */}
                <FormField control={form.control} name="answer" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Answer / Details</FormLabel>
                        <FormControl>
                            <div className="border border-gray-300 shadow-md rounded-md max-h-72 overflow-y-auto">
                                <TiptapEditorNoSSR
                                    value={field.value || ""}
                                    onChange={(value) => {
                                        field.onChange(value);
                                        form.setValue("answer", value, {
                                            shouldDirty: true,
                                            shouldTouch: true,
                                            shouldValidate: true,
                                        });
                                    }}
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600" disabled={isSubmitting || isUploading}>
                        {isSubmitting ? "Saving..." : "Save"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

