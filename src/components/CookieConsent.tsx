"use client";

import { useEffect, useState } from "react";
import Button from "./Button";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
useEffect(() => {
  const consent = localStorage.getItem("cookieConsent");

  if (!consent) {
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 5000); // show after 5 seconds

    return () => clearTimeout(timer);
  }
}, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  const closePopup = () => {
  setShowBanner(false);
};
  if (!showBanner) return null;

  return (
    <div
  className="
    fixed
    bottom-6
    left-6
    z-[9999]
    w-[350px]
    max-w-[calc(100vw-32px)]
    bg-white
    rounded-xl
    shadow-2xl
    border-gray-200
    p-6
    animate-in
  "
>
      <div className="max-w-7xl mx-auto px-3 flex flex-col   items-center justify-between gap-4">
        <button
  onClick={closePopup}
  className="absolute top-4 right-4 text-gray-500 hover:text-black text-md"
>
  ✕
</button>
        <h3 className="text-xl font-bold">Our Website uses cookies</h3>
        <div className="text-sm text-gray-700">
          We use cookies to improve your browsing experience, analyze website
          traffic, and personalize content. By clicking "Accept", you consent
          to our use of cookies.
        </div>

        <div className="flex gap-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 border border-gray-500 rounded-md"
          >
            Decline
          </button>

          {/* <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Accept
          </button> */}
          <Button
           bgColor="#D68029"
                                hoverColor="#0d1b2a"
           onClick={acceptCookies}
                text="Accept"
                href="#contact-form-section"
            />
        </div>
      </div>
    </div>
  );
}