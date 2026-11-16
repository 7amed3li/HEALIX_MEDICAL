import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CheckCircle2, Info, ShieldAlert } from "lucide-react";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary, getServiceDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata, type LocalizedPaths } from "@/lib/seo/metadata";
import { getServiceBySlug, services } from "@/content/services";
import { pagePath, servicePath } from "@/lib/i18n/routes";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { SpecialtyVisual } from "@/components/ui/SpecialtyVisual";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { BdiText } from "@/components/ui/BdiText";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const svc of services) {
      params.push({ locale, slug: svc.slugs[locale] });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const svc = getServiceBySlug(locale, slug);
  if (!svc) return {};

  const [dict, serviceDict] = await Promise.all([
    getDictionary(locale),
    getServiceDictionary(locale),
  ]);
  const content = serviceDict[svc.id];

  const paths = Object.fromEntries(
    locales.map((l) => [l, `/${l}/services/${svc.slugs[l]}`])
  ) as LocalizedPaths;

  return buildMetadata({
    locale,
    title: content.metaTitle,
    description: content.metaDescription,
    paths,
    ogImageAlt: dict.meta.ogImageAlt,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const svc = getServiceBySlug(locale, slug);
  if (!svc) notFound();

  const [dict, serviceDict] = await Promise.all([
    getDictionary(locale),
    getServiceDictionary(locale),
  ]);

  const content = serviceDict[svc.id];
  const isTransplant =
    svc.id === "liver-transplantation" || svc.id === "kidney-transplantation";
  const related = services.filter((s) => s.id !== svc.id).slice(0, 4);

  return (
    <>
      {/* 1. Specialty Hero on light #EFF5F7 (mist) with #10283E headings & SpecialtyVisual */}
      <section className="border-b border-line bg-mist py-12 sm:py-16">
        <div className="container-page">
          <nav aria-label={dict.a11y.breadcrumb}>
            <Link
              href={pagePath(locale as Locale, "services")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-action hover:text-action-hover"
            >
              <ArrowLeft className="flip-rtl h-4 w-4" aria-hidden="true" />
              <span>{dict.common.backToServices}</span>
            </Link>
          </nav>

          <div className="mt-6 grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <h1 className="text-3xl font-bold text-navy sm:text-4xl">
                {content.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
                <BdiText text={content.intro} />
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <Link
                  href={pagePath(locale as Locale, "contact")}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-action px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-action-hover"
                >
                  <span>{content.cta}</span>
                  <ArrowRight className="flip-rtl h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href={pagePath(locale as Locale, "journey")}
                  className="inline-flex min-h-11 items-center rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-medium text-navy hover:border-ice"
                >
                  {dict.common.ctaSecondary}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <SpecialtyVisual
                id={svc.id}
                steps={content.steps}
                stepsTitle={dict.servicesPage.stepsTitle}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Asymmetric editorial body: Overview blocks + What HEALIX coordinates */}
      <section className="bg-white py-14 sm:py-18">
        <div className="container-page space-y-14">
          {isTransplant && (
            <div className="flex items-start gap-3.5 rounded-2xl border border-ice/60 bg-mist p-5">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
              <div className="text-xs leading-relaxed text-navy">
                <p className="font-bold">{dict.servicesPage.noticeTitle}</p>
                <p className="mt-1 text-slate-strong">
                  {dict.servicesPage.notice} ({dict.legal.reviewNotice})
                </p>
              </div>
            </div>
          )}

          <div className="grid items-start gap-8 lg:grid-cols-12">
            {/* Short structured blocks explaining the subject of inquiry */}
            <div className="lg:col-span-6">
              <h2 className="text-xl font-bold text-navy sm:text-2xl">
                {dict.servicesPage.descriptionTitle}
              </h2>
              <div className="mt-5 space-y-4">
                {content.overview.map((paragraph, idx) => (
                  <div
                    key={paragraph}
                    className="rounded-xl border border-line bg-mist/45 p-5 text-sm leading-relaxed text-navy"
                  >
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-action">
                      0{idx + 1}
                    </span>
                    <p className="mt-1.5 text-slate-strong">
                      <BdiText text={paragraph} />
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* What HEALIX MEDICAL coordinates */}
            <div className="rounded-2xl border border-line bg-mist/75 p-6 sm:p-8 lg:col-span-6">
              <h2 className="text-xl font-bold text-navy">
                {dict.servicesPage.coordinationTitle}
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-navy">
                {content.coordination.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-action"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Service-specific 4-stage coordination timeline */}
          <div className="border-t border-line pt-12">
            <h2 className="text-xl font-bold text-navy sm:text-2xl">
              {dict.servicesPage.stepsTitle}
            </h2>
            <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {content.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="flex flex-col rounded-2xl border border-line bg-white p-5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="h-px flex-1 bg-ice/60" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3.5 text-base font-bold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* 4. Service-specific FAQ accordion */}
          <div className="grid items-start gap-8 border-t border-line pt-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-xl font-bold text-navy sm:text-2xl">
                {dict.servicesPage.faqTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {dict.common.coordinationNotice}
              </p>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordion items={content.faqs} defaultOpenIndex={0} />
            </div>
          </div>

          {/* 5. Service CTA + Medical disclaimer banner */}
          <div className="rounded-2xl border border-ice/55 bg-mist p-7 sm:p-9 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-navy sm:text-2xl">
                {dict.servicesPage.ctaTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {dict.servicesPage.ctaText}
              </p>
            </div>
            <div className="mt-5 shrink-0 lg:mt-0">
              <Link
                href={pagePath(locale as Locale, "contact")}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-action px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-action-hover"
              >
                <span>{content.cta}</span>
                <ArrowRight className="flip-rtl h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-line bg-mist p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-action" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-bold text-navy">
                {dict.servicesPage.noticeTitle}
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-strong">
                {dict.servicesPage.notice}
              </p>
            </div>
          </div>

          {/* 6. Compact "Other services" strip at the bottom of the page (not a crowded sidebar) */}
          <div className="border-t border-line pt-10">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-navy">
                {dict.servicesPage.relatedTitle}
              </h2>
              <Link
                href={pagePath(locale as Locale, "services")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-action hover:text-action-hover"
              >
                <span>{dict.common.allServices}</span>
                <ArrowRight className="flip-rtl h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={servicePath(locale as Locale, item.id)}
                  className="group flex items-center gap-3 rounded-xl border border-line bg-white p-4 transition-colors hover:border-ice hover:bg-mist/40"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mist text-action">
                    <ServiceIcon id={item.id} className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-navy group-hover:text-action">
                    {serviceDict[item.id].name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
