import type { Locale } from "./config";
import { getServiceById, type ServiceId } from "@/content/services";
import { getGuideById, type GuideId } from "@/content/guides";

/**
 * Central route builder. All internal links go through here so that
 * paths stay consistent across locales and the language switcher.
 */
export const staticPages = {
  home: "",
  services: "/services",
  guides: "/guides",
  facilities: "/facilities",
  journey: "/patient-journey",
  about: "/about",
  faq: "/faq",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  disclaimer: "/medical-disclaimer",
} as const;

export type StaticPageKey = keyof typeof staticPages;

export function pagePath(locale: Locale, page: StaticPageKey) {
  return `/${locale}${staticPages[page]}`;
}

export function servicePath(locale: Locale, id: ServiceId) {
  return `/${locale}/services/${getServiceById(id).slugs[locale]}`;
}

export function guidePath(locale: Locale, id: GuideId) {
  return `/${locale}/guides/${getGuideById(id).slugs[locale]}`;
}
