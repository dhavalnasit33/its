"use client";
import { motion } from "framer-motion";
import { FC } from "react";
const Motion: FC = () => {
  return (
    <div className="flex justify-center p-6">
      <div className="w-40 h-2 bg-gray-200 rounded-full relative overflow-hidden">
        <motion.div
          className="h-full bg-[#D68025] rounded-full absolute top-0 w-[63%]"
          animate={{
            x: ["-40%", "100%", "-40%"], // move left (40% outside) → right (40% outside) → back
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  );
};
export default Motion;