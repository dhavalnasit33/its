"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UploadCloud } from "lucide-react";
import ImageUpload from "@/components/ui/imagupload";
import { Textarea } from "@/components/ui/textarea";
import CustomCKEditor from "@/components/shared/Ckeditor";


const industrySchema = z.object({
  image: z.string().min(1, "Image is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "description is required").max(300, "Description cannot exceed 300 characters")
});


export type ExpertiesIndustryFormValues = z.infer<typeof industrySchema>;

interface ExpertiesIndustryFormProps {
  initialData?: ExpertiesIndustryFormValues | null;
  onSubmit: (data: ExpertiesIndustryFormValues) => Promise<void>;
  onCancel?: () => void;
}

export default function ExpertiesIndustryForm({ initialData, onSubmit, onCancel }: ExpertiesIndustryFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const form = useForm<ExpertiesIndustryFormValues>({
    resolver: zodResolver(industrySchema),
    defaultValues: initialData || { image: "", title: "", description: "" },
  });



  const handleFormSubmit: SubmitHandler<ExpertiesIndustryFormValues> = async (data) => {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
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


        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter industry title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                {/* <Textarea
                  placeholder="Enter industry description"
                  rows={3}
                  // maxLength={300}
                  {...field}
                /> */}
                 <CustomCKEditor
                    value={field.value || ""}
                    onChange={(data: string) => {
                        field.onChange(data);
                    }}
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
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
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>

      </form>
    </Form>
  );
}
