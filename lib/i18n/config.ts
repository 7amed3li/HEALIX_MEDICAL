export const locales = ["ar", "en", "fr", "ru", "tr"] as const;
export type Locale = (typeof locales)[number];

/** Used for x-default hreflang and when the browser language is not supported. */
export const defaultLocale: Locale = "en";

export const localeConfig: Record<
  Locale,
  { dir: "rtl" | "ltr"; nativeName: string; ogLocale: string; htmlLang: string }
> = {
  ar: { dir: "rtl", nativeName: "العربية", ogLocale: "ar_AR", htmlLang: "ar" },
  en: { dir: "ltr", nativeName: "English", ogLocale: "en_US", htmlLang: "en" },
  fr: { dir: "ltr", nativeName: "Français", ogLocale: "fr_FR", htmlLang: "fr" },
  ru: { dir: "ltr", nativeName: "Русский", ogLocale: "ru_RU", htmlLang: "ru" },
  tr: { dir: "ltr", nativeName: "Türkçe", ogLocale: "tr_TR", htmlLang: "tr" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDir(locale: Locale) {
  return localeConfig[locale].dir;
}
