import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { ShieldCheck, Phone, Mail, MessageCircle } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary, getServiceDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata, samePathForAllLocales } from "@/lib/seo/metadata";
import { services } from "@/content/services";
import { siteConfig, isValidWhatsAppUrl } from "@/lib/config/site";
import { ContactForm } from "@/components/forms/ContactForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    paths: samePathForAllLocales("/contact"),
    ogImageAlt: dict.meta.ogImageAlt,
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [dict, serviceDict] = await Promise.all([
    getDictionary(locale),
    getServiceDictionary(locale),
  ]);

  const serviceOptions = services.map((s) => ({
    id: s.id,
    name: serviceDict[s.id].name,
  }));

  const receiverConfigured = Boolean(process.env.CONTACT_RECEIVER_URL);
  const hasWhatsApp = isValidWhatsAppUrl(siteConfig.contact.whatsapp);

  return (
    <>
      <section className="page-hero">
        <div className="container-page">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-[1.12] text-navy sm:text-5xl">
              {dict.contact.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate sm:text-lg">
              {dict.contact.lead}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm
              locale={locale}
              dict={dict}
              serviceOptions={serviceOptions}
              receiverConfigured={receiverConfigured}
            />
          </div>

          <aside className="space-y-6 lg:col-span-5">
            {/* Istanbul visual (Design v2) – the Bosphorus at golden hour
                anchors the contact split opposite the form */}
            <div className="relative overflow-hidden rounded-[1.5rem] shadow-card ring-1 ring-line-soft">
              <Image
                src="/images/istanbul-contact.jpg"
                alt=""
                width={1400}
                height={1000}
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="h-60 w-full object-cover sm:h-72 lg:h-80"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-bright via-ice to-brand-red"
              />
            </div>

            <div className="rounded-[1.5rem] border border-line-soft bg-mist-soft p-7">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-5 w-5 text-bright" aria-hidden="true" />
                <h2 className="text-[1.15rem] font-semibold text-navy">
                  {dict.contact.beforeTitle}
                </h2>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-strong">
                {dict.contact.before.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-bright"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Confirmed direct channels appear only when configured */}
            {(siteConfig.contact.phone || siteConfig.contact.email || hasWhatsApp) && (
              <div className="space-y-3 rounded-[1.5rem] border border-line-soft bg-white p-6 text-sm text-navy shadow-soft">
                {siteConfig.contact.phone && (
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="group flex items-center gap-3.5 rounded-xl p-2 transition-colors hover:bg-mist/70"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ice/45 bg-mist-soft text-action transition-colors group-hover:bg-action group-hover:text-white">
                      <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span dir="ltr" className="font-semibold text-navy group-hover:text-action">
                      {siteConfig.contact.phone}
                    </span>
                  </a>
                )}
                {siteConfig.contact.email && (
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="group flex items-center gap-3.5 rounded-xl p-2 transition-colors hover:bg-mist/70"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ice/45 bg-mist-soft text-action transition-colors group-hover:bg-action group-hover:text-white">
                      <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span dir="ltr" className="font-semibold text-navy group-hover:text-action">
                      {siteConfig.contact.email}
                    </span>
                  </a>
                )}
                {hasWhatsApp && siteConfig.contact.whatsapp && (
                  <a
                    href={siteConfig.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-action px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-action-hover"
                  >
                    <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            )}

            <div className="rounded-[1.5rem] border border-line-soft bg-white p-7 shadow-soft">
              <h2 className="text-[1.05rem] font-semibold text-navy">
                {dict.contact.socialTitle}
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {siteConfig.social.instagram && (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-mist-soft px-5 py-2 text-sm font-medium text-navy transition-all duration-300 hover:border-bright/50 hover:shadow-soft"
                  >
                    <InstagramIcon className="h-4 w-4 text-action" />
                    <span>Instagram</span>
                  </a>
                )}
                {siteConfig.social.facebook && (
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-mist-soft px-5 py-2 text-sm font-medium text-navy transition-all duration-300 hover:border-bright/50 hover:shadow-soft"
                  >
                    <FacebookIcon className="h-4 w-4 text-action" />
                    <span>Facebook</span>
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
