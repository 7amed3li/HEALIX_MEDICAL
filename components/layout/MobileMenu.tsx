"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { localeConfig, locales, type Locale } from "@/lib/i18n/config";
import { resolveLocalePath } from "./LocaleSwitcher";
import type { NavItem } from "./NavLinks";
import { TactileButton } from "@/components/ui/TactileButton";

type Props = {
  currentLocale: Locale;
  items: NavItem[];
  ctaLabel: string;
  ctaHref: string;
  openLabel: string;
  closeLabel: string;
  navLabel: string;
  langLabel: string;
};

export function MobileMenu({
  currentLocale,
  items,
  ctaLabel,
  ctaHref,
  openLabel,
  closeLabel,
  navLabel,
  langLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || `/${currentLocale}`;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? closeLabel : openLabel}
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-white text-navy transition-colors duration-200 hover:bg-mist active:translate-y-px"
      >
        {open ? (
          <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full z-50 border-b border-line bg-white px-5 py-5 shadow-lg"
          >
          <nav aria-label={navLabel} className="flex flex-col gap-1">
            {items.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-base transition-colors duration-200 ${
                    active
                      ? "bg-mist font-semibold text-action"
                      : "font-medium text-navy hover:bg-mist"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 border-t border-line pt-4">
            <p className="px-3 text-xs font-semibold text-slate">{langLabel}</p>
            <div className="mt-2 flex flex-wrap gap-2 px-2">
              {locales.map((loc) => {
                const cfg = localeConfig[loc];
                const active = loc === currentLocale;
                return (
                  <Link
                    key={loc}
                    href={resolveLocalePath(pathname, loc)}
                    lang={cfg.htmlLang}
                    dir={cfg.dir}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                      active
                        ? "border-action bg-mist font-semibold text-navy"
                        : "border-line bg-white text-navy hover:border-ice"
                    }`}
                  >
                    {cfg.nativeName}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-4 px-2">
            <TactileButton
              href={ctaHref}
              onClick={() => setOpen(false)}
              variant="primary"
              className="min-h-11 w-full px-4 py-2.5 text-sm"
            >
              {ctaLabel}
            </TactileButton>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
