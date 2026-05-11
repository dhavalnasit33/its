
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

  const CLOUDINARY_CLOUD_NAME = "dctvxbvuz";
  const CLOUDINARY_UPLOAD_PRESET = "ITS_ADMIN";

  export default function HomeChooseItsForm({ initialData, onSubmit }: HomeChooseItsFormProps) {
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<HomeChooseItsFormValues>({
      resolver: zodResolver(homeChooseItsSchema),
      defaultValues: {
        title: initialData?.title || "",
        description: initialData?.description || "",
        image: initialData?.image || "",
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
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );
        const data = await response.json();
        if (data.secure_url) {
          form.setValue("image", data.secure_url, { shouldValidate: true });
          toast({ title: "Image Uploaded", description: "Image uploaded successfully." });
        } else throw new Error(data.error?.message || "Upload failed");
      } catch (error: any) {
        toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
      } finally {
        setIsUploading(false);
        if (imageInputRef.current) imageInputRef.current.value = "";
      }
    };

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
              <FormControl><Textarea placeholder="Enter description" {...field} /></FormControl>
              <FormMessage className="text-red-600 text-sm mt-1" />
            </FormItem>
          )} />


          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={imageInputRef}
                    onChange={handleImageUpload}
                    disabled={isUploading || isSubmitting}
                  />
                  <Button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    disabled={isUploading || isSubmitting}
                    className="flex items-center px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 
                      hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 
                      disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isUploading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin text-blue-500" />
                    ) : (
                      <UploadCloud className="mr-2 h-4 w-4 text-gray-700" />
                    )}
                    Upload Image
                  </Button>

                  {field.value && (
                    <img
                      src={field.value}
                      alt="Preview"
                      className="h-16 w-16 rounded-md object-cover border"
                    />
                  )}
                </div>

                {/* This will now show if image is missing */}
                <FormMessage className="text-red-600 text-sm mt-1" />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || isUploading}
              className={`px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors`}
            >
              {isSubmitting || isUploading ? "Saving..." : "Save"}
            </Button>

          </div>
        </form>
      </Form>
    );
  }
