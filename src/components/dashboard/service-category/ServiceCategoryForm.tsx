"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import ImageUpload from "@/components/ui/imagupload";

import { ServiceCategoryFormValues } from "@/types";

const serviceCategorySchema = z.object({
  category: z.string().min(1, "Category name is required"),
  image: z.string().optional(),
});

interface ServiceCategoryFormProps {
  initialData?: ServiceCategoryFormValues | null;
  onSubmit: (data: ServiceCategoryFormValues) => Promise<void>;
  onCancel?: () => void;
}

export default function ServiceCategoryForm({
  initialData,
  onSubmit,
  onCancel,
}: ServiceCategoryFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ServiceCategoryFormValues>({
    resolver: zodResolver(serviceCategorySchema),
    defaultValues: initialData || {
      category: "",
      image: "",
    },
  });

  const handleFormSubmit: SubmitHandler<ServiceCategoryFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Category Name */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter service category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover / Banner Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value || ""}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Category"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
