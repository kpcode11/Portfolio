import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  // hooks: motion values (no frequent React state updates)
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(1);
  const SIZE = 32;
  const sizeRef = useRef(SIZE);

  // skip custom cursor on touch / coarse-pointer devices
  const isTouchDevice =
    typeof window !== "undefined" && ("ontouchstart" in window || (window.matchMedia && window.matchMedia("(pointer: coarse)").matches));
  if (isTouchDevice) return null;

  // smooth springs (reduced-motion falls back to very stiff springs)
  const springConfig = prefersReducedMotion ? { stiffness: 1000, damping: 100 } : { stiffness: 500, damping: 30, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, { stiffness: 400, damping: 30 });

  useEffect(() => {
    if (typeof window === "undefined" || isTouchDevice) return;

    // enable CSS rule that hides the native cursor (except form controls)
    document.documentElement.classList.add("has-custom-cursor");

    const interactiveSelector = 'a, button, input[type="submit"], input[type="button"], [data-cursor], .interactive';
    const textInputSelector = 'input:not([type="submit"]):not([type="button"]):not([type="radio"]):not([type="checkbox"]), textarea, [contenteditable="true"]';

    let isPointer = false;
    const setPointerClass = (shouldAdd) => {
      if (shouldAdd && !isPointer) {
        document.documentElement.classList.add("has-custom-cursor-pointer");
        isPointer = true;
      } else if (!shouldAdd && isPointer) {
        document.documentElement.classList.remove("has-custom-cursor-pointer");
        isPointer = false;
      }
    };

    const handleMouseMove = (e) => {
      // position using transform (GPU-accelerated)
      x.set(e.clientX - sizeRef.current / 2);
      y.set(e.clientY - sizeRef.current / 2);

      const el = e.target.closest ? e.target.closest(interactiveSelector) : null;
      const textEl = e.target.closest ? e.target.closest(textInputSelector) : null;

      if (textEl) {
        opacity.set(0);
        setPointerClass(false);
      } else if (el) {
        opacity.set(document.hidden ? 0 : 1);
        const attr = el.getAttribute && el.getAttribute("data-cursor");
        
        if (attr === "large") {
          scale.set(2.5);
          setPointerClass(false);
        } else if (attr === "small") {
          scale.set(0.7);
          setPointerClass(false);
        } else if (el.tagName === "A" || el.tagName === "BUTTON" || el.tagName === "INPUT" || attr === "pointer") {
          scale.set(1.8);
          setPointerClass(true);
        } else {
          scale.set(1.4);
          setPointerClass(false);
        }
      } else {
        opacity.set(document.hidden ? 0 : 1);
        scale.set(1);
        setPointerClass(false);
      }
    };

    // reduce work while page is hidden
    const handleVisibility = () => opacity.set(document.hidden ? 0 : 1);

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.documentElement.classList.remove("has-custom-cursor");
      document.documentElement.classList.remove("has-custom-cursor-pointer");
    };
  }, [x, y, scale, opacity, isTouchDevice, prefersReducedMotion]);

  return (
    <motion.div
      className="custom-cursor fixed pointer-events-none rounded-full z-50 mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        scale: springScale,
        width: SIZE,
        height: SIZE,
        opacity: opacity,
      }}
      aria-hidden="true"
    />
  );
}
