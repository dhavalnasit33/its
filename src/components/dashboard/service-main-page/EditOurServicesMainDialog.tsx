"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import OurServicesMainForm from "./OurServicesMainForm";
import { OurServicesMain, OurServicesMainFormValues } from "@/types";

interface EditDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSuccess: () => void;
    initialData: OurServicesMain | null;
}

export default function EditOurServicesMainDialog({
    isOpen,
    onOpenChange,
    onSuccess,
    initialData,
}: EditDialogProps) {
    const { toast } = useToast();

    const handleUpdate = async (data: OurServicesMainFormValues) => {
        if (!initialData?._id) return;
        try {
            const res = await apiService<{ success: boolean; message: string }>(
                `/service-main/${initialData._id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (res.success) {
                toast({ title: "Success", description: res.message });
                onSuccess();
                onOpenChange(false);
            } else {
                toast({
                    title: "Error",
                    description: res.message,
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

    const transformInitialDataForForm = (
        data: OurServicesMain | null
    ): OurServicesMainFormValues | null => {
        if (!data) return null;

        const transformPointsWithService = (points: any[]) => {
            return points.map((point) => ({
                label: point.label,
                image: point.image,
                serviceId: point.serviceId?._id || "",
            }));
        };

        const transformSimplePoints = (points: any[]) => {
            return points.map((point) => ({
                label: point.label,
                image: point.image,
            }));
        };

        return {
            mainTitle: data.mainTitle,
            description: data.description,
            heroSections: data.heroSections.map((section) => ({
                ...section,
                points: transformPointsWithService(section.points),
            })),
            technologyDetails: data.technologyDetails.map((detail) => ({
                ...detail,
                technologyDetail: transformSimplePoints(detail.technologyDetail),
                developmentDetail: transformPointsWithService(detail.developmentDetail),
            })),
        };
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-6xl max-h-[95vh] w-full overflow-y-auto rounded-lg">
                <DialogHeader>
                    <DialogTitle>Edit Our Services Content</DialogTitle>
                    <DialogDescription>
                        Update the details for the main services page.
                    </DialogDescription>
                </DialogHeader>
                {initialData && (
                    <OurServicesMainForm
                        onSubmit={handleUpdate}
                        initialData={transformInitialDataForForm(initialData)}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
