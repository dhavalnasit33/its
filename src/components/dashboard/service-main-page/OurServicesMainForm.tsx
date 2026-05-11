"use client";

import { useEffect, useState } from "react";
import {
    useForm,
    useFieldArray,
    SubmitHandler,
    FormProvider,
    useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import FormStepper from "@/components/ui/FormStepper";
import PageHeader from "@/components/shared/PageHeader";
import { TiptapEditorNoSSR } from "@/components/shared/TiptapEditor";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PlusCircle, Trash2, UploadCloud } from "lucide-react";
import apiService from "@/lib/apiService";
import { OurServicesMainFormValues, OurServicesMainSchema } from "@/types";
import InfoIcon from "@mui/icons-material/Info";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import BuildIcon from "@mui/icons-material/Build";

interface ServiceOption {
    _id: string;
    mainTitle: string;
    category: string;
    subCategory: string;
}

const CLOUDINARY_UPLOAD_PRESET = "ITS_ADMIN";
const CLOUDINARY_CLOUD_NAME = "dctvxbvuz";

const handleImageUpload = async (
    file: File,
    onUpload: (url: string) => void
) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
    );
    const data = await response.json();
    if (!data.secure_url) throw new Error("Image upload failed");
    onUpload(data.secure_url);
};

const PointsWithServiceArray = ({
    control,
    fieldName,
    services,
}: {
    control: any;
    fieldName: string;
    services: ServiceOption[];
}) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: fieldName,
    });
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState<number | null>(null);
    const { setValue } = useFormContext(); // FIXED: Get setValue from context

    return (
        <div className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
                <FormLabel>Development Points (With Service Link)</FormLabel>
                <Button
                    type="button"
                    size="sm"
                    onClick={() => append({ label: "", image: "", serviceId: "" })}
                >
                    Add Point
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {fields.map((field, pointIndex) => (
                    <div
                        key={field.id}
                        className="flex flex-col gap-2 border p-3 rounded-md bg-slate-50"
                    >
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold">Development Point {pointIndex + 1}</h4>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(pointIndex)}
                                className="h-6 w-6 bg-red-100 hover:bg-red-200"
                            >
                                <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col md:flex-row gap-2">
                                <FormField
                                    control={control}
                                    name={`${fieldName}.${pointIndex}.label`}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Label</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Technology Label" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name={`${fieldName}.${pointIndex}.serviceId`}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Link to Service Page</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a service..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {services.map((s) => (
                                                        <SelectItem key={s._id} value={s._id}>
                                                            {s.mainTitle} ({s.subCategory})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={control}
                                name={`${fieldName}.${pointIndex}.image`}
                                render={({ field: imageField }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="file"
                                                className="hidden"
                                                id={`${fieldName}-${pointIndex}`}
                                                onChange={async (e) => {
                                                    if (e.target.files?.[0]) {
                                                        setIsUploading(pointIndex);
                                                        try {
                                                            await handleImageUpload(
                                                                e.target.files[0],
                                                                (url) =>
                                                                    setValue(
                                                                        `${fieldName}.${pointIndex}.image`,
                                                                        url,
                                                                        { shouldValidate: true }
                                                                    )
                                                            );
                                                            toast({
                                                                title: "Success",
                                                                description: "Point image uploaded.",
                                                            });
                                                        } catch (error: any) {
                                                            toast({
                                                                title: "Error",
                                                                description: error.message,
                                                                variant: "destructive",
                                                            });
                                                        } finally {
                                                            setIsUploading(null);
                                                        }
                                                    }
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="outline"
                                                className="w-full"
                                                onClick={() =>
                                                    document
                                                        .getElementById(`${fieldName}-${pointIndex}`)
                                                        ?.click()
                                                }
                                                disabled={isUploading === pointIndex}
                                            >
                                                {isUploading === pointIndex ? (
                                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                ) : (
                                                    <UploadCloud className="h-4 w-4 mr-2" />
                                                )}
                                                Upload Icon
                                            </Button>
                                            {imageField.value && (
                                                <img
                                                    src={imageField.value}
                                                    alt="preview"
                                                    className="h-10 w-10 object-cover rounded-md"
                                                />
                                            )}
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SimplePointsArray = ({
    control,
    fieldName,
}: {
    control: any;
    fieldName: string;
}) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: fieldName,
    });
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState<number | null>(null);
    const { setValue } = useFormContext(); // FIXED: Get setValue from context

    return (
        <div className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
                <FormLabel>Technology Points (No Link)</FormLabel>
                <Button
                    type="button"
                    size="sm"
                    onClick={() => append({ label: "", image: "" })}
                >
                    Add Point
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {fields.map((field, pointIndex) => (
                    <div
                        key={field.id}
                        className="flex flex-col gap-2 border p-3 rounded-md bg-slate-50"
                    >
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold">Technology Point {pointIndex + 1}</h4>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(pointIndex)}
                                className="h-6 w-6 bg-red-100 hover:bg-red-200"
                            >
                                <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col md:flex-row gap-2">
                                <FormField
                                    control={control}
                                    name={`${fieldName}.${pointIndex}.label`}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Label</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Technology Label" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={control}
                                name={`${fieldName}.${pointIndex}.image`}
                                render={({ field: imageField }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="file"
                                                className="hidden"
                                                id={`${fieldName}-${pointIndex}`}
                                                onChange={async (e) => {
                                                    if (e.target.files?.[0]) {
                                                        setIsUploading(pointIndex);
                                                        try {
                                                            await handleImageUpload(
                                                                e.target.files[0],
                                                                (url) =>
                                                                    setValue(
                                                                        `${fieldName}.${pointIndex}.image`,
                                                                        url,
                                                                        { shouldValidate: true }
                                                                    )
                                                            );
                                                            toast({
                                                                title: "Success",
                                                                description: "Point image uploaded.",
                                                            });
                                                        } catch (error: any) {
                                                            toast({
                                                                title: "Error",
                                                                description: error.message,
                                                                variant: "destructive",
                                                            });
                                                        } finally {
                                                            setIsUploading(null);
                                                        }
                                                    }
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="outline"
                                                className="w-full"
                                                onClick={() =>
                                                    document
                                                        .getElementById(`${fieldName}-${pointIndex}`)
                                                        ?.click()
                                                }
                                                disabled={isUploading === pointIndex}
                                            >
                                                {isUploading === pointIndex ? (
                                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                ) : (
                                                    <UploadCloud className="h-4 w-4 mr-2" />
                                                )}
                                                Upload Icon
                                            </Button>
                                            {imageField.value && (
                                                <img
                                                    src={imageField.value}
                                                    alt="preview"
                                                    className="h-10 w-10 object-cover rounded-md"
                                                />
                                            )}
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function OurServicesMainForm({ initialData, onSubmit }: any) {
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [services, setServices] = useState<ServiceOption[]>([]);
    const [isSectionUploading, setSectionUploading] = useState<string | null>(
        null
    );

    const form = useForm<OurServicesMainFormValues>({
        resolver: zodResolver(OurServicesMainSchema),
        defaultValues: initialData || {
            mainTitle: "",
            description: "",
            heroSections: [{ title: "", image: "", points: [] }],
            technologyDetails: [
                {
                    title: "",
                    description: "",
                    image: "",
                    technologyDetail: [],
                    developmentDetail: [],
                },
            ],
        },
    });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await apiService<{
                    success: boolean;
                    data: ServiceOption[];
                }>("/service/admin-id");
                if (res.success) setServices(res.data);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch services list.",
                    variant: "destructive",
                });
            }
        };
        fetchServices();
    }, [toast]);

    const {
        fields: heroFields,
        append: appendHero,
        remove: removeHero,
    } = useFieldArray({ control: form.control, name: "heroSections" });
    const {
        fields: techDetailFields,
        append: appendTechDetail,
        remove: removeTechDetail,
    } = useFieldArray({ control: form.control, name: "technologyDetails" });

    const handleFormSubmit: SubmitHandler<OurServicesMainFormValues> = async (
        data
    ) => {
        setIsSubmitting(true);
        try {
            await onSubmit(data);
        } catch (error: any) {
            toast({
                title: "Submission Failed",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        // FIXED: Wrap everything in FormProvider
        <FormProvider {...form}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleFormSubmit)}
                    className="space-y-8"
                >
                    <FormStepper
                        currentStep={step}
                        onStepClick={setStep}
                        steps={["Basic Info", "Hero Sections", "Technology Details"]}
                        icons={{
                            "1": <InfoIcon />,
                            "2": <ViewCarouselIcon />,
                            "3": <BuildIcon />,
                        }}
                    />

                    {/* Step 1 */}
                    {step === 1 && (
                        <div className="border p-6 rounded-lg shadow-sm space-y-4">
                            <PageHeader title="Basic Information" />
                            <FormField
                                control={form.control}
                                name="mainTitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Main Title</FormLabel>
                                        <FormControl>
                                            <div className="border rounded-md">
                                                <TiptapEditorNoSSR
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <div className="border rounded-md">
                                                <TiptapEditorNoSSR
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <PageHeader title="Hero Sections" />
                                <Button
                                    type="button"
                                    onClick={() =>
                                        appendHero({ title: "", image: "", points: [] })
                                    }
                                >
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Section
                                </Button>
                            </div>
                            {heroFields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="border p-4 rounded-lg shadow-sm relative space-y-4"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-lg">
                                            Hero Section {index + 1}
                                        </h3>
                                        {heroFields.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeHero(index)}
                                            >
                                                Remove Section
                                            </Button>
                                        )}
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name={`heroSections.${index}.title`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Section Title</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`heroSections.${index}.image`}
                                            render={({ field: imageField }) => (
                                                <FormItem>
                                                    <FormLabel>Section Image</FormLabel>
                                                    <div className="flex items-center gap-4">
                                                        <Input
                                                            type="file"
                                                            className="hidden"
                                                            id={`hero-section-image-${index}`}
                                                            onChange={async (e) => {
                                                                if (e.target.files?.[0]) {
                                                                    setSectionUploading(`hero-${index}`);
                                                                    try {
                                                                        await handleImageUpload(
                                                                            e.target.files[0],
                                                                            (url) =>
                                                                                form.setValue(
                                                                                    `heroSections.${index}.image`,
                                                                                    url,
                                                                                    { shouldValidate: true }
                                                                                )
                                                                        );
                                                                        toast({ title: "Success" });
                                                                    } catch (err) {
                                                                        toast({
                                                                            title: "Error",
                                                                            variant: "destructive",
                                                                        });
                                                                    } finally {
                                                                        setSectionUploading(null);
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                        <Button
                                                            type="button"
                                                            onClick={() =>
                                                                document
                                                                    .getElementById(`hero-section-image-${index}`)
                                                                    ?.click()
                                                            }
                                                            disabled={isSectionUploading === `hero-${index}`}
                                                        >
                                                            {isSectionUploading === `hero-${index}` ? (
                                                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                            ) : (
                                                                <UploadCloud className="h-4 w-4 mr-2" />
                                                            )}{" "}
                                                            Upload Image
                                                        </Button>
                                                        {imageField.value && (
                                                            <img
                                                                src={imageField.value}
                                                                alt="preview"
                                                                className="h-16 w-16 object-cover rounded-md"
                                                            />
                                                        )}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <PointsWithServiceArray
                                        control={form.control}
                                        fieldName={`heroSections.${index}.points`}
                                        services={services}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <PageHeader title="Technology Details" />
                                <Button
                                    type="button"
                                    onClick={() =>
                                        appendTechDetail({
                                            title: "",
                                            description: "",
                                            image: "",
                                            technologyDetail: [],
                                            developmentDetail: [],
                                        })
                                    }
                                >
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Section
                                </Button>
                            </div>
                            {techDetailFields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="border p-4 rounded-lg shadow-sm relative space-y-4"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-lg">
                                            Tech Detail Section {index + 1}
                                        </h3>
                                        {techDetailFields.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeTechDetail(index)}
                                            >
                                                Remove Section
                                            </Button>
                                        )}
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name={`technologyDetails.${index}.title`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Section Title</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`technologyDetails.${index}.image`}
                                            render={({ field: imageField }) => (
                                                <FormItem>
                                                    <FormLabel>Section Image</FormLabel>
                                                    <div className="flex items-center gap-4">
                                                        <Input
                                                            type="file"
                                                            className="hidden"
                                                            id={`tech-section-image-${index}`}
                                                            onChange={async (e) => {
                                                                if (e.target.files?.[0]) {
                                                                    setSectionUploading(`tech-${index}`);
                                                                    try {
                                                                        await handleImageUpload(
                                                                            e.target.files[0],
                                                                            (url) =>
                                                                                form.setValue(
                                                                                    `technologyDetails.${index}.image`,
                                                                                    url,
                                                                                    { shouldValidate: true }
                                                                                )
                                                                        );
                                                                        toast({ title: "Success" });
                                                                    } catch (err) {
                                                                        toast({
                                                                            title: "Error",
                                                                            variant: "destructive",
                                                                        });
                                                                    } finally {
                                                                        setSectionUploading(null);
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                        <Button
                                                            type="button"
                                                            onClick={() =>
                                                                document
                                                                    .getElementById(`tech-section-image-${index}`)
                                                                    ?.click()
                                                            }
                                                            disabled={isSectionUploading === `tech-${index}`}
                                                        >
                                                            {isSectionUploading === `tech-${index}` ? (
                                                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                            ) : (
                                                                <UploadCloud className="h-4 w-4 mr-2" />
                                                            )}{" "}
                                                            Upload Image
                                                        </Button>
                                                        {imageField.value && (
                                                            <img
                                                                src={imageField.value}
                                                                alt="preview"
                                                                className="h-16 w-16 object-cover rounded-md"
                                                            />
                                                        )}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name={`technologyDetails.${index}.description`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Section Description</FormLabel>
                                                <FormControl>
                                                    <div className="border rounded-md">
                                                        <TiptapEditorNoSSR
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <SimplePointsArray
                                        control={form.control}
                                        fieldName={`technologyDetails.${index}.technologyDetail`}
                                    />
                                    <PointsWithServiceArray
                                        control={form.control}
                                        fieldName={`technologyDetails.${index}.developmentDetail`}
                                        services={services}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between pt-4">
                        {step > 1 ? (
                            <Button type="button" variant="secondary" onClick={prevStep}>
                                Previous
                            </Button>
                        ) : (
                            <div />
                        )}
                        {step < 3 ? (
                            <Button type="button" onClick={nextStep}>
                                Next
                            </Button>
                        ) : (
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit"}
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </FormProvider>
    );
}
