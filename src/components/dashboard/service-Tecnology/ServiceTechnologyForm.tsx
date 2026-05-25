"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UploadCloud } from "lucide-react";
import apiService from "@/lib/apiService";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ui/imagupload";
import { Select, SelectContent, SelectItem , SelectTrigger, SelectValue,} from "@/components/ui/select";

const CLOUDINARY_CLOUD_NAME = "dctvxbvuz";
const CLOUDINARY_UPLOAD_PRESET = "ITS_ADMIN";

const serviceTechnologySchema = z.object({
    image: z.string().min(1, "Image is required"),
    label: z.string().min(1, "Label is required"),
    serviceId: z.string().min(1, "Service is required"),
});

export type ServiceTechnologyFormValues = z.infer<typeof serviceTechnologySchema>;

interface ServiceTechnologyFormProps {
    initialData?: ServiceTechnologyFormValues | null;
    onSubmit: (data: ServiceTechnologyFormValues) => Promise<void>;
    onCancel?: () => void;
}

interface ServiceOption {
    _id: string;
    mainTitle: string;
    category: string;
    subCategory: string;
}

export function ServiceTechnologyForm({ initialData, onSubmit, onCancel }: ServiceTechnologyFormProps) {
    const { toast } = useToast();
    const router = useRouter();

    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [services, setServices] = useState<ServiceOption[]>([]);
    const form = useForm<ServiceTechnologyFormValues>({
        resolver: zodResolver(serviceTechnologySchema),
        defaultValues: initialData || {
            image: "",
            label: "",
            serviceId: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset(initialData);
        }
    }, [initialData, form]);

    useEffect(() => {
        (async () => {
            try {
                const res = await apiService<{ success: boolean; data: ServiceOption[] }>("/service/admin-id", {
                    method: "GET",
                });
                if (res.success) setServices(res.data);
            } catch (err) {
                console.error(err);
                toast({ title: "Error", description: "Failed to load services", variant: "destructive" });
            }
        })();
    }, [toast]);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (!data.secure_url) throw new Error(data.error?.message || "Upload failed");

            form.setValue("image", data.secure_url, { shouldValidate: true });
            toast({ title: "Image Uploaded", description: "Image uploaded successfully." });
        } catch (error: any) {
            toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
        } finally {
            setIsUploading(false);
        }
    };

    const handleFormSubmit: SubmitHandler<ServiceTechnologyFormValues> = async (data) => {
        setIsSubmitting(true);
        try {
            await onSubmit(data);
            form.reset();
        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card>
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    {/* <div className="flex items-center gap-4">
                                        <Input type="file" className="hidden" id="imageUpload" onChange={handleImageUpload} />
                                        <Button type="button" onClick={() => document.getElementById("imageUpload")?.click()}>
                                            {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <UploadCloud className="h-4 w-4 mr-2" />}
                                            Upload Image
                                        </Button>
                                        {field.value && <img src={field.value} alt="Preview" className="h-16 w-16 object-cover rounded-md border" />}
                                    </div> */}
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            disabled={isSubmitting}
                                            className="w-68 h-48"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter technology label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="serviceId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Service</FormLabel>
                                    {/* <FormControl>
                                        <select {...field} className="w-full border rounded-md p-2">
                                            <option value="">Select a service</option>
                                            {services.map((s) => (
                                                <option key={s._id} value={s._id}>
                                                    {s.mainTitle}
                                                </option>
                                            ))}
                                        </select>
                                    </FormControl> */}
                                           <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                disabled={isSubmitting}
                                            >
                                             <FormControl>
                                                <SelectTrigger >
                                                    <SelectValue  placeholder={
                                                        isSubmitting
                                                            ? "Loading services..."
                                                            : "Select a Services"
                                                        } 
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {services.length > 0 ? (
                                                services.map((s) => (
                                                    <SelectItem key={s._id} value={s._id}>
                                                    {s.mainTitle}
                                                    </SelectItem>
                                                ))
                                                ) : (
                                                <SelectItem value="none" disabled>
                                                    No services found
                                                </SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        /> 
                        <div className="flex justify-end gap-3 border-t pt-6 mt-8">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            {/* <Button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700" disabled={isSubmitting || isUploading}>
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </Button> */}
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {initialData ? "Updating..." : "Creating..."}
                                </>
                                ) : (
                                initialData ? "Update Technology" : "Create Technology"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
