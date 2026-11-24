import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary, getGuideDictionary, getServiceDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata, samePathForAllLocales } from "@/lib/seo/metadata";
import { guidePath, pagePath, servicePath } from "@/lib/i18n/routes";
import { formatPhoneDisplay, siteConfig } from "@/lib/config/site";
import { ContactCta } from "@/components/home/ContactCta";
import type { GuideId } from "@/content/guides";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.linksPage.metaTitle,
    description: dict.linksPage.metaDescription,
    paths: samePathForAllLocales("/links"),
    ogImageAlt: dict.meta.ogImageAlt,
  });
}

const COUNTRY_GUIDES: { id: GuideId; label: "tunisia" | "algeria" | "morocco" | "libya" }[] = [
  { id: "documents-tunisian-patients", label: "tunisia" },
  { id: "documents-algerian-patients", label: "algeria" },
  { id: "documents-moroccan-patients", label: "morocco" },
  { id: "documents-libyan-patients", label: "libya" },
];

function Row({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className =
    "flex min-h-12 items-center justify-between gap-4 rounded-xl border border-navy/10 bg-white px-5 py-3.5 font-medium text-navy transition-colors duration-300 hover:border-gold/50 hover:text-gold-deep";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        <span>{label}</span>
        <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      <span>{label}</span>
      <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
    </Link>
  );
}

export default async function LinksPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const dict = await getDictionary(loc);
  const t = dict.linksPage;
  const guides = await getGuideDictionary(loc);
  const services = await getServiceDictionary(loc);

  const wa = siteConfig.contact.whatsapp;
  const waLink = (message: string) => `${wa}?text=${encodeURIComponent(message)}`;
  const countries = [
    { label: t.tunisia, message: t.whatsappMessages.tunisia },
    { label: t.algeria, message: t.whatsappMessages.algeria },
    { label: t.morocco, message: t.whatsappMessages.morocco },
    { label: t.libya, message: t.whatsappMessages.libya },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container-page">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-[1.12] text-navy sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate sm:text-lg">{t.lead}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="max-w-4xl space-y-14">
            {wa && (
              <div>
                <h2 className="text-2xl font-semibold text-navy">{t.whatsappTitle}</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Row href={waLink(t.whatsappMessages.general)} label={t.whatsappGeneral} external />
                  {countries.map((c) => (
                    <Row key={c.label} href={waLink(c.message)} label={c.label} external />
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold text-navy">{t.guidesTitle}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {COUNTRY_GUIDES.map((g) => (
                  <Row key={g.id} href={guidePath(loc, g.id)} label={guides[g.id].name} />
                ))}
                <Row
                  href={guidePath(loc, "documents-comparison-maghreb")}
                  label={guides["documents-comparison-maghreb"].name}
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-navy">{t.servicesTitle}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Row
                  href={servicePath(loc, "liver-transplantation")}
                  label={services["liver-transplantation"].name}
                />
                <Row
                  href={servicePath(loc, "kidney-transplantation")}
                  label={services["kidney-transplantation"].name}
                />
                <Row href={pagePath(loc, "services")} label={t.allServices} />
                <Row href={pagePath(loc, "facilities")} label={t.facilities} />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-navy">{t.socialTitle}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Row href={siteConfig.social.instagram} label={t.instagram} external />
                <Row href={siteConfig.social.facebook} label={t.facebook} external />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-navy">{t.contactTitle}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {siteConfig.contact.email && (
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex min-h-12 items-center gap-3 rounded-xl border border-navy/10 bg-white px-5 py-3.5 font-medium text-navy transition-colors duration-300 hover:border-gold/50 hover:text-gold-deep"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span dir="ltr">{siteConfig.contact.email}</span>
                  </a>
                )}
                {siteConfig.contact.phone && (
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex min-h-12 items-center gap-3 rounded-xl border border-navy/10 bg-white px-5 py-3.5 font-medium text-navy transition-colors duration-300 hover:border-gold/50 hover:text-gold-deep"
                  >
                    <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span dir="ltr">{formatPhoneDisplay(siteConfig.contact.phone)}</span>
                  </a>
                )}
                <Row href={pagePath(loc, "contact")} label={t.contactPage} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCta locale={locale} dict={dict} />
    </>
  );
}
