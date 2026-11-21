import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CheckCircle2, Info, ShieldAlert } from "lucide-react";
import { isLocale, localeConfig, locales, type Locale } from "@/lib/i18n/config";
import {
  getDictionary,
  getGuideDictionary,
  getServiceDictionary,
} from "@/lib/i18n/dictionaries";
import { buildMetadata, type LocalizedPaths } from "@/lib/seo/metadata";
import { getGuideBySlug, guides } from "@/content/guides";
import { guidePath, pagePath, servicePath } from "@/lib/i18n/routes";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { GuideIcon } from "@/components/guides/GuideIcon";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { BdiText } from "@/components/ui/BdiText";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const guide of guides) {
      params.push({ locale, slug: guide.slugs[locale] });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const guide = getGuideBySlug(locale, slug);
  if (!guide) return {};

  const [dict, guideDict] = await Promise.all([
    getDictionary(locale),
    getGuideDictionary(locale),
  ]);
  const content = guideDict[guide.id];

  const paths = Object.fromEntries(
    locales.map((l) => [l, `/${l}/guides/${guide.slugs[l]}`])
  ) as LocalizedPaths;

  return buildMetadata({
    locale,
    title: content.metaTitle,
    description: content.metaDescription,
    paths,
    ogImageAlt: dict.meta.ogImageAlt,
  });
}

export default async function GuideDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const guide = getGuideBySlug(locale, slug);
  if (!guide) notFound();

  const [dict, guideDict, serviceDict] = await Promise.all([
    getDictionary(locale),
    getGuideDictionary(locale),
    getServiceDictionary(locale),
  ]);

  const content = guideDict[guide.id];
  const otherGuides = guides.filter((g) => g.id !== guide.id);
  const transplantServices = ["kidney-transplantation", "liver-transplantation"] as const;

  const updatedLabel = new Intl.DateTimeFormat(localeConfig[locale].htmlLang, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${content.updated}T00:00:00Z`));

  return (
    <>
      {/* 1. Editorial hero on the light page-hero surface */}
      <section className="page-hero">
        <div className="container-page">
          <nav aria-label={dict.a11y.breadcrumb}>
            <Link
              href={pagePath(locale as Locale, "guides")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-action hover:text-action-hover"
            >
              <ArrowLeft className="flip-rtl h-4 w-4" aria-hidden="true" />
              <span>{dict.guidesPage.backLabel}</span>
            </Link>
          </nav>

          <div className="mt-6 max-w-3xl">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-action ring-1 ring-line-soft">
              <GuideIcon id={guide.id} className="h-5 w-5" />
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.12] text-navy sm:text-5xl">
              {content.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
              <BdiText text={content.intro} />
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate">
              {dict.legal.updated}:{" "}
              <time dateTime={content.updated}>{updatedLabel}</time>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href={pagePath(locale as Locale, "contact")}
                className="btn-primary min-h-12 px-6 py-3 text-sm"
              >
                <span>{content.cta}</span>
                <ArrowRight className="flip-rtl h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={pagePath(locale as Locale, "services")}
                className="btn-ghost min-h-12 px-5 py-3 text-sm"
              >
                {dict.common.allServices}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page space-y-14">
          {/* 2. Transplant notice (same gold panel as the transplant service pages) */}
          <div className="flex items-start gap-3.5 rounded-[1.5rem] border border-gold/45 bg-[#faf6ec] p-6">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" aria-hidden="true" />
            <div className="text-xs leading-relaxed text-navy">
              <p className="font-bold">{dict.servicesPage.noticeTitle}</p>
              <p className="mt-1 text-slate-strong">
                {dict.servicesPage.notice} ({dict.legal.reviewNotice})
              </p>
            </div>
          </div>

          {/* 3. Guide sections: heading rail + paragraphs and checklist bullets */}
          {content.sections.map((section, idx) => (
            <div
              key={section.heading}
              className={`grid items-start gap-8 lg:grid-cols-12 ${
                idx > 0 ? "border-t border-line-soft pt-14" : ""
              }`}
            >
              <div className="lg:col-span-4">
                <span className="display-type inline-block text-[1.6rem] font-semibold leading-none text-bright">
                  0{idx + 1}
                </span>
                <h2 className="mt-3 text-2xl font-semibold text-navy sm:text-[1.7rem]">
                  {section.heading}
                </h2>
              </div>
              <div className="lg:col-span-8">
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[15px] leading-[1.85] text-slate-strong"
                    >
                      <BdiText text={paragraph} />
                    </p>
                  ))}
                </div>
                {section.bullets.length > 0 && (
                  <ul className="mt-6 space-y-3 text-sm leading-relaxed text-navy">
                    {section.bullets.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-line-soft bg-mist-soft px-4 py-3"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-bright"
                          aria-hidden="true"
                        />
                        <span>
                          <BdiText text={item} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}

          {/* 4. Guide FAQ accordion */}
          <div className="grid items-start gap-8 border-t border-line-soft pt-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-semibold text-navy sm:text-[1.7rem]">
                {dict.guidesPage.faqTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {dict.common.coordinationNotice}
              </p>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordion items={content.faqs} defaultOpenIndex={0} />
            </div>
          </div>

          {/* 5. Sources */}
          <div className="rounded-[1.5rem] border border-line-soft bg-mist-soft p-6">
            <h2 className="text-sm font-bold text-navy">{dict.guidesPage.sourcesTitle}</h2>
            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-slate-strong">
              {content.sources.map((source) => (
                <li key={source}>
                  <BdiText text={source} />
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate">
              {dict.legal.updated}: <time dateTime={content.updated}>{updatedLabel}</time>
            </p>
          </div>

          {/* 6. CTA banner */}
          <div className="on-dark surface-dark grain relative overflow-hidden rounded-[2rem] p-8 shadow-lift sm:p-11 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <span
              aria-hidden="true"
              className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-ice/70 to-transparent"
            />
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold text-white sm:text-[1.8rem]">
                {dict.guidesPage.ctaTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
                {dict.guidesPage.ctaText}
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

          {/* 7. Per-guide informational disclaimer — every guide ends with it */}
          <div className="flex items-start gap-3 rounded-[1.5rem] border border-line-soft bg-mist-soft p-6">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-action" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-bold text-navy">{dict.guidesPage.noticeTitle}</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-strong">
                <BdiText text={content.disclaimer} />
              </p>
            </div>
          </div>

          {/* 8. Related transplant services (kidney & liver) */}
          <div className="border-t border-line-soft pt-12">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-navy">
                {dict.guidesPage.relatedTitle}
              </h2>
              <span className="h-px w-10 bg-brand-red" aria-hidden="true" />
              <span className="h-px flex-1 bg-line-soft" aria-hidden="true" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {transplantServices.map((id) => (
                <Link
                  key={id}
                  href={servicePath(locale as Locale, id)}
                  className="group flex items-start gap-3.5 rounded-2xl border border-line-soft bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-bright/40 hover:shadow-lift"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mist text-action transition-colors duration-300 group-hover:bg-navy group-hover:text-ice">
                    <ServiceIcon id={id} className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-navy group-hover:text-action">
                      {serviceDict[id].name}
                    </span>
                    <span className="mt-1 block text-[13px] leading-relaxed text-slate">
                      {serviceDict[id].short}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* 9. Other guides strip */}
          <div className="border-t border-line-soft pt-12">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-navy">
                {dict.guidesPage.relatedGuidesTitle}
              </h2>
              <span className="h-px w-10 bg-brand-red" aria-hidden="true" />
              <span className="h-px flex-1 bg-line-soft" aria-hidden="true" />
              <Link
                href={pagePath(locale as Locale, "guides")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-action hover:text-action-hover"
              >
                <span>{dict.guidesPage.backLabel}</span>
                <ArrowRight className="flip-rtl h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {otherGuides.map((item) => (
                <Link
                  key={item.id}
                  href={guidePath(locale as Locale, item.id)}
                  className="group flex items-center gap-3 rounded-2xl border border-line-soft bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-bright/40 hover:shadow-lift"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mist text-action transition-colors duration-300 group-hover:bg-navy group-hover:text-ice">
                    <GuideIcon id={item.id} className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-navy group-hover:text-action">
                    {guideDict[item.id].name}
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
