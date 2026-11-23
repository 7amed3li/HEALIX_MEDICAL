"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Lightweight section reveal using dynamic GSAP + ScrollTrigger import:
 * - SSR HTML is 100% visible by default (zero layout shift or hidden content).
 * - GSAP is loaded asynchronously after initial paint so it never blocks first load.
 */
export function RevealOnScroll({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;

    let revert: (() => void) | undefined;
    let cancelled = false;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (cancelled || !ref.current) return;
        gsap.registerPlugin(ScrollTrigger);

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

        revert = () => ctx.revert();
      }
    );

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
