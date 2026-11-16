import type { Metadata } from "next";
import { defaultLocale, localeConfig, locales, type Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/config/site";

/** Returns the locale-specific path for every locale, e.g. { ar: "/ar/about", en: "/en/about", ... } */
export type LocalizedPaths = Record<Locale, string>;

export function samePathForAllLocales(suffix: string): LocalizedPaths {
  return Object.fromEntries(locales.map((l) => [l, `/${l}${suffix}`])) as LocalizedPaths;
}

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

type BuildArgs = {
  locale: Locale;
  title: string;
  description: string;
  paths: LocalizedPaths;
  /** Use the full title without the brand template (home page). */
  absoluteTitle?: boolean;
  ogImageAlt: string;
};

export function buildMetadata({
  locale,
  title,
  description,
  paths,
  absoluteTitle,
  ogImageAlt,
}: BuildArgs): Metadata {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeConfig[l].htmlLang] = absoluteUrl(paths[l]);
  languages["x-default"] = absoluteUrl(paths[defaultLocale]);

  const url = absoluteUrl(paths[locale]);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      siteName: siteConfig.brand,
      title,
      description,
      url,
      locale: localeConfig[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeConfig[l].ogLocale),
      images: [{ url: absoluteUrl("/images/og-healix.jpg"), width: 1200, height: 630, alt: ogImageAlt }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
