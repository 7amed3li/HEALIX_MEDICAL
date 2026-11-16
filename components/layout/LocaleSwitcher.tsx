"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Check, Globe } from "lucide-react";
import { localeConfig, locales, type Locale } from "@/lib/i18n/config";
import { findServiceByAnySlug } from "@/content/services";

type Props = {
  currentLocale: Locale;
  label: string;
};

/**
 * Resolves the target URL when switching languages:
 * - On `/[locale]/services/[slug]`, navigates to the same service's translated slug in the target language.
 * - On all other pages, preserves the sub-path.
 * - Shows native language names only (العربية, English, Français, Русский, Türkçe) — never country flags.
 */
export function resolveLocalePath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${targetLocale}`;

  // Service detail page: /[locale]/services/[slug]
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

  return (
    <div className="relative inline-block">
      <details className="group">
        <summary
          aria-label={label}
          className="inline-flex min-h-10 cursor-pointer list-none items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-sm font-medium text-navy transition-colors hover:border-ice hover:bg-mist"
        >
          <Globe className="h-4 w-4 text-action" aria-hidden="true" />
          <span>{localeConfig[currentLocale].nativeName}</span>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-4 w-4 text-slate transition-transform group-open:rotate-180"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </summary>
        <ul
          role="list"
          className="absolute end-0 z-50 mt-2 w-40 rounded-xl border border-line bg-white p-1.5 shadow-lg"
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
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
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
        </ul>
      </details>
    </div>
  );
}
