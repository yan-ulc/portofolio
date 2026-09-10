"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface TextBlockAnimationProps {
  children: ReactNode;
  blockColor?: string;
  blockClassName?: string;
  animateOnScroll?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function TextBlockAnimation({
  children,
  blockColor,
  blockClassName,
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
        className={cn(
          "absolute inset-0 z-10 origin-left bg-foreground/85 dark:bg-foreground/75",
          blockClassName,
        )}
        style={blockColor ? { backgroundColor: blockColor } : undefined}
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
