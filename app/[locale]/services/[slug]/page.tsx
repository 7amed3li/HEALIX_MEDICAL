import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CheckCircle2, Info, ShieldAlert } from "lucide-react";
import { formatNumber, isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary, getServiceDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata, type LocalizedPaths } from "@/lib/seo/metadata";
import { getServiceBySlug, services } from "@/content/services";
import { pagePath, servicePath } from "@/lib/i18n/routes";
import { serviceImage } from "@/lib/service-images";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { BdiText } from "@/components/ui/BdiText";
import { TactileButton } from "@/components/ui/TactileButton";

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
      <section className="page-hero">
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
              <h1 className="text-4xl font-semibold leading-[1.12] text-navy sm:text-5xl">
                {content.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
                <BdiText text={content.intro} />
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <TactileButton
                  href={pagePath(locale as Locale, "contact")}
                  variant="primary"
                  className="min-h-12 px-6 py-3 text-sm"
                >
                  <span>{content.cta}</span>
                  <ArrowRight className="flip-rtl h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </TactileButton>
                <TactileButton
                  href={pagePath(locale as Locale, "journey")}
                  variant="secondary"
                  className="min-h-12 px-5 py-3 text-sm"
                >
                  {dict.common.ctaSecondary}
                </TactileButton>
              </div>
            </div>

            <div className="lg:col-span-5">
              {/* Anatomical render panel (Design v2) – the specialty's organ
                  illustration as the hero's visual block */}
              <div className="relative overflow-hidden rounded-[1.75rem] shadow-card ring-1 ring-line-soft">
                <Image
                  src={serviceImage(svc.id)}
                  alt={content.name}
                  width={1200}
                  height={900}
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="aspect-[4/3] w-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-bright via-ice to-brand-red"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Asymmetric editorial body: Overview blocks + What HEALIX coordinates */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page space-y-14">
          {isTransplant && (
            <div className="flex items-start gap-3.5 rounded-[1.5rem] border border-gold/45 bg-[#faf6ec] p-6">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" aria-hidden="true" />
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
              <h2 className="text-2xl font-semibold text-navy sm:text-[1.7rem]">
                {dict.servicesPage.descriptionTitle}
              </h2>
              <div className="mt-6 space-y-4">
                {content.overview.map((paragraph, idx) => (
                  <div
                    key={paragraph}
                    className="rounded-2xl border border-line-soft bg-white p-6 text-sm leading-relaxed text-navy shadow-soft"
                  >
                    <span className="display-type inline-block text-[1.6rem] font-semibold leading-none text-bright">
                      {formatNumber(idx + 1, locale as Locale, 2)}
                    </span>
                    <p className="mt-2.5 text-slate-strong">
                      <BdiText text={paragraph} />
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* What HEALIX MEDICAL coordinates */}
            <div className="rounded-[1.75rem] border border-line-soft bg-mist-soft p-7 sm:p-9 lg:col-span-6">
              <h2 className="text-2xl font-semibold text-navy">
                {dict.servicesPage.coordinationTitle}
              </h2>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-navy">
                {content.coordination.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-line-soft bg-white px-4 py-3"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-bright"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Service-specific 4-stage coordination timeline */}
          <div className="border-t border-line-soft pt-14">
            <h2 className="text-2xl font-semibold text-navy sm:text-[1.7rem]">
              {dict.servicesPage.stepsTitle}
            </h2>
            <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {content.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="flex flex-col rounded-3xl border border-line-soft bg-white p-6 shadow-soft"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="display-type text-[2rem] font-semibold leading-none text-bright">
                      {formatNumber(i + 1, locale as Locale)}
                    </span>
                    <span
                      className="h-px flex-1 self-center bg-gradient-to-r from-bright/50 to-ice/30 rtl:bg-gradient-to-l"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="display-type mt-4 text-[1.15rem] font-semibold leading-snug text-navy">
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
          <div className="grid items-start gap-8 border-t border-line-soft pt-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-semibold text-navy sm:text-[1.7rem]">
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
          <div className="on-dark surface-dark grain relative overflow-hidden rounded-[2rem] p-8 shadow-lift sm:p-11 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <span
              aria-hidden="true"
              className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-ice/70 to-transparent"
            />
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold text-white sm:text-[1.8rem]">
                {dict.servicesPage.ctaTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
                {dict.servicesPage.ctaText}
              </p>
            </div>
            <div className="mt-6 shrink-0 lg:mt-0">
              <Link
                href={pagePath(locale as Locale, "contact")}
                className="btn-primary min-h-12 px-6 py-3 text-sm"
              >
                <span>{content.cta}</span>
                <ArrowRight className="flip-rtl h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-[1.5rem] border border-line-soft bg-mist-soft p-6">
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
          <div className="border-t border-line-soft pt-12">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-navy">
                {dict.servicesPage.relatedTitle}
              </h2>
              <span className="h-px w-10 bg-brand-red" aria-hidden="true" />
              <span className="h-px flex-1 bg-line-soft" aria-hidden="true" />
              <Link
                href={pagePath(locale as Locale, "services")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-action hover:text-action-hover"
              >
                <span>{dict.common.allServices}</span>
                <ArrowRight className="flip-rtl h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={servicePath(locale as Locale, item.id)}
                  className="group flex items-center gap-3 rounded-2xl border border-line-soft bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-bright/40 hover:shadow-lift"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mist text-action transition-colors duration-300 group-hover:bg-navy group-hover:text-ice">
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
