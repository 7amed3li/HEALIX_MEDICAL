import type { Locale } from "@/lib/i18n/config";

export type FacilityBrand =
  | "medical-park"
  | "vm-medical-park"
  | "liv-hospital"
  | "istinye-university"
  | "istanbul-aydin";

export type Facility = {
  id: string;
  name: string;
  brand: FacilityBrand;
  agreement: "mlp" | "liv";
  city: string;
  type: "hospital" | "dental";
  /** Optional official partner logo path under /public/images/facilities/ once provided by the owner. */
  logo?: string;
};

/**
 * Complete registry of the 33 confirmed contracted healthcare facilities
 * (31 under the MLP / Medical Park & University agreement + 2 under the Liv Ulus & Vadistanbul agreement,
 * including 1 dental research and application center).
 */
export const facilities: Facility[] = [
  // B. Separate Liv Ulus – Liv Vadistanbul agreement (2 facilities)
  { id: "liv-ulus", name: "LIV HOSPITAL ULUS", brand: "liv-hospital", agreement: "liv", city: "İstanbul", type: "hospital" },
  { id: "liv-vadistanbul", name: "LIV HOSPITAL VADİSTANBUL", brand: "liv-hospital", agreement: "liv", city: "İstanbul", type: "hospital" },

  // A. AZİZ ALLAM – MLP revised agreement (31 facilities)
  { id: "mp-istanbul-onkoloji", name: "MEDICAL PARK İSTANBUL ONKOLOJİ HASTANESİ", brand: "medical-park", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "mp-goztepe", name: "MEDICAL PARK GÖZTEPE HASTANESİ", brand: "medical-park", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "mp-tem", name: "MEDICAL PARK TEM HASTANESİ", brand: "medical-park", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "mp-gebze-vm", name: "MEDICAL PARK GEBZE VM HASTANESİ", brand: "vm-medical-park", agreement: "mlp", city: "Kocaeli", type: "hospital" },
  { id: "vm-pendik", name: "VM MEDICAL PARK PENDİK HASTANESİ", brand: "vm-medical-park", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "mp-bahcelievler", name: "MEDICAL PARK BAHÇELİEVLER HASTANESİ", brand: "medical-park", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "mp-bursa", name: "MEDICAL PARK BURSA HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Bursa", type: "hospital" },
  { id: "mp-antalya", name: "MEDICAL PARK ANTALYA HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Antalya", type: "hospital" },
  { id: "mp-ordu", name: "MEDICAL PARK ORDU HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Ordu", type: "hospital" },
  { id: "mp-trabzon", name: "MEDICAL PARK TRABZON HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Trabzon", type: "hospital" },
  { id: "mp-karadeniz", name: "MEDICAL PARK KARADENİZ HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Trabzon", type: "hospital" },
  { id: "mp-ankara", name: "MEDICAL PARK ANKARA HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Ankara", type: "hospital" },
  { id: "vm-mersin", name: "VM MEDICAL PARK MERSİN HASTANESİ", brand: "vm-medical-park", agreement: "mlp", city: "Mersin", type: "hospital" },
  { id: "mp-atasehir", name: "MEDICAL PARK ATAŞEHİR HASTANESİ", brand: "medical-park", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "mp-izmir", name: "MEDICAL PARK İZMİR HASTANESİ", brand: "medical-park", agreement: "mlp", city: "İzmir", type: "hospital" },
  { id: "liv-ankara", name: "LIV HOSPITAL ANKARA HASTANESİ", brand: "liv-hospital", agreement: "mlp", city: "Ankara", type: "hospital" },
  { id: "liv-gaziantep", name: "LIV HOSPITAL GAZİANTEP HASTANESİ", brand: "liv-hospital", agreement: "mlp", city: "Gaziantep", type: "hospital" },
  { id: "vm-ankara", name: "VM MEDICAL PARK ANKARA HASTANESİ", brand: "vm-medical-park", agreement: "mlp", city: "Ankara", type: "hospital" },
  { id: "mp-tokat", name: "MEDICAL PARK TOKAT HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Tokat", type: "hospital" },
  { id: "mp-samsun", name: "MEDICAL PARK SAMSUN HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Samsun", type: "hospital" },
  { id: "liv-samsun", name: "LIV HOSPITAL SAMSUN HASTANESİ", brand: "liv-hospital", agreement: "mlp", city: "Samsun", type: "hospital" },
  { id: "vm-maltepe", name: "VM MEDICAL PARK MALTEPE HASTANESİ", brand: "vm-medical-park", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "mp-adana", name: "MEDICAL PARK ADANA HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Adana", type: "hospital" },
  { id: "mp-seyhan", name: "MEDICAL PARK SEYHAN HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Adana", type: "hospital" },
  { id: "mp-gebze", name: "MEDICAL PARK GEBZE HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Kocaeli", type: "hospital" },
  { id: "vm-kocaeli", name: "VM MEDICAL PARK KOCAELİ HASTANESİ", brand: "vm-medical-park", agreement: "mlp", city: "Kocaeli", type: "hospital" },
  { id: "istinye-esenyurt", name: "İSTİNYE ÜNİVERSİTESİ TIP FAKÜLTESİ HASTANESİ – ESENYURT EK BİNASI", brand: "istinye-university", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "istinye-topkapi", name: "İSTİNYE ÜNİVERSİTESİ TIP FAKÜLTESİ HASTANESİ – TOPKAPI EK BİNASI", brand: "istinye-university", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "istinye-gop", name: "İSTİNYE ÜNİVERSİTESİ TIP FAKÜLTESİ HASTANESİ – GAZİOSMANPAŞA EK BİNASI", brand: "istinye-university", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "istinye-dental", name: "İSTİNYE ÜNİVERSİTESİ AĞIZ VE DİŞ SAĞLIĞI ARAŞTIRMA VE UYGULAMA MERKEZİ", brand: "istinye-university", agreement: "mlp", city: "İstanbul", type: "dental" },
  { id: "aydin-suam", name: "İSTANBUL AYDIN ÜNİVERSİTESİ SAĞLIK UYGULAMA VE ARAŞTIRMA MERKEZİ", brand: "istanbul-aydin", agreement: "mlp", city: "İstanbul", type: "hospital" },
];

const EXACT_WORDS: Record<string, string> = {
  MEDICAL: "Medical",
  PARK: "Park",
  HOSPITAL: "Hospital",
  LIV: "Liv",
  VM: "VM",
  TEM: "TEM",
  VE: "ve",
};

/**
 * Converts uppercase contract registry titles into clean, readable Turkish/English
 * title case while preserving exact brand casing (`Liv`, `VM`, `TEM`, `Medical Park`).
 */
export function formatFacilityName(raw: string): string {
  return raw
    .split(" ")
    .map((word) => {
      if (word === "–" || word === "-") return word;
      if (EXACT_WORDS[word]) return EXACT_WORDS[word];
      const lower = word.toLocaleLowerCase("tr-TR");
      return lower.charAt(0).toLocaleUpperCase("tr-TR") + lower.slice(1);
    })
    .join(" ");
}

export function getFacilityById(id: string) {
  return facilities.find((facility) => facility.id === id);
}

/** Detail-page slugs are the registry ids in every locale (proper nouns). */
export function getFacilityBySlug(slug: string) {
  return getFacilityById(slug);
}

export function findFacilityByAnySlug(slug: string) {
  return getFacilityById(slug);
}

/** Group / brand display names (proper nouns, identical in every locale). */
export const facilityBrandLabels: Record<FacilityBrand, string> = {
  "medical-park": "Medical Park",
  "vm-medical-park": "VM Medical Park",
  "liv-hospital": "Liv Hospital",
  "istinye-university": "İstinye University",
  "istanbul-aydin": "İstanbul Aydın University",
};

export type FacilityAgreement = Facility["agreement"];
export type FacilityType = Facility["type"];

export const facilityTypeLabels: Record<Locale, Record<FacilityType, string>> = {
  en: { hospital: "Hospital", dental: "Oral and dental health research and application center" },
  tr: { hospital: "Hastane", dental: "Ağız ve diş sağlığı araştırma ve uygulama merkezi" },
  ar: { hospital: "مستشفى", dental: "مركز أبحاث وتطبيقات صحة الفم والأسنان" },
  fr: { hospital: "Hôpital", dental: "Centre de recherche et d'application en santé bucco-dentaire" },
  ru: { hospital: "Больница", dental: "Стоматологический научно-прикладной центр" },
};

export const facilityAgreementLabels: Record<Locale, Record<FacilityAgreement, string>> = {
  en: { mlp: "MLP / Medical Park agreement", liv: "Dedicated Liv Ulus & Vadistanbul agreement" },
  tr: { mlp: "MLP / Medical Park anlaşması", liv: "Özel Liv Ulus ve Vadistanbul anlaşması" },
  ar: { mlp: "اتفاقية MLP / Medical Park", liv: "اتفاقية Liv Ulus وVadistanbul المخصصة" },
  fr: { mlp: "Accord MLP / Medical Park", liv: "Accord dédié Liv Ulus & Vadistanbul" },
  ru: { mlp: "Соглашение MLP / Medical Park", liv: "Отдельное соглашение Liv Ulus и Vadistanbul" },
};

/** Localised city names, keyed by the registry city value. */
export const facilityCityNames: Record<string, Record<Locale, string>> = {
  "İstanbul": { en: "Istanbul", tr: "İstanbul", ar: "إسطنبول", fr: "Istanbul", ru: "Стамбул" },
  "Ankara": { en: "Ankara", tr: "Ankara", ar: "أنقرة", fr: "Ankara", ru: "Анкара" },
  "İzmir": { en: "Izmir", tr: "İzmir", ar: "إزمير", fr: "Izmir", ru: "Измир" },
  "Bursa": { en: "Bursa", tr: "Bursa", ar: "بورصة", fr: "Bursa", ru: "Бурса" },
  "Antalya": { en: "Antalya", tr: "Antalya", ar: "أنطاليا", fr: "Antalya", ru: "Анталья" },
  "Ordu": { en: "Ordu", tr: "Ordu", ar: "أوردو", fr: "Ordu", ru: "Орду" },
  "Trabzon": { en: "Trabzon", tr: "Trabzon", ar: "طرابزون", fr: "Trabzon", ru: "Трабзон" },
  "Kocaeli": { en: "Kocaeli", tr: "Kocaeli", ar: "كوجالي", fr: "Kocaeli", ru: "Коджаэли" },
  "Mersin": { en: "Mersin", tr: "Mersin", ar: "مرسين", fr: "Mersin", ru: "Мерсин" },
  "Gaziantep": { en: "Gaziantep", tr: "Gaziantep", ar: "غازي عنتاب", fr: "Gaziantep", ru: "Газиантеп" },
  "Tokat": { en: "Tokat", tr: "Tokat", ar: "توكات", fr: "Tokat", ru: "Токат" },
  "Samsun": { en: "Samsun", tr: "Samsun", ar: "سامسون", fr: "Samsun", ru: "Самсун" },
  "Adana": { en: "Adana", tr: "Adana", ar: "أضنة", fr: "Adana", ru: "Адана" },
};

/**
 * District per facility id, only where the district is stated by the
 * facility's own official website (mp-antalya, liv-ulus, liv-vadistanbul —
 * checked November 2026) or by the facility's own name as listed in this
 * registry (the three İstinye annex buildings).
 */
export const facilityDistricts: Record<string, Record<Locale, string>> = {
  "mp-antalya": { en: "Muratpaşa", tr: "Muratpaşa", ar: "مراد باشا", fr: "Muratpaşa", ru: "Муратпаша" },
  "liv-ulus": { en: "Beşiktaş", tr: "Beşiktaş", ar: "بشيكتاش", fr: "Beşiktaş", ru: "Бешикташ" },
  "liv-vadistanbul": { en: "Sarıyer", tr: "Sarıyer", ar: "ساريير", fr: "Sarıyer", ru: "Сарыер" },
  "istinye-esenyurt": { en: "Esenyurt", tr: "Esenyurt", ar: "إسنيورت", fr: "Esenyurt", ru: "Эсеньюрт" },
  "istinye-topkapi": { en: "Topkapı", tr: "Topkapı", ar: "طوب قابي", fr: "Topkapı", ru: "Топкапы" },
  "istinye-gop": { en: "Gaziosmanpaşa", tr: "Gaziosmanpaşa", ar: "غازي عثمان باشا", fr: "Gaziosmanpaşa", ru: "Газиосманпаша" },
};
