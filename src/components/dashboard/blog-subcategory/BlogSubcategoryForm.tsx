"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import apiService from "@/lib/apiService";

const subcategorySchema = z.object({
  subcategory: z.string().min(1, "Subcategory name is required"),
  category: z.string().min(1, "Please select a parent category"),
});

export type BlogSubcategoryFormValues = z.infer<typeof subcategorySchema>;

interface Category {
  _id: string;
  category: string;
}

interface SubcategoryFormProps {
  initialData?: BlogSubcategoryFormValues | null;
  onSubmit: (data: BlogSubcategoryFormValues) => Promise<void>;
  onCancel?: () => void;
}

export default function BlogSubcategoryForm({ initialData, onSubmit, onCancel }: SubcategoryFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const form = useForm<BlogSubcategoryFormValues>({
    resolver: zodResolver(subcategorySchema),
    defaultValues: initialData || {
      subcategory: "",
      category: "",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = await apiService<{
          success: boolean;
          data: Category[];
        }>("/Blog-category?limit=999&page=1", { method: "GET" });

        if (res.success) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
        toast({
          title: "Warning",
          description: "Could not load categories. Please try refreshing.",
          variant: "destructive",
        });
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, [toast]);

  const handleFormSubmit: SubmitHandler<BlogSubcategoryFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Something went wrong", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Subcategory Name */}
        <FormField
          control={form.control}
          name="subcategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subcategory Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter blog subcategory name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Parent Category Selector */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Category</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={loadingCategories}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={loadingCategories ? "Loading categories..." : "Select parent category"} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.category} 
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        No parent categories found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

     

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
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
              "Save Subcategory"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}