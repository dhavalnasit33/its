'use client';

import { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, Loader2, PlusCircle, Trash } from "lucide-react";
import ImageUpload from "@/components/ui/imagupload";
import CustomCKEditor from "@/components/shared/Ckeditor";



export const engagementModelSchema = z.object({
  modelTitle: z.string().min(2, "Title must be at least 2 characters"),
  modelDescription: z.string().min(5, "Description must be at least 5 characters"),
  modelImage: z.string().url("Image required"), // required
  keyPoints: z.array(z.string().nonempty("Key point cannot be empty")).min(1, "At least one key point required"),
  supportModel: z.string().min(1, "Support model is required"), // required
});

export type EngagementModelFormValues = z.infer<typeof engagementModelSchema>;

interface EngagementModelFormProps {
  initialData?: EngagementModelFormValues | null;
  onSubmit: (data: EngagementModelFormValues) => Promise<void>;
  onCancel?: () => void;
}


export default function EngagementModelForm({
  initialData,
  onSubmit,
  onCancel,
}: EngagementModelFormProps) {

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const form = useForm<EngagementModelFormValues>({
    resolver: zodResolver(engagementModelSchema),
    defaultValues: {
      modelTitle: initialData?.modelTitle || "",
      modelDescription: initialData?.modelDescription || "",
      modelImage: initialData?.modelImage || "",
      keyPoints: initialData?.keyPoints || [""],
      supportModel: initialData?.supportModel || "24x7 chat support",
    },
  });



  const handleSubmit: SubmitHandler<EngagementModelFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Form data before submission:", data);
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

        {/* Title */}
        <FormField
          control={form.control}
          name="modelTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter Title" {...field} />
              </FormControl>
              <FormMessage className="text-red-600 text-sm mt-1" />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="modelDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                {/* <Textarea placeholder="Enter description" {...field} /> */}
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

        {/* Key Points */}
        <FormField
          control={form.control}
          name="keyPoints"
          render={({ field, formState }) => (
            <FormItem>
              <div className="flex items-center justify-between gap-3">

                <FormLabel>Key Points</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => field.onChange([...field.value, ""])}
                  disabled={isSubmitting}
                // className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Key Point
                </Button>

              </div>

              {field.value.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2 mb-2">
                  <FormControl className="flex-1">
                    <div className="flex flex-col">
                      <Input
                        placeholder={`Key Point ${idx + 1}`}
                        value={point}
                        onChange={(e) => {
                          const newPoints = [...field.value];
                          newPoints[idx] = e.target.value;
                          field.onChange(newPoints);
                        }}
                      />
                      {formState.errors.keyPoints?.[idx] && (
                        <p className="text-red-600 text-sm mt-1">
                          {formState.errors.keyPoints[idx]?.message as string}
                        </p>
                      )}
                    </div>
                  </FormControl>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newPoints = field.value.filter((_, i) => i !== idx);
                      field.onChange(newPoints);
                    }}
                    disabled={isSubmitting}
                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                  // className="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors self-start"
                  >
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}



              {/* Array-level error: at least one key point */}
              {formState.errors.keyPoints?.message && (
                <p className="text-red-600 text-sm mt-1">
                  {formState.errors.keyPoints.message as string}
                </p>
              )}
            </FormItem>
          )}
        />

        {/* Support Model */}
        <FormField
          control={form.control}
          name="supportModel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Support Model</FormLabel>
              <FormControl>
                <Input placeholder="Support Model" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <FormField
          control={form.control}
          name="modelImage"
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

        {/* Submit Button */}
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
          // className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>


      </form>
    </Form>
  );
}
