"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Faqs } from "@/types";

interface ViewFaqsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  Faqs: Faqs | null;
}

export default function viewsFaqsDialog({
  isOpen,
  onOpenChange,
  Faqs,
}: ViewFaqsDialogProps) {
  if (!Faqs) return null;

  // Utility: strip HTML tags for plain fields
  const stripHtml = (input: string) => input.replace(/<[^>]+>/g, "");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-0">
        {/* Header */}
        <DialogHeader className="border-b border-gray-300 px-6 py-4 bg-gray-50">

          <DialogTitle className="text-xl font-semibold text-gray-900">
            {stripHtml(Faqs.title)}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Faqs details and content preview
          </DialogDescription>
        </DialogHeader>
        {/* Body */}
        <div className="space-y-6 px-6 py-5">
          <div className="p-3 rounded-lg border border-gray-300 bg-gray-50">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Category
            </p>
            <p className="font-medium text-gray-900">
              {stripHtml(Faqs.categories)}
            </p>
          </div>
          <div className="p-3 rounded-lg border border-gray-300 bg-gray-50">
            <p className="text-sm font-semibold text-gray-800">
              Question
            </p>
            <p className="font-medium text-gray-900">
              {stripHtml(Faqs.title)}
            </p>
            <div>
              <div className='flex items-center font-semibold gap-1'>
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <h3 className="text-sm font-semibold text-gray-800">
                  Answer
                </h3>
              </div>
              <div
                className="prose prose-sm max-w-none
             [&_pre]:bg-gray-200 [&_pre]:text-gray-600 [&_pre]:p-3
             [&_pre]:rounded-md [&_pre]:overflow-x-auto [&_pre_code]:font-mono"
                dangerouslySetInnerHTML={{ __html: Faqs.answer }}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
