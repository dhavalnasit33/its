"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Mail, Phone, MapPin, Share2, HelpCircle } from "lucide-react";
import type { WebsiteSettingsFormValues } from "@/types";
import ImageUpload from "@/components/ui/imagupload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SettingsFormProps {
  initialData?: WebsiteSettingsFormValues | null;
  onSubmit: (data: WebsiteSettingsFormValues) => Promise<void>;
  onCancel?: () => void;
}

export default function WebsiteSettingsForm({
  initialData,
  onSubmit,
  onCancel,
}: SettingsFormProps) {
  const { toast } = useToast();
  const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);

  const form = useForm<WebsiteSettingsFormValues>({
    defaultValues: {
      favicon: "",
      logo_img: "",
      address: [{ value: "" }],
      emails: [{ email: "", emailType: "contact" }],
      phone: [{ value: "" }],
      social_media: [{ socialMediaName: "", link: "", image: "" }],
    },
  });

  // Setup Field Arrays
  const {
    fields: addressFields,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({
    control: form.control,
    name: "address",
  });

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control: form.control,
    name: "emails",
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control: form.control,
    name: "phone",
  });

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control: form.control,
    name: "social_media",
  });

  // Populate values when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        favicon: initialData.favicon || "",
        logo_img: initialData.logo_img || "",
        address: initialData.address?.length ? initialData.address : [{ value: "" }],
        emails: initialData.emails?.length ? initialData.emails : [{ email: "", emailType: "contact" }],
        phone: initialData.phone?.length ? initialData.phone : [{ value: "" }],
        social_media: initialData.social_media?.length
          ? initialData.social_media
          : [{ socialMediaName: "", link: "", image: "", }],
      });
    } else {
      form.reset({
        favicon: "",
        logo_img: "",
        address: [{ value: "" }],
        emails: [{ email: "", emailType: "contact" }],
        phone: [{ value: "" }],
        social_media: [{ socialMediaName: "", link: "", image: "", }],
      });
    }
  }, [initialData, form]);

  const handleFormSubmit: SubmitHandler<WebsiteSettingsFormValues> = async (data) => {
    setInternalIsSubmitting(true);
     console.log("VALUES FROM FORM =>", data);
    try {
      await onSubmit(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save website settings.",
        variant: "destructive",
      });
    } finally {
      setInternalIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Multi-inputs & Settings Details (Col span 8) */}
          <div className="lg:col-span-8 space-y-6">

            {/* 1. Address Section */}
            <Card>
              <CardHeader className="border-b flex flex-row items-center justify-between py-4">
                <div>
                  <CardTitle className="text-base  flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-indigo-500" />
                    Office Addresses
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-0.5">
                    Configure one or more physical office location addresses.
                  </CardDescription>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendAddress({ value: "" })}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Address
                </Button>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {addressFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <FormField
                      control={form.control}
                      name={`address.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1 space-y-0">
                          <FormControl>
                            <Input placeholder="e.g. 123 Main St, Suite 400, New York, NY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAddress(index)}
                      disabled={addressFields.length <= 1}
                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 2. Emails Section */}
            <Card>
              <CardHeader className=" border-b flex flex-row items-center justify-between py-4">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Mail className="h-5 w-5 text-indigo-500" />
                    Contact Emails
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-0.5">
                    Configure contact, support, sales, or recruitment emails.
                  </CardDescription>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendEmail({ email: "", emailType: "contact" })}
                  // className="h-8 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-slate-50 border-indigo-200"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Email
                </Button>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {emailFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center border border-dashed p-4 rounded-lg bg-slate-50/20">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                      <FormField
                        control={form.control}
                        name={`emails.${index}.email`}
                        render={({ field }) => (
                          <FormItem className="space-y-0">
                            <FormControl>
                              <Input type="email" placeholder="e.g. info@inspiretechnosolution.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`emails.${index}.emailType`}
                        render={({ field }) => (
                          <FormItem className="space-y-0">
                            <FormControl>
                              {/* <select
                                {...field}
                                className="w-full h-10 px-3 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent border-slate-200 text-slate-800"
                              >
                                <option value="contact">Contact / General</option>
                                <option value="hr">HR / Careers</option>
                                <option value="sales">Sales / Business</option>
                              </select> */}
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="All Modules" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="contact">Contact / General</SelectItem>
                                  <SelectItem value="hr">HR / Careers</SelectItem>
                                  <SelectItem value="solution">ITS / Solution </SelectItem>
                                  <SelectItem value="sales">Sales / Business</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEmail(index)}
                      disabled={emailFields.length <= 1}
                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 3. Phone Numbers Section */}
            <Card >
              <CardHeader className=" border-b flex flex-row items-center justify-between py-4">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Phone className="h-5 w-5 text-indigo-500" />
                    Phone Numbers
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-0.5">
                    Configure customer service, office, or direct helpline phone numbers.
                  </CardDescription>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendPhone({ value: "" })}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Phone
                </Button>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {phoneFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <FormField
                      control={form.control}
                      name={`phone.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1 space-y-0">
                          <FormControl>
                            <Input placeholder="e.g. +1 (555) 019-2834" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removePhone(index)}
                      disabled={phoneFields.length <= 1}
                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 4. Social Media Section */}
            <Card >
              <CardHeader className=" border-b flex flex-row items-center justify-between py-4">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-indigo-500" />
                    Social Media Channels
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-0.5">
                    Connect links to corporate social profiles.
                  </CardDescription>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendSocial({ socialMediaName: "", link: "", image: "" })}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Social Profile
                </Button>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {socialFields.map((field, index) => (
                  <div key={field.id} className="flex flex-col sm:flex-row gap-3 p-4 border border-dashed rounded-lg bg-slate-50/20 relative pt-8 sm:pt-4">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                      <FormField
                        control={form.control}
                        name={`social_media.${index}.socialMediaName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs ">Platform Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Skype, Teams, Facebook, LinkedIn" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`social_media.${index}.link`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs ">Channel URL</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. https://linkedin.com/company/inspire" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`social_media.${index}.image`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs ">Channel Image</FormLabel>
                            <FormControl>
                              <ImageUpload value={field.value || ""} onChange={field.onChange} className="w-full h-10" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSocial(index)}
                      disabled={socialFields.length <= 1}
                      className="absolute top-2 right-2  h-8 w-8  sm:static sm:h-10 sm:w-10 sm:self-end text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>

          {/* Right Column: Favicon Logo Control (Col span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="favicon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Favicon Icon Logo</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          className="h-48 w-full "
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <span className="text-[10px] text-muted-foreground block leading-tight">
                  The favicon will show up inside browser tabs and bookmark bars. Recommended size: 32x32 pixels (.png or .ico format).
                </span>
                <FormField
                  control={form.control}
                  name="logo_img"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website Logo</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          className="h-48 w-full "
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>


          </div>

        </div>

        <div className="flex justify-end gap-3 border-t pt-6">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={internalIsSubmitting}
            >
              Reset / Cancel
            </Button>
          )}
          <Button type="submit" disabled={internalIsSubmitting} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow font-semibold">
            {internalIsSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Changes...
              </>
            ) : initialData ? (
              "Update Settings Content"
            ) : (
              "Create Settings Content"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
