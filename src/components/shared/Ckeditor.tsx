"use client";

import dynamic from "next/dynamic";
import React from "react";

const CustomCKEditorInner = dynamic(() => import("./CkeditorInner"), {
    ssr: false,
    loading: () => (
        <div className="h-48 border rounded-md bg-slate-50 animate-pulse flex items-center justify-center text-slate-400">
            Loading editor...
        </div>
    ),
});

interface Props {
    value: string;
    onChange: (data: string) => void;
}

export default function CustomCKEditor({ value, onChange }: Props) {
    return <CustomCKEditorInner value={value} onChange={onChange} />;
}