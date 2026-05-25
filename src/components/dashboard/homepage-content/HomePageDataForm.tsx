"use client";

import { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, PlusCircle, Trash2 } from "lucide-react";
import {
    HomePageDataFormValues,
    HomePageDataSchema,
} from "@/types";
import ImageUpload from "@/components/ui/imagupload";
import CustomCKEditor from "@/components/shared/Ckeditor";

interface HomePageFormProps {
    initialData?: HomePageDataFormValues | null;
    onSubmit: (data: HomePageDataFormValues) => Promise<void>;
    onCancel?: () => void;
}

export default function HomePageDataForm({
    initialData,
    onSubmit,
    onCancel,
}: HomePageFormProps) {
    const { toast } = useToast();
    const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);

    const form = useForm<HomePageDataFormValues>({
        resolver: zodResolver(HomePageDataSchema),
        defaultValues: initialData || {
            heroSecton: { title: "", description: "",  technologySection: [] },
            reasonsToChoose: {  deatailBox: [] },
            aisection: { subtitle:"", mainTitle:"", description:"" ,deatailBox: []},
            aboutOurCompany: {
                subtitle: "",
                mainTitle: "",
                description: "",
                deatailBox: [],
                image: "",
                buttonContent: { total: "", label: "", image: "" },
            },
            overseasWebAgencies: {
                mainTitle: "",
                image: "",
                desctiption: "",
                detail: { title: "", subtitle: "" },
            },
            seo: {
                title: "",
                keyphrase: "",
                seoDescription: "",
                featureImage: "",
            },
    }
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

    const handleFormSubmit: SubmitHandler<HomePageDataFormValues> = async (data) => {
        setInternalIsSubmitting(true);
        try {
            await onSubmit(data);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setInternalIsSubmitting(false);
        }
    };

    const isSubmitting = internalIsSubmitting;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit as any)} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hero Section */}
                        <Card>
                            <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <FormField control={form.control as any} name="heroSecton.title" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Main Title</FormLabel>
                                        <FormControl>
                                                <CustomCKEditor value={field.value} onChange={field.onChange} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField
                                    control={form.control as any}
                                    name="heroSecton.description"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <CustomCKEditor value={field.value} onChange={field.onChange} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* technology points */}
                                <div className="flex justify-between items-center">
                                    <FormLabel>Technology Points</FormLabel>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            // appendTech({ title: "", description: "", image: "" })
                                            appendTech({ title: "" })
                                        }
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Point
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    {techFields.map((field, index) => (
                                        <Card
                                            key={field.id}
                                            className="p-4 relative border-dashed"
                                        >
                                            <Button type="button" variant="ghost" size="icon" 
                                            className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10" 
                                                onClick={() => removeTech(index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            <div className="flex justify-between items-center">
                                            </div>
                                            <div className="flex flex-col items-center  gap-2 pt-4">

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

                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>





                        {/*reasons to choose Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Reasons to Choose Us</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <FormLabel>Detail Boxes</FormLabel>
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => appendReasonsBox({ title: "", total: "" })}
                                    >
                                        <Plus className="h-4 w-4 mr-2" /> Add Details
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 mt-4">
                                    {reasonsBoxFields.map((item, index) => (
                                        <Card key={item.id} className="p-4 relative border-dashed">
                                            <Button 
                                                type="button" 
                                                variant="ghost" 
                                                size="icon" 
                                                className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10" 
                                                onClick={() => removeReasonsBox(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            <div className="space-y-4 pt-4">
                                                <FormField
                                                    control={form.control as any}
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
                                                        control={form.control as any}
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
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* ai service Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Ai Services</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
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
                                <FormField 
                                    control={form.control} 
                                    name="aisection.mainTitle" 
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Main Title</FormLabel>
                                            <FormControl>
                                                <CustomCKEditor value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="aisection.description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                {/* <Textarea rows={4} {...field} /> */}
                                                <CustomCKEditor
                                                    value={field.value || ""}
                                                    onChange={(data: string) => {
                                                        field.onChange(data);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <FormLabel>Ai Services Boxes</FormLabel>
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => appendServiceBox({ title: "", heading: "", description:" ",})}
                                    >
                                        <Plus className="h-4 w-4 mr-2" /> Add Ai Service
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1  lg:grid-cols-2 gap-4">
                                    {serviceBoxFields.map((item, index) => (
                                        <Card key={item.id} className="p-4 relative border-dashed">
                                            <Button 
                                                type="button" 
                                                variant="ghost" 
                                                size="icon" 
                                                className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10" 
                                                onClick={() => removeServiceBox(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            <div className="space-y-4 pt-4">
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
                                                                {/* <Textarea rows={4} {...field} /> */}
                                                                <CustomCKEditor
                                                                    value={field.value || ""}
                                                                    onChange={(data: string) => {
                                                                        field.onChange(data);
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>


                        {/* about our comapany */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About Our Company</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
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
                                <FormField 
                                    control={form.control} 
                                    name="aboutOurCompany.mainTitle" 
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Main Title</FormLabel>
                                            <FormControl>
                                                <CustomCKEditor value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )} 
                                    />
                                    <FormField
                                        control={form.control}
                                        name="aboutOurCompany.description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    {/* <Textarea rows={4} {...field} /> */}
                                                    <CustomCKEditor
                                                    value={field.value || ""}
                                                    onChange={(data: string) => {
                                                        field.onChange(data);
                                                    }}
                                                />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="aboutOurCompany.image"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Image</FormLabel>

                                                <FormControl>
                                                    <ImageUpload
                                                        value={field.value || ""}
                                                        onChange={field.onChange}
                                                        disabled={isSubmitting}
                                                        className="w-full h-48"
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                   
                                    <Card>
                                    <CardContent className="space-y-6 pt-6">
                                        <CardTitle>Button Content</CardTitle>
                                            <div className=" relative border-dashed mt-4 space-y-6">
                                                
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
                                            </div>
                                    
                                            <FormField
                                                control={form.control}
                                                name="aboutOurCompany.buttonContent.image"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Image</FormLabel>

                                                        <FormControl>
                                                            <ImageUpload
                                                                value={field.value || ""}
                                                                onChange={field.onChange}
                                                                disabled={isSubmitting}
                                                                className="w-full h-48"
                                                            />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                    </CardContent>
                                </Card>
                            </CardContent>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <FormLabel>About Detail Points</FormLabel>
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => appendAboutBox({ label: "", image: "" })}
                                    >
                                        <Plus className="h-4 w-4 mr-2" /> Add About Detail Points
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1  lg:grid-cols-2 gap-4">
                                    {aboutBoxFields.map((item, index) => (
                                        <Card key={item.id} className="p-4 relative border-dashed">
                                            <Button 
                                                type="button" 
                                                variant="ghost" 
                                                size="icon" 
                                                className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10" 
                                                onClick={() => removeAboutBox(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            <div className="space-y-4 pt-4">
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
                                                <FormField
                                                    control={form.control}
                                                    name={`aboutOurCompany.deatailBox.${index}.image`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Image</FormLabel>

                                                            <FormControl>
                                                                <ImageUpload
                                                                    value={field.value || ""}
                                                                    onChange={field.onChange}
                                                                    disabled={isSubmitting}
                                                                    className="w-full h-48"
                                                                />
                                                            </FormControl>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>


                        {/* Overseas Agencies */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Overseas Web Agencies</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField 
                                    control={form.control} 
                                    name="overseasWebAgencies.mainTitle" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Main Title</FormLabel>
                                            <FormControl>
                                                <CustomCKEditor value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} 
                                />
                                <FormField
                                    control={form.control}
                                    name="overseasWebAgencies.desctiption"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                {/* <Textarea rows={4} {...field} /> */}
                                                <CustomCKEditor
                                                    value={field.value || ""}
                                                    onChange={(data: string) => {
                                                        field.onChange(data);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                    <FormField
                                        control={form.control}
                                        name="overseasWebAgencies.image"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Image</FormLabel>

                                                <FormControl>
                                                    <ImageUpload
                                                        value={field.value || ""}
                                                        onChange={field.onChange}
                                                        disabled={isSubmitting}
                                                        className="w-full h-48"
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                   
                                    <Card>
                                    <CardContent className="space-y-6 pt-6">
                                        <CardTitle>Detail Content</CardTitle>
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
                                    </CardContent>
                                </Card>
                            </CardContent>

                        </Card>


                        {/* SEO Text Content */}
                        <Card>
                            <CardHeader><CardTitle className="text-primary">SEO Settings</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control as any}
                                    name="seo.title"
                                    render={({ field }) => (
                                        <FormItem><FormLabel>SEO Title</FormLabel><FormControl><Input placeholder="Search engine title" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control as any}
                                    name="seo.keyphrase"
                                    render={({ field }) => (
                                        <FormItem><FormLabel>Keyphrase</FormLabel><FormControl><Input placeholder="e.g. Training ITS" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control as any}
                                    name="seo.seoDescription"
                                    render={({ field }) => (
                                        <FormItem><FormLabel>Seo Description</FormLabel><FormControl>
                                            {/* <Textarea placeholder="Brief summary for search results" rows={4} {...field} /> */}
                                            <CustomCKEditor
                                                    value={field.value || ""}
                                                    onChange={(data: string) => {
                                                        field.onChange(data);
                                                    }}
                                                />
                                        </FormControl><FormMessage /></FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8 lg:col-span-1">
                        {/* Right Column: SEO Feature Image Only */}
                        <Card>
                            <CardHeader><CardTitle>SEO Media</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control as any}
                                    name="seo.featureImage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Feature Image</FormLabel>
                                            <FormControl>
                                                <ImageUpload value={field.value || ""} onChange={field.onChange} className="w-full h-48" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t pt-6 mt-8">
                    {onCancel && (
                        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
                    )}
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>
                        ) : (
                            initialData ? "Update Home Page data" : "Create Home Page data"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
