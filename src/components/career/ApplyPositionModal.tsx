// "use client";

// import { useForm, SubmitHandler, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//     Dialog,
//     DialogContent,
//     DialogTitle,
//     TextField,
//     Button,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     FormHelperText,
//     CircularProgress,
//     IconButton,
// } from "@mui/material";
// import { LuX, LuCloudUpload } from "react-icons/lu";

// import { useEffect, useRef, useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha";

// import apiService from "@/lib/apiService";
// import { useToast } from "@/components/ui/snackbar-provider";
// import {
//     OpenningPosition,
//     ApplyPositionFormValues,
//     SingleResponse,
// } from "@/types";

// // ─────────────────────────────────────────────
// // ✅ File Security Constants (same as GeneralContactForm)
// // ─────────────────────────────────────────────
// const MAX_FILE_SIZE_MB = 5;
// const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
// const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
// const ALLOWED_MIME_TYPES = [
//     "application/pdf",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
// ];

// // Double extension attack check: file.php.pdf, script.exe.docx reject karo
// function hasDoubleExtension(filename: string): boolean {
//     const parts = filename.split(".");
//     if (parts.length <= 2) return false;

//     const dangerousExts = [
//         "php", "php3", "php4", "php5", "phtml",
//         "asp", "aspx", "jsp", "exe", "sh", "bat",
//         "cmd", "ps1", "py", "rb", "js", "ts",
//         "html", "htm", "svg", "xml", "json", "sql",
//     ];
//     const middleParts = parts.slice(1, -1);
//     return middleParts.some((p) => dangerousExts.includes(p.toLowerCase()));
// }

// function validateFile(file: File): string | null {
//     // 1. Double extension check
//     if (hasDoubleExtension(file.name)) {
//         return "Invalid file: double extension detected (e.g. file.php.pdf not allowed)";
//     }
//     // 2. Extension check
//     const ext = "." + file.name.split(".").pop()?.toLowerCase();
//     if (!ALLOWED_EXTENSIONS.includes(ext)) {
//         return `Only ${ALLOWED_EXTENSIONS.join(", ")} files are allowed`;
//     }
//     // 3. MIME type check
//     if (file.type && !ALLOWED_MIME_TYPES.includes(file.type)) {
//         return "Invalid file type. Only PDF and Word documents are allowed";
//     }
//     // 4. Size check
//     if (file.size > MAX_FILE_SIZE_BYTES) {
//         return `File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB`;
//     }
//     // 5. Empty file check
//     if (file.size === 0) {
//         return "File is empty. Please upload a valid document";
//     }
//     return null; // ✅ Valid
// }

// // ─────────────────────────────────────────────
// // Form Validation Schema
// // ─────────────────────────────────────────────
// const applySchema = z.object({
//     name: z.string().min(3, "Full name must be at least 3 characters"),
//     email: z.string().email("Invalid email address"),
//     phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
//     graduation: z.string().min(2, "Graduation is required"),
//     experience: z.string().min(1, "Experience is required"),
//     positionApplied: z.string().min(1, "Please select a position"),
//     currentCTC: z.string().min(1, "Current CTC is required"),
//     noticePeriod: z.string().min(1, "Notice period is required"),
//     message: z.string().min(10, "Message must be at least 10 characters"),
//     file: z.any().optional(),
// });

// interface ApplyPositionModalProps {
//     open: boolean;
//     onClose: () => void;
//     positions: OpenningPosition[];
//     selectedPositionId?: string;
// }

// export default function ApplyPositionModal({
//     open,
//     onClose,
//     positions,
//     selectedPositionId,
// }: ApplyPositionModalProps) {
//     const { toast } = useToast();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [captchaToken, setCaptchaToken] = useState<string | null>(null);
//     const recaptchaRef = useRef<ReCAPTCHA | null>(null);
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [fileError, setFileError] = useState<string | null>(null);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const {
//         register,
//         handleSubmit,
//         control,
//         reset,
//         formState: { errors },
//         setValue,
//     } = useForm<ApplyPositionFormValues>({
//         resolver: zodResolver(applySchema),
//         defaultValues: {
//             positionApplied: selectedPositionId || "",
//             name: "",
//             email: "",
//             phone: "",
//             graduation: "",
//             experience: "",
//             currentCTC: "",
//             noticePeriod: "",
//             message: "",
//         },
//     });

//     useEffect(() => {
//         if (selectedPositionId) {
//             setValue("positionApplied", selectedPositionId);
//         }
//     }, [selectedPositionId, setValue]);

//     // ✅ Secure file change handler
//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFileError(null);
//         setSelectedFile(null);

//         if (e.target.files && e.target.files[0]) {
//             const file = e.target.files[0];
//             const error = validateFile(file);

//             if (error) {
//                 setFileError(error);
//                 // Input reset karo
//                 if (fileInputRef.current) fileInputRef.current.value = "";
//                 return;
//             }

//             setSelectedFile(file);
//         }
//     };

//     // ✅ Remove selected file
//     const handleRemoveFile = () => {
//         setSelectedFile(null);
//         setFileError(null);
//         if (fileInputRef.current) fileInputRef.current.value = "";
//     };

//     const onSubmit: SubmitHandler<ApplyPositionFormValues> = async (data) => {
//         if (!captchaToken) {
//             toast("Please complete the CAPTCHA verification", "error");
//             return;
//         }

//         if (selectedFile) {
//             const error = validateFile(selectedFile);
//             if (error) {
//                 setFileError(error);
//                 return;
//             }
//         }

//         setIsSubmitting(true);
//         const formData = new FormData();

//         Object.entries(data).forEach(([key, value]) => {
//             if (key !== "file") {
//                 formData.append(key, value as string);
//             }
//         });

//         if (selectedFile) {
//             formData.append("file", selectedFile);
//         }

//         formData.append("captchaToken", captchaToken);

//         try {
//             const response = await apiService<SingleResponse<ApplyPositionFormValues>>(
//                 "/applyPosition",
//                 { method: "POST", body: formData }
//             );

//             if (response.success) {
//                 toast("Application submitted successfully!", "success");
//                 reset();
//                 setSelectedFile(null);
//                 setFileError(null);
//                 if (fileInputRef.current) fileInputRef.current.value = "";
//                 setCaptchaToken(null);
//                 (recaptchaRef.current as any)?.reset();
//                 onClose();
//             } else {
//                 throw new Error(response.message || "Failed to submit application");
//             }
//         } catch (error: any) {
//             toast(error.message || "An error occurred", "error");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const graduationOptions = [
//         "10th/12th Pass", "BCA", "B.Tech", "BCS",
//         "BBA", "MCA", "M.Tech", "M.Sc(IT)", "Other",
//     ];

//     return (
//         <Dialog
//             open={open}
//             onClose={onClose}
//             fullWidth
//             maxWidth="lg"
//             PaperProps={{
//                 sx: {
//                     borderRadius: { xs: "10px", md: "50px" },
//                     p: { xs: 1, sm: 5, md: 7 },
//                     top: "-5px",
//                 },
//             }}
//         >
//             <DialogTitle
//                 sx={{
//                     m: 0,
//                     fontWeight: "bold",
//                     fontSize: { xs: "18px", md: "1.5rem" },
//                     textAlign: "center",
//                 }}
//                 className="flex flex-row w-full justify-between sm:justify-center px-4 sm:px-0 items-center"
//             >
//                 <span className="w-full text-center">APPLY FOR POSITION</span>
//                 <IconButton
//                     aria-label="close"
//                     onClick={onClose}
//                     sx={{ color: (theme) => theme.palette.grey[500] }}
//                     className="relative sm:absolute sm:right-0 sm:top-0 flex justify-end"
//                 >
//                     <LuX />
//                 </IconButton>
//             </DialogTitle>

//             <DialogContent>
//                 <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 mt-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                         <TextField
//                             {...register("name")}
//                             label="Full Name*"
//                             error={!!errors.name}
//                             helperText={errors.name?.message}
//                             fullWidth
//                             variant="outlined"
//                             size="small"
//                         />
//                         <TextField
//                             {...register("phone")}
//                             label="Mobile No*"
//                             error={!!errors.phone}
//                             helperText={errors.phone?.message}
//                             fullWidth
//                             variant="outlined"
//                             size="small"
//                         />
//                         <TextField
//                             {...register("email")}
//                             label="Email Id*"
//                             type="email"
//                             error={!!errors.email}
//                             helperText={errors.email?.message}
//                             fullWidth
//                             variant="outlined"
//                             size="small"
//                         />

//                         <FormControl fullWidth error={!!errors.graduation} variant="outlined" size="small">
//                             <InputLabel id="graduation-label">Graduation*</InputLabel>
//                             <Controller
//                                 name="graduation"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <Select labelId="graduation-label" label="Graduation*" {...field}>
//                                         {graduationOptions.map((option) => (
//                                             <MenuItem key={option} value={option}>{option}</MenuItem>
//                                         ))}
//                                     </Select>
//                                 )}
//                             />
//                             <FormHelperText>{errors.graduation?.message}</FormHelperText>
//                         </FormControl>

//                         <TextField
//                             {...register("experience")}
//                             label="Total Experience*"
//                             error={!!errors.experience}
//                             helperText={errors.experience?.message}
//                             fullWidth
//                             variant="outlined"
//                             size="small"
//                         />

//                         <FormControl fullWidth error={!!errors.positionApplied} variant="outlined" size="small">
//                             <InputLabel id="position-label">Position Applied For*</InputLabel>
//                             <Controller
//                                 name="positionApplied"
//                                 control={control}
//                                 defaultValue={selectedPositionId || ""}
//                                 render={({ field }) => (
//                                     <Select labelId="position-label" label="Position Applied For*" {...field}>
//                                         {positions.map((pos) => (
//                                             <MenuItem key={pos._id} value={pos._id}>{pos.name}</MenuItem>
//                                         ))}
//                                     </Select>
//                                 )}
//                             />
//                             <FormHelperText>{errors.positionApplied?.message}</FormHelperText>
//                         </FormControl>

//                         <TextField
//                             {...register("currentCTC")}
//                             label="Current CTC*"
//                             error={!!errors.currentCTC}
//                             helperText={errors.currentCTC?.message}
//                             fullWidth
//                             variant="outlined"
//                             size="small"
//                         />
//                         <TextField
//                             {...register("noticePeriod")}
//                             label="Notice Period*"
//                             error={!!errors.noticePeriod}
//                             helperText={errors.noticePeriod?.message}
//                             fullWidth
//                             variant="outlined"
//                             size="small"
//                         />
//                     </div>

//                     <TextField
//                         {...register("message")}
//                         label="Message"
//                         multiline
//                         rows={3}
//                         error={!!errors.message}
//                         helperText={errors.message?.message}
//                         fullWidth
//                         variant="outlined"
//                     />

//                     {/* ✅ Secure File Upload Section */}
//                     <div className="mt-4">
//                         <p className="text-sm font-medium text-gray-700 mb-2">
//                             Upload your resume
//                             <span className="text-gray-400 font-normal ml-1">
//                                 (.pdf, .doc, .docx — max {MAX_FILE_SIZE_MB}MB)
//                             </span>
//                         </p>

//                         {/* Upload area — file selected nai hoy tyare show thay */}
//                         {!selectedFile ? (
//                             <label
//                                 htmlFor="resume-upload"
//                                 className={`flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-dashed rounded-md cursor-pointer focus:outline-none ${fileError
//                                     ? "border-red-400 bg-red-50"
//                                     : "border-gray-300 hover:border-orange-400"
//                                     }`}
//                             >
//                                 <LuCloudUpload className="text-4xl text-gray-400 mb-1" />
//                                 <span className="font-medium text-gray-600 text-sm">
//                                     Click or drag a file to this area to upload.
//                                 </span>
//                                 <span className="text-xs text-gray-400 mt-1">
//                                     PDF, DOC, DOCX only · Max {MAX_FILE_SIZE_MB}MB
//                                 </span>
//                                 {/* ✅ register("file") hatavyu — custom handler use karo */}
//                                 <input
//                                     ref={fileInputRef}
//                                     type="file"
//                                     id="resume-upload"
//                                     className="hidden"
//                                     accept=".doc,.docx,.pdf"
//                                     onChange={handleFileChange}
//                                 />
//                             </label>
//                         ) : (
//                             /* ✅ Selected file preview with remove button */
//                             <div className="flex items-center justify-between border border-green-300 bg-green-50 rounded-lg px-4 py-3">
//                                 <div className="flex items-center gap-2 min-w-0">
//                                     <svg className="w-5 h-5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                                         <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
//                                     </svg>
//                                     <div className="min-w-0">
//                                         <p className="text-sm font-medium text-gray-700 truncate">
//                                             {selectedFile.name}
//                                         </p>
//                                         <p className="text-xs text-gray-500">
//                                             {(selectedFile.size / 1024).toFixed(1)} KB
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <button
//                                     type="button"
//                                     onClick={handleRemoveFile}
//                                     className="ml-3 text-gray-400 hover:text-red-500 transition shrink-0"
//                                     title="Remove file"
//                                 >
//                                     <LuX size={18} />
//                                 </button>
//                             </div>
//                         )}

//                         {/* ✅ File error message */}
//                         {fileError && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                                 <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                                 </svg>
//                                 {fileError}
//                             </p>
//                         )}
//                     </div>

//                     <div className="my-4 flex justify-start">
//                          <ReCAPTCHA
//                             ref={recaptchaRef}
//                             sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
//                             onChange={(token) => setCaptchaToken(token)}
//                         /> 
//                     </div>

//                     <Button
//                         type="submit"
//                         variant="contained"
//                         disabled={isSubmitting}
//                         fullWidth
//                         sx={{
//                             backgroundColor: "#D68029",
//                             "&:hover": { backgroundColor: "#B86E23" },
//                             py: 1.5,
//                             textTransform: "none",
//                             fontSize: "1.1rem",
//                             fontWeight: "bold",
//                             borderRadius: "8px",
//                         }}
//                     >
//                         {isSubmitting ? (
//                             <CircularProgress size={24} color="inherit" />
//                         ) : (
//                             "Submit Application"
//                         )}
//                     </Button>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// }

"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    CircularProgress,
    IconButton,
} from "@mui/material";
import { LuX, LuCloudUpload } from "react-icons/lu";

import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import apiService from "@/lib/apiService";
import { useToast } from "@/components/ui/snackbar-provider";
import {
    OpenningPosition,
    ApplyPositionFormValues,
    SingleResponse,
} from "@/types";

// ─────────────────────────────────────────────
// ✅ File Security Constants (same as GeneralContactForm)
// ─────────────────────────────────────────────
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ALLOWED_MIME_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Double extension attack check: file.php.pdf, script.exe.docx reject karo
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
        return "Invalid file: double extension detected (e.g. file.php.pdf not allowed)";
    }
    // 2. Extension check
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return `Only ${ALLOWED_EXTENSIONS.join(", ")} files are allowed`;
    }
    // 3. MIME type check
    if (file.type && !ALLOWED_MIME_TYPES.includes(file.type)) {
        return "Invalid file type. Only PDF and Word documents are allowed";
    }
    // 4. Size check
    if (file.size > MAX_FILE_SIZE_BYTES) {
        return `File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB`;
    }
    // 5. Empty file check
    if (file.size === 0) {
        return "File is empty. Please upload a valid document";
    }
    return null; // ✅ Valid
}

// ─────────────────────────────────────────────
// Form Validation Schema
// ─────────────────────────────────────────────
const applySchema = z.object({
    name: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    graduation: z.string().min(2, "Graduation is required"),
    experience: z.string().min(1, "Experience is required"),
    positionApplied: z.string().min(1, "Please select a position"),
    currentCTC: z.string().min(1, "Current CTC is required"),
    noticePeriod: z.string().min(1, "Notice period is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    file: z.any().optional(),
});

interface ApplyPositionModalProps {
    open: boolean;
    onClose: () => void;
    positions: OpenningPosition[];
    selectedPositionId?: string;
}

export default function ApplyPositionModal({
    open,
    onClose,
    positions,
    selectedPositionId,
}: ApplyPositionModalProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
        setValue,
    } = useForm<ApplyPositionFormValues>({
        resolver: zodResolver(applySchema),
        defaultValues: {
            positionApplied: selectedPositionId || "",
            name: "",
            email: "",
            phone: "",
            graduation: "",
            experience: "",
            currentCTC: "",
            noticePeriod: "",
            message: "",
        },
    });

    useEffect(() => {
        if (selectedPositionId) {
            setValue("positionApplied", selectedPositionId);
        }
    }, [selectedPositionId, setValue]);

    // ✅ Secure file change handler
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileError(null);
        setSelectedFile(null);

        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const error = validateFile(file);

            if (error) {
                setFileError(error);
                // Input reset karo
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
            }

            setSelectedFile(file);
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
        setSelectedFile(null);
        const droppedFile = e.dataTransfer.files?.[0];
        if (!droppedFile) return;
        const error = validateFile(droppedFile);
        if (error) {
            setFileError(error);
            return;
        }
        setSelectedFile(droppedFile);
    };

    // ✅ Remove selected file
    const handleRemoveFile = () => {
        setSelectedFile(null);
        setFileError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const onSubmit: SubmitHandler<ApplyPositionFormValues> = async (data) => {
        if (!captchaToken) {
            toast("Please complete the CAPTCHA verification", "error");
            return;
        }

        if (selectedFile) {
            const error = validateFile(selectedFile);
            if (error) {
                setFileError(error);
                return;
            }
        }

        setIsSubmitting(true);
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key !== "file") {
                formData.append(key, value as string);
            }
        });

        if (selectedFile) {
            formData.append("file", selectedFile);
        }

        formData.append("captchaToken", captchaToken);

        try {
            const response = await apiService<SingleResponse<ApplyPositionFormValues>>(
                "/applyPosition",
                { method: "POST", body: formData }
            );

            if (response.success) {
                toast("Application submitted successfully!", "success");
                reset();
                setSelectedFile(null);
                setFileError(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
                setCaptchaToken(null);
                (recaptchaRef.current as any)?.reset();
                onClose();
            } else {
                throw new Error(response.message || "Failed to submit application");
            }
        } catch (error: any) {
            toast(error.message || "An error occurred", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const graduationOptions = [
        "10th/12th Pass", "BCA", "B.Tech", "BCS",
        "BBA", "MCA", "M.Tech", "M.Sc(IT)", "Other",
    ];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
            PaperProps={{
                sx: {
                    borderRadius: { xs: "10px", md: "50px" },
                    p: { xs: 1, sm: 5, md: 7 },
                    top: "-5px",
                },
            }}
        >
            <DialogTitle
                sx={{
                    m: 0,
                    fontWeight: "bold",
                    fontSize: { xs: "18px", md: "1.5rem" },
                    textAlign: "center",
                }}
                className="flex flex-row w-full justify-between sm:justify-center px-4 sm:px-0 items-center"
            >
                <span className="w-full text-center">APPLY FOR POSITION</span>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ color: (theme) => theme.palette.grey[500] }}
                    className="relative sm:absolute sm:right-0 sm:top-0 flex justify-end"
                >
                    <LuX />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <TextField
                            {...register("name")}
                            label="Full Name*"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            {...register("phone")}
                            label="Mobile No*"
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            {...register("email")}
                            label="Email Id*"
                            type="email"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />

                        <FormControl fullWidth error={!!errors.graduation} variant="outlined" size="small">
                            <InputLabel id="graduation-label">Graduation*</InputLabel>
                            <Controller
                                name="graduation"
                                control={control}
                                render={({ field }) => (
                                    <Select labelId="graduation-label" label="Graduation*" {...field}>
                                        {graduationOptions.map((option) => (
                                            <MenuItem key={option} value={option}>{option}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            <FormHelperText>{errors.graduation?.message}</FormHelperText>
                        </FormControl>

                        <TextField
                            {...register("experience")}
                            label="Total Experience*"
                            error={!!errors.experience}
                            helperText={errors.experience?.message}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />

                        <FormControl fullWidth error={!!errors.positionApplied} variant="outlined" size="small">
                            <InputLabel id="position-label">Position Applied For*</InputLabel>
                            <Controller
                                name="positionApplied"
                                control={control}
                                defaultValue={selectedPositionId || ""}
                                render={({ field }) => (
                                    <Select labelId="position-label" label="Position Applied For*" {...field}>
                                        {positions.map((pos) => (
                                            <MenuItem key={pos._id} value={pos._id}>{pos.name}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            <FormHelperText>{errors.positionApplied?.message}</FormHelperText>
                        </FormControl>

                        <TextField
                            {...register("currentCTC")}
                            label="Current CTC*"
                            error={!!errors.currentCTC}
                            helperText={errors.currentCTC?.message}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            {...register("noticePeriod")}
                            label="Notice Period*"
                            error={!!errors.noticePeriod}
                            helperText={errors.noticePeriod?.message}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </div>

                    <TextField
                        {...register("message")}
                        label="Message"
                        multiline
                        rows={3}
                        error={!!errors.message}
                        helperText={errors.message?.message}
                        fullWidth
                        variant="outlined"
                    />

                    {/* ✅ Secure File Upload Section */}
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                            Upload your resume
                            <span className="text-gray-400 font-normal ml-1">
                                (.pdf, .doc, .docx — max {MAX_FILE_SIZE_MB}MB)
                            </span>
                        </p>

                        {/* Upload area — file selected nai hoy tyare show thay */}
                        {!selectedFile ? (
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-dashed rounded-md cursor-pointer focus:outline-none ${fileError
                                    ? "border-red-400 bg-red-50"
                                    : isDragging
                                        ? "border-green-400 bg-green-50"
                                        : "border-gray-300 hover:border-orange-400"
                                    }`}
                            >
                                <LuCloudUpload className="text-4xl text-gray-400 mb-1" />
                                <span className="font-medium text-gray-600 text-sm">
                                    Click or drag a file to this area to upload.
                                </span>
                                <span className="text-xs text-gray-400 mt-1">
                                    PDF, DOC, DOCX only · Max {MAX_FILE_SIZE_MB}MB
                                </span>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    id="resume-upload"
                                    className="hidden"
                                    accept=".doc,.docx,.pdf"
                                    onChange={handleFileChange}
                                />
                            </div>
                        ) : (
                            /* ✅ Selected file preview with remove button */
                            <div className="flex items-center justify-between border border-green-300 bg-green-50 rounded-lg px-4 py-3">
                                <div className="flex items-center gap-2 min-w-0">
                                    <svg className="w-5 h-5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                    </svg>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-700 truncate">
                                            {selectedFile.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {(selectedFile.size / 1024).toFixed(1)} KB
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRemoveFile}
                                    className="ml-3 text-gray-400 hover:text-red-500 transition shrink-0"
                                    title="Remove file"
                                >
                                    <LuX size={18} />
                                </button>
                            </div>
                        )}

                        {/* ✅ File error message */}
                        {fileError && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {fileError}
                            </p>
                        )}
                    </div>

                    <div className="my-4 flex justify-start">
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                            onChange={(token) => setCaptchaToken(token)}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        fullWidth
                        sx={{
                            backgroundColor: "#D68029",
                            "&:hover": { backgroundColor: "#B86E23" },
                            py: 1.5,
                            textTransform: "none",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            borderRadius: "8px",
                        }}
                    >
                        {isSubmitting ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Submit Application"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}