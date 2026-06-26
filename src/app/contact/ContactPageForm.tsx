// "use client";

// import Image from "next/image";
// import { useRef, useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
// import { AiOutlineLinkedin } from "react-icons/ai";
// import { FiPaperclip } from "react-icons/fi";

// const contactData = [
//   {
//     title: "Have a project to discuss?",
//     company: "Inspire Techno Solutions",
//     role: "Web Development Team",
//     email: "contact@inspiretechnosolution.com",
//   },
//   {
//     title: "Have a partnership in mind?",
//     company: "Inspire Techno Solutions",
//     role: "Partnerships & Growth",
//     email: "hr@inspiretechnosolution.com",
//   },
//   {
//     title: "Visit our location",
//     company: `215-Dhara Arcade, Digital Valley (Mota Varachha), Surat-394101, Gujarat, India`,
//     role: "Head Office",
//     // email: "hr@inspiretechnosolution.com",
//   },
// ];

// const budgetOptions = [
//   "UP TO $10K",
//   "$10-$20K",
//   "$20-$50K",
//   "$50-$100K",
//   "$100K +",
// ];

// export default function ContactPageForm() {
//     const [captchaToken, setCaptchaToken] = useState("");
//     const recaptchaRef = useRef<ReCAPTCHA | null>(null);
//     return (
//         <section className="relative bg-[#0d1b2a] w-full z-20">
//             <div className="max-w-[90%] lg:max-w-[80%] mx-auto px-4">
//                 <div className="border-t border-[#ffffff14] py-10">

//                     <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] items-start ">

//                         {/* LEFT SIDE */}
//                         <div className="lg:sticky lg:top-28 lg:mr-10">
//                             {contactData.map((item, index) => (
//                                 <div key={index} className="mb-8">

//                                 {/* Title */}
//                                 <h3 className="text-2xl font-semibold text-white mb-5">
//                                     {item.title}
//                                 </h3>

//                                 {/* Card */}
//                                 <div className="flex items-start gap-4 p-4 rounded-md bg-[#ffffff08] transition-colors w-full">

//                                     {/* Logo */}
//                                     <div className="w-14 h-20 rounded-md bg-[#ffffff06] flex items-center justify-center text-white font-semibold text-lg shrink-0">
//                                     ITS
//                                     </div>

//                                     {/* Content */}
//                                     <div className="w-full">

//                                     <div className="flex justify-between gap-2 items-center">
//                                         <div>
//                                         <p className="text-white text-[16px] md:text-xl ">
//                                             {item.company}
//                                         </p>
//                                         <p className="text-white opacity-60 text-sm mt-1">
//                                             {item.role}
//                                         </p>
//                                         </div>

//                                         <div className="inline-flex">
//                                         <AiOutlineLinkedin className="text-[28px] text-white hover:text-[#d68029] transition-colors" />
//                                         </div>
//                                     </div>

//                                     {/* Email */}
//                                     {item.email && (
//                                         <a
//                                             href={`mailto:${item.email}`}
//                                             className="inline-flex items-start gap-2 text-base mt-6 text-white hover:underline transition-all break-all"
//                                         >
//                                             <Image
//                                             src="/icon/Mail.png"
//                                             alt="mail"
//                                             width={20}
//                                             height={20}
//                                             className="shrink-0 filter brightness-0 invert mt-1"
//                                             />
//                                             {item.email}
//                                         </a>
//                                         )}

//                                     </div>
//                                 </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* RIGHT SIDE FORM */}
//                         <div>
//                             <form className="space-y-4 md:space-y-6 mb-5" >
//                                 {/* Name Fields */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                                     <div>
//                                         <label className="block text-xs font-medium uppercase tracking-wider text-white mb-2 ">Your Name</label>
//                                         <input
//                                             type="text"
//                                             placeholder="First Name"
//                                             className="flex h-10 w-full text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-ring 
//                                             focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent border-0 border-b border-[#ffffff14] rounded-none 
//                                             px-0 py-7 text-white opacity-60  placeholder:text-white/60 focus-visible:ring-0 focus-visible:border-[#d68029] focus-visible:outline-none"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-xs font-medium uppercase tracking-wider text-white mb-2 ">Your Name</label>
//                                         <input
//                                             type="text"
//                                             placeholder="Last Name"
//                                             className="flex h-10 w-full text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-ring 
//                                             focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent border-0 border-b border-[#ffffff14] rounded-none 
//                                             px-0 py-7 text-white opacity-60 placeholder:text-white/60 focus-visible:ring-0 focus-visible:border-[#d68029] focus-visible:outline-none"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                                     <div>
//                                         <label className="block text-xs font-medium uppercase tracking-wider text-white mb-2">E-mail</label>
//                                         <input
//                                             type="email"
//                                             placeholder="Email"
//                                             className="flex h-10 w-full text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-ring 
//                                                 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent border-0 border-b border-[#ffffff14] rounded-none 
//                                                 px-0 py-7 text-white opacity-60 placeholder:text-white/60 focus-visible:ring-0 focus-visible:border-[#d68029] focus-visible:outline-none"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-xs font-medium uppercase tracking-wider text-white mb-2 ">Phone</label>
//                                         <input
//                                             type="tel"
//                                             placeholder="Phone Number"
//                                             maxLength={10}
//                                             pattern="\d{10}"
//                                             className="flex h-10 w-full text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-ring 
//                                                 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent border-0 border-b border-[#ffffff14] rounded-none 
//                                                 px-0 py-7 text-white opacity-60 placeholder:text-white/60 focus-visible:ring-0 focus-visible:border-[#d68029] focus-visible:outline-none"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="block text-xs font-medium uppercase tracking-wider text-white mb-2 ">Message</label>
//                                     <textarea
//                                         rows={4}
//                                         placeholder="Write your message.."
//                                         className="flex w-full text-sm ring-offset-background focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 
//                                                 bg-transparent border-0 border-b border-[#ffffff14] rounded-none px-0 py-7 text-white opacity-60 placeholder:text-white/60 focus-visible:ring-0 
//                                                 focus-visible:border-[#f97316] focus-visible:outline-none min-h-[80px] resize-none"
//                                     />
//                                 </div>
//                             </form>   

//                             <div className="space-y-4  md:space-y-6"> 
//                                 <div className="text-white">
//                                     <input className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm 
//                                                 file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 
//                                                 disabled:cursor-not-allowed disabled:opacity-50 hidden" id="RequestQuote" type="file" name="file"></input>
//                                     <label htmlFor="RequestQuote" className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-[#ffffff08] hover:bg-[#ffffff1a] text-white sm:text-base 
//                                                     text-sm font-medium uppercase tracking-wider sm:px-12 sm:py-6 py-4 px-6 transition-colors max-sm:w-full max-sm:justify-center">
//                                         <FiPaperclip size={24}/>
//                                         Attach File
//                                     </label>
//                                 </div>
//                                 <div className="col-span-12 sm:py-10 py-6">
//                                     <label className="block text-xs font-medium uppercase tracking-wider text-white mb-2 md:mb-4 ">
//                                         Your budget for this project?
//                                     </label>
//                                     <div className="flex flex-wrap gap-2">
//                                         {budgetOptions.map((budget, index) => (
//                                             <button
//                                                 key={index}
//                                                 type="button"
//                                                 className="rounded-lg sm:px-6 sm:py-4 px-4 py-2 text-sm font-medium sm:text-base uppercase tracking-wide transition-colors bg-[#ffffff08] text-white hover:bg-[#ffffff1a]"
//                                             >
//                                                 {budget}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 </div>
//                                 <div className="my-4 flex max-[480px]:justify-center">
//                                     <ReCAPTCHA
//                                         ref={recaptchaRef}
//                                         sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
//                                         onChange={(token) => setCaptchaToken(token || "")}
//                                     />
//                                 </div>
//                                 <button
//                                         type="submit"
//                                         // disabled={isSubmitting}
//                                         className="primary_button relative group overflow-hidden mt-3 min-w-[180px]  uppercase"
//                                     >  
//                                     <span className="absolute top-0 left-[-100%] w-[60%] h-full bg-[linear-gradient(90deg,transparent,hsla(0,0%,100%,0.2),transparent)] animate-shine"></span>
//                                     <span className="relative z-10 flex items-center gap-2 justify-center">
//                                         Submit
//                                         <Image
//                                             src="/navbar/arrow.png"
//                                             alt="Get a Quote Arrow"
//                                             width={16}
//                                             height={16}
//                                             className="object-contain transition-transform duration-300 group-hover:translate-x-1"
//                                         />
//                                     </span>
//                                 </button>   
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//   );
// }



"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FiPaperclip } from "react-icons/fi";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import apiService from "@/lib/apiService";
import { useToast } from "@/components/ui/snackbar-provider";
import { GOOGLE_CAPTACH_CLIENT_KEY } from "@/config";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";
import Row from "@/components/Row";


const budgetOptions = [
    "UP TO $10K",
    "$10-$20K",
    "$20-$50K",
    "$50-$100K",
    "$100K +",
];


const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ALLOWED_MIME_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function hasDoubleExtension(filename: string): boolean {
    const parts = filename.split(".");
    if (parts.length <= 2) return false;
    const dangerousExts = [
        "php", "php3", "php4", "php5", "phtml", "asp", "aspx", "jsp", "exe", "sh", "bat",
        "cmd", "ps1", "py", "rb", "js", "ts", "html", "htm", "svg", "xml", "json", "sql",
    ];
    return parts.slice(1, -1).some((p) => dangerousExts.includes(p.toLowerCase()));
}

function validateFile(file: File): string | null {
    if (hasDoubleExtension(file.name))
        return "Invalid file: double extension detected";
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext))
        return `Only ${ALLOWED_EXTENSIONS.join(", ")} files are allowed`;
    if (file.type && !ALLOWED_MIME_TYPES.includes(file.type))
        return "Invalid file type. Only PDF and Word documents are allowed";
    if (file.size > MAX_FILE_SIZE_BYTES)
        return `File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB`;
    if (file.size === 0)
        return "File is empty. Please upload a valid document";
    return null;
}

// ── Zod schema (same fields as GeneralContactForm) ───────────────────────────
const contactSchema = z.object({
    firstname: z.string().min(2, "First name must be at least 2 characters"),
    lastname: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    subject: z.string().optional(),
    budget: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;



export default function ContactPageForm() {
    const { contactEmail, hrEmail, addressPrimary } = useWebsiteSettings();
    const { toast } = useToast();
    // const [captchaToken, setCaptchaToken] = useState("");
    // const recaptchaRef = useRef<ReCAPTCHA | null>(null);

    const recaptchaRef = useRef<ReCAPTCHA | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

    const [captchaToken, setCaptchaToken] = useState("");
    const [selectedBudget, setSelectedBudget] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const contactData = [
        {
            title: "Have a project to discuss?",
            company: "Inspire Techno Solutions",
            role: "Web Development Team",
            email: contactEmail,
        },
        {
            title: "Have a partnership in mind?",
            company: "Inspire Techno Solutions",
            role: "Partnerships & Growth",
            email: hrEmail,
        },
        {
            title: "Visit our location",
            company: addressPrimary,
            role: "Head Office",
        },
    ];

    const {
        linkedinLink,
    } = useWebsiteSettings();
    const {
        register,
        setValue,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileError(null);
        setFile(null);
        if (e.target.files?.[0]) {
            const selected = e.target.files[0];
            const err = validateFile(selected);
            if (err) {
                setFileError(err);
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
            }
            setFile(selected);
        }
    };

    const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
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
            const err = validateFile(file);
            if (err) { setFileError(err); return; }
        }

        setIsSubmitting(true);
        try {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (key !== "subject" && key !== "budget") {
                    formData.append(key, value);
                }
            });
            formData.append("subject", selectedSubjects[0]);
            formData.append("budget", selectedBudget);
            formData.append("source", "contact_page");
            formData.append("type", "Contact");

            formData.append("captchaToken", captchaToken);
            if (file) formData.append("file", file);

            const response = await apiService<{ success: boolean; message?: string }>(
                "/enquiries",
                { method: "POST", body: formData }
            );

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
        <section className="relative bg-[#0d1b2a] w-full z-20">
            {/* <div className="max-w-[90%] lg:max-w-[80%] mx-auto"> */}
            <Row >
                <div className="border-t border-[#ffffff14] pt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] items-start ">
                        <div className="lg:sticky lg:top-28 lg:mr-12">
                            {contactData.map((item, index) => (
                                <div key={index} className="mb-10">

                                    <div className=" text-left w-full common_htags left_htags">
                                    <h3 className="text-2xl font-semibold text-white mb-4">
                                        {item.title}
                                    </h3>
                                    </div>
                                    <div className="flex items-start gap-6 p-4 rounded-md bg-[#ffffff08] transition-colors w-full">

                                        <div className="w-14 h-20 rounded-md bg-[#ffffff06] flex items-center justify-center text-white font-semibold text-lg shrink-0">
                                            ITS
                                        </div>

                                        <div className="w-full">

                                            <div className="flex justify-between gap-2 items-center">
                                                <div>
                                                    <h4 className="text-white text-[16px] md:text-xl ">
                                                        {item.company}
                                                    </h4>
                                                    <p className="text-white opacity-60 text-sm mt-2">
                                                        {item.role}
                                                    </p>
                                                </div>

                                                <div className="inline-flex">
                                                     <a
                                                        href={linkedinLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <AiOutlineLinkedin className="text-[28px] text-white hover:text-[#d68029] transition-colors" />
                                                    </a>
                                                </div>
                                            </div>

                                            {item.email && (
                                                <a
                                                    href={`mailto:${item.email}`}
                                                    className="inline-flex items-start gap-2 text-base mt-8 text-white hover:underline transition-all break-all"
                                                >
                                                    <Image
                                                        src="/icon/Mail.png"
                                                        alt="mail"
                                                        width={20}
                                                        height={20}
                                                        className="shrink-0 filter brightness-0 invert mt-1"
                                                    />
                                                    {item.email}
                                                </a>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className=" flex flex-col gap-4 p-6 xl:p-8 overflow-hidden rounded-xl border border-white/10 bg-white/2 backdrop-blur-md shadow-[0_0_80px_10px_#0000001a] ">
                            <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div>
                                        <label className="block text-base tracking-wider text-white mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            {...register("firstname")}
                                            placeholder="First Name"
                                            className="flex h-10 w-full text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-ring 
                                            focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent border-0 border-b border-[#ffffff14] rounded-none 
                                            px-0 py-7 text-white opacity-60  placeholder:text-white/60 focus-visible:ring-0 focus-visible:border-[#d68029] focus-visible:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-base tracking-wider text-white mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            {...register("lastname")}
                                            placeholder="Last Name"
                                            className="flex h-10 w-full text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-ring 
                                            focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent border-0 border-b border-[#ffffff14] rounded-none 
                                            px-0 py-7 text-white opacity-60 placeholder:text-white/60 focus-visible:ring-0 focus-visible:border-[#d68029] focus-visible:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div>
                                        <label className="block text-base tracking-wider text-white mb-2 ">E-mail</label>
                                        <input
                                            type="email"
                                            {...register("email")}
                                            placeholder="Email"
                                            className="flex h-10 w-full text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-ring 
                                                focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent border-0 border-b border-[#ffffff14] rounded-none 
                                                px-0 py-7 text-white opacity-60 placeholder:text-white/60 focus-visible:ring-0 focus-visible:border-[#d68029] focus-visible:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-base tracking-wider text-white mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            {...register("phone", {
                                                required: "Phone number is required",
                                                pattern: { value: /^\d{10}$/, message: "Must be 10 digits" },
                                            })}
                                            maxLength={10}
                                            pattern="\d{10}"
                                            className="flex h-10 w-full text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-ring 
                                                focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent border-0 border-b border-[#ffffff14] rounded-none 
                                                px-0 py-7 text-white opacity-60 placeholder:text-white/60 focus-visible:ring-0 focus-visible:border-[#d68029] focus-visible:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>

                                    <label className="block text-lg font-medium uppercase tracking-wider text-white mb-3 md:mb-6 ">
                                        Select Subject?
                                    </label>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2 md:gap-3">
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
                                                <span className="text-white opacity-60 text-xs sm:text-[15px]">{subject}</span>
                                            </label>
                                        ))}
                                    </div>

                                </div>

                                <div>
                                    <label className="block text-base tracking-wider text-white mb-2 ">Message</label>
                                    <textarea
                                        rows={4}
                                        {...register("message")}
                                        placeholder="Write your message.."
                                        className="flex w-full text-sm ring-offset-background focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 
                                                bg-transparent border-0 border-b border-[#ffffff14] rounded-none px-0 py-7 text-white opacity-60 placeholder:text-white/60 focus-visible:ring-0 
                                                focus-visible:border-[#f97316] focus-visible:outline-none min-h-20 resize-none"
                                    />
                                </div>

                                <div className="space-y-4  md:space-y-6">
                                    <div className="text-white">
                                        <input ref={fileInputRef} id="RequestQuote" type="file"
                                            name="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm 
                                                file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 
                                                disabled:cursor-not-allowed disabled:opacity-50 hidden"></input>
                                        <label htmlFor="RequestQuote" className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-[#ffffff08] hover:bg-[#ffffff1a] text-white sm:text-base 
                                                    text-sm font-medium uppercase tracking-wider sm:px-12 sm:py-6 py-4 px-6 transition-colors max-sm:w-full max-sm:justify-center">
                                            <FiPaperclip size={24} />
                                            Attach File
                                        </label>
                                    </div>

                                    <div className="col-span-12 py-6 ">
                                        <label className="block text-lg font-medium uppercase tracking-wider text-white mb-3 md:mb-6 ">
                                            Your budget for this project?
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {budgetOptions.map((budget, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedBudget(budget)}
                                                    type="button"
                                                    className="rounded-lg hover:cursor-pointer    hover:text-white sm:px-6 sm:py-4 px-4 py-2 text-sm font-medium sm:text-base uppercase tracking-wide transition-colors bg-[#ffffff08] text-white hover:bg-[#ffffff1a]"
                                                >
                                                    {budget}
                                                </button>
                                            ))}
                                        </div>
                                    </div>


                                    <div className="flex justify-start my-4     ">
                                        <div className="scale-75 sm:scale-100 origin-left">
                                            <ReCAPTCHA
                                                ref={recaptchaRef}
                                                // sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                                                sitekey={GOOGLE_CAPTACH_CLIENT_KEY }
                                                onChange={(token) => setCaptchaToken(token || "")}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="primary_button relative group overflow-hidden mt-3 min-w-45 uppercase"
                                    >
                                        <span className="absolute top-0 -left-full w-[60%] h-full bg-[linear-gradient(90deg,transparent,hsla(0,0%,100%,0.2),transparent)] animate-shine"></span>
                                        <span className="relative z-10 flex items-center gap-2 justify-center">
                                            Submit
                                            <Image
                                                src="/navbar/arrow.png"
                                                alt="Get a Quote Arrow"
                                                width={16}
                                                height={16}
                                                className="object-contain transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        </span>
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </Row>
            {/* </div> */}
        </section>
    );
}