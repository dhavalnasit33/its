"use client" ;

import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
     const { whatsApplink } = useWebsiteSettings();
    
  return (
    <div  className="fixed bottom-10 right-10 z-[999]">
    <div className="absolute inset-0 w-12 h-12 rounded-full whatsapp-ring" />
    <a
     href={whatsApplink}
    target="_blank"
    rel="noopener noreferrer"
      className="
        relative
          w-12
          h-12
          bg-[#25D366]
          rounded-full
          flex
          items-center
          justify-center
          shadow-lg
          hover:scale-110
          transition-all
          duration-300
      "
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-white text-2xl" />
    </a>
    </div >
  );
}