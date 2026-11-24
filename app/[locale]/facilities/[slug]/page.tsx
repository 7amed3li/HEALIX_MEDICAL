import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { formatNumber, isLocale, locales, type Locale } from "@/lib/i18n/config";
import {
  getDictionary,
  getFacilityDictionary,
  getServiceDictionary,
} from "@/lib/i18n/dictionaries";
import { buildMetadata, absoluteUrl, type LocalizedPaths } from "@/lib/seo/metadata";
import { facilityJsonLd } from "@/lib/seo/jsonld";
import {
  facilities,
  formatFacilityName,
  getFacilityBySlug,
  facilityAgreementLabels,
  facilityBrandLabels,
  facilityCityNames,
  facilityDistricts,
  facilityTypeLabels,
} from "@/content/facilities";
import { facilityPath, pagePath, servicePath } from "@/lib/i18n/routes";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { BdiText } from "@/components/ui/BdiText";
import { TactileButton } from "@/components/ui/TactileButton";
import { ContactCta } from "@/components/home/ContactCta";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const facility of facilities) {
      params.push({ locale, slug: facility.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const facility = getFacilityBySlug(slug);
  if (!facility) return {};

  const [dict, facilityDict] = await Promise.all([
    getDictionary(locale),
    getFacilityDictionary(locale),
  ]);
  const content = facilityDict[facility.id];
  if (!content) return {};

  const paths = Object.fromEntries(
    locales.map((l) => [l, `/${l}/facilities/${facility.id}`])
  ) as LocalizedPaths;

  return buildMetadata({
    locale,
    title: content.metaTitle,
    description: content.metaDescription,
    paths,
    ogImageAlt: dict.meta.ogImageAlt,
  });
}

export default async function FacilityDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const facility = getFacilityBySlug(slug);
  if (!facility) notFound();

  const [dict, facilityDict, serviceDict] = await Promise.all([
    getDictionary(locale),
    getFacilityDictionary(locale),
    getServiceDictionary(locale),
  ]);

  const content = facilityDict[facility.id];
  if (!content) notFound();

  const t = dict.facilityPage;
  const loc = locale as Locale;
  const displayName = formatFacilityName(facility.name);
  const cityName = facilityCityNames[facility.city]?.[loc] ?? facility.city;
  const district = facilityDistricts[facility.id]?.[loc];

  const facts: { label: string; value: string }[] = [
    { label: t.brandLabel, value: facilityBrandLabels[facility.brand] },
    { label: t.cityLabel, value: cityName },
    ...(district ? [{ label: t.districtLabel, value: district }] : []),
    { label: t.typeLabel, value: facilityTypeLabels[loc][facility.type] },
    { label: t.agreementLabel, value: facilityAgreementLabels[loc][facility.agreement] },
  ];

  const isDental = facility.type === "dental";
  const relevantServices = isDental
    ? []
    : (["liver-transplantation", "kidney-transplantation"] as const);

  const others = [
    ...facilities.filter((f) => f.id !== facility.id && f.brand === facility.brand),
    ...facilities.filter((f) => f.id !== facility.id && f.brand !== facility.brand),
  ].slice(0, 4);

  const jsonLd = facilityJsonLd({
    locale: loc,
    name: displayName,
    url: absoluteUrl(`/${loc}/facilities/${facility.id}`),
    homeLabel: dict.nav.home,
    facilitiesLabel: dict.nav.facilities,
    cityName,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. Hero */}
      <section className="page-hero">
        <div className="container-page">
          <nav aria-label={dict.a11y.breadcrumb}>
            <Link
              href={pagePath(loc, "facilities")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-action hover:text-action-hover"
            >
              <ArrowLeft className="flip-rtl h-4 w-4" aria-hidden="true" />
              <span>{t.backToFacilities}</span>
            </Link>
          </nav>

          <div className="mt-6 max-w-3xl">
            <h1
              dir="ltr"
              className="text-start text-4xl font-semibold leading-[1.12] text-navy sm:text-5xl"
            >
              {displayName}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
              <BdiText text={content.intro} />
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <TactileButton
                href={pagePath(loc, "contact")}
                variant="primary"
                className="min-h-12 px-6 py-3 text-sm"
              >
                <span>{content.cta}</span>
                <ArrowRight className="flip-rtl h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </TactileButton>
              <TactileButton
                href={pagePath(loc, "journey")}
                variant="secondary"
                className="min-h-12 px-5 py-3 text-sm"
              >
                {dict.common.ctaSecondary}
              </TactileButton>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page space-y-14">
          {/* 2. Registry facts strip — only facts HEALIX's own registry states,
              plus the district where an official source verifies it */}
          <div className="rounded-[1.75rem] border border-line-soft bg-mist-soft p-7 sm:p-9">
            <h2 className="text-2xl font-semibold text-navy">{t.factsTitle}</h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-xl border border-line-soft bg-white px-4 py-3"
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate">
                    {fact.label}
                  </dt>
                  <dd dir="auto" className="mt-1 text-sm font-semibold text-navy">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 3. About this facility */}
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold text-navy sm:text-[1.7rem]">
              {t.aboutTitle}
            </h2>
            <div className="mt-6 space-y-4">
              {content.overview.map((paragraph, idx) => (
                <div
                  key={paragraph}
                  className="rounded-2xl border border-line-soft bg-white p-6 text-sm leading-relaxed text-navy shadow-soft"
                >
                  <span className="display-type inline-block text-[1.6rem] font-semibold leading-none text-bright">
                    {formatNumber(idx + 1, loc, 2)}
                  </span>
                  <p className="mt-2.5 text-slate-strong">
                    <BdiText text={paragraph} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. HEALIX services connected to this facility. Framing is always
              HEALIX's coordination offer — never a claim that the facility
              performs a given treatment. The dental center links to the
              services index only. */}
          <div className="border-t border-line-soft pt-14">
            <h2 className="text-2xl font-semibold text-navy sm:text-[1.7rem]">
              {t.servicesTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate">
              <BdiText text={isDental ? t.servicesTextDental : t.servicesText} />
            </p>
            {relevantServices.length > 0 ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {relevantServices.map((id) => (
                  <Link
                    key={id}
                    href={servicePath(loc, id)}
                    className="group flex items-center gap-3 rounded-2xl border border-line-soft bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-bright/40 hover:shadow-lift"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-action transition-colors duration-300 group-hover:bg-navy group-hover:text-ice">
                      <ServiceIcon id={id} className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-navy group-hover:text-action">
                      {serviceDict[id].name}
                    </span>
                    <ArrowRight
                      className="flip-rtl ms-auto h-4 w-4 shrink-0 text-slate transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            ) : null}
            <Link
              href={pagePath(loc, "services")}
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-action hover:text-action-hover"
            >
              <span>{dict.common.allServices}</span>
              <ArrowRight className="flip-rtl h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* 5. Sources — only where facts came from the facility's own site */}
          {content.sourceNote ? (
            <div className="rounded-[1.5rem] border border-line-soft bg-mist-soft p-6">
              <h2 className="text-sm font-bold text-navy">{t.sourcesTitle}</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-strong">
                <BdiText text={content.sourceNote} />
              </p>
            </div>
          ) : null}

          {/* 6. Coordination notice (shared directory wording) */}
          <div className="flex items-start gap-3 rounded-[1.5rem] border border-line-soft bg-mist-soft p-6">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-action" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-bold text-navy">
                {dict.facilitiesPage.noticeTitle}
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-strong">
                {dict.facilitiesPage.notice}
              </p>
            </div>
          </div>

          {/* 7. Other contracted facilities */}
          <div className="border-t border-line-soft pt-12">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-navy">
                {t.otherTitle}
              </h2>
              <span className="h-px w-10 bg-brand-red" aria-hidden="true" />
              <span className="h-px flex-1 bg-line-soft" aria-hidden="true" />
              <Link
                href={pagePath(loc, "facilities")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-action hover:text-action-hover"
              >
                <span>{t.backToFacilities}</span>
                <ArrowRight className="flip-rtl h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((item) => (
                <Link
                  key={item.id}
                  href={facilityPath(loc, item.id)}
                  className="group rounded-2xl border border-line-soft bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-bright/40 hover:shadow-lift"
                >
                  <span dir="ltr" className="block text-start text-sm font-semibold text-navy group-hover:text-action">
                    {formatFacilityName(item.name)}
                  </span>
                  <span className="mt-1 block text-xs text-slate">
                    {facilityCityNames[item.city]?.[loc] ?? item.city}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCta locale={loc} dict={dict} />
    </>
  );
}
