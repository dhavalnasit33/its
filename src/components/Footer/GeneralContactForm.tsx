
"use client";

import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { FaMicrosoft } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import apiService from "@/lib/apiService";
import { useToast } from "@/components/ui/snackbar-provider";
import { BiCalendar } from "react-icons/bi";
import { GOOGLE_CAPTACH_CLIENT_KEY } from "@/config";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";
// -------------------- Constants --------------------
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ALLOWED_MIME_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];


// -------------------- Frontend file validation --------------------
// Double extension attack check: file.php.pdf reject karo
function hasDoubleExtension(filename: string): boolean {
    const parts = filename.split(".");
    if (parts.length <= 2) return false;

    const dangerousExts = [
        "php", "php3", "php4", "php5", "phtml",
        "asp", "aspx", "jsp", "exe", "sh", "bat",
        "cmd", "ps1", "py", "rb", "js", "ts",
        "html", "htm", "svg", "xml", "json", "sql",
    ];
    const middleParts = parts.slice(1, -1);
    return middleParts.some((p) => dangerousExts.includes(p.toLowerCase()));
}

function validateFile(file: File): string | null {
    // 1. Double extension check
    if (hasDoubleExtension(file.name)) {
        return "Invalid file: double extension detected (e.g. file.php.pdf is not allowed)";
    }

    // 2. Extension check
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return `Only ${ALLOWED_EXTENSIONS.join(", ")} files are allowed`;
    }

    // 3. MIME type check (browser reported)
    if (file.type && !ALLOWED_MIME_TYPES.includes(file.type)) {
        return "Invalid file type. Only PDF and Word documents are allowed";
    }

    // 4. Size check
    if (file.size > MAX_FILE_SIZE_BYTES) {
        return `File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB`;
    }

    // 5. Empty file check
    if (file.size === 0) {
        return "File is empty. Please upload a valid document";
    }

    return null; // ✅ Valid
}



// -------------------- Validation --------------------
const contactSchema = z.object({
    firstname: z
        .string()
        .min(2, { message: "First name must be at least 2 characters" }),
    lastname: z
        .string()
        .min(2, { message: "Last name must be at least 2 characters" }),
    email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email address"),
    phone: z
        .string()
        .min(10, { message: "Phone number must be at least 10 digits" }),
    message: z
        .string()
        .min(10, { message: "Message must be at least 10 characters" }),
    subject: z.string().optional(),
    budget: z.string().optional(),
});


type ContactFormValues = z.infer<typeof contactSchema>;



const budgetOptions = [
    "UP TO $10K",
    "$10-$20K",
    "$20-$50K",
    "$50-$100K",
    "$100K +",
];

export default function GeneralContactForm() {
    const { contactEmail, phonePrimary, addressPrimary, microsoftHandle } = useWebsiteSettings();
    const { toast } = useToast();
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [captchaToken, setCaptchaToken] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);
    const [selectedBudget, setSelectedBudget] = useState<string>("");

    const contactItems = [
        {
            icon: <FaMicrosoft className="text-[22px] font-bold shrink-0" />,
            label: "Microsoft",
            value: microsoftHandle,
        },
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


    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileError(null);
        setFile(null);

        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const error = validateFile(selectedFile);

            if (error) {
                setFileError(error);
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
            }

            setFile(selectedFile);
        }
    };


    // ✅ Drag & Drop handlers
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        setFileError(null);
        setFile(null);
        const droppedFile = e.dataTransfer.files?.[0];
        if (!droppedFile) return;
        const error = validateFile(droppedFile);
        if (error) {
            setFileError(error);
            return;
        }
        setFile(droppedFile);
    };

    // ✅ Remove selected file
    const handleRemoveFile = () => {
        setFile(null);
        setFileError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };



    const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
        console.log("FORM SUBMITTED", data);
        if (!captchaToken) {
            toast("Please complete the CAPTCHA verification", "error");
            return;
        }
        if (selectedSubjects.length === 0) {
            toast("Please select at least one subject", "error");
            return;
        }
        if (!selectedBudget) {
            toast("Please select a budget range", "error");
            return;
        }
        if (file) {
            const error = validateFile(file);
            if (error) {
                setFileError(error);
                return;
            }
        }
        setIsSubmitting(true);
        try {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (key !== "subject" && key !== "budget") {
                    formData.append(key, value);
                }
            });

            formData.append("subject", selectedSubjects.join(", "));
            formData.append("budget", selectedBudget);
            formData.append("source", "footer_form");
            formData.append("type", "FooterForm");
            formData.append("captchaToken", captchaToken);
            if (file) formData.append("file", file);

            console.log("🚀 ~ onSubmit ~ formData:", formData)

            const response = await apiService<{ success: boolean; message?: string }>("/enquiries", { method: "POST", body: formData });
            console.log("🚀 ~ onSubmit ~ response:", response)

            if (response.success) {
                toast("Message sent successfully!", "success");
                reset();
                setSelectedBudget("");
                setSelectedSubjects([]);
                setFile(null);
                setFileError(null);
                setCaptchaToken("");
                if (fileInputRef.current) fileInputRef.current.value = "";
                (recaptchaRef.current as any)?.reset();

            } else {
                throw new Error(response.message || "Failed to send message");
            }
        } catch (error: any) {
            toast(error.message || "Failed to send message. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] font-inter ">
            <div className="bg-[#13213d] p-7 md:p-8 text-white flex flex-col  rounded-2xl relative overflow-hidden h-fit lg:mr-10 ">
                <div className="flex items-center justify-between sm:gap-3 gap-2">
                    <div>
                        <h3 className="text-sm uppercase tracking-[0.18em]">
                            CONTACT DETAILS
                        </h3>
                        <p className=" mt-2 text-xl font-bricolage text-white">
                            Let's plan your next release.
                        </p>
                    </div>
                    <div className="hidden md:flex w-6 h-6 rounded-full bg-white/10 border border-white/10 items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-[#02caa6] shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                    </div>
                </div>

                <div className="md:space-y-4 mt-5 md:mt-10 text-base md:text-xl">
                    {contactItems.map((item, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-3 w-full rounded-md bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 text-left transition-colors ${index !== contactItems.length - 1 ? "mb-4" : "mb-0"
                                }`}
                        >
                            <div className="p-2 rounded-md bg-white/10">
                                {item.icon}
                            </div>

                            <div className="flex flex-col">
                                <h4 className="text-xs uppercase tracking-[0.16em]">
                                    {item.label}
                                </h4>

                                <p
                                    className={`text-[16px] ${item.isEmail ? "break-all" : "wrap-break-words"
                                        }`}
                                >
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
                    <div className=" p-3 bg-white/10 rounded-md">
                        <BiCalendar size={30} />
                    </div>
                    <h4 className="text-[18px] text-white font-semibold leading-[22px] capitalize">
                        Book a meeting
                    </h4>
                </button>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto mt-4"
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

            <div className="mt-8 lg:mt-0">
                <h4 className="text-2xl font-bold mb-6 text-gray-800">
                    Let&apos;s Talk Business!
                </h4>

                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                            <input
                                type="text"
                                placeholder="First Name"
                                className={`w-full border-b border-gray-300 focus:border-orange-500 focus:outline-none py-2 ${errors.firstname ? "border-red-500" : ""
                                    }`}
                                {...register("firstname")}
                            />
                            {errors.firstname && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.firstname.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className={`w-full border-b border-gray-300 focus:border-orange-500 focus:outline-none py-2 ${errors.lastname ? "border-red-500" : ""
                                    }`}
                                {...register("lastname")}
                            />
                            {errors.lastname && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.lastname.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className={`w-full border-b border-gray-300 focus:border-orange-500 focus:outline-none py-2 ${errors.email ? "border-red-500" : ""
                                    }`}
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                maxLength={10}
                                pattern="\d{10}"
                                className={`w-full border-b border-gray-300 focus:border-orange-500 focus:outline-none py-2 ${errors.phone ? "border-red-500" : ""
                                    }`}
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: "Phone number must be exactly 10 digits",
                                    },
                                })}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-700 font-semibold">
                            Select Subject?
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-3 pt-2">
                            {[
                                "Hire Developer(s)",
                                "Web Development",
                                "Mobile App Development",
                                "UI/UX Design",
                                "QA Service",
                                "Digital Marketing",
                                "Other Services",
                            ].map((subject) => (
                                <label
                                    key={subject}
                                    className="flex items-center gap-1 md:gap-2 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="subject"
                                        value={subject}
                                        checked={selectedSubjects[0] === subject}
                                        onChange={() => {
                                            setSelectedSubjects([subject]);
                                            setValue("subject", subject);
                                        }}
                                        className="hidden peer"
                                    />
                                    <span className="h-4 w-4 flex items-center justify-center rounded-full border border-gray-400 peer-checked:bg-orange-500 peer-checked:border-orange-500 text-white text-xs">
                                        ✓
                                    </span>
                                    <span className="text-gray-700 text-xs sm:text-sm">{subject}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <textarea
                            rows={4}
                            placeholder="Write your message.."
                            className={`w-full border-b border-gray-300 focus:border-orange-500 focus:outline-none ${errors.message ? "border-red-500" : ""
                                }`}
                            {...register("message")}
                        ></textarea>
                        {errors.message && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.message.message}
                            </p>
                        )}
                    </div>



                    <div>
                        <label className="text-gray-700 mb-3 font-semibold">
                            Your budget for this project?
                        </label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {budgetOptions.map((budget, index) => (
                                <button
                                    key={index}

                                    onClick={() => {
                                        setSelectedBudget(budget);
                                        setValue("budget", budget);
                                    }}
                                    type="button"
                                    className={`
                                        hover:cursor-pointer
        rounded-lg sm:px-6 sm:py-4 px-4 py-2 text-sm font-medium
        sm:text-base uppercase tracking-wide transition-colors
        hover:bg-[#D68029] hover:text-white
        ${selectedBudget === budget
                                            ? "bg-[#D68029] text-white"
                                            : "bg-[#13213d] text-white "
                                        }
    `}

                                >
                                    {budget}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mx-auto">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload a file   (.pdf, .doc, .docx — max {MAX_FILE_SIZE_MB}MB)
                        </label>

                        {!file ? (
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`block border-2 border-dashed rounded-lg p-4 md:p-6 text-center cursor-pointer transition ${fileError
                                    ? "border-red-400 bg-red-50"
                                    : isDragging
                                        ? "border-green-400 bg-green-50"
                                        : "border-gray-300 hover:border-orange-400"
                                    }`}
                            >
                                <div className="flex flex-col items-center justify-center">
                                    <svg
                                        className="w-5 h-5 mb-3 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        />
                                    </svg>
                                    <span className="text-orange-600 font-medium">+ Attach File</span>
                                    <span className="text-xs text-gray-400 mt-1">
                                        PDF, DOC, DOCX only · Max {MAX_FILE_SIZE_MB}MB
                                    </span>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-between border border-green-300 bg-green-50 rounded-lg px-4 py-3">
                                <div className="flex items-center gap-2 min-w-0">
                                    <svg className="w-5 h-5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                    </svg>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRemoveFile}
                                    className="ml-3 text-gray-400 hover:text-red-500 transition shrink-0"
                                    title="Remove file"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}

                        {fileError && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {fileError}
                            </p>
                        )}
                    </div>

                    <div className="my-4 flex justify-start"> 
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

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full max-w-50 block ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    >
                        <div className="bg-[#D68029] relative inline-flex items-center justify-center w-full max-w-50 overflow-hidden text-white rounded-xl group">
                            <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-[#21203d] rounded group-hover:w-56 group-hover:h-56"></span>
                            <span className="relative tracking-tight text-sm sm:text-base rounded-[10px] px-7.5 py-2.5 sm:px-8 sm:py-4 cursor-pointer font-semibold">
                                {isSubmitting ? (
                                    <>
                                        <span>
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                        </span>
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
                </form>
            </div>
        </div>
    );
}