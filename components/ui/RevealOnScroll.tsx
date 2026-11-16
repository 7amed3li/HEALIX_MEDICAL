"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Scroll-once subtle section reveal (240ms):
 * - Content renders 100% visible in SSR HTML and when JavaScript is disabled.
 * - On client mount, only if the element is below the initial viewport AND
 *   `prefers-reduced-motion` is not enabled, it prepares a subtle fade+translate (6px)
 *   and reveals once when entering the viewport.
 */
export function RevealOnScroll({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const rect = el.getBoundingClientRect();
    // If already visible in viewport on load, keep visible without re-animating
    if (rect.top < window.innerHeight * 0.95) {
      return;
    }

    el.setAttribute("data-reveal", "pending");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.setAttribute("data-reveal", "shown");
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-section ${className}`}>
      {children}
    </div>
  );
}
