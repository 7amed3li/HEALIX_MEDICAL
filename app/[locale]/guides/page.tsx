import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary, getGuideDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata, samePathForAllLocales } from "@/lib/seo/metadata";
import { guides } from "@/content/guides";
import { GuideCard } from "@/components/guides/GuideCard";
import { ContactCta } from "@/components/home/ContactCta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.guidesPage.metaTitle,
    description: dict.guidesPage.metaDescription,
    paths: samePathForAllLocales("/guides"),
    ogImageAlt: dict.meta.ogImageAlt,
  });
}

export default async function GuidesDirectoryPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [dict, guideDict] = await Promise.all([
    getDictionary(locale),
    getGuideDictionary(locale),
  ]);

  return (
    <>
      <section className="page-hero">
        <div className="container-page">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-[1.12] text-navy sm:text-5xl">
              {dict.guidesPage.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate sm:text-lg">
              {dict.guidesPage.lead}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard
                key={guide.id}
                locale={locale}
                id={guide.id}
                content={guideDict[guide.id]}
                learnMoreLabel={dict.common.learnMore}
              />
            ))}
          </div>

          <div className="mt-14 rounded-[1.5rem] border border-line-soft bg-mist-soft p-7">
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
