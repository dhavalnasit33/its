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
import type { TranningContact } from "@/types";
import {
  Sparkles,
  Mail,
  MessageSquare,
  Phone,
  MapPin,
} from "lucide-react";

interface ViewTrainingContactDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedContact: TranningContact | null;
  onSuccess: () => void;
}

export default function ViewTrainingContactDialog({
  isOpen,
  onOpenChange,
  selectedContact,
  onSuccess,
}: ViewTrainingContactDialogProps) {
  const { toast } = useToast();
  const [detailStatus, setDetailStatus] = useState<"Pending" | "Reviewed" | "Contacted" | "Closed">("Pending");
  const [detailNotes, setDetailNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (selectedContact) {
      // Handle missing default fields gracefully if they don't exist yet on older docs
      setDetailStatus((selectedContact as any).status || "Pending");
      setDetailNotes((selectedContact as any).adminNotes || "");
    }
  }, [selectedContact]);

  if (!selectedContact) return null;

  const handleSaveDetails = async () => {
    setIsSaving(true);
    try {
      const res = await apiService<{ success: boolean; message?: string }>(
        `/tranning-contact/${selectedContact._id}`,
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
          description: "Training request details saved successfully.",
        });
        onSuccess();
        onOpenChange(false);
      } else {
        toast({
          title: "Error",
          description: res.message || "Failed to update details.",
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
              <DialogTitle className="text-xl font-bold tracking-tight">Training Enquiry Details</DialogTitle>
              <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-semibold w-fit">
                <Sparkles className="h-3.5 w-3.5" />
                Training
              </div>
            </div>
          </div>
          <DialogDescription className="text-xs text-muted-foreground mt-1">
            Submitted on {new Date(selectedContact.createdAt).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Primary Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 border rounded-lg space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Full Name</span>
              <div className="font-semibold text-slate-800">{selectedContact.fullname}</div>
            </div>
            <div className="p-3 bg-slate-50 border rounded-lg space-y-2">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Direct Contact</span>
              <div className="text-sm font-medium text-slate-800 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <a href={`mailto:${selectedContact.email}`} className="hover:underline text-blue-600">
                  {selectedContact.email}
                </a>
              </div>
              <div className="text-sm font-medium text-slate-800 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                <a href={`tel:${selectedContact.phone}`} className="hover:underline text-blue-600">
                  {selectedContact.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Training Specific Details */}
          <div className="p-4 border rounded-lg bg-amber-50/20 border-amber-100 space-y-3">
            <h4 className="text-xs uppercase font-bold text-amber-800 tracking-wider">Course & Spacing Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-muted-foreground block">Selected Course</span>
                <span className="font-semibold text-slate-800">{selectedContact.selectedCourse || "Not specified"}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block flex items-center gap-1">
                  <MapPin className="h-3 w-3 inline text-slate-400" />
                  Preferred Location
                </span>
                <span className="font-semibold text-slate-800">{selectedContact.location || "Not specified"}</span>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="p-4 bg-slate-50 border rounded-lg space-y-2">
            <span className="text-xs uppercase font-bold text-muted-foreground flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5" />
              Message
            </span>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {selectedContact.message || <span className="italic text-muted-foreground">No message body provided.</span>}
            </p>
          </div>

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
          >
            {isSaving ? "Saving Updates..." : "Save Response Details"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
