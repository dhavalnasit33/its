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
import { OurServicesMain, OurServicesMainFormValues } from "@/types";
import OurServicesMainForm from "@/components/dashboard/service-main-page/OurServicesMainForm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


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

    const router = useRouter();



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
        <>
            <div className="flex justify-between items-center border-b py-4 mb-4">
                <h1 className="text-2xl font-bold">Edit service-main-page</h1>
                <Button onClick={() => router.push("/dashboard/service-main-page")}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
            </div>
            {/* <OurServicesMainForm
                onSubmit={handleUpdate}
                initialData={transformInitialDataForForm(initialData)}
            /> */}
            <OurServicesMainForm
            key={initialData?._id}
                onSubmit={handleUpdate}
                initialData={transformInitialDataForForm(initialData)}
            />
        </>
    )
}
