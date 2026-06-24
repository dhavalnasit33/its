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
import { GOOGLE_CAPTACH_CLIENT_KEY } from "@/config";

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
            type: "Training",
            name: data.fullname,
            email: data.email,
            phone: data.phone,
            location: data.location,
            selectedCourse: data.selectedCourse,
            message: data.message,
            source: "training_page",
            captchaToken: captchaToken,
        };

        try {
            const response = await apiService<{ success: boolean; message?: string }>(
                "/enquiries",
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
        <Box className="bg-white  xl:px-8  rounded-xl w-full mx-auto  ">
            {/* <Typography variant="h4" component="h2" align="center" fontWeight="bold" className="text-black mb-14" sx={{
                marginBottom: "30px"
            }}>
                Any Questions? Feel Free to Contact Us
            </Typography> */}
            <h2 className="relative common-h2 mb-14 w-full text-center">
                Any Questions? Feel Free to Contact Us
            </h2>

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

                <Box className="flex justify-start my-4">
                    {/* <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} onChange={(token) => setCaptchaToken(token)} /> */}
                    <div className="scale-75 sm:scale-100 origin-left">
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            // sitekey={
                            //     process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
                            //     "YOUR_SITE_KEY"
                            // }
                            sitekey={GOOGLE_CAPTACH_CLIENT_KEY}
                            onChange={(token) => setCaptchaToken(token || "")}
                        />
                    </div>
                </Box>

                <Box className="text-left">
                    {/* <Button type="submit" variant="contained" disabled={isSubmitting}
                     sx={{ backgroundColor: "#D68029", "&:hover": { backgroundColor: "#B86E23" }, py: 1.5, px: 5, textTransform: "none", fontSize: "1rem" }}
                     >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Send Message"}
                    </Button> */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={` mt-8 block ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                        <div className="bg-[#D68029] relative inline-flex items-center justify-center w-full max-w-50 overflow-hidden text-white rounded-xl group ">
                            <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#21203d] rounded group-hover:w-56 group-hover:h-56 uration-750 delay-300 ease-in-out"></span>
                            <span className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-6 sm:px-8 py-3 cursor-pointer font-semibold">
                                {isSubmitting ? (
                                    <>
                                        <span>
                                            Sending...
                                        </span>
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                            </span>
                        </div>
                    </button>
                </Box>
            </form>
        </Box>
    );
}