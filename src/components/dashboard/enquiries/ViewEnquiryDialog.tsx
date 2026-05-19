"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import { API_BASE_URL } from "@/config";
import type { Enquiry } from "@/types";
import {
  GraduationCap,
  Sparkles,
  Mail,
  Briefcase,
  MessageSquare,
  FileText,
  Eye,
  Download,
  Phone,
} from "lucide-react";

interface ViewEnquiryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedEnquiry: Enquiry | null;
  onSuccess: () => void;
}

export default function ViewEnquiryDialog({
  isOpen,
  onOpenChange,
  selectedEnquiry,
  onSuccess,
}: ViewEnquiryDialogProps) {
  const { toast } = useToast();
  const [detailStatus, setDetailStatus] = useState<"Pending" | "Reviewed" | "Contacted" | "Closed">("Pending");
  const [detailNotes, setDetailNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (selectedEnquiry) {
      setDetailStatus(selectedEnquiry.status);
      setDetailNotes(selectedEnquiry.adminNotes || "");
    }
  }, [selectedEnquiry]);

  if (!selectedEnquiry) return null;

  // Type Badge Helper
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Career":
        return (
          <div className="flex items-center gap-1.5 text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full text-xs font-semibold w-fit">
            <GraduationCap className="h-3.5 w-3.5" />
            Career
          </div>
        );
      case "Training":
        return (
          <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-semibold w-fit">
            <Sparkles className="h-3.5 w-3.5" />
            Training
          </div>
        );
      case "Contact":
        return (
          <div className="flex items-center gap-1.5 text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full text-xs font-semibold w-fit">
            <Mail className="h-3.5 w-3.5" />
            Contact
          </div>
        );
      case "Hire":
        return (
          <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-xs font-semibold w-fit">
            <Briefcase className="h-3.5 w-3.5" />
            Hire
          </div>
        );
      case "FooterForm":
        return (
          <div className="flex items-center gap-1.5 text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full text-xs font-semibold w-fit">
            <Mail className="h-3.5 w-3.5" />
            Footer Form
          </div>
        );
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  // Safe file path building helper
  const getFileDownloadUrl = (fileUrl: string) => {
    const fileBaseUrl = API_BASE_URL.replace("/api", "");
    const normalizedPath = fileUrl.replace(/\\/g, "/");
    return `${fileBaseUrl}/${normalizedPath}`;
  };

  // Force actual direct file download by fetching it as a blob
  const handleDownloadFile = async (fileUrl: string) => {
    if (!fileUrl) return;
    try {
      const targetUrl = getFileDownloadUrl(fileUrl);
      const res = await fetch(targetUrl);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const tempLink = document.createElement("a");
      tempLink.href = blobUrl;
      const fileName = fileUrl.split(/[\/\\]/).pop() || "attachment";
      tempLink.setAttribute("download", fileName);
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Direct download failed, falling back to open in tab:", err);
      window.open(getFileDownloadUrl(fileUrl), "_blank");
    }
  };

  const handleSaveDetails = async () => {
    setIsSaving(true);
    try {
      const res = await apiService<{ success: boolean; message?: string }>(
        `/enquiries/${selectedEnquiry._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: detailStatus,
            adminNotes: detailNotes,
          }),
        }
      );
      if (res.success) {
        toast({
          title: "Status Updated",
          description: "Enquiry response details saved successfully.",
        });
        onSuccess();
        onOpenChange(false);
      } else {
        toast({
          title: "Error",
          description: res.message || "Failed to update enquiry details.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white rounded-xl shadow-lg border p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-xl font-bold tracking-tight">Request Details</DialogTitle>
              {getTypeBadge(selectedEnquiry.type)}
            </div>
          </div>
          <DialogDescription className="text-xs text-muted-foreground mt-1">
            Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Primary Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 border rounded-lg space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Applicant Name</span>
              <div className="font-semibold text-slate-800">{selectedEnquiry.name}</div>
              {selectedEnquiry.firstname && selectedEnquiry.lastname && (
                <div className="text-xs text-muted-foreground">
                  ({selectedEnquiry.firstname} {selectedEnquiry.lastname})
                </div>
              )}
            </div>
            <div className="p-3 bg-slate-50 border rounded-lg space-y-2">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Direct Contact</span>
              <div className="text-sm font-medium text-slate-800 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <a href={`mailto:${selectedEnquiry.email}`} className="hover:underline text-blue-600">
                  {selectedEnquiry.email}
                </a>
              </div>
              <div className="text-sm font-medium text-slate-800 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                <a href={`tel:${selectedEnquiry.phone}`} className="hover:underline text-blue-600">
                  {selectedEnquiry.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Dynamic Sections Based on Enquiry Type */}
          {selectedEnquiry.type === "Career" && (
            <div className="p-4 border rounded-lg bg-indigo-50/20 border-indigo-100 space-y-3">
              <h4 className="text-xs uppercase font-bold text-indigo-800 tracking-wider">Career Specific Details</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-xs text-muted-foreground block">Position Applied For</span>
                  <span className="font-semibold text-slate-800">
                    {selectedEnquiry.positionApplied?.name || "General / Open Role"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Qualifications</span>
                  <span className="font-semibold text-slate-800">{selectedEnquiry.graduation || "Not provided"}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Experience</span>
                  <span className="font-semibold text-slate-800">{selectedEnquiry.experience || "Not provided"}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Current CTC</span>
                  <span className="font-semibold text-slate-800">{selectedEnquiry.currentCTC || "Not provided"}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Notice Period</span>
                  <span className="font-semibold text-slate-800">{selectedEnquiry.noticePeriod || "Not provided"}</span>
                </div>
              </div>
            </div>
          )}

          {selectedEnquiry.type === "Training" && (
            <div className="p-4 border rounded-lg bg-amber-50/20 border-amber-100 space-y-3">
              <h4 className="text-xs uppercase font-bold text-amber-800 tracking-wider">Training / Course Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-muted-foreground block">Selected Course</span>
                  <span className="font-semibold text-slate-800">{selectedEnquiry.selectedCourse || "Not specified"}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Preferred Location</span>
                  <span className="font-semibold text-slate-800">{selectedEnquiry.location || "Not specified"}</span>
                </div>
              </div>
            </div>
          )}

          {(selectedEnquiry.type === "Contact" ||
            selectedEnquiry.type === "Hire" ||
            selectedEnquiry.type === "FooterForm") && (
            <div className="p-4 border rounded-lg bg-emerald-50/20 border-emerald-100 space-y-3">
              <h4 className="text-xs uppercase font-bold text-emerald-800 tracking-wider">Business / Inquiry Details</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {selectedEnquiry.subject && (
                  <div className="col-span-2">
                    <span className="text-xs text-muted-foreground block">Subject / Service Requested</span>
                    <span className="font-semibold text-slate-800">{selectedEnquiry.subject}</span>
                  </div>
                )}
                {selectedEnquiry.budget && (
                  <div>
                    <span className="text-xs text-muted-foreground block">Estimated Budget</span>
                    <span className="font-semibold text-slate-800">{selectedEnquiry.budget}</span>
                  </div>
                )}
                {selectedEnquiry.recruitment && (
                  <div>
                    <span className="text-xs text-muted-foreground block">Recruitment Type</span>
                    <span className="font-semibold text-slate-800">{selectedEnquiry.recruitment}</span>
                  </div>
                )}
                {selectedEnquiry.source && (
                  <div>
                    <span className="text-xs text-muted-foreground block">Origin Source</span>
                    <span className="font-semibold text-slate-800 capitalize">
                      {selectedEnquiry.source.replace("_", " ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Message Content */}
          <div className="p-4 bg-slate-50 border rounded-lg space-y-2">
            <span className="text-xs uppercase font-bold text-muted-foreground flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5" />
              User Submission Message
            </span>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {selectedEnquiry.message || <span className="italic text-muted-foreground">No message body provided.</span>}
            </p>
          </div>

          {/* Secure File Download */}
          {selectedEnquiry.fileUrl && (
            <div className="flex items-center justify-between p-3 border border-dashed rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Attached Document / Resume</span>
                  <span className="text-xs text-muted-foreground">Submitted by the applicant</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(getFileDownloadUrl(selectedEnquiry.fileUrl || ""))}
                  className="inline-flex items-center justify-center h-9 px-4 rounded-md text-xs font-semibold text-indigo-700 border border-indigo-200 hover:bg-indigo-50 shadow-sm"
                >
                  <Eye className="h-3.5 w-3.5 mr-1.5" />
                  View File
                </Button>
                <Button
                  type="button"
                  onClick={() => handleDownloadFile(selectedEnquiry.fileUrl || "")}
                  className="inline-flex items-center justify-center h-9 px-4 rounded-md text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow transition-colors"
                >
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Download File
                </Button>
              </div>
            </div>
          )}

          <hr className="my-6 border-dashed" />

          {/* Administrative Actions & Notes Area */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Admin Response Action</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <span className="text-sm font-medium text-slate-700">Update Enquiry Status</span>
              <div className="md:col-span-2">
                <Select value={detailStatus} onValueChange={(val: any) => setDetailStatus(val)}>
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Set status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Reviewed">Reviewed</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium text-slate-700 block">Internal Admin Notes</span>
              <Textarea
                placeholder="Leave administrative response logs, follow-up remarks, or next-step logs here..."
                rows={4}
                value={detailNotes}
                onChange={(e) => setDetailNotes(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="mt-8 border-t pt-4 flex gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSaveDetails}
            disabled={isSaving}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow"
          >
            {isSaving ? "Saving Updates..." : "Save Response Details"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
