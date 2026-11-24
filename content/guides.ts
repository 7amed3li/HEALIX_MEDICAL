import type { Locale } from "@/lib/i18n/config";

/**
 * Stable guide registry.
 *
 * - `id` is permanent and must never change (it keys translations and routing).
 * - `slugs` may differ per locale. Slugs are ASCII on purpose so URLs stay readable when shared.
 * - Guides are informational explainers (transplant law, living-donor rules,
 *   ethics-commission review). They make no clinical or legal decision and
 *   promise no outcome; every guide text carries its own disclaimer.
 *
 * Guide texts live in `content/guides/<locale>.json`, keyed by `id`.
 */
export const GUIDE_IDS = [
  "transplant-law-foreign-patients",
  "who-can-be-a-living-donor",
  "ethics-commission-documents-approval",
  "documents-tunisian-patients",
  "documents-algerian-patients",
  "documents-moroccan-patients",
  "documents-libyan-patients",
] as const;

export type GuideId = (typeof GUIDE_IDS)[number];

export type GuideDefinition = {
  id: GuideId;
  slugs: Record<Locale, string>;
};

export const guides: GuideDefinition[] = [
  {
    id: "transplant-law-foreign-patients",
    slugs: {
      ar: "transplant-law-foreign-patients",
      en: "transplant-law-foreign-patients",
      fr: "loi-transplantation-patients-etrangers",
      ru: "zakon-o-transplantatsii-dlya-inostrantsev",
      tr: "yabanci-hastalar-icin-organ-nakli-hukuku",
    },
  },
  {
    id: "who-can-be-a-living-donor",
    slugs: {
      ar: "who-can-be-a-living-donor",
      en: "who-can-be-a-living-donor",
      fr: "qui-peut-etre-donneur-vivant",
      ru: "kto-mozhet-byt-zhivym-donorom",
      tr: "kimler-canli-verici-olabilir",
    },
  },
  {
    id: "ethics-commission-documents-approval",
    slugs: {
      ar: "ethics-commission-documents-approval",
      en: "ethics-commission-documents-approval",
      fr: "commission-ethique-documents-approbation",
      ru: "komissiya-po-etike-dokumenty-odobrenie",
      tr: "etik-komisyonu-belgeleri-ve-onay",
    },
  },
  {
    id: "documents-tunisian-patients",
    slugs: {
      ar: "documents-tunisian-patients",
      en: "documents-tunisian-patients",
      fr: "documents-patients-tunisiens",
      ru: "dokumenty-dlya-tunisskikh-patsientov",
      tr: "tunuslu-hastalar-icin-belgeler",
    },
  },
  {
    id: "documents-algerian-patients",
    slugs: {
      ar: "documents-algerian-patients",
      en: "documents-algerian-patients",
      fr: "documents-patients-algeriens",
      ru: "dokumenty-dlya-alzhirskikh-patsientov",
      tr: "cezayirli-hastalar-icin-belgeler",
    },
  },
  {
    id: "documents-moroccan-patients",
    slugs: {
      ar: "documents-moroccan-patients",
      en: "documents-moroccan-patients",
      fr: "documents-patients-marocains",
      ru: "dokumenty-dlya-marokkanskikh-patsientov",
      tr: "fasli-hastalar-icin-belgeler",
    },
  },
  {
    id: "documents-libyan-patients",
    slugs: {
      ar: "documents-libyan-patients",
      en: "documents-libyan-patients",
      fr: "documents-patients-libyens",
      ru: "dokumenty-dlya-liviyskikh-patsientov",
      tr: "libyali-hastalar-icin-belgeler",
    },
  },
];

export function getGuideBySlug(locale: Locale, slug: string) {
  return guides.find((g) => g.slugs[locale] === slug);
}

export function getGuideById(id: GuideId) {
  return guides.find((g) => g.id === id)!;
}

/** Finds a guide by a slug in ANY locale (used by the language switcher). */
export function findGuideByAnySlug(slug: string) {
  return guides.find((g) => Object.values(g.slugs).includes(slug));
}
