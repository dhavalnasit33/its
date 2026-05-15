"use client";

import {  useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UploadCloud } from "lucide-react";

const CLOUDINARY_CLOUD_NAME = "dctvxbvuz";
const CLOUDINARY_UPLOAD_PRESET = "ITS_ADMIN";

const openingPositionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  image: z.string().min(1, "Image is required").url("A valid image URL is required"),
  openning: z.union([z.string(), z.number()]),
  qualifications: z.string().min(2, "Qualifications must be at least 2 characters"),
  experience: z.string().min(2, "Experience must be at least 2 characters"),
});

export type OpeningPositionFormValues = z.infer<typeof openingPositionSchema>;

interface OpeningPositionFormProps {
  initialData?: OpeningPositionFormValues | null;
  onSubmit: (data: OpeningPositionFormValues) => Promise<void>;
}

export default function OpeningPositionForm({ initialData, onSubmit }: OpeningPositionFormProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OpeningPositionFormValues>({
    resolver: zodResolver(openingPositionSchema),
    defaultValues: initialData || {
      name: "",
      image: "",
      openning: "",
      qualifications: "",
      experience: "",
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.secure_url) throw new Error(data.error?.message || "Upload failed");

      form.setValue("image", data.secure_url, { shouldValidate: true });
      toast({ title: "Image Uploaded", description: "Image uploaded successfully." });
    } catch (error: any) {
      toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormSubmit: SubmitHandler<OpeningPositionFormValues> = async (data) => {
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
              <div className="flex items-center gap-4">
                <Input type="file" className="hidden" id="imageUpload" onChange={handleImageUpload} />
                <Button type="button" onClick={() => document.getElementById("imageUpload")?.click()}>
                  {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <UploadCloud className="h-4 w-4 mr-2" />}
                  Upload Image
                </Button>
                {field.value && <img src={field.value} alt="Preview" className="h-16 w-16 object-cover rounded-md border" />}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter position name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Openning */}
        <FormField
          control={form.control}
          name="openning"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Openning</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter number of openings" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Qualifications */}
        <FormField
          control={form.control}
          name="qualifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qualifications</FormLabel>
              <FormControl>
                <Input placeholder="Enter required qualifications" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Experience */}
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience</FormLabel>
              <FormControl>
                <Input placeholder="Enter required experience" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" className="bg-blue-500 text-white w-full" disabled={isSubmitting || isUploading}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
