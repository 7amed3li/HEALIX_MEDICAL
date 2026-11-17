"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export type NavItem = { href: string; label: string; exact?: boolean };

/**
 * Tactile shared-layout navigation pill (`layoutId="active-nav-pill"`):
 * Smoothly glides between active header links with calm spring physics.
 */
export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname() || "";

  return (
    <div className="flex items-center gap-1">
      {items.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${
              active
                ? "font-semibold text-navy"
                : "font-medium text-slate-strong hover:text-navy"
            }`}
          >
            {active && (
              <motion.span
                layoutId="active-nav-pill"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-full border border-ice/50 bg-mist shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                aria-hidden="true"
              />
            )}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
