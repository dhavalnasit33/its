// src/components/CustomNode.tsx
"use client";

import Image from "next/image";
import React from "react";
import { Handle, Position, NodeProps } from "reactflow";

export type CustomNodeData = {
  label: string;
  variant: "category" | "technology";
  imageUrl?: string;
};

function CustomNode({ data }: NodeProps<CustomNodeData>) {
  const baseClasses =
    "rounded-lg shadow-md transition-shadow duration-200 pointer-events-auto";
  const categoryClasses = "bg-slate-800 text-white font-bold px-5 py-2.5";
  const techWrapper =
    "bg-white border-2 border-[#d68029] w-40 h-28 relative overflow-hidden group";

  const wrapperClass = `${baseClasses} ${
    data.variant === "category" ? categoryClasses : techWrapper
  }`;

  return (
    <div
      className={wrapperClass}
      role={data.variant === "technology" ? "button" : undefined}
      tabIndex={0}
    >
      {/* Technology Node */}
      {data.variant === "technology" && data.imageUrl && (
        <>
          {
            data.imageUrl ? (
              <Image
                src={data.imageUrl}
                alt={data.label}
                width={60}
                height={60}
                className="absolute top-2 left-12 w-15 h-15 object-contain"
                draggable={false}
              />

            ) : (
              <div className="absolute top-2 left-12 w-15 h-15 flex items-center justify-center bg-gray-200 text-gray-500">
                No Image
              </div>
            )
          }

          {/* Label - Always Visible, hover changes color */}
          <div className="absolute bottom-0 left-0 w-full text-center border-t border-t-[#7a7a7a] bg-white text-gray-900 transition-colors duration-300 group-hover:bg-[#d68029] group-hover:text-white">
            <span className="font-semibold block py-1">{data.label}</span>
          </div>
        </>
      )}

      {/* Category Node */}
      {data.variant === "category" && (
        <span className="text-md">{data.label}</span>
      )}

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="bg-slate-400!"
        style={{ zIndex: 20 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="bg-slate-400!"
        style={{ zIndex: 20 }}
      />
    </div>
  );
}

export default CustomNode;
