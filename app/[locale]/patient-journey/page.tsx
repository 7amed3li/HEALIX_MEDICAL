import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/config";
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
      <section className="border-b border-line bg-mist py-12 sm:py-16">
        <div className="container-page">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-navy sm:text-4xl">
              {dict.journey.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate sm:text-lg">
              {dict.journey.lead}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="container-page">
          <ol className="grid gap-6 md:grid-cols-2">
            {dict.journey.steps.map((step, i) => (
              <li
                key={step.title}
                className="rounded-2xl border border-line bg-white p-6 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ice bg-navy text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-action">
                    {dict.common.step} {i + 1}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-bold text-navy">{step.title}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-strong">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-14 border-t border-line pt-12">
            <h2 className="text-xl font-bold text-navy sm:text-2xl">
              {dict.journey.principlesTitle}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {dict.journey.principles.map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-line bg-mist/65 p-5"
                >
                  <h3 className="text-base font-bold text-navy">{p.title}</h3>
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
