"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TextBlockAnimationProps {
  children: ReactNode;
  blockColor?: string;
  animateOnScroll?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function TextBlockAnimation({
  children,
  blockColor = "#111318",
  animateOnScroll = true,
  delay = 0,
  duration = 0.8,
  className,
}: TextBlockAnimationProps) {
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial="hidden"
      whileInView={animateOnScroll ? "visible" : undefined}
      animate={animateOnScroll ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-10 origin-left"
        style={{ backgroundColor: blockColor }}
        variants={{
          hidden: { x: "0%" },
          visible: {
            x: "100%",
            transition: {
              duration,
              delay,
              ease: [0.76, 0, 0.24, 1],
            },
          },
        }}
      />
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: Math.min(duration, 0.6),
              delay: delay + duration * 0.45,
              ease: "easeOut",
            },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}