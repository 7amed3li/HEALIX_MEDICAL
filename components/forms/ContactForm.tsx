"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { TactileButton } from "@/components/ui/TactileButton";
import { localeConfig, locales, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { pagePath } from "@/lib/i18n/routes";
import {
  CONTACT_METHODS,
  validateContact,
  type ContactField,
} from "@/lib/validation/contact";

type ServiceOption = { id: string; name: string };

type Props = {
  locale: Locale;
  dict: Dictionary;
  serviceOptions: ServiceOption[];
  receiverConfigured: boolean;
};

export function ContactForm({
  locale,
  dict,
  serviceOptions,
  receiverConfigured,
}: Props) {
  const f = dict.contact.form;
  const [startedAt] = useState<number>(() => Date.now());
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState<string>(locale);
  const [contactMethod, setContactMethod] = useState<string>("whatsapp");
  const [contactValue, setContactValue] = useState("");
  const [service, setService] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot

  const [errors, setErrors] = useState<ContactField[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "unavailable" | "error">("idle");

  const hasError = (field: ContactField) => errors.includes(field);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const check = validateContact({
      name,
      country,
      language,
      contactMethod,
      contactValue,
      service,
      consent,
    });

    if (!check.ok) {
      setErrors(check.errors);
      setStatus("idle");
      return;
    }

    setErrors([]);

    if (!receiverConfigured) {
      // Do NOT fake a submission when no authorized receiving endpoint is configured.
      setStatus("unavailable");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...check.data,
          website,
          startedAt,
        }),
      });
      if (res.status === 503) {
        setStatus("unavailable");
      } else if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[1.75rem] border border-line-soft bg-white p-7 shadow-card sm:p-10"
    >
      <div className="mb-7 flex items-start gap-2.5 rounded-2xl border border-line-soft bg-mist-soft p-4 text-xs leading-relaxed text-slate-strong">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-action" aria-hidden="true" />
        <p>{f.noMedical}</p>
      </div>

      {errors.length > 0 && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-2.5 rounded-xl border border-brand-red/40 bg-brand-red/5 p-4 text-sm text-navy"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
          <div>
            <p className="font-semibold">{f.errorSummary}</p>
          </div>
        </div>
      )}

      {/* Honeypot field for automated bots */}
      <div className="sr-only" aria-hidden="true">
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-semibold text-navy">
            {f.name} <span className="text-brand-red">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={hasError("name")}
            aria-describedby={hasError("name") ? "err-name" : undefined}
            className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm text-navy transition-colors ${
              hasError("name") ? "border-brand-red" : "border-line focus:border-action"
            }`}
          />
          {hasError("name") && (
            <p id="err-name" className="mt-1.5 flex items-center gap-1 text-xs text-brand-red">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{f.errors.name}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-country" className="block text-sm font-semibold text-navy">
            {f.country} <span className="text-brand-red">*</span>
          </label>
          <input
            id="contact-country"
            name="country"
            type="text"
            required
            autoComplete="country-name"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            aria-invalid={hasError("country")}
            aria-describedby={hasError("country") ? "err-country" : undefined}
            className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm text-navy transition-colors ${
              hasError("country") ? "border-brand-red" : "border-line focus:border-action"
            }`}
          />
          {hasError("country") && (
            <p id="err-country" className="mt-1.5 flex items-center gap-1 text-xs text-brand-red">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{f.errors.country}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-language" className="block text-sm font-semibold text-navy">
            {f.language} <span className="text-brand-red">*</span>
          </label>
          <select
            id="contact-language"
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-invalid={hasError("language")}
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-navy focus:border-action"
          >
            {locales.map((loc) => (
              <option key={loc} value={loc}>
                {localeConfig[loc].nativeName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contact-method" className="block text-sm font-semibold text-navy">
            {f.contactMethod} <span className="text-brand-red">*</span>
          </label>
          <select
            id="contact-method"
            name="contactMethod"
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
            aria-invalid={hasError("contactMethod")}
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-navy focus:border-action"
          >
            {CONTACT_METHODS.map((m) => (
              <option key={m} value={m}>
                {f.methods[m]}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-value" className="block text-sm font-semibold text-navy">
            {f.contactValue} <span className="text-brand-red">*</span>
          </label>
          <input
            id="contact-value"
            name="contactValue"
            type={contactMethod === "email" ? "email" : "tel"}
            dir="ltr"
            required
            value={contactValue}
            onChange={(e) => setContactValue(e.target.value)}
            aria-invalid={hasError("contactValue")}
            aria-describedby="hint-contact-value"
            className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm text-navy transition-colors ${
              hasError("contactValue") ? "border-brand-red" : "border-line focus:border-action"
            }`}
          />
          <p id="hint-contact-value" className="mt-1 text-xs text-slate">
            {f.contactValueHint}
          </p>
          {hasError("contactValue") && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-brand-red">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{f.errors.contactValue}</span>
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-service" className="block text-sm font-semibold text-navy">
            {f.service} <span className="text-brand-red">*</span>
          </label>
          <select
            id="contact-service"
            name="service"
            required
            value={service}
            onChange={(e) => setService(e.target.value)}
            aria-invalid={hasError("service")}
            aria-describedby={hasError("service") ? "err-service" : undefined}
            className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy transition-colors ${
              hasError("service") ? "border-brand-red" : "border-line focus:border-action"
            }`}
          >
            <option value="">{f.servicePlaceholder}</option>
            <option value="general">{f.serviceGeneral}</option>
            {serviceOptions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          {hasError("service") && (
            <p id="err-service" className="mt-1.5 flex items-center gap-1 text-xs text-brand-red">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{f.errors.service}</span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-navy">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-invalid={hasError("consent")}
            className="mt-1 h-4 w-4 shrink-0 rounded border-line text-action"
          />
          <span>
            {f.consent}{" "}
            <Link
              href={pagePath(locale, "privacy")}
              className="font-semibold text-action underline underline-offset-4 hover:text-action-hover"
            >
              ({f.consentLink})
            </Link>
          </span>
        </label>
        {hasError("consent") && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-brand-red">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{f.errors.consent}</span>
          </p>
        )}
      </div>

      <div className="mt-6">
        <TactileButton
          type="submit"
          disabled={status === "sending"}
          variant="primary"
          className="min-h-12 w-full px-8 py-3 text-base sm:w-auto"
        >
          {status === "sending" ? f.sending : f.submit}
        </TactileButton>
      </div>

      {status === "success" && (
        <div
          role="status"
          className="mt-5 flex items-start gap-2.5 rounded-xl border border-ice bg-mist p-4 text-sm text-navy"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-action" aria-hidden="true" />
          <p>{f.success}</p>
        </div>
      )}

      {status === "unavailable" && (
        <div
          role="status"
          className="mt-5 flex items-start gap-2.5 rounded-xl border border-ice bg-mist p-4 text-sm text-navy"
        >
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-action" aria-hidden="true" />
          <p>{f.unavailable}</p>
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-2.5 rounded-xl border border-brand-red/40 bg-brand-red/5 p-4 text-sm text-navy"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
          <p>{f.error}</p>
        </div>
      )}
    </form>
  );
}
