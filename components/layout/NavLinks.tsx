"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = { href: string; label: string; exact?: boolean };

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname() || "";

  return (
    <>
      {items.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-3.5 py-2 text-sm underline-offset-8 transition-all duration-300 ${
              active
                ? "font-semibold text-action underline decoration-brand-red decoration-2"
                : "font-medium text-navy hover:text-action hover:underline hover:decoration-brand-red/50 hover:decoration-2"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
