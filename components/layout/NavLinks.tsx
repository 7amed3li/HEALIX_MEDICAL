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
            className={`rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${
              active
                ? "bg-mist font-semibold text-action"
                : "font-medium text-navy hover:bg-mist hover:text-action"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
