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
    // <div className="relative  flex items-center justify-center overflow-hidden">

<AnimatePresence mode="wait">
  <motion.span
    key={currentIndex}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}

    transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: 0.05     
    }}

    className=" font-bricolage font-bold slider_heading text-center"
  >
    {data[currentIndex]?.title}
  </motion.span>
</AnimatePresence>
    // </div>
  );
}