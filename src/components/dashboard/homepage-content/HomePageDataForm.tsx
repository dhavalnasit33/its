"use client";

import { useState } from "react";
import {
    useForm,
    useFieldArray,
    SubmitHandler,
    FormProvider,
    useFormContext, // <-- Import useFormContext
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HomePageDataFormValues, HomePageDataSchema } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PlusCircle, Trash2, UploadCloud } from "lucide-react";
import FormStepper from "@/components/ui/FormStepper";
import PageHeader from "@/components/shared/PageHeader";

// Icons for stepper
import HomeIcon from "@mui/icons-material/Home";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import { TiptapEditorNoSSR } from "@/components/shared/TiptapEditor";

const CLOUDINARY_CLOUD_NAME = "dctvxbvuz";
const CLOUDINARY_UPLOAD_PRESET = "ITS_ADMIN";

const handleImageUpload = async (
    file: File,
    onUpload: (url: string) => void
) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );
    const data = await response.json();
    if (!data.secure_url) throw new Error("Image upload failed");
    onUpload(data.secure_url);
};

const ImageUploadButton = ({
    fieldName,
    index,
}: {
    fieldName: string;
    index?: number;
}) => {
    const { toast } = useToast();
    // --- THIS IS THE FIX ---
    // Change useForm to useFormContext to connect to the parent form
    const { setValue, getValues } = useFormContext<HomePageDataFormValues>();
    // const { setValue, getValues } = useForm<HomePageDataFormValues>(); // This was the old, incorrect line
    // ----------------------

    const [isUploading, setIsUploading] = useState(false);
    const id = index !== undefined ? `${fieldName}-${index}` : fieldName;
    const value = getValues(fieldName as any);

    return (
        <FormItem className="w-full">
            <FormLabel>Image</FormLabel>
            <div className="flex items-center gap-4">
                <Input
                    type="file"
                    className="hidden"
                    id={id}
                    onChange={async (e) => {
                        if (e.target.files?.[0]) {
                            setIsUploading(true);
                            try {
                                await handleImageUpload(e.target.files[0], (url) =>
                                    setValue(fieldName as any, url, { shouldValidate: true })
                                );
                                toast({ title: "Success", description: "Image uploaded." });
                            } catch (error: any) {
                                toast({
                                    title: "Error",
                                    description: error.message,
                                    variant: "destructive",
                                });
                            } finally {
                                setIsUploading(false);
                            }
                        }
                    }}
                />
                <Button
                    type="button"
                    onClick={() => document.getElementById(id)?.click()}
                    disabled={isUploading}
                >
                    {isUploading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                        <UploadCloud className="h-4 w-4 mr-2" />
                    )}
                    Upload Image
                </Button>
                {value && (
                    <img
                        src={value}
                        alt="preview"
                        className="h-16 w-16 object-cover rounded-md border"
                    />
                )}
            </div>
            <FormMessage />
        </FormItem>
    );
};

export default function HomePageDataForm({ initialData, onSubmit }: any) {
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<HomePageDataFormValues>({
        resolver: zodResolver(HomePageDataSchema),
        defaultValues: initialData || {
            // heroSecton: { title: "", image: "", technologySection: [] },
             heroSecton: { title: "", description: "",  technologySection: [] },
            reasonsToChoose: {  deatailBox: [] },
            aisection: { subtitle:"", maintitle:"", description:"" ,deatailBox: []},
            aboutOurCompany: {
                subtitle: "",
                mainTitle: "",
                description: "",
                deatailBox: [],
                image: "",
                // buttonContent: { total: "", label: "", image: "" },
                buttonContent: { total: "", label: "" },
            },
            overseasWebAgencies: {
                mainTitle: "",
                image: "",
                desctiption: "",
                detail: { title: "", subtitle: "" },
            },
        },
    });

    const {
        fields: techFields,
        append: appendTech,
        remove: removeTech,
    } = useFieldArray({
        control: form.control,
        name: "heroSecton.technologySection",
    });
    const {
        fields: reasonsBoxFields,
        append: appendReasonsBox,
        remove: removeReasonsBox,
    } = useFieldArray({
        control: form.control,
        name: "reasonsToChoose.deatailBox",
    });
    const {
        fields: serviceBoxFields,
        append: appendServiceBox,
        remove: removeServiceBox,
    } = useFieldArray({
        control: form.control,
        name: "aisection.deatailBox",
    });
    const {
        fields: aboutBoxFields,
        append: appendAboutBox,
        remove: removeAboutBox,
    } = useFieldArray({
        control: form.control,
        name: "aboutOurCompany.deatailBox",
    });

    const handleFormSubmit: SubmitHandler<HomePageDataFormValues> = async (
        data
    ) => {
        console.log("FORM DATA SUBMIT:", data);
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

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <FormProvider {...form}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleFormSubmit)}
                    className="space-y-8"
                >
                    <FormStepper
                        currentStep={step}
                        onStepClick={setStep}
                        steps={[
                            "Hero Section",
                            "Reasons To Choose",
                            "About Company",
                            "Overseas Agencies",
                        ]}
                        icons={{
                            "1": <HomeIcon />,
                            "2": <ThumbUpIcon />,
                            "3": <BusinessIcon />,
                            "4": <LanguageIcon />,
                        }}
                    />

                    {/* Step 1: Hero Section */}
                    {step === 1 && (
                        <div className="border p-6 rounded-lg shadow-sm space-y-4">
                            <PageHeader title="Hero Section" />
                            <FormField control={form.control} name="heroSecton.title" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Main Title</FormLabel>
                                    <FormControl>
                                        <div className="border rounded-md">
                                            <TiptapEditorNoSSR value={field.value} onChange={field.onChange} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField
                                control={form.control}
                                name="heroSecton.description"
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

                            <div className="flex justify-between items-center mt-4 border-t pt-4">
                                <h3 className="font-semibold">Technology Points</h3>
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={() =>
                                        // appendTech({ title: "", description: "", image: "" })
                                        appendTech({ title: "" })
                                    }
                                >
                                    {" "}
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Point
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {techFields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="border p-4 rounded-md bg-slate-50 relative space-y-2"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-semibold">Technology Point {index + 1}</h4>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeTech(index)}
                                                className="absolute top-2 right-2 h-7 w-7 bg-red-100 hover:bg-red-200"
                                            >
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </Button>
                                        </div>
                                        <div className="flex flex-col items-center  gap-2">

                                            <FormField
                                                control={form.control}
                                                name={`heroSecton.technologySection.${index}.title`}
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>Title</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Reasons to Choose */}
                    {step === 2 && (
                        <>
                        <div className="border p-6 rounded-lg shadow-sm space-y-4">
                            <PageHeader title="Reasons to Choose Us" />
                            <div className="flex justify-between items-center ">
                                <h3 className="font-semibold">Detail Boxes</h3>
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={() =>
                                        // appendReasonsBox({ title: "", total: "", image: "" })
                                        appendReasonsBox({ title: "", total: "" })
                                    }
                                >
                                    {" "}
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Box
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                                {reasonsBoxFields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="border p-4 rounded-md bg-slate-50 relative space-y-2"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-semibold">Detail Box Point {index + 1}</h4>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeReasonsBox(index)}
                                                className="absolute top-2 right-2 h-7 w-7 bg-red-100 hover:bg-red-200"
                                            >
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </Button>
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name={`reasonsToChoose.deatailBox.${index}.title`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Title</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`reasonsToChoose.deatailBox.${index}.total`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Total/Number</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* <ImageUploadButton
                                            fieldName={`reasonsToChoose.deatailBox.${index}.image`}
                                        /> */}
                                    </div>
                                ))}
                            </div>
                        </div>




                    <div className="border p-6 rounded-lg shadow-sm space-y-4">
                        <PageHeader title="Ai Services" />
                         <FormField
                                control={form.control}
                                name="aisection.subtitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subtitle</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField control={form.control} name="aisection.mainTitle" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Main Title</FormLabel>
                                    <FormControl>
                                        <div className="border rounded-md">
                                            <TiptapEditorNoSSR value={field.value} onChange={field.onChange} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField
                                control={form.control}
                                name="aisection.description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea rows={4} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        <div className="flex justify-between items-center ">
                                <h3 className="font-semibold">Ai Services Boxes</h3>
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={() =>
                                        // appendReasonsBox({ title: "", total: "", image: "" })
                                        appendServiceBox({ title: "", heading: "", description:" ",})
                                    }
                                >
                                    {" "}
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Box
                                </Button>
                            </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                             {/* <FormField
                                control={form.control}
                                name="aboutOurCompany.subtitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subtitle</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> */}
                                {serviceBoxFields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="border p-4 rounded-md bg-slate-50 relative space-y-2"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-semibold">Detail Box Point {index + 1}</h4>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeServiceBox(index)}
                                                className="absolute top-2 right-2 h-7 w-7 bg-red-100 hover:bg-red-200"
                                            >
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </Button>
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name={`aisection.deatailBox.${index}.title`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Title</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`aisection.deatailBox.${index}.heading`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Heading</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                         <FormField
                                            control={form.control}
                                            name={`aisection.deatailBox.${index}.description`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea rows={4} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* <FormField
                                            control={form.control}
                                            name={`aisection.deatailBox.${index}.gradient`}
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Gradient</FormLabel>
                                                <FormControl>
                                                    <Input
                                                    placeholder="from-blue-400 to-cyan-500"
                                                    {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                        /> */}

                                    </div>
                                ))}
                            </div>
                    </div>
                    </>
                    )}





                    {/* Step 3: About Our Company */}
                    {step === 3 && (
                        <div className="border p-6 rounded-lg shadow-sm space-y-4">
                            <PageHeader title="About Our Company" />
                            <FormField
                                control={form.control}
                                name="aboutOurCompany.subtitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subtitle</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField control={form.control} name="aboutOurCompany.mainTitle" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Main Title</FormLabel>
                                    <FormControl>
                                        <div className="border rounded-md">
                                            <TiptapEditorNoSSR value={field.value} onChange={field.onChange} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField
                                control={form.control}
                                name="aboutOurCompany.description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea rows={4} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <ImageUploadButton fieldName="aboutOurCompany.image" />

                            <div className="border p-4 rounded-lg mt-4">
                                <h3 className="font-semibold mb-2">Button Content</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="aboutOurCompany.buttonContent.label"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Label</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="aboutOurCompany.buttonContent.total"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Total/Number</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <ImageUploadButton fieldName="aboutOurCompany.buttonContent.image" />
                            </div>

                            <div className="flex justify-between items-center mt-4 border-t pt-4">
                                <h3 className="font-semibold">Detail Points</h3>
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={() => appendAboutBox({ label: "", image: "" })}
                                >
                                    {" "}
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Point
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {aboutBoxFields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="border p-4 rounded-md bg-slate-50 relative space-y-2"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-semibold">Detail Point {index + 1}</h4>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeAboutBox(index)}
                                                className="absolute top-2 right-2 h-7 w-7 bg-red-100 hover:bg-red-200"
                                            >
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </Button>
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name={`aboutOurCompany.deatailBox.${index}.label`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Label</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <ImageUploadButton
                                            fieldName={`aboutOurCompany.deatailBox.${index}.image`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Overseas Web Agencies */}
                    {step === 4 && (
                        <div className="border p-6 rounded-lg shadow-sm space-y-4">
                            <PageHeader title="Overseas Web Agencies" />
                            <FormField control={form.control} name="overseasWebAgencies.mainTitle" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Main Title</FormLabel>
                                    <FormControl>
                                        <div className="border rounded-md">
                                            <TiptapEditorNoSSR value={field.value} onChange={field.onChange} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField
                                control={form.control}
                                name="overseasWebAgencies.desctiption"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea rows={4} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <ImageUploadButton fieldName="overseasWebAgencies.image" />
                            <div className="border p-4 rounded-lg mt-4">
                                <h3 className="font-semibold mb-2">Detail Content</h3>
                                <FormField
                                    control={form.control}
                                    name="overseasWebAgencies.detail.title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="overseasWebAgencies.detail.subtitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subtitle</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
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
                        {step < 4 ? (
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