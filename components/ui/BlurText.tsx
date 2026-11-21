"use client";

import { motion } from "motion/react";

type Props = {
  text: string;
  className?: string;
  delay?: number;
};

/**
 * React Bits-inspired BlurText:
 * Animates word-by-word (never character-by-character so Arabic ligatures stay 100% intact).
 * SSR renders full text immediately; respects `<MotionConfig reducedMotion="user">`.
 */
export function BlurText({ text, className = "", delay = 0 }: Props) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          initial={{ opacity: 0.92, y: 6, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.36,
            delay: delay + idx * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {word}
          {idx < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}
