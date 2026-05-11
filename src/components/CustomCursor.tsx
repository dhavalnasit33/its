"use client";

import { motion } from "framer-motion";
import { useCursor } from "../context/CursorContext";

export default function CustomCursor() {
  const { mouseX, mouseY, cursorColor } = useCursor();

  return (
    <>
      {/* Rotating square corners */}
      <motion.div
        style={{
          x: mouseX - 20,
          y: mouseY - 20,
          width: 40,
          height: 40,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      >
        {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => {
          const style: React.CSSProperties = {
            width: 10,
            height: 10,
            borderColor: cursorColor,
            borderStyle: "solid",
            position: "absolute",
          };
          switch (corner) {
            case "top-left":
              style.borderTopWidth = 2;
              style.borderLeftWidth = 2;
              style.top = 0;
              style.left = 0;
              break;
            case "top-right":
              style.borderTopWidth = 2;
              style.borderRightWidth = 2;
              style.top = 0;
              style.right = 0;
              break;
            case "bottom-left":
              style.borderBottomWidth = 2;
              style.borderLeftWidth = 2;
              style.bottom = 0;
              style.left = 0;
              break;
            case "bottom-right":
              style.borderBottomWidth = 2;
              style.borderRightWidth = 2;
              style.bottom = 0;
              style.right = 0;
              break;
          }
          return <div key={corner} style={style} />;
        })}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        style={{
          x: mouseX - 5,
          y: mouseY - 5,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: cursorColor,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </>
  );
}
