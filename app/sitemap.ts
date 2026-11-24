import type { MetadataRoute } from "next";
import { defaultLocale, localeConfig, locales } from "@/lib/i18n/config";
import { staticPages } from "@/lib/i18n/routes";
import { services } from "@/content/services";
import { guides } from "@/content/guides";
import { facilities } from "@/content/facilities";
import { siteConfig } from "@/lib/config/site";
import { serviceImage } from "@/lib/service-images";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // 1. All static marketing & legal pages across all 5 locales
  for (const key of Object.keys(staticPages) as (keyof typeof staticPages)[]) {
    const suffix = staticPages[key];
    const languages: Record<string, string> = {};
    for (const loc of locales) {
      languages[localeConfig[loc].htmlLang] = `${siteConfig.url}/${loc}${suffix}`;
    }
    languages["x-default"] = `${siteConfig.url}/${defaultLocale}${suffix}`;

    for (const loc of locales) {
      entries.push({
        url: `${siteConfig.url}/${loc}${suffix}`,
        lastModified: now,
        changeFrequency: key === "home" || key === "services" ? "weekly" : "monthly",
        priority: key === "home" ? 1 : key === "services" ? 0.9 : 0.7,
        alternates: { languages },
        ...(key === "home" ? { images: [`${siteConfig.url}/images/og-healix.jpg`] } : {}),
      });
    }
  }

  // 2. All 12 service detail pages across all 5 locales (60 localized service URLs)
  for (const svc of services) {
    const languages: Record<string, string> = {};
    for (const loc of locales) {
      languages[localeConfig[loc].htmlLang] = `${siteConfig.url}/${loc}/services/${svc.slugs[loc]}`;
    }
    languages["x-default"] = `${siteConfig.url}/${defaultLocale}/services/${svc.slugs[defaultLocale]}`;

    for (const loc of locales) {
      entries.push({
        url: `${siteConfig.url}/${loc}/services/${svc.slugs[loc]}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: svc.featured ? 0.85 : 0.8,
        alternates: { languages },
        images: [`${siteConfig.url}${serviceImage(svc.id)}`],
      });
    }
  }

  // 3. All 3 guide detail pages across all 5 locales (15 localized guide URLs).
  //    The guides index itself is covered by the staticPages loop above.
  for (const guide of guides) {
    const languages: Record<string, string> = {};
    for (const loc of locales) {
      languages[localeConfig[loc].htmlLang] = `${siteConfig.url}/${loc}/guides/${guide.slugs[loc]}`;
    }
    languages["x-default"] = `${siteConfig.url}/${defaultLocale}/guides/${guide.slugs[defaultLocale]}`;

    for (const loc of locales) {
      entries.push({
        url: `${siteConfig.url}/${loc}/guides/${guide.slugs[loc]}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages },
      });
    }
  }

  // 4. All 33 contracted-facility detail pages across all 5 locales
  //    (165 facility URLs; the slug is the registry id in every locale).
  //    The facilities index itself is covered by the staticPages loop above.
  for (const facility of facilities) {
    const languages: Record<string, string> = {};
    for (const loc of locales) {
      languages[localeConfig[loc].htmlLang] = `${siteConfig.url}/${loc}/facilities/${facility.id}`;
    }
    languages["x-default"] = `${siteConfig.url}/${defaultLocale}/facilities/${facility.id}`;

    for (const loc of locales) {
      entries.push({
        url: `${siteConfig.url}/${loc}/facilities/${facility.id}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages },
      });
    }
  }

  return entries;
}
