"use client";

import { useRef, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import * as z from "zod";
import Image from "next/image";

import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    CircularProgress,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    Box,
    Theme,
    SxProps,
} from "@mui/material";
// Import icons for the custom radio buttons
import { IoIosCheckmarkCircle, IoIosRadioButtonOff } from "react-icons/io";
import ReCAPTCHA from "react-google-recaptcha";
import { useToast } from "@/components/ui/snackbar-provider";
import apiService from "@/lib/apiService";
import { SingleResponse, HireForm as HireFormType } from "@/types";
import { GOOGLE_CAPTACH_CLIENT_KEY } from "@/config";

// --- Form Validation Schema (Updated phone validation) ---
const hireSchema = z.object({
    name: z.string().min(3, "Full name must be at least 3 characters"),
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
    recruitment: z.string().min(1, "Please select a recruitment type"),
    subject: z.string().min(1, "Please select a subject"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type HireFormValues = z.infer<typeof hireSchema>;
const TEXT_COLOR = "rgba(255, 255, 255, 0.6)";
// --- Common styles for TextFields, Select, and MuiTelInput ---
const inputStyles: SxProps<Theme> = {
    '& .MuiFilledInput-root': {
        backgroundColor: 'transparent',
        borderBottom: '1px solid #ffffff14',
        borderRadius: '0px',
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused, &:hover': {
            backgroundColor: 'transparent',
            borderBottom: '1px solid #d68029',
            color: "rgba(255, 255, 255, 0.6)",

        },
        '& input, & textarea, & select': {
            color: TEXT_COLOR,
        },
    },

    '& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after': {
        borderBottom: 'none',
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '14px',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#D68029', // Your brand color for focused label
    },
};

export default function HireForm() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<HireFormValues>({
        resolver: zodResolver(hireSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "+91", // Default to India
            recruitment: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit: SubmitHandler<HireFormValues> = async (data) => {
        if (!captchaToken) {
            toast("Please complete the CAPTCHA verification", "error");
            return;
        }
        setIsSubmitting(true);

        const payload = {
            ...data,
            type: "Hire",
            source: "hire_page",
            captchaToken: captchaToken,
        };

        try {
            const response = await apiService<SingleResponse<HireFormType>>(
                "/enquiries",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (response.success) {
                toast("Your request has been submitted successfully!", "success");
                reset();
                setCaptchaToken(null);
                (recaptchaRef.current as any)?.reset()
            } else {
                throw new Error(response.message || "Failed to submit your request");
            }
        } catch (error: any) {
            toast(error.message || "An error occurred", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const recruitmentOptions = ["Full Time", "Part Time", "Hourly Based", "Flexible"];
    const subjectOptions = [
        "Web Development",
        "Mobile App Development",
        "UI/UX Design",
        "Digital Marketing",
        "QA Service",
        "Other Services",
    ];

    return (
        <div className=" w-full mx-auto">
            <h3 className="text-2xl font-bold text-white">
                SAVE <span className="text-[#d68029]">60%</span> OF PROJECT COST
            </h3>
            <p className="text-white/70 mt-2 mb-6">
                With Pre-Vetted Developers, Programmers, Coders, Engineers, Architects & Consultants
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-2 md:space-y-4">
                {/* --- Name, Email, Phone, Recruitment --- */}
                <div className="flex flex-col  mb-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <label className="block text-xs font-medium uppercase tracking-wider text-white mb-2">
                                        Your Name
                                    </label>
                                    <TextField
                                        {...field}
                                        // label="Full Name*"
                                        placeholder="Full Name*"
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                        fullWidth
                                        variant="filled"
                                        size="small"
                                        InputProps={{ disableUnderline: true }}
                                        InputLabelProps={{ shrink: false }}
                                        sx={inputStyles}
                                    />
                                </div>
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <label className="block text-xs font-medium uppercase tracking-wider text-white mb-2">
                                        Your Email
                                    </label>
                                    <TextField
                                        {...field}
                                        // label="Email Address*"
                                        placeholder="Email Address*"

                                        type="email"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        fullWidth
                                        variant="filled"
                                        size="small"
                                        InputProps={{ disableUnderline: true }}
                                        InputLabelProps={{ shrink: false }}
                                        sx={inputStyles}
                                    />
                                </div>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field, fieldState }) => (
                                <div>
                                    <label className="block text-xs font-medium uppercase tracking-wider text-white mb-2">
                                        Phone
                                    </label>
                                    <MuiTelInput
                                        {...field}
                                        // label="Contact Number*"
                                        variant="filled"
                                        size="small"
                                        fullWidth
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        defaultCountry="IN"
                                        sx={inputStyles}
                                        InputLabelProps={{ shrink: false }}
                                    />
                                </div>
                            )}
                        />

                        <FormControl
                            fullWidth
                            error={!!errors.recruitment}
                            variant="filled"
                            size="small"
                            sx={inputStyles}
                        >
                            {/* 🔥 CUSTOM LABEL (same as Phone field) */}
                            <label className="block text-xs font-medium uppercase tracking-wider text-white mb-2">
                                Select Recruitment
                            </label>

                            <Controller
                                name="recruitment"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        disableUnderline
                                        displayEmpty
                                        sx={{
                                            color: 'rgba(255,255,255,0.6)',
                                            '& .MuiSelect-icon': { color: 'white' },
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    borderRadius: '0px 0px 10px 10px',
                                                    backgroundColor: '#1a2a3a',  // dropdown background
                                                    '& .MuiMenuItem-root': {
                                                        color: 'white',           // all items white
                                                        '&:hover': {
                                                            backgroundColor: '#d6802930',
                                                        },
                                                        '&.Mui-selected': {
                                                            backgroundColor: '#d6802950',
                                                            color: '#d68029',
                                                        },
                                                        '&.Mui-disabled': {
                                                            color: 'rgba(255,255,255,0.4)',
                                                            opacity: 1,
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem value="" disabled>
                                            Select Recruitment*
                                        </MenuItem>

                                        {recruitmentOptions.map((option) => (
                                            <MenuItem key={option} value={option} >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />

                            <FormHelperText>
                                {errors.recruitment?.message}
                            </FormHelperText>
                        </FormControl>
                    </div>
                </div>


                {/* --- Custom Radio Buttons for Subject --- */}

                <FormControl component="fieldset" error={!!errors.subject} fullWidth>
                    <Typography component="legend" className="text-white/80 font-medium mb-2 text-sm">Select Subject*</Typography>
                    <Controller
                        name="subject"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup
                                {...field}
                                // --- THIS IS THE FIX ---
                                // We use the `sx` prop to create a responsive grid layout
                                sx={{
                                    display: 'grid',
                                    // On extra-small (xs) screens, use 1 column
                                    // On small (sm) screens and up, use 2 columns
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: '1fr 1fr'
                                    },
                                    gap: 0 // Adjust the gap between items if needed
                                }}
                            >
                                {subjectOptions.map((option) => (
                                    <FormControlLabel
                                        key={option}
                                        value={option}
                                        control={
                                            <Radio
                                                disableRipple
                                                icon={<IoIosRadioButtonOff size={24} color="#d1d5db" />}
                                                checkedIcon={<IoIosCheckmarkCircle size={24} color="#d68029" />}
                                            />
                                        }
                                        label={option}
                                        sx={{
                                            color: "rgba(255,255,255,0.8)",
                                            "& .MuiFormControlLabel-label": {
                                                color: "rgba(255,255,255,0.8)",
                                                fontSize: "14px",
                                            },
                                        }}
                                    />
                                ))}
                            </RadioGroup>
                        )}
                    />
                    <FormHelperText>{errors.subject?.message}</FormHelperText>
                </FormControl>

                {/* --- Message Textarea --- */}
                <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Message"
                            multiline
                            rows={3}
                            error={!!errors.message}
                            helperText={errors.message?.message}
                            fullWidth
                            variant="filled"
                            InputProps={{ disableUnderline: true }}
                            sx={inputStyles}
                            InputLabelProps={{ shrink: false }}
                        />
                    )}
                />

                <div className="flex justify-start my-4">
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
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    fullWidth
                    className="primary_button relative group overflow-hidden mt-10 uppercase font-bold"
                    sx={{
                        minWidth: "180px",
                        width: "fit-content",
                        py: 1.25,
                        fontWeight: 700,
                        fontSize: 16,
                        borderRadius: 3,
                    }}
                >
                    <span className="absolute top-0 -left-full w-[60%] h-full bg-[linear-gradient(90deg,transparent,hsla(0,0%,100%,0.2),transparent)] animate-shine "></span>
                    {isSubmitting ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        "Submit"
                    )}
                    <Image
                        src="/navbar/arrow.png"
                        alt="Get a Quote Arrow"
                        width={16}
                        height={16}
                        className="object-contain transition-transform duration-300 group-hover:translate-x-1"
                    />
                </Button>

            </form>
        </div>
    );
}