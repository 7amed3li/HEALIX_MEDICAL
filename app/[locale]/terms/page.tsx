import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata, samePathForAllLocales } from "@/lib/seo/metadata";
import { BdiText } from "@/components/ui/BdiText";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.legal.terms.metaTitle,
    description: dict.legal.terms.metaDescription,
    paths: samePathForAllLocales("/terms"),
    ogImageAlt: dict.meta.ogImageAlt,
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const page = dict.legal.terms;

  return (
    <>
      <section className="border-b border-line bg-mist py-12 sm:py-16">
        <div className="container-page">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-navy sm:text-4xl">
              {page.title}
            </h1>
            <p className="mt-3 text-xs text-slate-strong">{dict.legal.reviewNotice}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="container-page">
          <div className="prose-legal max-w-3xl space-y-8">
            {page.sections.map((sec) => (
              <div key={sec.h}>
                <h2 className="text-xl font-bold text-navy">{sec.h}</h2>
                {sec.p.map((paragraph) => (
                  <p key={paragraph}>
                    <BdiText text={paragraph} />
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
