import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary, getServiceDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata, samePathForAllLocales } from "@/lib/seo/metadata";
import { services } from "@/content/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ContactCta } from "@/components/home/ContactCta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.servicesPage.metaTitle,
    description: dict.servicesPage.metaDescription,
    paths: samePathForAllLocales("/services"),
    ogImageAlt: dict.meta.ogImageAlt,
  });
}

export default async function ServicesDirectoryPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [dict, serviceDict] = await Promise.all([
    getDictionary(locale),
    getServiceDictionary(locale),
  ]);

  const featured = services.filter((s) => s.featured);
  const others = services.filter((s) => !s.featured);

  return (
    <>
      <section className="border-b border-line bg-mist py-12 sm:py-16">
        <div className="container-page">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-navy sm:text-4xl">
              {dict.servicesPage.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate sm:text-lg">
              {dict.servicesPage.lead}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="container-page">
          {/* Liver & Kidney Transplantation highlighted first */}
          <div className="grid gap-6 lg:grid-cols-2">
            {featured.map((svc) => (
              <ServiceCard
                key={svc.id}
                locale={locale}
                id={svc.id}
                content={serviceDict[svc.id]}
                featured
                learnMoreLabel={dict.common.learnMore}
              />
            ))}
          </div>

          {/* Remaining 10 specialties in a balanced grid */}
          <div className="mt-14 border-t border-line pt-10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-navy">
              {dict.home.services.othersTitle}
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((svc) => (
                <ServiceCard
                  key={svc.id}
                  locale={locale}
                  id={svc.id}
                  content={serviceDict[svc.id]}
                  learnMoreLabel={dict.common.learnMore}
                />
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-line bg-mist/70 p-6">
            <h2 className="text-sm font-bold text-navy">{dict.servicesPage.noticeTitle}</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-strong">
              {dict.servicesPage.notice}
            </p>
          </div>
        </div>
      </section>

      <ContactCta locale={locale} dict={dict} />
    </>
  );
}
