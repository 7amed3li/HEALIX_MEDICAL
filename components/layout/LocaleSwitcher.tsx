"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { localeConfig, locales, type Locale } from "@/lib/i18n/config";
import { findServiceByAnySlug } from "@/content/services";

type Props = {
  currentLocale: Locale;
  label: string;
};

export function resolveLocalePath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${targetLocale}`;

  if (segments[1] === "services" && segments[2]) {
    const svc = findServiceByAnySlug(segments[2]);
    if (svc) {
      return `/${targetLocale}/services/${svc.slugs[targetLocale]}`;
    }
    return `/${targetLocale}/services`;
  }

  const rest = segments.slice(1).join("/");
  return rest ? `/${targetLocale}/${rest}` : `/${targetLocale}`;
}

export function LocaleSwitcher({ currentLocale, label }: Props) {
  const pathname = usePathname() || `/${currentLocale}`;
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <motion.button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.975 }}
        transition={{ type: "spring", stiffness: 460, damping: 32 }}
        className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(16,40,62,0.05)] transition-colors hover:border-ice hover:bg-mist/60"
      >
        <Globe className="h-4 w-4 text-action" strokeWidth={1.75} aria-hidden="true" />
        <span>{localeConfig[currentLocale].nativeName}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute end-0 z-50 mt-2 w-44 origin-top rounded-2xl border border-line bg-white p-1.5 shadow-lift"
          >
            {locales.map((loc) => {
              const active = loc === currentLocale;
              const cfg = localeConfig[loc];
              return (
                <li key={loc}>
                  <Link
                    href={resolveLocalePath(pathname, loc)}
                    hrefLang={cfg.htmlLang}
                    lang={cfg.htmlLang}
                    dir={cfg.dir}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-mist font-semibold text-navy"
                        : "text-navy hover:bg-mist/70"
                    }`}
                  >
                    <span>{cfg.nativeName}</span>
                    {active && (
                      <Check
                        className="h-4 w-4 text-action"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
