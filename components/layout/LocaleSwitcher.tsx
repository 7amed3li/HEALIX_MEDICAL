"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { localeConfig, locales, type Locale } from "@/lib/i18n/config";
import { findServiceByAnySlug } from "@/content/services";
import { findGuideByAnySlug } from "@/content/guides";

type Props = {
  currentLocale: Locale;
  label: string;
};

/**
 * Crisp inline SVG country flags (20×14) so flags render identically across
 * Windows, iOS, Android, and macOS (Windows does not support Unicode flag emojis)
 * and pass the zero-emoji i18n validator.
 */
export function LocaleFlag({ locale, className = "h-3.5 w-5" }: { locale: Locale; className?: string }) {
  switch (locale) {
    case "ar":
      // Saudi Arabia / Arabic standard flag (deep green with white sword & emblem bar)
      return (
        <svg viewBox="0 0 20 14" aria-hidden="true" className={`shrink-0 rounded-[3px] shadow-[0_0_0_1px_rgba(16,40,62,0.12)] ${className}`}>
          <rect width="20" height="14" fill="#006C35" />
          <rect x="4" y="4.2" width="12" height="2.2" rx="1" fill="#FFFFFF" opacity="0.92" />
          <rect x="5.5" y="8.8" width="9" height="1.3" rx="0.65" fill="#FFFFFF" />
        </svg>
      );
    case "en":
      // United Kingdom (Union Jack)
      return (
        <svg viewBox="0 0 20 14" aria-hidden="true" className={`shrink-0 rounded-[3px] shadow-[0_0_0_1px_rgba(16,40,62,0.12)] ${className}`}>
          <rect width="20" height="14" fill="#012169" />
          <path d="M0,0 L20,14 M20,0 L0,14" stroke="#FFFFFF" strokeWidth="2.6" />
          <path d="M0,0 L20,14 M20,0 L0,14" stroke="#C8102E" strokeWidth="1.4" />
          <path d="M10,0 V14 M0,7 H20" stroke="#FFFFFF" strokeWidth="4.2" />
          <path d="M10,0 V14 M0,7 H20" stroke="#C8102E" strokeWidth="2.4" />
        </svg>
      );
    case "fr":
      // France Tricolore
      return (
        <svg viewBox="0 0 20 14" aria-hidden="true" className={`shrink-0 rounded-[3px] shadow-[0_0_0_1px_rgba(16,40,62,0.12)] ${className}`}>
          <rect width="6.67" height="14" x="0" fill="#002395" />
          <rect width="6.67" height="14" x="6.67" fill="#FFFFFF" />
          <rect width="6.67" height="14" x="13.33" fill="#ED2939" />
        </svg>
      );
    case "ru":
      // Russia Tricolor
      return (
        <svg viewBox="0 0 20 14" aria-hidden="true" className={`shrink-0 rounded-[3px] shadow-[0_0_0_1px_rgba(16,40,62,0.12)] ${className}`}>
          <rect width="20" height="4.67" y="0" fill="#FFFFFF" />
          <rect width="20" height="4.67" y="4.67" fill="#0039A6" />
          <rect width="20" height="4.67" y="9.33" fill="#D52B1E" />
        </svg>
      );
    case "tr":
      // Türkiye (Al Bayrak)
      return (
        <svg viewBox="0 0 20 14" aria-hidden="true" className={`shrink-0 rounded-[3px] shadow-[0_0_0_1px_rgba(16,40,62,0.12)] ${className}`}>
          <rect width="20" height="14" fill="#E30A17" />
          <circle cx="8.2" cy="7" r="3.4" fill="#FFFFFF" />
          <circle cx="9.1" cy="7" r="2.7" fill="#E30A17" />
          <polygon
            points="11.6,7 13.7,6.3 12.4,8.1 12.4,5.9 13.7,7.7"
            fill="#FFFFFF"
          />
        </svg>
      );
  }
}

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

  if (segments[1] === "guides" && segments[2]) {
    const guide = findGuideByAnySlug(segments[2]);
    if (guide) {
      return `/${targetLocale}/guides/${guide.slugs[targetLocale]}`;
    }
    return `/${targetLocale}/guides`;
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
        className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-line bg-white px-3 text-xs font-semibold text-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(16,40,62,0.05)] transition-colors hover:border-ice hover:bg-mist/60 sm:px-3.5 sm:text-[13px]"
      >
        <LocaleFlag locale={currentLocale} className="h-3.5 w-5" />
        <span className="uppercase tracking-wide sm:hidden">{currentLocale}</span>
        <span className="hidden sm:inline">{localeConfig[currentLocale].nativeName}</span>
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
            className="absolute end-0 z-50 mt-2 w-52 origin-top rounded-2xl border border-line bg-white p-1.5 shadow-lift"
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
                    dir="ltr"
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      active
                        ? "bg-mist font-semibold text-navy"
                        : "font-medium text-navy hover:bg-mist/70"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <LocaleFlag locale={loc} className="h-3.5 w-5" />
                      <span dir={cfg.dir} className="leading-none">
                        {cfg.nativeName}
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="rounded bg-mist-soft px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate">
                        {loc}
                      </span>
                      {active && (
                        <Check
                          className="h-4 w-4 text-action"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      )}
                    </span>
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
