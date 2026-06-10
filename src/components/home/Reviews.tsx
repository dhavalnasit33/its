"use client";

import React, { useEffect, useState } from "react";
import Motion from "@/components/motionbar";
import Image from "next/image";
import apiService from "@/lib/apiService";

interface ReviewLogo {
  _id?: string;
  name: string;
  image: string;
}

const marqueeStyles = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee-infinite {
    display: flex;
    width: max-content;
    animation: marquee 25s linear infinite;
  }
  .animate-marquee-infinite:hover {
    animation-play-state: paused;
  }
`;

const Reviews: React.FC = () => {
  const [logos, setLogos] = useState<ReviewLogo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await apiService<{ success: boolean; data: ReviewLogo[] }>(
          "/read-our-review"
        );
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          setLogos(res.data);
        } else {
          // Fallback to static defaults
          setLogos([
            { name: "Upwork", image: "/home/upwork-logo.png" },
            { name: "Clutch", image: "/home/clutch-logo.png" },
            { name: "Google Reviews", image: "/home/google-logo.png" },
            { name: "Glassdoor", image: "/home/glassdoor-logo.png" },
          ]);
        }
      } catch (error) {
        console.error("Error fetching review logos:", error);
        // Fallback to static defaults
        setLogos([
          { name: "Upwork", image: "/home/upwork-logo.png" },
          { name: "Clutch", image: "/home/clutch-logo.png" },
          { name: "Google Reviews", image: "/home/google-logo.png" },
          { name: "Glassdoor", image: "/home/glassdoor-logo.png" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // To make the infinite scroll marquee work seamlessly, we duplicate the logos list
  // so that the animation transitions smoothly without showing a gap.
  // We can duplicate it multiple times to ensure it overflows the screen width.
  const displayLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-16 w-full bg-white relative text-center z-10 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: marqueeStyles }} />
      <div className="w-full relative">
        <div className="text-center pb-10 mb-2.5 w-full">
          <h2 className="text-center w-full  text-black common-h2">
            Read Our Review on
          </h2>
          <Motion />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#d68029]"></div>
          </div>
        ) : (
          <div className="relative w-full overflow-hidden py-4">
            {/* Left and Right blur overlays to make it look extremely premium */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

            <div className="animate-marquee-infinite flex gap-8 px-4">
              {displayLogos.map((logo, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center h-24 rounded-[13px] bg-white
                  w-[240px] flex-shrink-0
                  shadow-[0px_4px_15px_rgba(0,0,0,0.08)] transition-all hover:shadow-lg"
                >
                  <Image
                    src={logo.image}
                    alt={logo.name}
                    width={150}
                    height={80}
                    className="max-h-12 object-contain"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
