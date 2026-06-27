"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !target) return;

    let start = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, duration / 60);

    return () => clearInterval(interval);
  }, [isInView, target, duration]);

  return { count, ref };
}
