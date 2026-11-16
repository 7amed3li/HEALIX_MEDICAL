import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata, samePathForAllLocales } from "@/lib/seo/metadata";
import { pagePath } from "@/lib/i18n/routes";
import { ContactCta } from "@/components/home/ContactCta";
import { BdiText } from "@/components/ui/BdiText";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
    paths: samePathForAllLocales("/about"),
    ogImageAlt: dict.meta.ogImageAlt,
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <section className="page-hero">
        <div className="container-page">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-[1.12] text-navy sm:text-5xl">
              <BdiText text={dict.about.title} />
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate sm:text-lg">
              <BdiText text={dict.about.lead} />
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="text-3xl font-semibold text-navy sm:text-4xl">{dict.about.roleTitle}</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-strong">
                {dict.about.role.map((p) => (
                  <p key={p}>
                    <BdiText text={p} />
                  </p>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href={pagePath(locale as Locale, "journey")}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-action hover:text-action-hover"
                >
                  <span>{dict.common.ctaSecondary}</span>
                  <ArrowRight className="flip-rtl h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-line-soft bg-mist shadow-lift ring-1 ring-gold/25">
                <Image
                  src="/images/about-coordinator.jpg"
                  alt={dict.about.imageAlt}
                  width={1200}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-20 border-t border-line-soft pt-14">
            <h2 className="text-3xl font-semibold text-navy sm:text-4xl">{dict.about.valuesTitle}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {dict.about.values.map((v, i) => (
                <div
                  key={v.title}
                  className="rounded-[1.5rem] border border-line-soft bg-mist-soft p-7"
                >
                  <span className="display-type inline-block text-[1.6rem] font-semibold leading-none text-gold-deep">
                    0{i + 1}
                  </span>
                  <h3 className="display-type mt-3 text-[1.1rem] font-semibold text-navy">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-strong">
                    {v.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCta locale={locale} dict={dict} />
    </>
  );
}
