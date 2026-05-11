"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import BlogForm, { BlogFormValues } from "./BlogForm";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import { Blog } from "@/types";

interface EditBlogDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  blogId: string;
  initialData: Blog;  // <-- comes directly from API
  onSuccess: () => void;
}

export function EditBlogDialog({
  isOpen,
  onOpenChange,
  blogId,
  initialData,
  onSuccess,
}: EditBlogDialogProps) {
  const { toast } = useToast();

  // ✅ Transform Blog -> BlogFormValues
  const formData: BlogFormValues = {
    categories: initialData.categories,      // matches Blog schema
    subCategories: initialData.subCategories || "",
     slug: initialData?.slug || "",
    image: initialData.image,
    details: {
      title: initialData.details.title,
      description: initialData.details.description,
      author: initialData.details.author,
      answerOrDetails: initialData.details.answerOrDetails,
    },
    seo_title: initialData.seo_title || "",
    meta_description: initialData.meta_description || "",
    seo_keyphrase: initialData.seo_keyphrase || "",
    cover_image: initialData.cover_image || "",

  };

  const handleEdit = async (data: BlogFormValues): Promise<void> => {
    try {
      // ✅ Transform BlogFormValues -> API body
      const apiData = {
        categories: data.categories,
        subCategories: data.subCategories,
        image: data.image,
        slug: data.slug,
        details: data.details,
      };

      const res = await apiService<{ success: boolean; message: string }>(
        `/blogs/${blogId}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.success) {
        toast({ title: "Success", description: res.message || "Blog updated successfully" });
        onSuccess();
        onOpenChange(false);
      } else {
        toast({ 
          title: "Error",
          description: res.message || "Failed to update blog",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh]  md:max-w-2xl lg:max-w-5xl xl:max-w-4xl  overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
          <DialogDescription>Update the blog details below.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <BlogForm onSubmit={handleEdit} initialData={formData} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
