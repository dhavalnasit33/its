"use client";
import React from "react";

interface SafeEmailProps {
  email: string;
  className?: string;
}

export default function SafeEmail({ email, className = "" }: SafeEmailProps) {
  if (!email || !email.includes("@")) {
    return <span className={className}>{email}</span>;
  }

  const [user, domain] = email.split("@");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className={`hover:underline cursor-pointer ${className}`}
    >
      {user} <span className="opacity-70 text-[#d68029] font-medium">[at]</span>{" "}
      {domain.replace(/\./g, " [dot] ")}
    </a>
  );
}
