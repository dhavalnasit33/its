"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="relative min-h-screen w-full max-w-full flex flex-col items-center justify-center common_background_gradient text-center overflow-hidden pt-12">
            {/* Background Tape */}
            <div className="absolute -top-10 md:-top-16 lg:-top-40 w-full flex justify-center z-0">
                <Image
                    src="/Group 1000013360.png"
                    alt="Not Found Tape"
                    // Use fill to make the image fill its container
                    // Make sure the parent div has position: relative
                    width={951}
                    height={594}
                    style={{ objectFit: 'contain' }}
                    className="  w-full max-w-full"
                    priority
                    quality={100} // Set quality to 100 for best visual fidelity
                />
            </div>

            {/* 404 Image */}
            <div className="relative z-10 mt-28 md:mt-48">
                <Image
                    src="/Group 1000013337.png"
                    alt="404 Illustration"
                    width={420} // Ensure this is the actual width of the image
                    height={220} // Ensure this is the actual height of the image
                    className="mx-auto"
                    priority
                    quality={100} // Set quality to 100 for best visual fidelity
                />
            </div>

            {/* Text */}
            <div className="relative z-10 mt-8 px-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    There&apos;s NOTHING here...
                </h1>
                <p className="text-gray-600 mt-3 max-w-lg mx-auto text-sm md:text-base">
                    Maybe the page you&apos;re looking for is not found or never existed.
                </p>
            </div>

            {/* Button */}
            <div className="relative z-10 mt-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-[#d68029] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#c46f1f] transition-all"
                >
                    Back to home →
                </Link>
            </div>
        </div>
    );
}