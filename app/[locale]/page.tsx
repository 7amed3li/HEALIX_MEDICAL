import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary, getServiceDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata, samePathForAllLocales } from "@/lib/seo/metadata";
import { Hero } from "@/components/home/Hero";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { JourneySteps } from "@/components/home/JourneySteps";
import { HowHealixHelps } from "@/components/home/HowHealixHelps";
import { HomeFaq } from "@/components/home/HomeFaq";
import { ContactCta } from "@/components/home/ContactCta";
import { ContractedFacilities } from "@/components/home/ContractedFacilities";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.meta.defaultTitle,
    description: dict.meta.defaultDescription,
    paths: samePathForAllLocales(""),
    absoluteTitle: true,
    ogImageAlt: dict.meta.ogImageAlt,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [dict, serviceDict] = await Promise.all([
    getDictionary(locale),
    getServiceDictionary(locale),
  ]);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <RevealOnScroll>
        <FeaturedServices locale={locale} dict={dict} serviceDict={serviceDict} />
      </RevealOnScroll>
      <RevealOnScroll>
        <JourneySteps locale={locale} dict={dict} />
      </RevealOnScroll>
      <RevealOnScroll>
        <HowHealixHelps dict={dict} />
      </RevealOnScroll>
      <RevealOnScroll>
        <ContractedFacilities locale={locale} dict={dict} />
      </RevealOnScroll>
      <RevealOnScroll>
        <HomeFaq locale={locale} dict={dict} />
      </RevealOnScroll>
      <RevealOnScroll>
        <ContactCta locale={locale} dict={dict} />
      </RevealOnScroll>
    </>
  );
}
