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
      <section className="border-b border-line bg-mist py-12 sm:py-16">
        <div className="container-page">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-navy sm:text-4xl">
              <BdiText text={dict.about.title} />
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate sm:text-lg">
              <BdiText text={dict.about.lead} />
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="text-2xl font-bold text-navy">{dict.about.roleTitle}</h2>
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
              <div className="relative overflow-hidden rounded-2xl border border-line bg-mist shadow-soft">
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

          <div className="mt-16 border-t border-line pt-12">
            <h2 className="text-2xl font-bold text-navy">{dict.about.valuesTitle}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {dict.about.values.map((v, i) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-line bg-mist/65 p-6"
                >
                  <span className="inline-block text-xs font-bold text-action">
                    0{i + 1}
                  </span>
                  <h3 className="mt-1.5 text-base font-bold text-navy">{v.title}</h3>
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
