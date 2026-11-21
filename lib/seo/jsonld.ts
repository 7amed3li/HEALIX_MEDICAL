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

export function serviceJsonLd(args: {
  locale: Locale;
  name: string;
  description: string;
  url: string;
  homeLabel: string;
  servicesLabel: string;
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: args.name,
      description: args.description,
      serviceType: "Patient Coordination",
      provider: {
        "@type": "Organization",
        name: siteConfig.brand,
        url: siteConfig.url,
      },
      areaServed: "TR",
      url: args.url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: args.homeLabel, item: `${siteConfig.url}/${args.locale}` },
        { "@type": "ListItem", position: 2, name: args.servicesLabel, item: `${siteConfig.url}/${args.locale}/services` },
        { "@type": "ListItem", position: 3, name: args.name, item: args.url },
      ],
    },
  ];
}

export function facilitiesItemListJsonLd(args: {
  locale: Locale;
  title: string;
  items: { name: string; city: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: args.title,
    url: `${siteConfig.url}/${args.locale}/facilities`,
    numberOfItems: args.items.length,
    itemListElement: args.items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: `${item.name} (${item.city})`,
    })),
  };
}
