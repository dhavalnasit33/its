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
import ImageUpload from "@/components/ui/imagupload";
import apiService from "@/lib/apiService";

const creativeWorkSchema = z.object({
  category: z.string().min(2, "Category is required"),
  title: z.string().min(2, "Title is required"),
  url: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  image: z.string().min(1, "Image is required").url("A valid image URL is required"),
});

export type CreativeWorkFormValues = z.infer<typeof creativeWorkSchema>;

interface CreativeWorkFormProps {
  initialData?: CreativeWorkFormValues | null;
  onSubmit: (data: CreativeWorkFormValues) => Promise<void>;
  onCancel?: () => void;
}

export default function CreativeWorkForm({ initialData, onSubmit, onCancel }: CreativeWorkFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  const form = useForm<CreativeWorkFormValues>({
    resolver: zodResolver(creativeWorkSchema),
    defaultValues: initialData || {
      category: "",
      title: "",
      url: "",
      image: "",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiService<{
          success: boolean;
          data: { _id: string; category: string }[];
        }>("/portfolio-category?moduleType=portfolio&limit=1000", { method: "GET" });
        if (res.success) {
          const parsed = res.data.map((cat) => ({
            id: cat._id,
            name: (cat.category || "").toString().trim().replace(/\s+/g, " "),
          }));
          setCategories(parsed);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleFormSubmit: SubmitHandler<CreativeWorkFormValues> = async (data) => {
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
        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter project title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* URL */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter project link (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
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
                {initialData ? "Updating..." : "Creating..."}
              </>
            ) : (
              initialData ? "Update Creative Work" : "Create Creative Work"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
