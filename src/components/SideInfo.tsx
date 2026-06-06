"use client";

import Image from "next/image";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";

export default function SideBlurb() {
  const { hrEmail, phonePrimary, phonePrimaryClean, microsoftHandle } = useWebsiteSettings();

  const items = [
    {
      icon: "/icon/Mail.png",
      text: hrEmail,
      link: `mailto:${hrEmail}`,
    },
    {
      icon: "/icon/Ringer Volume.png",
      text: phonePrimary,
      link: `tel:${phonePrimaryClean}`,
    },
    {
      icon: "/icon/Microsoft Teams 2019.png",
      text: "Microsoft",
      link: microsoftHandle.startsWith("http") ? microsoftHandle : `https://teams.microsoft.com/l/chat/0/0?users=${microsoftHandle}`,
    },
  ];

  return (
    <div className="fixed right-0 top-[270px] flex flex-col gap-1 z-[9999]">
      {items.map((item, index) => (
        <a
          key={index}
          href={item.link}
          style={{ top: `${index * 50}px` }}
          className="absolute 
                    right-0 sm:right-[-2px] hover:right-0
                    flex gap-2 items-center
                    w-[40px]
                    hover:w-[auto] h-[40px]
                    hover:pr-2.5 sm:hover:pr-[28px]
                    text-white
                    transition-all duration-300 p-2 px-2.5 
                    bg-gradient-to-r from-[#d68029] to-[#f7b733]
                    hover:scale-110  sm:hover:scale-100 "
        >
          {/* ICON */}
          <Image
            src={item.icon}
            alt={item.text}
            width={20}
            height={20}
            className="filter brightness-0 invert w-5 h-5 object-contain shrink-0"
          />

          {/* TEXT */}
          {/* <span className="text-sm whitespace-nowrap"> */}
          <span className="hidden sm:inline text-sm whitespace-nowrap">
            {item.text}
          </span>
        </a>
      ))}
    </div>
  );
}