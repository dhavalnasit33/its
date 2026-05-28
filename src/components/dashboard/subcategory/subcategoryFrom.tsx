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
  moduleType: z.enum(["services", "blogs", "hire"], {
    message: "Module type is required",
  }),
});

export type SubcategoryFormValues = z.infer<typeof subcategorySchema>;

interface Category {
  _id: string;
  category: string;
  moduleType?: string;
}

interface SubcategoryFormProps {
  initialData?: SubcategoryFormValues | null;
  onSubmit: (data: SubcategoryFormValues) => Promise<void>;
  onCancel?: () => void;
}

export default function SubCategoryForm({ initialData, onSubmit, onCancel }: SubcategoryFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const form = useForm<SubcategoryFormValues>({
    resolver: zodResolver(subcategorySchema),
    defaultValues: initialData || {
      subcategory: "",
      category: "",
      moduleType: "services",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = await apiService<{
          success: boolean;
          data: Category[];
        }>("/category?limit=999&page=1", { method: "GET" });

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

  const handleFormSubmit: SubmitHandler<SubcategoryFormValues> = async (data) => {
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
                <Input placeholder="Enter subcategory name" {...field} />
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
                          {cat.category} {cat.moduleType ? `(${cat.moduleType})` : ""}
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

        {/* Module Assignment */}
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
                    <SelectItem value="hire">Hire Page</SelectItem>
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


// "use client";

// import { useState, useEffect } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { Loader2 } from "lucide-react";

// import apiService from "@/lib/apiService";
// import { useToast } from "@/hooks/use-toast";

// /* =========================================================
//    TYPES
// ========================================================= */

// type FormType = "common" | "blog";

// interface Category {
//   _id: string;
//   category: string;
//   moduleType?: string;
// }

// /* =========================================================
//    DYNAMIC ZOD SCHEMA
// ========================================================= */

// const createSchema = (type: FormType) => {
//   return z.object({
//     subcategory: z
//       .string()
//       .min(1, "Subcategory name is required"),

//     category: z
//       .string()
//       .min(1, "Please select parent category"),

//     ...(type === "common" && {
//       moduleType: z.enum(["services", "blogs", "hire"], {
//         message: "Module type is required",
//       }),
//     }),
//   });
// };

// /* =========================================================
//    FORM VALUES TYPE
// ========================================================= */

// type SubcategoryFormValues = {
//   subcategory: string;
//   category: string;
//   moduleType?: "services" | "blogs" | "hire";
// };

// /* =========================================================
//    PROPS
// ========================================================= */

// interface CommonSubcategoryFormProps {
//   type: FormType;

//   initialData?: SubcategoryFormValues | null;

//   onSubmit: (
//     data: SubcategoryFormValues
//   ) => Promise<void>;

//   onCancel?: () => void;
// }

// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function SubCategoryForm({
//   type,
//   initialData,
//   onSubmit,
//   onCancel,
// }: CommonSubcategoryFormProps) {
//   const { toast } = useToast();

//   const [isSubmitting, setIsSubmitting] =
//     useState(false);

//   const [categories, setCategories] = useState<
//     Category[]
//   >([]);

//   const [loadingCategories, setLoadingCategories] =
//     useState(true);

//   /* =========================================================
//      REACT HOOK FORM
//   ========================================================= */

//   const form = useForm<SubcategoryFormValues>({
//     resolver: zodResolver(createSchema(type) as any),

//     defaultValues: initialData || {
//       subcategory: "",
//       category: "",

//       ...(type === "common" && {
//         moduleType: "services",
//       }),
//     },
//   });

//   /* =========================================================
//      FETCH CATEGORIES
//   ========================================================= */

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setLoadingCategories(true);

//         const endpoint =
//           type === "blog"
//             ? "/blog-category?limit=999&page=1"
//             : "/category?limit=999&page=1";

//         const res = await apiService<{
//           success: boolean;
//           data: Category[];
//         }>(endpoint, {
//           method: "GET",
//         });

//         if (res.success) {
//           setCategories(res.data);
//         }
//       } catch (error) {
//         console.error(error);

//         toast({
//           title: "Error",
//           description: "Failed to load categories",
//           variant: "destructive",
//         });
//       } finally {
//         setLoadingCategories(false);
//       }
//     };

//     fetchCategories();
//   }, [toast, type]);

//   /* =========================================================
//      SUBMIT HANDLER
//   ========================================================= */

//   const handleFormSubmit: SubmitHandler<
//     SubcategoryFormValues
//   > = async (data) => {
//     try {
//       setIsSubmitting(true);

//       await onSubmit(data);

//       form.reset({
//         subcategory: "",
//         category: "",

//         ...(type === "common" && {
//           moduleType: "services",
//         }),
//       });
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description:
//           error?.message || "Something went wrong",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   /* =========================================================
//      UI
//   ========================================================= */

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(handleFormSubmit)}
//         className="space-y-6"
//       >
//         {/* =====================================================
//             SUBCATEGORY NAME
//         ===================================================== */}

//         <FormField
//           control={form.control}
//           name="subcategory"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 Subcategory Name
//               </FormLabel>

//               <FormControl>
//                 <Input
//                   placeholder="Enter subcategory name"
//                   {...field}
//                 />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* =====================================================
//             CATEGORY SELECT
//         ===================================================== */}

//         <FormField
//           control={form.control}
//           name="category"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 Parent Category
//               </FormLabel>

//               <FormControl>
//                 <Select
//                   value={field.value}
//                   onValueChange={field.onChange}
//                   disabled={loadingCategories}
//                 >
//                   <SelectTrigger>
//                     <SelectValue
//                       placeholder={
//                         loadingCategories
//                           ? "Loading categories..."
//                           : "Select category"
//                       }
//                     />
//                   </SelectTrigger>

//                   <SelectContent>
//                     {categories.length > 0 ? (
//                       categories.map((cat) => (
//                         <SelectItem
//                           key={cat._id}
//                           value={cat._id}
//                         >
//                           {cat.category}

//                           {cat.moduleType
//                             ? ` (${cat.moduleType})`
//                             : ""}
//                         </SelectItem>
//                       ))
//                     ) : (
//                       <SelectItem
//                         value="no-category"
//                         disabled
//                       >
//                         No categories found
//                       </SelectItem>
//                     )}
//                   </SelectContent>
//                 </Select>
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* =====================================================
//             MODULE TYPE
//             ONLY FOR COMMON SUBCATEGORY
//         ===================================================== */}

//         {type === "common" && (
//           <FormField
//             control={form.control}
//             name="moduleType"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>
//                   Module Assignment
//                 </FormLabel>

//                 <FormControl>
//                   <Select
//                     value={field.value}
//                     onValueChange={field.onChange}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select module type" />
//                     </SelectTrigger>

//                     <SelectContent>
//                       <SelectItem value="services">
//                         Services
//                       </SelectItem>

//                       <SelectItem value="blogs">
//                         Blogs
//                       </SelectItem>

//                       <SelectItem value="hire">
//                         Hire Page
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         )}

//         {/* =====================================================
//             ACTION BUTTONS
//         ===================================================== */}

//         <div className="flex justify-end gap-3 border-t pt-4">
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

//           <Button
//             type="submit"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               "Save Subcategory"
//             )}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }