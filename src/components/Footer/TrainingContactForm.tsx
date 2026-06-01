"use client";

import { useRef, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import * as z from "zod";

import {
    TextField,
    Button,
    CircularProgress,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    Box,
    Theme,
    SxProps,
    FormHelperText,
    FormControl,
    FormLabel,
} from "@mui/material";
import { IoIosCheckmarkCircle, IoIosRadioButtonOff } from "react-icons/io";
import ReCAPTCHA from "react-google-recaptcha";
import { useToast } from "@/components/ui/snackbar-provider";
import apiService from "@/lib/apiService";

// 1. Validation Schema based on your API and Mongoose model
const trainingSchema = z.object({
    fullname: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().refine(matchIsValidTel, {
        message: "Please enter a valid phone number",
    }),
    location: z.string().min(2, "Location is required"),
    selectedCourse: z.string().min(1, "Please select a course"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type TrainingFormValues = z.infer<typeof trainingSchema>;

// Common styles for a consistent look, borrowed from your HireForm
const inputStyles: SxProps<Theme> = {
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: '8px',
        },
        '&:hover fieldset': {
            borderColor: '#b0b0b0',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#D68029',
        },
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#D68029',
    },
};

export default function TrainingContactForm() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TrainingFormValues>({
        resolver: zodResolver(trainingSchema),
        defaultValues: {
            fullname: "",
            email: "",
            phone: "+91", // Default to India
            location: "",
            selectedCourse: "",
            message: "",
        },
    });

    const onSubmit: SubmitHandler<TrainingFormValues> = async (data) => {
        if (!captchaToken) {
            toast("Please complete the CAPTCHA verification", "error");
            return;
        }
        setIsSubmitting(true);

        const payload = {
            ...data,
            token: captchaToken,
        };

        try {
            // 2. Call the correct training API endpoint
            const response = await apiService<{ success: boolean; message?: string }>(
                "/tranning-contact",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (response.success) {
                toast("Your message has been sent successfully!", "success");
                reset();
                setCaptchaToken(null);
                (recaptchaRef.current as any)?.reset();

            } else {
                throw new Error(response.message || "Failed to submit your request");
            }
        } catch (error: any) {
            toast(error.message || "An error occurred", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const courseOptions = [
        "Web Development",
        "Full Stack Development",
        "UI/UX Design",
        "Mobile App Development",
        "Web Design",
        "Other Services",
    ];

    return (
        <Box className="bg-white p-4 md:px-8  rounded-xl w-full mx-auto  ">
            <Typography variant="h4" component="h2" align="center" fontWeight="bold" className="text-gray-800 mb-8" sx={{
                marginBottom: "30px"
            }}>
                Any Questions? Feel Free to Contact Us
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    <Controller name="fullname" control={control} render={({ field }) => (
                        <TextField {...field} label="Your Full Name (required)" error={!!errors.fullname} helperText={errors.fullname?.message} fullWidth sx={inputStyles} />
                    )} />
                    <Controller name="phone" control={control} render={({ field, fieldState }) => (
                        <MuiTelInput {...field} label="Mobile No. (required)" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} defaultCountry="IN" sx={inputStyles} />
                    )} />
                    <Controller name="email" control={control} render={({ field }) => (
                        <TextField {...field} label="Email (required)" type="email" error={!!errors.email} helperText={errors.email?.message} fullWidth sx={inputStyles} />
                    )} />
                    <Controller name="location" control={control} render={({ field }) => (
                        <TextField {...field} label="Enter Location" error={!!errors.location} helperText={errors.location?.message} fullWidth sx={inputStyles} />
                    )} />
                </Box>
                <FormControl component="fieldset" error={!!errors.selectedCourse} fullWidth>
                    <FormLabel component="legend" sx={{ fontWeight: 'bold', color: '#000', mb: 1, }}>Select Course?</FormLabel>
                    <Controller
                        name="selectedCourse"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup
                                {...field}
                                // 2. Changed to flex wrap
                                sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}
                            >
                                {courseOptions.map((option) => (
                                    <FormControlLabel key={option} value={option} control={
                                        <Radio disableRipple icon={<IoIosRadioButtonOff size={24} color="#d1d5db" />} checkedIcon={<IoIosCheckmarkCircle size={24} color="#d68029" />} />
                                    } label={option}
                                        sx={{
                                            color: field.value === option ? '#d68029' : 'inherit',
                                            '& .MuiTypography-root': {
                                                fontWeight: field.value === option ? 500 : 400,
                                            },
                                        }}

                                    />
                                ))}
                            </RadioGroup>
                        )}
                    />
                    <FormHelperText>{errors.selectedCourse?.message}</FormHelperText>
                </FormControl>
                <Controller name="message" control={control} render={({ field }) => (
                    <TextField {...field} label="Message" multiline rows={4} error={!!errors.message} helperText={errors.message?.message} fullWidth sx={inputStyles} />
                )} />

                <Box className="flex justify-center md:justify-start my-4">
                    {/* <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} onChange={(token) => setCaptchaToken(token)} /> */}
                     <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={
                            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
                            "YOUR_SITE_KEY"
                        }
                        onChange={(token) => setCaptchaToken(token || "")}
                    />
                </Box>

                <Box className="text-center md:text-left">
                    <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ backgroundColor: "#D68029", "&:hover": { backgroundColor: "#B86E23" }, py: 1.5, px: 5, textTransform: "none", fontSize: "1rem" }}>
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Send Message"}
                    </Button>
                </Box>
            </form>
        </Box>
    );
}