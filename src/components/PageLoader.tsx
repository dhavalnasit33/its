"use client";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-white">
      {/* <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#d68029]"></div> */}
        <Image
        src="/LoderIcon.png" // place image in public folder
        alt="Loading"
        width={80}
        height={80}
        className="transition-all duration-750 delay-300 ease-in-out"
      />
    </div>
  );
};

export default Loader;
