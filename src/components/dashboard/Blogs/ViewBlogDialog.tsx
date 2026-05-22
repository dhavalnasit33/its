"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Blog } from "@/types";

interface ViewBlogDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  blog: Blog  | null;
}

export default function ViewBlogDialog({
  isOpen,
  onOpenChange,
  blog,
}: ViewBlogDialogProps) {
  if (!blog) return null;

  // Utility: strip HTML tags for plain fields
  const stripHtml = (input: string) => {
    if (typeof input !== "string") return "";
    return input.replace(/<[^>]+>/g, "");
  };

  const getCategoryName = (cat: any) => {
    if (!cat) return "";
    if (typeof cat === "object") {
      return cat.category || "";
    }
    return String(cat);
  };

  const getSubcategoryName = (sub: any) => {
    if (!sub) return "";
    if (typeof sub === "object") {
      return sub.subcategory || "";
    }
    return String(sub);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-0">
        {/* Header */}
        <DialogHeader className="border-b border-gray-300 px-6 py-4 bg-gray-50">

          <DialogTitle className="text-xl font-semibold text-gray-900">
            {stripHtml(blog.details.title)}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Blog details and content preview
          </DialogDescription>
        </DialogHeader>

        {/* Body */}
        <div className="space-y-6 px-6 py-5">
          {/* Image */}
          {blog.image && (
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src={blog.image}
                alt={stripHtml(blog.details.title)}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Meta Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg border border-gray-300 bg-gray-50">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Category
              </p>
              <p className="font-medium text-gray-900">
                {stripHtml(getCategoryName(blog.categories))}
              </p>
            </div>
            <div className="p-3 rounded-lg border border-gray-300 bg-gray-50">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Sub Category
              </p>
              <p className="font-medium text-gray-900">
                {stripHtml(getSubcategoryName(blog.subCategories))}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className='flex items-center font-semibold gap-1 mb-2'>
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <h3 className="text-sm font-semibold text-gray-800 ">
                Description
              </h3>
            </div>
            <div
              className="prose prose-sm max-w-none text-gray-700 mb-2"
              dangerouslySetInnerHTML={{
                __html: blog.details.description,
              }}
            />
          </div>

          {/* Author */}
          <div>
            <div className='flex items-center font-semibold gap-1 mb-2'>
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <h3 className="text-sm font-semibold text-gray-800 ">
                Author
              </h3>
            </div>
            <p className="text-gray-700">
              {stripHtml(blog.details.author)}
            </p>
          </div>

          {/* Answer / Details */}
          <div>
            <div className='flex items-center font-semibold gap-1 mb-2'>
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <h3 className="text-sm font-semibold text-gray-800 ">
                Answer / Details
              </h3>
            </div>
            <div
              className="prose prose-sm max-w-none
             [&_pre]:bg-gray-200 [&_pre]:text-gray-600 [&_pre]:p-3
             [&_pre]:rounded-md [&_pre]:overflow-x-auto [&_pre_code]:font-mono"
              dangerouslySetInnerHTML={{ __html: blog.details.answerOrDetails }}
            />

          </div>
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">SEO Details</h3>
            <div className="space-y-4">
              {/* SEO Title */}
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">SEO Title</p>
                <p className="font-medium text-gray-900">{blog.seo_title || "Not set"}</p>
              </div>

              {/* Meta Description */}
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Meta Description</p>
                <p className="text-gray-700">{blog.meta_description || "Not set"}</p>
              </div>

              {/* SEO Keyphrases */}
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">SEO Keyphrases</p>
                <p className="text-gray-700">{blog.seo_keyphrase || "Not set"}</p>
              </div>

              {/* Cover Image */}
              {blog.cover_image && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Cover Image (for Social Media)</p>
                  <img
                    src={blog.cover_image}
                    alt="SEO Cover Image"
                    className="h-32 w-auto object-cover rounded-lg border shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
