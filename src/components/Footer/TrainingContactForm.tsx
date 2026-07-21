"use client";

import { useRef, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { FaMicrosoft } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { BiCalendar } from "react-icons/bi";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";

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
    phone: z.string().refine(
        (val) => {
            if (!val) return false;
            if (matchIsValidTel(val)) return true;
            const cleaned = val.replace(/\D/g, "");
            return cleaned.length >= 10 && cleaned.length <= 15;
        },
        {
            message: "Please enter a valid phone number",
        }
    ),
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
    const { contactEmail, phonePrimary, addressPrimary, microsoftHandle } = useWebsiteSettings();
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
            fullname: data.fullname,
            email: data.email,
            phone: data.phone,
            location: data.location,
            selectedCourse: data.selectedCourse,
            message: data.message,
            token: captchaToken,
        };

        try {
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

    const contactItems = [
        {
            icon: <MdPhone className="text-[22px] font-bold shrink-0" />,
            label: "Call",
            value: phonePrimary,
        },
        {
            icon: <MdEmail className="text-[22px] font-bold shrink-0" />,
            label: "Email",
            value: contactEmail,
            isEmail: true,
        },
        {
            icon: <MdPhone className="text-[22px] font-bold shrink-0" />,
            label: "Address",
            value: addressPrimary,
        },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%]">
            {/* Left Box: Contact Details */}
            <div className="bg-[#13213d] p-7 md:p-8 text-white flex flex-col rounded-2xl relative overflow-hidden h-fit lg:mr-10 mb-8 lg:mb-0">
                <div className="flex items-center justify-between sm:gap-3 gap-2">
                    <div>
                        <h3 className="text-sm uppercase tracking-[0.18em] font-bold">
                            CONTACT DETAILS
                        </h3>
                        <p className="mt-2 text-xl text-white font-medium">
                            Let's plan your next release.
                        </p>
                    </div>
                    <div className="hidden md:flex w-6 h-6 rounded-full bg-white/10 border border-white/10 items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-[#02caa6] shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                    </div>
                </div>

                <div className="md:space-y-4 mt-5 md:mt-10 text-base md:text-lg">
                    {contactItems.map((item, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-3 w-full rounded-md bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 text-left transition-colors ${
                                index !== contactItems.length - 1 ? "mb-4" : "mb-0"
                            }`}
                        >
                            <div className="p-2 rounded-md bg-white/10">
                                {item.icon}
                            </div>

                            <div className="flex flex-col">
                                <h4 className="text-xs uppercase tracking-[0.16em] text-slate-300">
                                    {item.label}
                                </h4>
                                <p className={`text-[16px] text-white mt-0.5 ${item.isEmail ? "break-all" : "wrap-break-words"}`}>
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    className="w-full mt-7 flex items-center gap-3 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 text-left transition-colors"
                >
                    <div className="p-3 bg-white/10 rounded-md text-white">
                        <BiCalendar size={30} />
                    </div>
                    <h4 className="text-[18px] text-white font-semibold leading-[22px] capitalize">
                        Book a meeting
                    </h4>
                </button>

                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto mt-6"
                    href="https://www.dmca.com/Protection/Status.aspx?ID=bacf8e02-d48d-415f-8b3b-cf0dbe330960"
                >
                    <Image
                        alt="DMCA.com"
                        src="/home/dmca.png"
                        width={250}
                        height={50}
                        className="h-8 w-auto"
                    />
                </a>
            </div>

            {/* Right Box: Form */}
            <Box className="bg-white xl:px-4 rounded-xl w-full mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
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
                        <div className="scale-75 sm:scale-100 origin-left">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={GOOGLE_CAPTACH_CLIENT_KEY}
                                onChange={(token) => setCaptchaToken(token)}
                            />
                        </div>
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                            backgroundColor: "#D68029",
                            '&:hover': {
                                backgroundColor: "#0b1833",
                            },
                            borderRadius: "8px",
                            padding: "10px 24px",
                            fontWeight: "bold",
                            textTransform: "none",
                            fontSize: "16px",
                            color: "white",
                        }}
                    >
                        {isSubmitting ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Send Message"
                        )}
                    </Button>
                </form>
            </Box>
        </div>
    );
}