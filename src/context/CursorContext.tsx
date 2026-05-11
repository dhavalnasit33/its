"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { contrast } from "../utils/colorUtils";

interface CursorContextProps {
  mouseX: number;
  mouseY: number;
  cursorColor: string;
}

const CursorContext = createContext<CursorContextProps>({
  mouseX: 0,
  mouseY: 0,
  cursorColor: "#d68029",
});

const primaryColor = "#d68029";
const fallbackColor = "#12203D";

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [cursorColor, setCursorColor] = useState(primaryColor);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);

      // get element under cursor
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const style = getComputedStyle(el);
        const bg = style.backgroundColor || "rgb(255,255,255)";
        const color = style.color || "rgb(0,0,0)";

        // convert rgb() → hex
        const rgb = bg !== "rgba(0, 0, 0, 0)" ? bg : color;
        const match = rgb.match(/\d+/g);
        if (match) {
          const hex =
            "#" +
            match
              .slice(0, 3)
              .map((x) => {
                const h = parseInt(x).toString(16);
                return h.length === 1 ? "0" + h : h;
              })
              .join("");
          // check contrast
          if (contrast(primaryColor, hex) < 3) {
            setCursorColor(fallbackColor);
          } else {
            setCursorColor(primaryColor);
          }
        }
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <CursorContext.Provider value={{ mouseX, mouseY, cursorColor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
