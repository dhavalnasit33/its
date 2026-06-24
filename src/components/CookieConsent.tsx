// "use client";

// import { useEffect, useState } from "react";
// import Button from "./Button";

// export default function CookieConsent() {
//   const [showBanner, setShowBanner] = useState(false);

// useEffect(() => {
//   const consent = localStorage.getItem("cookieConsent");

//   if (
//     consent === "accepted" ||
//     consent === "declined" ||
//     consent === "closed"
//   ) {
//     return;
//   }

//   const timer = setTimeout(() => {
//     setShowBanner(true);
//   }, 5000);

//   return () => clearTimeout(timer);
// }, []);

//   const acceptCookies = () => {
//     localStorage.setItem("cookieConsent", "accepted");
//     setShowBanner(false);
//   };

//   const declineCookies = () => {
//     localStorage.setItem("cookieConsent", "declined");
//     setShowBanner(false);
//   };

//   const closePopup = () => {
//      localStorage.setItem("cookieConsent", "closed");
//   setShowBanner(false);
// };
//   if (!showBanner) return null;

//   return (
//     <div
//   className="
//     fixed
//     bottom-6
//     left-6
//     z-[9999]
//     w-[350px]
//     max-w-[calc(100vw-32px)]
//     bg-white
//     rounded-xl
//     shadow-2xl
//     border-gray-200
//     p-6
//     animate-in
//   "
// >
//       <div className="max-w-7xl mx-auto px-3 flex flex-col   items-center justify-between gap-4">
//         <button
//   onClick={closePopup}
//   className="absolute top-4 right-4 text-gray-500 hover:text-black text-md cursor-pointer"
// >
//   ✕
// </button>
//         <h3 className="text-xl font-bold">Our Website uses cookies</h3>
//         <div className="text-sm text-gray-700 text-center">
//           We use cookies to improve your browsing experience, analyze website
//           traffic, and personalize content. By clicking "Accept", you consent
//           to our use of cookies.
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={declineCookies}
//             className="px-4 py-2 border border-gray-500 rounded-md cursor-pointer"
//           >
//             Decline
//           </button>

//           <Button 
//           className=" cursor-pointer"
//            bgColor="#D68029"
//            hoverColor="#0d1b2a"
//            onClick={acceptCookies}
//                 text="Accept"
//                 href=""
//             />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Button from "./Button";

const CLOSE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");

    // Accepted or Declined → never show again
    if (consent === "accepted" || consent === "declined") {
      return;
    }

    // Check if closed
    if (consent === "closed") {
      const closedAt = localStorage.getItem("cookieClosedAt");

      if (closedAt) {
        const now = Date.now();
        const diff = now - Number(closedAt);

        if (diff < CLOSE_DURATION) {
          return; // still within 24 hours
        }
      }
    }

    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.removeItem("cookieClosedAt");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    localStorage.removeItem("cookieClosedAt");
    setShowBanner(false);
  };

  const closePopup = () => {
    localStorage.setItem("cookieConsent", "closed");
    localStorage.setItem("cookieClosedAt", Date.now().toString());

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
        border border-gray-200
        p-6
      "
    >
      <button
        onClick={closePopup}
        className="absolute top-4 right-4 text-gray-500 hover:text-black text-md cursor-pointer"
      >
        ✕
      </button>

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-xl font-bold text-center">
          Our Website uses cookies
        </h3>

        <p className="text-sm text-gray-700 text-center">
          We use cookies to improve your browsing experience, analyze website
          traffic, and personalize content. By clicking "Accept", you consent
          to our use of cookies.
        </p>

        <div className="flex gap-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 border border-gray-500 rounded-md cursor-pointer"
          >
            Decline
          </button>

          <Button
            text="Accept"
            href="#"
            onClick={acceptCookies}
            bgColor="#D68029"
            hoverColor="#0d1b2a"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}