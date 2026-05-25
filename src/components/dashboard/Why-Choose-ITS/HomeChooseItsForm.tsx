
'use client';

import { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, Loader2 } from "lucide-react";
import ImageUpload from "@/components/ui/imagupload";
import CustomCKEditor from "@/components/shared/Ckeditor";


export type HomeChooseItsFormValues = z.infer<typeof homeChooseItsSchema>;

const homeChooseItsSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  image: z.string().url("Image required"), // required now
});

interface HomeChooseItsFormProps {
  initialData?: HomeChooseItsFormValues | null;
  onSubmit: (data: HomeChooseItsFormValues) => Promise<void>; // must be provided by parent
  isSubmitting?: boolean;
  onCancel?: () => void;
}

export default function HomeChooseItsForm({ initialData, onSubmit, onCancel }: HomeChooseItsFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const form = useForm<HomeChooseItsFormValues>({
    resolver: zodResolver(homeChooseItsSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      image: initialData?.image || "",
    },
  });



  const handleSubmit: SubmitHandler<HomeChooseItsFormValues> = async (data) => {
    if (!onSubmit) {
      toast({ title: "Error", description: "onSubmit function is missing.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(data); // delegate submission to parent
      form.reset();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl><Input placeholder="Enter title" {...field} /></FormControl>
            <FormMessage className="text-red-600 text-sm mt-1" />
          </FormItem>
        )} />

        <FormField control={form.control} name="description" render={({ field }) => (
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
            <FormMessage className="text-red-600 text-sm mt-1" />
          </FormItem>
        )} />


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
                  className="space-y-3 gap-2"
                />
              </FormControl>
              <FormMessage className="text-red-600 text-sm mt-1" />
            </FormItem>
          )}
        />


        <div className="flex justify-end space-x-3 pt-4">
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
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>


      </form>
    </Form>
  );
}
