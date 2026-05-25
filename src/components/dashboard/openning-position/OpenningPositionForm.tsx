"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { OpenningPositionFormValues, OpenningPositionSchema } from "@/types";
import ImageUpload from "@/components/ui/imagupload";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

const qualificationOptions = [
  "B.E. / B.Tech",
  "M.E. / M.Tech",
  "BCA",
  "MCA",
  "B.Sc (IT/CS)",
  "M.Sc (IT/CS)",
  "Diploma in IT/CS",
  "Post Graduate",
  "MBA (HR)",
  "Graduate",
  "HSC (12th Pass)",
];

interface FormProps {
  initialData?: OpenningPositionFormValues | null;
  onSubmit: (data: OpenningPositionFormValues) => Promise<void>;
  onCancel?: () => void;
}

export default function OpenningPositionForm({
  initialData,
  onSubmit,
  onCancel,
}: FormProps) {
  const { toast } = useToast();
  const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);

  const form = useForm<OpenningPositionFormValues>({
    resolver: zodResolver(OpenningPositionSchema),
    defaultValues: initialData || {
      name: "",
      image: "",
      openning: 0,
      qualifications: "",
      experience: "",
    },
  });

  const handleFormSubmit: SubmitHandler<OpenningPositionFormValues> = async (data) => {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit as any)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="space-y-6 pt-6">
            <FormField
              control={form.control as any}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control as any}
              name="openning"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Openings</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. 5 or 'Multiple'" 
                      value={field.value}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(isNaN(Number(val)) || val === "" ? val : Number(val));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control as any}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Required</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 0 to 2 Years" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control as any}
              name="qualifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualifications</FormLabel>
                  <div className="grid grid-cols-2 gap-4 p-4 border rounded-md bg-muted/20">
                    {qualificationOptions.map((option) => {
                      const selectedValues = field.value ? field.value.split(",").map((v: string) => v.trim()) : [];
                      return (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={option}
                            checked={selectedValues.includes(option)}
                            onCheckedChange={(checked: boolean) => {
                              const currentValues = [...selectedValues];
                              if (checked) {
                                currentValues.push(option);
                              } else {
                                const index = currentValues.indexOf(option);
                                if (index > -1) currentValues.splice(index, 1);
                              }
                              field.onChange(currentValues.filter(Boolean).join(", "));
                            }}
                          />
                          <label
                            htmlFor={option}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 lg:col-span-1">
            <Card>
              <CardContent className="pt-6 ">
                <FormField
                  control={form.control as any}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position Image</FormLabel>
                      <FormControl>
                        <ImageUpload 
                          value={field.value} 
                          onChange={field.onChange} 
                          className="w-full h-64" 
                        />
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
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={internalIsSubmitting}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={internalIsSubmitting}>
            {internalIsSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Position"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
