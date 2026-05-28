// "use client";

// import { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
// import { useToast } from "@/hooks/use-toast";
// import { Loader2 } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import ImageUpload from "@/components/ui/imagupload";

// const categorySchema = z.object({
//   category: z.string().min(1, "Category is required"),
  // moduleType: z.enum(["services", "blogs", "portfolio", "faqs", "hire"], {
  //   message: "Module type is required",
  // }),
//   image: z.string().optional(),
// });

// export type categorycreateFormValues = z.infer<typeof categorySchema>;

// interface categoryManagerFormprops {
//   initialData?: categorycreateFormValues | null;
//   onSubmit: (data: categorycreateFormValues) => Promise<void>;
//   onCancel?: () => void;
// }

// export default function CategoryFrom({ initialData, onSubmit, onCancel }: categoryManagerFormprops) {
//   const { toast } = useToast();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const form = useForm<categorycreateFormValues>({
//     resolver: zodResolver(categorySchema),
//     defaultValues: initialData || {
//       category: "",
//       moduleType: "services",
//       image: "",
//     },
//   });

//   const handleFormSubmit: SubmitHandler<categorycreateFormValues> = async (data) => {
//     setIsSubmitting(true);
//     try {
//       await onSubmit(data);
//     } catch (error: any) {
//       toast({ title: "Error", description: error.message, variant: "destructive" });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
//         {/* Category Name */}
//         <FormField
//           control={form.control}
//           name="category"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Category Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter category name" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Module Assignment */}
//         <FormField
//           control={form.control}
//           name="moduleType"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Module Assignment</FormLabel>
//               <FormControl>
//                 <Select
//                   value={field.value}
//                   onValueChange={field.onChange}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select module assignment" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="services">Services</SelectItem>
//                     <SelectItem value="blogs">Blogs</SelectItem>
//                     <SelectItem value="portfolio">Creative Portfolio</SelectItem>
//                     <SelectItem value="faqs">FAQs</SelectItem>
//                     <SelectItem value="hire">Hire Page</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Category Cover Image */}
//         <FormField
//           control={form.control}
//           name="image"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Cover/Banner Image</FormLabel>
//               <FormControl>
//                 <ImageUpload
//                   value={field.value || ""}
//                   onChange={field.onChange}
//                   disabled={isSubmitting}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Actions */}
//         <div className="flex justify-end gap-3 pt-4 border-t">
//           {onCancel && (
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onCancel}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </Button>
//           )}
//           <Button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               "Save Category"
//             )}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }


"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/ui/imagupload";

const categorySchema = z.object({
  category: z.string().min(1, "Category is required"),

  moduleType: z
    .enum(["services", "blogs", "portfolio", "faqs", "hire"],{
      message: "Module type is required",
    })
    .optional(),

  image: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

interface CommonCategoryFormProps {
  initialData?: CategoryFormValues | null;

  onSubmit: (data: CategoryFormValues) => Promise<void>;

  onCancel?: () => void;

 showModuleType?: boolean;
}

export default function CategoryFrom({
  initialData,
  onSubmit,
  onCancel,
  showModuleType = true,
}: CommonCategoryFormProps) {

  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),

    defaultValues: initialData || {
      category: "",
      moduleType: "services",
      image: "",
    },
  });

  const handleFormSubmit: SubmitHandler<CategoryFormValues> = async (
    data
  ) => {
    setIsSubmitting(true);

    try {
      await onSubmit(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >

        {/* Category */}

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>

              <FormControl>
                <Input
                  placeholder="Enter category name"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Module Type */}
        {showModuleType && (
          <FormField
            control={form.control}
            name="moduleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Module Assignment</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select module assignment" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="blogs">Blogs</SelectItem>
                      <SelectItem value="portfolio">Creative Portfolio</SelectItem>
                      <SelectItem value="faqs">FAQs</SelectItem>
                      <SelectItem value="hire">Hire Page</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Image */}

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>

              <FormLabel>Category Image</FormLabel>

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

        {/* Buttons */}

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
              "Save Category"
            )}

          </Button>

        </div>

      </form>
    </Form>
  );
}
