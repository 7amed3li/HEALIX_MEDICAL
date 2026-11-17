import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Building2, Info } from "lucide-react";
import { formatNumber, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata, samePathForAllLocales } from "@/lib/seo/metadata";
import { facilities } from "@/content/facilities";
import { FacilitiesDirectory } from "@/components/facilities/FacilitiesDirectory";
import { ContactCta } from "@/components/home/ContactCta";
import { BdiText } from "@/components/ui/BdiText";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.facilitiesPage.metaTitle,
    description: dict.facilitiesPage.metaDescription,
    paths: samePathForAllLocales("/facilities"),
    ogImageAlt: dict.meta.ogImageAlt,
  });
}

export default async function FacilitiesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.facilitiesPage;
  const uniqueCities = new Set(facilities.map((f) => f.city)).size;

  return (
    <>
      <section className="surface-dark grain relative overflow-hidden py-14 text-white sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-24 -top-24 h-80 w-80 rounded-full bg-bright/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 start-1/4 h-72 w-72 rounded-full bg-ice/10 blur-3xl"
        />

        <div className="container-page relative z-10">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p>
                <span className="eyebrow-dark">
                  <Building2 className="h-3.5 w-3.5 text-ice-soft" strokeWidth={1.75} aria-hidden="true" />
                  <span>{t.eyebrow}</span>
                </span>
              </p>
              <h1 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                {t.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base lg:text-lg">
                <BdiText text={t.lead} />
              </p>
            </div>

            {/* Verified contract summary metrics (exact numbers from the two signed agreements) */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 lg:col-span-5">
              <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-3.5 text-center backdrop-blur-md sm:p-5">
                <p className="display-type text-2xl font-bold tabular-nums text-white sm:text-3xl">
                  {formatNumber(facilities.length, locale as Locale)}
                </p>
                <p className="mt-1 text-[11px] font-medium leading-tight text-ice-soft sm:text-xs">
                  {t.stats.totalLabel}
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-3.5 text-center backdrop-blur-md sm:p-5">
                <p className="display-type text-2xl font-bold tabular-nums text-white sm:text-3xl">
                  {formatNumber(uniqueCities, locale as Locale)}
                </p>
                <p className="mt-1 text-[11px] font-medium leading-tight text-ice-soft sm:text-xs">
                  {t.stats.citiesLabel}
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-3.5 text-center backdrop-blur-md sm:p-5">
                <p className="display-type text-2xl font-bold tabular-nums text-white sm:text-3xl">
                  {formatNumber(2, locale as Locale)}
                </p>
                <p className="mt-1 text-[11px] font-medium leading-tight text-ice-soft sm:text-xs">
                  {t.stats.agreementsLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="container-page">
          <FacilitiesDirectory locale={locale as Locale} dict={dict} />

          <div className="mt-12 flex items-start gap-3 rounded-2xl border border-line bg-mist p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-action" strokeWidth={1.75} aria-hidden="true" />
            <div>
              <h2 className="text-sm font-bold text-navy">{t.noticeTitle}</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-strong">
                {t.notice}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactCta locale={locale} dict={dict} />
    </>
  );
}
