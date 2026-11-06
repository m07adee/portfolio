"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE, delay: i * 0.1 },
  }),
};

type Margin = NonNullable<HTMLMotionProps<"div">["viewport"]>["margin"];

type RevealProps = HTMLMotionProps<"div"> & { index?: number; margin?: Margin };

/** Fades/blurs its children in once they scroll into view. */
export function Reveal({ index = 0, margin = "-60px", ...props }: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
      custom={index}
      {...props}
    />
  );
}
