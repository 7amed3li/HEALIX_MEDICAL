import { SERVICE_IDS } from "@/content/services";
import { locales } from "@/lib/i18n/config";

export const CONTACT_METHODS = ["phone", "whatsapp", "email"] as const;
export type ContactMethod = (typeof CONTACT_METHODS)[number];

export type ContactFormInput = {
  name: string;
  country: string;
  language: string;
  contactMethod: string;
  contactValue: string;
  service: string;
  consent: boolean;
  /** Honeypot – must stay empty. */
  website?: string;
  /** Timestamp (ms) when the form was rendered – used as a simple bot time-trap. */
  startedAt?: number;
};

export type ContactField =
  | "name"
  | "country"
  | "language"
  | "contactMethod"
  | "contactValue"
  | "service"
  | "consent";

export type ValidationResult =
  | { ok: true; data: Omit<ContactFormInput, "website" | "startedAt"> }
  | { ok: false; errors: ContactField[] };

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s().-]{7,20}$/;

/** Shared by the client form and the API route. Contains no health fields by design. */
export function validateContact(input: Partial<ContactFormInput>): ValidationResult {
  const errors: ContactField[] = [];
  const name = String(input.name ?? "").trim();
  const country = String(input.country ?? "").trim();
  const language = String(input.language ?? "");
  const contactMethod = String(input.contactMethod ?? "");
  const contactValue = String(input.contactValue ?? "").trim();
  const service = String(input.service ?? "");

  if (name.length < 2 || name.length > 100) errors.push("name");
  if (country.length < 2 || country.length > 80) errors.push("country");
  if (!(locales as readonly string[]).includes(language)) errors.push("language");
  if (!(CONTACT_METHODS as readonly string[]).includes(contactMethod)) errors.push("contactMethod");

  const valueOk =
    contactMethod === "email" ? EMAIL_RE.test(contactValue) : PHONE_RE.test(contactValue);
  if (!valueOk) errors.push("contactValue");

  if (service !== "general" && !(SERVICE_IDS as readonly string[]).includes(service)) {
    errors.push("service");
  }
  if (input.consent !== true) errors.push("consent");

  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    data: { name, country, language, contactMethod, contactValue, service, consent: true },
  };
}
