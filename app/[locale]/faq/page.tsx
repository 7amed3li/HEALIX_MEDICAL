import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata, samePathForAllLocales } from "@/lib/seo/metadata";
import { faqPageJsonLd } from "@/lib/seo/jsonld";
import { ContactCta } from "@/components/home/ContactCta";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.faqPage.metaTitle,
    description: dict.faqPage.metaDescription,
    paths: samePathForAllLocales("/faq"),
    ogImageAlt: dict.meta.ogImageAlt,
  });
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  const generalQuestions = dict.faqPage.items.slice(0, 5);
  const travelAndPrivacyQuestions = dict.faqPage.items.slice(5);
  const jsonLd = faqPageJsonLd(dict.faqPage.items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="page-hero">
        <div className="container-page">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-[1.12] text-navy sm:text-5xl">
              {dict.faqPage.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate sm:text-lg">
              {dict.faqPage.lead}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="max-w-4xl space-y-8">
            <FaqAccordion items={generalQuestions} defaultOpenIndex={0} />
            <FaqAccordion items={travelAndPrivacyQuestions} defaultOpenIndex={-1} />
          </div>
        </div>
      </section>

      <ContactCta locale={locale} dict={dict} />
    </>
  );
}
