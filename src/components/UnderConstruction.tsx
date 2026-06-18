"use client";

export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
        🚧 Under Construction
      </h1>

      <p className="mt-4 text-lg text-gray-600 max-w-xl">
        We're currently working on improving our website.
        Please check back soon.
      </p>

      <a
        href="https://api.whatsapp.com/send?phone=919327220484"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 bg-[#25D366] text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
      >
        Contact Us on WhatsApp
      </a>
    </div>
  );
}