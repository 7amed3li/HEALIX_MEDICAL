"use client";

import { MotionConfig } from "motion/react";

/**
 * Global Motion configuration:
 * Automatically respects the user's `prefers-reduced-motion` OS/browser setting
 * across every spring transition and interactive control on the site.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
