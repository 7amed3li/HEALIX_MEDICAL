"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * GSAP + ScrollTrigger section reveal (runs once when entering the viewport):
 * - SSR HTML is 100% visible by default (no hidden content if JS fails).
 * - Respects `prefers-reduced-motion` automatically.
 * - If child elements have `data-gsap-item`, they stagger in cleanly; otherwise the block animates as a whole.
 */
export function RevealOnScroll({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll("[data-gsap-item]");
      const targets = items.length > 0 ? items : el;

      gsap.from(targets, {
        y: 16,
        opacity: 0,
        duration: 0.45,
        stagger: items.length > 0 ? 0.06 : 0,
        ease: "power2.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
