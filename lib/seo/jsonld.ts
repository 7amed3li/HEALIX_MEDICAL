import { siteConfig } from "@/lib/config/site";
import type { Locale } from "@/lib/i18n/config";

/**
 * Organization + WebSite only. HEALIX MEDICAL is a coordination company, so we deliberately do NOT use
 * MedicalOrganization / Hospital / Physician types. No ratings, reviews or FAQPage schema.
 */
export function organizationJsonLd(locale: Locale, description: string) {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.brand,
      url: siteConfig.url,
      description,
      ...(siteConfig.logo ? { logo: `${siteConfig.url}${siteConfig.logo.src}` } : {}),
      ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
      ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
      sameAs,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.brand,
      url: `${siteConfig.url}/${locale}`,
      inLanguage: locale,
    },
  ];
}
