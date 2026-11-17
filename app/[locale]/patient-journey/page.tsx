import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { formatNumber, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata, samePathForAllLocales } from "@/lib/seo/metadata";
import { HowHealixHelps } from "@/components/home/HowHealixHelps";
import { ContactCta } from "@/components/home/ContactCta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.journey.metaTitle,
    description: dict.journey.metaDescription,
    paths: samePathForAllLocales("/patient-journey"),
    ogImageAlt: dict.meta.ogImageAlt,
  });
}

export default async function PatientJourneyPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <section className="page-hero">
        <div className="container-page">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-[1.12] text-navy sm:text-5xl">
              {dict.journey.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate sm:text-lg">
              {dict.journey.lead}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <ol className="grid gap-6 md:grid-cols-2">
            {dict.journey.steps.map((step, i) => (
              <li
                key={step.title}
                className="relative overflow-hidden rounded-[1.75rem] border border-line-soft bg-white p-7 shadow-card sm:p-9"
              >
                <span
                  aria-hidden="true"
                  className="display-type pointer-events-none absolute -top-4 end-5 text-[5.5rem] font-semibold leading-none text-navy/[0.05]"
                >
                  {formatNumber(i + 1, locale as Locale)}
                </span>
                <div className="flex items-center gap-3.5">
                  <span className="display-type inline-flex h-13 w-13 items-center justify-center rounded-full border border-bright/50 bg-white text-[1.25rem] font-semibold text-navy shadow-soft">
                    {formatNumber(i + 1, locale as Locale)}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-action">
                    {dict.common.step} {formatNumber(i + 1, locale as Locale)}
                  </span>
                </div>
                <h2 className="mt-5 text-[1.45rem] font-semibold text-navy">{step.title}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-strong">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-16 border-t border-line-soft pt-14">
            <h2 className="text-2xl font-semibold text-navy sm:text-[1.7rem]">
              {dict.journey.principlesTitle}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {dict.journey.principles.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-line-soft bg-mist-soft p-6"
                >
                  <span className="block h-px w-8 bg-brand-red" aria-hidden="true" />
                  <h3 className="display-type mt-3.5 text-[1.1rem] font-semibold text-navy">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-strong">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HowHealixHelps dict={dict} />
      <ContactCta locale={locale} dict={dict} />
    </>
  );
}
