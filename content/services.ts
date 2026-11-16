import type { Locale } from "@/lib/i18n/config";

/**
 * Stable service registry.
 *
 * - `id` is permanent and must never change (it keys translations, icons and analytics-free routing).
 * - `slugs` may differ per locale. Slugs are ASCII on purpose so URLs stay readable when shared.
 * - Order follows the original HEALIX MEDICAL brochure.
 * - `featured` = visually prioritised on the home page (current design only, because these two
 *   services are prominent in the company's materials). It does NOT imply any clinical claim.
 *
 * Service texts live in `content/services/<locale>.json`, keyed by `id`.
 */
export const SERVICE_IDS = [
  "liver-transplantation",
  "kidney-transplantation",
  "parkinsons-disease",
  "orthopedic-surgery",
  "neurosurgery",
  "urology-prostate",
  "endocrinology",
  "gastroenterology",
  "oncology",
  "cardiology",
  "rehabilitation-physiotherapy",
  "hematology",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export type ServiceDefinition = {
  id: ServiceId;
  featured: boolean;
  slugs: Record<Locale, string>;
};

export const services: ServiceDefinition[] = [
  {
    id: "liver-transplantation",
    featured: true,
    slugs: {
      ar: "liver-transplantation",
      en: "liver-transplantation",
      fr: "transplantation-hepatique",
      ru: "transplantatsiya-pecheni",
      tr: "karaciger-nakli",
    },
  },
  {
    id: "kidney-transplantation",
    featured: true,
    slugs: {
      ar: "kidney-transplantation",
      en: "kidney-transplantation",
      fr: "transplantation-renale",
      ru: "transplantatsiya-pochki",
      tr: "bobrek-nakli",
    },
  },
  {
    id: "parkinsons-disease",
    featured: false,
    slugs: {
      ar: "parkinsons-disease",
      en: "parkinsons-disease",
      fr: "maladie-de-parkinson",
      ru: "bolezn-parkinsona",
      tr: "parkinson-hastaligi",
    },
  },
  {
    id: "orthopedic-surgery",
    featured: false,
    slugs: {
      ar: "orthopedic-surgery",
      en: "orthopedic-surgery",
      fr: "chirurgie-orthopedique",
      ru: "ortopedicheskaya-khirurgiya",
      tr: "ortopedik-cerrahi",
    },
  },
  {
    id: "neurosurgery",
    featured: false,
    slugs: {
      ar: "neurosurgery",
      en: "neurosurgery",
      fr: "neurochirurgie",
      ru: "neyrokhirurgiya",
      tr: "beyin-ve-sinir-cerrahisi",
    },
  },
  {
    id: "urology-prostate",
    featured: false,
    slugs: {
      ar: "urology-prostate",
      en: "urology-prostate-care",
      fr: "urologie-prostate",
      ru: "urologiya-prostata",
      tr: "uroloji-prostat",
    },
  },
  {
    id: "endocrinology",
    featured: false,
    slugs: {
      ar: "endocrinology",
      en: "endocrinology",
      fr: "endocrinologie",
      ru: "endokrinologiya",
      tr: "endokrinoloji",
    },
  },
  {
    id: "gastroenterology",
    featured: false,
    slugs: {
      ar: "gastroenterology",
      en: "gastroenterology",
      fr: "gastro-enterologie",
      ru: "gastroenterologiya",
      tr: "gastroenteroloji",
    },
  },
  {
    id: "oncology",
    featured: false,
    slugs: {
      ar: "oncology",
      en: "oncology",
      fr: "oncologie",
      ru: "onkologiya",
      tr: "onkoloji",
    },
  },
  {
    id: "cardiology",
    featured: false,
    slugs: {
      ar: "cardiology",
      en: "cardiology",
      fr: "cardiologie",
      ru: "kardiologiya",
      tr: "kardiyoloji",
    },
  },
  {
    id: "rehabilitation-physiotherapy",
    featured: false,
    slugs: {
      ar: "rehabilitation-physiotherapy",
      en: "rehabilitation-physiotherapy",
      fr: "readaptation-physiotherapie",
      ru: "reabilitatsiya-fizioterapiya",
      tr: "rehabilitasyon-fizyoterapi",
    },
  },
  {
    id: "hematology",
    featured: false,
    slugs: {
      ar: "hematology",
      en: "hematology",
      fr: "hematologie",
      ru: "gematologiya",
      tr: "hematoloji",
    },
  },
];

export function getServiceBySlug(locale: Locale, slug: string) {
  return services.find((s) => s.slugs[locale] === slug);
}

export function getServiceById(id: ServiceId) {
  return services.find((s) => s.id === id)!;
}

/** Finds a service by a slug in ANY locale (used by the language switcher). */
export function findServiceByAnySlug(slug: string) {
  return services.find((s) => Object.values(s.slugs).includes(slug));
}
