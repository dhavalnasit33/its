import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AutoTextSliderProps = {
  data: { title: string }[];
};

export default function AutoTextSlider({ data }: AutoTextSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === data.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [data]);
  return (
    <div className="relative flex items-center justify-center overflow-hidden h-[clamp(48px,6.6vw,74px)] w-full">
      <AnimatePresence>
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1], // easeOutExpo for ultra smooth movement
          }}
          style={{ transition: "none", animation: "none" }}
          className="absolute left-0 right-0 mx-auto font-bold slider_heading text-center w-full"
        >
          {data[currentIndex]?.title}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}