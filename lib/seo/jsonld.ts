import { siteConfig } from "@/lib/config/site";
import { localeConfig, locales, type Locale } from "@/lib/i18n/config";

/** Stable @id for the Organization node, referenced by Service.provider and Article.publisher. */
export const organizationId = `${siteConfig.url}/#organization`;

export type FaqItem = { q: string; a: string };

/** FAQPage built strictly from the FAQ items the page itself renders (same data, same locale). */
export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/**
 * Organization + WebSite only. HEALIX MEDICAL is a coordination company, so we deliberately do NOT use
 * MedicalOrganization / Hospital / Physician types. No ratings or reviews schema. FAQPage schema is
 * emitted only on the FAQ page and guide pages, built from the exact FAQ content those pages render.
 */
export function organizationJsonLd(locale: Locale, description: string) {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId,
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
      provider: { "@id": organizationId },
      areaServed: [
        { "@type": "City", name: "Istanbul" },
        { "@type": "Country", name: "Türkiye" },
      ],
      availableLanguage: locales.map((l) => localeConfig[l].nativeName),
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

export function guideJsonLd(args: {
  locale: Locale;
  title: string;
  description: string;
  url: string;
  updated: string;
  homeLabel: string;
  guidesLabel: string;
  faqs: FaqItem[];
}) {
  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: args.title,
      description: args.description,
      dateModified: args.updated,
      inLanguage: args.locale,
      url: args.url,
      mainEntityOfPage: args.url,
      publisher: { "@id": organizationId },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: args.homeLabel, item: `${siteConfig.url}/${args.locale}` },
        { "@type": "ListItem", position: 2, name: args.guidesLabel, item: `${siteConfig.url}/${args.locale}/guides` },
        { "@type": "ListItem", position: 3, name: args.title, item: args.url },
      ],
    },
  ];
  if (args.faqs.length > 0) {
    jsonLd.push(faqPageJsonLd(args.faqs));
  }
  return jsonLd;
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
