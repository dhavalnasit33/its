"use client";

import * as React from "react";
import { useState, useRef, useCallback } from "react";
import { UploadCloud, Loader2, X } from "lucide-react";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";

const CLOUDINARY_CLOUD_NAME = "dctvxbvuz";
const CLOUDINARY_UPLOAD_PRESET = "ITS_ADMIN";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    disabled?: boolean;
    className?: string;
}

const ImageUpload = React.forwardRef<HTMLDivElement, ImageUploadProps>(
    ({ value = "", onChange, disabled = false, className = "" }, ref) => {
        const [isUploading, setIsUploading] = useState(false);
        const [isDeleting, setIsDeleting] = useState(false);
        const [isDragOver, setIsDragOver] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const inputRef = useRef<HTMLInputElement | null>(null);
        const { toast } = useToast();

        const busy = isUploading || isDeleting || disabled;

        // ── Upload ───────────────────────────────────────────────────────────────
        const uploadFile = useCallback(async (file: File) => {
            if (!file.type.startsWith("image/")) {
                setError("Only image files are allowed");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError("File size must be less than 5MB");
                return;
            }

            setError(null);
            setIsUploading(true);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

            try {
                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                    { method: "POST", body: formData }
                );

                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData?.error?.message || "Upload failed");
                }

                const data = await res.json();
                if (!data.secure_url) throw new Error("No URL returned from Cloudinary");

                onChange(data.secure_url);
                toast({
                    title: "Success",
                    description: "Image uploaded successfully.",
                });
            } catch (err: any) {
                toast({
                    title: "Error",
                    description: "Failed to upload image.",
                    variant: "destructive",
                });
                setError(err.message || "Upload failed");
            } finally {
                setIsUploading(false);
            }
        }, [onChange]);

        const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
            e.target.value = "";
            await uploadFile(file);
        };

        // ── Drag & Drop ──────────────────────────────────────────────────────────
        const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault(); e.stopPropagation();
            if (!busy && !value) setIsDragOver(true);
        };
        const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault(); e.stopPropagation();
            if (!busy && !value) setIsDragOver(true);
        };
        const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault(); e.stopPropagation();
            setIsDragOver(false);
        };
        const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault(); e.stopPropagation();
            setIsDragOver(false);
            if (busy) return;
            const file = e.dataTransfer.files?.[0];
            if (!file) return;
            await uploadFile(file);
        };

        // ── Delete — apiService directly use ────────────────────────────────────
        const handleDelete = async (e: React.MouseEvent) => {
            e.stopPropagation();
            if (!value) return;

            setError(null);
            setIsDeleting(true);

            try {
                await apiService("/delete-image", {
                    method: "DELETE",
                    body: { imageUrl: value } as any,
                });
                toast({
                    title: "Success",
                    description: "Image deleted successfully.",
                });
                onChange("");
            } catch (err: any) {
                toast({
                    title: "Error",
                    description: "Failed to delete image.",
                    variant: "destructive",
                });
                console.warn("Delete warning:", err.message);
                onChange("");
            } finally {
                setIsDeleting(false);
            }
        };

        const handleZoneClick = () => {
            if (!value && !busy) inputRef.current?.click();
        };

        return (
            <div ref={ref} className={`flex flex-col gap-2 ${className}`}>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={busy}
                />

                <div
                    onClick={handleZoneClick}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={[
                        "relative border-2 border-dashed rounded-xl overflow-hidden group",
                        "flex justify-center items-center",
                        className ||"h-[170px] w-[220px]",
                        "transition-all duration-200",
                        isDragOver
                            ? "border-primary bg-primary/5 scale-[1.02]"
                            : "border-gray-300 bg-gray-50",
                        !value && !busy ? "cursor-pointer hover:border-primary hover:bg-gray-100" : "",
                        busy ? "opacity-60 cursor-not-allowed" : "",
                    ].join(" ")}
                >
                    {value ? (
                        <>
                            <img src={value} alt="Uploaded preview" className="h-full w-full object-contain" />

                            {!busy && (
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-200 flex items-center justify-center pointer-events-none">
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                                        className="opacity-0 group-hover:opacity-100 bg-white/90 text-gray-700 text-xs font-medium px-3 py-1 rounded-full shadow transition-opacity duration-150 pointer-events-auto"
                                    >
                                        Change
                                    </button>
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={busy}
                                title="Remove image"
                                className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 shadow-md hover:bg-red-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                            >
                                {isDeleting
                                    ? <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                                    : <X className="h-4 w-4 text-gray-700" />
                                }
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col items-center text-center px-4 select-none pointer-events-none">
                            {isUploading ? (
                                <>
                                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                                    <p className="text-sm text-gray-500">Uploading…</p>
                                </>
                            ) : isDragOver ? (
                                <>
                                    <UploadCloud className="h-10 w-10 text-primary mb-2 animate-bounce" />
                                    <p className="text-sm font-medium text-primary">Drop to upload</p>
                                </>
                            ) : (
                                <>
                                    <UploadCloud className="h-9 w-9 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500 leading-snug">
                                        Drag &amp; drop image here<br />
                                        or <span className="text-primary underline font-medium">click to upload</span>
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">Max 5MB</p>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
            </div>
        );
    }
);

ImageUpload.displayName = "ImageUpload";
export default ImageUpload;