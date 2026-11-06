"use client";

import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar at the top showing page scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400 rtl:origin-right"
    />
  );
}

/** Soft violet light that trails the mouse (mouse/trackpad only). */
export function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 80, damping: 20 });
  const sy = useSpring(y, { stiffness: 80, damping: 20 });
  const background = useMotionTemplate`radial-gradient(500px circle at ${sx}px ${sy}px, rgba(139,92,246,0.10), transparent 60%)`;

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return <motion.div aria-hidden style={{ background }} className="pointer-events-none fixed inset-0 z-30" />;
}
