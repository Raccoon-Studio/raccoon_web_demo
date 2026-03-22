import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);

    const addHover = () => {
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    addHover();

    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden lg:block"
        style={{ x, y }}
        animate={{
          width: hovered ? 48 : 32,
          height: hovered ? 48 : 32,
          opacity: visible ? 1 : 0,
          translateX: hovered ? -24 : -16,
          translateY: hovered ? -24 : -16,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div
          className={`w-full h-full rounded-full border transition-colors duration-200 ${
            hovered ? "border-accent bg-accent/10" : "border-text-400/30"
          }`}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block"
        style={{ x, y }}
        animate={{
          width: hovered ? 6 : 4,
          height: hovered ? 6 : 4,
          opacity: visible ? 1 : 0,
          translateX: hovered ? -3 : -2,
          translateY: hovered ? -3 : -2,
        }}
      >
        <div className="w-full h-full rounded-full bg-accent" />
      </motion.div>
    </>
  );
}
