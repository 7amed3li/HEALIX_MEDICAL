import "server-only";
import type { Locale } from "./config";
import type en from "@/content/locales/en.json";
import type enServices from "@/content/services/en.json";
import type enGuides from "@/content/guides/en.json";
import type { ServiceId } from "@/content/services";
import type { GuideId } from "@/content/guides";

export type Dictionary = typeof en;
export type ServiceContent = (typeof enServices)[keyof typeof enServices];
export type ServiceDictionary = Record<ServiceId, ServiceContent>;
export type GuideContent = (typeof enGuides)[keyof typeof enGuides];
export type GuideDictionary = Record<GuideId, GuideContent>;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  ar: () => import("@/content/locales/ar.json").then((m) => m.default as Dictionary),
  en: () => import("@/content/locales/en.json").then((m) => m.default as Dictionary),
  fr: () => import("@/content/locales/fr.json").then((m) => m.default as Dictionary),
  ru: () => import("@/content/locales/ru.json").then((m) => m.default as Dictionary),
  tr: () => import("@/content/locales/tr.json").then((m) => m.default as Dictionary),
};

const serviceDictionaries: Record<Locale, () => Promise<ServiceDictionary>> = {
  ar: () => import("@/content/services/ar.json").then((m) => m.default as ServiceDictionary),
  en: () => import("@/content/services/en.json").then((m) => m.default as ServiceDictionary),
  fr: () => import("@/content/services/fr.json").then((m) => m.default as ServiceDictionary),
  ru: () => import("@/content/services/ru.json").then((m) => m.default as ServiceDictionary),
  tr: () => import("@/content/services/tr.json").then((m) => m.default as ServiceDictionary),
};

const guideDictionaries: Record<Locale, () => Promise<GuideDictionary>> = {
  ar: () => import("@/content/guides/ar.json").then((m) => m.default as GuideDictionary),
  en: () => import("@/content/guides/en.json").then((m) => m.default as GuideDictionary),
  fr: () => import("@/content/guides/fr.json").then((m) => m.default as GuideDictionary),
  ru: () => import("@/content/guides/ru.json").then((m) => m.default as GuideDictionary),
  tr: () => import("@/content/guides/tr.json").then((m) => m.default as GuideDictionary),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
export const getServiceDictionary = (locale: Locale) => serviceDictionaries[locale]();
export const getGuideDictionary = (locale: Locale) => guideDictionaries[locale]();
